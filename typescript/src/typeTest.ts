import { HexString } from "aptos";
import { IntInterface, U128, U16, U256, U32, U64, U8, UnsignedInt } from "./builtinTypes";

export function isHexString(a: any): a is HexString {
    return a && a.hexString && a.hex;
}

export function isUnsignedInt(a: any):a is UnsignedInt<IntInterface<any>> {
    return a && (
        U8.isInstance(a) ||
        U16.isInstance(a) ||
        U32.isInstance(a) ||
        U64.isInstance(a) ||
        U128.isInstance(a) ||
        U256.isInstance(a)
    );
}

export function isAnyUnsignedInt(a: any):a is UnsignedInt<any> {
    return a && (
        U8.isInstance(a) ||
        U16.isInstance(a) ||
        U32.isInstance(a) ||
        U64.isInstance(a) ||
        U128.isInstance(a) ||
        U256.isInstance(a)
    );
}