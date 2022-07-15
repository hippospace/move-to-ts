import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient} from "aptos";
import * as Std from "../Std";
import * as Table from "./Table";
export const packageName = "AptosFramework";
export const moduleAddress = new HexString("0x1");
export const moduleName = "BigVector";

export const EINDEX_OUT_OF_BOUNDS : U64 = u64("0");
export const ENOT_EMPTY : U64 = u64("2");
export const EOUT_OF_CAPACITY : U64 = u64("1");


export class BigVector 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "BigVector";
  static typeParameters: TypeParamDeclType[] = [
    { name: "T", isPhantom: false }
  ];
  static fields: FieldDeclType[] = [
  { name: "buckets", typeTag: new StructTag(new HexString("0x1"), "Table", "Table", [AtomicTypeTag.U64, new VectorTag(new $.TypeParamIdx(0))]) },
  { name: "end_index", typeTag: new StructTag(new HexString("0x1"), "BigVector", "BigVectorIndex", []) },
  { name: "num_buckets", typeTag: AtomicTypeTag.U64 },
  { name: "bucket_size", typeTag: AtomicTypeTag.U64 }];

  buckets: Table.Table;
  end_index: BigVectorIndex;
  num_buckets: U64;
  bucket_size: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.buckets = proto['buckets'] as Table.Table;
    this.end_index = proto['end_index'] as BigVectorIndex;
    this.num_buckets = proto['num_buckets'] as U64;
    this.bucket_size = proto['bucket_size'] as U64;
  }

  static BigVectorParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : BigVector {
    const proto = $.parseStructProto(data, typeTag, repo, BigVector);
    return new BigVector(proto, typeTag);
  }

}

export class BigVectorIndex 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "BigVectorIndex";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "bucket_index", typeTag: AtomicTypeTag.U64 },
  { name: "vec_index", typeTag: AtomicTypeTag.U64 }];

  bucket_index: U64;
  vec_index: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.bucket_index = proto['bucket_index'] as U64;
    this.vec_index = proto['vec_index'] as U64;
  }

  static BigVectorIndexParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : BigVectorIndex {
    const proto = $.parseStructProto(data, typeTag, repo, BigVectorIndex);
    return new BigVectorIndex(proto, typeTag);
  }

}
// test func
export function big_vector_need_grow$ (
  $c: AptosDataCache,
): void {
  let i, v;
  v = new_with_capacity$(u64("5"), u64("1"), $c, [AtomicTypeTag.U64] as TypeTag[]);
  i = u64("0");
  while ($.copy(i).lt(u64("6"))) {
    {
      push_back_no_grow$(v, $.copy(i), $c, [AtomicTypeTag.U64] as TypeTag[]);
      i = $.copy(i).add(u64("1"));
    }

  }destroy_empty$(v, $c, [AtomicTypeTag.U64] as TypeTag[]);
  return;
}

// test func
export function big_vector_reserve_and_shrink$ (
  $c: AptosDataCache,
): void {
  let i, v;
  v = new__$(u64("10"), $c, [AtomicTypeTag.U64] as TypeTag[]);
  reserve$(v, u64("10"), $c, [AtomicTypeTag.U64] as TypeTag[]);
  if (!$.copy(v.num_buckets).eq(u64("10"))) {
    throw $.abortCode(u64("0"));
  }
  i = u64("0");
  while ($.copy(i).lt(u64("100"))) {
    {
      push_back_no_grow$(v, $.copy(i), $c, [AtomicTypeTag.U64] as TypeTag[]);
      i = $.copy(i).add(u64("1"));
    }

  }while ($.copy(i).lt(u64("120"))) {
    {
      push_back$(v, $.copy(i), $c, [AtomicTypeTag.U64] as TypeTag[]);
      i = $.copy(i).add(u64("1"));
    }

  }while ($.copy(i).gt(u64("90"))) {
    {
      pop_back$(v, $c, [AtomicTypeTag.U64] as TypeTag[]);
      i = $.copy(i).sub(u64("1"));
    }

  }if (!$.copy(v.num_buckets).eq(u64("12"))) {
    throw $.abortCode(u64("0"));
  }
  shrink_to_fit$(v, $c, [AtomicTypeTag.U64] as TypeTag[]);
  if (!$.copy(v.num_buckets).eq(u64("9"))) {
    throw $.abortCode(u64("0"));
  }
  while ($.copy(i).gt(u64("55"))) {
    {
      pop_back$(v, $c, [AtomicTypeTag.U64] as TypeTag[]);
      i = $.copy(i).sub(u64("1"));
    }

  }shrink_to_fit$(v, $c, [AtomicTypeTag.U64] as TypeTag[]);
  if (!$.copy(v.num_buckets).eq(u64("6"))) {
    throw $.abortCode(u64("0"));
  }
  while ($.copy(i).gt(u64("0"))) {
    {
      pop_back$(v, $c, [AtomicTypeTag.U64] as TypeTag[]);
      i = $.copy(i).sub(u64("1"));
    }

  }shrink_to_fit$(v, $c, [AtomicTypeTag.U64] as TypeTag[]);
  destroy_empty$(v, $c, [AtomicTypeTag.U64] as TypeTag[]);
  return;
}

// test func
export function big_vector_test$ (
  $c: AptosDataCache,
): void {
  let exist, expected, first_index, i, index, index__1, index__3, j, j__2, last_index, v, val, val__4;
  v = new__$(u64("5"), $c, [AtomicTypeTag.U64] as TypeTag[]);
  i = u64("0");
  while ($.copy(i).lt(u64("100"))) {
    {
      push_back$(v, $.copy(i), $c, [AtomicTypeTag.U64] as TypeTag[]);
      i = $.copy(i).add(u64("1"));
    }

  }j = u64("0");
  while ($.copy(j).lt(u64("100"))) {
    {
      index = bucket_index$(v, $.copy(j), $c, [AtomicTypeTag.U64] as TypeTag[]);
      val = borrow$(v, index, $c, [AtomicTypeTag.U64] as TypeTag[]);
      if (!$.copy(val).eq($.copy(j))) {
        throw $.abortCode(u64("0"));
      }
      j = $.copy(j).add(u64("1"));
    }

  }while ($.copy(i).gt(u64("0"))) {
    {
      i = $.copy(i).sub(u64("1"));
      [exist, index__1] = index_of$(v, i, $c, [AtomicTypeTag.U64] as TypeTag[]);
      j__2 = pop_back$(v, $c, [AtomicTypeTag.U64] as TypeTag[]);
      if (!exist) {
        throw $.abortCode(u64("0"));
      }
      if (!$.copy(index__1).eq($.copy(i))) {
        throw $.abortCode(u64("0"));
      }
      if (!$.copy(j__2).eq($.copy(i))) {
        throw $.abortCode(u64("0"));
      }
    }

  }while ($.copy(i).lt(u64("100"))) {
    {
      push_back$(v, $.copy(i), $c, [AtomicTypeTag.U64] as TypeTag[]);
      i = $.copy(i).add(u64("1"));
    }

  }last_index = bucket_index$(v, length$(v, $c, [AtomicTypeTag.U64] as TypeTag[]).sub(u64("1")), $c, [AtomicTypeTag.U64] as TypeTag[]);
  if (!swap_remove$(v, last_index, $c, [AtomicTypeTag.U64] as TypeTag[]).eq(u64("99"))) {
    throw $.abortCode(u64("0"));
  }
  first_index = bucket_index$(v, u64("0"), $c, [AtomicTypeTag.U64] as TypeTag[]);
  if (!swap_remove$(v, first_index, $c, [AtomicTypeTag.U64] as TypeTag[]).eq(u64("0"))) {
    throw $.abortCode(u64("0"));
  }
  while (length$(v, $c, [AtomicTypeTag.U64] as TypeTag[]).gt(u64("0"))) {
    {
      expected = length$(v, $c, [AtomicTypeTag.U64] as TypeTag[]);
      index__3 = bucket_index$(v, u64("0"), $c, [AtomicTypeTag.U64] as TypeTag[]);
      val__4 = swap_remove$(v, index__3, $c, [AtomicTypeTag.U64] as TypeTag[]);
      if (!$.copy(val__4).eq($.copy(expected))) {
        throw $.abortCode(u64("0"));
      }
    }

  }shrink_to_fit$(v, $c, [AtomicTypeTag.U64] as TypeTag[]);
  destroy_empty$(v, $c, [AtomicTypeTag.U64] as TypeTag[]);
  return;
}

export function borrow$ (
  v: BigVector,
  index: BigVectorIndex,
  $c: AptosDataCache,
  $p: TypeTag[], /* <T>*/
): any {
  return Std.Vector.borrow$(Table.borrow$(v.buckets, $.copy(index.bucket_index), $c, [AtomicTypeTag.U64, new VectorTag($p[0])] as TypeTag[]), $.copy(index.vec_index), $c, [$p[0]] as TypeTag[]);
}

export function borrow_mut$ (
  v: BigVector,
  index: BigVectorIndex,
  $c: AptosDataCache,
  $p: TypeTag[], /* <T>*/
): any {
  return Std.Vector.borrow_mut$(Table.borrow_mut$(v.buckets, $.copy(index.bucket_index), $c, [AtomicTypeTag.U64, new VectorTag($p[0])] as TypeTag[]), $.copy(index.vec_index), $c, [$p[0]] as TypeTag[]);
}

export function bucket_index$ (
  v: BigVector,
  i: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <T>*/
): BigVectorIndex {
  if (!$.copy(i).lt(length$(v, $c, [$p[0]] as TypeTag[]))) {
    throw $.abortCode(EINDEX_OUT_OF_BOUNDS);
  }
  return new BigVectorIndex({ bucket_index: $.copy(i).div($.copy(v.bucket_size)), vec_index: $.copy(i).mod($.copy(v.bucket_size)) }, new StructTag(new HexString("0x1"), "BigVector", "BigVectorIndex", []));
}

export function bucket_size$ (
  v: BigVector,
  $c: AptosDataCache,
  $p: TypeTag[], /* <T>*/
): U64 {
  return $.copy(v.bucket_size);
}

export function buckets_required$ (
  end_index: BigVectorIndex,
  $c: AptosDataCache,
): U64 {
  let temp$1, additional;
  if ($.copy(end_index.vec_index).eq(u64("0"))) {
    temp$1 = u64("0");
  }
  else{
    temp$1 = u64("1");
  }
  additional = temp$1;
  return $.copy(end_index.bucket_index).add($.copy(additional));
}

export function contains$ (
  v: BigVector,
  val: any,
  $c: AptosDataCache,
  $p: TypeTag[], /* <T>*/
): boolean {
  let exist;
  [exist, ] = index_of$(v, val, $c, [$p[0]] as TypeTag[]);
  return exist;
}

export function decrement_index$ (
  index: BigVectorIndex,
  bucket_size: U64,
  $c: AptosDataCache,
): void {
  if ($.copy(index.vec_index).eq(u64("0"))) {
    if (!$.copy(index.bucket_index).gt(u64("0"))) {
      throw $.abortCode(EINDEX_OUT_OF_BOUNDS);
    }
    index.bucket_index = $.copy(index.bucket_index).sub(u64("1"));
    index.vec_index = $.copy(bucket_size).sub(u64("1"));
  }
  else{
    index.vec_index = $.copy(index.vec_index).sub(u64("1"));
  }
  return;
}

export function destroy_empty$ (
  v: BigVector,
  $c: AptosDataCache,
  $p: TypeTag[], /* <T>*/
): void {
  if (!is_empty$(v, $c, [$p[0]] as TypeTag[])) {
    throw $.abortCode(Std.Errors.invalid_argument$(ENOT_EMPTY, $c));
  }
  shrink_to_fit$(v, $c, [$p[0]] as TypeTag[]);
  let { buckets: buckets } = v;
  Table.destroy_empty$(buckets, $c, [AtomicTypeTag.U64, new VectorTag($p[0])] as TypeTag[]);
  return;
}

export function increment_index$ (
  index: BigVectorIndex,
  bucket_size: U64,
  $c: AptosDataCache,
): void {
  if ($.copy(index.vec_index).add(u64("1")).eq($.copy(bucket_size))) {
    index.bucket_index = $.copy(index.bucket_index).add(u64("1"));
    index.vec_index = u64("0");
  }
  else{
    index.vec_index = $.copy(index.vec_index).add(u64("1"));
  }
  return;
}

export function index_of$ (
  v: BigVector,
  val: any,
  $c: AptosDataCache,
  $p: TypeTag[], /* <T>*/
): [boolean, U64] {
  let i, index, len;
  i = u64("0");
  len = length$(v, $c, [$p[0]] as TypeTag[]);
  index = bucket_index$(v, u64("0"), $c, [$p[0]] as TypeTag[]);
  while ($.copy(i).lt($.copy(len))) {
    {
      if ($.dyn_eq($p[0], borrow$(v, index, $c, [$p[0]] as TypeTag[]), val)) {
        return [true, $.copy(i)];
      }
      else{
      }
      i = $.copy(i).add(u64("1"));
      increment_index$(index, $.copy(v.bucket_size), $c);
    }

  }return [false, u64("0")];
}

export function is_empty$ (
  v: BigVector,
  $c: AptosDataCache,
  $p: TypeTag[], /* <T>*/
): boolean {
  return length$(v, $c, [$p[0]] as TypeTag[]).eq(u64("0"));
}

export function length$ (
  v: BigVector,
  $c: AptosDataCache,
  $p: TypeTag[], /* <T>*/
): U64 {
  return $.copy(v.end_index.bucket_index).mul($.copy(v.bucket_size)).add($.copy(v.end_index.vec_index));
}

export function new__$ (
  bucket_size: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <T>*/
): BigVector {
  if (!$.copy(bucket_size).gt(u64("0"))) {
    throw $.abortCode(u64("0"));
  }
  return new BigVector({ buckets: Table.new__$($c, [AtomicTypeTag.U64, new VectorTag($p[0])] as TypeTag[]), end_index: new BigVectorIndex({ bucket_index: u64("0"), vec_index: u64("0") }, new StructTag(new HexString("0x1"), "BigVector", "BigVectorIndex", [])), num_buckets: u64("0"), bucket_size: $.copy(bucket_size) }, new StructTag(new HexString("0x1"), "BigVector", "BigVector", [$p[0]]));
}

export function new_with_capacity$ (
  bucket_size: U64,
  num_buckets: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <T>*/
): BigVector {
  let v;
  v = new__$($.copy(bucket_size), $c, [$p[0]] as TypeTag[]);
  reserve$(v, $.copy(num_buckets), $c, [$p[0]] as TypeTag[]);
  return v;
}

export function pop_back$ (
  v: BigVector,
  $c: AptosDataCache,
  $p: TypeTag[], /* <T>*/
): any {
  let val;
  if (!!is_empty$(v, $c, [$p[0]] as TypeTag[])) {
    throw $.abortCode(Std.Errors.invalid_argument$(EINDEX_OUT_OF_BOUNDS, $c));
  }
  decrement_index$(v.end_index, $.copy(v.bucket_size), $c);
  val = Std.Vector.pop_back$(Table.borrow_mut$(v.buckets, $.copy(v.end_index.bucket_index), $c, [AtomicTypeTag.U64, new VectorTag($p[0])] as TypeTag[]), $c, [$p[0]] as TypeTag[]);
  return val;
}

export function push_back$ (
  v: BigVector,
  val: any,
  $c: AptosDataCache,
  $p: TypeTag[], /* <T>*/
): void {
  if ($.copy(v.end_index.bucket_index).eq($.copy(v.num_buckets))) {
    Table.add$(v.buckets, $.copy(v.num_buckets), Std.Vector.empty$($c, [$p[0]] as TypeTag[]), $c, [AtomicTypeTag.U64, new VectorTag($p[0])] as TypeTag[]);
    v.num_buckets = $.copy(v.num_buckets).add(u64("1"));
  }
  else{
  }
  Std.Vector.push_back$(Table.borrow_mut$(v.buckets, $.copy(v.end_index.bucket_index), $c, [AtomicTypeTag.U64, new VectorTag($p[0])] as TypeTag[]), val, $c, [$p[0]] as TypeTag[]);
  increment_index$(v.end_index, $.copy(v.bucket_size), $c);
  return;
}

export function push_back_no_grow$ (
  v: BigVector,
  val: any,
  $c: AptosDataCache,
  $p: TypeTag[], /* <T>*/
): void {
  if (!$.copy(v.end_index.bucket_index).lt($.copy(v.num_buckets))) {
    throw $.abortCode(Std.Errors.invalid_argument$(EOUT_OF_CAPACITY, $c));
  }
  Std.Vector.push_back$(Table.borrow_mut$(v.buckets, $.copy(v.end_index.bucket_index), $c, [AtomicTypeTag.U64, new VectorTag($p[0])] as TypeTag[]), val, $c, [$p[0]] as TypeTag[]);
  increment_index$(v.end_index, $.copy(v.bucket_size), $c);
  return;
}

export function reserve$ (
  v: BigVector,
  additional_buckets: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <T>*/
): void {
  while ($.copy(additional_buckets).gt(u64("0"))) {
    {
      Table.add$(v.buckets, $.copy(v.num_buckets), Std.Vector.empty$($c, [$p[0]] as TypeTag[]), $c, [AtomicTypeTag.U64, new VectorTag($p[0])] as TypeTag[]);
      v.num_buckets = $.copy(v.num_buckets).add(u64("1"));
      additional_buckets = $.copy(additional_buckets).sub(u64("1"));
    }

  }return;
}

export function shrink_to_fit$ (
  v: BigVector,
  $c: AptosDataCache,
  $p: TypeTag[], /* <T>*/
): void {
  let v__1;
  while ($.copy(v.num_buckets).gt(buckets_required$(v.end_index, $c))) {
    {
      v.num_buckets = $.copy(v.num_buckets).sub(u64("1"));
      v__1 = Table.remove$(v.buckets, $.copy(v.num_buckets), $c, [AtomicTypeTag.U64, new VectorTag($p[0])] as TypeTag[]);
      Std.Vector.destroy_empty$(v__1, $c, [$p[0]] as TypeTag[]);
    }

  }return;
}

export function swap_remove$ (
  v: BigVector,
  index: BigVectorIndex,
  $c: AptosDataCache,
  $p: TypeTag[], /* <T>*/
): any {
  let temp$1, bucket, bucket_len, last_val, val;
  last_val = pop_back$(v, $c, [$p[0]] as TypeTag[]);
  if ($.copy(v.end_index.bucket_index).eq($.copy(index.bucket_index))) {
    temp$1 = $.copy(v.end_index.vec_index).eq($.copy(index.vec_index));
  }
  else{
    temp$1 = false;
  }
  if (temp$1) {
    return last_val;
  }
  else{
  }
  bucket = Table.borrow_mut$(v.buckets, $.copy(index.bucket_index), $c, [AtomicTypeTag.U64, new VectorTag($p[0])] as TypeTag[]);
  bucket_len = Std.Vector.length$(bucket, $c, [$p[0]] as TypeTag[]);
  val = Std.Vector.swap_remove$(bucket, $.copy(index.vec_index), $c, [$p[0]] as TypeTag[]);
  Std.Vector.push_back$(bucket, last_val, $c, [$p[0]] as TypeTag[]);
  Std.Vector.swap$(bucket, $.copy(index.vec_index), $.copy(bucket_len).sub(u64("1")), $c, [$p[0]] as TypeTag[]);
  return val;
}

export function unit_test_poison$ (
  $c: AptosDataCache,
): void {
  Std.UnitTest.create_signers_for_testing$(u64("0"), $c);
  return;
}


