import React from "react";
import { Formik, Form } from "formik";
import { InputField } from "../../components/InputField";
import { Box, Button, Heading } from "@chakra-ui/core";
import { ErrorField } from "../../components/ErrorField";
import { useRouter } from "next/router";
import { useCreateWorkShiftMutation } from "../../generated/graphql";
import { Layout } from "../../components/Layout";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useIsAuth } from "../../utils/useIsAuth";
import { GraphQLError } from "graphql";

const CreateWorkShift: React.FC<{}> = ({}) => {
  const [, createWorkShift] = useCreateWorkShiftMutation();
  const router = useRouter();
  useIsAuth();

  return (
    <Layout>
      <Box mb="4">
        <Heading size="lg">Create new work shift</Heading>
      </Box>
      <Formik
        initialValues={{ title: "", notes: "", error: "" }}
        onSubmit={async ({ error, ...values }, { setErrors }) => {
          const response = await createWorkShift({ options: values });
          if (response.error) {
            const [err] = response.error.graphQLErrors;
            // Display a general error message.
            setErrors({ error: err.message });
          } else if (response.data?.createWorkShift) {
            // Post created
            router.push("/work-shift");
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

            <Button type="submit" isLoading={isSubmitting} variantColor="teal">
              Create
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreateWorkShift);
