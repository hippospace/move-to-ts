import * as Source from '../../AptosFramework/Account'; 
import * as $ from '@manahippo/move-to-ts';
import { HexString } from 'aptos';

test('Account::mock_sequence_numbers', () => {
  const $c = new $.AptosLocalCache();
  Source.mock_sequence_numbers$($c);
});

test('Account::test_create_resource_account', () => {
  const $c = new $.AptosLocalCache();
  const user = new HexString("0x1");
  Source.test_create_resource_account$(user, $c);
});

test('Account::test_module_capability', () => {
  const $c = new $.AptosLocalCache();
  const user = new HexString("0x1");
  Source.test_module_capability$(user, $c);
});


