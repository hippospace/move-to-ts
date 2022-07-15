import * as Source from '../../HippoSwap/Math'; 
import * as $ from '@manahippo/move-to-ts';
import { HexString } from 'aptos';

test('Math::max_works', () => {
  const $c = new $.AptosLocalCache();
  Source.max_works$($c);
});

test('Math::pow_works', () => {
  const $c = new $.AptosLocalCache();
  Source.pow_works$($c);
});

test('Math::sqrt_works', () => {
  const $c = new $.AptosLocalCache();
  Source.sqrt_works$($c);
});


