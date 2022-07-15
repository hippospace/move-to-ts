import * as Source from '../../HippoSwap/PieceSwap'; 
import * as $ from '@manahippo/move-to-ts';
import { HexString } from 'aptos';

test('PieceSwap::test_add_initial_liquidity_unequal', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const user = new HexString("0x12345");
  expect( () => Source.test_add_initial_liquidity_unequal$(admin, user, $c) ).toThrow();
});

test('PieceSwap::test_add_liquidity', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const user = new HexString("0x12345");
  Source.test_add_liquidity$(admin, user, $c);
});

test('PieceSwap::test_create_pool_with_liquidity', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const user = new HexString("0x12345");
  Source.test_create_pool_with_liquidity$(admin, user, $c);
});

test('PieceSwap::test_create_pool_with_liquidity_then_remove', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const user = new HexString("0x12345");
  Source.test_create_pool_with_liquidity_then_remove$(admin, user, $c);
});

test('PieceSwap::test_remove_liquidity', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const user = new HexString("0x12345");
  Source.test_remove_liquidity$(admin, user, $c);
});

test('PieceSwap::test_swap_x_to_y', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const user = new HexString("0x12345");
  Source.test_swap_x_to_y$(admin, user, $c);
});

test('PieceSwap::test_swap_y_to_x', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const user = new HexString("0x12345");
  Source.test_swap_y_to_x$(admin, user, $c);
});


