import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient} from "aptos";
import * as AptosFramework from "../AptosFramework";
import * as Std from "../Std";
export const packageName = "TokenRegistry";
export const moduleAddress = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
export const moduleName = "TokenRegistry";

export const E_ADMIN_ONLY : U64 = u64("1");
export const E_ALREADY_INITIALIZED : U64 = u64("2");
export const E_SYMBOL_ALREADY_EXISTS : U64 = u64("3");
export const E_SYMBOL_DOES_NOT_EXIST : U64 = u64("4");
export const E_TYPE_ALREADY_EXISTS : U64 = u64("4");


export class FakeBtc 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "FakeBtc";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  ];

  constructor(proto: any, public typeTag: TypeTag) {

  }

  static FakeBtcParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : FakeBtc {
    const proto = $.parseStructProto(data, typeTag, repo, FakeBtc);
    return new FakeBtc(proto, typeTag);
  }

}

export class FakeEth 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "FakeEth";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  ];

  constructor(proto: any, public typeTag: TypeTag) {

  }

  static FakeEthParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : FakeEth {
    const proto = $.parseStructProto(data, typeTag, repo, FakeEth);
    return new FakeEth(proto, typeTag);
  }

}

export class TokenInfo 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "TokenInfo";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "name", typeTag: new StructTag(new HexString("0x1"), "ASCII", "String", []) },
  { name: "symbol", typeTag: new StructTag(new HexString("0x1"), "ASCII", "String", []) },
  { name: "description", typeTag: new StructTag(new HexString("0x1"), "ASCII", "String", []) },
  { name: "decimals", typeTag: AtomicTypeTag.U8 },
  { name: "logo_url", typeTag: new StructTag(new HexString("0x1"), "ASCII", "String", []) },
  { name: "project_url", typeTag: new StructTag(new HexString("0x1"), "ASCII", "String", []) },
  { name: "delisted", typeTag: AtomicTypeTag.Bool },
  { name: "token_type", typeTag: new StructTag(new HexString("0x1"), "TypeInfo", "TypeInfo", []) }];

  name: Std.ASCII.String;
  symbol: Std.ASCII.String;
  description: Std.ASCII.String;
  decimals: U8;
  logo_url: Std.ASCII.String;
  project_url: Std.ASCII.String;
  delisted: boolean;
  token_type: AptosFramework.TypeInfo.TypeInfo;

  constructor(proto: any, public typeTag: TypeTag) {
    this.name = proto['name'] as Std.ASCII.String;
    this.symbol = proto['symbol'] as Std.ASCII.String;
    this.description = proto['description'] as Std.ASCII.String;
    this.decimals = proto['decimals'] as U8;
    this.logo_url = proto['logo_url'] as Std.ASCII.String;
    this.project_url = proto['project_url'] as Std.ASCII.String;
    this.delisted = proto['delisted'] as boolean;
    this.token_type = proto['token_type'] as AptosFramework.TypeInfo.TypeInfo;
  }

  static TokenInfoParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : TokenInfo {
    const proto = $.parseStructProto(data, typeTag, repo, TokenInfo);
    return new TokenInfo(proto, typeTag);
  }

}

export class TokenRegistry 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "TokenRegistry";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "admin", typeTag: AtomicTypeTag.Address },
  { name: "symbol_to_token_info", typeTag: new StructTag(new HexString("0x1"), "Table", "Table", [new StructTag(new HexString("0x1"), "ASCII", "String", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TokenRegistry", "TokenInfo", [])]) },
  { name: "type_info_to_symbol", typeTag: new StructTag(new HexString("0x1"), "Table", "Table", [new StructTag(new HexString("0x1"), "TypeInfo", "TypeInfo", []), new StructTag(new HexString("0x1"), "ASCII", "String", [])]) },
  { name: "symbol_to_list_idx", typeTag: new StructTag(new HexString("0x1"), "Table", "Table", [new StructTag(new HexString("0x1"), "ASCII", "String", []), AtomicTypeTag.U64]) },
  { name: "token_info_list", typeTag: new VectorTag(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TokenRegistry", "TokenInfo", [])) }];

  admin: HexString;
  symbol_to_token_info: AptosFramework.Table.Table;
  type_info_to_symbol: AptosFramework.Table.Table;
  symbol_to_list_idx: AptosFramework.Table.Table;
  token_info_list: TokenInfo[];

  constructor(proto: any, public typeTag: TypeTag) {
    this.admin = proto['admin'] as HexString;
    this.symbol_to_token_info = proto['symbol_to_token_info'] as AptosFramework.Table.Table;
    this.type_info_to_symbol = proto['type_info_to_symbol'] as AptosFramework.Table.Table;
    this.symbol_to_list_idx = proto['symbol_to_list_idx'] as AptosFramework.Table.Table;
    this.token_info_list = proto['token_info_list'] as TokenInfo[];
  }

  static TokenRegistryParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : TokenRegistry {
    const proto = $.parseStructProto(data, typeTag, repo, TokenRegistry);
    return new TokenRegistry(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, TokenRegistry, typeParams);
    return result as unknown as TokenRegistry;
  }
}
export function add_token$ (
  admin: HexString,
  name: U8[],
  symbol: U8[],
  description: U8[],
  decimals: U8,
  logo_url: U8[],
  project_url: U8[],
  $c: AptosDataCache,
  $p: TypeTag[], /* <TokenType>*/
): void {
  let admin_addr, index, registry, token_info, type_info;
  admin_addr = Std.Signer.address_of$(admin, $c);
  registry = $c.borrow_global_mut<TokenRegistry>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TokenRegistry", "TokenRegistry", []), $.copy(admin_addr));
  type_info = AptosFramework.TypeInfo.type_of$($c, [$p[0]] as TypeTag[]);
  token_info = new TokenInfo({ name: Std.ASCII.string$($.copy(name), $c), symbol: Std.ASCII.string$($.copy(symbol), $c), description: Std.ASCII.string$($.copy(description), $c), decimals: $.copy(decimals), logo_url: Std.ASCII.string$($.copy(logo_url), $c), project_url: Std.ASCII.string$($.copy(project_url), $c), delisted: false, token_type: $.copy(type_info) }, new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TokenRegistry", "TokenInfo", []));
  if (!!AptosFramework.Table.contains$(registry.symbol_to_token_info, $.copy(token_info.symbol), $c, [new StructTag(new HexString("0x1"), "ASCII", "String", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TokenRegistry", "TokenInfo", [])] as TypeTag[])) {
    throw $.abortCode(E_SYMBOL_ALREADY_EXISTS);
  }
  if (!!AptosFramework.Table.contains$(registry.type_info_to_symbol, $.copy(type_info), $c, [new StructTag(new HexString("0x1"), "TypeInfo", "TypeInfo", []), new StructTag(new HexString("0x1"), "ASCII", "String", [])] as TypeTag[])) {
    throw $.abortCode(E_TYPE_ALREADY_EXISTS);
  }
  AptosFramework.Table.add$(registry.symbol_to_token_info, $.copy(token_info.symbol), $.copy(token_info), $c, [new StructTag(new HexString("0x1"), "ASCII", "String", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TokenRegistry", "TokenInfo", [])] as TypeTag[]);
  AptosFramework.Table.add$(registry.type_info_to_symbol, $.copy(type_info), $.copy(token_info.symbol), $c, [new StructTag(new HexString("0x1"), "TypeInfo", "TypeInfo", []), new StructTag(new HexString("0x1"), "ASCII", "String", [])] as TypeTag[]);
  index = Std.Vector.length$(registry.token_info_list, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TokenRegistry", "TokenInfo", [])] as TypeTag[]);
  Std.Vector.push_back$(registry.token_info_list, $.copy(token_info), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TokenRegistry", "TokenInfo", [])] as TypeTag[]);
  AptosFramework.Table.add$(registry.symbol_to_list_idx, $.copy(token_info.symbol), $.copy(index), $c, [new StructTag(new HexString("0x1"), "ASCII", "String", []), AtomicTypeTag.U64] as TypeTag[]);
  return;
}

export function add_token_script$ (
  admin: HexString,
  name: U8[],
  symbol: U8[],
  description: U8[],
  decimals: U8,
  logo_url: U8[],
  project_url: U8[],
  $c: AptosDataCache,
  $p: TypeTag[], /* <TokenType>*/
): void {
  return add_token$(admin, $.copy(name), $.copy(symbol), $.copy(description), $.copy(decimals), $.copy(logo_url), $.copy(project_url), $c, [$p[0]] as TypeTag[]);
}


export function buildPayload_add_token_script (
  admin: HexString,
  name: U8[],
  symbol: U8[],
  description: U8[],
  decimals: U8,
  logo_url: U8[],
  project_url: U8[],
  $p: TypeTag[], /* <TokenType>*/
) {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    "0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::TokenRegistry::add_token_script",
    typeParamStrings,
    [
      name.map(u => u.toPayloadArg()),
      symbol.map(u => u.toPayloadArg()),
      description.map(u => u.toPayloadArg()),
      decimals.toPayloadArg(),
      logo_url.map(u => u.toPayloadArg()),
      project_url.map(u => u.toPayloadArg()),
    ]
  );

}
export function delist_token$ (
  admin: HexString,
  symbol: U8[],
  $c: AptosDataCache,
): void {
  let admin_addr, index, registry, symbol_str, type_info;
  admin_addr = Std.Signer.address_of$(admin, $c);
  registry = $c.borrow_global_mut<TokenRegistry>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TokenRegistry", "TokenRegistry", []), $.copy(admin_addr));
  symbol_str = Std.ASCII.string$($.copy(symbol), $c);
  if (!AptosFramework.Table.contains$(registry.symbol_to_token_info, $.copy(symbol_str), $c, [new StructTag(new HexString("0x1"), "ASCII", "String", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TokenRegistry", "TokenInfo", [])] as TypeTag[])) {
    throw $.abortCode(E_SYMBOL_DOES_NOT_EXIST);
  }
  index = $.copy(AptosFramework.Table.borrow$(registry.symbol_to_list_idx, $.copy(symbol_str), $c, [new StructTag(new HexString("0x1"), "ASCII", "String", []), AtomicTypeTag.U64] as TypeTag[]));
  type_info = $.copy(AptosFramework.Table.borrow$(registry.symbol_to_token_info, $.copy(symbol_str), $c, [new StructTag(new HexString("0x1"), "ASCII", "String", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TokenRegistry", "TokenInfo", [])] as TypeTag[]).token_type);
  Std.Vector.borrow_mut$(registry.token_info_list, $.copy(index), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TokenRegistry", "TokenInfo", [])] as TypeTag[]).delisted = true;
  AptosFramework.Table.remove$(registry.symbol_to_list_idx, $.copy(symbol_str), $c, [new StructTag(new HexString("0x1"), "ASCII", "String", []), AtomicTypeTag.U64] as TypeTag[]);
  AptosFramework.Table.remove$(registry.symbol_to_token_info, $.copy(symbol_str), $c, [new StructTag(new HexString("0x1"), "ASCII", "String", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TokenRegistry", "TokenInfo", [])] as TypeTag[]);
  AptosFramework.Table.remove$(registry.type_info_to_symbol, $.copy(type_info), $c, [new StructTag(new HexString("0x1"), "TypeInfo", "TypeInfo", []), new StructTag(new HexString("0x1"), "ASCII", "String", [])] as TypeTag[]);
  return;
}

export function delist_token_script$ (
  admin: HexString,
  symbol: U8[],
  $c: AptosDataCache,
): void {
  delist_token$(admin, $.copy(symbol), $c);
  return;
}


export function buildPayload_delist_token_script (
  admin: HexString,
  symbol: U8[],
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::TokenRegistry::delist_token_script",
    typeParamStrings,
    [
      symbol.map(u => u.toPayloadArg()),
    ]
  );

}
// test func
export function do_add_token$ (
  admin: HexString,
  symbol: U8[],
  $c: AptosDataCache,
  $p: TypeTag[], /* <TokenType>*/
): void {
  let decimals, description, key, logo, name, project, registry, token_info;
  name = [u8("110"), u8("97"), u8("109"), u8("101"), u8("49"), u8("50"), u8("51")];
  description = [u8("100"), u8("101"), u8("115"), u8("99"), u8("49"), u8("50"), u8("51")];
  logo = [u8("108"), u8("111"), u8("103"), u8("111"), u8("49"), u8("50"), u8("51")];
  project = [u8("112"), u8("114"), u8("111"), u8("106"), u8("101"), u8("99"), u8("116"), u8("49"), u8("50"), u8("51")];
  decimals = u8("6");
  add_token$(admin, $.copy(name), $.copy(symbol), $.copy(description), $.copy(decimals), $.copy(logo), $.copy(project), $c, [$p[0]] as TypeTag[]);
  registry = $c.borrow_global<TokenRegistry>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TokenRegistry", "TokenRegistry", []), Std.Signer.address_of$(admin, $c));
  key = Std.ASCII.string$($.copy(symbol), $c);
  token_info = AptosFramework.Table.borrow$(registry.symbol_to_token_info, $.copy(key), $c, [new StructTag(new HexString("0x1"), "ASCII", "String", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TokenRegistry", "TokenInfo", [])] as TypeTag[]);
  if (!$.deep_eq($.copy(token_info.name), Std.ASCII.string$($.copy(name), $c))) {
    throw $.abortCode(u64("5"));
  }
  if (!$.deep_eq($.copy(token_info.description), Std.ASCII.string$($.copy(description), $c))) {
    throw $.abortCode(u64("5"));
  }
  if (!$.deep_eq($.copy(token_info.logo_url), Std.ASCII.string$($.copy(logo), $c))) {
    throw $.abortCode(u64("5"));
  }
  if (!$.deep_eq($.copy(token_info.project_url), Std.ASCII.string$($.copy(project), $c))) {
    throw $.abortCode(u64("5"));
  }
  if (!$.copy(token_info.decimals).eq($.copy(decimals))) {
    throw $.abortCode(u64("5"));
  }
  return;
}

export function has_token$ (
  admin: HexString,
  $c: AptosDataCache,
  $p: TypeTag[], /* <TokenType>*/
): boolean {
  let registry, type_info;
  registry = $c.borrow_global<TokenRegistry>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TokenRegistry", "TokenRegistry", []), $.copy(admin));
  type_info = AptosFramework.TypeInfo.type_of$($c, [$p[0]] as TypeTag[]);
  return AptosFramework.Table.contains$(registry.type_info_to_symbol, $.copy(type_info), $c, [new StructTag(new HexString("0x1"), "TypeInfo", "TypeInfo", []), new StructTag(new HexString("0x1"), "ASCII", "String", [])] as TypeTag[]);
}

export function initialize$ (
  admin: HexString,
  $c: AptosDataCache,
): void {
  let temp$1, temp$2, temp$3, temp$4, temp$5, temp$6, admin_addr;
  admin_addr = Std.Signer.address_of$(admin, $c);
  if (!!$c.exists(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TokenRegistry", "TokenRegistry", []), $.copy(admin_addr))) {
    throw $.abortCode(E_ALREADY_INITIALIZED);
  }
  temp$6 = admin;
  temp$1 = $.copy(admin_addr);
  temp$2 = AptosFramework.Table.new__$($c, [new StructTag(new HexString("0x1"), "ASCII", "String", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TokenRegistry", "TokenInfo", [])] as TypeTag[]);
  temp$3 = AptosFramework.Table.new__$($c, [new StructTag(new HexString("0x1"), "TypeInfo", "TypeInfo", []), new StructTag(new HexString("0x1"), "ASCII", "String", [])] as TypeTag[]);
  temp$4 = Std.Vector.empty$($c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TokenRegistry", "TokenInfo", [])] as TypeTag[]);
  temp$5 = AptosFramework.Table.new__$($c, [new StructTag(new HexString("0x1"), "ASCII", "String", []), AtomicTypeTag.U64] as TypeTag[]);
  $c.move_to(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TokenRegistry", "TokenRegistry", []), temp$6, new TokenRegistry({ admin: temp$1, symbol_to_token_info: temp$2, type_info_to_symbol: temp$3, symbol_to_list_idx: temp$5, token_info_list: temp$4 }, new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TokenRegistry", "TokenRegistry", [])));
  return;
}

export function initialize_script$ (
  admin: HexString,
  $c: AptosDataCache,
): void {
  initialize$(admin, $c);
  return;
}


export function buildPayload_initialize_script (
  admin: HexString,
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::TokenRegistry::initialize_script",
    typeParamStrings,
    []
  );

}
export function is_registry_initialized$ (
  admin: HexString,
  $c: AptosDataCache,
): boolean {
  return $c.exists(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TokenRegistry", "TokenRegistry", []), $.copy(admin));
}

// test func
export function test_add_then_delist_then_add$ (
  admin: HexString,
  $c: AptosDataCache,
): void {
  initialize$(admin, $c);
  do_add_token$(admin, [u8("66"), u8("84"), u8("67")], $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TokenRegistry", "FakeBtc", [])] as TypeTag[]);
  if (!has_token$(Std.Signer.address_of$(admin, $c), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TokenRegistry", "FakeBtc", [])] as TypeTag[])) {
    throw $.abortCode(u64("5"));
  }
  delist_token$(admin, [u8("66"), u8("84"), u8("67")], $c);
  if (!!has_token$(Std.Signer.address_of$(admin, $c), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TokenRegistry", "FakeBtc", [])] as TypeTag[])) {
    throw $.abortCode(u64("5"));
  }
  do_add_token$(admin, [u8("66"), u8("84"), u8("67")], $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TokenRegistry", "FakeBtc", [])] as TypeTag[]);
  if (!has_token$(Std.Signer.address_of$(admin, $c), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TokenRegistry", "FakeBtc", [])] as TypeTag[])) {
    throw $.abortCode(u64("5"));
  }
  return;
}

// test func
export function test_add_token$ (
  admin: HexString,
  $c: AptosDataCache,
): void {
  initialize$(admin, $c);
  do_add_token$(admin, [u8("66"), u8("84"), u8("67")], $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TokenRegistry", "FakeBtc", [])] as TypeTag[]);
  return;
}

// test func
export function test_add_token_before_initialize$ (
  admin: HexString,
  $c: AptosDataCache,
): void {
  do_add_token$(admin, [u8("66"), u8("84"), u8("67")], $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TokenRegistry", "FakeBtc", [])] as TypeTag[]);
  return;
}

// test func
export function test_add_token_same_symbol$ (
  admin: HexString,
  $c: AptosDataCache,
): void {
  initialize$(admin, $c);
  do_add_token$(admin, [u8("66"), u8("84"), u8("67")], $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TokenRegistry", "FakeBtc", [])] as TypeTag[]);
  do_add_token$(admin, [u8("66"), u8("84"), u8("67")], $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TokenRegistry", "FakeEth", [])] as TypeTag[]);
  return;
}

// test func
export function test_add_token_same_type$ (
  admin: HexString,
  $c: AptosDataCache,
): void {
  initialize$(admin, $c);
  do_add_token$(admin, [u8("66"), u8("84"), u8("67")], $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TokenRegistry", "FakeBtc", [])] as TypeTag[]);
  do_add_token$(admin, [u8("69"), u8("84"), u8("72")], $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TokenRegistry", "FakeBtc", [])] as TypeTag[]);
  return;
}

// test func
export function test_add_token_twice$ (
  admin: HexString,
  $c: AptosDataCache,
): void {
  initialize$(admin, $c);
  do_add_token$(admin, [u8("66"), u8("84"), u8("67")], $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TokenRegistry", "FakeBtc", [])] as TypeTag[]);
  do_add_token$(admin, [u8("66"), u8("84"), u8("67")], $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TokenRegistry", "FakeBtc", [])] as TypeTag[]);
  return;
}

// test func
export function test_initialize$ (
  admin: HexString,
  $c: AptosDataCache,
): void {
  if (!!is_registry_initialized$(Std.Signer.address_of$(admin, $c), $c)) {
    throw $.abortCode(u64("5"));
  }
  initialize$(admin, $c);
  if (!is_registry_initialized$(Std.Signer.address_of$(admin, $c), $c)) {
    throw $.abortCode(u64("5"));
  }
  return;
}

// test func
export function test_initialize_twice$ (
  admin: HexString,
  $c: AptosDataCache,
): void {
  initialize$(admin, $c);
  initialize$(admin, $c);
  return;
}

// test func
export function test_update_token$ (
  admin: HexString,
  $c: AptosDataCache,
): void {
  let description, key, logo, project, registry, token_info;
  initialize$(admin, $c);
  do_add_token$(admin, [u8("66"), u8("84"), u8("67")], $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TokenRegistry", "FakeBtc", [])] as TypeTag[]);
  description = [u8("100"), u8("101"), u8("115"), u8("99"), u8("114"), u8("105"), u8("112"), u8("116"), u8("105"), u8("111"), u8("110")];
  logo = [u8("108"), u8("111"), u8("103"), u8("111")];
  project = [u8("112"), u8("114"), u8("111"), u8("106"), u8("101"), u8("99"), u8("116")];
  update_token_info$(admin, [u8("66"), u8("84"), u8("67")], $.copy(description), $.copy(logo), $.copy(project), $c);
  registry = $c.borrow_global<TokenRegistry>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TokenRegistry", "TokenRegistry", []), Std.Signer.address_of$(admin, $c));
  key = Std.ASCII.string$([u8("66"), u8("84"), u8("67")], $c);
  token_info = AptosFramework.Table.borrow$(registry.symbol_to_token_info, $.copy(key), $c, [new StructTag(new HexString("0x1"), "ASCII", "String", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TokenRegistry", "TokenInfo", [])] as TypeTag[]);
  if (!$.deep_eq($.copy(token_info.project_url), Std.ASCII.string$($.copy(project), $c))) {
    throw $.abortCode(u64("5"));
  }
  if (!$.deep_eq($.copy(token_info.description), Std.ASCII.string$($.copy(description), $c))) {
    throw $.abortCode(u64("5"));
  }
  if (!$.deep_eq($.copy(token_info.logo_url), Std.ASCII.string$($.copy(logo), $c))) {
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

export function update_token_info$ (
  admin: HexString,
  symbol: U8[],
  description: U8[],
  logo_url: U8[],
  project_url: U8[],
  $c: AptosDataCache,
): void {
  let admin_addr, index, list_token_info, registry, symbol_str, table_token_info;
  admin_addr = Std.Signer.address_of$(admin, $c);
  registry = $c.borrow_global_mut<TokenRegistry>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TokenRegistry", "TokenRegistry", []), $.copy(admin_addr));
  symbol_str = Std.ASCII.string$($.copy(symbol), $c);
  if (!AptosFramework.Table.contains$(registry.symbol_to_token_info, $.copy(symbol_str), $c, [new StructTag(new HexString("0x1"), "ASCII", "String", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TokenRegistry", "TokenInfo", [])] as TypeTag[])) {
    throw $.abortCode(E_SYMBOL_DOES_NOT_EXIST);
  }
  index = $.copy(AptosFramework.Table.borrow$(registry.symbol_to_list_idx, $.copy(symbol_str), $c, [new StructTag(new HexString("0x1"), "ASCII", "String", []), AtomicTypeTag.U64] as TypeTag[]));
  list_token_info = Std.Vector.borrow_mut$(registry.token_info_list, $.copy(index), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TokenRegistry", "TokenInfo", [])] as TypeTag[]);
  list_token_info.description = Std.ASCII.string$($.copy(description), $c);
  list_token_info.logo_url = Std.ASCII.string$($.copy(logo_url), $c);
  list_token_info.project_url = Std.ASCII.string$($.copy(project_url), $c);
  table_token_info = AptosFramework.Table.borrow_mut$(registry.symbol_to_token_info, $.copy(symbol_str), $c, [new StructTag(new HexString("0x1"), "ASCII", "String", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TokenRegistry", "TokenInfo", [])] as TypeTag[]);
  table_token_info.description = Std.ASCII.string$($.copy(description), $c);
  table_token_info.logo_url = Std.ASCII.string$($.copy(logo_url), $c);
  table_token_info.project_url = Std.ASCII.string$($.copy(project_url), $c);
  return;
}

export function update_token_info_script$ (
  admin: HexString,
  symbol: U8[],
  description: U8[],
  logo_url: U8[],
  project_url: U8[],
  $c: AptosDataCache,
): void {
  update_token_info$(admin, $.copy(symbol), $.copy(description), $.copy(logo_url), $.copy(project_url), $c);
  return;
}


export function buildPayload_update_token_info_script (
  admin: HexString,
  symbol: U8[],
  description: U8[],
  logo_url: U8[],
  project_url: U8[],
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::TokenRegistry::update_token_info_script",
    typeParamStrings,
    [
      symbol.map(u => u.toPayloadArg()),
      description.map(u => u.toPayloadArg()),
      logo_url.map(u => u.toPayloadArg()),
      project_url.map(u => u.toPayloadArg()),
    ]
  );

}

