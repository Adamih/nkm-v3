import { Box, IButton, IconButton, Link } from "@chakra-ui/core";
import React from "react";
import NextLink from "next/link";
import { useDeletePostMutation, useMeQuery } from "../generated/graphql";

interface EditDeletePostButtonsProps {
  id: number;
  creatorId: number;
  size?: IButton["size"];
}

export const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({
  id,
  creatorId,
  ...kwargs
}) => {
  const [{ data }] = useMeQuery();
  const [, deletePost] = useDeletePostMutation();

  return (
    data?.me?.id === creatorId && (
      <Box>
        <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
          <IconButton
            as={Link}
            variant="ghost"
            aria-label="Edit Post"
            icon="edit"
            {...kwargs}
          />
        </NextLink>
        <IconButton
          onClick={() => {
            deletePost({ id });
          }}
          variant="ghost"
          aria-label="Delete Post"
          icon="delete"
          {...kwargs}
        />
      </Box>
    )
  );
};
