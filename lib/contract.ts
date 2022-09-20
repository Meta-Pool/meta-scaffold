import {
  viewMethods,
} from "./methods";
import { callViewMethod, CONTRACT_ID } from "./near";
const contractId: string = CONTRACT_ID!;

export const example = async () => {
  const account_id = window.account_id;
  return callViewMethod(
    viewMethods.getUserMates,
    {
      account_id: account_id!,
    },
    contractId
  );
};