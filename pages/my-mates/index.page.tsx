import * as React from "react";
import { HStack, SimpleGrid, Container, list } from "@chakra-ui/react";
import ErrorHandlerHash from "../../components/ErrorHandlerHash";
import Item from "./Item";
import { Mate } from "../../types/mate.types";
import { useGetUserMates } from "../../hooks/mates";
import PageLoading from "../../components/PageLoading";

const MyMates = () => {
  const {data: mates, isLoading} = useGetUserMates();
  if (isLoading) return <PageLoading />
  return (
    <>
      <Container maxW="container.xl" centerContent className="flex">
        <HStack>
          <SimpleGrid
            columns={{ base: 1, md: 2 }}
            spacing={{ base: "2rem", lg: 10 }}
          >
            {mates.map((mate: Mate, i: number) => (
              <Item key={`mate-${i}`} mate={mate} />
            ))}
          </SimpleGrid>
        </HStack>
      </Container>
      <ErrorHandlerHash></ErrorHandlerHash>
    </>
  );
};

export default MyMates;
