import { HexString } from "aptos";
import { AptosDataCache, IBox, ITable, AppType } from "./aptosDataCache";
import { U128, U64, U8 } from "./builtinTypes";
import {
  AtomicTypeTag,
  getTypeParamsString,
  getTypeTagFullname,
  parseTypeTagOrThrow,
  StructTag,
  TypeTag,
  VectorTag,
} from "./typeTag";
import * as sha from "sha.js";
import { SHA3 } from "sha3";
import bigInt from "big-integer";
import * as elliptic from "elliptic";
import {
  AptosParserRepo,
  FieldDeclType,
  parseStructProto,
  TypeParamDeclType,
} from "./parserRepo";
import { strToU8, u64, u8str } from "./builtinFuncs";
import { BCS } from "aptos";
import { deserializeMoveValue, serializeMoveValue } from "./bcs";

/*
native functions for BCS serialization/deserialization
*/

export function std_bcs_to_bytes(
  v: any,
  $c: AptosDataCache,
  tags: TypeTag[]
): U8[] {
  if (tags.length !== 1) {
    throw new Error(`Expected 1 TypeTag in tags but received: ${tags.length}`);
  }
  const serializer = new BCS.Serializer();
  serializeMoveValue(serializer, v, tags[0]);
  const array = Array.from(serializer.getBytes());
  return array.map((u) => new U8(bigInt(u)));
}

export function aptos_framework_util_from_bytes(
  bytes: U8[],
  $c: AptosDataCache,
  tags: TypeTag[]
): any {
  if (tags.length !== 1) {
    throw new Error(`Expected 1 TypeTag in tags but received: ${tags.length}`);
  }
  const array = new Uint8Array(bytes.map((u) => u.toJsNumber()));
  const deserializer = new BCS.Deserializer(array);
  const result = deserializeMoveValue(deserializer, tags[0]);
  return result;
}

export function aptos_std_any_from_bytes(
  bytes: U8[],
  $c: AptosDataCache,
  tags: TypeTag[]
): any {
  if (tags.length !== 1) {
    throw new Error(`Expected 1 TypeTag in tags but received: ${tags.length}`);
  }
  const array = new Uint8Array(bytes.map((u) => u.toJsNumber()));
  const deserializer = new BCS.Deserializer(array);
  const result = deserializeMoveValue(deserializer, tags[0]);
  return result;
}

/*
native functions from Std
*/

export function aptos_std_debug_print(
  v: any,
  $c: AptosDataCache,
  _: TypeTag[]
) {
  console.log(JSON.stringify(v, null, 2));
}

export function aptos_std_debug_print_stack_trace($c: AptosDataCache) {
  // NOP
}

export function aptos_framework_event_write_to_event_store(
  guid: U8[],
  count: U64,
  msg: any,
  $c: AptosDataCache,
  _tags: TypeTag[]
) {
  // FIXME: should probably allow some callback/prints??
  // NOP
}

export function aptos_std_event_write_to_event_store(
  guid: U8[],
  count: U64,
  msg: any,
  $c: AptosDataCache,
  _tags: TypeTag[]
) {
  // FIXME: should probably allow some callback/prints??
  // NOP
}

export function aptos_std_multi_ed25519_signature_verify_strict_internal(
    multisignature: U8[],
    public_key: U8[],
    message: U8[],
    $c: AptosDataCache,
): boolean {
  throw new Error("Not implemented");
}

export function aptos_std_multi_ed25519_public_key_validate_internal(
    bytes: U8[],
    $c: AptosDataCache,
): boolean {
  throw new Error("Not implemented");
}

export function aptos_std_from_bcs_from_bytes(
    bytes: U8[],
    $c: AptosDataCache,
    $p: TypeTag[]
): any {
  return aptos_framework_util_from_bytes(bytes, $c, $p);
}

export function aptos_std_aptos_hash_keccak256(
    bytes: U8[],
    $c: AptosDataCache
): U8[] {
  throw new Error("Not implemented");
}

export function aptos_std_aptos_hash_ripemd160_internal(
    bytes: U8[],
    $c: AptosDataCache
): U8[] {
  throw new Error("Not implemented");
}

export function aptos_std_aptos_hash_sha2_512_internal(
    bytes: U8[],
    $c: AptosDataCache
): U8[] {
  throw new Error("Not implemented");
}

export function aptos_std_aptos_hash_sip_hash(
  bytes: U8[],
  $c: AptosDataCache
): U64 {
  throw new Error("Not implemented");
}

export function aptos_std_secp256k1_ecdsa_recover_internal(
  message: U8[],
  recovery_id: U8,
  signature: U8[],
  $c: AptosDataCache
): [U8[], boolean] {
  throw new Error("Not implemented");
}

export function std_hash_sha2_256(data: U8[], $c: AptosDataCache): U8[] {
  const dataBuffer = Buffer.from(data.map((u) => u.value.toJSNumber()));
  const outputBuffer = new sha.sha256().update(dataBuffer).digest();
  return Array.from(outputBuffer).map((u) => new U8(bigInt(u)));
}

export function std_hash_sha3_256(data: U8[], $c: AptosDataCache): U8[] {
  const dataBuffer = Buffer.from(data.map((u) => u.value.toJSNumber()));
  const outputBuffer = new SHA3(256).update(dataBuffer).digest();
  return Array.from(outputBuffer).map((u) => new U8(bigInt(u)));
}

export function std_signer_borrow_address(s: HexString, $c: AptosDataCache) {
  return s;
}

export function std_string_internal_check_utf8(
  v: U8[],
  $c: AptosDataCache
): boolean {
  const bytes = new Uint8Array(v.map((u) => u.toJsNumber()));
  const decoder = new TextDecoder("utf-8", { fatal: true });
  try {
    decoder.decode(bytes);
    return true;
  } catch (e) {
    return false;
  }
}

export function std_string_internal_is_char_boundary(
  v: U8[],
  i: U64,
  $c: AptosDataCache
): boolean {
  if (i.toJsNumber() > v.length) {
    return false;
  }
  return std_string_internal_check_utf8(v.slice(0, i.toJsNumber()), $c);
}

export function std_string_internal_sub_string(
  v: U8[],
  i: U64,
  j: U64,
  $c: AptosDataCache
): U8[] {
  const [ii, jj] = [i.toJsNumber(), j.toJsNumber()];
  if (!std_string_internal_is_char_boundary(v, i, $c)) {
    throw new Error(`sub_string start index ${ii} is not utf8 char boundary`);
  }
  if (!std_string_internal_is_char_boundary(v, j, $c)) {
    throw new Error(`sub_string end index ${jj} is not utf8 char boundary`);
  }
  if (ii > jj) {
    throw new Error(
      `Substring start index ${ii} greater than ending index ${jj}`
    );
  }
  return v.slice(ii, jj);
}

export function std_string_internal_index_of(
  v: U8[],
  r: U8[],
  $c: AptosDataCache
): U64 {
  const vv = new Uint8Array(v.map((u) => u.toJsNumber()));
  const rr = new Uint8Array(r.map((u) => u.toJsNumber()));
  const decoder = new TextDecoder("utf-8", { fatal: true });
  const vStr = decoder.decode(vv);
  const rStr = decoder.decode(rr);
  const idx = vStr.indexOf(rStr);
  return u64(idx === -1 ? v.length : idx);
}

export function std_unit_test_create_signers_for_testing(
  numSigners: U64,
  $c: AptosDataCache
): HexString[] {
  const result: HexString[] = [];
  for (let i = 0; i < numSigners.value.toJSNumber(); i++) {
    result.push(new HexString((0x1000 + i).toString(16)));
  }
  return result;
}

export function std_vector_empty($c: AptosDataCache, tags: TypeTag[]): any[] {
  if (tags.length !== 1) {
    throw new Error(`Incorrect number of type arguments: ${tags.length}`);
  }
  return [];
}

export function std_vector_length(
  vec: any[],
  $c: AptosDataCache,
  tags: TypeTag[]
): U64 {
  if (tags.length !== 1) {
    throw new Error(`Incorrect number of type arguments: ${tags.length}`);
  }
  return new U64(bigInt(vec.length));
}

export function std_vector_borrow(
  vec: any[],
  i: U64,
  $c: AptosDataCache,
  tags: TypeTag[]
): any {
  if (tags.length !== 1) {
    throw new Error(`Incorrect number of type arguments: ${tags.length}`);
  }
  const idx = i.value.toJSNumber();
  if (idx >= vec.length) {
    throw new Error(`Index out of bounds: ${idx} >= ${vec.length}`);
  }
  return vec[idx];
}

export function std_vector_push_back(
  vec: any[],
  e: any,
  $c: AptosDataCache,
  tags: TypeTag[]
): void {
  if (tags.length !== 1) {
    throw new Error(`Incorrect number of type arguments: ${tags.length}`);
  }
  vec.push(e);
}

export function std_vector_borrow_mut(
  vec: any[],
  i: U64,
  $c: AptosDataCache,
  tags: TypeTag[]
): any {
  if (tags.length !== 1) {
    throw new Error(`Incorrect number of type arguments: ${tags.length}`);
  }
  const idx = i.value.toJSNumber();
  if (idx >= vec.length) {
    throw new Error(`Index out of bounds: ${idx} >= ${vec.length}`);
  }
  // FIXME: we should probably wrap &mut in a MutRef object with a $set method
  return vec[idx];
}

export function std_vector_pop_back(
  vec: any[],
  $c: AptosDataCache,
  tags: TypeTag[]
): void {
  if (tags.length !== 1) {
    throw new Error(`Incorrect number of type arguments: ${tags.length}`);
  }
  if (vec.length === 0) {
    throw new Error("Trying to pop vector with 0 length");
  }
  return vec.pop();
}

export function std_vector_destroy_empty(
  vec: any[],
  $c: AptosDataCache,
  tags: TypeTag[]
): void {
  if (tags.length !== 1) {
    throw new Error(`Incorrect number of type arguments: ${tags.length}`);
  }
  if (vec.length !== 0) {
    throw new Error("Vector is not empty!");
  }
}

export function std_vector_swap(
  vec: any[],
  i: U64,
  j: U64,
  $c: AptosDataCache,
  tags: TypeTag[]
): void {
  if (tags.length !== 1) {
    throw new Error(`Incorrect number of type arguments: ${tags.length}`);
  }
  const idx = i.value.toJSNumber();
  const jdx = j.value.toJSNumber();
  if (idx >= vec.length) {
    throw new Error(`Index out of bounds: ${idx} >= ${vec.length}`);
  }
  if (jdx >= vec.length) {
    throw new Error(`Index out of bounds: ${jdx} >= ${vec.length}`);
  }
  [vec[idx], vec[jdx]] = [vec[jdx], vec[idx]];
}

/*
native functions from AptosFramework
*/

export function aptos_framework_aggregator_add(
  aggregator: any,
  value: any,
  $c: any
) {
  throw new Error("Not Implemented");
}

export function aptos_framework_aggregator_destroy(aggregator: any, $c: any) {
  throw new Error("Not Implemented");
}

export function aptos_framework_aggregator_read(
  aggregator: any,
  $c: any
): U128 {
  throw new Error("Not Implemented");
}

export function aptos_framework_aggregator_sub(
  aggregator: any,
  value: any,
  $c: any
) {
  throw new Error("Not Implemented");
}

export function aptos_framework_account_create_address(
  bytes: U8[],
  $c: AptosDataCache
): HexString {
  if (bytes.length !== 32) {
    throw new Error(`bytes must have length of 32, but got ${bytes.length}`);
  }
  const bytesArray = new Uint8Array(bytes.map((u) => u.value.toJSNumber()));
  return HexString.fromUint8Array(bytesArray);
}

export function aptos_framework_genesis_create_signer(
    addr: HexString,
    $c: AptosDataCache
): HexString {
  return aptos_framework_account_create_signer(addr, $c)
}

export function aptos_framework_account_create_signer(
  addr: HexString,
  $c: AptosDataCache
): HexString {
  // FIXME
  // yep, our runtime does not distinguish between address and signer. This might get us in trouble down the road...
  // but for now just use this
  return addr;
}

class ModuleMetadata {
  static moduleAddress = new HexString("0x1");
  static moduleName = "code";
  static structName: string = "ModuleMetadata";
  static typeParameters: TypeParamDeclType[] = [];
  static fields: FieldDeclType[] = [
    {
      name: "name",
      typeTag: new StructTag(new HexString("0x1"), "string", "String", []),
    },
    {
      name: "source",
      typeTag: new StructTag(new HexString("0x1"), "string", "String", []),
    },
    { name: "source_map", typeTag: new VectorTag(AtomicTypeTag.U8) },
    { name: "abi", typeTag: new VectorTag(AtomicTypeTag.U8) },
  ];

  __app: AppType | null = null;

  name: ActualStringClass;
  source: ActualStringClass;
  source_map: U8[];
  abi: U8[];

  constructor(proto: any, public typeTag: TypeTag) {
    this.name = proto["name"] as ActualStringClass;
    this.source = proto["source"] as ActualStringClass;
    this.source_map = proto["source_map"] as U8[];
    this.abi = proto["abi"] as U8[];
  }

  static ModuleMetadataParser(
    data: any,
    typeTag: TypeTag,
    repo: AptosParserRepo
  ): ModuleMetadata {
    const proto = parseStructProto(data, typeTag, repo, ModuleMetadata);
    return new ModuleMetadata(proto, typeTag);
  }

  async loadFullState(app: AppType) {}
}

export class PackageMetadata {
  static moduleAddress = new HexString("0x1");
  static moduleName = "code";
  static structName: string = "PackageMetadata";
  static typeParameters: TypeParamDeclType[] = [];
  static fields: FieldDeclType[] = [
    {
      name: "name",
      typeTag: new StructTag(new HexString("0x1"), "string", "String", []),
    },
    {
      name: "upgrade_policy",
      typeTag: new StructTag(new HexString("0x1"), "code", "UpgradePolicy", []),
    },
    {
      name: "manifest",
      typeTag: new StructTag(new HexString("0x1"), "string", "String", []),
    },
    {
      name: "modules",
      typeTag: new VectorTag(
        new StructTag(new HexString("0x1"), "code", "ModuleMetadata", [])
      ),
    },
  ];

  __app: AppType | null = null;

  name: ActualStringClass;
  upgrade_policy: UpgradePolicy;
  manifest: ActualStringClass;
  modules: ModuleMetadata[];

  constructor(proto: any, public typeTag: TypeTag) {
    this.name = proto["name"] as ActualStringClass;
    this.upgrade_policy = proto["upgrade_policy"] as UpgradePolicy;
    this.manifest = proto["manifest"] as ActualStringClass;
    this.modules = proto["modules"] as ModuleMetadata[];
  }

  static PackageMetadataParser(
    data: any,
    typeTag: TypeTag,
    repo: AptosParserRepo
  ): PackageMetadata {
    const proto = parseStructProto(data, typeTag, repo, PackageMetadata);
    return new PackageMetadata(proto, typeTag);
  }

  async loadFullState(app: AppType) {}
}

export class UpgradePolicy {
  static moduleAddress = new HexString("0x1");
  static moduleName = "code";
  static structName: string = "UpgradePolicy";
  static typeParameters: TypeParamDeclType[] = [];
  static fields: FieldDeclType[] = [
    { name: "policy", typeTag: AtomicTypeTag.U8 },
  ];

  __app: AppType | null = null;

  policy: U8;

  constructor(proto: any, public typeTag: TypeTag) {
    this.policy = proto["policy"] as U8;
  }

  static UpgradePolicyParser(
    data: any,
    typeTag: TypeTag,
    repo: AptosParserRepo
  ): UpgradePolicy {
    const proto = parseStructProto(data, typeTag, repo, UpgradePolicy);
    return new UpgradePolicy(proto, typeTag);
  }

  async loadFullState(app: AppType) {}
}

export function aptos_framework_code_request_publish(
  owner: HexString,
  expected_modules: ActualStringClass[],
  bundle: U8[][],
  policy: U8,
  $c: AptosDataCache
) {
  throw new Error("Not Implemented");
}

export function aptos_framework_code_request_publish_with_allowed_deps(
    owner: HexString,
    expected_modules: ActualStringClass[],
    allowed_deps: any[],
    bundle: U8[][],
    policy: U8,
    $c: AptosDataCache,
){
  throw new Error("Not Implemented");
}

function u8ArrayToKeyString(u8array: U8[]): string {
  return u8array.map((u) => u.value.toJSNumber().toString(16)).join();
}

export function aptos_std_bls12381_aggregate_pubkeys_internal(
  pubkeys: any,
  $c: AptosDataCache
): [U8[], boolean] {
  throw new Error("Not implemented");
}

export function aptos_std_bls12381_aggregate_signatures_internal(
  signatures: any,
  $c: AptosDataCache
): [U8[], boolean] {
  throw new Error("Not implemented");
}

export function aptos_std_bls12381_validate_pubkey_internal(
  pubkey: U8[],
  $c: AptosDataCache
): boolean {
  throw new Error("Not implemented");
}

export function aptos_std_bls12381_signature_subgroup_check_internal(
  signature: any,
  $c: AptosDataCache
): boolean {
  throw new Error("Not implemented");
}

export function aptos_std_bls12381_verify_aggregate_signature_internal(
  a: any,
  b: any,
  c: any,
  $c: AptosDataCache
): boolean {
  throw new Error("Not implemented");
}

export function aptos_std_bls12381_verify_multisignature_internal(
  a: any,
  b: any,
  c: any,
  $c: AptosDataCache
): boolean {
  throw new Error("Not implemented");
}

export function aptos_std_bls12381_verify_normal_signature_internal(
  signature: U8[],
  public_key: U8[],
  mesage: U8[],
  $c: AptosDataCache
): boolean {
  throw new Error("Not implemented");
}

export function aptos_std_bls12381_verify_proof_of_possession_internal(
  public_key: U8[],
  proof_of_posession: U8[],
  $c: AptosDataCache
): boolean {
  throw new Error("Not implemented");
}

export function aptos_std_bls12381_verify_signature_share_internal(
  a: any,
  b: any,
  c: any,
  $c: AptosDataCache
): boolean {
  throw new Error("Not implemented");
}

export function aptos_std_ed25519_public_key_validate_internal(
  pubkey: U8[],
  $c: AptosDataCache
): boolean {
  throw new Error("Not implemented");
}

export function aptos_std_ed25519_signature_verify_strict_internal(
  signature: U8[],
  pubkey: U8[],
  message: U8[],
  $c: AptosDataCache
): boolean {
  const ec = new elliptic.eddsa("ed25519");
  const keyString = u8ArrayToKeyString(pubkey);
  const key = ec.keyFromPublic(keyString);
  return key.verify(u8ArrayToKeyString(message), u8ArrayToKeyString(signature));
}

export function aptos_std_secp256k1_ecdsa_recover(
  message: U8[],
  recovery_id: U8,
  signature: U8[],
  $c: AptosDataCache
): [U8[], boolean] {
  throw new Error("Not implemented");
}

export function aptos_std_table_new_table_handle(
  $c: AptosDataCache,
  tags: TypeTag[]
): HexString {
  return $c.table_new_handle();
}

export function aptos_std_table_add_box(
  table: ITable,
  key: any,
  value: IBox,
  $c: AptosDataCache,
  tags: TypeTag[]
) {
  return $c.table_add_box(table, key, value);
}

export function aptos_std_table_borrow_box(
  table: ITable,
  key: any,
  $c: AptosDataCache,
  tags: TypeTag[]
) {
  return $c.table_borrow_box(table, key);
}

export function aptos_std_table_borrow_box_mut(
  table: ITable,
  key: any,
  $c: AptosDataCache,
  tags: TypeTag[]
) {
  return $c.table_borrow_box_mut(table, key);
}

export function aptos_std_table_contains_box(
  table: ITable,
  key: any,
  $c: AptosDataCache,
  tags: TypeTag[]
) {
  return $c.table_contains_box(table, key);
}

export function aptos_std_table_remove_box(
  table: ITable,
  key: any,
  $c: AptosDataCache,
  tags: TypeTag[]
) {
  return $c.table_remove_box(table, key);
}

export function aptos_std_table_destroy_empty_box(
  table: ITable,
  $c: AptosDataCache,
  tags: TypeTag[]
) {
  return $c.table_destroy_empty_box(table);
}

export function aptos_std_table_drop_unchecked_box(
  table: ITable,
  $c: AptosDataCache,
  tags: TypeTag[]
) {
  return $c.table_drop_unchecked_box(table);
}

export function aptos_framework_transaction_context_get_script_hash(
  $c: AptosDataCache
): U8[] {
  throw new Error("Not Implemented");
}

export class ActualUsage {
  static moduleAddress = new HexString("0x1");
  static moduleName = "state_storage";
  __app: AppType | null = null;
  static structName: string = "Usage";
  static typeParameters: TypeParamDeclType[] = [];
  static fields: FieldDeclType[] = [
    { name: "items", typeTag: AtomicTypeTag.U64 },
    { name: "bytes", typeTag: AtomicTypeTag.U64 },
  ];

  items: U64;
  bytes: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.items = proto["items"] as U64;
    this.bytes = proto["bytes"] as U64;
  }

  static UsageParser(
    data: any,
    typeTag: TypeTag,
    repo: AptosParserRepo
  ): ActualUsage {
    const proto = parseStructProto(data, typeTag, repo, ActualUsage);
    return new ActualUsage(proto, typeTag);
  }

  static getTag(): StructTag {
    return new StructTag(
      ActualUsage.moduleAddress,
      ActualUsage.moduleName,
      "Usage",
      []
    );
  }
  async loadFullState(app: AppType) {
    this.__app = app;
  }
}

export function aptos_framework_state_storage_get_state_storage_usage_only_at_epoch_beginning(
  $c: any
): ActualUsage {
  throw new Error("Not Implemented");
}

export class ActualAggregator {
  static moduleAddress = new HexString("0x1");
  static moduleName = "aggregator";
  __app: AppType | null = null;
  static structName: string = "Aggregator";
  static typeParameters: TypeParamDeclType[] = [];
  static fields: FieldDeclType[] = [
    { name: "handle", typeTag: AtomicTypeTag.Address },
    { name: "key", typeTag: AtomicTypeTag.Address },
    { name: "limit", typeTag: AtomicTypeTag.U128 },
  ];

  handle: HexString;
  key: HexString;
  limit: U128;

  constructor(proto: any, public typeTag: TypeTag) {
    this.handle = proto["handle"] as HexString;
    this.key = proto["key"] as HexString;
    this.limit = proto["limit"] as U128;
  }

  static AggregatorParser(
    data: any,
    typeTag: TypeTag,
    repo: AptosParserRepo
  ): ActualAggregator {
    const proto = parseStructProto(data, typeTag, repo, ActualAggregator);
    return new ActualAggregator(proto, typeTag);
  }

  static getTag(): StructTag {
    return new StructTag(
      ActualAggregator.moduleAddress,
      ActualAggregator.moduleName,
      "Aggregator",
      []
    );
  }
  async loadFullState(app: AppType) {
    this.__app = app;
  }
}

export function aptos_framework_aggregator_factory_new_aggregator(
  p1: any,
  p2: any,
  p3: any
): ActualAggregator {
  throw new Error("Not Implemented");
}

export interface ITypeInfo {
  account_address: HexString;
  module_name: U8[];
  struct_name: U8[];
  typeTag: TypeTag;
  __app: AppType | null;
}

class ActualTypeInfoClass {
  static moduleAddress = new HexString("0x1");
  static moduleName = "type_info";
  static structName: string = "TypeInfo";
  static typeParameters: TypeParamDeclType[] = [];
  static fields: FieldDeclType[] = [
    { name: "account_address", typeTag: AtomicTypeTag.Address },
    { name: "module_name", typeTag: new VectorTag(AtomicTypeTag.U8) },
    { name: "struct_name", typeTag: new VectorTag(AtomicTypeTag.U8) },
  ];

  __app: AppType | null = null;

  account_address: HexString;
  module_name: U8[];
  struct_name: U8[];

  constructor(proto: any, public typeTag: TypeTag) {
    this.account_address = proto["account_address"] as HexString;
    this.module_name = proto["module_name"] as U8[];
    this.struct_name = proto["struct_name"] as U8[];
  }

  typeFullname(): string {
    return `${this.account_address.toShortString()}::${u8str(
      this.module_name
    )}::${u8str(this.struct_name)}`;
  }
  toTypeTag() {
    return parseTypeTagOrThrow(this.typeFullname());
  }
  moduleName() {
    return u8str(this.module_name);
  }
  structName() {
    return u8str(this.struct_name);
  }

  loadFullState(app: AppType): Promise<void> {
    return Promise.resolve();
  }
}
export class ActualStringClass {
  static moduleAddress = new HexString("0x1");
  static moduleName = "string";
  static structName: string = "String";
  static typeParameters: TypeParamDeclType[] = [];
  static fields: FieldDeclType[] = [
    { name: "bytes", typeTag: new VectorTag(AtomicTypeTag.U8) },
  ];

  __app: AppType | null = null;

  bytes: U8[];

  constructor(proto: any, public typeTag: TypeTag) {
    this.bytes = proto["bytes"] as U8[];
  }

  static StringParser(
    data: any,
    typeTag: TypeTag,
    repo: AptosParserRepo
  ): ActualStringClass {
    const proto = parseStructProto(data, typeTag, repo, ActualStringClass);
    return new ActualStringClass(proto, typeTag);
  }
  str(): string {
    return u8str(this.bytes);
  }

  loadFullState(app: AppType): Promise<void> {
    return Promise.resolve();
  }
}

function stringToU8Array(val: string): U8[] {
  return Array.from(new TextEncoder().encode(val)).map(
    (u) => new U8(bigInt(u))
  );
}

export function aptos_std_type_info_type_of(
  $c: AptosDataCache,
  tags: TypeTag[]
): ActualTypeInfoClass {
  if (tags.length !== 1) {
    throw new Error(`Expect 1 typetag, but received: ${tags.length}`);
  }
  const tag = tags[0];
  if (!(tag instanceof StructTag)) {
    throw new Error("type_of requires Struct type as type argument");
  }
  const struct_name =
    tag.typeParams.length > 0
      ? `${tag.name}::${getTypeParamsString(tag.typeParams)}`
      : tag.name;
  const newTag = new StructTag(
    new HexString("0x1"),
    "TypeInfo",
    "TypeInfo",
    []
  );
  return new ActualTypeInfoClass(
    {
      account_address: tag.address,
      module_name: stringToU8Array(tag.module),
      struct_name: stringToU8Array(struct_name),
    },
    newTag
  );
}

export function aptos_std_type_info_type_name(
  $c: AptosDataCache,
  tags: TypeTag[]
): ActualStringClass {
  if (tags.length !== 1) {
    throw new Error(`Expect 1 typetag, but received: ${tags.length}`);
  }
  const tag = tags[0];
  const newTag = new StructTag(new HexString("0x1"), "string", "String", []);
  const name = getTypeTagFullname(tag);
  return new ActualStringClass(
    {
      bytes: strToU8(name),
    },
    newTag
  );
}

export function aptos_std_type_info_chain_id_internal(
  $c: AptosDataCache,
): U8 {
  throw new Error("Not Implemented");
}