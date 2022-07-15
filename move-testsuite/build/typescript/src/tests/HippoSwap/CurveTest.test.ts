import * as Source from '../../HippoSwap/CurveTest'; 
import * as $ from '@manahippo/move-to-ts';
import { HexString } from 'aptos';

test('CurveTest::test_pool_stable_curve_2', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const investor = new HexString("0x2fff");
  const swapper = new HexString("0x2ffe");
  Source.test_pool_stable_curve_2$(admin, investor, swapper, core, $c);
});

test('CurveTest::test_pool_stable_curve_3', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const investor = new HexString("0x2fff");
  const swapper = new HexString("0x2ffe");
  Source.test_pool_stable_curve_3$(admin, investor, swapper, core, $c);
});

test('CurveTest::test_pool_stable_curve_4', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const investor = new HexString("0x2fff");
  const swapper = new HexString("0x2ffe");
  Source.test_pool_stable_curve_4$(admin, investor, swapper, core, $c);
});

test('CurveTest::test_pool_stable_curve_5', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const investor = new HexString("0x2fff");
  const swapper = new HexString("0x2ffe");
  Source.test_pool_stable_curve_5$(admin, investor, swapper, core, $c);
});

test('CurveTest::test_pool_stable_curve_6', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const investor = new HexString("0x2fff");
  const swapper = new HexString("0x2ffe");
  Source.test_pool_stable_curve_6$(admin, investor, swapper, core, $c);
});

test('CurveTest::test_pool_stable_curve_7', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const investor = new HexString("0x2fff");
  const swapper = new HexString("0x2ffe");
  expect( () => Source.test_pool_stable_curve_7$(admin, investor, swapper, core, $c) ).toThrow();
});

test('CurveTest::test_pool_stable_curve_8', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const investor = new HexString("0x2fff");
  const swapper = new HexString("0x2ffe");
  Source.test_pool_stable_curve_8$(admin, investor, swapper, core, $c);
});

test('CurveTest::test_pool_stable_curve_accumulative_giant', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const investor = new HexString("0x2fff");
  const swapper = new HexString("0x2ffe");
  Source.test_pool_stable_curve_accumulative_giant$(admin, investor, swapper, core, $c);
});

test('CurveTest::test_pool_stable_curve_accumulative_loop_swap', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const investor = new HexString("0x2fff");
  const swapper = new HexString("0x2ffe");
  Source.test_pool_stable_curve_accumulative_loop_swap$(admin, investor, swapper, core, $c);
});

test('CurveTest::test_pool_stable_curve_add_remove', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const investor = new HexString("0x2fff");
  const swapper = new HexString("0x2ffe");
  Source.test_pool_stable_curve_add_remove$(admin, investor, swapper, core, $c);
});

test('CurveTest::test_pool_stable_curve_deviant', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const investor = new HexString("0x2fff");
  const swapper = new HexString("0x2ffe");
  Source.test_pool_stable_curve_deviant$(admin, investor, swapper, core, $c);
});

test('CurveTest::test_pool_stable_curve_standard', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const investor = new HexString("0x2fff");
  const swapper = new HexString("0x2ffe");
  Source.test_pool_stable_curve_standard$(admin, investor, swapper, core, $c);
});

test('CurveTest::test_pool_stable_curve_tiny_amt', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const investor = new HexString("0x2fff");
  const swapper = new HexString("0x2ffe");
  Source.test_pool_stable_curve_tiny_amt$(admin, investor, swapper, core, $c);
});


