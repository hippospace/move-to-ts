import * as Source from '../../HippoSwap/MockDeploy'; 
import * as $ from '@manahippo/move-to-ts';
import { HexString } from 'aptos';

test('MockDeploy::test_init_coin', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const trader = new HexString("0xffffff01");
  const vm = new HexString("0x0");
  Source.test_init_coin$(admin, $c);
});


