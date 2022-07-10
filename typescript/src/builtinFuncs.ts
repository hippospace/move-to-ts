import { TypeTag } from "./typeTag";
import bigInt from "big-integer";
import { U8, U64, U128, UnsignedInt } from "./builtinTypes";

export function abort(code: any) {
  throw code;
}

export function assert(cond: boolean, error: any) {
  if (!cond) {
    throw error;
  }
}

function takeBigInt(from: UnsignedInt<any> | string) {
  if (typeof from === 'string') {
    return bigInt(from);
  }
  else {
    return from.value;
  }
}

export function u8(from: UnsignedInt<any> | string) {
  return new U8(takeBigInt(from));
}

export function u64(from: UnsignedInt<any> | string) {
  return new U64(takeBigInt(from));
}

export function u128(from: UnsignedInt<any> | string) {
  return new U128(takeBigInt(from));
}

export function deep_eq(_lhs: any, _rhs: any): boolean {
  throw new Error("Not implemented");
}

export function dyn_add(_tag: TypeTag, _lhs: any, _rhs: any) {
  throw new Error("Not implemented");
}
export function dyn_sub(_tag: TypeTag, _lhs: any, _rhs: any) {
  throw new Error("Not implemented");
}

export function dyn_mul(_tag: TypeTag, _lhs: any, _rhs: any) {
  throw new Error("Not implemented");
}

export function dyn_mod(_tag: TypeTag, _lhs: any, _rhs: any) {
  throw new Error("Not implemented");
}

export function dyn_div(_tag: TypeTag, _lhs: any, _rhs: any) {
  throw new Error("Not implemented");
}

export function dyn_bitor(_tag: TypeTag, _lhs: any, _rhs: any) {
  throw new Error("Not implemented");
}

export function dyn_bitand(_tag: TypeTag, _lhs: any, _rhs: any) {
  throw new Error("Not implemented");
}

export function dyn_xor(_tag: TypeTag, _lhs: any, _rhs: any) {
  throw new Error("Not implemented");
}

export function dyn_shl(_tag: TypeTag, _lhs: any, _rhs: any) {
  throw new Error("Not implemented");
}

export function dyn_shr(_tag: TypeTag, _lhs: any, _rhs: any) {
  throw new Error("Not implemented");
}

export function dyn_and(_tag: TypeTag, _lhs: any, _rhs: any) {
  throw new Error("Not implemented");
}

export function dyn_or(_tag: TypeTag, _lhs: any, _rhs: any) {
  throw new Error("Not implemented");
}

export function dyn_eq(_tag: TypeTag, _lhs: any, _rhs: any): boolean {
  throw new Error("Not implemented");
}

export function dyn_neq(_tag: TypeTag, _lhs: any, _rhs: any): boolean {
  throw new Error("Not implemented");
}

export function dyn_lt(_tag: TypeTag, _lhs: any, _rhs: any): boolean {
  throw new Error("Not implemented");
}

export function dyn_gt(_tag: TypeTag, _lhs: any, _rhs: any): boolean {
  throw new Error("Not implemented");
}

export function dyn_le(_tag: TypeTag, _lhs: any, _rhs: any): boolean {
  throw new Error("Not implemented");
}

export function dyn_ge(_tag: TypeTag, _lhs: any, _rhs: any): boolean {
  throw new Error("Not implemented");
}
