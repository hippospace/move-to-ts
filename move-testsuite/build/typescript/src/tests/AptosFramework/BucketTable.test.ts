import * as Source from '../../AptosFramework/BucketTable'; 
import * as $ from '@manahippo/move-to-ts';
import { HexString } from 'aptos';

test('BucketTable::hash_map_bucket_index_test', () => {
  const $c = new $.AptosLocalCache();
  Source.hash_map_bucket_index_test$($c);
});

test('BucketTable::hash_map_split_test', () => {
  const $c = new $.AptosLocalCache();
  Source.hash_map_split_test$($c);
});

test('BucketTable::hash_map_test', () => {
  const $c = new $.AptosLocalCache();
  Source.hash_map_test$($c);
});


