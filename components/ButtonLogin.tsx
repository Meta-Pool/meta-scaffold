import {
  Button,
} from "@chakra-ui/react";
import * as React from "react";
import { useWalletSelector } from "../contexts/WalletSelectorContext";

interface Props {
  text: string;
}

const ButtonLogin = (props: Props) => {
  const { selector, modal, accounts, accountId } = useWalletSelector();

  const handleSignIn = () => {
    modal.show();
  };

  return (
    <>
      <Button colorScheme="indigo" onClick={() => handleSignIn()}>
        {props && props.text ? props.text : 'Connect Wallet'}
      </Button>
    </>
  );
};

export default ButtonLogin;
