import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient} from "aptos";
import * as Std from "../Std";
import * as SafeMath from "./SafeMath";
export const packageName = "HippoSwap";
export const moduleAddress = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
export const moduleName = "CPSwapUtils";

export const ERROR_INSUFFICIENT_AMOUNT : U64 = u64("2");
export const ERROR_INSUFFICIENT_INPUT_AMOUNT : U64 = u64("0");
export const ERROR_INSUFFICIENT_LIQUIDITY : U64 = u64("1");

export function get_amount_out$ (
  amount_in: U64,
  reserve_in: U64,
  reserve_out: U64,
  $c: AptosDataCache,
): U64 {
  let temp$1, amount_in_with_fee, denominator, numerator;
  if (!$.copy(amount_in).gt(u64("0"))) {
    throw $.abortCode(ERROR_INSUFFICIENT_INPUT_AMOUNT);
  }
  if ($.copy(reserve_in).gt(u64("0"))) {
    temp$1 = $.copy(reserve_out).gt(u64("0"));
  }
  else{
    temp$1 = false;
  }
  if (!temp$1) {
    throw $.abortCode(ERROR_INSUFFICIENT_LIQUIDITY);
  }
  amount_in_with_fee = SafeMath.mul$(u128($.copy(amount_in)), u128("997"), $c);
  numerator = SafeMath.mul$($.copy(amount_in_with_fee), u128($.copy(reserve_out)), $c);
  denominator = SafeMath.mul$(u128($.copy(reserve_in)), u128("1000"), $c).add($.copy(amount_in_with_fee));
  return u64(SafeMath.div$($.copy(numerator), $.copy(denominator), $c));
}

export function quote$ (
  amount_x: U64,
  reserve_x: U64,
  reserve_y: U64,
  $c: AptosDataCache,
): U64 {
  let temp$1;
  if (!$.copy(amount_x).gt(u64("0"))) {
    throw $.abortCode(ERROR_INSUFFICIENT_AMOUNT);
  }
  if ($.copy(reserve_x).gt(u64("0"))) {
    temp$1 = $.copy(reserve_y).gt(u64("0"));
  }
  else{
    temp$1 = false;
  }
  if (!temp$1) {
    throw $.abortCode(ERROR_INSUFFICIENT_LIQUIDITY);
  }
  return u64(SafeMath.div$(SafeMath.mul$(u128($.copy(amount_x)), u128($.copy(reserve_y)), $c), u128($.copy(reserve_x)), $c));
}

// #[test]
export function test_get_amount_out$ (
  $c: AptosDataCache,
): void {
  let a;
  a = get_amount_out$(u64("100"), u64("10"), u64("10"), $c);
  Std.Debug.print$(a, $c, [AtomicTypeTag.U64] as TypeTag[]);
  if (!$.copy(a).gt(u64("0"))) {
    throw $.abortCode(u64("0"));
  }
  return;
}

export function unit_test_poison$ (
  $c: AptosDataCache,
): void {
  Std.UnitTest.create_signers_for_testing$(u64("0"), $c);
  return;
}

export function loadParsers(repo: AptosParserRepo) {
}

