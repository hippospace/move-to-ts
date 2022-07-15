import * as Source from '../../Econia/User'; 
import * as $ from '@manahippo/move-to-ts';
import { HexString } from 'aptos';

test('User::cancel_ask_success', () => {
  const $c = new $.AptosLocalCache();
  const econia = new HexString("0xc0deb00c");
  const user = new HexString("0x5678");
  Source.cancel_ask_success$(econia, user, $c);
});

test('User::cancel_bid_success', () => {
  const $c = new $.AptosLocalCache();
  const econia = new HexString("0xc0deb00c");
  const user = new HexString("0x5678");
  Source.cancel_bid_success$(econia, user, $c);
});

test('User::cancel_order_failure_no_o_c', () => {
  const $c = new $.AptosLocalCache();
  const econia = new HexString("0xc0deb00c");
  const user = new HexString("0x5678");
  expect( () => Source.cancel_order_failure_no_o_c$(user, $c) ).toThrow("6");
});

test('User::deposit_failure_no_deposit', () => {
  const $c = new $.AptosLocalCache();
  const econia = new HexString("0xc0deb00c");
  const user = new HexString("0x5678");
  expect( () => Source.deposit_failure_no_deposit$(econia, user, $c) ).toThrow("7");
});

test('User::deposit_failure_no_o_c', () => {
  const $c = new $.AptosLocalCache();
  const user = new HexString("0x5678");
  expect( () => Source.deposit_failure_no_o_c$(user, $c) ).toThrow("6");
});

test('User::deposit_success', () => {
  const $c = new $.AptosLocalCache();
  const econia = new HexString("0xc0deb00c");
  const user = new HexString("0x5678");
  Source.deposit_success$(econia, user, $c);
});

test('User::init_containers_failure_has_o_c', () => {
  const $c = new $.AptosLocalCache();
  const econia = new HexString("0xc0deb00c");
  const user = new HexString("0x5678");
  expect( () => Source.init_containers_failure_has_o_c$(econia, user, $c) ).toThrow("0");
});

test('User::init_containers_failure_has_o_o', () => {
  const $c = new $.AptosLocalCache();
  const econia = new HexString("0xc0deb00c");
  const user = new HexString("0x5678");
  expect( () => Source.init_containers_failure_has_o_o$(econia, user, $c) ).toThrow("2");
});

test('User::init_containers_failure_no_market', () => {
  const $c = new $.AptosLocalCache();
  const user = new HexString("0x5678");
  expect( () => Source.init_containers_failure_no_market$(user, $c) ).toThrow("1");
});

test('User::init_containers_success', () => {
  const $c = new $.AptosLocalCache();
  const econia = new HexString("0xc0deb00c");
  const user = new HexString("0x5678");
  Source.init_containers_success$(econia, user, $c);
});

test('User::init_o_c_failure_exists', () => {
  const $c = new $.AptosLocalCache();
  const econia = new HexString("0xc0deb00c");
  const user = new HexString("0x5678");
  expect( () => Source.init_o_c_failure_exists$(econia, user, $c) ).toThrow("0");
});

test('User::init_o_c_failure_no_market', () => {
  const $c = new $.AptosLocalCache();
  const user = new HexString("0x5678");
  expect( () => Source.init_o_c_failure_no_market$(user, $c) ).toThrow("1");
});

test('User::init_o_c_success', () => {
  const $c = new $.AptosLocalCache();
  const econia = new HexString("0xc0deb00c");
  const user = new HexString("0x5678");
  Source.init_o_c_success$(econia, user, $c);
});

test('User::init_user_failure', () => {
  const $c = new $.AptosLocalCache();
  const user = new HexString("0x5678");
  expect( () => Source.init_user_failure$(user, $c) ).toThrow("3");
});

test('User::init_user_success', () => {
  const $c = new $.AptosLocalCache();
  const user = new HexString("0x5678");
  Source.init_user_success$(user, $c);
});

test('User::process_fill_ask_complete', () => {
  const $c = new $.AptosLocalCache();
  const econia = new HexString("0xc0deb00c");
  const user = new HexString("0x5678");
  Source.process_fill_ask_complete$(econia, user, $c);
});

test('User::process_fill_ask_partial', () => {
  const $c = new $.AptosLocalCache();
  const econia = new HexString("0xc0deb00c");
  const user = new HexString("0x5678");
  Source.process_fill_ask_partial$(econia, user, $c);
});

test('User::process_fill_bid_complete', () => {
  const $c = new $.AptosLocalCache();
  const econia = new HexString("0xc0deb00c");
  const user = new HexString("0x5678");
  Source.process_fill_bid_complete$(econia, user, $c);
});

test('User::process_fill_bid_partial', () => {
  const $c = new $.AptosLocalCache();
  const econia = new HexString("0xc0deb00c");
  const user = new HexString("0x5678");
  Source.process_fill_bid_partial$(econia, user, $c);
});

test('User::submit_ask_failure_collateral', () => {
  const $c = new $.AptosLocalCache();
  const econia = new HexString("0xc0deb00c");
  const user = new HexString("0x5678");
  expect( () => Source.submit_ask_failure_collateral$(econia, user, $c) ).toThrow("9");
});

test('User::submit_ask_failure_crossed_spread', () => {
  const $c = new $.AptosLocalCache();
  const econia = new HexString("0xc0deb00c");
  const user = new HexString("0x5678");
  expect( () => Source.submit_ask_failure_crossed_spread$(econia, user, $c) ).toThrow("10");
});

test('User::submit_ask_success', () => {
  const $c = new $.AptosLocalCache();
  const econia = new HexString("0xc0deb00c");
  const user = new HexString("0x5678");
  Source.submit_ask_success$(econia, user, $c);
});

test('User::submit_bid_failure_collateral', () => {
  const $c = new $.AptosLocalCache();
  const econia = new HexString("0xc0deb00c");
  const user = new HexString("0x5678");
  expect( () => Source.submit_bid_failure_collateral$(econia, user, $c) ).toThrow("9");
});

test('User::submit_bid_failure_crossed_spread', () => {
  const $c = new $.AptosLocalCache();
  const econia = new HexString("0xc0deb00c");
  const user = new HexString("0x5678");
  expect( () => Source.submit_bid_failure_crossed_spread$(econia, user, $c) ).toThrow("10");
});

test('User::submit_bid_success', () => {
  const $c = new $.AptosLocalCache();
  const econia = new HexString("0xc0deb00c");
  const user = new HexString("0x5678");
  Source.submit_bid_success$(econia, user, $c);
});

test('User::submit_limit_order_failure_no_market', () => {
  const $c = new $.AptosLocalCache();
  const user = new HexString("0x5678");
  expect( () => Source.submit_limit_order_failure_no_market$(user, $c) ).toThrow("1");
});

test('User::submit_limit_order_failure_no_o_c', () => {
  const $c = new $.AptosLocalCache();
  const econia = new HexString("0xc0deb00c");
  const user = new HexString("0x5678");
  expect( () => Source.submit_limit_order_failure_no_o_c$(econia, user, $c) ).toThrow("6");
});

test('User::update_s_c_failure_no_s_c', () => {
  const $c = new $.AptosLocalCache();
  const user = new HexString("0x5678");
  expect( () => Source.update_s_c_failure_no_s_c$(user, $c) ).toThrow("4");
});

test('User::update_s_c_failure_same_s_n', () => {
  const $c = new $.AptosLocalCache();
  const user = new HexString("0x5678");
  expect( () => Source.update_s_c_failure_same_s_n$(user, $c) ).toThrow("5");
});

test('User::update_s_c_success', () => {
  const $c = new $.AptosLocalCache();
  const user = new HexString("0x5678");
  Source.update_s_c_success$(user, $c);
});

test('User::withdraw_failure_excess_bct', () => {
  const $c = new $.AptosLocalCache();
  const econia = new HexString("0xc0deb00c");
  const user = new HexString("0x5678");
  expect( () => Source.withdraw_failure_excess_bct$(econia, user, $c) ).toThrow("8");
});

test('User::withdraw_failure_excess_qct', () => {
  const $c = new $.AptosLocalCache();
  const econia = new HexString("0xc0deb00c");
  const user = new HexString("0x5678");
  expect( () => Source.withdraw_failure_excess_qct$(econia, user, $c) ).toThrow("8");
});

test('User::withdraw_failure_no_o_c', () => {
  const $c = new $.AptosLocalCache();
  const user = new HexString("0x5678");
  expect( () => Source.withdraw_failure_no_o_c$(user, $c) ).toThrow("6");
});

test('User::withdraw_failure_no_withdraw', () => {
  const $c = new $.AptosLocalCache();
  const econia = new HexString("0xc0deb00c");
  const user = new HexString("0x5678");
  expect( () => Source.withdraw_failure_no_withdraw$(econia, user, $c) ).toThrow("7");
});

test('User::withdraw_success', () => {
  const $c = new $.AptosLocalCache();
  const econia = new HexString("0xc0deb00c");
  const user = new HexString("0x5678");
  Source.withdraw_success$(econia, user, $c);
});


