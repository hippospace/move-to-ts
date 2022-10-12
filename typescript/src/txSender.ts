import {
  AptosClient,
  AptosAccount,
  Types,
  TxnBuilderTypes,
  HexString,
  BCS,
  TransactionBuilderEd25519, OptionalTransactionArgs,
} from "aptos";
import { TypeTagParser } from "./builder_utils";

const { AccountAddress, Identifier, ModuleId, EntryFunction } = TxnBuilderTypes;

import { AptosParserRepo } from "./parserRepo";
import { StructTag } from "./typeTag";
import { U128, U64, U8 } from "./builtinTypes";
import {payloadArg} from "./builtinFuncs";
import {ActualStringClass} from "./nativeFuncs";
import {serializeMoveValueWithoutTag} from "./bcs";

type AcceptedScriptFuncArgType =
  | any[]
  | U8
  | U64
  | U128
  | HexString
  | boolean
  | ActualStringClass;

export type OptionTransaction = {
  maxGasAmount?: number;
  gasUnitPrice?: number;
  // in s
  expireTimestamp?: number;
}

export function buildPayload(
  moduleAddress: HexString,
  moduleName: string,
  funcName: string,
  typeArguments: string[],
  args: AcceptedScriptFuncArgType[],
  isJSON = false
):
  | TxnBuilderTypes.TransactionPayloadEntryFunction
  | Types.TransactionPayload_EntryFunctionPayload {
  if (isJSON) {
    // JSON
    return {
      type: "entry_function_payload",
      function: `${moduleAddress.toShortString()}::${moduleName}::${funcName}`,
      type_arguments: typeArguments,
      arguments: args.map((v) => payloadArg(v)),
    };
  } else {
    // BCS
    const bytes = args.map((arg) => {
      const serializer = new BCS.Serializer();
      serializeMoveValueWithoutTag(serializer, arg);
      return serializer.getBytes();
    });

    const scriptFunction = new EntryFunction(
      new ModuleId(
        new AccountAddress(moduleAddress.toUint8Array()),
        new Identifier(moduleName)
      ),
      new Identifier(funcName),
      typeArguments.map((str) => new TypeTagParser(str).parseTypeTag()),
      bytes
    );
    return new TxnBuilderTypes.TransactionPayloadEntryFunction(scriptFunction);
  }
}

function toOptionalTransactionArgs(option?: OptionTransaction){
  if (option){
    const extraArgs = {} as OptionalTransactionArgs
    if (option.maxGasAmount){
      extraArgs.maxGasAmount = BigInt(option.maxGasAmount);
    }
    if (option.gasUnitPrice) {
      extraArgs.gasUnitPrice = BigInt(option.gasUnitPrice);
    }
    if (option.expireTimestamp) {
      extraArgs.expireTimestamp = BigInt(option.expireTimestamp);
    }
    return extraArgs
  }
}
function toSubmitTransactionRequest(option?: OptionTransaction){
  if (option){
    const options = {} as Types.SubmitTransactionRequest
    if (option.maxGasAmount){
      options.max_gas_amount = option.maxGasAmount.toString()
    }

    if (option.gasUnitPrice){
      options.gas_unit_price = option.gasUnitPrice.toString()
    }
    if (option.expireTimestamp){
      options.expiration_timestamp_secs = option.expireTimestamp.toString()
    }
    return options
  }
}

export async function sendPayloadTx(
    client: AptosClient,
    account: AptosAccount,
    payload:
        | TxnBuilderTypes.TransactionPayload
        | Types.TransactionPayload_EntryFunctionPayload,
    option?: OptionTransaction
) {
  return await sendPayloadTxAndLog(client, account, payload, option, false)
}

export async function sendPayloadTxAndLog(
  client: AptosClient,
  account: AptosAccount,
  payload:
    | TxnBuilderTypes.TransactionPayload
    | Types.TransactionPayload_EntryFunctionPayload,
  option?: OptionTransaction,
  log = true,
) {
  // send BCS transaction
  if (payload instanceof TxnBuilderTypes.TransactionPayloadEntryFunction) {
    // RawTransaction

    const rawTxn = await client.generateRawTransaction(
      account.address(),
      payload,
      toOptionalTransactionArgs(option)
    );
    // Signed BCS representation
    const bcsTxn = AptosClient.generateBCSTransaction(account, rawTxn);
    const txnResult = await client.submitSignedBCSTransaction(bcsTxn);
    await client.waitForTransaction(txnResult.hash);
    const txDetails = (await client.getTransactionByHash(
      txnResult.hash
    )) as Types.UserTransaction;
    if (log) {
      console.log(txDetails);
    }
    return txDetails;
  }
  // send JSON transaction
  else {
    const pld = payload as Types.TransactionPayload_EntryFunctionPayload;
    // RawTransaction

    const txn = await client.generateTransaction(account.address(), pld, toSubmitTransactionRequest(option));
    // Signed json representation
    const signedTxn = await client.signTransaction(account, txn);
    const txnResult = await client.submitTransaction(signedTxn);
    await client.waitForTransaction(txnResult.hash);
    const txDetails = (await client.getTransactionByHash(
      txnResult.hash
    )) as Types.UserTransaction;
    if (log) {
      console.log(txDetails);
    }
    return txDetails;
  }
}

export type SimulationKeys = {
  pubkey: HexString;
  address: HexString;
};

export const SIM_KEYS: SimulationKeys = {
  pubkey: new HexString('0xf9edd14bcf93b878ee1b97e68f336b96122665af351318a52ae20c7fbf89f8f2'),
  address: new HexString('0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8'),
}

export function getSimulationKeys(account: AptosAccount): SimulationKeys {
  return {
    pubkey: account.pubKey(),
    address: account.address(),
  };
}

export async function simulatePayloadTx(
    client: AptosClient,
    keys: SimulationKeys,
    payload:
        | TxnBuilderTypes.TransactionPayload
        | Types.TransactionPayload_EntryFunctionPayload,
    option?: OptionTransaction
){
  return simulatePayloadTxAndLog(client, keys, payload, option, false);
}

export async function simulatePayloadTxAndLog(
  client: AptosClient,
  keys: SimulationKeys,
  payload:
    | TxnBuilderTypes.TransactionPayload
    | Types.TransactionPayload_EntryFunctionPayload,
  option?: OptionTransaction,
  log = true
) {
  if (payload instanceof TxnBuilderTypes.TransactionPayload) {
    const rawTxn = await client.generateRawTransaction(keys.address, payload, toOptionalTransactionArgs(option));
    const bcsTxn = generateBCSSimulation(keys.pubkey, rawTxn);
    const outputs = await client.submitBCSSimulation(bcsTxn);
    if (log){
      console.log(outputs[0])
    }
    return outputs[0];
  } else {
    const pld = payload as Types.TransactionPayload_EntryFunctionPayload;
    const txn = await client.generateTransaction(keys.address, pld, toSubmitTransactionRequest(option));
    const transactionSignature: Types.TransactionSignature = {
      type: "ed25519_signature",
      public_key: keys.pubkey.hex(),
      // use invalid signature for simulation
      signature: HexString.fromUint8Array(new Uint8Array(64)).hex(),
    };

    const request = {
      sender: keys.address.hex(),
      sequence_number: txn.sequence_number.toString(),
      max_gas_amount: txn.max_gas_amount.toString(),
      gas_unit_price: txn.gas_unit_price.toString(),
      expiration_timestamp_secs: txn.expiration_timestamp_secs.toString(),
      payload: pld,
      signature: transactionSignature,
    };
    const outputs = await client.client.transactions.simulateTransaction(
      request
    );
    if (log){
      console.log(outputs[0])
    }
    return outputs[0];
  }
}

export function generateBCSSimulation(
  pubkey: HexString,
  rawTxn: TxnBuilderTypes.RawTransaction
): Uint8Array {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const txnBuilder = new TransactionBuilderEd25519(
    (_signingMessage: TxnBuilderTypes.SigningMessage) => {
      // @ts-ignore
      const invalidSigBytes = new Uint8Array(64);
      return new TxnBuilderTypes.Ed25519Signature(invalidSigBytes);
    },
    pubkey.toUint8Array()
  );

  return txnBuilder.sign(rawTxn);
}

export function takeSimulationValue<T>(
  tx: Types.UserTransaction,
  tag: StructTag,
  repo: AptosParserRepo
): T {
  if (!tx.success) {
    console.log(tx);
    throw new Error("Simulation failed");
  }
  const valueData = tx.changes.filter((change) => {
    if (change.type !== "write_resource") {
      return false;
    }
    const wr = change as Types.WriteSetChange_WriteResource;
    return wr.data.type === tag.getAptosMoveTypeTag();
  });
  if (valueData.length === 0) {
    throw new Error("Did not find output resource");
  }
  if (valueData.length > 1) {
    throw new Error("Found multiple output resource");
  }
  const wr = valueData[0] as Types.WriteSetChange_WriteResource;
  return repo.parse(wr.data.data, tag) as T;
}
