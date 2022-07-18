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
import * as StableCurveSwap from "./StableCurveSwap";
export const packageName = "HippoSwap";
export const moduleAddress = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
export const moduleName = "StableCurveScripts";

export const E_LP_TOKEN_ALREADY_REGISTERED : U64 = u64("7");
export const E_OUTPUT_LESS_THAN_MIN : U64 = u64("3");
export const E_SWAP_NONZERO_INPUT_REQUIRED : U64 = u64("2");
export const E_SWAP_ONLY_ONE_IN_ALLOWED : U64 = u64("0");
export const E_SWAP_ONLY_ONE_OUT_ALLOWED : U64 = u64("1");
export const E_TOKEN_REGISTRY_NOT_INITIALIZED : U64 = u64("4");
export const E_TOKEN_X_NOT_REGISTERED : U64 = u64("5");
export const E_TOKEN_Y_NOT_REGISTERED : U64 = u64("6");
export const MICRO_CONVERSION_FACTOR : U64 = u64("1000000");

export function add_liquidity$ (
  sender: HexString,
  amount_x: U64,
  amount_y: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  StableCurveSwap.add_liquidity$(sender, $.copy(amount_x), $.copy(amount_y), $c, [$p[0], $p[1]] as TypeTag[]);
  return;
}


export function buildPayload_add_liquidity (
  amount_x: U64,
  amount_y: U64,
  $p: TypeTag[], /* <X, Y>*/
) {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    "0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::StableCurveScripts::add_liquidity",
    typeParamStrings,
    [
      $.payloadArg(amount_x),
      $.payloadArg(amount_y),
    ]
  );

}
// #[test]
export function assert_launch_lq$ (
  admin: HexString,
  core: HexString,
  amt_x: U64,
  amt_y: U64,
  lp_predict: U64,
  $c: AptosDataCache,
): void {
  let admin_fee, fee;
  test_data_set_init_coins$(admin, core, $c);
  [fee, admin_fee] = [u64("3000"), u64("200000")];
  mock_create_pair_and_add_liquidity$(admin, [u8("85"), u8("83"), u8("68"), u8("67"), u8("45"), u8("85"), u8("83"), u8("68"), u8("84"), u8("45"), u8("76"), u8("80")], $.copy(fee), $.copy(admin_fee), $.copy(amt_x), $.copy(amt_y), $.copy(lp_predict), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", [])] as TypeTag[]);
  return;
}

export function create_new_pool$ (
  sender: HexString,
  lp_name: U8[],
  lp_symbol: U8[],
  lp_description: U8[],
  lp_logo_url: U8[],
  lp_project_url: U8[],
  fee: U64,
  admin_fee: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let admin_addr, block_timestamp, decimals, decimals__1, future_time;
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
  if (!!TokenRegistry.TokenRegistry.has_token$($.copy(admin_addr), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[])) {
    throw $.abortCode(E_LP_TOKEN_ALREADY_REGISTERED);
  }
  if (!!TokenRegistry.TokenRegistry.has_token$($.copy(admin_addr), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "LPToken", [$p[1], $p[0]])] as TypeTag[])) {
    throw $.abortCode(E_LP_TOKEN_ALREADY_REGISTERED);
  }
  block_timestamp = AptosFramework.Timestamp.now_microseconds$($c);
  future_time = $.copy(block_timestamp).add(u64("24").mul(u64("3600")).mul(MICRO_CONVERSION_FACTOR));
  decimals = Math.max$(u128(AptosFramework.Coin.decimals$($c, [$p[0]] as TypeTag[])), u128(AptosFramework.Coin.decimals$($c, [$p[1]] as TypeTag[])), $c);
  decimals__1 = u64($.copy(decimals));
  StableCurveSwap.initialize$(sender, Std.ASCII.string$($.copy(lp_name), $c), Std.ASCII.string$($.copy(lp_symbol), $c), $.copy(decimals__1), u64("60"), u64("80"), $.copy(block_timestamp), $.copy(future_time), $.copy(fee), $.copy(admin_fee), $c, [$p[0], $p[1]] as TypeTag[]);
  TokenRegistry.TokenRegistry.add_token$(sender, $.copy(lp_name), $.copy(lp_symbol), $.copy(lp_description), u8("8"), $.copy(lp_logo_url), $.copy(lp_project_url), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
  return;
}

// #[test]
export function fail_lp_amt$ (
  admin: HexString,
  core: HexString,
  $c: AptosDataCache,
): void {
  let temp$1, admin_fee, btc_amt, fee;
  AptosFramework.Timestamp.set_time_has_started_for_testing$(core, $c);
  mock_deploy_script$(admin, $c);
  btc_amt = u64("1000000000");
  [fee, admin_fee] = [u64("3000"), u64("200000")];
  MockDeploy.init_coin_and_create_store$(admin, [u8("68"), u8("97"), u8("105")], [u8("68"), u8("65"), u8("73")], u64("8"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  temp$1 = u64("110000000");
  Std.Debug.print$(temp$1, $c, [AtomicTypeTag.U64] as TypeTag[]);
  return mock_create_pair_and_add_liquidity$(admin, [u8("85"), u8("83"), u8("68"), u8("84"), u8("45"), u8("68"), u8("65"), u8("73"), u8("45"), u8("76"), u8("80")], $.copy(fee), $.copy(admin_fee), $.copy(btc_amt), $.copy(btc_amt).mul(u64("10000")), u64("32001352823"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
}


export function buildPayload_fail_lp_amt (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::StableCurveScripts::fail_lp_amt",
    typeParamStrings,
    []
  );

}
export function mock_create_pair_and_add_liquidity$ (
  admin: HexString,
  symbol: U8[],
  fee: U64,
  admin_fee: U64,
  left_amt: U64,
  right_amt: U64,
  lp_amt: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let decimals, decimals__1, future_A, future_A_time, initial_A, initial_A_time, name, some_lp, some_x, some_y, unused_x, unused_y;
  name = Std.ASCII.string$($.copy(symbol), $c);
  [initial_A, future_A] = [u64("60"), u64("100")];
  initial_A_time = AptosFramework.Timestamp.now_microseconds$($c);
  future_A_time = $.copy(initial_A_time).add(u64("24").mul(u64("3600")).mul(MICRO_CONVERSION_FACTOR));
  decimals = Math.max$(u128(AptosFramework.Coin.decimals$($c, [$p[0]] as TypeTag[])), u128(AptosFramework.Coin.decimals$($c, [$p[1]] as TypeTag[])), $c);
  decimals__1 = u64($.copy(decimals));
  StableCurveSwap.initialize$(admin, $.copy(name), $.copy(name), $.copy(decimals__1), $.copy(initial_A), $.copy(future_A), $.copy(initial_A_time), $.copy(future_A_time), $.copy(fee), $.copy(admin_fee), $c, [$p[0], $p[1]] as TypeTag[]);
  TokenRegistry.TokenRegistry.add_token$(admin, $.copy(symbol), $.copy(symbol), $.copy(symbol), u8($.copy(decimals__1)), [], [], $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
  some_x = MockCoin.mint$($.copy(left_amt), $c, [$p[0]] as TypeTag[]);
  some_y = MockCoin.mint$($.copy(right_amt), $c, [$p[1]] as TypeTag[]);
  [unused_x, unused_y, some_lp] = StableCurveSwap.add_liquidity_direct$(some_x, some_y, $c, [$p[0], $p[1]] as TypeTag[]);
  if (!AptosFramework.Coin.value$(some_lp, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]).eq($.copy(lp_amt))) {
    throw $.abortCode(u64("5"));
  }
  MockCoin.burn$(unused_x, $c, [$p[0]] as TypeTag[]);
  MockCoin.burn$(unused_y, $c, [$p[1]] as TypeTag[]);
  AptosFramework.Coin.deposit$(Std.Signer.address_of$(admin, $c), some_lp, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
  return;
}

export function mock_deploy$ (
  admin: HexString,
  $c: AptosDataCache,
): void {
  let admin_addr, admin_fee, coin_amt, fee;
  admin_addr = Std.Signer.address_of$(admin, $c);
  if (!TokenRegistry.TokenRegistry.is_registry_initialized$($.copy(admin_addr), $c)) {
    TokenRegistry.TokenRegistry.initialize$(admin, $c);
  }
  else{
  }
  MockDeploy.init_coin_and_create_store$(admin, [u8("85"), u8("83"), u8("68"), u8("67")], [u8("85"), u8("83"), u8("68"), u8("67")], u64("8"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[]);
  MockDeploy.init_coin_and_create_store$(admin, [u8("85"), u8("83"), u8("68"), u8("84")], [u8("85"), u8("83"), u8("68"), u8("84")], u64("8"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", [])] as TypeTag[]);
  MockDeploy.init_coin_and_create_store$(admin, [u8("68"), u8("65"), u8("73")], [u8("68"), u8("65"), u8("73")], u64("8"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  [fee, admin_fee] = [u64("3000"), u64("200000")];
  coin_amt = u64("1000000000");
  mock_create_pair_and_add_liquidity$(admin, [u8("85"), u8("83"), u8("68"), u8("67"), u8("45"), u8("85"), u8("83"), u8("68"), u8("84"), u8("45"), u8("67"), u8("85"), u8("82"), u8("86"), u8("69"), u8("45"), u8("76"), u8("80")], $.copy(fee), $.copy(admin_fee), $.copy(coin_amt).mul(u64("100")), $.copy(coin_amt).mul(u64("100")), u64("200000000000"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", [])] as TypeTag[]);
  mock_create_pair_and_add_liquidity$(admin, [u8("85"), u8("83"), u8("68"), u8("67"), u8("45"), u8("68"), u8("65"), u8("73"), u8("45"), u8("67"), u8("85"), u8("82"), u8("86"), u8("69"), u8("45"), u8("76"), u8("80")], $.copy(fee), $.copy(admin_fee), $.copy(coin_amt).mul(u64("100")), $.copy(coin_amt).mul(u64("100")), u64("200000000000"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  return;
}

export function mock_deploy_script$ (
  admin: HexString,
  $c: AptosDataCache,
): void {
  mock_deploy$(admin, $c);
  return;
}


export function buildPayload_mock_deploy_script (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::StableCurveScripts::mock_deploy_script",
    typeParamStrings,
    []
  );

}
export function remove_liquidity$ (
  sender: HexString,
  liquidity: U64,
  min_amount_x: U64,
  min_amount_y: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  StableCurveSwap.remove_liquidity$(sender, $.copy(liquidity), $.copy(min_amount_x), $.copy(min_amount_y), $c, [$p[0], $p[1]] as TypeTag[]);
  return;
}


export function buildPayload_remove_liquidity (
  liquidity: U64,
  min_amount_x: U64,
  min_amount_y: U64,
  $p: TypeTag[], /* <X, Y>*/
) {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    "0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::StableCurveScripts::remove_liquidity",
    typeParamStrings,
    [
      $.payloadArg(liquidity),
      $.payloadArg(min_amount_x),
      $.payloadArg(min_amount_y),
    ]
  );

}
// #[test]
export function start_up$ (
  admin: HexString,
  user: HexString,
  core: HexString,
  $c: AptosDataCache,
): void {
  let trader_addr, x, y;
  AptosFramework.Timestamp.set_time_has_started_for_testing$(core, $c);
  MockDeploy.init_registry$(admin, $c);
  MockDeploy.init_coin_and_create_store$(admin, [u8("85"), u8("83"), u8("68"), u8("84")], [u8("85"), u8("83"), u8("68"), u8("84")], u64("6"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", [])] as TypeTag[]);
  MockDeploy.init_coin_and_create_store$(admin, [u8("68"), u8("65"), u8("73")], [u8("68"), u8("65"), u8("73")], u64("6"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  create_new_pool$(admin, [u8("67"), u8("117"), u8("114"), u8("118"), u8("101"), u8("58"), u8("87"), u8("85"), u8("83"), u8("68"), u8("84"), u8("45"), u8("87"), u8("68"), u8("65"), u8("73")], [u8("87"), u8("85"), u8("87"), u8("68")], [], [], [], u64("3000"), u64("200000"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  x = MockCoin.mint$(u64("100000000"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", [])] as TypeTag[]);
  y = MockCoin.mint$(u64("100000000"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  trader_addr = Std.Signer.address_of$(user, $c);
  AptosFramework.Coin.register_internal$(user, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", [])] as TypeTag[]);
  AptosFramework.Coin.register_internal$(user, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  AptosFramework.Coin.register_internal$(user, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "LPToken", [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])])] as TypeTag[]);
  AptosFramework.Coin.deposit$($.copy(trader_addr), x, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", [])] as TypeTag[]);
  AptosFramework.Coin.deposit$($.copy(trader_addr), y, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  return;
}


export function buildPayload_start_up (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::StableCurveScripts::start_up",
    typeParamStrings,
    []
  );

}
export function swap$ (
  sender: HexString,
  x_in: U64,
  y_in: U64,
  x_min_out: U64,
  y_min_out: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let temp$1, temp$2, temp$3, addr, cond_a, cond_b, cond_c, out_amount, out_amount__4;
  if ($.copy(x_in).gt(u64("0"))) {
    temp$1 = $.copy(y_in).gt(u64("0"));
  }
  else{
    temp$1 = false;
  }
  cond_a = temp$1;
  if ($.copy(x_in).eq(u64("0"))) {
    temp$2 = $.copy(y_in).eq(u64("0"));
  }
  else{
    temp$2 = false;
  }
  cond_b = temp$2;
  if ($.copy(x_min_out).gt(u64("0"))) {
    temp$3 = $.copy(y_min_out).gt(u64("0"));
  }
  else{
    temp$3 = false;
  }
  cond_c = temp$3;
  if (!!(cond_a || cond_b)) {
    throw $.abortCode(E_SWAP_ONLY_ONE_IN_ALLOWED);
  }
  if (!!cond_c) {
    throw $.abortCode(E_SWAP_ONLY_ONE_OUT_ALLOWED);
  }
  addr = Std.Signer.address_of$(sender, $c);
  if ($.copy(x_in).gt(u64("0"))) {
    [, , out_amount] = StableCurveSwap.swap_x_to_exact_y$(sender, $.copy(x_in), $.copy(addr), $c, [$p[0], $p[1]] as TypeTag[]);
    if (!$.copy(out_amount).gt($.copy(y_min_out))) {
      throw $.abortCode(E_OUTPUT_LESS_THAN_MIN);
    }
  }
  else{
    [, out_amount__4, ] = StableCurveSwap.swap_y_to_exact_x$(sender, $.copy(y_in), $.copy(addr), $c, [$p[0], $p[1]] as TypeTag[]);
    if (!$.copy(out_amount__4).gt($.copy(x_min_out))) {
      throw $.abortCode(E_OUTPUT_LESS_THAN_MIN);
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
  return swap$(sender, $.copy(x_in), $.copy(y_in), $.copy(x_min_out), $.copy(y_min_out), $c, [$p[0], $p[1]] as TypeTag[]);
}


export function buildPayload_swap_script (
  x_in: U64,
  y_in: U64,
  x_min_out: U64,
  y_min_out: U64,
  $p: TypeTag[], /* <X, Y>*/
) {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    "0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::StableCurveScripts::swap_script",
    typeParamStrings,
    [
      $.payloadArg(x_in),
      $.payloadArg(y_in),
      $.payloadArg(x_min_out),
      $.payloadArg(y_min_out),
    ]
  );

}
// #[test]
export function test_data_set_init_coins$ (
  admin: HexString,
  core: HexString,
  $c: AptosDataCache,
): void {
  let admin_addr;
  AptosFramework.Timestamp.set_time_has_started_for_testing$(core, $c);
  admin_addr = Std.Signer.address_of$(admin, $c);
  if (!TokenRegistry.TokenRegistry.is_registry_initialized$($.copy(admin_addr), $c)) {
    TokenRegistry.TokenRegistry.initialize$(admin, $c);
  }
  else{
  }
  MockDeploy.init_coin_and_create_store$(admin, [u8("85"), u8("83"), u8("68"), u8("67")], [u8("85"), u8("83"), u8("68"), u8("67")], u64("8"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[]);
  MockDeploy.init_coin_and_create_store$(admin, [u8("85"), u8("83"), u8("68"), u8("84")], [u8("85"), u8("83"), u8("68"), u8("84")], u64("8"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", [])] as TypeTag[]);
  if (!AptosFramework.Coin.decimals$($c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[]).eq(u64("8"))) {
    throw $.abortCode(u64("1"));
  }
  if (!AptosFramework.Coin.decimals$($c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", [])] as TypeTag[]).eq(u64("8"))) {
    throw $.abortCode(u64("1"));
  }
  return;
}

// #[test]
export function test_data_set_init_imbalance$ (
  admin: HexString,
  core: HexString,
  $c: AptosDataCache,
): void {
  assert_launch_lq$(admin, core, u64("40").mul(u64("100000000")), u64("60").mul(u64("100000000")), u64("9996588165"), $c);
  return;
}

// #[test]
export function test_data_set_init_small_qr_1$ (
  admin: HexString,
  core: HexString,
  $c: AptosDataCache,
): void {
  assert_launch_lq$(admin, core, u64("100"), u64("9900"), u64("8690"), $c);
  return;
}

// #[test]
export function test_data_set_init_small_qr_2$ (
  admin: HexString,
  core: HexString,
  $c: AptosDataCache,
): void {
  assert_launch_lq$(admin, core, u64("1"), u64("9999"), u64("3199"), $c);
  return;
}

// #[test]
export function test_data_set_init_tiny_q$ (
  admin: HexString,
  core: HexString,
  $c: AptosDataCache,
): void {
  assert_launch_lq$(admin, core, u64("40"), u64("60"), u64("99"), $c);
  return;
}

// #[test]
export function test_data_set_init_tiny_qr_1$ (
  admin: HexString,
  core: HexString,
  $c: AptosDataCache,
): void {
  assert_launch_lq$(admin, core, u64("30"), u64("70"), u64("99"), $c);
  return;
}

// #[test]
export function test_data_set_init_tiny_qr_2$ (
  admin: HexString,
  core: HexString,
  $c: AptosDataCache,
): void {
  assert_launch_lq$(admin, core, u64("10"), u64("90"), u64("98"), $c);
  return;
}

// #[test]
export function test_data_set_init_tiny_qr_3$ (
  admin: HexString,
  core: HexString,
  $c: AptosDataCache,
): void {
  assert_launch_lq$(admin, core, u64("1"), u64("99"), u64("86"), $c);
  return;
}

// #[test]
export function test_data_set_max_level$ (
  admin: HexString,
  core: HexString,
  $c: AptosDataCache,
): void {
  let admin_fee, fee, usdc_amt, usdt_amt;
  test_data_set_init_coins$(admin, core, $c);
  usdc_amt = u64("5").mul(u64("100000000")).mul(u64("10000000000"));
  usdt_amt = u64("5").mul(u64("100000000")).mul(u64("10000000000"));
  [fee, admin_fee] = [u64("3000"), u64("200000")];
  mock_create_pair_and_add_liquidity$(admin, [u8("85"), u8("83"), u8("68"), u8("67"), u8("45"), u8("85"), u8("83"), u8("68"), u8("84"), u8("45"), u8("76"), u8("80")], $.copy(fee), $.copy(admin_fee), $.copy(usdc_amt), $.copy(usdt_amt), u64("10").mul(u64("100000000")).mul(u64("10000000000")), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", [])] as TypeTag[]);
  return;
}

// #[test]
export function test_data_set_trade_proc$ (
  admin: HexString,
  core: HexString,
  $c: AptosDataCache,
): void {
  let admin_addr, balance, balance__1, balance__2, balance__5, balance__6, balance__9, fee_amt_x, fee_amt_x__3, fee_amt_y, fee_amt_y__4, fee_x, fee_x__10, fee_x__7, fee_y, fee_y__11, fee_y__8;
  admin_addr = Std.Signer.address_of$(admin, $c);
  assert_launch_lq$(admin, core, u64("500000"), u64("500000"), u64("1000000"), $c);
  balance = StableCurveSwap.balance$($.copy(admin_addr), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", [])] as TypeTag[]);
  if (!$.copy(balance).eq(u64("1000000"))) {
    throw $.abortCode(u64("1"));
  }
  MockCoin.faucet_mint_to$(admin, u64("500000"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[]);
  MockCoin.faucet_mint_to$(admin, u64("1000000"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", [])] as TypeTag[]);
  StableCurveSwap.add_liquidity$(admin, u64("500000"), u64("1000000"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", [])] as TypeTag[]);
  balance__1 = StableCurveSwap.balance$($.copy(admin_addr), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", [])] as TypeTag[]);
  if (!$.copy(balance__1).eq(u64("2498397"))) {
    throw $.abortCode(u64("1"));
  }
  [, , , fee_amt_x, fee_amt_y, , , , , , , , , ] = StableCurveSwap.get_pool_info$($c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", [])] as TypeTag[]);
  if (!$.copy(fee_amt_x).eq(u64("74"))) {
    throw $.abortCode(u64("1"));
  }
  if (!$.copy(fee_amt_y).eq(u64("75"))) {
    throw $.abortCode(u64("1"));
  }
  MockCoin.faucet_mint_to$(admin, u64("200000"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[]);
  StableCurveSwap.swap_x_to_exact_y$(admin, u64("200000"), $.copy(admin_addr), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", [])] as TypeTag[]);
  balance__2 = AptosFramework.Coin.balance$($.copy(admin_addr), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", [])] as TypeTag[]);
  if (!$.copy(balance__2).eq(u64("200217"))) {
    throw $.abortCode(u64("1"));
  }
  [, , , fee_amt_x__3, fee_amt_y__4, , , , , , , , , ] = StableCurveSwap.get_pool_info$($c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", [])] as TypeTag[]);
  if (!$.copy(fee_amt_x__3).eq(u64("74"))) {
    throw $.abortCode(u64("1"));
  }
  if (!$.copy(fee_amt_y__4).eq(u64("195"))) {
    throw $.abortCode(u64("1"));
  }
  StableCurveSwap.swap_y_to_exact_x$(admin, u64("200000"), $.copy(admin_addr), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", [])] as TypeTag[]);
  balance__5 = AptosFramework.Coin.balance$($.copy(admin_addr), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[]);
  if (!$.copy(balance__5).eq(u64("198587"))) {
    throw $.abortCode(u64("1"));
  }
  [, , , fee_x, fee_y, , , , , , , , , ] = StableCurveSwap.get_pool_info$($c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", [])] as TypeTag[]);
  if (!$.copy(fee_x).eq(u64("193"))) {
    throw $.abortCode(u64("1"));
  }
  if (!$.copy(fee_y).eq(u64("195"))) {
    throw $.abortCode(u64("1"));
  }
  MockCoin.faucet_mint_to$(admin, u64("20000000"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[]);
  StableCurveSwap.swap_x_to_exact_y$(admin, u64("20000000"), $.copy(admin_addr), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", [])] as TypeTag[]);
  balance__6 = AptosFramework.Coin.balance$($.copy(admin_addr), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", [])] as TypeTag[]);
  if (!$.copy(balance__6).eq(u64("1495223"))) {
    throw $.abortCode(u64("1"));
  }
  [, , , fee_x__7, fee_y__8, , , , , , , , , ] = StableCurveSwap.get_pool_info$($c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", [])] as TypeTag[]);
  if (!$.copy(fee_x__7).eq(u64("193"))) {
    throw $.abortCode(u64("1"));
  }
  if (!$.copy(fee_y__8).eq(u64("1094"))) {
    throw $.abortCode(u64("1"));
  }
  MockCoin.faucet_mint_to$(admin, u64("50000000"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[]);
  MockCoin.faucet_mint_to$(admin, u64("10000000"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", [])] as TypeTag[]);
  StableCurveSwap.add_liquidity$(admin, u64("50000000"), u64("10000000"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", [])] as TypeTag[]);
  balance__9 = StableCurveSwap.balance$($.copy(admin_addr), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", [])] as TypeTag[]);
  if (!$.copy(balance__9).eq(u64("25338477"))) {
    throw $.abortCode(u64("1"));
  }
  [, , , fee_x__10, fee_y__11, , , , , , , , , ] = StableCurveSwap.get_pool_info$($c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", [])] as TypeTag[]);
  if (!$.copy(fee_x__10).eq(u64("42969"))) {
    throw $.abortCode(u64("1"));
  }
  if (!$.copy(fee_y__11).eq(u64("4083"))) {
    throw $.abortCode(u64("1"));
  }
  return;
}

// #[test]
export function test_data_set_validate_basic$ (
  admin: HexString,
  core: HexString,
  $c: AptosDataCache,
): void {
  let admin_addr, admin_fee, balance_x, balance_y, fee, lp_precision, multiplier_x, multiplier_y, usdc_amt, usdt_amt;
  test_data_set_init_coins$(admin, core, $c);
  usdc_amt = u64("500000000");
  usdt_amt = u64("500000000");
  [fee, admin_fee] = [u64("3000"), u64("200000")];
  mock_create_pair_and_add_liquidity$(admin, [u8("85"), u8("83"), u8("68"), u8("67"), u8("45"), u8("85"), u8("83"), u8("68"), u8("84"), u8("45"), u8("76"), u8("80")], $.copy(fee), $.copy(admin_fee), $.copy(usdc_amt), $.copy(usdt_amt), u64("1000000000"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", [])] as TypeTag[]);
  [, , , , , lp_precision, multiplier_x, multiplier_y, , , , , , ] = StableCurveSwap.get_pool_info$($c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", [])] as TypeTag[]);
  if (!$.copy(lp_precision).eq(u64("100000000"))) {
    throw $.abortCode(u64("2"));
  }
  if (!$.copy(multiplier_x).eq(u64("1"))) {
    throw $.abortCode(u64("2"));
  }
  if (!$.copy(multiplier_y).eq(u64("1"))) {
    throw $.abortCode(u64("2"));
  }
  StableCurveSwap.remove_liquidity$(admin, u64("100000000"), u64("100000"), u64("100000"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", [])] as TypeTag[]);
  admin_addr = Std.Signer.address_of$(admin, $c);
  balance_x = AptosFramework.Coin.balance$($.copy(admin_addr), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[]);
  balance_y = AptosFramework.Coin.balance$($.copy(admin_addr), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", [])] as TypeTag[]);
  if (!$.copy(balance_x).eq(u64("50000000"))) {
    throw $.abortCode(u64("3"));
  }
  if (!$.copy(balance_y).eq(u64("50000000"))) {
    throw $.abortCode(u64("3"));
  }
  return;
}

// #[test]
export function test_data_set_validate_scale$ (
  admin: HexString,
  core: HexString,
  $c: AptosDataCache,
): void {
  return assert_launch_lq$(admin, core, u64("5000000000"), u64("5000000000"), u64("10000000000"), $c);
}

// #[test]
export function test_fail_output_less_x$ (
  admin: HexString,
  user: HexString,
  core: HexString,
  $c: AptosDataCache,
): void {
  start_up$(admin, user, core, $c);
  add_liquidity$(user, u64("20000000"), u64("20000000"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  swap_script$(user, u64("1"), u64("0"), u64("0"), u64("100000000000"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  return;
}


export function buildPayload_test_fail_output_less_x (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::StableCurveScripts::test_fail_output_less_x",
    typeParamStrings,
    []
  );

}
// #[test]
export function test_fail_output_less_y$ (
  admin: HexString,
  user: HexString,
  core: HexString,
  $c: AptosDataCache,
): void {
  start_up$(admin, user, core, $c);
  add_liquidity$(user, u64("20000000"), u64("20000000"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  swap_script$(user, u64("0"), u64("1"), u64("10000000000"), u64("0"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  return;
}


export function buildPayload_test_fail_output_less_y (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::StableCurveScripts::test_fail_output_less_y",
    typeParamStrings,
    []
  );

}
// #[test]
export function test_failx$ (
  admin: HexString,
  user: HexString,
  core: HexString,
  $c: AptosDataCache,
): void {
  start_up$(admin, user, core, $c);
  add_liquidity$(user, u64("10000000"), u64("20000000"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  swap_script$(user, u64("0"), u64("0"), u64("0"), u64("100"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  return;
}


export function buildPayload_test_failx (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::StableCurveScripts::test_failx",
    typeParamStrings,
    []
  );

}
// #[test]
export function test_faily$ (
  admin: HexString,
  user: HexString,
  core: HexString,
  $c: AptosDataCache,
): void {
  start_up$(admin, user, core, $c);
  add_liquidity$(user, u64("10000000"), u64("20000000"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  swap_script$(user, u64("120"), u64("0"), u64("10"), u64("10"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  return;
}


export function buildPayload_test_faily (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::StableCurveScripts::test_faily",
    typeParamStrings,
    []
  );

}
// #[test]
export function test_mock_deploy$ (
  admin: HexString,
  core: HexString,
  $c: AptosDataCache,
): void {
  AptosFramework.Timestamp.set_time_has_started_for_testing$(core, $c);
  mock_deploy_script$(admin, $c);
  return;
}


export function buildPayload_test_mock_deploy (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::StableCurveScripts::test_mock_deploy",
    typeParamStrings,
    []
  );

}
// #[test]
export function test_scripts$ (
  admin: HexString,
  user: HexString,
  core: HexString,
  $c: AptosDataCache,
): void {
  start_up$(admin, user, core, $c);
  add_liquidity$(user, u64("10000000"), u64("20000000"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  swap_script$(user, u64("2000000"), u64("0"), u64("0"), u64("100"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  swap_script$(user, u64("0"), u64("2000000"), u64("110"), u64("0"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  remove_liquidity$(user, u64("400000"), u64("100"), u64("100"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  return;
}


export function buildPayload_test_scripts (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::StableCurveScripts::test_scripts",
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

export function loadParsers(repo: AptosParserRepo) {
}

