import * as Source from '../../TokenRegistry/TokenRegistry'; 
import * as $ from '@manahippo/move-to-ts';
import { HexString } from 'aptos';

test('TokenRegistry::test_add_then_delist_then_add', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0x1234");
  Source.test_add_then_delist_then_add$(admin, $c);
});

test('TokenRegistry::test_add_token', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0x1234");
  Source.test_add_token$(admin, $c);
});

test('TokenRegistry::test_add_token_before_initialize', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0x1234");
  expect( () => Source.test_add_token_before_initialize$(admin, $c) ).toThrow();
});

test('TokenRegistry::test_add_token_same_symbol', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0x1234");
  expect( () => Source.test_add_token_same_symbol$(admin, $c) ).toThrow();
});

test('TokenRegistry::test_add_token_same_type', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0x1234");
  expect( () => Source.test_add_token_same_type$(admin, $c) ).toThrow();
});

test('TokenRegistry::test_add_token_twice', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0x1234");
  expect( () => Source.test_add_token_twice$(admin, $c) ).toThrow();
});

test('TokenRegistry::test_initialize', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0x1234");
  Source.test_initialize$(admin, $c);
});

test('TokenRegistry::test_initialize_twice', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0x1234");
  expect( () => Source.test_initialize_twice$(admin, $c) ).toThrow("2");
});

test('TokenRegistry::test_update_token', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0x1234");
  Source.test_update_token$(admin, $c);
});


