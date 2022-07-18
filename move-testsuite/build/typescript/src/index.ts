
import { AptosParserRepo } from "@manahippo/move-to-ts";
import * as AptosFramework from './AptosFramework';
import * as Econia from './Econia';
import * as HippoSwap from './HippoSwap';
import * as MoveToTsTestsuite from './MoveToTsTestsuite';
import * as Std from './Std';
import * as TokenRegistry from './TokenRegistry';

export * as AptosFramework from './AptosFramework';
export * as Econia from './Econia';
export * as HippoSwap from './HippoSwap';
export * as MoveToTsTestsuite from './MoveToTsTestsuite';
export * as Std from './Std';
export * as TokenRegistry from './TokenRegistry';


export function getProjectRepo(): AptosParserRepo {
  const repo = new AptosParserRepo();
  AptosFramework.loadParsers(repo);
  Econia.loadParsers(repo);
  HippoSwap.loadParsers(repo);
  MoveToTsTestsuite.loadParsers(repo);
  Std.loadParsers(repo);
  TokenRegistry.loadParsers(repo);
  repo.addDefaultParsers();
  return repo;
}
