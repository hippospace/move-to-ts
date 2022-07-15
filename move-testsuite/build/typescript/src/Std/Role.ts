import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient} from "aptos";
import * as Errors from "./Errors";
import * as Signer from "./Signer";
import * as UnitTest from "./UnitTest";
export const packageName = "MoveNursery";
export const moduleAddress = new HexString("0x1");
export const moduleName = "Role";

export const EROLE : U64 = u64("0");


export class Role 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "Role";
  static typeParameters: TypeParamDeclType[] = [
    { name: "Type", isPhantom: true }
  ];
  static fields: FieldDeclType[] = [
  ];

  constructor(proto: any, public typeTag: TypeTag) {

  }

  static RoleParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : Role {
    const proto = $.parseStructProto(data, typeTag, repo, Role);
    return new Role(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, Role, typeParams);
    return result as unknown as Role;
  }
}
export function assert_has_role$ (
  account: HexString,
  $c: AptosDataCache,
  $p: TypeTag[], /* <Type>*/
): void {
  if (!has_role$(Signer.address_of$(account, $c), $c, [$p[0]] as TypeTag[])) {
    throw $.abortCode(Errors.not_published$(EROLE, $c));
  }
  return;
}

export function assign_role$ (
  to: HexString,
  _witness: any,
  $c: AptosDataCache,
  $p: TypeTag[], /* <Type>*/
): void {
  if (!!has_role$(Signer.address_of$(to, $c), $c, [$p[0]] as TypeTag[])) {
    throw $.abortCode(Errors.already_published$(EROLE, $c));
  }
  $c.move_to(new StructTag(new HexString("0x1"), "Role", "Role", [$p[0]]), to, new Role({  }, new StructTag(new HexString("0x1"), "Role", "Role", [$p[0]])));
  return;
}

export function has_role$ (
  addr: HexString,
  $c: AptosDataCache,
  $p: TypeTag[], /* <Type>*/
): boolean {
  return $c.exists(new StructTag(new HexString("0x1"), "Role", "Role", [$p[0]]), $.copy(addr));
}

export function revoke_role$ (
  from: HexString,
  _witness: any,
  $c: AptosDataCache,
  $p: TypeTag[], /* <Type>*/
): void {
  if (!has_role$(Signer.address_of$(from, $c), $c, [$p[0]] as TypeTag[])) {
    throw $.abortCode(Errors.not_published$(EROLE, $c));
  }
  $c.move_from<Role>(new StructTag(new HexString("0x1"), "Role", "Role", [$p[0]]), Signer.address_of$(from, $c));
  return;
}

export function unit_test_poison$ (
  $c: AptosDataCache,
): void {
  UnitTest.create_signers_for_testing$(u64("0"), $c);
  return;
}


