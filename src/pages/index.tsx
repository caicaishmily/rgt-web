import { Box, Button, Flex, Heading, IconButton, Link, Stack, Text } from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import React from "react";
import { Layout } from "../components/Layout";
import { useDeletePostMutation, usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink from "next/link";
import { useState } from "react";
import UpdootSection from "../components/UpdootSection";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as null | string,
  });

  const [{ data, fetching }] = usePostsQuery({
    variables,
  });

  const [, deletePost] = useDeletePostMutation()

  if (!data && !fetching) {
    return <div>You got some query error for some reason</div>;
  }

  return (
    <Layout>
      {!data && fetching ? (
        <div>Loading...</div>
      ) : (
        <Stack>
          {data!.posts.posts.map((p) => !p ? null : (
            <Flex key={p.id} p={5} shadow="md" borderWidth="1px">
              <UpdootSection post={p} />
              <Box flex={1}>
                <NextLink href='/post/[id]' as={`/post/${p.id}`}>
                  <Link>
                    <Heading fontSize="xl">{p.title}</Heading>
                  </Link>
                </NextLink>
                <Text>posted by {p.creator.username}</Text>
                <Flex align="center">
                  <Text mt={4}>{p.textSnippet}</Text>
                  <IconButton 
                    ml="auto"
                    icon='delete' 
                    aria-label="Delete post"
                    variantColor="red" 
                    onClick={() => {
                      deletePost({ id: p.id })
                    }}
                  />
                </Flex>
              </Box>
            </Flex>
          ))}
        </Stack>
      )}

      {data && data.posts.hasMore ? (
        <Flex>
          <Button
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              });
            }}
            isLoading={fetching}
            m="auto"
            my={8}
          >
            load more
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
