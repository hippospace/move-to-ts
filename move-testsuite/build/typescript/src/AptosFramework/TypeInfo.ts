import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient} from "aptos";
import * as Std from "../Std";
export const packageName = "AptosFramework";
export const moduleAddress = new HexString("0x1");
export const moduleName = "TypeInfo";



export class TypeInfo 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "TypeInfo";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "account_address", typeTag: AtomicTypeTag.Address },
  { name: "module_name", typeTag: new VectorTag(AtomicTypeTag.U8) },
  { name: "struct_name", typeTag: new VectorTag(AtomicTypeTag.U8) }];

  account_address: HexString;
  module_name: U8[];
  struct_name: U8[];

  constructor(proto: any, public typeTag: TypeTag) {
    this.account_address = proto['account_address'] as HexString;
    this.module_name = proto['module_name'] as U8[];
    this.struct_name = proto['struct_name'] as U8[];
  }

  static TypeInfoParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : TypeInfo {
    const proto = $.parseStructProto(data, typeTag, repo, TypeInfo);
    return new TypeInfo(proto, typeTag);
  }

}
export function account_address$ (
  type_info: TypeInfo,
  $c: AptosDataCache,
): HexString {
  return $.copy(type_info.account_address);
}

export function module_name$ (
  type_info: TypeInfo,
  $c: AptosDataCache,
): U8[] {
  return $.copy(type_info.module_name);
}

export function struct_name$ (
  type_info: TypeInfo,
  $c: AptosDataCache,
): U8[] {
  return $.copy(type_info.struct_name);
}

// #[test]
export function test$ (
  $c: AptosDataCache,
): void {
  let type_info;
  type_info = type_of$($c, [new StructTag(new HexString("0x1"), "TypeInfo", "TypeInfo", [])] as TypeTag[]);
  if (!(account_address$(type_info, $c).hex() === new HexString("0x1").hex())) {
    throw $.abortCode(u64("0"));
  }
  if (!$.veq(module_name$(type_info, $c), [u8("84"), u8("121"), u8("112"), u8("101"), u8("73"), u8("110"), u8("102"), u8("111")])) {
    throw $.abortCode(u64("1"));
  }
  if (!$.veq(struct_name$(type_info, $c), [u8("84"), u8("121"), u8("112"), u8("101"), u8("73"), u8("110"), u8("102"), u8("111")])) {
    throw $.abortCode(u64("2"));
  }
  return;
}

export function type_of$ (
  $c: AptosDataCache,
  $p: TypeTag[], /* <T>*/
): TypeInfo {
  return $.AptosFramework_TypeInfo_type_of($c, [$p[0]]);

}
export function unit_test_poison$ (
  $c: AptosDataCache,
): void {
  Std.UnitTest.create_signers_for_testing$(u64("0"), $c);
  return;
}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser("0x1::TypeInfo::TypeInfo", TypeInfo.TypeInfoParser);
}

