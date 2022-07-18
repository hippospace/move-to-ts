
import { AptosParserRepo } from "@manahippo/move-to-ts";
import * as RefMut from './RefMut';

export * as RefMut from './RefMut';


export function loadParsers(repo: AptosParserRepo) {
  RefMut.loadParsers(repo);
}

export function getPackageRepo(): AptosParserRepo {
  const repo = new AptosParserRepo();
  loadParsers(repo);
  repo.addDefaultParsers();
  return repo;
}
