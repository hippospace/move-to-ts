import * as Source from '../../AptosFramework/ResourceAccount'; 
import * as $ from '@manahippo/move-to-ts';
import { HexString } from 'aptos';

test('ResourceAccount::end_to_end', () => {
  const $c = new $.AptosLocalCache();
  const user = new HexString("0x1111");
  Source.end_to_end$(user, $c);
});


