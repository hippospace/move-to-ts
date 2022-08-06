import { AptosClient, AptosAccount, Types } from "aptos";

export async function sendAndWait(
  client: AptosClient,
  account: AptosAccount,
  funcname: string,
  typeArguments: string[],
  args: any[]
): Promise<Types.UserTransaction> {
  const payload = buildPayload(funcname, typeArguments, args);
  const txnRequest = await client.generateTransaction(account.address(), payload);
  const signedTxn = await client.signTransaction(account, txnRequest);
  const txnResult = await client.submitTransaction(signedTxn);
  await client.waitForTransaction(txnResult.hash);
  const txDetails = (await client.getTransactionByHash(txnResult.hash)) as Types.UserTransaction;
  return txDetails;
}

export function buildPayload(
  funcname: string,
  typeArguments: string[],
  args: any[]
): Types.TransactionPayload {
  const parts = funcname.split("::");
  if(parts.length !== 3) {
    throw new Error(`Bad funcname: ${funcname}`);
  }
  const moduleId = {
    address: parts[0],
    name: parts[1],
  }
  const funcId = {
    module: moduleId,
    name: parts[2],
  }
  return {
    type: "script_function_payload",
    function: funcId,
    type_arguments: typeArguments,
    arguments: args,
  }
}