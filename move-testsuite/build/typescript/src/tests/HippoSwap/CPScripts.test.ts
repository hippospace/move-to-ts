import * as Source from '../../HippoSwap/CPScripts'; 
import * as $ from '@manahippo/move-to-ts';
import { HexString } from 'aptos';

test('CPScripts::test_add_remove_liquidity', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const user = new HexString("0x1234567");
  Source.test_add_remove_liquidity$(admin, user, core, $c);
});

test('CPScripts::test_initialization_cpswap', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const user = new HexString("0x1234567");
  Source.test_initialization_cpswap$(admin, user, core, $c);
});

test('CPScripts::test_swap', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const user = new HexString("0x1234567");
  Source.test_swap$(admin, user, core, $c);
});


