import { Alert, Box, Flex, Heading } from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import React from "react";
import { EditDeletePostButtons } from "../../components/EditDeletePostButtons";
import { Layout } from "../../components/Layout";
import { VoteSection } from "../../components/VoteSection";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useGetPostFromUrl } from "../../utils/useGetPostFromUrl";

const Post = ({}) => {
  const [{ data, fetching }] = useGetPostFromUrl();

  return (
    <Layout>
      {fetching ? (
        <Alert status="info">loading...</Alert>
      ) : !data?.post ? (
        <Alert status="error">could not find post</Alert>
      ) : (
        <Flex p={5} shadow="md" borderWidth="1px">
          <Box flex={1}>
            <Heading mb={4} fontSize="xl">
              {data.post.title}
            </Heading>
            <Flex>
              <Box mb={4}>{data.post.text}</Box>
              <EditDeletePostButtons
                id={data.post.id}
                creatorId={data.post.creator.id}
              />
            </Flex>
          </Box>
        </Flex>
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
