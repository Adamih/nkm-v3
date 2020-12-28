import React from "react";
import NextLink from "next/link";
import {
  Event,
  useCreateShiftMutation,
  useDeleteEventMutation,
  useEventQuery,
  useMeQuery,
  useUpdateSaMutation,
} from "../generated/graphql";
import { UserPlusIcon } from "../icons/user-plus";
import { Box, Button, IconButton, Link, Spinner } from "@chakra-ui/core";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";

interface EventActionButtonsProps {
  id: number;
}

export const EventActionButtons: React.FC<EventActionButtonsProps> = ({
  id,
  ...kwargs
}) => {
  const [, deleteEvent] = useDeleteEventMutation();
  const [, createShift] = useCreateShiftMutation();
  const [{ data: eventData, fetching: fetchingEvent }] = useEventQuery({
    variables: { id: id },
  });
  const [, updateSA] = useUpdateSaMutation();

  if (fetchingEvent || !eventData?.event) return <Spinner />;

  const event = eventData.event;

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
      {!event.hasShift && (
        <IconButton
          onClick={async () => {
            await createShift({ eventId: event.id });
          }}
          variant="ghost"
          aria-label="Register as worker"
          icon={<UserPlusIcon />}
          {...kwargs}
        />
      )}
      {!event.sa && (
        <Button
          onClick={async () => {
            await createShift({ eventId: id });
            await updateSA({ id: id });
          }}
          variant="ghost"
          aria-label="Register as SA"
          {...kwargs}
        >
          SA
        </Button>
      )}
    </Box>
  );
};
