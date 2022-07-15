import * as Source from '../../Econia/Version'; 
import * as $ from '@manahippo/move-to-ts';
import { HexString } from 'aptos';

test('Version::get_v_n_success', () => {
  const $c = new $.AptosLocalCache();
  const econia = new HexString("0xc0deb00c");
  Source.get_v_n_success$(econia, $c);
});

test('Version::init_mock_failure_exists', () => {
  const $c = new $.AptosLocalCache();
  const econia = new HexString("0xc0deb00c");
  expect( () => Source.init_mock_failure_exists$(econia, $c) ).toThrow("1");
});

test('Version::init_mock_failure_not_econia', () => {
  const $c = new $.AptosLocalCache();
  const account = new HexString("0x5678");
  expect( () => Source.init_mock_failure_not_econia$(account, $c) ).toThrow("0");
});

test('Version::init_mock_success', () => {
  const $c = new $.AptosLocalCache();
  const econia = new HexString("0xc0deb00c");
  Source.init_mock_success$(econia, $c);
});


