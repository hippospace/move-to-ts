import * as Source from '../../Econia/ID'; 
import * as $ from '@manahippo/move-to-ts';
import { HexString } from 'aptos';

test('ID::id_a_success', () => {
  const $c = new $.AptosLocalCache();
  Source.id_a_success$($c);
});

test('ID::id_b_success', () => {
  const $c = new $.AptosLocalCache();
  Source.id_b_success$($c);
});

test('ID::price_success', () => {
  const $c = new $.AptosLocalCache();
  Source.price_success$($c);
});

test('ID::v_n_a_success', () => {
  const $c = new $.AptosLocalCache();
  Source.v_n_a_success$($c);
});

test('ID::v_n_b_success', () => {
  const $c = new $.AptosLocalCache();
  Source.v_n_b_success$($c);
});


