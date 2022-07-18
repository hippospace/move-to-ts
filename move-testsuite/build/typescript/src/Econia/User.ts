import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient} from "aptos";
import * as AptosFramework from "../AptosFramework";
import * as Std from "../Std";
import * as Book from "./Book";
import * as Caps from "./Caps";
import * as ID from "./ID";
import * as Init from "./Init";
import * as Orders from "./Orders";
import * as Registry from "./Registry";
import * as Version from "./Version";
export const packageName = "Econia";
export const moduleAddress = new HexString("0xc0deb00c");
export const moduleName = "User";

export const ASK : boolean = true;
export const BID : boolean = false;
export const E_CROSSES_SPREAD : U64 = u64("10");
export const E_INVALID_S_N : U64 = u64("5");
export const E_NOT_ENOUGH_COLLATERAL : U64 = u64("9");
export const E_NO_MARKET : U64 = u64("1");
export const E_NO_O_C : U64 = u64("6");
export const E_NO_S_C : U64 = u64("4");
export const E_NO_TRANSFER : U64 = u64("7");
export const E_O_C_EXISTS : U64 = u64("0");
export const E_O_O_EXISTS : U64 = u64("2");
export const E_S_C_EXISTS : U64 = u64("3");
export const E_WITHDRAW_TOO_MUCH : U64 = u64("8");


export class OC 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "OC";
  static typeParameters: TypeParamDeclType[] = [
    { name: "B", isPhantom: true },
    { name: "Q", isPhantom: true },
    { name: "E", isPhantom: true }
  ];
  static fields: FieldDeclType[] = [
  { name: "b_a", typeTag: AtomicTypeTag.U64 },
  { name: "b_c", typeTag: new StructTag(new HexString("0x1"), "Coin", "Coin", [new $.TypeParamIdx(0)]) },
  { name: "q_a", typeTag: AtomicTypeTag.U64 },
  { name: "q_c", typeTag: new StructTag(new HexString("0x1"), "Coin", "Coin", [new $.TypeParamIdx(1)]) }];

  b_a: U64;
  b_c: AptosFramework.Coin.Coin;
  q_a: U64;
  q_c: AptosFramework.Coin.Coin;

  constructor(proto: any, public typeTag: TypeTag) {
    this.b_a = proto['b_a'] as U64;
    this.b_c = proto['b_c'] as AptosFramework.Coin.Coin;
    this.q_a = proto['q_a'] as U64;
    this.q_c = proto['q_c'] as AptosFramework.Coin.Coin;
  }

  static OCParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : OC {
    const proto = $.parseStructProto(data, typeTag, repo, OC);
    return new OC(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, OC, typeParams);
    return result as unknown as OC;
  }
}

export class SC 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "SC";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "i", typeTag: AtomicTypeTag.U64 }];

  i: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.i = proto['i'] as U64;
  }

  static SCParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : SC {
    const proto = $.parseStructProto(data, typeTag, repo, SC);
    return new SC(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, SC, typeParams);
    return result as unknown as SC;
  }
}
export function cancel_ask$ (
  user: HexString,
  host: HexString,
  id: U128,
  $c: AptosDataCache,
  $p: TypeTag[], /* <B, Q, E>*/
): void {
  cancel_order$(user, $.copy(host), ASK, $.copy(id), $c, [$p[0], $p[1], $p[2]] as TypeTag[]);
  return;
}


export function buildPayload_cancel_ask (
  host: HexString,
  id: U128,
  $p: TypeTag[], /* <B, Q, E>*/
) {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    "0xc0deb00c::User::cancel_ask",
    typeParamStrings,
    [
      $.payloadArg(host),
      $.payloadArg(id),
    ]
  );

}
// #[test]
export function cancel_ask_success$ (
  econia: HexString,
  user: HexString,
  $c: AptosDataCache,
): void {
  let temp$1, temp$3, id, o_c, o_c__2, order_v_n, price, size;
  init_test_scaled_market_funded_user$(econia, user, u64("100"), u64("200"), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])] as TypeTag[]);
  order_v_n = Version.get_v_n$($c).add(u64("1"));
  [price, size] = [u64("5"), u64("3")];
  id = ID.id_a$($.copy(price), $.copy(order_v_n), $c);
  submit_ask$(user, new HexString("0xc0deb00c"), $.copy(price), $.copy(size), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])] as TypeTag[]);
  if (!Orders.has_ask$(new HexString("0x5678"), $.copy(id), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])] as TypeTag[])) {
    throw $.abortCode(u64("0"));
  }
  if (!Book.has_ask$(new HexString("0xc0deb00c"), $.copy(id), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])] as TypeTag[])) {
    throw $.abortCode(u64("1"));
  }
  o_c = $c.borrow_global<OC>(new StructTag(new HexString("0xc0deb00c"), "User", "OC", [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])]), new HexString("0x5678"));
  if ($.copy(o_c.b_a).eq(u64("70"))) {
    temp$1 = $.copy(o_c.q_a).eq(u64("200"));
  }
  else{
    temp$1 = false;
  }
  if (!temp$1) {
    throw $.abortCode(u64("2"));
  }
  AptosFramework.Account.increment_sequence_number$(new HexString("0x5678"), $c);
  cancel_ask$(user, new HexString("0xc0deb00c"), $.copy(id), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])] as TypeTag[]);
  if (!!Orders.has_ask$(new HexString("0x5678"), $.copy(id), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])] as TypeTag[])) {
    throw $.abortCode(u64("3"));
  }
  if (!!Book.has_ask$(new HexString("0xc0deb00c"), $.copy(id), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])] as TypeTag[])) {
    throw $.abortCode(u64("4"));
  }
  o_c__2 = $c.borrow_global<OC>(new StructTag(new HexString("0xc0deb00c"), "User", "OC", [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])]), new HexString("0x5678"));
  if ($.copy(o_c__2.b_a).eq(u64("100"))) {
    temp$3 = $.copy(o_c__2.q_a).eq(u64("200"));
  }
  else{
    temp$3 = false;
  }
  if (!temp$3) {
    throw $.abortCode(u64("5"));
  }
  return;
}


export function buildPayload_cancel_ask_success (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xc0deb00c::User::cancel_ask_success",
    typeParamStrings,
    []
  );

}
export function cancel_bid$ (
  user: HexString,
  host: HexString,
  id: U128,
  $c: AptosDataCache,
  $p: TypeTag[], /* <B, Q, E>*/
): void {
  cancel_order$(user, $.copy(host), BID, $.copy(id), $c, [$p[0], $p[1], $p[2]] as TypeTag[]);
  return;
}


export function buildPayload_cancel_bid (
  host: HexString,
  id: U128,
  $p: TypeTag[], /* <B, Q, E>*/
) {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    "0xc0deb00c::User::cancel_bid",
    typeParamStrings,
    [
      $.payloadArg(host),
      $.payloadArg(id),
    ]
  );

}
// #[test]
export function cancel_bid_success$ (
  econia: HexString,
  user: HexString,
  $c: AptosDataCache,
): void {
  let temp$1, temp$3, id, o_c, o_c__2, order_v_n, price, size;
  init_test_scaled_market_funded_user$(econia, user, u64("100"), u64("200"), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])] as TypeTag[]);
  order_v_n = Version.get_v_n$($c).add(u64("1"));
  [price, size] = [u64("5"), u64("3")];
  id = ID.id_b$($.copy(price), $.copy(order_v_n), $c);
  submit_bid$(user, new HexString("0xc0deb00c"), $.copy(price), $.copy(size), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])] as TypeTag[]);
  if (!Orders.has_bid$(new HexString("0x5678"), $.copy(id), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])] as TypeTag[])) {
    throw $.abortCode(u64("0"));
  }
  if (!Book.has_bid$(new HexString("0xc0deb00c"), $.copy(id), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])] as TypeTag[])) {
    throw $.abortCode(u64("1"));
  }
  o_c = $c.borrow_global<OC>(new StructTag(new HexString("0xc0deb00c"), "User", "OC", [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])]), new HexString("0x5678"));
  if ($.copy(o_c.b_a).eq(u64("100"))) {
    temp$1 = $.copy(o_c.q_a).eq(u64("185"));
  }
  else{
    temp$1 = false;
  }
  if (!temp$1) {
    throw $.abortCode(u64("2"));
  }
  AptosFramework.Account.increment_sequence_number$(new HexString("0x5678"), $c);
  cancel_bid$(user, new HexString("0xc0deb00c"), $.copy(id), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])] as TypeTag[]);
  if (!!Orders.has_bid$(new HexString("0x5678"), $.copy(id), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])] as TypeTag[])) {
    throw $.abortCode(u64("3"));
  }
  if (!!Book.has_bid$(new HexString("0xc0deb00c"), $.copy(id), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])] as TypeTag[])) {
    throw $.abortCode(u64("4"));
  }
  o_c__2 = $c.borrow_global<OC>(new StructTag(new HexString("0xc0deb00c"), "User", "OC", [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])]), new HexString("0x5678"));
  if ($.copy(o_c__2.b_a).eq(u64("100"))) {
    temp$3 = $.copy(o_c__2.q_a).eq(u64("200"));
  }
  else{
    temp$3 = false;
  }
  if (!temp$3) {
    throw $.abortCode(u64("5"));
  }
  return;
}


export function buildPayload_cancel_bid_success (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xc0deb00c::User::cancel_bid_success",
    typeParamStrings,
    []
  );

}
export function cancel_order$ (
  user: HexString,
  host: HexString,
  side: boolean,
  id: U128,
  $c: AptosDataCache,
  $p: TypeTag[], /* <B, Q, E>*/
): void {
  let temp$1, temp$11, temp$12, temp$13, temp$2, temp$3, temp$4, temp$5, temp$6, temp$7, temp$8, temp$9, addr, o_c, s_s, s_s__10;
  update_s_c$(user, $c);
  addr = Std.Signer.address_of$(user, $c);
  if (!$c.exists(new StructTag(new HexString("0xc0deb00c"), "User", "OC", [$p[0], $p[1], $p[2]]), $.copy(addr))) {
    throw $.abortCode(E_NO_O_C);
  }
  o_c = $c.borrow_global_mut<OC>(new StructTag(new HexString("0xc0deb00c"), "User", "OC", [$p[0], $p[1], $p[2]]), $.copy(addr));
  if ((side == ASK)) {
    temp$3 = $.copy(addr);
    temp$2 = $.copy(id);
    temp$1 = Caps.orders_f_c$($c);
    s_s = Orders.cancel_ask$(temp$3, temp$2, temp$1, $c, [$p[0], $p[1], $p[2]] as TypeTag[]);
    temp$6 = $.copy(host);
    temp$5 = $.copy(id);
    temp$4 = Caps.book_f_c$($c);
    Book.cancel_ask$(temp$6, temp$5, temp$4, $c, [$p[0], $p[1], $p[2]] as TypeTag[]);
    o_c.b_a = $.copy(o_c.b_a).add($.copy(s_s).mul(Orders.scale_factor$($.copy(addr), $c, [$p[0], $p[1], $p[2]] as TypeTag[])));
  }
  else{
    temp$9 = $.copy(addr);
    temp$8 = $.copy(id);
    temp$7 = Caps.orders_f_c$($c);
    s_s__10 = Orders.cancel_bid$(temp$9, temp$8, temp$7, $c, [$p[0], $p[1], $p[2]] as TypeTag[]);
    temp$13 = $.copy(host);
    temp$12 = $.copy(id);
    temp$11 = Caps.book_f_c$($c);
    Book.cancel_bid$(temp$13, temp$12, temp$11, $c, [$p[0], $p[1], $p[2]] as TypeTag[]);
    o_c.q_a = $.copy(o_c.q_a).add($.copy(s_s__10).mul(ID.price$($.copy(id), $c)));
  }
  return;
}

// #[test]
export function cancel_order_failure_no_o_c$ (
  user: HexString,
  $c: AptosDataCache,
): void {
  AptosFramework.Account.create_account$(new HexString("0x5678"), $c);
  init_user$(user, $c);
  AptosFramework.Account.increment_sequence_number$(new HexString("0x5678"), $c);
  cancel_bid$(user, new HexString("0x5678"), u128("1"), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E0", [])] as TypeTag[]);
  return;
}


export function buildPayload_cancel_order_failure_no_o_c (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xc0deb00c::User::cancel_order_failure_no_o_c",
    typeParamStrings,
    []
  );

}
export function deposit$ (
  user: HexString,
  b_val: U64,
  q_val: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <B, Q, E>*/
): void {
  let temp$1, addr, o_c;
  addr = Std.Signer.address_of$(user, $c);
  if (!$c.exists(new StructTag(new HexString("0xc0deb00c"), "User", "OC", [$p[0], $p[1], $p[2]]), $.copy(addr))) {
    throw $.abortCode(E_NO_O_C);
  }
  if ($.copy(b_val).gt(u64("0"))) {
    temp$1 = true;
  }
  else{
    temp$1 = $.copy(q_val).gt(u64("0"));
  }
  if (!temp$1) {
    throw $.abortCode(E_NO_TRANSFER);
  }
  o_c = $c.borrow_global_mut<OC>(new StructTag(new HexString("0xc0deb00c"), "User", "OC", [$p[0], $p[1], $p[2]]), $.copy(addr));
  if ($.copy(b_val).gt(u64("0"))) {
    AptosFramework.Coin.merge$(o_c.b_c, AptosFramework.Coin.withdraw$(user, $.copy(b_val), $c, [$p[0]] as TypeTag[]), $c, [$p[0]] as TypeTag[]);
    o_c.b_a = $.copy(o_c.b_a).add($.copy(b_val));
  }
  else{
  }
  if ($.copy(q_val).gt(u64("0"))) {
    AptosFramework.Coin.merge$(o_c.q_c, AptosFramework.Coin.withdraw$(user, $.copy(q_val), $c, [$p[1]] as TypeTag[]), $c, [$p[1]] as TypeTag[]);
    o_c.q_a = $.copy(o_c.q_a).add($.copy(q_val));
  }
  else{
  }
  update_s_c$(user, $c);
  return;
}


export function buildPayload_deposit (
  b_val: U64,
  q_val: U64,
  $p: TypeTag[], /* <B, Q, E>*/
) {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    "0xc0deb00c::User::deposit",
    typeParamStrings,
    [
      $.payloadArg(b_val),
      $.payloadArg(q_val),
    ]
  );

}
// #[test]
export function deposit_failure_no_deposit$ (
  econia: HexString,
  user: HexString,
  $c: AptosDataCache,
): void {
  init_test_market_user$(econia, user, $c);
  deposit$(user, u64("0"), u64("0"), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E0", [])] as TypeTag[]);
  return;
}


export function buildPayload_deposit_failure_no_deposit (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xc0deb00c::User::deposit_failure_no_deposit",
    typeParamStrings,
    []
  );

}
// #[test]
export function deposit_failure_no_o_c$ (
  user: HexString,
  $c: AptosDataCache,
): void {
  deposit$(user, u64("1"), u64("2"), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E0", [])] as TypeTag[]);
  return;
}


export function buildPayload_deposit_failure_no_o_c (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xc0deb00c::User::deposit_failure_no_o_c",
    typeParamStrings,
    []
  );

}
// #[test]
export function deposit_success$ (
  econia: HexString,
  user: HexString,
  $c: AptosDataCache,
): void {
  let temp$1, temp$10, temp$11, temp$2, temp$3, temp$4, temp$6, temp$7, temp$8, addr, o_c, o_c__5, o_c__9;
  init_test_market_user$(econia, user, $c);
  addr = Std.Signer.address_of$(user, $c);
  Registry.mint_bct_to$($.copy(addr), u64("100"), $c);
  Registry.mint_qct_to$($.copy(addr), u64("200"), $c);
  AptosFramework.Account.increment_sequence_number$($.copy(addr), $c);
  deposit$(user, u64("1"), u64("0"), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E0", [])] as TypeTag[]);
  if (AptosFramework.Coin.balance$($.copy(addr), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", [])] as TypeTag[]).eq(u64("99"))) {
    temp$1 = AptosFramework.Coin.balance$($.copy(addr), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", [])] as TypeTag[]).eq(u64("200"));
  }
  else{
    temp$1 = false;
  }
  if (!temp$1) {
    throw $.abortCode(u64("0"));
  }
  o_c = $c.borrow_global<OC>(new StructTag(new HexString("0xc0deb00c"), "User", "OC", [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E0", [])]), $.copy(addr));
  if (AptosFramework.Coin.value$(o_c.b_c, $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", [])] as TypeTag[]).eq(u64("1"))) {
    temp$2 = AptosFramework.Coin.value$(o_c.q_c, $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", [])] as TypeTag[]).eq(u64("0"));
  }
  else{
    temp$2 = false;
  }
  if (!temp$2) {
    throw $.abortCode(u64("1"));
  }
  if ($.copy(o_c.b_a).eq(u64("1"))) {
    temp$3 = $.copy(o_c.q_a).eq(u64("0"));
  }
  else{
    temp$3 = false;
  }
  if (!temp$3) {
    throw $.abortCode(u64("2"));
  }
  AptosFramework.Account.increment_sequence_number$($.copy(addr), $c);
  deposit$(user, u64("0"), u64("2"), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E0", [])] as TypeTag[]);
  if (AptosFramework.Coin.balance$($.copy(addr), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", [])] as TypeTag[]).eq(u64("99"))) {
    temp$4 = AptosFramework.Coin.balance$($.copy(addr), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", [])] as TypeTag[]).eq(u64("198"));
  }
  else{
    temp$4 = false;
  }
  if (!temp$4) {
    throw $.abortCode(u64("3"));
  }
  o_c__5 = $c.borrow_global<OC>(new StructTag(new HexString("0xc0deb00c"), "User", "OC", [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E0", [])]), $.copy(addr));
  if (AptosFramework.Coin.value$(o_c__5.b_c, $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", [])] as TypeTag[]).eq(u64("1"))) {
    temp$6 = AptosFramework.Coin.value$(o_c__5.q_c, $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", [])] as TypeTag[]).eq(u64("2"));
  }
  else{
    temp$6 = false;
  }
  if (!temp$6) {
    throw $.abortCode(u64("4"));
  }
  if ($.copy(o_c__5.b_a).eq(u64("1"))) {
    temp$7 = $.copy(o_c__5.q_a).eq(u64("2"));
  }
  else{
    temp$7 = false;
  }
  if (!temp$7) {
    throw $.abortCode(u64("5"));
  }
  AptosFramework.Account.increment_sequence_number$($.copy(addr), $c);
  deposit$(user, u64("5"), u64("5"), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E0", [])] as TypeTag[]);
  if (AptosFramework.Coin.balance$($.copy(addr), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", [])] as TypeTag[]).eq(u64("94"))) {
    temp$8 = AptosFramework.Coin.balance$($.copy(addr), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", [])] as TypeTag[]).eq(u64("193"));
  }
  else{
    temp$8 = false;
  }
  if (!temp$8) {
    throw $.abortCode(u64("6"));
  }
  o_c__9 = $c.borrow_global<OC>(new StructTag(new HexString("0xc0deb00c"), "User", "OC", [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E0", [])]), $.copy(addr));
  if (AptosFramework.Coin.value$(o_c__9.b_c, $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", [])] as TypeTag[]).eq(u64("6"))) {
    temp$10 = AptosFramework.Coin.value$(o_c__9.q_c, $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", [])] as TypeTag[]).eq(u64("7"));
  }
  else{
    temp$10 = false;
  }
  if (!temp$10) {
    throw $.abortCode(u64("7"));
  }
  if ($.copy(o_c__9.b_a).eq(u64("6"))) {
    temp$11 = $.copy(o_c__9.q_a).eq(u64("7"));
  }
  else{
    temp$11 = false;
  }
  if (!temp$11) {
    throw $.abortCode(u64("8"));
  }
  return;
}


export function buildPayload_deposit_success (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xc0deb00c::User::deposit_success",
    typeParamStrings,
    []
  );

}
export function init_containers$ (
  user: HexString,
  $c: AptosDataCache,
  $p: TypeTag[], /* <B, Q, E>*/
): void {
  let temp$1, temp$2, temp$3, temp$4, temp$5, temp$6, temp$7, o_c, user_addr;
  if (!Registry.is_registered$($c, [$p[0], $p[1], $p[2]] as TypeTag[])) {
    throw $.abortCode(E_NO_MARKET);
  }
  user_addr = Std.Signer.address_of$(user, $c);
  if (!!$c.exists(new StructTag(new HexString("0xc0deb00c"), "User", "OC", [$p[0], $p[1], $p[2]]), $.copy(user_addr))) {
    throw $.abortCode(E_O_C_EXISTS);
  }
  if (!!Orders.exists_orders$($.copy(user_addr), $c, [$p[0], $p[1], $p[2]] as TypeTag[])) {
    throw $.abortCode(E_O_O_EXISTS);
  }
  temp$1 = AptosFramework.Coin.zero$($c, [$p[0]] as TypeTag[]);
  temp$2 = u64("0");
  temp$3 = AptosFramework.Coin.zero$($c, [$p[1]] as TypeTag[]);
  temp$4 = u64("0");
  o_c = new OC({ b_a: temp$2, b_c: temp$1, q_a: temp$4, q_c: temp$3 }, new StructTag(new HexString("0xc0deb00c"), "User", "OC", [$p[0], $p[1], $p[2]]));
  $c.move_to(new StructTag(new HexString("0xc0deb00c"), "User", "OC", [$p[0], $p[1], $p[2]]), user, o_c);
  temp$7 = user;
  temp$6 = Registry.scale_factor$($c, [$p[2]] as TypeTag[]);
  temp$5 = Caps.orders_f_c$($c);
  Orders.init_orders$(temp$7, temp$6, temp$5, $c, [$p[0], $p[1], $p[2]] as TypeTag[]);
  return;
}


export function buildPayload_init_containers (
  $p: TypeTag[], /* <B, Q, E>*/
) {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    "0xc0deb00c::User::init_containers",
    typeParamStrings,
    []
  );

}
// #[test]
export function init_containers_failure_has_o_c$ (
  econia: HexString,
  user: HexString,
  $c: AptosDataCache,
): void {
  Init.init_econia$(econia, $c);
  Registry.register_test_market$(econia, $c);
  init_o_c$(user, $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E0", [])] as TypeTag[]);
  init_containers$(user, $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E0", [])] as TypeTag[]);
  return;
}


export function buildPayload_init_containers_failure_has_o_c (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xc0deb00c::User::init_containers_failure_has_o_c",
    typeParamStrings,
    []
  );

}
// #[test]
export function init_containers_failure_has_o_o$ (
  econia: HexString,
  user: HexString,
  $c: AptosDataCache,
): void {
  let temp$1, temp$2, temp$3;
  Init.init_econia$(econia, $c);
  Registry.register_test_market$(econia, $c);
  temp$3 = user;
  temp$2 = Registry.scale_factor$($c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "E0", [])] as TypeTag[]);
  temp$1 = Caps.orders_f_c$($c);
  Orders.init_orders$(temp$3, temp$2, temp$1, $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E0", [])] as TypeTag[]);
  init_containers$(user, $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E0", [])] as TypeTag[]);
  return;
}


export function buildPayload_init_containers_failure_has_o_o (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xc0deb00c::User::init_containers_failure_has_o_o",
    typeParamStrings,
    []
  );

}
// #[test]
export function init_containers_failure_no_market$ (
  user: HexString,
  $c: AptosDataCache,
): void {
  init_containers$(user, $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E0", [])] as TypeTag[]);
  return;
}


export function buildPayload_init_containers_failure_no_market (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xc0deb00c::User::init_containers_failure_no_market",
    typeParamStrings,
    []
  );

}
// #[test]
export function init_containers_success$ (
  econia: HexString,
  user: HexString,
  $c: AptosDataCache,
): void {
  let temp$1, temp$2, o_c, user_addr;
  Init.init_econia$(econia, $c);
  Registry.register_test_market$(econia, $c);
  init_containers$(user, $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E0", [])] as TypeTag[]);
  user_addr = Std.Signer.address_of$(user, $c);
  o_c = $c.borrow_global<OC>(new StructTag(new HexString("0xc0deb00c"), "User", "OC", [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E0", [])]), $.copy(user_addr));
  if (AptosFramework.Coin.value$(o_c.b_c, $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", [])] as TypeTag[]).eq(u64("0"))) {
    temp$1 = AptosFramework.Coin.value$(o_c.q_c, $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", [])] as TypeTag[]).eq(u64("0"));
  }
  else{
    temp$1 = false;
  }
  if (!temp$1) {
    throw $.abortCode(u64("0"));
  }
  if ($.copy(o_c.b_a).eq(u64("0"))) {
    temp$2 = $.copy(o_c.q_a).eq(u64("0"));
  }
  else{
    temp$2 = false;
  }
  if (!temp$2) {
    throw $.abortCode(u64("1"));
  }
  if (!Orders.scale_factor$($.copy(user_addr), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E0", [])] as TypeTag[]).eq(Registry.scale_factor$($c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "E0", [])] as TypeTag[]))) {
    throw $.abortCode(u64("0"));
  }
  return;
}


export function buildPayload_init_containers_success (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xc0deb00c::User::init_containers_success",
    typeParamStrings,
    []
  );

}
// #[test]
export function init_funded_user$ (
  user: HexString,
  base_coins: U64,
  quote_coins: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <E>*/
): void {
  let user_addr;
  user_addr = Std.Signer.address_of$(user, $c);
  AptosFramework.Account.create_account$($.copy(user_addr), $c);
  init_user$(user, $c);
  AptosFramework.Account.increment_sequence_number$($.copy(user_addr), $c);
  init_containers$(user, $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), $p[0]] as TypeTag[]);
  AptosFramework.Account.increment_sequence_number$($.copy(user_addr), $c);
  AptosFramework.Coin.register$(user, $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", [])] as TypeTag[]);
  AptosFramework.Coin.register$(user, $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", [])] as TypeTag[]);
  Registry.mint_bct_to$($.copy(user_addr), $.copy(base_coins), $c);
  Registry.mint_qct_to$($.copy(user_addr), $.copy(quote_coins), $c);
  deposit$(user, $.copy(base_coins), $.copy(quote_coins), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), $p[0]] as TypeTag[]);
  AptosFramework.Account.increment_sequence_number$($.copy(user_addr), $c);
  return;
}


export function buildPayload_init_funded_user (
  base_coins: U64,
  quote_coins: U64,
  $p: TypeTag[], /* <E>*/
) {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    "0xc0deb00c::User::init_funded_user",
    typeParamStrings,
    [
      $.payloadArg(base_coins),
      $.payloadArg(quote_coins),
    ]
  );

}
export function init_o_c$ (
  user: HexString,
  $c: AptosDataCache,
  $p: TypeTag[], /* <B, Q, E>*/
): void {
  let temp$1, temp$2, temp$3, temp$4, o_c;
  if (!!$c.exists(new StructTag(new HexString("0xc0deb00c"), "User", "OC", [$p[0], $p[1], $p[2]]), Std.Signer.address_of$(user, $c))) {
    throw $.abortCode(E_O_C_EXISTS);
  }
  if (!Registry.is_registered$($c, [$p[0], $p[1], $p[2]] as TypeTag[])) {
    throw $.abortCode(E_NO_MARKET);
  }
  temp$1 = AptosFramework.Coin.zero$($c, [$p[0]] as TypeTag[]);
  temp$2 = u64("0");
  temp$3 = AptosFramework.Coin.zero$($c, [$p[1]] as TypeTag[]);
  temp$4 = u64("0");
  o_c = new OC({ b_a: temp$2, b_c: temp$1, q_a: temp$4, q_c: temp$3 }, new StructTag(new HexString("0xc0deb00c"), "User", "OC", [$p[0], $p[1], $p[2]]));
  $c.move_to(new StructTag(new HexString("0xc0deb00c"), "User", "OC", [$p[0], $p[1], $p[2]]), user, o_c);
  return;
}

// #[test]
export function init_o_c_failure_exists$ (
  econia: HexString,
  user: HexString,
  $c: AptosDataCache,
): void {
  Init.init_econia$(econia, $c);
  Registry.register_test_market$(econia, $c);
  init_o_c$(user, $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E0", [])] as TypeTag[]);
  init_o_c$(user, $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E0", [])] as TypeTag[]);
  return;
}


export function buildPayload_init_o_c_failure_exists (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xc0deb00c::User::init_o_c_failure_exists",
    typeParamStrings,
    []
  );

}
// #[test]
export function init_o_c_failure_no_market$ (
  user: HexString,
  $c: AptosDataCache,
): void {
  init_o_c$(user, $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E0", [])] as TypeTag[]);
  return;
}

// #[test]
export function init_o_c_success$ (
  econia: HexString,
  user: HexString,
  $c: AptosDataCache,
): void {
  let temp$1, temp$2, o_c;
  Init.init_econia$(econia, $c);
  Registry.register_test_market$(econia, $c);
  init_o_c$(user, $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E0", [])] as TypeTag[]);
  o_c = $c.borrow_global<OC>(new StructTag(new HexString("0xc0deb00c"), "User", "OC", [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E0", [])]), Std.Signer.address_of$(user, $c));
  if (AptosFramework.Coin.value$(o_c.b_c, $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", [])] as TypeTag[]).eq(u64("0"))) {
    temp$1 = AptosFramework.Coin.value$(o_c.q_c, $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", [])] as TypeTag[]).eq(u64("0"));
  }
  else{
    temp$1 = false;
  }
  if (!temp$1) {
    throw $.abortCode(u64("0"));
  }
  if ($.copy(o_c.b_a).eq(u64("0"))) {
    temp$2 = $.copy(o_c.q_a).eq(u64("0"));
  }
  else{
    temp$2 = false;
  }
  if (!temp$2) {
    throw $.abortCode(u64("1"));
  }
  return;
}


export function buildPayload_init_o_c_success (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xc0deb00c::User::init_o_c_success",
    typeParamStrings,
    []
  );

}
// #[test]
export function init_test_market_user$ (
  econia: HexString,
  user: HexString,
  $c: AptosDataCache,
): void {
  Init.init_econia$(econia, $c);
  Registry.register_test_market$(econia, $c);
  AptosFramework.Account.create_account$(Std.Signer.address_of$(user, $c), $c);
  init_user$(user, $c);
  init_containers$(user, $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E0", [])] as TypeTag[]);
  AptosFramework.Coin.register$(user, $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", [])] as TypeTag[]);
  AptosFramework.Coin.register$(user, $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", [])] as TypeTag[]);
  return;
}


export function buildPayload_init_test_market_user (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xc0deb00c::User::init_test_market_user",
    typeParamStrings,
    []
  );

}
// #[test]
export function init_test_scaled_market_funded_user$ (
  econia: HexString,
  user: HexString,
  b_c: U64,
  q_c: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <E>*/
): void {
  Init.init_econia$(econia, $c);
  Registry.register_scaled_test_market$(econia, $c, [$p[0]] as TypeTag[]);
  init_funded_user$(user, $.copy(b_c), $.copy(q_c), $c, [$p[0]] as TypeTag[]);
  return;
}


export function buildPayload_init_test_scaled_market_funded_user (
  b_c: U64,
  q_c: U64,
  $p: TypeTag[], /* <E>*/
) {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    "0xc0deb00c::User::init_test_scaled_market_funded_user",
    typeParamStrings,
    [
      $.payloadArg(b_c),
      $.payloadArg(q_c),
    ]
  );

}
export function init_user$ (
  user: HexString,
  $c: AptosDataCache,
): void {
  let user_addr;
  user_addr = Std.Signer.address_of$(user, $c);
  if (!!$c.exists(new StructTag(new HexString("0xc0deb00c"), "User", "SC", []), $.copy(user_addr))) {
    throw $.abortCode(E_S_C_EXISTS);
  }
  $c.move_to(new StructTag(new HexString("0xc0deb00c"), "User", "SC", []), user, new SC({ i: AptosFramework.Account.get_sequence_number$($.copy(user_addr), $c) }, new StructTag(new HexString("0xc0deb00c"), "User", "SC", [])));
  return;
}


export function buildPayload_init_user (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xc0deb00c::User::init_user",
    typeParamStrings,
    []
  );

}
// #[test]
export function init_user_failure$ (
  user: HexString,
  $c: AptosDataCache,
): void {
  AptosFramework.Account.create_account$(Std.Signer.address_of$(user, $c), $c);
  init_user$(user, $c);
  init_user$(user, $c);
  return;
}


export function buildPayload_init_user_failure (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xc0deb00c::User::init_user_failure",
    typeParamStrings,
    []
  );

}
// #[test]
export function init_user_success$ (
  user: HexString,
  $c: AptosDataCache,
): void {
  let user_addr;
  user_addr = Std.Signer.address_of$(user, $c);
  AptosFramework.Account.create_account$($.copy(user_addr), $c);
  init_user$(user, $c);
  if (!AptosFramework.Account.get_sequence_number$($.copy(user_addr), $c).eq(u64("0"))) {
    throw $.abortCode(u64("0"));
  }
  return;
}


export function buildPayload_init_user_success (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xc0deb00c::User::init_user_success",
    typeParamStrings,
    []
  );

}
export function process_fill$ (
  target: HexString,
  incoming: HexString,
  side: boolean,
  id: U128,
  size: U64,
  scale_factor: U64,
  complete: boolean,
  $c: AptosDataCache,
  $p: TypeTag[], /* <B, Q, E>*/
): void {
  let temp$1, temp$2, base_coins, base_from, base_to, base_to_route, gets_base, gets_quote, orders_cap, quote_coins, quote_to_route, yields_base;
  orders_cap = Caps.orders_f_c$($c);
  if (complete) {
    Orders.remove_order$($.copy(target), side, $.copy(id), orders_cap, $c, [$p[0], $p[1], $p[2]] as TypeTag[]);
  }
  else{
    Orders.decrement_order_size$($.copy(target), side, $.copy(id), $.copy(size), orders_cap, $c, [$p[0], $p[1], $p[2]] as TypeTag[]);
  }
  base_to_route = $.copy(size).mul($.copy(scale_factor));
  quote_to_route = $.copy(size).mul(ID.price$($.copy(id), $c));
  if ((side == ASK)) {
    [temp$1, temp$2] = [$.copy(incoming), $.copy(target)];
  }
  else{
    [temp$1, temp$2] = [$.copy(target), $.copy(incoming)];
  }
  [base_to, base_from] = [temp$1, temp$2];
  yields_base = $c.borrow_global_mut<OC>(new StructTag(new HexString("0xc0deb00c"), "User", "OC", [$p[0], $p[1], $p[2]]), $.copy(base_from));
  base_coins = AptosFramework.Coin.extract$(yields_base.b_c, $.copy(base_to_route), $c, [$p[0]] as TypeTag[]);
  gets_base = $c.borrow_global_mut<OC>(new StructTag(new HexString("0xc0deb00c"), "User", "OC", [$p[0], $p[1], $p[2]]), $.copy(base_to));
  AptosFramework.Coin.merge$(gets_base.b_c, base_coins, $c, [$p[0]] as TypeTag[]);
  gets_base.b_a = $.copy(gets_base.b_a).add($.copy(base_to_route));
  quote_coins = AptosFramework.Coin.extract$(gets_base.q_c, $.copy(quote_to_route), $c, [$p[1]] as TypeTag[]);
  gets_quote = $c.borrow_global_mut<OC>(new StructTag(new HexString("0xc0deb00c"), "User", "OC", [$p[0], $p[1], $p[2]]), $.copy(base_from));
  AptosFramework.Coin.merge$(gets_quote.q_c, quote_coins, $c, [$p[1]] as TypeTag[]);
  gets_quote.q_a = $.copy(gets_quote.q_a).add($.copy(quote_to_route));
  return;
}

// #[test]
export function process_fill_ask_complete$ (
  econia: HexString,
  user: HexString,
  $c: AptosDataCache,
): void {
  let econia_base_start, econia_collateral, econia_quote_start, fill_size, id, order_price, order_size, order_v_n, scale_factor, user_base_start, user_collateral, user_collateral__1, user_quote_start;
  user_base_start = u64("100");
  user_quote_start = u64("200");
  init_test_scaled_market_funded_user$(econia, user, $.copy(user_base_start), $.copy(user_quote_start), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])] as TypeTag[]);
  scale_factor = u64("10");
  econia_base_start = u64("150");
  econia_quote_start = u64("250");
  init_funded_user$(econia, $.copy(econia_base_start), $.copy(econia_quote_start), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])] as TypeTag[]);
  order_v_n = Version.get_v_n$($c).add(u64("1"));
  order_price = u64("5");
  order_size = u64("3");
  id = ID.id_a$($.copy(order_price), $.copy(order_v_n), $c);
  submit_ask$(econia, new HexString("0xc0deb00c"), $.copy(order_price), $.copy(order_size), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])] as TypeTag[]);
  fill_size = $.copy(order_size);
  user_collateral = $c.borrow_global_mut<OC>(new StructTag(new HexString("0xc0deb00c"), "User", "OC", [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])]), new HexString("0x5678"));
  user_collateral.q_a = $.copy(user_collateral.q_a).sub($.copy(fill_size).mul($.copy(order_price)));
  process_fill$(new HexString("0xc0deb00c"), new HexString("0x5678"), ASK, $.copy(id), $.copy(fill_size), $.copy(scale_factor), true, $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])] as TypeTag[]);
  if (!!Orders.has_ask$(new HexString("0xc0deb00c"), $.copy(id), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])] as TypeTag[])) {
    throw $.abortCode(u64("0"));
  }
  econia_collateral = $c.borrow_global<OC>(new StructTag(new HexString("0xc0deb00c"), "User", "OC", [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])]), new HexString("0xc0deb00c"));
  if (!$.copy(econia_collateral.b_a).eq($.copy(econia_base_start).sub($.copy(order_size).mul($.copy(scale_factor))))) {
    throw $.abortCode(u64("1"));
  }
  if (!$.copy(econia_collateral.q_a).eq($.copy(econia_quote_start).add($.copy(order_price).mul($.copy(fill_size))))) {
    throw $.abortCode(u64("2"));
  }
  if (!AptosFramework.Coin.value$(econia_collateral.b_c, $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", [])] as TypeTag[]).eq($.copy(econia_base_start).sub($.copy(fill_size).mul($.copy(scale_factor))))) {
    throw $.abortCode(u64("3"));
  }
  if (!AptosFramework.Coin.value$(econia_collateral.q_c, $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", [])] as TypeTag[]).eq($.copy(econia_quote_start).add($.copy(order_price).mul($.copy(fill_size))))) {
    throw $.abortCode(u64("4"));
  }
  user_collateral__1 = $c.borrow_global_mut<OC>(new StructTag(new HexString("0xc0deb00c"), "User", "OC", [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])]), new HexString("0x5678"));
  if (!$.copy(user_collateral__1.b_a).eq($.copy(user_base_start).add($.copy(fill_size).mul($.copy(scale_factor))))) {
    throw $.abortCode(u64("5"));
  }
  if (!$.copy(user_collateral__1.q_a).eq($.copy(user_quote_start).sub($.copy(fill_size).mul($.copy(order_price))))) {
    throw $.abortCode(u64("6"));
  }
  if (!AptosFramework.Coin.value$(user_collateral__1.b_c, $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", [])] as TypeTag[]).eq($.copy(user_base_start).add($.copy(fill_size).mul($.copy(scale_factor))))) {
    throw $.abortCode(u64("7"));
  }
  if (!AptosFramework.Coin.value$(user_collateral__1.q_c, $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", [])] as TypeTag[]).eq($.copy(user_quote_start).sub($.copy(fill_size).mul($.copy(order_price))))) {
    throw $.abortCode(u64("8"));
  }
  return;
}


export function buildPayload_process_fill_ask_complete (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xc0deb00c::User::process_fill_ask_complete",
    typeParamStrings,
    []
  );

}
// #[test]
export function process_fill_ask_partial$ (
  econia: HexString,
  user: HexString,
  $c: AptosDataCache,
): void {
  let econia_base_start, econia_collateral, econia_quote_start, fill_size, id, order_price, order_size, order_v_n, scale_factor, user_base_start, user_collateral, user_collateral__1, user_quote_start;
  user_base_start = u64("100");
  user_quote_start = u64("200");
  init_test_scaled_market_funded_user$(econia, user, $.copy(user_base_start), $.copy(user_quote_start), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])] as TypeTag[]);
  scale_factor = u64("10");
  econia_base_start = u64("150");
  econia_quote_start = u64("250");
  init_funded_user$(econia, $.copy(econia_base_start), $.copy(econia_quote_start), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])] as TypeTag[]);
  order_v_n = Version.get_v_n$($c).add(u64("1"));
  order_price = u64("5");
  order_size = u64("3");
  id = ID.id_a$($.copy(order_price), $.copy(order_v_n), $c);
  submit_ask$(econia, new HexString("0xc0deb00c"), $.copy(order_price), $.copy(order_size), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])] as TypeTag[]);
  fill_size = u64("2");
  user_collateral = $c.borrow_global_mut<OC>(new StructTag(new HexString("0xc0deb00c"), "User", "OC", [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])]), new HexString("0x5678"));
  user_collateral.q_a = $.copy(user_collateral.q_a).sub($.copy(fill_size).mul($.copy(order_price)));
  process_fill$(new HexString("0xc0deb00c"), new HexString("0x5678"), ASK, $.copy(id), $.copy(fill_size), $.copy(scale_factor), false, $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])] as TypeTag[]);
  if (!Orders.check_ask$(new HexString("0xc0deb00c"), $.copy(id), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])] as TypeTag[]).eq($.copy(order_size).sub($.copy(fill_size)))) {
    throw $.abortCode(u64("0"));
  }
  econia_collateral = $c.borrow_global<OC>(new StructTag(new HexString("0xc0deb00c"), "User", "OC", [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])]), new HexString("0xc0deb00c"));
  if (!$.copy(econia_collateral.b_a).eq($.copy(econia_base_start).sub($.copy(order_size).mul($.copy(scale_factor))))) {
    throw $.abortCode(u64("1"));
  }
  if (!$.copy(econia_collateral.q_a).eq($.copy(econia_quote_start).add($.copy(order_price).mul($.copy(fill_size))))) {
    throw $.abortCode(u64("2"));
  }
  if (!AptosFramework.Coin.value$(econia_collateral.b_c, $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", [])] as TypeTag[]).eq($.copy(econia_base_start).sub($.copy(fill_size).mul($.copy(scale_factor))))) {
    throw $.abortCode(u64("3"));
  }
  if (!AptosFramework.Coin.value$(econia_collateral.q_c, $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", [])] as TypeTag[]).eq($.copy(econia_quote_start).add($.copy(order_price).mul($.copy(fill_size))))) {
    throw $.abortCode(u64("4"));
  }
  user_collateral__1 = $c.borrow_global_mut<OC>(new StructTag(new HexString("0xc0deb00c"), "User", "OC", [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])]), new HexString("0x5678"));
  if (!$.copy(user_collateral__1.b_a).eq($.copy(user_base_start).add($.copy(fill_size).mul($.copy(scale_factor))))) {
    throw $.abortCode(u64("5"));
  }
  if (!$.copy(user_collateral__1.q_a).eq($.copy(user_quote_start).sub($.copy(fill_size).mul($.copy(order_price))))) {
    throw $.abortCode(u64("6"));
  }
  if (!AptosFramework.Coin.value$(user_collateral__1.b_c, $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", [])] as TypeTag[]).eq($.copy(user_base_start).add($.copy(fill_size).mul($.copy(scale_factor))))) {
    throw $.abortCode(u64("7"));
  }
  if (!AptosFramework.Coin.value$(user_collateral__1.q_c, $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", [])] as TypeTag[]).eq($.copy(user_quote_start).sub($.copy(fill_size).mul($.copy(order_price))))) {
    throw $.abortCode(u64("8"));
  }
  return;
}


export function buildPayload_process_fill_ask_partial (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xc0deb00c::User::process_fill_ask_partial",
    typeParamStrings,
    []
  );

}
// #[test]
export function process_fill_bid_complete$ (
  econia: HexString,
  user: HexString,
  $c: AptosDataCache,
): void {
  let econia_base_start, econia_collateral, econia_quote_start, fill_size, id, order_price, order_size, order_v_n, scale_factor, user_base_start, user_collateral, user_collateral__1, user_quote_start;
  user_base_start = u64("100");
  user_quote_start = u64("200");
  init_test_scaled_market_funded_user$(econia, user, $.copy(user_base_start), $.copy(user_quote_start), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])] as TypeTag[]);
  scale_factor = u64("10");
  econia_base_start = u64("150");
  econia_quote_start = u64("250");
  init_funded_user$(econia, $.copy(econia_base_start), $.copy(econia_quote_start), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])] as TypeTag[]);
  order_v_n = Version.get_v_n$($c).add(u64("1"));
  order_price = u64("5");
  order_size = u64("3");
  id = ID.id_b$($.copy(order_price), $.copy(order_v_n), $c);
  submit_bid$(econia, new HexString("0xc0deb00c"), $.copy(order_price), $.copy(order_size), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])] as TypeTag[]);
  fill_size = $.copy(order_size);
  user_collateral = $c.borrow_global_mut<OC>(new StructTag(new HexString("0xc0deb00c"), "User", "OC", [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])]), new HexString("0x5678"));
  user_collateral.b_a = $.copy(user_collateral.b_a).sub($.copy(fill_size).mul($.copy(scale_factor)));
  process_fill$(new HexString("0xc0deb00c"), new HexString("0x5678"), BID, $.copy(id), $.copy(fill_size), $.copy(scale_factor), true, $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])] as TypeTag[]);
  if (!!Orders.has_bid$(new HexString("0xc0deb00c"), $.copy(id), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])] as TypeTag[])) {
    throw $.abortCode(u64("0"));
  }
  econia_collateral = $c.borrow_global<OC>(new StructTag(new HexString("0xc0deb00c"), "User", "OC", [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])]), new HexString("0xc0deb00c"));
  if (!$.copy(econia_collateral.b_a).eq($.copy(econia_base_start).add($.copy(fill_size).mul($.copy(scale_factor))))) {
    throw $.abortCode(u64("1"));
  }
  if (!$.copy(econia_collateral.q_a).eq($.copy(econia_quote_start).sub($.copy(order_price).mul($.copy(order_size))))) {
    throw $.abortCode(u64("2"));
  }
  if (!AptosFramework.Coin.value$(econia_collateral.b_c, $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", [])] as TypeTag[]).eq($.copy(econia_base_start).add($.copy(fill_size).mul($.copy(scale_factor))))) {
    throw $.abortCode(u64("3"));
  }
  if (!AptosFramework.Coin.value$(econia_collateral.q_c, $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", [])] as TypeTag[]).eq($.copy(econia_quote_start).sub($.copy(order_price).mul($.copy(order_size))))) {
    throw $.abortCode(u64("4"));
  }
  user_collateral__1 = $c.borrow_global_mut<OC>(new StructTag(new HexString("0xc0deb00c"), "User", "OC", [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])]), new HexString("0x5678"));
  if (!$.copy(user_collateral__1.b_a).eq($.copy(user_base_start).sub($.copy(fill_size).mul($.copy(scale_factor))))) {
    throw $.abortCode(u64("5"));
  }
  if (!$.copy(user_collateral__1.q_a).eq($.copy(user_quote_start).add($.copy(fill_size).mul($.copy(order_price))))) {
    throw $.abortCode(u64("6"));
  }
  if (!AptosFramework.Coin.value$(user_collateral__1.b_c, $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", [])] as TypeTag[]).eq($.copy(user_base_start).sub($.copy(fill_size).mul($.copy(scale_factor))))) {
    throw $.abortCode(u64("7"));
  }
  if (!AptosFramework.Coin.value$(user_collateral__1.q_c, $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", [])] as TypeTag[]).eq($.copy(user_quote_start).add($.copy(fill_size).mul($.copy(order_price))))) {
    throw $.abortCode(u64("8"));
  }
  return;
}


export function buildPayload_process_fill_bid_complete (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xc0deb00c::User::process_fill_bid_complete",
    typeParamStrings,
    []
  );

}
// #[test]
export function process_fill_bid_partial$ (
  econia: HexString,
  user: HexString,
  $c: AptosDataCache,
): void {
  let econia_base_start, econia_collateral, econia_quote_start, fill_size, id, order_price, order_size, order_v_n, scale_factor, user_base_start, user_collateral, user_collateral__1, user_quote_start;
  user_base_start = u64("100");
  user_quote_start = u64("200");
  init_test_scaled_market_funded_user$(econia, user, $.copy(user_base_start), $.copy(user_quote_start), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])] as TypeTag[]);
  scale_factor = u64("10");
  econia_base_start = u64("150");
  econia_quote_start = u64("250");
  init_funded_user$(econia, $.copy(econia_base_start), $.copy(econia_quote_start), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])] as TypeTag[]);
  order_v_n = Version.get_v_n$($c).add(u64("1"));
  order_price = u64("5");
  order_size = u64("3");
  id = ID.id_b$($.copy(order_price), $.copy(order_v_n), $c);
  submit_bid$(econia, new HexString("0xc0deb00c"), $.copy(order_price), $.copy(order_size), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])] as TypeTag[]);
  fill_size = u64("2");
  user_collateral = $c.borrow_global_mut<OC>(new StructTag(new HexString("0xc0deb00c"), "User", "OC", [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])]), new HexString("0x5678"));
  user_collateral.b_a = $.copy(user_collateral.b_a).sub($.copy(fill_size).mul($.copy(scale_factor)));
  process_fill$(new HexString("0xc0deb00c"), new HexString("0x5678"), BID, $.copy(id), $.copy(fill_size), $.copy(scale_factor), false, $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])] as TypeTag[]);
  if (!Orders.check_bid$(new HexString("0xc0deb00c"), $.copy(id), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])] as TypeTag[]).eq($.copy(order_size).sub($.copy(fill_size)))) {
    throw $.abortCode(u64("0"));
  }
  econia_collateral = $c.borrow_global<OC>(new StructTag(new HexString("0xc0deb00c"), "User", "OC", [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])]), new HexString("0xc0deb00c"));
  if (!$.copy(econia_collateral.b_a).eq($.copy(econia_base_start).add($.copy(fill_size).mul($.copy(scale_factor))))) {
    throw $.abortCode(u64("1"));
  }
  if (!$.copy(econia_collateral.q_a).eq($.copy(econia_quote_start).sub($.copy(order_price).mul($.copy(order_size))))) {
    throw $.abortCode(u64("2"));
  }
  if (!AptosFramework.Coin.value$(econia_collateral.b_c, $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", [])] as TypeTag[]).eq($.copy(econia_base_start).add($.copy(fill_size).mul($.copy(scale_factor))))) {
    throw $.abortCode(u64("3"));
  }
  if (!AptosFramework.Coin.value$(econia_collateral.q_c, $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", [])] as TypeTag[]).eq($.copy(econia_quote_start).sub($.copy(order_price).mul($.copy(fill_size))))) {
    throw $.abortCode(u64("4"));
  }
  user_collateral__1 = $c.borrow_global_mut<OC>(new StructTag(new HexString("0xc0deb00c"), "User", "OC", [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])]), new HexString("0x5678"));
  if (!$.copy(user_collateral__1.b_a).eq($.copy(user_base_start).sub($.copy(fill_size).mul($.copy(scale_factor))))) {
    throw $.abortCode(u64("5"));
  }
  if (!$.copy(user_collateral__1.q_a).eq($.copy(user_quote_start).add($.copy(fill_size).mul($.copy(order_price))))) {
    throw $.abortCode(u64("6"));
  }
  if (!AptosFramework.Coin.value$(user_collateral__1.b_c, $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", [])] as TypeTag[]).eq($.copy(user_base_start).sub($.copy(fill_size).mul($.copy(scale_factor))))) {
    throw $.abortCode(u64("7"));
  }
  if (!AptosFramework.Coin.value$(user_collateral__1.q_c, $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", [])] as TypeTag[]).eq($.copy(user_quote_start).add($.copy(fill_size).mul($.copy(order_price))))) {
    throw $.abortCode(u64("8"));
  }
  return;
}


export function buildPayload_process_fill_bid_partial (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xc0deb00c::User::process_fill_bid_partial",
    typeParamStrings,
    []
  );

}
export function submit_ask$ (
  user: HexString,
  host: HexString,
  price: U64,
  size: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <B, Q, E>*/
): void {
  submit_limit_order$(user, $.copy(host), ASK, $.copy(price), $.copy(size), $c, [$p[0], $p[1], $p[2]] as TypeTag[]);
  return;
}


export function buildPayload_submit_ask (
  host: HexString,
  price: U64,
  size: U64,
  $p: TypeTag[], /* <B, Q, E>*/
) {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    "0xc0deb00c::User::submit_ask",
    typeParamStrings,
    [
      $.payloadArg(host),
      $.payloadArg(price),
      $.payloadArg(size),
    ]
  );

}
// #[test]
export function submit_ask_failure_collateral$ (
  econia: HexString,
  user: HexString,
  $c: AptosDataCache,
): void {
  init_test_scaled_market_funded_user$(econia, user, u64("100"), u64("200"), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])] as TypeTag[]);
  submit_ask$(user, Std.Signer.address_of$(econia, $c), u64("1"), u64("110"), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])] as TypeTag[]);
  return;
}


export function buildPayload_submit_ask_failure_collateral (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xc0deb00c::User::submit_ask_failure_collateral",
    typeParamStrings,
    []
  );

}
// #[test]
export function submit_ask_failure_crossed_spread$ (
  econia: HexString,
  user: HexString,
  $c: AptosDataCache,
): void {
  let host, user_addr;
  init_test_scaled_market_funded_user$(econia, user, u64("100"), u64("200"), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "E0", [])] as TypeTag[]);
  host = Std.Signer.address_of$(econia, $c);
  submit_bid$(user, $.copy(host), u64("5"), u64("2"), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E0", [])] as TypeTag[]);
  user_addr = Std.Signer.address_of$(user, $c);
  AptosFramework.Account.increment_sequence_number$($.copy(user_addr), $c);
  submit_ask$(user, $.copy(host), u64("7"), u64("3"), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E0", [])] as TypeTag[]);
  AptosFramework.Account.increment_sequence_number$($.copy(user_addr), $c);
  submit_ask$(user, $.copy(host), u64("4"), u64("4"), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E0", [])] as TypeTag[]);
  return;
}


export function buildPayload_submit_ask_failure_crossed_spread (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xc0deb00c::User::submit_ask_failure_crossed_spread",
    typeParamStrings,
    []
  );

}
// #[test]
export function submit_ask_success$ (
  econia: HexString,
  user: HexString,
  $c: AptosDataCache,
): void {
  let temp$1, temp$2, temp$3, host, id, o_c, order_v_n, p_a, p_s, price, size, user_addr;
  init_test_scaled_market_funded_user$(econia, user, u64("100"), u64("200"), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])] as TypeTag[]);
  host = Std.Signer.address_of$(econia, $c);
  user_addr = Std.Signer.address_of$(user, $c);
  order_v_n = Version.get_v_n$($c).add(u64("1"));
  [price, size] = [u64("5"), u64("3")];
  id = ID.id_a$($.copy(price), $.copy(order_v_n), $c);
  submit_ask$(user, $.copy(host), $.copy(price), $.copy(size), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])] as TypeTag[]);
  if (!Orders.check_ask$($.copy(user_addr), $.copy(id), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])] as TypeTag[]).eq($.copy(size))) {
    throw $.abortCode(u64("0"));
  }
  [p_s, p_a] = Book.check_ask$($.copy(host), $.copy(id), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])] as TypeTag[]);
  if ($.copy(p_s).eq($.copy(size))) {
    temp$1 = ($.copy(p_a).hex() === $.copy(user_addr).hex());
  }
  else{
    temp$1 = false;
  }
  if (!temp$1) {
    throw $.abortCode(u64("1"));
  }
  if (!Book.check_ask_min$($.copy(host), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])] as TypeTag[]).eq($.copy(id))) {
    throw $.abortCode(u64("2"));
  }
  o_c = $c.borrow_global<OC>(new StructTag(new HexString("0xc0deb00c"), "User", "OC", [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])]), $.copy(user_addr));
  if (AptosFramework.Coin.value$(o_c.b_c, $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", [])] as TypeTag[]).eq(u64("100"))) {
    temp$2 = AptosFramework.Coin.value$(o_c.q_c, $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", [])] as TypeTag[]).eq(u64("200"));
  }
  else{
    temp$2 = false;
  }
  if (!temp$2) {
    throw $.abortCode(u64("3"));
  }
  if ($.copy(o_c.b_a).eq(u64("70"))) {
    temp$3 = $.copy(o_c.q_a).eq(u64("200"));
  }
  else{
    temp$3 = false;
  }
  if (!temp$3) {
    throw $.abortCode(u64("4"));
  }
  return;
}


export function buildPayload_submit_ask_success (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xc0deb00c::User::submit_ask_success",
    typeParamStrings,
    []
  );

}
export function submit_bid$ (
  user: HexString,
  host: HexString,
  price: U64,
  size: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <B, Q, E>*/
): void {
  submit_limit_order$(user, $.copy(host), BID, $.copy(price), $.copy(size), $c, [$p[0], $p[1], $p[2]] as TypeTag[]);
  return;
}


export function buildPayload_submit_bid (
  host: HexString,
  price: U64,
  size: U64,
  $p: TypeTag[], /* <B, Q, E>*/
) {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    "0xc0deb00c::User::submit_bid",
    typeParamStrings,
    [
      $.payloadArg(host),
      $.payloadArg(price),
      $.payloadArg(size),
    ]
  );

}
// #[test]
export function submit_bid_failure_collateral$ (
  econia: HexString,
  user: HexString,
  $c: AptosDataCache,
): void {
  init_test_scaled_market_funded_user$(econia, user, u64("100"), u64("200"), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])] as TypeTag[]);
  submit_bid$(user, Std.Signer.address_of$(econia, $c), u64("201"), u64("10"), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])] as TypeTag[]);
  return;
}


export function buildPayload_submit_bid_failure_collateral (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xc0deb00c::User::submit_bid_failure_collateral",
    typeParamStrings,
    []
  );

}
// #[test]
export function submit_bid_failure_crossed_spread$ (
  econia: HexString,
  user: HexString,
  $c: AptosDataCache,
): void {
  let host, user_addr;
  init_test_scaled_market_funded_user$(econia, user, u64("100"), u64("200"), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "E0", [])] as TypeTag[]);
  host = Std.Signer.address_of$(econia, $c);
  submit_bid$(user, $.copy(host), u64("5"), u64("2"), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E0", [])] as TypeTag[]);
  user_addr = Std.Signer.address_of$(user, $c);
  AptosFramework.Account.increment_sequence_number$($.copy(user_addr), $c);
  submit_ask$(user, $.copy(host), u64("7"), u64("3"), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E0", [])] as TypeTag[]);
  AptosFramework.Account.increment_sequence_number$($.copy(user_addr), $c);
  submit_bid$(user, $.copy(host), u64("8"), u64("4"), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E0", [])] as TypeTag[]);
  return;
}


export function buildPayload_submit_bid_failure_crossed_spread (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xc0deb00c::User::submit_bid_failure_crossed_spread",
    typeParamStrings,
    []
  );

}
// #[test]
export function submit_bid_success$ (
  econia: HexString,
  user: HexString,
  $c: AptosDataCache,
): void {
  let temp$1, temp$2, temp$3, host, id, o_c, order_v_n, p_a, p_s, price, size, user_addr;
  init_test_scaled_market_funded_user$(econia, user, u64("100"), u64("200"), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])] as TypeTag[]);
  host = Std.Signer.address_of$(econia, $c);
  user_addr = Std.Signer.address_of$(user, $c);
  order_v_n = Version.get_v_n$($c).add(u64("1"));
  [price, size] = [u64("5"), u64("3")];
  id = ID.id_b$($.copy(price), $.copy(order_v_n), $c);
  submit_bid$(user, $.copy(host), $.copy(price), $.copy(size), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])] as TypeTag[]);
  if (!Orders.check_bid$($.copy(user_addr), $.copy(id), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])] as TypeTag[]).eq($.copy(size))) {
    throw $.abortCode(u64("0"));
  }
  [p_s, p_a] = Book.check_bid$($.copy(host), $.copy(id), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])] as TypeTag[]);
  if ($.copy(p_s).eq($.copy(size))) {
    temp$1 = ($.copy(p_a).hex() === $.copy(user_addr).hex());
  }
  else{
    temp$1 = false;
  }
  if (!temp$1) {
    throw $.abortCode(u64("1"));
  }
  if (!Book.check_bid_max$($.copy(host), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])] as TypeTag[]).eq($.copy(id))) {
    throw $.abortCode(u64("2"));
  }
  o_c = $c.borrow_global<OC>(new StructTag(new HexString("0xc0deb00c"), "User", "OC", [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E1", [])]), $.copy(user_addr));
  if (AptosFramework.Coin.value$(o_c.b_c, $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", [])] as TypeTag[]).eq(u64("100"))) {
    temp$2 = AptosFramework.Coin.value$(o_c.q_c, $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", [])] as TypeTag[]).eq(u64("200"));
  }
  else{
    temp$2 = false;
  }
  if (!temp$2) {
    throw $.abortCode(u64("3"));
  }
  if ($.copy(o_c.b_a).eq(u64("100"))) {
    temp$3 = $.copy(o_c.q_a).eq(u64("185"));
  }
  else{
    temp$3 = false;
  }
  if (!temp$3) {
    throw $.abortCode(u64("4"));
  }
  return;
}


export function buildPayload_submit_bid_success (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xc0deb00c::User::submit_bid_success",
    typeParamStrings,
    []
  );

}
export function submit_limit_order$ (
  user: HexString,
  host: HexString,
  side: boolean,
  price: U64,
  size: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <B, Q, E>*/
): void {
  let temp$1, temp$10, temp$11, temp$13, temp$14, temp$15, temp$16, temp$17, temp$18, temp$19, temp$2, temp$20, temp$21, temp$22, temp$23, temp$3, temp$4, temp$5, temp$6, temp$7, temp$8, temp$9, addr, b_c_subs, c_s, id, id__12, o_c, q_c_subs, v_n;
  update_s_c$(user, $c);
  if (!Book.exists_book$($.copy(host), $c, [$p[0], $p[1], $p[2]] as TypeTag[])) {
    throw $.abortCode(E_NO_MARKET);
  }
  addr = Std.Signer.address_of$(user, $c);
  if (!$c.exists(new StructTag(new HexString("0xc0deb00c"), "User", "OC", [$p[0], $p[1], $p[2]]), $.copy(addr))) {
    throw $.abortCode(E_NO_O_C);
  }
  o_c = $c.borrow_global_mut<OC>(new StructTag(new HexString("0xc0deb00c"), "User", "OC", [$p[0], $p[1], $p[2]]), $.copy(addr));
  v_n = Version.get_v_n$($c);
  if ((side == ASK)) {
    id = ID.id_a$($.copy(price), $.copy(v_n), $c);
    temp$5 = $.copy(addr);
    temp$4 = $.copy(id);
    temp$3 = $.copy(price);
    temp$2 = $.copy(size);
    temp$1 = Caps.orders_f_c$($c);
    [b_c_subs, ] = Orders.add_ask$(temp$5, temp$4, temp$3, temp$2, temp$1, $c, [$p[0], $p[1], $p[2]] as TypeTag[]);
    if (!!$.copy(b_c_subs).gt($.copy(o_c.b_a))) {
      throw $.abortCode(E_NOT_ENOUGH_COLLATERAL);
    }
    o_c.b_a = $.copy(o_c.b_a).sub($.copy(b_c_subs));
    temp$11 = $.copy(host);
    temp$10 = $.copy(addr);
    temp$9 = $.copy(id);
    temp$8 = $.copy(price);
    temp$7 = $.copy(size);
    temp$6 = Caps.book_f_c$($c);
    c_s = Book.add_ask$(temp$11, temp$10, temp$9, temp$8, temp$7, temp$6, $c, [$p[0], $p[1], $p[2]] as TypeTag[]);
  }
  else{
    id__12 = ID.id_b$($.copy(price), $.copy(v_n), $c);
    temp$17 = $.copy(addr);
    temp$16 = $.copy(id__12);
    temp$15 = $.copy(price);
    temp$14 = $.copy(size);
    temp$13 = Caps.orders_f_c$($c);
    [, q_c_subs] = Orders.add_bid$(temp$17, temp$16, temp$15, temp$14, temp$13, $c, [$p[0], $p[1], $p[2]] as TypeTag[]);
    if (!!$.copy(q_c_subs).gt($.copy(o_c.q_a))) {
      throw $.abortCode(E_NOT_ENOUGH_COLLATERAL);
    }
    o_c.q_a = $.copy(o_c.q_a).sub($.copy(q_c_subs));
    temp$23 = $.copy(host);
    temp$22 = $.copy(addr);
    temp$21 = $.copy(id__12);
    temp$20 = $.copy(price);
    temp$19 = $.copy(size);
    temp$18 = Caps.book_f_c$($c);
    c_s = Book.add_bid$(temp$23, temp$22, temp$21, temp$20, temp$19, temp$18, $c, [$p[0], $p[1], $p[2]] as TypeTag[]);
  }
  if (!!c_s) {
    throw $.abortCode(E_CROSSES_SPREAD);
  }
  return;
}

// #[test]
export function submit_limit_order_failure_no_market$ (
  user: HexString,
  $c: AptosDataCache,
): void {
  let user_addr;
  user_addr = Std.Signer.address_of$(user, $c);
  AptosFramework.Account.create_account$($.copy(user_addr), $c);
  init_user$(user, $c);
  AptosFramework.Account.increment_sequence_number$($.copy(user_addr), $c);
  submit_ask$(user, Std.Signer.address_of$(user, $c), u64("1"), u64("1"), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E0", [])] as TypeTag[]);
  return;
}


export function buildPayload_submit_limit_order_failure_no_market (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xc0deb00c::User::submit_limit_order_failure_no_market",
    typeParamStrings,
    []
  );

}
// #[test]
export function submit_limit_order_failure_no_o_c$ (
  econia: HexString,
  user: HexString,
  $c: AptosDataCache,
): void {
  let user_addr;
  Init.init_econia$(econia, $c);
  Registry.register_test_market$(econia, $c);
  user_addr = Std.Signer.address_of$(user, $c);
  AptosFramework.Account.create_account$($.copy(user_addr), $c);
  init_user$(user, $c);
  AptosFramework.Account.increment_sequence_number$($.copy(user_addr), $c);
  submit_bid$(user, Std.Signer.address_of$(econia, $c), u64("1"), u64("1"), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E0", [])] as TypeTag[]);
  return;
}


export function buildPayload_submit_limit_order_failure_no_o_c (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xc0deb00c::User::submit_limit_order_failure_no_o_c",
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

export function update_s_c$ (
  u: HexString,
  $c: AptosDataCache,
): void {
  let s_c, s_n, user_addr;
  user_addr = Std.Signer.address_of$(u, $c);
  if (!$c.exists(new StructTag(new HexString("0xc0deb00c"), "User", "SC", []), $.copy(user_addr))) {
    throw $.abortCode(E_NO_S_C);
  }
  s_c = $c.borrow_global_mut<SC>(new StructTag(new HexString("0xc0deb00c"), "User", "SC", []), $.copy(user_addr));
  s_n = AptosFramework.Account.get_sequence_number$($.copy(user_addr), $c);
  if (!$.copy(s_n).gt($.copy(s_c.i))) {
    throw $.abortCode(E_INVALID_S_N);
  }
  s_c.i = $.copy(s_n);
  return;
}

// #[test]
export function update_s_c_failure_no_s_c$ (
  user: HexString,
  $c: AptosDataCache,
): void {
  update_s_c$(user, $c);
  return;
}

// #[test]
export function update_s_c_failure_same_s_n$ (
  user: HexString,
  $c: AptosDataCache,
): void {
  let user_addr;
  user_addr = Std.Signer.address_of$(user, $c);
  AptosFramework.Account.create_account$($.copy(user_addr), $c);
  init_user$(user, $c);
  update_s_c$(user, $c);
  return;
}


export function buildPayload_update_s_c_failure_same_s_n (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xc0deb00c::User::update_s_c_failure_same_s_n",
    typeParamStrings,
    []
  );

}
// #[test]
export function update_s_c_success$ (
  user: HexString,
  $c: AptosDataCache,
): void {
  let user_addr;
  user_addr = Std.Signer.address_of$(user, $c);
  AptosFramework.Account.create_account$($.copy(user_addr), $c);
  init_user$(user, $c);
  AptosFramework.Account.set_sequence_number$($.copy(user_addr), u64("10"), $c);
  update_s_c$(user, $c);
  if (!$.copy($c.borrow_global<SC>(new StructTag(new HexString("0xc0deb00c"), "User", "SC", []), $.copy(user_addr)).i).eq(u64("10"))) {
    throw $.abortCode(u64("0"));
  }
  return;
}


export function buildPayload_update_s_c_success (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xc0deb00c::User::update_s_c_success",
    typeParamStrings,
    []
  );

}
export function withdraw$ (
  user: HexString,
  b_val: U64,
  q_val: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <B, Q, E>*/
): void {
  let temp$1, addr, o_c;
  addr = Std.Signer.address_of$(user, $c);
  if (!$c.exists(new StructTag(new HexString("0xc0deb00c"), "User", "OC", [$p[0], $p[1], $p[2]]), $.copy(addr))) {
    throw $.abortCode(E_NO_O_C);
  }
  if ($.copy(b_val).gt(u64("0"))) {
    temp$1 = true;
  }
  else{
    temp$1 = $.copy(q_val).gt(u64("0"));
  }
  if (!temp$1) {
    throw $.abortCode(E_NO_TRANSFER);
  }
  o_c = $c.borrow_global_mut<OC>(new StructTag(new HexString("0xc0deb00c"), "User", "OC", [$p[0], $p[1], $p[2]]), $.copy(addr));
  if ($.copy(b_val).gt(u64("0"))) {
    if (!!$.copy(b_val).gt($.copy(o_c.b_a))) {
      throw $.abortCode(E_WITHDRAW_TOO_MUCH);
    }
    AptosFramework.Coin.deposit$($.copy(addr), AptosFramework.Coin.extract$(o_c.b_c, $.copy(b_val), $c, [$p[0]] as TypeTag[]), $c, [$p[0]] as TypeTag[]);
    o_c.b_a = $.copy(o_c.b_a).sub($.copy(b_val));
  }
  else{
  }
  if ($.copy(q_val).gt(u64("0"))) {
    if (!!$.copy(q_val).gt($.copy(o_c.q_a))) {
      throw $.abortCode(E_WITHDRAW_TOO_MUCH);
    }
    AptosFramework.Coin.deposit$($.copy(addr), AptosFramework.Coin.extract$(o_c.q_c, $.copy(q_val), $c, [$p[1]] as TypeTag[]), $c, [$p[1]] as TypeTag[]);
    o_c.q_a = $.copy(o_c.q_a).sub($.copy(q_val));
  }
  else{
  }
  update_s_c$(user, $c);
  return;
}


export function buildPayload_withdraw (
  b_val: U64,
  q_val: U64,
  $p: TypeTag[], /* <B, Q, E>*/
) {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    "0xc0deb00c::User::withdraw",
    typeParamStrings,
    [
      $.payloadArg(b_val),
      $.payloadArg(q_val),
    ]
  );

}
// #[test]
export function withdraw_failure_excess_bct$ (
  econia: HexString,
  user: HexString,
  $c: AptosDataCache,
): void {
  let addr;
  init_test_market_user$(econia, user, $c);
  addr = Std.Signer.address_of$(user, $c);
  Registry.mint_bct_to$($.copy(addr), u64("100"), $c);
  AptosFramework.Account.increment_sequence_number$($.copy(addr), $c);
  deposit$(user, u64("50"), u64("0"), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E0", [])] as TypeTag[]);
  AptosFramework.Account.increment_sequence_number$($.copy(addr), $c);
  withdraw$(user, u64("51"), u64("0"), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E0", [])] as TypeTag[]);
  return;
}


export function buildPayload_withdraw_failure_excess_bct (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xc0deb00c::User::withdraw_failure_excess_bct",
    typeParamStrings,
    []
  );

}
// #[test]
export function withdraw_failure_excess_qct$ (
  econia: HexString,
  user: HexString,
  $c: AptosDataCache,
): void {
  let addr;
  init_test_market_user$(econia, user, $c);
  addr = Std.Signer.address_of$(user, $c);
  Registry.mint_qct_to$($.copy(addr), u64("100"), $c);
  AptosFramework.Account.increment_sequence_number$($.copy(addr), $c);
  deposit$(user, u64("0"), u64("50"), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E0", [])] as TypeTag[]);
  AptosFramework.Account.increment_sequence_number$($.copy(addr), $c);
  withdraw$(user, u64("0"), u64("51"), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E0", [])] as TypeTag[]);
  return;
}


export function buildPayload_withdraw_failure_excess_qct (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xc0deb00c::User::withdraw_failure_excess_qct",
    typeParamStrings,
    []
  );

}
// #[test]
export function withdraw_failure_no_o_c$ (
  user: HexString,
  $c: AptosDataCache,
): void {
  withdraw$(user, u64("1"), u64("2"), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E0", [])] as TypeTag[]);
  return;
}


export function buildPayload_withdraw_failure_no_o_c (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xc0deb00c::User::withdraw_failure_no_o_c",
    typeParamStrings,
    []
  );

}
// #[test]
export function withdraw_failure_no_withdraw$ (
  econia: HexString,
  user: HexString,
  $c: AptosDataCache,
): void {
  init_test_market_user$(econia, user, $c);
  withdraw$(user, u64("0"), u64("0"), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E0", [])] as TypeTag[]);
  return;
}


export function buildPayload_withdraw_failure_no_withdraw (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xc0deb00c::User::withdraw_failure_no_withdraw",
    typeParamStrings,
    []
  );

}
// #[test]
export function withdraw_success$ (
  econia: HexString,
  user: HexString,
  $c: AptosDataCache,
): void {
  let temp$1, temp$10, temp$11, temp$2, temp$3, temp$4, temp$6, temp$7, temp$8, addr, o_c, o_c__5, o_c__9;
  init_test_market_user$(econia, user, $c);
  addr = Std.Signer.address_of$(user, $c);
  Registry.mint_bct_to$($.copy(addr), u64("100"), $c);
  Registry.mint_qct_to$($.copy(addr), u64("200"), $c);
  AptosFramework.Account.increment_sequence_number$($.copy(addr), $c);
  deposit$(user, u64("75"), u64("150"), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E0", [])] as TypeTag[]);
  AptosFramework.Account.increment_sequence_number$($.copy(addr), $c);
  withdraw$(user, u64("5"), u64("0"), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E0", [])] as TypeTag[]);
  if (AptosFramework.Coin.balance$($.copy(addr), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", [])] as TypeTag[]).eq(u64("30"))) {
    temp$1 = AptosFramework.Coin.balance$($.copy(addr), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", [])] as TypeTag[]).eq(u64("50"));
  }
  else{
    temp$1 = false;
  }
  if (!temp$1) {
    throw $.abortCode(u64("0"));
  }
  o_c = $c.borrow_global<OC>(new StructTag(new HexString("0xc0deb00c"), "User", "OC", [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E0", [])]), $.copy(addr));
  if (AptosFramework.Coin.value$(o_c.b_c, $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", [])] as TypeTag[]).eq(u64("70"))) {
    temp$2 = AptosFramework.Coin.value$(o_c.q_c, $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", [])] as TypeTag[]).eq(u64("150"));
  }
  else{
    temp$2 = false;
  }
  if (!temp$2) {
    throw $.abortCode(u64("1"));
  }
  if ($.copy(o_c.b_a).eq(u64("70"))) {
    temp$3 = $.copy(o_c.q_a).eq(u64("150"));
  }
  else{
    temp$3 = false;
  }
  if (!temp$3) {
    throw $.abortCode(u64("2"));
  }
  $c.borrow_global_mut<OC>(new StructTag(new HexString("0xc0deb00c"), "User", "OC", [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E0", [])]), $.copy(addr)).q_a = u64("140");
  AptosFramework.Account.increment_sequence_number$($.copy(addr), $c);
  withdraw$(user, u64("0"), u64("20"), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E0", [])] as TypeTag[]);
  if (AptosFramework.Coin.balance$($.copy(addr), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", [])] as TypeTag[]).eq(u64("30"))) {
    temp$4 = AptosFramework.Coin.balance$($.copy(addr), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", [])] as TypeTag[]).eq(u64("70"));
  }
  else{
    temp$4 = false;
  }
  if (!temp$4) {
    throw $.abortCode(u64("3"));
  }
  o_c__5 = $c.borrow_global<OC>(new StructTag(new HexString("0xc0deb00c"), "User", "OC", [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E0", [])]), $.copy(addr));
  if (AptosFramework.Coin.value$(o_c__5.b_c, $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", [])] as TypeTag[]).eq(u64("70"))) {
    temp$6 = AptosFramework.Coin.value$(o_c__5.q_c, $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", [])] as TypeTag[]).eq(u64("130"));
  }
  else{
    temp$6 = false;
  }
  if (!temp$6) {
    throw $.abortCode(u64("4"));
  }
  if ($.copy(o_c__5.b_a).eq(u64("70"))) {
    temp$7 = $.copy(o_c__5.q_a).eq(u64("120"));
  }
  else{
    temp$7 = false;
  }
  if (!temp$7) {
    throw $.abortCode(u64("5"));
  }
  AptosFramework.Account.increment_sequence_number$($.copy(addr), $c);
  withdraw$(user, u64("70"), u64("120"), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E0", [])] as TypeTag[]);
  if (AptosFramework.Coin.balance$($.copy(addr), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", [])] as TypeTag[]).eq(u64("100"))) {
    temp$8 = AptosFramework.Coin.balance$($.copy(addr), $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", [])] as TypeTag[]).eq(u64("190"));
  }
  else{
    temp$8 = false;
  }
  if (!temp$8) {
    throw $.abortCode(u64("6"));
  }
  o_c__9 = $c.borrow_global<OC>(new StructTag(new HexString("0xc0deb00c"), "User", "OC", [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", []), new StructTag(new HexString("0xc0deb00c"), "Registry", "E0", [])]), $.copy(addr));
  if (AptosFramework.Coin.value$(o_c__9.b_c, $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "BCT", [])] as TypeTag[]).eq(u64("0"))) {
    temp$10 = AptosFramework.Coin.value$(o_c__9.q_c, $c, [new StructTag(new HexString("0xc0deb00c"), "Registry", "QCT", [])] as TypeTag[]).eq(u64("10"));
  }
  else{
    temp$10 = false;
  }
  if (!temp$10) {
    throw $.abortCode(u64("7"));
  }
  if ($.copy(o_c__9.b_a).eq(u64("0"))) {
    temp$11 = $.copy(o_c__9.q_a).eq(u64("0"));
  }
  else{
    temp$11 = false;
  }
  if (!temp$11) {
    throw $.abortCode(u64("8"));
  }
  return;
}


export function buildPayload_withdraw_success (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xc0deb00c::User::withdraw_success",
    typeParamStrings,
    []
  );

}
export function loadParsers(repo: AptosParserRepo) {
  repo.addParser("0xc0deb00c::User::OC", OC.OCParser);
  repo.addParser("0xc0deb00c::User::SC", SC.SCParser);
}

