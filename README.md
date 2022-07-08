# move-to-ts
```
# from your package directory, run these
aptos move compile  # need this to fetch dependencies
move-to-ts # this creates a tsgen folder under build, with all the transpiled ts files

```

A Move-to-TypeScript transpiler & emulator. Still a work in progress. Transpilation *seems* to work but is still being 
tested. 

Currently generated TypeScript code is not executable because its corresponding TypeScript runtime library isn't fully
implemented yet. We should get it to a fully working state in about a week's time.




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
