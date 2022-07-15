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
import * as Math from "./Math";
import * as MockCoin from "./MockCoin";
import * as MockDeploy from "./MockDeploy";
import * as PieceSwap from "./PieceSwap";
export const packageName = "HippoSwap";
export const moduleAddress = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
export const moduleName = "PieceSwapScript";

export const E_LP_TOKEN_ALREADY_REGISTERED : U64 = u64("7");
export const E_OUTPUT_LESS_THAN_MIN : U64 = u64("3");
export const E_SWAP_NONZERO_INPUT_REQUIRED : U64 = u64("2");
export const E_SWAP_ONLY_ONE_IN_ALLOWED : U64 = u64("0");
export const E_SWAP_ONLY_ONE_OUT_ALLOWED : U64 = u64("1");
export const E_TOKEN_REGISTRY_NOT_INITIALIZED : U64 = u64("4");
export const E_TOKEN_X_NOT_REGISTERED : U64 = u64("5");
export const E_TOKEN_Y_NOT_REGISTERED : U64 = u64("6");

export function add_liquidity_script$ (
  sender: HexString,
  amount_x: U64,
  amount_y: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  PieceSwap.add_liquidity$(sender, $.copy(amount_x), $.copy(amount_y), $c, [$p[0], $p[1]] as TypeTag[]);
  return;
}


export function buildPayload_add_liquidity_script (
  sender: HexString,
  amount_x: U64,
  amount_y: U64,
  $p: TypeTag[], /* <X, Y>*/
) {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    "0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::PieceSwapScript::add_liquidity_script",
    typeParamStrings,
    [
      amount_x.toPayloadArg(),
      amount_y.toPayloadArg(),
    ]
  );

}
export function create_new_pool$ (
  admin: HexString,
  lp_name: U8[],
  lp_symbol: U8[],
  lp_description: U8[],
  lp_logo_url: U8[],
  lp_project_url: U8[],
  k: U128,
  w1_numerator: U128,
  w1_denominator: U128,
  w2_numerator: U128,
  w2_denominator: U128,
  swap_fee_per_million: U64,
  protocol_fee_share_per_thousand: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let admin_addr, decimals, decimals__1;
  admin_addr = Std.Signer.address_of$(admin, $c);
  if (!TokenRegistry.TokenRegistry.is_registry_initialized$($.copy(admin_addr), $c)) {
    throw $.abortCode(E_TOKEN_REGISTRY_NOT_INITIALIZED);
  }
  if (!TokenRegistry.TokenRegistry.has_token$($.copy(admin_addr), $c, [$p[0]] as TypeTag[])) {
    throw $.abortCode(E_TOKEN_X_NOT_REGISTERED);
  }
  if (!TokenRegistry.TokenRegistry.has_token$($.copy(admin_addr), $c, [$p[1]] as TypeTag[])) {
    throw $.abortCode(E_TOKEN_Y_NOT_REGISTERED);
  }
  if (!!TokenRegistry.TokenRegistry.has_token$($.copy(admin_addr), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "PieceSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[])) {
    throw $.abortCode(E_LP_TOKEN_ALREADY_REGISTERED);
  }
  if (!!TokenRegistry.TokenRegistry.has_token$($.copy(admin_addr), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "PieceSwap", "LPToken", [$p[1], $p[0]])] as TypeTag[])) {
    throw $.abortCode(E_LP_TOKEN_ALREADY_REGISTERED);
  }
  decimals = Math.max$(u128(AptosFramework.Coin.decimals$($c, [$p[0]] as TypeTag[])), u128(AptosFramework.Coin.decimals$($c, [$p[1]] as TypeTag[])), $c);
  decimals__1 = u64($.copy(decimals));
  PieceSwap.create_new_pool$(admin, $.copy(lp_name), $.copy(lp_symbol), $.copy(decimals__1), $.copy(k), $.copy(w1_numerator), $.copy(w1_denominator), $.copy(w2_numerator), $.copy(w2_denominator), $.copy(swap_fee_per_million), $.copy(protocol_fee_share_per_thousand), $c, [$p[0], $p[1]] as TypeTag[]);
  TokenRegistry.TokenRegistry.add_token$(admin, $.copy(lp_name), $.copy(lp_symbol), $.copy(lp_description), u8($.copy(decimals__1)), $.copy(lp_logo_url), $.copy(lp_project_url), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "PieceSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
  return;
}

export function create_new_pool_script$ (
  admin: HexString,
  lp_name: U8[],
  lp_symbol: U8[],
  k: U128,
  w1_numerator: U128,
  w1_denominator: U128,
  w2_numerator: U128,
  w2_denominator: U128,
  swap_fee_per_million: U64,
  protocol_fee_share_per_thousand: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  return create_new_pool$(admin, $.copy(lp_name), $.copy(lp_symbol), [], [], [], $.copy(k), $.copy(w1_numerator), $.copy(w1_denominator), $.copy(w2_numerator), $.copy(w2_denominator), $.copy(swap_fee_per_million), $.copy(protocol_fee_share_per_thousand), $c, [$p[0], $p[1]] as TypeTag[]);
}


export function buildPayload_create_new_pool_script (
  admin: HexString,
  lp_name: U8[],
  lp_symbol: U8[],
  k: U128,
  w1_numerator: U128,
  w1_denominator: U128,
  w2_numerator: U128,
  w2_denominator: U128,
  swap_fee_per_million: U64,
  protocol_fee_share_per_thousand: U64,
  $p: TypeTag[], /* <X, Y>*/
) {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    "0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::PieceSwapScript::create_new_pool_script",
    typeParamStrings,
    [
      lp_name.map(u => u.toPayloadArg()),
      lp_symbol.map(u => u.toPayloadArg()),
      k.toPayloadArg(),
      w1_numerator.toPayloadArg(),
      w1_denominator.toPayloadArg(),
      w2_numerator.toPayloadArg(),
      w2_denominator.toPayloadArg(),
      swap_fee_per_million.toPayloadArg(),
      protocol_fee_share_per_thousand.toPayloadArg(),
    ]
  );

}
export function mock_deploy_script$ (
  admin: HexString,
  $c: AptosDataCache,
): void {
  let admin_addr, billion, initial_amount;
  admin_addr = Std.Signer.address_of$(admin, $c);
  if (!TokenRegistry.TokenRegistry.is_registry_initialized$($.copy(admin_addr), $c)) {
    TokenRegistry.TokenRegistry.initialize$(admin, $c);
  }
  else{
  }
  MockDeploy.init_coin_and_create_store$(admin, [u8("85"), u8("83"), u8("68"), u8("67")], [u8("85"), u8("83"), u8("68"), u8("67")], u64("8"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[]);
  MockDeploy.init_coin_and_create_store$(admin, [u8("85"), u8("83"), u8("68"), u8("84")], [u8("85"), u8("83"), u8("68"), u8("84")], u64("8"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", [])] as TypeTag[]);
  MockDeploy.init_coin_and_create_store$(admin, [u8("68"), u8("65"), u8("73")], [u8("68"), u8("65"), u8("73")], u64("8"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  billion = u128("1000000000");
  create_new_pool_script$(admin, [u8("85"), u8("83"), u8("68"), u8("84"), u8("45"), u8("85"), u8("83"), u8("68"), u8("67"), u8("32"), u8("80"), u8("105"), u8("101"), u8("99"), u8("101"), u8("83"), u8("119"), u8("97"), u8("112"), u8("32"), u8("76"), u8("80"), u8("32"), u8("84"), u8("111"), u8("107"), u8("101"), u8("110")], [u8("85"), u8("83"), u8("68"), u8("84"), u8("45"), u8("85"), u8("83"), u8("68"), u8("67"), u8("45"), u8("80"), u8("83"), u8("95"), u8("76"), u8("80")], $.copy(billion).mul($.copy(billion)), u128("110"), u128("100"), u128("105"), u128("100"), u64("100"), u64("100"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[]);
  create_new_pool_script$(admin, [u8("68"), u8("65"), u8("73"), u8("45"), u8("85"), u8("83"), u8("68"), u8("67"), u8("32"), u8("80"), u8("105"), u8("101"), u8("99"), u8("101"), u8("83"), u8("119"), u8("97"), u8("112"), u8("32"), u8("76"), u8("80"), u8("32"), u8("84"), u8("111"), u8("107"), u8("101"), u8("110")], [u8("68"), u8("65"), u8("73"), u8("45"), u8("85"), u8("83"), u8("68"), u8("67"), u8("45"), u8("80"), u8("83"), u8("95"), u8("76"), u8("80")], $.copy(billion).mul($.copy(billion)), u128("110"), u128("100"), u128("105"), u128("100"), u64("100"), u64("100"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[]);
  initial_amount = u64("1000000").mul(u64("100000000"));
  MockCoin.faucet_mint_to$(admin, $.copy(initial_amount), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", [])] as TypeTag[]);
  MockCoin.faucet_mint_to$(admin, $.copy(initial_amount), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[]);
  add_liquidity_script$(admin, $.copy(initial_amount), $.copy(initial_amount), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[]);
  MockCoin.faucet_mint_to$(admin, $.copy(initial_amount), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  MockCoin.faucet_mint_to$(admin, $.copy(initial_amount), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[]);
  add_liquidity_script$(admin, $.copy(initial_amount), $.copy(initial_amount), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[]);
  return;
}


export function buildPayload_mock_deploy_script (
  admin: HexString,
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::PieceSwapScript::mock_deploy_script",
    typeParamStrings,
    []
  );

}
export function remove_liquidity_script$ (
  sender: HexString,
  liquidity: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  PieceSwap.remove_liquidity$(sender, $.copy(liquidity), $c, [$p[0], $p[1]] as TypeTag[]);
  return;
}


export function buildPayload_remove_liquidity_script (
  sender: HexString,
  liquidity: U64,
  $p: TypeTag[], /* <X, Y>*/
) {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    "0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::PieceSwapScript::remove_liquidity_script",
    typeParamStrings,
    [
      liquidity.toPayloadArg(),
    ]
  );

}
// test func
export function swap$ (
  sender: HexString,
  x_in: U64,
  y_in: U64,
  x_min_out: U64,
  y_min_out: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let temp$1, temp$2, x_out, y_out;
  if ($.copy(x_in).gt(u64("0"))) {
    temp$1 = $.copy(y_in).gt(u64("0"));
  }
  else{
    temp$1 = false;
  }
  if (!!temp$1) {
    throw $.abortCode(E_SWAP_ONLY_ONE_IN_ALLOWED);
  }
  if ($.copy(x_min_out).gt(u64("0"))) {
    temp$2 = $.copy(y_min_out).gt(u64("0"));
  }
  else{
    temp$2 = false;
  }
  if (!!temp$2) {
    throw $.abortCode(E_SWAP_ONLY_ONE_OUT_ALLOWED);
  }
  if ($.copy(x_in).gt(u64("0"))) {
    y_out = PieceSwap.swap_x_to_y$(sender, $.copy(x_in), $c, [$p[0], $p[1]] as TypeTag[]);
    if (!$.copy(y_out).ge($.copy(y_min_out))) {
      throw $.abortCode(E_OUTPUT_LESS_THAN_MIN);
    }
  }
  else{
    if ($.copy(y_in).gt(u64("0"))) {
      x_out = PieceSwap.swap_y_to_x$(sender, $.copy(y_in), $c, [$p[0], $p[1]] as TypeTag[]);
      if (!$.copy(x_out).ge($.copy(x_min_out))) {
        throw $.abortCode(E_OUTPUT_LESS_THAN_MIN);
      }
    }
    else{
      if (!false) {
        throw $.abortCode(E_SWAP_NONZERO_INPUT_REQUIRED);
      }
    }
  }
  return;
}

export function swap_script$ (
  sender: HexString,
  x_in: U64,
  y_in: U64,
  x_min_out: U64,
  y_min_out: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let temp$1, temp$2, x_out, y_out;
  if ($.copy(x_in).gt(u64("0"))) {
    temp$1 = $.copy(y_in).gt(u64("0"));
  }
  else{
    temp$1 = false;
  }
  if (!!temp$1) {
    throw $.abortCode(E_SWAP_ONLY_ONE_IN_ALLOWED);
  }
  if ($.copy(x_min_out).gt(u64("0"))) {
    temp$2 = $.copy(y_min_out).gt(u64("0"));
  }
  else{
    temp$2 = false;
  }
  if (!!temp$2) {
    throw $.abortCode(E_SWAP_ONLY_ONE_OUT_ALLOWED);
  }
  if ($.copy(x_in).gt(u64("0"))) {
    y_out = PieceSwap.swap_x_to_y$(sender, $.copy(x_in), $c, [$p[0], $p[1]] as TypeTag[]);
    if (!$.copy(y_out).ge($.copy(y_min_out))) {
      throw $.abortCode(E_OUTPUT_LESS_THAN_MIN);
    }
  }
  else{
    if ($.copy(y_in).gt(u64("0"))) {
      x_out = PieceSwap.swap_y_to_x$(sender, $.copy(y_in), $c, [$p[0], $p[1]] as TypeTag[]);
      if (!$.copy(x_out).ge($.copy(x_min_out))) {
        throw $.abortCode(E_OUTPUT_LESS_THAN_MIN);
      }
    }
    else{
      if (!false) {
        throw $.abortCode(E_SWAP_NONZERO_INPUT_REQUIRED);
      }
    }
  }
  return;
}


export function buildPayload_swap_script (
  sender: HexString,
  x_in: U64,
  y_in: U64,
  x_min_out: U64,
  y_min_out: U64,
  $p: TypeTag[], /* <X, Y>*/
) {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    "0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::PieceSwapScript::swap_script",
    typeParamStrings,
    [
      x_in.toPayloadArg(),
      y_in.toPayloadArg(),
      x_min_out.toPayloadArg(),
      y_min_out.toPayloadArg(),
    ]
  );

}
// test func
export function test_mock_deploy$ (
  admin: HexString,
  $c: AptosDataCache,
): void {
  mock_deploy_script$(admin, $c);
  return;
}


export function buildPayload_test_mock_deploy (
  admin: HexString,
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::PieceSwapScript::test_mock_deploy",
    typeParamStrings,
    []
  );

}
// test func
export function test_remove_liquidity$ (
  admin: HexString,
  $c: AptosDataCache,
): void {
  let admin_addr;
  mock_deploy_script$(admin, $c);
  remove_liquidity_script$(admin, u64("100"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[]);
  remove_liquidity_script$(admin, u64("100"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[]);
  admin_addr = Std.Signer.address_of$(admin, $c);
  if (!AptosFramework.Coin.balance$($.copy(admin_addr), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", [])] as TypeTag[]).eq(u64("100"))) {
    throw $.abortCode(u64("0"));
  }
  if (!AptosFramework.Coin.balance$($.copy(admin_addr), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]).eq(u64("100"))) {
    throw $.abortCode(u64("0"));
  }
  if (!AptosFramework.Coin.balance$($.copy(admin_addr), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[]).eq(u64("200"))) {
    throw $.abortCode(u64("0"));
  }
  return;
}


export function buildPayload_test_remove_liquidity (
  admin: HexString,
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::PieceSwapScript::test_remove_liquidity",
    typeParamStrings,
    []
  );

}
// test func
export function test_swap$ (
  admin: HexString,
  user: HexString,
  $c: AptosDataCache,
): void {
  let usdc_balance, usdt_amt;
  mock_deploy_script$(admin, $c);
  usdt_amt = u64("10000000");
  MockCoin.faucet_mint_to$(user, $.copy(usdt_amt), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", [])] as TypeTag[]);
  swap_script$(user, $.copy(usdt_amt), u64("0"), u64("0"), $.copy(usdt_amt).mul(u64("999")).div(u64("1000")), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[]);
  usdc_balance = AptosFramework.Coin.balance$(Std.Signer.address_of$(user, $c), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[]);
  swap_script$(user, u64("0"), $.copy(usdc_balance), $.copy(usdc_balance).mul(u64("999")).div(u64("1000")), u64("0"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[]);
  if (!AptosFramework.Coin.balance$(Std.Signer.address_of$(user, $c), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[]).eq(u64("0"))) {
    throw $.abortCode(u64("0"));
  }
  if (!AptosFramework.Coin.balance$(Std.Signer.address_of$(user, $c), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", [])] as TypeTag[]).eq(u64("0"))) {
    throw $.abortCode(u64("0"));
  }
  if (!AptosFramework.Coin.balance$(Std.Signer.address_of$(user, $c), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]).ge($.copy(usdc_balance).mul(u64("999")).div(u64("1000")))) {
    throw $.abortCode(u64("0"));
  }
  return;
}


export function buildPayload_test_swap (
  admin: HexString,
  user: HexString,
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::PieceSwapScript::test_swap",
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


