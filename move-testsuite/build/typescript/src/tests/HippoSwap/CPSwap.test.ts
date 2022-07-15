import * as Source from '../../HippoSwap/CPSwap'; 
import * as $ from '@manahippo/move-to-ts';
import { HexString } from 'aptos';

test('CPSwap::init_works', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  Source.init_works$(admin, $c);
});

test('CPSwap::mint_works', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const lock = new HexString("0x1");
  const lp_provider = new HexString("0x3");
  const token_owner = new HexString("0x2");
  Source.mint_works$(admin, token_owner, lp_provider, lock, core, $c);
});

test('CPSwap::remove_liquidity_works', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const lock = new HexString("0x1");
  const lp_provider = new HexString("0x3");
  const token_owner = new HexString("0x2");
  Source.remove_liquidity_works$(admin, token_owner, lp_provider, lock, core, $c);
});

test('CPSwap::swap_x_works', () => {
  const $c = new $.AptosLocalCache();
  const admin = new HexString("0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8");
  const core = new HexString("0xa550c18");
  const lock = new HexString("0x1");
  const lp_provider = new HexString("0x3");
  const token_owner = new HexString("0x2");
  Source.swap_x_works$(admin, token_owner, lp_provider, lock, core, $c);
});


