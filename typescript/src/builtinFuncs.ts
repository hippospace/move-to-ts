import {
  TypeTag,
  StructTag,
  VectorTag,
  AtomicTypeTag,
  substituteTypeParams,
} from "./typeTag";
import bigInt from "big-integer";
import { U8, U64, U128, UnsignedInt, takeBigInt } from "./builtinTypes";
import { HexString } from "aptos";
import stringify from "json-stable-stringify";
import { StructInfoType } from "./parserRepo";
import { ActualStringClass } from "./nativeFuncs";

export function abortCode(code: any) {
  if (code instanceof U64) {
    // consier making it nicer by parsing the first and second byte??
    return new Error(`${code.value.toString()}`);
  }
  return code;
}

export function assert(cond: boolean, error: any) {
  if (!cond) {
    throw error;
  }
}

export function u8(
  from: UnsignedInt<any> | bigInt.BigInteger | string | number
) {
  return new U8(takeBigInt(from));
}

export function u64(
  from: UnsignedInt<any> | bigInt.BigInteger | string | number
) {
  return new U64(takeBigInt(from));
}

export function u128(
  from: UnsignedInt<any> | bigInt.BigInteger | string | number
) {
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
  } else if (typeof val === "boolean") {
    return val;
  } else if (val instanceof UnsignedInt) {
    return val.copy() as unknown as T;
  } else if (val instanceof Array) {
    return val.map((ele) => copy(ele)) as unknown as T;
  } else if (v.typeTag instanceof StructTag) {
    let proto = Object();
    const structInfo = v.constructor as StructInfoType;
    for (const field of structInfo.fields) {
      const fname = field.name;
      proto[fname] = copy(v[fname]);
    }
    let copied = new structInfo(proto, v.typeTag);
    return copied;
  } else {
    throw new Error(`Unreachable: ${val}`);
  }
}

export function printerReplacer(key: string, val: any) {
  if (key === "typeTag" || key === "__app") {
    return undefined;
  }
  if (val instanceof HexString) {
    return val.toShortString();
  } else if (typeof val === "boolean") {
    return val;
  } else if (typeof val === "string") {
    return val;
  } else if (val instanceof UnsignedInt) {
    if (val instanceof U8) {
      return val.toJsNumber();
    } else {
      return val.value.toString();
    }
  } else if (val instanceof Array) {
    // optimize for U8[]?
    return val;
  } else if (val.typeTag instanceof StructTag) {
    // check for String
    const tag = val.typeTag as StructTag;
    const tagFullname = tag.getFullname();
    if (tagFullname === "0x1::string::String") {
      const bytes = val.bytes as U8[];
      return u8str(bytes);
    } else if (tagFullname === "0x1::type_info::TypeInfo") {
      const account_address = (
        val.account_address as HexString
      ).toShortString();
      const module_name = u8str(val.module_name as U8[]);
      const struct_name = u8str(val.struct_name as U8[]);
      const type = `${account_address}::${module_name}::${struct_name}`;
      return {
        type,
        account_address,
        module_name,
        struct_name,
      };
    } else {
      return val;
    }
  } else {
    throw new Error(`Unreachable: ${val}`);
  }
}

export function print<T>(val: T) {
  console.log(JSON.stringify(val, printerReplacer, 2));
}

export function set(lhs: any, rhs: any) {
  if (lhs instanceof HexString) {
    if (!(rhs instanceof HexString)) {
      throw new Error("Expect both lhs and rhs to be HexString!");
    }
    (lhs as unknown as any).hexString = (rhs as unknown as any).hexString;
  } else if (typeof lhs === "boolean") {
    throw new Error("Mutating boolean value by reference not supported");
  } else if (lhs instanceof UnsignedInt) {
    if (!(rhs instanceof UnsignedInt)) {
      throw new Error("Expect both lhs and rhs to be UnsignedInt!");
    }
    lhs.$set(rhs);
  } else if (lhs instanceof Array) {
    if (!(rhs instanceof Array)) {
      throw new Error("Expect both lhs and rhs to be array type!");
    }
    // clear then copy by value
    lhs.length = 0;
    for (const val of rhs) {
      lhs.push(copy(val));
    }
  } else if (lhs.typeTag instanceof StructTag) {
    // struct set
    const structInfo = lhs.constructor as StructInfoType;
    for (const field of structInfo.fields) {
      lhs[field.name] = copy(rhs[field.name]);
    }
  }
}

export function u8str(array: U8[]): string {
  const u8array = new Uint8Array(array.map((u) => u.toJsNumber()));
  return new TextDecoder().decode(u8array);
}

export function strToU8(str: string): U8[] {
  const result: U8[] = [];
  for (let i = 0; i < str.length; i++) {
    result.push(u8(str.charCodeAt(i)));
  }
  return result;
}

export function payloadArg(val: any):any {
  if (val instanceof UnsignedInt) {
    if (val instanceof U8) {
      return val.toJsNumber();
    } else if (val instanceof U64 || val instanceof U128) {
      return val.value.toString();
    } else {
      throw new Error("Only expect U8, U64, or U128 for integer types");
    }
  } else if (val instanceof HexString) {
    return val.toShortString();
  } else if (val.hexString) {
    return val.toShortString();
  } else if (typeof val === "boolean") {
    return val;
  } else if (val.typeTag instanceof StructTag) {
    const tag = val.typeTag as StructTag;
    if (
      tag.address.toShortString() === "0x1" &&
      tag.module === "string" &&
      tag.name === "String"
    ) {
      const stringVal = val as ActualStringClass;
      const strVal = u8str(stringVal.bytes);
      return strVal;
    } else {
      throw new Error(`Unexpected struct type: ${tag.getFullname()}`);
    }
  } else if (val instanceof Array) {
    return val.map(payloadArg);
  }
  else {
    throw new Error(`Unexpected value type: ${typeof val}`);
  }
}

export function u8ArrayArg(val: U8[]): string {
  const uint8array = new Uint8Array(Array.from(val.map((u) => u.toJsNumber())));
  return HexString.fromUint8Array(uint8array).hex();
}

export function moveValueToOpenApiObject(val: any, typeTag: TypeTag): any {
  if (val instanceof U8) {
    return val.toJsNumber();
  } else if (val instanceof U64 || val instanceof U128) {
    return val.value.toString();
  } else if (val instanceof HexString) {
    return val.hex();
  }
  // vector
  else if (val instanceof Array) {
    if (!(typeTag instanceof VectorTag)) {
      throw new Error("Expected a vector value");
    }
    // special handler for U8[]
    if (typeTag.elementType === AtomicTypeTag.U8) {
      return u8ArrayArg(val);
    }
    return val.map((ele) => moveValueToOpenApiObject(ele, typeTag.elementType));
  }
  // object / struct
  else if (typeof val === "object") {
    if (!(typeTag instanceof StructTag)) {
      throw new Error("Expected a struct value");
    }
    // special handler for ASCII
    if (typeTag.getFullname() === "0x1::string::String") {
      const bytes = val.bytes as U8[];
      return u8str(bytes);
    }
    const result: any = new Object();
    const structInfo = val.constructor as StructInfoType;
    for (const field of structInfo.fields) {
      const name = field.name;
      const fieldTag = substituteTypeParams(field.typeTag, typeTag.typeParams);
      result[name] = moveValueToOpenApiObject(val[field.name], fieldTag);
    }
    return result;
  } else {
    throw new Error("Unreachable");
  }
}
