import * as Source from '../../AptosFramework/Voting'; 
import * as $ from '@manahippo/move-to-ts';
import { HexString } from 'aptos';

test('Voting::test_voting_failed', () => {
  const $c = new $.AptosLocalCache();
  const core_resources = new HexString("0xa550c18");
  const governance = new HexString("0x123");
  expect( () => Source.test_voting_failed$(core_resources, governance, $c) ).toThrow("519");
});

test('Voting::test_voting_failed_early', () => {
  const $c = new $.AptosLocalCache();
  const core_resources = new HexString("0xa550c18");
  const governance = new HexString("0x123");
  expect( () => Source.test_voting_failed_early$(core_resources, governance, $c) ).toThrow("519");
});

test('Voting::test_voting_passed', () => {
  const $c = new $.AptosLocalCache();
  const core_resources = new HexString("0xa550c18");
  const governance = new HexString("0x123");
  Source.test_voting_passed$(core_resources, governance, $c);
});

test('Voting::test_voting_passed_early', () => {
  const $c = new $.AptosLocalCache();
  const core_resources = new HexString("0xa550c18");
  const governance = new HexString("0x123");
  Source.test_voting_passed_early$(core_resources, governance, $c);
});


