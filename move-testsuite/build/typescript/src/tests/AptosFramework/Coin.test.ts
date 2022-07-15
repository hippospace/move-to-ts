import * as Source from '../../AptosFramework/Coin'; 
import * as $ from '@manahippo/move-to-ts';
import { HexString } from 'aptos';

test('Coin::end_to_end', () => {
  const $c = new $.AptosLocalCache();
  const destination = new HexString("0x2");
  const source = new HexString("0x1");
  Source.end_to_end$(source, destination, $c);
});

test('Coin::end_to_end_no_supply', () => {
  const $c = new $.AptosLocalCache();
  const destination = new HexString("0x2");
  const source = new HexString("0x1");
  Source.end_to_end_no_supply$(source, destination, $c);
});

test('Coin::fail_initialize', () => {
  const $c = new $.AptosLocalCache();
  const source = new HexString("0x2");
  expect( () => Source.fail_initialize$(source, $c) ).toThrow("7");
});

test('Coin::fail_transfer', () => {
  const $c = new $.AptosLocalCache();
  const destination = new HexString("0x2");
  const source = new HexString("0x1");
  expect( () => Source.fail_transfer$(source, destination, $c) ).toThrow("1029");
});

test('Coin::test_burn_from_with_capability', () => {
  const $c = new $.AptosLocalCache();
  const destination = new HexString("0x2");
  const source = new HexString("0x1");
  Source.test_burn_from_with_capability$(source, $c);
});

test('Coin::test_destroy_non_zero', () => {
  const $c = new $.AptosLocalCache();
  const source = new HexString("0x1");
  expect( () => Source.test_destroy_non_zero$(source, $c) ).toThrow("1543");
});

test('Coin::test_extract', () => {
  const $c = new $.AptosLocalCache();
  const source = new HexString("0x1");
  Source.test_extract$(source, $c);
});

test('Coin::test_is_coin_initialized', () => {
  const $c = new $.AptosLocalCache();
  const source = new HexString("0x1");
  Source.test_is_coin_initialized$(source, $c);
});

test('Coin::test_zero', () => {
  const $c = new $.AptosLocalCache();
  Source.test_zero$($c);
});


