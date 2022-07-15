import * as Source from '../../AptosFramework/Comparator'; 
import * as $ from '@manahippo/move-to-ts';
import { HexString } from 'aptos';

test('Comparator::test_complex', () => {
  const $c = new $.AptosLocalCache();
  Source.test_complex$($c);
});

test('Comparator::test_strings', () => {
  const $c = new $.AptosLocalCache();
  Source.test_strings$($c);
});

test('Comparator::test_u128', () => {
  const $c = new $.AptosLocalCache();
  Source.test_u128$($c);
});


