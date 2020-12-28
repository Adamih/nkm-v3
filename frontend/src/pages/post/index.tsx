import {
  Alert,
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import React, { useState } from "react";
import { PostActionButtons } from "../../components/PostActionButtons";
import { Layout } from "../../components/Layout";
import { VoteSection } from "../../components/VoteSection";
import { usePostsQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as null | string,
  });
  const [{ data, fetching }] = usePostsQuery({
    variables,
  });

  return (
    <Layout>
      <NextLink href="/post/new">
        <Button mb={4}>New post</Button>
      </NextLink>
      {fetching ? (
        <Spinner />
      ) : !data ? (
        <Alert status="info">
          No posts have been found. Create the first one!
        </Alert>
      ) : (
        <Stack spacing={8}>
          {data.posts.posts.map(
            (p) =>
              p && (
                <Flex key={p.id} p={5} shadow="md" borderWidth="1px">
                  <VoteSection post={p} />
                  <Box flex={1}>
                    <NextLink href="post/[id]" as={`post/${p.id}`}>
                      <Link>
                        <Heading fontSize="xl">{p.title}</Heading>
                      </Link>
                    </NextLink>
                    <Text>{`posted by ${p.creator.firstName} ${p.creator.lastName}`}</Text>
                    <Flex align="center" flex={1}>
                      <Text flex={1} mt={4}>
                        {p.textSnippet}
                      </Text>
                      <Box ml="auto">
                        <PostActionButtons id={p.id} creatorId={p.creator.id} />
                      </Box>
                    </Flex>
                  </Box>
                </Flex>
              )
          )}
        </Stack>
      )}
      {data && data.posts.hasMore && (
        <Flex>
          <Button
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              });
            }}
            isLoading={fetching}
            m="auto"
            my={8}
          >
            Load more
          </Button>
        </Flex>
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
