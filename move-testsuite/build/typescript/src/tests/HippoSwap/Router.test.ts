import * as Source from '../../HippoSwap/Router'; 
import * as $ from '@manahippo/move-to-ts';
import { HexString } from 'aptos';

test('Router::test_three_step', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const user = new HexString("0x12345");
  Source.test_three_step$(admin, user, core, $c);
});

test('Router::test_two_step', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const user = new HexString("0x12345");
  Source.test_two_step$(admin, user, core, $c);
});


