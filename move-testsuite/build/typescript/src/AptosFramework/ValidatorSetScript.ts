import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient} from "aptos";
import * as Std from "../Std";
export const packageName = "AptosFramework";
export const moduleAddress = new HexString("0x1");
export const moduleName = "ValidatorSetScript";


export function add_validator$ (
  _account: HexString,
  _validator_addr: HexString,
  $c: AptosDataCache,
): void {
  return;
}


export function buildPayload_add_validator (
  _account: HexString,
  _validator_addr: HexString,
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0x1::ValidatorSetScript::add_validator",
    typeParamStrings,
    [
      _validator_addr,
    ]
  );

}
export function create_validator_account$ (
  _core_resource: HexString,
  _new_account_address: HexString,
  _human_name: U8[],
  $c: AptosDataCache,
): void {
  return;
}


export function buildPayload_create_validator_account (
  _core_resource: HexString,
  _new_account_address: HexString,
  _human_name: U8[],
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0x1::ValidatorSetScript::create_validator_account",
    typeParamStrings,
    [
      _new_account_address,
      _human_name.map(u => u.toPayloadArg()),
    ]
  );

}
export function create_validator_operator_account$ (
  _core_resource: HexString,
  _new_account_address: HexString,
  _human_name: U8[],
  $c: AptosDataCache,
): void {
  return;
}


export function buildPayload_create_validator_operator_account (
  _core_resource: HexString,
  _new_account_address: HexString,
  _human_name: U8[],
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0x1::ValidatorSetScript::create_validator_operator_account",
    typeParamStrings,
    [
      _new_account_address,
      _human_name.map(u => u.toPayloadArg()),
    ]
  );

}
export function register_validator_config$ (
  _validator_operator_account: HexString,
  _validator_address: HexString,
  _consensus_pubkey: U8[],
  _validator_network_addresses: U8[],
  _fullnode_network_addresses: U8[],
  $c: AptosDataCache,
): void {
  return;
}


export function buildPayload_register_validator_config (
  _validator_operator_account: HexString,
  _validator_address: HexString,
  _consensus_pubkey: U8[],
  _validator_network_addresses: U8[],
  _fullnode_network_addresses: U8[],
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0x1::ValidatorSetScript::register_validator_config",
    typeParamStrings,
    [
      _validator_address,
      _consensus_pubkey.map(u => u.toPayloadArg()),
      _validator_network_addresses.map(u => u.toPayloadArg()),
      _fullnode_network_addresses.map(u => u.toPayloadArg()),
    ]
  );

}
export function remove_validator$ (
  _account: HexString,
  _validator_addr: HexString,
  $c: AptosDataCache,
): void {
  return;
}


export function buildPayload_remove_validator (
  _account: HexString,
  _validator_addr: HexString,
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0x1::ValidatorSetScript::remove_validator",
    typeParamStrings,
    [
      _validator_addr,
    ]
  );

}
export function set_validator_config_and_reconfigure$ (
  _validator_operator_account: HexString,
  _validator_account: HexString,
  _consensus_pubkey: U8[],
  _validator_network_addresses: U8[],
  _fullnode_network_addresses: U8[],
  $c: AptosDataCache,
): void {
  return;
}


export function buildPayload_set_validator_config_and_reconfigure (
  _validator_operator_account: HexString,
  _validator_account: HexString,
  _consensus_pubkey: U8[],
  _validator_network_addresses: U8[],
  _fullnode_network_addresses: U8[],
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0x1::ValidatorSetScript::set_validator_config_and_reconfigure",
    typeParamStrings,
    [
      _validator_account,
      _consensus_pubkey.map(u => u.toPayloadArg()),
      _validator_network_addresses.map(u => u.toPayloadArg()),
      _fullnode_network_addresses.map(u => u.toPayloadArg()),
    ]
  );

}
export function set_validator_operator$ (
  _account: HexString,
  _operator_name: U8[],
  _operator_account: HexString,
  $c: AptosDataCache,
): void {
  return;
}


export function buildPayload_set_validator_operator (
  _account: HexString,
  _operator_name: U8[],
  _operator_account: HexString,
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0x1::ValidatorSetScript::set_validator_operator",
    typeParamStrings,
    [
      _operator_name.map(u => u.toPayloadArg()),
      _operator_account,
    ]
  );

}
export function unit_test_poison$ (
  $c: AptosDataCache,
): void {
  Std.UnitTest.create_signers_for_testing$(u64("0"), $c);
  return;
}


