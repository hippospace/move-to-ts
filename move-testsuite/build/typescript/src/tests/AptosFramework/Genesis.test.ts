import * as Source from '../../AptosFramework/Genesis'; 
import * as $ from '@manahippo/move-to-ts';
import { HexString } from 'aptos';

test('Genesis::test_setup', () => {
  const $c = new $.AptosLocalCache();
  const account = new HexString("0xa550c18");
  Source.test_setup$(account, $c);
});


