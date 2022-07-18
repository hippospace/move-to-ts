import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient} from "aptos";
import * as Std from "../Std";
export const packageName = "HippoSwap";
export const moduleAddress = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
export const moduleName = "StableCurveNumeral";

export const ERROR_SWAP_INVALID_AMOUNT : U64 = u64("2021");
export const ERROR_SWAP_INVALID_DERIVIATION : U64 = u64("2020");

// #[test]
export function fail_recur_D$ (
  $c: AptosDataCache,
): void {
  recur_D_origin$(u128("1"), u128("1"), u128("1"), u128("1"), u128("1"), u128("1"), u128("1"), $c);
  return;
}

export function get_A$ (
  initial_A: U64,
  future_A: U64,
  initial_A_time: U64,
  future_A_time: U64,
  timestamp: U64,
  $c: AptosDataCache,
): U64 {
  let temp$1, temp$2;
  if ($.copy(timestamp).lt($.copy(future_A_time))) {
    if ($.copy(future_A).lt($.copy(initial_A))) {
      temp$1 = $.copy(initial_A).sub($.copy(initial_A).sub($.copy(future_A)).mul($.copy(timestamp).sub($.copy(initial_A_time))).div($.copy(future_A_time).sub($.copy(initial_A_time))));
    }
    else{
      temp$1 = $.copy(initial_A).add($.copy(future_A).sub($.copy(initial_A)).mul($.copy(timestamp).sub($.copy(initial_A_time))).div($.copy(future_A_time).sub($.copy(initial_A_time))));
    }
    temp$2 = temp$1;
  }
  else{
    temp$2 = $.copy(future_A);
  }
  return temp$2;
}

export function get_D$ (
  x: U128,
  y: U128,
  amp: U64,
  $c: AptosDataCache,
): U128 {
  return get_D_origin$($.copy(x), $.copy(y), $.copy(amp), $c);
}

export function get_D_newton_method$ (
  x: U128,
  y: U128,
  amp: U64,
  $c: AptosDataCache,
): U128 {
  let d0, result;
  d0 = $.copy(x).add($.copy(y));
  if ($.copy(d0).eq(u128("0"))) {
    return $.copy(d0);
  }
  else{
  }
  [result, ] = recur_D_newton_method$($.copy(d0), $.copy(x), $.copy(y), u128($.copy(amp)), u128("0"), u128("100"), $c);
  return $.copy(result);
}

export function get_D_origin$ (
  x: U128,
  y: U128,
  amp: U64,
  $c: AptosDataCache,
): U128 {
  let temp$1, _iter, ann, d, end, iter, result, s;
  s = $.copy(x).add($.copy(y));
  if ($.copy(s).eq(u128("0"))) {
    temp$1 = $.copy(s);
  }
  else{
    [d, ann, iter, end] = [$.copy(s), u128($.copy(amp)).mul(u128("2")), u128("0"), u128("255")];
    [result, _iter] = recur_D_origin$($.copy(d), $.copy(x), $.copy(y), $.copy(s), $.copy(ann), $.copy(iter), $.copy(end), $c);
    temp$1 = $.copy(result);
  }
  return temp$1;
}

export function get_y$ (
  x: U64,
  amp: U64,
  d: U128,
  $c: AptosDataCache,
): U128 {
  let amp__1, b, c, result, x__2, y;
  if (!$.copy(x).neq(u64("0"))) {
    throw $.abortCode(ERROR_SWAP_INVALID_AMOUNT);
  }
  if ($.copy(d).eq(u128("0"))) {
    return u128("0");
  }
  else{
  }
  amp__1 = u128($.copy(amp));
  x__2 = u128($.copy(x));
  y = $.copy(d);
  b = $.copy(x__2).add($.copy(d).div(u128("2").mul($.copy(amp__1))));
  c = $.copy(d).mul($.copy(d)).div($.copy(x__2)).mul($.copy(d)).div(u128("8").mul($.copy(amp__1)));
  [result, ] = recur_y$($.copy(y), $.copy(b), $.copy(c), $.copy(d), u128("0"), u128("100"), $c);
  return $.copy(result);
}

// #[test]
export function mock_curve_params$ (
  $c: AptosDataCache,
): [U64, U64, U64, U64] {
  let future_A, future_A_time, initial_A, initial_A_time;
  initial_A = u64("3000000");
  future_A = u64("3000200");
  initial_A_time = time$(u64("0"), $c);
  future_A_time = time$(u64("3600"), $c);
  return [$.copy(initial_A), $.copy(future_A), $.copy(initial_A_time), $.copy(future_A_time)];
}

export function recur_D_improved$ (
  d: U128,
  x: U128,
  y: U128,
  s: U128,
  ann: U128,
  iter: U128,
  end: U128,
  $c: AptosDataCache,
): [U128, U128] {
  let temp$1, temp$2, temp$3, temp$4, d_prev, new_d, result;
  if (!$.copy(iter).lt($.copy(end))) {
    throw $.abortCode(ERROR_SWAP_INVALID_DERIVIATION);
  }
  d_prev = $.copy(d);
  result = u128("0");
  d = $.copy(d).mul($.copy(d)).mul($.copy(d)).div($.copy(x)).div($.copy(y)).div(u128("4"));
  new_d = $.copy(ann).mul($.copy(s)).add($.copy(d).mul(u128("2"))).mul($.copy(d_prev)).div($.copy(ann).sub(u128("1")).mul($.copy(d_prev)).add(u128("3").mul($.copy(d))));
  if ($.copy(new_d).gt($.copy(d_prev))) {
    temp$1 = $.copy(new_d).le($.copy(d_prev).add(u128("1")));
  }
  else{
    temp$1 = false;
  }
  if (temp$1) {
    result = $.copy(new_d);
  }
  else{
  }
  if ($.copy(new_d).le($.copy(d_prev))) {
    temp$2 = $.copy(d_prev).le($.copy(new_d).add(u128("1")));
  }
  else{
    temp$2 = false;
  }
  if (temp$2) {
    result = $.copy(new_d);
  }
  else{
  }
  if ($.copy(result).eq(u128("0"))) {
    [temp$3, temp$4] = recur_D_improved$($.copy(new_d), $.copy(x), $.copy(y), $.copy(s), $.copy(ann), $.copy(iter).add(u128("1")), $.copy(end), $c);
  }
  else{
    [temp$3, temp$4] = [$.copy(result), $.copy(iter)];
  }
  return [temp$3, temp$4];
}

export function recur_D_newton_method$ (
  d: U128,
  x: U128,
  y: U128,
  amp: U128,
  iter: U128,
  end: U128,
  $c: AptosDataCache,
): [U128, U128] {
  let temp$1, temp$2, d1, minuend;
  if (!$.copy(iter).lt($.copy(end))) {
    throw $.abortCode(ERROR_SWAP_INVALID_DERIVIATION);
  }
  d1 = u128("8").mul($.copy(amp)).mul($.copy(x)).mul($.copy(y)).mul($.copy(x).add($.copy(y))).add(u128("2").mul($.copy(d)).mul($.copy(d)).mul($.copy(d))).div(u128("3").mul($.copy(d)).mul($.copy(d)).add(u128("4").mul($.copy(x)).mul($.copy(y)).mul(u128("2").mul($.copy(amp)).sub(u128("1")))));
  minuend = $.copy(d).sub($.copy(d1));
  if ($.copy(minuend).le(u128("1"))) {
    [temp$1, temp$2] = [$.copy(d1), $.copy(iter)];
  }
  else{
    [temp$1, temp$2] = recur_D_newton_method$($.copy(d1), $.copy(x), $.copy(y), $.copy(amp), $.copy(iter).add(u128("1")), $.copy(end), $c);
  }
  return [temp$1, temp$2];
}

export function recur_D_origin$ (
  d: U128,
  x: U128,
  y: U128,
  s: U128,
  ann: U128,
  iter: U128,
  end: U128,
  $c: AptosDataCache,
): [U128, U128] {
  let temp$1, temp$2, temp$3, temp$4, d_p, d_prev, new_d, result;
  if (!$.copy(iter).lt($.copy(end))) {
    throw $.abortCode(ERROR_SWAP_INVALID_DERIVIATION);
  }
  d_prev = $.copy(d);
  result = u128("0");
  d_p = $.copy(d);
  d_p = $.copy(d_p).mul($.copy(d)).div($.copy(x).mul(u128("2")));
  d_p = $.copy(d_p).mul($.copy(d)).div($.copy(y).mul(u128("2")));
  new_d = $.copy(ann).mul($.copy(s)).add($.copy(d_p).mul(u128("2"))).mul($.copy(d)).div($.copy(ann).sub(u128("1")).mul($.copy(d)).add(u128("3").mul($.copy(d_p))));
  if ($.copy(new_d).gt($.copy(d_prev))) {
    temp$1 = $.copy(new_d).le($.copy(d_prev).add(u128("1")));
  }
  else{
    temp$1 = false;
  }
  if (temp$1) {
    result = $.copy(new_d);
  }
  else{
  }
  if ($.copy(new_d).le($.copy(d_prev))) {
    temp$2 = $.copy(d_prev).le($.copy(new_d).add(u128("1")));
  }
  else{
    temp$2 = false;
  }
  if (temp$2) {
    result = $.copy(new_d);
  }
  else{
  }
  if ($.copy(result).eq(u128("0"))) {
    [temp$3, temp$4] = recur_D_origin$($.copy(new_d), $.copy(x), $.copy(y), $.copy(s), $.copy(ann), $.copy(iter).add(u128("1")), $.copy(end), $c);
  }
  else{
    [temp$3, temp$4] = [$.copy(result), $.copy(iter)];
  }
  return [temp$3, temp$4];
}

export function recur_y$ (
  y: U128,
  b: U128,
  c: U128,
  d: U128,
  iter: U128,
  end: U128,
  $c: AptosDataCache,
): [U128, U128] {
  let temp$1, difference, y_next;
  if (!$.copy(iter).lt($.copy(end))) {
    throw $.abortCode(ERROR_SWAP_INVALID_DERIVIATION);
  }
  y_next = $.copy(y).mul($.copy(y)).add($.copy(c)).div(u128("2").mul($.copy(y)).add($.copy(b)).sub($.copy(d)));
  if ($.copy(y_next).gt($.copy(y))) {
    temp$1 = $.copy(y_next).sub($.copy(y));
  }
  else{
    temp$1 = $.copy(y).sub($.copy(y_next));
  }
  difference = temp$1;
  if ($.copy(difference).le(u128("1"))) {
    return [$.copy(y_next), $.copy(iter)];
  }
  else{
    return recur_y$($.copy(y_next), $.copy(b), $.copy(c), $.copy(d), $.copy(iter).add(u128("1")), $.copy(end), $c);
  }
}

// #[test]
export function test_curvature$ (
  $c: AptosDataCache,
): void {
  let temp$1, res2, result, rn2, round;
  [result, round] = recur_D_origin$(u128("3200"), u128("2200"), u128("1000"), u128("3200"), u128("160"), u128("1"), u128("10"), $c);
  if (!$.copy(result).eq(u128("3196"))) {
    throw $.abortCode(u64("100"));
  }
  if (!$.copy(round).eq(u128("2"))) {
    throw $.abortCode(u64("100"));
  }
  [res2, rn2] = recur_D_newton_method$(u128("3200"), u128("2200"), u128("1000"), u128("80"), u128("1"), u128("100"), $c);
  if ($.copy(res2).eq(u128("3196"))) {
    temp$1 = true;
  }
  else{
    temp$1 = $.copy(res2).eq(u128("3198"));
  }
  if (!temp$1) {
    throw $.abortCode(u64("100"));
  }
  if (!$.copy(rn2).eq(u128("2"))) {
    throw $.abortCode(u64("100"));
  }
  return;
}

// #[test]
export function test_fail_get_y$ (
  $c: AptosDataCache,
): void {
  recur_y$(u128("10"), u128("10"), u128("10"), u128("10"), u128("6"), u128("4"), $c);
  return;
}

// #[test]
export function test_fail_recur_D_improved$ (
  $c: AptosDataCache,
): void {
  recur_D_improved$(u128("10"), u128("10"), u128("10"), u128("20"), u128("10"), u128("6"), u128("4"), $c);
  return;
}

// #[test]
export function test_fail_recur_D_newton$ (
  $c: AptosDataCache,
): void {
  recur_D_newton_method$(u128("10"), u128("10"), u128("10"), u128("10"), u128("6"), u128("4"), $c);
  return;
}

// #[test]
export function test_fail_recur_y$ (
  $c: AptosDataCache,
): void {
  get_y$(u64("0"), u64("10"), u128("10"), $c);
  return;
}

// #[test]
export function test_get_D$ (
  $c: AptosDataCache,
): void {
  let s;
  s = get_D$(u128("100"), u128("400"), u64("1000"), $c);
  if (!$.copy(s).eq(u128("499"))) {
    throw $.abortCode(u64("10000"));
  }
  return;
}

// #[test]
export function test_get_D4$ (
  $c: AptosDataCache,
): void {
  let s;
  s = get_D$(u128("100"), u128("300"), u64("90"), $c);
  if (!$.copy(s).eq(u128("399"))) {
    throw $.abortCode(u64("10000"));
  }
  return;
}

// #[test]
export function test_get_D_2$ (
  $c: AptosDataCache,
): void {
  let s;
  s = get_D$(u128("101010"), u128("200"), u64("50"), $c);
  if (!$.copy(s).eq(u128("66112"))) {
    throw $.abortCode(u64("10000"));
  }
  return;
}

// #[test]
export function test_get_D_3$ (
  $c: AptosDataCache,
): void {
  let s;
  s = get_D$(u128("10074"), u128("10074"), u64("50"), $c);
  if (!$.copy(s).eq(u128("20148"))) {
    throw $.abortCode(u64("10000"));
  }
  return;
}

// #[test]
export function test_get_D_newton_branch_zero$ (
  $c: AptosDataCache,
): void {
  let temp$2, y, y__1;
  y = get_D_newton_method$(u128("0"), u128("0"), u64("10"), $c);
  if (!$.copy(y).eq(u128("0"))) {
    throw $.abortCode(u64("1000"));
  }
  y__1 = get_D_newton_method$(u128("10"), u128("10"), u64("10"), $c);
  temp$2 = u64("10000002222");
  Std.Debug.print$(temp$2, $c, [AtomicTypeTag.U64] as TypeTag[]);
  Std.Debug.print$(y__1, $c, [AtomicTypeTag.U128] as TypeTag[]);
  if (!$.copy(y__1).eq(u128("20"))) {
    throw $.abortCode(u64("1000"));
  }
  return;
}

// #[test]
export function test_get_D_origin$ (
  $c: AptosDataCache,
): void {
  let d, y;
  y = get_D_origin$(u128("0"), u128("0"), u64("10"), $c);
  if (!$.copy(y).eq(u128("0"))) {
    throw $.abortCode(u64("1000"));
  }
  d = get_D_origin$(u128("200"), u128("100"), u64("30"), $c);
  Std.Debug.print$(d, $c, [AtomicTypeTag.U128] as TypeTag[]);
  return;
}

// #[test]
export function test_get_y_branch_zero$ (
  $c: AptosDataCache,
): void {
  let y;
  y = get_y$(u64("10"), u64("10"), u128("0"), $c);
  if (!$.copy(y).eq(u128("0"))) {
    throw $.abortCode(u64("1000"));
  }
  return;
}

// #[test]
export function test_iter_loop_D$ (
  $c: AptosDataCache,
): void {
  let s;
  s = get_D$(u128("100"), u128("200"), u64("1000"), $c);
  if (!$.copy(s).eq(u128("299"))) {
    throw $.abortCode(u64("10000"));
  }
  return;
}

// #[test]
export function test_method_diff$ (
  $c: AptosDataCache,
): void {
  let temp$1, res2, result, rnd2, round;
  [result, round] = recur_D_origin$(u128("100200"), u128("100000"), u128("200"), u128("100200"), u128("2"), u128("1"), u128("10"), $c);
  if (!$.copy(result).eq(u128("24159"))) {
    throw $.abortCode(u64("10003"));
  }
  if (!$.copy(round).eq(u128("7"))) {
    throw $.abortCode(u64("10003"));
  }
  [res2, rnd2] = recur_D_newton_method$(u128("100200"), u128("100000"), u128("200"), u128("1"), u128("1"), u128("100"), $c);
  if ($.copy(res2).eq(u128("24159"))) {
    temp$1 = true;
  }
  else{
    temp$1 = $.copy(res2).eq(u128("24158"));
  }
  if (!temp$1) {
    throw $.abortCode(u64("10004"));
  }
  if (!$.copy(rnd2).eq(u128("7"))) {
    throw $.abortCode(u64("10004"));
  }
  return;
}

// #[test]
export function test_method_large_a$ (
  $c: AptosDataCache,
): void {
  let temp$1, res2, result, round2, rounds;
  [result, rounds] = recur_D_origin$(u128("100200"), u128("100000"), u128("200"), u128("100200"), u128("160"), u128("1"), u128("10"), $c);
  if (!$.copy(result).eq(u128("71769"))) {
    throw $.abortCode(u64("10003"));
  }
  if (!$.copy(rounds).eq(u128("4"))) {
    throw $.abortCode(u64("10003"));
  }
  [res2, round2] = recur_D_newton_method$(u128("100200"), u128("100000"), u128("200"), u128("80"), u128("1"), u128("100"), $c);
  if ($.copy(res2).eq(u128("71769"))) {
    temp$1 = true;
  }
  else{
    temp$1 = $.copy(res2).eq(u128("71768"));
  }
  if (!temp$1) {
    throw $.abortCode(u64("10004"));
  }
  if (!$.copy(round2).eq(u128("4"))) {
    throw $.abortCode(u64("10004"));
  }
  return;
}

// #[test]
export function test_raw_A_branch_A$ (
  $c: AptosDataCache,
): void {
  let _fa, fa, fat, ia, iat, timestamp;
  [ia, _fa, iat, fat] = mock_curve_params$($c);
  fa = u64("2600000");
  timestamp = time$(u64("200"), $c);
  get_A$($.copy(ia), $.copy(fa), $.copy(iat), $.copy(fat), $.copy(timestamp), $c);
  return;
}

// #[test]
export function test_raw_A_branch_B$ (
  $c: AptosDataCache,
): void {
  let temp$1, f, fa, fat, ia, iat, timestamp;
  [ia, fa, iat, fat] = mock_curve_params$($c);
  timestamp = time$(u64("100"), $c);
  f = get_A$($.copy(ia), $.copy(fa), $.copy(iat), $.copy(fat), $.copy(timestamp), $c);
  temp$1 = u64("1999999");
  Std.Debug.print$(temp$1, $c, [AtomicTypeTag.U64] as TypeTag[]);
  Std.Debug.print$(f, $c, [AtomicTypeTag.U64] as TypeTag[]);
  return;
}

// #[test]
export function test_raw_A_branch_fa_expire$ (
  $c: AptosDataCache,
): void {
  let _fa, fa, fat, ia, iat, timestamp;
  [ia, _fa, iat, fat] = mock_curve_params$($c);
  fa = u64("2600000");
  timestamp = time$(u64("11111111111200"), $c);
  get_A$($.copy(ia), $.copy(fa), $.copy(iat), $.copy(fat), $.copy(timestamp), $c);
  return;
}

// #[test]
export function test_recur_D_bad$ (
  $c: AptosDataCache,
): void {
  recur_D_origin$(u128("1101210"), u128("1101010"), u128("200"), u128("1101210"), u128("10"), u128("1"), u128("255"), $c);
  recur_D_improved$(u128("1101210"), u128("1101010"), u128("200"), u128("1101210"), u128("10"), u128("1"), u128("255"), $c);
  return;
}

// #[test]
export function test_recur_D_improve$ (
  $c: AptosDataCache,
): void {
  let res, res__1, res__3, rnd, rnd__2, rnd__4;
  [res, rnd] = recur_D_improved$(u128("1101210"), u128("1101010"), u128("200"), u128("1101210"), u128("10"), u128("1"), u128("255"), $c);
  if (!$.copy(res).eq(u128("200888"))) {
    throw $.abortCode(u64("10000"));
  }
  if (!$.copy(rnd).eq(u128("8"))) {
    throw $.abortCode(u64("10000"));
  }
  [res__1, rnd__2] = recur_D_improved$(u128("11101210"), u128("11101010"), u128("200"), u128("11101210"), u128("2000"), u128("1"), u128("255"), $c);
  if (!$.copy(res__1).eq(u128("4815732"))) {
    throw $.abortCode(u64("10000"));
  }
  if (!$.copy(rnd__2).eq(u128("6"))) {
    throw $.abortCode(u64("10000"));
  }
  [res__3, rnd__4] = recur_D_improved$(u128("10002"), u128("10000"), u128("2"), u128("10002"), u128("20"), u128("1"), u128("255"), $c);
  if (!$.copy(res__3).eq(u128("2319"))) {
    throw $.abortCode(u64("10000"));
  }
  if (!$.copy(rnd__4).eq(u128("7"))) {
    throw $.abortCode(u64("10000"));
  }
  return;
}

// #[test]
export function test_recur_D_improve_loop_gt$ (
  $c: AptosDataCache,
): void {
  let _rnd, res;
  [res, _rnd] = recur_D_improved$(u128("22"), u128("12"), u128("11"), u128("23"), u128("2"), u128("1"), u128("255"), $c);
  Std.Debug.print$(res, $c, [AtomicTypeTag.U128] as TypeTag[]);
  return;
}

// #[test]
export function test_recur_D_newton$ (
  $c: AptosDataCache,
): void {
  let res, res__1, res__3, rnd, rnd__2, rnd__4;
  [res, rnd] = recur_D_newton_method$(u128("1101210"), u128("1101010"), u128("200"), u128("5"), u128("1"), u128("255"), $c);
  if (!$.copy(res).eq(u128("200888"))) {
    throw $.abortCode(u64("10000"));
  }
  if (!$.copy(rnd).eq(u128("8"))) {
    throw $.abortCode(u64("10000"));
  }
  [res__1, rnd__2] = recur_D_newton_method$(u128("11101210"), u128("11101010"), u128("200"), u128("1000"), u128("1"), u128("255"), $c);
  if (!$.copy(res__1).eq(u128("4815732"))) {
    throw $.abortCode(u64("10000"));
  }
  if (!$.copy(rnd__2).eq(u128("6"))) {
    throw $.abortCode(u64("10000"));
  }
  [res__3, rnd__4] = recur_D_newton_method$(u128("10002"), u128("10000"), u128("2"), u128("10"), u128("1"), u128("255"), $c);
  if (!$.copy(res__3).eq(u128("2319"))) {
    throw $.abortCode(u64("10000"));
  }
  if (!$.copy(rnd__4).eq(u128("7"))) {
    throw $.abortCode(u64("10000"));
  }
  return;
}

// #[test]
export function test_recur_D_ok_1$ (
  $c: AptosDataCache,
): void {
  let iter_times, iter_times2, result1, result2;
  [result1, iter_times] = recur_D_origin$(u128("32"), u128("120"), u128("20"), u128("32"), u128("1"), u128("0"), u128("20"), $c);
  if (!$.copy(result1).eq(u128("69"))) {
    throw $.abortCode(u64("10003"));
  }
  if (!$.copy(iter_times).eq(u128("4"))) {
    throw $.abortCode(u64("10003"));
  }
  [result2, iter_times2] = recur_D_improved$(u128("32"), u128("120"), u128("20"), u128("32"), u128("1"), u128("0"), u128("20"), $c);
  if (!$.copy(result2).eq(u128("68"))) {
    throw $.abortCode(u64("10003"));
  }
  if (!$.copy(iter_times2).eq(u128("4"))) {
    throw $.abortCode(u64("10003"));
  }
  return;
}

// #[test]
export function test_recur_D_ok_2$ (
  $c: AptosDataCache,
): void {
  let res1, res2, result, rnd2;
  [result, ] = recur_D_origin$(u128("101210"), u128("101010"), u128("200"), u128("101210"), u128("100"), u128("1"), u128("10"), $c);
  if (!$.copy(result).eq(u128("66112"))) {
    throw $.abortCode(u64("10000"));
  }
  [res1, ] = recur_D_improved$(u128("101210"), u128("101010"), u128("200"), u128("101210"), u128("100"), u128("1"), u128("10"), $c);
  if (!$.copy(res1).eq(u128("66112"))) {
    throw $.abortCode(u64("10003"));
  }
  [res2, rnd2] = recur_D_newton_method$(u128("101210"), u128("101010"), u128("200"), u128("50"), u128("1"), u128("100"), $c);
  if (!$.copy(res2).eq(u128("66112"))) {
    throw $.abortCode(u64("10004"));
  }
  if (!$.copy(rnd2).eq(u128("5"))) {
    throw $.abortCode(u64("10004"));
  }
  return;
}

// #[test]
export function test_recur_D_ok_3$ (
  $c: AptosDataCache,
): void {
  let res2, result, rnd2, round;
  [result, round] = recur_D_origin$(u128("101210000000"), u128("101010000000"), u128("200000000"), u128("101210000000"), u128("1"), u128("1"), u128("10"), $c);
  if (!$.copy(result).eq(u128("20147720974"))) {
    throw $.abortCode(u64("10009"));
  }
  if (!$.copy(round).eq(u128("9"))) {
    throw $.abortCode(u64("10009"));
  }
  [res2, rnd2] = recur_D_improved$(u128("101210000000"), u128("101010000000"), u128("200000000"), u128("101210000000"), u128("1"), u128("1"), u128("10"), $c);
  if (!$.copy(res2).eq(u128("20147720972"))) {
    throw $.abortCode(u64("10009"));
  }
  if (!$.copy(rnd2).eq(u128("9"))) {
    throw $.abortCode(u64("10009"));
  }
  return;
}

// #[test]
export function test_y_ok$ (
  $c: AptosDataCache,
): void {
  let result;
  result = get_y$(u64("1"), u64("60"), u128("8000"), $c);
  if (!$.copy(result).eq(u128("36866"))) {
    throw $.abortCode(u64("10003"));
  }
  return;
}

// #[test]
export function time$ (
  offset_seconds: U64,
  $c: AptosDataCache,
): U64 {
  let epoch;
  epoch = u64("1653289287000000");
  return $.copy(epoch).add($.copy(offset_seconds).mul(u64("1000000")));
}

export function unit_test_poison$ (
  $c: AptosDataCache,
): void {
  Std.UnitTest.create_signers_for_testing$(u64("0"), $c);
  return;
}

export function loadParsers(repo: AptosParserRepo) {
}

