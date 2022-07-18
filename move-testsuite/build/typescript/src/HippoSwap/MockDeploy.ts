import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient} from "aptos";
import * as AptosFramework from "../AptosFramework";
import * as Std from "../Std";
import * as TokenRegistry from "../TokenRegistry";
import * as MockCoin from "./MockCoin";
export const packageName = "HippoSwap";
export const moduleAddress = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
export const moduleName = "MockDeploy";


export function init_coin_and_create_store$ (
  admin: HexString,
  name: U8[],
  symbol: U8[],
  decimals: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): void {
  if (!AptosFramework.Coin.is_coin_initialized$($c, [$p[0]] as TypeTag[])) {
    MockCoin.initialize$(admin, $.copy(decimals), $c, [$p[0]] as TypeTag[]);
  }
  else{
  }
  if (!TokenRegistry.TokenRegistry.has_token$(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), $c, [$p[0]] as TypeTag[])) {
    TokenRegistry.TokenRegistry.add_token$(admin, $.copy(name), $.copy(symbol), $.copy(name), u8($.copy(decimals)), [], [], $c, [$p[0]] as TypeTag[]);
  }
  else{
  }
  return;
}

export function init_registry$ (
  admin: HexString,
  $c: AptosDataCache,
): void {
  if (!TokenRegistry.TokenRegistry.is_registry_initialized$(Std.Signer.address_of$(admin, $c), $c)) {
    TokenRegistry.TokenRegistry.initialize$(admin, $c);
  }
  else{
  }
  return;
}

// #[test]
export function test_init_coin$ (
  admin: HexString,
  $c: AptosDataCache,
): void {
  TokenRegistry.TokenRegistry.initialize$(admin, $c);
  init_coin_and_create_store$(admin, [u8("66"), u8("105"), u8("116"), u8("99"), u8("111"), u8("105"), u8("110")], [u8("66"), u8("84"), u8("67")], u64("8"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WBTC", [])] as TypeTag[]);
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

