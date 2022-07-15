import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient} from "aptos";
import * as Std from "../Std";
import * as Table from "./Table";
export const packageName = "AptosFramework";
export const moduleAddress = new HexString("0x1");
export const moduleName = "Token";

export const EALREADY_HAS_BALANCE : U64 = u64("0");
export const EBALANCE_NOT_PUBLISHED : U64 = u64("1");
export const ECOLLECTIONS_NOT_PUBLISHED : U64 = u64("2");
export const ECOLLECTION_ALREADY_EXISTS : U64 = u64("4");
export const ECOLLECTION_NOT_PUBLISHED : U64 = u64("3");
export const ECREATE_WOULD_EXCEED_MAXIMUM : U64 = u64("5");
export const EINSUFFICIENT_BALANCE : U64 = u64("6");
export const EINVALID_COLLECTION_NAME : U64 = u64("7");
export const EINVALID_TOKEN_MERGE : U64 = u64("8");
export const EMINT_WOULD_EXCEED_MAXIMUM : U64 = u64("9");
export const ENO_BURN_CAPABILITY : U64 = u64("10");
export const ENO_MINT_CAPABILITY : U64 = u64("11");
export const ETOKEN_ALREADY_EXISTS : U64 = u64("12");
export const ETOKEN_NOT_PUBLISHED : U64 = u64("13");
export const ETOKEN_STORE_NOT_PUBLISHED : U64 = u64("14");
export const ROYALTY_POINTS_DENOMINATOR : U64 = u64("1000000");


export class BurnCapability 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "BurnCapability";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "token_id", typeTag: new StructTag(new HexString("0x1"), "Token", "TokenId", []) }];

  token_id: TokenId;

  constructor(proto: any, public typeTag: TypeTag) {
    this.token_id = proto['token_id'] as TokenId;
  }

  static BurnCapabilityParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : BurnCapability {
    const proto = $.parseStructProto(data, typeTag, repo, BurnCapability);
    return new BurnCapability(proto, typeTag);
  }

}

export class Collection 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "Collection";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "description", typeTag: new StructTag(new HexString("0x1"), "ASCII", "String", []) },
  { name: "name", typeTag: new StructTag(new HexString("0x1"), "ASCII", "String", []) },
  { name: "uri", typeTag: new StructTag(new HexString("0x1"), "ASCII", "String", []) },
  { name: "count", typeTag: AtomicTypeTag.U64 },
  { name: "maximum", typeTag: new StructTag(new HexString("0x1"), "Option", "Option", [AtomicTypeTag.U64]) }];

  description: Std.ASCII.String;
  name: Std.ASCII.String;
  uri: Std.ASCII.String;
  count: U64;
  maximum: Std.Option.Option;

  constructor(proto: any, public typeTag: TypeTag) {
    this.description = proto['description'] as Std.ASCII.String;
    this.name = proto['name'] as Std.ASCII.String;
    this.uri = proto['uri'] as Std.ASCII.String;
    this.count = proto['count'] as U64;
    this.maximum = proto['maximum'] as Std.Option.Option;
  }

  static CollectionParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : Collection {
    const proto = $.parseStructProto(data, typeTag, repo, Collection);
    return new Collection(proto, typeTag);
  }

}

export class Collections 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "Collections";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "collections", typeTag: new StructTag(new HexString("0x1"), "Table", "Table", [new StructTag(new HexString("0x1"), "ASCII", "String", []), new StructTag(new HexString("0x1"), "Token", "Collection", [])]) },
  { name: "token_data", typeTag: new StructTag(new HexString("0x1"), "Table", "Table", [new StructTag(new HexString("0x1"), "Token", "TokenId", []), new StructTag(new HexString("0x1"), "Token", "TokenData", [])]) },
  { name: "burn_capabilities", typeTag: new StructTag(new HexString("0x1"), "Table", "Table", [new StructTag(new HexString("0x1"), "Token", "TokenId", []), new StructTag(new HexString("0x1"), "Token", "BurnCapability", [])]) },
  { name: "mint_capabilities", typeTag: new StructTag(new HexString("0x1"), "Table", "Table", [new StructTag(new HexString("0x1"), "Token", "TokenId", []), new StructTag(new HexString("0x1"), "Token", "MintCapability", [])]) },
  { name: "create_collection_events", typeTag: new StructTag(new HexString("0x1"), "Event", "EventHandle", [new StructTag(new HexString("0x1"), "Token", "CreateCollectionEvent", [])]) },
  { name: "create_token_events", typeTag: new StructTag(new HexString("0x1"), "Event", "EventHandle", [new StructTag(new HexString("0x1"), "Token", "CreateTokenEvent", [])]) },
  { name: "mint_token_events", typeTag: new StructTag(new HexString("0x1"), "Event", "EventHandle", [new StructTag(new HexString("0x1"), "Token", "MintTokenEvent", [])]) }];

  collections: Table.Table;
  token_data: Table.Table;
  burn_capabilities: Table.Table;
  mint_capabilities: Table.Table;
  create_collection_events: Std.Event.EventHandle;
  create_token_events: Std.Event.EventHandle;
  mint_token_events: Std.Event.EventHandle;

  constructor(proto: any, public typeTag: TypeTag) {
    this.collections = proto['collections'] as Table.Table;
    this.token_data = proto['token_data'] as Table.Table;
    this.burn_capabilities = proto['burn_capabilities'] as Table.Table;
    this.mint_capabilities = proto['mint_capabilities'] as Table.Table;
    this.create_collection_events = proto['create_collection_events'] as Std.Event.EventHandle;
    this.create_token_events = proto['create_token_events'] as Std.Event.EventHandle;
    this.mint_token_events = proto['mint_token_events'] as Std.Event.EventHandle;
  }

  static CollectionsParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : Collections {
    const proto = $.parseStructProto(data, typeTag, repo, Collections);
    return new Collections(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, Collections, typeParams);
    return result as unknown as Collections;
  }
}

export class CreateCollectionEvent 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "CreateCollectionEvent";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "creator", typeTag: AtomicTypeTag.Address },
  { name: "collection_name", typeTag: new StructTag(new HexString("0x1"), "ASCII", "String", []) },
  { name: "uri", typeTag: new StructTag(new HexString("0x1"), "ASCII", "String", []) },
  { name: "description", typeTag: new StructTag(new HexString("0x1"), "ASCII", "String", []) },
  { name: "maximum", typeTag: new StructTag(new HexString("0x1"), "Option", "Option", [AtomicTypeTag.U64]) }];

  creator: HexString;
  collection_name: Std.ASCII.String;
  uri: Std.ASCII.String;
  description: Std.ASCII.String;
  maximum: Std.Option.Option;

  constructor(proto: any, public typeTag: TypeTag) {
    this.creator = proto['creator'] as HexString;
    this.collection_name = proto['collection_name'] as Std.ASCII.String;
    this.uri = proto['uri'] as Std.ASCII.String;
    this.description = proto['description'] as Std.ASCII.String;
    this.maximum = proto['maximum'] as Std.Option.Option;
  }

  static CreateCollectionEventParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : CreateCollectionEvent {
    const proto = $.parseStructProto(data, typeTag, repo, CreateCollectionEvent);
    return new CreateCollectionEvent(proto, typeTag);
  }

}

export class CreateTokenEvent 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "CreateTokenEvent";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "id", typeTag: new StructTag(new HexString("0x1"), "Token", "TokenId", []) },
  { name: "token_data", typeTag: new StructTag(new HexString("0x1"), "Token", "TokenData", []) },
  { name: "initial_balance", typeTag: AtomicTypeTag.U64 }];

  id: TokenId;
  token_data: TokenData;
  initial_balance: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.id = proto['id'] as TokenId;
    this.token_data = proto['token_data'] as TokenData;
    this.initial_balance = proto['initial_balance'] as U64;
  }

  static CreateTokenEventParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : CreateTokenEvent {
    const proto = $.parseStructProto(data, typeTag, repo, CreateTokenEvent);
    return new CreateTokenEvent(proto, typeTag);
  }

}

export class DepositEvent 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "DepositEvent";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "id", typeTag: new StructTag(new HexString("0x1"), "Token", "TokenId", []) },
  { name: "amount", typeTag: AtomicTypeTag.U64 }];

  id: TokenId;
  amount: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.id = proto['id'] as TokenId;
    this.amount = proto['amount'] as U64;
  }

  static DepositEventParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : DepositEvent {
    const proto = $.parseStructProto(data, typeTag, repo, DepositEvent);
    return new DepositEvent(proto, typeTag);
  }

}

export class MintCapability 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "MintCapability";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "token_id", typeTag: new StructTag(new HexString("0x1"), "Token", "TokenId", []) }];

  token_id: TokenId;

  constructor(proto: any, public typeTag: TypeTag) {
    this.token_id = proto['token_id'] as TokenId;
  }

  static MintCapabilityParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : MintCapability {
    const proto = $.parseStructProto(data, typeTag, repo, MintCapability);
    return new MintCapability(proto, typeTag);
  }

}

export class MintTokenEvent 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "MintTokenEvent";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "id", typeTag: new StructTag(new HexString("0x1"), "Token", "TokenId", []) },
  { name: "amount", typeTag: AtomicTypeTag.U64 }];

  id: TokenId;
  amount: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.id = proto['id'] as TokenId;
    this.amount = proto['amount'] as U64;
  }

  static MintTokenEventParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : MintTokenEvent {
    const proto = $.parseStructProto(data, typeTag, repo, MintTokenEvent);
    return new MintTokenEvent(proto, typeTag);
  }

}

export class Royalty 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "Royalty";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "royalty_points_per_million", typeTag: AtomicTypeTag.U64 },
  { name: "creator_account", typeTag: AtomicTypeTag.Address }];

  royalty_points_per_million: U64;
  creator_account: HexString;

  constructor(proto: any, public typeTag: TypeTag) {
    this.royalty_points_per_million = proto['royalty_points_per_million'] as U64;
    this.creator_account = proto['creator_account'] as HexString;
  }

  static RoyaltyParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : Royalty {
    const proto = $.parseStructProto(data, typeTag, repo, Royalty);
    return new Royalty(proto, typeTag);
  }

}

export class Token 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "Token";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "id", typeTag: new StructTag(new HexString("0x1"), "Token", "TokenId", []) },
  { name: "value", typeTag: AtomicTypeTag.U64 }];

  id: TokenId;
  value: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.id = proto['id'] as TokenId;
    this.value = proto['value'] as U64;
  }

  static TokenParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : Token {
    const proto = $.parseStructProto(data, typeTag, repo, Token);
    return new Token(proto, typeTag);
  }

}

export class TokenData 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "TokenData";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "collection", typeTag: new StructTag(new HexString("0x1"), "ASCII", "String", []) },
  { name: "description", typeTag: new StructTag(new HexString("0x1"), "ASCII", "String", []) },
  { name: "name", typeTag: new StructTag(new HexString("0x1"), "ASCII", "String", []) },
  { name: "maximum", typeTag: new StructTag(new HexString("0x1"), "Option", "Option", [AtomicTypeTag.U64]) },
  { name: "supply", typeTag: new StructTag(new HexString("0x1"), "Option", "Option", [AtomicTypeTag.U64]) },
  { name: "uri", typeTag: new StructTag(new HexString("0x1"), "ASCII", "String", []) },
  { name: "royalty", typeTag: new StructTag(new HexString("0x1"), "Token", "Royalty", []) }];

  collection: Std.ASCII.String;
  description: Std.ASCII.String;
  name: Std.ASCII.String;
  maximum: Std.Option.Option;
  supply: Std.Option.Option;
  uri: Std.ASCII.String;
  royalty: Royalty;

  constructor(proto: any, public typeTag: TypeTag) {
    this.collection = proto['collection'] as Std.ASCII.String;
    this.description = proto['description'] as Std.ASCII.String;
    this.name = proto['name'] as Std.ASCII.String;
    this.maximum = proto['maximum'] as Std.Option.Option;
    this.supply = proto['supply'] as Std.Option.Option;
    this.uri = proto['uri'] as Std.ASCII.String;
    this.royalty = proto['royalty'] as Royalty;
  }

  static TokenDataParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : TokenData {
    const proto = $.parseStructProto(data, typeTag, repo, TokenData);
    return new TokenData(proto, typeTag);
  }

}

export class TokenId 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "TokenId";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "creator", typeTag: AtomicTypeTag.Address },
  { name: "collection", typeTag: new StructTag(new HexString("0x1"), "ASCII", "String", []) },
  { name: "name", typeTag: new StructTag(new HexString("0x1"), "ASCII", "String", []) }];

  creator: HexString;
  collection: Std.ASCII.String;
  name: Std.ASCII.String;

  constructor(proto: any, public typeTag: TypeTag) {
    this.creator = proto['creator'] as HexString;
    this.collection = proto['collection'] as Std.ASCII.String;
    this.name = proto['name'] as Std.ASCII.String;
  }

  static TokenIdParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : TokenId {
    const proto = $.parseStructProto(data, typeTag, repo, TokenId);
    return new TokenId(proto, typeTag);
  }

}

export class TokenStore 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "TokenStore";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "tokens", typeTag: new StructTag(new HexString("0x1"), "Table", "Table", [new StructTag(new HexString("0x1"), "Token", "TokenId", []), new StructTag(new HexString("0x1"), "Token", "Token", [])]) },
  { name: "deposit_events", typeTag: new StructTag(new HexString("0x1"), "Event", "EventHandle", [new StructTag(new HexString("0x1"), "Token", "DepositEvent", [])]) },
  { name: "withdraw_events", typeTag: new StructTag(new HexString("0x1"), "Event", "EventHandle", [new StructTag(new HexString("0x1"), "Token", "WithdrawEvent", [])]) }];

  tokens: Table.Table;
  deposit_events: Std.Event.EventHandle;
  withdraw_events: Std.Event.EventHandle;

  constructor(proto: any, public typeTag: TypeTag) {
    this.tokens = proto['tokens'] as Table.Table;
    this.deposit_events = proto['deposit_events'] as Std.Event.EventHandle;
    this.withdraw_events = proto['withdraw_events'] as Std.Event.EventHandle;
  }

  static TokenStoreParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : TokenStore {
    const proto = $.parseStructProto(data, typeTag, repo, TokenStore);
    return new TokenStore(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, TokenStore, typeParams);
    return result as unknown as TokenStore;
  }
}

export class WithdrawEvent 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "WithdrawEvent";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "id", typeTag: new StructTag(new HexString("0x1"), "Token", "TokenId", []) },
  { name: "amount", typeTag: AtomicTypeTag.U64 }];

  id: TokenId;
  amount: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.id = proto['id'] as TokenId;
    this.amount = proto['amount'] as U64;
  }

  static WithdrawEventParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : WithdrawEvent {
    const proto = $.parseStructProto(data, typeTag, repo, WithdrawEvent);
    return new WithdrawEvent(proto, typeTag);
  }

}
export function balance_of$ (
  owner: HexString,
  id: TokenId,
  $c: AptosDataCache,
): U64 {
  let temp$1, token_store;
  token_store = $c.borrow_global<TokenStore>(new StructTag(new HexString("0x1"), "Token", "TokenStore", []), $.copy(owner));
  if (Table.contains$(token_store.tokens, $.copy(id), $c, [new StructTag(new HexString("0x1"), "Token", "TokenId", []), new StructTag(new HexString("0x1"), "Token", "Token", [])] as TypeTag[])) {
    temp$1 = $.copy(Table.borrow$(token_store.tokens, $.copy(id), $c, [new StructTag(new HexString("0x1"), "Token", "TokenId", []), new StructTag(new HexString("0x1"), "Token", "Token", [])] as TypeTag[]).value);
  }
  else{
    temp$1 = u64("0");
  }
  return temp$1;
}

export function burn$ (
  account: HexString,
  token: Token,
  $c: AptosDataCache,
): void {
  let _cap, account_addr, collections, supply, token_data;
  account_addr = Std.Signer.address_of$(account, $c);
  if (!$c.exists(new StructTag(new HexString("0x1"), "Token", "Collections", []), $.copy(account_addr))) {
    throw $.abortCode(Std.Errors.not_published$(ECOLLECTIONS_NOT_PUBLISHED, $c));
  }
  collections = $c.borrow_global_mut<Collections>(new StructTag(new HexString("0x1"), "Token", "Collections", []), $.copy(account_addr));
  if (!Table.contains$(collections.token_data, $.copy(token.id), $c, [new StructTag(new HexString("0x1"), "Token", "TokenId", []), new StructTag(new HexString("0x1"), "Token", "TokenData", [])] as TypeTag[])) {
    throw $.abortCode(Std.Errors.not_published$(ETOKEN_NOT_PUBLISHED, $c));
  }
  if (!Table.contains$(collections.burn_capabilities, $.copy(token.id), $c, [new StructTag(new HexString("0x1"), "Token", "TokenId", []), new StructTag(new HexString("0x1"), "Token", "BurnCapability", [])] as TypeTag[])) {
    throw $.abortCode(Std.Errors.requires_capability$(ENO_BURN_CAPABILITY, $c));
  }
  _cap = Table.borrow$(collections.burn_capabilities, $.copy(token.id), $c, [new StructTag(new HexString("0x1"), "Token", "TokenId", []), new StructTag(new HexString("0x1"), "Token", "BurnCapability", [])] as TypeTag[]);
  token_data = Table.borrow_mut$(collections.token_data, $.copy(token.id), $c, [new StructTag(new HexString("0x1"), "Token", "TokenId", []), new StructTag(new HexString("0x1"), "Token", "TokenData", [])] as TypeTag[]);
  if (Std.Option.is_some$(token_data.supply, $c, [AtomicTypeTag.U64] as TypeTag[])) {
    supply = Std.Option.borrow_mut$(token_data.supply, $c, [AtomicTypeTag.U64] as TypeTag[]);
    $.set(supply, $.copy(supply).sub($.copy(token.value)));
  }
  else{
  }
  token;
  return;
}

export function create_collection$ (
  creator: HexString,
  name: Std.ASCII.String,
  description: Std.ASCII.String,
  uri: Std.ASCII.String,
  maximum: Std.Option.Option,
  $c: AptosDataCache,
): void {
  let temp$1, temp$2, account_addr, collection, collection_handle, collections;
  account_addr = Std.Signer.address_of$(creator, $c);
  if (!$c.exists(new StructTag(new HexString("0x1"), "Token", "Collections", []), $.copy(account_addr))) {
    $c.move_to(new StructTag(new HexString("0x1"), "Token", "Collections", []), creator, new Collections({ collections: Table.new__$($c, [new StructTag(new HexString("0x1"), "ASCII", "String", []), new StructTag(new HexString("0x1"), "Token", "Collection", [])] as TypeTag[]), token_data: Table.new__$($c, [new StructTag(new HexString("0x1"), "Token", "TokenId", []), new StructTag(new HexString("0x1"), "Token", "TokenData", [])] as TypeTag[]), burn_capabilities: Table.new__$($c, [new StructTag(new HexString("0x1"), "Token", "TokenId", []), new StructTag(new HexString("0x1"), "Token", "BurnCapability", [])] as TypeTag[]), mint_capabilities: Table.new__$($c, [new StructTag(new HexString("0x1"), "Token", "TokenId", []), new StructTag(new HexString("0x1"), "Token", "MintCapability", [])] as TypeTag[]), create_collection_events: Std.Event.new_event_handle$(creator, $c, [new StructTag(new HexString("0x1"), "Token", "CreateCollectionEvent", [])] as TypeTag[]), create_token_events: Std.Event.new_event_handle$(creator, $c, [new StructTag(new HexString("0x1"), "Token", "CreateTokenEvent", [])] as TypeTag[]), mint_token_events: Std.Event.new_event_handle$(creator, $c, [new StructTag(new HexString("0x1"), "Token", "MintTokenEvent", [])] as TypeTag[]) }, new StructTag(new HexString("0x1"), "Token", "Collections", [])));
  }
  else{
  }
  collections = $c.borrow_global_mut<Collections>(new StructTag(new HexString("0x1"), "Token", "Collections", []), $.copy(account_addr)).collections;
  [temp$1, temp$2] = [collections, $.copy(name)];
  if (!!Table.contains$(temp$1, temp$2, $c, [new StructTag(new HexString("0x1"), "ASCII", "String", []), new StructTag(new HexString("0x1"), "Token", "Collection", [])] as TypeTag[])) {
    throw $.abortCode(Std.Errors.already_published$(ECOLLECTION_ALREADY_EXISTS, $c));
  }
  collection = new Collection({ description: $.copy(description), name: $.copy(name), uri: $.copy(uri), count: u64("0"), maximum: $.copy(maximum) }, new StructTag(new HexString("0x1"), "Token", "Collection", []));
  Table.add$(collections, $.copy(name), collection, $c, [new StructTag(new HexString("0x1"), "ASCII", "String", []), new StructTag(new HexString("0x1"), "Token", "Collection", [])] as TypeTag[]);
  collection_handle = $c.borrow_global_mut<Collections>(new StructTag(new HexString("0x1"), "Token", "Collections", []), $.copy(account_addr));
  Std.Event.emit_event$(collection_handle.create_collection_events, new CreateCollectionEvent({ creator: $.copy(account_addr), collection_name: $.copy(name), uri: $.copy(uri), description: $.copy(description), maximum: $.copy(maximum) }, new StructTag(new HexString("0x1"), "Token", "CreateCollectionEvent", [])), $c, [new StructTag(new HexString("0x1"), "Token", "CreateCollectionEvent", [])] as TypeTag[]);
  return;
}

// test func
export function create_collection_and_token$ (
  creator: HexString,
  amount: U64,
  collection_max: U64,
  token_max: U64,
  $c: AptosDataCache,
): TokenId {
  let collection_name;
  collection_name = Std.ASCII.string$([u8("72"), u8("101"), u8("108"), u8("108"), u8("111"), u8("44"), u8("32"), u8("87"), u8("111"), u8("114"), u8("108"), u8("100")], $c);
  create_collection$(creator, $.copy(collection_name), Std.ASCII.string$([u8("67"), u8("111"), u8("108"), u8("108"), u8("101"), u8("99"), u8("116"), u8("105"), u8("111"), u8("110"), u8("58"), u8("32"), u8("72"), u8("101"), u8("108"), u8("108"), u8("111"), u8("44"), u8("32"), u8("87"), u8("111"), u8("114"), u8("108"), u8("100")], $c), Std.ASCII.string$([u8("104"), u8("116"), u8("116"), u8("112"), u8("115"), u8("58"), u8("47"), u8("47"), u8("97"), u8("112"), u8("116"), u8("111"), u8("115"), u8("46"), u8("100"), u8("101"), u8("118")], $c), Std.Option.some$($.copy(collection_max), $c, [AtomicTypeTag.U64] as TypeTag[]), $c);
  return create_token$(creator, $.copy(collection_name), Std.ASCII.string$([u8("84"), u8("111"), u8("107"), u8("101"), u8("110"), u8("58"), u8("32"), u8("72"), u8("101"), u8("108"), u8("108"), u8("111"), u8("44"), u8("32"), u8("84"), u8("111"), u8("107"), u8("101"), u8("110")], $c), Std.ASCII.string$([u8("72"), u8("101"), u8("108"), u8("108"), u8("111"), u8("44"), u8("32"), u8("84"), u8("111"), u8("107"), u8("101"), u8("110")], $c), true, $.copy(amount), Std.Option.some$($.copy(token_max), $c, [AtomicTypeTag.U64] as TypeTag[]), Std.ASCII.string$([u8("104"), u8("116"), u8("116"), u8("112"), u8("115"), u8("58"), u8("47"), u8("47"), u8("97"), u8("112"), u8("116"), u8("111"), u8("115"), u8("46"), u8("100"), u8("101"), u8("118")], $c), u64("0"), $c);
}

export function create_limited_collection_script$ (
  creator: HexString,
  name: U8[],
  description: U8[],
  uri: U8[],
  maximum: U64,
  $c: AptosDataCache,
): void {
  create_collection$(creator, Std.ASCII.string$($.copy(name), $c), Std.ASCII.string$($.copy(description), $c), Std.ASCII.string$($.copy(uri), $c), Std.Option.some$($.copy(maximum), $c, [AtomicTypeTag.U64] as TypeTag[]), $c);
  return;
}


export function buildPayload_create_limited_collection_script (
  creator: HexString,
  name: U8[],
  description: U8[],
  uri: U8[],
  maximum: U64,
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0x1::Token::create_limited_collection_script",
    typeParamStrings,
    [
      name.map(u => u.toPayloadArg()),
      description.map(u => u.toPayloadArg()),
      uri.map(u => u.toPayloadArg()),
      maximum.toPayloadArg(),
    ]
  );

}
export function create_limited_token_script$ (
  creator: HexString,
  collection: U8[],
  name: U8[],
  description: U8[],
  monitor_supply: boolean,
  initial_balance: U64,
  maximum: U64,
  uri: U8[],
  royalty_points_per_million: U64,
  $c: AptosDataCache,
): void {
  create_token$(creator, Std.ASCII.string$($.copy(collection), $c), Std.ASCII.string$($.copy(name), $c), Std.ASCII.string$($.copy(description), $c), monitor_supply, $.copy(initial_balance), Std.Option.some$($.copy(maximum), $c, [AtomicTypeTag.U64] as TypeTag[]), Std.ASCII.string$($.copy(uri), $c), $.copy(royalty_points_per_million), $c);
  return;
}


export function buildPayload_create_limited_token_script (
  creator: HexString,
  collection: U8[],
  name: U8[],
  description: U8[],
  monitor_supply: boolean,
  initial_balance: U64,
  maximum: U64,
  uri: U8[],
  royalty_points_per_million: U64,
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0x1::Token::create_limited_token_script",
    typeParamStrings,
    [
      collection.map(u => u.toPayloadArg()),
      name.map(u => u.toPayloadArg()),
      description.map(u => u.toPayloadArg()),
      monitor_supply,
      initial_balance.toPayloadArg(),
      maximum.toPayloadArg(),
      uri.map(u => u.toPayloadArg()),
      royalty_points_per_million.toPayloadArg(),
    ]
  );

}
export function create_token$ (
  account: HexString,
  collection: Std.ASCII.String,
  name: Std.ASCII.String,
  description: Std.ASCII.String,
  monitor_supply: boolean,
  initial_balance: U64,
  maximum: Std.Option.Option,
  uri: Std.ASCII.String,
  royalty_points_per_million: U64,
  $c: AptosDataCache,
): TokenId {
  let temp$2, account_addr, collection__1, collections, supply, token_data, token_handle, token_id;
  account_addr = Std.Signer.address_of$(account, $c);
  if (!$c.exists(new StructTag(new HexString("0x1"), "Token", "Collections", []), $.copy(account_addr))) {
    throw $.abortCode(Std.Errors.not_published$(ECOLLECTIONS_NOT_PUBLISHED, $c));
  }
  collections = $c.borrow_global_mut<Collections>(new StructTag(new HexString("0x1"), "Token", "Collections", []), $.copy(account_addr));
  token_id = create_token_id$($.copy(account_addr), $.copy(collection), $.copy(name), $c);
  if (!Table.contains$(collections.collections, $.copy(token_id.collection), $c, [new StructTag(new HexString("0x1"), "ASCII", "String", []), new StructTag(new HexString("0x1"), "Token", "Collection", [])] as TypeTag[])) {
    throw $.abortCode(Std.Errors.already_published$(ECOLLECTION_NOT_PUBLISHED, $c));
  }
  if (!!Table.contains$(collections.token_data, $.copy(token_id), $c, [new StructTag(new HexString("0x1"), "Token", "TokenId", []), new StructTag(new HexString("0x1"), "Token", "TokenData", [])] as TypeTag[])) {
    throw $.abortCode(Std.Errors.already_published$(ETOKEN_ALREADY_EXISTS, $c));
  }
  collection__1 = Table.borrow_mut$(collections.collections, $.copy(token_id.collection), $c, [new StructTag(new HexString("0x1"), "ASCII", "String", []), new StructTag(new HexString("0x1"), "Token", "Collection", [])] as TypeTag[]);
  collection__1.count = $.copy(collection__1.count).add(u64("1"));
  if (Std.Option.is_some$(collection__1.maximum, $c, [AtomicTypeTag.U64] as TypeTag[])) {
    if (!$.copy(Std.Option.borrow$(collection__1.maximum, $c, [AtomicTypeTag.U64] as TypeTag[])).ge($.copy(collection__1.count))) {
      throw $.abortCode(ECREATE_WOULD_EXCEED_MAXIMUM);
    }
  }
  else{
  }
  if (monitor_supply) {
    temp$2 = Std.Option.some$(u64("0"), $c, [AtomicTypeTag.U64] as TypeTag[]);
  }
  else{
    temp$2 = Std.Option.none$($c, [AtomicTypeTag.U64] as TypeTag[]);
  }
  supply = temp$2;
  token_data = new TokenData({ collection: $.copy(token_id.collection), description: $.copy(description), name: $.copy(token_id.name), maximum: $.copy(maximum), supply: $.copy(supply), uri: $.copy(uri), royalty: new Royalty({ royalty_points_per_million: $.copy(royalty_points_per_million), creator_account: Std.Signer.address_of$(account, $c) }, new StructTag(new HexString("0x1"), "Token", "Royalty", [])) }, new StructTag(new HexString("0x1"), "Token", "TokenData", []));
  Table.add$(collections.token_data, $.copy(token_id), $.copy(token_data), $c, [new StructTag(new HexString("0x1"), "Token", "TokenId", []), new StructTag(new HexString("0x1"), "Token", "TokenData", [])] as TypeTag[]);
  Table.add$(collections.burn_capabilities, $.copy(token_id), new BurnCapability({ token_id: $.copy(token_id) }, new StructTag(new HexString("0x1"), "Token", "BurnCapability", [])), $c, [new StructTag(new HexString("0x1"), "Token", "TokenId", []), new StructTag(new HexString("0x1"), "Token", "BurnCapability", [])] as TypeTag[]);
  Table.add$(collections.mint_capabilities, $.copy(token_id), new MintCapability({ token_id: $.copy(token_id) }, new StructTag(new HexString("0x1"), "Token", "MintCapability", [])), $c, [new StructTag(new HexString("0x1"), "Token", "TokenId", []), new StructTag(new HexString("0x1"), "Token", "MintCapability", [])] as TypeTag[]);
  if ($.copy(initial_balance).gt(u64("0"))) {
    initialize_token_store$(account, $c);
    initialize_token$(account, $.copy(token_id), $c);
    mint$(account, Std.Signer.address_of$(account, $c), $.copy(token_id), $.copy(initial_balance), $c);
  }
  else{
  }
  token_handle = $c.borrow_global_mut<Collections>(new StructTag(new HexString("0x1"), "Token", "Collections", []), $.copy(account_addr));
  Std.Event.emit_event$(token_handle.create_token_events, new CreateTokenEvent({ id: $.copy(token_id), token_data: $.copy(token_data), initial_balance: $.copy(initial_balance) }, new StructTag(new HexString("0x1"), "Token", "CreateTokenEvent", [])), $c, [new StructTag(new HexString("0x1"), "Token", "CreateTokenEvent", [])] as TypeTag[]);
  return $.copy(token_id);
}

export function create_token_id$ (
  creator: HexString,
  collection: Std.ASCII.String,
  name: Std.ASCII.String,
  $c: AptosDataCache,
): TokenId {
  return new TokenId({ creator: $.copy(creator), collection: $.copy(collection), name: $.copy(name) }, new StructTag(new HexString("0x1"), "Token", "TokenId", []));
}

export function create_token_id_raw$ (
  creator: HexString,
  collection: U8[],
  name: U8[],
  $c: AptosDataCache,
): TokenId {
  return new TokenId({ creator: $.copy(creator), collection: Std.ASCII.string$($.copy(collection), $c), name: Std.ASCII.string$($.copy(name), $c) }, new StructTag(new HexString("0x1"), "Token", "TokenId", []));
}

export function create_unlimited_collection_script$ (
  creator: HexString,
  name: U8[],
  description: U8[],
  uri: U8[],
  $c: AptosDataCache,
): void {
  create_collection$(creator, Std.ASCII.string$($.copy(name), $c), Std.ASCII.string$($.copy(description), $c), Std.ASCII.string$($.copy(uri), $c), Std.Option.none$($c, [AtomicTypeTag.U64] as TypeTag[]), $c);
  return;
}


export function buildPayload_create_unlimited_collection_script (
  creator: HexString,
  name: U8[],
  description: U8[],
  uri: U8[],
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0x1::Token::create_unlimited_collection_script",
    typeParamStrings,
    [
      name.map(u => u.toPayloadArg()),
      description.map(u => u.toPayloadArg()),
      uri.map(u => u.toPayloadArg()),
    ]
  );

}
export function create_unlimited_token_script$ (
  creator: HexString,
  collection: U8[],
  name: U8[],
  description: U8[],
  monitor_supply: boolean,
  initial_balance: U64,
  uri: U8[],
  royalty_points_per_million: U64,
  $c: AptosDataCache,
): void {
  create_token$(creator, Std.ASCII.string$($.copy(collection), $c), Std.ASCII.string$($.copy(name), $c), Std.ASCII.string$($.copy(description), $c), monitor_supply, $.copy(initial_balance), Std.Option.none$($c, [AtomicTypeTag.U64] as TypeTag[]), Std.ASCII.string$($.copy(uri), $c), $.copy(royalty_points_per_million), $c);
  return;
}


export function buildPayload_create_unlimited_token_script (
  creator: HexString,
  collection: U8[],
  name: U8[],
  description: U8[],
  monitor_supply: boolean,
  initial_balance: U64,
  uri: U8[],
  royalty_points_per_million: U64,
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0x1::Token::create_unlimited_token_script",
    typeParamStrings,
    [
      collection.map(u => u.toPayloadArg()),
      name.map(u => u.toPayloadArg()),
      description.map(u => u.toPayloadArg()),
      monitor_supply,
      initial_balance.toPayloadArg(),
      uri.map(u => u.toPayloadArg()),
      royalty_points_per_million.toPayloadArg(),
    ]
  );

}
// test func
export function create_withdraw_deposit_editions$ (
  creator: HexString,
  owner: HexString,
  $c: AptosDataCache,
): void {
  let token_0, token_1, token_2, token_id;
  token_id = create_collection_and_token$(creator, u64("2"), u64("5"), u64("5"), $c);
  token_0 = withdraw_token$(creator, $.copy(token_id), u64("1"), $c);
  token_1 = withdraw_token$(creator, $.copy(token_id), u64("1"), $c);
  deposit_token$(owner, token_0, $c);
  deposit_token$(creator, token_1, $c);
  token_2 = withdraw_token$(creator, $.copy(token_id), u64("1"), $c);
  deposit_token$(owner, token_2, $c);
  return;
}

// test func
export function create_withdraw_deposit_token$ (
  creator: HexString,
  owner: HexString,
  $c: AptosDataCache,
): void {
  let token, token_id;
  token_id = create_collection_and_token$(creator, u64("1"), u64("1"), u64("1"), $c);
  token = withdraw_token$(creator, $.copy(token_id), u64("1"), $c);
  deposit_token$(owner, token, $c);
  return;
}

export function deposit_token$ (
  account: HexString,
  token: Token,
  $c: AptosDataCache,
): void {
  let temp$1, temp$2, account_addr, tokens;
  account_addr = Std.Signer.address_of$(account, $c);
  initialize_token_store$(account, $c);
  tokens = $c.borrow_global_mut<TokenStore>(new StructTag(new HexString("0x1"), "Token", "TokenStore", []), $.copy(account_addr)).tokens;
  [temp$1, temp$2] = [tokens, $.copy(token.id)];
  if (!Table.contains$(temp$1, temp$2, $c, [new StructTag(new HexString("0x1"), "Token", "TokenId", []), new StructTag(new HexString("0x1"), "Token", "Token", [])] as TypeTag[])) {
    initialize_token$(account, $.copy(token.id), $c);
  }
  else{
  }
  return direct_deposit$($.copy(account_addr), token, $c);
}

export function direct_deposit$ (
  account_addr: HexString,
  token: Token,
  $c: AptosDataCache,
): void {
  let token_store;
  token_store = $c.borrow_global_mut<TokenStore>(new StructTag(new HexString("0x1"), "Token", "TokenStore", []), $.copy(account_addr));
  Std.Event.emit_event$(token_store.deposit_events, new DepositEvent({ id: $.copy(token.id), amount: $.copy(token.value) }, new StructTag(new HexString("0x1"), "Token", "DepositEvent", [])), $c, [new StructTag(new HexString("0x1"), "Token", "DepositEvent", [])] as TypeTag[]);
  direct_deposit_without_event$($.copy(account_addr), token, $c);
  return;
}

export function direct_deposit_without_event$ (
  account_addr: HexString,
  token: Token,
  $c: AptosDataCache,
): void {
  let recipient_token, token_store;
  if (!$c.exists(new StructTag(new HexString("0x1"), "Token", "TokenStore", []), $.copy(account_addr))) {
    throw $.abortCode(Std.Errors.not_published$(ETOKEN_STORE_NOT_PUBLISHED, $c));
  }
  token_store = $c.borrow_global_mut<TokenStore>(new StructTag(new HexString("0x1"), "Token", "TokenStore", []), $.copy(account_addr));
  if (!Table.contains$(token_store.tokens, $.copy(token.id), $c, [new StructTag(new HexString("0x1"), "Token", "TokenId", []), new StructTag(new HexString("0x1"), "Token", "Token", [])] as TypeTag[])) {
    throw $.abortCode(Std.Errors.not_published$(EBALANCE_NOT_PUBLISHED, $c));
  }
  recipient_token = Table.borrow_mut$(token_store.tokens, $.copy(token.id), $c, [new StructTag(new HexString("0x1"), "Token", "TokenId", []), new StructTag(new HexString("0x1"), "Token", "Token", [])] as TypeTag[]);
  merge$(recipient_token, token, $c);
  return;
}

export function direct_transfer$ (
  sender: HexString,
  receiver: HexString,
  token_id: TokenId,
  amount: U64,
  $c: AptosDataCache,
): void {
  let token;
  token = withdraw_token$(sender, $.copy(token_id), $.copy(amount), $c);
  return deposit_token$(receiver, token, $c);
}

export function direct_transfer_script$ (
  sender: HexString,
  receiver: HexString,
  creators_address: HexString,
  collection: U8[],
  name: U8[],
  amount: U64,
  $c: AptosDataCache,
): void {
  let token_id;
  token_id = create_token_id_raw$($.copy(creators_address), $.copy(collection), $.copy(name), $c);
  direct_transfer$(sender, receiver, $.copy(token_id), $.copy(amount), $c);
  return;
}


export function buildPayload_direct_transfer_script (
  sender: HexString,
  receiver: HexString,
  creators_address: HexString,
  collection: U8[],
  name: U8[],
  amount: U64,
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0x1::Token::direct_transfer_script",
    typeParamStrings,
    [
      creators_address,
      collection.map(u => u.toPayloadArg()),
      name.map(u => u.toPayloadArg()),
      amount.toPayloadArg(),
    ]
  );

}
// test func
export function direct_transfer_test$ (
  creator: HexString,
  owner: HexString,
  $c: AptosDataCache,
): void {
  let token, token_id;
  token_id = create_collection_and_token$(creator, u64("2"), u64("2"), u64("2"), $c);
  direct_transfer$(creator, owner, $.copy(token_id), u64("1"), $c);
  token = withdraw_token$(owner, $.copy(token_id), u64("1"), $c);
  deposit_token$(creator, token, $c);
  return;
}


export function buildPayload_direct_transfer_test (
  creator: HexString,
  owner: HexString,
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0x1::Token::direct_transfer_test",
    typeParamStrings,
    []
  );

}
export function initialize_token$ (
  account: HexString,
  token_id: TokenId,
  $c: AptosDataCache,
): void {
  let temp$1, temp$2, temp$3, temp$4, temp$5, temp$6, account_addr, tokens;
  account_addr = Std.Signer.address_of$(account, $c);
  if (!$c.exists(new StructTag(new HexString("0x1"), "Token", "TokenStore", []), $.copy(account_addr))) {
    throw $.abortCode(Std.Errors.not_published$(ETOKEN_STORE_NOT_PUBLISHED, $c));
  }
  tokens = $c.borrow_global_mut<TokenStore>(new StructTag(new HexString("0x1"), "Token", "TokenStore", []), $.copy(account_addr)).tokens;
  [temp$1, temp$2] = [tokens, $.copy(token_id)];
  if (!!Table.contains$(temp$1, temp$2, $c, [new StructTag(new HexString("0x1"), "Token", "TokenId", []), new StructTag(new HexString("0x1"), "Token", "Token", [])] as TypeTag[])) {
    throw $.abortCode(Std.Errors.already_published$(EALREADY_HAS_BALANCE, $c));
  }
  temp$6 = tokens;
  temp$5 = $.copy(token_id);
  temp$3 = u64("0");
  temp$4 = $.copy(token_id);
  Table.add$(temp$6, temp$5, new Token({ id: temp$4, value: temp$3 }, new StructTag(new HexString("0x1"), "Token", "Token", [])), $c, [new StructTag(new HexString("0x1"), "Token", "TokenId", []), new StructTag(new HexString("0x1"), "Token", "Token", [])] as TypeTag[]);
  return;
}

export function initialize_token_for_id$ (
  account: HexString,
  creators_address: HexString,
  collection: U8[],
  name: U8[],
  $c: AptosDataCache,
): void {
  let token_id;
  token_id = create_token_id_raw$($.copy(creators_address), $.copy(collection), $.copy(name), $c);
  initialize_token$(account, $.copy(token_id), $c);
  return;
}


export function buildPayload_initialize_token_for_id (
  account: HexString,
  creators_address: HexString,
  collection: U8[],
  name: U8[],
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0x1::Token::initialize_token_for_id",
    typeParamStrings,
    [
      creators_address,
      collection.map(u => u.toPayloadArg()),
      name.map(u => u.toPayloadArg()),
    ]
  );

}
export function initialize_token_script$ (
  account: HexString,
  $c: AptosDataCache,
): void {
  initialize_token_store$(account, $c);
  return;
}


export function buildPayload_initialize_token_script (
  account: HexString,
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0x1::Token::initialize_token_script",
    typeParamStrings,
    []
  );

}
export function initialize_token_store$ (
  account: HexString,
  $c: AptosDataCache,
): void {
  if (!$c.exists(new StructTag(new HexString("0x1"), "Token", "TokenStore", []), Std.Signer.address_of$(account, $c))) {
    $c.move_to(new StructTag(new HexString("0x1"), "Token", "TokenStore", []), account, new TokenStore({ tokens: Table.new__$($c, [new StructTag(new HexString("0x1"), "Token", "TokenId", []), new StructTag(new HexString("0x1"), "Token", "Token", [])] as TypeTag[]), deposit_events: Std.Event.new_event_handle$(account, $c, [new StructTag(new HexString("0x1"), "Token", "DepositEvent", [])] as TypeTag[]), withdraw_events: Std.Event.new_event_handle$(account, $c, [new StructTag(new HexString("0x1"), "Token", "WithdrawEvent", [])] as TypeTag[]) }, new StructTag(new HexString("0x1"), "Token", "TokenStore", [])));
  }
  else{
  }
  return;
}

export function merge$ (
  dst_token: Token,
  source_token: Token,
  $c: AptosDataCache,
): void {
  if (!$.deep_eq(dst_token.id, source_token.id)) {
    throw $.abortCode(Std.Errors.invalid_argument$(EINVALID_TOKEN_MERGE, $c));
  }
  dst_token.value = $.copy(dst_token.value).add($.copy(source_token.value));
  source_token;
  return;
}

export function mint$ (
  account: HexString,
  dst_addr: HexString,
  token_id: TokenId,
  amount: U64,
  $c: AptosDataCache,
): void {
  let _cap, creator_collections, maximum, minter_collections, supply, token_data;
  if (!$c.exists(new StructTag(new HexString("0x1"), "Token", "Collections", []), $.copy(token_id.creator))) {
    throw $.abortCode(Std.Errors.not_published$(ECOLLECTIONS_NOT_PUBLISHED, $c));
  }
  minter_collections = $c.borrow_global_mut<Collections>(new StructTag(new HexString("0x1"), "Token", "Collections", []), Std.Signer.address_of$(account, $c));
  if (!Table.contains$(minter_collections.mint_capabilities, $.copy(token_id), $c, [new StructTag(new HexString("0x1"), "Token", "TokenId", []), new StructTag(new HexString("0x1"), "Token", "MintCapability", [])] as TypeTag[])) {
    throw $.abortCode(Std.Errors.requires_capability$(ENO_MINT_CAPABILITY, $c));
  }
  _cap = Table.borrow$(minter_collections.mint_capabilities, $.copy(token_id), $c, [new StructTag(new HexString("0x1"), "Token", "TokenId", []), new StructTag(new HexString("0x1"), "Token", "MintCapability", [])] as TypeTag[]);
  if (!$c.exists(new StructTag(new HexString("0x1"), "Token", "Collections", []), $.copy(token_id.creator))) {
    throw $.abortCode(Std.Errors.not_published$(ECOLLECTIONS_NOT_PUBLISHED, $c));
  }
  creator_collections = $c.borrow_global_mut<Collections>(new StructTag(new HexString("0x1"), "Token", "Collections", []), $.copy(token_id.creator));
  if (!Table.contains$(creator_collections.token_data, $.copy(token_id), $c, [new StructTag(new HexString("0x1"), "Token", "TokenId", []), new StructTag(new HexString("0x1"), "Token", "TokenData", [])] as TypeTag[])) {
    throw $.abortCode(Std.Errors.not_published$(ETOKEN_NOT_PUBLISHED, $c));
  }
  token_data = Table.borrow_mut$(creator_collections.token_data, $.copy(token_id), $c, [new StructTag(new HexString("0x1"), "Token", "TokenId", []), new StructTag(new HexString("0x1"), "Token", "TokenData", [])] as TypeTag[]);
  if (Std.Option.is_some$(token_data.supply, $c, [AtomicTypeTag.U64] as TypeTag[])) {
    supply = Std.Option.borrow_mut$(token_data.supply, $c, [AtomicTypeTag.U64] as TypeTag[]);
    $.set(supply, $.copy(supply).add($.copy(amount)));
    if (Std.Option.is_some$(token_data.maximum, $c, [AtomicTypeTag.U64] as TypeTag[])) {
      maximum = Std.Option.borrow_mut$(token_data.maximum, $c, [AtomicTypeTag.U64] as TypeTag[]);
      if (!$.copy(supply).le($.copy(maximum))) {
        throw $.abortCode(EMINT_WOULD_EXCEED_MAXIMUM);
      }
    }
    else{
    }
  }
  else{
  }
  direct_deposit$($.copy(dst_addr), new Token({ id: $.copy(token_id), value: $.copy(amount) }, new StructTag(new HexString("0x1"), "Token", "Token", [])), $c);
  return;
}

// test func
export function test_collection_maximum$ (
  creator: HexString,
  $c: AptosDataCache,
): void {
  let token_id;
  token_id = create_collection_and_token$(creator, u64("2"), u64("2"), u64("1"), $c);
  create_token$(creator, $.copy(token_id.collection), Std.ASCII.string$([u8("84"), u8("111"), u8("107"), u8("101"), u8("110")], $c), Std.ASCII.string$([u8("72"), u8("101"), u8("108"), u8("108"), u8("111"), u8("44"), u8("32"), u8("84"), u8("111"), u8("107"), u8("101"), u8("110")], $c), true, u64("2"), Std.Option.some$(u64("100"), $c, [AtomicTypeTag.U64] as TypeTag[]), Std.ASCII.string$([u8("104"), u8("116"), u8("116"), u8("112"), u8("115"), u8("58"), u8("47"), u8("47"), u8("97"), u8("112"), u8("116"), u8("111"), u8("115"), u8("46"), u8("100"), u8("101"), u8("118")], $c), u64("0"), $c);
  return;
}

// test func
export function test_create_events_generation$ (
  creator: HexString,
  $c: AptosDataCache,
): void {
  let collections;
  create_collection_and_token$(creator, u64("1"), u64("2"), u64("1"), $c);
  collections = $c.borrow_global<Collections>(new StructTag(new HexString("0x1"), "Token", "Collections", []), Std.Signer.address_of$(creator, $c));
  if (!Std.Event.get_event_handle_counter$(collections.create_collection_events, $c, [new StructTag(new HexString("0x1"), "Token", "CreateCollectionEvent", [])] as TypeTag[]).eq(u64("1"))) {
    throw $.abortCode(u64("1"));
  }
  if (!Std.Event.get_event_handle_counter$(collections.create_token_events, $c, [new StructTag(new HexString("0x1"), "Token", "CreateTokenEvent", [])] as TypeTag[]).eq(u64("1"))) {
    throw $.abortCode(u64("1"));
  }
  return;
}

// test func
export function test_token_maximum$ (
  creator: HexString,
  $c: AptosDataCache,
): void {
  let token_id;
  token_id = create_collection_and_token$(creator, u64("2"), u64("2"), u64("1"), $c);
  mint$(creator, Std.Signer.address_of$(creator, $c), $.copy(token_id), u64("1"), $c);
  return;
}

export function token_id$ (
  token: Token,
  $c: AptosDataCache,
): TokenId {
  return token.id;
}

export function transfer$ (
  from: HexString,
  id: TokenId,
  to: HexString,
  amount: U64,
  $c: AptosDataCache,
): void {
  let token;
  token = withdraw_token$(from, $.copy(id), $.copy(amount), $c);
  direct_deposit$($.copy(to), token, $c);
  return;
}

export function unit_test_poison$ (
  $c: AptosDataCache,
): void {
  Std.UnitTest.create_signers_for_testing$(u64("0"), $c);
  return;
}

export function withdraw_token$ (
  account: HexString,
  id: TokenId,
  amount: U64,
  $c: AptosDataCache,
): Token {
  let account_addr, token_store;
  account_addr = Std.Signer.address_of$(account, $c);
  token_store = $c.borrow_global_mut<TokenStore>(new StructTag(new HexString("0x1"), "Token", "TokenStore", []), $.copy(account_addr));
  Std.Event.emit_event$(token_store.withdraw_events, new WithdrawEvent({ id: $.copy(id), amount: $.copy(amount) }, new StructTag(new HexString("0x1"), "Token", "WithdrawEvent", [])), $c, [new StructTag(new HexString("0x1"), "Token", "WithdrawEvent", [])] as TypeTag[]);
  return withdraw_without_event_internal$($.copy(account_addr), $.copy(id), $.copy(amount), $c);
}

export function withdraw_without_event_internal$ (
  account_addr: HexString,
  id: TokenId,
  amount: U64,
  $c: AptosDataCache,
): Token {
  let temp$1, temp$2, balance, tokens;
  if (!$c.exists(new StructTag(new HexString("0x1"), "Token", "TokenStore", []), $.copy(account_addr))) {
    throw $.abortCode(Std.Errors.not_published$(ETOKEN_STORE_NOT_PUBLISHED, $c));
  }
  tokens = $c.borrow_global_mut<TokenStore>(new StructTag(new HexString("0x1"), "Token", "TokenStore", []), $.copy(account_addr)).tokens;
  [temp$1, temp$2] = [tokens, $.copy(id)];
  if (!Table.contains$(temp$1, temp$2, $c, [new StructTag(new HexString("0x1"), "Token", "TokenId", []), new StructTag(new HexString("0x1"), "Token", "Token", [])] as TypeTag[])) {
    throw $.abortCode(Std.Errors.not_published$(EBALANCE_NOT_PUBLISHED, $c));
  }
  balance = Table.borrow_mut$(tokens, $.copy(id), $c, [new StructTag(new HexString("0x1"), "Token", "TokenId", []), new StructTag(new HexString("0x1"), "Token", "Token", [])] as TypeTag[]).value;
  $.set(balance, $.copy(balance).sub($.copy(amount)));
  return new Token({ id: $.copy(id), value: $.copy(amount) }, new StructTag(new HexString("0x1"), "Token", "Token", []));
}


