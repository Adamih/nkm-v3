import React from "react";
import { Formik, Form } from "formik";
import { Button, Box, Flex, Grid } from "@chakra-ui/core";
import { InputField } from "../components/InputField";
import { useRegisterMutation } from "../generated/graphql";
import { ErrorField } from "../components/ErrorField";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { STATUS_CODES } from "../constants";
import { Layout } from "../components/Layout";

const Register: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [, register] = useRegisterMutation();
  return (
    <Layout size="sm">
      <Formik
        initialValues={{
          email: "",
          firstName: "",
          lastName: "",
          password: "",
          error: "",
        }}
        onSubmit={async ({ error, ...values }, { setErrors }) => {
          const response = await register({ options: values });
          if (response.error) {
            const [err] = response.error.graphQLErrors;
            if (err.extensions.code === STATUS_CODES.BAD_USER_INPUT) {
              // Display the error message in the corresponding invalid input field.
              setErrors(err.extensions.exception.validationErrors);
            } else {
              // Display a general error message.
              setErrors({ error: err.message });
            }
          } else if (response.data?.register.user) {
            // User registered
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Flex flexDir="row">
              <InputField
                name="firstName"
                label="First name"
                placeholder="John"
              />
              <InputField name="lastName" label="Last name" placeholder="Doe" />
            </Flex>
            <InputField
              name="email"
              label="E-mail"
              placeholder="example@domain.com"
            />
            <InputField
              name="password"
              label="Password"
              type="password"
              placeholder="password"
            />
            <Box mt="4" mb="4">
              <ErrorField name="error" />
            </Box>

            <Button type="submit" isLoading={isSubmitting} variantColor="teal">
              register
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
