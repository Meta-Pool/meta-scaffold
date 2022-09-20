import * as React from "react";
import { useState, useEffect } from "react";
import {
  Button,
  Text,
  ButtonProps,
  Box,
  HStack,
  Container,
  Spacer,
  Square,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  IconButton,
  useBreakpointValue,
  Divider,
} from "@chakra-ui/react";
import Link from "next/link";
import { HamburgerIcon } from "@chakra-ui/icons";
import { getNearConfig } from "../lib/near";
import { colors } from "../constants/colors";
import { useStore as useBalance } from "../stores/balance";
import { useRouter } from "next/router";
import { formatToLocaleNear } from "../lib/util";
import { useWalletSelector } from "../contexts/WalletSelectorContext";
import { AccountView } from "near-api-js/lib/providers/provider";
import { getBalance } from "../lib/metapool";

export type Account = AccountView & {
  account_id: string;
};

const Header: React.FC<ButtonProps> = () => {
  const { balance, setBalance } = useBalance();
  const [signInAccountId, setSignInAccountId] = useState(null);
  const [account, setAccount] = useState<Account | null>(null);

  const isDesktop = useBreakpointValue({ base: false, md: true });
  const { selector, modal, accounts, accountId } = useWalletSelector();

  const router = useRouter();
  const nearConfig = getNearConfig();

  const handleSignIn = () => {
    modal.show();
  };

  const handleSwitchWallet = () => {
    modal.show();
  };

  const handleSignOut = async () => {
    const wallet = await selector.wallet();

    wallet.signOut().catch((err) => {
      console.log("Failed to sign out");
      console.error(err);
    });
  };

  useEffect(() => {
    (async () => {
      try {
        if (selector.isSignedIn()) {
          const balance = await getBalance();
          setBalance(balance);
        }
      } catch (e) {
        console.error(e);
      }
    })(); 
  }, []);

  return (
    <Box as="section" pb={{ base: "12", md: "12" }}>
      <Box boxShadow={"sm"} as="nav" alignContent="flex-end">
        <Container maxW="container.2xl" py={{ base: "3", lg: "4" }}>
          <HStack justify="space-between">
            <Image
              boxSize={"50px"}
              alt={"logo"}
              src={"./logo.png"}
            ></Image>
            <Text>META Scaffold</Text>
            <Spacer></Spacer>
            <HStack display={{ base: "none", md: "block" }}>
              <Link href="/">Home</Link>
             < Link href="/faq">FAQ</Link>
              <Spacer></Spacer>
            </HStack>
            {selector?.isSignedIn() && (
              <HStack
                onClick={() => router.push(`/`)}
                cursor="pointer"
                alignItems="center"
              >
                <Text>Hi</Text>
                <Text
                  fontWeight={500}
                  p={"10px 16px"}
                  backgroundColor={colors.secundary + ".900"}
                >
                  {accountId}
                </Text>
              </HStack>
            )}
            <Spacer />
            {selector?.isSignedIn() ? (
              <HStack spacing={10}>
                <HStack>
                  <Square minW="30px">
                    <Image
                      boxSize="20px"
                      objectFit="cover"
                      src="/stnear.svg"
                      alt="stnear"
                    />
                  </Square>
                  <Text>{formatToLocaleNear(balance)}</Text>
                </HStack>

                <Menu>
                  <MenuButton
                    as={IconButton}
                    icon={<HamburgerIcon h="22px" />}
                    variant="none"
                  />
                  <MenuList>
                    {selector?.isSignedIn() && (
                      <>
                        <MenuItem
                          fontSize={"xl"}
                          onClick={() => router.push("/")}
                        >
                          Home
                        </MenuItem>
                        <MenuItem
                          fontSize={"xl"}
                          onClick={() => router.push("/faq")}
                        >
                          FAQ
                        </MenuItem>
                        <MenuItem
                          fontSize={"xl"}
                          onClick={() => handleSignOut()}
                        >
                          Disconnect
                        </MenuItem>
                      </>
                    )}
                  </MenuList>
                </Menu>
              </HStack>
            ) : (
              <Button
                color="blue"
                borderColor="blue"
                variant="outline"
                onClick={() => handleSignIn()}
              >
                Connect Wallet
              </Button>
            )}
          </HStack>
        </Container>
      </Box>
    </Box>
  );
};

export default Header;
