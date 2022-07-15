import * as Source from '../../Econia/Registry'; 
import * as $ from '@manahippo/move-to-ts';
import { HexString } from 'aptos';

test('Registry::init_registry_failure_exists', () => {
  const $c = new $.AptosLocalCache();
  const econia = new HexString("0xc0deb00c");
  expect( () => Source.init_registry_failure_exists$(econia, $c) ).toThrow("6");
});

test('Registry::init_registry_failure_not_econia', () => {
  const $c = new $.AptosLocalCache();
  const account = new HexString("0x5678");
  expect( () => Source.init_registry_failure_not_econia$(account, $c) ).toThrow("0");
});

test('Registry::init_registry_success', () => {
  const $c = new $.AptosLocalCache();
  const econia = new HexString("0xc0deb00c");
  Source.init_registry_success$(econia, $c);
});

test('Registry::is_registered_false_no_mr', () => {
  const $c = new $.AptosLocalCache();
  Source.is_registered_false_no_mr$($c);
});

test('Registry::is_registered_false_not_registered', () => {
  const $c = new $.AptosLocalCache();
  const econia = new HexString("0xc0deb00c");
  Source.is_registered_false_not_registered$(econia, $c);
});

test('Registry::is_registered_true', () => {
  const $c = new $.AptosLocalCache();
  const econia = new HexString("0xc0deb00c");
  Source.is_registered_true$(econia, $c);
});

test('Registry::pack_market_info', () => {
  const $c = new $.AptosLocalCache();
  Source.pack_market_info$($c);
});

test('Registry::register_market_failure_no_registry', () => {
  const $c = new $.AptosLocalCache();
  const econia = new HexString("0xc0deb00c");
  const host = new HexString("0x5678");
  expect( () => Source.register_market_failure_no_registry$(econia, host, $c) ).toThrow("3");
});

test('Registry::register_market_failure_registered', () => {
  const $c = new $.AptosLocalCache();
  const econia = new HexString("0xc0deb00c");
  const host = new HexString("0x5678");
  expect( () => Source.register_market_failure_registered$(econia, host, $c) ).toThrow("4");
});

test('Registry::register_market_success', () => {
  const $c = new $.AptosLocalCache();
  const econia = new HexString("0xc0deb00c");
  const host = new HexString("0x5678");
  Source.register_market_success$(econia, host, $c);
});

test('Registry::scale_factor_failure', () => {
  const $c = new $.AptosLocalCache();
  expect( () => Source.scale_factor_failure$($c) ).toThrow("2");
});

test('Registry::scale_factor_success', () => {
  const $c = new $.AptosLocalCache();
  Source.scale_factor_success$($c);
});

test('Registry::verify_address_failure', () => {
  const $c = new $.AptosLocalCache();
  expect( () => Source.verify_address_failure$($c) ).toThrow("0");
});

test('Registry::verify_address_success', () => {
  const $c = new $.AptosLocalCache();
  Source.verify_address_success$($c);
});

test('Registry::verify_bytestring_failure', () => {
  const $c = new $.AptosLocalCache();
  expect( () => Source.verify_bytestring_failure$($c) ).toThrow("1");
});

test('Registry::verify_bytestring_success', () => {
  const $c = new $.AptosLocalCache();
  Source.verify_bytestring_success$($c);
});

test('Registry::verify_market_types_failure_b', () => {
  const $c = new $.AptosLocalCache();
  const econia = new HexString("0xc0deb00c");
  expect( () => Source.verify_market_types_failure_b$(econia, $c) ).toThrow("5");
});

test('Registry::verify_market_types_failure_q', () => {
  const $c = new $.AptosLocalCache();
  const econia = new HexString("0xc0deb00c");
  expect( () => Source.verify_market_types_failure_q$(econia, $c) ).toThrow("5");
});

test('Registry::verify_market_types_success', () => {
  const $c = new $.AptosLocalCache();
  const econia = new HexString("0xc0deb00c");
  Source.verify_market_types_success$(econia, $c);
});


