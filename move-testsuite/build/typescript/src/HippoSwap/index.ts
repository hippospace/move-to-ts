
import { AptosParserRepo } from "@manahippo/move-to-ts";
import * as CPScripts from './CPScripts';
import * as CPSwap from './CPSwap';
import * as CPSwapUtils from './CPSwapUtils';
import * as CPTest from './CPTest';
import * as CurveTest from './CurveTest';
import * as HippoConfig from './HippoConfig';
import * as Math from './Math';
import * as MockCoin from './MockCoin';
import * as MockDeploy from './MockDeploy';
import * as PieceSwap from './PieceSwap';
import * as PieceSwapMath from './PieceSwapMath';
import * as PieceSwapScript from './PieceSwapScript';
import * as PieceTest from './PieceTest';
import * as Proc from './Proc';
import * as Router from './Router';
import * as SafeMath from './SafeMath';
import * as StableCurveNumeral from './StableCurveNumeral';
import * as StableCurveScripts from './StableCurveScripts';
import * as StableCurveSwap from './StableCurveSwap';
import * as TestShared from './TestShared';
import * as Utils from './Utils';

export * as CPScripts from './CPScripts';
export * as CPSwap from './CPSwap';
export * as CPSwapUtils from './CPSwapUtils';
export * as CPTest from './CPTest';
export * as CurveTest from './CurveTest';
export * as HippoConfig from './HippoConfig';
export * as Math from './Math';
export * as MockCoin from './MockCoin';
export * as MockDeploy from './MockDeploy';
export * as PieceSwap from './PieceSwap';
export * as PieceSwapMath from './PieceSwapMath';
export * as PieceSwapScript from './PieceSwapScript';
export * as PieceTest from './PieceTest';
export * as Proc from './Proc';
export * as Router from './Router';
export * as SafeMath from './SafeMath';
export * as StableCurveNumeral from './StableCurveNumeral';
export * as StableCurveScripts from './StableCurveScripts';
export * as StableCurveSwap from './StableCurveSwap';
export * as TestShared from './TestShared';
export * as Utils from './Utils';


export function loadParsers(repo: AptosParserRepo) {
  CPScripts.loadParsers(repo);
  CPSwap.loadParsers(repo);
  CPSwapUtils.loadParsers(repo);
  CPTest.loadParsers(repo);
  CurveTest.loadParsers(repo);
  HippoConfig.loadParsers(repo);
  Math.loadParsers(repo);
  MockCoin.loadParsers(repo);
  MockDeploy.loadParsers(repo);
  PieceSwap.loadParsers(repo);
  PieceSwapMath.loadParsers(repo);
  PieceSwapScript.loadParsers(repo);
  PieceTest.loadParsers(repo);
  Proc.loadParsers(repo);
  Router.loadParsers(repo);
  SafeMath.loadParsers(repo);
  StableCurveNumeral.loadParsers(repo);
  StableCurveScripts.loadParsers(repo);
  StableCurveSwap.loadParsers(repo);
  TestShared.loadParsers(repo);
  Utils.loadParsers(repo);
}

export function getPackageRepo(): AptosParserRepo {
  const repo = new AptosParserRepo();
  loadParsers(repo);
  repo.addDefaultParsers();
  return repo;
}
