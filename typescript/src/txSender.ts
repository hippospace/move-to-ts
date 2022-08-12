import { AptosClient, AptosAccount, Types } from "aptos";
import { Transaction, UserTransaction, WriteSetChange_WriteResource } from "aptos/dist/generated";
import { AptosParserRepo, StructInfoType } from "./parserRepo";
import { StructTag } from "./typeTag";

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
  /*
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
  */
  return {
    type: "script_function_payload",
    function: funcname,
    type_arguments: typeArguments,
    arguments: args,
  }
}

export async function sendPayloadTx(
  client: AptosClient, 
  account: AptosAccount, 
  payload: Types.TransactionPayload, 
  max_gas=1000
){
  console.log("Building tx...");
  const txnRequest = await client.generateTransaction(account.address(), payload, {max_gas_amount: `${max_gas}`});
  console.log("Built tx");
  const signedTxn = await client.signTransaction(account, txnRequest);
  console.log("Submitting...");
  const txnResult = await client.submitTransaction(signedTxn);
  console.log("Submitted");
  await client.waitForTransaction(txnResult.hash);
  console.log("Confirmed");
  const txDetails = (await client.getTransactionByHash(txnResult.hash)) as Types.UserTransaction;
  console.log(txDetails);
}

export async function simulatePayloadTx(
  client: AptosClient, 
  account: AptosAccount, 
  payload: Types.TransactionPayload, 
  max_gas=1000
){
  const txnRequest = await client.generateTransaction(account.address(), payload, {max_gas_amount: `${max_gas}`});
  const outputs = await client.simulateTransaction(account, txnRequest);
  return outputs[0];
}

export function takeSimulationValue<T>(tx: UserTransaction, tag: StructTag, repo: AptosParserRepo): T {
  if (!tx.success) {
    throw new Error("Simulation failed");
  }
  const valueData = tx.changes.filter(change => {
    if (change.type !== 'write_resource') {
      return false;
    }
    const wr = change as WriteSetChange_WriteResource;
    return wr.data.type === tag.getAptosMoveTypeTag();
  })
  if (valueData.length === 0) {
    throw new Error("Did not find output resource");
  }
  if (valueData.length > 1) {
    throw new Error("Found multiple output resource");
  }
  const wr = valueData[0] as WriteSetChange_WriteResource;
  return repo.parse(wr.data.data, tag) as T;
}