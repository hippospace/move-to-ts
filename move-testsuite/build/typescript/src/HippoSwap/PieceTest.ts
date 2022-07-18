import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient} from "aptos";
import * as Std from "../Std";
import * as PieceSwapScript from "./PieceSwapScript";
import * as Router from "./Router";
import * as TestShared from "./TestShared";
export const packageName = "HippoSwap";
export const moduleAddress = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
export const moduleName = "PieceTest";

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
  { name: "p", typeTag: new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "PieceTest", "PoolDelta", []) },
  { name: "w", typeTag: new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "PieceTest", "WalletDelta", []) }];

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
// #[test]
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
  return new TransactionParams({ amt_x: $.copy(amt_x), amt_y: $.copy(amt_y), amt_lp: u64("0"), p: new PoolDelta({ sx: INC, sy: INC, slp: INC, sfx: INC, sfy: INC, sflp: INC, dx: $.copy(dx), dy: $.copy(dy), dlp: $.copy(dlp), dfx: $.copy(dfx), dfy: $.copy(dfy), dflp: u64("0") }, new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "PieceTest", "PoolDelta", [])), w: new WalletDelta({ sx: DEC, sy: DEC, slp: INC, dx: $.copy(amt_x), dy: $.copy(amt_y), dlp: $.copy(dlp) }, new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "PieceTest", "WalletDelta", [])) }, new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "PieceTest", "TransactionParams", []));
}

// #[test]
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
  return new TransactionParams({ amt_x: $.copy(amt_x), amt_y: $.copy(amt_y), amt_lp: $.copy(amt_lp), p: new PoolDelta({ sx: $.copy(sx), sy: $.copy(sy), slp: $.copy(slp), sfx: $.copy(sfx), sfy: $.copy(sfy), sflp: $.copy(sflp), dx: $.copy(dx), dy: $.copy(dy), dlp: $.copy(dlp), dfx: $.copy(dfx), dfy: $.copy(dfy), dflp: $.copy(dflp) }, new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "PieceTest", "PoolDelta", [])), w: new WalletDelta({ sx: $.copy(wsx), sy: $.copy(wsy), slp: $.copy(wslp), dx: $.copy(wdx), dy: $.copy(wdy), dlp: $.copy(wdlp) }, new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "PieceTest", "WalletDelta", [])) }, new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "PieceTest", "TransactionParams", []));
}

// #[test]
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
      PieceSwapScript.swap$(trader, $.copy(param.amt_x), $.copy(param.amt_y), u64("0"), u64("0"), $c, [$p[0], $p[1]] as TypeTag[]);
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

// #[test]
export function remove_param$ (
  amt_lp: U64,
  dx: U64,
  dy: U64,
  $c: AptosDataCache,
): TransactionParams {
  return new TransactionParams({ amt_x: u64("0"), amt_y: u64("0"), amt_lp: $.copy(amt_lp), p: new PoolDelta({ sx: DEC, sy: DEC, slp: DEC, sfx: DEC, sfy: DEC, sflp: DEC, dx: $.copy(dx), dy: $.copy(dy), dlp: $.copy(amt_lp), dfx: u64("0"), dfy: u64("0"), dflp: u64("0") }, new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "PieceTest", "PoolDelta", [])), w: new WalletDelta({ sx: INC, sy: INC, slp: DEC, dx: $.copy(dx), dy: $.copy(dy), dlp: $.copy(amt_lp) }, new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "PieceTest", "WalletDelta", [])) }, new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "PieceTest", "TransactionParams", []));
}

// #[test]
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
  return new TransactionParams({ amt_x: $.copy(amt_x), amt_y: $.copy(amt_y), amt_lp: u64("0"), p: new PoolDelta({ sx: $.copy(sx), sy: $.copy(sy), slp: INC, sfx: INC, sfy: INC, sflp: INC, dx: $.copy(dx), dy: $.copy(dy), dlp: u64("0"), dfx: $.copy(dfx), dfy: $.copy(dfy), dflp: u64("0") }, new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "PieceTest", "PoolDelta", [])), w: new WalletDelta({ sx: $.copy(sy), sy: $.copy(sx), slp: INC, dx: $.copy(wdx), dy: $.copy(wdy), dlp: u64("0") }, new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "PieceTest", "WalletDelta", [])) }, new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "PieceTest", "TransactionParams", []));
}

// #[test]
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
  k: U128,
  n1: U128,
  d1: U128,
  n2: U128,
  d2: U128,
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
  TestShared.prepare_for_test$(admin, investor, swapper, core, $.copy(pool_type), $.copy(decimal_x), $.copy(decimal_y), $.copy(k), $.copy(n1), $.copy(d1), $.copy(n2), $.copy(d2), $.copy(fee), $.copy(protocal_fee), $c, [$p[0], $p[1]] as TypeTag[]);
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

// #[test]
export function test_pool_piece_swap_4$ (
  admin: HexString,
  investor: HexString,
  swapper: HexString,
  core: HexString,
  $c: AptosDataCache,
): void {
  let add_1, add_2, d1, d2, decimal_x, decimal_y, fee, k, n1, n2, protocal_fee, remove_1, swap;
  [decimal_x, decimal_y] = [u64("10"), u64("6")];
  [k, n1, d1, n2, d2, fee, protocal_fee] = [u128(P18), u128("110"), u128("100"), u128("105"), u128("100"), u64("100"), u64("100")];
  add_1 = add_param$(P10, P6, P10, P6, P10, u64("0"), u64("0"), $c);
  add_2 = add_param$(P10, P6, P10, P6, P10, u64("0"), u64("0"), $c);
  swap = swap_param$(P10, u64("0"), P10, u64("977172"), u64("0"), u64("9"), u64("977163"), $c);
  remove_1 = remove_param$(u64("2").mul(P10), u64("3").mul(P10), u64("1022828"), $c);
  test_pool_case$(admin, investor, swapper, core, true, false, POOL_TYPE_PIECEWISE, $.copy(decimal_x), $.copy(decimal_y), $.copy(k), $.copy(n1), $.copy(d1), $.copy(n2), $.copy(d2), $.copy(fee), $.copy(protocal_fee), add_1, add_2, swap, remove_1, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  return;
}

// #[test]
export function test_pool_piece_swap_5$ (
  admin: HexString,
  investor: HexString,
  swapper: HexString,
  core: HexString,
  $c: AptosDataCache,
): void {
  let add_1, add_2, d1, d2, decimal_x, decimal_y, fee, k, n1, n2, protocal_fee, remove_1, swap;
  [decimal_x, decimal_y] = [u64("10"), u64("10")];
  [k, n1, d1, n2, d2, fee, protocal_fee] = [u128(P18), u128("110"), u128("100"), u128("105"), u128("100"), u64("100"), u64("100")];
  add_1 = add_param$(P10, P10, P10, P10, P10, u64("0"), u64("0"), $c);
  add_2 = add_param$(P10, P10, P10, P10, P10, u64("0"), u64("0"), $c);
  swap = swap_param$(P4, u64("0"), P4, u64("9999"), u64("0"), u64("0"), u64("9999"), $c);
  remove_1 = remove_param$(u64("2").mul(P10), u64("2").mul(P10).add(P4), u64("2").mul(P10).sub(P4).add(u64("1")), $c);
  test_pool_case$(admin, investor, swapper, core, true, false, POOL_TYPE_PIECEWISE, $.copy(decimal_x), $.copy(decimal_y), $.copy(k), $.copy(n1), $.copy(d1), $.copy(n2), $.copy(d2), $.copy(fee), $.copy(protocal_fee), add_1, add_2, swap, remove_1, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  return;
}

// #[test]
export function test_pool_piece_swap_6$ (
  admin: HexString,
  investor: HexString,
  swapper: HexString,
  core: HexString,
  $c: AptosDataCache,
): void {
  let add_1, add_2, d1, d2, decimal_x, decimal_y, fee, k, n1, n2, pool_type, print_debug, protocal_fee, remove_1, swap;
  [pool_type, print_debug] = [POOL_TYPE_PIECEWISE, true];
  [decimal_x, decimal_y] = [u64("10"), u64("10")];
  [k, n1, d1, n2, d2, fee, protocal_fee] = [u128(P18), u128("110"), u128("100"), u128("105"), u128("100"), u64("100"), u64("100")];
  add_1 = add_param$(P17, P17, P17, P17, P17, u64("0"), u64("0"), $c);
  add_2 = add_param$(P17, P17, P17, P17, P17, u64("0"), u64("0"), $c);
  swap = swap_param$(P4, u64("0"), P4, u64("8000"), u64("0"), u64("0"), u64("8000"), $c);
  remove_1 = remove_param$(P10, P10, P10.sub(u64("1")), $c);
  test_pool_case$(admin, investor, swapper, core, print_debug, false, $.copy(pool_type), $.copy(decimal_x), $.copy(decimal_y), $.copy(k), $.copy(n1), $.copy(d1), $.copy(n2), $.copy(d2), $.copy(fee), $.copy(protocal_fee), add_1, add_2, swap, remove_1, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  return;
}

// #[test]
export function test_pool_piece_swap_7$ (
  admin: HexString,
  investor: HexString,
  swapper: HexString,
  core: HexString,
  $c: AptosDataCache,
): void {
  let add_1, add_2, d1, d2, decimal_x, decimal_y, fee, k, n1, n2, pool_type, print_debug, protocal_fee, remove_1, swap, swap_2;
  [pool_type, print_debug] = [POOL_TYPE_PIECEWISE, true];
  [decimal_x, decimal_y] = [u64("10"), u64("10")];
  [k, n1, d1, n2, d2, fee, protocal_fee] = [u128(P18), u128("110"), u128("100"), u128("105"), u128("100"), u64("100"), u64("100")];
  add_1 = add_param$(P18, P18, P18, P18, P18, u64("0"), u64("0"), $c);
  add_2 = add_param$(P18, P18, P18, P18, P18, u64("0"), u64("0"), $c);
  swap = swap_param$(P4, u64("0"), P4, u64("0"), u64("0"), u64("0"), u64("0"), $c);
  remove_1 = remove_param$(P10, P10, P10, $c);
  test_pool_case$(admin, investor, swapper, core, print_debug, false, $.copy(pool_type), $.copy(decimal_x), $.copy(decimal_y), $.copy(k), $.copy(n1), $.copy(d1), $.copy(n2), $.copy(d2), $.copy(fee), $.copy(protocal_fee), add_1, add_2, swap, remove_1, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  TestShared.fund_for_participants$(swapper, P8, u64("0"), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  TestShared.sync_wallet_save_point$(swapper, $.copy(pool_type), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  swap_2 = swap_param$(P8, u64("0"), P8, P8.sub(u64("48997")), u64("0"), u64("999"), P8.sub(u64("49996")), $c);
  perform_transaction$(swapper, $.copy(pool_type), SWAP, print_debug, swap_2, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  return;
}

// #[test]
export function test_pool_piece_swap_8$ (
  admin: HexString,
  investor: HexString,
  swapper: HexString,
  core: HexString,
  $c: AptosDataCache,
): void {
  let add_1, add_2, d1, d2, decimal_x, decimal_y, fee, k, n1, n2, pool_type, print_debug, protocal_fee, remove_1, swap;
  [pool_type, print_debug] = [POOL_TYPE_PIECEWISE, true];
  [decimal_x, decimal_y] = [u64("8"), u64("6")];
  [k, n1, d1, n2, d2, fee, protocal_fee] = [u128(P18), u128("110"), u128("100"), u128("105"), u128("100"), u64("100"), u64("100")];
  add_1 = add_param$(P17, P15, P17, P15, P17, u64("0"), u64("0"), $c);
  add_2 = add_param$(P17, P15, P17, P15, P17, u64("0"), u64("0"), $c);
  swap = swap_param$(P8, u64("0"), P8, P6.sub(u64("130")), u64("0"), u64("9"), P6.sub(u64("139")), $c);
  remove_1 = remove_param$(P10, P10.add(u64("5")), P8.sub(u64("1")), $c);
  test_pool_case$(admin, investor, swapper, core, print_debug, false, $.copy(pool_type), $.copy(decimal_x), $.copy(decimal_y), $.copy(k), $.copy(n1), $.copy(d1), $.copy(n2), $.copy(d2), $.copy(fee), $.copy(protocal_fee), add_1, add_2, swap, remove_1, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  return;
}

// #[test]
export function test_pool_piece_swap_accumulative_giant$ (
  admin: HexString,
  investor: HexString,
  swapper: HexString,
  core: HexString,
  $c: AptosDataCache,
): void {
  let add_1, add_2, add_3, add_4, d1, d2, decimal_x, decimal_y, fee, k, n1, n2, pool_type, print_debug, protocal_fee, remove_1, remove_2, remove_3, remove_4, rev_swap_1, rev_swap_2, rev_swap_3, rev_swap_4, swap_1, swap_2, swap_3, swap_4;
  [pool_type, print_debug] = [POOL_TYPE_PIECEWISE, true];
  [decimal_x, decimal_y] = [u64("8"), u64("6")];
  [k, n1, d1, n2, d2, fee, protocal_fee] = [u128(P18), u128("110"), u128("100"), u128("105"), u128("100"), u64("100"), u64("100")];
  add_1 = add_param$(P17, P15, P17, P15, P17, u64("0"), u64("0"), $c);
  add_2 = add_param$(P17.sub(P8), P15.sub(P6), P17.sub(P8), P15.sub(P6), P17.sub(P8), u64("0"), u64("0"), $c);
  add_3 = add_param$(P17.sub(P8), P15.sub(P6), P17.sub(P8), P15.sub(P6), P17.sub(P8), u64("0"), u64("0"), $c);
  add_4 = add_param$(P17.sub(P8), P15.sub(P6), P17.sub(P8), P15.sub(P6), P17.sub(P8), u64("0"), u64("0"), $c);
  TestShared.prepare_for_test$(admin, investor, swapper, core, $.copy(pool_type), $.copy(decimal_x), $.copy(decimal_y), $.copy(k), $.copy(n1), $.copy(d1), $.copy(n2), $.copy(d2), $.copy(fee), $.copy(protocal_fee), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  TestShared.fund_for_participants$(investor, u64("4").mul(P17).sub(u64("3").mul(P8)), u64("4").mul(P15).add(u64("3").mul(P6)), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  TestShared.sync_wallet_save_point$(investor, $.copy(pool_type), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  perform_transaction$(investor, $.copy(pool_type), ADD_LIQUIDITY, print_debug, add_1, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  perform_transaction$(investor, $.copy(pool_type), ADD_LIQUIDITY, print_debug, add_2, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  perform_transaction$(investor, $.copy(pool_type), ADD_LIQUIDITY, print_debug, add_3, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  perform_transaction$(investor, $.copy(pool_type), ADD_LIQUIDITY, print_debug, add_4, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  TestShared.fund_for_participants$(swapper, P9, P7, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  TestShared.sync_wallet_save_point$(swapper, $.copy(pool_type), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  swap_1 = swap_param$(P8, u64("0"), P8, P6.sub(u64("130")), u64("0"), u64("9"), P6.sub(u64("139")), $c);
  swap_2 = swap_param$(P8, u64("0"), P8, P6.sub(u64("130")), u64("0"), u64("9"), P6.sub(u64("139")), $c);
  swap_3 = swap_param$(P8, u64("0"), P8, P6.sub(u64("130")), u64("0"), u64("9"), P6.sub(u64("139")), $c);
  swap_4 = swap_param$(P8, u64("0"), P8, P6.sub(u64("210")), u64("0"), u64("9"), P6.sub(u64("219")), $c);
  perform_transaction$(swapper, $.copy(pool_type), SWAP, print_debug, swap_1, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  perform_transaction$(swapper, $.copy(pool_type), SWAP, print_debug, swap_2, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  perform_transaction$(swapper, $.copy(pool_type), SWAP, print_debug, swap_3, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  perform_transaction$(swapper, $.copy(pool_type), SWAP, print_debug, swap_4, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  rev_swap_1 = swap_param$(u64("0"), P6, P8.sub(u64("20999")), P6, u64("999"), u64("0"), P8.sub(u64("21998")), $c);
  rev_swap_2 = swap_param$(u64("0"), P6, P8.sub(u64("20999")), P6, u64("999"), u64("0"), P8.sub(u64("21998")), $c);
  rev_swap_3 = swap_param$(u64("0"), P6, P8.sub(u64("13000")), P6, u64("999"), u64("0"), P8.sub(u64("13999")), $c);
  rev_swap_4 = swap_param$(u64("0"), P6, P8.sub(u64("13000")), P6, u64("999"), u64("0"), P8.sub(u64("13999")), $c);
  perform_transaction$(swapper, $.copy(pool_type), SWAP, print_debug, rev_swap_1, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  perform_transaction$(swapper, $.copy(pool_type), SWAP, print_debug, rev_swap_2, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  perform_transaction$(swapper, $.copy(pool_type), SWAP, print_debug, rev_swap_3, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  perform_transaction$(swapper, $.copy(pool_type), SWAP, print_debug, rev_swap_4, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  remove_1 = remove_param$(P17.sub(P8), P17.sub(P8).add(u64("16999")), P15.sub(P6).add(u64("149")), $c);
  remove_2 = remove_param$(P17.sub(P8), P17.sub(P8).add(u64("16999")), P15.sub(P6).add(u64("150")), $c);
  remove_3 = remove_param$(P17.sub(P8), P17.sub(P8).add(u64("16999")), P15.sub(P6).add(u64("150")), $c);
  remove_4 = remove_param$(P17, P17.add(u64("17001")), P15.add(u64("151")), $c);
  perform_transaction$(investor, $.copy(pool_type), REMOVE_LIQUIDITY, print_debug, remove_1, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  perform_transaction$(investor, $.copy(pool_type), REMOVE_LIQUIDITY, print_debug, remove_2, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  perform_transaction$(investor, $.copy(pool_type), REMOVE_LIQUIDITY, print_debug, remove_3, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  perform_transaction$(investor, $.copy(pool_type), REMOVE_LIQUIDITY, print_debug, remove_4, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  return;
}

// #[test]
export function test_pool_piece_swap_deviant$ (
  admin: HexString,
  investor: HexString,
  swapper: HexString,
  core: HexString,
  $c: AptosDataCache,
): void {
  let add_1, add_2, d1, d2, decimal_x, decimal_y, fee, k, n1, n2, pool_type, print_debug, protocal_fee, remove_1, remove_2, swap, swap_2;
  [pool_type, print_debug] = [POOL_TYPE_PIECEWISE, true];
  [decimal_x, decimal_y] = [u64("8"), u64("6")];
  [k, n1, d1, n2, d2, fee, protocal_fee] = [u128(P18), u128("110"), u128("100"), u128("105"), u128("100"), u64("100"), u64("100")];
  add_1 = add_param$(P17, P15, P17, P15, P17, u64("0"), u64("0"), $c);
  add_2 = add_param$(P17, P15, P17, P15, P17, u64("0"), u64("0"), $c);
  swap = swap_param$(P17, u64("0"), P17, u64("977172461764492"), u64("0"), u64("9772604152"), u64("977162689160340"), $c);
  remove_1 = remove_param$(u64("2").mul(P10), u64("30000000000"), u64("102282753"), $c);
  test_pool_case$(admin, investor, swapper, core, print_debug, false, $.copy(pool_type), $.copy(decimal_x), $.copy(decimal_y), $.copy(k), $.copy(n1), $.copy(d1), $.copy(n2), $.copy(d2), $.copy(fee), $.copy(protocal_fee), add_1, add_2, swap, remove_1, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  swap_2 = swap_param$(u64("0"), P6, u64("104695577"), P6, u64("1047"), u64("0"), u64("104694530"), $c);
  perform_transaction$(swapper, $.copy(pool_type), SWAP, print_debug, swap_2, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  remove_2 = remove_param$(u64("199999980000000000"), u64("299999969895304423"), u64("1022827436952755"), $c);
  perform_transaction$(investor, $.copy(pool_type), REMOVE_LIQUIDITY, true, remove_2, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDC", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", [])] as TypeTag[]);
  return;
}

export function unit_test_poison$ (
  $c: AptosDataCache,
): void {
  Std.UnitTest.create_signers_for_testing$(u64("0"), $c);
  return;
}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::PieceTest::PoolDelta", PoolDelta.PoolDeltaParser);
  repo.addParser("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::PieceTest::TransactionParams", TransactionParams.TransactionParamsParser);
  repo.addParser("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8::PieceTest::WalletDelta", WalletDelta.WalletDeltaParser);
}

