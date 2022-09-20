import {
  metaPoolMethods
} from "./methods";
import { callViewMethod, METAPOOL_CONTRACT_ID } from "./near";
import { yton } from "./util";
const contractId: string = METAPOOL_CONTRACT_ID!;

export const getMetapoolAccountInfo = async () => {
  const account_id = window.account_id;
  return callViewMethod(
    metaPoolMethods.getAccountInfo,
    {
      account_id: account_id!,
    },
    contractId
  );
};

export const getBalance = async (): Promise<number> => {
  const accountInfo = await getMetapoolAccountInfo();
  return yton(accountInfo.st_near);
};
