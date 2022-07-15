import * as Source from '../../HippoSwap/StableCurveNumeral'; 
import * as $ from '@manahippo/move-to-ts';
import { HexString } from 'aptos';

test('StableCurveNumeral::fail_recur_D', () => {
  const $c = new $.AptosLocalCache();
  expect( () => Source.fail_recur_D$($c) ).toThrow("2020");
});

test('StableCurveNumeral::test_curvature', () => {
  const $c = new $.AptosLocalCache();
  Source.test_curvature$($c);
});

test('StableCurveNumeral::test_fail_get_y', () => {
  const $c = new $.AptosLocalCache();
  expect( () => Source.test_fail_get_y$($c) ).toThrow("2020");
});

test('StableCurveNumeral::test_fail_recur_D_improved', () => {
  const $c = new $.AptosLocalCache();
  expect( () => Source.test_fail_recur_D_improved$($c) ).toThrow("2020");
});

test('StableCurveNumeral::test_fail_recur_D_newton', () => {
  const $c = new $.AptosLocalCache();
  expect( () => Source.test_fail_recur_D_newton$($c) ).toThrow("2020");
});

test('StableCurveNumeral::test_fail_recur_y', () => {
  const $c = new $.AptosLocalCache();
  expect( () => Source.test_fail_recur_y$($c) ).toThrow("2021");
});

test('StableCurveNumeral::test_get_D', () => {
  const $c = new $.AptosLocalCache();
  Source.test_get_D$($c);
});

test('StableCurveNumeral::test_get_D4', () => {
  const $c = new $.AptosLocalCache();
  Source.test_get_D4$($c);
});

test('StableCurveNumeral::test_get_D_2', () => {
  const $c = new $.AptosLocalCache();
  Source.test_get_D_2$($c);
});

test('StableCurveNumeral::test_get_D_3', () => {
  const $c = new $.AptosLocalCache();
  Source.test_get_D_3$($c);
});

test('StableCurveNumeral::test_get_D_newton_branch_zero', () => {
  const $c = new $.AptosLocalCache();
  Source.test_get_D_newton_branch_zero$($c);
});

test('StableCurveNumeral::test_get_D_origin', () => {
  const $c = new $.AptosLocalCache();
  Source.test_get_D_origin$($c);
});

test('StableCurveNumeral::test_get_y_branch_zero', () => {
  const $c = new $.AptosLocalCache();
  Source.test_get_y_branch_zero$($c);
});

test('StableCurveNumeral::test_iter_loop_D', () => {
  const $c = new $.AptosLocalCache();
  Source.test_iter_loop_D$($c);
});

test('StableCurveNumeral::test_method_diff', () => {
  const $c = new $.AptosLocalCache();
  Source.test_method_diff$($c);
});

test('StableCurveNumeral::test_method_large_a', () => {
  const $c = new $.AptosLocalCache();
  Source.test_method_large_a$($c);
});

test('StableCurveNumeral::test_raw_A_branch_A', () => {
  const $c = new $.AptosLocalCache();
  Source.test_raw_A_branch_A$($c);
});

test('StableCurveNumeral::test_raw_A_branch_B', () => {
  const $c = new $.AptosLocalCache();
  Source.test_raw_A_branch_B$($c);
});

test('StableCurveNumeral::test_raw_A_branch_fa_expire', () => {
  const $c = new $.AptosLocalCache();
  Source.test_raw_A_branch_fa_expire$($c);
});

test('StableCurveNumeral::test_recur_D_bad', () => {
  const $c = new $.AptosLocalCache();
  expect( () => Source.test_recur_D_bad$($c) ).toThrow("2020");
});

test('StableCurveNumeral::test_recur_D_improve', () => {
  const $c = new $.AptosLocalCache();
  Source.test_recur_D_improve$($c);
});

test('StableCurveNumeral::test_recur_D_improve_loop_gt', () => {
  const $c = new $.AptosLocalCache();
  Source.test_recur_D_improve_loop_gt$($c);
});

test('StableCurveNumeral::test_recur_D_newton', () => {
  const $c = new $.AptosLocalCache();
  Source.test_recur_D_newton$($c);
});

test('StableCurveNumeral::test_recur_D_ok_1', () => {
  const $c = new $.AptosLocalCache();
  Source.test_recur_D_ok_1$($c);
});

test('StableCurveNumeral::test_recur_D_ok_2', () => {
  const $c = new $.AptosLocalCache();
  Source.test_recur_D_ok_2$($c);
});

test('StableCurveNumeral::test_recur_D_ok_3', () => {
  const $c = new $.AptosLocalCache();
  Source.test_recur_D_ok_3$($c);
});

test('StableCurveNumeral::test_y_ok', () => {
  const $c = new $.AptosLocalCache();
  Source.test_y_ok$($c);
});


