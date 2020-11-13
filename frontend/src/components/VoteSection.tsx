import { Flex, IconButton } from "@chakra-ui/core";
import React from "react";
import { useState } from "react";
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";

interface VoteSectionProps {
  post: PostSnippetFragment;
}

const points = {
  up: 1,
  down: -1,
};

export const VoteSection: React.FC<VoteSectionProps> = ({ post }) => {
  const [, vote] = useVoteMutation();
  const [loadingState, setLoadingState] = useState<
    "upvote-loading" | "downvote-loading" | "not-loading"
  >("not-loading");
  return (
    <Flex direction="column" justifyContent="center" alignItems="center" mr={4}>
      <IconButton
        onClick={async () => {
          if (post.voteStatus === 1) return;
          setLoadingState("upvote-loading");
          await vote({ postId: post.id, value: points.up });
          setLoadingState("not-loading");
        }}
        isLoading={loadingState === "upvote-loading"}
        variantColor={post.voteStatus === 1 ? "green" : undefined}
        variant="ghost"
        icon="chevron-up"
        aria-label="Upvote post"
        size="sm"
      />
      {post.points}
      <IconButton
        onClick={async () => {
          if (post.voteStatus === -1) return;
          setLoadingState("downvote-loading");
          await vote({ postId: post.id, value: points.down });
          setLoadingState("not-loading");
        }}
        isLoading={loadingState === "downvote-loading"}
        variantColor={post.voteStatus === -1 ? "red" : undefined}
        variant="ghost"
        icon="chevron-down"
        aria-label="Downvote post"
        size="sm"
      />
    </Flex>
  );
};
