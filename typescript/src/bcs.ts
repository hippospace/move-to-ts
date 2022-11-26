import { HexString } from "aptos";
import { BCS } from "aptos";
import { U128, U64, U8 } from "./builtinTypes";
import { moveValueToOpenApiObject, u128, u64, u8 } from "./builtinFuncs";
import {
  AtomicTypeTag,
  SimpleStructTag,
  StructTag,
  substituteTypeParams,
  TypeParamIdx,
  TypeTag,
  VectorTag,
} from "./typeTag";
import { StructInfoType } from "./parserRepo";

/*
BCS serialization of Move values
*/

export function serializeVector(
  serializer: BCS.Serializer,
  v: any,
  elementTag: TypeTag
) {
  if (!(v instanceof Array)) {
    throw new Error("Expected v to be a vector/array");
  }
  serializer.serializeU32AsUleb128(v.length);
  for (const element of v) {
    serializeMoveValue(serializer, element, elementTag);
  }
}

export function serializeStruct(
  serializer: BCS.Serializer,
  v: any,
  tag: StructTag
) {
  if (typeof v !== "object") {
    throw new Error("serializeStruct expected an object input as v");
  }
  const ctor = v.constructor;
  if (!ctor) {
    throw new Error("Struct value should have a constructor!");
  }
  const structDef = ctor as unknown as StructInfoType;
  for (const field of structDef.fields) {
    const concreteTag = substituteTypeParams(field.typeTag, tag.typeParams);
    serializeMoveValue(serializer, v[field.name], concreteTag);
  }
}

function addressToUint8Array(h: HexString) {
  const noPrefix = h.noPrefix();
  // build a hexString of 64 hexadecimal digits
  const full = "0".repeat(64 - noPrefix.length) + noPrefix;
  const buf = Buffer.from(full, "hex");
  return Uint8Array.from(buf);
}

export function serializeMoveValue(
  serializer: BCS.Serializer,
  v: any,
  tag: TypeTag
) {
  if (tag === AtomicTypeTag.Address) {
    if (!(v instanceof HexString)) {
      throw new Error("Expected value to be HexString");
    }
    serializer.serializeFixedBytes(addressToUint8Array(v));
  } else if (tag === AtomicTypeTag.Signer) {
    throw new Error("Cannot serialize signer!");
  } else if (tag === AtomicTypeTag.Bool) {
    if (!(typeof v === "boolean")) {
      throw new Error("Expected value to be boolean");
    }
    serializer.serializeBool(v);
  } else if (tag === AtomicTypeTag.U8) {
    if (!(v instanceof U8)) {
      throw new Error("Expected value to be U8");
    }
    serializer.serializeU8(v.toJsNumber());
  } else if (tag === AtomicTypeTag.U64) {
    if (!(v instanceof U64)) {
      throw new Error("Expected value to be U64");
    }
    serializer.serializeU64(v.toBigInt());
  } else if (tag === AtomicTypeTag.U128) {
    if (!(v instanceof U128)) {
      throw new Error("Expected value to be U128");
    }
    serializer.serializeU128(v.toBigInt());
  } else if (tag instanceof VectorTag) {
    serializeVector(serializer, v, tag.elementType);
  } else if (tag instanceof StructTag) {
    serializeStruct(serializer, v, tag);
  } else if (v instanceof TypeParamIdx) {
    throw new Error(
      "BCS serialization expected concrete TypeTag but received TypeParamIdx"
    );
  } else {
    throw new Error("Unreachable");
  }
}

export function serializeMoveValueWithoutTag(
  serializer: BCS.Serializer,
  value: any
) {
  if (value instanceof U8) {
    serializeMoveValue(serializer, value, AtomicTypeTag.U8);
  } else if (value instanceof U64) {
    serializeMoveValue(serializer, value, AtomicTypeTag.U64);
  } else if (value instanceof U128) {
    serializeMoveValue(serializer, value, AtomicTypeTag.U128);
  } else if (typeof value === "boolean") {
    serializeMoveValue(serializer, value, AtomicTypeTag.Bool);
  } else if (value instanceof HexString) {
    serializeMoveValue(serializer, value, AtomicTypeTag.Address);
  } else if (value.hexString) {
    const addr = new HexString(value.hex());
    serializeMoveValue(serializer, addr, AtomicTypeTag.Address);
  }
  // struct
  else if ((value as unknown as any).typeTag instanceof StructTag) {
    const tag = (value as unknown as any).typeTag as StructTag;
    serializeStruct(serializer, value, tag);
  }
  // vector
  else if (value instanceof Array) {
    serializer.serializeU32AsUleb128(value.length);
    for (const element of value) {
      serializeMoveValueWithoutTag(serializer, element);
    }
  } else {
    throw new Error(`Unrecognized value type: ${value}`);
  }
}

/*
BCS deserialization of Move values
*/

export function deserializeMoveValue(
  deserializer: BCS.Deserializer,
  tag: TypeTag
): any {
  if (tag === AtomicTypeTag.Address) {
    const bytes = deserializer.deserializeFixedBytes(32);
    return HexString.fromUint8Array(bytes);
  } else if (tag === AtomicTypeTag.Signer) {
    throw new Error("Cannot deserialize signer!");
  } else if (tag === AtomicTypeTag.Bool) {
    const result = deserializer.deserializeBool();
    return result;
  } else if (tag === AtomicTypeTag.U8) {
    const result = deserializer.deserializeU8();
    return u8(result.toString());
  } else if (tag === AtomicTypeTag.U64) {
    const result = deserializer.deserializeU64();
    return u64(result.toString());
  } else if (tag === AtomicTypeTag.U128) {
    const result = deserializer.deserializeU128();
    return u128(result.toString());
  } else if (tag instanceof VectorTag) {
    const length = deserializer.deserializeUleb128AsU32();
    const result: any[] = [];
    for (let i = 0; i < length; i++) {
      result.push(deserializeMoveValue(deserializer, tag.elementType));
    }
    return result;
  } else if (tag instanceof StructTag) {
    if (tag instanceof SimpleStructTag) {
      const structInfo = tag.structInfo;
      const proto: any = {};
      for (const field of structInfo.fields) {
        const concreteTag = substituteTypeParams(field.typeTag, tag.typeParams);
        const fieldVal = deserializeMoveValue(deserializer, concreteTag);
        proto[field.name] = fieldVal;
      }
      return new structInfo(proto, tag);
    } else {
      throw new Error(
        "Not implemented. Deserialization only works for SimpleStructTag"
      );
    }
  } else {
    throw new Error("Unreachable");
  }
}
