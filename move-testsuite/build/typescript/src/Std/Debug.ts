import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient} from "aptos";
import * as UnitTest from "./UnitTest";
export const packageName = "MoveNursery";
export const moduleAddress = new HexString("0x1");
export const moduleName = "Debug";


export function print$ (
  x: any,
  $c: AptosDataCache,
  $p: TypeTag[], /* <T>*/
): void {
  return $.Std_Debug_print(x, $c, [$p[0]]);

}
export function print_stack_trace$ (
  $c: AptosDataCache,
): void {
  return $.Std_Debug_print_stack_trace($c);

}
export function unit_test_poison$ (
  $c: AptosDataCache,
): void {
  UnitTest.create_signers_for_testing$(u64("0"), $c);
  return;
}


