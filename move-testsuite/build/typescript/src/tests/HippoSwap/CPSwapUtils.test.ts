import * as Source from '../../HippoSwap/CPSwapUtils'; 
import * as $ from '@manahippo/move-to-ts';
import { HexString } from 'aptos';

test('CPSwapUtils::test_get_amount_out', () => {
  const $c = new $.AptosLocalCache();
  Source.test_get_amount_out$($c);
});


