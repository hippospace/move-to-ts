import { AptosClient, AptosAccount, Types, TxnBuilderTypes, HexString, BCS } from "aptos";
import { TypeTagParser } from "aptos/dist/transaction_builder/builder_utils";
import { UserTransaction, WriteSetChange_WriteResource } from "aptos/dist/generated";
import { AccountAddress, Identifier, ModuleId, EntryFunction } from "aptos/dist/transaction_builder/aptos_types";
import { AptosParserRepo } from "./parserRepo";
import { AtomicTypeTag, StructTag, TypeTag } from "./typeTag";
import { U128, U64, U8 } from "./builtinTypes";
import { ActualStringClass, serializeMoveValue, serializeMoveValueWithoutTag, serializeVector } from ".";

type AcceptedScriptFuncArgType = any[] | U8 | U64 | U128 | HexString | boolean | ActualStringClass;

export function buildPayload(
  moduleAddress: HexString,
  moduleName: string,
  funcName: string,
  typeArguments: string[],
  args: AcceptedScriptFuncArgType[],
): TxnBuilderTypes.TransactionPayloadEntryFunction {

  const bytes = args.map(arg => {
    const serializer = new BCS.Serializer();
    serializeMoveValueWithoutTag(serializer, arg);
    return serializer.getBytes();
  });

  
  const scriptFunction = new EntryFunction(
    new ModuleId(new AccountAddress(moduleAddress.toUint8Array()), new Identifier(moduleName)),
    new Identifier(funcName),
    typeArguments.map(str => new TypeTagParser(str).parseTypeTag()),
    bytes,
  );
  return new TxnBuilderTypes.TransactionPayloadEntryFunction(scriptFunction);
}

export async function sendPayloadTx(
  client: AptosClient, 
  account: AptosAccount, 
  payload: TxnBuilderTypes.TransactionPayload, 
  max_gas=1000
){
  console.log("Building tx...");
  // RawTransaction
  const rawTxn = await client.generateRawTransaction(account.address(), payload, {maxGasAmount: BigInt(max_gas)});
  // Signed BCS representation
  const bcsTxn = AptosClient.generateBCSTransaction(account, rawTxn);
  console.log("Submitting...");
  const txnResult = await client.submitSignedBCSTransaction(bcsTxn);
  console.log("Submitted");
  await client.waitForTransaction(txnResult.hash);
  console.log("Confirmed");
  const txDetails = (await client.getTransactionByHash(txnResult.hash)) as Types.UserTransaction;
  console.log(txDetails);
  return txDetails;
}

export async function simulatePayloadTx(
  client: AptosClient, 
  account: AptosAccount, 
  payload: TxnBuilderTypes.TransactionPayload, 
  max_gas=1000
){
  const rawTxn = await client.generateRawTransaction(account.address(), payload, {maxGasAmount: BigInt(max_gas)});
  const bcsTxn = AptosClient.generateBCSSimulation(account, rawTxn);
  const outputs = await client.submitBCSSimulation(bcsTxn);
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