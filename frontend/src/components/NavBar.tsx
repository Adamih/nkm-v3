import React from "react";
import { Box, Link, Flex, Button, Heading } from "@chakra-ui/core";
import NextLink from "next/link";
import { useMeQuery, useLogoutMutation } from "../generated/graphql";
import { isServer } from "../utils/isServer";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching: meFetching }] = useMeQuery({
    pause: isServer(),
  });

  return (
    <Flex zIndex={1} position="sticky" top={0} bg="tomato" p={4}>
      <Flex align="center" m="auto" maxW="760px" flex={1}>
        <Box mr="auto">
          <Flex align="center">
            <NextLink href="/">
              <Link mr={8}>
                <Heading>NKM</Heading>
              </Link>
            </NextLink>
            <NextLink href="/event">
              <Link mr={2}>Events</Link>
            </NextLink>
            <NextLink href="/post">
              <Link mr={2}>Posts</Link>
            </NextLink>
          </Flex>
        </Box>

        <Box ml="auto">
          {!data?.me ? (
            <>
              <NextLink href="/login">
                <Link mr={2}>Login</Link>
              </NextLink>
              <NextLink href="/register">
                <Link>Register</Link>
              </NextLink>
            </>
          ) : (
            <Flex align="center">
              <Box mr={2}>{data.me.firstName}</Box>
              <Button
                onClick={() => logout()}
                isLoading={logoutFetching}
                variant="link"
              >
                Logout
              </Button>
            </Flex>
          )}
        </Box>
      </Flex>
    </Flex>
  );
};
