import * as Source from '../../HippoSwap/PieceSwapScript'; 
import * as $ from '@manahippo/move-to-ts';
import { HexString } from 'aptos';

test('PieceSwapScript::test_mock_deploy', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  Source.test_mock_deploy$(admin, $c);
});

test('PieceSwapScript::test_remove_liquidity', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  Source.test_remove_liquidity$(admin, $c);
});

test('PieceSwapScript::test_swap', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const user = new HexString("0x1234567");
  Source.test_swap$(admin, user, $c);
});


