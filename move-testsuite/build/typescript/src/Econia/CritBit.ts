import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient} from "aptos";
import * as Std from "../Std";
export const packageName = "Econia";
export const moduleAddress = new HexString("0xc0deb00c");
export const moduleName = "CritBit";

export const E_BIT_NOT_0_OR_1 : U64 = u64("0");
export const E_BORROW_EMPTY : U64 = u64("3");
export const E_DESTROY_NOT_EMPTY : U64 = u64("1");
export const E_HAS_K : U64 = u64("2");
export const E_INSERT_FULL : U64 = u64("5");
export const E_LOOKUP_EMPTY : U64 = u64("7");
export const E_NOT_HAS_K : U64 = u64("4");
export const E_POP_EMPTY : U64 = u64("6");
export const HI_128 : U128 = u128("340282366920938463463374607431768211455");
export const HI_64 : U64 = u64("18446744073709551615");
export const IN : U64 = u64("0");
export const L : boolean = true;
export const MSB_u128 : U8 = u8("127");
export const N_TYPE : U8 = u8("63");
export const OUT : U64 = u64("1");
export const R : boolean = false;
export const ROOT : U64 = u64("18446744073709551615");


export class CB 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "CB";
  static typeParameters: TypeParamDeclType[] = [
    { name: "V", isPhantom: false }
  ];
  static fields: FieldDeclType[] = [
  { name: "r", typeTag: AtomicTypeTag.U64 },
  { name: "i", typeTag: new VectorTag(new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])) },
  { name: "o", typeTag: new VectorTag(new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [new $.TypeParamIdx(0)])) }];

  r: U64;
  i: I[];
  o: O[];

  constructor(proto: any, public typeTag: TypeTag) {
    this.r = proto['r'] as U64;
    this.i = proto['i'] as I[];
    this.o = proto['o'] as O[];
  }

  static CBParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : CB {
    const proto = $.parseStructProto(data, typeTag, repo, CB);
    return new CB(proto, typeTag);
  }

}

export class I 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "I";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "c", typeTag: AtomicTypeTag.U8 },
  { name: "p", typeTag: AtomicTypeTag.U64 },
  { name: "l", typeTag: AtomicTypeTag.U64 },
  { name: "r", typeTag: AtomicTypeTag.U64 }];

  c: U8;
  p: U64;
  l: U64;
  r: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.c = proto['c'] as U8;
    this.p = proto['p'] as U64;
    this.l = proto['l'] as U64;
    this.r = proto['r'] as U64;
  }

  static IParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : I {
    const proto = $.parseStructProto(data, typeTag, repo, I);
    return new I(proto, typeTag);
  }

}

export class O 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "O";
  static typeParameters: TypeParamDeclType[] = [
    { name: "V", isPhantom: false }
  ];
  static fields: FieldDeclType[] = [
  { name: "k", typeTag: AtomicTypeTag.U128 },
  { name: "v", typeTag: new $.TypeParamIdx(0) },
  { name: "p", typeTag: AtomicTypeTag.U64 }];

  k: U128;
  v: any;
  p: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.k = proto['k'] as U128;
    this.v = proto['v'] as any;
    this.p = proto['p'] as U64;
  }

  static OParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : O {
    const proto = $.parseStructProto(data, typeTag, repo, O);
    return new O(proto, typeTag);
  }

}
// test func
export function b_lo$ (
  b: U8,
  $c: AptosDataCache,
): U128 {
  return u128("1").shl($.copy(b)).xor(HI_128);
}

// test func
export function b_lo_success$ (
  $c: AptosDataCache,
): void {
  if (!b_lo$(u8("0"), $c).eq(HI_128.sub(u128("1")))) {
    throw $.abortCode(u64("0"));
  }
  if (!b_lo$(u8("1"), $c).eq(HI_128.sub(u128("2")))) {
    throw $.abortCode(u64("1"));
  }
  if (!b_lo$(u8("127"), $c).eq(u128("170141183460469231731687303715884105727"))) {
    throw $.abortCode(u64("2"));
  }
  return;
}

export function b_s_o$ (
  cb: CB,
  k: U128,
  $c: AptosDataCache,
  $p: TypeTag[], /* <V>*/
): O {
  let temp$1, i_c, n;
  if (is_out$($.copy(cb.r), $c)) {
    return Std.Vector.borrow$(cb.o, o_v$($.copy(cb.r), $c), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [$p[0]])] as TypeTag[]);
  }
  else{
  }
  n = Std.Vector.borrow$(cb.i, $.copy(cb.r), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]);
  while (true) {
    if (is_set$($.copy(k), $.copy(n.c), $c)) {
      temp$1 = $.copy(n.r);
    }
    else{
      temp$1 = $.copy(n.l);
    }
    i_c = temp$1;
    if (is_out$($.copy(i_c), $c)) {
      return Std.Vector.borrow$(cb.o, o_v$($.copy(i_c), $c), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [$p[0]])] as TypeTag[]);
    }
    else{
    }
    n = Std.Vector.borrow$(cb.i, $.copy(i_c), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]);
  }
}

export function b_s_o_m$ (
  cb: CB,
  k: U128,
  $c: AptosDataCache,
  $p: TypeTag[], /* <V>*/
): O {
  let temp$1, i_c, n;
  if (is_out$($.copy(cb.r), $c)) {
    return Std.Vector.borrow_mut$(cb.o, o_v$($.copy(cb.r), $c), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [$p[0]])] as TypeTag[]);
  }
  else{
  }
  n = Std.Vector.borrow$(cb.i, $.copy(cb.r), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]);
  while (true) {
    if (is_set$($.copy(k), $.copy(n.c), $c)) {
      temp$1 = $.copy(n.r);
    }
    else{
      temp$1 = $.copy(n.l);
    }
    i_c = temp$1;
    if (is_out$($.copy(i_c), $c)) {
      return Std.Vector.borrow_mut$(cb.o, o_v$($.copy(i_c), $c), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [$p[0]])] as TypeTag[]);
    }
    else{
    }
    n = Std.Vector.borrow$(cb.i, $.copy(i_c), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]);
  }
}

export function borrow$ (
  cb: CB,
  k: U128,
  $c: AptosDataCache,
  $p: TypeTag[], /* <V>*/
): any {
  let c_o;
  if (!!is_empty$(cb, $c, [$p[0]] as TypeTag[])) {
    throw $.abortCode(E_BORROW_EMPTY);
  }
  c_o = b_s_o$(cb, $.copy(k), $c, [$p[0]] as TypeTag[]);
  if (!$.copy(c_o.k).eq($.copy(k))) {
    throw $.abortCode(E_NOT_HAS_K);
  }
  return c_o.v;
}

// test func
export function borrow_empty$ (
  $c: AptosDataCache,
): void {
  let cb;
  cb = empty$($c, [AtomicTypeTag.U8] as TypeTag[]);
  borrow$(cb, u128("0"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  destroy_empty$(cb, $c, [AtomicTypeTag.U8] as TypeTag[]);
  return;
}

export function borrow_mut$ (
  cb: CB,
  k: U128,
  $c: AptosDataCache,
  $p: TypeTag[], /* <V>*/
): any {
  let c_o;
  if (!!is_empty$(cb, $c, [$p[0]] as TypeTag[])) {
    throw $.abortCode(E_BORROW_EMPTY);
  }
  c_o = b_s_o_m$(cb, $.copy(k), $c, [$p[0]] as TypeTag[]);
  if (!$.copy(c_o.k).eq($.copy(k))) {
    throw $.abortCode(E_NOT_HAS_K);
  }
  return c_o.v;
}

// test func
export function borrow_mut_empty$ (
  $c: AptosDataCache,
): void {
  let cb;
  cb = empty$($c, [AtomicTypeTag.U8] as TypeTag[]);
  borrow_mut$(cb, u128("0"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  destroy_empty$(cb, $c, [AtomicTypeTag.U8] as TypeTag[]);
  return;
}

// test func
export function borrow_mut_no_match$ (
  $c: AptosDataCache,
): CB {
  let cb;
  cb = singleton$(u128("3"), u8("4"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  borrow_mut$(cb, u128("6"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  return cb;
}

// test func
export function borrow_mut_success$ (
  $c: AptosDataCache,
): CB {
  let temp$1, temp$2, temp$3, temp$4, temp$5, temp$6, temp$7, temp$8, cb;
  cb = empty$($c, [AtomicTypeTag.U8] as TypeTag[]);
  insert$(cb, u128("2"), u8("6"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  insert$(cb, u128("3"), u8("8"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  insert$(cb, u128("1"), u8("9"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  insert$(cb, u128("7"), u8("5"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  $.set(borrow_mut$(cb, u128("1"), $c, [AtomicTypeTag.U8] as TypeTag[]), u8("2"));
  $.set(borrow_mut$(cb, u128("2"), $c, [AtomicTypeTag.U8] as TypeTag[]), u8("4"));
  [temp$1, temp$2] = [cb, u128("2")];
  if (!$.copy(borrow$(temp$1, temp$2, $c, [AtomicTypeTag.U8] as TypeTag[])).eq(u8("4"))) {
    throw $.abortCode(u64("0"));
  }
  [temp$3, temp$4] = [cb, u128("3")];
  if (!$.copy(borrow$(temp$3, temp$4, $c, [AtomicTypeTag.U8] as TypeTag[])).eq(u8("8"))) {
    throw $.abortCode(u64("0"));
  }
  [temp$5, temp$6] = [cb, u128("1")];
  if (!$.copy(borrow$(temp$5, temp$6, $c, [AtomicTypeTag.U8] as TypeTag[])).eq(u8("2"))) {
    throw $.abortCode(u64("0"));
  }
  [temp$7, temp$8] = [cb, u128("7")];
  if (!$.copy(borrow$(temp$7, temp$8, $c, [AtomicTypeTag.U8] as TypeTag[])).eq(u8("5"))) {
    throw $.abortCode(u64("0"));
  }
  return cb;
}

// test func
export function borrow_no_match$ (
  $c: AptosDataCache,
): CB {
  let cb;
  cb = singleton$(u128("3"), u8("4"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  borrow$(cb, u128("6"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  return cb;
}

export function check_len$ (
  l: U64,
  $c: AptosDataCache,
): void {
  if (!$.copy(l).lt(HI_64.xor(OUT.shl(N_TYPE)))) {
    throw $.abortCode(E_INSERT_FULL);
  }
  return;
}

// test func
export function check_len_failure$ (
  $c: AptosDataCache,
): void {
  check_len$(HI_64.xor(OUT.shl(N_TYPE)), $c);
  return;
}

// test func
export function check_len_success$ (
  $c: AptosDataCache,
): void {
  check_len$(u64("0"), $c);
  check_len$(u64("1200"), $c);
  check_len$(HI_64.xor(OUT.shl(N_TYPE)).sub(u64("1")), $c);
  return;
}

export function crit_bit$ (
  s1: U128,
  s2: U128,
  $c: AptosDataCache,
): U8 {
  let l, m, s, u, x;
  x = $.copy(s1).xor($.copy(s2));
  l = u8("0");
  u = MSB_u128;
  while (true) {
    m = $.copy(l).add($.copy(u)).div(u8("2"));
    s = $.copy(x).shr($.copy(m));
    if ($.copy(s).eq(u128("1"))) {
      return $.copy(m);
    }
    else{
    }
    if ($.copy(s).gt(u128("1"))) {
      l = $.copy(m).add(u8("1"));
    }
    else{
      u = $.copy(m).sub(u8("1"));
    }
  }
}

// test func
export function crit_bit_success$ (
  $c: AptosDataCache,
): void {
  let b;
  b = u8("0");
  while ($.copy(b).le(MSB_u128)) {
    {
      if (!crit_bit$(u128("0"), u128("1").shl($.copy(b)), $c).eq($.copy(b))) {
        throw $.abortCode(u64($.copy(b)));
      }
      b = $.copy(b).add(u8("1"));
    }

  }return;
}

export function destroy_empty$ (
  cb: CB,
  $c: AptosDataCache,
  $p: TypeTag[], /* <V>*/
): void {
  if (!is_empty$(cb, $c, [$p[0]] as TypeTag[])) {
    throw $.abortCode(E_DESTROY_NOT_EMPTY);
  }
  let { i: i, o: o } = cb;
  Std.Vector.destroy_empty$(i, $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]);
  Std.Vector.destroy_empty$(o, $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [$p[0]])] as TypeTag[]);
  return;
}

// test func
export function destroy_empty_fail$ (
  $c: AptosDataCache,
): void {
  destroy_empty$(singleton$(u128("0"), u8("0"), $c, [AtomicTypeTag.U8] as TypeTag[]), $c, [AtomicTypeTag.U8] as TypeTag[]);
  return;
}

// test func
export function destroy_empty_success$ (
  $c: AptosDataCache,
): void {
  let cb;
  cb = empty$($c, [AtomicTypeTag.U8] as TypeTag[]);
  destroy_empty$(cb, $c, [AtomicTypeTag.U8] as TypeTag[]);
  return;
}

export function empty$ (
  $c: AptosDataCache,
  $p: TypeTag[], /* <V>*/
): CB {
  return new CB({ r: u64("0"), i: Std.Vector.empty$($c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]), o: Std.Vector.empty$($c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [$p[0]])] as TypeTag[]) }, new StructTag(new HexString("0xc0deb00c"), "CritBit", "CB", [$p[0]]));
}

// test func
export function empty_success$ (
  $c: AptosDataCache,
): [I[], O[]] {
  let { r: r, i: i, o: o } = empty$($c, [AtomicTypeTag.U8] as TypeTag[]);
  if (!Std.Vector.is_empty$(i, $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[])) {
    throw $.abortCode(u64("0"));
  }
  if (!Std.Vector.is_empty$(o, $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])] as TypeTag[])) {
    throw $.abortCode(u64("1"));
  }
  if (!$.copy(r).eq(u64("0"))) {
    throw $.abortCode(u64("0"));
  }
  return [i, o];
}

export function has_key$ (
  cb: CB,
  k: U128,
  $c: AptosDataCache,
  $p: TypeTag[], /* <V>*/
): boolean {
  if (is_empty$(cb, $c, [$p[0]] as TypeTag[])) {
    return false;
  }
  else{
  }
  return $.copy(b_s_o$(cb, $.copy(k), $c, [$p[0]] as TypeTag[]).k).eq($.copy(k));
}

// test func
export function has_key_empty_success$ (
  $c: AptosDataCache,
): void {
  let cb;
  cb = empty$($c, [AtomicTypeTag.U8] as TypeTag[]);
  if (!!has_key$(cb, u128("0"), $c, [AtomicTypeTag.U8] as TypeTag[])) {
    throw $.abortCode(u64("0"));
  }
  destroy_empty$(cb, $c, [AtomicTypeTag.U8] as TypeTag[]);
  return;
}

// test func
export function has_key_singleton$ (
  $c: AptosDataCache,
): CB {
  let cb;
  cb = singleton$(u128("1"), u8("2"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  if (!has_key$(cb, u128("1"), $c, [AtomicTypeTag.U8] as TypeTag[])) {
    throw $.abortCode(u64("0"));
  }
  if (!!has_key$(cb, u128("3"), $c, [AtomicTypeTag.U8] as TypeTag[])) {
    throw $.abortCode(u64("0"));
  }
  return cb;
}

// test func
export function has_key_success$ (
  $c: AptosDataCache,
): CB {
  let cb, v;
  v = u8("0");
  cb = empty$($c, [AtomicTypeTag.U8] as TypeTag[]);
  Std.Vector.push_back$(cb.i, new I({ c: u8("2"), p: ROOT, l: o_c$(u64("0"), $c), r: u64("1") }, new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]);
  Std.Vector.push_back$(cb.i, new I({ c: u8("1"), p: u64("0"), l: o_c$(u64("1"), $c), r: u64("2") }, new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]);
  Std.Vector.push_back$(cb.i, new I({ c: u8("0"), p: u64("1"), l: o_c$(u64("2"), $c), r: o_c$(u64("3"), $c) }, new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]);
  Std.Vector.push_back$(cb.o, new O({ k: u$([u8("48"), u8("48"), u8("49")], $c), v: $.copy(v), p: u64("0") }, new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])] as TypeTag[]);
  Std.Vector.push_back$(cb.o, new O({ k: u$([u8("49"), u8("48"), u8("49")], $c), v: $.copy(v), p: u64("1") }, new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])] as TypeTag[]);
  Std.Vector.push_back$(cb.o, new O({ k: u$([u8("49"), u8("49"), u8("48")], $c), v: $.copy(v), p: u64("2") }, new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])] as TypeTag[]);
  Std.Vector.push_back$(cb.o, new O({ k: u$([u8("49"), u8("49"), u8("49")], $c), v: $.copy(v), p: u64("2") }, new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])] as TypeTag[]);
  if (!has_key$(cb, u$([u8("48"), u8("48"), u8("49")], $c), $c, [AtomicTypeTag.U8] as TypeTag[])) {
    throw $.abortCode(u64("0"));
  }
  if (!has_key$(cb, u$([u8("49"), u8("48"), u8("49")], $c), $c, [AtomicTypeTag.U8] as TypeTag[])) {
    throw $.abortCode(u64("1"));
  }
  if (!has_key$(cb, u$([u8("49"), u8("49"), u8("48")], $c), $c, [AtomicTypeTag.U8] as TypeTag[])) {
    throw $.abortCode(u64("2"));
  }
  if (!has_key$(cb, u$([u8("49"), u8("49"), u8("49")], $c), $c, [AtomicTypeTag.U8] as TypeTag[])) {
    throw $.abortCode(u64("3"));
  }
  if (!!has_key$(cb, u$([u8("48"), u8("49"), u8("49")], $c), $c, [AtomicTypeTag.U8] as TypeTag[])) {
    throw $.abortCode(u64("4"));
  }
  return cb;
}

export function insert$ (
  cb: CB,
  k: U128,
  v: any,
  $c: AptosDataCache,
  $p: TypeTag[], /* <V>*/
): void {
  let l;
  l = length$(cb, $c, [$p[0]] as TypeTag[]);
  check_len$($.copy(l), $c);
  if ($.copy(l).eq(u64("0"))) {
    insert_empty$(cb, $.copy(k), v, $c, [$p[0]] as TypeTag[]);
  }
  else{
    if ($.copy(l).eq(u64("1"))) {
      insert_singleton$(cb, $.copy(k), v, $c, [$p[0]] as TypeTag[]);
    }
    else{
      insert_general$(cb, $.copy(k), v, $.copy(l), $c, [$p[0]] as TypeTag[]);
    }
  }
  return;
}

export function insert_above$ (
  cb: CB,
  k: U128,
  v: any,
  n_o: U64,
  i_n_i: U64,
  i_s_p: U64,
  c: U8,
  $c: AptosDataCache,
  $p: TypeTag[], /* <V>*/
): void {
  let i_n_r, n_r;
  i_n_r = $.copy(Std.Vector.borrow$(cb.i, $.copy(i_s_p), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]).p);
  while (true) {
    if ($.copy(i_n_r).eq(ROOT)) {
      return insert_above_root$(cb, $.copy(k), v, $.copy(n_o), $.copy(i_n_i), $.copy(c), $c, [$p[0]] as TypeTag[]);
    }
    else{
      n_r = Std.Vector.borrow_mut$(cb.i, $.copy(i_n_r), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]);
      if ($.copy(c).lt($.copy(n_r.c))) {
        return insert_below_walk$(cb, $.copy(k), v, $.copy(n_o), $.copy(i_n_i), $.copy(i_n_r), $.copy(c), $c, [$p[0]] as TypeTag[]);
      }
      else{
        i_n_r = $.copy(n_r.p);
      }
    }
  }
}

export function insert_above_root$ (
  cb: CB,
  k: U128,
  v: any,
  n_o: U64,
  i_n_i: U64,
  c: U8,
  $c: AptosDataCache,
  $p: TypeTag[], /* <V>*/
): void {
  let i_o_r;
  i_o_r = $.copy(cb.r);
  Std.Vector.borrow_mut$(cb.i, $.copy(i_o_r), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]).p = $.copy(i_n_i);
  cb.r = $.copy(i_n_i);
  push_back_insert_nodes$(cb, $.copy(k), v, $.copy(i_n_i), $.copy(c), ROOT, is_set$($.copy(k), $.copy(c), $c), $.copy(i_o_r), o_c$($.copy(n_o), $c), $c, [$p[0]] as TypeTag[]);
  return;
}

export function insert_below$ (
  cb: CB,
  k: U128,
  v: any,
  n_o: U64,
  i_n_i: U64,
  i_s_o: U64,
  s_s_o: boolean,
  k_s_o: U128,
  i_s_p: U64,
  c: U8,
  $c: AptosDataCache,
  $p: TypeTag[], /* <V>*/
): void {
  let s_p;
  s_p = Std.Vector.borrow_mut$(cb.i, $.copy(i_s_p), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]);
  if ((s_s_o == L)) {
    s_p.l = $.copy(i_n_i);
  }
  else{
    s_p.r = $.copy(i_n_i);
  }
  Std.Vector.borrow_mut$(cb.o, o_v$($.copy(i_s_o), $c), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [$p[0]])] as TypeTag[]).p = $.copy(i_n_i);
  push_back_insert_nodes$(cb, $.copy(k), v, $.copy(i_n_i), $.copy(c), $.copy(i_s_p), $.copy(k).lt($.copy(k_s_o)), o_c$($.copy(n_o), $c), $.copy(i_s_o), $c, [$p[0]] as TypeTag[]);
  return;
}

export function insert_below_walk$ (
  cb: CB,
  k: U128,
  v: any,
  n_o: U64,
  i_n_i: U64,
  i_n_r: U64,
  c: U8,
  $c: AptosDataCache,
  $p: TypeTag[], /* <V>*/
): void {
  let temp$1, temp$2, i_w_c, n_r, s_w_c;
  n_r = Std.Vector.borrow_mut$(cb.i, $.copy(i_n_r), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]);
  if (is_set$($.copy(k), $.copy(n_r.c), $c)) {
    [temp$1, temp$2] = [R, $.copy(n_r.r)];
  }
  else{
    [temp$1, temp$2] = [L, $.copy(n_r.l)];
  }
  [s_w_c, i_w_c] = [temp$1, temp$2];
  if ((s_w_c == L)) {
    n_r.l = $.copy(i_n_i);
  }
  else{
    n_r.r = $.copy(i_n_i);
  }
  Std.Vector.borrow_mut$(cb.i, $.copy(i_w_c), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]).p = $.copy(i_n_i);
  push_back_insert_nodes$(cb, $.copy(k), v, $.copy(i_n_i), $.copy(c), $.copy(i_n_r), is_set$($.copy(k), $.copy(c), $c), $.copy(i_w_c), o_c$($.copy(n_o), $c), $c, [$p[0]] as TypeTag[]);
  return;
}

export function insert_empty$ (
  cb: CB,
  k: U128,
  v: any,
  $c: AptosDataCache,
  $p: TypeTag[], /* <V>*/
): void {
  Std.Vector.push_back$(cb.o, new O({ k: $.copy(k), v: v, p: ROOT }, new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [$p[0]])), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [$p[0]])] as TypeTag[]);
  cb.r = OUT.shl(N_TYPE);
  return;
}

export function insert_general$ (
  cb: CB,
  k: U128,
  v: any,
  n_o: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <V>*/
): void {
  let temp$1, temp$2, c, i_n_i, i_s_o, i_s_p, k_s_o, s_p_c, s_s_o;
  i_n_i = Std.Vector.length$(cb.i, $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]);
  [temp$1, temp$2] = [cb, $.copy(k)];
  [i_s_o, s_s_o, k_s_o, i_s_p, s_p_c] = search_outer$(temp$1, temp$2, $c, [$p[0]] as TypeTag[]);
  if (!$.copy(k_s_o).neq($.copy(k))) {
    throw $.abortCode(E_HAS_K);
  }
  c = crit_bit$($.copy(k_s_o), $.copy(k), $c);
  if ($.copy(c).lt($.copy(s_p_c))) {
    insert_below$(cb, $.copy(k), v, $.copy(n_o), $.copy(i_n_i), $.copy(i_s_o), s_s_o, $.copy(k_s_o), $.copy(i_s_p), $.copy(c), $c, [$p[0]] as TypeTag[]);
  }
  else{
    insert_above$(cb, $.copy(k), v, $.copy(n_o), $.copy(i_n_i), $.copy(i_s_p), $.copy(c), $c, [$p[0]] as TypeTag[]);
  }
  return;
}

// test func
export function insert_general_failure$ (
  $c: AptosDataCache,
): CB {
  let cb;
  cb = singleton$(u128("3"), u8("4"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  insert_singleton$(cb, u128("5"), u8("6"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  insert_general$(cb, u128("5"), u8("7"), u64("2"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  return cb;
}

export function insert_singleton$ (
  cb: CB,
  k: U128,
  v: any,
  $c: AptosDataCache,
  $p: TypeTag[], /* <V>*/
): void {
  let c, n;
  n = Std.Vector.borrow$(cb.o, u64("0"), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [$p[0]])] as TypeTag[]);
  if (!$.copy(k).neq($.copy(n.k))) {
    throw $.abortCode(E_HAS_K);
  }
  c = crit_bit$($.copy(n.k), $.copy(k), $c);
  push_back_insert_nodes$(cb, $.copy(k), v, u64("0"), $.copy(c), ROOT, $.copy(k).gt($.copy(n.k)), o_c$(u64("0"), $c), o_c$(u64("1"), $c), $c, [$p[0]] as TypeTag[]);
  cb.r = u64("0");
  Std.Vector.borrow_mut$(cb.o, u64("0"), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [$p[0]])] as TypeTag[]).p = u64("0");
  return;
}

// test func
export function insert_singleton_failure$ (
  $c: AptosDataCache,
): CB {
  let cb;
  cb = singleton$(u128("1"), u8("2"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  insert_singleton$(cb, u128("1"), u8("5"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  return cb;
}

// test func
export function insert_singleton_success_l$ (
  $c: AptosDataCache,
): CB {
  let temp$1, temp$2, temp$3, temp$4, temp$5, temp$6, temp$7, cb, i, n_o, o_o;
  cb = singleton$(u$([u8("49"), u8("49"), u8("49"), u8("49")], $c), u8("4"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  insert_singleton$(cb, u$([u8("49"), u8("49"), u8("48"), u8("49")], $c), u8("5"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  if (!$.copy(cb.r).eq(u64("0"))) {
    throw $.abortCode(u64("0"));
  }
  i = Std.Vector.borrow$(cb.i, u64("0"), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]);
  if ($.copy(i.c).eq(u8("1"))) {
    temp$1 = $.copy(i.p).eq(ROOT);
  }
  else{
    temp$1 = false;
  }
  if (temp$1) {
    temp$2 = $.copy(i.l).eq(o_c$(u64("1"), $c));
  }
  else{
    temp$2 = false;
  }
  if (temp$2) {
    temp$3 = $.copy(i.r).eq(o_c$(u64("0"), $c));
  }
  else{
    temp$3 = false;
  }
  if (!temp$3) {
    throw $.abortCode(u64("1"));
  }
  o_o = Std.Vector.borrow$(cb.o, u64("0"), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])] as TypeTag[]);
  if ($.copy(o_o.k).eq(u$([u8("49"), u8("49"), u8("49"), u8("49")], $c))) {
    temp$4 = $.copy(o_o.v).eq(u8("4"));
  }
  else{
    temp$4 = false;
  }
  if (temp$4) {
    temp$5 = $.copy(o_o.p).eq(u64("0"));
  }
  else{
    temp$5 = false;
  }
  if (!temp$5) {
    throw $.abortCode(u64("2"));
  }
  n_o = Std.Vector.borrow$(cb.o, u64("1"), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])] as TypeTag[]);
  if ($.copy(n_o.k).eq(u$([u8("49"), u8("49"), u8("48"), u8("49")], $c))) {
    temp$6 = $.copy(n_o.v).eq(u8("5"));
  }
  else{
    temp$6 = false;
  }
  if (temp$6) {
    temp$7 = $.copy(n_o.p).eq(u64("0"));
  }
  else{
    temp$7 = false;
  }
  if (!temp$7) {
    throw $.abortCode(u64("3"));
  }
  return cb;
}

// test func
export function insert_singleton_success_r$ (
  $c: AptosDataCache,
): CB {
  let temp$1, temp$2, temp$3, temp$4, temp$5, temp$6, temp$7, cb, i, n_o, o_o;
  cb = singleton$(u$([u8("49"), u8("48"), u8("49"), u8("49")], $c), u8("6"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  insert_singleton$(cb, u$([u8("49"), u8("49"), u8("49"), u8("49")], $c), u8("7"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  if (!$.copy(cb.r).eq(u64("0"))) {
    throw $.abortCode(u64("0"));
  }
  i = Std.Vector.borrow$(cb.i, u64("0"), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]);
  if ($.copy(i.c).eq(u8("2"))) {
    temp$1 = $.copy(i.p).eq(ROOT);
  }
  else{
    temp$1 = false;
  }
  if (temp$1) {
    temp$2 = $.copy(i.l).eq(o_c$(u64("0"), $c));
  }
  else{
    temp$2 = false;
  }
  if (temp$2) {
    temp$3 = $.copy(i.r).eq(o_c$(u64("1"), $c));
  }
  else{
    temp$3 = false;
  }
  if (!temp$3) {
    throw $.abortCode(u64("1"));
  }
  o_o = Std.Vector.borrow$(cb.o, u64("0"), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])] as TypeTag[]);
  if ($.copy(o_o.k).eq(u$([u8("49"), u8("48"), u8("49"), u8("49")], $c))) {
    temp$4 = $.copy(o_o.v).eq(u8("6"));
  }
  else{
    temp$4 = false;
  }
  if (temp$4) {
    temp$5 = $.copy(o_o.p).eq(u64("0"));
  }
  else{
    temp$5 = false;
  }
  if (!temp$5) {
    throw $.abortCode(u64("2"));
  }
  n_o = Std.Vector.borrow$(cb.o, u64("1"), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])] as TypeTag[]);
  if ($.copy(n_o.k).eq(u$([u8("49"), u8("49"), u8("49"), u8("49")], $c))) {
    temp$6 = $.copy(n_o.v).eq(u8("7"));
  }
  else{
    temp$6 = false;
  }
  if (temp$6) {
    temp$7 = $.copy(o_o.p).eq(u64("0"));
  }
  else{
    temp$7 = false;
  }
  if (!temp$7) {
    throw $.abortCode(u64("3"));
  }
  return cb;
}

// test func
export function insert_success_1$ (
  $c: AptosDataCache,
): CB {
  let temp$1, temp$10, temp$11, temp$13, temp$14, temp$15, temp$16, temp$17, temp$19, temp$2, temp$20, temp$22, temp$23, temp$25, temp$26, temp$28, temp$29, temp$3, temp$5, temp$6, temp$7, temp$9, cb, i, i__12, i__4, i__8, o, o__18, o__21, o__24, o__27;
  cb = empty$($c, [AtomicTypeTag.U8] as TypeTag[]);
  insert$(cb, u$([u8("49"), u8("49"), u8("48"), u8("49")], $c), u8("0"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  insert$(cb, u$([u8("49"), u8("48"), u8("48"), u8("48")], $c), u8("1"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  insert$(cb, u$([u8("49"), u8("49"), u8("48"), u8("48")], $c), u8("2"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  insert$(cb, u$([u8("49"), u8("49"), u8("49"), u8("48")], $c), u8("3"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  insert$(cb, u$([u8("48"), u8("48"), u8("48"), u8("48")], $c), u8("4"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  if (!$.copy(cb.r).eq(u64("3"))) {
    throw $.abortCode(u64("0"));
  }
  i = Std.Vector.borrow$(cb.i, u64("0"), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]);
  if ($.copy(i.c).eq(u8("2"))) {
    temp$1 = $.copy(i.p).eq(u64("3"));
  }
  else{
    temp$1 = false;
  }
  if (temp$1) {
    temp$2 = $.copy(i.l).eq(o_c$(u64("1"), $c));
  }
  else{
    temp$2 = false;
  }
  if (temp$2) {
    temp$3 = $.copy(i.r).eq(u64("2"));
  }
  else{
    temp$3 = false;
  }
  if (!temp$3) {
    throw $.abortCode(u64("1"));
  }
  i__4 = Std.Vector.borrow$(cb.i, u64("1"), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]);
  if ($.copy(i__4.c).eq(u8("0"))) {
    temp$5 = $.copy(i__4.p).eq(u64("2"));
  }
  else{
    temp$5 = false;
  }
  if (temp$5) {
    temp$6 = $.copy(i__4.l).eq(o_c$(u64("2"), $c));
  }
  else{
    temp$6 = false;
  }
  if (temp$6) {
    temp$7 = $.copy(i__4.r).eq(o_c$(u64("0"), $c));
  }
  else{
    temp$7 = false;
  }
  if (!temp$7) {
    throw $.abortCode(u64("2"));
  }
  i__8 = Std.Vector.borrow$(cb.i, u64("2"), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]);
  if ($.copy(i__8.c).eq(u8("1"))) {
    temp$9 = $.copy(i__8.p).eq(u64("0"));
  }
  else{
    temp$9 = false;
  }
  if (temp$9) {
    temp$10 = $.copy(i__8.l).eq(u64("1"));
  }
  else{
    temp$10 = false;
  }
  if (temp$10) {
    temp$11 = $.copy(i__8.r).eq(o_c$(u64("3"), $c));
  }
  else{
    temp$11 = false;
  }
  if (!temp$11) {
    throw $.abortCode(u64("3"));
  }
  i__12 = Std.Vector.borrow$(cb.i, u64("3"), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]);
  if ($.copy(i__12.c).eq(u8("3"))) {
    temp$13 = $.copy(i__12.p).eq(ROOT);
  }
  else{
    temp$13 = false;
  }
  if (temp$13) {
    temp$14 = $.copy(i__12.l).eq(o_c$(u64("4"), $c));
  }
  else{
    temp$14 = false;
  }
  if (temp$14) {
    temp$15 = $.copy(i__12.r).eq(u64("0"));
  }
  else{
    temp$15 = false;
  }
  if (!temp$15) {
    throw $.abortCode(u64("4"));
  }
  o = Std.Vector.borrow$(cb.o, u64("0"), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])] as TypeTag[]);
  if ($.copy(o.k).eq(u$([u8("49"), u8("49"), u8("48"), u8("49")], $c))) {
    temp$16 = $.copy(o.v).eq(u8("0"));
  }
  else{
    temp$16 = false;
  }
  if (temp$16) {
    temp$17 = $.copy(o.p).eq(u64("1"));
  }
  else{
    temp$17 = false;
  }
  if (!temp$17) {
    throw $.abortCode(u64("5"));
  }
  o__18 = Std.Vector.borrow$(cb.o, u64("1"), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])] as TypeTag[]);
  if ($.copy(o__18.k).eq(u$([u8("49"), u8("48"), u8("48"), u8("48")], $c))) {
    temp$19 = $.copy(o__18.v).eq(u8("1"));
  }
  else{
    temp$19 = false;
  }
  if (temp$19) {
    temp$20 = $.copy(o__18.p).eq(u64("0"));
  }
  else{
    temp$20 = false;
  }
  if (!temp$20) {
    throw $.abortCode(u64("6"));
  }
  o__21 = Std.Vector.borrow$(cb.o, u64("2"), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])] as TypeTag[]);
  if ($.copy(o__21.k).eq(u$([u8("49"), u8("49"), u8("48"), u8("48")], $c))) {
    temp$22 = $.copy(o__21.v).eq(u8("2"));
  }
  else{
    temp$22 = false;
  }
  if (temp$22) {
    temp$23 = $.copy(o__21.p).eq(u64("1"));
  }
  else{
    temp$23 = false;
  }
  if (!temp$23) {
    throw $.abortCode(u64("7"));
  }
  o__24 = Std.Vector.borrow$(cb.o, u64("3"), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])] as TypeTag[]);
  if ($.copy(o__24.k).eq(u$([u8("49"), u8("49"), u8("49"), u8("48")], $c))) {
    temp$25 = $.copy(o__24.v).eq(u8("3"));
  }
  else{
    temp$25 = false;
  }
  if (temp$25) {
    temp$26 = $.copy(o__24.p).eq(u64("2"));
  }
  else{
    temp$26 = false;
  }
  if (!temp$26) {
    throw $.abortCode(u64("8"));
  }
  o__27 = Std.Vector.borrow$(cb.o, u64("4"), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])] as TypeTag[]);
  if ($.copy(o__27.k).eq(u$([u8("48"), u8("48"), u8("48"), u8("48")], $c))) {
    temp$28 = $.copy(o__27.v).eq(u8("4"));
  }
  else{
    temp$28 = false;
  }
  if (temp$28) {
    temp$29 = $.copy(o__27.p).eq(u64("3"));
  }
  else{
    temp$29 = false;
  }
  if (!temp$29) {
    throw $.abortCode(u64("9"));
  }
  return cb;
}

// test func
export function insert_success_2$ (
  $c: AptosDataCache,
): CB {
  let temp$1, temp$10, temp$11, temp$13, temp$14, temp$15, temp$16, temp$17, temp$19, temp$2, temp$20, temp$22, temp$23, temp$25, temp$26, temp$28, temp$29, temp$3, temp$5, temp$6, temp$7, temp$9, cb, i, i__12, i__4, i__8, o, o__18, o__21, o__24, o__27;
  cb = empty$($c, [AtomicTypeTag.U8] as TypeTag[]);
  insert$(cb, u$([u8("48"), u8("49"), u8("48"), u8("49")], $c), u8("0"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  insert$(cb, u$([u8("48"), u8("48"), u8("48"), u8("48")], $c), u8("1"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  insert$(cb, u$([u8("48"), u8("48"), u8("48"), u8("49")], $c), u8("2"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  insert$(cb, u$([u8("49"), u8("48"), u8("48"), u8("48")], $c), u8("3"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  insert$(cb, u$([u8("48"), u8("48"), u8("49"), u8("49")], $c), u8("4"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  if (!$.copy(cb.r).eq(u64("2"))) {
    throw $.abortCode(u64("0"));
  }
  i = Std.Vector.borrow$(cb.i, u64("0"), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]);
  if ($.copy(i.c).eq(u8("2"))) {
    temp$1 = $.copy(i.p).eq(u64("2"));
  }
  else{
    temp$1 = false;
  }
  if (temp$1) {
    temp$2 = $.copy(i.l).eq(u64("3"));
  }
  else{
    temp$2 = false;
  }
  if (temp$2) {
    temp$3 = $.copy(i.r).eq(o_c$(u64("0"), $c));
  }
  else{
    temp$3 = false;
  }
  if (!temp$3) {
    throw $.abortCode(u64("1"));
  }
  i__4 = Std.Vector.borrow$(cb.i, u64("1"), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]);
  if ($.copy(i__4.c).eq(u8("0"))) {
    temp$5 = $.copy(i__4.p).eq(u64("3"));
  }
  else{
    temp$5 = false;
  }
  if (temp$5) {
    temp$6 = $.copy(i__4.l).eq(o_c$(u64("1"), $c));
  }
  else{
    temp$6 = false;
  }
  if (temp$6) {
    temp$7 = $.copy(i__4.r).eq(o_c$(u64("2"), $c));
  }
  else{
    temp$7 = false;
  }
  if (!temp$7) {
    throw $.abortCode(u64("2"));
  }
  i__8 = Std.Vector.borrow$(cb.i, u64("2"), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]);
  if ($.copy(i__8.c).eq(u8("3"))) {
    temp$9 = $.copy(i__8.p).eq(ROOT);
  }
  else{
    temp$9 = false;
  }
  if (temp$9) {
    temp$10 = $.copy(i__8.l).eq(u64("0"));
  }
  else{
    temp$10 = false;
  }
  if (temp$10) {
    temp$11 = $.copy(i__8.r).eq(o_c$(u64("3"), $c));
  }
  else{
    temp$11 = false;
  }
  if (!temp$11) {
    throw $.abortCode(u64("3"));
  }
  i__12 = Std.Vector.borrow$(cb.i, u64("3"), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]);
  if ($.copy(i__12.c).eq(u8("1"))) {
    temp$13 = $.copy(i__12.p).eq(u64("0"));
  }
  else{
    temp$13 = false;
  }
  if (temp$13) {
    temp$14 = $.copy(i__12.l).eq(u64("1"));
  }
  else{
    temp$14 = false;
  }
  if (temp$14) {
    temp$15 = $.copy(i__12.r).eq(o_c$(u64("4"), $c));
  }
  else{
    temp$15 = false;
  }
  if (!temp$15) {
    throw $.abortCode(u64("4"));
  }
  o = Std.Vector.borrow$(cb.o, u64("0"), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])] as TypeTag[]);
  if ($.copy(o.k).eq(u$([u8("48"), u8("49"), u8("48"), u8("49")], $c))) {
    temp$16 = $.copy(o.v).eq(u8("0"));
  }
  else{
    temp$16 = false;
  }
  if (temp$16) {
    temp$17 = $.copy(o.p).eq(u64("0"));
  }
  else{
    temp$17 = false;
  }
  if (!temp$17) {
    throw $.abortCode(u64("5"));
  }
  o__18 = Std.Vector.borrow$(cb.o, u64("1"), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])] as TypeTag[]);
  if ($.copy(o__18.k).eq(u$([u8("48"), u8("48"), u8("48"), u8("48")], $c))) {
    temp$19 = $.copy(o__18.v).eq(u8("1"));
  }
  else{
    temp$19 = false;
  }
  if (temp$19) {
    temp$20 = $.copy(o__18.p).eq(u64("1"));
  }
  else{
    temp$20 = false;
  }
  if (!temp$20) {
    throw $.abortCode(u64("6"));
  }
  o__21 = Std.Vector.borrow$(cb.o, u64("2"), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])] as TypeTag[]);
  if ($.copy(o__21.k).eq(u$([u8("48"), u8("48"), u8("48"), u8("49")], $c))) {
    temp$22 = $.copy(o__21.v).eq(u8("2"));
  }
  else{
    temp$22 = false;
  }
  if (temp$22) {
    temp$23 = $.copy(o__21.p).eq(u64("1"));
  }
  else{
    temp$23 = false;
  }
  if (!temp$23) {
    throw $.abortCode(u64("7"));
  }
  o__24 = Std.Vector.borrow$(cb.o, u64("3"), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])] as TypeTag[]);
  if ($.copy(o__24.k).eq(u$([u8("49"), u8("48"), u8("48"), u8("48")], $c))) {
    temp$25 = $.copy(o__24.v).eq(u8("3"));
  }
  else{
    temp$25 = false;
  }
  if (temp$25) {
    temp$26 = $.copy(o__24.p).eq(u64("2"));
  }
  else{
    temp$26 = false;
  }
  if (!temp$26) {
    throw $.abortCode(u64("8"));
  }
  o__27 = Std.Vector.borrow$(cb.o, u64("4"), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])] as TypeTag[]);
  if ($.copy(o__27.k).eq(u$([u8("48"), u8("48"), u8("49"), u8("49")], $c))) {
    temp$28 = $.copy(o__27.v).eq(u8("4"));
  }
  else{
    temp$28 = false;
  }
  if (temp$28) {
    temp$29 = $.copy(o__27.p).eq(u64("3"));
  }
  else{
    temp$29 = false;
  }
  if (!temp$29) {
    throw $.abortCode(u64("9"));
  }
  return cb;
}

export function is_empty$ (
  cb: CB,
  $c: AptosDataCache,
  $p: TypeTag[], /* <V>*/
): boolean {
  return Std.Vector.is_empty$(cb.o, $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [$p[0]])] as TypeTag[]);
}

// test func
export function is_empty_success$ (
  $c: AptosDataCache,
): CB {
  let cb;
  cb = empty$($c, [AtomicTypeTag.U8] as TypeTag[]);
  if (!is_empty$(cb, $c, [AtomicTypeTag.U8] as TypeTag[])) {
    throw $.abortCode(u64("0"));
  }
  insert_empty$(cb, u128("1"), u8("2"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  if (!!is_empty$(cb, $c, [AtomicTypeTag.U8] as TypeTag[])) {
    throw $.abortCode(u64("0"));
  }
  return cb;
}

export function is_out$ (
  i: U64,
  $c: AptosDataCache,
): boolean {
  return $.copy(i).shr(N_TYPE).and(OUT).eq(OUT);
}

// test func
export function is_out_success$ (
  $c: AptosDataCache,
): void {
  if (!is_out$(OUT.shl(N_TYPE), $c)) {
    throw $.abortCode(u64("0"));
  }
  if (!!is_out$(u64("0"), $c)) {
    throw $.abortCode(u64("1"));
  }
  return;
}

export function is_set$ (
  k: U128,
  b: U8,
  $c: AptosDataCache,
): boolean {
  return $.copy(k).shr($.copy(b)).and(u128("1")).eq(u128("1"));
}

// test func
export function is_set_success$ (
  $c: AptosDataCache,
): void {
  let temp$1, temp$2;
  if (is_set$(u$([u8("49"), u8("49")], $c), u8("0"), $c)) {
    temp$1 = is_set$(u$([u8("49"), u8("49")], $c), u8("1"), $c);
  }
  else{
    temp$1 = false;
  }
  if (!temp$1) {
    throw $.abortCode(u64("0"));
  }
  if (!is_set$(u$([u8("49"), u8("48")], $c), u8("0"), $c)) {
    temp$2 = !is_set$(u$([u8("48"), u8("49")], $c), u8("1"), $c);
  }
  else{
    temp$2 = false;
  }
  if (!temp$2) {
    throw $.abortCode(u64("1"));
  }
  return;
}

export function length$ (
  cb: CB,
  $c: AptosDataCache,
  $p: TypeTag[], /* <V>*/
): U64 {
  return Std.Vector.length$(cb.o, $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [$p[0]])] as TypeTag[]);
}

// test func
export function length_success$ (
  $c: AptosDataCache,
): CB {
  let cb;
  cb = empty$($c, [AtomicTypeTag.U8] as TypeTag[]);
  if (!length$(cb, $c, [AtomicTypeTag.U8] as TypeTag[]).eq(u64("0"))) {
    throw $.abortCode(u64("0"));
  }
  insert$(cb, u128("1"), u8("2"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  if (!length$(cb, $c, [AtomicTypeTag.U8] as TypeTag[]).eq(u64("1"))) {
    throw $.abortCode(u64("1"));
  }
  insert$(cb, u128("3"), u8("4"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  if (!length$(cb, $c, [AtomicTypeTag.U8] as TypeTag[]).eq(u64("2"))) {
    throw $.abortCode(u64("2"));
  }
  return cb;
}

export function max_key$ (
  cb: CB,
  $c: AptosDataCache,
  $p: TypeTag[], /* <V>*/
): U128 {
  if (!!is_empty$(cb, $c, [$p[0]] as TypeTag[])) {
    throw $.abortCode(E_LOOKUP_EMPTY);
  }
  return $.copy(Std.Vector.borrow$(cb.o, o_v$(max_node_c_i$(cb, $c, [$p[0]] as TypeTag[]), $c), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [$p[0]])] as TypeTag[]).k);
}

// test func
export function max_key_failure_empty$ (
  $c: AptosDataCache,
): void {
  let cb;
  cb = empty$($c, [AtomicTypeTag.U8] as TypeTag[]);
  max_key$(cb, $c, [AtomicTypeTag.U8] as TypeTag[]);
  destroy_empty$(cb, $c, [AtomicTypeTag.U8] as TypeTag[]);
  return;
}

// test func
export function max_key_success$ (
  $c: AptosDataCache,
): CB {
  let cb;
  cb = singleton$(u128("3"), u8("5"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  if (!max_key$(cb, $c, [AtomicTypeTag.U8] as TypeTag[]).eq(u128("3"))) {
    throw $.abortCode(u64("0"));
  }
  insert$(cb, u128("2"), u8("7"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  insert$(cb, u128("5"), u8("8"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  insert$(cb, u128("4"), u8("6"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  if (!max_key$(cb, $c, [AtomicTypeTag.U8] as TypeTag[]).eq(u128("5"))) {
    throw $.abortCode(u64("0"));
  }
  return cb;
}

export function max_node_c_i$ (
  cb: CB,
  $c: AptosDataCache,
  $p: TypeTag[], /* <V>*/
): U64 {
  let i_n;
  i_n = $.copy(cb.r);
  while (true) {
    if (is_out$($.copy(i_n), $c)) {
      return $.copy(i_n);
    }
    else{
    }
    i_n = $.copy(Std.Vector.borrow$(cb.i, $.copy(i_n), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]).r);
  }
}

export function min_key$ (
  cb: CB,
  $c: AptosDataCache,
  $p: TypeTag[], /* <V>*/
): U128 {
  if (!!is_empty$(cb, $c, [$p[0]] as TypeTag[])) {
    throw $.abortCode(E_LOOKUP_EMPTY);
  }
  return $.copy(Std.Vector.borrow$(cb.o, o_v$(min_node_c_i$(cb, $c, [$p[0]] as TypeTag[]), $c), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [$p[0]])] as TypeTag[]).k);
}

// test func
export function min_key_failure_empty$ (
  $c: AptosDataCache,
): void {
  let cb;
  cb = empty$($c, [AtomicTypeTag.U8] as TypeTag[]);
  min_key$(cb, $c, [AtomicTypeTag.U8] as TypeTag[]);
  destroy_empty$(cb, $c, [AtomicTypeTag.U8] as TypeTag[]);
  return;
}

// test func
export function min_key_success$ (
  $c: AptosDataCache,
): CB {
  let cb;
  cb = singleton$(u128("3"), u8("5"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  if (!min_key$(cb, $c, [AtomicTypeTag.U8] as TypeTag[]).eq(u128("3"))) {
    throw $.abortCode(u64("0"));
  }
  insert$(cb, u128("2"), u8("7"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  insert$(cb, u128("5"), u8("8"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  insert$(cb, u128("1"), u8("6"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  if (!min_key$(cb, $c, [AtomicTypeTag.U8] as TypeTag[]).eq(u128("1"))) {
    throw $.abortCode(u64("0"));
  }
  return cb;
}

export function min_node_c_i$ (
  cb: CB,
  $c: AptosDataCache,
  $p: TypeTag[], /* <V>*/
): U64 {
  let i_n;
  i_n = $.copy(cb.r);
  while (true) {
    if (is_out$($.copy(i_n), $c)) {
      return $.copy(i_n);
    }
    else{
    }
    i_n = $.copy(Std.Vector.borrow$(cb.i, $.copy(i_n), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]).l);
  }
}

export function o_c$ (
  v: U64,
  $c: AptosDataCache,
): U64 {
  return $.copy(v).or(OUT.shl(N_TYPE));
}

export function o_v$ (
  c: U64,
  $c: AptosDataCache,
): U64 {
  return $.copy(c).and(HI_64).xor(OUT.shl(N_TYPE));
}

// test func
export function o_v_success$ (
  $c: AptosDataCache,
): void {
  if (!o_v$(OUT.shl(N_TYPE), $c).eq(u64("0"))) {
    throw $.abortCode(u64("0"));
  }
  if (!o_v$(OUT.shl(N_TYPE).or(u64("123")), $c).eq(u64("123"))) {
    throw $.abortCode(u64("1"));
  }
  return;
}

// test func
export function out_c_success$ (
  $c: AptosDataCache,
): void {
  if (!o_c$(u64("0"), $c).eq(OUT.shl(N_TYPE))) {
    throw $.abortCode(u64("0"));
  }
  if (!o_c$(u64("123"), $c).eq(OUT.shl(N_TYPE).or(u64("123")))) {
    throw $.abortCode(u64("1"));
  }
  return;
}

export function pop$ (
  cb: CB,
  k: U128,
  $c: AptosDataCache,
  $p: TypeTag[], /* <V>*/
): any {
  let temp$1, l;
  if (!!is_empty$(cb, $c, [$p[0]] as TypeTag[])) {
    throw $.abortCode(E_POP_EMPTY);
  }
  l = length$(cb, $c, [$p[0]] as TypeTag[]);
  if ($.copy(l).eq(u64("1"))) {
    temp$1 = pop_singleton$(cb, $.copy(k), $c, [$p[0]] as TypeTag[]);
  }
  else{
    temp$1 = pop_general$(cb, $.copy(k), $.copy(l), $c, [$p[0]] as TypeTag[]);
  }
  return temp$1;
}

export function pop_destroy_nodes$ (
  cb: CB,
  i_i: U64,
  i_o: U64,
  n_o: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <V>*/
): any {
  let n_i;
  n_i = Std.Vector.length$(cb.i, $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]);
  Std.Vector.swap_remove$(cb.i, $.copy(i_i), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]);
  if ($.copy(i_i).lt($.copy(n_i).sub(u64("1")))) {
    stitch_swap_remove$(cb, $.copy(i_i), $.copy(n_i), $c, [$p[0]] as TypeTag[]);
  }
  else{
  }
  let { v: v } = Std.Vector.swap_remove$(cb.o, o_v$($.copy(i_o), $c), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [$p[0]])] as TypeTag[]);
  if (o_v$($.copy(i_o), $c).lt($.copy(n_o).sub(u64("1")))) {
    stitch_swap_remove$(cb, $.copy(i_o), $.copy(n_o), $c, [$p[0]] as TypeTag[]);
  }
  else{
  }
  return v;
}

// test func
export function pop_failure_empty$ (
  $c: AptosDataCache,
): void {
  let cb;
  cb = empty$($c, [AtomicTypeTag.U8] as TypeTag[]);
  pop$(cb, u128("3"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  destroy_empty$(cb, $c, [AtomicTypeTag.U8] as TypeTag[]);
  return;
}

export function pop_general$ (
  cb: CB,
  k: U128,
  n_o: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <V>*/
): any {
  let temp$1, temp$2, i_s_o, i_s_p, k_s_o, s_s_o;
  [temp$1, temp$2] = [cb, $.copy(k)];
  [i_s_o, s_s_o, k_s_o, i_s_p, ] = search_outer$(temp$1, temp$2, $c, [$p[0]] as TypeTag[]);
  if (!$.copy(k_s_o).eq($.copy(k))) {
    throw $.abortCode(E_NOT_HAS_K);
  }
  pop_update_relationships$(cb, s_s_o, $.copy(i_s_p), $c, [$p[0]] as TypeTag[]);
  return pop_destroy_nodes$(cb, $.copy(i_s_p), $.copy(i_s_o), $.copy(n_o), $c, [$p[0]] as TypeTag[]);
}

// test func
export function pop_general_failure_no_key$ (
  $c: AptosDataCache,
): CB {
  let cb;
  cb = singleton$(u128("1"), u8("7"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  insert$(cb, u128("2"), u8("8"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  pop$(cb, u128("3"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  return cb;
}

// test func
export function pop_general_success_1$ (
  $c: AptosDataCache,
): CB {
  let temp$1, temp$10, temp$11, temp$12, temp$13, temp$2, temp$3, temp$4, temp$5, temp$6, temp$7, temp$8, temp$9, cb, o_l, o_r, r;
  cb = singleton$(u$([u8("49"), u8("49"), u8("49")], $c), u8("7"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  insert$(cb, u$([u8("49"), u8("48"), u8("49")], $c), u8("8"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  insert$(cb, u$([u8("48"), u8("48"), u8("49")], $c), u8("9"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  if (!pop_general$(cb, u$([u8("49"), u8("49"), u8("49")], $c), u64("3"), $c, [AtomicTypeTag.U8] as TypeTag[]).eq(u8("7"))) {
    throw $.abortCode(u64("0"));
  }
  if (!$.copy(cb.r).eq(u64("0"))) {
    throw $.abortCode(u64("1"));
  }
  [temp$1, temp$2] = [cb.i, u64("0")];
  r = Std.Vector.borrow$(temp$1, temp$2, $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]);
  if ($.copy(r.c).eq(u8("2"))) {
    temp$3 = $.copy(r.p).eq(ROOT);
  }
  else{
    temp$3 = false;
  }
  if (temp$3) {
    temp$4 = $.copy(r.l).eq(o_c$(u64("0"), $c));
  }
  else{
    temp$4 = false;
  }
  if (temp$4) {
    temp$5 = $.copy(r.r).eq(o_c$(u64("1"), $c));
  }
  else{
    temp$5 = false;
  }
  if (!temp$5) {
    throw $.abortCode(u64("2"));
  }
  [temp$6, temp$7] = [cb.o, u64("0")];
  o_l = Std.Vector.borrow$(temp$6, temp$7, $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])] as TypeTag[]);
  if ($.copy(o_l.k).eq(u$([u8("48"), u8("48"), u8("49")], $c))) {
    temp$8 = $.copy(o_l.v).eq(u8("9"));
  }
  else{
    temp$8 = false;
  }
  if (temp$8) {
    temp$9 = $.copy(o_l.p).eq(u64("0"));
  }
  else{
    temp$9 = false;
  }
  if (!temp$9) {
    throw $.abortCode(u64("3"));
  }
  [temp$10, temp$11] = [cb.o, u64("1")];
  o_r = Std.Vector.borrow$(temp$10, temp$11, $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])] as TypeTag[]);
  if ($.copy(o_r.k).eq(u$([u8("49"), u8("48"), u8("49")], $c))) {
    temp$12 = $.copy(o_r.v).eq(u8("8"));
  }
  else{
    temp$12 = false;
  }
  if (temp$12) {
    temp$13 = $.copy(o_r.p).eq(u64("0"));
  }
  else{
    temp$13 = false;
  }
  if (!temp$13) {
    throw $.abortCode(u64("4"));
  }
  return cb;
}

// test func
export function pop_general_success_2$ (
  $c: AptosDataCache,
): void {
  let temp$1, temp$11, temp$12, temp$14, temp$15, temp$17, temp$18, temp$19, temp$2, temp$21, temp$22, temp$24, temp$25, temp$27, temp$28, temp$3, temp$5, temp$6, temp$7, temp$8, temp$9, cb, i, i__16, i__4, o, o__10, o__13, o__20, o__23, o__26;
  cb = singleton$(u$([u8("48"), u8("49"), u8("49")], $c), u8("5"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  insert$(cb, u$([u8("48"), u8("49"), u8("48")], $c), u8("6"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  insert$(cb, u$([u8("48"), u8("48"), u8("49")], $c), u8("7"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  insert$(cb, u$([u8("49"), u8("49"), u8("49")], $c), u8("8"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  if (!pop$(cb, u$([u8("48"), u8("48"), u8("49")], $c), $c, [AtomicTypeTag.U8] as TypeTag[]).eq(u8("7"))) {
    throw $.abortCode(u64("0"));
  }
  if (!$.copy(cb.r).eq(u64("1"))) {
    throw $.abortCode(u64("1"));
  }
  i = Std.Vector.borrow$(cb.i, u64("0"), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]);
  if ($.copy(i.c).eq(u8("0"))) {
    temp$1 = $.copy(i.p).eq(u64("1"));
  }
  else{
    temp$1 = false;
  }
  if (temp$1) {
    temp$2 = $.copy(i.l).eq(o_c$(u64("1"), $c));
  }
  else{
    temp$2 = false;
  }
  if (temp$2) {
    temp$3 = $.copy(i.r).eq(o_c$(u64("0"), $c));
  }
  else{
    temp$3 = false;
  }
  if (!temp$3) {
    throw $.abortCode(u64("2"));
  }
  i__4 = Std.Vector.borrow$(cb.i, u64("1"), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]);
  if ($.copy(i__4.c).eq(u8("2"))) {
    temp$5 = $.copy(i__4.p).eq(ROOT);
  }
  else{
    temp$5 = false;
  }
  if (temp$5) {
    temp$6 = $.copy(i__4.l).eq(u64("0"));
  }
  else{
    temp$6 = false;
  }
  if (temp$6) {
    temp$7 = $.copy(i__4.r).eq(o_c$(u64("2"), $c));
  }
  else{
    temp$7 = false;
  }
  if (!temp$7) {
    throw $.abortCode(u64("3"));
  }
  o = Std.Vector.borrow$(cb.o, u64("0"), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])] as TypeTag[]);
  if ($.copy(o.k).eq(u$([u8("48"), u8("49"), u8("49")], $c))) {
    temp$8 = $.copy(o.v).eq(u8("5"));
  }
  else{
    temp$8 = false;
  }
  if (temp$8) {
    temp$9 = $.copy(o.p).eq(u64("0"));
  }
  else{
    temp$9 = false;
  }
  if (!temp$9) {
    throw $.abortCode(u64("4"));
  }
  o__10 = Std.Vector.borrow$(cb.o, u64("1"), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])] as TypeTag[]);
  if ($.copy(o__10.k).eq(u$([u8("48"), u8("49"), u8("48")], $c))) {
    temp$11 = $.copy(o__10.v).eq(u8("6"));
  }
  else{
    temp$11 = false;
  }
  if (temp$11) {
    temp$12 = $.copy(o__10.p).eq(u64("0"));
  }
  else{
    temp$12 = false;
  }
  if (!temp$12) {
    throw $.abortCode(u64("5"));
  }
  o__13 = Std.Vector.borrow$(cb.o, u64("2"), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])] as TypeTag[]);
  if ($.copy(o__13.k).eq(u$([u8("49"), u8("49"), u8("49")], $c))) {
    temp$14 = $.copy(o__13.v).eq(u8("8"));
  }
  else{
    temp$14 = false;
  }
  if (temp$14) {
    temp$15 = $.copy(o__13.p).eq(u64("1"));
  }
  else{
    temp$15 = false;
  }
  if (!temp$15) {
    throw $.abortCode(u64("6"));
  }
  if (!pop$(cb, u$([u8("49"), u8("49"), u8("49")], $c), $c, [AtomicTypeTag.U8] as TypeTag[]).eq(u8("8"))) {
    throw $.abortCode(u64("7"));
  }
  if (!$.copy(cb.r).eq(u64("0"))) {
    throw $.abortCode(u64("8"));
  }
  i__16 = Std.Vector.borrow$(cb.i, u64("0"), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]);
  if ($.copy(i__16.c).eq(u8("0"))) {
    temp$17 = $.copy(i__16.p).eq(ROOT);
  }
  else{
    temp$17 = false;
  }
  if (temp$17) {
    temp$18 = $.copy(i__16.l).eq(o_c$(u64("1"), $c));
  }
  else{
    temp$18 = false;
  }
  if (temp$18) {
    temp$19 = $.copy(i__16.r).eq(o_c$(u64("0"), $c));
  }
  else{
    temp$19 = false;
  }
  if (!temp$19) {
    throw $.abortCode(u64("9"));
  }
  o__20 = Std.Vector.borrow$(cb.o, u64("0"), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])] as TypeTag[]);
  if ($.copy(o__20.k).eq(u$([u8("48"), u8("49"), u8("49")], $c))) {
    temp$21 = $.copy(o__20.v).eq(u8("5"));
  }
  else{
    temp$21 = false;
  }
  if (temp$21) {
    temp$22 = $.copy(o__20.p).eq(u64("0"));
  }
  else{
    temp$22 = false;
  }
  if (!temp$22) {
    throw $.abortCode(u64("10"));
  }
  o__23 = Std.Vector.borrow$(cb.o, u64("1"), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])] as TypeTag[]);
  if ($.copy(o__23.k).eq(u$([u8("48"), u8("49"), u8("48")], $c))) {
    temp$24 = $.copy(o__23.v).eq(u8("6"));
  }
  else{
    temp$24 = false;
  }
  if (temp$24) {
    temp$25 = $.copy(o__23.p).eq(u64("0"));
  }
  else{
    temp$25 = false;
  }
  if (!temp$25) {
    throw $.abortCode(u64("11"));
  }
  if (!pop$(cb, u$([u8("48"), u8("49"), u8("49")], $c), $c, [AtomicTypeTag.U8] as TypeTag[]).eq(u8("5"))) {
    throw $.abortCode(u64("12"));
  }
  if (!$.copy(cb.r).eq(o_c$(u64("0"), $c))) {
    throw $.abortCode(u64("13"));
  }
  o__26 = Std.Vector.borrow$(cb.o, u64("0"), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])] as TypeTag[]);
  if ($.copy(o__26.k).eq(u$([u8("48"), u8("49"), u8("48")], $c))) {
    temp$27 = $.copy(o__26.v).eq(u8("6"));
  }
  else{
    temp$27 = false;
  }
  if (temp$27) {
    temp$28 = $.copy(o__26.p).eq(ROOT);
  }
  else{
    temp$28 = false;
  }
  if (!temp$28) {
    throw $.abortCode(u64("14"));
  }
  if (!pop$(cb, u$([u8("48"), u8("49"), u8("48")], $c), $c, [AtomicTypeTag.U8] as TypeTag[]).eq(u8("6"))) {
    throw $.abortCode(u64("15"));
  }
  if (!$.copy(cb.r).eq(u64("0"))) {
    throw $.abortCode(u64("16"));
  }
  if (!is_empty$(cb, $c, [AtomicTypeTag.U8] as TypeTag[])) {
    throw $.abortCode(u64("17"));
  }
  destroy_empty$(cb, $c, [AtomicTypeTag.U8] as TypeTag[]);
  return;
}

export function pop_singleton$ (
  cb: CB,
  k: U128,
  $c: AptosDataCache,
  $p: TypeTag[], /* <V>*/
): any {
  if (!$.copy(Std.Vector.borrow$(cb.o, u64("0"), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [$p[0]])] as TypeTag[]).k).eq($.copy(k))) {
    throw $.abortCode(E_NOT_HAS_K);
  }
  cb.r = u64("0");
  let { v: v } = Std.Vector.pop_back$(cb.o, $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [$p[0]])] as TypeTag[]);
  return v;
}

// test func
export function pop_singleton_failure$ (
  $c: AptosDataCache,
): CB {
  let cb;
  cb = singleton$(u128("1"), u8("2"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  pop_singleton$(cb, u128("3"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  return cb;
}

// test func
export function pop_singleton_success$ (
  $c: AptosDataCache,
): void {
  let cb;
  cb = singleton$(u128("1"), u8("2"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  if (!pop_singleton$(cb, u128("1"), $c, [AtomicTypeTag.U8] as TypeTag[]).eq(u8("2"))) {
    throw $.abortCode(u64("0"));
  }
  if (!is_empty$(cb, $c, [AtomicTypeTag.U8] as TypeTag[])) {
    throw $.abortCode(u64("1"));
  }
  if (!$.copy(cb.r).eq(u64("0"))) {
    throw $.abortCode(u64("2"));
  }
  destroy_empty$(cb, $c, [AtomicTypeTag.U8] as TypeTag[]);
  return;
}

export function pop_update_relationships$ (
  cb: CB,
  s_c: boolean,
  i_p: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <V>*/
): void {
  let temp$1, g_p, i_p_p, i_s, p;
  p = Std.Vector.borrow$(cb.i, $.copy(i_p), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]);
  if ((s_c == L)) {
    temp$1 = $.copy(p.r);
  }
  else{
    temp$1 = $.copy(p.l);
  }
  i_s = temp$1;
  i_p_p = $.copy(p.p);
  if (is_out$($.copy(i_s), $c)) {
    Std.Vector.borrow_mut$(cb.o, o_v$($.copy(i_s), $c), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [$p[0]])] as TypeTag[]).p = $.copy(i_p_p);
  }
  else{
    Std.Vector.borrow_mut$(cb.i, $.copy(i_s), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]).p = $.copy(i_p_p);
  }
  if ($.copy(i_p_p).eq(ROOT)) {
    cb.r = $.copy(i_s);
  }
  else{
    g_p = Std.Vector.borrow_mut$(cb.i, $.copy(i_p_p), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]);
    if ($.copy(g_p.l).eq($.copy(i_p))) {
      g_p.l = $.copy(i_s);
    }
    else{
      g_p.r = $.copy(i_s);
    }
  }
  return;
}

export function push_back_insert_nodes$ (
  cb: CB,
  k: U128,
  v: any,
  i_n_i: U64,
  c: U8,
  i_p: U64,
  i_n_c_c: boolean,
  c1: U64,
  c2: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <V>*/
): void {
  let temp$1, temp$2, l, r;
  if (i_n_c_c) {
    [temp$1, temp$2] = [$.copy(c1), $.copy(c2)];
  }
  else{
    [temp$1, temp$2] = [$.copy(c2), $.copy(c1)];
  }
  [l, r] = [temp$1, temp$2];
  Std.Vector.push_back$(cb.o, new O({ k: $.copy(k), v: v, p: $.copy(i_n_i) }, new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [$p[0]])), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [$p[0]])] as TypeTag[]);
  Std.Vector.push_back$(cb.i, new I({ c: $.copy(c), p: $.copy(i_p), l: $.copy(l), r: $.copy(r) }, new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]);
  return;
}

export function search_outer$ (
  cb: CB,
  k: U128,
  $c: AptosDataCache,
  $p: TypeTag[], /* <V>*/
): [U64, boolean, U128, U64, U8] {
  let temp$1, temp$2, i, s, s_o, s_p;
  s_p = Std.Vector.borrow$(cb.i, $.copy(cb.r), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]);
  while (true) {
    if (is_set$($.copy(k), $.copy(s_p.c), $c)) {
      [temp$1, temp$2] = [$.copy(s_p.r), R];
    }
    else{
      [temp$1, temp$2] = [$.copy(s_p.l), L];
    }
    [i, s] = [temp$1, temp$2];
    if (is_out$($.copy(i), $c)) {
      s_o = Std.Vector.borrow$(cb.o, o_v$($.copy(i), $c), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [$p[0]])] as TypeTag[]);
      return [$.copy(i), s, $.copy(s_o.k), $.copy(s_o.p), $.copy(s_p.c)];
    }
    else{
    }
    s_p = Std.Vector.borrow$(cb.i, $.copy(i), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]);
  }
}

export function singleton$ (
  k: U128,
  v: any,
  $c: AptosDataCache,
  $p: TypeTag[], /* <V>*/
): CB {
  let cb;
  cb = new CB({ r: u64("0"), i: Std.Vector.empty$($c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]), o: Std.Vector.empty$($c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [$p[0]])] as TypeTag[]) }, new StructTag(new HexString("0xc0deb00c"), "CritBit", "CB", [$p[0]]));
  insert_empty$(cb, $.copy(k), v, $c, [$p[0]] as TypeTag[]);
  return cb;
}

// test func
export function singleton_success$ (
  $c: AptosDataCache,
): [I[], O[]] {
  let temp$1, temp$2, cb;
  cb = singleton$(u128("2"), u8("3"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  if (!Std.Vector.is_empty$(cb.i, $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[])) {
    throw $.abortCode(u64("0"));
  }
  if (!Std.Vector.length$(cb.o, $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])] as TypeTag[]).eq(u64("1"))) {
    throw $.abortCode(u64("1"));
  }
  let { r: r, i: i, o: o } = cb;
  if (!$.copy(r).eq(OUT.shl(N_TYPE))) {
    throw $.abortCode(u64("2"));
  }
  let { k: k, v: v, p: p } = Std.Vector.pop_back$(o, $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])] as TypeTag[]);
  if ($.copy(k).eq(u128("2"))) {
    temp$1 = $.copy(v).eq(u8("3"));
  }
  else{
    temp$1 = false;
  }
  if (temp$1) {
    temp$2 = $.copy(p).eq(ROOT);
  }
  else{
    temp$2 = false;
  }
  if (!temp$2) {
    throw $.abortCode(u64("3"));
  }
  return [i, o];
}

export function stitch_child_of_parent$ (
  cb: CB,
  i_n: U64,
  i_p: U64,
  i_o: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <V>*/
): void {
  let p;
  p = Std.Vector.borrow_mut$(cb.i, $.copy(i_p), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]);
  if ($.copy(p.l).eq($.copy(i_o))) {
    p.l = $.copy(i_n);
  }
  else{
    p.r = $.copy(i_n);
  }
  return;
}

export function stitch_parent_of_child$ (
  cb: CB,
  i_n: U64,
  i_c: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <V>*/
): void {
  if (is_out$($.copy(i_c), $c)) {
    Std.Vector.borrow_mut$(cb.o, o_v$($.copy(i_c), $c), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [$p[0]])] as TypeTag[]).p = $.copy(i_n);
  }
  else{
    Std.Vector.borrow_mut$(cb.i, $.copy(i_c), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]).p = $.copy(i_n);
  }
  return;
}

export function stitch_swap_remove$ (
  cb: CB,
  i_n: U64,
  n_n: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <V>*/
): void {
  let i_l, i_p, i_p__1, i_r, n;
  if (is_out$($.copy(i_n), $c)) {
    i_p = $.copy(Std.Vector.borrow$(cb.o, o_v$($.copy(i_n), $c), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [$p[0]])] as TypeTag[]).p);
    if ($.copy(i_p).eq(ROOT)) {
      cb.r = $.copy(i_n);
      return;
    }
    else{
    }
    stitch_child_of_parent$(cb, $.copy(i_n), $.copy(i_p), o_c$($.copy(n_n).sub(u64("1")), $c), $c, [$p[0]] as TypeTag[]);
  }
  else{
    n = Std.Vector.borrow$(cb.i, $.copy(i_n), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]);
    [i_p__1, i_l, i_r] = [$.copy(n.p), $.copy(n.l), $.copy(n.r)];
    stitch_parent_of_child$(cb, $.copy(i_n), $.copy(i_l), $c, [$p[0]] as TypeTag[]);
    stitch_parent_of_child$(cb, $.copy(i_n), $.copy(i_r), $c, [$p[0]] as TypeTag[]);
    if ($.copy(i_p__1).eq(ROOT)) {
      cb.r = $.copy(i_n);
      return;
    }
    else{
    }
    stitch_child_of_parent$(cb, $.copy(i_n), $.copy(i_p__1), $.copy(n_n).sub(u64("1")), $c, [$p[0]] as TypeTag[]);
  }
  return;
}

// test func
export function stitch_swap_remove_i_l$ (
  $c: AptosDataCache,
): CB {
  let cb, v;
  v = u8("0");
  cb = empty$($c, [AtomicTypeTag.U8] as TypeTag[]);
  Std.Vector.push_back$(cb.i, new I({ c: u8("2"), p: ROOT, l: u64("2"), r: o_c$(u64("0"), $c) }, new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]);
  Std.Vector.push_back$(cb.i, new I({ c: u8("0"), p: u64("0"), l: u64("0"), r: u64("0") }, new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]);
  Std.Vector.push_back$(cb.i, new I({ c: u8("1"), p: u64("0"), l: o_c$(u64("1"), $c), r: o_c$(u64("2"), $c) }, new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]);
  Std.Vector.push_back$(cb.o, new O({ k: u$([u8("49"), u8("48"), u8("48")], $c), v: $.copy(v), p: u64("0") }, new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])] as TypeTag[]);
  Std.Vector.push_back$(cb.o, new O({ k: u$([u8("48"), u8("48"), u8("49")], $c), v: $.copy(v), p: u64("2") }, new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])] as TypeTag[]);
  Std.Vector.push_back$(cb.o, new O({ k: u$([u8("48"), u8("49"), u8("49")], $c), v: $.copy(v), p: u64("2") }, new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])] as TypeTag[]);
  Std.Vector.swap_remove$(cb.i, u64("1"), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]);
  stitch_swap_remove$(cb, u64("1"), u64("3"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  if (!$.copy(Std.Vector.borrow$(cb.i, u64("0"), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]).l).eq(u64("1"))) {
    throw $.abortCode(u64("0"));
  }
  if (!$.copy(Std.Vector.borrow$(cb.o, u64("1"), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])] as TypeTag[]).p).eq(u64("1"))) {
    throw $.abortCode(u64("1"));
  }
  if (!$.copy(Std.Vector.borrow$(cb.o, u64("2"), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])] as TypeTag[]).p).eq(u64("1"))) {
    throw $.abortCode(u64("2"));
  }
  return cb;
}

// test func
export function stitch_swap_remove_i_r$ (
  $c: AptosDataCache,
): CB {
  let cb, v;
  v = u8("0");
  cb = empty$($c, [AtomicTypeTag.U8] as TypeTag[]);
  Std.Vector.push_back$(cb.i, new I({ c: u8("2"), p: ROOT, l: o_c$(u64("0"), $c), r: u64("2") }, new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]);
  Std.Vector.push_back$(cb.i, new I({ c: u8("0"), p: u64("0"), l: u64("0"), r: u64("0") }, new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]);
  Std.Vector.push_back$(cb.i, new I({ c: u8("1"), p: u64("0"), l: o_c$(u64("1"), $c), r: o_c$(u64("2"), $c) }, new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]);
  Std.Vector.push_back$(cb.o, new O({ k: u$([u8("48"), u8("48"), u8("49")], $c), v: $.copy(v), p: u64("0") }, new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])] as TypeTag[]);
  Std.Vector.push_back$(cb.o, new O({ k: u$([u8("49"), u8("48"), u8("49")], $c), v: $.copy(v), p: u64("2") }, new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])] as TypeTag[]);
  Std.Vector.push_back$(cb.o, new O({ k: u$([u8("49"), u8("49"), u8("49")], $c), v: $.copy(v), p: u64("2") }, new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])] as TypeTag[]);
  Std.Vector.swap_remove$(cb.i, u64("1"), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]);
  stitch_swap_remove$(cb, u64("1"), u64("3"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  if (!$.copy(Std.Vector.borrow$(cb.i, u64("0"), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]).r).eq(u64("1"))) {
    throw $.abortCode(u64("0"));
  }
  if (!$.copy(Std.Vector.borrow$(cb.o, u64("1"), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])] as TypeTag[]).p).eq(u64("1"))) {
    throw $.abortCode(u64("1"));
  }
  if (!$.copy(Std.Vector.borrow$(cb.o, u64("2"), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])] as TypeTag[]).p).eq(u64("1"))) {
    throw $.abortCode(u64("2"));
  }
  return cb;
}

// test func
export function stitch_swap_remove_o_l$ (
  $c: AptosDataCache,
): CB {
  let cb, v;
  v = u8("0");
  cb = empty$($c, [AtomicTypeTag.U8] as TypeTag[]);
  Std.Vector.push_back$(cb.i, new I({ c: u8("2"), p: ROOT, l: o_c$(u64("0"), $c), r: u64("1") }, new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]);
  Std.Vector.push_back$(cb.i, new I({ c: u8("1"), p: u64("0"), l: o_c$(u64("3"), $c), r: o_c$(u64("1"), $c) }, new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]);
  Std.Vector.push_back$(cb.o, new O({ k: u$([u8("48"), u8("48"), u8("49")], $c), v: $.copy(v), p: u64("0") }, new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])] as TypeTag[]);
  Std.Vector.push_back$(cb.o, new O({ k: u$([u8("49"), u8("49"), u8("49")], $c), v: $.copy(v), p: u64("1") }, new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])] as TypeTag[]);
  Std.Vector.push_back$(cb.o, new O({ k: HI_128, v: $.copy(v), p: HI_64 }, new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])] as TypeTag[]);
  Std.Vector.push_back$(cb.o, new O({ k: u$([u8("49"), u8("48"), u8("49")], $c), v: $.copy(v), p: u64("1") }, new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])] as TypeTag[]);
  Std.Vector.swap_remove$(cb.o, u64("2"), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])] as TypeTag[]);
  stitch_swap_remove$(cb, o_c$(u64("2"), $c), u64("4"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  if (!$.copy(Std.Vector.borrow$(cb.i, u64("1"), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]).l).eq(o_c$(u64("2"), $c))) {
    throw $.abortCode(u64("0"));
  }
  return cb;
}

// test func
export function stitch_swap_remove_o_r$ (
  $c: AptosDataCache,
): CB {
  let cb, v;
  v = u8("0");
  cb = empty$($c, [AtomicTypeTag.U8] as TypeTag[]);
  Std.Vector.push_back$(cb.i, new I({ c: u8("2"), p: ROOT, l: o_c$(u64("0"), $c), r: u64("1") }, new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]);
  Std.Vector.push_back$(cb.i, new I({ c: u8("1"), p: u64("0"), l: o_c$(u64("1"), $c), r: o_c$(u64("3"), $c) }, new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]);
  Std.Vector.push_back$(cb.o, new O({ k: u$([u8("48"), u8("48"), u8("49")], $c), v: $.copy(v), p: u64("0") }, new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])] as TypeTag[]);
  Std.Vector.push_back$(cb.o, new O({ k: u$([u8("49"), u8("48"), u8("49")], $c), v: $.copy(v), p: u64("1") }, new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])] as TypeTag[]);
  Std.Vector.push_back$(cb.o, new O({ k: HI_128, v: $.copy(v), p: HI_64 }, new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])] as TypeTag[]);
  Std.Vector.push_back$(cb.o, new O({ k: u$([u8("49"), u8("49"), u8("49")], $c), v: $.copy(v), p: u64("1") }, new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])] as TypeTag[]);
  Std.Vector.swap_remove$(cb.o, u64("2"), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])] as TypeTag[]);
  stitch_swap_remove$(cb, o_c$(u64("2"), $c), u64("4"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  if (!$.copy(Std.Vector.borrow$(cb.i, u64("1"), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]).r).eq(o_c$(u64("2"), $c))) {
    throw $.abortCode(u64("0"));
  }
  return cb;
}

// test func
export function stitch_swap_remove_r_i$ (
  $c: AptosDataCache,
): CB {
  let cb, v;
  v = u8("0");
  cb = empty$($c, [AtomicTypeTag.U8] as TypeTag[]);
  Std.Vector.push_back$(cb.i, new I({ c: u8("1"), p: u64("2"), l: o_c$(u64("1"), $c), r: o_c$(u64("2"), $c) }, new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]);
  Std.Vector.push_back$(cb.i, new I({ c: u8("0"), p: u64("0"), l: u64("0"), r: u64("0") }, new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]);
  Std.Vector.push_back$(cb.i, new I({ c: u8("2"), p: ROOT, l: o_c$(u64("0"), $c), r: u64("0") }, new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]);
  Std.Vector.push_back$(cb.o, new O({ k: u$([u8("48"), u8("48"), u8("49")], $c), v: $.copy(v), p: u64("0") }, new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])] as TypeTag[]);
  Std.Vector.push_back$(cb.o, new O({ k: u$([u8("49"), u8("48"), u8("49")], $c), v: $.copy(v), p: u64("2") }, new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])] as TypeTag[]);
  Std.Vector.push_back$(cb.o, new O({ k: u$([u8("49"), u8("49"), u8("49")], $c), v: $.copy(v), p: u64("2") }, new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])] as TypeTag[]);
  Std.Vector.swap_remove$(cb.i, u64("1"), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]);
  stitch_swap_remove$(cb, u64("1"), u64("3"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  if (!$.copy(cb.r).eq(u64("1"))) {
    throw $.abortCode(u64("0"));
  }
  if (!$.copy(Std.Vector.borrow$(cb.o, u64("0"), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])] as TypeTag[]).p).eq(u64("1"))) {
    throw $.abortCode(u64("1"));
  }
  if (!$.copy(Std.Vector.borrow$(cb.i, u64("0"), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]).p).eq(u64("1"))) {
    throw $.abortCode(u64("2"));
  }
  return cb;
}

// test func
export function stitch_swap_remove_r_o$ (
  $c: AptosDataCache,
): CB {
  let temp$1, temp$2, cb, n, v;
  v = u8("0");
  cb = empty$($c, [AtomicTypeTag.U8] as TypeTag[]);
  Std.Vector.push_back$(cb.o, new O({ k: HI_128, v: $.copy(v), p: HI_64 }, new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])] as TypeTag[]);
  Std.Vector.push_back$(cb.o, new O({ k: u$([u8("49"), u8("48"), u8("48")], $c), v: $.copy(v), p: ROOT }, new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])] as TypeTag[]);
  Std.Vector.swap_remove$(cb.o, u64("0"), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])] as TypeTag[]);
  stitch_swap_remove$(cb, o_c$(u64("0"), $c), u64("2"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  if (!$.copy(cb.r).eq(o_c$(u64("0"), $c))) {
    throw $.abortCode(u64("0"));
  }
  n = Std.Vector.borrow$(cb.o, u64("0"), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [AtomicTypeTag.U8])] as TypeTag[]);
  if ($.copy(n.k).eq(u$([u8("49"), u8("48"), u8("48")], $c))) {
    temp$1 = $.copy(n.v).eq(u8("0"));
  }
  else{
    temp$1 = false;
  }
  if (temp$1) {
    temp$2 = $.copy(n.p).eq(ROOT);
  }
  else{
    temp$2 = false;
  }
  if (!temp$2) {
    throw $.abortCode(u64("1"));
  }
  return cb;
}

export function traverse_c_i$ (
  cb: CB,
  k: U128,
  p_f: U64,
  d: boolean,
  $c: AptosDataCache,
  $p: TypeTag[], /* <V>*/
): U64 {
  let temp$1, temp$2, c_f, p;
  p = Std.Vector.borrow$(cb.i, $.copy(p_f), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]);
  while ((d != is_set$($.copy(k), $.copy(p.c), $c))) {
    {
      p = Std.Vector.borrow$(cb.i, $.copy(p.p), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]);
    }

  }if ((d == L)) {
    temp$1 = $.copy(p.l);
  }
  else{
    temp$1 = $.copy(p.r);
  }
  c_f = temp$1;
  while (!is_out$($.copy(c_f), $c)) {
    {
      if ((d == L)) {
        temp$2 = $.copy(Std.Vector.borrow$(cb.i, $.copy(c_f), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]).r);
      }
      else{
        temp$2 = $.copy(Std.Vector.borrow$(cb.i, $.copy(c_f), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]).l);
      }
      c_f = temp$2;
    }

  }return $.copy(c_f);
}

// test func
export function traverse_demo$ (
  $c: AptosDataCache,
): void {
  let temp$1, c_i, cb, i, k, n, n__2, p_f, r, r__3, v, v_r;
  cb = empty$($c, [AtomicTypeTag.U64] as TypeTag[]);
  insert$(cb, u128("9"), u64("900"), $c, [AtomicTypeTag.U64] as TypeTag[]);
  insert$(cb, u128("6"), u64("600"), $c, [AtomicTypeTag.U64] as TypeTag[]);
  insert$(cb, u128("3"), u64("300"), $c, [AtomicTypeTag.U64] as TypeTag[]);
  insert$(cb, u128("1"), u64("100"), $c, [AtomicTypeTag.U64] as TypeTag[]);
  insert$(cb, u128("8"), u64("800"), $c, [AtomicTypeTag.U64] as TypeTag[]);
  insert$(cb, u128("2"), u64("200"), $c, [AtomicTypeTag.U64] as TypeTag[]);
  insert$(cb, u128("7"), u64("700"), $c, [AtomicTypeTag.U64] as TypeTag[]);
  insert$(cb, u128("5"), u64("500"), $c, [AtomicTypeTag.U64] as TypeTag[]);
  insert$(cb, u128("4"), u64("400"), $c, [AtomicTypeTag.U64] as TypeTag[]);
  if (!!is_empty$(cb, $c, [AtomicTypeTag.U64] as TypeTag[])) {
    throw $.abortCode(u64("0"));
  }
  n = length$(cb, $c, [AtomicTypeTag.U64] as TypeTag[]);
  r = $.copy(n).sub(u64("1"));
  [k, v_r, p_f, c_i] = traverse_p_init_mut$(cb, $c, [AtomicTypeTag.U64] as TypeTag[]);
  i = u64("10");
  while ($.copy(r).gt(u64("0"))) {
    {
      if ($.copy(k).mod(u128("4")).eq(u128("0"))) {
        [k, v_r, p_f, c_i, ] = traverse_p_pop_mut$(cb, $.copy(k), $.copy(p_f), $.copy(c_i), $.copy(n), $c, [AtomicTypeTag.U64] as TypeTag[]);
        n = $.copy(n).sub(u64("1"));
      }
      else{
        $.set(v_r, $.copy(v_r).add($.copy(i)));
        i = $.copy(i).add(u64("10"));
        [k, v_r, p_f, c_i] = traverse_p_mut$(cb, $.copy(k), $.copy(p_f), $c, [AtomicTypeTag.U64] as TypeTag[]);
      }
      r = $.copy(r).sub(u64("1"));
    }

  }$.set(v_r, u64("0"));
  if (!has_key$(cb, u128("4"), $c, [AtomicTypeTag.U64] as TypeTag[])) {
    temp$1 = !has_key$(cb, u128("8"), $c, [AtomicTypeTag.U64] as TypeTag[]);
  }
  else{
    temp$1 = false;
  }
  if (!temp$1) {
    throw $.abortCode(u64("1"));
  }
  if (!$.copy(borrow$(cb, u128("1"), $c, [AtomicTypeTag.U64] as TypeTag[])).eq(u64("0"))) {
    throw $.abortCode(u64("2"));
  }
  if (!$.copy(borrow$(cb, u128("2"), $c, [AtomicTypeTag.U64] as TypeTag[])).eq(u64("260"))) {
    throw $.abortCode(u64("3"));
  }
  if (!$.copy(borrow$(cb, u128("3"), $c, [AtomicTypeTag.U64] as TypeTag[])).eq(u64("350"))) {
    throw $.abortCode(u64("4"));
  }
  if (!$.copy(borrow$(cb, u128("5"), $c, [AtomicTypeTag.U64] as TypeTag[])).eq(u64("540"))) {
    throw $.abortCode(u64("5"));
  }
  if (!$.copy(borrow$(cb, u128("6"), $c, [AtomicTypeTag.U64] as TypeTag[])).eq(u64("630"))) {
    throw $.abortCode(u64("6"));
  }
  if (!$.copy(borrow$(cb, u128("7"), $c, [AtomicTypeTag.U64] as TypeTag[])).eq(u64("720"))) {
    throw $.abortCode(u64("7"));
  }
  if (!$.copy(borrow$(cb, u128("9"), $c, [AtomicTypeTag.U64] as TypeTag[])).eq(u64("910"))) {
    throw $.abortCode(u64("8"));
  }
  if (!$.copy(n).gt(u64("0"))) {
    throw $.abortCode(u64("9"));
  }
  [r, i] = [$.copy(n).sub(u64("1")), u64("1")];
  [k, v_r, p_f, c_i] = traverse_s_init_mut$(cb, $c, [AtomicTypeTag.U64] as TypeTag[]);
  v = u64("0");
  while ($.copy(r).gt(u64("0"))) {
    {
      if ($.copy(k).eq(u128("7"))) {
        [, , , , v] = traverse_s_pop_mut$(cb, $.copy(k), $.copy(p_f), $.copy(c_i), $.copy(n), $c, [AtomicTypeTag.U64] as TypeTag[]);
        break;
      }
      else{
        $.set(v_r, $.copy(v_r).add($.copy(i)));
        [k, v_r, p_f, c_i] = traverse_s_mut$(cb, $.copy(k), $.copy(p_f), $c, [AtomicTypeTag.U64] as TypeTag[]);
        i = $.copy(i).add(u64("1"));
      }
      r = $.copy(r).sub(u64("1"));
    }

  }if (!!has_key$(cb, u128("7"), $c, [AtomicTypeTag.U64] as TypeTag[])) {
    throw $.abortCode(u64("10"));
  }
  if (!$.copy(v).eq(u64("720"))) {
    throw $.abortCode(u64("11"));
  }
  if (!$.copy(borrow$(cb, u128("1"), $c, [AtomicTypeTag.U64] as TypeTag[])).eq(u64("1"))) {
    throw $.abortCode(u64("12"));
  }
  if (!$.copy(borrow$(cb, u128("2"), $c, [AtomicTypeTag.U64] as TypeTag[])).eq(u64("262"))) {
    throw $.abortCode(u64("13"));
  }
  if (!$.copy(borrow$(cb, u128("3"), $c, [AtomicTypeTag.U64] as TypeTag[])).eq(u64("353"))) {
    throw $.abortCode(u64("14"));
  }
  if (!$.copy(borrow$(cb, u128("5"), $c, [AtomicTypeTag.U64] as TypeTag[])).eq(u64("544"))) {
    throw $.abortCode(u64("15"));
  }
  if (!$.copy(borrow$(cb, u128("6"), $c, [AtomicTypeTag.U64] as TypeTag[])).eq(u64("635"))) {
    throw $.abortCode(u64("16"));
  }
  if (!$.copy(borrow$(cb, u128("9"), $c, [AtomicTypeTag.U64] as TypeTag[])).eq(u64("910"))) {
    throw $.abortCode(u64("17"));
  }
  pop$(cb, u128("1"), $c, [AtomicTypeTag.U64] as TypeTag[]);
  pop$(cb, u128("2"), $c, [AtomicTypeTag.U64] as TypeTag[]);
  pop$(cb, u128("3"), $c, [AtomicTypeTag.U64] as TypeTag[]);
  pop$(cb, u128("5"), $c, [AtomicTypeTag.U64] as TypeTag[]);
  pop$(cb, u128("6"), $c, [AtomicTypeTag.U64] as TypeTag[]);
  if (!!is_empty$(cb, $c, [AtomicTypeTag.U64] as TypeTag[])) {
    throw $.abortCode(u64("18"));
  }
  n__2 = length$(cb, $c, [AtomicTypeTag.U64] as TypeTag[]);
  r__3 = $.copy(n__2).sub(u64("1"));
  [k, v_r, p_f, ] = traverse_s_init_mut$(cb, $c, [AtomicTypeTag.U64] as TypeTag[]);
  $.set(v_r, u64("1234"));
  while ($.copy(r__3).gt(u64("0"))) {
    {
      $.set(v_r, u64("4321"));
      [k, v_r, p_f, ] = traverse_s_mut$(cb, $.copy(k), $.copy(p_f), $c, [AtomicTypeTag.U64] as TypeTag[]);
      r__3 = $.copy(r__3).sub(u64("1"));
    }

  }if (!pop$(cb, u128("9"), $c, [AtomicTypeTag.U64] as TypeTag[]).eq(u64("1234"))) {
    throw $.abortCode(u64("19"));
  }
  destroy_empty$(cb, $c, [AtomicTypeTag.U64] as TypeTag[]);
  return;
}

export function traverse_end_pop$ (
  cb: CB,
  p_f: U64,
  c_i: U64,
  n_o: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <V>*/
): any {
  let temp$1, n_s_c;
  if ($.copy(n_o).eq(u64("1"))) {
    cb.r = u64("0");
    let { v: v } = Std.Vector.pop_back$(cb.o, $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [$p[0]])] as TypeTag[]);
    temp$1 = v;
  }
  else{
    n_s_c = $.copy(Std.Vector.borrow$(cb.i, $.copy(p_f), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]).l).eq($.copy(c_i));
    pop_update_relationships$(cb, n_s_c, $.copy(p_f), $c, [$p[0]] as TypeTag[]);
    temp$1 = pop_destroy_nodes$(cb, $.copy(p_f), $.copy(c_i), $.copy(n_o), $c, [$p[0]] as TypeTag[]);
  }
  return temp$1;
}

// test func
export function traverse_end_pop_success$ (
  $c: AptosDataCache,
): void {
  let temp$10, temp$11, temp$12, temp$4, temp$5, temp$6, temp$7, temp$8, temp$9, c_i, cb, k, k__2, p_f, p_f__1, p_f__3, v_r;
  cb = empty$($c, [AtomicTypeTag.U64] as TypeTag[]);
  insert$(cb, u$([u8("49"), u8("49"), u8("48"), u8("49")], $c), u64("10"), $c, [AtomicTypeTag.U64] as TypeTag[]);
  insert$(cb, u$([u8("49"), u8("48"), u8("48"), u8("48")], $c), u64("11"), $c, [AtomicTypeTag.U64] as TypeTag[]);
  insert$(cb, u$([u8("49"), u8("49"), u8("48"), u8("48")], $c), u64("12"), $c, [AtomicTypeTag.U64] as TypeTag[]);
  insert$(cb, u$([u8("49"), u8("49"), u8("49"), u8("48")], $c), u64("13"), $c, [AtomicTypeTag.U64] as TypeTag[]);
  insert$(cb, u$([u8("48"), u8("48"), u8("48"), u8("48")], $c), u64("14"), $c, [AtomicTypeTag.U64] as TypeTag[]);
  [k, , p_f, ] = traverse_p_init_mut$(cb, $c, [AtomicTypeTag.U64] as TypeTag[]);
  [, , p_f__1, c_i] = traverse_p_mut$(cb, $.copy(k), $.copy(p_f), $c, [AtomicTypeTag.U64] as TypeTag[]);
  if (!traverse_end_pop$(cb, $.copy(p_f__1), $.copy(c_i), u64("5"), $c, [AtomicTypeTag.U64] as TypeTag[]).eq(u64("10"))) {
    throw $.abortCode(u64("0"));
  }
  [k__2, v_r, p_f__3, ] = traverse_s_init_mut$(cb, $c, [AtomicTypeTag.U64] as TypeTag[]);
  if ($.copy(k__2).eq(u$([u8("48"), u8("48"), u8("48"), u8("48")], $c))) {
    temp$4 = $.copy(v_r).eq(u64("14"));
  }
  else{
    temp$4 = false;
  }
  if (!temp$4) {
    throw $.abortCode(u64("1"));
  }
  [k__2, v_r, p_f__3, ] = traverse_s_mut$(cb, $.copy(k__2), $.copy(p_f__3), $c, [AtomicTypeTag.U64] as TypeTag[]);
  if ($.copy(k__2).eq(u$([u8("49"), u8("48"), u8("48"), u8("48")], $c))) {
    temp$5 = $.copy(v_r).eq(u64("11"));
  }
  else{
    temp$5 = false;
  }
  if (!temp$5) {
    throw $.abortCode(u64("2"));
  }
  [k__2, v_r, p_f__3, ] = traverse_s_mut$(cb, $.copy(k__2), $.copy(p_f__3), $c, [AtomicTypeTag.U64] as TypeTag[]);
  if ($.copy(k__2).eq(u$([u8("49"), u8("49"), u8("48"), u8("48")], $c))) {
    temp$6 = $.copy(v_r).eq(u64("12"));
  }
  else{
    temp$6 = false;
  }
  if (!temp$6) {
    throw $.abortCode(u64("3"));
  }
  [k__2, v_r, , ] = traverse_s_mut$(cb, $.copy(k__2), $.copy(p_f__3), $c, [AtomicTypeTag.U64] as TypeTag[]);
  if ($.copy(k__2).eq(u$([u8("49"), u8("49"), u8("49"), u8("48")], $c))) {
    temp$7 = $.copy(v_r).eq(u64("13"));
  }
  else{
    temp$7 = false;
  }
  if (!temp$7) {
    throw $.abortCode(u64("4"));
  }
  [k__2, , p_f__3, ] = traverse_s_init_mut$(cb, $c, [AtomicTypeTag.U64] as TypeTag[]);
  [, , p_f__3, c_i] = traverse_s_mut$(cb, $.copy(k__2), $.copy(p_f__3), $c, [AtomicTypeTag.U64] as TypeTag[]);
  if (!traverse_end_pop$(cb, $.copy(p_f__3), $.copy(c_i), u64("4"), $c, [AtomicTypeTag.U64] as TypeTag[]).eq(u64("11"))) {
    throw $.abortCode(u64("5"));
  }
  [k__2, v_r, p_f__3, ] = traverse_p_init_mut$(cb, $c, [AtomicTypeTag.U64] as TypeTag[]);
  if ($.copy(k__2).eq(u$([u8("49"), u8("49"), u8("49"), u8("48")], $c))) {
    temp$8 = $.copy(v_r).eq(u64("13"));
  }
  else{
    temp$8 = false;
  }
  if (!temp$8) {
    throw $.abortCode(u64("6"));
  }
  [k__2, v_r, p_f__3, ] = traverse_p_mut$(cb, $.copy(k__2), $.copy(p_f__3), $c, [AtomicTypeTag.U64] as TypeTag[]);
  if ($.copy(k__2).eq(u$([u8("49"), u8("49"), u8("48"), u8("48")], $c))) {
    temp$9 = $.copy(v_r).eq(u64("12"));
  }
  else{
    temp$9 = false;
  }
  if (!temp$9) {
    throw $.abortCode(u64("7"));
  }
  [k__2, v_r, , ] = traverse_p_mut$(cb, $.copy(k__2), $.copy(p_f__3), $c, [AtomicTypeTag.U64] as TypeTag[]);
  if ($.copy(k__2).eq(u$([u8("48"), u8("48"), u8("48"), u8("48")], $c))) {
    temp$10 = $.copy(v_r).eq(u64("14"));
  }
  else{
    temp$10 = false;
  }
  if (!temp$10) {
    throw $.abortCode(u64("8"));
  }
  [, , p_f__3, c_i] = traverse_p_init_mut$(cb, $c, [AtomicTypeTag.U64] as TypeTag[]);
  if (!traverse_end_pop$(cb, $.copy(p_f__3), $.copy(c_i), u64("3"), $c, [AtomicTypeTag.U64] as TypeTag[]).eq(u64("13"))) {
    throw $.abortCode(u64("9"));
  }
  [k__2, v_r, p_f__3, ] = traverse_s_init_mut$(cb, $c, [AtomicTypeTag.U64] as TypeTag[]);
  if ($.copy(k__2).eq(u$([u8("48"), u8("48"), u8("48"), u8("48")], $c))) {
    temp$11 = $.copy(v_r).eq(u64("14"));
  }
  else{
    temp$11 = false;
  }
  if (!temp$11) {
    throw $.abortCode(u64("10"));
  }
  [k__2, v_r, , ] = traverse_s_mut$(cb, $.copy(k__2), $.copy(p_f__3), $c, [AtomicTypeTag.U64] as TypeTag[]);
  if ($.copy(k__2).eq(u$([u8("49"), u8("49"), u8("48"), u8("48")], $c))) {
    temp$12 = $.copy(v_r).eq(u64("12"));
  }
  else{
    temp$12 = false;
  }
  if (!temp$12) {
    throw $.abortCode(u64("11"));
  }
  [, , p_f__3, c_i] = traverse_s_init_mut$(cb, $c, [AtomicTypeTag.U64] as TypeTag[]);
  if (!traverse_end_pop$(cb, $.copy(p_f__3), $.copy(c_i), u64("2"), $c, [AtomicTypeTag.U64] as TypeTag[]).eq(u64("14"))) {
    throw $.abortCode(u64("12"));
  }
  [, , p_f__3, c_i] = traverse_p_init_mut$(cb, $c, [AtomicTypeTag.U64] as TypeTag[]);
  if (!traverse_end_pop$(cb, $.copy(p_f__3), $.copy(c_i), u64("1"), $c, [AtomicTypeTag.U64] as TypeTag[]).eq(u64("12"))) {
    throw $.abortCode(u64("13"));
  }
  if (!$.copy(cb.r).eq(u64("0"))) {
    throw $.abortCode(u64("14"));
  }
  destroy_empty$(cb, $c, [AtomicTypeTag.U64] as TypeTag[]);
  return;
}

export function traverse_init_mut$ (
  cb: CB,
  d: boolean,
  $c: AptosDataCache,
  $p: TypeTag[], /* <V>*/
): [U128, any, U64, U64] {
  let temp$1, i_n, n;
  if ((d == L)) {
    temp$1 = max_node_c_i$(cb, $c, [$p[0]] as TypeTag[]);
  }
  else{
    temp$1 = min_node_c_i$(cb, $c, [$p[0]] as TypeTag[]);
  }
  i_n = temp$1;
  n = Std.Vector.borrow_mut$(cb.o, o_v$($.copy(i_n), $c), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [$p[0]])] as TypeTag[]);
  return [$.copy(n.k), n.v, $.copy(n.p), $.copy(i_n)];
}

export function traverse_mut$ (
  cb: CB,
  k: U128,
  p_f: U64,
  d: boolean,
  $c: AptosDataCache,
  $p: TypeTag[], /* <V>*/
): [U128, any, U64, U64] {
  let temp$1, temp$2, temp$3, temp$4, i_t, t;
  [temp$1, temp$2, temp$3, temp$4] = [cb, $.copy(k), $.copy(p_f), d];
  i_t = traverse_c_i$(temp$1, temp$2, temp$3, temp$4, $c, [$p[0]] as TypeTag[]);
  t = Std.Vector.borrow_mut$(cb.o, o_v$($.copy(i_t), $c), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [$p[0]])] as TypeTag[]);
  return [$.copy(t.k), t.v, $.copy(t.p), $.copy(i_t)];
}

export function traverse_p_init_mut$ (
  cb: CB,
  $c: AptosDataCache,
  $p: TypeTag[], /* <V>*/
): [U128, any, U64, U64] {
  return traverse_init_mut$(cb, L, $c, [$p[0]] as TypeTag[]);
}

export function traverse_p_mut$ (
  cb: CB,
  k: U128,
  p_f: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <V>*/
): [U128, any, U64, U64] {
  return traverse_mut$(cb, $.copy(k), $.copy(p_f), L, $c, [$p[0]] as TypeTag[]);
}

export function traverse_p_pop_mut$ (
  cb: CB,
  k: U128,
  p_f: U64,
  c_i: U64,
  n_o: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <V>*/
): [U128, any, U64, U64, any] {
  return traverse_pop_mut$(cb, $.copy(k), $.copy(p_f), $.copy(c_i), $.copy(n_o), L, $c, [$p[0]] as TypeTag[]);
}

export function traverse_pop_mut$ (
  cb: CB,
  k: U128,
  p_f: U64,
  c_i: U64,
  n_o: U64,
  d: boolean,
  $c: AptosDataCache,
  $p: TypeTag[], /* <V>*/
): [U128, any, U64, U64, any] {
  let temp$1, temp$2, temp$3, temp$4, i_t, s_s, s_v, t;
  s_s = $.copy(Std.Vector.borrow$(cb.i, $.copy(p_f), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "I", [])] as TypeTag[]).l).eq($.copy(c_i));
  [temp$1, temp$2, temp$3, temp$4] = [cb, $.copy(k), $.copy(p_f), d];
  i_t = traverse_c_i$(temp$1, temp$2, temp$3, temp$4, $c, [$p[0]] as TypeTag[]);
  pop_update_relationships$(cb, s_s, $.copy(p_f), $c, [$p[0]] as TypeTag[]);
  s_v = pop_destroy_nodes$(cb, $.copy(p_f), $.copy(c_i), $.copy(n_o), $c, [$p[0]] as TypeTag[]);
  if (o_v$($.copy(i_t), $c).eq($.copy(n_o).sub(u64("1")))) {
    i_t = $.copy(c_i);
  }
  else{
  }
  t = Std.Vector.borrow_mut$(cb.o, o_v$($.copy(i_t), $c), $c, [new StructTag(new HexString("0xc0deb00c"), "CritBit", "O", [$p[0]])] as TypeTag[]);
  return [$.copy(t.k), t.v, $.copy(t.p), $.copy(i_t), s_v];
}

// test func
export function traverse_pop_success$ (
  $c: AptosDataCache,
): CB {
  let temp$1, temp$14, temp$15, temp$16, temp$17, temp$18, temp$19, temp$2, temp$20, temp$21, temp$22, temp$23, temp$24, temp$25, temp$26, temp$27, temp$28, temp$3, temp$4, temp$5, temp$6, temp$7, temp$8, temp$9, cb, i, i__13, k, k__10, p_f, p_f__12, v, v_r, v_r__11;
  cb = empty$($c, [AtomicTypeTag.U8] as TypeTag[]);
  insert$(cb, u$([u8("49"), u8("49"), u8("48"), u8("49")], $c), u8("10"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  insert$(cb, u$([u8("49"), u8("48"), u8("48"), u8("48")], $c), u8("11"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  insert$(cb, u$([u8("49"), u8("49"), u8("48"), u8("48")], $c), u8("12"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  insert$(cb, u$([u8("49"), u8("49"), u8("49"), u8("48")], $c), u8("13"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  insert$(cb, u$([u8("48"), u8("48"), u8("48"), u8("48")], $c), u8("14"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  [k, v_r, p_f, i] = traverse_p_init_mut$(cb, $c, [AtomicTypeTag.U8] as TypeTag[]);
  if ($.copy(k).eq(u$([u8("49"), u8("49"), u8("49"), u8("48")], $c))) {
    temp$1 = $.copy(v_r).eq(u8("13"));
  }
  else{
    temp$1 = false;
  }
  if (temp$1) {
    temp$2 = $.copy(p_f).eq(u64("2"));
  }
  else{
    temp$2 = false;
  }
  if (temp$2) {
    temp$3 = $.copy(i).eq(o_c$(u64("3"), $c));
  }
  else{
    temp$3 = false;
  }
  if (!temp$3) {
    throw $.abortCode(u64("0"));
  }
  $.set(v_r, u8("15"));
  [k, v_r, p_f, i] = traverse_p_mut$(cb, $.copy(k), $.copy(p_f), $c, [AtomicTypeTag.U8] as TypeTag[]);
  if ($.copy(k).eq(u$([u8("49"), u8("49"), u8("48"), u8("49")], $c))) {
    temp$4 = $.copy(v_r).eq(u8("10"));
  }
  else{
    temp$4 = false;
  }
  if (temp$4) {
    temp$5 = $.copy(p_f).eq(u64("1"));
  }
  else{
    temp$5 = false;
  }
  if (temp$5) {
    temp$6 = $.copy(i).eq(o_c$(u64("0"), $c));
  }
  else{
    temp$6 = false;
  }
  if (!temp$6) {
    throw $.abortCode(u64("1"));
  }
  $.set(v_r, u8("16"));
  [k, v_r, p_f, i] = traverse_s_mut$(cb, $.copy(k), $.copy(p_f), $c, [AtomicTypeTag.U8] as TypeTag[]);
  if ($.copy(k).eq(u$([u8("49"), u8("49"), u8("49"), u8("48")], $c))) {
    temp$7 = $.copy(v_r).eq(u8("15"));
  }
  else{
    temp$7 = false;
  }
  if (temp$7) {
    temp$8 = $.copy(p_f).eq(u64("2"));
  }
  else{
    temp$8 = false;
  }
  if (temp$8) {
    temp$9 = $.copy(i).eq(o_c$(u64("3"), $c));
  }
  else{
    temp$9 = false;
  }
  if (!temp$9) {
    throw $.abortCode(u64("2"));
  }
  [k__10, v_r__11, p_f__12, i__13, v] = traverse_p_pop_mut$(cb, $.copy(k), $.copy(p_f), $.copy(i), u64("5"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  if (!$.copy(v).eq(u8("15"))) {
    throw $.abortCode(u64("3"));
  }
  if ($.copy(k__10).eq(u$([u8("49"), u8("49"), u8("48"), u8("49")], $c))) {
    temp$14 = $.copy(v_r__11).eq(u8("16"));
  }
  else{
    temp$14 = false;
  }
  if (temp$14) {
    temp$15 = $.copy(p_f__12).eq(u64("1"));
  }
  else{
    temp$15 = false;
  }
  if (temp$15) {
    temp$16 = $.copy(i__13).eq(o_c$(u64("0"), $c));
  }
  else{
    temp$16 = false;
  }
  if (!temp$16) {
    throw $.abortCode(u64("4"));
  }
  [k__10, v_r__11, p_f__12, i__13] = traverse_s_init_mut$(cb, $c, [AtomicTypeTag.U8] as TypeTag[]);
  if ($.copy(k__10).eq(u$([u8("48"), u8("48"), u8("48"), u8("48")], $c))) {
    temp$17 = $.copy(v_r__11).eq(u8("14"));
  }
  else{
    temp$17 = false;
  }
  if (temp$17) {
    temp$18 = $.copy(p_f__12).eq(u64("2"));
  }
  else{
    temp$18 = false;
  }
  if (temp$18) {
    temp$19 = $.copy(i__13).eq(o_c$(u64("3"), $c));
  }
  else{
    temp$19 = false;
  }
  if (!temp$19) {
    throw $.abortCode(u64("5"));
  }
  [k__10, v_r__11, p_f__12, i__13, v] = traverse_s_pop_mut$(cb, $.copy(k__10), $.copy(p_f__12), $.copy(i__13), u64("4"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  if (!$.copy(v).eq(u8("14"))) {
    throw $.abortCode(u64("6"));
  }
  if ($.copy(k__10).eq(u$([u8("49"), u8("48"), u8("48"), u8("48")], $c))) {
    temp$20 = $.copy(v_r__11).eq(u8("11"));
  }
  else{
    temp$20 = false;
  }
  if (temp$20) {
    temp$21 = $.copy(p_f__12).eq(u64("0"));
  }
  else{
    temp$21 = false;
  }
  if (temp$21) {
    temp$22 = $.copy(i__13).eq(o_c$(u64("1"), $c));
  }
  else{
    temp$22 = false;
  }
  if (!temp$22) {
    throw $.abortCode(u64("7"));
  }
  [k__10, v_r__11, p_f__12, i__13, v] = traverse_s_pop_mut$(cb, $.copy(k__10), $.copy(p_f__12), $.copy(i__13), u64("3"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  if (!$.copy(v).eq(u8("11"))) {
    throw $.abortCode(u64("8"));
  }
  if ($.copy(k__10).eq(u$([u8("49"), u8("49"), u8("48"), u8("48")], $c))) {
    temp$23 = $.copy(v_r__11).eq(u8("12"));
  }
  else{
    temp$23 = false;
  }
  if (temp$23) {
    temp$24 = $.copy(p_f__12).eq(u64("0"));
  }
  else{
    temp$24 = false;
  }
  if (temp$24) {
    temp$25 = $.copy(i__13).eq(o_c$(u64("1"), $c));
  }
  else{
    temp$25 = false;
  }
  if (!temp$25) {
    throw $.abortCode(u64("9"));
  }
  [k__10, v_r__11, p_f__12, i__13, v] = traverse_s_pop_mut$(cb, $.copy(k__10), $.copy(p_f__12), $.copy(i__13), u64("2"), $c, [AtomicTypeTag.U8] as TypeTag[]);
  if (!$.copy(v).eq(u8("12"))) {
    throw $.abortCode(u64("10"));
  }
  if ($.copy(k__10).eq(u$([u8("49"), u8("49"), u8("48"), u8("49")], $c))) {
    temp$26 = $.copy(v_r__11).eq(u8("16"));
  }
  else{
    temp$26 = false;
  }
  if (temp$26) {
    temp$27 = $.copy(i__13).eq(o_c$(u64("0"), $c));
  }
  else{
    temp$27 = false;
  }
  if (!temp$27) {
    throw $.abortCode(u64("11"));
  }
  if ($.copy(cb.r).eq(o_c$(u64("0"), $c))) {
    temp$28 = $.copy(p_f__12).eq(ROOT);
  }
  else{
    temp$28 = false;
  }
  if (!temp$28) {
    throw $.abortCode(u64("12"));
  }
  return cb;
}

export function traverse_s_init_mut$ (
  cb: CB,
  $c: AptosDataCache,
  $p: TypeTag[], /* <V>*/
): [U128, any, U64, U64] {
  return traverse_init_mut$(cb, R, $c, [$p[0]] as TypeTag[]);
}

export function traverse_s_mut$ (
  cb: CB,
  k: U128,
  p_f: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <V>*/
): [U128, any, U64, U64] {
  return traverse_mut$(cb, $.copy(k), $.copy(p_f), R, $c, [$p[0]] as TypeTag[]);
}

export function traverse_s_pop_mut$ (
  cb: CB,
  k: U128,
  p_f: U64,
  c_i: U64,
  n_o: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <V>*/
): [U128, any, U64, U64, any] {
  return traverse_pop_mut$(cb, $.copy(k), $.copy(p_f), $.copy(c_i), $.copy(n_o), R, $c, [$p[0]] as TypeTag[]);
}

// test func
export function u$ (
  s: U8[],
  $c: AptosDataCache,
): U128 {
  let b, i, n, r;
  n = Std.Vector.length$(s, $c, [AtomicTypeTag.U8] as TypeTag[]);
  r = u128("0");
  i = u64("0");
  while ($.copy(i).lt($.copy(n))) {
    {
      b = $.copy(Std.Vector.borrow$(s, $.copy(n).sub(u64("1")).sub($.copy(i)), $c, [AtomicTypeTag.U8] as TypeTag[]));
      if ($.copy(b).eq(u8("49"))) {
        r = $.copy(r).or(u128("1").shl(u8($.copy(i))));
      }
      else{
        if (!$.copy(b).eq(u8("48"))) {
          throw $.abortCode(E_BIT_NOT_0_OR_1);
        }
      }
      i = $.copy(i).add(u64("1"));
    }

  }return $.copy(r);
}

// test func
export function u_failure$ (
  $c: AptosDataCache,
): void {
  u$([u8("50")], $c);
  return;
}

// test func
export function u_long$ (
  a: U8[],
  b: U8[],
  c: U8[],
  $c: AptosDataCache,
): U128 {
  Std.Vector.append$(b, $.copy(c), $c, [AtomicTypeTag.U8] as TypeTag[]);
  Std.Vector.append$(a, $.copy(b), $c, [AtomicTypeTag.U8] as TypeTag[]);
  return u$($.copy(a), $c);
}

// test func
export function u_success$ (
  $c: AptosDataCache,
): void {
  if (!u$([u8("48")], $c).eq(u128("0"))) {
    throw $.abortCode(u64("0"));
  }
  if (!u$([u8("49")], $c).eq(u128("1"))) {
    throw $.abortCode(u64("1"));
  }
  if (!u$([u8("48"), u8("48")], $c).eq(u128("0"))) {
    throw $.abortCode(u64("2"));
  }
  if (!u$([u8("48"), u8("49")], $c).eq(u128("1"))) {
    throw $.abortCode(u64("3"));
  }
  if (!u$([u8("49"), u8("48")], $c).eq(u128("2"))) {
    throw $.abortCode(u64("4"));
  }
  if (!u$([u8("49"), u8("49")], $c).eq(u128("3"))) {
    throw $.abortCode(u64("5"));
  }
  if (!u$([u8("49"), u8("48"), u8("49"), u8("48"), u8("49"), u8("48"), u8("49"), u8("48")], $c).eq(u128("170"))) {
    throw $.abortCode(u64("6"));
  }
  if (!u$([u8("48"), u8("48"), u8("48"), u8("48"), u8("48"), u8("48"), u8("48"), u8("49")], $c).eq(u128("1"))) {
    throw $.abortCode(u64("7"));
  }
  if (!u$([u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49")], $c).eq(u128("255"))) {
    throw $.abortCode(u64("8"));
  }
  if (!u_long$([u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49")], [u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49")], [u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49")], $c).eq(HI_128)) {
    throw $.abortCode(u64("9"));
  }
  if (!u_long$([u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49")], [u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49")], [u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("49"), u8("48")], $c).eq(HI_128.sub(u128("1")))) {
    throw $.abortCode(u64("10"));
  }
  return;
}

export function unit_test_poison$ (
  $c: AptosDataCache,
): void {
  Std.UnitTest.create_signers_for_testing$(u64("0"), $c);
  return;
}


