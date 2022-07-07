# move-to-ts

A Move-to-TypeScript transpiler & emulator. Still a work in progress. Transpilation *seems* to work but is still being 
tested. Currently generated TypeScript code is not executable because:

- imports are not fully implemented
- TypeScript runtime library not fully implemented.

Both hurdles were already solved in an earlier iteration of a similar project, so you can expect the generated 
TypeScript to be fully executable in probably a week. I'm only putting this out as a pre-alpha to gather feedback.


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
