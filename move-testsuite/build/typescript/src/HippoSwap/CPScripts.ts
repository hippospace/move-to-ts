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
import * as CPSwap from "./CPSwap";
import * as Math from "./Math";
import * as MockCoin from "./MockCoin";
export const packageName = "HippoSwap";
export const moduleAddress = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
export const moduleName = "CPScripts";

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
  CPSwap.add_liquidity$(sender, $.copy(amount_x), $.copy(amount_y), $c, [$p[0], $p[1]] as TypeTag[]);
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
    "0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::CPScripts::add_liquidity_script",
    typeParamStrings,
    [
      amount_x.toPayloadArg(),
      amount_y.toPayloadArg(),
    ]
  );

}
export function create_new_pool$ (
  sender: HexString,
  fee_to: HexString,
  fee_on: boolean,
  lp_name: U8[],
  lp_symbol: U8[],
  lp_description: U8[],
  lp_logo_url: U8[],
  lp_project_url: U8[],
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let admin_addr, decimals, decimals__1;
  admin_addr = Std.Signer.address_of$(sender, $c);
  if (!TokenRegistry.TokenRegistry.is_registry_initialized$($.copy(admin_addr), $c)) {
    throw $.abortCode(E_TOKEN_REGISTRY_NOT_INITIALIZED);
  }
  if (!TokenRegistry.TokenRegistry.has_token$($.copy(admin_addr), $c, [$p[0]] as TypeTag[])) {
    throw $.abortCode(E_TOKEN_X_NOT_REGISTERED);
  }
  if (!TokenRegistry.TokenRegistry.has_token$($.copy(admin_addr), $c, [$p[1]] as TypeTag[])) {
    throw $.abortCode(E_TOKEN_Y_NOT_REGISTERED);
  }
  if (!!TokenRegistry.TokenRegistry.has_token$($.copy(admin_addr), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[])) {
    throw $.abortCode(E_LP_TOKEN_ALREADY_REGISTERED);
  }
  if (!!TokenRegistry.TokenRegistry.has_token$($.copy(admin_addr), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "LPToken", [$p[1], $p[0]])] as TypeTag[])) {
    throw $.abortCode(E_LP_TOKEN_ALREADY_REGISTERED);
  }
  decimals = Math.max$(u128(AptosFramework.Coin.decimals$($c, [$p[0]] as TypeTag[])), u128(AptosFramework.Coin.decimals$($c, [$p[1]] as TypeTag[])), $c);
  decimals__1 = u64($.copy(decimals));
  CPSwap.create_token_pair$(sender, $.copy(fee_to), fee_on, $.copy(lp_name), $.copy(lp_symbol), $.copy(decimals__1), $c, [$p[0], $p[1]] as TypeTag[]);
  TokenRegistry.TokenRegistry.add_token$(sender, $.copy(lp_name), $.copy(lp_symbol), $.copy(lp_description), u8($.copy(decimals__1)), $.copy(lp_logo_url), $.copy(lp_project_url), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
  return;
}

export function create_new_pool_script$ (
  sender: HexString,
  fee_to: HexString,
  fee_on: boolean,
  lp_name: U8[],
  lp_symbol: U8[],
  lp_description: U8[],
  lp_logo_url: U8[],
  lp_project_url: U8[],
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  create_new_pool$(sender, $.copy(fee_to), fee_on, $.copy(lp_name), $.copy(lp_symbol), $.copy(lp_description), $.copy(lp_logo_url), $.copy(lp_project_url), $c, [$p[0], $p[1]] as TypeTag[]);
  return;
}


export function buildPayload_create_new_pool_script (
  sender: HexString,
  fee_to: HexString,
  fee_on: boolean,
  lp_name: U8[],
  lp_symbol: U8[],
  lp_description: U8[],
  lp_logo_url: U8[],
  lp_project_url: U8[],
  $p: TypeTag[], /* <X, Y>*/
) {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    "0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::CPScripts::create_new_pool_script",
    typeParamStrings,
    [
      fee_to,
      fee_on,
      lp_name.map(u => u.toPayloadArg()),
      lp_symbol.map(u => u.toPayloadArg()),
      lp_description.map(u => u.toPayloadArg()),
      lp_logo_url.map(u => u.toPayloadArg()),
      lp_project_url.map(u => u.toPayloadArg()),
    ]
  );

}
export function init_coin_and_create_store$ (
  admin: HexString,
  name: U8[],
  symbol: U8[],
  decimals: U8,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): void {
  MockCoin.initialize$(admin, u64("8"), $c, [$p[0]] as TypeTag[]);
  TokenRegistry.TokenRegistry.add_token$(admin, $.copy(name), $.copy(symbol), $.copy(name), $.copy(decimals), [], [], $c, [$p[0]] as TypeTag[]);
  return;
}

export function mock_create_pair_and_add_liquidity$ (
  admin: HexString,
  symbol: U8[],
  left_amt: U64,
  right_amt: U64,
  lp_amt: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let some_lp, some_x, some_y, unused_x, unused_y;
  create_new_pool$(admin, Std.Signer.address_of$(admin, $c), false, $.copy(symbol), $.copy(symbol), $.copy(symbol), [], [], $c, [$p[0], $p[1]] as TypeTag[]);
  some_x = MockCoin.mint$($.copy(left_amt), $c, [$p[0]] as TypeTag[]);
  some_y = MockCoin.mint$($.copy(right_amt), $c, [$p[1]] as TypeTag[]);
  [unused_x, unused_y, some_lp] = CPSwap.add_liquidity_direct$(some_x, some_y, $c, [$p[0], $p[1]] as TypeTag[]);
  if (!AptosFramework.Coin.value$(unused_x, $c, [$p[0]] as TypeTag[]).eq(u64("0"))) {
    throw $.abortCode(u64("5"));
  }
  if (!AptosFramework.Coin.value$(unused_y, $c, [$p[1]] as TypeTag[]).eq(u64("0"))) {
    throw $.abortCode(u64("5"));
  }
  if (!AptosFramework.Coin.value$(some_lp, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]).eq($.copy(lp_amt))) {
    throw $.abortCode(u64("5"));
  }
  MockCoin.burn$(unused_x, $c, [$p[0]] as TypeTag[]);
  MockCoin.burn$(unused_y, $c, [$p[1]] as TypeTag[]);
  AptosFramework.Coin.deposit$(Std.Signer.address_of$(admin, $c), some_lp, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
  return;
}

export function mock_deploy_script$ (
  admin: HexString,
  $c: AptosDataCache,
): void {
  let admin_addr, btc_amt;
  admin_addr = Std.Signer.address_of$(admin, $c);
  if (!TokenRegistry.TokenRegistry.is_registry_initialized$($.copy(admin_addr), $c)) {
    TokenRegistry.TokenRegistry.initialize$(admin, $c);
  }
  else{
  }
  init_coin_and_create_store$(admin, [u8("66"), u8("105"), u8("116"), u8("99"), u8("111"), u8("105"), u8("110")], [u8("66"), u8("84"), u8("67")], u8("8"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WBTC", [])] as TypeTag[]);
  init_coin_and_create_store$(admin, [u8("85"), u8("83"), u8("68"), u8("67")], [u8("85"), u8("83"), u8("68"), u8("67")], u8("8"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[]);
  init_coin_and_create_store$(admin, [u8("85"), u8("83"), u8("68"), u8("84")], [u8("85"), u8("83"), u8("68"), u8("84")], u8("8"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", [])] as TypeTag[]);
  btc_amt = u64("1000000000");
  mock_create_pair_and_add_liquidity$(admin, [u8("66"), u8("84"), u8("67"), u8("45"), u8("85"), u8("83"), u8("68"), u8("67"), u8("45"), u8("76"), u8("80")], $.copy(btc_amt), $.copy(btc_amt).mul(u64("10000")), $.copy(btc_amt).mul(u64("100")).sub(u64("1000")), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WBTC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[]);
  mock_create_pair_and_add_liquidity$(admin, [u8("66"), u8("84"), u8("67"), u8("45"), u8("85"), u8("83"), u8("68"), u8("84"), u8("45"), u8("76"), u8("80")], $.copy(btc_amt), $.copy(btc_amt).mul(u64("10000")), $.copy(btc_amt).mul(u64("100")).sub(u64("1000")), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WBTC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", [])] as TypeTag[]);
  return;
}


export function buildPayload_mock_deploy_script (
  admin: HexString,
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::CPScripts::mock_deploy_script",
    typeParamStrings,
    []
  );

}
export function remove_liquidity_script$ (
  sender: HexString,
  liquidity: U64,
  amount_x_min: U64,
  amount_y_min: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  CPSwap.remove_liquidity$(sender, $.copy(liquidity), $.copy(amount_x_min), $.copy(amount_y_min), $c, [$p[0], $p[1]] as TypeTag[]);
  return;
}


export function buildPayload_remove_liquidity_script (
  sender: HexString,
  liquidity: U64,
  amount_x_min: U64,
  amount_y_min: U64,
  $p: TypeTag[], /* <X, Y>*/
) {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    "0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::CPScripts::remove_liquidity_script",
    typeParamStrings,
    [
      liquidity.toPayloadArg(),
      amount_x_min.toPayloadArg(),
      amount_y_min.toPayloadArg(),
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
    y_out = CPSwap.swap_x_to_exact_y$(sender, $.copy(x_in), Std.Signer.address_of$(sender, $c), $c, [$p[0], $p[1]] as TypeTag[]);
    if (!$.copy(y_out).ge($.copy(y_min_out))) {
      throw $.abortCode(E_OUTPUT_LESS_THAN_MIN);
    }
  }
  else{
    if ($.copy(y_in).gt(u64("0"))) {
      x_out = CPSwap.swap_y_to_exact_x$(sender, $.copy(y_in), Std.Signer.address_of$(sender, $c), $c, [$p[0], $p[1]] as TypeTag[]);
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
    y_out = CPSwap.swap_x_to_exact_y$(sender, $.copy(x_in), Std.Signer.address_of$(sender, $c), $c, [$p[0], $p[1]] as TypeTag[]);
    if (!$.copy(y_out).ge($.copy(y_min_out))) {
      throw $.abortCode(E_OUTPUT_LESS_THAN_MIN);
    }
  }
  else{
    if ($.copy(y_in).gt(u64("0"))) {
      x_out = CPSwap.swap_y_to_exact_x$(sender, $.copy(y_in), Std.Signer.address_of$(sender, $c), $c, [$p[0], $p[1]] as TypeTag[]);
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
    "0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::CPScripts::swap_script",
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
export function test_add_remove_liquidity$ (
  admin: HexString,
  user: HexString,
  core: HexString,
  $c: AptosDataCache,
): void {
  let btc_amt, price, user_addr;
  AptosFramework.Timestamp.set_time_has_started_for_testing$(core, $c);
  mock_deploy_script$(admin, $c);
  btc_amt = u64("100");
  price = u64("10000");
  MockCoin.faucet_mint_to$(user, $.copy(btc_amt), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WBTC", [])] as TypeTag[]);
  MockCoin.faucet_mint_to$(user, $.copy(btc_amt).mul($.copy(price)), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[]);
  add_liquidity_script$(user, $.copy(btc_amt), $.copy(btc_amt).mul($.copy(price)), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WBTC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[]);
  user_addr = Std.Signer.address_of$(user, $c);
  if (!AptosFramework.Coin.balance$($.copy(user_addr), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WBTC", [])] as TypeTag[]).eq(u64("0"))) {
    throw $.abortCode(u64("0"));
  }
  if (!AptosFramework.Coin.balance$($.copy(user_addr), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[]).eq(u64("0"))) {
    throw $.abortCode(u64("0"));
  }
  remove_liquidity_script$(user, AptosFramework.Coin.balance$($.copy(user_addr), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "LPToken", [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WBTC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])])] as TypeTag[]), u64("0"), u64("0"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WBTC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[]);
  if (!AptosFramework.Coin.balance$($.copy(user_addr), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WBTC", [])] as TypeTag[]).eq($.copy(btc_amt))) {
    throw $.abortCode(u64("0"));
  }
  if (!AptosFramework.Coin.balance$($.copy(user_addr), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[]).eq($.copy(btc_amt).mul($.copy(price)))) {
    throw $.abortCode(u64("0"));
  }
  return;
}


export function buildPayload_test_add_remove_liquidity (
  admin: HexString,
  user: HexString,
  core: HexString,
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::CPScripts::test_add_remove_liquidity",
    typeParamStrings,
    []
  );

}
// test func
export function test_initialization_cpswap$ (
  admin: HexString,
  user: HexString,
  core: HexString,
  $c: AptosDataCache,
): void {
  let admin_addr, user_addr;
  AptosFramework.Timestamp.set_time_has_started_for_testing$(core, $c);
  admin_addr = Std.Signer.address_of$(admin, $c);
  mock_deploy_script$(admin, $c);
  if (!TokenRegistry.TokenRegistry.is_registry_initialized$($.copy(admin_addr), $c)) {
    throw $.abortCode(u64("5"));
  }
  AptosFramework.Coin.register_internal$(user, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WBTC", [])] as TypeTag[]);
  AptosFramework.Coin.register_internal$(user, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[]);
  user_addr = Std.Signer.address_of$(user, $c);
  MockCoin.faucet_mint_to$(user, u64("100"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WBTC", [])] as TypeTag[]);
  if (!AptosFramework.Coin.balance$($.copy(user_addr), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[]).eq(u64("0"))) {
    throw $.abortCode(u64("5"));
  }
  CPSwap.swap_x_to_exact_y$(user, u64("100"), $.copy(user_addr), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WBTC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[]);
  if (!AptosFramework.Coin.balance$($.copy(user_addr), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[]).gt(u64("0"))) {
    throw $.abortCode(u64("5"));
  }
  return;
}


export function buildPayload_test_initialization_cpswap (
  admin: HexString,
  user: HexString,
  core: HexString,
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::CPScripts::test_initialization_cpswap",
    typeParamStrings,
    []
  );

}
// test func
export function test_swap$ (
  admin: HexString,
  user: HexString,
  core: HexString,
  $c: AptosDataCache,
): void {
  let btc_amt, price, usdc_balance;
  AptosFramework.Timestamp.set_time_has_started_for_testing$(core, $c);
  mock_deploy_script$(admin, $c);
  btc_amt = u64("100");
  price = u64("10000");
  MockCoin.faucet_mint_to$(user, $.copy(btc_amt), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WBTC", [])] as TypeTag[]);
  swap_script$(user, $.copy(btc_amt), u64("0"), u64("0"), $.copy(btc_amt).mul($.copy(price)).mul(u64("99")).div(u64("100")), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WBTC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[]);
  usdc_balance = AptosFramework.Coin.balance$(Std.Signer.address_of$(user, $c), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[]);
  swap_script$(user, u64("0"), $.copy(usdc_balance), $.copy(btc_amt).mul(u64("99")).div(u64("100")), u64("0"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WBTC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[]);
  if (!AptosFramework.Coin.balance$(Std.Signer.address_of$(user, $c), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[]).eq(u64("0"))) {
    throw $.abortCode(u64("0"));
  }
  if (!AptosFramework.Coin.balance$(Std.Signer.address_of$(user, $c), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WBTC", [])] as TypeTag[]).ge($.copy(btc_amt).mul(u64("99")).div(u64("100")))) {
    throw $.abortCode(u64("0"));
  }
  return;
}


export function buildPayload_test_swap (
  admin: HexString,
  user: HexString,
  core: HexString,
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::CPScripts::test_swap",
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


