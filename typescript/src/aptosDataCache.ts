import { AptosClient, HexString, Types } from "aptos";
import { DeleteResource, WriteResource } from "aptos/dist/api/data-contracts";
import { AptosParserRepo, StructInfoType } from "./parserRepo";
import { getTypeTagFullname, parseTypeTagOrThrow, StructTag, TypeTag } from "./typeTag";


export interface AptosDataCache {
  exists(tag: TypeTag, address: HexString): boolean;
  move_to(tag: TypeTag, address: HexString, resource: any): void;
  move_from<T>(tag: TypeTag, address: HexString): T;
  borrow_global<T>(tag: TypeTag, address: HexString): T;
  borrow_global_mut<T>(tag: TypeTag, address: HexString): T;
}

export class DummyCache implements AptosDataCache {
  exists(_tag: TypeTag, _address: HexString): boolean {
    throw new Error("DummyCache does not support 'exists'");
  }
  move_to(_tag: TypeTag, _address: HexString, _resource: any): void {
    throw new Error("DummyCache does not support 'move_to'");
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
}

class AccountCache {
  // maps tagFullname to resource
  public resources: Map<string, any>;
  constructor(public address: HexString) {
    this.resources = new Map();
  }
  has(tag: TypeTag) {
    return this.resources.has(getTypeTagFullname(tag));
  }
  get(tag: TypeTag) {
    const fullname = getTypeTagFullname(tag);
    const resource = this.resources.get(fullname);
    if (!resource) {
      throw new Error(`Account ${this.address.hex()} does not have resource: ${fullname}`);
    }
    return resource;
  }
  set(tag: TypeTag, resource: any) {
    const fullname = getTypeTagFullname(tag);
    if (this.has(tag)) {
      throw new Error(`Account ${this.address.hex()} already has resource: ${fullname}`);
    }
    this.resources.set(fullname, resource);
  }
  move_from(tag: TypeTag): any {
    const fullname = getTypeTagFullname(tag);
    const resource = this.resources.get(fullname);
    if (!resource) {
      throw new Error(`Account ${this.address.hex()} does not have resource: ${fullname}`);
    }
    this.resources.delete(fullname);
    return resource;
  }
}


// caches all data locally and never attempts to retrieve anything from chain
// only suited for running tests
export class AptosLocalCache implements AptosDataCache {
  // maps account address (HexString.hex()) to AccountCache
  public accounts: Map<string, AccountCache>;
  constructor() {
    this.accounts = new Map();
  }
  exists(tag: TypeTag, address: HexString): boolean {
    const account = this.accounts.get(address.hex());
    if (!account) {
      return false;
    }
    return account.has(tag);
  }
  move_to(tag: TypeTag, address: HexString, resource: any): void {
    let account = this.accounts.get(address.hex());
    if (!account) {
      account = new AccountCache(address);
      this.accounts.set(address.hex(), account);
    }
    account.set(tag, resource);
  }
  move_from<T>(tag: TypeTag, address: HexString): T {
    let account = this.accounts.get(address.hex());
    if (!account) {
      throw new Error(`Resource ${getTypeTagFullname(tag)} does not exist for ${address.hex()}`);
    }
    return account.move_from(tag);
  }
  borrow_global<T>(tag: TypeTag, address: HexString): T {
    let account = this.accounts.get(address.hex());
    if (!account) {
      throw new Error(`Resource ${getTypeTagFullname(tag)} does not exist for ${address.hex()}`);
    }
    return account.get(tag) as unknown as T;
  }
  borrow_global_mut<T>(tag: TypeTag, address: HexString): T {
    return this.borrow_global<T>(tag, address);
  }
}

// caches data locally, and attempts to fetch from chain when needed
export class AptosSyncedCache implements AptosDataCache {
  exists(_tag: TypeTag, _address: HexString): boolean {
    throw new Error("DummyCache does not support 'exists'");
  }
  move_to(_tag: TypeTag, _address: HexString, _resource: any): void {
    throw new Error("DummyCache does not support 'move_to'");
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
}


export type UpdateType = 'update' | 'delete';
export type ListenerType = {
  id: string; 
  callback: (type: UpdateType, value: any) => void;
}





export class AptosResourceCache {
  // maps ResourceKey to the resource object
  public cachedResources: Record<string, any>;
  // record how various resources were loaded, so that we can replay these requests when refreshing
  public resourceKeyToLoadParams: Record<string, [StructInfoType, HexString, TypeTag[]]>;
  // maps ResourceKey to a list of listeners
  public updateListener: Record<string, ListenerType[]>;
  // the set of addresses that are completely loaded
  public watchedAddresses: Set<HexString>;
  constructor(
    public client: AptosClient,
    public repo: AptosParserRepo,
  ) {
    this.cachedResources = {};
    this.updateListener = {};
    this.watchedAddresses = new Set();
    this.resourceKeyToLoadParams = {};
  }

  /*
  Load a specific resource
  */
  async load<T extends StructInfoType>(struct: T, address: HexString, typeParams: TypeTag[], listener: ListenerType | null)  {
    const loaded = await this.repo.loadResource(this.client, address, struct, typeParams);
    const typeTag = new StructTag(struct.moduleAddress, struct.moduleName, struct.structName, typeParams);
    const resourceKey = this.getResourceKey(address, typeTag);
    if (resourceKey in this.cachedResources) {
      this.updateResource(resourceKey, loaded);
    }
    else {
      this.cachedResources[resourceKey] = loaded;
    }
    this.resourceKeyToLoadParams[resourceKey] = [struct, address, typeParams];
    if(listener) {
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
    for(const resource of resources) {
      const typeTag = parseTypeTagOrThrow(resource.type);
      try{
        const value = this.repo.parse(resource.data, typeTag);
        const resourceKey = this.getResourceKey(address, typeTag);
        if (resourceKey in this.cachedResources) {
          this.updateResource(resourceKey, value);
        }
        else {
          this.cachedResources[resourceKey] = value;
        }
        loadedResourceKeys.push(resourceKey);
        if (listener) {
          this.addListenerForResource(resourceKey, listener);
        }
      }
      catch(e) {
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
    for(const address of this.watchedAddresses) {
      for(const resourceKey of await this.loadAccount(address, null)) {
        loaded.add(resourceKey);
      }
    }
    for(const resourceKey in this.cachedResources) {
      if(!loaded.has(resourceKey)) {
        const [struct, address, typeParams] = this.resourceKeyToLoadParams[resourceKey];
        await this.load(struct, address, typeParams, null);
        loaded.add(resourceKey);
      }
    }
  }

  /*
  Add listener for a particular ResourceKey
  */
  addListenerForResource(resourceKey: string, listener: ListenerType) {
    if(!(resourceKey in this.updateListener)) {
      this.updateListener[resourceKey] = [];
    }
    for(const registeredListener of this.updateListener[resourceKey]) {
      if(registeredListener.id === listener.id) {
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
    if (txn.success && txn.hash !== '0x0') {
      for(const change of txn.changes) {
        if(change.type === 'write_resource' ) {
          const write = change as WriteResource;
          const typeTag = parseTypeTagOrThrow(write.data.type);
          const resourceKey = this.getResourceKey(new HexString(write.address), typeTag);
          if (resourceKey in this.cachedResources) {
            const newValue = this.repo.parse(write.data.data, typeTag);
            this.updateResource(resourceKey, newValue);
          }

        }
        else if (change.type === 'delete_resource') {
          const del = change as DeleteResource;
          const typeTag = parseTypeTagOrThrow(del.resource);
          const resourceKey = this.getResourceKey(new HexString(del.address), typeTag);
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
      for(const listener of listeners) {
        listener.callback('update', value);
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
      for(const listener of listeners) {
        listener.callback('delete', null);
      }
    }
  }

  /*
  Computes ResourceKey from owner address and resource TypeTag
  */
  getResourceKey(ownerAddress: HexString, typeTag: TypeTag) {
    return `${ownerAddress.hex()}/${getTypeTagFullname(typeTag)}`;
  }
}