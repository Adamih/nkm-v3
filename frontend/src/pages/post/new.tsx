import React from "react";
import { Formik, Form } from "formik";
import { InputField } from "../../components/InputField";
import { Box, Button } from "@chakra-ui/core";
import { ErrorField } from "../../components/ErrorField";
import { useRouter } from "next/router";
import { useCreatePostMutation } from "../../generated/graphql";
import { Layout } from "../../components/Layout";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useIsAuth } from "../../utils/useIsAuth";
import { GraphQLError } from "graphql";

const CreatePost: React.FC<{}> = ({}) => {
  const [, createPost] = useCreatePostMutation();
  const router = useRouter();
  useIsAuth();

  return (
    <Layout>
      <Formik
        initialValues={{ title: "", text: "", error: "" }}
        onSubmit={async ({ error, ...values }, { setErrors }) => {
          const response = await createPost({ options: values });
          if (response.error) {
            const [err] = response.error.graphQLErrors;
            // Display a general error message.
            setErrors({ error: err.message });
          } else if (response.data?.createPost) {
            // Post created
            router.push("/post");
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

            <Button type="submit" isLoading={isSubmitting} colorScheme="teal">
              Create
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreatePost);
