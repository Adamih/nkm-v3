import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import React from "react";
import NextLink from "next/link";
import { useDeletePostMutation, useMeQuery } from "../generated/graphql";
import { Box, IconButton, Link } from "@chakra-ui/core";

interface PostActionButtonsProps {
  id: number;
  creatorId: number;
}

export const PostActionButtons: React.FC<PostActionButtonsProps> = ({
  id,
  creatorId,
  ...kwargs
}) => {
  const [{ data }] = useMeQuery();
  const [, deletePost] = useDeletePostMutation();

  return (
    data?.me?.id === creatorId && (
      <Box>
        <NextLink href="/post/[id]/edit" as={`/post/${id}/edit`}>
          <IconButton
            as={Link}
            variant="ghost"
            aria-label="Edit Post"
            icon={<EditIcon />}
            {...kwargs}
          />
        </NextLink>
        <IconButton
          onClick={() => {
            deletePost({ id });
          }}
          variant="ghost"
          aria-label="Delete Post"
          icon={<DeleteIcon />}
          {...kwargs}
        />
      </Box>
    )
  );
};
