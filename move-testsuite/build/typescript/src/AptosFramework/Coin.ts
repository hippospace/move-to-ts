import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient} from "aptos";
import * as Std from "../Std";
import * as TypeInfo from "./TypeInfo";
export const packageName = "AptosFramework";
export const moduleAddress = new HexString("0x1");
export const moduleName = "Coin";

export const ECOIN_INFO_ADDRESS_MISMATCH : U64 = u64("0");
export const ECOIN_INFO_ALREADY_PUBLISHED : U64 = u64("1");
export const ECOIN_INFO_NOT_PUBLISHED : U64 = u64("2");
export const ECOIN_STORE_ALREADY_PUBLISHED : U64 = u64("3");
export const ECOIN_STORE_NOT_PUBLISHED : U64 = u64("4");
export const EDESTRUCTION_OF_NONZERO_TOKEN : U64 = u64("6");
export const EINSUFFICIENT_BALANCE : U64 = u64("5");
export const ETOTAL_SUPPLY_OVERFLOW : U64 = u64("7");
export const MAX_U128 : U128 = u128("340282366920938463463374607431768211455");


export class BurnCapability 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "BurnCapability";
  static typeParameters: TypeParamDeclType[] = [
    { name: "CoinType", isPhantom: true }
  ];
  static fields: FieldDeclType[] = [
  ];

  constructor(proto: any, public typeTag: TypeTag) {

  }

  static BurnCapabilityParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : BurnCapability {
    const proto = $.parseStructProto(data, typeTag, repo, BurnCapability);
    return new BurnCapability(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, BurnCapability, typeParams);
    return result as unknown as BurnCapability;
  }
}

export class Coin 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "Coin";
  static typeParameters: TypeParamDeclType[] = [
    { name: "CoinType", isPhantom: true }
  ];
  static fields: FieldDeclType[] = [
  { name: "value", typeTag: AtomicTypeTag.U64 }];

  value: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.value = proto['value'] as U64;
  }

  static CoinParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : Coin {
    const proto = $.parseStructProto(data, typeTag, repo, Coin);
    return new Coin(proto, typeTag);
  }

}

export class CoinEvents 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "CoinEvents";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "register_events", typeTag: new StructTag(new HexString("0x1"), "Event", "EventHandle", [new StructTag(new HexString("0x1"), "Coin", "RegisterEvent", [])]) }];

  register_events: Std.Event.EventHandle;

  constructor(proto: any, public typeTag: TypeTag) {
    this.register_events = proto['register_events'] as Std.Event.EventHandle;
  }

  static CoinEventsParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : CoinEvents {
    const proto = $.parseStructProto(data, typeTag, repo, CoinEvents);
    return new CoinEvents(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, CoinEvents, typeParams);
    return result as unknown as CoinEvents;
  }
}

export class CoinInfo 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "CoinInfo";
  static typeParameters: TypeParamDeclType[] = [
    { name: "CoinType", isPhantom: true }
  ];
  static fields: FieldDeclType[] = [
  { name: "name", typeTag: new StructTag(new HexString("0x1"), "ASCII", "String", []) },
  { name: "symbol", typeTag: new StructTag(new HexString("0x1"), "ASCII", "String", []) },
  { name: "decimals", typeTag: AtomicTypeTag.U64 },
  { name: "supply", typeTag: new StructTag(new HexString("0x1"), "Option", "Option", [AtomicTypeTag.U128]) }];

  name: Std.ASCII.String;
  symbol: Std.ASCII.String;
  decimals: U64;
  supply: Std.Option.Option;

  constructor(proto: any, public typeTag: TypeTag) {
    this.name = proto['name'] as Std.ASCII.String;
    this.symbol = proto['symbol'] as Std.ASCII.String;
    this.decimals = proto['decimals'] as U64;
    this.supply = proto['supply'] as Std.Option.Option;
  }

  static CoinInfoParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : CoinInfo {
    const proto = $.parseStructProto(data, typeTag, repo, CoinInfo);
    return new CoinInfo(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, CoinInfo, typeParams);
    return result as unknown as CoinInfo;
  }
}

export class CoinStore 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "CoinStore";
  static typeParameters: TypeParamDeclType[] = [
    { name: "CoinType", isPhantom: true }
  ];
  static fields: FieldDeclType[] = [
  { name: "coin", typeTag: new StructTag(new HexString("0x1"), "Coin", "Coin", [new $.TypeParamIdx(0)]) },
  { name: "deposit_events", typeTag: new StructTag(new HexString("0x1"), "Event", "EventHandle", [new StructTag(new HexString("0x1"), "Coin", "DepositEvent", [])]) },
  { name: "withdraw_events", typeTag: new StructTag(new HexString("0x1"), "Event", "EventHandle", [new StructTag(new HexString("0x1"), "Coin", "WithdrawEvent", [])]) }];

  coin: Coin;
  deposit_events: Std.Event.EventHandle;
  withdraw_events: Std.Event.EventHandle;

  constructor(proto: any, public typeTag: TypeTag) {
    this.coin = proto['coin'] as Coin;
    this.deposit_events = proto['deposit_events'] as Std.Event.EventHandle;
    this.withdraw_events = proto['withdraw_events'] as Std.Event.EventHandle;
  }

  static CoinStoreParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : CoinStore {
    const proto = $.parseStructProto(data, typeTag, repo, CoinStore);
    return new CoinStore(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, CoinStore, typeParams);
    return result as unknown as CoinStore;
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
  { name: "amount", typeTag: AtomicTypeTag.U64 }];

  amount: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.amount = proto['amount'] as U64;
  }

  static DepositEventParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : DepositEvent {
    const proto = $.parseStructProto(data, typeTag, repo, DepositEvent);
    return new DepositEvent(proto, typeTag);
  }

}

export class FakeMoney 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "FakeMoney";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  ];

  constructor(proto: any, public typeTag: TypeTag) {

  }

  static FakeMoneyParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : FakeMoney {
    const proto = $.parseStructProto(data, typeTag, repo, FakeMoney);
    return new FakeMoney(proto, typeTag);
  }

}

export class FakeMoneyCapabilities 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "FakeMoneyCapabilities";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "mint_cap", typeTag: new StructTag(new HexString("0x1"), "Coin", "MintCapability", [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])]) },
  { name: "burn_cap", typeTag: new StructTag(new HexString("0x1"), "Coin", "BurnCapability", [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])]) }];

  mint_cap: MintCapability;
  burn_cap: BurnCapability;

  constructor(proto: any, public typeTag: TypeTag) {
    this.mint_cap = proto['mint_cap'] as MintCapability;
    this.burn_cap = proto['burn_cap'] as BurnCapability;
  }

  static FakeMoneyCapabilitiesParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : FakeMoneyCapabilities {
    const proto = $.parseStructProto(data, typeTag, repo, FakeMoneyCapabilities);
    return new FakeMoneyCapabilities(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, FakeMoneyCapabilities, typeParams);
    return result as unknown as FakeMoneyCapabilities;
  }
}

export class MintCapability 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "MintCapability";
  static typeParameters: TypeParamDeclType[] = [
    { name: "CoinType", isPhantom: true }
  ];
  static fields: FieldDeclType[] = [
  ];

  constructor(proto: any, public typeTag: TypeTag) {

  }

  static MintCapabilityParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : MintCapability {
    const proto = $.parseStructProto(data, typeTag, repo, MintCapability);
    return new MintCapability(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, MintCapability, typeParams);
    return result as unknown as MintCapability;
  }
}

export class RegisterEvent 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "RegisterEvent";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "type_info", typeTag: new StructTag(new HexString("0x1"), "TypeInfo", "TypeInfo", []) }];

  type_info: TypeInfo.TypeInfo;

  constructor(proto: any, public typeTag: TypeTag) {
    this.type_info = proto['type_info'] as TypeInfo.TypeInfo;
  }

  static RegisterEventParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : RegisterEvent {
    const proto = $.parseStructProto(data, typeTag, repo, RegisterEvent);
    return new RegisterEvent(proto, typeTag);
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
  { name: "amount", typeTag: AtomicTypeTag.U64 }];

  amount: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.amount = proto['amount'] as U64;
  }

  static WithdrawEventParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : WithdrawEvent {
    const proto = $.parseStructProto(data, typeTag, repo, WithdrawEvent);
    return new WithdrawEvent(proto, typeTag);
  }

}
export function balance$ (
  owner: HexString,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): U64 {
  if (!is_account_registered$($.copy(owner), $c, [$p[0]] as TypeTag[])) {
    throw $.abortCode(Std.Errors.not_published$(ECOIN_STORE_NOT_PUBLISHED, $c));
  }
  return $.copy($c.borrow_global<CoinStore>(new StructTag(new HexString("0x1"), "Coin", "CoinStore", [$p[0]]), $.copy(owner)).coin.value);
}

export function burn$ (
  coin: Coin,
  _cap: BurnCapability,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): void {
  let temp$1, coin_addr, supply, supply__2;
  let { value: amount } = coin;
  temp$1 = TypeInfo.type_of$($c, [$p[0]] as TypeTag[]);
  coin_addr = TypeInfo.account_address$(temp$1, $c);
  supply = $c.borrow_global_mut<CoinInfo>(new StructTag(new HexString("0x1"), "Coin", "CoinInfo", [$p[0]]), $.copy(coin_addr)).supply;
  if (Std.Option.is_some$(supply, $c, [AtomicTypeTag.U128] as TypeTag[])) {
    supply__2 = Std.Option.borrow_mut$(supply, $c, [AtomicTypeTag.U128] as TypeTag[]);
    $.set(supply__2, $.copy(supply__2).sub(u128($.copy(amount))));
  }
  else{
  }
  return;
}

export function burn_from$ (
  account_addr: HexString,
  amount: U64,
  burn_cap: BurnCapability,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): void {
  let coin_store, coin_to_burn;
  coin_store = $c.borrow_global_mut<CoinStore>(new StructTag(new HexString("0x1"), "Coin", "CoinStore", [$p[0]]), $.copy(account_addr));
  coin_to_burn = extract$(coin_store.coin, $.copy(amount), $c, [$p[0]] as TypeTag[]);
  burn$(coin_to_burn, burn_cap, $c, [$p[0]] as TypeTag[]);
  return;
}

export function decimals$ (
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): U64 {
  let coin_address, type_info;
  type_info = TypeInfo.type_of$($c, [$p[0]] as TypeTag[]);
  coin_address = TypeInfo.account_address$(type_info, $c);
  return $.copy($c.borrow_global<CoinInfo>(new StructTag(new HexString("0x1"), "Coin", "CoinInfo", [$p[0]]), $.copy(coin_address)).decimals);
}

export function deposit$ (
  account_addr: HexString,
  coin: Coin,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): void {
  let coin_store;
  if (!is_account_registered$($.copy(account_addr), $c, [$p[0]] as TypeTag[])) {
    throw $.abortCode(Std.Errors.not_published$(ECOIN_STORE_NOT_PUBLISHED, $c));
  }
  coin_store = $c.borrow_global_mut<CoinStore>(new StructTag(new HexString("0x1"), "Coin", "CoinStore", [$p[0]]), $.copy(account_addr));
  Std.Event.emit_event$(coin_store.deposit_events, new DepositEvent({ amount: $.copy(coin.value) }, new StructTag(new HexString("0x1"), "Coin", "DepositEvent", [])), $c, [new StructTag(new HexString("0x1"), "Coin", "DepositEvent", [])] as TypeTag[]);
  merge$(coin_store.coin, coin, $c, [$p[0]] as TypeTag[]);
  return;
}

// test func
export function destroy_burn_cap$ (
  burn_cap: BurnCapability,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): void {
  $.copy(burn_cap);
  return;
}

// test func
export function destroy_mint_cap$ (
  mint_cap: MintCapability,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): void {
  $.copy(mint_cap);
  return;
}

export function destroy_zero$ (
  zero_coin: Coin,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): void {
  let { value: value } = zero_coin;
  if (!$.copy(value).eq(u64("0"))) {
    throw $.abortCode(Std.Errors.invalid_argument$(EDESTRUCTION_OF_NONZERO_TOKEN, $c));
  }
  return;
}

// test func
export function end_to_end$ (
  source: HexString,
  destination: HexString,
  $c: AptosDataCache,
): void {
  let temp$1, temp$2, temp$3, burn_cap, coin, coins_minted, destination_addr, mint_cap, name, source_addr, symbol;
  source_addr = Std.Signer.address_of$(source, $c);
  destination_addr = Std.Signer.address_of$(destination, $c);
  name = Std.ASCII.string$([u8("70"), u8("97"), u8("107"), u8("101"), u8("32"), u8("109"), u8("111"), u8("110"), u8("101"), u8("121")], $c);
  symbol = Std.ASCII.string$([u8("70"), u8("77"), u8("68")], $c);
  [mint_cap, burn_cap] = initialize$(source, $.copy(name), $.copy(symbol), u64("18"), true, $c, [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])] as TypeTag[]);
  register$(source, $c, [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])] as TypeTag[]);
  register$(destination, $c, [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])] as TypeTag[]);
  temp$1 = supply$($c, [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])] as TypeTag[]);
  if (!$.copy(Std.Option.borrow$(temp$1, $c, [AtomicTypeTag.U128] as TypeTag[])).eq(u128("0"))) {
    throw $.abortCode(u64("0"));
  }
  if (!$.deep_eq(name$($c, [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])] as TypeTag[]), $.copy(name))) {
    throw $.abortCode(u64("1"));
  }
  if (!$.deep_eq(symbol$($c, [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])] as TypeTag[]), $.copy(symbol))) {
    throw $.abortCode(u64("2"));
  }
  if (!decimals$($c, [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])] as TypeTag[]).eq(u64("18"))) {
    throw $.abortCode(u64("3"));
  }
  coins_minted = mint$(u64("100"), mint_cap, $c, [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])] as TypeTag[]);
  deposit$($.copy(source_addr), coins_minted, $c, [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])] as TypeTag[]);
  transfer$(source, $.copy(destination_addr), u64("50"), $c, [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])] as TypeTag[]);
  if (!balance$($.copy(source_addr), $c, [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])] as TypeTag[]).eq(u64("50"))) {
    throw $.abortCode(u64("4"));
  }
  if (!balance$($.copy(destination_addr), $c, [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])] as TypeTag[]).eq(u64("50"))) {
    throw $.abortCode(u64("5"));
  }
  temp$2 = supply$($c, [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])] as TypeTag[]);
  if (!$.copy(Std.Option.borrow$(temp$2, $c, [AtomicTypeTag.U128] as TypeTag[])).eq(u128("100"))) {
    throw $.abortCode(u64("6"));
  }
  coin = withdraw$(source, u64("10"), $c, [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])] as TypeTag[]);
  if (!value$(coin, $c, [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])] as TypeTag[]).eq(u64("10"))) {
    throw $.abortCode(u64("7"));
  }
  burn$(coin, burn_cap, $c, [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])] as TypeTag[]);
  temp$3 = supply$($c, [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])] as TypeTag[]);
  if (!$.copy(Std.Option.borrow$(temp$3, $c, [AtomicTypeTag.U128] as TypeTag[])).eq(u128("90"))) {
    throw $.abortCode(u64("8"));
  }
  $c.move_to(new StructTag(new HexString("0x1"), "Coin", "FakeMoneyCapabilities", []), source, new FakeMoneyCapabilities({ mint_cap: $.copy(mint_cap), burn_cap: $.copy(burn_cap) }, new StructTag(new HexString("0x1"), "Coin", "FakeMoneyCapabilities", [])));
  return;
}


export function buildPayload_end_to_end (
  source: HexString,
  destination: HexString,
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0x1::Coin::end_to_end",
    typeParamStrings,
    []
  );

}
// test func
export function end_to_end_no_supply$ (
  source: HexString,
  destination: HexString,
  $c: AptosDataCache,
): void {
  let temp$1, temp$2, temp$3, burn_cap, coin, coins_minted, destination_addr, mint_cap, source_addr;
  source_addr = Std.Signer.address_of$(source, $c);
  destination_addr = Std.Signer.address_of$(destination, $c);
  [mint_cap, burn_cap] = initialize$(source, Std.ASCII.string$([u8("70"), u8("97"), u8("107"), u8("101"), u8("32"), u8("109"), u8("111"), u8("110"), u8("101"), u8("121")], $c), Std.ASCII.string$([u8("70"), u8("77"), u8("68")], $c), u64("1"), false, $c, [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])] as TypeTag[]);
  register$(source, $c, [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])] as TypeTag[]);
  register$(destination, $c, [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])] as TypeTag[]);
  temp$1 = supply$($c, [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])] as TypeTag[]);
  if (!Std.Option.is_none$(temp$1, $c, [AtomicTypeTag.U128] as TypeTag[])) {
    throw $.abortCode(u64("0"));
  }
  coins_minted = mint$(u64("100"), mint_cap, $c, [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])] as TypeTag[]);
  deposit$($.copy(source_addr), coins_minted, $c, [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])] as TypeTag[]);
  transfer$(source, $.copy(destination_addr), u64("50"), $c, [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])] as TypeTag[]);
  if (!balance$($.copy(source_addr), $c, [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])] as TypeTag[]).eq(u64("50"))) {
    throw $.abortCode(u64("1"));
  }
  if (!balance$($.copy(destination_addr), $c, [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])] as TypeTag[]).eq(u64("50"))) {
    throw $.abortCode(u64("2"));
  }
  temp$2 = supply$($c, [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])] as TypeTag[]);
  if (!Std.Option.is_none$(temp$2, $c, [AtomicTypeTag.U128] as TypeTag[])) {
    throw $.abortCode(u64("3"));
  }
  coin = withdraw$(source, u64("10"), $c, [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])] as TypeTag[]);
  burn$(coin, burn_cap, $c, [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])] as TypeTag[]);
  temp$3 = supply$($c, [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])] as TypeTag[]);
  if (!Std.Option.is_none$(temp$3, $c, [AtomicTypeTag.U128] as TypeTag[])) {
    throw $.abortCode(u64("4"));
  }
  $c.move_to(new StructTag(new HexString("0x1"), "Coin", "FakeMoneyCapabilities", []), source, new FakeMoneyCapabilities({ mint_cap: $.copy(mint_cap), burn_cap: $.copy(burn_cap) }, new StructTag(new HexString("0x1"), "Coin", "FakeMoneyCapabilities", [])));
  return;
}


export function buildPayload_end_to_end_no_supply (
  source: HexString,
  destination: HexString,
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0x1::Coin::end_to_end_no_supply",
    typeParamStrings,
    []
  );

}
export function extract$ (
  coin: Coin,
  amount: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): Coin {
  if (!$.copy(coin.value).ge($.copy(amount))) {
    throw $.abortCode(Std.Errors.invalid_argument$(EINSUFFICIENT_BALANCE, $c));
  }
  coin.value = $.copy(coin.value).sub($.copy(amount));
  return new Coin({ value: $.copy(amount) }, new StructTag(new HexString("0x1"), "Coin", "Coin", [$p[0]]));
}

export function extract_all$ (
  coin: Coin,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): Coin {
  let total_value;
  total_value = $.copy(coin.value);
  coin.value = u64("0");
  return new Coin({ value: $.copy(total_value) }, new StructTag(new HexString("0x1"), "Coin", "Coin", [$p[0]]));
}

// test func
export function fail_initialize$ (
  source: HexString,
  $c: AptosDataCache,
): void {
  let burn_cap, mint_cap;
  [mint_cap, burn_cap] = initialize$(source, Std.ASCII.string$([u8("70"), u8("97"), u8("107"), u8("101"), u8("32"), u8("109"), u8("111"), u8("110"), u8("101"), u8("121")], $c), Std.ASCII.string$([u8("70"), u8("77"), u8("68")], $c), u64("1"), true, $c, [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])] as TypeTag[]);
  $c.move_to(new StructTag(new HexString("0x1"), "Coin", "FakeMoneyCapabilities", []), source, new FakeMoneyCapabilities({ mint_cap: $.copy(mint_cap), burn_cap: $.copy(burn_cap) }, new StructTag(new HexString("0x1"), "Coin", "FakeMoneyCapabilities", [])));
  return;
}

// test func
export function fail_transfer$ (
  source: HexString,
  destination: HexString,
  $c: AptosDataCache,
): void {
  let temp$1, burn_cap, coins_minted, destination_addr, mint_cap, source_addr;
  source_addr = Std.Signer.address_of$(source, $c);
  destination_addr = Std.Signer.address_of$(destination, $c);
  [mint_cap, burn_cap] = initialize$(source, Std.ASCII.string$([u8("70"), u8("97"), u8("107"), u8("101"), u8("32"), u8("109"), u8("111"), u8("110"), u8("101"), u8("121")], $c), Std.ASCII.string$([u8("70"), u8("77"), u8("68")], $c), u64("1"), true, $c, [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])] as TypeTag[]);
  register$(source, $c, [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])] as TypeTag[]);
  temp$1 = supply$($c, [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])] as TypeTag[]);
  if (!$.copy(Std.Option.borrow$(temp$1, $c, [AtomicTypeTag.U128] as TypeTag[])).eq(u128("0"))) {
    throw $.abortCode(u64("0"));
  }
  coins_minted = mint$(u64("100"), mint_cap, $c, [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])] as TypeTag[]);
  deposit$($.copy(source_addr), coins_minted, $c, [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])] as TypeTag[]);
  transfer$(source, $.copy(destination_addr), u64("50"), $c, [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])] as TypeTag[]);
  $c.move_to(new StructTag(new HexString("0x1"), "Coin", "FakeMoneyCapabilities", []), source, new FakeMoneyCapabilities({ mint_cap: $.copy(mint_cap), burn_cap: $.copy(burn_cap) }, new StructTag(new HexString("0x1"), "Coin", "FakeMoneyCapabilities", [])));
  return;
}


export function buildPayload_fail_transfer (
  source: HexString,
  destination: HexString,
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0x1::Coin::fail_transfer",
    typeParamStrings,
    []
  );

}
export function initialize$ (
  account: HexString,
  name: Std.ASCII.String,
  symbol: Std.ASCII.String,
  decimals: U64,
  monitor_supply: boolean,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): [MintCapability, BurnCapability] {
  let temp$1, temp$2, temp$3, temp$4, account_addr, coin_info, type_info;
  account_addr = Std.Signer.address_of$(account, $c);
  type_info = TypeInfo.type_of$($c, [$p[0]] as TypeTag[]);
  if (!(TypeInfo.account_address$(type_info, $c).hex() === $.copy(account_addr).hex())) {
    throw $.abortCode(Std.Errors.invalid_argument$(ECOIN_INFO_ADDRESS_MISMATCH, $c));
  }
  if (!!$c.exists(new StructTag(new HexString("0x1"), "Coin", "CoinInfo", [$p[0]]), $.copy(account_addr))) {
    throw $.abortCode(Std.Errors.already_published$(ECOIN_INFO_ALREADY_PUBLISHED, $c));
  }
  temp$4 = $.copy(name);
  temp$3 = $.copy(symbol);
  temp$2 = $.copy(decimals);
  if (monitor_supply) {
    temp$1 = Std.Option.some$(u128("0"), $c, [AtomicTypeTag.U128] as TypeTag[]);
  }
  else{
    temp$1 = Std.Option.none$($c, [AtomicTypeTag.U128] as TypeTag[]);
  }
  coin_info = new CoinInfo({ name: temp$4, symbol: temp$3, decimals: temp$2, supply: temp$1 }, new StructTag(new HexString("0x1"), "Coin", "CoinInfo", [$p[0]]));
  $c.move_to(new StructTag(new HexString("0x1"), "Coin", "CoinInfo", [$p[0]]), account, coin_info);
  return [new MintCapability({  }, new StructTag(new HexString("0x1"), "Coin", "MintCapability", [$p[0]])), new BurnCapability({  }, new StructTag(new HexString("0x1"), "Coin", "BurnCapability", [$p[0]]))];
}

export function is_account_registered$ (
  account_addr: HexString,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): boolean {
  return $c.exists(new StructTag(new HexString("0x1"), "Coin", "CoinStore", [$p[0]]), $.copy(account_addr));
}

export function is_coin_initialized$ (
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): boolean {
  let coin_address, type_info;
  type_info = TypeInfo.type_of$($c, [$p[0]] as TypeTag[]);
  coin_address = TypeInfo.account_address$(type_info, $c);
  return $c.exists(new StructTag(new HexString("0x1"), "Coin", "CoinInfo", [$p[0]]), $.copy(coin_address));
}

export function merge$ (
  dst_coin: Coin,
  source_coin: Coin,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): void {
  dst_coin.value = $.copy(dst_coin.value).add($.copy(source_coin.value));
  source_coin;
  return;
}

export function mint$ (
  amount: U64,
  _cap: MintCapability,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): Coin {
  let temp$1, amount_u128, coin_addr, supply, supply__2;
  temp$1 = TypeInfo.type_of$($c, [$p[0]] as TypeTag[]);
  coin_addr = TypeInfo.account_address$(temp$1, $c);
  supply = $c.borrow_global_mut<CoinInfo>(new StructTag(new HexString("0x1"), "Coin", "CoinInfo", [$p[0]]), $.copy(coin_addr)).supply;
  if (Std.Option.is_some$(supply, $c, [AtomicTypeTag.U128] as TypeTag[])) {
    supply__2 = Std.Option.borrow_mut$(supply, $c, [AtomicTypeTag.U128] as TypeTag[]);
    amount_u128 = u128($.copy(amount));
    if (!$.copy(supply__2).le(MAX_U128.sub($.copy(amount_u128)))) {
      throw $.abortCode(Std.Errors.invalid_argument$(ETOTAL_SUPPLY_OVERFLOW, $c));
    }
    $.set(supply__2, $.copy(supply__2).add($.copy(amount_u128)));
  }
  else{
  }
  return new Coin({ value: $.copy(amount) }, new StructTag(new HexString("0x1"), "Coin", "Coin", [$p[0]]));
}

export function name$ (
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): Std.ASCII.String {
  let coin_address, type_info;
  type_info = TypeInfo.type_of$($c, [$p[0]] as TypeTag[]);
  coin_address = TypeInfo.account_address$(type_info, $c);
  return $.copy($c.borrow_global<CoinInfo>(new StructTag(new HexString("0x1"), "Coin", "CoinInfo", [$p[0]]), $.copy(coin_address)).name);
}

export function register$ (
  account: HexString,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): void {
  register_internal$(account, $c, [$p[0]] as TypeTag[]);
  return;
}


export function buildPayload_register (
  account: HexString,
  $p: TypeTag[], /* <CoinType>*/
) {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    "0x1::Coin::register",
    typeParamStrings,
    []
  );

}
export function register_internal$ (
  account: HexString,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): void {
  let account_addr, coin_events, coin_store;
  account_addr = Std.Signer.address_of$(account, $c);
  if (!!is_account_registered$($.copy(account_addr), $c, [$p[0]] as TypeTag[])) {
    throw $.abortCode(Std.Errors.already_published$(ECOIN_STORE_ALREADY_PUBLISHED, $c));
  }
  if (!$c.exists(new StructTag(new HexString("0x1"), "Coin", "CoinEvents", []), $.copy(account_addr))) {
    $c.move_to(new StructTag(new HexString("0x1"), "Coin", "CoinEvents", []), account, new CoinEvents({ register_events: Std.Event.new_event_handle$(account, $c, [new StructTag(new HexString("0x1"), "Coin", "RegisterEvent", [])] as TypeTag[]) }, new StructTag(new HexString("0x1"), "Coin", "CoinEvents", [])));
  }
  else{
  }
  coin_events = $c.borrow_global_mut<CoinEvents>(new StructTag(new HexString("0x1"), "Coin", "CoinEvents", []), $.copy(account_addr));
  Std.Event.emit_event$(coin_events.register_events, new RegisterEvent({ type_info: TypeInfo.type_of$($c, [$p[0]] as TypeTag[]) }, new StructTag(new HexString("0x1"), "Coin", "RegisterEvent", [])), $c, [new StructTag(new HexString("0x1"), "Coin", "RegisterEvent", [])] as TypeTag[]);
  coin_store = new CoinStore({ coin: new Coin({ value: u64("0") }, new StructTag(new HexString("0x1"), "Coin", "Coin", [$p[0]])), deposit_events: Std.Event.new_event_handle$(account, $c, [new StructTag(new HexString("0x1"), "Coin", "DepositEvent", [])] as TypeTag[]), withdraw_events: Std.Event.new_event_handle$(account, $c, [new StructTag(new HexString("0x1"), "Coin", "WithdrawEvent", [])] as TypeTag[]) }, new StructTag(new HexString("0x1"), "Coin", "CoinStore", [$p[0]]));
  $c.move_to(new StructTag(new HexString("0x1"), "Coin", "CoinStore", [$p[0]]), account, coin_store);
  return;
}

export function supply$ (
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): Std.Option.Option {
  let coin_address, type_info;
  type_info = TypeInfo.type_of$($c, [$p[0]] as TypeTag[]);
  coin_address = TypeInfo.account_address$(type_info, $c);
  return $.copy($c.borrow_global<CoinInfo>(new StructTag(new HexString("0x1"), "Coin", "CoinInfo", [$p[0]]), $.copy(coin_address)).supply);
}

export function symbol$ (
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): Std.ASCII.String {
  let coin_address, type_info;
  type_info = TypeInfo.type_of$($c, [$p[0]] as TypeTag[]);
  coin_address = TypeInfo.account_address$(type_info, $c);
  return $.copy($c.borrow_global<CoinInfo>(new StructTag(new HexString("0x1"), "Coin", "CoinInfo", [$p[0]]), $.copy(coin_address)).symbol);
}

// test func
export function test_burn_from_with_capability$ (
  source: HexString,
  $c: AptosDataCache,
): void {
  let temp$1, temp$2, burn_cap, coins_minted, mint_cap, source_addr;
  source_addr = Std.Signer.address_of$(source, $c);
  [mint_cap, burn_cap] = initialize$(source, Std.ASCII.string$([u8("70"), u8("97"), u8("107"), u8("101"), u8("32"), u8("109"), u8("111"), u8("110"), u8("101"), u8("121")], $c), Std.ASCII.string$([u8("70"), u8("77"), u8("68")], $c), u64("1"), true, $c, [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])] as TypeTag[]);
  register$(source, $c, [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])] as TypeTag[]);
  coins_minted = mint$(u64("100"), mint_cap, $c, [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])] as TypeTag[]);
  deposit$($.copy(source_addr), coins_minted, $c, [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])] as TypeTag[]);
  if (!balance$($.copy(source_addr), $c, [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])] as TypeTag[]).eq(u64("100"))) {
    throw $.abortCode(u64("0"));
  }
  temp$1 = supply$($c, [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])] as TypeTag[]);
  if (!$.copy(Std.Option.borrow$(temp$1, $c, [AtomicTypeTag.U128] as TypeTag[])).eq(u128("100"))) {
    throw $.abortCode(u64("1"));
  }
  burn_from$($.copy(source_addr), u64("10"), burn_cap, $c, [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])] as TypeTag[]);
  if (!balance$($.copy(source_addr), $c, [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])] as TypeTag[]).eq(u64("90"))) {
    throw $.abortCode(u64("2"));
  }
  temp$2 = supply$($c, [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])] as TypeTag[]);
  if (!$.copy(Std.Option.borrow$(temp$2, $c, [AtomicTypeTag.U128] as TypeTag[])).eq(u128("90"))) {
    throw $.abortCode(u64("3"));
  }
  $c.move_to(new StructTag(new HexString("0x1"), "Coin", "FakeMoneyCapabilities", []), source, new FakeMoneyCapabilities({ mint_cap: $.copy(mint_cap), burn_cap: $.copy(burn_cap) }, new StructTag(new HexString("0x1"), "Coin", "FakeMoneyCapabilities", [])));
  return;
}


export function buildPayload_test_burn_from_with_capability (
  source: HexString,
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0x1::Coin::test_burn_from_with_capability",
    typeParamStrings,
    []
  );

}
// test func
export function test_destroy_non_zero$ (
  source: HexString,
  $c: AptosDataCache,
): void {
  let burn_cap, coins_minted, mint_cap;
  [mint_cap, burn_cap] = initialize$(source, Std.ASCII.string$([u8("70"), u8("97"), u8("107"), u8("101"), u8("32"), u8("109"), u8("111"), u8("110"), u8("101"), u8("121")], $c), Std.ASCII.string$([u8("70"), u8("77"), u8("68")], $c), u64("1"), true, $c, [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])] as TypeTag[]);
  coins_minted = mint$(u64("100"), mint_cap, $c, [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])] as TypeTag[]);
  destroy_zero$(coins_minted, $c, [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])] as TypeTag[]);
  $c.move_to(new StructTag(new HexString("0x1"), "Coin", "FakeMoneyCapabilities", []), source, new FakeMoneyCapabilities({ mint_cap: $.copy(mint_cap), burn_cap: $.copy(burn_cap) }, new StructTag(new HexString("0x1"), "Coin", "FakeMoneyCapabilities", [])));
  return;
}

// test func
export function test_extract$ (
  source: HexString,
  $c: AptosDataCache,
): void {
  let burn_cap, coins_minted, extracted, mint_cap, source_addr;
  source_addr = Std.Signer.address_of$(source, $c);
  [mint_cap, burn_cap] = initialize$(source, Std.ASCII.string$([u8("70"), u8("97"), u8("107"), u8("101"), u8("32"), u8("109"), u8("111"), u8("110"), u8("101"), u8("121")], $c), Std.ASCII.string$([u8("70"), u8("77"), u8("68")], $c), u64("1"), true, $c, [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])] as TypeTag[]);
  register$(source, $c, [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])] as TypeTag[]);
  coins_minted = mint$(u64("100"), mint_cap, $c, [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])] as TypeTag[]);
  extracted = extract$(coins_minted, u64("25"), $c, [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])] as TypeTag[]);
  if (!value$(coins_minted, $c, [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])] as TypeTag[]).eq(u64("75"))) {
    throw $.abortCode(u64("0"));
  }
  if (!value$(extracted, $c, [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])] as TypeTag[]).eq(u64("25"))) {
    throw $.abortCode(u64("1"));
  }
  deposit$($.copy(source_addr), coins_minted, $c, [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])] as TypeTag[]);
  deposit$($.copy(source_addr), extracted, $c, [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])] as TypeTag[]);
  if (!balance$($.copy(source_addr), $c, [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])] as TypeTag[]).eq(u64("100"))) {
    throw $.abortCode(u64("2"));
  }
  $c.move_to(new StructTag(new HexString("0x1"), "Coin", "FakeMoneyCapabilities", []), source, new FakeMoneyCapabilities({ mint_cap: $.copy(mint_cap), burn_cap: $.copy(burn_cap) }, new StructTag(new HexString("0x1"), "Coin", "FakeMoneyCapabilities", [])));
  return;
}


export function buildPayload_test_extract (
  source: HexString,
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0x1::Coin::test_extract",
    typeParamStrings,
    []
  );

}
// test func
export function test_is_coin_initialized$ (
  source: HexString,
  $c: AptosDataCache,
): void {
  let burn_cap, mint_cap;
  if (!!is_coin_initialized$($c, [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])] as TypeTag[])) {
    throw $.abortCode(u64("0"));
  }
  [mint_cap, burn_cap] = initialize$(source, Std.ASCII.string$([u8("70"), u8("97"), u8("107"), u8("101"), u8("32"), u8("109"), u8("111"), u8("110"), u8("101"), u8("121")], $c), Std.ASCII.string$([u8("70"), u8("77"), u8("68")], $c), u64("1"), true, $c, [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])] as TypeTag[]);
  if (!is_coin_initialized$($c, [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])] as TypeTag[])) {
    throw $.abortCode(u64("1"));
  }
  $c.move_to(new StructTag(new HexString("0x1"), "Coin", "FakeMoneyCapabilities", []), source, new FakeMoneyCapabilities({ mint_cap: $.copy(mint_cap), burn_cap: $.copy(burn_cap) }, new StructTag(new HexString("0x1"), "Coin", "FakeMoneyCapabilities", [])));
  return;
}

// test func
export function test_zero$ (
  $c: AptosDataCache,
): void {
  let zero;
  zero = zero$($c, [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])] as TypeTag[]);
  if (!value$(zero, $c, [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])] as TypeTag[]).eq(u64("0"))) {
    throw $.abortCode(u64("1"));
  }
  destroy_zero$(zero, $c, [new StructTag(new HexString("0x1"), "Coin", "FakeMoney", [])] as TypeTag[]);
  return;
}

export function transfer$ (
  from: HexString,
  to: HexString,
  amount: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): void {
  let coin;
  coin = withdraw$(from, $.copy(amount), $c, [$p[0]] as TypeTag[]);
  deposit$($.copy(to), coin, $c, [$p[0]] as TypeTag[]);
  return;
}


export function buildPayload_transfer (
  from: HexString,
  to: HexString,
  amount: U64,
  $p: TypeTag[], /* <CoinType>*/
) {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    "0x1::Coin::transfer",
    typeParamStrings,
    [
      to,
      amount.toPayloadArg(),
    ]
  );

}
export function unit_test_poison$ (
  $c: AptosDataCache,
): void {
  Std.UnitTest.create_signers_for_testing$(u64("0"), $c);
  return;
}

export function value$ (
  coin: Coin,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): U64 {
  return $.copy(coin.value);
}

export function withdraw$ (
  account: HexString,
  amount: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): Coin {
  let account_addr, coin_store;
  account_addr = Std.Signer.address_of$(account, $c);
  if (!is_account_registered$($.copy(account_addr), $c, [$p[0]] as TypeTag[])) {
    throw $.abortCode(Std.Errors.not_published$(ECOIN_STORE_NOT_PUBLISHED, $c));
  }
  coin_store = $c.borrow_global_mut<CoinStore>(new StructTag(new HexString("0x1"), "Coin", "CoinStore", [$p[0]]), $.copy(account_addr));
  Std.Event.emit_event$(coin_store.withdraw_events, new WithdrawEvent({ amount: $.copy(amount) }, new StructTag(new HexString("0x1"), "Coin", "WithdrawEvent", [])), $c, [new StructTag(new HexString("0x1"), "Coin", "WithdrawEvent", [])] as TypeTag[]);
  return extract$(coin_store.coin, $.copy(amount), $c, [$p[0]] as TypeTag[]);
}

export function zero$ (
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): Coin {
  return new Coin({ value: u64("0") }, new StructTag(new HexString("0x1"), "Coin", "Coin", [$p[0]]));
}


