import {
  Accordion,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Alert,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Link,
  Text,
} from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import { Layout } from "../../components/Layout";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useWorkShiftsQuery } from "../../generated/graphql";
import { EditDeleteShiftButtons } from "../../components/EditDeleteShiftButtons";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 8,
    cursor: null as null | string,
  });
  const [{ data, fetching }] = useWorkShiftsQuery({
    variables,
  });

  if (!fetching && !data) {
    return;
  }

  return (
    <Layout>
      <Button>New shift</Button>
      {!data && fetching ? (
        <Alert status="info">Loading...</Alert>
      ) : !data && !fetching ? (
        <Alert status="info">No work shifts currently available.</Alert>
      ) : (
        <Accordion allowMultiple={false} allowToggle={true}>
          {data.workShifts.workShifts.map(
            (s) =>
              s && (
                <AccordionItem key={s.id} shadow="md" mb={3} borderWidth="1px">
                  <AccordionHeader justifyContent="space-between" flex={1}>
                    <Link>
                      <Heading size="xs">{s.title}</Heading>
                    </Link>
                    <Flex alignItems="center" flexDir="row">
                      <Text fontSize=".5em">okt-23</Text>
                      <AccordionIcon />
                    </Flex>
                  </AccordionHeader>
                  <Divider marginY="0" paddingY="0" />
                  <AccordionPanel padding={3}>
                    <Flex justifyContent="space-between">
                      <Flex flexDir="column">
                        <Text fontSize=".5em">{"SA: Adam Henriksson"}</Text>
                        <Divider />
                        <Text fontSize=".5em">{s.notes}</Text>
                      </Flex>
                      <EditDeleteShiftButtons id={s.id} size="sm" />
                    </Flex>
                  </AccordionPanel>
                </AccordionItem>
              )
          )}
        </Accordion>
      )}
      {data && data.workShifts.hasMore && (
        <Flex>
          <Button
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor:
                  data.workShifts.workShifts[
                    data.workShifts.workShifts.length - 1
                  ].createdAt,
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
