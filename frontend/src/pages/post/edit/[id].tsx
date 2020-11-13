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
  usePostQuery,
  useUpdatePostMutation,
} from "../../../generated/graphql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { useGetIntId } from "../../../utils/useGetIntId";

const EditPost = ({}) => {
  const router = useRouter();
  const intId = useGetIntId();
  const [{ data, fetching }] = usePostQuery({
    pause: intId === -1,
    variables: { id: intId },
  });
  const [, updatePost] = useUpdatePostMutation();
  return (
    <Layout>
      {fetching ? (
        <Box>loading...</Box>
      ) : !data?.post ? (
        <Box>could not find post</Box>
      ) : (
        <Formik
          initialValues={{
            title: data.post.title,
            text: data.post.text,
            error: "",
          }}
          onSubmit={async ({ error, ...values }, { setErrors }) => {
            const response = await updatePost({ id: intId, options: values });
            if (response.error) {
              const [err] = response.error.graphQLErrors;
              // Display a general error message.
              setErrors({ error: err.message });
            } else if (response.data?.updatePost) {
              // Post edited
              router.back();
            } else {
              throw new GraphQLError("Something went wrong");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField
                name="title"
                label="Title"
                placeholder="What is on your mind?"
              />
              <InputField textarea name="text" label="Body" />
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

export default withUrqlClient(createUrqlClient)(EditPost);
