import * as Source from '../../Econia/Init'; 
import * as $ from '@manahippo/move-to-ts';
import { HexString } from 'aptos';

test('Init::init_econia_failure_not_econia', () => {
  const $c = new $.AptosLocalCache();
  const account = new HexString("0x5678");
  expect( () => Source.init_econia_failure_not_econia$(account, $c) ).toThrow("0");
});

test('Init::init_econia_success', () => {
  const $c = new $.AptosLocalCache();
  const account = new HexString("0xc0deb00c");
  Source.init_econia_success$(account, $c);
});


