import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient} from "aptos";
import * as AptosFramework from "../AptosFramework";
import * as Std from "../Std";
import * as HippoConfig from "./HippoConfig";
import * as Math from "./Math";
import * as MockCoin from "./MockCoin";
import * as StableCurveNumeral from "./StableCurveNumeral";
export const packageName = "HippoSwap";
export const moduleAddress = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
export const moduleName = "StableCurveSwap";

export const ERROR_ALREADY_INITIALIZED : U64 = u64("1");
export const ERROR_EXCEEDED : U64 = u64("1001");
export const ERROR_ITERATE_END : U64 = u64("1000");
export const ERROR_SWAP_ADDLIQUIDITY_INVALID : U64 = u64("2007");
export const ERROR_SWAP_A_VALUE : U64 = u64("2010");
export const ERROR_SWAP_BURN_CALC_INVALID : U64 = u64("2004");
export const ERROR_SWAP_INVALID_DERIVIATION : U64 = u64("2020");
export const ERROR_SWAP_INVALID_TOKEN_PAIR : U64 = u64("2000");
export const ERROR_SWAP_PRECONDITION : U64 = u64("2001");
export const ERROR_SWAP_PRIVILEGE_INSUFFICIENT : U64 = u64("2003");
export const ERROR_SWAP_RAMP_TIME : U64 = u64("2009");
export const ERROR_SWAP_TOKEN_NOT_EXISTS : U64 = u64("2008");
export const FEE_DENOMINATOR : U128 = u128("1000000");
export const MAX_A : U64 = u64("1000000");
export const MAX_ADMIN_FEE : U64 = u64("1000000");
export const MAX_A_CHANGE : U64 = u64("10");
export const MAX_FEE : U64 = u64("500000");
export const MIN_RAMP_TIME : U64 = u64("86400");


export class LPCapability 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "LPCapability";
  static typeParameters: TypeParamDeclType[] = [
    { name: "X", isPhantom: true },
    { name: "Y", isPhantom: true }
  ];
  static fields: FieldDeclType[] = [
  { name: "mint_cap", typeTag: new StructTag(new HexString("0x1"), "Coin", "MintCapability", [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "LPToken", [new $.TypeParamIdx(0), new $.TypeParamIdx(1)])]) },
  { name: "burn_cap", typeTag: new StructTag(new HexString("0x1"), "Coin", "BurnCapability", [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "LPToken", [new $.TypeParamIdx(0), new $.TypeParamIdx(1)])]) }];

  mint_cap: AptosFramework.Coin.MintCapability;
  burn_cap: AptosFramework.Coin.BurnCapability;

  constructor(proto: any, public typeTag: TypeTag) {
    this.mint_cap = proto['mint_cap'] as AptosFramework.Coin.MintCapability;
    this.burn_cap = proto['burn_cap'] as AptosFramework.Coin.BurnCapability;
  }

  static LPCapabilityParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : LPCapability {
    const proto = $.parseStructProto(data, typeTag, repo, LPCapability);
    return new LPCapability(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, LPCapability, typeParams);
    return result as unknown as LPCapability;
  }
}

export class LPToken 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "LPToken";
  static typeParameters: TypeParamDeclType[] = [
    { name: "X", isPhantom: true },
    { name: "Y", isPhantom: true }
  ];
  static fields: FieldDeclType[] = [
  ];

  constructor(proto: any, public typeTag: TypeTag) {

  }

  static LPTokenParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : LPToken {
    const proto = $.parseStructProto(data, typeTag, repo, LPToken);
    return new LPToken(proto, typeTag);
  }

}

export class StableCurvePoolInfo 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "StableCurvePoolInfo";
  static typeParameters: TypeParamDeclType[] = [
    { name: "X", isPhantom: true },
    { name: "Y", isPhantom: true }
  ];
  static fields: FieldDeclType[] = [
  { name: "disabled", typeTag: AtomicTypeTag.Bool },
  { name: "reserve_x", typeTag: new StructTag(new HexString("0x1"), "Coin", "Coin", [new $.TypeParamIdx(0)]) },
  { name: "reserve_y", typeTag: new StructTag(new HexString("0x1"), "Coin", "Coin", [new $.TypeParamIdx(1)]) },
  { name: "fee_x", typeTag: new StructTag(new HexString("0x1"), "Coin", "Coin", [new $.TypeParamIdx(0)]) },
  { name: "fee_y", typeTag: new StructTag(new HexString("0x1"), "Coin", "Coin", [new $.TypeParamIdx(1)]) },
  { name: "lp_precision", typeTag: AtomicTypeTag.U64 },
  { name: "multiplier_x", typeTag: AtomicTypeTag.U64 },
  { name: "multiplier_y", typeTag: AtomicTypeTag.U64 },
  { name: "fee", typeTag: AtomicTypeTag.U64 },
  { name: "admin_fee", typeTag: AtomicTypeTag.U64 },
  { name: "initial_A", typeTag: AtomicTypeTag.U64 },
  { name: "future_A", typeTag: AtomicTypeTag.U64 },
  { name: "initial_A_time", typeTag: AtomicTypeTag.U64 },
  { name: "future_A_time", typeTag: AtomicTypeTag.U64 }];

  disabled: boolean;
  reserve_x: AptosFramework.Coin.Coin;
  reserve_y: AptosFramework.Coin.Coin;
  fee_x: AptosFramework.Coin.Coin;
  fee_y: AptosFramework.Coin.Coin;
  lp_precision: U64;
  multiplier_x: U64;
  multiplier_y: U64;
  fee: U64;
  admin_fee: U64;
  initial_A: U64;
  future_A: U64;
  initial_A_time: U64;
  future_A_time: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.disabled = proto['disabled'] as boolean;
    this.reserve_x = proto['reserve_x'] as AptosFramework.Coin.Coin;
    this.reserve_y = proto['reserve_y'] as AptosFramework.Coin.Coin;
    this.fee_x = proto['fee_x'] as AptosFramework.Coin.Coin;
    this.fee_y = proto['fee_y'] as AptosFramework.Coin.Coin;
    this.lp_precision = proto['lp_precision'] as U64;
    this.multiplier_x = proto['multiplier_x'] as U64;
    this.multiplier_y = proto['multiplier_y'] as U64;
    this.fee = proto['fee'] as U64;
    this.admin_fee = proto['admin_fee'] as U64;
    this.initial_A = proto['initial_A'] as U64;
    this.future_A = proto['future_A'] as U64;
    this.initial_A_time = proto['initial_A_time'] as U64;
    this.future_A_time = proto['future_A_time'] as U64;
  }

  static StableCurvePoolInfoParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : StableCurvePoolInfo {
    const proto = $.parseStructProto(data, typeTag, repo, StableCurvePoolInfo);
    return new StableCurvePoolInfo(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, StableCurvePoolInfo, typeParams);
    return result as unknown as StableCurvePoolInfo;
  }
}
export function add_liquidity$ (
  sender: HexString,
  amount_x: U64,
  amount_y: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): [U64, U64, U64] {
  let addr, lp_amt, minted_lp_token, x, x_coin, y, y_coin;
  x_coin = AptosFramework.Coin.withdraw$(sender, $.copy(amount_x), $c, [$p[0]] as TypeTag[]);
  y_coin = AptosFramework.Coin.withdraw$(sender, $.copy(amount_y), $c, [$p[1]] as TypeTag[]);
  [x, y, minted_lp_token] = add_liquidity_direct$(x_coin, y_coin, $c, [$p[0], $p[1]] as TypeTag[]);
  addr = Std.Signer.address_of$(sender, $c);
  lp_amt = AptosFramework.Coin.value$(minted_lp_token, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
  AptosFramework.Coin.deposit$($.copy(addr), x, $c, [$p[0]] as TypeTag[]);
  AptosFramework.Coin.deposit$($.copy(addr), y, $c, [$p[1]] as TypeTag[]);
  check_and_deposit$(sender, minted_lp_token, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
  return [$.copy(amount_x), $.copy(amount_y), $.copy(lp_amt)];
}

export function add_liquidity_direct$ (
  x: AptosFramework.Coin.Coin,
  y: AptosFramework.Coin.Coin,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): [AptosFramework.Coin.Coin, AptosFramework.Coin.Coin, AptosFramework.Coin.Coin] {
  let temp$1, _r_b_x, _r_b_y, amp, d0, d1, d2, fee, fee_coin_x, fee_coin_y, fee_x, fee_y, mint_amount, mint_token, n_b_x, n_b_y, new_reserve_x, new_reserve_y, p, reserve_amt_x, reserve_amt_y, token_pair, token_pair__2, token_supply, x_value_prev, y_value_prev;
  p = $c.borrow_global<StableCurvePoolInfo>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "StableCurvePoolInfo", [$p[0], $p[1]]), HippoConfig.admin_address$($c));
  [reserve_amt_x, reserve_amt_y] = [AptosFramework.Coin.value$(p.reserve_x, $c, [$p[0]] as TypeTag[]), AptosFramework.Coin.value$(p.reserve_y, $c, [$p[1]] as TypeTag[])];
  x_value_prev = AptosFramework.Coin.value$(x, $c, [$p[0]] as TypeTag[]);
  y_value_prev = AptosFramework.Coin.value$(y, $c, [$p[1]] as TypeTag[]);
  amp = get_current_A$($.copy(p.initial_A), $.copy(p.future_A), $.copy(p.initial_A_time), $.copy(p.future_A_time), $c);
  d0 = get_D_flat$($.copy(reserve_amt_x), $.copy(reserve_amt_y), $.copy(amp), $.copy(p.multiplier_x), $.copy(p.multiplier_y), $c);
  temp$1 = AptosFramework.Coin.supply$($c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
  token_supply = u128($.copy(Std.Option.borrow$(temp$1, $c, [AtomicTypeTag.U128] as TypeTag[])));
  if ($.copy(token_supply).eq(u128("0"))) {
    if (!$.copy(x_value_prev).gt(u64("0"))) {
      throw $.abortCode(ERROR_SWAP_ADDLIQUIDITY_INVALID);
    }
    if (!$.copy(y_value_prev).gt(u64("0"))) {
      throw $.abortCode(ERROR_SWAP_ADDLIQUIDITY_INVALID);
    }
  }
  else{
  }
  [new_reserve_x, new_reserve_y] = [$.copy(reserve_amt_x).add($.copy(x_value_prev)), $.copy(reserve_amt_y).add($.copy(y_value_prev))];
  d1 = get_D_flat$($.copy(new_reserve_x), $.copy(new_reserve_y), $.copy(amp), $.copy(p.multiplier_x), $.copy(p.multiplier_y), $c);
  if (!$.copy(d1).gt($.copy(d0))) {
    throw $.abortCode(ERROR_SWAP_INVALID_DERIVIATION);
  }
  if ($.copy(token_supply).gt(u128("0"))) {
    fee = $.copy(p.fee).mul(u64("2")).div(u64("4"));
    [n_b_x, _r_b_x, fee_x] = calc_reserve_and_fees$(u128($.copy(new_reserve_x)), u128($.copy(reserve_amt_x)), $.copy(d0), $.copy(d1), u128($.copy(fee)), u128($.copy(p.admin_fee)), $c);
    [n_b_y, _r_b_y, fee_y] = calc_reserve_and_fees$(u128($.copy(new_reserve_y)), u128($.copy(reserve_amt_y)), $.copy(d0), $.copy(d1), u128($.copy(fee)), u128($.copy(p.admin_fee)), $c);
    d2 = get_D_flat$(u64($.copy(n_b_x)), u64($.copy(n_b_y)), $.copy(amp), $.copy(p.multiplier_x), $.copy(p.multiplier_y), $c);
    fee_coin_x = AptosFramework.Coin.extract$(x, u64($.copy(fee_x)), $c, [$p[0]] as TypeTag[]);
    fee_coin_y = AptosFramework.Coin.extract$(y, u64($.copy(fee_y)), $c, [$p[1]] as TypeTag[]);
    token_pair = $c.borrow_global_mut<StableCurvePoolInfo>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "StableCurvePoolInfo", [$p[0], $p[1]]), HippoConfig.admin_address$($c));
    AptosFramework.Coin.merge$(token_pair.reserve_x, x, $c, [$p[0]] as TypeTag[]);
    AptosFramework.Coin.merge$(token_pair.reserve_y, y, $c, [$p[1]] as TypeTag[]);
    AptosFramework.Coin.merge$(token_pair.fee_x, fee_coin_x, $c, [$p[0]] as TypeTag[]);
    AptosFramework.Coin.merge$(token_pair.fee_y, fee_coin_y, $c, [$p[1]] as TypeTag[]);
    mint_amount = $.copy(token_supply).mul($.copy(d2).sub($.copy(d0))).div($.copy(d0));
  }
  else{
    mint_amount = $.copy(d1);
    token_pair__2 = $c.borrow_global_mut<StableCurvePoolInfo>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "StableCurvePoolInfo", [$p[0], $p[1]]), HippoConfig.admin_address$($c));
    AptosFramework.Coin.merge$(token_pair__2.reserve_x, x, $c, [$p[0]] as TypeTag[]);
    AptosFramework.Coin.merge$(token_pair__2.reserve_y, y, $c, [$p[1]] as TypeTag[]);
  }
  mint_token = mint$(u64($.copy(mint_amount)), $c, [$p[0], $p[1]] as TypeTag[]);
  return [AptosFramework.Coin.zero$($c, [$p[0]] as TypeTag[]), AptosFramework.Coin.zero$($c, [$p[1]] as TypeTag[]), mint_token];
}

export function assert_admin$ (
  signer: HexString,
  $c: AptosDataCache,
): void {
  if (!(Std.Signer.address_of$(signer, $c).hex() === HippoConfig.admin_address$($c).hex())) {
    throw $.abortCode(ERROR_SWAP_PRIVILEGE_INSUFFICIENT);
  }
  return;
}

export function balance$ (
  addr: HexString,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): U64 {
  return AptosFramework.Coin.balance$($.copy(addr), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
}

export function burn$ (
  to_burn: AptosFramework.Coin.Coin,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let liquidity_cap;
  liquidity_cap = $c.borrow_global<LPCapability>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "LPCapability", [$p[0], $p[1]]), HippoConfig.admin_address$($c));
  AptosFramework.Coin.burn$(to_burn, liquidity_cap.burn_cap, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
  return;
}

export function calc_reserve_and_fees$ (
  new_reserve: U128,
  old_reserve: U128,
  d0: U128,
  d1: U128,
  average_fee: U128,
  admin_fee: U128,
  $c: AptosDataCache,
): [U128, U128, U128] {
  let admin_fee_amount, difference, fee_amount, ideal_reserve, name_balance, real_balance;
  ideal_reserve = $.copy(d1).mul($.copy(old_reserve)).div($.copy(d0));
  if ($.copy(ideal_reserve).gt($.copy(new_reserve))) {
    difference = $.copy(ideal_reserve).sub($.copy(new_reserve));
  }
  else{
    difference = $.copy(new_reserve).sub($.copy(ideal_reserve));
  }
  fee_amount = $.copy(average_fee).mul($.copy(difference)).div(FEE_DENOMINATOR);
  admin_fee_amount = $.copy(fee_amount).mul($.copy(admin_fee)).div(FEE_DENOMINATOR);
  real_balance = $.copy(new_reserve).sub($.copy(admin_fee_amount));
  name_balance = $.copy(new_reserve).sub($.copy(fee_amount));
  return [$.copy(name_balance), $.copy(real_balance), $.copy(admin_fee_amount)];
}

export function check_and_deposit$ (
  to: HexString,
  coin: AptosFramework.Coin.Coin,
  $c: AptosDataCache,
  $p: TypeTag[], /* <TokenType>*/
): void {
  if (!AptosFramework.Coin.is_account_registered$(Std.Signer.address_of$(to, $c), $c, [$p[0]] as TypeTag[])) {
    AptosFramework.Coin.register_internal$(to, $c, [$p[0]] as TypeTag[]);
  }
  else{
  }
  AptosFramework.Coin.deposit$(Std.Signer.address_of$(to, $c), coin, $c, [$p[0]] as TypeTag[]);
  return;
}

export function create_pool_info$ (
  lp_precision: U64,
  multiplier_x: U64,
  multiplier_y: U64,
  initial_A: U64,
  future_A: U64,
  initial_A_time: U64,
  future_A_time: U64,
  fee: U64,
  admin_fee: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): StableCurvePoolInfo {
  return new StableCurvePoolInfo({ disabled: false, reserve_x: AptosFramework.Coin.zero$($c, [$p[0]] as TypeTag[]), reserve_y: AptosFramework.Coin.zero$($c, [$p[1]] as TypeTag[]), fee_x: AptosFramework.Coin.zero$($c, [$p[0]] as TypeTag[]), fee_y: AptosFramework.Coin.zero$($c, [$p[1]] as TypeTag[]), lp_precision: $.copy(lp_precision), multiplier_x: $.copy(multiplier_x), multiplier_y: $.copy(multiplier_y), fee: $.copy(fee), admin_fee: $.copy(admin_fee), initial_A: $.copy(initial_A), future_A: $.copy(future_A), initial_A_time: $.copy(initial_A_time), future_A_time: $.copy(future_A_time) }, new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "StableCurvePoolInfo", [$p[0], $p[1]]));
}

// #[test]
export function fail_add_liquidity$ (
  admin: HexString,
  core: HexString,
  vm: HexString,
  $c: AptosDataCache,
): void {
  let liquidity, x, x_remain, y, y_remain;
  init_lp_token$(admin, core, vm, $c);
  update_time$(vm, time$(u64("200"), $c), $c);
  x = MockCoin.mint$(u64("0"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", [])] as TypeTag[]);
  y = MockCoin.mint$(u64("0"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  [x_remain, y_remain, liquidity] = add_liquidity_direct$(x, y, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  AptosFramework.Coin.deposit$(Std.Signer.address_of$(admin, $c), liquidity, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "LPToken", [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])])] as TypeTag[]);
  AptosFramework.Coin.deposit$(Std.Signer.address_of$(admin, $c), x_remain, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", [])] as TypeTag[]);
  return AptosFramework.Coin.deposit$(Std.Signer.address_of$(admin, $c), y_remain, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
}

// #[test]
export function fail_add_liquidity_d1$ (
  admin: HexString,
  core: HexString,
  vm: HexString,
  $c: AptosDataCache,
): void {
  let liquidity, trader_addr, x, x__1, x_remain, y, y__2, y_remain;
  init_lp_token$(admin, core, vm, $c);
  update_time$(vm, time$(u64("200"), $c), $c);
  trader_addr = Std.Signer.address_of$(admin, $c);
  x = MockCoin.mint$(u64("100000000"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", [])] as TypeTag[]);
  y = MockCoin.mint$(u64("100000000"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  AptosFramework.Coin.deposit$($.copy(trader_addr), x, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", [])] as TypeTag[]);
  AptosFramework.Coin.deposit$($.copy(trader_addr), y, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  add_liquidity$(admin, u64("7000000"), u64("2000000"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  x__1 = MockCoin.mint$(u64("0"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", [])] as TypeTag[]);
  y__2 = MockCoin.mint$(u64("0"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  [x_remain, y_remain, liquidity] = add_liquidity_direct$(x__1, y__2, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  AptosFramework.Coin.deposit$(Std.Signer.address_of$(admin, $c), liquidity, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "LPToken", [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])])] as TypeTag[]);
  AptosFramework.Coin.deposit$(Std.Signer.address_of$(admin, $c), x_remain, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", [])] as TypeTag[]);
  return AptosFramework.Coin.deposit$(Std.Signer.address_of$(admin, $c), y_remain, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
}

// #[test]
export function fail_add_liquidity_y$ (
  admin: HexString,
  core: HexString,
  vm: HexString,
  $c: AptosDataCache,
): void {
  let liquidity, x, x_remain, y, y_remain;
  init_lp_token$(admin, core, vm, $c);
  update_time$(vm, time$(u64("200"), $c), $c);
  x = MockCoin.mint$(u64("20"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", [])] as TypeTag[]);
  y = MockCoin.mint$(u64("0"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  [x_remain, y_remain, liquidity] = add_liquidity_direct$(x, y, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  AptosFramework.Coin.deposit$(Std.Signer.address_of$(admin, $c), liquidity, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "LPToken", [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])])] as TypeTag[]);
  AptosFramework.Coin.deposit$(Std.Signer.address_of$(admin, $c), x_remain, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", [])] as TypeTag[]);
  return AptosFramework.Coin.deposit$(Std.Signer.address_of$(admin, $c), y_remain, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
}

// #[test]
export function fail_assert_admin$ (
  core: HexString,
  $c: AptosDataCache,
): void {
  assert_admin$(core, $c);
  return;
}

// #[test]
export function fail_x$ (
  admin: HexString,
  $c: AptosDataCache,
): void {
  initialize_coin$(admin, Std.ASCII.string$([u8("67"), u8("117"), u8("114"), u8("118"), u8("101"), u8("58"), u8("87"), u8("69"), u8("84"), u8("72"), u8("45"), u8("87"), u8("68"), u8("65"), u8("73")], $c), Std.ASCII.string$([u8("87"), u8("69"), u8("87"), u8("68")], $c), u64("1000000"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  return;
}

// #[test]
export function fail_y$ (
  admin: HexString,
  $c: AptosDataCache,
): void {
  MockCoin.initialize$(admin, u64("6"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", [])] as TypeTag[]);
  initialize_coin$(admin, Std.ASCII.string$([u8("67"), u8("117"), u8("114"), u8("118"), u8("101"), u8("58"), u8("87"), u8("69"), u8("84"), u8("72"), u8("45"), u8("87"), u8("68"), u8("65"), u8("73")], $c), Std.ASCII.string$([u8("87"), u8("69"), u8("87"), u8("68")], $c), u64("1000000"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  return;
}

// #[test]
export function genesis$ (
  core: HexString,
  vm: HexString,
  $c: AptosDataCache,
): void {
  AptosFramework.Genesis.setup$(core, $c);
  update_time$(vm, time$(u64("0"), $c), $c);
  return;
}

export function get_D_flat$ (
  amount_x: U64,
  amount_y: U64,
  amp: U64,
  multiplier_x: U64,
  multiplier_y: U64,
  $c: AptosDataCache,
): U128 {
  return StableCurveNumeral.get_D$(u128($.copy(multiplier_x).mul($.copy(amount_x))), u128($.copy(multiplier_y).mul($.copy(amount_y))), $.copy(amp), $c);
}

export function get_current_A$ (
  initial_A: U64,
  future_A: U64,
  initial_A_time: U64,
  future_A_time: U64,
  $c: AptosDataCache,
): U64 {
  let block_timestamp;
  block_timestamp = AptosFramework.Timestamp.now_microseconds$($c);
  return StableCurveNumeral.get_A$($.copy(initial_A), $.copy(future_A), $.copy(initial_A_time), $.copy(future_A_time), $.copy(block_timestamp), $c);
}

// #[test]
export function get_fee_amounts$ (
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): [U64, U64] {
  let i;
  i = $c.borrow_global<StableCurvePoolInfo>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "StableCurvePoolInfo", [$p[0], $p[1]]), HippoConfig.admin_address$($c));
  return [AptosFramework.Coin.value$(i.fee_x, $c, [$p[0]] as TypeTag[]), AptosFramework.Coin.value$(i.fee_y, $c, [$p[1]] as TypeTag[])];
}

// #[test]
export function get_pool_info$ (
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): [boolean, U64, U64, U64, U64, U64, U64, U64, U64, U64, U64, U64, U64, U64] {
  let i;
  i = $c.borrow_global<StableCurvePoolInfo>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "StableCurvePoolInfo", [$p[0], $p[1]]), HippoConfig.admin_address$($c));
  return [$.copy(i.disabled), AptosFramework.Coin.value$(i.reserve_x, $c, [$p[0]] as TypeTag[]), AptosFramework.Coin.value$(i.reserve_y, $c, [$p[1]] as TypeTag[]), AptosFramework.Coin.value$(i.fee_x, $c, [$p[0]] as TypeTag[]), AptosFramework.Coin.value$(i.fee_y, $c, [$p[1]] as TypeTag[]), $.copy(i.lp_precision), $.copy(i.multiplier_x), $.copy(i.multiplier_y), $.copy(i.fee), $.copy(i.admin_fee), $.copy(i.initial_A), $.copy(i.future_A), $.copy(i.initial_A_time), $.copy(i.future_A_time)];
}

// #[test]
export function get_reserve_amounts$ (
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): [U64, U64] {
  let i;
  i = $c.borrow_global<StableCurvePoolInfo>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "StableCurvePoolInfo", [$p[0], $p[1]]), HippoConfig.admin_address$($c));
  return [AptosFramework.Coin.value$(i.reserve_x, $c, [$p[0]] as TypeTag[]), AptosFramework.Coin.value$(i.reserve_y, $c, [$p[1]] as TypeTag[])];
}

export function get_xp_mem$ (
  reserve_x: U64,
  reserve_y: U64,
  multiplier_x: U64,
  multiplier_y: U64,
  $c: AptosDataCache,
): [U64, U64] {
  return [$.copy(multiplier_x).mul($.copy(reserve_x)), $.copy(multiplier_y).mul($.copy(reserve_y))];
}

export function get_y$ (
  i: U64,
  dx: U64,
  xp: U64,
  yp: U64,
  initial_A: U64,
  initial_A_time: U64,
  future_A: U64,
  future_A_time: U64,
  $c: AptosDataCache,
): U64 {
  let temp$1, amp, d, x;
  amp = get_current_A$($.copy(initial_A), $.copy(future_A), $.copy(initial_A_time), $.copy(future_A_time), $c);
  d = StableCurveNumeral.get_D$(u128($.copy(xp)), u128($.copy(yp)), $.copy(amp), $c);
  if ($.copy(i).eq(u64("0"))) {
    temp$1 = $.copy(dx).add($.copy(xp));
  }
  else{
    temp$1 = $.copy(dx).add($.copy(yp));
  }
  x = temp$1;
  return u64(StableCurveNumeral.get_y$($.copy(x), $.copy(amp), $.copy(d), $c));
}

// #[test]
export function init_lp_token$ (
  admin: HexString,
  core: HexString,
  vm: HexString,
  $c: AptosDataCache,
): void {
  let admin_fee, fa, fat, fee, ia, iat;
  genesis$(core, vm, $c);
  MockCoin.initialize$(admin, u64("6"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", [])] as TypeTag[]);
  MockCoin.initialize$(admin, u64("6"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  [ia, fa, iat, fat] = mock_curve_params$($c);
  [fee, admin_fee] = [u64("3000"), u64("200000")];
  initialize$(admin, Std.ASCII.string$([u8("67"), u8("117"), u8("114"), u8("118"), u8("101"), u8("58"), u8("87"), u8("69"), u8("84"), u8("72"), u8("45"), u8("87"), u8("68"), u8("65"), u8("73")], $c), Std.ASCII.string$([u8("87"), u8("69"), u8("87"), u8("68")], $c), u64("6"), $.copy(ia), $.copy(fa), $.copy(iat), $.copy(fat), $.copy(fee), $.copy(admin_fee), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  return;
}

// #[test]
export function init_mock_coin$ (
  creator: HexString,
  $c: AptosDataCache,
  $p: TypeTag[], /* <Money>*/
): AptosFramework.Coin.Coin {
  MockCoin.initialize$(creator, u64("9"), $c, [$p[0]] as TypeTag[]);
  return MockCoin.mint$(u64("20"), $c, [$p[0]] as TypeTag[]);
}

// #[test]
export function init_with_liquidity$ (
  admin: HexString,
  core: HexString,
  vm: HexString,
  trader: HexString,
  $c: AptosDataCache,
): void {
  let trader_addr, x, y;
  init_lp_token$(admin, core, vm, $c);
  update_time$(vm, time$(u64("200"), $c), $c);
  trader_addr = Std.Signer.address_of$(trader, $c);
  AptosFramework.Coin.register_internal$(trader, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", [])] as TypeTag[]);
  AptosFramework.Coin.register_internal$(trader, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  AptosFramework.Coin.register_internal$(trader, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "LPToken", [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])])] as TypeTag[]);
  x = MockCoin.mint$(u64("100000000"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", [])] as TypeTag[]);
  y = MockCoin.mint$(u64("100000000"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  AptosFramework.Coin.deposit$($.copy(trader_addr), x, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", [])] as TypeTag[]);
  AptosFramework.Coin.deposit$($.copy(trader_addr), y, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  add_liquidity$(trader, u64("7000000"), u64("2000000"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  add_liquidity$(trader, u64("21000000"), u64("38200000"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  return;
}

export function initialize$ (
  signer: HexString,
  lp_name: Std.ASCII.String,
  lp_symbol: Std.ASCII.String,
  lp_decimal: U64,
  initial_A: U64,
  future_A: U64,
  initial_A_time: U64,
  future_A_time: U64,
  fee: U64,
  admin_fee: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let lp_precision, token_pair, x_decimal, x_rate, y_decimal, y_rate;
  assert_admin$(signer, $c);
  [x_decimal, y_decimal] = [AptosFramework.Coin.decimals$($c, [$p[0]] as TypeTag[]), AptosFramework.Coin.decimals$($c, [$p[1]] as TypeTag[])];
  lp_precision = u64(Math.pow$(u128("10"), u8($.copy(lp_decimal)), $c));
  x_rate = u64(Math.pow$(u128("10"), u8($.copy(lp_decimal).sub($.copy(x_decimal))), $c));
  y_rate = u64(Math.pow$(u128("10"), u8($.copy(lp_decimal).sub($.copy(y_decimal))), $c));
  initialize_coin$(signer, $.copy(lp_name), $.copy(lp_symbol), u64($.copy(lp_precision)), $c, [$p[0], $p[1]] as TypeTag[]);
  token_pair = create_pool_info$($.copy(lp_precision), $.copy(x_rate), $.copy(y_rate), $.copy(initial_A), $.copy(future_A), $.copy(initial_A_time), $.copy(future_A_time), $.copy(fee), $.copy(admin_fee), $c, [$p[0], $p[1]] as TypeTag[]);
  $c.move_to(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "StableCurvePoolInfo", [$p[0], $p[1]]), signer, token_pair);
  return;
}

export function initialize_coin$ (
  signer: HexString,
  name: Std.ASCII.String,
  symbol: Std.ASCII.String,
  decimals: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let addr, burn_capability, mint_capability;
  addr = Std.Signer.address_of$(signer, $c);
  if (!!$c.exists(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "StableCurvePoolInfo", [$p[0], $p[1]]), $.copy(addr))) {
    throw $.abortCode(ERROR_ALREADY_INITIALIZED);
  }
  if (!!$c.exists(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "StableCurvePoolInfo", [$p[1], $p[0]]), $.copy(addr))) {
    throw $.abortCode(ERROR_ALREADY_INITIALIZED);
  }
  if (!AptosFramework.Coin.is_coin_initialized$($c, [$p[0]] as TypeTag[])) {
    throw $.abortCode(ERROR_SWAP_INVALID_TOKEN_PAIR);
  }
  if (!AptosFramework.Coin.is_coin_initialized$($c, [$p[1]] as TypeTag[])) {
    throw $.abortCode(ERROR_SWAP_INVALID_TOKEN_PAIR);
  }
  [mint_capability, burn_capability] = AptosFramework.Coin.initialize$(signer, $.copy(name), $.copy(symbol), $.copy(decimals), true, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
  AptosFramework.Coin.register_internal$(signer, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
  $c.move_to(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "LPCapability", [$p[0], $p[1]]), signer, new LPCapability({ mint_cap: $.copy(mint_capability), burn_cap: $.copy(burn_capability) }, new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "LPCapability", [$p[0], $p[1]])));
  return;
}

export function mint$ (
  amount: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): AptosFramework.Coin.Coin {
  let liquidity_cap, mint_token;
  liquidity_cap = $c.borrow_global<LPCapability>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "LPCapability", [$p[0], $p[1]]), HippoConfig.admin_address$($c));
  mint_token = AptosFramework.Coin.mint$($.copy(amount), liquidity_cap.mint_cap, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
  return mint_token;
}

// #[test]
export function mint_lptoken_coin$ (
  admin: HexString,
  core: HexString,
  vm: HexString,
  $c: AptosDataCache,
): void {
  let addr, liquidity, x, x__1, x_remain, y, y__2, y_remain;
  init_lp_token$(admin, core, vm, $c);
  update_time$(vm, time$(u64("200"), $c), $c);
  x = MockCoin.mint$(u64("10000000"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", [])] as TypeTag[]);
  y = MockCoin.mint$(u64("10000000"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  [x_remain, y_remain, liquidity] = add_liquidity_direct$(x, y, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  [x__1, y__2] = withdraw_liquidity$(liquidity, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  addr = Std.Signer.address_of$(admin, $c);
  AptosFramework.Coin.deposit$($.copy(addr), x__1, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", [])] as TypeTag[]);
  AptosFramework.Coin.deposit$($.copy(addr), y__2, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  AptosFramework.Coin.deposit$($.copy(addr), x_remain, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", [])] as TypeTag[]);
  AptosFramework.Coin.deposit$($.copy(addr), y_remain, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  return;
}

// #[test]
export function mint_mock_coin$ (
  admin: HexString,
  $c: AptosDataCache,
): void {
  let coin, decimals;
  decimals = u64("6");
  MockCoin.initialize$(admin, $.copy(decimals), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", [])] as TypeTag[]);
  MockCoin.initialize$(admin, $.copy(decimals), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  initialize_coin$(admin, Std.ASCII.string$([u8("67"), u8("117"), u8("114"), u8("118"), u8("101"), u8("58"), u8("87"), u8("69"), u8("84"), u8("72"), u8("45"), u8("87"), u8("68"), u8("65"), u8("73")], $c), Std.ASCII.string$([u8("87"), u8("69"), u8("87"), u8("68")], $c), $.copy(decimals), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  coin = mint$(u64("1000000"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  return burn$(coin, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
}

// #[test]
export function mock_add_liquidity$ (
  admin: HexString,
  core: HexString,
  vm: HexString,
  trader: HexString,
  $c: AptosDataCache,
): void {
  let temp$1, temp$2, trader_addr, x, x__3, y, y__4;
  init_lp_token$(admin, core, vm, $c);
  update_time$(vm, time$(u64("200"), $c), $c);
  trader_addr = Std.Signer.address_of$(trader, $c);
  AptosFramework.Coin.register_internal$(trader, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", [])] as TypeTag[]);
  AptosFramework.Coin.register_internal$(trader, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  AptosFramework.Coin.register_internal$(trader, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "LPToken", [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])])] as TypeTag[]);
  x = MockCoin.mint$(u64("100000000"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", [])] as TypeTag[]);
  y = MockCoin.mint$(u64("100000000"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  AptosFramework.Coin.deposit$($.copy(trader_addr), x, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", [])] as TypeTag[]);
  AptosFramework.Coin.deposit$($.copy(trader_addr), y, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  add_liquidity$(trader, u64("7000000"), u64("2000000"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  temp$1 = AptosFramework.Coin.balance$($.copy(trader_addr), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "LPToken", [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])])] as TypeTag[]);
  Std.Debug.print$(temp$1, $c, [AtomicTypeTag.U64] as TypeTag[]);
  add_liquidity$(trader, u64("21000000"), u64("38200000"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  temp$2 = AptosFramework.Coin.balance$($.copy(trader_addr), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "LPToken", [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])])] as TypeTag[]);
  Std.Debug.print$(temp$2, $c, [AtomicTypeTag.U64] as TypeTag[]);
  [x__3, y__4] = remove_liquidity$(trader, u64("1000000"), u64("2000"), u64("2000"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  Std.Debug.print$(x__3, $c, [AtomicTypeTag.U64] as TypeTag[]);
  Std.Debug.print$(y__4, $c, [AtomicTypeTag.U64] as TypeTag[]);
  return;
}

// #[test]
export function mock_curve_params$ (
  $c: AptosDataCache,
): [U64, U64, U64, U64] {
  let future_A, future_A_time, initial_A, initial_A_time;
  initial_A = u64("100");
  future_A = u64("200");
  initial_A_time = time$(u64("0"), $c);
  future_A_time = time$(u64("3600"), $c);
  return [$.copy(initial_A), $.copy(future_A), $.copy(initial_A_time), $.copy(future_A_time)];
}

export function ramp_A$ (
  account: HexString,
  new_future_A: U64,
  future_time: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let block_timestamp, cond_a, cond_b, future_A_p, initial_A, p, pair;
  assert_admin$(account, $c);
  p = $c.borrow_global<StableCurvePoolInfo>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "StableCurvePoolInfo", [$p[0], $p[1]]), HippoConfig.admin_address$($c));
  block_timestamp = AptosFramework.Timestamp.now_microseconds$($c);
  if (!$.copy(block_timestamp).ge($.copy(p.initial_A_time).add(MIN_RAMP_TIME))) {
    throw $.abortCode(ERROR_SWAP_RAMP_TIME);
  }
  if (!$.copy(future_time).ge($.copy(block_timestamp).add(MIN_RAMP_TIME))) {
    throw $.abortCode(ERROR_SWAP_RAMP_TIME);
  }
  initial_A = get_current_A$($.copy(p.initial_A), $.copy(p.future_A), $.copy(p.initial_A_time), $.copy(p.future_A_time), $c);
  future_A_p = $.copy(new_future_A);
  cond_a = $.copy(new_future_A).gt(u64("0"));
  cond_b = $.copy(new_future_A).lt(MAX_A);
  if (!(cond_a && cond_b)) {
    throw $.abortCode(ERROR_SWAP_A_VALUE);
  }
  if ($.copy(future_A_p).lt($.copy(initial_A))) {
    if (!$.copy(future_A_p).mul(MAX_A_CHANGE).ge($.copy(initial_A))) {
      throw $.abortCode(ERROR_SWAP_A_VALUE);
    }
  }
  else{
    if (!$.copy(future_A_p).le($.copy(initial_A).mul(MAX_A_CHANGE))) {
      throw $.abortCode(ERROR_SWAP_A_VALUE);
    }
  }
  pair = $c.borrow_global_mut<StableCurvePoolInfo>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "StableCurvePoolInfo", [$p[0], $p[1]]), HippoConfig.admin_address$($c));
  pair.initial_A = $.copy(initial_A);
  pair.future_A = $.copy(future_A_p);
  pair.initial_A_time = $.copy(block_timestamp);
  pair.future_A_time = $.copy(future_time);
  return;
}

export function remove_liquidity$ (
  sender: HexString,
  liquidity: U64,
  min_amount_x: U64,
  min_amount_y: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): [U64, U64] {
  let amount_x, amount_y, coin, coin_x, coin_y;
  coin = AptosFramework.Coin.withdraw$(sender, $.copy(liquidity), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
  [coin_x, coin_y] = withdraw_liquidity$(coin, $c, [$p[0], $p[1]] as TypeTag[]);
  [amount_x, amount_y] = [AptosFramework.Coin.value$(coin_x, $c, [$p[0]] as TypeTag[]), AptosFramework.Coin.value$(coin_y, $c, [$p[1]] as TypeTag[])];
  if (!$.copy(amount_x).gt($.copy(min_amount_x))) {
    throw $.abortCode(ERROR_SWAP_PRECONDITION);
  }
  if (!$.copy(amount_y).gt($.copy(min_amount_y))) {
    throw $.abortCode(ERROR_SWAP_PRECONDITION);
  }
  AptosFramework.Coin.deposit$(Std.Signer.address_of$(sender, $c), coin_x, $c, [$p[0]] as TypeTag[]);
  AptosFramework.Coin.deposit$(Std.Signer.address_of$(sender, $c), coin_y, $c, [$p[1]] as TypeTag[]);
  return [$.copy(amount_x), $.copy(amount_y)];
}

export function stop_ramp_A$ (
  account: HexString,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let block_timestamp, current_A, p, pair;
  assert_admin$(account, $c);
  p = $c.borrow_global<StableCurvePoolInfo>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "StableCurvePoolInfo", [$p[0], $p[1]]), HippoConfig.admin_address$($c));
  current_A = get_current_A$($.copy(p.initial_A), $.copy(p.future_A), $.copy(p.initial_A_time), $.copy(p.future_A_time), $c);
  block_timestamp = AptosFramework.Timestamp.now_microseconds$($c);
  pair = $c.borrow_global_mut<StableCurvePoolInfo>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "StableCurvePoolInfo", [$p[0], $p[1]]), HippoConfig.admin_address$($c));
  pair.initial_A = $.copy(current_A);
  pair.future_A = $.copy(current_A);
  pair.initial_A_time = $.copy(block_timestamp);
  pair.future_A_time = $.copy(block_timestamp);
  return;
}

export function swap_x_to_exact_y$ (
  sender: HexString,
  amount_in: U64,
  to: HexString,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): [U64, U64, U64] {
  let coin_x, coin_y, out_amount, x_out, x_remain;
  coin_x = AptosFramework.Coin.withdraw$(sender, $.copy(amount_in), $c, [$p[0]] as TypeTag[]);
  [x_remain, x_out, coin_y] = swap_x_to_exact_y_direct$(coin_x, $c, [$p[0], $p[1]] as TypeTag[]);
  out_amount = AptosFramework.Coin.value$(coin_y, $c, [$p[1]] as TypeTag[]);
  AptosFramework.Coin.merge$(x_out, x_remain, $c, [$p[0]] as TypeTag[]);
  AptosFramework.Coin.deposit$($.copy(to), x_out, $c, [$p[0]] as TypeTag[]);
  AptosFramework.Coin.deposit$($.copy(to), coin_y, $c, [$p[1]] as TypeTag[]);
  return [$.copy(amount_in), u64("0"), $.copy(out_amount)];
}

export function swap_x_to_exact_y_direct$ (
  coins_in: AptosFramework.Coin.Coin,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): [AptosFramework.Coin.Coin, AptosFramework.Coin.Coin, AptosFramework.Coin.Coin] {
  let amount_dy, amount_dy_fee, charged_amt_dy, coin_dy, coin_fee, dx, dx_rated, dy_admin_fee, i, p, reserve_amt_x, reserve_amt_y, swap_pair, xp, y, yp;
  p = $c.borrow_global<StableCurvePoolInfo>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "StableCurvePoolInfo", [$p[0], $p[1]]), HippoConfig.admin_address$($c));
  [reserve_amt_x, reserve_amt_y] = [AptosFramework.Coin.value$(p.reserve_x, $c, [$p[0]] as TypeTag[]), AptosFramework.Coin.value$(p.reserve_y, $c, [$p[1]] as TypeTag[])];
  [xp, yp] = get_xp_mem$($.copy(reserve_amt_x), $.copy(reserve_amt_y), $.copy(p.multiplier_x), $.copy(p.multiplier_y), $c);
  i = u64("0");
  dx = AptosFramework.Coin.value$(coins_in, $c, [$p[0]] as TypeTag[]);
  dx_rated = $.copy(dx).mul($.copy(p.multiplier_x));
  y = get_y$($.copy(i), $.copy(dx_rated), $.copy(xp), $.copy(yp), $.copy(p.initial_A), $.copy(p.initial_A_time), $.copy(p.future_A), $.copy(p.future_A_time), $c);
  amount_dy = $.copy(yp).sub($.copy(y)).sub(u64("1")).div($.copy(p.multiplier_y));
  amount_dy_fee = $.copy(amount_dy).mul($.copy(p.fee)).div(u64(FEE_DENOMINATOR));
  charged_amt_dy = $.copy(amount_dy).sub($.copy(amount_dy_fee));
  dy_admin_fee = $.copy(amount_dy_fee).mul($.copy(p.admin_fee)).div(u64(FEE_DENOMINATOR));
  swap_pair = $c.borrow_global_mut<StableCurvePoolInfo>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "StableCurvePoolInfo", [$p[0], $p[1]]), HippoConfig.admin_address$($c));
  AptosFramework.Coin.merge$(swap_pair.reserve_x, coins_in, $c, [$p[0]] as TypeTag[]);
  coin_dy = AptosFramework.Coin.extract$(swap_pair.reserve_y, $.copy(charged_amt_dy), $c, [$p[1]] as TypeTag[]);
  coin_fee = AptosFramework.Coin.extract$(swap_pair.reserve_y, $.copy(dy_admin_fee), $c, [$p[1]] as TypeTag[]);
  AptosFramework.Coin.merge$(swap_pair.fee_y, coin_fee, $c, [$p[1]] as TypeTag[]);
  return [AptosFramework.Coin.zero$($c, [$p[0]] as TypeTag[]), AptosFramework.Coin.zero$($c, [$p[0]] as TypeTag[]), coin_dy];
}

export function swap_y_to_exact_x$ (
  sender: HexString,
  amount_in: U64,
  to: HexString,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): [U64, U64, U64] {
  let coin_y, out_amount, x_out, y_out, y_remain;
  coin_y = AptosFramework.Coin.withdraw$(sender, $.copy(amount_in), $c, [$p[1]] as TypeTag[]);
  [y_remain, x_out, y_out] = swap_y_to_exact_x_direct$(coin_y, $c, [$p[0], $p[1]] as TypeTag[]);
  out_amount = AptosFramework.Coin.value$(x_out, $c, [$p[0]] as TypeTag[]);
  AptosFramework.Coin.merge$(y_out, y_remain, $c, [$p[1]] as TypeTag[]);
  AptosFramework.Coin.deposit$($.copy(to), x_out, $c, [$p[0]] as TypeTag[]);
  AptosFramework.Coin.deposit$($.copy(to), y_out, $c, [$p[1]] as TypeTag[]);
  return [$.copy(amount_in), $.copy(out_amount), u64("0")];
}

export function swap_y_to_exact_x_direct$ (
  coins_in: AptosFramework.Coin.Coin,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): [AptosFramework.Coin.Coin, AptosFramework.Coin.Coin, AptosFramework.Coin.Coin] {
  let amount_dx, amount_dx_fee, charged_amt_dx, coin_dx, coin_fee, dx_admin_fee, dy, dy_rated, i, p, reserve_amt_x, reserve_amt_y, swap_pair, x, xp, yp;
  p = $c.borrow_global<StableCurvePoolInfo>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "StableCurvePoolInfo", [$p[0], $p[1]]), HippoConfig.admin_address$($c));
  [reserve_amt_x, reserve_amt_y] = [AptosFramework.Coin.value$(p.reserve_x, $c, [$p[0]] as TypeTag[]), AptosFramework.Coin.value$(p.reserve_y, $c, [$p[1]] as TypeTag[])];
  [xp, yp] = get_xp_mem$($.copy(reserve_amt_x), $.copy(reserve_amt_y), $.copy(p.multiplier_x), $.copy(p.multiplier_y), $c);
  i = u64("1");
  dy = AptosFramework.Coin.value$(coins_in, $c, [$p[1]] as TypeTag[]);
  dy_rated = $.copy(dy).mul($.copy(p.multiplier_y));
  x = get_y$($.copy(i), $.copy(dy_rated), $.copy(xp), $.copy(yp), $.copy(p.initial_A), $.copy(p.initial_A_time), $.copy(p.future_A), $.copy(p.future_A_time), $c);
  amount_dx = $.copy(xp).sub($.copy(x)).sub(u64("1")).div($.copy(p.multiplier_x));
  amount_dx_fee = $.copy(amount_dx).mul($.copy(p.fee)).div(u64(FEE_DENOMINATOR));
  charged_amt_dx = $.copy(amount_dx).sub($.copy(amount_dx_fee));
  dx_admin_fee = $.copy(amount_dx_fee).mul($.copy(p.admin_fee)).div(u64(FEE_DENOMINATOR));
  swap_pair = $c.borrow_global_mut<StableCurvePoolInfo>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "StableCurvePoolInfo", [$p[0], $p[1]]), HippoConfig.admin_address$($c));
  AptosFramework.Coin.merge$(swap_pair.reserve_y, coins_in, $c, [$p[1]] as TypeTag[]);
  coin_dx = AptosFramework.Coin.extract$(swap_pair.reserve_x, $.copy(charged_amt_dx), $c, [$p[0]] as TypeTag[]);
  coin_fee = AptosFramework.Coin.extract$(swap_pair.reserve_x, $.copy(dx_admin_fee), $c, [$p[0]] as TypeTag[]);
  AptosFramework.Coin.merge$(swap_pair.fee_x, coin_fee, $c, [$p[0]] as TypeTag[]);
  return [AptosFramework.Coin.zero$($c, [$p[1]] as TypeTag[]), coin_dx, AptosFramework.Coin.zero$($c, [$p[1]] as TypeTag[])];
}

// #[test]
export function test_exchange_coin$ (
  admin: HexString,
  core: HexString,
  vm: HexString,
  $c: AptosDataCache,
): void {
  let a, addr, b, left_x, left_y, liquidity, x, x_out, x_remain, y;
  addr = Std.Signer.address_of$(admin, $c);
  init_lp_token$(admin, core, vm, $c);
  update_time$(vm, time$(u64("200"), $c), $c);
  x = MockCoin.mint$(u64("2000000"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", [])] as TypeTag[]);
  y = MockCoin.mint$(u64("10000000"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  [left_x, left_y, liquidity] = add_liquidity_direct$(x, y, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  a = MockCoin.mint$(u64("2000000"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", [])] as TypeTag[]);
  [x_remain, x_out, b] = swap_x_to_exact_y_direct$(a, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  AptosFramework.Coin.deposit$($.copy(addr), liquidity, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "LPToken", [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])])] as TypeTag[]);
  AptosFramework.Coin.deposit$($.copy(addr), x_remain, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", [])] as TypeTag[]);
  AptosFramework.Coin.deposit$($.copy(addr), x_out, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", [])] as TypeTag[]);
  AptosFramework.Coin.deposit$($.copy(addr), b, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  AptosFramework.Coin.deposit$($.copy(addr), left_x, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", [])] as TypeTag[]);
  AptosFramework.Coin.deposit$($.copy(addr), left_y, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  return;
}

// #[test]
export function test_fail_ramp_A_future_A_value$ (
  admin: HexString,
  core: HexString,
  vm: HexString,
  $c: AptosDataCache,
): void {
  init_lp_token$(admin, core, vm, $c);
  update_time$(vm, time$(u64("200"), $c), $c);
  ramp_A$(admin, u64("3000000000"), time$(u64("10000"), $c), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  return;
}

// #[test]
export function test_fail_ramp_A_future_A_value_b$ (
  admin: HexString,
  core: HexString,
  vm: HexString,
  $c: AptosDataCache,
): void {
  init_lp_token$(admin, core, vm, $c);
  update_time$(vm, time$(u64("200"), $c), $c);
  ramp_A$(admin, u64("2"), time$(u64("10000"), $c), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  return;
}

// #[test]
export function test_fail_ramp_A_future_A_value_c$ (
  admin: HexString,
  core: HexString,
  vm: HexString,
  $c: AptosDataCache,
): void {
  init_lp_token$(admin, core, vm, $c);
  update_time$(vm, time$(u64("200"), $c), $c);
  ramp_A$(admin, u64("20000"), time$(u64("10000"), $c), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  return;
}

// #[test]
export function test_fail_ramp_A_future_time$ (
  admin: HexString,
  core: HexString,
  vm: HexString,
  $c: AptosDataCache,
): void {
  init_lp_token$(admin, core, vm, $c);
  update_time$(vm, time$(u64("200"), $c), $c);
  ramp_A$(admin, u64("300"), u64("10000"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  return;
}

// #[test]
export function test_fail_ramp_A_timestamp$ (
  admin: HexString,
  core: HexString,
  vm: HexString,
  $c: AptosDataCache,
): void {
  init_lp_token$(admin, core, vm, $c);
  update_time$(vm, time$(u64("200"), $c), $c);
  ramp_A$(admin, u64("300"), time$(u64("10000"), $c), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  ramp_A$(admin, u64("400"), time$(u64("10000"), $c), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  return;
}

// #[test]
export function test_fail_remove_liquidity_amount_x$ (
  admin: HexString,
  core: HexString,
  vm: HexString,
  trader: HexString,
  $c: AptosDataCache,
): void {
  init_with_liquidity$(admin, core, vm, trader, $c);
  remove_liquidity$(trader, u64("1000000"), u64("20000000"), u64("2000"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  return;
}

// #[test]
export function test_fail_remove_liquidity_amount_y$ (
  admin: HexString,
  core: HexString,
  vm: HexString,
  trader: HexString,
  $c: AptosDataCache,
): void {
  init_with_liquidity$(admin, core, vm, trader, $c);
  remove_liquidity$(trader, u64("1000000"), u64("2000"), u64("200000000"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  return;
}

// #[test]
export function test_ramp_A_stop_ramp_A$ (
  admin: HexString,
  core: HexString,
  vm: HexString,
  $c: AptosDataCache,
): void {
  init_lp_token$(admin, core, vm, $c);
  update_time$(vm, time$(u64("200"), $c), $c);
  ramp_A$(admin, u64("300"), time$(u64("10000"), $c), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  update_time$(vm, time$(u64("300"), $c), $c);
  stop_ramp_A$(admin, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  return;
}

// #[test]
export function test_swap_pair_case_A$ (
  admin: HexString,
  core: HexString,
  vm: HexString,
  $c: AptosDataCache,
): void {
  let block_timestamp, k, p, swap_pair;
  init_lp_token$(admin, core, vm, $c);
  swap_pair = $c.borrow_global_mut<StableCurvePoolInfo>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "StableCurvePoolInfo", [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])]), HippoConfig.admin_address$($c));
  update_time$(vm, time$(u64("3500"), $c), $c);
  block_timestamp = AptosFramework.Timestamp.now_seconds$($c);
  swap_pair.future_A_time = $.copy(block_timestamp).add(u64("2"));
  swap_pair.future_A = u64("20");
  swap_pair.initial_A = u64("4");
  p = $c.borrow_global<StableCurvePoolInfo>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "StableCurvePoolInfo", [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])]), HippoConfig.admin_address$($c));
  k = get_current_A$($.copy(p.initial_A), $.copy(p.future_A), $.copy(p.initial_A_time), $.copy(p.future_A_time), $c);
  return Std.Debug.print$(k, $c, [AtomicTypeTag.U64] as TypeTag[]);
}

// #[test]
export function test_swap_pair_case_B$ (
  admin: HexString,
  core: HexString,
  vm: HexString,
  $c: AptosDataCache,
): void {
  let block_timestamp, k, p, swap_pair;
  init_lp_token$(admin, core, vm, $c);
  swap_pair = $c.borrow_global_mut<StableCurvePoolInfo>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "StableCurvePoolInfo", [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])]), HippoConfig.admin_address$($c));
  update_time$(vm, time$(u64("10000"), $c), $c);
  block_timestamp = AptosFramework.Timestamp.now_seconds$($c);
  swap_pair.future_A_time = $.copy(block_timestamp).add(u64("200"));
  swap_pair.future_A = u64("4");
  swap_pair.initial_A = u64("20");
  p = $c.borrow_global<StableCurvePoolInfo>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "StableCurvePoolInfo", [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])]), HippoConfig.admin_address$($c));
  k = get_current_A$($.copy(p.initial_A), $.copy(p.future_A), $.copy(p.initial_A_time), $.copy(p.future_A_time), $c);
  Std.Debug.print$(k, $c, [AtomicTypeTag.U64] as TypeTag[]);
  return;
}

// #[test]
export function time$ (
  offset_seconds: U64,
  $c: AptosDataCache,
): U64 {
  let epoch;
  epoch = u64("1653289287000000");
  return $.copy(epoch).add($.copy(offset_seconds).mul(u64("1000000")));
}

export function unit_test_poison$ (
  $c: AptosDataCache,
): void {
  Std.UnitTest.create_signers_for_testing$(u64("0"), $c);
  return;
}

// #[test]
export function update_time$ (
  account: HexString,
  time: U64,
  $c: AptosDataCache,
): void {
  AptosFramework.Timestamp.update_global_time$(account, new HexString("0x1000010"), $.copy(time), $c);
  return;
}

export function withdraw_liquidity$ (
  to_burn: AptosFramework.Coin.Coin,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): [AptosFramework.Coin.Coin, AptosFramework.Coin.Coin] {
  let temp$1, coin_x, coin_y, reserve_x, reserve_y, swap_pair, to_burn_value, total_supply, x, y;
  to_burn_value = u128(AptosFramework.Coin.value$(to_burn, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]));
  swap_pair = $c.borrow_global_mut<StableCurvePoolInfo>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "StableCurvePoolInfo", [$p[0], $p[1]]), HippoConfig.admin_address$($c));
  reserve_x = u128(AptosFramework.Coin.value$(swap_pair.reserve_x, $c, [$p[0]] as TypeTag[]));
  reserve_y = u128(AptosFramework.Coin.value$(swap_pair.reserve_y, $c, [$p[1]] as TypeTag[]));
  temp$1 = AptosFramework.Coin.supply$($c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
  total_supply = u128($.copy(Std.Option.borrow$(temp$1, $c, [AtomicTypeTag.U128] as TypeTag[])));
  x = u64($.copy(to_burn_value).mul($.copy(reserve_x)).div($.copy(total_supply)));
  y = u64($.copy(to_burn_value).mul($.copy(reserve_y)).div($.copy(total_supply)));
  burn$(to_burn, $c, [$p[0], $p[1]] as TypeTag[]);
  coin_x = AptosFramework.Coin.extract$(swap_pair.reserve_x, $.copy(x), $c, [$p[0]] as TypeTag[]);
  coin_y = AptosFramework.Coin.extract$(swap_pair.reserve_y, $.copy(y), $c, [$p[1]] as TypeTag[]);
  return [coin_x, coin_y];
}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::StableCurveSwap::LPCapability", LPCapability.LPCapabilityParser);
  repo.addParser("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::StableCurveSwap::LPToken", LPToken.LPTokenParser);
  repo.addParser("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::StableCurveSwap::StableCurvePoolInfo", StableCurvePoolInfo.StableCurvePoolInfoParser);
}

