import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient} from "aptos";
import * as AptosFramework from "../AptosFramework";
import * as Std from "../Std";
export const packageName = "HippoSwap";
export const moduleAddress = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
export const moduleName = "MockCoin";



export class TokenSharedCapability 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "TokenSharedCapability";
  static typeParameters: TypeParamDeclType[] = [
    { name: "TokenType", isPhantom: true }
  ];
  static fields: FieldDeclType[] = [
  { name: "mint", typeTag: new StructTag(new HexString("0x1"), "Coin", "MintCapability", [new $.TypeParamIdx(0)]) },
  { name: "burn", typeTag: new StructTag(new HexString("0x1"), "Coin", "BurnCapability", [new $.TypeParamIdx(0)]) }];

  mint: AptosFramework.Coin.MintCapability;
  burn: AptosFramework.Coin.BurnCapability;

  constructor(proto: any, public typeTag: TypeTag) {
    this.mint = proto['mint'] as AptosFramework.Coin.MintCapability;
    this.burn = proto['burn'] as AptosFramework.Coin.BurnCapability;
  }

  static TokenSharedCapabilityParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : TokenSharedCapability {
    const proto = $.parseStructProto(data, typeTag, repo, TokenSharedCapability);
    return new TokenSharedCapability(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, TokenSharedCapability, typeParams);
    return result as unknown as TokenSharedCapability;
  }
}

export class WBTC 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "WBTC";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  ];

  constructor(proto: any, public typeTag: TypeTag) {

  }

  static WBTCParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : WBTC {
    const proto = $.parseStructProto(data, typeTag, repo, WBTC);
    return new WBTC(proto, typeTag);
  }

}

export class WDAI 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "WDAI";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  ];

  constructor(proto: any, public typeTag: TypeTag) {

  }

  static WDAIParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : WDAI {
    const proto = $.parseStructProto(data, typeTag, repo, WDAI);
    return new WDAI(proto, typeTag);
  }

}

export class WDOT 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "WDOT";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  ];

  constructor(proto: any, public typeTag: TypeTag) {

  }

  static WDOTParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : WDOT {
    const proto = $.parseStructProto(data, typeTag, repo, WDOT);
    return new WDOT(proto, typeTag);
  }

}

export class WETH 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "WETH";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  ];

  constructor(proto: any, public typeTag: TypeTag) {

  }

  static WETHParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : WETH {
    const proto = $.parseStructProto(data, typeTag, repo, WETH);
    return new WETH(proto, typeTag);
  }

}

export class WSOL 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "WSOL";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  ];

  constructor(proto: any, public typeTag: TypeTag) {

  }

  static WSOLParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : WSOL {
    const proto = $.parseStructProto(data, typeTag, repo, WSOL);
    return new WSOL(proto, typeTag);
  }

}

export class WUSDC 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "WUSDC";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  ];

  constructor(proto: any, public typeTag: TypeTag) {

  }

  static WUSDCParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : WUSDC {
    const proto = $.parseStructProto(data, typeTag, repo, WUSDC);
    return new WUSDC(proto, typeTag);
  }

}

export class WUSDT 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "WUSDT";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  ];

  constructor(proto: any, public typeTag: TypeTag) {

  }

  static WUSDTParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : WUSDT {
    const proto = $.parseStructProto(data, typeTag, repo, WUSDT);
    return new WUSDT(proto, typeTag);
  }

}
export function burn$ (
  tokens: AptosFramework.Coin.Coin,
  $c: AptosDataCache,
  $p: TypeTag[], /* <TokenType>*/
): void {
  let temp$1, addr, cap;
  temp$1 = AptosFramework.TypeInfo.type_of$($c, [$p[0]] as TypeTag[]);
  addr = AptosFramework.TypeInfo.account_address$(temp$1, $c);
  cap = $c.borrow_global<TokenSharedCapability>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "TokenSharedCapability", [$p[0]]), $.copy(addr));
  AptosFramework.Coin.burn$(tokens, cap.burn, $c, [$p[0]] as TypeTag[]);
  return;
}

export function faucet_mint_to$ (
  to: HexString,
  amount: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <TokenType>*/
): void {
  let coin, to_addr;
  to_addr = Std.Signer.address_of$(to, $c);
  if (!AptosFramework.Coin.is_account_registered$($.copy(to_addr), $c, [$p[0]] as TypeTag[])) {
    AptosFramework.Coin.register_internal$(to, $c, [$p[0]] as TypeTag[]);
  }
  else{
  }
  coin = mint$($.copy(amount), $c, [$p[0]] as TypeTag[]);
  AptosFramework.Coin.deposit$($.copy(to_addr), coin, $c, [$p[0]] as TypeTag[]);
  return;
}

export function faucet_mint_to_script$ (
  to: HexString,
  amount: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <TokenType>*/
): void {
  faucet_mint_to$(to, $.copy(amount), $c, [$p[0]] as TypeTag[]);
  return;
}


export function buildPayload_faucet_mint_to_script (
  to: HexString,
  amount: U64,
  $p: TypeTag[], /* <TokenType>*/
) {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    "0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::MockCoin::faucet_mint_to_script",
    typeParamStrings,
    [
      amount.toPayloadArg(),
    ]
  );

}
export function initialize$ (
  account: HexString,
  decimals: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <TokenType>*/
): void {
  let temp$1, burn_capability, mint_capability, name;
  temp$1 = AptosFramework.TypeInfo.type_of$($c, [$p[0]] as TypeTag[]);
  name = Std.ASCII.string$(AptosFramework.TypeInfo.struct_name$(temp$1, $c), $c);
  [mint_capability, burn_capability] = AptosFramework.Coin.initialize$(account, $.copy(name), $.copy(name), $.copy(decimals), true, $c, [$p[0]] as TypeTag[]);
  AptosFramework.Coin.register_internal$(account, $c, [$p[0]] as TypeTag[]);
  $c.move_to(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "TokenSharedCapability", [$p[0]]), account, new TokenSharedCapability({ mint: $.copy(mint_capability), burn: $.copy(burn_capability) }, new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "TokenSharedCapability", [$p[0]])));
  return;
}

export function mint$ (
  amount: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <TokenType>*/
): AptosFramework.Coin.Coin {
  let temp$1, addr, cap;
  temp$1 = AptosFramework.TypeInfo.type_of$($c, [$p[0]] as TypeTag[]);
  addr = AptosFramework.TypeInfo.account_address$(temp$1, $c);
  cap = $c.borrow_global<TokenSharedCapability>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "TokenSharedCapability", [$p[0]]), $.copy(addr));
  return AptosFramework.Coin.mint$($.copy(amount), cap.mint, $c, [$p[0]] as TypeTag[]);
}

// test func
export function test_mint_script$ (
  admin: HexString,
  user: HexString,
  $c: AptosDataCache,
): void {
  initialize$(admin, u64("6"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", [])] as TypeTag[]);
  faucet_mint_to_script$(user, u64("1000000"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", [])] as TypeTag[]);
  return;
}


export function buildPayload_test_mint_script (
  admin: HexString,
  user: HexString,
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::MockCoin::test_mint_script",
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


