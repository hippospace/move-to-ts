import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient} from "aptos";
import * as Std from "../Std";
import * as Coin from "./Coin";
export const packageName = "AptosFramework";
export const moduleAddress = new HexString("0x1");
export const moduleName = "ManagedCoin";

export const ENO_CAPABILITIES : U64 = u64("0");


export class Capabilities 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "Capabilities";
  static typeParameters: TypeParamDeclType[] = [
    { name: "CoinType", isPhantom: true }
  ];
  static fields: FieldDeclType[] = [
  { name: "mint_cap", typeTag: new StructTag(new HexString("0x1"), "Coin", "MintCapability", [new $.TypeParamIdx(0)]) },
  { name: "burn_cap", typeTag: new StructTag(new HexString("0x1"), "Coin", "BurnCapability", [new $.TypeParamIdx(0)]) }];

  mint_cap: Coin.MintCapability;
  burn_cap: Coin.BurnCapability;

  constructor(proto: any, public typeTag: TypeTag) {
    this.mint_cap = proto['mint_cap'] as Coin.MintCapability;
    this.burn_cap = proto['burn_cap'] as Coin.BurnCapability;
  }

  static CapabilitiesParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : Capabilities {
    const proto = $.parseStructProto(data, typeTag, repo, Capabilities);
    return new Capabilities(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, Capabilities, typeParams);
    return result as unknown as Capabilities;
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
export function burn$ (
  account: HexString,
  amount: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): void {
  let account_addr, capabilities, to_burn;
  account_addr = Std.Signer.address_of$(account, $c);
  if (!$c.exists(new StructTag(new HexString("0x1"), "ManagedCoin", "Capabilities", [$p[0]]), $.copy(account_addr))) {
    throw $.abortCode(Std.Errors.not_published$(ENO_CAPABILITIES, $c));
  }
  capabilities = $c.borrow_global<Capabilities>(new StructTag(new HexString("0x1"), "ManagedCoin", "Capabilities", [$p[0]]), $.copy(account_addr));
  to_burn = Coin.withdraw$(account, $.copy(amount), $c, [$p[0]] as TypeTag[]);
  Coin.burn$(to_burn, capabilities.burn_cap, $c, [$p[0]] as TypeTag[]);
  return;
}


export function buildPayload_burn (
  account: HexString,
  amount: U64,
  $p: TypeTag[], /* <CoinType>*/
) {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    "0x1::ManagedCoin::burn",
    typeParamStrings,
    [
      amount.toPayloadArg(),
    ]
  );

}
// test func
export function fail_burn$ (
  source: HexString,
  destination: HexString,
  $c: AptosDataCache,
): void {
  let source_addr;
  source_addr = Std.Signer.address_of$(source, $c);
  initialize$(source, [u8("70"), u8("97"), u8("107"), u8("101"), u8("32"), u8("109"), u8("111"), u8("110"), u8("101"), u8("121")], [u8("70"), u8("77"), u8("68")], u64("1"), true, $c, [new StructTag(new HexString("0x1"), "ManagedCoin", "FakeMoney", [])] as TypeTag[]);
  register$(source, $c, [new StructTag(new HexString("0x1"), "ManagedCoin", "FakeMoney", [])] as TypeTag[]);
  register$(destination, $c, [new StructTag(new HexString("0x1"), "ManagedCoin", "FakeMoney", [])] as TypeTag[]);
  mint$(source, $.copy(source_addr), u64("100"), $c, [new StructTag(new HexString("0x1"), "ManagedCoin", "FakeMoney", [])] as TypeTag[]);
  burn$(destination, u64("10"), $c, [new StructTag(new HexString("0x1"), "ManagedCoin", "FakeMoney", [])] as TypeTag[]);
  return;
}


export function buildPayload_fail_burn (
  source: HexString,
  destination: HexString,
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0x1::ManagedCoin::fail_burn",
    typeParamStrings,
    []
  );

}
// test func
export function fail_mint$ (
  source: HexString,
  destination: HexString,
  $c: AptosDataCache,
): void {
  let source_addr;
  source_addr = Std.Signer.address_of$(source, $c);
  initialize$(source, [u8("70"), u8("97"), u8("107"), u8("101"), u8("32"), u8("109"), u8("111"), u8("110"), u8("101"), u8("121")], [u8("70"), u8("77"), u8("68")], u64("1"), true, $c, [new StructTag(new HexString("0x1"), "ManagedCoin", "FakeMoney", [])] as TypeTag[]);
  register$(source, $c, [new StructTag(new HexString("0x1"), "ManagedCoin", "FakeMoney", [])] as TypeTag[]);
  register$(destination, $c, [new StructTag(new HexString("0x1"), "ManagedCoin", "FakeMoney", [])] as TypeTag[]);
  mint$(destination, $.copy(source_addr), u64("100"), $c, [new StructTag(new HexString("0x1"), "ManagedCoin", "FakeMoney", [])] as TypeTag[]);
  return;
}


export function buildPayload_fail_mint (
  source: HexString,
  destination: HexString,
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0x1::ManagedCoin::fail_mint",
    typeParamStrings,
    []
  );

}
export function initialize$ (
  account: HexString,
  name: U8[],
  symbol: U8[],
  decimals: U64,
  monitor_supply: boolean,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): void {
  let burn_cap, mint_cap;
  [mint_cap, burn_cap] = Coin.initialize$(account, Std.ASCII.string$($.copy(name), $c), Std.ASCII.string$($.copy(symbol), $c), $.copy(decimals), monitor_supply, $c, [$p[0]] as TypeTag[]);
  $c.move_to(new StructTag(new HexString("0x1"), "ManagedCoin", "Capabilities", [$p[0]]), account, new Capabilities({ mint_cap: $.copy(mint_cap), burn_cap: $.copy(burn_cap) }, new StructTag(new HexString("0x1"), "ManagedCoin", "Capabilities", [$p[0]])));
  return;
}


export function buildPayload_initialize (
  account: HexString,
  name: U8[],
  symbol: U8[],
  decimals: U64,
  monitor_supply: boolean,
  $p: TypeTag[], /* <CoinType>*/
) {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    "0x1::ManagedCoin::initialize",
    typeParamStrings,
    [
      name.map(u => u.toPayloadArg()),
      symbol.map(u => u.toPayloadArg()),
      decimals.toPayloadArg(),
      monitor_supply,
    ]
  );

}
export function mint$ (
  account: HexString,
  dst_addr: HexString,
  amount: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): void {
  let account_addr, capabilities, coins_minted;
  account_addr = Std.Signer.address_of$(account, $c);
  if (!$c.exists(new StructTag(new HexString("0x1"), "ManagedCoin", "Capabilities", [$p[0]]), $.copy(account_addr))) {
    throw $.abortCode(Std.Errors.not_published$(ENO_CAPABILITIES, $c));
  }
  capabilities = $c.borrow_global<Capabilities>(new StructTag(new HexString("0x1"), "ManagedCoin", "Capabilities", [$p[0]]), $.copy(account_addr));
  coins_minted = Coin.mint$($.copy(amount), capabilities.mint_cap, $c, [$p[0]] as TypeTag[]);
  Coin.deposit$($.copy(dst_addr), coins_minted, $c, [$p[0]] as TypeTag[]);
  return;
}


export function buildPayload_mint (
  account: HexString,
  dst_addr: HexString,
  amount: U64,
  $p: TypeTag[], /* <CoinType>*/
) {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    "0x1::ManagedCoin::mint",
    typeParamStrings,
    [
      dst_addr,
      amount.toPayloadArg(),
    ]
  );

}
export function register$ (
  account: HexString,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): void {
  Coin.register$(account, $c, [$p[0]] as TypeTag[]);
  return;
}


export function buildPayload_register (
  account: HexString,
  $p: TypeTag[], /* <CoinType>*/
) {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    "0x1::ManagedCoin::register",
    typeParamStrings,
    []
  );

}
// test func
export function test_end_to_end$ (
  source: HexString,
  destination: HexString,
  $c: AptosDataCache,
): void {
  let destination_addr, new_supply, source_addr, supply;
  source_addr = Std.Signer.address_of$(source, $c);
  destination_addr = Std.Signer.address_of$(destination, $c);
  initialize$(source, [u8("70"), u8("97"), u8("107"), u8("101"), u8("32"), u8("77"), u8("111"), u8("110"), u8("101"), u8("121")], [u8("70"), u8("77"), u8("68")], u64("10"), true, $c, [new StructTag(new HexString("0x1"), "ManagedCoin", "FakeMoney", [])] as TypeTag[]);
  if (!Coin.is_coin_initialized$($c, [new StructTag(new HexString("0x1"), "ManagedCoin", "FakeMoney", [])] as TypeTag[])) {
    throw $.abortCode(u64("0"));
  }
  register$(source, $c, [new StructTag(new HexString("0x1"), "ManagedCoin", "FakeMoney", [])] as TypeTag[]);
  register$(destination, $c, [new StructTag(new HexString("0x1"), "ManagedCoin", "FakeMoney", [])] as TypeTag[]);
  mint$(source, $.copy(source_addr), u64("50"), $c, [new StructTag(new HexString("0x1"), "ManagedCoin", "FakeMoney", [])] as TypeTag[]);
  mint$(source, $.copy(destination_addr), u64("10"), $c, [new StructTag(new HexString("0x1"), "ManagedCoin", "FakeMoney", [])] as TypeTag[]);
  if (!Coin.balance$($.copy(source_addr), $c, [new StructTag(new HexString("0x1"), "ManagedCoin", "FakeMoney", [])] as TypeTag[]).eq(u64("50"))) {
    throw $.abortCode(u64("1"));
  }
  if (!Coin.balance$($.copy(destination_addr), $c, [new StructTag(new HexString("0x1"), "ManagedCoin", "FakeMoney", [])] as TypeTag[]).eq(u64("10"))) {
    throw $.abortCode(u64("2"));
  }
  supply = Coin.supply$($c, [new StructTag(new HexString("0x1"), "ManagedCoin", "FakeMoney", [])] as TypeTag[]);
  if (!Std.Option.is_some$(supply, $c, [AtomicTypeTag.U128] as TypeTag[])) {
    throw $.abortCode(u64("1"));
  }
  if (!Std.Option.extract$(supply, $c, [AtomicTypeTag.U128] as TypeTag[]).eq(u128("60"))) {
    throw $.abortCode(u64("2"));
  }
  Coin.transfer$(source, $.copy(destination_addr), u64("10"), $c, [new StructTag(new HexString("0x1"), "ManagedCoin", "FakeMoney", [])] as TypeTag[]);
  if (!Coin.balance$($.copy(source_addr), $c, [new StructTag(new HexString("0x1"), "ManagedCoin", "FakeMoney", [])] as TypeTag[]).eq(u64("40"))) {
    throw $.abortCode(u64("3"));
  }
  if (!Coin.balance$($.copy(destination_addr), $c, [new StructTag(new HexString("0x1"), "ManagedCoin", "FakeMoney", [])] as TypeTag[]).eq(u64("20"))) {
    throw $.abortCode(u64("4"));
  }
  burn$(source, u64("40"), $c, [new StructTag(new HexString("0x1"), "ManagedCoin", "FakeMoney", [])] as TypeTag[]);
  if (!Coin.balance$($.copy(source_addr), $c, [new StructTag(new HexString("0x1"), "ManagedCoin", "FakeMoney", [])] as TypeTag[]).eq(u64("0"))) {
    throw $.abortCode(u64("1"));
  }
  new_supply = Coin.supply$($c, [new StructTag(new HexString("0x1"), "ManagedCoin", "FakeMoney", [])] as TypeTag[]);
  if (!Std.Option.extract$(new_supply, $c, [AtomicTypeTag.U128] as TypeTag[]).eq(u128("20"))) {
    throw $.abortCode(u64("2"));
  }
  return;
}


export function buildPayload_test_end_to_end (
  source: HexString,
  destination: HexString,
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0x1::ManagedCoin::test_end_to_end",
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


