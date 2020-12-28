import {
  Alert,
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
} from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import React, { useState } from "react";
import { PostActionButtons } from "../components/PostActionButtons";
import { Layout } from "../components/Layout";
import { VoteSection } from "../components/VoteSection";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as null | string,
  });
  const [{ data, fetching }] = usePostsQuery({
    variables,
  });

  return <Layout>Hello, world!</Layout>;
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
