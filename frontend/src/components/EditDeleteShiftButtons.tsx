import { Box, IButton, IconButton, Link } from "@chakra-ui/core";
import React from "react";
import NextLink from "next/link";
import { useDeleteWorkShiftMutation } from "../generated/graphql";

interface EditDeleteShiftButtonsProps {
  id: number;
  size?: IButton["size"];
}

export const EditDeleteShiftButtons: React.FC<EditDeleteShiftButtonsProps> = ({
  id,
  ...kwargs
}) => {
  const [, deleteWorkShift] = useDeleteWorkShiftMutation();

  return (
    <Box>
      <NextLink href="/work-shift/edit/[id]" as={`/work-shift/edit/${id}`}>
        <IconButton
          as={Link}
          variant="ghost"
          aria-label="Edit Shift"
          icon="edit"
          {...kwargs}
        />
      </NextLink>
      <IconButton
        onClick={() => {
          deleteWorkShift({ id });
        }}
        variant="ghost"
        aria-label="Delete Shift"
        icon="delete"
        {...kwargs}
      />
    </Box>
  );
};
