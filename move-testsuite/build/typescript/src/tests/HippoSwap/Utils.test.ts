import * as Source from '../../HippoSwap/Utils'; 
import * as $ from '@manahippo/move-to-ts';
import { HexString } from 'aptos';

test('Utils::compare_vector_works', () => {
  const $c = new $.AptosLocalCache();
  Source.compare_vector_works$($c);
});

test('Utils::is_tokens_sorted_works', () => {
  const $c = new $.AptosLocalCache();
  Source.is_tokens_sorted_works$($c);
});


