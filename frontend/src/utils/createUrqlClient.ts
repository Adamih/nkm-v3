import {
  dedupExchange,
  fetchExchange,
  Exchange,
  stringifyVariables,
} from "urql";
import { cacheExchange, Resolver, Cache } from "@urql/exchange-graphcache";
import {
  LogoutMutation,
  MeQuery,
  MeDocument,
  LoginMutation,
  RegisterMutation,
  VoteMutationVariables,
  DeletePostMutationVariables,
  DeleteEventMutationVariables,
  CreateShiftMutationVariables,
} from "../generated/graphql";
import { myUpdateQuery } from "./myUpdateQuery";
import { pipe, tap } from "wonka";
import Router from "next/router";
import { STATUS_CODES } from "../constants";
import gql from "graphql-tag";
import { isServer } from "./isServer";

const errorExchange: Exchange = ({ forward }) => (ops$) => {
  return pipe(
    forward(ops$),
    tap(({ error }) => {
      if (error) {
        const errors = error.graphQLErrors;
        for (const e in errors) {
          if (errors[e].extensions.code === STATUS_CODES.UNAUTHENTICATED) {
            if (Router.pathname !== "/login") {
              Router.replace("/login");
            }
          }
        }
      }
    })
  );
};

const typenames = {
  events: "PaginatedEvents",
  posts: "PaginatedPosts"
}

export const cursorPagination = (key): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;

    const allFields = cache.inspectFields(entityKey);
    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);
    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }

    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
    const isItInTheCache = cache.resolve(
      cache.resolveFieldByKey(entityKey, fieldKey) as string,
      key
    );
    info.partial = !isItInTheCache;
    const entries: String[] = [];
    let hasMore = true;
    fieldInfos.forEach((fi) => {
      const _key = cache.resolveFieldByKey(entityKey, fi.fieldKey) as string;
      const data = cache.resolve(_key, key) as String[];
      const _hasMore = cache.resolve(key, "hasMore");
      if (!_hasMore) {
        hasMore = _hasMore as boolean;
      }
      entries.push(...data);
    });

    return {
      __typename: typenames[key],
      hasMore,
      entries,
    };
  };
};

const invalidateAllEntries = (cache: Cache, fieldName: string) => {
  const allFields = cache.inspectFields("Query");
  const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);
  fieldInfos.forEach((fi) => {
    cache.invalidate("Query", fieldName, fi.arguments || {});
  });
};

export const createUrqlClient = (ssrExchange: any, ctx: any) => {
  let cookie;
  if (isServer()) cookie = ctx?.req?.headers?.cookie;

  return {
    url: "http://localhost:4000/graphql",
    fetchOptions: {
      credentials: "include" as const,
      headers: cookie ? { cookie } : undefined,
    },
    exchanges: [
      dedupExchange,
      cacheExchange({
        keys: {
          PaginatedPosts: () => null,
        },
        resolvers: {
          Query: {
            posts: cursorPagination("posts"),
            events: cursorPagination("events"),
          },
        },
        updates: {
          Mutation: {
            deleteEvent: (_result, args, cache, info) => {
              cache.invalidate({
                __typename: "Event",
                id: (args as DeleteEventMutationVariables).id,
              });
            },
            deletePost: (_result, args, cache, info) => {
              cache.invalidate({
                __typename: "Post",
                id: (args as DeletePostMutationVariables).id,
              });
            },
            vote: (_result, args, cache, info) => {
              let { postId, value } = args as VoteMutationVariables;
              const data = cache.readFragment(
                gql`
                  fragment _ on Post {
                    id
                    points
                    voteStatus
                  }
                `,
                { id: postId } as any
              );
              if (!data) return;
              let newPoints = (data.points as number);
              if (data.voteStatus === value) {
                newPoints -= value;
                value = 0;
              } else { 
                newPoints += (!data.voteStatus ? 1 : 2) * value;
              }
              cache.writeFragment(
                gql`
                  fragment __ on Post {
                    points
                    voteStatus
                  }
                `,
                { id: postId, points: newPoints, voteStatus: value } as any
              );
            },
            createPost: (_result, args, cache, info) => {
              invalidateAllEntries(cache, "posts");
            },
            createEvent: (_result, args, cache, info) => {
              invalidateAllEntries(cache, "events");
            },
            createShift: (_result, args, cache, info) => {
              invalidateAllEntries(cache, "events");
            },
            updateSA: (_result, args, cache, info) => {
              invalidateAllEntries(cache, "events");
            },
            logout: (_result, args, cache, info) => {
              myUpdateQuery<LogoutMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => ({ me: null })
              );
            },
            login: (_result, args, cache, info) => {
              myUpdateQuery<LoginMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (!result.login.user) {
                    return query;
                  }
                  return { me: result.login.user };
                }
              );
              invalidateAllEntries(cache, "posts");
            },
            register: (_result, args, cache, info) => {
              myUpdateQuery<RegisterMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (!result.register.user) {
                    return query;
                  }
                  return { me: result.register.user };
                }
              );
            },
          },
        },
      }),
      errorExchange,
      ssrExchange,
      fetchExchange,
    ],
  };
};
