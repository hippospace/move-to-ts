import * as Source from '../../HippoSwap/PieceSwapMath'; 
import * as $ from '@manahippo/move-to-ts';
import { HexString } from 'aptos';

test('PieceSwapMath::test_get_add_liquidity_actual_amount_1', () => {
  const $c = new $.AptosLocalCache();
  Source.test_get_add_liquidity_actual_amount_1$($c);
});

test('PieceSwapMath::test_get_add_liquidity_actual_amount_2', () => {
  const $c = new $.AptosLocalCache();
  Source.test_get_add_liquidity_actual_amount_2$($c);
});

test('PieceSwapMath::test_get_add_liquidity_actual_amount_3', () => {
  const $c = new $.AptosLocalCache();
  Source.test_get_add_liquidity_actual_amount_3$($c);
});

test('PieceSwapMath::test_get_remove_liquidity_amounts_1', () => {
  const $c = new $.AptosLocalCache();
  Source.test_get_remove_liquidity_amounts_1$($c);
});

test('PieceSwapMath::test_get_remove_liquidity_amounts_2', () => {
  const $c = new $.AptosLocalCache();
  Source.test_get_remove_liquidity_amounts_2$($c);
});

test('PieceSwapMath::test_get_remove_liquidity_amounts_3', () => {
  const $c = new $.AptosLocalCache();
  Source.test_get_remove_liquidity_amounts_3$($c);
});

test('PieceSwapMath::test_get_swap_x_to_y_out_1', () => {
  const $c = new $.AptosLocalCache();
  Source.test_get_swap_x_to_y_out_1$($c);
});

test('PieceSwapMath::test_get_swap_x_to_y_out_2', () => {
  const $c = new $.AptosLocalCache();
  Source.test_get_swap_x_to_y_out_2$($c);
});

test('PieceSwapMath::test_initialization_constants', () => {
  const $c = new $.AptosLocalCache();
  Source.test_initialization_constants$($c);
});

test('PieceSwapMath::test_small_pool_small_amount_precision', () => {
  const $c = new $.AptosLocalCache();
  Source.test_small_pool_small_amount_precision$($c);
});

test('PieceSwapMath::test_swap_large_amount_precision_at_joint', () => {
  const $c = new $.AptosLocalCache();
  Source.test_swap_large_amount_precision_at_joint$($c);
});

test('PieceSwapMath::test_swap_small_amount_precision', () => {
  const $c = new $.AptosLocalCache();
  Source.test_swap_small_amount_precision$($c);
});

test('PieceSwapMath::test_swap_small_amount_precision_at_joint', () => {
  const $c = new $.AptosLocalCache();
  Source.test_swap_small_amount_precision_at_joint$($c);
});

test('PieceSwapMath::test_swap_small_amount_precision_past_joint_a', () => {
  const $c = new $.AptosLocalCache();
  Source.test_swap_small_amount_precision_past_joint_a$($c);
});

test('PieceSwapMath::test_swap_small_amount_precision_past_joint_b', () => {
  const $c = new $.AptosLocalCache();
  Source.test_swap_small_amount_precision_past_joint_b$($c);
});

test('PieceSwapMath::test_swap_smaller_amount_precision_at_joint', () => {
  const $c = new $.AptosLocalCache();
  Source.test_swap_smaller_amount_precision_at_joint$($c);
});


