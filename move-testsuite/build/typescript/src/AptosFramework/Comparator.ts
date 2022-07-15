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
export const moduleName = "Comparator";

export const EQUAL : U8 = u8("0");
export const GREATER : U8 = u8("2");
export const SMALLER : U8 = u8("1");


export class Complex 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "Complex";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "value0", typeTag: new VectorTag(AtomicTypeTag.U128) },
  { name: "value1", typeTag: AtomicTypeTag.U8 },
  { name: "value2", typeTag: AtomicTypeTag.U64 }];

  value0: U128[];
  value1: U8;
  value2: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.value0 = proto['value0'] as U128[];
    this.value1 = proto['value1'] as U8;
    this.value2 = proto['value2'] as U64;
  }

  static ComplexParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : Complex {
    const proto = $.parseStructProto(data, typeTag, repo, Complex);
    return new Complex(proto, typeTag);
  }

}

export class Result 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "Result";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "inner", typeTag: AtomicTypeTag.U8 }];

  inner: U8;

  constructor(proto: any, public typeTag: TypeTag) {
    this.inner = proto['inner'] as U8;
  }

  static ResultParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : Result {
    const proto = $.parseStructProto(data, typeTag, repo, Result);
    return new Result(proto, typeTag);
  }

}
export function compare$ (
  left: any,
  right: any,
  $c: AptosDataCache,
  $p: TypeTag[], /* <T>*/
): Result {
  let left_bytes, right_bytes;
  left_bytes = Std.BCS.to_bytes$(left, $c, [$p[0]] as TypeTag[]);
  right_bytes = Std.BCS.to_bytes$(right, $c, [$p[0]] as TypeTag[]);
  return compare_u8_vector$($.copy(left_bytes), $.copy(right_bytes), $c);
}

export function compare_u8_vector$ (
  left: U8[],
  right: U8[],
  $c: AptosDataCache,
): Result {
  let temp$1, temp$2, temp$3, idx, left_byte, left_length, right_byte, right_length;
  left_length = Std.Vector.length$(left, $c, [AtomicTypeTag.U8] as TypeTag[]);
  right_length = Std.Vector.length$(right, $c, [AtomicTypeTag.U8] as TypeTag[]);
  idx = u64("0");
  while (true) {
    {
      if ($.copy(idx).lt($.copy(left_length))) {
        temp$1 = $.copy(idx).lt($.copy(right_length));
      }
      else{
        temp$1 = false;
      }
    }
    if (!(temp$1)) break;
    {
      left_byte = $.copy(Std.Vector.borrow$(left, $.copy(idx), $c, [AtomicTypeTag.U8] as TypeTag[]));
      right_byte = $.copy(Std.Vector.borrow$(right, $.copy(idx), $c, [AtomicTypeTag.U8] as TypeTag[]));
      if ($.copy(left_byte).lt($.copy(right_byte))) {
        return new Result({ inner: SMALLER }, new StructTag(new HexString("0x1"), "Comparator", "Result", []));
      }
      else{
        if ($.copy(left_byte).gt($.copy(right_byte))) {
          return new Result({ inner: GREATER }, new StructTag(new HexString("0x1"), "Comparator", "Result", []));
        }
        else{
        }
      }
      idx = $.copy(idx).add(u64("1"));
    }

  }if ($.copy(left_length).lt($.copy(right_length))) {
    temp$3 = new Result({ inner: SMALLER }, new StructTag(new HexString("0x1"), "Comparator", "Result", []));
  }
  else{
    if ($.copy(left_length).gt($.copy(right_length))) {
      temp$2 = new Result({ inner: GREATER }, new StructTag(new HexString("0x1"), "Comparator", "Result", []));
    }
    else{
      temp$2 = new Result({ inner: EQUAL }, new StructTag(new HexString("0x1"), "Comparator", "Result", []));
    }
    temp$3 = temp$2;
  }
  return temp$3;
}

export function is_equal$ (
  result: Result,
  $c: AptosDataCache,
): boolean {
  return $.copy(result.inner).eq(EQUAL);
}

export function is_greater_than$ (
  result: Result,
  $c: AptosDataCache,
): boolean {
  return $.copy(result.inner).eq(GREATER);
}

export function is_smaller_than$ (
  result: Result,
  $c: AptosDataCache,
): boolean {
  return $.copy(result.inner).eq(SMALLER);
}

// test func
export function test_complex$ (
  $c: AptosDataCache,
): void {
  let temp$1, temp$2, temp$3, temp$4, temp$5, temp$6, temp$7, base, other_0, other_1, other_2, value0_0, value0_1;
  value0_0 = Std.Vector.empty$($c, [AtomicTypeTag.U128] as TypeTag[]);
  Std.Vector.push_back$(value0_0, u128("10"), $c, [AtomicTypeTag.U128] as TypeTag[]);
  Std.Vector.push_back$(value0_0, u128("9"), $c, [AtomicTypeTag.U128] as TypeTag[]);
  Std.Vector.push_back$(value0_0, u128("5"), $c, [AtomicTypeTag.U128] as TypeTag[]);
  value0_1 = Std.Vector.empty$($c, [AtomicTypeTag.U128] as TypeTag[]);
  Std.Vector.push_back$(value0_1, u128("10"), $c, [AtomicTypeTag.U128] as TypeTag[]);
  Std.Vector.push_back$(value0_1, u128("9"), $c, [AtomicTypeTag.U128] as TypeTag[]);
  Std.Vector.push_back$(value0_1, u128("5"), $c, [AtomicTypeTag.U128] as TypeTag[]);
  Std.Vector.push_back$(value0_1, u128("1"), $c, [AtomicTypeTag.U128] as TypeTag[]);
  base = new Complex({ value0: $.copy(value0_0), value1: u8("13"), value2: u64("41") }, new StructTag(new HexString("0x1"), "Comparator", "Complex", []));
  other_0 = new Complex({ value0: $.copy(value0_1), value1: u8("13"), value2: u64("41") }, new StructTag(new HexString("0x1"), "Comparator", "Complex", []));
  other_1 = new Complex({ value0: $.copy(value0_0), value1: u8("14"), value2: u64("41") }, new StructTag(new HexString("0x1"), "Comparator", "Complex", []));
  other_2 = new Complex({ value0: $.copy(value0_0), value1: u8("13"), value2: u64("42") }, new StructTag(new HexString("0x1"), "Comparator", "Complex", []));
  temp$1 = compare$(base, base, $c, [new StructTag(new HexString("0x1"), "Comparator", "Complex", [])] as TypeTag[]);
  if (!is_equal$(temp$1, $c)) {
    throw $.abortCode(u64("0"));
  }
  temp$2 = compare$(base, other_0, $c, [new StructTag(new HexString("0x1"), "Comparator", "Complex", [])] as TypeTag[]);
  if (!is_smaller_than$(temp$2, $c)) {
    throw $.abortCode(u64("1"));
  }
  temp$3 = compare$(other_0, base, $c, [new StructTag(new HexString("0x1"), "Comparator", "Complex", [])] as TypeTag[]);
  if (!is_greater_than$(temp$3, $c)) {
    throw $.abortCode(u64("2"));
  }
  temp$4 = compare$(base, other_1, $c, [new StructTag(new HexString("0x1"), "Comparator", "Complex", [])] as TypeTag[]);
  if (!is_smaller_than$(temp$4, $c)) {
    throw $.abortCode(u64("3"));
  }
  temp$5 = compare$(other_1, base, $c, [new StructTag(new HexString("0x1"), "Comparator", "Complex", [])] as TypeTag[]);
  if (!is_greater_than$(temp$5, $c)) {
    throw $.abortCode(u64("4"));
  }
  temp$6 = compare$(base, other_2, $c, [new StructTag(new HexString("0x1"), "Comparator", "Complex", [])] as TypeTag[]);
  if (!is_smaller_than$(temp$6, $c)) {
    throw $.abortCode(u64("5"));
  }
  temp$7 = compare$(other_2, base, $c, [new StructTag(new HexString("0x1"), "Comparator", "Complex", [])] as TypeTag[]);
  if (!is_greater_than$(temp$7, $c)) {
    throw $.abortCode(u64("6"));
  }
  return;
}

// test func
export function test_strings$ (
  $c: AptosDataCache,
): void {
  let temp$1, temp$2, temp$3, temp$4, temp$5, temp$6, temp$7, temp$8, temp$9, value0, value1, value2;
  value0 = Std.ASCII.string$([u8("97"), u8("108"), u8("112"), u8("104"), u8("97")], $c);
  value1 = Std.ASCII.string$([u8("98"), u8("101"), u8("116"), u8("97")], $c);
  value2 = Std.ASCII.string$([u8("98"), u8("101"), u8("116"), u8("97"), u8("97")], $c);
  temp$1 = compare$(value0, value0, $c, [new StructTag(new HexString("0x1"), "ASCII", "String", [])] as TypeTag[]);
  if (!is_equal$(temp$1, $c)) {
    throw $.abortCode(u64("0"));
  }
  temp$2 = compare$(value1, value1, $c, [new StructTag(new HexString("0x1"), "ASCII", "String", [])] as TypeTag[]);
  if (!is_equal$(temp$2, $c)) {
    throw $.abortCode(u64("1"));
  }
  temp$3 = compare$(value2, value2, $c, [new StructTag(new HexString("0x1"), "ASCII", "String", [])] as TypeTag[]);
  if (!is_equal$(temp$3, $c)) {
    throw $.abortCode(u64("2"));
  }
  temp$4 = compare$(value0, value1, $c, [new StructTag(new HexString("0x1"), "ASCII", "String", [])] as TypeTag[]);
  if (!is_greater_than$(temp$4, $c)) {
    throw $.abortCode(u64("3"));
  }
  temp$5 = compare$(value1, value0, $c, [new StructTag(new HexString("0x1"), "ASCII", "String", [])] as TypeTag[]);
  if (!is_smaller_than$(temp$5, $c)) {
    throw $.abortCode(u64("4"));
  }
  temp$6 = compare$(value0, value2, $c, [new StructTag(new HexString("0x1"), "ASCII", "String", [])] as TypeTag[]);
  if (!is_smaller_than$(temp$6, $c)) {
    throw $.abortCode(u64("5"));
  }
  temp$7 = compare$(value2, value0, $c, [new StructTag(new HexString("0x1"), "ASCII", "String", [])] as TypeTag[]);
  if (!is_greater_than$(temp$7, $c)) {
    throw $.abortCode(u64("6"));
  }
  temp$8 = compare$(value1, value2, $c, [new StructTag(new HexString("0x1"), "ASCII", "String", [])] as TypeTag[]);
  if (!is_smaller_than$(temp$8, $c)) {
    throw $.abortCode(u64("7"));
  }
  temp$9 = compare$(value2, value1, $c, [new StructTag(new HexString("0x1"), "ASCII", "String", [])] as TypeTag[]);
  if (!is_greater_than$(temp$9, $c)) {
    throw $.abortCode(u64("8"));
  }
  return;
}

// test func
export function test_u128$ (
  $c: AptosDataCache,
): void {
  let temp$1, temp$2, temp$3, temp$4, temp$5, temp$6, temp$7, temp$8, temp$9, value0, value1, value2;
  value0 = u128("5");
  value1 = u128("152");
  value2 = u128("511");
  temp$1 = compare$(value0, value0, $c, [AtomicTypeTag.U128] as TypeTag[]);
  if (!is_equal$(temp$1, $c)) {
    throw $.abortCode(u64("0"));
  }
  temp$2 = compare$(value1, value1, $c, [AtomicTypeTag.U128] as TypeTag[]);
  if (!is_equal$(temp$2, $c)) {
    throw $.abortCode(u64("1"));
  }
  temp$3 = compare$(value2, value2, $c, [AtomicTypeTag.U128] as TypeTag[]);
  if (!is_equal$(temp$3, $c)) {
    throw $.abortCode(u64("2"));
  }
  temp$4 = compare$(value0, value1, $c, [AtomicTypeTag.U128] as TypeTag[]);
  if (!is_smaller_than$(temp$4, $c)) {
    throw $.abortCode(u64("2"));
  }
  temp$5 = compare$(value1, value0, $c, [AtomicTypeTag.U128] as TypeTag[]);
  if (!is_greater_than$(temp$5, $c)) {
    throw $.abortCode(u64("3"));
  }
  temp$6 = compare$(value0, value2, $c, [AtomicTypeTag.U128] as TypeTag[]);
  if (!is_smaller_than$(temp$6, $c)) {
    throw $.abortCode(u64("3"));
  }
  temp$7 = compare$(value2, value0, $c, [AtomicTypeTag.U128] as TypeTag[]);
  if (!is_greater_than$(temp$7, $c)) {
    throw $.abortCode(u64("4"));
  }
  temp$8 = compare$(value1, value2, $c, [AtomicTypeTag.U128] as TypeTag[]);
  if (!is_smaller_than$(temp$8, $c)) {
    throw $.abortCode(u64("5"));
  }
  temp$9 = compare$(value2, value1, $c, [AtomicTypeTag.U128] as TypeTag[]);
  if (!is_greater_than$(temp$9, $c)) {
    throw $.abortCode(u64("6"));
  }
  return;
}

export function unit_test_poison$ (
  $c: AptosDataCache,
): void {
  Std.UnitTest.create_signers_for_testing$(u64("0"), $c);
  return;
}


