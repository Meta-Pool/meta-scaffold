import * as React from "react";
import {
  Button,
  Container,
  Center,
  Heading,
  Box,
  Link,
  VStack,
  Stack,
} from "@chakra-ui/react";
import { useWalletSelector } from "../../contexts/WalletSelectorContext";

const Hero = () => {
  const { modal, selector } = useWalletSelector();

  const handleSignIn = () => {
    modal.show();
  };

  return (
    <Container maxW="container.lg" className="flex">
      <Center>
        <VStack>
          <Heading
            as="h1"
            color="#0F172A"
            textAlign="center"
            lineHeight="90%"
            fontSize={{ base: "5xl", sm: "6xl", lg: "7xl" }}
            fontFamily={"'Meta Space', 'Space Grotesk'"}
          >
            forkable Meta 
            <br />
            dev stack focused 
            <br />
            on fast product iterations
          </Heading>

          <Box>
            <Stack
              direction={{ base: "column", md: "row" }}
              my={10}
              spacing="10"
            >
              {!selector?.isSignedIn() && (
                <Button
                  color="white"
                  borderColor="blue"
                  variant="solid"
                  bgColor="gray"
                  onClick={() => handleSignIn()}
                  fontSize="3xl"
                >
                  Connect Wallet
                </Button>
              )}

              <Link fontSize="3xl" href="/learn-more">
                Learn more
              </Link>
            </Stack>
          </Box>
        </VStack>
      </Center>
    </Container>
  );
};

export default Hero;
