import * as Source from '../../AptosFramework/TokenTransfers'; 
import * as $ from '@manahippo/move-to-ts';
import { HexString } from 'aptos';

test('TokenTransfers::test_editions', () => {
  const $c = new $.AptosLocalCache();
  const creator = new HexString("0x1");
  const owner0 = new HexString("0x2");
  const owner1 = new HexString("0x3");
  Source.test_editions$(creator, owner0, owner1, $c);
});

test('TokenTransfers::test_nft', () => {
  const $c = new $.AptosLocalCache();
  const creator = new HexString("0x1");
  const owner = new HexString("0x2");
  Source.test_nft$(creator, owner, $c);
});


