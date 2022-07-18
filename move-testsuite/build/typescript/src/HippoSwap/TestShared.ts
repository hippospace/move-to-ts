import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient} from "aptos";
import * as AptosFramework from "../AptosFramework";
import * as Std from "../Std";
import * as TokenRegistry from "../TokenRegistry";
import * as CPScripts from "./CPScripts";
import * as CPSwap from "./CPSwap";
import * as MockCoin from "./MockCoin";
import * as MockDeploy from "./MockDeploy";
import * as PieceSwap from "./PieceSwap";
import * as PieceSwapScript from "./PieceSwapScript";
import * as StableCurveScripts from "./StableCurveScripts";
import * as StableCurveSwap from "./StableCurveSwap";
export const packageName = "HippoSwap";
export const moduleAddress = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
export const moduleName = "TestShared";

export const ADMIN : HexString = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
export const BILLION : U64 = u64("1000000000");
export const DEC : U8 = u8("1");
export const E_BALANCE_PREDICTION : U64 = u64("2");
export const E_DELTA_AMOUNT : U64 = u64("3");
export const E_FEE_LP : U64 = u64("16");
export const E_FEE_X : U64 = u64("14");
export const E_FEE_Y : U64 = u64("15");
export const E_NOT_IMPLEMENTED : U64 = u64("0");
export const E_RESERVE_LP : U64 = u64("13");
export const E_RESERVE_X : U64 = u64("11");
export const E_RESERVE_Y : U64 = u64("12");
export const E_UNKNOWN_POOL_TYPE : U64 = u64("1");
export const E_WALLET_LP : U64 = u64("23");
export const E_WALLET_X : U64 = u64("21");
export const E_WALLET_Y : U64 = u64("22");
export const INC : U8 = u8("0");
export const INVESTOR : HexString = new HexString("0x2fff");
export const LABEL_COMPARE : U128 = u128("333000000000000000000000000000000000000");
export const LABEL_FEE : U128 = u128("333000000000000000000000000000000000004");
export const LABEL_LPTOKEN_SUPPLY : U128 = u128("333000000000000000000000000000000000005");
export const LABEL_POOL : U128 = u128("333000000000000000000000000000000000002");
export const LABEL_RESERVE_XY : U128 = u128("333000000000000000000000000000000000003");
export const LABEL_SAVE_POINT : U128 = u128("333000000000000000000000000000000000001");
export const MILLION : U64 = u64("1000000");
export const P10 : U64 = u64("10000000000");
export const P11 : U64 = u64("100000000000");
export const P12 : U64 = u64("1000000000000");
export const P13 : U64 = u64("10000000000000");
export const P14 : U64 = u64("100000000000000");
export const P15 : U64 = u64("1000000000000000");
export const P16 : U64 = u64("10000000000000000");
export const P17 : U64 = u64("100000000000000000");
export const P18 : U64 = u64("1000000000000000000");
export const P19 : U64 = u64("10000000000000000000");
export const P3 : U64 = u64("1000");
export const P4 : U64 = u64("10000");
export const P5 : U64 = u64("100000");
export const P6 : U64 = u64("1000000");
export const P7 : U64 = u64("10000000");
export const P8 : U64 = u64("100000000");
export const P9 : U64 = u64("1000000000");
export const POOL_TYPE_CONSTANT_PRODUCT : U8 = u8("1");
export const POOL_TYPE_PIECEWISE : U8 = u8("3");
export const POOL_TYPE_STABLE_CURVE : U8 = u8("2");
export const SWAPPER : HexString = new HexString("0x2ffe");
export const THOUSAND : U64 = u64("1000");
export const TRILLION : U64 = u64("1000000000000");


export class PoolSavePoint 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "PoolSavePoint";
  static typeParameters: TypeParamDeclType[] = [
    { name: "LpTokenType", isPhantom: true }
  ];
  static fields: FieldDeclType[] = [
  { name: "reserve_x", typeTag: AtomicTypeTag.U64 },
  { name: "reserve_y", typeTag: AtomicTypeTag.U64 },
  { name: "reserve_lp", typeTag: AtomicTypeTag.U64 },
  { name: "fee_x", typeTag: AtomicTypeTag.U64 },
  { name: "fee_y", typeTag: AtomicTypeTag.U64 },
  { name: "fee_lp", typeTag: AtomicTypeTag.U64 }];

  reserve_x: U64;
  reserve_y: U64;
  reserve_lp: U64;
  fee_x: U64;
  fee_y: U64;
  fee_lp: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.reserve_x = proto['reserve_x'] as U64;
    this.reserve_y = proto['reserve_y'] as U64;
    this.reserve_lp = proto['reserve_lp'] as U64;
    this.fee_x = proto['fee_x'] as U64;
    this.fee_y = proto['fee_y'] as U64;
    this.fee_lp = proto['fee_lp'] as U64;
  }

  static PoolSavePointParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : PoolSavePoint {
    const proto = $.parseStructProto(data, typeTag, repo, PoolSavePoint);
    return new PoolSavePoint(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, PoolSavePoint, typeParams);
    return result as unknown as PoolSavePoint;
  }
}

export class PoolValue 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "PoolValue";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "reserve_x", typeTag: AtomicTypeTag.U64 },
  { name: "reserve_y", typeTag: AtomicTypeTag.U64 },
  { name: "reserve_lp", typeTag: AtomicTypeTag.U64 },
  { name: "fee_x", typeTag: AtomicTypeTag.U64 },
  { name: "fee_y", typeTag: AtomicTypeTag.U64 },
  { name: "fee_lp", typeTag: AtomicTypeTag.U64 }];

  reserve_x: U64;
  reserve_y: U64;
  reserve_lp: U64;
  fee_x: U64;
  fee_y: U64;
  fee_lp: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.reserve_x = proto['reserve_x'] as U64;
    this.reserve_y = proto['reserve_y'] as U64;
    this.reserve_lp = proto['reserve_lp'] as U64;
    this.fee_x = proto['fee_x'] as U64;
    this.fee_y = proto['fee_y'] as U64;
    this.fee_lp = proto['fee_lp'] as U64;
  }

  static PoolValueParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : PoolValue {
    const proto = $.parseStructProto(data, typeTag, repo, PoolValue);
    return new PoolValue(proto, typeTag);
  }

}

export class WalletBalanceSavePoint 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "WalletBalanceSavePoint";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "coin_x", typeTag: AtomicTypeTag.U64 },
  { name: "coin_y", typeTag: AtomicTypeTag.U64 },
  { name: "coin_lp", typeTag: AtomicTypeTag.U64 }];

  coin_x: U64;
  coin_y: U64;
  coin_lp: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.coin_x = proto['coin_x'] as U64;
    this.coin_y = proto['coin_y'] as U64;
    this.coin_lp = proto['coin_lp'] as U64;
  }

  static WalletBalanceSavePointParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : WalletBalanceSavePoint {
    const proto = $.parseStructProto(data, typeTag, repo, WalletBalanceSavePoint);
    return new WalletBalanceSavePoint(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, WalletBalanceSavePoint, typeParams);
    return result as unknown as WalletBalanceSavePoint;
  }
}
// #[test]
export function assert_delta$ (
  sign: U8,
  delta: U64,
  current: U64,
  origin: U64,
  error_type: U64,
  $c: AptosDataCache,
): void {
  if ($.copy(sign).eq(INC)) {
    if (!difference$($.copy(delta), $.copy(current).sub($.copy(origin)), $c).le(u64("1"))) {
      throw $.abortCode($.copy(error_type));
    }
  }
  else{
    if (!difference$($.copy(delta), $.copy(origin).sub($.copy(current)), $c).le(u64("1"))) {
      throw $.abortCode($.copy(error_type));
    }
  }
  return;
}

// #[test]
export function assert_pool_delta$ (
  pool_type: U8,
  with_sync: boolean,
  sign_reserve_x: U8,
  sign_reserve_y: U8,
  sign_reserve_lp: U8,
  sign_fee_x: U8,
  sign_fee_y: U8,
  sign_fee_lp: U8,
  delta_reserve_x: U64,
  delta_reserve_y: U64,
  delta_reserve_lp: U64,
  delta_fee_x: U64,
  delta_fee_y: U64,
  delta_fee_lp: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let fee_lp, fee_x, fee_y, reserve_x, reserve_y, save_point, save_point__1, save_point__2, supply;
  [fee_x, fee_y, fee_lp] = get_pool_fee_route$($.copy(pool_type), $c, [$p[0], $p[1]] as TypeTag[]);
  [reserve_x, reserve_y] = get_pool_reserve_route$($.copy(pool_type), $c, [$p[0], $p[1]] as TypeTag[]);
  supply = get_pool_lp_supply_route$($.copy(pool_type), $c, [$p[0], $p[1]] as TypeTag[]);
  if ($.copy(pool_type).eq(POOL_TYPE_CONSTANT_PRODUCT)) {
    save_point = $c.borrow_global_mut<PoolSavePoint>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TestShared", "PoolSavePoint", [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "LPToken", [$p[0], $p[1]])]), ADMIN);
    assert_pool_delta_content$(save_point, $.copy(sign_reserve_x), $.copy(sign_reserve_y), $.copy(sign_reserve_lp), $.copy(sign_fee_x), $.copy(sign_fee_y), $.copy(sign_fee_lp), $.copy(delta_reserve_x), $.copy(delta_reserve_y), $.copy(delta_reserve_lp), $.copy(delta_fee_x), $.copy(delta_fee_y), $.copy(delta_fee_lp), $.copy(reserve_x), $.copy(reserve_y), $.copy(supply), $.copy(fee_x), $.copy(fee_y), $.copy(fee_lp), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
  }
  else{
    if ($.copy(pool_type).eq(POOL_TYPE_STABLE_CURVE)) {
      save_point__1 = $c.borrow_global_mut<PoolSavePoint>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TestShared", "PoolSavePoint", [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "LPToken", [$p[0], $p[1]])]), ADMIN);
      assert_pool_delta_content$(save_point__1, $.copy(sign_reserve_x), $.copy(sign_reserve_y), $.copy(sign_reserve_lp), $.copy(sign_fee_x), $.copy(sign_fee_y), $.copy(sign_fee_lp), $.copy(delta_reserve_x), $.copy(delta_reserve_y), $.copy(delta_reserve_lp), $.copy(delta_fee_x), $.copy(delta_fee_y), $.copy(delta_fee_lp), $.copy(reserve_x), $.copy(reserve_y), $.copy(supply), $.copy(fee_x), $.copy(fee_y), $.copy(fee_lp), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
    }
    else{
      if ($.copy(pool_type).eq(POOL_TYPE_PIECEWISE)) {
        save_point__2 = $c.borrow_global_mut<PoolSavePoint>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TestShared", "PoolSavePoint", [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "PieceSwap", "LPToken", [$p[0], $p[1]])]), ADMIN);
        assert_pool_delta_content$(save_point__2, $.copy(sign_reserve_x), $.copy(sign_reserve_y), $.copy(sign_reserve_lp), $.copy(sign_fee_x), $.copy(sign_fee_y), $.copy(sign_fee_lp), $.copy(delta_reserve_x), $.copy(delta_reserve_y), $.copy(delta_reserve_lp), $.copy(delta_fee_x), $.copy(delta_fee_y), $.copy(delta_fee_lp), $.copy(reserve_x), $.copy(reserve_y), $.copy(supply), $.copy(fee_x), $.copy(fee_y), $.copy(fee_lp), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "PieceSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
      }
      else{
        throw $.abortCode(E_UNKNOWN_POOL_TYPE);
      }
    }
  }
  if (with_sync) {
    sync_save_point$($.copy(pool_type), $c, [$p[0], $p[1]] as TypeTag[]);
  }
  else{
  }
  return;
}

// #[test]
export function assert_pool_delta_content$ (
  sp: PoolSavePoint,
  sign_reserve_x: U8,
  sign_reserve_y: U8,
  sign_reserve_lp: U8,
  sign_fee_x: U8,
  sign_fee_y: U8,
  sign_fee_lp: U8,
  delta_reserve_x: U64,
  delta_reserve_y: U64,
  delta_reserve_lp: U64,
  delta_fee_x: U64,
  delta_fee_y: U64,
  delta_fee_lp: U64,
  reserve_x: U64,
  reserve_y: U64,
  reserve_lp: U64,
  fee_x: U64,
  fee_y: U64,
  fee_lp: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <LpToken>*/
): void {
  assert_delta$($.copy(sign_reserve_x), $.copy(delta_reserve_x), $.copy(reserve_x), $.copy(sp.reserve_x), E_RESERVE_X, $c);
  assert_delta$($.copy(sign_reserve_y), $.copy(delta_reserve_y), $.copy(reserve_y), $.copy(sp.reserve_y), E_RESERVE_Y, $c);
  assert_delta$($.copy(sign_reserve_lp), $.copy(delta_reserve_lp), $.copy(reserve_lp), $.copy(sp.reserve_lp), E_RESERVE_LP, $c);
  assert_delta$($.copy(sign_fee_x), $.copy(delta_fee_x), $.copy(fee_x), $.copy(sp.fee_x), E_FEE_X, $c);
  assert_delta$($.copy(sign_fee_y), $.copy(delta_fee_y), $.copy(fee_y), $.copy(sp.fee_y), E_FEE_Y, $c);
  assert_delta$($.copy(sign_fee_lp), $.copy(delta_fee_lp), $.copy(fee_lp), $.copy(sp.fee_lp), E_FEE_LP, $c);
  return;
}

// #[test]
export function assert_pool_fee$ (
  pool_type: U8,
  predict_x: U64,
  predict_y: U64,
  predict_lp: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let fee_lp, fee_x, fee_y;
  [fee_x, fee_y, fee_lp] = get_pool_fee_route$($.copy(pool_type), $c, [$p[0], $p[1]] as TypeTag[]);
  if (!$.copy(predict_x).eq($.copy(fee_x))) {
    throw $.abortCode(E_BALANCE_PREDICTION);
  }
  if (!$.copy(predict_y).eq($.copy(fee_y))) {
    throw $.abortCode(E_BALANCE_PREDICTION);
  }
  if (!$.copy(predict_lp).eq($.copy(fee_lp))) {
    throw $.abortCode(E_BALANCE_PREDICTION);
  }
  return;
}

// #[test]
export function assert_pool_lp_supply$ (
  pool_type: U8,
  predict_lp: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let supply;
  supply = get_pool_lp_supply_route$($.copy(pool_type), $c, [$p[0], $p[1]] as TypeTag[]);
  if (!$.copy(supply).eq($.copy(predict_lp))) {
    throw $.abortCode(E_BALANCE_PREDICTION);
  }
  return;
}

// #[test]
export function assert_pool_reserve$ (
  pool_type: U8,
  predict_x: U64,
  predict_y: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let reserve_x, reserve_y;
  [reserve_x, reserve_y] = get_pool_reserve_route$($.copy(pool_type), $c, [$p[0], $p[1]] as TypeTag[]);
  if (!$.copy(predict_x).eq($.copy(reserve_x))) {
    throw $.abortCode(E_BALANCE_PREDICTION);
  }
  if (!$.copy(predict_y).eq($.copy(reserve_y))) {
    throw $.abortCode(E_BALANCE_PREDICTION);
  }
  return;
}

// #[test]
export function assert_wallet_delta$ (
  sender: HexString,
  pool_type: U8,
  with_sync: boolean,
  sign_coin_x: U8,
  sign_coin_y: U8,
  sign_coin_lp: U8,
  delta_coin_x: U64,
  delta_coin_y: U64,
  delta_coin_lp: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let balance_lp, balance_x, balance_y;
  [balance_x, balance_y, balance_lp] = get_balance$(sender, $.copy(pool_type), $c, [$p[0], $p[1]] as TypeTag[]);
  assert_wallet_delta_content$(sender, $.copy(sign_coin_x), $.copy(sign_coin_y), $.copy(sign_coin_lp), $.copy(delta_coin_x), $.copy(delta_coin_y), $.copy(delta_coin_lp), $.copy(balance_x), $.copy(balance_y), $.copy(balance_lp), $c, [$p[0], $p[1]] as TypeTag[]);
  if (with_sync) {
    sync_wallet_save_point$(sender, $.copy(pool_type), $c, [$p[0], $p[1]] as TypeTag[]);
  }
  else{
  }
  return;
}

// #[test]
export function assert_wallet_delta_content$ (
  sender: HexString,
  sign_coin_x: U8,
  sign_coin_y: U8,
  sign_coin_lp: U8,
  delta_coin_x: U64,
  delta_coin_y: U64,
  delta_coin_lp: U64,
  balance_x: U64,
  balance_y: U64,
  balance_lp: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let addr, sp;
  addr = Std.Signer.address_of$(sender, $c);
  sp = $c.borrow_global_mut<WalletBalanceSavePoint>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TestShared", "WalletBalanceSavePoint", []), $.copy(addr));
  assert_delta$($.copy(sign_coin_x), $.copy(delta_coin_x), $.copy(balance_x), $.copy(sp.coin_x), E_WALLET_X, $c);
  assert_delta$($.copy(sign_coin_y), $.copy(delta_coin_y), $.copy(balance_y), $.copy(sp.coin_y), E_WALLET_Y, $c);
  assert_delta$($.copy(sign_coin_lp), $.copy(delta_coin_lp), $.copy(balance_lp), $.copy(sp.coin_lp), E_WALLET_LP, $c);
  return;
}

// #[test]
export function create_pool$ (
  signer: HexString,
  pool_type: U8,
  k: U128,
  n1: U128,
  d1: U128,
  n2: U128,
  d2: U128,
  fee: U64,
  protocal_fee: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let addr, fee_on, logo_url, lp_name, project_url;
  lp_name = [u8("84"), u8("69"), u8("83"), u8("84"), u8("45"), u8("80"), u8("79"), u8("79"), u8("76")];
  [logo_url, project_url] = [[], []];
  if ($.copy(pool_type).eq(POOL_TYPE_CONSTANT_PRODUCT)) {
    addr = Std.Signer.address_of$(signer, $c);
    fee_on = true;
    CPScripts.create_new_pool$(signer, $.copy(addr), fee_on, $.copy(lp_name), $.copy(lp_name), $.copy(lp_name), $.copy(logo_url), $.copy(project_url), $c, [$p[0], $p[1]] as TypeTag[]);
    create_save_point$(signer, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
  }
  else{
    if ($.copy(pool_type).eq(POOL_TYPE_STABLE_CURVE)) {
      StableCurveScripts.create_new_pool$(signer, $.copy(lp_name), $.copy(lp_name), $.copy(lp_name), $.copy(logo_url), $.copy(project_url), $.copy(fee), $.copy(protocal_fee), $c, [$p[0], $p[1]] as TypeTag[]);
      create_save_point$(signer, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
    }
    else{
      if ($.copy(pool_type).eq(POOL_TYPE_PIECEWISE)) {
        PieceSwapScript.create_new_pool$(signer, $.copy(lp_name), $.copy(lp_name), $.copy(lp_name), $.copy(logo_url), $.copy(project_url), $.copy(k), $.copy(n1), $.copy(d1), $.copy(n2), $.copy(d2), $.copy(fee), $.copy(protocal_fee), $c, [$p[0], $p[1]] as TypeTag[]);
        create_save_point$(signer, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "PieceSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
      }
      else{
      }
    }
  }
  return;
}

// #[test]
export function create_save_point$ (
  signer: HexString,
  $c: AptosDataCache,
  $p: TypeTag[], /* <LpToken>*/
): void {
  $c.move_to(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TestShared", "PoolSavePoint", [$p[0]]), signer, new PoolSavePoint({ reserve_x: u64("0"), reserve_y: u64("0"), reserve_lp: u64("0"), fee_x: u64("0"), fee_y: u64("0"), fee_lp: u64("0") }, new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TestShared", "PoolSavePoint", [$p[0]])));
  return;
}

// #[test]
export function debug_print_balance$ (
  sender: HexString,
  pool_type: U8,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let coin_lp, coin_x, coin_y, s;
  [coin_x, coin_y, coin_lp] = get_balance$(sender, $.copy(pool_type), $c, [$p[0], $p[1]] as TypeTag[]);
  s = new WalletBalanceSavePoint({ coin_x: $.copy(coin_x), coin_y: $.copy(coin_y), coin_lp: $.copy(coin_lp) }, new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TestShared", "WalletBalanceSavePoint", []));
  Std.Debug.print$(s, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TestShared", "WalletBalanceSavePoint", [])] as TypeTag[]);
  return;
}

// #[test]
export function debug_print_comparision$ (
  pool_type: U8,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let temp$1;
  temp$1 = LABEL_COMPARE;
  Std.Debug.print$(temp$1, $c, [AtomicTypeTag.U128] as TypeTag[]);
  debug_print_save_point$($.copy(pool_type), $c, [$p[0], $p[1]] as TypeTag[]);
  debug_print_pool$($.copy(pool_type), $c, [$p[0], $p[1]] as TypeTag[]);
  return;
}

// #[test]
export function debug_print_pool$ (
  pool_type: U8,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let fee_lp, fee_x, fee_y, reserve_lp, reserve_x, reserve_y, s;
  [reserve_x, reserve_y] = get_pool_reserve_route$($.copy(pool_type), $c, [$p[0], $p[1]] as TypeTag[]);
  reserve_lp = get_pool_lp_supply_route$($.copy(pool_type), $c, [$p[0], $p[1]] as TypeTag[]);
  [fee_x, fee_y, fee_lp] = get_pool_fee_route$($.copy(pool_type), $c, [$p[0], $p[1]] as TypeTag[]);
  s = new PoolValue({ reserve_x: $.copy(reserve_x), reserve_y: $.copy(reserve_y), reserve_lp: $.copy(reserve_lp), fee_x: $.copy(fee_x), fee_y: $.copy(fee_y), fee_lp: $.copy(fee_lp) }, new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TestShared", "PoolValue", []));
  Std.Debug.print$(s, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TestShared", "PoolValue", [])] as TypeTag[]);
  return;
}

// #[test]
export function debug_print_pool_fee$ (
  pool_type: U8,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let temp$1, fee_lp, fee_x, fee_y;
  [fee_x, fee_y, fee_lp] = get_pool_fee_route$($.copy(pool_type), $c, [$p[0], $p[1]] as TypeTag[]);
  temp$1 = LABEL_FEE;
  Std.Debug.print$(temp$1, $c, [AtomicTypeTag.U128] as TypeTag[]);
  Std.Debug.print$(fee_x, $c, [AtomicTypeTag.U64] as TypeTag[]);
  Std.Debug.print$(fee_y, $c, [AtomicTypeTag.U64] as TypeTag[]);
  Std.Debug.print$(fee_lp, $c, [AtomicTypeTag.U64] as TypeTag[]);
  return;
}

// #[test]
export function debug_print_pool_lp_supply$ (
  pool_type: U8,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let temp$1, supply;
  supply = get_pool_lp_supply_route$($.copy(pool_type), $c, [$p[0], $p[1]] as TypeTag[]);
  temp$1 = LABEL_LPTOKEN_SUPPLY;
  Std.Debug.print$(temp$1, $c, [AtomicTypeTag.U128] as TypeTag[]);
  Std.Debug.print$(supply, $c, [AtomicTypeTag.U64] as TypeTag[]);
  return;
}

// #[test]
export function debug_print_pool_reserve_xy$ (
  pool_type: U8,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let temp$1, reserve_x, reserve_y;
  [reserve_x, reserve_y] = get_pool_reserve_route$($.copy(pool_type), $c, [$p[0], $p[1]] as TypeTag[]);
  temp$1 = LABEL_RESERVE_XY;
  Std.Debug.print$(temp$1, $c, [AtomicTypeTag.U128] as TypeTag[]);
  Std.Debug.print$(reserve_x, $c, [AtomicTypeTag.U64] as TypeTag[]);
  Std.Debug.print$(reserve_y, $c, [AtomicTypeTag.U64] as TypeTag[]);
  return;
}

// #[test]
export function debug_print_save_point$ (
  pool_type: U8,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let save_point, save_point__1, save_point__2;
  if ($.copy(pool_type).eq(POOL_TYPE_CONSTANT_PRODUCT)) {
    save_point = $c.borrow_global_mut<PoolSavePoint>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TestShared", "PoolSavePoint", [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "LPToken", [$p[0], $p[1]])]), ADMIN);
    debug_print_save_point_info$(save_point, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
  }
  else{
    if ($.copy(pool_type).eq(POOL_TYPE_STABLE_CURVE)) {
      save_point__1 = $c.borrow_global_mut<PoolSavePoint>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TestShared", "PoolSavePoint", [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "LPToken", [$p[0], $p[1]])]), ADMIN);
      debug_print_save_point_info$(save_point__1, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
    }
    else{
      if ($.copy(pool_type).eq(POOL_TYPE_PIECEWISE)) {
        save_point__2 = $c.borrow_global_mut<PoolSavePoint>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TestShared", "PoolSavePoint", [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "PieceSwap", "LPToken", [$p[0], $p[1]])]), ADMIN);
        debug_print_save_point_info$(save_point__2, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "PieceSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
      }
      else{
        throw $.abortCode(E_UNKNOWN_POOL_TYPE);
      }
    }
  }
  return;
}

// #[test]
export function debug_print_save_point_info$ (
  sp: PoolSavePoint,
  $c: AptosDataCache,
  $p: TypeTag[], /* <LpToken>*/
): void {
  let s;
  s = new PoolValue({ reserve_x: $.copy(sp.reserve_x), reserve_y: $.copy(sp.reserve_y), reserve_lp: $.copy(sp.reserve_lp), fee_x: $.copy(sp.fee_x), fee_y: $.copy(sp.fee_y), fee_lp: $.copy(sp.fee_lp) }, new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TestShared", "PoolValue", []));
  Std.Debug.print$(s, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TestShared", "PoolValue", [])] as TypeTag[]);
  return;
}

// #[test]
export function debug_print_wallet_comparision$ (
  sender: HexString,
  pool_type: U8,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  debug_print_wallet_sp$(sender, $c, [$p[0], $p[1]] as TypeTag[]);
  debug_print_balance$(sender, $.copy(pool_type), $c, [$p[0], $p[1]] as TypeTag[]);
  return;
}

// #[test]
export function debug_print_wallet_sp$ (
  sender: HexString,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let addr, s, sp;
  addr = Std.Signer.address_of$(sender, $c);
  sp = $c.borrow_global_mut<WalletBalanceSavePoint>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TestShared", "WalletBalanceSavePoint", []), $.copy(addr));
  s = new WalletBalanceSavePoint({ coin_x: $.copy(sp.coin_x), coin_y: $.copy(sp.coin_y), coin_lp: $.copy(sp.coin_lp) }, new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TestShared", "WalletBalanceSavePoint", []));
  Std.Debug.print$(s, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TestShared", "WalletBalanceSavePoint", [])] as TypeTag[]);
  return;
}

// #[test]
export function difference$ (
  a: U64,
  b: U64,
  $c: AptosDataCache,
): U64 {
  let temp$1;
  if ($.copy(a).gt($.copy(b))) {
    temp$1 = $.copy(a).sub($.copy(b));
  }
  else{
    temp$1 = $.copy(b).sub($.copy(a));
  }
  return temp$1;
}

// #[test]
export function fund_for_participants$ (
  signer: HexString,
  amount_x: U64,
  amount_y: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  MockCoin.faucet_mint_to$(signer, $.copy(amount_x), $c, [$p[0]] as TypeTag[]);
  MockCoin.faucet_mint_to$(signer, $.copy(amount_y), $c, [$p[1]] as TypeTag[]);
  return;
}

// #[test]
export function get_balance$ (
  sender: HexString,
  pool_type: U8,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): [U64, U64, U64] {
  let addr, balance_lp, balance_x, balance_y;
  addr = Std.Signer.address_of$(sender, $c);
  balance_x = AptosFramework.Coin.balance$($.copy(addr), $c, [$p[0]] as TypeTag[]);
  balance_y = AptosFramework.Coin.balance$($.copy(addr), $c, [$p[1]] as TypeTag[]);
  if ($.copy(pool_type).eq(POOL_TYPE_CONSTANT_PRODUCT)) {
    balance_lp = AptosFramework.Coin.balance$($.copy(addr), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
  }
  else{
    if ($.copy(pool_type).eq(POOL_TYPE_STABLE_CURVE)) {
      balance_lp = AptosFramework.Coin.balance$($.copy(addr), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
    }
    else{
      if ($.copy(pool_type).eq(POOL_TYPE_PIECEWISE)) {
        balance_lp = AptosFramework.Coin.balance$($.copy(addr), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "PieceSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
      }
      else{
        throw $.abortCode(E_UNKNOWN_POOL_TYPE);
      }
    }
  }
  return [$.copy(balance_x), $.copy(balance_y), $.copy(balance_lp)];
}

// #[test]
export function get_pool_fee_route$ (
  pool_type: U8,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): [U64, U64, U64] {
  let temp$10, temp$11, temp$3, temp$4, temp$5, temp$6, temp$7, temp$8, temp$9, fee_balance, fee_x, fee_x__1, fee_y, fee_y__2;
  if ($.copy(pool_type).eq(POOL_TYPE_CONSTANT_PRODUCT)) {
    fee_balance = AptosFramework.Coin.balance$(ADMIN, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
    [temp$9, temp$10, temp$11] = [u64("0"), u64("0"), $.copy(fee_balance)];
  }
  else{
    if ($.copy(pool_type).eq(POOL_TYPE_STABLE_CURVE)) {
      [fee_x, fee_y] = StableCurveSwap.get_fee_amounts$($c, [$p[0], $p[1]] as TypeTag[]);
      [temp$6, temp$7, temp$8] = [$.copy(fee_x), $.copy(fee_y), u64("0")];
    }
    else{
      if ($.copy(pool_type).eq(POOL_TYPE_PIECEWISE)) {
        [fee_x__1, fee_y__2] = PieceSwap.get_fee_amounts$($c, [$p[0], $p[1]] as TypeTag[]);
        [temp$3, temp$4, temp$5] = [$.copy(fee_x__1), $.copy(fee_y__2), u64("0")];
      }
      else{
        throw $.abortCode(E_UNKNOWN_POOL_TYPE);
      }
      [temp$6, temp$7, temp$8] = [temp$3, temp$4, temp$5];
    }
    [temp$9, temp$10, temp$11] = [temp$6, temp$7, temp$8];
  }
  return [temp$9, temp$10, temp$11];
}

// #[test]
export function get_pool_lp_supply_route$ (
  pool_type: U8,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): U64 {
  let temp$1, temp$2, temp$3, temp$4, temp$5, temp$6;
  if ($.copy(pool_type).eq(POOL_TYPE_CONSTANT_PRODUCT)) {
    temp$1 = AptosFramework.Coin.supply$($c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
    temp$6 = u64($.copy(Std.Option.borrow$(temp$1, $c, [AtomicTypeTag.U128] as TypeTag[])));
  }
  else{
    if ($.copy(pool_type).eq(POOL_TYPE_STABLE_CURVE)) {
      temp$2 = AptosFramework.Coin.supply$($c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
      temp$5 = u64($.copy(Std.Option.borrow$(temp$2, $c, [AtomicTypeTag.U128] as TypeTag[])));
    }
    else{
      if ($.copy(pool_type).eq(POOL_TYPE_PIECEWISE)) {
        temp$3 = AptosFramework.Coin.supply$($c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "PieceSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
        temp$4 = u64($.copy(Std.Option.borrow$(temp$3, $c, [AtomicTypeTag.U128] as TypeTag[])));
      }
      else{
        throw $.abortCode(E_UNKNOWN_POOL_TYPE);
      }
      temp$5 = temp$4;
    }
    temp$6 = temp$5;
  }
  return temp$6;
}

// #[test]
export function get_pool_reserve_route$ (
  pool_type: U8,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): [U64, U64] {
  let temp$1, temp$2, temp$3, temp$4, temp$5, temp$6;
  if ($.copy(pool_type).eq(POOL_TYPE_CONSTANT_PRODUCT)) {
    [temp$5, temp$6] = CPSwap.token_balances$($c, [$p[0], $p[1]] as TypeTag[]);
  }
  else{
    if ($.copy(pool_type).eq(POOL_TYPE_STABLE_CURVE)) {
      [temp$3, temp$4] = StableCurveSwap.get_reserve_amounts$($c, [$p[0], $p[1]] as TypeTag[]);
    }
    else{
      if ($.copy(pool_type).eq(POOL_TYPE_PIECEWISE)) {
        [temp$1, temp$2] = PieceSwap.get_reserve_amounts$($c, [$p[0], $p[1]] as TypeTag[]);
      }
      else{
        throw $.abortCode(E_UNKNOWN_POOL_TYPE);
      }
      [temp$3, temp$4] = [temp$1, temp$2];
    }
    [temp$5, temp$6] = [temp$3, temp$4];
  }
  return [temp$5, temp$6];
}

// #[test]
export function init_debug_utils_for_user$ (
  signer: HexString,
  pool_type: U8,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  AptosFramework.Coin.register_internal$(signer, $c, [$p[0]] as TypeTag[]);
  AptosFramework.Coin.register_internal$(signer, $c, [$p[1]] as TypeTag[]);
  if ($.copy(pool_type).eq(POOL_TYPE_CONSTANT_PRODUCT)) {
    AptosFramework.Coin.register_internal$(signer, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
  }
  else{
    if ($.copy(pool_type).eq(POOL_TYPE_STABLE_CURVE)) {
      AptosFramework.Coin.register_internal$(signer, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
    }
    else{
      if ($.copy(pool_type).eq(POOL_TYPE_PIECEWISE)) {
        AptosFramework.Coin.register_internal$(signer, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "PieceSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
      }
      else{
      }
    }
  }
  $c.move_to(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TestShared", "WalletBalanceSavePoint", []), signer, new WalletBalanceSavePoint({ coin_x: u64("0"), coin_y: u64("0"), coin_lp: u64("0") }, new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TestShared", "WalletBalanceSavePoint", [])));
  return;
}

// #[test]
export function init_mock_coin_pair$ (
  admin: HexString,
  decimal_x: U64,
  decimal_y: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  TokenRegistry.TokenRegistry.initialize$(admin, $c);
  MockDeploy.init_coin_and_create_store$(admin, [u8("67"), u8("79"), u8("73"), u8("78"), u8("45"), u8("88")], [u8("67"), u8("79"), u8("73"), u8("78"), u8("45"), u8("88")], $.copy(decimal_x), $c, [$p[0]] as TypeTag[]);
  MockDeploy.init_coin_and_create_store$(admin, [u8("67"), u8("79"), u8("73"), u8("78"), u8("45"), u8("89")], [u8("67"), u8("79"), u8("73"), u8("78"), u8("45"), u8("89")], $.copy(decimal_y), $c, [$p[1]] as TypeTag[]);
  return;
}

// #[test]
export function init_registry_and_mock_coins$ (
  admin: HexString,
  $c: AptosDataCache,
): void {
  TokenRegistry.TokenRegistry.initialize$(admin, $c);
  MockDeploy.init_coin_and_create_store$(admin, [u8("85"), u8("83"), u8("68"), u8("84")], [u8("85"), u8("83"), u8("68"), u8("84")], u64("8"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", [])] as TypeTag[]);
  MockDeploy.init_coin_and_create_store$(admin, [u8("85"), u8("83"), u8("68"), u8("67")], [u8("85"), u8("83"), u8("68"), u8("67")], u64("8"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", [])] as TypeTag[]);
  MockDeploy.init_coin_and_create_store$(admin, [u8("68"), u8("65"), u8("73")], [u8("68"), u8("65"), u8("73")], u64("7"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  MockDeploy.init_coin_and_create_store$(admin, [u8("69"), u8("84"), u8("72")], [u8("69"), u8("84"), u8("72")], u64("9"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", [])] as TypeTag[]);
  MockDeploy.init_coin_and_create_store$(admin, [u8("66"), u8("84"), u8("67")], [u8("66"), u8("84"), u8("67")], u64("10"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WBTC", [])] as TypeTag[]);
  MockDeploy.init_coin_and_create_store$(admin, [u8("68"), u8("79"), u8("84")], [u8("68"), u8("79"), u8("84")], u64("6"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDOT", [])] as TypeTag[]);
  MockDeploy.init_coin_and_create_store$(admin, [u8("83"), u8("79"), u8("76")], [u8("83"), u8("79"), u8("76")], u64("8"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WSOL", [])] as TypeTag[]);
  return;
}

// #[test]
export function prepare_for_test$ (
  admin: HexString,
  investor: HexString,
  swapper: HexString,
  core: HexString,
  pool_type: U8,
  decimal_x: U64,
  decimal_y: U64,
  k: U128,
  n1: U128,
  d1: U128,
  n2: U128,
  d2: U128,
  fee: U64,
  protocal_fee: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  time_start$(core, $c);
  init_mock_coin_pair$(admin, $.copy(decimal_x), $.copy(decimal_y), $c, [$p[0], $p[1]] as TypeTag[]);
  create_pool$(admin, $.copy(pool_type), $.copy(k), $.copy(n1), $.copy(d1), $.copy(n2), $.copy(d2), $.copy(fee), $.copy(protocal_fee), $c, [$p[0], $p[1]] as TypeTag[]);
  init_debug_utils_for_user$(investor, $.copy(pool_type), $c, [$p[0], $p[1]] as TypeTag[]);
  init_debug_utils_for_user$(swapper, $.copy(pool_type), $c, [$p[0], $p[1]] as TypeTag[]);
  return;
}

// #[test]
export function sync_save_point$ (
  pool_type: U8,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let fee_lp, fee_x, fee_y, reserve_x, reserve_y, save_point, save_point__1, save_point__2, supply;
  [fee_x, fee_y, fee_lp] = get_pool_fee_route$($.copy(pool_type), $c, [$p[0], $p[1]] as TypeTag[]);
  [reserve_x, reserve_y] = get_pool_reserve_route$($.copy(pool_type), $c, [$p[0], $p[1]] as TypeTag[]);
  supply = get_pool_lp_supply_route$($.copy(pool_type), $c, [$p[0], $p[1]] as TypeTag[]);
  if ($.copy(pool_type).eq(POOL_TYPE_CONSTANT_PRODUCT)) {
    save_point = $c.borrow_global_mut<PoolSavePoint>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TestShared", "PoolSavePoint", [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "LPToken", [$p[0], $p[1]])]), ADMIN);
    sync_save_point_with_data$(save_point, $.copy(reserve_x), $.copy(reserve_y), $.copy(supply), $.copy(fee_x), $.copy(fee_y), $.copy(fee_lp), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
  }
  else{
    if ($.copy(pool_type).eq(POOL_TYPE_STABLE_CURVE)) {
      save_point__1 = $c.borrow_global_mut<PoolSavePoint>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TestShared", "PoolSavePoint", [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "LPToken", [$p[0], $p[1]])]), ADMIN);
      sync_save_point_with_data$(save_point__1, $.copy(reserve_x), $.copy(reserve_y), $.copy(supply), $.copy(fee_x), $.copy(fee_y), $.copy(fee_lp), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "StableCurveSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
    }
    else{
      if ($.copy(pool_type).eq(POOL_TYPE_PIECEWISE)) {
        save_point__2 = $c.borrow_global_mut<PoolSavePoint>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TestShared", "PoolSavePoint", [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "PieceSwap", "LPToken", [$p[0], $p[1]])]), ADMIN);
        sync_save_point_with_data$(save_point__2, $.copy(reserve_x), $.copy(reserve_y), $.copy(supply), $.copy(fee_x), $.copy(fee_y), $.copy(fee_lp), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "PieceSwap", "LPToken", [$p[0], $p[1]])] as TypeTag[]);
      }
      else{
        throw $.abortCode(E_UNKNOWN_POOL_TYPE);
      }
    }
  }
  return;
}

// #[test]
export function sync_save_point_with_data$ (
  p: PoolSavePoint,
  reserve_x: U64,
  reserve_y: U64,
  reserve_lp: U64,
  fee_x: U64,
  fee_y: U64,
  fee_lp: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <T>*/
): void {
  let ref_fee_lp, ref_fee_x, ref_fee_y, ref_resv_lp, ref_resv_x, ref_resv_y;
  [ref_resv_x, ref_resv_y, ref_resv_lp, ref_fee_x, ref_fee_y, ref_fee_lp] = [p.reserve_x, p.reserve_y, p.reserve_lp, p.fee_x, p.fee_y, p.fee_lp];
  $.set(ref_resv_x, $.copy(reserve_x));
  $.set(ref_resv_y, $.copy(reserve_y));
  $.set(ref_resv_lp, $.copy(reserve_lp));
  $.set(ref_fee_x, $.copy(fee_x));
  $.set(ref_fee_y, $.copy(fee_y));
  $.set(ref_fee_lp, $.copy(fee_lp));
  return;
}

// #[test]
export function sync_wallet_save_point$ (
  sender: HexString,
  pool_type: U8,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let addr, balance_lp, balance_x, balance_y, sp;
  addr = Std.Signer.address_of$(sender, $c);
  sp = $c.borrow_global_mut<WalletBalanceSavePoint>(new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "TestShared", "WalletBalanceSavePoint", []), $.copy(addr));
  [balance_x, balance_y, balance_lp] = get_balance$(sender, $.copy(pool_type), $c, [$p[0], $p[1]] as TypeTag[]);
  sync_wallet_save_point_with_data$(sp, $.copy(balance_x), $.copy(balance_y), $.copy(balance_lp), $c);
  return;
}

// #[test]
export function sync_wallet_save_point_with_data$ (
  p: WalletBalanceSavePoint,
  balance_x: U64,
  balance_y: U64,
  balance_lp: U64,
  $c: AptosDataCache,
): void {
  let ref_coin_lp, ref_coin_x, ref_coin_y;
  [ref_coin_x, ref_coin_y, ref_coin_lp] = [p.coin_x, p.coin_y, p.coin_lp];
  $.set(ref_coin_x, $.copy(balance_x));
  $.set(ref_coin_y, $.copy(balance_y));
  $.set(ref_coin_lp, $.copy(balance_lp));
  return;
}

// #[test]
export function time_start$ (
  core: HexString,
  $c: AptosDataCache,
): void {
  AptosFramework.Timestamp.set_time_has_started_for_testing$(core, $c);
  return;
}

export function unit_test_poison$ (
  $c: AptosDataCache,
): void {
  Std.UnitTest.create_signers_for_testing$(u64("0"), $c);
  return;
}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::TestShared::PoolSavePoint", PoolSavePoint.PoolSavePointParser);
  repo.addParser("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::TestShared::PoolValue", PoolValue.PoolValueParser);
  repo.addParser("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::TestShared::WalletBalanceSavePoint", WalletBalanceSavePoint.WalletBalanceSavePointParser);
}

