import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient} from "aptos";
import * as AptosFramework from "../AptosFramework";
import * as Std from "../Std";
import * as Math from "./Math";
import * as MockCoin from "./MockCoin";
import * as PieceSwapMath from "./PieceSwapMath";
export const packageName = "HippoSwap";
export const moduleAddress = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
export const moduleName = "PieceSwap";

export const ERROR_ALREADY_INITIALIZED : U64 = u64("1");
export const ERROR_COIN_NOT_INITIALIZED : U64 = u64("2");
export const ERROR_NOT_CREATOR : U64 = u64("3");
export const ERROR_ONLY_ADMIN : U64 = u64("0");
export const MINIMUM_LIQUIDITY : U128 = u128("1000");
export const MODULE_ADMIN : HexString = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");


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

export class PieceSwapPoolInfo 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "PieceSwapPoolInfo";
  static typeParameters: TypeParamDeclType[] = [
    { name: "X", isPhantom: true },
    { name: "Y", isPhantom: true }
  ];
  static fields: FieldDeclType[] = [
  { name: "reserve_x", typeTag: new StructTag(new HexString("0x1"), "Coin", "Coin", [new $.TypeParamIdx(0)]) },
  { name: "reserve_y", typeTag: new StructTag(new HexString("0x1"), "Coin", "Coin", [new $.TypeParamIdx(1)]) },
  { name: "lp_amt", typeTag: AtomicTypeTag.U64 },
  { name: "lp_mint_cap", typeTag: new StructTag(new HexString("0x1"), "Coin", "MintCapability", [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "PieceSwap", "LPToken", [new $.TypeParamIdx(0), new $.TypeParamIdx(1)])]) },
  { name: "lp_burn_cap", typeTag: new StructTag(new HexString("0x1"), "Coin", "BurnCapability", [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "PieceSwap", "LPToken", [new $.TypeParamIdx(0), new $.TypeParamIdx(1)])]) },
  { name: "K", typeTag: AtomicTypeTag.U128 },
  { name: "K2", typeTag: AtomicTypeTag.U128 },
  { name: "Xa", typeTag: AtomicTypeTag.U128 },
  { name: "Xb", typeTag: AtomicTypeTag.U128 },
  { name: "m", typeTag: AtomicTypeTag.U128 },
  { name: "n", typeTag: AtomicTypeTag.U128 },
  { name: "x_deci_mult", typeTag: AtomicTypeTag.U64 },
  { name: "y_deci_mult", typeTag: AtomicTypeTag.U64 },
  { name: "swap_fee_per_million", typeTag: AtomicTypeTag.U64 },
  { name: "protocol_fee_share_per_thousand", typeTag: AtomicTypeTag.U64 },
  { name: "protocol_fee_x", typeTag: new StructTag(new HexString("0x1"), "Coin", "Coin", [new $.TypeParamIdx(0)]) },
  { name: "protocol_fee_y", typeTag: new StructTag(new HexString("0x1"), "Coin", "Coin", [new $.TypeParamIdx(1)]) }];

  reserve_x: AptosFramework.Coin.Coin;
  reserve_y: AptosFramework.Coin.Coin;
  lp_amt: U64;
  lp_mint_cap: AptosFramework.Coin.MintCapability;
  lp_burn_cap: AptosFramework.Coin.BurnCapability;
  K: U128;
  K2: U128;
  Xa: U128;
  Xb: U128;
  m: U128;
  n: U128;
  x_deci_mult: U64;
  y_deci_mult: U64;
  swap_fee_per_million: U64;
  protocol_fee_share_per_thousand: U64;
  protocol_fee_x: AptosFramework.Coin.Coin;
  protocol_fee_y: AptosFramework.Coin.Coin;

  constructor(proto: any, public typeTag: TypeTag) {
    this.reserve_x = proto['reserve_x'] as AptosFramework.Coin.Coin;
    this.reserve_y = proto['reserve_y'] as AptosFramework.Coin.Coin;
    this.lp_amt = proto['lp_amt'] as U64;
    this.lp_mint_cap = proto['lp_mint_cap'] as AptosFramework.Coin.MintCapability;
    this.lp_burn_cap = proto['lp_burn_cap'] as AptosFramework.Coin.BurnCapability;
    this.K = proto['K'] as U128;
    this.K2 = proto['K2'] as U128;
    this.Xa = proto['Xa'] as U128;
    this.Xb = proto['Xb'] as U128;
    this.m = proto['m'] as U128;
    this.n = proto['n'] as U128;
    this.x_deci_mult = proto['x_deci_mult'] as U64;
    this.y_deci_mult = proto['y_deci_mult'] as U64;
    this.swap_fee_per_million = proto['swap_fee_per_million'] as U64;
    this.protocol_fee_share_per_thousand = proto['protocol_fee_share_per_thousand'] as U64;
    this.protocol_fee_x = proto['protocol_fee_x'] as AptosFramework.Coin.Coin;
    this.protocol_fee_y = proto['protocol_fee_y'] as AptosFramework.Coin.Coin;
  }

  static PieceSwapPoolInfoParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : PieceSwapPoolInfo {
    const proto = $.parseStructProto(data, typeTag, repo, PieceSwapPoolInfo);
    return new PieceSwapPoolInfo(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, PieceSwapPoolInfo, typeParams);
    return result as unknown as PieceSwapPoolInfo;
  }
}
export function add_liquidity$ (
  sender: HexString,
  add_amt_x: U64,
  add_amt_y: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): [U64, U64, U64] {
  let actual_add_x, actual_add_y, current_x, current_y, opt_amt_x, opt_amt_y, opt_lp, pool, x_coin, y_coin;
  pool = $c.borrow_global_mut<PieceSwapPoolInfo>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "PieceSwap", "PieceSwapPoolInfo", [$p[0], $p[1]]), MODULE_ADMIN);
  current_x = u128(AptosFramework.Coin.value$(pool.reserve_x, $c, [$p[0]] as TypeTag[])).mul(u128($.copy(pool.x_deci_mult)));
  current_y = u128(AptosFramework.Coin.value$(pool.reserve_y, $c, [$p[1]] as TypeTag[])).mul(u128($.copy(pool.y_deci_mult)));
  [opt_amt_x, opt_amt_y, opt_lp] = PieceSwapMath.get_add_liquidity_actual_amount$($.copy(current_x), $.copy(current_y), u128($.copy(pool.lp_amt)), u128($.copy(add_amt_x)).mul(u128($.copy(pool.x_deci_mult))), u128($.copy(add_amt_y)).mul(u128($.copy(pool.y_deci_mult))), $c);
  if ($.copy(opt_lp).eq(u128("0"))) {
    return [u64("0"), u64("0"), u64("0")];
  }
  else{
  }
  actual_add_x = u64($.copy(opt_amt_x).div(u128($.copy(pool.x_deci_mult))));
  actual_add_y = u64($.copy(opt_amt_y).div(u128($.copy(pool.y_deci_mult))));
  x_coin = AptosFramework.Coin.withdraw$(sender, $.copy(actual_add_x), $c, [$p[0]] as TypeTag[]);
  y_coin = AptosFramework.Coin.withdraw$(sender, $.copy(actual_add_y), $c, [$p[1]] as TypeTag[]);
  AptosFramework.Coin.merge$(pool.reserve_x, x_coin, $c, [$p[0]] as TypeTag[]);
  AptosFramework.Coin.merge$(pool.reserve_y, y_coin, $c, [$p[1]] as TypeTag[]);
  mint_to$(sender, u64($.copy(opt_lp)), pool, $c, [$p[0], $p[1]] as TypeTag[]);
  return [$.copy(actual_add_x), $.copy(actual_add_y), u64($.copy(opt_lp))];
}

export function add_liquidity_direct$ (
  coin_x: AptosFramework.Coin.Coin,
  coin_y: AptosFramework.Coin.Coin,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): [AptosFramework.Coin.Coin, AptosFramework.Coin.Coin, AptosFramework.Coin.Coin] {
  let actual_add_x, actual_add_x_coin, actual_add_y, actual_add_y_coin, add_amt_x, add_amt_y, current_x, current_y, lp_coin, opt_amt_x, opt_amt_y, opt_lp, pool;
  add_amt_x = AptosFramework.Coin.value$(coin_x, $c, [$p[0]] as TypeTag[]);
  add_amt_y = AptosFramework.Coin.value$(coin_y, $c, [$p[1]] as TypeTag[]);
  pool = $c.borrow_global_mut<PieceSwapPoolInfo>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "PieceSwap", "PieceSwapPoolInfo", [$p[0], $p[1]]), MODULE_ADMIN);
  current_x = u128(AptosFramework.Coin.value$(pool.reserve_x, $c, [$p[0]] as TypeTag[])).mul(u128($.copy(pool.x_deci_mult)));
  current_y = u128(AptosFramework.Coin.value$(pool.reserve_y, $c, [$p[1]] as TypeTag[])).mul(u128($.copy(pool.y_deci_mult)));
  [opt_amt_x, opt_amt_y, opt_lp] = PieceSwapMath.get_add_liquidity_actual_amount$($.copy(current_x), $.copy(current_y), u128($.copy(pool.lp_amt)), u128($.copy(add_amt_x)).mul(u128($.copy(pool.x_deci_mult))), u128($.copy(add_amt_y)).mul(u128($.copy(pool.y_deci_mult))), $c);
  if ($.copy(opt_lp).eq(u128("0"))) {
    return [coin_x, coin_y, AptosFramework.Coin.zero$($c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "PieceSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[])];
  }
  else{
  }
  actual_add_x = u64($.copy(opt_amt_x).div(u128($.copy(pool.x_deci_mult))));
  actual_add_y = u64($.copy(opt_amt_y).div(u128($.copy(pool.y_deci_mult))));
  actual_add_x_coin = AptosFramework.Coin.extract$(coin_x, $.copy(actual_add_x), $c, [$p[0]] as TypeTag[]);
  actual_add_y_coin = AptosFramework.Coin.extract$(coin_y, $.copy(actual_add_y), $c, [$p[1]] as TypeTag[]);
  AptosFramework.Coin.merge$(pool.reserve_x, actual_add_x_coin, $c, [$p[0]] as TypeTag[]);
  AptosFramework.Coin.merge$(pool.reserve_y, actual_add_y_coin, $c, [$p[1]] as TypeTag[]);
  lp_coin = mint_direct$(u64($.copy(opt_lp)), pool, $c, [$p[0], $p[1]] as TypeTag[]);
  return [coin_x, coin_y, lp_coin];
}

export function burn_direct$ (
  lp: AptosFramework.Coin.Coin,
  pool: PieceSwapPoolInfo,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let amount;
  amount = AptosFramework.Coin.value$(lp, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "PieceSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
  AptosFramework.Coin.burn$(lp, pool.lp_burn_cap, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "PieceSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
  pool.lp_amt = $.copy(pool.lp_amt).sub($.copy(amount));
  return;
}

export function burn_from$ (
  from: HexString,
  amount: U64,
  pool: PieceSwapPoolInfo,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let coin_to_burn;
  coin_to_burn = AptosFramework.Coin.withdraw$(from, $.copy(amount), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "PieceSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
  burn_direct$(coin_to_burn, pool, $c, [$p[0], $p[1]] as TypeTag[]);
  return;
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

export function create_new_pool$ (
  admin: HexString,
  lp_name: U8[],
  lp_symbol: U8[],
  lp_decimals: U64,
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
  let temp$1, temp$2, temp$3, temp$4, admin_addr, k2, lp_burn_cap, lp_mint_cap, m, n, x_deci_mult, x_decimals, xa, xb, y_deci_mult, y_decimals;
  admin_addr = Std.Signer.address_of$(admin, $c);
  if (!($.copy(admin_addr).hex() === MODULE_ADMIN.hex())) {
    throw $.abortCode(ERROR_NOT_CREATOR);
  }
  if (!!$c.exists(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "PieceSwap", "PieceSwapPoolInfo", [$p[0], $p[1]]), $.copy(admin_addr))) {
    throw $.abortCode(ERROR_ALREADY_INITIALIZED);
  }
  if (!!$c.exists(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "PieceSwap", "PieceSwapPoolInfo", [$p[1], $p[0]]), $.copy(admin_addr))) {
    throw $.abortCode(ERROR_ALREADY_INITIALIZED);
  }
  if (!AptosFramework.Coin.is_coin_initialized$($c, [$p[0]] as TypeTag[])) {
    throw $.abortCode(ERROR_COIN_NOT_INITIALIZED);
  }
  if (!AptosFramework.Coin.is_coin_initialized$($c, [$p[1]] as TypeTag[])) {
    throw $.abortCode(ERROR_COIN_NOT_INITIALIZED);
  }
  [lp_mint_cap, lp_burn_cap] = AptosFramework.Coin.initialize$(admin, Std.ASCII.string$($.copy(lp_name), $c), Std.ASCII.string$($.copy(lp_symbol), $c), $.copy(lp_decimals), true, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "PieceSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
  [xa, xb, m, n, k2] = PieceSwapMath.compute_initialization_constants$($.copy(k), $.copy(w1_numerator), $.copy(w1_denominator), $.copy(w2_numerator), $.copy(w2_denominator), $c);
  x_decimals = AptosFramework.Coin.decimals$($c, [$p[0]] as TypeTag[]);
  y_decimals = AptosFramework.Coin.decimals$($c, [$p[1]] as TypeTag[]);
  if ($.copy(x_decimals).gt($.copy(y_decimals))) {
    [temp$3, temp$4] = [u128("1"), Math.pow$(u128("10"), u8($.copy(x_decimals).sub($.copy(y_decimals))), $c)];
  }
  else{
    if ($.copy(y_decimals).gt($.copy(x_decimals))) {
      [temp$1, temp$2] = [Math.pow$(u128("10"), u8($.copy(y_decimals).sub($.copy(x_decimals))), $c), u128("1")];
    }
    else{
      [temp$1, temp$2] = [u128("1"), u128("1")];
    }
    [temp$3, temp$4] = [temp$1, temp$2];
  }
  [x_deci_mult, y_deci_mult] = [temp$3, temp$4];
  $c.move_to(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "PieceSwap", "PieceSwapPoolInfo", [$p[0], $p[1]]), admin, new PieceSwapPoolInfo({ reserve_x: AptosFramework.Coin.zero$($c, [$p[0]] as TypeTag[]), reserve_y: AptosFramework.Coin.zero$($c, [$p[1]] as TypeTag[]), lp_amt: u64("0"), lp_mint_cap: $.copy(lp_mint_cap), lp_burn_cap: $.copy(lp_burn_cap), K: $.copy(k), K2: $.copy(k2), Xa: $.copy(xa), Xb: $.copy(xb), m: $.copy(m), n: $.copy(n), x_deci_mult: u64($.copy(x_deci_mult)), y_deci_mult: u64($.copy(y_deci_mult)), swap_fee_per_million: $.copy(swap_fee_per_million), protocol_fee_share_per_thousand: $.copy(protocol_fee_share_per_thousand), protocol_fee_x: AptosFramework.Coin.zero$($c, [$p[0]] as TypeTag[]), protocol_fee_y: AptosFramework.Coin.zero$($c, [$p[1]] as TypeTag[]) }, new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "PieceSwap", "PieceSwapPoolInfo", [$p[0], $p[1]])));
  AptosFramework.Coin.register_internal$(admin, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "PieceSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
  return;
}

// test func
export function get_fee_amounts$ (
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): [U64, U64] {
  let i;
  i = $c.borrow_global<PieceSwapPoolInfo>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "PieceSwap", "PieceSwapPoolInfo", [$p[0], $p[1]]), MODULE_ADMIN);
  return [AptosFramework.Coin.value$(i.protocol_fee_x, $c, [$p[0]] as TypeTag[]), AptosFramework.Coin.value$(i.protocol_fee_y, $c, [$p[1]] as TypeTag[])];
}

// test func
export function get_reserve_amounts$ (
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): [U64, U64] {
  let i;
  i = $c.borrow_global<PieceSwapPoolInfo>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "PieceSwap", "PieceSwapPoolInfo", [$p[0], $p[1]]), MODULE_ADMIN);
  return [AptosFramework.Coin.value$(i.reserve_x, $c, [$p[0]] as TypeTag[]), AptosFramework.Coin.value$(i.reserve_y, $c, [$p[1]] as TypeTag[])];
}

export function mint_direct$ (
  amount: U64,
  pool: PieceSwapPoolInfo,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): AptosFramework.Coin.Coin {
  let lp_coin;
  lp_coin = AptosFramework.Coin.mint$($.copy(amount), pool.lp_mint_cap, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "PieceSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
  pool.lp_amt = $.copy(pool.lp_amt).add($.copy(amount));
  return lp_coin;
}

export function mint_to$ (
  to: HexString,
  amount: U64,
  pool: PieceSwapPoolInfo,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let lp_coin;
  lp_coin = mint_direct$($.copy(amount), pool, $c, [$p[0], $p[1]] as TypeTag[]);
  check_and_deposit$(to, lp_coin, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "PieceSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
  return;
}

// test func
export function mock_add_liquidity_direct_equal$ (
  amount: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): [AptosFramework.Coin.Coin, AptosFramework.Coin.Coin, AptosFramework.Coin.Coin] {
  let coin_x, coin_y;
  coin_x = MockCoin.mint$($.copy(amount), $c, [$p[0]] as TypeTag[]);
  coin_y = MockCoin.mint$($.copy(amount), $c, [$p[1]] as TypeTag[]);
  return add_liquidity_direct$(coin_x, coin_y, $c, [$p[0], $p[1]] as TypeTag[]);
}

// test func
export function mock_init_pool$ (
  admin: HexString,
  lp_name: U8[],
  lp_symbol: U8[],
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let billion;
  billion = u128("1000000000");
  if (!AptosFramework.Coin.is_coin_initialized$($c, [$p[0]] as TypeTag[])) {
    MockCoin.initialize$(admin, u64("6"), $c, [$p[0]] as TypeTag[]);
  }
  else{
  }
  if (!AptosFramework.Coin.is_coin_initialized$($c, [$p[1]] as TypeTag[])) {
    MockCoin.initialize$(admin, u64("6"), $c, [$p[1]] as TypeTag[]);
  }
  else{
  }
  create_new_pool$(admin, $.copy(lp_name), $.copy(lp_symbol), u64("6"), $.copy(billion).mul($.copy(billion)), u128("110"), u128("100"), u128("105"), u128("100"), u64("100"), u64("100"), $c, [$p[0], $p[1]] as TypeTag[]);
  return;
}

// test func
export function mock_init_pool_and_add_liquidity$ (
  admin: HexString,
  user: HexString,
  lp_name: U8[],
  lp_symbol: U8[],
  initial_amt: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): [U64, U64, U64] {
  mock_init_pool$(admin, $.copy(lp_name), $.copy(lp_symbol), $c, [$p[0], $p[1]] as TypeTag[]);
  MockCoin.faucet_mint_to$(user, $.copy(initial_amt), $c, [$p[0]] as TypeTag[]);
  MockCoin.faucet_mint_to$(user, $.copy(initial_amt), $c, [$p[1]] as TypeTag[]);
  return add_liquidity$(user, $.copy(initial_amt), $.copy(initial_amt), $c, [$p[0], $p[1]] as TypeTag[]);
}

// test func
export function mock_init_pool_and_add_liquidity_direct$ (
  admin: HexString,
  lp_name: U8[],
  lp_symbol: U8[],
  initial_amt: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): AptosFramework.Coin.Coin {
  let lp, remain_x, remain_y;
  mock_init_pool$(admin, $.copy(lp_name), $.copy(lp_symbol), $c, [$p[0], $p[1]] as TypeTag[]);
  [remain_x, remain_y, lp] = mock_add_liquidity_direct_equal$($.copy(initial_amt), $c, [$p[0], $p[1]] as TypeTag[]);
  if (!AptosFramework.Coin.value$(remain_x, $c, [$p[0]] as TypeTag[]).eq(u64("0"))) {
    throw $.abortCode(u64("0"));
  }
  if (!AptosFramework.Coin.value$(remain_y, $c, [$p[1]] as TypeTag[]).eq(u64("0"))) {
    throw $.abortCode(u64("0"));
  }
  if (!AptosFramework.Coin.value$(lp, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "PieceSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]).eq($.copy(initial_amt))) {
    throw $.abortCode(u64("0"));
  }
  AptosFramework.Coin.destroy_zero$(remain_x, $c, [$p[0]] as TypeTag[]);
  AptosFramework.Coin.destroy_zero$(remain_y, $c, [$p[1]] as TypeTag[]);
  return lp;
}

export function remove_liquidity$ (
  sender: HexString,
  remove_lp_amt: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): [U64, U64] {
  let actual_remove_x, actual_remove_y, current_x, current_y, opt_amt_x, opt_amt_y, pool, removed_x, removed_y;
  pool = $c.borrow_global_mut<PieceSwapPoolInfo>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "PieceSwap", "PieceSwapPoolInfo", [$p[0], $p[1]]), MODULE_ADMIN);
  current_x = u128(AptosFramework.Coin.value$(pool.reserve_x, $c, [$p[0]] as TypeTag[])).mul(u128($.copy(pool.x_deci_mult)));
  current_y = u128(AptosFramework.Coin.value$(pool.reserve_y, $c, [$p[1]] as TypeTag[])).mul(u128($.copy(pool.y_deci_mult)));
  [opt_amt_x, opt_amt_y] = PieceSwapMath.get_remove_liquidity_amounts$($.copy(current_x), $.copy(current_y), u128($.copy(pool.lp_amt)), u128($.copy(remove_lp_amt)), $c);
  actual_remove_x = u64($.copy(opt_amt_x).div(u128($.copy(pool.x_deci_mult))));
  actual_remove_y = u64($.copy(opt_amt_y).div(u128($.copy(pool.y_deci_mult))));
  burn_from$(sender, $.copy(remove_lp_amt), pool, $c, [$p[0], $p[1]] as TypeTag[]);
  removed_x = AptosFramework.Coin.extract$(pool.reserve_x, $.copy(actual_remove_x), $c, [$p[0]] as TypeTag[]);
  removed_y = AptosFramework.Coin.extract$(pool.reserve_y, $.copy(actual_remove_y), $c, [$p[1]] as TypeTag[]);
  check_and_deposit$(sender, removed_x, $c, [$p[0]] as TypeTag[]);
  check_and_deposit$(sender, removed_y, $c, [$p[1]] as TypeTag[]);
  return [$.copy(actual_remove_x), $.copy(actual_remove_y)];
}

export function remove_liquidity_direct$ (
  remove_lp: AptosFramework.Coin.Coin,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): [AptosFramework.Coin.Coin, AptosFramework.Coin.Coin] {
  let actual_remove_x, actual_remove_y, current_x, current_y, opt_amt_x, opt_amt_y, pool, remove_lp_amt, removed_x, removed_y;
  pool = $c.borrow_global_mut<PieceSwapPoolInfo>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "PieceSwap", "PieceSwapPoolInfo", [$p[0], $p[1]]), MODULE_ADMIN);
  current_x = u128(AptosFramework.Coin.value$(pool.reserve_x, $c, [$p[0]] as TypeTag[])).mul(u128($.copy(pool.x_deci_mult)));
  current_y = u128(AptosFramework.Coin.value$(pool.reserve_y, $c, [$p[1]] as TypeTag[])).mul(u128($.copy(pool.y_deci_mult)));
  remove_lp_amt = AptosFramework.Coin.value$(remove_lp, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "PieceSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
  [opt_amt_x, opt_amt_y] = PieceSwapMath.get_remove_liquidity_amounts$($.copy(current_x), $.copy(current_y), u128($.copy(pool.lp_amt)), u128($.copy(remove_lp_amt)), $c);
  actual_remove_x = u64($.copy(opt_amt_x).div(u128($.copy(pool.x_deci_mult))));
  actual_remove_y = u64($.copy(opt_amt_y).div(u128($.copy(pool.y_deci_mult))));
  burn_direct$(remove_lp, pool, $c, [$p[0], $p[1]] as TypeTag[]);
  removed_x = AptosFramework.Coin.extract$(pool.reserve_x, $.copy(actual_remove_x), $c, [$p[0]] as TypeTag[]);
  removed_y = AptosFramework.Coin.extract$(pool.reserve_y, $.copy(actual_remove_y), $c, [$p[1]] as TypeTag[]);
  return [removed_x, removed_y];
}

export function swap_x_to_y$ (
  sender: HexString,
  amount_x_in: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): U64 {
  let coin_x, coin_y, value_y;
  coin_x = AptosFramework.Coin.withdraw$(sender, $.copy(amount_x_in), $c, [$p[0]] as TypeTag[]);
  coin_y = swap_x_to_y_direct$(coin_x, $c, [$p[0], $p[1]] as TypeTag[]);
  value_y = AptosFramework.Coin.value$(coin_y, $c, [$p[1]] as TypeTag[]);
  check_and_deposit$(sender, coin_y, $c, [$p[1]] as TypeTag[]);
  return $.copy(value_y);
}

export function swap_x_to_y_direct$ (
  coin_x: AptosFramework.Coin.Coin,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): AptosFramework.Coin.Coin {
  let actual_out_y, coin_y, current_x, current_y, input_x, opt_output_y, out_y_after_fees, pool, protocol_fee_y, protocol_fees, total_fees, x_value;
  pool = $c.borrow_global_mut<PieceSwapPoolInfo>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "PieceSwap", "PieceSwapPoolInfo", [$p[0], $p[1]]), MODULE_ADMIN);
  current_x = u128(AptosFramework.Coin.value$(pool.reserve_x, $c, [$p[0]] as TypeTag[])).mul(u128($.copy(pool.x_deci_mult)));
  current_y = u128(AptosFramework.Coin.value$(pool.reserve_y, $c, [$p[1]] as TypeTag[])).mul(u128($.copy(pool.y_deci_mult)));
  x_value = u128(AptosFramework.Coin.value$(coin_x, $c, [$p[0]] as TypeTag[]));
  AptosFramework.Coin.merge$(pool.reserve_x, coin_x, $c, [$p[0]] as TypeTag[]);
  input_x = $.copy(x_value).mul(u128($.copy(pool.x_deci_mult)));
  opt_output_y = PieceSwapMath.get_swap_x_to_y_out$($.copy(current_x), $.copy(current_y), $.copy(input_x), $.copy(pool.K), $.copy(pool.K2), $.copy(pool.Xa), $.copy(pool.Xb), $.copy(pool.m), $.copy(pool.n), $c);
  actual_out_y = u64($.copy(opt_output_y).div(u128($.copy(pool.y_deci_mult))));
  total_fees = $.copy(actual_out_y).mul($.copy(pool.swap_fee_per_million)).div(u64("1000000"));
  protocol_fees = $.copy(total_fees).mul($.copy(pool.protocol_fee_share_per_thousand)).div(u64("1000"));
  out_y_after_fees = $.copy(actual_out_y).sub($.copy(total_fees));
  coin_y = AptosFramework.Coin.extract$(pool.reserve_y, $.copy(out_y_after_fees), $c, [$p[1]] as TypeTag[]);
  protocol_fee_y = AptosFramework.Coin.extract$(pool.reserve_y, $.copy(protocol_fees), $c, [$p[1]] as TypeTag[]);
  AptosFramework.Coin.merge$(pool.protocol_fee_y, protocol_fee_y, $c, [$p[1]] as TypeTag[]);
  return coin_y;
}

export function swap_y_to_x$ (
  sender: HexString,
  amount_y_in: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): U64 {
  let coin_x, coin_y, value_x;
  coin_y = AptosFramework.Coin.withdraw$(sender, $.copy(amount_y_in), $c, [$p[1]] as TypeTag[]);
  coin_x = swap_y_to_x_direct$(coin_y, $c, [$p[0], $p[1]] as TypeTag[]);
  value_x = AptosFramework.Coin.value$(coin_x, $c, [$p[0]] as TypeTag[]);
  check_and_deposit$(sender, coin_x, $c, [$p[0]] as TypeTag[]);
  return $.copy(value_x);
}

export function swap_y_to_x_direct$ (
  coin_y: AptosFramework.Coin.Coin,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): AptosFramework.Coin.Coin {
  let actual_out_x, coin_x, current_x, current_y, input_y, opt_output_x, out_x_after_fees, pool, protocol_fee_x, protocol_fees, total_fees, y_value;
  pool = $c.borrow_global_mut<PieceSwapPoolInfo>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "PieceSwap", "PieceSwapPoolInfo", [$p[0], $p[1]]), MODULE_ADMIN);
  current_x = u128(AptosFramework.Coin.value$(pool.reserve_x, $c, [$p[0]] as TypeTag[])).mul(u128($.copy(pool.x_deci_mult)));
  current_y = u128(AptosFramework.Coin.value$(pool.reserve_y, $c, [$p[1]] as TypeTag[])).mul(u128($.copy(pool.y_deci_mult)));
  y_value = u128(AptosFramework.Coin.value$(coin_y, $c, [$p[1]] as TypeTag[]));
  AptosFramework.Coin.merge$(pool.reserve_y, coin_y, $c, [$p[1]] as TypeTag[]);
  input_y = $.copy(y_value).mul(u128($.copy(pool.y_deci_mult)));
  opt_output_x = PieceSwapMath.get_swap_y_to_x_out$($.copy(current_x), $.copy(current_y), $.copy(input_y), $.copy(pool.K), $.copy(pool.K2), $.copy(pool.Xa), $.copy(pool.Xb), $.copy(pool.m), $.copy(pool.n), $c);
  actual_out_x = u64($.copy(opt_output_x).div(u128($.copy(pool.x_deci_mult))));
  total_fees = $.copy(actual_out_x).mul($.copy(pool.swap_fee_per_million)).div(u64("1000000"));
  protocol_fees = $.copy(total_fees).mul($.copy(pool.protocol_fee_share_per_thousand)).div(u64("1000"));
  out_x_after_fees = $.copy(actual_out_x).sub($.copy(total_fees));
  protocol_fee_x = AptosFramework.Coin.extract$(pool.reserve_x, $.copy(protocol_fees), $c, [$p[0]] as TypeTag[]);
  AptosFramework.Coin.merge$(pool.protocol_fee_x, protocol_fee_x, $c, [$p[0]] as TypeTag[]);
  coin_x = AptosFramework.Coin.extract$(pool.reserve_x, $.copy(out_x_after_fees), $c, [$p[0]] as TypeTag[]);
  return coin_x;
}

// test func
export function test_add_initial_liquidity_unequal$ (
  admin: HexString,
  user: HexString,
  $c: AptosDataCache,
): void {
  let coin_x, coin_y, lp, remain_x, remain_y;
  mock_init_pool$(admin, [u8("85"), u8("83"), u8("68"), u8("84"), u8("45"), u8("85"), u8("83"), u8("68"), u8("67"), u8("32"), u8("76"), u8("80"), u8("32"), u8("102"), u8("111"), u8("114"), u8("32"), u8("80"), u8("105"), u8("101"), u8("99"), u8("101"), u8("83"), u8("119"), u8("97"), u8("112")], [u8("85"), u8("83"), u8("68"), u8("84"), u8("45"), u8("85"), u8("83"), u8("68"), u8("67"), u8("32"), u8("76"), u8("80"), u8("40"), u8("80"), u8("105"), u8("101"), u8("99"), u8("101"), u8("83"), u8("119"), u8("97"), u8("112"), u8("41")], $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[]);
  coin_x = MockCoin.mint$(u64("100000"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", [])] as TypeTag[]);
  coin_y = MockCoin.mint$(u64("10000"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[]);
  [remain_x, remain_y, lp] = add_liquidity_direct$(coin_x, coin_y, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[]);
  check_and_deposit$(user, remain_x, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", [])] as TypeTag[]);
  check_and_deposit$(user, remain_y, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[]);
  check_and_deposit$(user, lp, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "PieceSwap", "LPToken", [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])])] as TypeTag[]);
  return;
}

// test func
export function test_add_liquidity$ (
  admin: HexString,
  user: HexString,
  $c: AptosDataCache,
): void {
  let added_x, added_y, amt, lp_amt;
  amt = u64("1000000");
  [added_x, added_y, lp_amt] = mock_init_pool_and_add_liquidity$(admin, user, [u8("85"), u8("83"), u8("68"), u8("84"), u8("45"), u8("85"), u8("83"), u8("68"), u8("67"), u8("32"), u8("76"), u8("80"), u8("32"), u8("102"), u8("111"), u8("114"), u8("32"), u8("80"), u8("105"), u8("101"), u8("99"), u8("101"), u8("83"), u8("119"), u8("97"), u8("112")], [u8("85"), u8("83"), u8("68"), u8("84"), u8("45"), u8("85"), u8("83"), u8("68"), u8("67"), u8("32"), u8("76"), u8("80"), u8("40"), u8("80"), u8("105"), u8("101"), u8("99"), u8("101"), u8("83"), u8("119"), u8("97"), u8("112"), u8("41")], $.copy(amt), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[]);
  if (!$.copy(added_x).eq($.copy(amt))) {
    throw $.abortCode(u64("0"));
  }
  if (!$.copy(added_y).eq($.copy(amt))) {
    throw $.abortCode(u64("0"));
  }
  if (!$.copy(lp_amt).eq($.copy(amt))) {
    throw $.abortCode(u64("0"));
  }
  return;
}

// test func
export function test_create_pool_with_liquidity$ (
  admin: HexString,
  user: HexString,
  $c: AptosDataCache,
): void {
  let lp;
  lp = mock_init_pool_and_add_liquidity_direct$(admin, [u8("85"), u8("83"), u8("68"), u8("84"), u8("45"), u8("85"), u8("83"), u8("68"), u8("67"), u8("32"), u8("76"), u8("80"), u8("32"), u8("102"), u8("111"), u8("114"), u8("32"), u8("80"), u8("105"), u8("101"), u8("99"), u8("101"), u8("83"), u8("119"), u8("97"), u8("112")], [u8("85"), u8("83"), u8("68"), u8("84"), u8("45"), u8("85"), u8("83"), u8("68"), u8("67"), u8("32"), u8("76"), u8("80"), u8("40"), u8("80"), u8("105"), u8("101"), u8("99"), u8("101"), u8("83"), u8("119"), u8("97"), u8("112"), u8("41")], u64("100000"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[]);
  check_and_deposit$(user, lp, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "PieceSwap", "LPToken", [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])])] as TypeTag[]);
  return;
}

// test func
export function test_create_pool_with_liquidity_then_remove$ (
  admin: HexString,
  user: HexString,
  $c: AptosDataCache,
): void {
  let amt, coin_x, coin_y, lp;
  amt = u64("1000000");
  lp = mock_init_pool_and_add_liquidity_direct$(admin, [u8("85"), u8("83"), u8("68"), u8("84"), u8("45"), u8("85"), u8("83"), u8("68"), u8("67"), u8("32"), u8("76"), u8("80"), u8("32"), u8("102"), u8("111"), u8("114"), u8("32"), u8("80"), u8("105"), u8("101"), u8("99"), u8("101"), u8("83"), u8("119"), u8("97"), u8("112")], [u8("85"), u8("83"), u8("68"), u8("84"), u8("45"), u8("85"), u8("83"), u8("68"), u8("67"), u8("32"), u8("76"), u8("80"), u8("40"), u8("80"), u8("105"), u8("101"), u8("99"), u8("101"), u8("83"), u8("119"), u8("97"), u8("112"), u8("41")], $.copy(amt), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[]);
  [coin_x, coin_y] = remove_liquidity_direct$(lp, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[]);
  if (!AptosFramework.Coin.value$(coin_x, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", [])] as TypeTag[]).eq($.copy(amt))) {
    throw $.abortCode(u64("0"));
  }
  if (!AptosFramework.Coin.value$(coin_y, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[]).eq($.copy(amt))) {
    throw $.abortCode(u64("0"));
  }
  check_and_deposit$(user, coin_x, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", [])] as TypeTag[]);
  check_and_deposit$(user, coin_y, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[]);
  return;
}

// test func
export function test_remove_liquidity$ (
  admin: HexString,
  user: HexString,
  $c: AptosDataCache,
): void {
  let amt, amt_x, amt_y, lp, user_addr;
  amt = u64("1000000");
  lp = mock_init_pool_and_add_liquidity_direct$(admin, [u8("85"), u8("83"), u8("68"), u8("84"), u8("45"), u8("85"), u8("83"), u8("68"), u8("67"), u8("32"), u8("76"), u8("80"), u8("32"), u8("102"), u8("111"), u8("114"), u8("32"), u8("80"), u8("105"), u8("101"), u8("99"), u8("101"), u8("83"), u8("119"), u8("97"), u8("112")], [u8("85"), u8("83"), u8("68"), u8("84"), u8("45"), u8("85"), u8("83"), u8("68"), u8("67"), u8("32"), u8("76"), u8("80"), u8("40"), u8("80"), u8("105"), u8("101"), u8("99"), u8("101"), u8("83"), u8("119"), u8("97"), u8("112"), u8("41")], $.copy(amt), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[]);
  check_and_deposit$(user, lp, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "PieceSwap", "LPToken", [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])])] as TypeTag[]);
  [amt_x, amt_y] = remove_liquidity$(user, $.copy(amt), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[]);
  user_addr = Std.Signer.address_of$(user, $c);
  if (!AptosFramework.Coin.balance$($.copy(user_addr), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", [])] as TypeTag[]).eq($.copy(amt_x))) {
    throw $.abortCode(u64("0"));
  }
  if (!AptosFramework.Coin.balance$($.copy(user_addr), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[]).eq($.copy(amt_y))) {
    throw $.abortCode(u64("0"));
  }
  if (!$.copy(amt).eq($.copy(amt_x))) {
    throw $.abortCode(u64("0"));
  }
  if (!$.copy(amt).eq($.copy(amt_y))) {
    throw $.abortCode(u64("0"));
  }
  if (!AptosFramework.Coin.balance$($.copy(user_addr), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "PieceSwap", "LPToken", [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])])] as TypeTag[]).eq(u64("0"))) {
    throw $.abortCode(u64("0"));
  }
  return;
}

// test func
export function test_swap_x_to_y$ (
  admin: HexString,
  user: HexString,
  $c: AptosDataCache,
): void {
  let liquidity_amt, multiplier, pool, swap_amt, user_addr;
  multiplier = u64("1000000");
  swap_amt = u64("1");
  liquidity_amt = u64("100000000");
  test_swap_x_to_y_parameterized$(admin, user, $.copy(multiplier), $.copy(swap_amt), $.copy(liquidity_amt), $c);
  user_addr = Std.Signer.address_of$(user, $c);
  if (!AptosFramework.Coin.balance$($.copy(user_addr), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[]).gt($.copy(swap_amt).mul($.copy(multiplier)).mul(u64("999")).div(u64("1000")))) {
    throw $.abortCode(u64("0"));
  }
  if (!AptosFramework.Coin.balance$($.copy(user_addr), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[]).lt($.copy(swap_amt).mul($.copy(multiplier)).mul(u64("1001")).div(u64("1000")))) {
    throw $.abortCode(u64("0"));
  }
  pool = $c.borrow_global<PieceSwapPoolInfo>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "PieceSwap", "PieceSwapPoolInfo", [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])]), Std.Signer.address_of$(admin, $c));
  if (!AptosFramework.Coin.balance$($.copy(user_addr), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[]).add(AptosFramework.Coin.value$(pool.reserve_y, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[])).add(AptosFramework.Coin.value$(pool.protocol_fee_y, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[])).eq($.copy(liquidity_amt).mul($.copy(multiplier)))) {
    throw $.abortCode(u64("0"));
  }
  return;
}

// test func
export function test_swap_x_to_y_parameterized$ (
  admin: HexString,
  user: HexString,
  multiplier: U64,
  swap_amt: U64,
  liquidity_amt: U64,
  $c: AptosDataCache,
): void {
  let amt, pool, user_addr;
  amt = $.copy(liquidity_amt).mul($.copy(multiplier));
  mock_init_pool_and_add_liquidity$(admin, user, [u8("85"), u8("83"), u8("68"), u8("84"), u8("45"), u8("85"), u8("83"), u8("68"), u8("67"), u8("32"), u8("76"), u8("80"), u8("32"), u8("102"), u8("111"), u8("114"), u8("32"), u8("80"), u8("105"), u8("101"), u8("99"), u8("101"), u8("83"), u8("119"), u8("97"), u8("112")], [u8("85"), u8("83"), u8("68"), u8("84"), u8("45"), u8("85"), u8("83"), u8("68"), u8("67"), u8("32"), u8("76"), u8("80"), u8("40"), u8("80"), u8("105"), u8("101"), u8("99"), u8("101"), u8("83"), u8("119"), u8("97"), u8("112"), u8("41")], $.copy(amt), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[]);
  user_addr = Std.Signer.address_of$(user, $c);
  swap_amt = $.copy(swap_amt).mul($.copy(multiplier));
  MockCoin.faucet_mint_to$(user, $.copy(swap_amt), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", [])] as TypeTag[]);
  swap_x_to_y$(user, $.copy(swap_amt), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[]);
  if (!AptosFramework.Coin.balance$($.copy(user_addr), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", [])] as TypeTag[]).eq(u64("0"))) {
    throw $.abortCode(u64("0"));
  }
  if (!AptosFramework.Coin.balance$($.copy(user_addr), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[]).neq(u64("0"))) {
    throw $.abortCode(u64("0"));
  }
  pool = $c.borrow_global<PieceSwapPoolInfo>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "PieceSwap", "PieceSwapPoolInfo", [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])]), Std.Signer.address_of$(admin, $c));
  if (!AptosFramework.Coin.value$(pool.protocol_fee_x, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", [])] as TypeTag[]).eq(u64("0"))) {
    throw $.abortCode(u64("0"));
  }
  if (!AptosFramework.Coin.value$(pool.protocol_fee_y, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[]).gt(u64("0"))) {
    throw $.abortCode(u64("0"));
  }
  return;
}

// test func
export function test_swap_y_to_x$ (
  admin: HexString,
  user: HexString,
  $c: AptosDataCache,
): void {
  let liquidity_amt, multiplier, pool, swap_amt, user_addr;
  multiplier = u64("1000000");
  swap_amt = u64("1");
  liquidity_amt = u64("100000000");
  test_swap_y_to_x_parameterized$(admin, user, $.copy(multiplier), $.copy(swap_amt), $.copy(liquidity_amt), $c);
  user_addr = Std.Signer.address_of$(user, $c);
  if (!AptosFramework.Coin.balance$($.copy(user_addr), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", [])] as TypeTag[]).gt($.copy(swap_amt).mul($.copy(multiplier)).mul(u64("999")).div(u64("1000")))) {
    throw $.abortCode(u64("0"));
  }
  if (!AptosFramework.Coin.balance$($.copy(user_addr), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", [])] as TypeTag[]).lt($.copy(swap_amt).mul($.copy(multiplier)).mul(u64("1001")).div(u64("1000")))) {
    throw $.abortCode(u64("0"));
  }
  pool = $c.borrow_global<PieceSwapPoolInfo>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "PieceSwap", "PieceSwapPoolInfo", [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])]), Std.Signer.address_of$(admin, $c));
  if (!AptosFramework.Coin.balance$($.copy(user_addr), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", [])] as TypeTag[]).add(AptosFramework.Coin.value$(pool.reserve_x, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", [])] as TypeTag[])).add(AptosFramework.Coin.value$(pool.protocol_fee_x, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", [])] as TypeTag[])).eq($.copy(liquidity_amt).mul($.copy(multiplier)))) {
    throw $.abortCode(u64("0"));
  }
  return;
}

// test func
export function test_swap_y_to_x_parameterized$ (
  admin: HexString,
  user: HexString,
  multiplier: U64,
  swap_amt: U64,
  liquidity_amt: U64,
  $c: AptosDataCache,
): void {
  let amt, pool, user_addr;
  amt = $.copy(liquidity_amt).mul($.copy(multiplier));
  mock_init_pool_and_add_liquidity$(admin, user, [u8("85"), u8("83"), u8("68"), u8("84"), u8("45"), u8("85"), u8("83"), u8("68"), u8("67"), u8("32"), u8("76"), u8("80"), u8("32"), u8("102"), u8("111"), u8("114"), u8("32"), u8("80"), u8("105"), u8("101"), u8("99"), u8("101"), u8("83"), u8("119"), u8("97"), u8("112")], [u8("85"), u8("83"), u8("68"), u8("84"), u8("45"), u8("85"), u8("83"), u8("68"), u8("67"), u8("32"), u8("76"), u8("80"), u8("40"), u8("80"), u8("105"), u8("101"), u8("99"), u8("101"), u8("83"), u8("119"), u8("97"), u8("112"), u8("41")], $.copy(amt), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[]);
  user_addr = Std.Signer.address_of$(user, $c);
  swap_amt = $.copy(swap_amt).mul($.copy(multiplier));
  MockCoin.faucet_mint_to$(user, $.copy(swap_amt), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[]);
  swap_y_to_x$(user, $.copy(swap_amt), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[]);
  if (!AptosFramework.Coin.balance$($.copy(user_addr), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[]).eq(u64("0"))) {
    throw $.abortCode(u64("0"));
  }
  if (!AptosFramework.Coin.balance$($.copy(user_addr), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", [])] as TypeTag[]).gt(u64("0"))) {
    throw $.abortCode(u64("0"));
  }
  pool = $c.borrow_global<PieceSwapPoolInfo>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "PieceSwap", "PieceSwapPoolInfo", [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])]), Std.Signer.address_of$(admin, $c));
  if (!AptosFramework.Coin.value$(pool.protocol_fee_x, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", [])] as TypeTag[]).gt(u64("0"))) {
    throw $.abortCode(u64("0"));
  }
  if (!AptosFramework.Coin.value$(pool.protocol_fee_y, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[]).eq(u64("0"))) {
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


