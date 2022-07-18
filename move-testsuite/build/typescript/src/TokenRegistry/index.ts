
import { AptosParserRepo } from "@manahippo/move-to-ts";
import * as TokenRegistry from './TokenRegistry';

export * as TokenRegistry from './TokenRegistry';


export function loadParsers(repo: AptosParserRepo) {
  TokenRegistry.loadParsers(repo);
}

export function getPackageRepo(): AptosParserRepo {
  const repo = new AptosParserRepo();
  loadParsers(repo);
  repo.addDefaultParsers();
  return repo;
}
