import * as Source from '../../HippoSwap/StableCurveScripts'; 
import * as $ from '@manahippo/move-to-ts';
import { HexString } from 'aptos';

test('StableCurveScripts::fail_lp_amt', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const user = new HexString("0x1234567");
  expect( () => Source.fail_lp_amt$(admin, core, $c) ).toThrow("5");
});

test('StableCurveScripts::test_data_set_init_imbalance', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const user = new HexString("0x1234567");
  Source.test_data_set_init_imbalance$(admin, core, $c);
});

test('StableCurveScripts::test_data_set_init_small_qr_1', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const user = new HexString("0x1234567");
  Source.test_data_set_init_small_qr_1$(admin, core, $c);
});

test('StableCurveScripts::test_data_set_init_small_qr_2', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const user = new HexString("0x1234567");
  Source.test_data_set_init_small_qr_2$(admin, core, $c);
});

test('StableCurveScripts::test_data_set_init_tiny_q', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const user = new HexString("0x1234567");
  Source.test_data_set_init_tiny_q$(admin, core, $c);
});

test('StableCurveScripts::test_data_set_init_tiny_qr_1', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const user = new HexString("0x1234567");
  Source.test_data_set_init_tiny_qr_1$(admin, core, $c);
});

test('StableCurveScripts::test_data_set_init_tiny_qr_2', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const user = new HexString("0x1234567");
  Source.test_data_set_init_tiny_qr_2$(admin, core, $c);
});

test('StableCurveScripts::test_data_set_init_tiny_qr_3', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const user = new HexString("0x1234567");
  Source.test_data_set_init_tiny_qr_3$(admin, core, $c);
});

test('StableCurveScripts::test_data_set_max_level', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const user = new HexString("0x1234567");
  expect( () => Source.test_data_set_max_level$(admin, core, $c) ).toThrow();
});

test('StableCurveScripts::test_data_set_trade_proc', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const user = new HexString("0x1234567");
  Source.test_data_set_trade_proc$(admin, core, $c);
});

test('StableCurveScripts::test_data_set_validate_basic', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const user = new HexString("0x1234567");
  Source.test_data_set_validate_basic$(admin, core, $c);
});

test('StableCurveScripts::test_data_set_validate_scale', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const user = new HexString("0x1234567");
  Source.test_data_set_validate_scale$(admin, core, $c);
});

test('StableCurveScripts::test_fail_output_less_x', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const user = new HexString("0x1234567");
  expect( () => Source.test_fail_output_less_x$(admin, user, core, $c) ).toThrow("3");
});

test('StableCurveScripts::test_fail_output_less_y', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const user = new HexString("0x1234567");
  expect( () => Source.test_fail_output_less_y$(admin, user, core, $c) ).toThrow("3");
});

test('StableCurveScripts::test_failx', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const user = new HexString("0x1234567");
  expect( () => Source.test_failx$(admin, user, core, $c) ).toThrow("0");
});

test('StableCurveScripts::test_faily', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const user = new HexString("0x1234567");
  expect( () => Source.test_faily$(admin, user, core, $c) ).toThrow("1");
});

test('StableCurveScripts::test_mock_deploy', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const user = new HexString("0x1234567");
  Source.test_mock_deploy$(admin, core, $c);
});

test('StableCurveScripts::test_scripts', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const user = new HexString("0x1234567");
  Source.test_scripts$(admin, user, core, $c);
});


