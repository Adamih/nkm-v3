import { Box, Button } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { GraphQLError } from "graphql";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { ErrorField } from "../../../components/ErrorField";
import { InputField } from "../../../components/InputField";
import { Layout } from "../../../components/Layout";
import {
  useUpdateWorkShiftMutation,
  useWorkShiftQuery,
} from "../../../generated/graphql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { useGetIntId } from "../../../utils/useGetIntId";

const EditWorkShift = ({}) => {
  const router = useRouter();
  const intId = useGetIntId();
  const [{ data, fetching }] = useWorkShiftQuery({
    pause: intId === -1,
    variables: { id: intId },
  });
  const [, updateWorkShift] = useUpdateWorkShiftMutation();
  return (
    <Layout>
      {fetching ? (
        <Box>loading...</Box>
      ) : !data?.workShift ? (
        <Box>could not find shift</Box>
      ) : (
        <Formik
          initialValues={{
            title: data.workShift.title,
            notes: data.workShift.notes,
            error: "",
          }}
          onSubmit={async ({ error, ...values }, { setErrors }) => {
            const response = await updateWorkShift({
              id: intId,
              options: values,
            });
            if (response.error) {
              const [err] = response.error.graphQLErrors;
              // Display a general error message.
              setErrors({ error: err.message });
            } else if (response.data?.updateWorkShift) {
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
                textarea
                name="notes"
                label="Notes"
                placeholder="Specific details about the event"
              />
              <Box mt="4" mb="4">
                <ErrorField name="error" />
              </Box>

              <Button
                type="submit"
                isLoading={isSubmitting}
                variantColor="teal"
              >
                Update
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(EditWorkShift);
