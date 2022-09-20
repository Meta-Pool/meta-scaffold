import {
  keyStores,
  connect,
  WalletConnection,
  providers,
  ConnectConfig,
} from "near-api-js";
import {
  getTransactionLastResult,
} from "near-api-js/lib/providers";
import { getConfig } from "../config";
import { TransactionStatusResult } from "../types/transactions.types";
import { tokenMethods } from "./methods";

import {
  decodeJsonRpcData,
  encodeJsonRpcData,
  getPanicError,
  getPanicErrorFromText,
  getTxFunctionCallMethod,
} from "./util";

export const CONTRACT_ID = process.env.NEXT_PUBLIC_CONTRACT_ID;
export const METAPOOL_CONTRACT_ID = process.env.NEXT_PUBLIC_METAPOOL_CONTRACT_ID;
export const META_CONTRACT_ID =  process.env.NEXT_PUBLIC_META_CONTRACT_ID;

export const GAS = "200000000000000";
export const DEPOSIT = "1";
const env = process.env.NEXT_PUBLIC_VERCEL_ENV || 'production';
console.log("@env", env);

export const nearConfig = getConfig(env);
export const NETWORK_ID =  nearConfig.networkId;
export const provider = new providers.JsonRpcProvider({ url: nearConfig.nodeUrl });

export const getNearConfig = () => {
  return nearConfig;
};

export const callChangeMethod = async (method: string, args: any, receiverId: string|undefined = undefined, deposit: string = '' ) => {
  const wallet = window.wallet;
  const account_id = window.account_id;
  // blockerStore.setState({isActive: true})
  const result = await wallet!
    .signAndSendTransaction({
      signerId: account_id!,
      receiverId: receiverId,
      actions: [
        {
          type: "FunctionCall",
          params: {
            methodName: method,
            args: args,
            gas: GAS,
            deposit: deposit,
          },
        },
      ],
    })
    .catch((err) => {
      console.log(
        `Failed to call contract -- method: ${method} - error message: ${err.message}`
      );
      throw getPanicErrorFromText(err.message);
    }).finally(()=> {
      // blockerStore.setState({isActive: false})
    });
  if (result instanceof Object) {
    return result;
  }
  return null;
};

export const callViewMethod = async (method: string, args: any, contractId: string) => {
  const response: any = await provider.query({
    request_type: "call_function",
    finality: "optimistic",
    account_id: contractId,
    method_name: method,
    args_base64: encodeJsonRpcData(args),
  });

  return decodeJsonRpcData(response.result);
};

export const getMetadata = async(contractId: string) => {
  return callViewMethod(tokenMethods.getMetadata, {}, contractId)
}



