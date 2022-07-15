import * as Source from '../../HippoSwap/PieceTest'; 
import * as $ from '@manahippo/move-to-ts';
import { HexString } from 'aptos';

test('PieceTest::test_pool_piece_swap_4', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const investor = new HexString("0x2fff");
  const swapper = new HexString("0x2ffe");
  Source.test_pool_piece_swap_4$(admin, investor, swapper, core, $c);
});

test('PieceTest::test_pool_piece_swap_5', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const investor = new HexString("0x2fff");
  const swapper = new HexString("0x2ffe");
  Source.test_pool_piece_swap_5$(admin, investor, swapper, core, $c);
});

test('PieceTest::test_pool_piece_swap_6', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const investor = new HexString("0x2fff");
  const swapper = new HexString("0x2ffe");
  Source.test_pool_piece_swap_6$(admin, investor, swapper, core, $c);
});

test('PieceTest::test_pool_piece_swap_7', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const investor = new HexString("0x2fff");
  const swapper = new HexString("0x2ffe");
  Source.test_pool_piece_swap_7$(admin, investor, swapper, core, $c);
});

test('PieceTest::test_pool_piece_swap_8', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const investor = new HexString("0x2fff");
  const swapper = new HexString("0x2ffe");
  Source.test_pool_piece_swap_8$(admin, investor, swapper, core, $c);
});

test('PieceTest::test_pool_piece_swap_accumulative_giant', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const investor = new HexString("0x2fff");
  const swapper = new HexString("0x2ffe");
  Source.test_pool_piece_swap_accumulative_giant$(admin, investor, swapper, core, $c);
});

test('PieceTest::test_pool_piece_swap_deviant', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const investor = new HexString("0x2fff");
  const swapper = new HexString("0x2ffe");
  Source.test_pool_piece_swap_deviant$(admin, investor, swapper, core, $c);
});


