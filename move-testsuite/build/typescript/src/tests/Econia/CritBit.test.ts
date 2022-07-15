import * as Source from '../../Econia/CritBit'; 
import * as $ from '@manahippo/move-to-ts';
import { HexString } from 'aptos';

test('CritBit::b_lo_success', () => {
  const $c = new $.AptosLocalCache();
  Source.b_lo_success$($c);
});

test('CritBit::borrow_empty', () => {
  const $c = new $.AptosLocalCache();
  expect( () => Source.borrow_empty$($c) ).toThrow("3");
});

test('CritBit::borrow_mut_empty', () => {
  const $c = new $.AptosLocalCache();
  expect( () => Source.borrow_mut_empty$($c) ).toThrow("3");
});

test('CritBit::borrow_mut_no_match', () => {
  const $c = new $.AptosLocalCache();
  expect( () => Source.borrow_mut_no_match$($c) ).toThrow("4");
});

test('CritBit::borrow_mut_success', () => {
  const $c = new $.AptosLocalCache();
  Source.borrow_mut_success$($c);
});

test('CritBit::borrow_no_match', () => {
  const $c = new $.AptosLocalCache();
  expect( () => Source.borrow_no_match$($c) ).toThrow("4");
});

test('CritBit::check_len_failure', () => {
  const $c = new $.AptosLocalCache();
  expect( () => Source.check_len_failure$($c) ).toThrow("5");
});

test('CritBit::check_len_success', () => {
  const $c = new $.AptosLocalCache();
  Source.check_len_success$($c);
});

test('CritBit::crit_bit_success', () => {
  const $c = new $.AptosLocalCache();
  Source.crit_bit_success$($c);
});

test('CritBit::destroy_empty_fail', () => {
  const $c = new $.AptosLocalCache();
  expect( () => Source.destroy_empty_fail$($c) ).toThrow("1");
});

test('CritBit::destroy_empty_success', () => {
  const $c = new $.AptosLocalCache();
  Source.destroy_empty_success$($c);
});

test('CritBit::empty_success', () => {
  const $c = new $.AptosLocalCache();
  Source.empty_success$($c);
});

test('CritBit::has_key_empty_success', () => {
  const $c = new $.AptosLocalCache();
  Source.has_key_empty_success$($c);
});

test('CritBit::has_key_singleton', () => {
  const $c = new $.AptosLocalCache();
  Source.has_key_singleton$($c);
});

test('CritBit::has_key_success', () => {
  const $c = new $.AptosLocalCache();
  Source.has_key_success$($c);
});

test('CritBit::insert_general_failure', () => {
  const $c = new $.AptosLocalCache();
  expect( () => Source.insert_general_failure$($c) ).toThrow("2");
});

test('CritBit::insert_singleton_failure', () => {
  const $c = new $.AptosLocalCache();
  expect( () => Source.insert_singleton_failure$($c) ).toThrow("2");
});

test('CritBit::insert_singleton_success_l', () => {
  const $c = new $.AptosLocalCache();
  Source.insert_singleton_success_l$($c);
});

test('CritBit::insert_singleton_success_r', () => {
  const $c = new $.AptosLocalCache();
  Source.insert_singleton_success_r$($c);
});

test('CritBit::insert_success_1', () => {
  const $c = new $.AptosLocalCache();
  Source.insert_success_1$($c);
});

test('CritBit::insert_success_2', () => {
  const $c = new $.AptosLocalCache();
  Source.insert_success_2$($c);
});

test('CritBit::is_empty_success', () => {
  const $c = new $.AptosLocalCache();
  Source.is_empty_success$($c);
});

test('CritBit::is_out_success', () => {
  const $c = new $.AptosLocalCache();
  Source.is_out_success$($c);
});

test('CritBit::is_set_success', () => {
  const $c = new $.AptosLocalCache();
  Source.is_set_success$($c);
});

test('CritBit::length_success', () => {
  const $c = new $.AptosLocalCache();
  Source.length_success$($c);
});

test('CritBit::max_key_failure_empty', () => {
  const $c = new $.AptosLocalCache();
  expect( () => Source.max_key_failure_empty$($c) ).toThrow("7");
});

test('CritBit::max_key_success', () => {
  const $c = new $.AptosLocalCache();
  Source.max_key_success$($c);
});

test('CritBit::min_key_failure_empty', () => {
  const $c = new $.AptosLocalCache();
  expect( () => Source.min_key_failure_empty$($c) ).toThrow("7");
});

test('CritBit::min_key_success', () => {
  const $c = new $.AptosLocalCache();
  Source.min_key_success$($c);
});

test('CritBit::o_v_success', () => {
  const $c = new $.AptosLocalCache();
  Source.o_v_success$($c);
});

test('CritBit::out_c_success', () => {
  const $c = new $.AptosLocalCache();
  Source.out_c_success$($c);
});

test('CritBit::pop_failure_empty', () => {
  const $c = new $.AptosLocalCache();
  expect( () => Source.pop_failure_empty$($c) ).toThrow("6");
});

test('CritBit::pop_general_failure_no_key', () => {
  const $c = new $.AptosLocalCache();
  expect( () => Source.pop_general_failure_no_key$($c) ).toThrow("4");
});

test('CritBit::pop_general_success_1', () => {
  const $c = new $.AptosLocalCache();
  Source.pop_general_success_1$($c);
});

test('CritBit::pop_general_success_2', () => {
  const $c = new $.AptosLocalCache();
  Source.pop_general_success_2$($c);
});

test('CritBit::pop_singleton_failure', () => {
  const $c = new $.AptosLocalCache();
  expect( () => Source.pop_singleton_failure$($c) ).toThrow("4");
});

test('CritBit::pop_singleton_success', () => {
  const $c = new $.AptosLocalCache();
  Source.pop_singleton_success$($c);
});

test('CritBit::singleton_success', () => {
  const $c = new $.AptosLocalCache();
  Source.singleton_success$($c);
});

test('CritBit::stitch_swap_remove_i_l', () => {
  const $c = new $.AptosLocalCache();
  Source.stitch_swap_remove_i_l$($c);
});

test('CritBit::stitch_swap_remove_i_r', () => {
  const $c = new $.AptosLocalCache();
  Source.stitch_swap_remove_i_r$($c);
});

test('CritBit::stitch_swap_remove_o_l', () => {
  const $c = new $.AptosLocalCache();
  Source.stitch_swap_remove_o_l$($c);
});

test('CritBit::stitch_swap_remove_o_r', () => {
  const $c = new $.AptosLocalCache();
  Source.stitch_swap_remove_o_r$($c);
});

test('CritBit::stitch_swap_remove_r_i', () => {
  const $c = new $.AptosLocalCache();
  Source.stitch_swap_remove_r_i$($c);
});

test('CritBit::stitch_swap_remove_r_o', () => {
  const $c = new $.AptosLocalCache();
  Source.stitch_swap_remove_r_o$($c);
});

test('CritBit::traverse_demo', () => {
  const $c = new $.AptosLocalCache();
  Source.traverse_demo$($c);
});

test('CritBit::traverse_end_pop_success', () => {
  const $c = new $.AptosLocalCache();
  Source.traverse_end_pop_success$($c);
});

test('CritBit::traverse_pop_success', () => {
  const $c = new $.AptosLocalCache();
  Source.traverse_pop_success$($c);
});

test('CritBit::u_failure', () => {
  const $c = new $.AptosLocalCache();
  expect( () => Source.u_failure$($c) ).toThrow("0");
});

test('CritBit::u_success', () => {
  const $c = new $.AptosLocalCache();
  Source.u_success$($c);
});


