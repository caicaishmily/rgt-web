import { Button } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputFields";
import { Wrapper } from "../components/Wrapper";
import { useCreatePostMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useIsAuth } from "../utils/useIsAuth";

const CreatePost: React.FC<{}> = ({}) => {
  const router = useRouter();
  useIsAuth();
  const [, createPost] = useCreatePostMutation();

  return (
    <Wrapper>
      <Formik
        initialValues={{ title: "", text: "" }}
        onSubmit={async (values) => {
          const { error } = await createPost({ input: values });
          if (!error) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField label="Title" placeholder="title" name="title" />
            <InputField
              textarea
              label="Body"
              placeholder="text..."
              name="text"
            />
            <Button
              type="submit"
              mt={4}
              isLoading={isSubmitting}
              variantColor="teal"
            >
              Create Post
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(CreatePost);
