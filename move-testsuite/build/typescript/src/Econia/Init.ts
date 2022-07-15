import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient} from "aptos";
import * as Std from "../Std";
import * as Caps from "./Caps";
import * as Registry from "./Registry";
import * as Version from "./Version";
export const packageName = "Econia";
export const moduleAddress = new HexString("0xc0deb00c");
export const moduleName = "Init";

export const E_NOT_ECONIA : U64 = u64("0");

export function init_econia$ (
  account: HexString,
  $c: AptosDataCache,
): void {
  if (!(Std.Signer.address_of$(account, $c).hex() === new HexString("0xc0deb00c").hex())) {
    throw $.abortCode(E_NOT_ECONIA);
  }
  Caps.init_caps$(account, $c);
  Registry.init_registry$(account, $c);
  Version.init_mock_version_number$(account, $c);
  return;
}


export function buildPayload_init_econia (
  account: HexString,
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xc0deb00c::Init::init_econia",
    typeParamStrings,
    []
  );

}
// test func
export function init_econia_failure_not_econia$ (
  account: HexString,
  $c: AptosDataCache,
): void {
  init_econia$(account, $c);
  return;
}


export function buildPayload_init_econia_failure_not_econia (
  account: HexString,
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xc0deb00c::Init::init_econia_failure_not_econia",
    typeParamStrings,
    []
  );

}
// test func
export function init_econia_success$ (
  account: HexString,
  $c: AptosDataCache,
): void {
  init_econia$(account, $c);
  return;
}


export function buildPayload_init_econia_success (
  account: HexString,
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xc0deb00c::Init::init_econia_success",
    typeParamStrings,
    []
  );

}
export function unit_test_poison$ (
  $c: AptosDataCache,
): void {
  Std.UnitTest.create_signers_for_testing$(u64("0"), $c);
  return;
}


