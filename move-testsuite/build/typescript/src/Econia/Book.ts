import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient} from "aptos";
import * as Std from "../Std";
import * as CritBit from "./CritBit";
import * as ID from "./ID";
export const packageName = "Econia";
export const moduleAddress = new HexString("0xc0deb00c");
export const moduleName = "Book";

export const ASK : boolean = true;
export const BID : boolean = false;
export const E_BOOK_EXISTS : U64 = u64("0");
export const E_NOT_ECONIA : U64 = u64("1");
export const E_SELF_MATCH : U64 = u64("2");
export const HI_128 : U128 = u128("340282366920938463463374607431768211455");
export const L : boolean = true;
export const MAX_BID_DEFAULT : U128 = u128("0");
export const MIN_ASK_DEFAULT : U128 = u128("340282366920938463463374607431768211455");
export const R : boolean = false;


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

export class OB 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "OB";
  static typeParameters: TypeParamDeclType[] = [
    { name: "B", isPhantom: true },
    { name: "Q", isPhantom: true },
    { name: "E", isPhantom: true }
  ];
  static fields: FieldDeclType[] = [
  { name: "f", typeTag: AtomicTypeTag.U64 },
  { name: "a", typeTag: new StructTag(new HexString("0xc0deb00c"), "CritBit", "CB", [new StructTag(new HexString("0xc0deb00c"), "Book", "P", [])]) },
  { name: "b", typeTag: new StructTag(new HexString("0xc0deb00c"), "CritBit", "CB", [new StructTag(new HexString("0xc0deb00c"), "Book", "P", [])]) },
  { name: "m_a", typeTag: AtomicTypeTag.U128 },
  { name: "m_b", typeTag: AtomicTypeTag.U128 }];

  f: U64;
  a: CritBit.CB;
  b: CritBit.CB;
  m_a: U128;
  m_b: U128;

  constructor(proto: any, public typeTag: TypeTag) {
    this.f = proto['f'] as U64;
    this.a = proto['a'] as CritBit.CB;
    this.b = proto['b'] as CritBit.CB;
    this.m_a = proto['m_a'] as U128;
    this.m_b = proto['m_b'] as U128;
  }

  static OBParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : OB {
    const proto = $.parseStructProto(data, typeTag, repo, OB);
    return new OB(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, OB, typeParams);
    return result as unknown as OB;
  }
}

export class P 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "P";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "s", typeTag: AtomicTypeTag.U64 },
  { name: "a", typeTag: AtomicTypeTag.Address }];

  s: U64;
  a: HexString;

  constructor(proto: any, public typeTag: TypeTag) {
    this.s = proto['s'] as U64;
    this.a = proto['a'] as HexString;
  }

  static PParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : P {
    const proto = $.parseStructProto(data, typeTag, repo, P);
    return new P(proto, typeTag);
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
  host: HexString,
  user: HexString,
  id: U128,
  price: U64,
  size: U64,
  _c: FriendCap,
  $c: AptosDataCache,
  $p: TypeTag[], /* <B, Q, E>*/
): boolean {
  return add_position$($.copy(host), $.copy(user), ASK, $.copy(id), $.copy(price), $.copy(size), $c, [$p[0], $p[1], $p[2]] as TypeTag[]);
}

export function add_bid$ (
  host: HexString,
  user: HexString,
  id: U128,
  price: U64,
  size: U64,
  _c: FriendCap,
  $c: AptosDataCache,
  $p: TypeTag[], /* <B, Q, E>*/
): boolean {
  return add_position$($.copy(host), $.copy(user), BID, $.copy(id), $.copy(price), $.copy(size), $c, [$p[0], $p[1], $p[2]] as TypeTag[]);
}

export function add_position$ (
  host: HexString,
  user: HexString,
  side: boolean,
  id: U128,
  price: U64,
  size: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <B, Q, E>*/
): boolean {
  let m_a_p, m_b_p, o_b;
  o_b = $c.borrow_global_mut<OB>(new StructTag(new HexString("0xc0deb00c"), "Book", "OB", [$p[0], $p[1], $p[2]]), $.copy(host));
  [m_a_p, m_b_p] = [ID.price$($.copy(o_b.m_a), $c), ID.price$($.copy(o_b.m_b), $c)];
  if ((side == ASK)) {
    if ($.copy(price).gt($.copy(m_b_p))) {
      CritBit.insert$(o_b.a, $.copy(id), new P({ s: $.copy(size), a: $.copy(user) }, new StructTag(new HexString("0xc0deb00c"), "Book", "P", [])), $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "P", [])] as TypeTag[]);
      if ($.copy(price).lt($.copy(m_a_p))) {
        o_b.m_a = $.copy(id);
      }
      else{
      }
    }
    else{
      return true;
    }
  }
  else{
    if ($.copy(price).lt($.copy(m_a_p))) {
      CritBit.insert$(o_b.b, $.copy(id), new P({ s: $.copy(size), a: $.copy(user) }, new StructTag(new HexString("0xc0deb00c"), "Book", "P", [])), $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "P", [])] as TypeTag[]);
      if ($.copy(price).gt($.copy(m_b_p))) {
        o_b.m_b = $.copy(id);
      }
      else{
      }
    }
    else{
      return true;
    }
  }
  return false;
}

// test func
export function add_position_success_crossed_spread_ask$ (
  account: HexString,
  $c: AptosDataCache,
): void {
  let temp$1, temp$14, temp$15, temp$16, temp$17, temp$18, temp$19, temp$2, temp$24, temp$25, temp$26, temp$27, temp$28, temp$29, temp$3, temp$4, temp$5, temp$6, temp$7, temp$8, temp$9, addr, crossed, id, id__13, id__23, price, price__10, price__20, size, size__12, size__22, version, version__11, version__21;
  addr = Std.Signer.address_of$(account, $c);
  temp$3 = account;
  temp$2 = u64("1");
  temp$1 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  init_book$(temp$3, temp$2, temp$1, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  [price, version, size] = [u64("8"), u64("1"), u64("1")];
  id = ID.id_a$($.copy(price), $.copy(version), $c);
  temp$9 = $.copy(addr);
  temp$8 = $.copy(addr);
  temp$7 = $.copy(id);
  temp$6 = $.copy(price);
  temp$5 = $.copy(size);
  temp$4 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  add_ask$(temp$9, temp$8, temp$7, temp$6, temp$5, temp$4, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  [price__10, version__11, size__12] = [u64("2"), u64("2"), u64("1")];
  id__13 = ID.id_b$($.copy(price__10), $.copy(version__11), $c);
  temp$19 = $.copy(addr);
  temp$18 = $.copy(addr);
  temp$17 = $.copy(id__13);
  temp$16 = $.copy(price__10);
  temp$15 = $.copy(size__12);
  temp$14 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  add_bid$(temp$19, temp$18, temp$17, temp$16, temp$15, temp$14, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  [price__20, version__21, size__22] = [u64("1"), u64("3"), u64("1")];
  id__23 = ID.id_a$($.copy(price__20), $.copy(version__21), $c);
  temp$29 = $.copy(addr);
  temp$28 = $.copy(addr);
  temp$27 = $.copy(id__23);
  temp$26 = $.copy(price__20);
  temp$25 = $.copy(size__22);
  temp$24 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  crossed = add_ask$(temp$29, temp$28, temp$27, temp$26, temp$25, temp$24, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  if (!crossed) {
    throw $.abortCode(u64("0"));
  }
  return;
}

// test func
export function add_position_success_crossed_spread_bid$ (
  account: HexString,
  $c: AptosDataCache,
): void {
  let temp$1, temp$14, temp$15, temp$16, temp$17, temp$18, temp$19, temp$2, temp$24, temp$25, temp$26, temp$27, temp$28, temp$29, temp$3, temp$4, temp$5, temp$6, temp$7, temp$8, temp$9, addr, crossed, id, id__13, id__23, price, price__10, price__20, size, size__12, size__22, version, version__11, version__21;
  addr = Std.Signer.address_of$(account, $c);
  temp$3 = account;
  temp$2 = u64("1");
  temp$1 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  init_book$(temp$3, temp$2, temp$1, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  [price, version, size] = [u64("8"), u64("1"), u64("1")];
  id = ID.id_a$($.copy(price), $.copy(version), $c);
  temp$9 = $.copy(addr);
  temp$8 = $.copy(addr);
  temp$7 = $.copy(id);
  temp$6 = $.copy(price);
  temp$5 = $.copy(size);
  temp$4 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  add_ask$(temp$9, temp$8, temp$7, temp$6, temp$5, temp$4, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  [price__10, version__11, size__12] = [u64("2"), u64("2"), u64("1")];
  id__13 = ID.id_b$($.copy(price__10), $.copy(version__11), $c);
  temp$19 = $.copy(addr);
  temp$18 = $.copy(addr);
  temp$17 = $.copy(id__13);
  temp$16 = $.copy(price__10);
  temp$15 = $.copy(size__12);
  temp$14 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  add_bid$(temp$19, temp$18, temp$17, temp$16, temp$15, temp$14, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  [price__20, version__21, size__22] = [u64("9"), u64("3"), u64("1")];
  id__23 = ID.id_b$($.copy(price__20), $.copy(version__21), $c);
  temp$29 = $.copy(addr);
  temp$28 = $.copy(addr);
  temp$27 = $.copy(id__23);
  temp$26 = $.copy(price__20);
  temp$25 = $.copy(size__22);
  temp$24 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  crossed = add_bid$(temp$29, temp$28, temp$27, temp$26, temp$25, temp$24, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  if (!crossed) {
    throw $.abortCode(u64("0"));
  }
  return;
}

// test func
export function add_position_success_simple_ask$ (
  account: HexString,
  $c: AptosDataCache,
): void {
  let temp$1, temp$12, temp$2, temp$3, temp$4, addr, crossed, crossed__9, id, id__8, m_a, o_b, o_b__10, p, p__11, price, price__5, size, size__7, version, version__6;
  addr = Std.Signer.address_of$(account, $c);
  temp$3 = account;
  temp$2 = u64("1");
  temp$1 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  init_book$(temp$3, temp$2, temp$1, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  [price, version, size] = [u64("8"), u64("1"), u64("1")];
  id = ID.id_a$($.copy(price), $.copy(version), $c);
  crossed = add_position$($.copy(addr), $.copy(addr), ASK, $.copy(id), $.copy(price), $.copy(size), $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  if (!!crossed) {
    throw $.abortCode(u64("0"));
  }
  o_b = $c.borrow_global<OB>(new StructTag(new HexString("0xc0deb00c"), "Book", "OB", [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])]), $.copy(addr));
  if (!$.copy(o_b.m_a).eq($.copy(id))) {
    throw $.abortCode(u64("1"));
  }
  p = CritBit.borrow$(o_b.a, $.copy(id), $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "P", [])] as TypeTag[]);
  if ($.copy(p.s).eq($.copy(size))) {
    temp$4 = ($.copy(p.a).hex() === $.copy(addr).hex());
  }
  else{
    temp$4 = false;
  }
  if (!temp$4) {
    throw $.abortCode(u64("2"));
  }
  m_a = $.copy(id);
  [price__5, version__6, size__7] = [u64("9"), u64("2"), u64("1")];
  id__8 = ID.id_a$($.copy(price__5), $.copy(version__6), $c);
  crossed__9 = add_position$($.copy(addr), $.copy(addr), ASK, $.copy(id__8), $.copy(price__5), $.copy(size__7), $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  if (!!crossed__9) {
    throw $.abortCode(u64("3"));
  }
  o_b__10 = $c.borrow_global<OB>(new StructTag(new HexString("0xc0deb00c"), "Book", "OB", [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])]), $.copy(addr));
  if (!$.copy(o_b__10.m_a).eq($.copy(m_a))) {
    throw $.abortCode(u64("4"));
  }
  p__11 = CritBit.borrow$(o_b__10.a, $.copy(id__8), $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "P", [])] as TypeTag[]);
  if ($.copy(p__11.s).eq($.copy(size__7))) {
    temp$12 = ($.copy(p__11.a).hex() === $.copy(addr).hex());
  }
  else{
    temp$12 = false;
  }
  if (!temp$12) {
    throw $.abortCode(u64("5"));
  }
  return;
}

// test func
export function add_position_success_simple_bid$ (
  account: HexString,
  $c: AptosDataCache,
): void {
  let temp$1, temp$12, temp$2, temp$3, temp$4, addr, crossed, crossed__9, id, id__8, m_b, o_b, o_b__10, p, p__11, price, price__5, size, size__7, version, version__6;
  addr = Std.Signer.address_of$(account, $c);
  temp$3 = account;
  temp$2 = u64("1");
  temp$1 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  init_book$(temp$3, temp$2, temp$1, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  [price, version, size] = [u64("3"), u64("1"), u64("1")];
  id = ID.id_b$($.copy(price), $.copy(version), $c);
  crossed = add_position$($.copy(addr), $.copy(addr), BID, $.copy(id), $.copy(price), $.copy(size), $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  if (!!crossed) {
    throw $.abortCode(u64("0"));
  }
  o_b = $c.borrow_global<OB>(new StructTag(new HexString("0xc0deb00c"), "Book", "OB", [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])]), $.copy(addr));
  if (!$.copy(o_b.m_b).eq($.copy(id))) {
    throw $.abortCode(u64("1"));
  }
  p = CritBit.borrow$(o_b.b, $.copy(id), $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "P", [])] as TypeTag[]);
  if ($.copy(p.s).eq($.copy(size))) {
    temp$4 = ($.copy(p.a).hex() === $.copy(addr).hex());
  }
  else{
    temp$4 = false;
  }
  if (!temp$4) {
    throw $.abortCode(u64("2"));
  }
  m_b = $.copy(id);
  [price__5, version__6, size__7] = [u64("2"), u64("2"), u64("1")];
  id__8 = ID.id_b$($.copy(price__5), $.copy(version__6), $c);
  crossed__9 = add_position$($.copy(addr), $.copy(addr), BID, $.copy(id__8), $.copy(price__5), $.copy(size__7), $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  if (!!crossed__9) {
    throw $.abortCode(u64("3"));
  }
  o_b__10 = $c.borrow_global<OB>(new StructTag(new HexString("0xc0deb00c"), "Book", "OB", [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])]), $.copy(addr));
  if (!$.copy(o_b__10.m_b).eq($.copy(m_b))) {
    throw $.abortCode(u64("4"));
  }
  p__11 = CritBit.borrow$(o_b__10.b, $.copy(id__8), $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "P", [])] as TypeTag[]);
  if ($.copy(p__11.s).eq($.copy(size__7))) {
    temp$12 = ($.copy(p__11.a).hex() === $.copy(addr).hex());
  }
  else{
    temp$12 = false;
  }
  if (!temp$12) {
    throw $.abortCode(u64("5"));
  }
  return;
}

export function cancel_ask$ (
  host: HexString,
  id: U128,
  friend_cap: FriendCap,
  $c: AptosDataCache,
  $p: TypeTag[], /* <B, Q, E>*/
): void {
  cancel_position$($.copy(host), ASK, $.copy(id), friend_cap, $c, [$p[0], $p[1], $p[2]] as TypeTag[]);
  return;
}

// test func
export function cancel_ask_success$ (
  account: HexString,
  $c: AptosDataCache,
): void {
  let temp$1, temp$10, temp$11, temp$12, temp$13, temp$14, temp$15, temp$16, temp$17, temp$18, temp$19, temp$2, temp$20, temp$21, temp$22, temp$23, temp$24, temp$25, temp$26, temp$27, temp$28, temp$3, temp$30, temp$31, temp$32, temp$33, temp$35, temp$4, temp$5, temp$6, temp$7, temp$8, temp$9, addr, id_1, id_2, id_3, o_b, o_b__29, o_b__34, p_1, p_2, p_3, s_1, s_2, s_3, v_1, v_2, v_3;
  addr = Std.Signer.address_of$(account, $c);
  temp$3 = account;
  temp$2 = u64("1");
  temp$1 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  init_book$(temp$3, temp$2, temp$1, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  [p_1, v_1, s_1] = [u64("1"), u64("2"), u64("3")];
  id_1 = ID.id_a$($.copy(p_1), $.copy(v_1), $c);
  temp$9 = $.copy(addr);
  temp$8 = $.copy(addr);
  temp$7 = $.copy(id_1);
  temp$6 = $.copy(p_1);
  temp$5 = $.copy(s_1);
  temp$4 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  add_ask$(temp$9, temp$8, temp$7, temp$6, temp$5, temp$4, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  [p_2, v_2, s_2] = [u64("2"), u64("3"), u64("4")];
  id_2 = ID.id_a$($.copy(p_2), $.copy(v_2), $c);
  temp$15 = $.copy(addr);
  temp$14 = $.copy(addr);
  temp$13 = $.copy(id_2);
  temp$12 = $.copy(p_2);
  temp$11 = $.copy(s_2);
  temp$10 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  add_ask$(temp$15, temp$14, temp$13, temp$12, temp$11, temp$10, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  [p_3, v_3, s_3] = [u64("3"), u64("4"), u64("5")];
  id_3 = ID.id_a$($.copy(p_3), $.copy(v_3), $c);
  temp$21 = $.copy(addr);
  temp$20 = $.copy(addr);
  temp$19 = $.copy(id_3);
  temp$18 = $.copy(p_3);
  temp$17 = $.copy(s_3);
  temp$16 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  add_ask$(temp$21, temp$20, temp$19, temp$18, temp$17, temp$16, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  temp$24 = $.copy(addr);
  temp$23 = $.copy(id_1);
  temp$22 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  cancel_ask$(temp$24, temp$23, temp$22, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  o_b = $c.borrow_global<OB>(new StructTag(new HexString("0xc0deb00c"), "Book", "OB", [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])]), $.copy(addr));
  if (!CritBit.has_key$(o_b.a, $.copy(id_1), $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "P", [])] as TypeTag[])) {
    temp$25 = $.copy(o_b.m_a).eq($.copy(id_2));
  }
  else{
    temp$25 = false;
  }
  if (!temp$25) {
    throw $.abortCode(u64("0"));
  }
  temp$28 = $.copy(addr);
  temp$27 = $.copy(id_3);
  temp$26 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  cancel_ask$(temp$28, temp$27, temp$26, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  o_b__29 = $c.borrow_global<OB>(new StructTag(new HexString("0xc0deb00c"), "Book", "OB", [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])]), $.copy(addr));
  if (!CritBit.has_key$(o_b__29.a, $.copy(id_3), $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "P", [])] as TypeTag[])) {
    temp$30 = $.copy(o_b__29.m_a).eq($.copy(id_2));
  }
  else{
    temp$30 = false;
  }
  if (!temp$30) {
    throw $.abortCode(u64("1"));
  }
  temp$33 = $.copy(addr);
  temp$32 = $.copy(id_2);
  temp$31 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  cancel_ask$(temp$33, temp$32, temp$31, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  o_b__34 = $c.borrow_global<OB>(new StructTag(new HexString("0xc0deb00c"), "Book", "OB", [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])]), $.copy(addr));
  if (!CritBit.has_key$(o_b__34.a, $.copy(id_2), $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "P", [])] as TypeTag[])) {
    temp$35 = $.copy(o_b__34.m_a).eq(MIN_ASK_DEFAULT);
  }
  else{
    temp$35 = false;
  }
  if (!temp$35) {
    throw $.abortCode(u64("2"));
  }
  return;
}

export function cancel_bid$ (
  host: HexString,
  id: U128,
  friend_cap: FriendCap,
  $c: AptosDataCache,
  $p: TypeTag[], /* <B, Q, E>*/
): void {
  cancel_position$($.copy(host), BID, $.copy(id), friend_cap, $c, [$p[0], $p[1], $p[2]] as TypeTag[]);
  return;
}

// test func
export function cancel_bid_success$ (
  account: HexString,
  $c: AptosDataCache,
): void {
  let temp$1, temp$10, temp$11, temp$12, temp$13, temp$14, temp$15, temp$16, temp$17, temp$18, temp$19, temp$2, temp$20, temp$21, temp$22, temp$23, temp$24, temp$25, temp$26, temp$27, temp$28, temp$3, temp$30, temp$31, temp$32, temp$33, temp$35, temp$4, temp$5, temp$6, temp$7, temp$8, temp$9, addr, id_1, id_2, id_3, o_b, o_b__29, o_b__34, p_1, p_2, p_3, s_1, s_2, s_3, v_1, v_2, v_3;
  addr = Std.Signer.address_of$(account, $c);
  temp$3 = account;
  temp$2 = u64("1");
  temp$1 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  init_book$(temp$3, temp$2, temp$1, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  [p_1, v_1, s_1] = [u64("1"), u64("2"), u64("3")];
  id_1 = ID.id_b$($.copy(p_1), $.copy(v_1), $c);
  temp$9 = $.copy(addr);
  temp$8 = $.copy(addr);
  temp$7 = $.copy(id_1);
  temp$6 = $.copy(p_1);
  temp$5 = $.copy(s_1);
  temp$4 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  add_bid$(temp$9, temp$8, temp$7, temp$6, temp$5, temp$4, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  [p_2, v_2, s_2] = [u64("2"), u64("3"), u64("4")];
  id_2 = ID.id_b$($.copy(p_2), $.copy(v_2), $c);
  temp$15 = $.copy(addr);
  temp$14 = $.copy(addr);
  temp$13 = $.copy(id_2);
  temp$12 = $.copy(p_2);
  temp$11 = $.copy(s_2);
  temp$10 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  add_bid$(temp$15, temp$14, temp$13, temp$12, temp$11, temp$10, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  [p_3, v_3, s_3] = [u64("3"), u64("4"), u64("5")];
  id_3 = ID.id_b$($.copy(p_3), $.copy(v_3), $c);
  temp$21 = $.copy(addr);
  temp$20 = $.copy(addr);
  temp$19 = $.copy(id_3);
  temp$18 = $.copy(p_3);
  temp$17 = $.copy(s_3);
  temp$16 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  add_bid$(temp$21, temp$20, temp$19, temp$18, temp$17, temp$16, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  temp$24 = $.copy(addr);
  temp$23 = $.copy(id_3);
  temp$22 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  cancel_bid$(temp$24, temp$23, temp$22, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  o_b = $c.borrow_global<OB>(new StructTag(new HexString("0xc0deb00c"), "Book", "OB", [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])]), $.copy(addr));
  if (!CritBit.has_key$(o_b.b, $.copy(id_3), $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "P", [])] as TypeTag[])) {
    temp$25 = $.copy(o_b.m_b).eq($.copy(id_2));
  }
  else{
    temp$25 = false;
  }
  if (!temp$25) {
    throw $.abortCode(u64("0"));
  }
  temp$28 = $.copy(addr);
  temp$27 = $.copy(id_1);
  temp$26 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  cancel_bid$(temp$28, temp$27, temp$26, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  o_b__29 = $c.borrow_global<OB>(new StructTag(new HexString("0xc0deb00c"), "Book", "OB", [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])]), $.copy(addr));
  if (!CritBit.has_key$(o_b__29.b, $.copy(id_1), $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "P", [])] as TypeTag[])) {
    temp$30 = $.copy(o_b__29.m_b).eq($.copy(id_2));
  }
  else{
    temp$30 = false;
  }
  if (!temp$30) {
    throw $.abortCode(u64("1"));
  }
  temp$33 = $.copy(addr);
  temp$32 = $.copy(id_2);
  temp$31 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  cancel_bid$(temp$33, temp$32, temp$31, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  o_b__34 = $c.borrow_global<OB>(new StructTag(new HexString("0xc0deb00c"), "Book", "OB", [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])]), $.copy(addr));
  if (!CritBit.has_key$(o_b__34.b, $.copy(id_2), $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "P", [])] as TypeTag[])) {
    temp$35 = $.copy(o_b__34.m_b).eq(MAX_BID_DEFAULT);
  }
  else{
    temp$35 = false;
  }
  if (!temp$35) {
    throw $.abortCode(u64("2"));
  }
  return;
}

export function cancel_position$ (
  host: HexString,
  side: boolean,
  id: U128,
  _c: FriendCap,
  $c: AptosDataCache,
  $p: TypeTag[], /* <B, Q, E>*/
): void {
  let temp$1, temp$2, asks, bids, o_b;
  o_b = $c.borrow_global_mut<OB>(new StructTag(new HexString("0xc0deb00c"), "Book", "OB", [$p[0], $p[1], $p[2]]), $.copy(host));
  if ((side == ASK)) {
    asks = o_b.a;
    CritBit.pop$(asks, $.copy(id), $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "P", [])] as TypeTag[]);
    if ($.copy(o_b.m_a).eq($.copy(id))) {
      if (CritBit.is_empty$(asks, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "P", [])] as TypeTag[])) {
        temp$1 = MIN_ASK_DEFAULT;
      }
      else{
        temp$1 = CritBit.min_key$(asks, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "P", [])] as TypeTag[]);
      }
      o_b.m_a = temp$1;
    }
    else{
    }
  }
  else{
    bids = o_b.b;
    CritBit.pop$(bids, $.copy(id), $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "P", [])] as TypeTag[]);
    if ($.copy(o_b.m_b).eq($.copy(id))) {
      if (CritBit.is_empty$(bids, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "P", [])] as TypeTag[])) {
        temp$2 = MAX_BID_DEFAULT;
      }
      else{
        temp$2 = CritBit.max_key$(bids, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "P", [])] as TypeTag[]);
      }
      o_b.m_b = temp$2;
    }
    else{
    }
  }
  return;
}

// test func
export function check_ask$ (
  host: HexString,
  id: U128,
  $c: AptosDataCache,
  $p: TypeTag[], /* <B, Q, E>*/
): [U64, HexString] {
  let ask, o_b;
  o_b = $c.borrow_global<OB>(new StructTag(new HexString("0xc0deb00c"), "Book", "OB", [$p[0], $p[1], $p[2]]), $.copy(host));
  ask = CritBit.borrow$(o_b.a, $.copy(id), $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "P", [])] as TypeTag[]);
  return [$.copy(ask.s), $.copy(ask.a)];
}

// test func
export function check_ask_min$ (
  host: HexString,
  $c: AptosDataCache,
  $p: TypeTag[], /* <B, Q, E>*/
): U128 {
  return $.copy($c.borrow_global<OB>(new StructTag(new HexString("0xc0deb00c"), "Book", "OB", [$p[0], $p[1], $p[2]]), $.copy(host)).m_a);
}

// test func
export function check_bid$ (
  host: HexString,
  id: U128,
  $c: AptosDataCache,
  $p: TypeTag[], /* <B, Q, E>*/
): [U64, HexString] {
  let bid, o_b;
  o_b = $c.borrow_global<OB>(new StructTag(new HexString("0xc0deb00c"), "Book", "OB", [$p[0], $p[1], $p[2]]), $.copy(host));
  bid = CritBit.borrow$(o_b.b, $.copy(id), $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "P", [])] as TypeTag[]);
  return [$.copy(bid.s), $.copy(bid.a)];
}

// test func
export function check_bid_max$ (
  host: HexString,
  $c: AptosDataCache,
  $p: TypeTag[], /* <B, Q, E>*/
): U128 {
  return $.copy($c.borrow_global<OB>(new StructTag(new HexString("0xc0deb00c"), "Book", "OB", [$p[0], $p[1], $p[2]]), $.copy(host)).m_b);
}

export function exists_book$ (
  a: HexString,
  $c: AptosDataCache,
  $p: TypeTag[], /* <B, Q, E>*/
): boolean {
  return $c.exists(new StructTag(new HexString("0xc0deb00c"), "Book", "OB", [$p[0], $p[1], $p[2]]), $.copy(a));
}

export function get_friend_cap$ (
  account: HexString,
  $c: AptosDataCache,
): FriendCap {
  if (!(Std.Signer.address_of$(account, $c).hex() === new HexString("0xc0deb00c").hex())) {
    throw $.abortCode(E_NOT_ECONIA);
  }
  return new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
}

// test func
export function get_friend_cap_failure$ (
  account: HexString,
  $c: AptosDataCache,
): void {
  get_friend_cap$(account, $c);
  return;
}

// test func
export function get_friend_cap_success$ (
  econia: HexString,
  $c: AptosDataCache,
): void {
  get_friend_cap$(econia, $c);
  return;
}

// test func
export function has_ask$ (
  host: HexString,
  id: U128,
  $c: AptosDataCache,
  $p: TypeTag[], /* <B, Q, E>*/
): boolean {
  return CritBit.has_key$($c.borrow_global<OB>(new StructTag(new HexString("0xc0deb00c"), "Book", "OB", [$p[0], $p[1], $p[2]]), $.copy(host)).a, $.copy(id), $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "P", [])] as TypeTag[]);
}

// test func
export function has_bid$ (
  host: HexString,
  id: U128,
  $c: AptosDataCache,
  $p: TypeTag[], /* <B, Q, E>*/
): boolean {
  return CritBit.has_key$($c.borrow_global<OB>(new StructTag(new HexString("0xc0deb00c"), "Book", "OB", [$p[0], $p[1], $p[2]]), $.copy(host)).b, $.copy(id), $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "P", [])] as TypeTag[]);
}

export function init_book$ (
  host: HexString,
  f: U64,
  _c: FriendCap,
  $c: AptosDataCache,
  $p: TypeTag[], /* <B, Q, E>*/
): void {
  let m_a, m_b, o_b;
  if (!!exists_book$(Std.Signer.address_of$(host, $c), $c, [$p[0], $p[1], $p[2]] as TypeTag[])) {
    throw $.abortCode(E_BOOK_EXISTS);
  }
  m_a = MIN_ASK_DEFAULT;
  m_b = MAX_BID_DEFAULT;
  o_b = new OB({ f: $.copy(f), a: CritBit.empty$($c, [new StructTag(new HexString("0xc0deb00c"), "Book", "P", [])] as TypeTag[]), b: CritBit.empty$($c, [new StructTag(new HexString("0xc0deb00c"), "Book", "P", [])] as TypeTag[]), m_a: $.copy(m_a), m_b: $.copy(m_b) }, new StructTag(new HexString("0xc0deb00c"), "Book", "OB", [$p[0], $p[1], $p[2]]));
  $c.move_to(new StructTag(new HexString("0xc0deb00c"), "Book", "OB", [$p[0], $p[1], $p[2]]), host, o_b);
  return;
}

// test func
export function init_book_failure_exists$ (
  host: HexString,
  $c: AptosDataCache,
): void {
  let temp$1, temp$2, temp$3, temp$4, temp$5, temp$6;
  temp$3 = host;
  temp$2 = u64("1");
  temp$1 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  init_book$(temp$3, temp$2, temp$1, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  temp$6 = host;
  temp$5 = u64("1");
  temp$4 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  init_book$(temp$6, temp$5, temp$4, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  return;
}

// test func
export function init_book_success$ (
  host: HexString,
  $c: AptosDataCache,
): void {
  let temp$1, temp$2, temp$3, temp$4, temp$5, temp$6, temp$7, host_addr, o_b;
  temp$3 = host;
  temp$2 = u64("1");
  temp$1 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  init_book$(temp$3, temp$2, temp$1, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  host_addr = Std.Signer.address_of$(host, $c);
  temp$5 = $.copy(host_addr);
  temp$4 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  if (!scale_factor$(temp$5, temp$4, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]).eq(u64("1"))) {
    throw $.abortCode(u64("0"));
  }
  o_b = $c.borrow_global<OB>(new StructTag(new HexString("0xc0deb00c"), "Book", "OB", [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])]), $.copy(host_addr));
  if ($.copy(o_b.m_a).eq(HI_128)) {
    temp$6 = $.copy(o_b.m_b).eq(u128("0"));
  }
  else{
    temp$6 = false;
  }
  if (!temp$6) {
    throw $.abortCode(u64("1"));
  }
  if (CritBit.is_empty$(o_b.a, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "P", [])] as TypeTag[])) {
    temp$7 = CritBit.is_empty$(o_b.b, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "P", [])] as TypeTag[]);
  }
  else{
    temp$7 = false;
  }
  if (!temp$7) {
    throw $.abortCode(u64("2"));
  }
  return;
}

export function init_traverse_fill$ (
  host: HexString,
  i_addr: HexString,
  side: boolean,
  size: U64,
  _c: FriendCap,
  $c: AptosDataCache,
  $p: TypeTag[], /* <B, Q, E>*/
): [U128, HexString, U64, U64, U64, boolean] {
  let temp$1, temp$2, dir, filled, perfect, t_addr, t_c_i, t_id, t_p_f, t_p_r, tree;
  if ((side == ASK)) {
    [temp$1, temp$2] = [$c.borrow_global_mut<OB>(new StructTag(new HexString("0xc0deb00c"), "Book", "OB", [$p[0], $p[1], $p[2]]), $.copy(host)).a, R];
  }
  else{
    [temp$1, temp$2] = [$c.borrow_global_mut<OB>(new StructTag(new HexString("0xc0deb00c"), "Book", "OB", [$p[0], $p[1], $p[2]]), $.copy(host)).b, L];
  }
  [tree, dir] = [temp$1, temp$2];
  [t_id, t_p_r, t_p_f, t_c_i] = CritBit.traverse_init_mut$(tree, dir, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "P", [])] as TypeTag[]);
  t_addr = $.copy(t_p_r.a);
  [filled, perfect] = process_fill_scenarios$($.copy(i_addr), t_p_r, $.copy(size), $c);
  return [$.copy(t_id), $.copy(t_addr), $.copy(t_p_f), $.copy(t_c_i), $.copy(filled), perfect];
}

// test func
export function init_traverse_fill_failure_self_match$ (
  host: HexString,
  $c: AptosDataCache,
): void {
  let temp$1, temp$10, temp$11, temp$12, temp$13, temp$14, temp$2, temp$3, temp$4, temp$5, temp$6, temp$7, temp$8, temp$9, id_1, p_1, s_1, v_1;
  temp$3 = host;
  temp$2 = u64("1");
  temp$1 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  init_book$(temp$3, temp$2, temp$1, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  [p_1, v_1, s_1] = [u64("1"), u64("2"), u64("3")];
  id_1 = ID.id_a$($.copy(p_1), $.copy(v_1), $c);
  temp$9 = new HexString("0xc0deb00c");
  temp$8 = new HexString("0xc0deb00c");
  temp$7 = $.copy(id_1);
  temp$6 = $.copy(p_1);
  temp$5 = $.copy(s_1);
  temp$4 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  add_ask$(temp$9, temp$8, temp$7, temp$6, temp$5, temp$4, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  temp$14 = new HexString("0xc0deb00c");
  temp$13 = new HexString("0xc0deb00c");
  temp$12 = ASK;
  temp$11 = u64("2");
  temp$10 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  init_traverse_fill$(temp$14, temp$13, temp$12, temp$11, temp$10, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  return;
}

// test func
export function init_traverse_fill_success_ask$ (
  host: HexString,
  $c: AptosDataCache,
): void {
  let temp$1, temp$10, temp$11, temp$12, temp$13, temp$14, temp$15, temp$16, temp$17, temp$18, temp$19, temp$2, temp$20, temp$21, temp$22, temp$23, temp$24, temp$25, temp$26, temp$27, temp$28, temp$29, temp$3, temp$30, temp$31, temp$32, temp$33, temp$34, temp$35, temp$4, temp$40, temp$41, temp$44, temp$45, temp$46, temp$47, temp$48, temp$49, temp$5, temp$54, temp$55, temp$56, temp$59, temp$6, temp$7, temp$8, temp$9, exact, exact__39, exact__53, filled, filled__38, filled__52, id_1, id_2, id_3, p_1, p_2, p_3, s_1, s_2, s_3, t_a, t_a__43, t_a__58, t_addr, t_addr__37, t_addr__51, t_id, t_id__36, t_id__50, t_s, t_s__42, t_s__57, v_1, v_2, v_3;
  temp$3 = host;
  temp$2 = u64("1");
  temp$1 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  init_book$(temp$3, temp$2, temp$1, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  [p_1, v_1, s_1] = [u64("1"), u64("2"), u64("3")];
  id_1 = ID.id_a$($.copy(p_1), $.copy(v_1), $c);
  temp$9 = new HexString("0xc0deb00c");
  temp$8 = new HexString("0xc0deb00c");
  temp$7 = $.copy(id_1);
  temp$6 = $.copy(p_1);
  temp$5 = $.copy(s_1);
  temp$4 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  add_ask$(temp$9, temp$8, temp$7, temp$6, temp$5, temp$4, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  [p_2, v_2, s_2] = [u64("2"), u64("3"), u64("4")];
  id_2 = ID.id_a$($.copy(p_2), $.copy(v_2), $c);
  temp$15 = new HexString("0xc0deb00c");
  temp$14 = new HexString("0xc0deb00c");
  temp$13 = $.copy(id_2);
  temp$12 = $.copy(p_2);
  temp$11 = $.copy(s_2);
  temp$10 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  add_ask$(temp$15, temp$14, temp$13, temp$12, temp$11, temp$10, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  [p_3, v_3, s_3] = [u64("3"), u64("4"), u64("5")];
  id_3 = ID.id_a$($.copy(p_3), $.copy(v_3), $c);
  temp$21 = new HexString("0xc0deb00c");
  temp$20 = new HexString("0xc0deb00c");
  temp$19 = $.copy(id_3);
  temp$18 = $.copy(p_3);
  temp$17 = $.copy(s_3);
  temp$16 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  add_ask$(temp$21, temp$20, temp$19, temp$18, temp$17, temp$16, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  temp$26 = new HexString("0xc0deb00c");
  temp$25 = new HexString("0x5678");
  temp$24 = ASK;
  temp$23 = u64("1");
  temp$22 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  [t_id, t_addr, , , filled, exact] = init_traverse_fill$(temp$26, temp$25, temp$24, temp$23, temp$22, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  if ($.copy(t_id).eq($.copy(id_1))) {
    temp$27 = ($.copy(t_addr).hex() === new HexString("0xc0deb00c").hex());
  }
  else{
    temp$27 = false;
  }
  if (temp$27) {
    temp$28 = $.copy(filled).eq(u64("1"));
  }
  else{
    temp$28 = false;
  }
  if (temp$28) {
    temp$29 = !exact;
  }
  else{
    temp$29 = false;
  }
  if (!temp$29) {
    throw $.abortCode(u64("0"));
  }
  [t_s, t_a] = check_ask$(new HexString("0xc0deb00c"), $.copy(t_id), $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  if ($.copy(t_s).eq(u64("2"))) {
    temp$30 = ($.copy(t_a).hex() === new HexString("0xc0deb00c").hex());
  }
  else{
    temp$30 = false;
  }
  if (!temp$30) {
    throw $.abortCode(u64("1"));
  }
  temp$35 = new HexString("0xc0deb00c");
  temp$34 = new HexString("0x5678");
  temp$33 = ASK;
  temp$32 = u64("2");
  temp$31 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  [t_id__36, t_addr__37, , , filled__38, exact__39] = init_traverse_fill$(temp$35, temp$34, temp$33, temp$32, temp$31, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  if ($.copy(t_id__36).eq($.copy(id_1))) {
    temp$40 = ($.copy(t_addr__37).hex() === new HexString("0xc0deb00c").hex());
  }
  else{
    temp$40 = false;
  }
  if (temp$40) {
    temp$41 = $.copy(filled__38).eq(u64("2"));
  }
  else{
    temp$41 = false;
  }
  if (!(temp$41 && exact__39)) {
    throw $.abortCode(u64("2"));
  }
  [t_s__42, t_a__43] = check_ask$(new HexString("0xc0deb00c"), $.copy(t_id__36), $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  if ($.copy(t_s__42).eq(u64("2"))) {
    temp$44 = ($.copy(t_a__43).hex() === new HexString("0xc0deb00c").hex());
  }
  else{
    temp$44 = false;
  }
  if (!temp$44) {
    throw $.abortCode(u64("3"));
  }
  temp$49 = new HexString("0xc0deb00c");
  temp$48 = new HexString("0x5678");
  temp$47 = ASK;
  temp$46 = u64("10");
  temp$45 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  [t_id__50, t_addr__51, , , filled__52, exact__53] = init_traverse_fill$(temp$49, temp$48, temp$47, temp$46, temp$45, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  if ($.copy(t_id__50).eq($.copy(id_1))) {
    temp$54 = ($.copy(t_addr__51).hex() === new HexString("0xc0deb00c").hex());
  }
  else{
    temp$54 = false;
  }
  if (temp$54) {
    temp$55 = $.copy(filled__52).eq(u64("2"));
  }
  else{
    temp$55 = false;
  }
  if (temp$55) {
    temp$56 = !exact__53;
  }
  else{
    temp$56 = false;
  }
  if (!temp$56) {
    throw $.abortCode(u64("0"));
  }
  [t_s__57, t_a__58] = check_ask$(new HexString("0xc0deb00c"), $.copy(t_id__50), $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  if ($.copy(t_s__57).eq(u64("2"))) {
    temp$59 = ($.copy(t_a__58).hex() === new HexString("0xc0deb00c").hex());
  }
  else{
    temp$59 = false;
  }
  if (!temp$59) {
    throw $.abortCode(u64("1"));
  }
  return;
}

// test func
export function init_traverse_fill_success_bid$ (
  host: HexString,
  $c: AptosDataCache,
): void {
  let temp$1, temp$10, temp$11, temp$12, temp$13, temp$14, temp$15, temp$16, temp$17, temp$18, temp$19, temp$2, temp$20, temp$21, temp$22, temp$23, temp$24, temp$25, temp$26, temp$27, temp$28, temp$29, temp$3, temp$30, temp$31, temp$32, temp$33, temp$34, temp$35, temp$4, temp$40, temp$41, temp$44, temp$45, temp$46, temp$47, temp$48, temp$49, temp$5, temp$54, temp$55, temp$56, temp$59, temp$6, temp$7, temp$8, temp$9, exact, exact__39, exact__53, filled, filled__38, filled__52, id_1, id_2, id_3, p_1, p_2, p_3, s_1, s_2, s_3, t_a, t_a__43, t_a__58, t_addr, t_addr__37, t_addr__51, t_id, t_id__36, t_id__50, t_s, t_s__42, t_s__57, v_1, v_2, v_3;
  temp$3 = host;
  temp$2 = u64("1");
  temp$1 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  init_book$(temp$3, temp$2, temp$1, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  [p_1, v_1, s_1] = [u64("1"), u64("2"), u64("3")];
  id_1 = ID.id_b$($.copy(p_1), $.copy(v_1), $c);
  temp$9 = new HexString("0xc0deb00c");
  temp$8 = new HexString("0xc0deb00c");
  temp$7 = $.copy(id_1);
  temp$6 = $.copy(p_1);
  temp$5 = $.copy(s_1);
  temp$4 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  add_bid$(temp$9, temp$8, temp$7, temp$6, temp$5, temp$4, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  [p_2, v_2, s_2] = [u64("2"), u64("3"), u64("4")];
  id_2 = ID.id_b$($.copy(p_2), $.copy(v_2), $c);
  temp$15 = new HexString("0xc0deb00c");
  temp$14 = new HexString("0xc0deb00c");
  temp$13 = $.copy(id_2);
  temp$12 = $.copy(p_2);
  temp$11 = $.copy(s_2);
  temp$10 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  add_bid$(temp$15, temp$14, temp$13, temp$12, temp$11, temp$10, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  [p_3, v_3, s_3] = [u64("3"), u64("4"), u64("5")];
  id_3 = ID.id_b$($.copy(p_3), $.copy(v_3), $c);
  temp$21 = new HexString("0xc0deb00c");
  temp$20 = new HexString("0xc0deb00c");
  temp$19 = $.copy(id_3);
  temp$18 = $.copy(p_3);
  temp$17 = $.copy(s_3);
  temp$16 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  add_bid$(temp$21, temp$20, temp$19, temp$18, temp$17, temp$16, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  temp$26 = new HexString("0xc0deb00c");
  temp$25 = new HexString("0x5678");
  temp$24 = BID;
  temp$23 = u64("1");
  temp$22 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  [t_id, t_addr, , , filled, exact] = init_traverse_fill$(temp$26, temp$25, temp$24, temp$23, temp$22, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  if ($.copy(t_id).eq($.copy(id_3))) {
    temp$27 = ($.copy(t_addr).hex() === new HexString("0xc0deb00c").hex());
  }
  else{
    temp$27 = false;
  }
  if (temp$27) {
    temp$28 = $.copy(filled).eq(u64("1"));
  }
  else{
    temp$28 = false;
  }
  if (temp$28) {
    temp$29 = !exact;
  }
  else{
    temp$29 = false;
  }
  if (!temp$29) {
    throw $.abortCode(u64("0"));
  }
  [t_s, t_a] = check_bid$(new HexString("0xc0deb00c"), $.copy(t_id), $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  if ($.copy(t_s).eq(u64("4"))) {
    temp$30 = ($.copy(t_a).hex() === new HexString("0xc0deb00c").hex());
  }
  else{
    temp$30 = false;
  }
  if (!temp$30) {
    throw $.abortCode(u64("1"));
  }
  temp$35 = new HexString("0xc0deb00c");
  temp$34 = new HexString("0x5678");
  temp$33 = BID;
  temp$32 = u64("4");
  temp$31 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  [t_id__36, t_addr__37, , , filled__38, exact__39] = init_traverse_fill$(temp$35, temp$34, temp$33, temp$32, temp$31, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  if ($.copy(t_id__36).eq($.copy(id_3))) {
    temp$40 = ($.copy(t_addr__37).hex() === new HexString("0xc0deb00c").hex());
  }
  else{
    temp$40 = false;
  }
  if (temp$40) {
    temp$41 = $.copy(filled__38).eq(u64("4"));
  }
  else{
    temp$41 = false;
  }
  if (!(temp$41 && exact__39)) {
    throw $.abortCode(u64("2"));
  }
  [t_s__42, t_a__43] = check_bid$(new HexString("0xc0deb00c"), $.copy(t_id__36), $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  if ($.copy(t_s__42).eq(u64("4"))) {
    temp$44 = ($.copy(t_a__43).hex() === new HexString("0xc0deb00c").hex());
  }
  else{
    temp$44 = false;
  }
  if (!temp$44) {
    throw $.abortCode(u64("3"));
  }
  temp$49 = new HexString("0xc0deb00c");
  temp$48 = new HexString("0x5678");
  temp$47 = BID;
  temp$46 = u64("10");
  temp$45 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  [t_id__50, t_addr__51, , , filled__52, exact__53] = init_traverse_fill$(temp$49, temp$48, temp$47, temp$46, temp$45, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  if ($.copy(t_id__50).eq($.copy(id_3))) {
    temp$54 = ($.copy(t_addr__51).hex() === new HexString("0xc0deb00c").hex());
  }
  else{
    temp$54 = false;
  }
  if (temp$54) {
    temp$55 = $.copy(filled__52).eq(u64("4"));
  }
  else{
    temp$55 = false;
  }
  if (temp$55) {
    temp$56 = !exact__53;
  }
  else{
    temp$56 = false;
  }
  if (!temp$56) {
    throw $.abortCode(u64("4"));
  }
  [t_s__57, t_a__58] = check_bid$(new HexString("0xc0deb00c"), $.copy(t_id__50), $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  if ($.copy(t_s__57).eq(u64("4"))) {
    temp$59 = ($.copy(t_a__58).hex() === new HexString("0xc0deb00c").hex());
  }
  else{
    temp$59 = false;
  }
  if (!temp$59) {
    throw $.abortCode(u64("5"));
  }
  return;
}

export function n_asks$ (
  addr: HexString,
  _c: FriendCap,
  $c: AptosDataCache,
  $p: TypeTag[], /* <B, Q, E>*/
): U64 {
  return CritBit.length$($c.borrow_global<OB>(new StructTag(new HexString("0xc0deb00c"), "Book", "OB", [$p[0], $p[1], $p[2]]), $.copy(addr)).a, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "P", [])] as TypeTag[]);
}

// test func
export function n_asks_success$ (
  host: HexString,
  $c: AptosDataCache,
): void {
  let temp$1, temp$10, temp$11, temp$12, temp$13, temp$2, temp$3, temp$4, temp$5, temp$6, temp$7, temp$8, temp$9, addr, id, price, size, version;
  addr = Std.Signer.address_of$(host, $c);
  temp$3 = host;
  temp$2 = u64("1");
  temp$1 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  init_book$(temp$3, temp$2, temp$1, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  temp$5 = $.copy(addr);
  temp$4 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  if (!n_asks$(temp$5, temp$4, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]).eq(u64("0"))) {
    throw $.abortCode(u64("0"));
  }
  [price, version, size] = [u64("8"), u64("1"), u64("1")];
  id = ID.id_a$($.copy(price), $.copy(version), $c);
  temp$11 = $.copy(addr);
  temp$10 = $.copy(addr);
  temp$9 = $.copy(id);
  temp$8 = $.copy(price);
  temp$7 = $.copy(size);
  temp$6 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  add_ask$(temp$11, temp$10, temp$9, temp$8, temp$7, temp$6, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  temp$13 = $.copy(addr);
  temp$12 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  if (!n_asks$(temp$13, temp$12, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]).eq(u64("1"))) {
    throw $.abortCode(u64("1"));
  }
  return;
}

export function n_bids$ (
  addr: HexString,
  _c: FriendCap,
  $c: AptosDataCache,
  $p: TypeTag[], /* <B, Q, E>*/
): U64 {
  return CritBit.length$($c.borrow_global<OB>(new StructTag(new HexString("0xc0deb00c"), "Book", "OB", [$p[0], $p[1], $p[2]]), $.copy(addr)).b, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "P", [])] as TypeTag[]);
}

// test func
export function n_bids_success$ (
  host: HexString,
  $c: AptosDataCache,
): void {
  let temp$1, temp$10, temp$11, temp$12, temp$13, temp$2, temp$3, temp$4, temp$5, temp$6, temp$7, temp$8, temp$9, addr, id, price, size, version;
  addr = Std.Signer.address_of$(host, $c);
  temp$3 = host;
  temp$2 = u64("1");
  temp$1 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  init_book$(temp$3, temp$2, temp$1, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  temp$5 = $.copy(addr);
  temp$4 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  if (!n_bids$(temp$5, temp$4, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]).eq(u64("0"))) {
    throw $.abortCode(u64("0"));
  }
  [price, version, size] = [u64("8"), u64("1"), u64("1")];
  id = ID.id_b$($.copy(price), $.copy(version), $c);
  temp$11 = $.copy(addr);
  temp$10 = $.copy(addr);
  temp$9 = $.copy(id);
  temp$8 = $.copy(price);
  temp$7 = $.copy(size);
  temp$6 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  add_bid$(temp$11, temp$10, temp$9, temp$8, temp$7, temp$6, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  temp$13 = $.copy(addr);
  temp$12 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  if (!n_bids$(temp$13, temp$12, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]).eq(u64("1"))) {
    throw $.abortCode(u64("1"));
  }
  return;
}

export function process_fill_scenarios$ (
  i_addr: HexString,
  t_p_r: P,
  size: U64,
  $c: AptosDataCache,
): [U64, boolean] {
  let filled, perfect_match;
  perfect_match = false;
  if (!($.copy(i_addr).hex() !== $.copy(t_p_r.a).hex())) {
    throw $.abortCode(E_SELF_MATCH);
  }
  if ($.copy(size).lt($.copy(t_p_r.s))) {
    filled = $.copy(size);
    t_p_r.s = $.copy(t_p_r.s).sub($.copy(size));
  }
  else{
    if ($.copy(size).gt($.copy(t_p_r.s))) {
      filled = $.copy(t_p_r.s);
    }
    else{
      filled = $.copy(size);
      perfect_match = true;
    }
  }
  return [$.copy(filled), perfect_match];
}

export function refresh_extreme_order_id$ (
  addr: HexString,
  side: boolean,
  _c: FriendCap,
  $c: AptosDataCache,
  $p: TypeTag[], /* <B, Q, E>*/
): void {
  let temp$1, temp$2, order_book;
  order_book = $c.borrow_global_mut<OB>(new StructTag(new HexString("0xc0deb00c"), "Book", "OB", [$p[0], $p[1], $p[2]]), $.copy(addr));
  if ((side == ASK)) {
    if (CritBit.is_empty$(order_book.a, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "P", [])] as TypeTag[])) {
      temp$1 = MIN_ASK_DEFAULT;
    }
    else{
      temp$1 = CritBit.min_key$(order_book.a, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "P", [])] as TypeTag[]);
    }
    order_book.m_a = temp$1;
  }
  else{
    if (CritBit.is_empty$(order_book.b, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "P", [])] as TypeTag[])) {
      temp$2 = MAX_BID_DEFAULT;
    }
    else{
      temp$2 = CritBit.max_key$(order_book.b, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "P", [])] as TypeTag[]);
    }
    order_book.m_b = temp$2;
  }
  return;
}

// test func
export function refresh_extreme_order_id_success$ (
  host: HexString,
  $c: AptosDataCache,
): void {
  let temp$1, temp$10, temp$12, temp$13, temp$14, temp$16, temp$17, temp$18, temp$2, temp$3, temp$4, temp$5, temp$6, temp$8, temp$9, addr, book, book__11, book__15, book__19, book__7;
  addr = Std.Signer.address_of$(host, $c);
  temp$3 = host;
  temp$2 = u64("1");
  temp$1 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  init_book$(temp$3, temp$2, temp$1, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  book = $c.borrow_global_mut<OB>(new StructTag(new HexString("0xc0deb00c"), "Book", "OB", [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])]), $.copy(addr));
  CritBit.insert$(book.a, u128("123"), new P({ s: u64("1"), a: new HexString("0x5678") }, new StructTag(new HexString("0xc0deb00c"), "Book", "P", [])), $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "P", [])] as TypeTag[]);
  CritBit.insert$(book.a, u128("456"), new P({ s: u64("1"), a: new HexString("0x5678") }, new StructTag(new HexString("0xc0deb00c"), "Book", "P", [])), $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "P", [])] as TypeTag[]);
  if (!$.copy(book.m_a).eq(MIN_ASK_DEFAULT)) {
    throw $.abortCode(u64("0"));
  }
  temp$6 = $.copy(addr);
  temp$5 = ASK;
  temp$4 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  refresh_extreme_order_id$(temp$6, temp$5, temp$4, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  book__7 = $c.borrow_global_mut<OB>(new StructTag(new HexString("0xc0deb00c"), "Book", "OB", [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])]), $.copy(addr));
  if (!$.copy(book__7.m_a).eq(u128("123"))) {
    throw $.abortCode(u64("1"));
  }
  CritBit.pop$(book__7.a, u128("123"), $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "P", [])] as TypeTag[]);
  CritBit.pop$(book__7.a, u128("456"), $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "P", [])] as TypeTag[]);
  temp$10 = $.copy(addr);
  temp$9 = ASK;
  temp$8 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  refresh_extreme_order_id$(temp$10, temp$9, temp$8, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  book__11 = $c.borrow_global_mut<OB>(new StructTag(new HexString("0xc0deb00c"), "Book", "OB", [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])]), $.copy(addr));
  if (!$.copy(book__11.m_a).eq(MIN_ASK_DEFAULT)) {
    throw $.abortCode(u64("2"));
  }
  CritBit.insert$(book__11.b, u128("789"), new P({ s: u64("1"), a: new HexString("0x5678") }, new StructTag(new HexString("0xc0deb00c"), "Book", "P", [])), $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "P", [])] as TypeTag[]);
  CritBit.insert$(book__11.b, u128("321"), new P({ s: u64("1"), a: new HexString("0x5678") }, new StructTag(new HexString("0xc0deb00c"), "Book", "P", [])), $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "P", [])] as TypeTag[]);
  if (!$.copy(book__11.m_b).eq(MAX_BID_DEFAULT)) {
    throw $.abortCode(u64("3"));
  }
  temp$14 = $.copy(addr);
  temp$13 = BID;
  temp$12 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  refresh_extreme_order_id$(temp$14, temp$13, temp$12, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  book__15 = $c.borrow_global_mut<OB>(new StructTag(new HexString("0xc0deb00c"), "Book", "OB", [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])]), $.copy(addr));
  if (!$.copy(book__15.m_b).eq(u128("789"))) {
    throw $.abortCode(u64("4"));
  }
  CritBit.pop$(book__15.b, u128("789"), $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "P", [])] as TypeTag[]);
  CritBit.pop$(book__15.b, u128("321"), $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "P", [])] as TypeTag[]);
  temp$18 = $.copy(addr);
  temp$17 = BID;
  temp$16 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  refresh_extreme_order_id$(temp$18, temp$17, temp$16, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  book__19 = $c.borrow_global_mut<OB>(new StructTag(new HexString("0xc0deb00c"), "Book", "OB", [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])]), $.copy(addr));
  if (!$.copy(book__19.m_b).eq(MAX_BID_DEFAULT)) {
    throw $.abortCode(u64("5"));
  }
  return;
}

export function scale_factor$ (
  addr: HexString,
  _c: FriendCap,
  $c: AptosDataCache,
  $p: TypeTag[], /* <B, Q, E>*/
): U64 {
  return $.copy($c.borrow_global<OB>(new StructTag(new HexString("0xc0deb00c"), "Book", "OB", [$p[0], $p[1], $p[2]]), $.copy(addr)).f);
}

export function traverse_pop_fill$ (
  host: HexString,
  i_addr: HexString,
  side: boolean,
  size: U64,
  n_p: U64,
  s_id: U128,
  s_p_f: U64,
  s_c_i: U64,
  _c: FriendCap,
  $c: AptosDataCache,
  $p: TypeTag[], /* <B, Q, E>*/
): [U128, HexString, U64, U64, U64, boolean] {
  let temp$1, temp$2, dir, filled, perfect, s_p, t_addr, t_c_i, t_id, t_p_f, t_p_r, tree;
  if ((side == ASK)) {
    [temp$1, temp$2] = [$c.borrow_global_mut<OB>(new StructTag(new HexString("0xc0deb00c"), "Book", "OB", [$p[0], $p[1], $p[2]]), $.copy(host)).a, R];
  }
  else{
    [temp$1, temp$2] = [$c.borrow_global_mut<OB>(new StructTag(new HexString("0xc0deb00c"), "Book", "OB", [$p[0], $p[1], $p[2]]), $.copy(host)).b, L];
  }
  [tree, dir] = [temp$1, temp$2];
  [t_id, t_p_r, t_p_f, t_c_i, s_p] = CritBit.traverse_pop_mut$(tree, $.copy(s_id), $.copy(s_p_f), $.copy(s_c_i), $.copy(n_p), dir, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "P", [])] as TypeTag[]);
  s_p;
  t_addr = $.copy(t_p_r.a);
  [filled, perfect] = process_fill_scenarios$($.copy(i_addr), t_p_r, $.copy(size), $c);
  return [$.copy(t_id), $.copy(t_addr), $.copy(t_p_f), $.copy(t_c_i), $.copy(filled), perfect];
}

// test func
export function traverse_pop_fill_success_ask$ (
  host: HexString,
  $c: AptosDataCache,
): void {
  let temp$1, temp$10, temp$11, temp$12, temp$13, temp$14, temp$15, temp$16, temp$17, temp$18, temp$19, temp$2, temp$20, temp$21, temp$22, temp$23, temp$24, temp$25, temp$26, temp$27, temp$28, temp$29, temp$3, temp$30, temp$31, temp$32, temp$33, temp$34, temp$35, temp$39, temp$4, temp$40, temp$41, temp$42, temp$43, temp$44, temp$45, temp$46, temp$47, temp$48, temp$49, temp$5, temp$50, temp$51, temp$52, temp$53, temp$56, temp$6, temp$7, temp$8, temp$9, exact, filled, id_1, id_2, id_3, p_1, p_2, p_3, s_1, s_2, s_3, t_a, t_a__55, t_addr, t_c_i, t_c_i__38, t_id, t_id__36, t_p_f, t_p_f__37, t_s, t_s__54, v_1, v_2, v_3;
  temp$3 = host;
  temp$2 = u64("1");
  temp$1 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  init_book$(temp$3, temp$2, temp$1, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  [p_1, v_1, s_1] = [u64("1"), u64("2"), u64("3")];
  id_1 = ID.id_a$($.copy(p_1), $.copy(v_1), $c);
  temp$9 = new HexString("0xc0deb00c");
  temp$8 = new HexString("0xc0deb00c");
  temp$7 = $.copy(id_1);
  temp$6 = $.copy(p_1);
  temp$5 = $.copy(s_1);
  temp$4 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  add_ask$(temp$9, temp$8, temp$7, temp$6, temp$5, temp$4, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  [p_2, v_2, s_2] = [u64("2"), u64("3"), u64("4")];
  id_2 = ID.id_a$($.copy(p_2), $.copy(v_2), $c);
  temp$15 = new HexString("0xc0deb00c");
  temp$14 = new HexString("0xc0deb00c");
  temp$13 = $.copy(id_2);
  temp$12 = $.copy(p_2);
  temp$11 = $.copy(s_2);
  temp$10 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  add_ask$(temp$15, temp$14, temp$13, temp$12, temp$11, temp$10, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  [p_3, v_3, s_3] = [u64("3"), u64("4"), u64("5")];
  id_3 = ID.id_a$($.copy(p_3), $.copy(v_3), $c);
  temp$21 = new HexString("0xc0deb00c");
  temp$20 = new HexString("0xc0deb00c");
  temp$19 = $.copy(id_3);
  temp$18 = $.copy(p_3);
  temp$17 = $.copy(s_3);
  temp$16 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  add_ask$(temp$21, temp$20, temp$19, temp$18, temp$17, temp$16, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  temp$26 = new HexString("0xc0deb00c");
  temp$25 = new HexString("0x5678");
  temp$24 = ASK;
  temp$23 = u64("12");
  temp$22 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  [t_id, , t_p_f, t_c_i, , ] = init_traverse_fill$(temp$26, temp$25, temp$24, temp$23, temp$22, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  temp$35 = new HexString("0xc0deb00c");
  temp$34 = new HexString("0x5678");
  temp$33 = ASK;
  temp$32 = u64("9");
  temp$31 = u64("3");
  temp$30 = $.copy(t_id);
  temp$29 = $.copy(t_p_f);
  temp$28 = $.copy(t_c_i);
  temp$27 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  [t_id__36, t_addr, t_p_f__37, t_c_i__38, filled, exact] = traverse_pop_fill$(temp$35, temp$34, temp$33, temp$32, temp$31, temp$30, temp$29, temp$28, temp$27, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  if ($.copy(t_id__36).eq($.copy(id_2))) {
    temp$39 = ($.copy(t_addr).hex() === new HexString("0xc0deb00c").hex());
  }
  else{
    temp$39 = false;
  }
  if (temp$39) {
    temp$40 = $.copy(filled).eq(u64("4"));
  }
  else{
    temp$40 = false;
  }
  if (temp$40) {
    temp$41 = !exact;
  }
  else{
    temp$41 = false;
  }
  if (!temp$41) {
    throw $.abortCode(u64("0"));
  }
  if (!!has_ask$(new HexString("0xc0deb00c"), $.copy(id_1), $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[])) {
    throw $.abortCode(u64("1"));
  }
  [t_s, t_a] = check_ask$(new HexString("0xc0deb00c"), $.copy(t_id__36), $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  if ($.copy(t_s).eq(u64("4"))) {
    temp$42 = ($.copy(t_a).hex() === new HexString("0xc0deb00c").hex());
  }
  else{
    temp$42 = false;
  }
  if (!temp$42) {
    throw $.abortCode(u64("2"));
  }
  temp$51 = new HexString("0xc0deb00c");
  temp$50 = new HexString("0x5678");
  temp$49 = ASK;
  temp$48 = u64("5");
  temp$47 = u64("2");
  temp$46 = $.copy(t_id__36);
  temp$45 = $.copy(t_p_f__37);
  temp$44 = $.copy(t_c_i__38);
  temp$43 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  [t_id__36, t_addr, , , filled, exact] = traverse_pop_fill$(temp$51, temp$50, temp$49, temp$48, temp$47, temp$46, temp$45, temp$44, temp$43, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  if (!!has_ask$(new HexString("0xc0deb00c"), $.copy(id_2), $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[])) {
    throw $.abortCode(u64("3"));
  }
  if ($.copy(t_id__36).eq($.copy(id_3))) {
    temp$52 = ($.copy(t_addr).hex() === new HexString("0xc0deb00c").hex());
  }
  else{
    temp$52 = false;
  }
  if (temp$52) {
    temp$53 = $.copy(filled).eq(u64("5"));
  }
  else{
    temp$53 = false;
  }
  if (!(temp$53 && exact)) {
    throw $.abortCode(u64("4"));
  }
  [t_s__54, t_a__55] = check_ask$(new HexString("0xc0deb00c"), $.copy(t_id__36), $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  if ($.copy(t_s__54).eq(u64("5"))) {
    temp$56 = ($.copy(t_a__55).hex() === new HexString("0xc0deb00c").hex());
  }
  else{
    temp$56 = false;
  }
  if (!temp$56) {
    throw $.abortCode(u64("2"));
  }
  return;
}

// test func
export function traverse_pop_fill_success_bid$ (
  host: HexString,
  $c: AptosDataCache,
): void {
  let temp$1, temp$10, temp$11, temp$12, temp$13, temp$14, temp$15, temp$16, temp$17, temp$18, temp$19, temp$2, temp$20, temp$21, temp$22, temp$23, temp$24, temp$25, temp$26, temp$27, temp$28, temp$29, temp$3, temp$30, temp$31, temp$32, temp$33, temp$34, temp$35, temp$39, temp$4, temp$40, temp$41, temp$42, temp$43, temp$44, temp$45, temp$46, temp$47, temp$48, temp$49, temp$5, temp$50, temp$51, temp$52, temp$53, temp$6, temp$7, temp$8, temp$9, exact, filled, id_1, id_2, id_3, p_1, p_2, p_3, s_1, s_2, s_3, t_a, t_addr, t_c_i, t_c_i__38, t_id, t_id__36, t_p_f, t_p_f__37, t_s, v_1, v_2, v_3;
  temp$3 = host;
  temp$2 = u64("1");
  temp$1 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  init_book$(temp$3, temp$2, temp$1, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  [p_1, v_1, s_1] = [u64("1"), u64("2"), u64("3")];
  id_1 = ID.id_b$($.copy(p_1), $.copy(v_1), $c);
  temp$9 = new HexString("0xc0deb00c");
  temp$8 = new HexString("0xc0deb00c");
  temp$7 = $.copy(id_1);
  temp$6 = $.copy(p_1);
  temp$5 = $.copy(s_1);
  temp$4 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  add_bid$(temp$9, temp$8, temp$7, temp$6, temp$5, temp$4, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  [p_2, v_2, s_2] = [u64("2"), u64("3"), u64("4")];
  id_2 = ID.id_b$($.copy(p_2), $.copy(v_2), $c);
  temp$15 = new HexString("0xc0deb00c");
  temp$14 = new HexString("0xc0deb00c");
  temp$13 = $.copy(id_2);
  temp$12 = $.copy(p_2);
  temp$11 = $.copy(s_2);
  temp$10 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  add_bid$(temp$15, temp$14, temp$13, temp$12, temp$11, temp$10, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  [p_3, v_3, s_3] = [u64("3"), u64("4"), u64("5")];
  id_3 = ID.id_b$($.copy(p_3), $.copy(v_3), $c);
  temp$21 = new HexString("0xc0deb00c");
  temp$20 = new HexString("0xc0deb00c");
  temp$19 = $.copy(id_3);
  temp$18 = $.copy(p_3);
  temp$17 = $.copy(s_3);
  temp$16 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  add_bid$(temp$21, temp$20, temp$19, temp$18, temp$17, temp$16, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  temp$26 = new HexString("0xc0deb00c");
  temp$25 = new HexString("0x5678");
  temp$24 = BID;
  temp$23 = u64("12");
  temp$22 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  [t_id, , t_p_f, t_c_i, , ] = init_traverse_fill$(temp$26, temp$25, temp$24, temp$23, temp$22, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  temp$35 = new HexString("0xc0deb00c");
  temp$34 = new HexString("0x5678");
  temp$33 = BID;
  temp$32 = u64("7");
  temp$31 = u64("3");
  temp$30 = $.copy(t_id);
  temp$29 = $.copy(t_p_f);
  temp$28 = $.copy(t_c_i);
  temp$27 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  [t_id__36, t_addr, t_p_f__37, t_c_i__38, filled, exact] = traverse_pop_fill$(temp$35, temp$34, temp$33, temp$32, temp$31, temp$30, temp$29, temp$28, temp$27, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  if ($.copy(t_id__36).eq($.copy(id_2))) {
    temp$39 = ($.copy(t_addr).hex() === new HexString("0xc0deb00c").hex());
  }
  else{
    temp$39 = false;
  }
  if (temp$39) {
    temp$40 = $.copy(filled).eq(u64("4"));
  }
  else{
    temp$40 = false;
  }
  if (temp$40) {
    temp$41 = !exact;
  }
  else{
    temp$41 = false;
  }
  if (!temp$41) {
    throw $.abortCode(u64("0"));
  }
  if (!!has_bid$(new HexString("0xc0deb00c"), $.copy(id_3), $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[])) {
    throw $.abortCode(u64("1"));
  }
  [t_s, t_a] = check_bid$(new HexString("0xc0deb00c"), $.copy(t_id__36), $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  if ($.copy(t_s).eq(u64("4"))) {
    temp$42 = ($.copy(t_a).hex() === new HexString("0xc0deb00c").hex());
  }
  else{
    temp$42 = false;
  }
  if (!temp$42) {
    throw $.abortCode(u64("2"));
  }
  temp$51 = new HexString("0xc0deb00c");
  temp$50 = new HexString("0x5678");
  temp$49 = BID;
  temp$48 = u64("3");
  temp$47 = u64("2");
  temp$46 = $.copy(t_id__36);
  temp$45 = $.copy(t_p_f__37);
  temp$44 = $.copy(t_c_i__38);
  temp$43 = new FriendCap({  }, new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []));
  [t_id__36, t_addr, , , filled, exact] = traverse_pop_fill$(temp$51, temp$50, temp$49, temp$48, temp$47, temp$46, temp$45, temp$44, temp$43, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  if (!!has_ask$(new HexString("0xc0deb00c"), $.copy(id_2), $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[])) {
    throw $.abortCode(u64("3"));
  }
  if ($.copy(t_id__36).eq($.copy(id_1))) {
    temp$52 = ($.copy(t_addr).hex() === new HexString("0xc0deb00c").hex());
  }
  else{
    temp$52 = false;
  }
  if (temp$52) {
    temp$53 = $.copy(filled).eq(u64("3"));
  }
  else{
    temp$53 = false;
  }
  if (!(temp$53 && exact)) {
    throw $.abortCode(u64("4"));
  }
  if (!!has_ask$(new HexString("0xc0deb00c"), $.copy(t_id__36), $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[])) {
    throw $.abortCode(u64("5"));
  }
  return;
}

export function unit_test_poison$ (
  $c: AptosDataCache,
): void {
  Std.UnitTest.create_signers_for_testing$(u64("0"), $c);
  return;
}


