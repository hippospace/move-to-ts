import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient} from "aptos";
import * as Std from "../Std";
import * as Router from "./Router";
import * as StableCurveScripts from "./StableCurveScripts";
import * as TestShared from "./TestShared";
export const packageName = "HippoSwap";
export const moduleAddress = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
export const moduleName = "CurveTest";

export const ADD_LIQUIDITY : U8 = u8("0");
export const ADMIN : HexString = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
export const BILLION : U64 = u64("1000000000");
export const DEC : U8 = u8("1");
export const E_BALANCE_PREDICTION : U64 = u64("2");
export const E_NOT_IMPLEMENTED : U64 = u64("0");
export const E_UNKNOWN_POOL_TYPE : U64 = u64("1");
export const INC : U8 = u8("0");
export const INVESTOR : HexString = new HexString("0x2fff");
export const LABEL_FEE : U128 = u128("333000000000000000000000000000000000002");
export const LABEL_LPTOKEN_SUPPLY : U128 = u128("333000000000000000000000000000000000003");
export const LABEL_RESERVE_XY : U128 = u128("333000000000000000000000000000000000001");
export const LABEL_SAVE_POINT : U128 = u128("333000000000000000000000000000000000000");
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
export const REMOVE_LIQUIDITY : U8 = u8("2");
export const SWAP : U8 = u8("1");
export const SWAPPER : HexString = new HexString("0x2ffe");
export const THOUSAND : U64 = u64("1000");
export const TRILLION : U64 = u64("1000000000000");


export class PoolDelta 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "PoolDelta";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "sx", typeTag: AtomicTypeTag.U8 },
  { name: "sy", typeTag: AtomicTypeTag.U8 },
  { name: "slp", typeTag: AtomicTypeTag.U8 },
  { name: "sfx", typeTag: AtomicTypeTag.U8 },
  { name: "sfy", typeTag: AtomicTypeTag.U8 },
  { name: "sflp", typeTag: AtomicTypeTag.U8 },
  { name: "dx", typeTag: AtomicTypeTag.U64 },
  { name: "dy", typeTag: AtomicTypeTag.U64 },
  { name: "dlp", typeTag: AtomicTypeTag.U64 },
  { name: "dfx", typeTag: AtomicTypeTag.U64 },
  { name: "dfy", typeTag: AtomicTypeTag.U64 },
  { name: "dflp", typeTag: AtomicTypeTag.U64 }];

  sx: U8;
  sy: U8;
  slp: U8;
  sfx: U8;
  sfy: U8;
  sflp: U8;
  dx: U64;
  dy: U64;
  dlp: U64;
  dfx: U64;
  dfy: U64;
  dflp: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.sx = proto['sx'] as U8;
    this.sy = proto['sy'] as U8;
    this.slp = proto['slp'] as U8;
    this.sfx = proto['sfx'] as U8;
    this.sfy = proto['sfy'] as U8;
    this.sflp = proto['sflp'] as U8;
    this.dx = proto['dx'] as U64;
    this.dy = proto['dy'] as U64;
    this.dlp = proto['dlp'] as U64;
    this.dfx = proto['dfx'] as U64;
    this.dfy = proto['dfy'] as U64;
    this.dflp = proto['dflp'] as U64;
  }

  static PoolDeltaParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : PoolDelta {
    const proto = $.parseStructProto(data, typeTag, repo, PoolDelta);
    return new PoolDelta(proto, typeTag);
  }

}

export class TransactionParams 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "TransactionParams";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "amt_x", typeTag: AtomicTypeTag.U64 },
  { name: "amt_y", typeTag: AtomicTypeTag.U64 },
  { name: "amt_lp", typeTag: AtomicTypeTag.U64 },
  { name: "p", typeTag: new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CurveTest", "PoolDelta", []) },
  { name: "w", typeTag: new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CurveTest", "WalletDelta", []) }];

  amt_x: U64;
  amt_y: U64;
  amt_lp: U64;
  p: PoolDelta;
  w: WalletDelta;

  constructor(proto: any, public typeTag: TypeTag) {
    this.amt_x = proto['amt_x'] as U64;
    this.amt_y = proto['amt_y'] as U64;
    this.amt_lp = proto['amt_lp'] as U64;
    this.p = proto['p'] as PoolDelta;
    this.w = proto['w'] as WalletDelta;
  }

  static TransactionParamsParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : TransactionParams {
    const proto = $.parseStructProto(data, typeTag, repo, TransactionParams);
    return new TransactionParams(proto, typeTag);
  }

}

export class WalletDelta 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "WalletDelta";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "sx", typeTag: AtomicTypeTag.U8 },
  { name: "sy", typeTag: AtomicTypeTag.U8 },
  { name: "slp", typeTag: AtomicTypeTag.U8 },
  { name: "dx", typeTag: AtomicTypeTag.U64 },
  { name: "dy", typeTag: AtomicTypeTag.U64 },
  { name: "dlp", typeTag: AtomicTypeTag.U64 }];

  sx: U8;
  sy: U8;
  slp: U8;
  dx: U64;
  dy: U64;
  dlp: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.sx = proto['sx'] as U8;
    this.sy = proto['sy'] as U8;
    this.slp = proto['slp'] as U8;
    this.dx = proto['dx'] as U64;
    this.dy = proto['dy'] as U64;
    this.dlp = proto['dlp'] as U64;
  }

  static WalletDeltaParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : WalletDelta {
    const proto = $.parseStructProto(data, typeTag, repo, WalletDelta);
    return new WalletDelta(proto, typeTag);
  }

}
// test func
export function add_param$ (
  amt_x: U64,
  amt_y: U64,
  dx: U64,
  dy: U64,
  dlp: U64,
  dfx: U64,
  dfy: U64,
  $c: AptosDataCache,
): TransactionParams {
  return new TransactionParams({ amt_x: $.copy(amt_x), amt_y: $.copy(amt_y), amt_lp: u64("0"), p: new PoolDelta({ sx: INC, sy: INC, slp: INC, sfx: INC, sfy: INC, sflp: INC, dx: $.copy(dx), dy: $.copy(dy), dlp: $.copy(dlp), dfx: $.copy(dfx), dfy: $.copy(dfy), dflp: u64("0") }, new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CurveTest", "PoolDelta", [])), w: new WalletDelta({ sx: DEC, sy: DEC, slp: INC, dx: $.copy(amt_x), dy: $.copy(amt_y), dlp: $.copy(dlp) }, new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CurveTest", "WalletDelta", [])) }, new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CurveTest", "TransactionParams", []));
}

// test func
export function new_transaction_param$ (
  amt_x: U64,
  amt_y: U64,
  amt_lp: U64,
  sx: U8,
  sy: U8,
  slp: U8,
  sfx: U8,
  sfy: U8,
  sflp: U8,
  dx: U64,
  dy: U64,
  dlp: U64,
  dfx: U64,
  dfy: U64,
  dflp: U64,
  wsx: U8,
  wsy: U8,
  wslp: U8,
  wdx: U64,
  wdy: U64,
  wdlp: U64,
  $c: AptosDataCache,
): TransactionParams {
  return new TransactionParams({ amt_x: $.copy(amt_x), amt_y: $.copy(amt_y), amt_lp: $.copy(amt_lp), p: new PoolDelta({ sx: $.copy(sx), sy: $.copy(sy), slp: $.copy(slp), sfx: $.copy(sfx), sfy: $.copy(sfy), sflp: $.copy(sflp), dx: $.copy(dx), dy: $.copy(dy), dlp: $.copy(dlp), dfx: $.copy(dfx), dfy: $.copy(dfy), dflp: $.copy(dflp) }, new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CurveTest", "PoolDelta", [])), w: new WalletDelta({ sx: $.copy(wsx), sy: $.copy(wsy), slp: $.copy(wslp), dx: $.copy(wdx), dy: $.copy(wdy), dlp: $.copy(wdlp) }, new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CurveTest", "WalletDelta", [])) }, new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CurveTest", "TransactionParams", []));
}

// test func
export function perform_transaction$ (
  trader: HexString,
  pool_type: U8,
  action: U8,
  print_debug: boolean,
  param: TransactionParams,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  if ($.copy(action).eq(ADD_LIQUIDITY)) {
    Router.add_liquidity_route$(trader, $.copy(pool_type), $.copy(param.amt_x), $.copy(param.amt_y), $c, [$p[0], $p[1]] as TypeTag[]);
  }
  else{
    if ($.copy(action).eq(SWAP)) {
      StableCurveScripts.swap$(trader, $.copy(param.amt_x), $.copy(param.amt_y), u64("0"), u64("0"), $c, [$p[0], $p[1]] as TypeTag[]);
    }
    else{
      if ($.copy(action).eq(REMOVE_LIQUIDITY)) {
        Router.remove_liquidity_route$(trader, $.copy(pool_type), $.copy(param.amt_lp), $.copy(param.amt_x), $.copy(param.amt_y), $c, [$p[0], $p[1]] as TypeTag[]);
      }
      else{
      }
    }
  }
  if (print_debug) {
    TestShared.debug_print_comparision$($.copy(pool_type), $c, [$p[0], $p[1]] as TypeTag[]);
    TestShared.debug_print_wallet_comparision$(trader, $.copy(pool_type), $c, [$p[0], $p[1]] as TypeTag[]);
  }
  else{
  }
  TestShared.assert_pool_delta$($.copy(pool_type), true, $.copy(param.p.sx), $.copy(param.p.sy), $.copy(param.p.slp), $.copy(param.p.sfx), $.copy(param.p.sfy), $.copy(param.p.sflp), $.copy(param.p.dx), $.copy(param.p.dy), $.copy(param.p.dlp), $.copy(param.p.dfx), $.copy(param.p.dfy), $.copy(param.p.dflp), $c, [$p[0], $p[1]] as TypeTag[]);
  TestShared.assert_wallet_delta$(trader, $.copy(pool_type), true, $.copy(param.w.sx), $.copy(param.w.sy), $.copy(param.w.slp), $.copy(param.w.dx), $.copy(param.w.dy), $.copy(param.w.dlp), $c, [$p[0], $p[1]] as TypeTag[]);
  return;
}

// test func
export function remove_param$ (
  amt_lp: U64,
  dx: U64,
  dy: U64,
  $c: AptosDataCache,
): TransactionParams {
  return new TransactionParams({ amt_x: u64("0"), amt_y: u64("0"), amt_lp: $.copy(amt_lp), p: new PoolDelta({ sx: DEC, sy: DEC, slp: DEC, sfx: DEC, sfy: DEC, sflp: DEC, dx: $.copy(dx), dy: $.copy(dy), dlp: $.copy(amt_lp), dfx: u64("0"), dfy: u64("0"), dflp: u64("0") }, new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CurveTest", "PoolDelta", [])), w: new WalletDelta({ sx: INC, sy: INC, slp: DEC, dx: $.copy(dx), dy: $.copy(dy), dlp: $.copy(amt_lp) }, new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CurveTest", "WalletDelta", [])) }, new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CurveTest", "TransactionParams", []));
}

// test func
export function swap_param$ (
  amt_x: U64,
  amt_y: U64,
  dx: U64,
  dy: U64,
  dfx: U64,
  dfy: U64,
  receive_amt: U64,
  $c: AptosDataCache,
): TransactionParams {
  let sx, sy, wdx, wdy;
  if ($.copy(amt_x).gt(u64("0"))) {
    [sx, sy, wdx, wdy] = [INC, DEC, $.copy(amt_x), $.copy(receive_amt)];
  }
  else{
    [sx, sy, wdx, wdy] = [DEC, INC, $.copy(receive_amt), $.copy(amt_y)];
  }
  return new TransactionParams({ amt_x: $.copy(amt_x), amt_y: $.copy(amt_y), amt_lp: u64("0"), p: new PoolDelta({ sx: $.copy(sx), sy: $.copy(sy), slp: INC, sfx: INC, sfy: INC, sflp: INC, dx: $.copy(dx), dy: $.copy(dy), dlp: u64("0"), dfx: $.copy(dfx), dfy: $.copy(dfy), dflp: u64("0") }, new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CurveTest", "PoolDelta", [])), w: new WalletDelta({ sx: $.copy(sy), sy: $.copy(sx), slp: INC, dx: $.copy(wdx), dy: $.copy(wdy), dlp: u64("0") }, new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CurveTest", "WalletDelta", [])) }, new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CurveTest", "TransactionParams", []));
}

// test func
export function test_pool$ (
  admin: HexString,
  investor: HexString,
  swapper: HexString,
  core: HexString,
  decimal_x: U64,
  decimal_y: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let pool_type;
  pool_type = POOL_TYPE_STABLE_CURVE;
  TestShared.time_start$(core, $c);
  TestShared.init_mock_coin_pair$(admin, $.copy(decimal_x), $.copy(decimal_y), $c, [$p[0], $p[1]] as TypeTag[]);
  TestShared.create_pool$(admin, $.copy(pool_type), u128("0"), u128("0"), u128("0"), u128("0"), u128("0"), u64("100"), u64("100000"), $c, [$p[0], $p[1]] as TypeTag[]);
  TestShared.fund_for_participants$(investor, P8, P7, $c, [$p[0], $p[1]] as TypeTag[]);
  TestShared.fund_for_participants$(swapper, P8, P7, $c, [$p[0], $p[1]] as TypeTag[]);
  TestShared.assert_pool_delta$($.copy(pool_type), false, INC, INC, INC, INC, INC, INC, u64("0"), u64("0"), u64("0"), u64("0"), u64("0"), u64("0"), $c, [$p[0], $p[1]] as TypeTag[]);
  Router.add_liquidity_route$(investor, $.copy(pool_type), P8, P7, $c, [$p[0], $p[1]] as TypeTag[]);
  TestShared.assert_pool_delta$($.copy(pool_type), true, INC, INC, INC, INC, INC, INC, P8, P7, u64("2").mul(P8), u64("0"), u64("0"), u64("0"), $c, [$p[0], $p[1]] as TypeTag[]);
  StableCurveScripts.swap$(swapper, P6, u64("0"), u64("0"), u64("20"), $c, [$p[0], $p[1]] as TypeTag[]);
  TestShared.debug_print_comparision$($.copy(pool_type), $c, [$p[0], $p[1]] as TypeTag[]);
  StableCurveScripts.swap$(swapper, u64("0"), P5, u64("0"), u64("20"), $c, [$p[0], $p[1]] as TypeTag[]);
  TestShared.debug_print_comparision$($.copy(pool_type), $c, [$p[0], $p[1]] as TypeTag[]);
  StableCurveScripts.swap$(swapper, P7, u64("0"), u64("0"), u64("20"), $c, [$p[0], $p[1]] as TypeTag[]);
  TestShared.debug_print_comparision$($.copy(pool_type), $c, [$p[0], $p[1]] as TypeTag[]);
  return;
}

// test func
export function test_pool_case$ (
  admin: HexString,
  investor: HexString,
  swapper: HexString,
  core: HexString,
  print_debug: boolean,
  skip_swap: boolean,
  pool_type: U8,
  decimal_x: U64,
  decimal_y: U64,
  fee: U64,
  protocal_fee: U64,
  add_1: TransactionParams,
  add_2: TransactionParams,
  swap_1: TransactionParams,
  remove_1: TransactionParams,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let liquidity_x, liquidity_y;
  TestShared.prepare_for_test$(admin, investor, swapper, core, $.copy(pool_type), $.copy(decimal_x), $.copy(decimal_y), u128("0"), u128("0"), u128("0"), u128("0"), u128("0"), $.copy(fee), $.copy(protocal_fee), $c, [$p[0], $p[1]] as TypeTag[]);
  liquidity_x = $.copy(add_1.amt_x).add($.copy(add_2.amt_x));
  liquidity_y = $.copy(add_1.amt_y).add($.copy(add_2.amt_y));
  TestShared.fund_for_participants$(investor, $.copy(liquidity_x), $.copy(liquidity_y), $c, [$p[0], $p[1]] as TypeTag[]);
  TestShared.sync_wallet_save_point$(investor, $.copy(pool_type), $c, [$p[0], $p[1]] as TypeTag[]);
  TestShared.fund_for_participants$(swapper, $.copy(swap_1.amt_x), $.copy(swap_1.amt_y), $c, [$p[0], $p[1]] as TypeTag[]);
  TestShared.sync_wallet_save_point$(swapper, $.copy(pool_type), $c, [$p[0], $p[1]] as TypeTag[]);
  TestShared.assert_pool_delta$($.copy(pool_type), false, INC, INC, INC, INC, INC, INC, u64("0"), u64("0"), u64("0"), u64("0"), u64("0"), u64("0"), $c, [$p[0], $p[1]] as TypeTag[]);
  if (print_debug) {
    TestShared.debug_print_wallet_comparision$(swapper, $.copy(pool_type), $c, [$p[0], $p[1]] as TypeTag[]);
  }
  else{
  }
  perform_transaction$(investor, $.copy(pool_type), ADD_LIQUIDITY, print_debug, add_1, $c, [$p[0], $p[1]] as TypeTag[]);
  perform_transaction$(investor, $.copy(pool_type), ADD_LIQUIDITY, print_debug, add_2, $c, [$p[0], $p[1]] as TypeTag[]);
  if (!skip_swap) {
    perform_transaction$(swapper, $.copy(pool_type), SWAP, print_debug, swap_1, $c, [$p[0], $p[1]] as TypeTag[]);
  }
  else{
  }
  perform_transaction$(investor, $.copy(pool_type), REMOVE_LIQUIDITY, print_debug, remove_1, $c, [$p[0], $p[1]] as TypeTag[]);
  return;
}

// test func
export function test_pool_debug$ (
  admin: HexString,
  investor: HexString,
  swapper: HexString,
  core: HexString,
  $c: AptosDataCache,
  $p: TypeTag[], /* <X, Y>*/
): void {
  let pool_type;
  pool_type = POOL_TYPE_STABLE_CURVE;
  TestShared.prepare_for_test$(admin, investor, swapper, core, $.copy(pool_type), u64("8"), u64("7"), u128("0"), u128("0"), u128("0"), u128("0"), u128("0"), u64("100"), u64("100000"), $c, [$p[0], $p[1]] as TypeTag[]);
  TestShared.fund_for_participants$(investor, P8, P7, $c, [$p[0], $p[1]] as TypeTag[]);
  TestShared.sync_wallet_save_point$(investor, $.copy(pool_type), $c, [$p[0], $p[1]] as TypeTag[]);
  TestShared.fund_for_participants$(swapper, P8, P7, $c, [$p[0], $p[1]] as TypeTag[]);
  TestShared.sync_wallet_save_point$(swapper, $.copy(pool_type), $c, [$p[0], $p[1]] as TypeTag[]);
  TestShared.assert_pool_delta$($.copy(pool_type), false, INC, INC, INC, INC, INC, INC, u64("0"), u64("0"), u64("0"), u64("0"), u64("0"), u64("0"), $c, [$p[0], $p[1]] as TypeTag[]);
  TestShared.debug_print_wallet_comparision$(swapper, $.copy(pool_type), $c, [$p[0], $p[1]] as TypeTag[]);
  Router.add_liquidity_route$(investor, $.copy(pool_type), P8, P7, $c, [$p[0], $p[1]] as TypeTag[]);
  TestShared.debug_print_comparision$($.copy(pool_type), $c, [$p[0], $p[1]] as TypeTag[]);
  TestShared.assert_pool_delta$($.copy(pool_type), true, INC, INC, INC, INC, INC, INC, P8, P7, u64("2").mul(P8), u64("0"), u64("0"), u64("0"), $c, [$p[0], $p[1]] as TypeTag[]);
  StableCurveScripts.swap$(swapper, P6, u64("0"), u64("0"), u64("20"), $c, [$p[0], $p[1]] as TypeTag[]);
  TestShared.debug_print_comparision$($.copy(pool_type), $c, [$p[0], $p[1]] as TypeTag[]);
  TestShared.debug_print_wallet_comparision$(swapper, $.copy(pool_type), $c, [$p[0], $p[1]] as TypeTag[]);
  StableCurveScripts.swap$(swapper, u64("0"), P5, u64("0"), u64("20"), $c, [$p[0], $p[1]] as TypeTag[]);
  TestShared.debug_print_comparision$($.copy(pool_type), $c, [$p[0], $p[1]] as TypeTag[]);
  StableCurveScripts.swap$(swapper, P7, u64("0"), u64("0"), u64("20"), $c, [$p[0], $p[1]] as TypeTag[]);
  TestShared.debug_print_comparision$($.copy(pool_type), $c, [$p[0], $p[1]] as TypeTag[]);
  return;
}

// test func
export function test_pool_stable_curve_2$ (
  admin: HexString,
  investor: HexString,
  swapper: HexString,
  core: HexString,
  $c: AptosDataCache,
): void {
  let add_1, add_2, decimal_x, decimal_y, fee, protocal_fee, remove_1, swap;
  [decimal_x, decimal_y, fee, protocal_fee] = [u64("8"), u64("7"), u64("100"), u64("100000")];
  add_1 = new_transaction_param$(P8, P7, u64("0"), INC, INC, INC, INC, INC, INC, P8, P7, u64("2").mul(P8), u64("0"), u64("0"), u64("0"), DEC, DEC, INC, P8, P7, u64("2").mul(P8), $c);
  add_2 = new_transaction_param$(P8, P7, u64("0"), INC, INC, INC, INC, INC, INC, P8, P7, u64("2").mul(P8), u64("0"), u64("0"), u64("0"), DEC, DEC, INC, P8, P7, u64("2").mul(P8), $c);
  swap = new_transaction_param$(P6, u64("0"), u64("0"), INC, DEC, INC, INC, INC, INC, P6, u64("99982"), u64("0"), u64("0"), u64("0"), u64("0"), DEC, INC, INC, P6, u64("99982"), u64("0"), $c);
  remove_1 = new_transaction_param$(u64("0"), u64("0"), u64("2").mul(P8), DEC, DEC, DEC, INC, INC, INC, P8.add(u64("5").mul(P5)), P7.sub(u64("5").mul(P4)).add(u64("9")), u64("2").mul(P8), u64("0"), u64("0"), u64("0"), INC, INC, DEC, P8.add(u64("5").mul(P5)), P7.sub(u64("5").mul(P4)).add(u64("9")), u64("2").mul(P8), $c);
  test_pool_case$(admin, investor, swapper, core, true, false, POOL_TYPE_STABLE_CURVE, $.copy(decimal_x), $.copy(decimal_y), $.copy(fee), $.copy(protocal_fee), add_1, add_2, swap, remove_1, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  return;
}

// test func
export function test_pool_stable_curve_3$ (
  admin: HexString,
  investor: HexString,
  swapper: HexString,
  core: HexString,
  $c: AptosDataCache,
): void {
  let add_1, add_2, decimal_x, decimal_y, fee, protocal_fee, remove_1, swap;
  [decimal_x, decimal_y, fee, protocal_fee] = [u64("8"), u64("6"), u64("100"), u64("100000")];
  add_1 = add_param$(P8, P6, P8, P6, u64("2").mul(P8), u64("0"), u64("0"), $c);
  add_2 = add_param$(P8, P6, P8, P6, u64("2").mul(P8), u64("0"), u64("0"), $c);
  swap = swap_param$(P8, u64("0"), P8, u64("989267"), u64("0"), u64("9"), u64("989258"), $c);
  remove_1 = remove_param$(u64("2").mul(P8), u64("15").mul(P7), u64("505366"), $c);
  test_pool_case$(admin, investor, swapper, core, true, false, POOL_TYPE_STABLE_CURVE, $.copy(decimal_x), $.copy(decimal_y), $.copy(fee), $.copy(protocal_fee), add_1, add_2, swap, remove_1, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  return;
}

// test func
export function test_pool_stable_curve_4$ (
  admin: HexString,
  investor: HexString,
  swapper: HexString,
  core: HexString,
  $c: AptosDataCache,
): void {
  let add_1, add_2, decimal_x, decimal_y, fee, protocal_fee, remove_1, swap;
  [decimal_x, decimal_y, fee, protocal_fee] = [u64("10"), u64("6"), u64("100"), u64("100000")];
  add_1 = add_param$(P10, P6, P10, P6, u64("2").mul(P10), u64("0"), u64("0"), $c);
  add_2 = add_param$(P10, P6, P10, P6, u64("2").mul(P10), u64("0"), u64("0"), $c);
  swap = swap_param$(P10, u64("0"), P10, u64("989267"), u64("0"), u64("9"), u64("989258"), $c);
  remove_1 = remove_param$(u64("2").mul(P10), u64("15").mul(P9), u64("505366"), $c);
  test_pool_case$(admin, investor, swapper, core, true, false, POOL_TYPE_STABLE_CURVE, $.copy(decimal_x), $.copy(decimal_y), $.copy(fee), $.copy(protocal_fee), add_1, add_2, swap, remove_1, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  return;
}

// test func
export function test_pool_stable_curve_5$ (
  admin: HexString,
  investor: HexString,
  swapper: HexString,
  core: HexString,
  $c: AptosDataCache,
): void {
  let add_1, add_2, decimal_x, decimal_y, fee, pool_type, print_debug, protocal_fee, remove_1, swap, swap_2;
  [pool_type, print_debug] = [POOL_TYPE_STABLE_CURVE, true];
  [decimal_x, decimal_y, fee, protocal_fee] = [u64("10"), u64("10"), u64("100"), u64("100000")];
  add_1 = add_param$(P10, P10, P10, P10, u64("2").mul(P10), u64("0"), u64("0"), $c);
  add_2 = add_param$(P10, P10, P10, P10, u64("2").mul(P10), u64("0"), u64("0"), $c);
  swap = swap_param$(P4, u64("0"), P4, u64("9999"), u64("0"), u64("0"), u64("9999"), $c);
  remove_1 = remove_param$(u64("2").mul(P10), P10.add(u64("5").mul(P3)), P10.sub(u64("5").mul(P3)), $c);
  test_pool_case$(admin, investor, swapper, core, true, false, $.copy(pool_type), $.copy(decimal_x), $.copy(decimal_y), $.copy(fee), $.copy(protocal_fee), add_1, add_2, swap, remove_1, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  TestShared.fund_for_participants$(swapper, u64("0"), P4, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  TestShared.sync_wallet_save_point$(swapper, $.copy(pool_type), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  swap_2 = swap_param$(u64("0"), P4, u64("9999"), P4, u64("0"), u64("0"), u64("9999"), $c);
  perform_transaction$(swapper, $.copy(pool_type), SWAP, print_debug, swap_2, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  return;
}

// test func
export function test_pool_stable_curve_6$ (
  admin: HexString,
  investor: HexString,
  swapper: HexString,
  core: HexString,
  $c: AptosDataCache,
): void {
  let add_1, add_2, decimal_x, decimal_y, fee, pool_type, print_debug, protocal_fee, remove_1, swap;
  [pool_type, print_debug] = [POOL_TYPE_STABLE_CURVE, true];
  [decimal_x, decimal_y, fee, protocal_fee] = [u64("10"), u64("10"), u64("100"), u64("100000")];
  add_1 = add_param$(P17, P17, P17, P17, u64("2").mul(P17), u64("0"), u64("0"), $c);
  add_2 = add_param$(P17, P17, P17, P17, u64("2").mul(P17), u64("0"), u64("0"), $c);
  swap = swap_param$(P4, u64("0"), P4, u64("9999"), u64("0"), u64("0"), u64("9999"), $c);
  remove_1 = remove_param$(u64("2").mul(P10), P10, P10.sub(u64("1")), $c);
  test_pool_case$(admin, investor, swapper, core, print_debug, false, $.copy(pool_type), $.copy(decimal_x), $.copy(decimal_y), $.copy(fee), $.copy(protocal_fee), add_1, add_2, swap, remove_1, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  return;
}

// test func
export function test_pool_stable_curve_7$ (
  admin: HexString,
  investor: HexString,
  swapper: HexString,
  core: HexString,
  $c: AptosDataCache,
): void {
  let add_1, add_2, decimal_x, decimal_y, fee, pool_type, print_debug, protocal_fee, remove_1, swap;
  [pool_type, print_debug] = [POOL_TYPE_STABLE_CURVE, true];
  [decimal_x, decimal_y, fee, protocal_fee] = [u64("10"), u64("10"), u64("100"), u64("100000")];
  add_1 = add_param$(P18, P18, P18, P18, u64("2").mul(P18), u64("0"), u64("0"), $c);
  add_2 = add_param$(P18, P18, P18, P18, u64("2").mul(P18), u64("0"), u64("0"), $c);
  swap = swap_param$(P4, u64("0"), P4, u64("9999"), u64("0"), u64("0"), u64("9999"), $c);
  remove_1 = remove_param$(u64("2").mul(P10), P10, P10.sub(u64("1")), $c);
  test_pool_case$(admin, investor, swapper, core, print_debug, false, $.copy(pool_type), $.copy(decimal_x), $.copy(decimal_y), $.copy(fee), $.copy(protocal_fee), add_1, add_2, swap, remove_1, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  return;
}

// test func
export function test_pool_stable_curve_8$ (
  admin: HexString,
  investor: HexString,
  swapper: HexString,
  core: HexString,
  $c: AptosDataCache,
): void {
  let add_1, add_2, decimal_x, decimal_y, fee, pool_type, print_debug, protocal_fee, remove_1, swap;
  [pool_type, print_debug] = [POOL_TYPE_STABLE_CURVE, true];
  [decimal_x, decimal_y, fee, protocal_fee] = [u64("8"), u64("6"), u64("100"), u64("100000")];
  add_1 = add_param$(P17, P15, P17, P15, u64("2").mul(P17), u64("0"), u64("0"), $c);
  add_2 = add_param$(P17, P15, P17, P15, u64("2").mul(P17), u64("0"), u64("0"), $c);
  swap = swap_param$(P8, u64("0"), P8, P6.sub(u64("91")), u64("0"), u64("9"), P6.sub(u64("100")), $c);
  remove_1 = remove_param$(u64("2").mul(P10), P10.add(u64("5")), P8.sub(u64("1")), $c);
  test_pool_case$(admin, investor, swapper, core, print_debug, false, $.copy(pool_type), $.copy(decimal_x), $.copy(decimal_y), $.copy(fee), $.copy(protocal_fee), add_1, add_2, swap, remove_1, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  return;
}

// test func
export function test_pool_stable_curve_accumulative_giant$ (
  admin: HexString,
  investor: HexString,
  swapper: HexString,
  core: HexString,
  $c: AptosDataCache,
): void {
  let add_1, add_2, add_3, add_4, decimal_x, decimal_y, fee, pool_type, print_debug, protocal_fee, remove_1, remove_2, remove_3, remove_4, rev_swap_1, rev_swap_2, rev_swap_3, rev_swap_4, swap_1, swap_2, swap_3, swap_4;
  [pool_type, print_debug] = [POOL_TYPE_STABLE_CURVE, true];
  [decimal_x, decimal_y, fee, protocal_fee] = [u64("8"), u64("6"), u64("100"), u64("100000")];
  add_1 = add_param$(P17, P15, P17, P15, u64("2").mul(P17), u64("0"), u64("0"), $c);
  add_2 = add_param$(P17.sub(P8), P15.add(P6), P17.sub(P8).sub(u64("500")), P15.add(P6).sub(u64("5")), u64("2").mul(P17).sub(P4), u64("500"), u64("5"), $c);
  add_3 = add_param$(P17.sub(P8), P15.add(P6), P17.sub(P8).sub(u64("249")), P15.add(P6).sub(u64("2")), u64("2").mul(P17).sub(P4).add(u64("501")), u64("249"), u64("2"), $c);
  add_4 = add_param$(P17.sub(P8), P15.add(P6), P17.sub(P8).sub(u64("166")), P15.add(P6).sub(u64("1")), u64("2").mul(P17).sub(P4).add(u64("717")), u64("166"), u64("1"), $c);
  TestShared.prepare_for_test$(admin, investor, swapper, core, $.copy(pool_type), $.copy(decimal_x), $.copy(decimal_y), u128("0"), u128("0"), u128("0"), u128("0"), u128("0"), $.copy(fee), $.copy(protocal_fee), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  TestShared.fund_for_participants$(investor, u64("4").mul(P17).sub(u64("3").mul(P8)), u64("4").mul(P15).add(u64("3").mul(P6)), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  TestShared.sync_wallet_save_point$(investor, $.copy(pool_type), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  perform_transaction$(investor, $.copy(pool_type), ADD_LIQUIDITY, print_debug, add_1, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  perform_transaction$(investor, $.copy(pool_type), ADD_LIQUIDITY, print_debug, add_2, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  perform_transaction$(investor, $.copy(pool_type), ADD_LIQUIDITY, print_debug, add_3, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  perform_transaction$(investor, $.copy(pool_type), ADD_LIQUIDITY, print_debug, add_4, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  TestShared.fund_for_participants$(swapper, P9, P7, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  TestShared.sync_wallet_save_point$(swapper, $.copy(pool_type), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  swap_1 = swap_param$(P8, u64("0"), P8, P6.sub(u64("91")), u64("0"), u64("9"), P6.sub(u64("100")), $c);
  swap_2 = swap_param$(P8, u64("0"), P8, P6.sub(u64("91")), u64("0"), u64("9"), P6.sub(u64("100")), $c);
  swap_3 = swap_param$(P8, u64("0"), P8, P6.sub(u64("91")), u64("0"), u64("9"), P6.sub(u64("100")), $c);
  swap_4 = swap_param$(P8, u64("0"), P8, P6.sub(u64("91")), u64("0"), u64("9"), P6.sub(u64("100")), $c);
  perform_transaction$(swapper, $.copy(pool_type), SWAP, print_debug, swap_1, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  perform_transaction$(swapper, $.copy(pool_type), SWAP, print_debug, swap_2, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  perform_transaction$(swapper, $.copy(pool_type), SWAP, print_debug, swap_3, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  perform_transaction$(swapper, $.copy(pool_type), SWAP, print_debug, swap_4, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  rev_swap_1 = swap_param$(u64("0"), P6, P8.sub(u64("9001")), P6, u64("999"), u64("0"), P8.sub(u64("10000")), $c);
  rev_swap_2 = swap_param$(u64("0"), P6, P8.sub(P4).add(u64("999")), P6, u64("999"), u64("0"), P8.sub(u64("10000")), $c);
  rev_swap_3 = swap_param$(u64("0"), P6, P8.sub(P4).add(u64("999")), P6, u64("999"), u64("0"), P8.sub(u64("10000")), $c);
  rev_swap_4 = swap_param$(u64("0"), P6, P8.sub(P4).add(u64("999")), P6, u64("999"), u64("0"), P8.sub(u64("10000")), $c);
  perform_transaction$(swapper, $.copy(pool_type), SWAP, print_debug, rev_swap_1, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  perform_transaction$(swapper, $.copy(pool_type), SWAP, print_debug, rev_swap_2, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  perform_transaction$(swapper, $.copy(pool_type), SWAP, print_debug, rev_swap_3, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  perform_transaction$(swapper, $.copy(pool_type), SWAP, print_debug, rev_swap_4, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  remove_1 = remove_param$(u64("2").mul(P17).sub(P4).add(u64("717")), P17.sub(u64("74992272")), P15.add(u64("750078")), $c);
  remove_2 = remove_param$(u64("2").mul(P17).sub(P4).add(u64("501")), P17.sub(u64("74992380")), P15.add(u64("750077")), $c);
  remove_3 = remove_param$(u64("2").mul(P17).sub(P4), P17.sub(u64("74992630")), P15.add(u64("750075")), $c);
  remove_4 = remove_param$(u64("2").mul(P17), P17.sub(u64("74987629")), P15.add(u64("750126")), $c);
  perform_transaction$(investor, $.copy(pool_type), REMOVE_LIQUIDITY, print_debug, remove_1, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  perform_transaction$(investor, $.copy(pool_type), REMOVE_LIQUIDITY, print_debug, remove_2, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  perform_transaction$(investor, $.copy(pool_type), REMOVE_LIQUIDITY, print_debug, remove_3, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  perform_transaction$(investor, $.copy(pool_type), REMOVE_LIQUIDITY, print_debug, remove_4, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  return;
}

// test func
export function test_pool_stable_curve_accumulative_loop_swap$ (
  admin: HexString,
  investor: HexString,
  swapper: HexString,
  core: HexString,
  $c: AptosDataCache,
): void {
  let add_1, ddx, decimal_x, decimal_y, fee, i, i__1, pool_type, print_debug, protocal_fee, rev_swap_1, swap_1;
  [pool_type, print_debug] = [POOL_TYPE_STABLE_CURVE, true];
  [decimal_x, decimal_y, fee, protocal_fee] = [u64("8"), u64("6"), u64("100"), u64("100000")];
  add_1 = add_param$(P17, P15, P17, P15, u64("2").mul(P17), u64("0"), u64("0"), $c);
  TestShared.prepare_for_test$(admin, investor, swapper, core, $.copy(pool_type), $.copy(decimal_x), $.copy(decimal_y), u128("0"), u128("0"), u128("0"), u128("0"), u128("0"), $.copy(fee), $.copy(protocal_fee), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  TestShared.fund_for_participants$(investor, u64("4").mul(P17).sub(u64("3").mul(P8)), u64("4").mul(P15).add(u64("3").mul(P6)), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  TestShared.sync_wallet_save_point$(investor, $.copy(pool_type), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  perform_transaction$(investor, $.copy(pool_type), ADD_LIQUIDITY, print_debug, add_1, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  i = u64("0");
  while ($.copy(i).lt(u64("1000"))) {
    {
      i = $.copy(i).add(u64("1"));
      TestShared.fund_for_participants$(swapper, P8, P6, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
      TestShared.sync_wallet_save_point$(swapper, $.copy(pool_type), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
      swap_1 = swap_param$(P8, u64("0"), P8, P6.sub(u64("91")), u64("0"), u64("9"), P6.sub(u64("100")), $c);
      perform_transaction$(swapper, $.copy(pool_type), SWAP, false, swap_1, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
    }

  }i__1 = u64("0");
  while ($.copy(i__1).lt(u64("1000"))) {
    {
      i__1 = $.copy(i__1).add(u64("1"));
      Std.Debug.print$(i__1, $c, [AtomicTypeTag.U64] as TypeTag[]);
      ddx = $.copy(i__1).div(u64("256"));
      rev_swap_1 = swap_param$(u64("0"), P6, P8.sub(u64("8997")).sub($.copy(ddx)), P6, u64("1000"), u64("0"), P8.sub(u64("10000")).add(u64("3")).sub($.copy(ddx)), $c);
      perform_transaction$(swapper, $.copy(pool_type), SWAP, false, rev_swap_1, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
    }

  }return;
}

// test func
export function test_pool_stable_curve_add_remove$ (
  admin: HexString,
  investor: HexString,
  swapper: HexString,
  core: HexString,
  $c: AptosDataCache,
): void {
  let add_1, add_2, decimal_x, decimal_y, fee, protocal_fee, remove_1, swap;
  [decimal_x, decimal_y, fee, protocal_fee] = [u64("8"), u64("7"), u64("100"), u64("100000")];
  add_1 = new_transaction_param$(P8, P7, u64("0"), INC, INC, INC, INC, INC, INC, P8, P7, u64("2").mul(P8), u64("0"), u64("0"), u64("0"), DEC, DEC, INC, P8, P7, u64("2").mul(P8), $c);
  add_2 = new_transaction_param$(P8, P7, u64("0"), INC, INC, INC, INC, INC, INC, P8, P7, u64("2").mul(P8), u64("0"), u64("0"), u64("0"), DEC, DEC, INC, P8, P7, u64("2").mul(P8), $c);
  swap = new_transaction_param$(P7, u64("0"), u64("0"), INC, INC, INC, INC, INC, INC, P8, P7, u64("2").mul(P8), u64("0"), u64("0"), u64("0"), DEC, DEC, INC, P8, P7, u64("2").mul(P8), $c);
  remove_1 = new TransactionParams({ amt_x: u64("0"), amt_y: u64("0"), amt_lp: u64("2").mul(P8), p: new PoolDelta({ sx: DEC, sy: DEC, slp: DEC, sfx: INC, sfy: INC, sflp: INC, dx: P8, dy: P7, dlp: u64("2").mul(P8), dfx: u64("0"), dfy: u64("0"), dflp: u64("0") }, new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CurveTest", "PoolDelta", [])), w: new WalletDelta({ sx: INC, sy: INC, slp: DEC, dx: P8, dy: P7, dlp: u64("2").mul(P8) }, new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CurveTest", "WalletDelta", [])) }, new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CurveTest", "TransactionParams", []));
  test_pool_case$(admin, investor, swapper, core, true, true, POOL_TYPE_STABLE_CURVE, $.copy(decimal_x), $.copy(decimal_y), $.copy(fee), $.copy(protocal_fee), add_1, add_2, swap, remove_1, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  return;
}

// test func
export function test_pool_stable_curve_deviant$ (
  admin: HexString,
  investor: HexString,
  swapper: HexString,
  core: HexString,
  $c: AptosDataCache,
): void {
  let add_1, add_2, decimal_x, decimal_y, fee, pool_type, print_debug, protocal_fee, remove_1, remove_2, swap, swap_2;
  [pool_type, print_debug] = [POOL_TYPE_STABLE_CURVE, true];
  [decimal_x, decimal_y, fee, protocal_fee] = [u64("8"), u64("6"), u64("100"), u64("100000")];
  add_1 = add_param$(P17, P15, P17, P15, u64("2").mul(P17), u64("0"), u64("0"), $c);
  add_2 = add_param$(P17, u64("2").mul(P15), u64("99999750426479329"), u64("1999997495735207"), u64("299824406454391189"), u64("249573520671"), u64("2504264793"), $c);
  swap = swap_param$(P8, u64("0"), P8, u64("1007033"), u64("0"), u64("10"), u64("1007023"), $c);
  remove_1 = remove_param$(u64("2").mul(P10), u64("8002800501"), u64("120042057"), $c);
  test_pool_case$(admin, investor, swapper, core, print_debug, false, $.copy(pool_type), $.copy(decimal_x), $.copy(decimal_y), $.copy(fee), $.copy(protocal_fee), add_1, add_2, swap, remove_1, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  swap_2 = swap_param$(u64("0"), P6, u64("99283755"), P6, u64("992"), u64("0"), u64("99282763"), $c);
  perform_transaction$(swapper, $.copy(pool_type), SWAP, print_debug, swap_2, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  remove_2 = remove_param$(u64("499824386454391189"), u64("199999742424395073"), u64("2999997375686117"), $c);
  perform_transaction$(investor, $.copy(pool_type), REMOVE_LIQUIDITY, true, remove_2, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  return;
}

// test func
export function test_pool_stable_curve_standard$ (
  admin: HexString,
  investor: HexString,
  swapper: HexString,
  core: HexString,
  $c: AptosDataCache,
): void {
  let add_1, add_2, decimal_x, decimal_y, fee, protocal_fee, remove_1, swap;
  [decimal_x, decimal_y, fee, protocal_fee] = [u64("8"), u64("7"), u64("100"), u64("100000")];
  add_1 = new_transaction_param$(P8, P7, u64("0"), INC, INC, INC, INC, INC, INC, P8, P7, u64("2").mul(P8), u64("0"), u64("0"), u64("0"), DEC, DEC, INC, P8, P7, u64("2").mul(P8), $c);
  add_2 = new_transaction_param$(P8, P7, u64("0"), INC, INC, INC, INC, INC, INC, P8, P7, u64("2").mul(P8), u64("0"), u64("0"), u64("0"), DEC, DEC, INC, P8, P7, u64("2").mul(P8), $c);
  swap = new_transaction_param$(P8, u64("0"), u64("0"), INC, DEC, INC, INC, INC, INC, P8, u64("9892678"), u64("0"), u64("0"), u64("98"), u64("0"), DEC, INC, INC, P8, u64("9892580"), u64("0"), $c);
  remove_1 = new_transaction_param$(u64("0"), u64("0"), u64("2").mul(P8), DEC, DEC, DEC, INC, INC, INC, u64("15").mul(P7), u64("5053661"), u64("2").mul(P8), u64("0"), u64("0"), u64("0"), INC, INC, DEC, u64("15").mul(P7), u64("5053661"), u64("2").mul(P8), $c);
  test_pool_case$(admin, investor, swapper, core, true, false, POOL_TYPE_STABLE_CURVE, $.copy(decimal_x), $.copy(decimal_y), $.copy(fee), $.copy(protocal_fee), add_1, add_2, swap, remove_1, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  return;
}

// test func
export function test_pool_stable_curve_tiny_amt$ (
  admin: HexString,
  investor: HexString,
  swapper: HexString,
  core: HexString,
  $c: AptosDataCache,
): void {
  let add_1, add_2, decimal_x, decimal_y, fee, protocal_fee, remove_1, swap;
  [decimal_x, decimal_y, fee, protocal_fee] = [u64("8"), u64("6"), u64("100"), u64("100000")];
  add_1 = add_param$(P8, P6, P8, P6, u64("2").mul(P8), u64("0"), u64("0"), $c);
  add_2 = add_param$(P8, P6, P8, P6, u64("2").mul(P8), u64("0"), u64("0"), $c);
  swap = swap_param$(P3, u64("0"), P3, u64("10"), u64("0"), u64("0"), u64("10"), $c);
  remove_1 = remove_param$(u64("2").mul(P8), P8.add(u64("500")), P6.sub(u64("5")), $c);
  test_pool_case$(admin, investor, swapper, core, true, false, POOL_TYPE_STABLE_CURVE, $.copy(decimal_x), $.copy(decimal_y), $.copy(fee), $.copy(protocal_fee), add_1, add_2, swap, remove_1, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  return;
}

export function unit_test_poison$ (
  $c: AptosDataCache,
): void {
  Std.UnitTest.create_signers_for_testing$(u64("0"), $c);
  return;
}


