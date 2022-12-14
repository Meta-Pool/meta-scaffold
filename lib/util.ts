import moment from "moment";
import { providers } from "near-api-js";
import { getTransactionLastResult } from "near-api-js/lib/providers";
import { TransactionStatusResult } from "../types/transactions.types";
import { nearConfig, provider } from "./near";

export const decodeJsonRpcData = (data: any) => {
  let res = "";
  for (let i = 0; i < data.length; i++) {
    res += String.fromCharCode(data[i]);
  }
  return JSON.parse(res);
};

export const encodeJsonRpcData = (data: any) => {
  return Buffer.from(JSON.stringify(data)).toString("base64");
};

/**
 * convert nears expressed as a js-number with MAX 4 decimals into a yoctos-string
 * @param n amount in near MAX 6 DECIMALS
 */
export function ntoy(n: number) {
  let by1e6 = Math.round(n * 1e6).toString(); // near * 1e6 - round
  let yoctosText = by1e6 + "0".repeat(18); //  mul by 1e18 => yoctos = near * 1e(6+18)
  return yoctosText;
}

/**
 * returns amount truncated to 4 decimal places
 * @param yoctos amount expressed in yoctos
 */
export function yton(yoctos: string) {
  if (!yoctos) return 0;
  if (yoctos.indexOf(".") !== -1)
    throw new Error("a yocto string can't have a decimal point: " + yoctos);
  let negative = false;
  if (yoctos.startsWith("-")) {
    negative = true;
    yoctos = yoctos.slice(1);
  }
  let padded = yoctos.padStart(25, "0"); //at least 0.xxx
  let nearsText = padded.slice(0, -24) + "." + padded.slice(-24, -20); //add decimal point. Equivalent to near=yoctos/1e24 and truncate to 4 dec places
  return Number(nearsText) * (negative ? -1 : 1);
}

/**
 * returns near amount in dollars. Result is truncated, default to 2 decimal places
 * @param value amount expressed in yoctos
 * @param nearPrice near price in dollars
 * @param decimals decimals to truncate result value. default to 2
 */
export const yoctoToDollarStr = (
  value: string,
  nearPrice: number,
  decimals: number = 3
) => {
  const result = yton(value) * nearPrice;
  return result.toLocaleString();
};

/**
 * returns near amount formatted in locale string. Result is truncated, default to 4 decimal places
 * @param value amount expressed in yoctos
 * @param decimals decimals to truncate result value. default to 2
 */
export const formatToLocaleNear = (value: number, decimals: number = 4) => {
  return value.toLocaleString(undefined, {
    maximumFractionDigits: decimals,
    minimumFractionDigits: 0,
  });
};

export const getTxFunctionCallMethod = (
  finalExecOutcome: providers.FinalExecutionOutcome
) => {
  let method: string | undefined = undefined;
  if (finalExecOutcome.transaction?.actions?.length) {
    const actions = finalExecOutcome.transaction.actions;
    //recover methodName of first FunctionCall action
    for (let n = 0; n < actions.length; n++) {
      let item = actions[n];
      if ("FunctionCall" in item) {
        method = item.FunctionCall.method_name;
        break;
      }
    }
  }
  return method;
};

export const getLogsAndErrorsFromReceipts = (txResult: any) => {
  let result = [];
  try {
    for (let ro of txResult.receipts_outcome) {
      //get logs
      for (let logLine of ro.outcome.logs) {
        result.push(logLine);
      }
      //check status.Failure
      if (ro.outcome.status.Failure) {
        result.push(JSON.stringify(ro.outcome.status.Failure));
      }
    }
  } catch (ex) {
    result.push("internal error parsing result outcome");
  } finally {
    return result.join("\n");
  }
};

export const getPanicError = (txResult: any) => {
  try {
    for (let ro of txResult.receipts_outcome) {
      //check status.Failure
      if (ro.outcome.status.Failure) {
        return formatJSONErr(ro.outcome.status.Failure);
      }
    }
    return "";
  } catch (ex) {
    return "internal error parsing result outcome";
  }
};

export const getPanicErrorFromText = (text: string) => {
  let result = text;
  const KEY = "panicked at ";
  const kl = KEY.length;
  let n = text.indexOf(KEY);
  if (n > 0 && n < text.length - kl - 5) {
    const i = text.indexOf("'", n + kl + 4);
    const cut = text.slice(n + kl, i);
    if (cut.trim().length > 5) {
      //debug: console.error(text.slice(n, i + 80)) //show info in the console before removing extra info
      result = cut;
    }
  }
  return result;
};

export const formatJSONErr = (obj: any) => {
  let text = JSON.stringify(obj);
  text = text.replace(/{/g, " ");
  text = text.replace(/}/g, " ");
  text = text.replace(/"/g, "");

  //---------
  //try some enhancements
  //---------
  //convert yoctoNEAR to near
  const largeNumbersFound = text.match(/\d{14,50}/g);
  if (largeNumbersFound) {
    for (const matches of largeNumbersFound) {
      const parts = matches.split(" ");
      const yoctoString = parts.pop() || "";
      if (yoctoString.length >= 20) {
        // convert to NEAR
        text = text.replace(
          new RegExp(yoctoString, "g"),
          yton(yoctoString).toString()
        );
      }
    }
  }

  //if panicked-at: return relevant info only
  //debug: console.error(text); //show info in the console before removing extra info
  text = getPanicErrorFromText(text);
  return text;
};

export const getTxStatus = async (
  txHash: string,
  account_id: string
): Promise<TransactionStatusResult> => {
  // const decodedTxHash = utils.serialize.base_decode(txHash);
  const finalExecutionOutcome = await provider.txStatus(txHash, account_id);
  const txUrl = `${nearConfig.explorerUrl}/transactions/${txHash}`;
  const method = getTxFunctionCallMethod(finalExecutionOutcome);
  const panicError = getPanicError(finalExecutionOutcome);
  if (!finalExecutionOutcome) {
    return { found: false };
  }
  if (panicError) {
    return {
      success: false,
      found: true,
      errorMessage: panicError,
      method: method,
      transactionExplorerUrl: txUrl,
    };
  }
  return {
    success: true,
    found: true,
    data: getTransactionLastResult(finalExecutionOutcome),
    method: method,
    finalExecutionOutcome: finalExecutionOutcome,
    transactionExplorerUrl: txUrl,
  };
};

export const formatTimestamp = (timestamp: number) => {
  return moment(timestamp).format("YYYY/MM/DD HH:MM")
}
