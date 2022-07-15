import * as Source from '../../AptosFramework/BigVector'; 
import * as $ from '@manahippo/move-to-ts';
import { HexString } from 'aptos';

test('BigVector::big_vector_need_grow', () => {
  const $c = new $.AptosLocalCache();
  expect( () => Source.big_vector_need_grow$($c) ).toThrow();
});

test('BigVector::big_vector_reserve_and_shrink', () => {
  const $c = new $.AptosLocalCache();
  Source.big_vector_reserve_and_shrink$($c);
});

test('BigVector::big_vector_test', () => {
  const $c = new $.AptosLocalCache();
  Source.big_vector_test$($c);
});


