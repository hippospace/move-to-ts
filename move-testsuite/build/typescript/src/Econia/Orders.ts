import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient} from "aptos";
import * as Std from "../Std";
import * as CritBit from "./CritBit";
export const packageName = "Econia";
export const moduleAddress = new HexString("0xc0deb00c");
export const moduleName = "Orders";

export const ASK : boolean = true;
export const BID : boolean = false;
export const E_BASE_OVERFLOW : U64 = u64("4");
export const E_NOT_ECONIA : U64 = u64("2");
export const E_NO_ORDERS : U64 = u64("1");
export const E_NO_SUCH_ORDER : U64 = u64("7");
export const E_ORDERS_EXISTS : U64 = u64("0");
export const E_PRICE_0 : U64 = u64("3");
export const E_QUOTE_OVERFLOW : U64 = u64("5");
export const E_SIZE_0 : U64 = u64("6");
export const HI_64 : U64 = u64("18446744073709551615");


export class BT 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "BT";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  ];

  constructor(proto: any, public typeTag: TypeTag) {

  }

  static BTParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : BT {
    const proto = $.parseStructProto(data, typeTag, repo, BT);
    return new BT(proto, typeTag);
  }

}

export class ET 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "ET";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  ];

  constructor(proto: any, public typeTag: TypeTag) {

  }

  static ETParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : ET {
    const proto = $.parseStructProto(data, typeTag, repo, ET);
    return new ET(proto, typeTag);
  }

}

export class FriendCap 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "FriendCap";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  ];

  constructor(proto: any, public typeTag: TypeTag) {

  }

  static FriendCapParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : FriendCap {
    const proto = $.parseStructProto(data, typeTag, repo, FriendCap);
    return new FriendCap(proto, typeTag);
  }

}

export class OO 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "OO";
  static typeParameters: TypeParamDeclType[] = [
    { name: "B", isPhantom: true },
    { name: "Q", isPhantom: true },
    { name: "E", isPhantom: true }
  ];
  static fields: FieldDeclType[] = [
  { name: "f", typeTag: AtomicTypeTag.U64 },
  { name: "a", typeTag: new StructTag(new HexString("0xc0deb00c"), "CritBit", "CB", [AtomicTypeTag.U64]) },
  { name: "b", typeTag: new StructTag(new HexString("0xc0deb00c"), "CritBit", "CB", [AtomicTypeTag.U64]) }];

  f: U64;
  a: CritBit.CB;
  b: CritBit.CB;

  constructor(proto: any, public typeTag: TypeTag) {
    this.f = proto['f'] as U64;
    this.a = proto['a'] as CritBit.CB;
    this.b = proto['b'] as CritBit.CB;
  }

  static OOParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : OO {
    const proto = $.parseStructProto(data, typeTag, repo, OO);
    return new OO(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, OO, typeParams);
    return result as unknown as OO;
  }
}

export class QT 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "QT";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  ];

  constructor(proto: any, public typeTag: TypeTag) {

  }

  static QTParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : QT {
    const proto = $.parseStructProto(data, typeTag, repo, QT);
    return new QT(proto, typeTag);
  }

}
export function add_ask$ (
  addr: HexString,
  id: U128,
  price: U64,
  size: U64,
  _c: FriendCap,
  $c: AptosDataCache,
  $p: TypeTag[], /* <B, Q, E>*/
): [U64, U64] {
  return add_order$($.copy(addr), ASK, $.copy(id), $.copy(price), $.copy(size), $c, [$p[0], $p[1], $p[2]] as TypeTag[]);
}

export function add_bid$ (
  addr: HexString,
  id: U128,
  price: U64,
  size: U64,
  _c: FriendCap,
  $c: AptosDataCache,
  $p: TypeTag[], /* <B, Q, E>*/
): [U64, U64] {
  return add_order$($.copy(addr), BID, $.copy(id), $.copy(price), $.copy(size), $c, [$p[0], $p[1], $p[2]] as TypeTag[]);
}

export function add_order$ (
  addr: HexString,
  side: boolean,
  id: U128,
  price: U64,
  size: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <B, Q, E>*/
): [U64, U64] {
  let base_subunits, o_o, quote_subunits, s_f;
  if (!$.copy(price).gt(u64("0"))) {
    throw $.abortCode(E_PRICE_0);
  }
  if (!$.copy(size).gt(u64("0"))) {
    throw $.abortCode(E_SIZE_0);
  }
  if (!exists_orders$($.copy(addr), $c, [$p[0], $p[1], $p[2]] as TypeTag[])) {
    throw $.abortCode(E_NO_ORDERS);
  }
  o_o = $c.borrow_global_mut<OO>(new StructTag(new HexString("0xc0deb00c"), "Orders", "OO", [$p[0], $p[1], $p[2]]), $.copy(addr));
  s_f = $.copy(o_o.f);
  base_subunits = u128($.copy(size)).mul(u128($.copy(s_f)));
  if (!!$.copy(base_subunits).gt(u128(HI_64))) {
    throw $.abortCode(E_BASE_OVERFLOW);
  }
  quote_subunits = u128($.copy(size)).mul(u128($.copy(price)));
  if (!!$.copy(quote_subunits).gt(u128(HI_64))) {
    throw $.abortCode(E_QUOTE_OVERFLOW);
  }
  if ((side == ASK)) {
    CritBit.insert$(o_o.a, $.copy(id), $.copy(size), $c, [AtomicTypeTag.U64] as TypeTag[]);
  }
  else{
    CritBit.insert$(o_o.b, $.copy(id), $.copy(size), $c, [AtomicTypeTag.U64] as TypeTag[]);
  }
  return [u64($.copy(base_subunits)), u64($.copy(quote_subunits))];
}

// #[test]
export function add_order_failure_no_orders$ (
  $c: AptosDataCache,
): void {
  add_order$(new HexString("0x5678"), ASK, u128("0"), u64("1"), u64("1"), $c, [new StructTag(new HexString("0xc0deb00c"), "Orders", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "ET", [])] as TypeTag[]);
  return;
}

// #[test]
export function add_order_failure_overflow_base$ (
  user: HexString,
  $c: AptosDataCache,
): void {
  let temp$1, temp$2, temp$3;
  temp$3 = user;
  temp$2 = u64("10");
  temp$1 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Orders", "FriendCap", []));
  init_orders$(temp$3, temp$2, temp$1, $c, [new StructTag(new HexString("0xc0deb00c"), "Orders", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "ET", [])] as TypeTag[]);
  add_order$(new HexString("0x5678"), ASK, u128("0"), u64("2"), HI_64.div(u64("9")), $c, [new StructTag(new HexString("0xc0deb00c"), "Orders", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "ET", [])] as TypeTag[]);
  return;
}

// #[test]
export function add_order_failure_overflow_quote$ (
  user: HexString,
  $c: AptosDataCache,
): void {
  let temp$1, temp$2, temp$3;
  temp$3 = user;
  temp$2 = u64("10");
  temp$1 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Orders", "FriendCap", []));
  init_orders$(temp$3, temp$2, temp$1, $c, [new StructTag(new HexString("0xc0deb00c"), "Orders", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "ET", [])] as TypeTag[]);
  add_order$(new HexString("0x5678"), ASK, u128("0"), u64("11"), HI_64.div(u64("10")), $c, [new StructTag(new HexString("0xc0deb00c"), "Orders", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "ET", [])] as TypeTag[]);
  return;
}

// #[test]
export function add_order_failure_price_0$ (
  $c: AptosDataCache,
): void {
  add_order$(new HexString("0x5678"), ASK, u128("0"), u64("0"), u64("1"), $c, [new StructTag(new HexString("0xc0deb00c"), "Orders", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "ET", [])] as TypeTag[]);
  return;
}

// #[test]
export function add_order_failure_size_0$ (
  $c: AptosDataCache,
): void {
  add_order$(new HexString("0x5678"), ASK, u128("0"), u64("1"), u64("0"), $c, [new StructTag(new HexString("0xc0deb00c"), "Orders", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "ET", [])] as TypeTag[]);
  return;
}

// #[test]
export function add_orders_success$ (
  user: HexString,
  $c: AptosDataCache,
): void {
  let temp$1, temp$2, ask_b_s, ask_q_s, bid_b_s, bid_q_s, f_c, o_o;
  f_c = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Orders", "FriendCap", []));
  init_orders$(user, u64("100"), f_c, $c, [new StructTag(new HexString("0xc0deb00c"), "Orders", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "ET", [])] as TypeTag[]);
  [ask_b_s, ask_q_s] = add_ask$(new HexString("0x5678"), u128("123"), u64("2"), u64("4"), f_c, $c, [new StructTag(new HexString("0xc0deb00c"), "Orders", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "ET", [])] as TypeTag[]);
  if ($.copy(ask_b_s).eq(u64("400"))) {
    temp$1 = $.copy(ask_q_s).eq(u64("8"));
  }
  else{
    temp$1 = false;
  }
  if (!temp$1) {
    throw $.abortCode(u64("0"));
  }
  [bid_b_s, bid_q_s] = add_bid$(new HexString("0x5678"), u128("234"), u64("3"), u64("14"), f_c, $c, [new StructTag(new HexString("0xc0deb00c"), "Orders", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "ET", [])] as TypeTag[]);
  if ($.copy(bid_b_s).eq(u64("1400"))) {
    temp$2 = $.copy(bid_q_s).eq(u64("42"));
  }
  else{
    temp$2 = false;
  }
  if (!temp$2) {
    throw $.abortCode(u64("1"));
  }
  o_o = $c.borrow_global<OO>(new StructTag(new HexString("0xc0deb00c"), "Orders", "OO", [new StructTag(new HexString("0xc0deb00c"), "Orders", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "ET", [])]), new HexString("0x5678"));
  if (!$.copy(CritBit.borrow$(o_o.a, u128("123"), $c, [AtomicTypeTag.U64] as TypeTag[])).eq(u64("4"))) {
    throw $.abortCode(u64("2"));
  }
  if (!$.copy(CritBit.borrow$(o_o.b, u128("234"), $c, [AtomicTypeTag.U64] as TypeTag[])).eq(u64("14"))) {
    throw $.abortCode(u64("3"));
  }
  return;
}

export function cancel_ask$ (
  addr: HexString,
  id: U128,
  _c: FriendCap,
  $c: AptosDataCache,
  $p: TypeTag[], /* <B, Q, E>*/
): U64 {
  return cancel_order$($.copy(addr), ASK, $.copy(id), $c, [$p[0], $p[1], $p[2]] as TypeTag[]);
}

export function cancel_bid$ (
  addr: HexString,
  id: U128,
  _c: FriendCap,
  $c: AptosDataCache,
  $p: TypeTag[], /* <B, Q, E>*/
): U64 {
  return cancel_order$($.copy(addr), BID, $.copy(id), $c, [$p[0], $p[1], $p[2]] as TypeTag[]);
}

export function cancel_order$ (
  addr: HexString,
  side: boolean,
  id: U128,
  $c: AptosDataCache,
  $p: TypeTag[], /* <B, Q, E>*/
): U64 {
  let o_o;
  if (!exists_orders$($.copy(addr), $c, [$p[0], $p[1], $p[2]] as TypeTag[])) {
    throw $.abortCode(E_NO_ORDERS);
  }
  o_o = $c.borrow_global_mut<OO>(new StructTag(new HexString("0xc0deb00c"), "Orders", "OO", [$p[0], $p[1], $p[2]]), $.copy(addr));
  if ((side == ASK)) {
    if (!CritBit.has_key$(o_o.a, $.copy(id), $c, [AtomicTypeTag.U64] as TypeTag[])) {
      throw $.abortCode(E_NO_SUCH_ORDER);
    }
    return CritBit.pop$(o_o.a, $.copy(id), $c, [AtomicTypeTag.U64] as TypeTag[]);
  }
  else{
    if (!CritBit.has_key$(o_o.b, $.copy(id), $c, [AtomicTypeTag.U64] as TypeTag[])) {
      throw $.abortCode(E_NO_SUCH_ORDER);
    }
    return CritBit.pop$(o_o.b, $.copy(id), $c, [AtomicTypeTag.U64] as TypeTag[]);
  }
}

// #[test]
export function cancel_order_failure_no_orders$ (
  $c: AptosDataCache,
): void {
  let temp$1, temp$2, temp$3;
  temp$3 = new HexString("0x5678");
  temp$2 = u128("0");
  temp$1 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Orders", "FriendCap", []));
  cancel_ask$(temp$3, temp$2, temp$1, $c, [new StructTag(new HexString("0xc0deb00c"), "Orders", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "ET", [])] as TypeTag[]);
  return;
}

// #[test]
export function cancel_order_failure_no_such_ask$ (
  user: HexString,
  $c: AptosDataCache,
): void {
  let f_c;
  f_c = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Orders", "FriendCap", []));
  init_orders$(user, u64("1"), f_c, $c, [new StructTag(new HexString("0xc0deb00c"), "Orders", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "ET", [])] as TypeTag[]);
  cancel_ask$(new HexString("0x5678"), u128("0"), f_c, $c, [new StructTag(new HexString("0xc0deb00c"), "Orders", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "ET", [])] as TypeTag[]);
  return;
}

// #[test]
export function cancel_order_failure_no_such_bid$ (
  user: HexString,
  $c: AptosDataCache,
): void {
  let f_c;
  f_c = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Orders", "FriendCap", []));
  init_orders$(user, u64("1"), f_c, $c, [new StructTag(new HexString("0xc0deb00c"), "Orders", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "ET", [])] as TypeTag[]);
  cancel_bid$(new HexString("0x5678"), u128("0"), f_c, $c, [new StructTag(new HexString("0xc0deb00c"), "Orders", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "ET", [])] as TypeTag[]);
  return;
}

// #[test]
export function cancel_orders_success$ (
  user: HexString,
  $c: AptosDataCache,
): void {
  let temp$1, temp$2, temp$3, temp$6, temp$7, temp$8, f_c, id, o_o, o_o__10, o_o__4, o_o__5, price, s_s, s_s__9, size;
  f_c = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Orders", "FriendCap", []));
  init_orders$(user, u64("1"), f_c, $c, [new StructTag(new HexString("0xc0deb00c"), "Orders", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "ET", [])] as TypeTag[]);
  [id, price, size] = [u128("1"), u64("2"), u64("3")];
  add_ask$(new HexString("0x5678"), $.copy(id), $.copy(price), $.copy(size), f_c, $c, [new StructTag(new HexString("0xc0deb00c"), "Orders", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "ET", [])] as TypeTag[]);
  o_o = $c.borrow_global<OO>(new StructTag(new HexString("0xc0deb00c"), "Orders", "OO", [new StructTag(new HexString("0xc0deb00c"), "Orders", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "ET", [])]), new HexString("0x5678"));
  if (!CritBit.has_key$(o_o.a, $.copy(id), $c, [AtomicTypeTag.U64] as TypeTag[])) {
    throw $.abortCode(u64("0"));
  }
  temp$3 = new HexString("0x5678");
  temp$2 = $.copy(id);
  temp$1 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Orders", "FriendCap", []));
  s_s = cancel_ask$(temp$3, temp$2, temp$1, $c, [new StructTag(new HexString("0xc0deb00c"), "Orders", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "ET", [])] as TypeTag[]);
  if (!$.copy(s_s).eq($.copy(size))) {
    throw $.abortCode(u64("1"));
  }
  o_o__4 = $c.borrow_global<OO>(new StructTag(new HexString("0xc0deb00c"), "Orders", "OO", [new StructTag(new HexString("0xc0deb00c"), "Orders", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "ET", [])]), new HexString("0x5678"));
  if (!!CritBit.has_key$(o_o__4.a, $.copy(id), $c, [AtomicTypeTag.U64] as TypeTag[])) {
    throw $.abortCode(u64("2"));
  }
  add_bid$(new HexString("0x5678"), $.copy(id), $.copy(price), $.copy(size), f_c, $c, [new StructTag(new HexString("0xc0deb00c"), "Orders", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "ET", [])] as TypeTag[]);
  o_o__5 = $c.borrow_global<OO>(new StructTag(new HexString("0xc0deb00c"), "Orders", "OO", [new StructTag(new HexString("0xc0deb00c"), "Orders", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "ET", [])]), new HexString("0x5678"));
  if (!CritBit.has_key$(o_o__5.b, $.copy(id), $c, [AtomicTypeTag.U64] as TypeTag[])) {
    throw $.abortCode(u64("3"));
  }
  temp$8 = new HexString("0x5678");
  temp$7 = $.copy(id);
  temp$6 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Orders", "FriendCap", []));
  s_s__9 = cancel_bid$(temp$8, temp$7, temp$6, $c, [new StructTag(new HexString("0xc0deb00c"), "Orders", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "ET", [])] as TypeTag[]);
  if (!$.copy(s_s__9).eq($.copy(size))) {
    throw $.abortCode(u64("4"));
  }
  o_o__10 = $c.borrow_global<OO>(new StructTag(new HexString("0xc0deb00c"), "Orders", "OO", [new StructTag(new HexString("0xc0deb00c"), "Orders", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "ET", [])]), new HexString("0x5678"));
  if (!!CritBit.has_key$(o_o__10.b, $.copy(id), $c, [AtomicTypeTag.U64] as TypeTag[])) {
    throw $.abortCode(u64("5"));
  }
  return;
}

// #[test]
export function check_ask$ (
  user: HexString,
  id: U128,
  $c: AptosDataCache,
  $p: TypeTag[], /* <B, Q, E>*/
): U64 {
  return $.copy(CritBit.borrow$($c.borrow_global<OO>(new StructTag(new HexString("0xc0deb00c"), "Orders", "OO", [$p[0], $p[1], $p[2]]), $.copy(user)).a, $.copy(id), $c, [AtomicTypeTag.U64] as TypeTag[]));
}

// #[test]
export function check_bid$ (
  user: HexString,
  id: U128,
  $c: AptosDataCache,
  $p: TypeTag[], /* <B, Q, E>*/
): U64 {
  return $.copy(CritBit.borrow$($c.borrow_global<OO>(new StructTag(new HexString("0xc0deb00c"), "Orders", "OO", [$p[0], $p[1], $p[2]]), $.copy(user)).b, $.copy(id), $c, [AtomicTypeTag.U64] as TypeTag[]));
}

export function decrement_order_size$ (
  user_addr: HexString,
  side: boolean,
  id: U128,
  amount: U64,
  _c: FriendCap,
  $c: AptosDataCache,
  $p: TypeTag[], /* <B, Q, E>*/
): void {
  let temp$1, order_size, tree;
  if ((side == ASK)) {
    temp$1 = $c.borrow_global_mut<OO>(new StructTag(new HexString("0xc0deb00c"), "Orders", "OO", [$p[0], $p[1], $p[2]]), $.copy(user_addr)).a;
  }
  else{
    temp$1 = $c.borrow_global_mut<OO>(new StructTag(new HexString("0xc0deb00c"), "Orders", "OO", [$p[0], $p[1], $p[2]]), $.copy(user_addr)).b;
  }
  tree = temp$1;
  order_size = CritBit.borrow_mut$(tree, $.copy(id), $c, [AtomicTypeTag.U64] as TypeTag[]);
  $.set(order_size, $.copy(order_size).sub($.copy(amount)));
  return;
}

// #[test]
export function decrement_order_size_success$ (
  user: HexString,
  $c: AptosDataCache,
): void {
  let temp$1, temp$10, temp$11, temp$12, temp$13, temp$14, temp$15, temp$16, temp$17, temp$18, temp$19, temp$2, temp$20, temp$21, temp$22, temp$23, temp$3, temp$4, temp$5, temp$6, temp$7, temp$8, temp$9, id, price, size;
  temp$3 = user;
  temp$2 = u64("1");
  temp$1 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Orders", "FriendCap", []));
  init_orders$(temp$3, temp$2, temp$1, $c, [new StructTag(new HexString("0xc0deb00c"), "Orders", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "ET", [])] as TypeTag[]);
  [id, price, size] = [u128("1"), u64("2"), u64("3")];
  temp$8 = new HexString("0x5678");
  temp$7 = $.copy(id);
  temp$6 = $.copy(price);
  temp$5 = $.copy(size);
  temp$4 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Orders", "FriendCap", []));
  add_ask$(temp$8, temp$7, temp$6, temp$5, temp$4, $c, [new StructTag(new HexString("0xc0deb00c"), "Orders", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "ET", [])] as TypeTag[]);
  temp$13 = new HexString("0x5678");
  temp$12 = ASK;
  temp$11 = $.copy(id);
  temp$10 = u64("2");
  temp$9 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Orders", "FriendCap", []));
  decrement_order_size$(temp$13, temp$12, temp$11, temp$10, temp$9, $c, [new StructTag(new HexString("0xc0deb00c"), "Orders", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "ET", [])] as TypeTag[]);
  if (!check_ask$(new HexString("0x5678"), $.copy(id), $c, [new StructTag(new HexString("0xc0deb00c"), "Orders", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "ET", [])] as TypeTag[]).eq(u64("1"))) {
    throw $.abortCode(u64("1"));
  }
  temp$18 = new HexString("0x5678");
  temp$17 = $.copy(id);
  temp$16 = $.copy(price);
  temp$15 = $.copy(size);
  temp$14 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Orders", "FriendCap", []));
  add_bid$(temp$18, temp$17, temp$16, temp$15, temp$14, $c, [new StructTag(new HexString("0xc0deb00c"), "Orders", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "ET", [])] as TypeTag[]);
  temp$23 = new HexString("0x5678");
  temp$22 = BID;
  temp$21 = $.copy(id);
  temp$20 = u64("1");
  temp$19 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Orders", "FriendCap", []));
  decrement_order_size$(temp$23, temp$22, temp$21, temp$20, temp$19, $c, [new StructTag(new HexString("0xc0deb00c"), "Orders", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "ET", [])] as TypeTag[]);
  if (!check_bid$(new HexString("0x5678"), $.copy(id), $c, [new StructTag(new HexString("0xc0deb00c"), "Orders", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "ET", [])] as TypeTag[]).eq(u64("2"))) {
    throw $.abortCode(u64("1"));
  }
  return;
}

export function exists_orders$ (
  a: HexString,
  $c: AptosDataCache,
  $p: TypeTag[], /* <B, Q, E>*/
): boolean {
  return $c.exists(new StructTag(new HexString("0xc0deb00c"), "Orders", "OO", [$p[0], $p[1], $p[2]]), $.copy(a));
}

export function get_friend_cap$ (
  account: HexString,
  $c: AptosDataCache,
): FriendCap {
  if (!(Std.Signer.address_of$(account, $c).hex() === new HexString("0xc0deb00c").hex())) {
    throw $.abortCode(E_NOT_ECONIA);
  }
  return new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Orders", "FriendCap", []));
}

// #[test]
export function get_friend_cap_failure$ (
  account: HexString,
  $c: AptosDataCache,
): void {
  get_friend_cap$(account, $c);
  return;
}

// #[test]
export function get_friend_cap_success$ (
  econia: HexString,
  $c: AptosDataCache,
): void {
  get_friend_cap$(econia, $c);
  return;
}

// #[test]
export function has_ask$ (
  user: HexString,
  id: U128,
  $c: AptosDataCache,
  $p: TypeTag[], /* <B, Q, E>*/
): boolean {
  return CritBit.has_key$($c.borrow_global<OO>(new StructTag(new HexString("0xc0deb00c"), "Orders", "OO", [$p[0], $p[1], $p[2]]), $.copy(user)).a, $.copy(id), $c, [AtomicTypeTag.U64] as TypeTag[]);
}

// #[test]
export function has_bid$ (
  user: HexString,
  id: U128,
  $c: AptosDataCache,
  $p: TypeTag[], /* <B, Q, E>*/
): boolean {
  return CritBit.has_key$($c.borrow_global<OO>(new StructTag(new HexString("0xc0deb00c"), "Orders", "OO", [$p[0], $p[1], $p[2]]), $.copy(user)).b, $.copy(id), $c, [AtomicTypeTag.U64] as TypeTag[]);
}

export function init_orders$ (
  user: HexString,
  f: U64,
  _c: FriendCap,
  $c: AptosDataCache,
  $p: TypeTag[], /* <B, Q, E>*/
): void {
  let o_o;
  if (!!exists_orders$(Std.Signer.address_of$(user, $c), $c, [$p[0], $p[1], $p[2]] as TypeTag[])) {
    throw $.abortCode(E_ORDERS_EXISTS);
  }
  o_o = new OO({ f: $.copy(f), a: CritBit.empty$($c, [AtomicTypeTag.U64] as TypeTag[]), b: CritBit.empty$($c, [AtomicTypeTag.U64] as TypeTag[]) }, new StructTag(new HexString("0xc0deb00c"), "Orders", "OO", [$p[0], $p[1], $p[2]]));
  $c.move_to(new StructTag(new HexString("0xc0deb00c"), "Orders", "OO", [$p[0], $p[1], $p[2]]), user, o_o);
  return;
}

// #[test]
export function init_orders_failure_exists$ (
  user: HexString,
  $c: AptosDataCache,
): void {
  let temp$1, temp$2, temp$3, temp$4, temp$5, temp$6;
  temp$3 = user;
  temp$2 = u64("1");
  temp$1 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Orders", "FriendCap", []));
  init_orders$(temp$3, temp$2, temp$1, $c, [new StructTag(new HexString("0xc0deb00c"), "Orders", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "ET", [])] as TypeTag[]);
  temp$6 = user;
  temp$5 = u64("1");
  temp$4 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Orders", "FriendCap", []));
  init_orders$(temp$6, temp$5, temp$4, $c, [new StructTag(new HexString("0xc0deb00c"), "Orders", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "ET", [])] as TypeTag[]);
  return;
}

// #[test]
export function init_orders_success$ (
  user: HexString,
  $c: AptosDataCache,
): void {
  let temp$1, temp$2, temp$3, temp$4, o_o, user_addr;
  temp$3 = user;
  temp$2 = u64("1");
  temp$1 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Orders", "FriendCap", []));
  init_orders$(temp$3, temp$2, temp$1, $c, [new StructTag(new HexString("0xc0deb00c"), "Orders", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "ET", [])] as TypeTag[]);
  user_addr = Std.Signer.address_of$(user, $c);
  if (!scale_factor$($.copy(user_addr), $c, [new StructTag(new HexString("0xc0deb00c"), "Orders", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "ET", [])] as TypeTag[]).eq(u64("1"))) {
    throw $.abortCode(u64("0"));
  }
  o_o = $c.borrow_global<OO>(new StructTag(new HexString("0xc0deb00c"), "Orders", "OO", [new StructTag(new HexString("0xc0deb00c"), "Orders", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "ET", [])]), $.copy(user_addr));
  if (CritBit.is_empty$(o_o.a, $c, [AtomicTypeTag.U64] as TypeTag[])) {
    temp$4 = CritBit.is_empty$(o_o.b, $c, [AtomicTypeTag.U64] as TypeTag[]);
  }
  else{
    temp$4 = false;
  }
  if (!temp$4) {
    throw $.abortCode(u64("2"));
  }
  return;
}

export function remove_order$ (
  user_addr: HexString,
  side: boolean,
  id: U128,
  _c: FriendCap,
  $c: AptosDataCache,
  $p: TypeTag[], /* <B, Q, E>*/
): void {
  let open_orders;
  open_orders = $c.borrow_global_mut<OO>(new StructTag(new HexString("0xc0deb00c"), "Orders", "OO", [$p[0], $p[1], $p[2]]), $.copy(user_addr));
  if ((side == ASK)) {
    CritBit.pop$(open_orders.a, $.copy(id), $c, [AtomicTypeTag.U64] as TypeTag[]);
  }
  else{
    CritBit.pop$(open_orders.b, $.copy(id), $c, [AtomicTypeTag.U64] as TypeTag[]);
  }
  return;
}

// #[test]
export function remove_order_success$ (
  user: HexString,
  $c: AptosDataCache,
): void {
  let temp$1, temp$10, temp$11, temp$12, temp$13, temp$14, temp$15, temp$16, temp$17, temp$18, temp$19, temp$2, temp$20, temp$21, temp$3, temp$4, temp$5, temp$6, temp$7, temp$8, temp$9, id, price, size;
  temp$3 = user;
  temp$2 = u64("1");
  temp$1 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Orders", "FriendCap", []));
  init_orders$(temp$3, temp$2, temp$1, $c, [new StructTag(new HexString("0xc0deb00c"), "Orders", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "ET", [])] as TypeTag[]);
  [id, price, size] = [u128("1"), u64("2"), u64("3")];
  temp$8 = new HexString("0x5678");
  temp$7 = $.copy(id);
  temp$6 = $.copy(price);
  temp$5 = $.copy(size);
  temp$4 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Orders", "FriendCap", []));
  add_ask$(temp$8, temp$7, temp$6, temp$5, temp$4, $c, [new StructTag(new HexString("0xc0deb00c"), "Orders", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "ET", [])] as TypeTag[]);
  if (!has_ask$(new HexString("0x5678"), $.copy(id), $c, [new StructTag(new HexString("0xc0deb00c"), "Orders", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "ET", [])] as TypeTag[])) {
    throw $.abortCode(u64("0"));
  }
  temp$12 = new HexString("0x5678");
  temp$11 = ASK;
  temp$10 = $.copy(id);
  temp$9 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Orders", "FriendCap", []));
  remove_order$(temp$12, temp$11, temp$10, temp$9, $c, [new StructTag(new HexString("0xc0deb00c"), "Orders", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "ET", [])] as TypeTag[]);
  if (!!has_ask$(new HexString("0x5678"), $.copy(id), $c, [new StructTag(new HexString("0xc0deb00c"), "Orders", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "ET", [])] as TypeTag[])) {
    throw $.abortCode(u64("1"));
  }
  temp$17 = new HexString("0x5678");
  temp$16 = $.copy(id);
  temp$15 = $.copy(price);
  temp$14 = $.copy(size);
  temp$13 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Orders", "FriendCap", []));
  add_bid$(temp$17, temp$16, temp$15, temp$14, temp$13, $c, [new StructTag(new HexString("0xc0deb00c"), "Orders", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "ET", [])] as TypeTag[]);
  if (!has_bid$(new HexString("0x5678"), $.copy(id), $c, [new StructTag(new HexString("0xc0deb00c"), "Orders", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "ET", [])] as TypeTag[])) {
    throw $.abortCode(u64("2"));
  }
  temp$21 = new HexString("0x5678");
  temp$20 = BID;
  temp$19 = $.copy(id);
  temp$18 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Orders", "FriendCap", []));
  remove_order$(temp$21, temp$20, temp$19, temp$18, $c, [new StructTag(new HexString("0xc0deb00c"), "Orders", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "ET", [])] as TypeTag[]);
  if (!!has_bid$(new HexString("0x5678"), $.copy(id), $c, [new StructTag(new HexString("0xc0deb00c"), "Orders", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "ET", [])] as TypeTag[])) {
    throw $.abortCode(u64("3"));
  }
  return;
}

export function scale_factor$ (
  addr: HexString,
  $c: AptosDataCache,
  $p: TypeTag[], /* <B, Q, E>*/
): U64 {
  if (!exists_orders$($.copy(addr), $c, [$p[0], $p[1], $p[2]] as TypeTag[])) {
    throw $.abortCode(E_NO_ORDERS);
  }
  return $.copy($c.borrow_global<OO>(new StructTag(new HexString("0xc0deb00c"), "Orders", "OO", [$p[0], $p[1], $p[2]]), $.copy(addr)).f);
}

// #[test]
export function scale_factor_failure$ (
  $c: AptosDataCache,
): void {
  scale_factor$(new HexString("0x5678"), $c, [new StructTag(new HexString("0xc0deb00c"), "Orders", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Orders", "ET", [])] as TypeTag[]);
  return;
}

export function unit_test_poison$ (
  $c: AptosDataCache,
): void {
  Std.UnitTest.create_signers_for_testing$(u64("0"), $c);
  return;
}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser("0xc0deb00c::Orders::BT", BT.BTParser);
  repo.addParser("0xc0deb00c::Orders::ET", ET.ETParser);
  repo.addParser("0xc0deb00c::Orders::FriendCap", FriendCap.FriendCapParser);
  repo.addParser("0xc0deb00c::Orders::OO", OO.OOParser);
  repo.addParser("0xc0deb00c::Orders::QT", QT.QTParser);
}

