import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient} from "aptos";
import * as Std from "../Std";
import * as Router from "./Router";
import * as TestShared from "./TestShared";
export const packageName = "HippoSwap";
export const moduleAddress = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
export const moduleName = "Proc";

export const ADMIN : HexString = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
export const E_UNKNOWN_POOL_TYPE : U64 = u64("1");
export const INVESTOR : HexString = new HexString("0x2fff");
export const P10 : U64 = u64("10000000000");
export const P11 : U64 = u64("100000000000");
export const P12 : U64 = u64("1000000000000");
export const P13 : U64 = u64("10000000000000");
export const P14 : U64 = u64("100000000000000");
export const P15 : U64 = u64("1000000000000000");
export const P16 : U64 = u64("10000000000000000");
export const P17 : U64 = u64("100000000000000000");
export const P18 : U64 = u64("1000000000000000000");
export const P3 : U64 = u64("1000");
export const P4 : U64 = u64("10000");
export const P5 : U64 = u64("100000");
export const P6 : U64 = u64("1000000");
export const P7 : U64 = u64("10000000");
export const P8 : U64 = u64("100000000");
export const P9 : U64 = u64("1000000000");
export const POOL_TYPE_CONSTANT_PRODUCT : U8 = u8("1");
export const POOL_TYPE_PIECEWISE : U8 = u8("3");
export const POOL_TYPE_STABLE_CURVE : U8 = u8("2");
export const SWAPPER : HexString = new HexString("0x2ffe");

// #[test]
export function test_pool_constant_product$ (
  admin: HexString,
  investor: HexString,
  swapper: HexString,
  core: HexString,
  $c: AptosDataCache,
): void {
  let pool_type;
  pool_type = POOL_TYPE_CONSTANT_PRODUCT;
  TestShared.time_start$(core, $c);
  TestShared.init_registry_and_mock_coins$(admin, $c);
  TestShared.create_pool$(admin, $.copy(pool_type), u128("0"), u128("0"), u128("0"), u128("0"), u128("0"), u64("100"), u64("100000"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", [])] as TypeTag[]);
  TestShared.fund_for_participants$(investor, P8, P9, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", [])] as TypeTag[]);
  TestShared.fund_for_participants$(swapper, P8, P9, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", [])] as TypeTag[]);
  Router.add_liquidity_route$(investor, $.copy(pool_type), P8, P9, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", [])] as TypeTag[]);
  TestShared.debug_print_pool_reserve_xy$($.copy(pool_type), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", [])] as TypeTag[]);
  TestShared.debug_print_pool_lp_supply$($.copy(pool_type), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", [])] as TypeTag[]);
  TestShared.debug_print_pool_fee$($.copy(pool_type), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", [])] as TypeTag[]);
  TestShared.debug_print_save_point$($.copy(pool_type), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", [])] as TypeTag[]);
  TestShared.sync_save_point$($.copy(pool_type), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", [])] as TypeTag[]);
  TestShared.debug_print_save_point$($.copy(pool_type), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", [])] as TypeTag[]);
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

