import * as Source from '../../AptosFramework/TypeInfo'; 
import * as $ from '@manahippo/move-to-ts';
import { HexString } from 'aptos';

test('TypeInfo::test', () => {
  const $c = new $.AptosLocalCache();
  Source.test$($c);
});


