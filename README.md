# move-to-ts

A Move-to-TypeScript transpiler & AptosVM emulator. Helps you:
- Interact with your Aptos contract using auto-generated TypeScript SDK
- Interact with your Aptos contract using auto-generated CLI utility
- run arbitrary Move code in simulation (using realtime fullnode data), and return the serialized output value

For complete guide & documentation, please refer to [gitbook](https://hippo-labs.gitbook.io/dev/move-to-ts/move-to-typescript-transpiler).

# Example

Example below is based on a naive [lending protocol tutorial](https://github.com/hippospace/tutorial-lending).


```typescript
const {client, account} = ...;

// Load auto-generated App
const app = new App(client).hippo_tutorial.lend2;

// load User and LendingProtocol struct from chain
const user = await app.loadUser(account.address());
const protocol = await app.loadLendingProtocol(app.moduleAddress, false);

// call user_get_limits to compute some info about user's state
const [isUserHealthy, totalBorrow, totalDeposit] = user.user_get_limits(protocol);
console.log(isUserHealthy, totalBorrow, totalDeposit);

// make a withdrawal
await app.withdraw(account, u64(1000000), [app.FakeBTC.getTag()]);
```


# Attributes

In addition to allowing you to run arbitrary move code in TypeScript, you can also decorate your Move code with special
attributes that will guide the transpiler to generate specific TypeScript utilities for you:

- `#[cmd]`: automatically generate command-line tool for invoking `public entry` functions
- `#[method]`: allows you to call methods written in Move from TypeScript frontend
- `#[query]`: allows you to perform arbitrary computation onchain using Move code, and return 
the result of the computation to your TypeScript frontend, without going through consensus.

## `#[cmd]`

When `move-to-ts` is invoked with the `-c` (gen-cli) flag, it will output a TypeScript CLI tool (invoked with yarn cli)
that contains one command for every entry function that's decorated with `$[cmd]`.

Example in Move (taken from aptos-registry):
```
    #[cmd(desc=b"Add new token into registry")]
    public entry fun add_token_script<TokenType>(
        admin: &signer,
        name: vector<u8>,
        symbol: vector<u8>,
        description: vector<u8>,
        decimals: u8,
        logo_url: vector<u8>,
        project_url: vector<u8>,
    ) acquires TokenRegistry {
        ...
    }
```

Generated CLI usage:
```
$ yarn cli
Usage: yarn cli [options] [command]

Options:
  -c, --config <path>                                                                                                path to your aptos config.yml (generated with "aptos init")
  -p, --profile <PROFILE>                                                                                            aptos config profile to use (default: "default")
  -h, --help                                                                                                         display help for command

Commands:
  coin_registry:add-token-script <TYPE_TokenType> <name> <symbol> <description> <decimals> <logo_url> <project_url>  Add new token into registry
```

## `#[method]`

The `method` attribute allows you to attach specific Move functions to specified Move resource types, and use them from
TypeScript as ordinary class methods.

Example in Move (taken from Econia):
```
    #[method(
        book_orders_sdk,
        book_price_levels_sdk,
        get_orders_sdk,
        simulate_swap_sdk
    )]
    /// An order book for the given market
    struct OrderBook<phantom B, phantom Q, phantom E> has key {
        ...
    }

    
    /// Calculate expected result of swap against an `OrderBook`.
    fun simulate_swap_sdk<B, Q, E>(
        order_book_ref_mut: &mut OrderBook<B, Q, E>,
        style: bool,
        coins_in: u64
    ): (
        u64,
        u64
    ) {
        ...
    }
```

Usage in TypeScript:
```
// first fetch OrderBook resource from chain
const orderBook = await OrderBook.load(...);
// performs computation using on fetched state
const [quoteReceived, basePaid] = orderBook.simulate_swap_sdk(true, u64(100000))
```

## `#[query]`

The query attribute allows you to:
1. Write arbitrary computation in Move
2. Execute the computation under simulation mode using realtime onchain data
3. Obtain a specified output from fullnode as serialized return value

Below we give a rather arbitrary example. In general, though, you may use it to query for example the complete list of
users in a lending protocol that are eligible for liquidation.

Example in Move:
```
    struct PoolInfo has store, copy, drop {
        pool_type: u8,
        pool_idx: u8,
    }

    struct PoolList has key, copy, drop, store {
        list: vector<PoolInfo>,
    }

    // computes some arbitrary Struct for output
    public fun compute_pool_list(): PoolList {
        let list = vector::empty<PoolInfo>();
        vector::push_back(&mut list, PoolInfo {
            pool_type: 0,
            pool_idx: 0,
        });

        PoolList { list }
    }

    // write output value
    #[query]
    public entry fun get_pool_list(user: &signer) acquires PoolList {
        if (exists<PoolList>(signer::address_of(user))) {
            move_from<PoolList>(signer::address_of(user));
        };
        // we use move_to to mark the value which should be returned
        // in the future, you will also be able to place the query attribute directly on 
        // compute_pool_list
        move_to<PoolList>(user, compute_pool_list())
    }
```

Usage in TypeScript:
```
// performs simulated computation using get_pool_list, and returns the the result from compute_pool_list()
// note that this computation is performed in a fullnode and therefore has access to realtime onchain data
const poolList = await query_get_pool_list(aptosClient, aptosAccount, repo, []);
```


# Usage

From your package directory, run these:
```
aptos move compile          # need this to fetch dependencies
move-to-ts                  # this creates a typescript folder under build, with all the transpiled ts files
```

More options:
```
$ move-to-ts -h

USAGE:
    move-to-ts [OPTIONS]

OPTIONS:
    -a, --asynchronous
            

    -c, --gen-cli
            

    -h, --help
            Print help information

    -n, --package-json-name <PACKAGE_JSON_NAME>
            generate package.json [default: ]

    -o, --output-path <OUTPUT_PATH>
            [default: ]

    -p, --path <PACKAGE_PATH>
            Path to a package which the command should be run with respect to [default: .]

    -t, --test-address <TEST_ADDRESS>
            generate #[test] functions [default: ]

    -u, --gen-ui
            

    -V, --version
            Print version information

```

# Development

Everything *seems* to work now. We have a testsuite that aggregates about 400 unit tests from these Move packages:
- [AptosFramework](https://github.com/aptos-labs/aptos-core/tree/main/aptos-move/framework)
- [HippoSwap](https://github.com/hippospace/hippo-swap)
- [TokenRegistry](https://github.com/hippospace/aptos-registry)
- [Econia](https://github.com/econia-labs/econia)

Only a small number of unit tests are failing due to features that are not implemented in the TypeScript runtime. These
unimplemented features are mostly related to signature verification.


# Motivation

Automatically translate Move code to TypeScript. So that:
- swap frontends and arb bots can generate quotes using exactly the same pricing logic as its Move contract
- liquidation bots can evaluate whether an account is open for liquidation using exactly the same logic as contract

Above are two very specific use cases. In a more abstract sense, `move-to-ts` wants to increase the portability of 
Move code and increase the productivity of Move developers.

A side benefit of having an emulator, of course, is that we can also debug Move code in a JS environment (since we 
are currently missing a native Move debugger). I personally find it easier to debug Move units tests after they are
translated to TypeScript because I get to see the stack locations by default.


# Long-term objectives

Turn this into a development framework similar to Truffle/Anchor, and provide direct support for
- [ ] frontend wallet integration
- [ ] off-chain data integration
- [x] automated TypeScript SDK generation
- [ ] automated bot script generation
- [-] automated experimental UI generation
  

# Experimental objectives:

- Generate programmer-guided proofs for arbitrary provable statements


# Help

Ask `mana | hippo` in [Discord](https://discord.com/invite/f7qFxfJWMX)
