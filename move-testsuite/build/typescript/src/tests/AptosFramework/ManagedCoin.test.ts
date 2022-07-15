import * as Source from '../../AptosFramework/ManagedCoin'; 
import * as $ from '@manahippo/move-to-ts';
import { HexString } from 'aptos';

test('ManagedCoin::fail_burn', () => {
  const $c = new $.AptosLocalCache();
  const destination = new HexString("0x2");
  const source = new HexString("0x1");
  expect( () => Source.fail_burn$(source, destination, $c) ).toThrow("5");
});

test('ManagedCoin::fail_mint', () => {
  const $c = new $.AptosLocalCache();
  const destination = new HexString("0x2");
  const source = new HexString("0x1");
  expect( () => Source.fail_mint$(source, destination, $c) ).toThrow("5");
});

test('ManagedCoin::test_end_to_end', () => {
  const $c = new $.AptosLocalCache();
  const destination = new HexString("0x2");
  const source = new HexString("0x1");
  Source.test_end_to_end$(source, destination, $c);
});


