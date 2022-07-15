import * as Source from '../../HippoSwap/Proc'; 
import * as $ from '@manahippo/move-to-ts';
import { HexString } from 'aptos';

test('Proc::test_pool_constant_product', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const investor = new HexString("0x2fff");
  const swapper = new HexString("0x2ffe");
  Source.test_pool_constant_product$(admin, investor, swapper, core, $c);
});


