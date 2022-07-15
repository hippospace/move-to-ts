import * as Source from '../../AptosFramework/Stake'; 
import * as $ from '@manahippo/move-to-ts';
import { HexString } from 'aptos';

test('Stake::test_basic_staking', () => {
  const $c = new $.AptosLocalCache();
  const core_framework = new HexString("0x1");
  const core_resources = new HexString("0xa550c18");
  const validator = new HexString("0x123");
  Source.test_basic_staking$(core_framework, core_resources, validator, $c);
});

test('Stake::test_change_validator_set_configs', () => {
  const $c = new $.AptosLocalCache();
  const core_resources = new HexString("0xa550c18");
  Source.test_change_validator_set_configs$(core_resources, $c);
});

test('Stake::test_delegated_staking_with_owner_cap', () => {
  const $c = new $.AptosLocalCache();
  const core_framework = new HexString("0x1");
  const core_resources = new HexString("0xa550c18");
  const validator = new HexString("0x123");
  Source.test_delegated_staking_with_owner_cap$(core_framework, core_resources, validator, $c);
});

test('Stake::test_validator_cannot_join_leave_post_genesis', () => {
  const $c = new $.AptosLocalCache();
  const core_framework = new HexString("0x1");
  const core_resources = new HexString("0xa550c18");
  const validator = new HexString("0x123");
  expect( () => Source.test_validator_cannot_join_leave_post_genesis$(core_framework, core_resources, validator, $c) ).toThrow("257");
});

test('Stake::test_validator_join_leave', () => {
  const $c = new $.AptosLocalCache();
  const core_framework = new HexString("0x1");
  const core_resources = new HexString("0xa550c18");
  const validator_1 = new HexString("0x123");
  const validator_2 = new HexString("0x234");
  const validator_3 = new HexString("0x345");
  Source.test_validator_join_leave$(core_framework, core_resources, validator_1, validator_2, validator_3, $c);
});

test('Stake::test_validator_order', () => {
  const $c = new $.AptosLocalCache();
  const core_framework = new HexString("0x1");
  const core_resources = new HexString("0xa550c18");
  const validator_1 = new HexString("0x1");
  const validator_2 = new HexString("0x2");
  const validator_3 = new HexString("0x3");
  const validator_4 = new HexString("0x4");
  const validator_5 = new HexString("0x5");
  Source.test_validator_order$(core_framework, core_resources, validator_1, validator_2, validator_3, validator_4, validator_5, $c);
});


