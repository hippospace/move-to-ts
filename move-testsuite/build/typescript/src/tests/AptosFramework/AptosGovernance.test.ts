import * as Source from '../../AptosFramework/AptosGovernance'; 
import * as $ from '@manahippo/move-to-ts';
import { HexString } from 'aptos';

test('AptosGovernance::test_cannot_double_vote', () => {
  const $c = new $.AptosLocalCache();
  const core_framework = new HexString("0x1");
  const core_resources = new HexString("0xa550c18");
  const proposer = new HexString("0x123");
  const voter_1 = new HexString("0x234");
  const voter_2 = new HexString("0x159");
  expect( () => Source.test_cannot_double_vote$(core_resources, core_framework, proposer, voter_1, voter_2, $c) ).toThrow("1031");
});

test('AptosGovernance::test_cannot_double_vote_with_different_voter_addresses', () => {
  const $c = new $.AptosLocalCache();
  const core_framework = new HexString("0x1");
  const core_resources = new HexString("0xa550c18");
  const proposer = new HexString("0x123");
  const voter_1 = new HexString("0x234");
  const voter_2 = new HexString("0x159");
  expect( () => Source.test_cannot_double_vote_with_different_voter_addresses$(core_resources, core_framework, proposer, voter_1, voter_2, $c) ).toThrow("1031");
});

test('AptosGovernance::test_voting', () => {
  const $c = new $.AptosLocalCache();
  const core_framework = new HexString("0x1");
  const core_resources = new HexString("0xa550c18");
  const no_voter = new HexString("0x159");
  const proposer = new HexString("0x123");
  const yes_voter = new HexString("0x234");
  Source.test_voting$(core_resources, core_framework, proposer, yes_voter, no_voter, $c);
});


