import * as Source from '../../Econia/Caps'; 
import * as $ from '@manahippo/move-to-ts';
import { HexString } from 'aptos';

test('Caps::book_f_c_failure', () => {
  const $c = new $.AptosLocalCache();
  expect( () => Source.book_f_c_failure$($c) ).toThrow("2");
});

test('Caps::has_f_c_success', () => {
  const $c = new $.AptosLocalCache();
  const econia = new HexString("0xc0deb00c");
  Source.has_f_c_success$(econia, $c);
});

test('Caps::init_caps_failure_exists', () => {
  const $c = new $.AptosLocalCache();
  const econia = new HexString("0xc0deb00c");
  expect( () => Source.init_caps_failure_exists$(econia, $c) ).toThrow("1");
});

test('Caps::init_caps_failure_not_econia', () => {
  const $c = new $.AptosLocalCache();
  const account = new HexString("0x5678");
  expect( () => Source.init_caps_failure_not_econia$(account, $c) ).toThrow("0");
});

test('Caps::init_caps_success', () => {
  const $c = new $.AptosLocalCache();
  const econia = new HexString("0xc0deb00c");
  Source.init_caps_success$(econia, $c);
});

test('Caps::orders_f_c_failure', () => {
  const $c = new $.AptosLocalCache();
  expect( () => Source.orders_f_c_failure$($c) ).toThrow("2");
});


