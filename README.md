# move-to-ts
```
# from your package directory, run these
aptos move compile  # need this to fetch dependencies
move-to-ts # this creates a typescript folder under build, with all the transpiled ts files

# or this, generates package.json and tests
move-to-ts --test --pakcage-json-name myPackageName
# in the generated build/typescript folder, you'll be able to do these:
yarn install
yarn build
yarn test

```

A Move-to-TypeScript transpiler & emulator. Still a work in progress. We're still building the runtime library and
debugging. Currently we are running unit tests from 4 packages:
- [AptosFramework](https://github.com/aptos-labs/aptos-core/tree/main/aptos-move/framework)
- [HippoSwap](https://github.com/hippospace/hippo-swap)
- [TokenRegistry](https://github.com/hippospace/aptos-registry)
- [Econia](https://github.com/econia-labs/econia)

325 of 334 test cases in total are passing. 5 of the failed tests are due to unimplemented signing/hash feature in the
runtime (we probably won't implement them in a while). We aim to squash the remaining 4 bugs in the week.
```
# test cases aggregated across AptosFramework, Std, HippoSwap, TokenRegistry
Test Suites: 5 failed, 42 passed, 47 total
Tests:       9 failed, 344 passed, 353 total


# Why?

Automatically translate Move code to TypeScript. So that:
- swap frontends and arb bots can generate quotes using exactly the same pricing logic as its Move contract
- liquidation bots can evaluate whether an account is open for liquidation using exactly the same logic as contract

Above are two very specific use cases. In a more abstract sense, `move-to-ts` wants to increase the portability of 
Move code and increase the productivity of Move developers.

A side benefit of having an emulator, of course, is that we can also debug Move code in a JS environment (since we 
are currently missing a native Move debugger).


# Long-term objectives

Turn this into a development framework similar to Truffle/Anchor, and provide direct support for
- frontend wallet integration
- off-chain data integration
- automated TypeScript SDK generation
- automated bot script generation
- automated experimental UI generation
  

# Experimental objectives:

- Generate programmer-guided, informal proof-of-correctness


# Example
Here's the `AccountUtil.move` from AptosFramework:
```
module AptosFramework::AccountUtils {
    use AptosFramework::Account;
    use AptosFramework::Coin;
    use AptosFramework::TestCoin::TestCoin;

    public(script) fun create_and_fund_account(funder: &signer, account: address, amount: u64) {
        Account::create_account(account);
        Coin::transfer<TestCoin>(funder, account, amount);
    }
}
```

Here's the transpiled code:
```
import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient} from "aptos";
import * as Std from "../Std";
import * as Account from "./Account";
import * as Coin from "./Coin";
export const package = "AptosFramework";
export const moduleAddress = "0x1";
export const moduleName = "AccountUtils";



export function create_and_fund_account (
  funder: HexString,
  account: HexString,
  amount: U64,
  $c: $.AptosDataCache,
): void {
  Account.create_account(account, $c);
  Coin.transfer(funder, account, amount, $c, [new StructTag(new HexString("0x1"), "TestCoin", "TestCoin", [])]);
  return;
}


export function buildPayload_create_and_fund_account (
  funder: HexString,
  account: HexString,
  amount: U64,
) {
  const typeParamStrings = "";
  return $.buildPayload(
    "0x1::AccountUtils::create_and_fund_account",
    typeParamStrings,
    [
      account,
      amount.toPayloadArg(),
    ]
  );

}

```


# Known issues with AptosFramework

There are a total of 3 places in AptosFramework that need to be edited before `move-to-ts` will happily transpile your
project. Two of them are minor mistakes in `AptosFramework` and one of them a consequence of the transpiler being
limited. The needed changes are listed below. You can apply the changes to `~/.move/` where the move build system caches
its dependencies.

```
diff --git a/aptos-move/framework/aptos-framework/sources/configs/ConsensusConfig.move b/aptos-move/framework/aptos-framework/sources/configs/ConsensusConfig.move
index 6a0272341..687946bf1 100644
--- a/aptos-move/framework/aptos-framework/sources/configs/ConsensusConfig.move
+++ b/aptos-move/framework/aptos-framework/sources/configs/ConsensusConfig.move
@@ -29,8 +29,7 @@ module AptosFramework::ConsensusConfig {
     /// Update the config.
     public fun set(account: &signer, config: vector<u8>) acquires ConsensusConfig {
         SystemAddresses::assert_core_resource(account);
-        let config_ref = &mut borrow_global_mut<ConsensusConfig>(@CoreResources).config;
-        *config_ref = config;
+        borrow_global_mut<ConsensusConfig>(@CoreResources).config = config;
         Reconfiguration::reconfigure();
     }
 }
diff --git a/aptos-move/framework/aptos-framework/sources/configs/Stake.move b/aptos-move/framework/aptos-framework/sources/configs/Stake.move
index d58d55217..235911e2b 100644
--- a/aptos-move/framework/aptos-framework/sources/configs/Stake.move
+++ b/aptos-move/framework/aptos-framework/sources/configs/Stake.move
@@ -434,7 +434,7 @@ module AptosFramework::Stake {
     }
 
     /// Allows an owner to change the delegated voter of the stake pool.
-    public(script) fun set_delegated_voter_with_cap(
+    public fun set_delegated_voter_with_cap(
         pool_address: address,
         owner_cap: &OwnerCapability,
         new_delegated_voter: address,
@@ -1234,7 +1234,7 @@ module AptosFramework::Stake {
     }
 
     #[test_only]
-    public(script) fun register_mint_stake(
+    public fun register_mint_stake(
         account: &signer,
         mint_cap: &MintCapability<TestCoin>,
     ) acquires OwnerCapability, StakePool, StakePoolEvents, ValidatorConfig, ValidatorSet, ValidatorSetConfiguration {
```
