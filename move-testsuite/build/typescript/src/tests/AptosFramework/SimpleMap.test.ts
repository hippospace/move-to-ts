import * as Source from '../../AptosFramework/SimpleMap'; 
import * as $ from '@manahippo/move-to-ts';
import { HexString } from 'aptos';

test('SimpleMap::add_remove_many', () => {
  const $c = new $.AptosLocalCache();
  Source.add_remove_many$($c);
});

test('SimpleMap::add_twice', () => {
  const $c = new $.AptosLocalCache();
  expect( () => Source.add_twice$($c) ).toThrow();
});

test('SimpleMap::remove_twice', () => {
  const $c = new $.AptosLocalCache();
  expect( () => Source.remove_twice$($c) ).toThrow();
});

test('SimpleMap::test_several', () => {
  const $c = new $.AptosLocalCache();
  Source.test_several$($c);
});


