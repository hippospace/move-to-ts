import * as Source from '../../Econia/Orders'; 
import * as $ from '@manahippo/move-to-ts';
import { HexString } from 'aptos';

test('Orders::add_order_failure_no_orders', () => {
  const $c = new $.AptosLocalCache();
  expect( () => Source.add_order_failure_no_orders$($c) ).toThrow("1");
});

test('Orders::add_order_failure_overflow_base', () => {
  const $c = new $.AptosLocalCache();
  const user = new HexString("0x5678");
  expect( () => Source.add_order_failure_overflow_base$(user, $c) ).toThrow("4");
});

test('Orders::add_order_failure_overflow_quote', () => {
  const $c = new $.AptosLocalCache();
  const user = new HexString("0x5678");
  expect( () => Source.add_order_failure_overflow_quote$(user, $c) ).toThrow("5");
});

test('Orders::add_order_failure_price_0', () => {
  const $c = new $.AptosLocalCache();
  expect( () => Source.add_order_failure_price_0$($c) ).toThrow("3");
});

test('Orders::add_order_failure_size_0', () => {
  const $c = new $.AptosLocalCache();
  expect( () => Source.add_order_failure_size_0$($c) ).toThrow("6");
});

test('Orders::add_orders_success', () => {
  const $c = new $.AptosLocalCache();
  const user = new HexString("0x5678");
  Source.add_orders_success$(user, $c);
});

test('Orders::cancel_order_failure_no_orders', () => {
  const $c = new $.AptosLocalCache();
  expect( () => Source.cancel_order_failure_no_orders$($c) ).toThrow("1");
});

test('Orders::cancel_order_failure_no_such_ask', () => {
  const $c = new $.AptosLocalCache();
  const user = new HexString("0x5678");
  expect( () => Source.cancel_order_failure_no_such_ask$(user, $c) ).toThrow("7");
});

test('Orders::cancel_order_failure_no_such_bid', () => {
  const $c = new $.AptosLocalCache();
  const user = new HexString("0x5678");
  expect( () => Source.cancel_order_failure_no_such_bid$(user, $c) ).toThrow("7");
});

test('Orders::cancel_orders_success', () => {
  const $c = new $.AptosLocalCache();
  const user = new HexString("0x5678");
  Source.cancel_orders_success$(user, $c);
});

test('Orders::decrement_order_size_success', () => {
  const $c = new $.AptosLocalCache();
  const user = new HexString("0x5678");
  Source.decrement_order_size_success$(user, $c);
});

test('Orders::get_friend_cap_failure', () => {
  const $c = new $.AptosLocalCache();
  const account = new HexString("0x5678");
  expect( () => Source.get_friend_cap_failure$(account, $c) ).toThrow("2");
});

test('Orders::get_friend_cap_success', () => {
  const $c = new $.AptosLocalCache();
  const econia = new HexString("0xc0deb00c");
  Source.get_friend_cap_success$(econia, $c);
});

test('Orders::init_orders_failure_exists', () => {
  const $c = new $.AptosLocalCache();
  const user = new HexString("0x5678");
  expect( () => Source.init_orders_failure_exists$(user, $c) ).toThrow("0");
});

test('Orders::init_orders_success', () => {
  const $c = new $.AptosLocalCache();
  const user = new HexString("0x5678");
  Source.init_orders_success$(user, $c);
});

test('Orders::remove_order_success', () => {
  const $c = new $.AptosLocalCache();
  const user = new HexString("0x5678");
  Source.remove_order_success$(user, $c);
});

test('Orders::scale_factor_failure', () => {
  const $c = new $.AptosLocalCache();
  expect( () => Source.scale_factor_failure$($c) ).toThrow("1");
});


