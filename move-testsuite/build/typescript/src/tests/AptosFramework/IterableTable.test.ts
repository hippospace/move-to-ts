import * as Source from '../../AptosFramework/IterableTable'; 
import * as $ from '@manahippo/move-to-ts';
import { HexString } from 'aptos';

test('IterableTable::iterable_table_test', () => {
  const $c = new $.AptosLocalCache();
  Source.iterable_table_test$($c);
});


