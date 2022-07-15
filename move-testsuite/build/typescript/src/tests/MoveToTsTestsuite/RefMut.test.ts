import * as Source from '../../MoveToTsTestsuite/RefMut'; 
import * as $ from '@manahippo/move-to-ts';
import { HexString } from 'aptos';

test('RefMut::test_set_by_ref', () => {
  const $c = new $.AptosLocalCache();
  Source.test_set_by_ref$($c);
});


