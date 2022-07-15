import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient} from "aptos";
import * as AptosFramework from "../AptosFramework";
import * as Std from "../Std";
import * as CPSwapUtils from "./CPSwapUtils";
import * as Math from "./Math";
import * as SafeMath from "./SafeMath";
export const packageName = "HippoSwap";
export const moduleAddress = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
export const moduleName = "CPSwap";

export const BALANCE_MAX : U128 = u128("5192296858534827628530496329220095");
export const ERROR_ALREADY_INITIALIZED : U64 = u64("1");
export const ERROR_ALREADY_LOCKED : U64 = u64("3");
export const ERROR_INSUFFICIENT_AMOUNT : U64 = u64("6");
export const ERROR_INSUFFICIENT_INPUT_AMOUNT : U64 = u64("14");
export const ERROR_INSUFFICIENT_LIQUIDITY : U64 = u64("7");
export const ERROR_INSUFFICIENT_LIQUIDITY_BURNED : U64 = u64("10");
export const ERROR_INSUFFICIENT_LIQUIDITY_MINTED : U64 = u64("4");
export const ERROR_INSUFFICIENT_OUTPUT_AMOUNT : U64 = u64("13");
export const ERROR_INSUFFICIENT_TOKEN0_AMOUNT : U64 = u64("11");
export const ERROR_INSUFFICIENT_TOKEN1_AMOUNT : U64 = u64("12");
export const ERROR_INVALID_AMOUNT : U64 = u64("8");
export const ERROR_K : U64 = u64("15");
export const ERROR_NOT_CREATOR : U64 = u64("2");
export const ERROR_ONLY_ADMIN : U64 = u64("0");
export const ERROR_OVERFLOW : U64 = u64("5");
export const ERROR_TOKENS_NOT_SORTED : U64 = u64("9");
export const ERROR_X_NOT_REGISTERED : U64 = u64("16");
export const ERROR_Y_NOT_REGISTERED : U64 = u64("16");
export const MINIMUM_LIQUIDITY : U128 = u128("1000");
export const MODULE_ADMIN : HexString = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");


export class CapContainer 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "CapContainer";
  static typeParameters: TypeParamDeclType[] = [
    { name: "T", isPhantom: true }
  ];
  static fields: FieldDeclType[] = [
  { name: "mc", typeTag: new StructTag(new HexString("0x1"), "Coin", "MintCapability", [new $.TypeParamIdx(0)]) },
  { name: "bc", typeTag: new StructTag(new HexString("0x1"), "Coin", "BurnCapability", [new $.TypeParamIdx(0)]) }];

  mc: AptosFramework.Coin.MintCapability;
  bc: AptosFramework.Coin.BurnCapability;

  constructor(proto: any, public typeTag: TypeTag) {
    this.mc = proto['mc'] as AptosFramework.Coin.MintCapability;
    this.bc = proto['bc'] as AptosFramework.Coin.BurnCapability;
  }

  static CapContainerParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : CapContainer {
    const proto = $.parseStructProto(data, typeTag, repo, CapContainer);
    return new CapContainer(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, CapContainer, typeParams);
    return result as unknown as CapContainer;
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

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, LPToken, typeParams);
    return result as unknown as LPToken;
  }
}

export class Token0 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "Token0";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  ];

  constructor(proto: any, public typeTag: TypeTag) {

  }

  static Token0Parser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : Token0 {
    const proto = $.parseStructProto(data, typeTag, repo, Token0);
    return new Token0(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, Token0, typeParams);
    return result as unknown as Token0;
  }
}

export class Token1 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "Token1";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  ];

  constructor(proto: any, public typeTag: TypeTag) {

  }

  static Token1Parser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : Token1 {
    const proto = $.parseStructProto(data, typeTag, repo, Token1);
    return new Token1(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, Token1, typeParams);
    return result as unknown as Token1;
  }
}

export class TokenPairMetadata 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "TokenPairMetadata";
  static typeParameters: TypeParamDeclType[] = [
    { name: "X", isPhantom: true },
    { name: "Y", isPhantom: true }
  ];
  static fields: FieldDeclType[] = [
  { name: "locked", typeTag: AtomicTypeTag.Bool },
  { name: "creator", typeTag: AtomicTypeTag.Address },
  { name: "fee_to", typeTag: AtomicTypeTag.Address },
  { name: "fee_on", typeTag: AtomicTypeTag.Bool },
  { name: "k_last", typeTag: AtomicTypeTag.U128 },
  { name: "lp", typeTag: new StructTag(new HexString("0x1"), "Coin", "Coin", [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "LPToken", [new $.TypeParamIdx(0), new $.TypeParamIdx(1)])]) },
  { name: "balance_x", typeTag: new StructTag(new HexString("0x1"), "Coin", "Coin", [new $.TypeParamIdx(0)]) },
  { name: "balance_y", typeTag: new StructTag(new HexString("0x1"), "Coin", "Coin", [new $.TypeParamIdx(1)]) },
  { name: "mint_cap", typeTag: new StructTag(new HexString("0x1"), "Coin", "MintCapability", [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "LPToken", [new $.TypeParamIdx(0), new $.TypeParamIdx(1)])]) },
  { name: "burn_cap", typeTag: new StructTag(new HexString("0x1"), "Coin", "BurnCapability", [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "LPToken", [new $.TypeParamIdx(0), new $.TypeParamIdx(1)])]) }];

  locked: boolean;
  creator: HexString;
  fee_to: HexString;
  fee_on: boolean;
  k_last: U128;
  lp: AptosFramework.Coin.Coin;
  balance_x: AptosFramework.Coin.Coin;
  balance_y: AptosFramework.Coin.Coin;
  mint_cap: AptosFramework.Coin.MintCapability;
  burn_cap: AptosFramework.Coin.BurnCapability;

  constructor(proto: any, public typeTag: TypeTag) {
    this.locked = proto['locked'] as boolean;
    this.creator = proto['creator'] as HexString;
    this.fee_to = proto['fee_to'] as HexString;
    this.fee_on = proto['fee_on'] as boolean;
    this.k_last = proto['k_last'] as U128;
    this.lp = proto['lp'] as AptosFramework.Coin.Coin;
    this.balance_x = proto['balance_x'] as AptosFramework.Coin.Coin;
    this.balance_y = proto['balance_y'] as AptosFramework.Coin.Coin;
    this.mint_cap = proto['mint_cap'] as AptosFramework.Coin.MintCapability;
    this.burn_cap = proto['burn_cap'] as AptosFramework.Coin.BurnCapability;
  }

  static TokenPairMetadataParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : TokenPairMetadata {
    const proto = $.parseStructProto(data, typeTag, repo, TokenPairMetadata);
    return new TokenPairMetadata(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, TokenPairMetadata, typeParams);
    return result as unknown as TokenPairMetadata;
  }
}

export class TokenPairReserve 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "TokenPairReserve";
  static typeParameters: TypeParamDeclType[] = [
    { name: "X", isPhantom: true },
    { name: "Y", isPhantom: true }
  ];
  static fields: FieldDeclType[] = [
  { name: "reserve_x", typeTag: AtomicTypeTag.U64 },
  { name: "reserve_y", typeTag: AtomicTypeTag.U64 },
  { name: "block_timestamp_last", typeTag: AtomicTypeTag.U64 }];

  reserve_x: U64;
  reserve_y: U64;
  block_timestamp_last: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.reserve_x = proto['reserve_x'] as U64;
    this.reserve_y = proto['reserve_y'] as U64;
    this.block_timestamp_last = proto['block_timestamp_last'] as U64;
  }

  static TokenPairReserveParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : TokenPairReserve {
    const proto = $.parseStructProto(data, typeTag, repo, TokenPairReserve);
    return new TokenPairReserve(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, TokenPairReserve, typeParams);
    return result as unknown as TokenPairReserve;
  }
}
export function add_liquidity$ (
  sender: HexString,
  amount_x: U64,
  amount_y: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): [U64, U64, U64] {
  let temp$1, temp$2, temp$3, temp$4, temp$5, a_x, a_y, amount_x_optimal, amount_y_optimal, lp, lp_amount, reserve_x, reserve_y, sender_addr;
  [reserve_x, reserve_y, ] = get_reserves$($c, [$p[0], $p[1]] as TypeTag[]);
  if ($.copy(reserve_x).eq(u64("0"))) {
    temp$1 = $.copy(reserve_y).eq(u64("0"));
  }
  else{
    temp$1 = false;
  }
  if (temp$1) {
    [temp$4, temp$5] = [$.copy(amount_x), $.copy(amount_y)];
  }
  else{
    amount_y_optimal = CPSwapUtils.quote$($.copy(amount_x), $.copy(reserve_x), $.copy(reserve_y), $c);
    if ($.copy(amount_y_optimal).le($.copy(amount_y))) {
      [temp$2, temp$3] = [$.copy(amount_x), $.copy(amount_y_optimal)];
    }
    else{
      amount_x_optimal = CPSwapUtils.quote$($.copy(amount_y), $.copy(reserve_y), $.copy(reserve_x), $c);
      if (!$.copy(amount_x_optimal).le($.copy(amount_x))) {
        throw $.abortCode(ERROR_INVALID_AMOUNT);
      }
      [temp$2, temp$3] = [$.copy(amount_x_optimal), $.copy(amount_y)];
    }
    [temp$4, temp$5] = [temp$2, temp$3];
  }
  [a_x, a_y] = [temp$4, temp$5];
  deposit_x$(AptosFramework.Coin.withdraw$(sender, $.copy(a_x), $c, [$p[0]] as TypeTag[]), $c, [$p[0], $p[1]] as TypeTag[]);
  deposit_y$(AptosFramework.Coin.withdraw$(sender, $.copy(a_y), $c, [$p[1]] as TypeTag[]), $c, [$p[0], $p[1]] as TypeTag[]);
  sender_addr = Std.Signer.address_of$(sender, $c);
  lp = mint$($c, [$p[0], $p[1]] as TypeTag[]);
  lp_amount = AptosFramework.Coin.value$(lp, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
  check_coin_store$(sender, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
  AptosFramework.Coin.deposit$($.copy(sender_addr), lp, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
  return [$.copy(a_x), $.copy(a_y), $.copy(lp_amount)];
}

export function add_liquidity_direct$ (
  x: AptosFramework.Coin.Coin,
  y: AptosFramework.Coin.Coin,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): [AptosFramework.Coin.Coin, AptosFramework.Coin.Coin, AptosFramework.Coin.Coin] {
  let temp$1, temp$2, temp$3, temp$4, temp$5, a_x, a_y, amount_x, amount_x_optimal, amount_y, amount_y_optimal, left_x, left_y, reserve_x, reserve_y;
  amount_x = AptosFramework.Coin.value$(x, $c, [$p[0]] as TypeTag[]);
  amount_y = AptosFramework.Coin.value$(y, $c, [$p[1]] as TypeTag[]);
  [reserve_x, reserve_y, ] = get_reserves$($c, [$p[0], $p[1]] as TypeTag[]);
  if ($.copy(reserve_x).eq(u64("0"))) {
    temp$1 = $.copy(reserve_y).eq(u64("0"));
  }
  else{
    temp$1 = false;
  }
  if (temp$1) {
    [temp$4, temp$5] = [$.copy(amount_x), $.copy(amount_y)];
  }
  else{
    amount_y_optimal = CPSwapUtils.quote$($.copy(amount_x), $.copy(reserve_x), $.copy(reserve_y), $c);
    if ($.copy(amount_y_optimal).le($.copy(amount_y))) {
      [temp$2, temp$3] = [$.copy(amount_x), $.copy(amount_y_optimal)];
    }
    else{
      amount_x_optimal = CPSwapUtils.quote$($.copy(amount_y), $.copy(reserve_y), $.copy(reserve_x), $c);
      if (!$.copy(amount_x_optimal).le($.copy(amount_x))) {
        throw $.abortCode(ERROR_INVALID_AMOUNT);
      }
      [temp$2, temp$3] = [$.copy(amount_x_optimal), $.copy(amount_y)];
    }
    [temp$4, temp$5] = [temp$2, temp$3];
  }
  [a_x, a_y] = [temp$4, temp$5];
  if (!$.copy(a_x).le($.copy(amount_x))) {
    throw $.abortCode(ERROR_INSUFFICIENT_AMOUNT);
  }
  if (!$.copy(a_y).le($.copy(amount_y))) {
    throw $.abortCode(ERROR_INSUFFICIENT_AMOUNT);
  }
  left_x = AptosFramework.Coin.extract$(x, $.copy(amount_x).sub($.copy(a_x)), $c, [$p[0]] as TypeTag[]);
  left_y = AptosFramework.Coin.extract$(y, $.copy(amount_y).sub($.copy(a_y)), $c, [$p[1]] as TypeTag[]);
  deposit_x$(x, $c, [$p[0], $p[1]] as TypeTag[]);
  deposit_y$(y, $c, [$p[0], $p[1]] as TypeTag[]);
  return [left_x, left_y, mint$($c, [$p[0], $p[1]] as TypeTag[])];
}

export function burn$ (
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): [AptosFramework.Coin.Coin, AptosFramework.Coin.Coin] {
  let temp$1, amount_x, amount_y, balance_x, balance_x__2, balance_y, balance_y__3, liquidity, metadata, reserves, total_lp_supply, w_x, w_y;
  metadata = $c.borrow_global_mut<TokenPairMetadata>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "TokenPairMetadata", [$p[0], $p[1]]), MODULE_ADMIN);
  if (!!$.copy(metadata.locked)) {
    throw $.abortCode(ERROR_ALREADY_LOCKED);
  }
  metadata.locked = true;
  reserves = $c.borrow_global_mut<TokenPairReserve>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "TokenPairReserve", [$p[0], $p[1]]), MODULE_ADMIN);
  [balance_x, balance_y] = token_balances_metadata$(metadata, $c, [$p[0], $p[1]] as TypeTag[]);
  liquidity = AptosFramework.Coin.value$(metadata.lp, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
  mint_fee$($.copy(reserves.reserve_x), $.copy(reserves.reserve_y), metadata, $c, [$p[0], $p[1]] as TypeTag[]);
  total_lp_supply = total_lp_supply$($c, [$p[0], $p[1]] as TypeTag[]);
  amount_x = u64(SafeMath.div$(SafeMath.mul$(u128($.copy(balance_x)), u128($.copy(liquidity)), $c), u128($.copy(total_lp_supply)), $c));
  amount_y = u64(SafeMath.div$(SafeMath.mul$(u128($.copy(balance_y)), u128($.copy(liquidity)), $c), u128($.copy(total_lp_supply)), $c));
  if ($.copy(amount_x).gt(u64("0"))) {
    temp$1 = $.copy(amount_y).gt(u64("0"));
  }
  else{
    temp$1 = false;
  }
  if (!temp$1) {
    throw $.abortCode(ERROR_INSUFFICIENT_LIQUIDITY_BURNED);
  }
  burn_lp$($.copy(liquidity), metadata, $c, [$p[0], $p[1]] as TypeTag[]);
  w_x = extract_x$($.copy(amount_x), metadata, $c, [$p[0], $p[1]] as TypeTag[]);
  w_y = extract_y$($.copy(amount_y), metadata, $c, [$p[0], $p[1]] as TypeTag[]);
  [balance_x__2, balance_y__3] = token_balances_metadata$(metadata, $c, [$p[0], $p[1]] as TypeTag[]);
  update$($.copy(balance_x__2), $.copy(balance_y__3), reserves, $c, [$p[0], $p[1]] as TypeTag[]);
  if ($.copy(metadata.fee_on)) {
    metadata.k_last = SafeMath.mul$(u128($.copy(reserves.reserve_x)), u128($.copy(reserves.reserve_y)), $c);
  }
  else{
  }
  metadata.locked = false;
  return [w_x, w_y];
}

export function burn_lp$ (
  amount: U64,
  metadata: TokenPairMetadata,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let coins;
  if (!AptosFramework.Coin.value$(metadata.lp, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]).ge($.copy(amount))) {
    throw $.abortCode(ERROR_INSUFFICIENT_LIQUIDITY);
  }
  coins = AptosFramework.Coin.extract$(metadata.lp, $.copy(amount), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
  AptosFramework.Coin.burn$(coins, metadata.burn_cap, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
  return;
}

export function check_coin_store$ (
  sender: HexString,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X>*/
): void {
  if (!AptosFramework.Coin.is_account_registered$(Std.Signer.address_of$(sender, $c), $c, [$p[0]] as TypeTag[])) {
    AptosFramework.Coin.register_internal$(sender, $c, [$p[0]] as TypeTag[]);
  }
  else{
  }
  return;
}

export function create_token_pair$ (
  admin: HexString,
  fee_to: HexString,
  fee_on: boolean,
  lp_name: U8[],
  lp_symbol: U8[],
  decimals: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let burn_cap, mint_cap, sender_addr;
  sender_addr = Std.Signer.address_of$(admin, $c);
  if (!($.copy(sender_addr).hex() === MODULE_ADMIN.hex())) {
    throw $.abortCode(ERROR_NOT_CREATOR);
  }
  if (!!$c.exists(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "TokenPairReserve", [$p[0], $p[1]]), $.copy(sender_addr))) {
    throw $.abortCode(ERROR_ALREADY_INITIALIZED);
  }
  if (!!$c.exists(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "TokenPairReserve", [$p[1], $p[0]]), $.copy(sender_addr))) {
    throw $.abortCode(ERROR_ALREADY_INITIALIZED);
  }
  [mint_cap, burn_cap] = AptosFramework.Coin.initialize$(admin, Std.ASCII.string$($.copy(lp_name), $c), Std.ASCII.string$($.copy(lp_symbol), $c), $.copy(decimals), true, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
  $c.move_to(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "TokenPairReserve", [$p[0], $p[1]]), admin, new TokenPairReserve({ reserve_x: u64("0"), reserve_y: u64("0"), block_timestamp_last: u64("0") }, new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "TokenPairReserve", [$p[0], $p[1]])));
  $c.move_to(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "TokenPairMetadata", [$p[0], $p[1]]), admin, new TokenPairMetadata({ locked: false, creator: $.copy(sender_addr), fee_to: $.copy(fee_to), fee_on: fee_on, k_last: u128("0"), lp: AptosFramework.Coin.zero$($c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]), balance_x: AptosFramework.Coin.zero$($c, [$p[0]] as TypeTag[]), balance_y: AptosFramework.Coin.zero$($c, [$p[1]] as TypeTag[]), mint_cap: $.copy(mint_cap), burn_cap: $.copy(burn_cap) }, new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "TokenPairMetadata", [$p[0], $p[1]])));
  AptosFramework.Coin.register_internal$(admin, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
  return;
}

export function deposit_x$ (
  amount: AptosFramework.Coin.Coin,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let metadata;
  metadata = $c.borrow_global_mut<TokenPairMetadata>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "TokenPairMetadata", [$p[0], $p[1]]), MODULE_ADMIN);
  AptosFramework.Coin.merge$(metadata.balance_x, amount, $c, [$p[0]] as TypeTag[]);
  return;
}

export function deposit_y$ (
  amount: AptosFramework.Coin.Coin,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let metadata;
  metadata = $c.borrow_global_mut<TokenPairMetadata>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "TokenPairMetadata", [$p[0], $p[1]]), MODULE_ADMIN);
  AptosFramework.Coin.merge$(metadata.balance_y, amount, $c, [$p[1]] as TypeTag[]);
  return;
}

// test func
export function expand_to_decimals$ (
  num: U64,
  decimals: U8,
  $c: AptosDataCache,
): U64 {
  return $.copy(num).mul(u64(Math.pow$(u128("10"), $.copy(decimals), $c)));
}

export function extract_x$ (
  amount: U64,
  metadata: TokenPairMetadata,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): AptosFramework.Coin.Coin {
  if (!AptosFramework.Coin.value$(metadata.balance_x, $c, [$p[0]] as TypeTag[]).gt($.copy(amount))) {
    throw $.abortCode(ERROR_INSUFFICIENT_AMOUNT);
  }
  return AptosFramework.Coin.extract$(metadata.balance_x, $.copy(amount), $c, [$p[0]] as TypeTag[]);
}

export function extract_y$ (
  amount: U64,
  metadata: TokenPairMetadata,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): AptosFramework.Coin.Coin {
  if (!AptosFramework.Coin.value$(metadata.balance_y, $c, [$p[1]] as TypeTag[]).gt($.copy(amount))) {
    throw $.abortCode(ERROR_INSUFFICIENT_AMOUNT);
  }
  return AptosFramework.Coin.extract$(metadata.balance_y, $.copy(amount), $c, [$p[1]] as TypeTag[]);
}

export function get_reserves$ (
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): [U64, U64, U64] {
  let reserve;
  reserve = $c.borrow_global<TokenPairReserve>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "TokenPairReserve", [$p[0], $p[1]]), MODULE_ADMIN);
  return [$.copy(reserve.reserve_x), $.copy(reserve.reserve_y), $.copy(reserve.block_timestamp_last)];
}

// test func
export function init_works$ (
  admin: HexString,
  $c: AptosDataCache,
): void {
  let fee_to;
  fee_to = Std.Signer.address_of$(admin, $c);
  create_token_pair$(admin, $.copy(fee_to), true, [u8("110"), u8("97"), u8("109"), u8("101")], [u8("115"), u8("121"), u8("109"), u8("98"), u8("111"), u8("108")], u64("8"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token0", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token1", [])] as TypeTag[]);
  return;
}

// test func
export function issue_token$ (
  admin: HexString,
  to: HexString,
  name: U8[],
  total_supply: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <T>*/
): void {
  let a, bc, mc;
  [mc, bc] = AptosFramework.Coin.initialize$(admin, Std.ASCII.string$($.copy(name), $c), Std.ASCII.string$($.copy(name), $c), u64("8"), true, $c, [$p[0]] as TypeTag[]);
  AptosFramework.Coin.register_internal$(admin, $c, [$p[0]] as TypeTag[]);
  AptosFramework.Coin.register_internal$(to, $c, [$p[0]] as TypeTag[]);
  a = AptosFramework.Coin.mint$($.copy(total_supply), mc, $c, [$p[0]] as TypeTag[]);
  AptosFramework.Coin.deposit$(Std.Signer.address_of$(to, $c), a, $c, [$p[0]] as TypeTag[]);
  $c.move_to(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "CapContainer", [$p[0]]), admin, new CapContainer({ mc: $.copy(mc), bc: $.copy(bc) }, new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "CapContainer", [$p[0]])));
  return;
}

export function lp_balance$ (
  addr: HexString,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): U64 {
  return AptosFramework.Coin.balance$($.copy(addr), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
}

export function mint$ (
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): AptosFramework.Coin.Coin {
  let temp$1, amount_x, amount_y, balance_x, balance_y, l, liquidity, lp, metadata, reserves, total_supply;
  metadata = $c.borrow_global_mut<TokenPairMetadata>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "TokenPairMetadata", [$p[0], $p[1]]), MODULE_ADMIN);
  if (!!$.copy(metadata.locked)) {
    throw $.abortCode(ERROR_ALREADY_LOCKED);
  }
  metadata.locked = true;
  reserves = $c.borrow_global_mut<TokenPairReserve>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "TokenPairReserve", [$p[0], $p[1]]), MODULE_ADMIN);
  [balance_x, balance_y] = token_balances_metadata$(metadata, $c, [$p[0], $p[1]] as TypeTag[]);
  amount_x = SafeMath.sub$(u128($.copy(balance_x)), u128($.copy(reserves.reserve_x)), $c);
  amount_y = SafeMath.sub$(u128($.copy(balance_y)), u128($.copy(reserves.reserve_y)), $c);
  mint_fee$($.copy(reserves.reserve_x), $.copy(reserves.reserve_y), metadata, $c, [$p[0], $p[1]] as TypeTag[]);
  total_supply = total_lp_supply$($c, [$p[0], $p[1]] as TypeTag[]);
  if ($.copy(total_supply).eq(u128("0"))) {
    l = SafeMath.sub$(Math.sqrt$(SafeMath.mul$($.copy(amount_x), $.copy(amount_y), $c), $c), MINIMUM_LIQUIDITY, $c);
    mint_lp_to$(MODULE_ADMIN, u64(MINIMUM_LIQUIDITY), metadata.mint_cap, $c, [$p[0], $p[1]] as TypeTag[]);
    temp$1 = $.copy(l);
  }
  else{
    temp$1 = Math.min$(SafeMath.div$(SafeMath.mul$($.copy(amount_x), $.copy(total_supply), $c), u128($.copy(reserves.reserve_x)), $c), SafeMath.div$(SafeMath.mul$($.copy(amount_y), $.copy(total_supply), $c), u128($.copy(reserves.reserve_y)), $c), $c);
  }
  liquidity = temp$1;
  if (!$.copy(liquidity).gt(u128("0"))) {
    throw $.abortCode(ERROR_INSUFFICIENT_LIQUIDITY_MINTED);
  }
  lp = mint_lp$(u64($.copy(liquidity)), metadata.mint_cap, $c, [$p[0], $p[1]] as TypeTag[]);
  update$($.copy(balance_x), $.copy(balance_y), reserves, $c, [$p[0], $p[1]] as TypeTag[]);
  if ($.copy(metadata.fee_on)) {
    metadata.k_last = SafeMath.mul$(u128($.copy(reserves.reserve_x)), u128($.copy(reserves.reserve_y)), $c);
  }
  else{
  }
  metadata.locked = false;
  return lp;
}

export function mint_fee$ (
  reservex: U64,
  reservey: U64,
  metadata: TokenPairMetadata,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let denominator, liquidity, numerator, root_k, root_k_last, total_supply;
  if ($.copy(metadata.fee_on)) {
    if ($.copy(metadata.k_last).neq(u128("0"))) {
      root_k = Math.sqrt$(SafeMath.mul$(u128($.copy(reservex)), u128($.copy(reservey)), $c), $c);
      root_k_last = Math.sqrt$($.copy(metadata.k_last), $c);
      if ($.copy(root_k).gt($.copy(root_k_last))) {
        total_supply = u128(total_lp_supply$($c, [$p[0], $p[1]] as TypeTag[]));
        numerator = SafeMath.mul$($.copy(total_supply), SafeMath.sub$($.copy(root_k), $.copy(root_k_last), $c), $c);
        denominator = SafeMath.add$($.copy(root_k_last), SafeMath.mul$($.copy(root_k), u128("5"), $c), $c);
        liquidity = u64(SafeMath.div$($.copy(numerator), $.copy(denominator), $c));
        mint_lp_to$($.copy(metadata.fee_to), $.copy(liquidity), metadata.mint_cap, $c, [$p[0], $p[1]] as TypeTag[]);
      }
      else{
      }
    }
    else{
    }
  }
  else{
    if ($.copy(metadata.k_last).neq(u128("0"))) {
      metadata.k_last = u128("0");
    }
    else{
    }
  }
  return;
}

export function mint_lp$ (
  amount: U64,
  mint_cap: AptosFramework.Coin.MintCapability,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): AptosFramework.Coin.Coin {
  return AptosFramework.Coin.mint$($.copy(amount), mint_cap, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
}

export function mint_lp_to$ (
  to: HexString,
  amount: U64,
  mint_cap: AptosFramework.Coin.MintCapability,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let coins;
  coins = AptosFramework.Coin.mint$($.copy(amount), mint_cap, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
  AptosFramework.Coin.deposit$($.copy(to), coins, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
  return;
}

// test func
export function mint_lp_to_self$ (
  amount: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let metadata;
  metadata = $c.borrow_global_mut<TokenPairMetadata>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "TokenPairMetadata", [$p[0], $p[1]]), new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"));
  AptosFramework.Coin.merge$(metadata.lp, AptosFramework.Coin.mint$($.copy(amount), metadata.mint_cap, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
  return;
}

// test func
export function mint_works$ (
  admin: HexString,
  token_owner: HexString,
  lp_provider: HexString,
  lock: HexString,
  core: HexString,
  $c: AptosDataCache,
): void {
  let amount_x, amount_y, b0, b1, decimals, expected_liquidity, fee_to, r0, r1, total_supply;
  decimals = u8("8");
  total_supply = u64(expand_to_decimals$(u64("1000000"), u8("8"), $c));
  issue_token$(admin, token_owner, [u8("116"), u8("48")], $.copy(total_supply), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token0", [])] as TypeTag[]);
  issue_token$(admin, token_owner, [u8("116"), u8("49")], $.copy(total_supply), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token1", [])] as TypeTag[]);
  fee_to = Std.Signer.address_of$(admin, $c);
  create_token_pair$(admin, $.copy(fee_to), true, [u8("110"), u8("97"), u8("109"), u8("101")], [u8("115"), u8("121"), u8("109"), u8("98"), u8("111"), u8("108")], u64("8"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token0", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token1", [])] as TypeTag[]);
  AptosFramework.Timestamp.set_time_has_started_for_testing$(core, $c);
  register_account$(lp_provider, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token0", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token1", [])] as TypeTag[]);
  register_account$(lock, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token0", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token1", [])] as TypeTag[]);
  AptosFramework.Coin.register_internal$(lp_provider, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token0", [])] as TypeTag[]);
  AptosFramework.Coin.register_internal$(lp_provider, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token1", [])] as TypeTag[]);
  amount_x = expand_to_decimals$(u64("1"), $.copy(decimals), $c);
  amount_y = expand_to_decimals$(u64("4"), $.copy(decimals), $c);
  AptosFramework.Coin.deposit$(Std.Signer.address_of$(lp_provider, $c), AptosFramework.Coin.withdraw$(token_owner, $.copy(amount_x), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token0", [])] as TypeTag[]), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token0", [])] as TypeTag[]);
  AptosFramework.Coin.deposit$(Std.Signer.address_of$(lp_provider, $c), AptosFramework.Coin.withdraw$(token_owner, $.copy(amount_y), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token1", [])] as TypeTag[]), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token1", [])] as TypeTag[]);
  add_liquidity$(lp_provider, $.copy(amount_x), $.copy(amount_y), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token0", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token1", [])] as TypeTag[]);
  expected_liquidity = expand_to_decimals$(u64("2"), $.copy(decimals), $c);
  [b0, b1] = token_balances$($c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token0", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token1", [])] as TypeTag[]);
  if (!$.copy(b0).eq($.copy(amount_x))) {
    throw $.abortCode(u64("0"));
  }
  if (!$.copy(b1).eq($.copy(amount_y))) {
    throw $.abortCode(u64("0"));
  }
  if (!total_lp_supply$($c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token0", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token1", [])] as TypeTag[]).eq(u128($.copy(expected_liquidity)))) {
    throw $.abortCode(u64("0"));
  }
  if (!lp_balance$(Std.Signer.address_of$(lp_provider, $c), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token0", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token1", [])] as TypeTag[]).eq($.copy(expected_liquidity).sub(u64(MINIMUM_LIQUIDITY)))) {
    throw $.abortCode(u64("0"));
  }
  [r0, r1, ] = get_reserves$($c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token0", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token1", [])] as TypeTag[]);
  if (!$.copy(r0).eq($.copy(amount_x))) {
    throw $.abortCode(u64("0"));
  }
  if (!$.copy(r1).eq($.copy(amount_y))) {
    throw $.abortCode(u64("0"));
  }
  return;
}

export function register_account$ (
  sender: HexString,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  AptosFramework.Coin.register_internal$(sender, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
  return;
}

export function remove_liquidity$ (
  sender: HexString,
  liquidity: U64,
  amount_x_min: U64,
  amount_y_min: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): [U64, U64] {
  let amount_x, amount_y, coins, coins_x, coins_y;
  coins = AptosFramework.Coin.withdraw$(sender, $.copy(liquidity), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
  [coins_x, coins_y] = remove_liquidity_direct$(coins, $.copy(amount_x_min), $.copy(amount_y_min), $c, [$p[0], $p[1]] as TypeTag[]);
  amount_x = AptosFramework.Coin.value$(coins_x, $c, [$p[0]] as TypeTag[]);
  amount_y = AptosFramework.Coin.value$(coins_y, $c, [$p[1]] as TypeTag[]);
  check_coin_store$(sender, $c, [$p[0]] as TypeTag[]);
  check_coin_store$(sender, $c, [$p[1]] as TypeTag[]);
  AptosFramework.Coin.deposit$(Std.Signer.address_of$(sender, $c), coins_x, $c, [$p[0]] as TypeTag[]);
  AptosFramework.Coin.deposit$(Std.Signer.address_of$(sender, $c), coins_y, $c, [$p[1]] as TypeTag[]);
  return [$.copy(amount_x), $.copy(amount_y)];
}

export function remove_liquidity_direct$ (
  liquidity: AptosFramework.Coin.Coin,
  amount_x_min: U64,
  amount_y_min: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): [AptosFramework.Coin.Coin, AptosFramework.Coin.Coin] {
  let coins_x, coins_y;
  tranfer_lp_coin_in$(liquidity, $c, [$p[0], $p[1]] as TypeTag[]);
  [coins_x, coins_y] = burn$($c, [$p[0], $p[1]] as TypeTag[]);
  if (!AptosFramework.Coin.value$(coins_x, $c, [$p[0]] as TypeTag[]).ge($.copy(amount_x_min))) {
    throw $.abortCode(ERROR_INSUFFICIENT_TOKEN0_AMOUNT);
  }
  if (!AptosFramework.Coin.value$(coins_y, $c, [$p[1]] as TypeTag[]).ge($.copy(amount_y_min))) {
    throw $.abortCode(ERROR_INSUFFICIENT_TOKEN1_AMOUNT);
  }
  return [coins_x, coins_y];
}

// test func
export function remove_liquidity_works$ (
  admin: HexString,
  token_owner: HexString,
  lp_provider: HexString,
  lock: HexString,
  core: HexString,
  $c: AptosDataCache,
): void {
  let amount_x, amount_y, b0, b1, decimals, expected_liquidity, fee_to, total_supply;
  decimals = u8("8");
  total_supply = u64(expand_to_decimals$(u64("1000000"), u8("8"), $c));
  issue_token$(admin, token_owner, [u8("116"), u8("48")], $.copy(total_supply), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token0", [])] as TypeTag[]);
  issue_token$(admin, token_owner, [u8("116"), u8("49")], $.copy(total_supply), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token1", [])] as TypeTag[]);
  fee_to = Std.Signer.address_of$(admin, $c);
  create_token_pair$(admin, $.copy(fee_to), true, [u8("110"), u8("97"), u8("109"), u8("101")], [u8("115"), u8("121"), u8("109"), u8("98"), u8("111"), u8("108")], u64("8"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token0", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token1", [])] as TypeTag[]);
  AptosFramework.Timestamp.set_time_has_started_for_testing$(core, $c);
  register_account$(lp_provider, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token0", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token1", [])] as TypeTag[]);
  register_account$(lock, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token0", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token1", [])] as TypeTag[]);
  AptosFramework.Coin.register_internal$(lp_provider, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token0", [])] as TypeTag[]);
  AptosFramework.Coin.register_internal$(lp_provider, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token1", [])] as TypeTag[]);
  amount_x = expand_to_decimals$(u64("3"), $.copy(decimals), $c);
  amount_y = expand_to_decimals$(u64("3"), $.copy(decimals), $c);
  AptosFramework.Coin.deposit$(Std.Signer.address_of$(lp_provider, $c), AptosFramework.Coin.withdraw$(token_owner, $.copy(amount_x), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token0", [])] as TypeTag[]), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token0", [])] as TypeTag[]);
  AptosFramework.Coin.deposit$(Std.Signer.address_of$(lp_provider, $c), AptosFramework.Coin.withdraw$(token_owner, $.copy(amount_y), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token1", [])] as TypeTag[]), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token1", [])] as TypeTag[]);
  add_liquidity$(lp_provider, $.copy(amount_x), $.copy(amount_y), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token0", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token1", [])] as TypeTag[]);
  expected_liquidity = expand_to_decimals$(u64("3"), $.copy(decimals), $c);
  remove_liquidity$(lp_provider, $.copy(expected_liquidity).sub(u64(MINIMUM_LIQUIDITY)), $.copy(expected_liquidity).sub(u64(MINIMUM_LIQUIDITY)), $.copy(expected_liquidity).sub(u64(MINIMUM_LIQUIDITY)), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token0", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token1", [])] as TypeTag[]);
  if (!total_lp_supply$($c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token0", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token1", [])] as TypeTag[]).eq(MINIMUM_LIQUIDITY)) {
    throw $.abortCode(u64("0"));
  }
  if (!lp_balance$(Std.Signer.address_of$(lp_provider, $c), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token0", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token1", [])] as TypeTag[]).eq(u64("0"))) {
    throw $.abortCode(u64("0"));
  }
  [b0, b1] = token_balances$($c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token0", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token1", [])] as TypeTag[]);
  if (!$.copy(b0).eq(u64(MINIMUM_LIQUIDITY))) {
    throw $.abortCode(u64("0"));
  }
  if (!$.copy(b1).eq(u64(MINIMUM_LIQUIDITY))) {
    throw $.abortCode(u64("0"));
  }
  if (!AptosFramework.Coin.balance$(Std.Signer.address_of$(lp_provider, $c), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token0", [])] as TypeTag[]).eq($.copy(amount_x).sub(u64(MINIMUM_LIQUIDITY)))) {
    throw $.abortCode(u64("0"));
  }
  if (!AptosFramework.Coin.balance$(Std.Signer.address_of$(lp_provider, $c), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token1", [])] as TypeTag[]).eq($.copy(amount_y).sub(u64(MINIMUM_LIQUIDITY)))) {
    throw $.abortCode(u64("0"));
  }
  return;
}

export function swap$ (
  amount_x_out: U64,
  amount_y_out: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): [AptosFramework.Coin.Coin, AptosFramework.Coin.Coin] {
  let temp$1, temp$2, temp$3, temp$4, temp$5, amount_x_in, amount_y_in, balance_x, balance_x_adjusted, balance_y, balance_y_adjusted, coins_x_out, coins_y_out, k, metadata, reserves;
  if ($.copy(amount_x_out).gt(u64("0"))) {
    temp$1 = true;
  }
  else{
    temp$1 = $.copy(amount_y_out).gt(u64("0"));
  }
  if (!temp$1) {
    throw $.abortCode(ERROR_INSUFFICIENT_OUTPUT_AMOUNT);
  }
  reserves = $c.borrow_global_mut<TokenPairReserve>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "TokenPairReserve", [$p[0], $p[1]]), MODULE_ADMIN);
  if ($.copy(amount_x_out).lt($.copy(reserves.reserve_x))) {
    temp$2 = $.copy(amount_y_out).lt($.copy(reserves.reserve_y));
  }
  else{
    temp$2 = false;
  }
  if (!temp$2) {
    throw $.abortCode(ERROR_INSUFFICIENT_LIQUIDITY);
  }
  metadata = $c.borrow_global_mut<TokenPairMetadata>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "TokenPairMetadata", [$p[0], $p[1]]), MODULE_ADMIN);
  if (!!$.copy(metadata.locked)) {
    throw $.abortCode(ERROR_ALREADY_LOCKED);
  }
  metadata.locked = true;
  coins_x_out = AptosFramework.Coin.zero$($c, [$p[0]] as TypeTag[]);
  coins_y_out = AptosFramework.Coin.zero$($c, [$p[1]] as TypeTag[]);
  if ($.copy(amount_x_out).gt(u64("0"))) {
    AptosFramework.Coin.merge$(coins_x_out, extract_x$($.copy(amount_x_out), metadata, $c, [$p[0], $p[1]] as TypeTag[]), $c, [$p[0]] as TypeTag[]);
  }
  else{
  }
  if ($.copy(amount_y_out).gt(u64("0"))) {
    AptosFramework.Coin.merge$(coins_y_out, extract_y$($.copy(amount_y_out), metadata, $c, [$p[0], $p[1]] as TypeTag[]), $c, [$p[1]] as TypeTag[]);
  }
  else{
  }
  [balance_x, balance_y] = token_balances_metadata$(metadata, $c, [$p[0], $p[1]] as TypeTag[]);
  if ($.copy(balance_x).gt($.copy(reserves.reserve_x).sub($.copy(amount_x_out)))) {
    temp$3 = $.copy(balance_x).sub($.copy(reserves.reserve_x).sub($.copy(amount_x_out)));
  }
  else{
    temp$3 = u64("0");
  }
  amount_x_in = temp$3;
  if ($.copy(balance_y).gt($.copy(reserves.reserve_y).sub($.copy(amount_y_out)))) {
    temp$4 = $.copy(balance_y).sub($.copy(reserves.reserve_y).sub($.copy(amount_y_out)));
  }
  else{
    temp$4 = u64("0");
  }
  amount_y_in = temp$4;
  if ($.copy(amount_x_in).gt(u64("0"))) {
    temp$5 = true;
  }
  else{
    temp$5 = $.copy(amount_y_in).gt(u64("0"));
  }
  if (!temp$5) {
    throw $.abortCode(ERROR_INSUFFICIENT_INPUT_AMOUNT);
  }
  balance_x_adjusted = SafeMath.sub$(SafeMath.mul$(u128($.copy(balance_x)), u128("1000"), $c), SafeMath.mul$(u128($.copy(amount_x_in)), u128("3"), $c), $c);
  balance_y_adjusted = SafeMath.sub$(SafeMath.mul$(u128($.copy(balance_y)), u128("1000"), $c), SafeMath.mul$(u128($.copy(amount_y_in)), u128("3"), $c), $c);
  k = SafeMath.mul$(u128("1000000"), SafeMath.mul$(u128($.copy(reserves.reserve_x)), u128($.copy(reserves.reserve_y)), $c), $c);
  if (!SafeMath.mul$($.copy(balance_x_adjusted), $.copy(balance_y_adjusted), $c).ge($.copy(k))) {
    throw $.abortCode(ERROR_K);
  }
  update$($.copy(balance_x), $.copy(balance_y), reserves, $c, [$p[0], $p[1]] as TypeTag[]);
  metadata.locked = false;
  return [coins_x_out, coins_y_out];
}

export function swap_x_to_exact_y$ (
  sender: HexString,
  amount_in: U64,
  to: HexString,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): U64 {
  let amount_out, coins, coins_x_out, coins_y_out;
  coins = AptosFramework.Coin.withdraw$(sender, $.copy(amount_in), $c, [$p[0]] as TypeTag[]);
  [coins_x_out, coins_y_out] = swap_x_to_exact_y_direct$(coins, $c, [$p[0], $p[1]] as TypeTag[]);
  amount_out = AptosFramework.Coin.value$(coins_y_out, $c, [$p[1]] as TypeTag[]);
  check_coin_store$(sender, $c, [$p[1]] as TypeTag[]);
  AptosFramework.Coin.deposit$($.copy(to), coins_x_out, $c, [$p[0]] as TypeTag[]);
  AptosFramework.Coin.deposit$($.copy(to), coins_y_out, $c, [$p[1]] as TypeTag[]);
  return $.copy(amount_out);
}

export function swap_x_to_exact_y_direct$ (
  coins_in: AptosFramework.Coin.Coin,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): [AptosFramework.Coin.Coin, AptosFramework.Coin.Coin] {
  let amount_in, amount_out, coins_x_out, coins_y_out, rin, rout;
  amount_in = AptosFramework.Coin.value$(coins_in, $c, [$p[0]] as TypeTag[]);
  deposit_x$(coins_in, $c, [$p[0], $p[1]] as TypeTag[]);
  [rin, rout, ] = get_reserves$($c, [$p[0], $p[1]] as TypeTag[]);
  amount_out = CPSwapUtils.get_amount_out$($.copy(amount_in), $.copy(rin), $.copy(rout), $c);
  [coins_x_out, coins_y_out] = swap$(u64("0"), $.copy(amount_out), $c, [$p[0], $p[1]] as TypeTag[]);
  if (!AptosFramework.Coin.value$(coins_x_out, $c, [$p[0]] as TypeTag[]).eq(u64("0"))) {
    throw $.abortCode(ERROR_INSUFFICIENT_OUTPUT_AMOUNT);
  }
  return [coins_x_out, coins_y_out];
}

// test func
export function swap_x_works$ (
  admin: HexString,
  token_owner: HexString,
  lp_provider: HexString,
  lock: HexString,
  core: HexString,
  $c: AptosDataCache,
): void {
  let amount_x, amount_y, b0, b1, decimals, expected_output_amount, fee_to, reserve_x, reserve_y, swap_amount, total_supply, x, y;
  decimals = u8("8");
  total_supply = u64(expand_to_decimals$(u64("1000000"), u8("8"), $c));
  issue_token$(admin, token_owner, [u8("116"), u8("48")], $.copy(total_supply), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token0", [])] as TypeTag[]);
  issue_token$(admin, token_owner, [u8("116"), u8("49")], $.copy(total_supply), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token1", [])] as TypeTag[]);
  fee_to = Std.Signer.address_of$(admin, $c);
  create_token_pair$(admin, $.copy(fee_to), true, [u8("110"), u8("97"), u8("109"), u8("101")], [u8("115"), u8("121"), u8("109"), u8("98"), u8("111"), u8("108")], u64("8"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token0", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token1", [])] as TypeTag[]);
  AptosFramework.Timestamp.set_time_has_started_for_testing$(core, $c);
  register_account$(lp_provider, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token0", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token1", [])] as TypeTag[]);
  register_account$(lock, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token0", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token1", [])] as TypeTag[]);
  register_account$(token_owner, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token0", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token1", [])] as TypeTag[]);
  AptosFramework.Coin.register_internal$(lp_provider, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token0", [])] as TypeTag[]);
  AptosFramework.Coin.register_internal$(lp_provider, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token1", [])] as TypeTag[]);
  amount_x = expand_to_decimals$(u64("5"), $.copy(decimals), $c);
  amount_y = expand_to_decimals$(u64("10"), $.copy(decimals), $c);
  add_liquidity$(token_owner, $.copy(amount_x), $.copy(amount_y), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token0", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token1", [])] as TypeTag[]);
  swap_amount = expand_to_decimals$(u64("1"), $.copy(decimals), $c);
  expected_output_amount = u64("160000001");
  deposit_x$(AptosFramework.Coin.withdraw$(token_owner, $.copy(swap_amount), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token0", [])] as TypeTag[]), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token0", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token1", [])] as TypeTag[]);
  [x, y] = swap$(u64("0"), $.copy(expected_output_amount), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token0", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token1", [])] as TypeTag[]);
  AptosFramework.Coin.deposit$(Std.Signer.address_of$(lp_provider, $c), x, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token0", [])] as TypeTag[]);
  AptosFramework.Coin.deposit$(Std.Signer.address_of$(lp_provider, $c), y, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token1", [])] as TypeTag[]);
  [reserve_x, reserve_y, ] = get_reserves$($c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token0", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token1", [])] as TypeTag[]);
  if (!$.copy(reserve_x).eq($.copy(amount_x).add($.copy(swap_amount)))) {
    throw $.abortCode(u64("0"));
  }
  if (!$.copy(reserve_y).eq($.copy(amount_y).sub($.copy(expected_output_amount)))) {
    throw $.abortCode(u64("0"));
  }
  [b0, b1] = token_balances$($c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token0", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token1", [])] as TypeTag[]);
  if (!$.copy(b0).eq($.copy(amount_x).add($.copy(swap_amount)))) {
    throw $.abortCode(u64("0"));
  }
  if (!$.copy(b1).eq($.copy(amount_y).sub($.copy(expected_output_amount)))) {
    throw $.abortCode(u64("0"));
  }
  if (!AptosFramework.Coin.balance$(Std.Signer.address_of$(lp_provider, $c), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token0", [])] as TypeTag[]).eq(u64("0"))) {
    throw $.abortCode(u64("0"));
  }
  if (!AptosFramework.Coin.balance$(Std.Signer.address_of$(lp_provider, $c), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "Token1", [])] as TypeTag[]).eq($.copy(expected_output_amount))) {
    throw $.abortCode(u64("0"));
  }
  return;
}

export function swap_y_to_exact_x$ (
  sender: HexString,
  amount_in: U64,
  to: HexString,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): U64 {
  let amount_out, coins, coins_x_out, coins_y_out;
  coins = AptosFramework.Coin.withdraw$(sender, $.copy(amount_in), $c, [$p[1]] as TypeTag[]);
  [coins_x_out, coins_y_out] = swap_y_to_exact_x_direct$(coins, $c, [$p[0], $p[1]] as TypeTag[]);
  amount_out = AptosFramework.Coin.value$(coins_x_out, $c, [$p[0]] as TypeTag[]);
  check_coin_store$(sender, $c, [$p[0]] as TypeTag[]);
  AptosFramework.Coin.deposit$($.copy(to), coins_x_out, $c, [$p[0]] as TypeTag[]);
  AptosFramework.Coin.deposit$($.copy(to), coins_y_out, $c, [$p[1]] as TypeTag[]);
  return $.copy(amount_out);
}

export function swap_y_to_exact_x_direct$ (
  coins_in: AptosFramework.Coin.Coin,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): [AptosFramework.Coin.Coin, AptosFramework.Coin.Coin] {
  let amount_in, amount_out, coins_x_out, coins_y_out, rin, rout;
  amount_in = AptosFramework.Coin.value$(coins_in, $c, [$p[1]] as TypeTag[]);
  deposit_y$(coins_in, $c, [$p[0], $p[1]] as TypeTag[]);
  [rout, rin, ] = get_reserves$($c, [$p[0], $p[1]] as TypeTag[]);
  amount_out = CPSwapUtils.get_amount_out$($.copy(amount_in), $.copy(rin), $.copy(rout), $c);
  [coins_x_out, coins_y_out] = swap$($.copy(amount_out), u64("0"), $c, [$p[0], $p[1]] as TypeTag[]);
  if (!AptosFramework.Coin.value$(coins_y_out, $c, [$p[1]] as TypeTag[]).eq(u64("0"))) {
    throw $.abortCode(ERROR_INSUFFICIENT_OUTPUT_AMOUNT);
  }
  return [coins_x_out, coins_y_out];
}

export function token_balances$ (
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): [U64, U64] {
  let meta;
  meta = $c.borrow_global<TokenPairMetadata>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "TokenPairMetadata", [$p[0], $p[1]]), MODULE_ADMIN);
  return token_balances_metadata$(meta, $c, [$p[0], $p[1]] as TypeTag[]);
}

export function token_balances_metadata$ (
  metadata: TokenPairMetadata,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): [U64, U64] {
  return [AptosFramework.Coin.value$(metadata.balance_x, $c, [$p[0]] as TypeTag[]), AptosFramework.Coin.value$(metadata.balance_y, $c, [$p[1]] as TypeTag[])];
}

export function total_lp_supply$ (
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): U128 {
  let temp$1;
  temp$1 = AptosFramework.Coin.supply$($c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
  return Std.Option.get_with_default$(temp$1, u128("0"), $c, [AtomicTypeTag.U128] as TypeTag[]);
}

export function tranfer_lp_coin_in$ (
  coins: AptosFramework.Coin.Coin,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let metadata;
  metadata = $c.borrow_global_mut<TokenPairMetadata>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "TokenPairMetadata", [$p[0], $p[1]]), new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"));
  AptosFramework.Coin.merge$(metadata.lp, coins, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
  return;
}

export function transfer_x$ (
  amount: U64,
  recipient: HexString,
  metadata: TokenPairMetadata,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let coins;
  coins = extract_x$($.copy(amount), metadata, $c, [$p[0], $p[1]] as TypeTag[]);
  AptosFramework.Coin.deposit$($.copy(recipient), coins, $c, [$p[0]] as TypeTag[]);
  return;
}

export function transfer_y$ (
  amount: U64,
  recipient: HexString,
  metadata: TokenPairMetadata,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let coins;
  coins = extract_y$($.copy(amount), metadata, $c, [$p[0], $p[1]] as TypeTag[]);
  AptosFramework.Coin.deposit$($.copy(recipient), coins, $c, [$p[1]] as TypeTag[]);
  return;
}

export function unit_test_poison$ (
  $c: AptosDataCache,
): void {
  Std.UnitTest.create_signers_for_testing$(u64("0"), $c);
  return;
}

export function update$ (
  balance_x: U64,
  balance_y: U64,
  reserve: TokenPairReserve,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let temp$1, block_timestamp;
  if (u128($.copy(balance_x)).le(BALANCE_MAX)) {
    temp$1 = u128($.copy(balance_y)).le(BALANCE_MAX);
  }
  else{
    temp$1 = false;
  }
  if (!temp$1) {
    throw $.abortCode(ERROR_OVERFLOW);
  }
  block_timestamp = AptosFramework.Timestamp.now_seconds$($c).mod(u64("4294967295"));
  reserve.reserve_x = $.copy(balance_x);
  reserve.reserve_y = $.copy(balance_y);
  reserve.block_timestamp_last = $.copy(block_timestamp);
  return;
}


