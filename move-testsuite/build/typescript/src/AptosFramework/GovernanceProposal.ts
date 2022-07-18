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
export const moduleName = "GovernanceProposal";



export class GovernanceProposal 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "GovernanceProposal";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  ];

  constructor(proto: any, public typeTag: TypeTag) {

  }

  static GovernanceProposalParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : GovernanceProposal {
    const proto = $.parseStructProto(data, typeTag, repo, GovernanceProposal);
    return new GovernanceProposal(proto, typeTag);
  }

}
export function create_proposal$ (
  $c: AptosDataCache,
): GovernanceProposal {
  return new GovernanceProposal({  }, new StructTag(new HexString("0x1"), "GovernanceProposal", "GovernanceProposal", []));
}

// #[test]
export function create_test_proposal$ (
  $c: AptosDataCache,
): GovernanceProposal {
  return create_proposal$($c);
}

export function unit_test_poison$ (
  $c: AptosDataCache,
): void {
  Std.UnitTest.create_signers_for_testing$(u64("0"), $c);
  return;
}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser("0x1::GovernanceProposal::GovernanceProposal", GovernanceProposal.GovernanceProposalParser);
}

