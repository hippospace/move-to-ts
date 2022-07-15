import * as Source from '../../HippoSwap/HippoConfig'; 
import * as $ from '@manahippo/move-to-ts';
import { HexString } from 'aptos';

test('HippoConfig::addresses', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core_resource_account = new HexString("0xa550c18");
  Source.addresses$($c);
});


