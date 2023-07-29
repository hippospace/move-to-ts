import bigInt from "big-integer";
import { isAnyUnsignedInt, isUnsignedInt } from "./typeTest";

export interface IntInterface<T> {
  kind: string;
  value: bigInt.BigInteger;
  make(value: bigInt.BigInteger): T;
}

export function takeBigInt(
  from: UnsignedInt<any> | bigInt.BigInteger | string | number
): bigInt.BigInteger {
  if (typeof from === "string") {
    return bigInt(from);
  } else if (typeof from === "number") {
    return bigInt(from);
  } else if (isAnyUnsignedInt(from)) {
    return from.value;
  } else {
    return from;
  }
}

export class UnsignedInt<T extends IntInterface<T>> {
  public kind: string;
  public value: bigInt.BigInteger;
  constructor(value: bigInt.BigInteger | UnsignedInt<any> | string | number) {
    this.value = takeBigInt(value);
    this.checkBounds();
    const subKind = (this as any).kind;
    if (subKind) {
      this.kind = subKind;
    }
    else {
      this.kind = 'nokind';
    }
  }

  checkBounds() {}
  min() { return bigInt(); }
  max() { return bigInt(); }
  make(value: bigInt.BigInteger) {
    return new UnsignedInt<T>(value);
  }

  copy(): UnsignedInt<T> {
    return this.make(this.value);
  }

  toPayloadArg() {
    return this.value.toString();
  }

  toJsNumber() {
    return this.value.toJSNumber();
  }

  toBigInt() {
    return BigInt(this.value.toString());
  }

  $set(val: T) {
    this.value = val.value;
    this.checkBounds();
  }

  or(other: T): T {
    return other.make(this.value.or(other.value));
  }
  and(other: T): T {
    return other.make(this.value.and(other.value));
  }
  xor(other: T): T {
    return other.make(this.value.xor(other.value));
  }
  add(other: T): T {
    return other.make(this.value.add(other.value));
  }
  sub(other: T): T {
    return other.make(this.value.subtract(other.value));
  }
  mul(other: T): T {
    return other.make(this.value.multiply(other.value));
  }
  div(other: T): T {
    if (other.value.eq(bigInt.zero)) {
      throw new Error("Division by 0");
    }
    return other.make(this.value.divide(other.value));
  }
  mod(other: T): T {
    return other.make(this.value.mod(other.value));
  }
  shl(other: UnsignedInt<any>): UnsignedInt<T> {
    return this.make(this.value.shiftLeft(other.value).and(this.max()));
  }
  shr(other: UnsignedInt<any>): UnsignedInt<T> {
    // FIXME: need to match this with move's implementation
    return this.make(this.value.shiftRight(other.value));
  }
  lt(other: T): boolean {
    return this.value.lt(other.value);
  }
  le(other: T): boolean {
    return this.value.leq(other.value);
  }
  eq(other: T): boolean {
    return this.value.eq(other.value);
  }
  neq(other: T): boolean {
    return this.value.neq(other.value);
  }
  gt(other: T): boolean {
    return this.value.gt(other.value);
  }
  ge(other: T): boolean {
    return this.value.geq(other.value);
  }
}

export class U8 extends UnsignedInt<U8> {
  kind = 'U8';

  static isInstance(v: any): v is U8 {
    return v && v.kind === 'U8';
  }

  static MIN = bigInt(0);
  static MAX = bigInt(255);

  make(value: bigInt.BigInteger) {
    return new U8(value);
  }

  checkBounds() {
    if (this.value.lt(U8.MIN) || this.value.gt(U8.MAX)) {
      throw new Error(`Value out of bounds for U8: ${this.value}`);
    }
  }

  min() { return U8.MIN; }
  max() { return U8.MAX; }
}

export class U16 extends UnsignedInt<U16> {
  kind = 'U16';

  static isInstance(v: any): v is U16 {
    return v && v.kind === 'U16';
  }

  static MIN = bigInt(0);
  static MAX = bigInt("65536");

  make(value: bigInt.BigInteger) {
    return new U16(value);
  }

  checkBounds() {
    if (this.value.lt(U16.MIN) || this.value.gt(U16.MAX)) {
      throw new Error(`Value out of bounds for U16: ${this.value}`);
    }
  }

  min() { return U16.MIN; }
  max() { return U16.MAX; }
}

export class U32 extends UnsignedInt<U32> {
  kind = 'U32';

  static isInstance(v: any): v is U32 {
    return v && v.kind === 'U32';
  }

  static MIN = bigInt(0);
  static MAX = bigInt("4294967296");

  make(value: bigInt.BigInteger) {
    return new U32(value);
  }

  checkBounds() {
    if (this.value.lt(U32.MIN) || this.value.gt(U32.MAX)) {
      throw new Error(`Value out of bounds for U32: ${this.value}`);
    }
  }

  min() { return U32.MIN; }
  max() { return U32.MAX; }
}

export class U64 extends UnsignedInt<U64> {
  kind = 'U64';

  static isInstance(v: any): v is U64 {
    return v && v.kind === 'U64';
  }

  static MIN = bigInt(0);
  static MAX = bigInt("18446744073709551615");

  make(value: bigInt.BigInteger) {
    return new U64(value);
  }

  checkBounds() {
    if (this.value.lt(U64.MIN) || this.value.gt(U64.MAX)) {
      throw new Error(`Value out of bounds for U64: ${this.value}`);
    }
  }

  min() { return U64.MIN; }
  max() { return U64.MAX; }
}

export class U128 extends UnsignedInt<U128> {
  kind = 'U128';

  static isInstance(v: any): v is U128 {
    return v && v.kind === 'U128';
  }

  static MIN = bigInt(0);
  static MAX = bigInt("340282366920938463463374607431768211455");

  make(value: bigInt.BigInteger) {
    return new U128(value);
  }

  checkBounds() {
    if (this.value.lt(U128.MIN) || this.value.gt(U128.MAX)) {
      throw new Error(`Value out of bounds for U128: ${this.value}`);
    }
  }

  min() { return U128.MIN; }
  max() { return U128.MAX; }
}

export class U256 extends UnsignedInt<U256> {
  kind = 'U256';

  static isInstance(v: any): v is U256 {
    return v && v.kind === 'U256';
  }

  static MIN = bigInt(0);
  static MAX = bigInt("115792089237316195423570985008687907853269984665640564039457584007913129639935");

  make(value: bigInt.BigInteger) {
    return new U256(value);
  }

  checkBounds() {
    if (this.value.lt(U256.MIN) || this.value.gt(U256.MAX)) {
      throw new Error(`Value out of bounds for U256: ${this.value}`);
    }
  }

  min() { return U256.MIN; }
  max() { return U256.MAX; }
}
