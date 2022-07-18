import bigInt from "big-integer";

interface IntInterface<T> {
  value: bigInt.BigInteger;
  make(value: bigInt.BigInteger) : T;
}


export function takeBigInt(from: UnsignedInt<any> | bigInt.BigInteger | string | number): bigInt.BigInteger {
  if (typeof from === 'string') {
    return bigInt(from);
  }
  else if (typeof from === 'number') {
    return bigInt(from);
  }
  else if (from instanceof UnsignedInt) {
    return from.value;
  }
  else {
    return from;
  }
}

export class UnsignedInt<T extends IntInterface<T>> {
  public value: bigInt.BigInteger;
  constructor(value: bigInt.BigInteger | UnsignedInt<any> | string | number) {
    this.value = takeBigInt(value);
    this.checkBounds();
  }

  checkBounds() {
  }
  make(value: bigInt.BigInteger) {
    return new UnsignedInt<T>(value);
  }

  copy() : UnsignedInt<T> {
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
    // FIXME: need to match this with move's implementation
    return this.make(this.value.shiftLeft(other.value));
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
}

export class U64 extends UnsignedInt<U64> {
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
}

export class U128 extends UnsignedInt<U128> {
  static MIN = bigInt(0);
  static MAX = bigInt("340282366920938463463374607431768211455")

  make(value: bigInt.BigInteger) {
    return new U128(value);
  }

  checkBounds() {
    if (this.value.lt(U128.MIN) || this.value.gt(U128.MAX)) {
      throw new Error(`Value out of bounds for U128: ${this.value}`);
    }
  }
}