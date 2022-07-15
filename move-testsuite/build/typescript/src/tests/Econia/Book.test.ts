import * as Source from '../../Econia/Book'; 
import * as $ from '@manahippo/move-to-ts';
import { HexString } from 'aptos';

test('Book::add_position_success_crossed_spread_ask', () => {
  const $c = new $.AptosLocalCache();
  const account = new HexString("0x5678");
  Source.add_position_success_crossed_spread_ask$(account, $c);
});

test('Book::add_position_success_crossed_spread_bid', () => {
  const $c = new $.AptosLocalCache();
  const account = new HexString("0x5678");
  Source.add_position_success_crossed_spread_bid$(account, $c);
});

test('Book::add_position_success_simple_ask', () => {
  const $c = new $.AptosLocalCache();
  const account = new HexString("0x5678");
  Source.add_position_success_simple_ask$(account, $c);
});

test('Book::add_position_success_simple_bid', () => {
  const $c = new $.AptosLocalCache();
  const account = new HexString("0x5678");
  Source.add_position_success_simple_bid$(account, $c);
});

test('Book::cancel_ask_success', () => {
  const $c = new $.AptosLocalCache();
  const account = new HexString("0x5678");
  Source.cancel_ask_success$(account, $c);
});

test('Book::cancel_bid_success', () => {
  const $c = new $.AptosLocalCache();
  const account = new HexString("0x5678");
  Source.cancel_bid_success$(account, $c);
});

test('Book::get_friend_cap_failure', () => {
  const $c = new $.AptosLocalCache();
  const account = new HexString("0x5678");
  expect( () => Source.get_friend_cap_failure$(account, $c) ).toThrow("1");
});

test('Book::get_friend_cap_success', () => {
  const $c = new $.AptosLocalCache();
  const econia = new HexString("0xc0deb00c");
  Source.get_friend_cap_success$(econia, $c);
});

test('Book::init_book_failure_exists', () => {
  const $c = new $.AptosLocalCache();
  const host = new HexString("0x5678");
  expect( () => Source.init_book_failure_exists$(host, $c) ).toThrow("0");
});

test('Book::init_book_success', () => {
  const $c = new $.AptosLocalCache();
  const host = new HexString("0x5678");
  Source.init_book_success$(host, $c);
});

test('Book::init_traverse_fill_failure_self_match', () => {
  const $c = new $.AptosLocalCache();
  const host = new HexString("0xc0deb00c");
  expect( () => Source.init_traverse_fill_failure_self_match$(host, $c) ).toThrow("2");
});

test('Book::init_traverse_fill_success_ask', () => {
  const $c = new $.AptosLocalCache();
  const host = new HexString("0xc0deb00c");
  Source.init_traverse_fill_success_ask$(host, $c);
});

test('Book::init_traverse_fill_success_bid', () => {
  const $c = new $.AptosLocalCache();
  const host = new HexString("0xc0deb00c");
  Source.init_traverse_fill_success_bid$(host, $c);
});

test('Book::n_asks_success', () => {
  const $c = new $.AptosLocalCache();
  const host = new HexString("0x5678");
  Source.n_asks_success$(host, $c);
});

test('Book::n_bids_success', () => {
  const $c = new $.AptosLocalCache();
  const host = new HexString("0x5678");
  Source.n_bids_success$(host, $c);
});

test('Book::refresh_extreme_order_id_success', () => {
  const $c = new $.AptosLocalCache();
  const host = new HexString("0x5678");
  Source.refresh_extreme_order_id_success$(host, $c);
});

test('Book::traverse_pop_fill_success_ask', () => {
  const $c = new $.AptosLocalCache();
  const host = new HexString("0xc0deb00c");
  Source.traverse_pop_fill_success_ask$(host, $c);
});

test('Book::traverse_pop_fill_success_bid', () => {
  const $c = new $.AptosLocalCache();
  const host = new HexString("0xc0deb00c");
  Source.traverse_pop_fill_success_bid$(host, $c);
});


