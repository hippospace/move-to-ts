import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient} from "aptos";
import * as Std from "../Std";
export const packageName = "MoveToTsTestsuite";
export const moduleAddress = new HexString("0x12345");
export const moduleName = "RefMut";


// #[test]
export function set_by_ref$ (
  dst: any,
  val: any,
  $c: AptosDataCache,
  $p: TypeTag[], /* <T>*/
): void {
  $.set(dst, val);
  return;
}

// #[test]
export function test_set_by_ref$ (
  $c: AptosDataCache,
): void {
  let i;
  i = u64("0");
  set_by_ref$(i, u64("5"), $c, [AtomicTypeTag.U64] as TypeTag[]);
  if (!$.copy(i).eq(u64("5"))) {
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

