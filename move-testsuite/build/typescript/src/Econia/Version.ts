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
export const moduleName = "Version";

export const E_MC_EXISTS : U64 = u64("1");
export const E_NOT_ECONIA : U64 = u64("0");


export class MC 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "MC";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "i", typeTag: AtomicTypeTag.U64 }];

  i: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.i = proto['i'] as U64;
  }

  static MCParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : MC {
    const proto = $.parseStructProto(data, typeTag, repo, MC);
    return new MC(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, MC, typeParams);
    return result as unknown as MC;
  }
}
export function get_updated_mock_version_number$ (
  $c: AptosDataCache,
): U64 {
  let v_n;
  v_n = $c.borrow_global_mut<MC>(new StructTag(new HexString("0xc0deb00c"), "Version", "MC", []), new HexString("0xc0deb00c")).i;
  $.set(v_n, $.copy(v_n).add(u64("1")));
  return $.copy(v_n);
}

export function get_v_n$ (
  $c: AptosDataCache,
): U64 {
  return get_updated_mock_version_number$($c);
}

// #[test]
export function get_v_n_success$ (
  econia: HexString,
  $c: AptosDataCache,
): void {
  init_mock_version_number$(econia, $c);
  if (!get_v_n$($c).eq(u64("1"))) {
    throw $.abortCode(u64("0"));
  }
  if (!get_v_n$($c).eq(u64("2"))) {
    throw $.abortCode(u64("1"));
  }
  if (!get_v_n$($c).eq(u64("3"))) {
    throw $.abortCode(u64("2"));
  }
  return;
}


export function buildPayload_get_v_n_success (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xc0deb00c::Version::get_v_n_success",
    typeParamStrings,
    []
  );

}
// #[test]
export function init_mock_failure_exists$ (
  econia: HexString,
  $c: AptosDataCache,
): void {
  init_mock_version_number$(econia, $c);
  init_mock_version_number$(econia, $c);
  return;
}


export function buildPayload_init_mock_failure_exists (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xc0deb00c::Version::init_mock_failure_exists",
    typeParamStrings,
    []
  );

}
// #[test]
export function init_mock_failure_not_econia$ (
  account: HexString,
  $c: AptosDataCache,
): void {
  init_mock_version_number$(account, $c);
  return;
}


export function buildPayload_init_mock_failure_not_econia (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xc0deb00c::Version::init_mock_failure_not_econia",
    typeParamStrings,
    []
  );

}
// #[test]
export function init_mock_success$ (
  econia: HexString,
  $c: AptosDataCache,
): void {
  init_mock_version_number$(econia, $c);
  if (!$.copy($c.borrow_global<MC>(new StructTag(new HexString("0xc0deb00c"), "Version", "MC", []), Std.Signer.address_of$(econia, $c)).i).eq(u64("0"))) {
    throw $.abortCode(u64("0"));
  }
  return;
}


export function buildPayload_init_mock_success (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xc0deb00c::Version::init_mock_success",
    typeParamStrings,
    []
  );

}
export function init_mock_version_number$ (
  account: HexString,
  $c: AptosDataCache,
): void {
  let addr;
  addr = Std.Signer.address_of$(account, $c);
  if (!($.copy(addr).hex() === new HexString("0xc0deb00c").hex())) {
    throw $.abortCode(E_NOT_ECONIA);
  }
  if (!!$c.exists(new StructTag(new HexString("0xc0deb00c"), "Version", "MC", []), $.copy(addr))) {
    throw $.abortCode(E_MC_EXISTS);
  }
  $c.move_to(new StructTag(new HexString("0xc0deb00c"), "Version", "MC", []), account, new MC({ i: u64("0") }, new StructTag(new HexString("0xc0deb00c"), "Version", "MC", [])));
  return;
}

export function unit_test_poison$ (
  $c: AptosDataCache,
): void {
  Std.UnitTest.create_signers_for_testing$(u64("0"), $c);
  return;
}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser("0xc0deb00c::Version::MC", MC.MCParser);
}

