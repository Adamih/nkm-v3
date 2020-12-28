import { Alert, Box, Button, Spinner } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { GraphQLError } from "graphql";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { ErrorField } from "../../../components/ErrorField";
import { InputField } from "../../../components/InputField";
import { Layout } from "../../../components/Layout";
import {
  useUpdateEventMutation,
  useEventQuery,
} from "../../../generated/graphql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { useGetIntId } from "../../../utils/useGetIntId";

const EditEvent = ({}) => {
  const router = useRouter();
  const intId = useGetIntId();
  const [{ data, fetching }] = useEventQuery({
    pause: intId === -1,
    variables: { id: intId },
  });
  const [, updateEvent] = useUpdateEventMutation();
  return (
    <Layout>
      {fetching ? (
        <Spinner />
      ) : !data?.event ? (
        <Alert status="error">Could not find event. </Alert>
      ) : (
        <Formik
          initialValues={{
            title: data.event.title,
            locale: data.event.locale,
            notes: data.event.notes,
            error: "",
          }}
          onSubmit={async ({ error, ...values }, { setErrors }) => {
            const response = await updateEvent({
              id: intId,
              options: values,
            });
            if (response.error) {
              const [err] = response.error.graphQLErrors;
              // Display a general error message.
              setErrors({ error: err.message });
            } else if (response.data?.updateEvent) {
              // Post edited
              router.back();
            } else {
              throw new GraphQLError("Something went wrong");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField name="title" label="Title" placeholder="ex. Pub" />
              <InputField
                name="locale"
                label="Locale"
                placeholder="ex. Gasquen"
              />
              <InputField
                textarea
                name="notes"
                label="Notes"
                placeholder="Specific details about the event"
              />
              <Box mt="4" mb="4">
                <ErrorField name="error" />
              </Box>

              <Button type="submit" isLoading={isSubmitting} colorScheme="teal">
                Update
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(EditEvent);
