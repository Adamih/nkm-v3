import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Alert,
  Button,
  Divider,
  Flex,
  Heading,
  Link,
  Stack,
  StackDivider,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import { Layout } from "../../components/Layout";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useEventsQuery } from "../../generated/graphql";
import { EventActionButtons } from "../../components/EventActionButtons";
import NextLink from "next/link";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 8,
    cursor: null as null | string,
  });
  const [{ data, fetching }] = useEventsQuery({
    variables,
  });

  const tstart = new Date(Date.now());
  const tend = new Date(Date.now() + 1 * 1000 * 60 * 60 * 3);

  return (
    <Layout>
      <NextLink href="/event/new">
        <Button mb={4}>New event</Button>
      </NextLink>
      {!data && fetching ? (
        <Alert status="info">Loading...</Alert>
      ) : !data && !fetching ? (
        <Alert status="info">No work shifts currently available.</Alert>
      ) : (
        <Accordion allowMultiple={false} allowToggle={true}>
          {data.events.events.map(
            (e) =>
              e && (
                <AccordionItem key={e.id} shadow="md" mb={3} borderWidth="1px">
                  <AccordionButton justifyContent="space-between" flex={1}>
                    <Heading size="xs">{e.title}</Heading>
                    <Wrap align="center">
                      <WrapItem fontSize=".6em">
                        {tstart.toDateString()}
                      </WrapItem>
                      <WrapItem fontSize=".6em">
                        {String(tstart.getHours()).padStart(2, "0")}:
                        {String(tstart.getMinutes()).padStart(2, "0")}-
                        {String(tend.getHours()).padStart(2, "0")}:
                        {String(tend.getMinutes()).padStart(2, "0")}
                      </WrapItem>
                      <AccordionIcon />
                    </Wrap>
                  </AccordionButton>
                  <Divider marginY="0" paddingY="0" />
                  <AccordionPanel padding={4}>
                    <Stack divider={<StackDivider />}>
                      <Flex>
                        <Text mr={2}>SA:</Text>
                        <Text mr={2} textTransform="capitalize">
                          {e.sa && `${e.sa.firstName} ${e.sa.lastName}`}
                        </Text>
                      </Flex>
                      <Flex>
                        <Text mr={2}>Locale:</Text>
                        <Text>{e.locale}</Text>
                      </Flex>
                      <Flex>
                        <Text mr={2}>Notes:</Text>
                        <Text>{e.notes}</Text>
                      </Flex>
                      <Flex wrap="wrap">
                        <Text mr={2}>Registered:</Text>
                        <Wrap>
                          {e.shifts.map((s) => (
                            <WrapItem>
                              <Text textTransform="capitalize">{`${s.worker.firstName} ${s.worker.lastName}`}</Text>
                            </WrapItem>
                          ))}
                        </Wrap>
                      </Flex>
                      <EventActionButtons id={e.id} />
                    </Stack>
                  </AccordionPanel>
                </AccordionItem>
              )
          )}
        </Accordion>
      )}
      {data && data.events.hasMore && (
        <Flex>
          <Button
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor:
                  data.events.events[data.events.events.length - 1].createdAt,
              });
            }}
            isLoading={fetching}
            m="auto"
            my={8}
          >
            Load more
          </Button>
        </Flex>
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Index);
