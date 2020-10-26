import { Box, IconButton, Link } from "@chakra-ui/core";
import React from "react";
import NextLink from "next/link";
import { useDeletePostMutation, useMeQuery } from "../generated/graphql";

interface EditDeletePostBtnsProps {
  id: number;
  creatorId: number;
}

export const EditDeletePostBtns: React.FC<EditDeletePostBtnsProps> = ({ id, creatorId }) => {
  const [{ data: meData }] = useMeQuery();
  const [, deletePost] = useDeletePostMutation();

  if (meData?.me?.id !== creatorId) {
    return null;
  }

  return (
    <Box>
      <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
        <IconButton as={Link} mr={4} icon="edit" aria-label="Edit Post" />
      </NextLink>
      <IconButton
        icon="delete"
        aria-label="Delete Post"
        onClick={() => {
          deletePost({ id });
        }}
      />
    </Box>
  )
}
