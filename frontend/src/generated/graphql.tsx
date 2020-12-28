import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  posts: PaginatedPosts;
  post?: Maybe<Post>;
  me?: Maybe<User>;
  events: PaginatedEvents;
  event?: Maybe<Event>;
};


export type QueryPostsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};


export type QueryEventsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryEventArgs = {
  id: Scalars['Int'];
};

export type PaginatedPosts = {
  __typename?: 'PaginatedPosts';
  posts: Array<Post>;
  hasMore: Scalars['Boolean'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['Float'];
  creatorId: Scalars['Float'];
  creator: User;
  title: Scalars['String'];
  text: Scalars['String'];
  points: Scalars['Float'];
  voteStatus?: Maybe<Scalars['Int']>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  textSnippet: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type PaginatedEvents = {
  __typename?: 'PaginatedEvents';
  events: Array<Event>;
  hasMore: Scalars['Boolean'];
};

export type Event = {
  __typename?: 'Event';
  id: Scalars['Float'];
  title: Scalars['String'];
  locale: Scalars['String'];
  saId?: Maybe<Scalars['Float']>;
  sa?: Maybe<User>;
  workersNeeded?: Maybe<Scalars['Int']>;
  hasShift?: Maybe<Scalars['Boolean']>;
  shifts: Array<Shift>;
  notes?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Shift = {
  __typename?: 'Shift';
  id: Scalars['Float'];
  workerId: Scalars['Float'];
  worker: User;
  eventId: Scalars['Float'];
  createdAt: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  vote: Scalars['Boolean'];
  createPost: Post;
  updatePost?: Maybe<Post>;
  deletePost: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  changePassword: UserResponse;
  createShift: Shift;
  createEvent: Event;
  updateEvent?: Maybe<Event>;
  updateSA: Scalars['Boolean'];
  deleteEvent: Scalars['Boolean'];
};


export type MutationVoteArgs = {
  value: Scalars['Int'];
  postId: Scalars['Int'];
};


export type MutationCreatePostArgs = {
  options: PostInput;
};


export type MutationUpdatePostArgs = {
  options?: Maybe<PostInput>;
  id: Scalars['Int'];
};


export type MutationDeletePostArgs = {
  id: Scalars['Int'];
};


export type MutationRegisterArgs = {
  options: RegisterInput;
};


export type MutationLoginArgs = {
  options: LoginInput;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  password: Scalars['String'];
  token: Scalars['String'];
};


export type MutationCreateShiftArgs = {
  eventId: Scalars['Int'];
};


export type MutationCreateEventArgs = {
  options: CreateEventInput;
};


export type MutationUpdateEventArgs = {
  options?: Maybe<UpdateEventInput>;
  id: Scalars['Int'];
};


export type MutationUpdateSaArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteEventArgs = {
  id: Scalars['Int'];
};

export type PostInput = {
  title: Scalars['String'];
  text: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  user: User;
};

export type RegisterInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type CreateEventInput = {
  title: Scalars['String'];
  locale: Scalars['String'];
  workersNeeded?: Maybe<Scalars['Float']>;
  notes?: Maybe<Scalars['String']>;
};

export type UpdateEventInput = {
  title: Scalars['String'];
  locale: Scalars['String'];
  workersNeeded?: Maybe<Scalars['Float']>;
  notes?: Maybe<Scalars['String']>;
};

export type PostSnippetFragment = (
  { __typename?: 'Post' }
  & Pick<Post, 'id' | 'createdAt' | 'updatedAt' | 'title' | 'textSnippet' | 'points' | 'voteStatus'>
  & { creator: (
    { __typename?: 'User' }
    & RegularUserFragment
  ) }
);

export type RegularEventFragment = (
  { __typename?: 'Event' }
  & Pick<Event, 'id' | 'title' | 'locale' | 'notes' | 'hasShift' | 'createdAt' | 'updatedAt'>
  & { sa?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )>, shifts: Array<(
    { __typename?: 'Shift' }
    & Pick<Shift, 'id' | 'workerId'>
    & { worker: (
      { __typename?: 'User' }
      & RegularUserFragment
    ) }
  )> }
);

export type RegularPostFragment = (
  { __typename?: 'Post' }
  & Pick<Post, 'id' | 'creatorId' | 'title' | 'text' | 'points' | 'createdAt' | 'updatedAt'>
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>
);

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  password: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserResponse' }
    & { user: (
      { __typename?: 'User' }
      & RegularUserFragment
    ) }
  ) }
);

export type CreateEventMutationVariables = Exact<{
  options: CreateEventInput;
}>;


export type CreateEventMutation = (
  { __typename?: 'Mutation' }
  & { createEvent: (
    { __typename?: 'Event' }
    & RegularEventFragment
  ) }
);

export type CreatePostMutationVariables = Exact<{
  options: PostInput;
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost: (
    { __typename?: 'Post' }
    & RegularPostFragment
  ) }
);

export type CreateShiftMutationVariables = Exact<{
  eventId: Scalars['Int'];
}>;


export type CreateShiftMutation = (
  { __typename?: 'Mutation' }
  & { createShift: (
    { __typename?: 'Shift' }
    & Pick<Shift, 'workerId'>
    & { worker: (
      { __typename?: 'User' }
      & RegularUserFragment
    ) }
  ) }
);

export type DeleteEventMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteEventMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteEvent'>
);

export type DeletePostMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeletePostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deletePost'>
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type LoginMutationVariables = Exact<{
  options: LoginInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { user: (
      { __typename?: 'User' }
      & RegularUserFragment
    ) }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  options: RegisterInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { user: (
      { __typename?: 'User' }
      & RegularUserFragment
    ) }
  ) }
);

export type UpdateEventMutationVariables = Exact<{
  id: Scalars['Int'];
  options: UpdateEventInput;
}>;


export type UpdateEventMutation = (
  { __typename?: 'Mutation' }
  & { updateEvent?: Maybe<(
    { __typename?: 'Event' }
    & RegularEventFragment
  )> }
);

export type UpdatePostMutationVariables = Exact<{
  id: Scalars['Int'];
  options: PostInput;
}>;


export type UpdatePostMutation = (
  { __typename?: 'Mutation' }
  & { updatePost?: Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'title' | 'text' | 'textSnippet'>
  )> }
);

export type UpdateSaMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type UpdateSaMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateSA'>
);

export type VoteMutationVariables = Exact<{
  postId: Scalars['Int'];
  value: Scalars['Int'];
}>;


export type VoteMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'vote'>
);

export type EventQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type EventQuery = (
  { __typename?: 'Query' }
  & { event?: Maybe<(
    { __typename?: 'Event' }
    & RegularEventFragment
  )> }
);

export type EventsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type EventsQuery = (
  { __typename?: 'Query' }
  & { events: (
    { __typename?: 'PaginatedEvents' }
    & Pick<PaginatedEvents, 'hasMore'>
    & { events: Array<(
      { __typename?: 'Event' }
      & RegularEventFragment
    )> }
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type PostQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type PostQuery = (
  { __typename?: 'Query' }
  & { post?: Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'createdAt' | 'updatedAt' | 'title' | 'text' | 'points' | 'voteStatus'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>
    ) }
  )> }
);

export type PostsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts: (
    { __typename?: 'PaginatedPosts' }
    & Pick<PaginatedPosts, 'hasMore'>
    & { posts: Array<(
      { __typename?: 'Post' }
      & PostSnippetFragment
    )> }
  ) }
);

export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  firstName
  lastName
  email
}
    `;
export const PostSnippetFragmentDoc = gql`
    fragment PostSnippet on Post {
  id
  createdAt
  updatedAt
  title
  textSnippet
  points
  voteStatus
  creator {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;
export const RegularEventFragmentDoc = gql`
    fragment RegularEvent on Event {
  id
  title
  sa {
    ...RegularUser
  }
  locale
  notes
  shifts {
    id
    workerId
    worker {
      ...RegularUser
    }
  }
  hasShift
  createdAt
  updatedAt
}
    ${RegularUserFragmentDoc}`;
export const RegularPostFragmentDoc = gql`
    fragment RegularPost on Post {
  id
  creatorId
  title
  text
  points
  createdAt
  updatedAt
}
    `;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $password: String!) {
  changePassword(token: $token, password: $password) {
    user {
      ...RegularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const CreateEventDocument = gql`
    mutation CreateEvent($options: CreateEventInput!) {
  createEvent(options: $options) {
    ...RegularEvent
  }
}
    ${RegularEventFragmentDoc}`;

export function useCreateEventMutation() {
  return Urql.useMutation<CreateEventMutation, CreateEventMutationVariables>(CreateEventDocument);
};
export const CreatePostDocument = gql`
    mutation CreatePost($options: PostInput!) {
  createPost(options: $options) {
    ...RegularPost
  }
}
    ${RegularPostFragmentDoc}`;

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument);
};
export const CreateShiftDocument = gql`
    mutation CreateShift($eventId: Int!) {
  createShift(eventId: $eventId) {
    workerId
    worker {
      ...RegularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;

export function useCreateShiftMutation() {
  return Urql.useMutation<CreateShiftMutation, CreateShiftMutationVariables>(CreateShiftDocument);
};
export const DeleteEventDocument = gql`
    mutation DeleteEvent($id: Int!) {
  deleteEvent(id: $id)
}
    `;

export function useDeleteEventMutation() {
  return Urql.useMutation<DeleteEventMutation, DeleteEventMutationVariables>(DeleteEventDocument);
};
export const DeletePostDocument = gql`
    mutation DeletePost($id: Int!) {
  deletePost(id: $id)
}
    `;

export function useDeletePostMutation() {
  return Urql.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const LoginDocument = gql`
    mutation Login($options: LoginInput!) {
  login(options: $options) {
    user {
      ...RegularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($options: RegisterInput!) {
  register(options: $options) {
    user {
      ...RegularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const UpdateEventDocument = gql`
    mutation UpdateEvent($id: Int!, $options: UpdateEventInput!) {
  updateEvent(id: $id, options: $options) {
    ...RegularEvent
  }
}
    ${RegularEventFragmentDoc}`;

export function useUpdateEventMutation() {
  return Urql.useMutation<UpdateEventMutation, UpdateEventMutationVariables>(UpdateEventDocument);
};
export const UpdatePostDocument = gql`
    mutation UpdatePost($id: Int!, $options: PostInput!) {
  updatePost(id: $id, options: $options) {
    id
    title
    text
    textSnippet
  }
}
    `;

export function useUpdatePostMutation() {
  return Urql.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument);
};
export const UpdateSaDocument = gql`
    mutation UpdateSA($id: Int!) {
  updateSA(id: $id)
}
    `;

export function useUpdateSaMutation() {
  return Urql.useMutation<UpdateSaMutation, UpdateSaMutationVariables>(UpdateSaDocument);
};
export const VoteDocument = gql`
    mutation Vote($postId: Int!, $value: Int!) {
  vote(postId: $postId, value: $value)
}
    `;

export function useVoteMutation() {
  return Urql.useMutation<VoteMutation, VoteMutationVariables>(VoteDocument);
};
export const EventDocument = gql`
    query Event($id: Int!) {
  event(id: $id) {
    ...RegularEvent
  }
}
    ${RegularEventFragmentDoc}`;

export function useEventQuery(options: Omit<Urql.UseQueryArgs<EventQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<EventQuery>({ query: EventDocument, ...options });
};
export const EventsDocument = gql`
    query Events($limit: Int!, $cursor: String) {
  events(limit: $limit, cursor: $cursor) {
    hasMore
    events {
      ...RegularEvent
    }
  }
}
    ${RegularEventFragmentDoc}`;

export function useEventsQuery(options: Omit<Urql.UseQueryArgs<EventsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<EventsQuery>({ query: EventsDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const PostDocument = gql`
    query Post($id: Int!) {
  post(id: $id) {
    id
    createdAt
    updatedAt
    title
    text
    points
    creator {
      id
      firstName
      lastName
      email
    }
    voteStatus
  }
}
    `;

export function usePostQuery(options: Omit<Urql.UseQueryArgs<PostQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PostQuery>({ query: PostDocument, ...options });
};
export const PostsDocument = gql`
    query Posts($limit: Int!, $cursor: String) {
  posts(limit: $limit, cursor: $cursor) {
    hasMore
    posts {
      ...PostSnippet
    }
  }
}
    ${PostSnippetFragmentDoc}`;

export function usePostsQuery(options: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PostsQuery>({ query: PostsDocument, ...options });
};