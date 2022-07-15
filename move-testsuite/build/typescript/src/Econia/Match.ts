import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient} from "aptos";
import * as Std from "../Std";
import * as Book from "./Book";
import * as User from "./User";
export const packageName = "Econia";
export const moduleAddress = new HexString("0xc0deb00c");
export const moduleName = "Match";

export const ASK : boolean = true;
export const BID : boolean = false;

export function fill_market_order$ (
  host: HexString,
  addr: HexString,
  side: boolean,
  size: U64,
  book_cap: Book.FriendCap,
  $c: AptosDataCache,
  $p: TypeTag[], /* <B, Q, E>*/
): U64 {
  let temp$1, temp$2, temp$3, exact, filled, n_positions, partial_target_fill, scale_factor, target_addr, target_c_i, target_id, target_p_f;
  if ((side == ASK)) {
    temp$1 = Book.n_asks$($.copy(host), book_cap, $c, [$p[0], $p[1], $p[2]] as TypeTag[]);
  }
  else{
    temp$1 = Book.n_bids$($.copy(host), book_cap, $c, [$p[0], $p[1], $p[2]] as TypeTag[]);
  }
  n_positions = temp$1;
  scale_factor = Book.scale_factor$($.copy(host), book_cap, $c, [$p[0], $p[1], $p[2]] as TypeTag[]);
  if ($.copy(n_positions).eq(u64("0"))) {
    return $.copy(size);
  }
  else{
  }
  [target_id, target_addr, target_p_f, target_c_i, filled, exact] = Book.init_traverse_fill$($.copy(host), $.copy(addr), side, $.copy(size), book_cap, $c, [$p[0], $p[1], $p[2]] as TypeTag[]);
  while (true) {
    User.process_fill$($.copy(target_addr), $.copy(addr), side, $.copy(target_id), $.copy(filled), $.copy(scale_factor), exact, $c, [$p[0], $p[1], $p[2]] as TypeTag[]);
    size = $.copy(size).sub($.copy(filled));
    if ($.copy(size).gt(u64("0"))) {
      temp$2 = $.copy(n_positions).gt(u64("1"));
    }
    else{
      temp$2 = false;
    }
    if (temp$2) {
      [target_id, target_addr, target_p_f, target_c_i, filled, exact] = Book.traverse_pop_fill$($.copy(host), $.copy(addr), side, $.copy(size), $.copy(n_positions), $.copy(target_id), $.copy(target_p_f), $.copy(target_c_i), book_cap, $c, [$p[0], $p[1], $p[2]] as TypeTag[]);
      n_positions = $.copy(n_positions).sub(u64("1"));
    }
    else{
      if ($.copy(size).eq(u64("0"))) {
        temp$3 = !exact;
      }
      else{
        temp$3 = false;
      }
      partial_target_fill = temp$3;
      if (!partial_target_fill) {
        Book.cancel_position$($.copy(host), side, $.copy(target_id), book_cap, $c, [$p[0], $p[1], $p[2]] as TypeTag[]);
      }
      else{
      }
      Book.refresh_extreme_order_id$($.copy(host), side, book_cap, $c, [$p[0], $p[1], $p[2]] as TypeTag[]);
      break;
    }
  }
  return $.copy(size);
}

export function unit_test_poison$ (
  $c: AptosDataCache,
): void {
  Std.UnitTest.create_signers_for_testing$(u64("0"), $c);
  return;
}


