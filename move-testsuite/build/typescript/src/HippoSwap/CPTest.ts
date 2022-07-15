import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient} from "aptos";
import * as Std from "../Std";
import * as CPScripts from "./CPScripts";
import * as Router from "./Router";
import * as TestShared from "./TestShared";
export const packageName = "HippoSwap";
export const moduleAddress = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
export const moduleName = "CPTest";

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
  { name: "p", typeTag: new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPTest", "PoolDelta", []) },
  { name: "w", typeTag: new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPTest", "WalletDelta", []) }];

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
  dflp: U64,
  dwlp: U64,
  $c: AptosDataCache,
): TransactionParams {
  return new TransactionParams({ amt_x: $.copy(amt_x), amt_y: $.copy(amt_y), amt_lp: u64("0"), p: new PoolDelta({ sx: INC, sy: INC, slp: INC, sfx: INC, sfy: INC, sflp: INC, dx: $.copy(dx), dy: $.copy(dy), dlp: $.copy(dlp), dfx: u64("0"), dfy: u64("0"), dflp: $.copy(dflp) }, new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPTest", "PoolDelta", [])), w: new WalletDelta({ sx: DEC, sy: DEC, slp: INC, dx: $.copy(amt_x), dy: $.copy(amt_y), dlp: $.copy(dwlp) }, new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPTest", "WalletDelta", [])) }, new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPTest", "TransactionParams", []));
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
  return new TransactionParams({ amt_x: $.copy(amt_x), amt_y: $.copy(amt_y), amt_lp: $.copy(amt_lp), p: new PoolDelta({ sx: $.copy(sx), sy: $.copy(sy), slp: $.copy(slp), sfx: $.copy(sfx), sfy: $.copy(sfy), sflp: $.copy(sflp), dx: $.copy(dx), dy: $.copy(dy), dlp: $.copy(dlp), dfx: $.copy(dfx), dfy: $.copy(dfy), dflp: $.copy(dflp) }, new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPTest", "PoolDelta", [])), w: new WalletDelta({ sx: $.copy(wsx), sy: $.copy(wsy), slp: $.copy(wslp), dx: $.copy(wdx), dy: $.copy(wdy), dlp: $.copy(wdlp) }, new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPTest", "WalletDelta", [])) }, new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPTest", "TransactionParams", []));
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
      CPScripts.swap$(trader, $.copy(param.amt_x), $.copy(param.amt_y), u64("0"), u64("0"), $c, [$p[0], $p[1]] as TypeTag[]);
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
  dlp: U64,
  dflp: U64,
  $c: AptosDataCache,
): TransactionParams {
  return new TransactionParams({ amt_x: u64("0"), amt_y: u64("0"), amt_lp: $.copy(amt_lp), p: new PoolDelta({ sx: DEC, sy: DEC, slp: DEC, sfx: DEC, sfy: DEC, sflp: INC, dx: $.copy(dx), dy: $.copy(dy), dlp: $.copy(dlp), dfx: u64("0"), dfy: u64("0"), dflp: $.copy(dflp) }, new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPTest", "PoolDelta", [])), w: new WalletDelta({ sx: INC, sy: INC, slp: DEC, dx: $.copy(dx), dy: $.copy(dy), dlp: $.copy(amt_lp) }, new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPTest", "WalletDelta", [])) }, new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPTest", "TransactionParams", []));
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
  return new TransactionParams({ amt_x: $.copy(amt_x), amt_y: $.copy(amt_y), amt_lp: u64("0"), p: new PoolDelta({ sx: $.copy(sx), sy: $.copy(sy), slp: INC, sfx: INC, sfy: INC, sflp: INC, dx: $.copy(dx), dy: $.copy(dy), dlp: u64("0"), dfx: $.copy(dfx), dfy: $.copy(dfy), dflp: u64("0") }, new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPTest", "PoolDelta", [])), w: new WalletDelta({ sx: $.copy(sy), sy: $.copy(sx), slp: INC, dx: $.copy(wdx), dy: $.copy(wdy), dlp: u64("0") }, new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPTest", "WalletDelta", [])) }, new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "CPTest", "TransactionParams", []));
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
export function test_pool_constant_product_1$ (
  admin: HexString,
  investor: HexString,
  swapper: HexString,
  core: HexString,
  $c: AptosDataCache,
): void {
  let add_1, add_2, decimal_x, decimal_y, fee, pool_type, print_debug, protocal_fee, remove_1, swap;
  [pool_type, print_debug] = [POOL_TYPE_CONSTANT_PRODUCT, true];
  [decimal_x, decimal_y, fee, protocal_fee] = [u64("8"), u64("6"), u64("100"), u64("100000")];
  add_1 = add_param$(P15, P13, P15, P13, P14, u64("1000"), P14.sub(u64("1000")), $c);
  add_2 = add_param$(P15, P13, P15, P13, P14, u64("0"), P14, $c);
  swap = swap_param$(P8, u64("0"), P8, P6.sub(u64("3001")), u64("0"), u64("0"), P6.sub(u64("3001")), $c);
  remove_1 = remove_param$(u64("2").mul(P10), u64("2").mul(P11).add(u64("9997")), u64("2").mul(P9).sub(u64("100")), u64("2").mul(P10).sub(u64("2500")), u64("2500"), $c);
  test_pool_case$(admin, investor, swapper, core, print_debug, false, $.copy(pool_type), $.copy(decimal_x), $.copy(decimal_y), $.copy(fee), $.copy(protocal_fee), add_1, add_2, swap, remove_1, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WBTC", [])] as TypeTag[]);
  return;
}

// test func
export function test_pool_constant_product_2$ (
  admin: HexString,
  investor: HexString,
  swapper: HexString,
  core: HexString,
  $c: AptosDataCache,
): void {
  let add_1, add_2, decimal_x, decimal_y, fee, pool_type, print_debug, protocal_fee, remove_1, swap;
  [pool_type, print_debug] = [POOL_TYPE_CONSTANT_PRODUCT, true];
  [decimal_x, decimal_y, fee, protocal_fee] = [u64("8"), u64("6"), u64("100"), u64("100000")];
  add_1 = add_param$(P17, P15, P17, P15, P16, u64("1000"), P16.sub(u64("1000")), $c);
  add_2 = add_param$(P17, P15, P17, P15, P16, u64("0"), P16, $c);
  swap = swap_param$(P8, u64("0"), P8, P6.sub(u64("3001")), u64("0"), u64("0"), P6.sub(u64("3001")), $c);
  remove_1 = remove_param$(u64("2").mul(P10), u64("2").mul(P11).add(u64("9997")), u64("2").mul(P9).sub(u64("100")), u64("2").mul(P10).sub(u64("2500")), u64("2500"), $c);
  test_pool_case$(admin, investor, swapper, core, print_debug, false, $.copy(pool_type), $.copy(decimal_x), $.copy(decimal_y), $.copy(fee), $.copy(protocal_fee), add_1, add_2, swap, remove_1, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WUSDT", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WBTC", [])] as TypeTag[]);
  return;
}

// test func
export function test_pool_constant_product_3$ (
  admin: HexString,
  investor: HexString,
  swapper: HexString,
  core: HexString,
  $c: AptosDataCache,
): void {
  let add_1, add_2, decimal_x, decimal_y, fee, pool_type, print_debug, protocal_fee, remove_1, remove_2, swap, swap__1;
  [pool_type, print_debug] = [POOL_TYPE_CONSTANT_PRODUCT, true];
  [decimal_x, decimal_y, fee, protocal_fee] = [u64("8"), u64("6"), u64("100"), u64("100000")];
  add_1 = add_param$(P15, P13, P15, P13, P14, u64("1000"), P14.sub(u64("1000")), $c);
  add_2 = add_param$(P15, P13, P15, P13, P14, u64("0"), P14, $c);
  swap = swap_param$(P8, u64("0"), P8, P6.sub(u64("3001")), u64("0"), u64("0"), P6.sub(u64("3001")), $c);
  remove_1 = remove_param$(u64("2").mul(P10), u64("2").mul(P11).add(u64("9997")), u64("2").mul(P9).sub(u64("100")), u64("2").mul(P10).sub(u64("2500")), u64("2500"), $c);
  test_pool_case$(admin, investor, swapper, core, print_debug, false, $.copy(pool_type), $.copy(decimal_x), $.copy(decimal_y), $.copy(fee), $.copy(protocal_fee), add_1, add_2, swap, remove_1, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WBTC", [])] as TypeTag[]);
  TestShared.fund_for_participants$(swapper, P9, P7, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WBTC", [])] as TypeTag[]);
  TestShared.sync_wallet_save_point$(swapper, $.copy(pool_type), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WBTC", [])] as TypeTag[]);
  swap__1 = swap_param$(P8, u64("0"), P8, P6.sub(u64("3001")), u64("0"), u64("0"), P6.sub(u64("3001")), $c);
  perform_transaction$(swapper, $.copy(pool_type), SWAP, print_debug, swap__1, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WBTC", [])] as TypeTag[]);
  remove_2 = remove_param$(u64("2").mul(P10), u64("2").mul(P11).add(u64("19995")), u64("2").mul(P9).sub(u64("200")), u64("2").mul(P10).sub(u64("2500")), u64("2500"), $c);
  perform_transaction$(investor, $.copy(pool_type), REMOVE_LIQUIDITY, true, remove_2, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDAI", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WBTC", [])] as TypeTag[]);
  return;
}

// test func
export function test_pool_constant_product_accumulative_giant_amt$ (
  admin: HexString,
  investor: HexString,
  swapper: HexString,
  core: HexString,
  $c: AptosDataCache,
): void {
  let add_1, add_2, decimal_x, decimal_y, fee, pool_type, print_debug, protocal_fee, swap, swap_1, swap_2, swap_3, swap_4, swap_5, swap_6, swap_7, swap_8;
  [pool_type, print_debug] = [POOL_TYPE_CONSTANT_PRODUCT, true];
  [decimal_x, decimal_y, fee, protocal_fee] = [u64("8"), u64("6"), u64("100"), u64("100000")];
  TestShared.prepare_for_test$(admin, investor, swapper, core, $.copy(pool_type), $.copy(decimal_x), $.copy(decimal_y), u128("0"), u128("0"), u128("0"), u128("0"), u128("0"), $.copy(fee), $.copy(protocal_fee), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDOT", [])] as TypeTag[]);
  add_1 = add_param$(P15, P13, P15, P13, P14, u64("1000"), P14.sub(u64("1000")), $c);
  add_2 = add_param$(P15, P13, P15, P13, P14, u64("0"), P14, $c);
  TestShared.fund_for_participants$(investor, P15.mul(u64("3")).add(u64("5").mul(P14)), P13.mul(u64("3")), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDOT", [])] as TypeTag[]);
  TestShared.sync_wallet_save_point$(investor, $.copy(pool_type), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDOT", [])] as TypeTag[]);
  perform_transaction$(investor, $.copy(pool_type), ADD_LIQUIDITY, print_debug, add_1, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDOT", [])] as TypeTag[]);
  perform_transaction$(investor, $.copy(pool_type), ADD_LIQUIDITY, print_debug, add_2, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDOT", [])] as TypeTag[]);
  TestShared.fund_for_participants$(swapper, P10, P8, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDOT", [])] as TypeTag[]);
  TestShared.sync_wallet_save_point$(swapper, $.copy(pool_type), $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDOT", [])] as TypeTag[]);
  swap = swap_param$(u64("5").mul(P8), u64("0"), u64("5").mul(P8), u64("5").mul(P6).sub(u64("15002")), u64("0"), u64("0"), u64("5").mul(P6).sub(u64("15002")), $c);
  swap_1 = swap_param$(u64("5").mul(P8), u64("0"), u64("5").mul(P8), u64("5").mul(P6).sub(u64("15004")), u64("0"), u64("0"), u64("5").mul(P6).sub(u64("15004")), $c);
  swap_2 = swap_param$(u64("5").mul(P8), u64("0"), u64("5").mul(P8), u64("5").mul(P6).sub(u64("15006")), u64("0"), u64("0"), u64("5").mul(P6).sub(u64("15006")), $c);
  swap_3 = swap_param$(u64("5").mul(P8), u64("0"), u64("5").mul(P8), u64("5").mul(P6).sub(u64("15008")), u64("0"), u64("0"), u64("5").mul(P6).sub(u64("15008")), $c);
  swap_4 = swap_param$(u64("5").mul(P8), u64("0"), u64("5").mul(P8), u64("5").mul(P6).sub(u64("15012")), u64("0"), u64("0"), u64("5").mul(P6).sub(u64("15012")), $c);
  swap_5 = swap_param$(u64("5").mul(P8), u64("0"), u64("5").mul(P8), u64("5").mul(P6).sub(u64("15014")), u64("0"), u64("0"), u64("5").mul(P6).sub(u64("15014")), $c);
  swap_6 = swap_param$(u64("5").mul(P8), u64("0"), u64("5").mul(P8), u64("5").mul(P6).sub(u64("15016")), u64("0"), u64("0"), u64("5").mul(P6).sub(u64("15016")), $c);
  swap_7 = swap_param$(u64("5").mul(P8), u64("0"), u64("5").mul(P8), u64("5").mul(P6).sub(u64("15018")), u64("0"), u64("0"), u64("5").mul(P6).sub(u64("15018")), $c);
  swap_8 = swap_param$(u64("5").mul(P8), u64("0"), u64("5").mul(P8), u64("5").mul(P6).sub(u64("15021")), u64("0"), u64("0"), u64("5").mul(P6).sub(u64("15021")), $c);
  perform_transaction$(swapper, $.copy(pool_type), SWAP, print_debug, swap, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDOT", [])] as TypeTag[]);
  perform_transaction$(swapper, $.copy(pool_type), SWAP, print_debug, swap_1, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDOT", [])] as TypeTag[]);
  perform_transaction$(swapper, $.copy(pool_type), SWAP, print_debug, swap_2, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDOT", [])] as TypeTag[]);
  perform_transaction$(swapper, $.copy(pool_type), SWAP, print_debug, swap_3, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDOT", [])] as TypeTag[]);
  perform_transaction$(swapper, $.copy(pool_type), SWAP, print_debug, swap_4, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDOT", [])] as TypeTag[]);
  perform_transaction$(swapper, $.copy(pool_type), SWAP, print_debug, swap_5, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDOT", [])] as TypeTag[]);
  perform_transaction$(swapper, $.copy(pool_type), SWAP, print_debug, swap_6, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDOT", [])] as TypeTag[]);
  perform_transaction$(swapper, $.copy(pool_type), SWAP, print_debug, swap_7, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDOT", [])] as TypeTag[]);
  perform_transaction$(swapper, $.copy(pool_type), SWAP, print_debug, swap_8, $c, [new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WETH", []), new StructTag(new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8"), "MockCoin", "WDOT", [])] as TypeTag[]);
  return;
}

export function unit_test_poison$ (
  $c: AptosDataCache,
): void {
  Std.UnitTest.create_signers_for_testing$(u64("0"), $c);
  return;
}


