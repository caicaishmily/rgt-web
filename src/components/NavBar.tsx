import React from "react";
import { Box, Link, Flex, Button } from "@chakra-ui/core";
import NextLink from "next/link";
import { useMeQuery } from "../generated/graphql";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{data, fetching}] = useMeQuery()

  let body = null

  if(fetching) {

  } else if (!data?.me) {
    body = (
      <>
        <Box ml={"auto"}>
          <NextLink href="/login">
            <Link color="white" mr={2}>Login</Link>
          </NextLink>
          <NextLink href="/register">
            <Link color="white">Register</Link>
          </NextLink>
        </Box>
      </>
    )
  } else {
    body = (
      <Flex>
        <Box mr={2}>{data.me.username}</Box>
        <Button variant="link">Logout</Button>
      </Flex>
    )
  }
  
  return (
    <Flex bg="tan" p={4}>
      <Box ml={"auto"}>
        {body}
      </Box>
    </Flex>
  );
};
