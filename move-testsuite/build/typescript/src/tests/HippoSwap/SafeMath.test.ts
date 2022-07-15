import * as Source from '../../HippoSwap/SafeMath'; 
import * as $ from '@manahippo/move-to-ts';
import { HexString } from 'aptos';

test('SafeMath::works', () => {
  const $c = new $.AptosLocalCache();
  Source.works$($c);
});


