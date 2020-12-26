import React from "react";
import NextLink from "next/link";
import {
  useCreateShiftMutation,
  useDeleteEventMutation,
} from "../generated/graphql";
import { UserPlusIcon } from "../icons/user-plus";
import { Box, Button, IconButton, Link } from "@chakra-ui/core";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

interface EventActionButtonsProps {
  id: number;
}

export const EventActionButtons: React.FC<EventActionButtonsProps> = ({
  id,
  ...kwargs
}) => {
  const [, deleteEvent] = useDeleteEventMutation();
  const [, createShift] = useCreateShiftMutation();

  return (
    <Box>
      <NextLink href="/event/edit/[id]" as={`/event/edit/${id}`}>
        <IconButton
          as={Link}
          variant="ghost"
          aria-label="Edit Event"
          icon={<EditIcon />}
          {...kwargs}
        />
      </NextLink>
      <IconButton
        onClick={() => {
          deleteEvent({ id });
        }}
        variant="ghost"
        aria-label="Delete Event"
        icon={<DeleteIcon />}
        {...kwargs}
      />
      <IconButton
        onClick={() => {
          createShift({ eventId: id });
        }}
        variant="ghost"
        aria-label="Register as worker"
        icon={<UserPlusIcon />}
        {...kwargs}
      />
      <Button
        onClick={() => {}}
        variant="ghost"
        aria-label="Register as SA"
        {...kwargs}
      >
        SA
      </Button>
    </Box>
  );
};
