import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient} from "aptos";
import * as Std from "../Std";
import * as Comparator from "./Comparator";
export const packageName = "AptosFramework";
export const moduleAddress = new HexString("0x1");
export const moduleName = "SimpleMap";

export const EKEY_ALREADY_EXISTS : U64 = u64("0");
export const EKEY_NOT_FOUND : U64 = u64("1");


export class Element 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "Element";
  static typeParameters: TypeParamDeclType[] = [
    { name: "Key", isPhantom: false },
    { name: "Value", isPhantom: false }
  ];
  static fields: FieldDeclType[] = [
  { name: "key", typeTag: new $.TypeParamIdx(0) },
  { name: "value", typeTag: new $.TypeParamIdx(1) }];

  key: any;
  value: any;

  constructor(proto: any, public typeTag: TypeTag) {
    this.key = proto['key'] as any;
    this.value = proto['value'] as any;
  }

  static ElementParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : Element {
    const proto = $.parseStructProto(data, typeTag, repo, Element);
    return new Element(proto, typeTag);
  }

}

export class SimpleMap 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "SimpleMap";
  static typeParameters: TypeParamDeclType[] = [
    { name: "Key", isPhantom: false },
    { name: "Value", isPhantom: false }
  ];
  static fields: FieldDeclType[] = [
  { name: "data", typeTag: new VectorTag(new StructTag(new HexString("0x1"), "SimpleMap", "Element", [new $.TypeParamIdx(0), new $.TypeParamIdx(1)])) }];

  data: Element[];

  constructor(proto: any, public typeTag: TypeTag) {
    this.data = proto['data'] as Element[];
  }

  static SimpleMapParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : SimpleMap {
    const proto = $.parseStructProto(data, typeTag, repo, SimpleMap);
    return new SimpleMap(proto, typeTag);
  }

}
export function add$ (
  map: SimpleMap,
  key: any,
  value: any,
  $c: AptosDataCache,
  $p: TypeTag[], /* <Key, Value>*/
): void {
  let temp$1, temp$2, end, maybe_idx, maybe_placement, placement;
  [temp$1, temp$2] = [map, key];
  [maybe_idx, maybe_placement] = find$(temp$1, temp$2, $c, [$p[0], $p[1]] as TypeTag[]);
  if (!Std.Option.is_none$(maybe_idx, $c, [AtomicTypeTag.U64] as TypeTag[])) {
    throw $.abortCode(Std.Errors.invalid_argument$(EKEY_ALREADY_EXISTS, $c));
  }
  Std.Vector.push_back$(map.data, new Element({ key: key, value: value }, new StructTag(new HexString("0x1"), "SimpleMap", "Element", [$p[0], $p[1]])), $c, [new StructTag(new HexString("0x1"), "SimpleMap", "Element", [$p[0], $p[1]])] as TypeTag[]);
  placement = Std.Option.extract$(maybe_placement, $c, [AtomicTypeTag.U64] as TypeTag[]);
  end = Std.Vector.length$(map.data, $c, [new StructTag(new HexString("0x1"), "SimpleMap", "Element", [$p[0], $p[1]])] as TypeTag[]).sub(u64("1"));
  while ($.copy(placement).lt($.copy(end))) {
    {
      Std.Vector.swap$(map.data, $.copy(placement), $.copy(end), $c, [new StructTag(new HexString("0x1"), "SimpleMap", "Element", [$p[0], $p[1]])] as TypeTag[]);
      placement = $.copy(placement).add(u64("1"));
    }

  }return;
}

// #[test]
export function add_remove_many$ (
  $c: AptosDataCache,
): void {
  let temp$1, temp$10, temp$11, temp$12, temp$13, temp$14, temp$15, temp$16, temp$17, temp$18, temp$19, temp$2, temp$20, temp$21, temp$22, temp$23, temp$24, temp$25, temp$26, temp$27, temp$28, temp$29, temp$3, temp$30, temp$31, temp$32, temp$33, temp$34, temp$35, temp$4, temp$5, temp$6, temp$7, temp$8, temp$9, map;
  map = create$($c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[]);
  if (!length$(map, $c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[]).eq(u64("0"))) {
    throw $.abortCode(u64("0"));
  }
  temp$2 = map;
  temp$1 = u64("3");
  if (!!contains_key$(temp$2, temp$1, $c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[])) {
    throw $.abortCode(u64("1"));
  }
  add$(map, u64("3"), u64("1"), $c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[]);
  if (!length$(map, $c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[]).eq(u64("1"))) {
    throw $.abortCode(u64("2"));
  }
  temp$4 = map;
  temp$3 = u64("3");
  if (!contains_key$(temp$4, temp$3, $c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[])) {
    throw $.abortCode(u64("3"));
  }
  temp$6 = map;
  temp$5 = u64("3");
  temp$7 = u64("1");
  if (!borrow$(temp$6, temp$5, $c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[]).eq(temp$7)) {
    throw $.abortCode(u64("4"));
  }
  temp$9 = map;
  temp$8 = u64("3");
  $.set(borrow_mut$(temp$9, temp$8, $c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[]), u64("2"));
  temp$11 = map;
  temp$10 = u64("3");
  temp$12 = u64("2");
  if (!borrow$(temp$11, temp$10, $c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[]).eq(temp$12)) {
    throw $.abortCode(u64("5"));
  }
  temp$14 = map;
  temp$13 = u64("2");
  if (!!contains_key$(temp$14, temp$13, $c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[])) {
    throw $.abortCode(u64("6"));
  }
  add$(map, u64("2"), u64("5"), $c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[]);
  if (!length$(map, $c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[]).eq(u64("2"))) {
    throw $.abortCode(u64("7"));
  }
  temp$16 = map;
  temp$15 = u64("2");
  if (!contains_key$(temp$16, temp$15, $c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[])) {
    throw $.abortCode(u64("8"));
  }
  temp$18 = map;
  temp$17 = u64("2");
  temp$19 = u64("5");
  if (!borrow$(temp$18, temp$17, $c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[]).eq(temp$19)) {
    throw $.abortCode(u64("9"));
  }
  temp$21 = map;
  temp$20 = u64("2");
  $.set(borrow_mut$(temp$21, temp$20, $c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[]), u64("9"));
  temp$23 = map;
  temp$22 = u64("2");
  temp$24 = u64("9");
  if (!borrow$(temp$23, temp$22, $c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[]).eq(temp$24)) {
    throw $.abortCode(u64("10"));
  }
  temp$26 = map;
  temp$25 = u64("2");
  remove$(temp$26, temp$25, $c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[]);
  if (!length$(map, $c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[]).eq(u64("1"))) {
    throw $.abortCode(u64("11"));
  }
  temp$28 = map;
  temp$27 = u64("2");
  if (!!contains_key$(temp$28, temp$27, $c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[])) {
    throw $.abortCode(u64("12"));
  }
  temp$30 = map;
  temp$29 = u64("3");
  temp$31 = u64("2");
  if (!borrow$(temp$30, temp$29, $c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[]).eq(temp$31)) {
    throw $.abortCode(u64("13"));
  }
  temp$33 = map;
  temp$32 = u64("3");
  remove$(temp$33, temp$32, $c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[]);
  if (!length$(map, $c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[]).eq(u64("0"))) {
    throw $.abortCode(u64("14"));
  }
  temp$35 = map;
  temp$34 = u64("3");
  if (!!contains_key$(temp$35, temp$34, $c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[])) {
    throw $.abortCode(u64("15"));
  }
  destroy_empty$(map, $c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[]);
  return;
}

// #[test]
export function add_twice$ (
  $c: AptosDataCache,
): void {
  let temp$1, temp$2, map;
  map = create$($c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[]);
  add$(map, u64("3"), u64("1"), $c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[]);
  add$(map, u64("3"), u64("1"), $c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[]);
  temp$2 = map;
  temp$1 = u64("3");
  remove$(temp$2, temp$1, $c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[]);
  destroy_empty$(map, $c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[]);
  return;
}

export function borrow$ (
  map: SimpleMap,
  key: any,
  $c: AptosDataCache,
  $p: TypeTag[], /* <Key, Value>*/
): any {
  let idx, maybe_idx;
  [maybe_idx, ] = find$(map, key, $c, [$p[0], $p[1]] as TypeTag[]);
  if (!Std.Option.is_some$(maybe_idx, $c, [AtomicTypeTag.U64] as TypeTag[])) {
    throw $.abortCode(Std.Errors.invalid_argument$(EKEY_NOT_FOUND, $c));
  }
  idx = Std.Option.extract$(maybe_idx, $c, [AtomicTypeTag.U64] as TypeTag[]);
  return Std.Vector.borrow$(map.data, $.copy(idx), $c, [new StructTag(new HexString("0x1"), "SimpleMap", "Element", [$p[0], $p[1]])] as TypeTag[]).value;
}

export function borrow_mut$ (
  map: SimpleMap,
  key: any,
  $c: AptosDataCache,
  $p: TypeTag[], /* <Key, Value>*/
): any {
  let temp$1, temp$2, idx, maybe_idx;
  [temp$1, temp$2] = [map, key];
  [maybe_idx, ] = find$(temp$1, temp$2, $c, [$p[0], $p[1]] as TypeTag[]);
  if (!Std.Option.is_some$(maybe_idx, $c, [AtomicTypeTag.U64] as TypeTag[])) {
    throw $.abortCode(Std.Errors.invalid_argument$(EKEY_NOT_FOUND, $c));
  }
  idx = Std.Option.extract$(maybe_idx, $c, [AtomicTypeTag.U64] as TypeTag[]);
  return Std.Vector.borrow_mut$(map.data, $.copy(idx), $c, [new StructTag(new HexString("0x1"), "SimpleMap", "Element", [$p[0], $p[1]])] as TypeTag[]).value;
}

export function contains_key$ (
  map: SimpleMap,
  key: any,
  $c: AptosDataCache,
  $p: TypeTag[], /* <Key, Value>*/
): boolean {
  let maybe_idx;
  [maybe_idx, ] = find$(map, key, $c, [$p[0], $p[1]] as TypeTag[]);
  return Std.Option.is_some$(maybe_idx, $c, [AtomicTypeTag.U64] as TypeTag[]);
}

export function create$ (
  $c: AptosDataCache,
  $p: TypeTag[], /* <Key, Value>*/
): SimpleMap {
  return new SimpleMap({ data: Std.Vector.empty$($c, [new StructTag(new HexString("0x1"), "SimpleMap", "Element", [$p[0], $p[1]])] as TypeTag[]) }, new StructTag(new HexString("0x1"), "SimpleMap", "SimpleMap", [$p[0], $p[1]]));
}

export function destroy_empty$ (
  map: SimpleMap,
  $c: AptosDataCache,
  $p: TypeTag[], /* <Key, Value>*/
): void {
  let { data: data } = map;
  Std.Vector.destroy_empty$(data, $c, [new StructTag(new HexString("0x1"), "SimpleMap", "Element", [$p[0], $p[1]])] as TypeTag[]);
  return;
}

export function find$ (
  map: SimpleMap,
  key: any,
  $c: AptosDataCache,
  $p: TypeTag[], /* <Key, Value>*/
): [Std.Option.Option, Std.Option.Option] {
  let temp$1, temp$2, temp$3, temp$4, left, length, mid, potential_key, right;
  length = Std.Vector.length$(map.data, $c, [new StructTag(new HexString("0x1"), "SimpleMap", "Element", [$p[0], $p[1]])] as TypeTag[]);
  if ($.copy(length).eq(u64("0"))) {
    return [Std.Option.none$($c, [AtomicTypeTag.U64] as TypeTag[]), Std.Option.some$(u64("0"), $c, [AtomicTypeTag.U64] as TypeTag[])];
  }
  else{
  }
  left = u64("0");
  right = $.copy(length);
  while ($.copy(left).neq($.copy(right))) {
    {
      mid = $.copy(left).add($.copy(right)).div(u64("2"));
      potential_key = Std.Vector.borrow$(map.data, $.copy(mid), $c, [new StructTag(new HexString("0x1"), "SimpleMap", "Element", [$p[0], $p[1]])] as TypeTag[]).key;
      temp$1 = Comparator.compare$(potential_key, key, $c, [$p[0]] as TypeTag[]);
      if (Comparator.is_smaller_than$(temp$1, $c)) {
        left = $.copy(mid).add(u64("1"));
      }
      else{
        right = $.copy(mid);
      }
    }

  }if ($.copy(left).neq($.copy(length))) {
    temp$2 = $.dyn_eq($p[0], key, Std.Vector.borrow$(map.data, $.copy(left), $c, [new StructTag(new HexString("0x1"), "SimpleMap", "Element", [$p[0], $p[1]])] as TypeTag[]).key);
  }
  else{
    temp$2 = false;
  }
  if (temp$2) {
    [temp$3, temp$4] = [Std.Option.some$($.copy(left), $c, [AtomicTypeTag.U64] as TypeTag[]), Std.Option.none$($c, [AtomicTypeTag.U64] as TypeTag[])];
  }
  else{
    [temp$3, temp$4] = [Std.Option.none$($c, [AtomicTypeTag.U64] as TypeTag[]), Std.Option.some$($.copy(left), $c, [AtomicTypeTag.U64] as TypeTag[])];
  }
  return [temp$3, temp$4];
}

export function length$ (
  map: SimpleMap,
  $c: AptosDataCache,
  $p: TypeTag[], /* <Key, Value>*/
): U64 {
  return Std.Vector.length$(map.data, $c, [new StructTag(new HexString("0x1"), "SimpleMap", "Element", [$p[0], $p[1]])] as TypeTag[]);
}

export function remove$ (
  map: SimpleMap,
  key: any,
  $c: AptosDataCache,
  $p: TypeTag[], /* <Key, Value>*/
): [any, any] {
  let temp$1, temp$2, end, maybe_idx, placement;
  [temp$1, temp$2] = [map, key];
  [maybe_idx, ] = find$(temp$1, temp$2, $c, [$p[0], $p[1]] as TypeTag[]);
  if (!Std.Option.is_some$(maybe_idx, $c, [AtomicTypeTag.U64] as TypeTag[])) {
    throw $.abortCode(Std.Errors.invalid_argument$(EKEY_NOT_FOUND, $c));
  }
  placement = Std.Option.extract$(maybe_idx, $c, [AtomicTypeTag.U64] as TypeTag[]);
  end = Std.Vector.length$(map.data, $c, [new StructTag(new HexString("0x1"), "SimpleMap", "Element", [$p[0], $p[1]])] as TypeTag[]).sub(u64("1"));
  while ($.copy(placement).lt($.copy(end))) {
    {
      Std.Vector.swap$(map.data, $.copy(placement), $.copy(placement).add(u64("1")), $c, [new StructTag(new HexString("0x1"), "SimpleMap", "Element", [$p[0], $p[1]])] as TypeTag[]);
      placement = $.copy(placement).add(u64("1"));
    }

  }let { key: key__3, value: value } = Std.Vector.pop_back$(map.data, $c, [new StructTag(new HexString("0x1"), "SimpleMap", "Element", [$p[0], $p[1]])] as TypeTag[]);
  return [key__3, value];
}

// #[test]
export function remove_twice$ (
  $c: AptosDataCache,
): void {
  let temp$1, temp$2, temp$3, temp$4, map;
  map = create$($c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[]);
  add$(map, u64("3"), u64("1"), $c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[]);
  temp$2 = map;
  temp$1 = u64("3");
  remove$(temp$2, temp$1, $c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[]);
  temp$4 = map;
  temp$3 = u64("3");
  remove$(temp$4, temp$3, $c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[]);
  destroy_empty$(map, $c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[]);
  return;
}

// #[test]
export function test_several$ (
  $c: AptosDataCache,
): void {
  let temp$1, temp$10, temp$11, temp$12, temp$13, temp$14, temp$15, temp$16, temp$2, temp$3, temp$4, temp$5, temp$6, temp$7, temp$8, temp$9, idx, map;
  map = create$($c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[]);
  add$(map, u64("6"), u64("6"), $c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[]);
  add$(map, u64("1"), u64("1"), $c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[]);
  add$(map, u64("5"), u64("5"), $c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[]);
  add$(map, u64("2"), u64("2"), $c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[]);
  add$(map, u64("3"), u64("3"), $c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[]);
  add$(map, u64("0"), u64("0"), $c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[]);
  add$(map, u64("7"), u64("7"), $c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[]);
  add$(map, u64("4"), u64("4"), $c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[]);
  idx = u64("0");
  while ($.copy(idx).lt(Std.Vector.length$(map.data, $c, [new StructTag(new HexString("0x1"), "SimpleMap", "Element", [AtomicTypeTag.U64, AtomicTypeTag.U64])] as TypeTag[]))) {
    {
      if (!$.copy(idx).eq($.copy(Std.Vector.borrow$(map.data, $.copy(idx), $c, [new StructTag(new HexString("0x1"), "SimpleMap", "Element", [AtomicTypeTag.U64, AtomicTypeTag.U64])] as TypeTag[]).key))) {
        throw $.abortCode($.copy(idx));
      }
      idx = $.copy(idx).add(u64("1"));
    }

  }temp$2 = map;
  temp$1 = u64("0");
  remove$(temp$2, temp$1, $c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[]);
  temp$4 = map;
  temp$3 = u64("1");
  remove$(temp$4, temp$3, $c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[]);
  temp$6 = map;
  temp$5 = u64("2");
  remove$(temp$6, temp$5, $c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[]);
  temp$8 = map;
  temp$7 = u64("3");
  remove$(temp$8, temp$7, $c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[]);
  temp$10 = map;
  temp$9 = u64("4");
  remove$(temp$10, temp$9, $c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[]);
  temp$12 = map;
  temp$11 = u64("5");
  remove$(temp$12, temp$11, $c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[]);
  temp$14 = map;
  temp$13 = u64("6");
  remove$(temp$14, temp$13, $c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[]);
  temp$16 = map;
  temp$15 = u64("7");
  remove$(temp$16, temp$15, $c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[]);
  destroy_empty$(map, $c, [AtomicTypeTag.U64, AtomicTypeTag.U64] as TypeTag[]);
  return;
}

export function unit_test_poison$ (
  $c: AptosDataCache,
): void {
  Std.UnitTest.create_signers_for_testing$(u64("0"), $c);
  return;
}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser("0x1::SimpleMap::Element", Element.ElementParser);
  repo.addParser("0x1::SimpleMap::SimpleMap", SimpleMap.SimpleMapParser);
}

