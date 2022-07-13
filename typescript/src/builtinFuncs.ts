import { TypeTag, StructTag } from "./typeTag";
import bigInt from "big-integer";
import { U8, U64, U128, UnsignedInt } from "./builtinTypes";
import { HexString } from "aptos";
import stringify from "json-stable-stringify";
import { StructInfoType } from "./parserRepo";

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

export function deep_eq(lhs: any, rhs: any): boolean {
  return stringify(lhs) === stringify(rhs);
}

export function dyn_add<T>(_tag: TypeTag, lhs: any, _rhs: any) {
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

export function dyn_eq(tag: TypeTag, lhs: any, rhs: any): boolean {
  return deep_eq(lhs, rhs);
}

export function dyn_neq(tag: TypeTag, lhs: any, rhs: any): boolean {
  return !dyn_eq(tag, lhs, rhs);
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

export function veq(lhs: any, rhs: any): boolean {
  return deep_eq(lhs, rhs);
}

export function copy<T>(val: T): T {
  const v = val as unknown as any;
  if (val instanceof HexString) {
    // address & signer are immutable
    return val;
  }
  else if (typeof val === 'boolean') {
    return val
  }
  else if (val instanceof UnsignedInt) {
    return val.copy() as unknown as T;
  }
  else if (val instanceof Array) {
    return val.map(ele => copy(ele)) as unknown as T;
  }
  else if (v.typeTag instanceof StructTag) {
    let proto = Object();
    const structInfo = v.constructor as StructInfoType;
    for (const field of structInfo.fields) {
      const fname = field.name;
      proto[fname] = copy(v[fname]);
    }
    let copied = new structInfo(proto, v.typeTag);
    copied.constructor = structInfo;
    return copied;
  }
  else {
    throw new Error(`Unreachable: ${val}`);
  }
}