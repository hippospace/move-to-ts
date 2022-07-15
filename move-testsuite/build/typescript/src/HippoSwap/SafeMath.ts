import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient} from "aptos";
import * as Std from "../Std";
export const packageName = "HippoSwap";
export const moduleAddress = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
export const moduleName = "SafeMath";

export const ERROR_UNDERFLOW : U64 = u64("0");

export function add$ (
  a: U128,
  b: U128,
  $c: AptosDataCache,
): U128 {
  return $.copy(a).add($.copy(b));
}

export function div$ (
  a: U128,
  b: U128,
  $c: AptosDataCache,
): U128 {
  return $.copy(a).div($.copy(b));
}

export function mul$ (
  a: U128,
  b: U128,
  $c: AptosDataCache,
): U128 {
  return $.copy(a).mul($.copy(b));
}

export function sub$ (
  a: U128,
  b: U128,
  $c: AptosDataCache,
): U128 {
  return $.copy(a).sub($.copy(b));
}

export function unit_test_poison$ (
  $c: AptosDataCache,
): void {
  Std.UnitTest.create_signers_for_testing$(u64("0"), $c);
  return;
}

// test func
export function works$ (
  $c: AptosDataCache,
): void {
  if (!add$(u128("1"), u128("1"), $c).eq(u128("2"))) {
    throw $.abortCode(u64("0"));
  }
  if (!sub$(u128("1"), u128("1"), $c).eq(u128("0"))) {
    throw $.abortCode(u64("0"));
  }
  if (!sub$(u128("0"), u128("0"), $c).eq(u128("0"))) {
    throw $.abortCode(u64("0"));
  }
  return;
}


