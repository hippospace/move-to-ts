import * as Source from '../../AptosFramework/Token'; 
import * as $ from '@manahippo/move-to-ts';
import { HexString } from 'aptos';

test('Token::create_withdraw_deposit_editions', () => {
  const $c = new $.AptosLocalCache();
  const creator = new HexString("0x1");
  const owner = new HexString("0x2");
  Source.create_withdraw_deposit_editions$(creator, owner, $c);
});

test('Token::create_withdraw_deposit_token', () => {
  const $c = new $.AptosLocalCache();
  const creator = new HexString("0x1");
  const owner = new HexString("0x2");
  Source.create_withdraw_deposit_token$(creator, owner, $c);
});

test('Token::direct_transfer_test', () => {
  const $c = new $.AptosLocalCache();
  const creator = new HexString("0x1");
  const owner = new HexString("0x2");
  Source.direct_transfer_test$(creator, owner, $c);
});

test('Token::test_collection_maximum', () => {
  const $c = new $.AptosLocalCache();
  const creator = new HexString("0x1");
  expect( () => Source.test_collection_maximum$(creator, $c) ).toThrow();
});

test('Token::test_create_events_generation', () => {
  const $c = new $.AptosLocalCache();
  const creator = new HexString("0xff");
  Source.test_create_events_generation$(creator, $c);
});

test('Token::test_token_maximum', () => {
  const $c = new $.AptosLocalCache();
  const creator = new HexString("0x1");
  expect( () => Source.test_token_maximum$(creator, $c) ).toThrow();
});


