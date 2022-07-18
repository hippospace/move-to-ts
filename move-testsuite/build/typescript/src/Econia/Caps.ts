import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient} from "aptos";
import * as Std from "../Std";
import * as Book from "./Book";
import * as Orders from "./Orders";
export const packageName = "Econia";
export const moduleAddress = new HexString("0xc0deb00c");
export const moduleName = "Caps";

export const E_FC_EXISTS : U64 = u64("1");
export const E_NOT_ECONIA : U64 = u64("0");
export const E_NO_FC : U64 = u64("2");


export class FC 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "FC";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "b", typeTag: new StructTag(new HexString("0xc0deb00c"), "Book", "FriendCap", []) },
  { name: "o", typeTag: new StructTag(new HexString("0xc0deb00c"), "Orders", "FriendCap", []) }];

  b: Book.FriendCap;
  o: Orders.FriendCap;

  constructor(proto: any, public typeTag: TypeTag) {
    this.b = proto['b'] as Book.FriendCap;
    this.o = proto['o'] as Orders.FriendCap;
  }

  static FCParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : FC {
    const proto = $.parseStructProto(data, typeTag, repo, FC);
    return new FC(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, FC, typeParams);
    return result as unknown as FC;
  }
}
export function book_f_c$ (
  $c: AptosDataCache,
): Book.FriendCap {
  if (!has_f_c$($c)) {
    throw $.abortCode(E_NO_FC);
  }
  return $.copy($c.borrow_global<FC>(new StructTag(new HexString("0xc0deb00c"), "Caps", "FC", []), new HexString("0xc0deb00c")).b);
}

// #[test]
export function book_f_c_failure$ (
  $c: AptosDataCache,
): void {
  book_f_c$($c);
  return;
}

export function has_f_c$ (
  $c: AptosDataCache,
): boolean {
  return $c.exists(new StructTag(new HexString("0xc0deb00c"), "Caps", "FC", []), new HexString("0xc0deb00c"));
}

// #[test]
export function has_f_c_success$ (
  econia: HexString,
  $c: AptosDataCache,
): void {
  if (!!has_f_c$($c)) {
    throw $.abortCode(u64("0"));
  }
  init_caps$(econia, $c);
  if (!has_f_c$($c)) {
    throw $.abortCode(u64("1"));
  }
  return;
}

export function init_caps$ (
  account: HexString,
  $c: AptosDataCache,
): void {
  let addr;
  addr = Std.Signer.address_of$(account, $c);
  if (!($.copy(addr).hex() === new HexString("0xc0deb00c").hex())) {
    throw $.abortCode(E_NOT_ECONIA);
  }
  if (!!$c.exists(new StructTag(new HexString("0xc0deb00c"), "Caps", "FC", []), $.copy(addr))) {
    throw $.abortCode(E_FC_EXISTS);
  }
  $c.move_to(new StructTag(new HexString("0xc0deb00c"), "Caps", "FC", []), account, new FC({ b: Book.get_friend_cap$(account, $c), o: Orders.get_friend_cap$(account, $c) }, new StructTag(new HexString("0xc0deb00c"), "Caps", "FC", [])));
  return;
}

// #[test]
export function init_caps_failure_exists$ (
  econia: HexString,
  $c: AptosDataCache,
): void {
  init_caps$(econia, $c);
  init_caps$(econia, $c);
  return;
}

// #[test]
export function init_caps_failure_not_econia$ (
  account: HexString,
  $c: AptosDataCache,
): void {
  init_caps$(account, $c);
  return;
}

// #[test]
export function init_caps_success$ (
  econia: HexString,
  $c: AptosDataCache,
): void {
  let temp$1, temp$2, temp$3, temp$4, temp$5, temp$6;
  init_caps$(econia, $c);
  temp$3 = econia;
  temp$2 = u64("0");
  temp$1 = book_f_c$($c);
  Book.init_book$(temp$3, temp$2, temp$1, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  temp$6 = econia;
  temp$5 = u64("0");
  temp$4 = orders_f_c$($c);
  Orders.init_orders$(temp$6, temp$5, temp$4, $c, [new StructTag(new HexString("0xc0deb00c"), "Book", "BT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "QT", []), new StructTag(new HexString("0xc0deb00c"), "Book", "ET", [])] as TypeTag[]);
  return;
}

export function orders_f_c$ (
  $c: AptosDataCache,
): Orders.FriendCap {
  if (!has_f_c$($c)) {
    throw $.abortCode(E_NO_FC);
  }
  return $.copy($c.borrow_global<FC>(new StructTag(new HexString("0xc0deb00c"), "Caps", "FC", []), new HexString("0xc0deb00c")).o);
}

// #[test]
export function orders_f_c_failure$ (
  $c: AptosDataCache,
): void {
  orders_f_c$($c);
  return;
}

export function unit_test_poison$ (
  $c: AptosDataCache,
): void {
  Std.UnitTest.create_signers_for_testing$(u64("0"), $c);
  return;
}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser("0xc0deb00c::Caps::FC", FC.FCParser);
}

