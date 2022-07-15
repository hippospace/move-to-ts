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
export const moduleName = "Math";


export function max$ (
  a: U128,
  b: U128,
  $c: AptosDataCache,
): U128 {
  let temp$1;
  if ($.copy(a).lt($.copy(b))) {
    temp$1 = $.copy(b);
  }
  else{
    temp$1 = $.copy(a);
  }
  return temp$1;
}

export function max_u64$ (
  a: U64,
  b: U64,
  $c: AptosDataCache,
): U64 {
  let temp$1;
  if ($.copy(a).lt($.copy(b))) {
    temp$1 = $.copy(b);
  }
  else{
    temp$1 = $.copy(a);
  }
  return temp$1;
}

// test func
export function max_works$ (
  $c: AptosDataCache,
): void {
  if (!max$(u128("4"), u128("12"), $c).eq(u128("12"))) {
    throw $.abortCode(u64("0"));
  }
  return;
}

export function min$ (
  a: U128,
  b: U128,
  $c: AptosDataCache,
): U128 {
  let temp$1;
  if ($.copy(a).gt($.copy(b))) {
    temp$1 = $.copy(b);
  }
  else{
    temp$1 = $.copy(a);
  }
  return temp$1;
}

export function pow$ (
  base: U128,
  exp: U8,
  $c: AptosDataCache,
): U128 {
  let result;
  result = u128("1");
  while (true) {
    if ($.copy(exp).and(u8("1")).eq(u8("1"))) {
      result = $.copy(result).mul($.copy(base));
    }
    else{
    }
    exp = $.copy(exp).shr(u8("1"));
    base = $.copy(base).mul($.copy(base));
    if ($.copy(exp).eq(u8("0"))) {
      break;
    }
    else{
    }
  }
  return $.copy(result);
}

// test func
export function pow_works$ (
  $c: AptosDataCache,
): void {
  if (!pow$(u128("10"), u8("8"), $c).eq(u128("100000000"))) {
    throw $.abortCode(u64("0"));
  }
  if (!pow$(u128("9"), u8("2"), $c).eq(u128("81"))) {
    throw $.abortCode(u64("0"));
  }
  if (!pow$(u128("9"), u8("0"), $c).eq(u128("1"))) {
    throw $.abortCode(u64("0"));
  }
  if (!pow$(u128("1"), u8("100"), $c).eq(u128("1"))) {
    throw $.abortCode(u64("0"));
  }
  return;
}

export function sqrt$ (
  y: U128,
  $c: AptosDataCache,
): U128 {
  let temp$1, temp$2, x, z;
  if ($.copy(y).lt(u128("4"))) {
    if ($.copy(y).eq(u128("0"))) {
      temp$1 = u128("0");
    }
    else{
      temp$1 = u128("1");
    }
    temp$2 = temp$1;
  }
  else{
    z = $.copy(y);
    x = $.copy(y).div(u128("2")).add(u128("1"));
    while ($.copy(x).lt($.copy(z))) {
      {
        z = $.copy(x);
        x = $.copy(y).div($.copy(x)).add($.copy(x)).div(u128("2"));
      }

    }temp$2 = $.copy(z);
  }
  return temp$2;
}

// test func
export function sqrt_works$ (
  $c: AptosDataCache,
): void {
  if (!sqrt$(u128("4"), $c).eq(u128("2"))) {
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


