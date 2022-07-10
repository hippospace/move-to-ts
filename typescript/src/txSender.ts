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
  const txDetails = (await client.getTransaction(txnResult.hash)) as Types.UserTransaction;
  return txDetails;
}

export function buildPayload(
  funcname: string,
  typeArguments: string[],
  args: any[]
): Types.TransactionPayload {
  return {
    type: "script_function_payload",
    function: funcname,
    type_arguments: typeArguments,
    arguments: args,
  }
}