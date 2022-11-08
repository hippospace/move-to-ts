import { AptosClient, HexString, Types } from "aptos";
import { AptosParserRepo, StructInfoType } from "./parserRepo";
import {
  getShortAddressTypeTagFullname,
  parseMoveStructTag,
  StructTag,
  TypeTag,
} from "./typeTag";
import stringify from "json-stable-stringify";


export interface ITable {
  handle: HexString;
  typeTag: TypeTag;
  loadFullState(app: AppType): Promise<void>;
  __app: AppType | null;
}

export interface IBox {
  val: any;
  typeTag: TypeTag;
  loadFullState(app: AppType): Promise<void>;
  __app: AppType | null;
}

export interface AptosDataCache {
  exists(tag: TypeTag, address: HexString): boolean;
  move_to(tag: TypeTag, address: HexString, resource: any): void;
  // set is similar to move_to, except it doesn't check if resource already exists and just forces overwrite
  set(tag: TypeTag, address: HexString, resource: any): void;
  move_from<T>(tag: TypeTag, address: HexString): T;
  borrow_global<T>(tag: TypeTag, address: HexString): T;
  borrow_global_mut<T>(tag: TypeTag, address: HexString): T;
  exists_async(_tag: TypeTag, _address: HexString): Promise<boolean>;
  move_to_async(
    _tag: TypeTag,
    _address: HexString,
    _resource: any
  ): Promise<void>;
  move_from_async<T>(_tag: TypeTag, _address: HexString): Promise<T>;
  borrow_global_async<T>(_tag: TypeTag, _address: HexString): Promise<T>;
  borrow_global_mut_async<T>(_tag: TypeTag, _address: HexString): Promise<T>;

  // Table
  table_new_handle(): HexString;
  table_add_box(table: ITable, key: any, value: IBox): void;
  table_borrow_box(table: ITable, key: any): IBox;
  table_borrow_box_mut(table: ITable, key: any): IBox;
  table_contains_box(table: ITable, key: any): boolean;
  table_remove_box(table: ITable, key: any): IBox;
  table_destroy_empty_box(table: ITable): void;
  table_drop_unchecked_box(table: ITable): void;
}

export class DummyCache implements AptosDataCache {
  // synchronous builtins
  exists(_tag: TypeTag, _address: HexString): boolean {
    throw new Error("DummyCache does not support 'exists'");
  }
  move_to(_tag: TypeTag, _address: HexString, _resource: any): void {
    throw new Error("DummyCache does not support 'move_to'");
  }
  set(_tag: TypeTag, _address: HexString, _resource: any): void {
    throw new Error("DummyCache does not support 'set'");
  }
  move_from<T>(_tag: TypeTag, _address: HexString): T {
    throw new Error("DummyCache does not support 'move_from'");
  }
  borrow_global<T>(_tag: TypeTag, _address: HexString): T {
    throw new Error("DummyCache does not support 'borrow_global'");
  }
  borrow_global_mut<T>(_tag: TypeTag, _address: HexString): T {
    throw new Error("DummyCache does not support 'borrow_global_mut'");
  }
  // async builtins
  async exists_async(_tag: TypeTag, _address: HexString): Promise<boolean> {
    return this.exists(_tag, _address);
  }
  async move_to_async(
    _tag: TypeTag,
    _address: HexString,
    _resource: any
  ): Promise<void> {
    return this.move_to(_tag, _address, _resource);
  }
  async move_from_async<T>(_tag: TypeTag, _address: HexString): Promise<T> {
    return this.move_from(_tag, _address);
  }
  async borrow_global_async<T>(_tag: TypeTag, _address: HexString): Promise<T> {
    return this.borrow_global(_tag, _address);
  }
  async borrow_global_mut_async<T>(
    _tag: TypeTag,
    _address: HexString
  ): Promise<T> {
    return this.borrow_global_mut(_tag, _address);
  }
  // table
  table_new_handle(): HexString {
    throw new Error("DummyCache does not support table_new_handle");
  }
  table_add_box(table: ITable, key: any, value: IBox) {
    throw new Error("DummyCache does not support table_add_box");
  }
  table_borrow_box(table: ITable, key: any): IBox {
    throw new Error("Not implemented");
  }
  table_borrow_box_mut(table: ITable, key: any): IBox {
    throw new Error("Not implemented");
  }
  table_contains_box(table: ITable, key: any): boolean {
    throw new Error("Not implemented");
  }
  table_remove_box(table: ITable, key: any): IBox {
    throw new Error("Not implemented");
  }
  table_destroy_empty_box(table: ITable) {
    throw new Error("Not implemented");
  }
  table_drop_unchecked_box(table: ITable) {
    throw new Error("Not implemented");
  }
}

class AccountCache {
  // maps tagFullname to resource
  public resources: Map<string, any>;
  constructor(public address: HexString) {
    this.resources = new Map();
  }
  has(tag: TypeTag) {
    return this.resources.has(getShortAddressTypeTagFullname(tag));
  }
  async has_async(tag: TypeTag, repo: AptosParserRepo, client: AptosClient) {
    try {
      await this.get_async(tag, repo, client);
      return true;
    } catch (e) {
      return false;
    }
  }
  get(tag: TypeTag) {
    const fullname = getShortAddressTypeTagFullname(tag);
    const resource = this.resources.get(fullname);
    if (!resource) {
      throw new Error(
        `Account ${this.address.toShortString()} does not have resource: ${fullname}`
      );
    }
    return resource;
  }
  async get_async(tag: TypeTag, repo: AptosParserRepo, client: AptosClient) {
    if (!(tag instanceof StructTag)) {
      throw new Error(`Expected StructTag`);
    }
    try {
      const resource = await client.getAccountResource(
        this.address,
        (tag as StructTag).getAptosMoveTypeTag()
      );
      return repo.parse(resource.data, tag);
    } catch (e) {
      throw new Error(
        `Account ${this.address.toShortString()} does not have resource ${getShortAddressTypeTagFullname(
          tag
        )}`
      );
    }
  }
  set(tag: TypeTag, resource: any, overwrite = false) {
    const fullname = getShortAddressTypeTagFullname(tag);
    if (this.has(tag) && !overwrite) {
      throw new Error(
        `Account ${this.address.toShortString()} already has resource: ${fullname}`
      );
    }
    this.resources.set(fullname, resource);
  }
  move_from(tag: TypeTag): any {
    const fullname = getShortAddressTypeTagFullname(tag);
    const resource = this.resources.get(fullname);
    if (!resource) {
      throw new Error(
        `Account ${this.address.toShortString()} does not have resource: ${fullname}`
      );
    }
    this.resources.delete(fullname);
    return resource;
  }
}

// caches all data locally and never attempts to retrieve anything from chain
// only suited for running tests
export class AptosLocalCache implements AptosDataCache {
  // maps account address (HexString.toShortString()) to AccountCache
  public accounts: Map<string, AccountCache>;
  public tables: Map<string, Map<string, IBox>>;
  nextTableHandle: number;
  constructor() {
    this.accounts = new Map();
    this.tables = new Map();
    this.nextTableHandle = 1;
  }
  // synchronous builtins
  exists(tag: TypeTag, address: HexString): boolean {
    const account = this.accounts.get(address.toShortString());
    if (!account) {
      return false;
    }
    return account.has(tag);
  }
  move_to(tag: TypeTag, address: HexString, resource: any, overwrite = false): void {
    let account = this.accounts.get(address.toShortString());
    if (!account) {
      account = new AccountCache(address);
      this.accounts.set(address.toShortString(), account);
    }
    account.set(tag, resource, overwrite);
  }
  set(tag: TypeTag, address: HexString, resource: any): void {
    this.move_to(tag, address, resource, true);
  }
  move_from<T>(tag: TypeTag, address: HexString): T {
    let account = this.accounts.get(address.toShortString());
    if (!account) {
      throw new Error(
        `Resource ${getShortAddressTypeTagFullname(
          tag
        )} does not exist for ${address.toShortString()}`
      );
    }
    return account.move_from(tag);
  }
  borrow_global<T>(tag: TypeTag, address: HexString): T {
    let account = this.accounts.get(address.toShortString());
    if (!account) {
      throw new Error(
        `Resource ${getShortAddressTypeTagFullname(
          tag
        )} does not exist for ${address.toShortString()}`
      );
    }
    return account.get(tag) as unknown as T;
  }
  borrow_global_mut<T>(tag: TypeTag, address: HexString): T {
    return this.borrow_global<T>(tag, address);
  }
  // async builtins
  async exists_async(_tag: TypeTag, _address: HexString): Promise<boolean> {
    return this.exists(_tag, _address);
  }
  async move_to_async(
    _tag: TypeTag,
    _address: HexString,
    _resource: any
  ): Promise<void> {
    return this.move_to(_tag, _address, _resource, true);
  }
  async move_from_async<T>(_tag: TypeTag, _address: HexString): Promise<T> {
    return this.move_from(_tag, _address);
  }
  async borrow_global_async<T>(_tag: TypeTag, _address: HexString): Promise<T> {
    return this.borrow_global(_tag, _address);
  }
  async borrow_global_mut_async<T>(
    _tag: TypeTag,
    _address: HexString
  ): Promise<T> {
    return this.borrow_global_mut(_tag, _address);
  }
  // table
  table_get_or_create(handle: HexString): Map<string, any> {
    const table = this.tables.get(handle.toString());
    if (table) {
      return table;
    } else {
      const newTable: Map<string, any> = new Map();
      this.tables.set(handle.toShortString(), newTable);
      return newTable;
    }
  }
  table_new_handle(): HexString {
    const handleIdx = this.nextTableHandle++ + 0x10000000;
    const handleStr = `${handleIdx.toString(16)}`;
    const handle = new HexString(handleStr);
    const table: Map<string, IBox> = new Map();
    this.tables.set(handle.toShortString(), table);
    return handle;
  }

  table_add_box(table: ITable, key: any, value: IBox) {
    const tableMap = this.table_get_or_create(table.handle);
    const stringKey = stringify(key);
    if (tableMap.has(stringKey)) {
      throw new Error("key already exists");
    }
    tableMap.set(stringKey, value);
  }
  table_borrow_box(table: ITable, key: any): IBox {
    const tableMap = this.table_get_or_create(table.handle);
    const stringKey = stringify(key);
    const value = tableMap.get(stringKey);
    if (!value) {
      throw new Error("key does not exist");
    }
    return value;
  }
  table_borrow_box_mut(table: ITable, key: any): IBox {
    return this.table_borrow_box(table, key);
  }
  table_contains_box(table: ITable, key: any): boolean {
    const tableMap = this.table_get_or_create(table.handle);
    const stringKey = stringify(key);
    return tableMap.has(stringKey);
  }
  table_remove_box(table: ITable, key: any): IBox {
    const tableMap = this.table_get_or_create(table.handle);
    const stringKey = stringify(key);
    const entry = tableMap.get(stringKey);
    if (!entry) {
      throw new Error("Key does not exist");
    }
    tableMap.delete(stringKey);
    return entry;
  }
  table_destroy_empty_box(table: ITable) {
    // NOP
  }
  table_drop_unchecked_box(table: ITable) {
    // NOP
  }
}

// caches data locally, and attempts to fetch from chain when needed
export class AptosSyncedCache extends AptosLocalCache {
  constructor(public repo: AptosParserRepo, public client: AptosClient) {
    super();
  }
  // asynchronous builtins
  async exists_async(tag: TypeTag, address: HexString): Promise<boolean> {
    let account = this.accounts.get(address.toShortString());
    if (!account) {
      account = new AccountCache(address);
      this.accounts.set(address.toShortString(), account);
    }
    return account.has_async(tag, this.repo, this.client);
  }
  async move_to_async(
    tag: TypeTag,
    address: HexString,
    resource: any
  ): Promise<void> {
    throw new Error("move_to not supported by AptosSyncedCache");
  }
  async move_from_async<T>(tag: TypeTag, address: HexString): Promise<T> {
    throw new Error("move_from not supported by AptosSyncedCache");
  }
  async borrow_global_async<T>(tag: TypeTag, address: HexString): Promise<T> {
    let account = this.accounts.get(address.toShortString());
    if (!account) {
      account = new AccountCache(address);
      this.accounts.set(address.toShortString(), account);
    }
    return (await account.get_async(
      tag,
      this.repo,
      this.client
    )) as unknown as T;
  }
  async borrow_global_mut_async<T>(
    tag: TypeTag,
    address: HexString
  ): Promise<T> {
    return this.borrow_global_async<T>(tag, address);
  }
}

export type UpdateType = "update" | "delete";
export type ListenerType = {
  id: string;
  callback: (type: UpdateType, value: any) => void;
};

export class AptosResourceCache {
  // maps ResourceKey to the resource object
  public cachedResources: Record<string, any>;
  // record how various resources were loaded, so that we can replay these requests when refreshing
  public resourceKeyToLoadParams: Record<
    string,
    [StructInfoType, HexString, TypeTag[]]
  >;
  // maps ResourceKey to a list of listeners
  public updateListener: Record<string, ListenerType[]>;
  // the set of addresses that are completely loaded
  public watchedAddresses: Set<HexString>;
  constructor(public client: AptosClient, public repo: AptosParserRepo) {
    this.cachedResources = {};
    this.updateListener = {};
    this.watchedAddresses = new Set();
    this.resourceKeyToLoadParams = {};
  }

  /*
  Load a specific resource
  */
  async load<T extends StructInfoType>(
    struct: T,
    address: HexString,
    typeParams: TypeTag[],
    listener: ListenerType | null
  ) {
    const loaded = await this.repo.loadResource(
      this.client,
      address,
      struct,
      typeParams
    );
    const typeTag = new StructTag(
      struct.moduleAddress,
      struct.moduleName,
      struct.structName,
      typeParams
    );
    const resourceKey = this.getResourceKey(address, typeTag);
    if (resourceKey in this.cachedResources) {
      this.updateResource(resourceKey, loaded);
    } else {
      this.cachedResources[resourceKey] = loaded;
    }
    this.resourceKeyToLoadParams[resourceKey] = [struct, address, typeParams];
    if (listener) {
      this.addListenerForResource(resourceKey, listener);
    }
    return loaded;
  }

  /*
  Load all resources owned by an account
  */
  async loadAccount(address: HexString, listener: ListenerType | null) {
    const resources = await this.client.getAccountResources(address);
    const loadedResourceKeys = [];
    for (const resource of resources) {
      const typeTag = parseMoveStructTag(resource.type);
      try {
        const value = this.repo.parse(resource.data, typeTag);
        const resourceKey = this.getResourceKey(address, typeTag);
        if (resourceKey in this.cachedResources) {
          this.updateResource(resourceKey, value);
        } else {
          this.cachedResources[resourceKey] = value;
        }
        loadedResourceKeys.push(resourceKey);
        if (listener) {
          this.addListenerForResource(resourceKey, listener);
        }
      } catch (e) {
        console.log(`Failed to parse resource of type: ${resource.type}`);
      }
    }
    this.watchedAddresses.add(address);
    return loadedResourceKeys;
  }

  /*
  Reload all resources that have been previously loaded
  */
  async globalRefresh() {
    /*
    1. refresh addresses
    2. refresh the rest one-by-one
    */
    const loaded = new Set<string>();
    for (const address of this.watchedAddresses) {
      for (const resourceKey of await this.loadAccount(address, null)) {
        loaded.add(resourceKey);
      }
    }
    for (const resourceKey in this.cachedResources) {
      if (!loaded.has(resourceKey)) {
        const [struct, address, typeParams] =
          this.resourceKeyToLoadParams[resourceKey];
        await this.load(struct, address, typeParams, null);
        loaded.add(resourceKey);
      }
    }
  }

  /*
  Add listener for a particular ResourceKey
  */
  addListenerForResource(resourceKey: string, listener: ListenerType) {
    if (!(resourceKey in this.updateListener)) {
      this.updateListener[resourceKey] = [];
    }
    for (const registeredListener of this.updateListener[resourceKey]) {
      if (registeredListener.id === listener.id) {
        return;
      }
    }
    this.updateListener[resourceKey].push(listener);
  }

  /*
  Use the return value from AptosClient.getTransaction(hash) to update the data cache, and notify listeners

  After client waits for transaction confirmation, the confirmed transaction comes with a set of "changes" that have 
  taken place as a result of this transaction. We can feed that information directly through this interface to avoid the 
  need to refresh the cache.
  */
  updateFromTransactionResult(txn: Types.UserTransaction) {
    if (txn.success && txn.hash !== "0x0") {
      for (const change of txn.changes) {
        if (change.type === "write_resource") {
          const write = change as Types.WriteResource;
          const typeTag = parseMoveStructTag(write.data.type);
          const resourceKey = this.getResourceKey(
            new HexString(write.address),
            typeTag
          );
          if (resourceKey in this.cachedResources) {
            const newValue = this.repo.parse(write.data.data, typeTag);
            this.updateResource(resourceKey, newValue);
          }
        } else if (change.type === "delete_resource") {
          const del = change as Types.DeleteResource;
          const typeTag = parseMoveStructTag(del.resource);
          const resourceKey = this.getResourceKey(
            new HexString(del.address),
            typeTag
          );
          if (resourceKey in this.cachedResources) {
            this.deleteResource(resourceKey);
          }
        }
      }
    }
  }

  /*
  Updates the resource cache and notifies listeners (if any)
  */
  updateResource(resourceKey: string, value: any) {
    this.cachedResources[resourceKey] = value;
    const listeners = this.updateListener[resourceKey];
    if (listeners) {
      for (const listener of listeners) {
        listener.callback("update", value);
      }
    }
  }

  /*
  Delete the resource and notifies listeners (if any)
  */
  deleteResource(resourceKey: string) {
    delete this.cachedResources[resourceKey];
    const listeners = this.updateListener[resourceKey];
    if (listeners) {
      for (const listener of listeners) {
        listener.callback("delete", null);
      }
    }
  }

  /*
  Computes ResourceKey from owner address and resource TypeTag
  */
  getResourceKey(ownerAddress: HexString, typeTag: TypeTag) {
    return `${ownerAddress.toShortString()}/${getShortAddressTypeTagFullname(typeTag)}`;
  }
}

export type AppType = {
  client: AptosClient;
  repo: AptosParserRepo;
  cache: AptosLocalCache;
};
