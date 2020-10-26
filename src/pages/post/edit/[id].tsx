import { Box, Button } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../../../components/InputFields";
import { Layout } from "../../../components/Layout";
import {
  usePostQuery,
  useUpdatePostMutation,
} from "../../../generated/graphql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { usePostId } from "../../../utils/usePostId";

const EditPost = () => {
  const router = useRouter();
  const postId = usePostId();
  const [{ data, fetching }] = usePostQuery({
    pause: postId === -1,
    variables: {
      id: postId,
    },
  });

  const [, updatePost] = useUpdatePostMutation();

  if (fetching) {
    return (
      <Layout>
        <div>loading...</div>
      </Layout>
    );
  }

  if (!data?.post) {
    return (
      <Layout>
        <Box>could not find post</Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Formik
        initialValues={{ title: data.post.title, text: data.post.text }}
        onSubmit={async (values) => {
          await updatePost({ id: postId, ...values });
          router.back()
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
              Update Post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(EditPost);
