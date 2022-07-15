import * as Source from '../../HippoSwap/StableCurveSwap'; 
import * as $ from '@manahippo/move-to-ts';
import { HexString } from 'aptos';

test('StableCurveSwap::fail_add_liquidity', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const vm = new HexString("0x0");
  expect( () => Source.fail_add_liquidity$(admin, core, vm, $c) ).toThrow("2007");
});

test('StableCurveSwap::fail_add_liquidity_d1', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const vm = new HexString("0x0");
  expect( () => Source.fail_add_liquidity_d1$(admin, core, vm, $c) ).toThrow("2020");
});

test('StableCurveSwap::fail_add_liquidity_y', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const vm = new HexString("0x0");
  expect( () => Source.fail_add_liquidity_y$(admin, core, vm, $c) ).toThrow("2007");
});

test('StableCurveSwap::fail_assert_admin', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const vm = new HexString("0x0");
  expect( () => Source.fail_assert_admin$(core, $c) ).toThrow("2003");
});

test('StableCurveSwap::fail_x', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  expect( () => Source.fail_x$(admin, $c) ).toThrow("2000");
});

test('StableCurveSwap::fail_y', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  expect( () => Source.fail_y$(admin, $c) ).toThrow("2000");
});

test('StableCurveSwap::mint_lptoken_coin', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const vm = new HexString("0x0");
  Source.mint_lptoken_coin$(admin, core, vm, $c);
});

test('StableCurveSwap::mint_mock_coin', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core_resource_account = new HexString("0xa550c18");
  Source.mint_mock_coin$(admin, $c);
});

test('StableCurveSwap::mock_add_liquidity', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const trader = new HexString("0xffffff01");
  const vm = new HexString("0x0");
  Source.mock_add_liquidity$(admin, core, vm, trader, $c);
});

test('StableCurveSwap::test_exchange_coin', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const vm = new HexString("0x0");
  Source.test_exchange_coin$(admin, core, vm, $c);
});

test('StableCurveSwap::test_fail_ramp_A_future_A_value', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const vm = new HexString("0x0");
  expect( () => Source.test_fail_ramp_A_future_A_value$(admin, core, vm, $c) ).toThrow("2010");
});

test('StableCurveSwap::test_fail_ramp_A_future_A_value_b', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const vm = new HexString("0x0");
  expect( () => Source.test_fail_ramp_A_future_A_value_b$(admin, core, vm, $c) ).toThrow("2010");
});

test('StableCurveSwap::test_fail_ramp_A_future_A_value_c', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const vm = new HexString("0x0");
  expect( () => Source.test_fail_ramp_A_future_A_value_c$(admin, core, vm, $c) ).toThrow("2010");
});

test('StableCurveSwap::test_fail_ramp_A_future_time', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const vm = new HexString("0x0");
  expect( () => Source.test_fail_ramp_A_future_time$(admin, core, vm, $c) ).toThrow("2009");
});

test('StableCurveSwap::test_fail_ramp_A_timestamp', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const vm = new HexString("0x0");
  expect( () => Source.test_fail_ramp_A_timestamp$(admin, core, vm, $c) ).toThrow("2009");
});

test('StableCurveSwap::test_fail_remove_liquidity_amount_x', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const trader = new HexString("0xffffff01");
  const vm = new HexString("0x0");
  expect( () => Source.test_fail_remove_liquidity_amount_x$(admin, core, vm, trader, $c) ).toThrow("2001");
});

test('StableCurveSwap::test_fail_remove_liquidity_amount_y', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const trader = new HexString("0xffffff01");
  const vm = new HexString("0x0");
  expect( () => Source.test_fail_remove_liquidity_amount_y$(admin, core, vm, trader, $c) ).toThrow("2001");
});

test('StableCurveSwap::test_ramp_A_stop_ramp_A', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const vm = new HexString("0x0");
  Source.test_ramp_A_stop_ramp_A$(admin, core, vm, $c);
});

test('StableCurveSwap::test_swap_pair_case_A', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const vm = new HexString("0x0");
  Source.test_swap_pair_case_A$(admin, core, vm, $c);
});

test('StableCurveSwap::test_swap_pair_case_B', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const vm = new HexString("0x0");
  Source.test_swap_pair_case_B$(admin, core, vm, $c);
});


