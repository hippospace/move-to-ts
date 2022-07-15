import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient} from "aptos";
import * as Std from "../Std";
import * as Coin from "./Coin";
import * as Comparator from "./Comparator";
import * as GovernanceProposal from "./GovernanceProposal";
import * as Signature from "./Signature";
import * as SystemAddresses from "./SystemAddresses";
import * as TestCoin from "./TestCoin";
import * as Timestamp from "./Timestamp";
export const packageName = "AptosFramework";
export const moduleAddress = new HexString("0x1");
export const moduleName = "Stake";

export const CONSENSUS_KEY_1 : U8[] = [u8("138"), u8("84"), u8("185"), u8("34"), u8("136"), u8("212"), u8("186"), u8("80"), u8("115"), u8("211"), u8("165"), u8("46"), u8("128"), u8("204"), u8("0"), u8("174"), u8("159"), u8("187"), u8("193"), u8("204"), u8("91"), u8("67"), u8("59"), u8("70"), u8("8"), u8("155"), u8("120"), u8("4"), u8("195"), u8("138"), u8("118"), u8("240"), u8("15"), u8("198"), u8("71"), u8("70"), u8("199"), u8("104"), u8("94"), u8("230"), u8("40"), u8("252"), u8("45"), u8("11"), u8("146"), u8("156"), u8("34"), u8("148")];
export const CONSENSUS_KEY_2 : U8[] = [u8("163"), u8("68"), u8("235"), u8("67"), u8("123"), u8("205"), u8("128"), u8("150"), u8("56"), u8("66"), u8("6"), u8("225"), u8("190"), u8("156"), u8("128"), u8("190"), u8("56"), u8("147"), u8("253"), u8("127"), u8("223"), u8("134"), u8("122"), u8("204"), u8("229"), u8("160"), u8("72"), u8("229"), u8("177"), u8("84"), u8("96"), u8("40"), u8("189"), u8("172"), u8("76"), u8("175"), u8("65"), u8("148"), u8("19"), u8("253"), u8("22"), u8("212"), u8("214"), u8("166"), u8("9"), u8("224"), u8("176"), u8("163")];
export const CONSENSUS_POP_1 : U8[] = [u8("169"), u8("214"), u8("193"), u8("241"), u8("39"), u8("15"), u8("45"), u8("20"), u8("84"), u8("200"), u8("154"), u8("131"), u8("164"), u8("9"), u8("159"), u8("129"), u8("58"), u8("86"), u8("220"), u8("125"), u8("181"), u8("85"), u8("145"), u8("212"), u8("106"), u8("164"), u8("230"), u8("204"), u8("174"), u8("120"), u8("152"), u8("178"), u8("52"), u8("2"), u8("155"), u8("167"), u8("5"), u8("47"), u8("24"), u8("117"), u8("94"), u8("111"), u8("165"), u8("230"), u8("183"), u8("62"), u8("35"), u8("95"), u8("20"), u8("239"), u8("196"), u8("226"), u8("235"), u8("64"), u8("44"), u8("162"), u8("184"), u8("245"), u8("107"), u8("173"), u8("105"), u8("249"), u8("101"), u8("252"), u8("17"), u8("183"), u8("178"), u8("94"), u8("177"), u8("201"), u8("90"), u8("6"), u8("248"), u8("61"), u8("223"), u8("208"), u8("35"), u8("234"), u8("196"), u8("85"), u8("155"), u8("101"), u8("130"), u8("105"), u8("108"), u8("254"), u8("169"), u8("123"), u8("34"), u8("127"), u8("76"), u8("229"), u8("189"), u8("253"), u8("254"), u8("208")];
export const CONSENSUS_POP_2 : U8[] = [u8("144"), u8("157"), u8("58"), u8("55"), u8("138"), u8("213"), u8("193"), u8("127"), u8("175"), u8("137"), u8("247"), u8("162"), u8("6"), u8("40"), u8("136"), u8("16"), u8("0"), u8("39"), u8("237"), u8("161"), u8("130"), u8("21"), u8("199"), u8("115"), u8("95"), u8("145"), u8("122"), u8("72"), u8("67"), u8("205"), u8("65"), u8("50"), u8("139"), u8("66"), u8("250"), u8("66"), u8("66"), u8("227"), u8("109"), u8("237"), u8("176"), u8("68"), u8("50"), u8("175"), u8("20"), u8("96"), u8("137"), u8("115"), u8("21"), u8("10"), u8("203"), u8("255"), u8("12"), u8("93"), u8("63"), u8("50"), u8("91"), u8("160"), u8("75"), u8("40"), u8("123"), u8("233"), u8("116"), u8("115"), u8("152"), u8("118"), u8("154"), u8("145"), u8("212"), u8("36"), u8("70"), u8("137"), u8("207"), u8("169"), u8("197"), u8("53"), u8("165"), u8("164"), u8("214"), u8("112"), u8("115"), u8("238"), u8("34"), u8("9"), u8("13"), u8("90"), u8("176"), u8("168"), u8("138"), u8("184"), u8("210"), u8("255"), u8("104"), u8("14"), u8("153"), u8("30")];
export const EALREADY_ACTIVE_VALIDATOR : U64 = u64("6");
export const EALREADY_REGISTERED : U64 = u64("10");
export const EINVALID_PUBLIC_KEY : U64 = u64("16");
export const ELAST_VALIDATOR : U64 = u64("8");
export const ELOCK_TIME_TOO_LONG : U64 = u64("14");
export const ELOCK_TIME_TOO_SHORT : U64 = u64("1");
export const ENOT_OPERATOR : U64 = u64("13");
export const ENOT_OWNER : U64 = u64("11");
export const ENOT_VALIDATOR : U64 = u64("7");
export const ENO_COINS_TO_WITHDRAW : U64 = u64("12");
export const ENO_POST_GENESIS_VALIDATOR_SET_CHANGE_ALLOWED : U64 = u64("15");
export const ESTAKE_EXCEEDS_MAX : U64 = u64("9");
export const ESTAKE_TOO_HIGH : U64 = u64("5");
export const ESTAKE_TOO_LOW : U64 = u64("4");
export const EVALIDATOR_CONFIG : U64 = u64("3");
export const EWITHDRAW_NOT_ALLOWED : U64 = u64("2");
export const MAXIMUM_LOCK_UP_SECS : U64 = u64("1000");


export class AddStakeEvent 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "AddStakeEvent";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "pool_address", typeTag: AtomicTypeTag.Address },
  { name: "amount_added", typeTag: AtomicTypeTag.U64 }];

  pool_address: HexString;
  amount_added: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.pool_address = proto['pool_address'] as HexString;
    this.amount_added = proto['amount_added'] as U64;
  }

  static AddStakeEventParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : AddStakeEvent {
    const proto = $.parseStructProto(data, typeTag, repo, AddStakeEvent);
    return new AddStakeEvent(proto, typeTag);
  }

}

export class DistributeRewardsEvent 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "DistributeRewardsEvent";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "pool_address", typeTag: AtomicTypeTag.Address },
  { name: "rewards_amount", typeTag: AtomicTypeTag.U64 }];

  pool_address: HexString;
  rewards_amount: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.pool_address = proto['pool_address'] as HexString;
    this.rewards_amount = proto['rewards_amount'] as U64;
  }

  static DistributeRewardsEventParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : DistributeRewardsEvent {
    const proto = $.parseStructProto(data, typeTag, repo, DistributeRewardsEvent);
    return new DistributeRewardsEvent(proto, typeTag);
  }

}

export class IncreaseLockupEvent 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "IncreaseLockupEvent";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "pool_address", typeTag: AtomicTypeTag.Address },
  { name: "old_locked_until_secs", typeTag: AtomicTypeTag.U64 },
  { name: "new_locked_until_secs", typeTag: AtomicTypeTag.U64 }];

  pool_address: HexString;
  old_locked_until_secs: U64;
  new_locked_until_secs: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.pool_address = proto['pool_address'] as HexString;
    this.old_locked_until_secs = proto['old_locked_until_secs'] as U64;
    this.new_locked_until_secs = proto['new_locked_until_secs'] as U64;
  }

  static IncreaseLockupEventParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : IncreaseLockupEvent {
    const proto = $.parseStructProto(data, typeTag, repo, IncreaseLockupEvent);
    return new IncreaseLockupEvent(proto, typeTag);
  }

}

export class JoinValidatorSetEvent 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "JoinValidatorSetEvent";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "pool_address", typeTag: AtomicTypeTag.Address }];

  pool_address: HexString;

  constructor(proto: any, public typeTag: TypeTag) {
    this.pool_address = proto['pool_address'] as HexString;
  }

  static JoinValidatorSetEventParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : JoinValidatorSetEvent {
    const proto = $.parseStructProto(data, typeTag, repo, JoinValidatorSetEvent);
    return new JoinValidatorSetEvent(proto, typeTag);
  }

}

export class LeaveValidatorSetEvent 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "LeaveValidatorSetEvent";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "pool_address", typeTag: AtomicTypeTag.Address }];

  pool_address: HexString;

  constructor(proto: any, public typeTag: TypeTag) {
    this.pool_address = proto['pool_address'] as HexString;
  }

  static LeaveValidatorSetEventParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : LeaveValidatorSetEvent {
    const proto = $.parseStructProto(data, typeTag, repo, LeaveValidatorSetEvent);
    return new LeaveValidatorSetEvent(proto, typeTag);
  }

}

export class OwnerCapability 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "OwnerCapability";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "pool_address", typeTag: AtomicTypeTag.Address }];

  pool_address: HexString;

  constructor(proto: any, public typeTag: TypeTag) {
    this.pool_address = proto['pool_address'] as HexString;
  }

  static OwnerCapabilityParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : OwnerCapability {
    const proto = $.parseStructProto(data, typeTag, repo, OwnerCapability);
    return new OwnerCapability(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, OwnerCapability, typeParams);
    return result as unknown as OwnerCapability;
  }
}

export class RegisterValidatorCandidateEvent 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "RegisterValidatorCandidateEvent";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "pool_address", typeTag: AtomicTypeTag.Address }];

  pool_address: HexString;

  constructor(proto: any, public typeTag: TypeTag) {
    this.pool_address = proto['pool_address'] as HexString;
  }

  static RegisterValidatorCandidateEventParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : RegisterValidatorCandidateEvent {
    const proto = $.parseStructProto(data, typeTag, repo, RegisterValidatorCandidateEvent);
    return new RegisterValidatorCandidateEvent(proto, typeTag);
  }

}

export class RotateConsensusKeyEvent 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "RotateConsensusKeyEvent";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "pool_address", typeTag: AtomicTypeTag.Address },
  { name: "old_consensus_pubkey", typeTag: new VectorTag(AtomicTypeTag.U8) },
  { name: "new_consensus_pubkey", typeTag: new VectorTag(AtomicTypeTag.U8) }];

  pool_address: HexString;
  old_consensus_pubkey: U8[];
  new_consensus_pubkey: U8[];

  constructor(proto: any, public typeTag: TypeTag) {
    this.pool_address = proto['pool_address'] as HexString;
    this.old_consensus_pubkey = proto['old_consensus_pubkey'] as U8[];
    this.new_consensus_pubkey = proto['new_consensus_pubkey'] as U8[];
  }

  static RotateConsensusKeyEventParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : RotateConsensusKeyEvent {
    const proto = $.parseStructProto(data, typeTag, repo, RotateConsensusKeyEvent);
    return new RotateConsensusKeyEvent(proto, typeTag);
  }

}

export class SetOperatorEvent 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "SetOperatorEvent";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "pool_address", typeTag: AtomicTypeTag.Address },
  { name: "old_operator", typeTag: AtomicTypeTag.Address },
  { name: "new_operator", typeTag: AtomicTypeTag.Address }];

  pool_address: HexString;
  old_operator: HexString;
  new_operator: HexString;

  constructor(proto: any, public typeTag: TypeTag) {
    this.pool_address = proto['pool_address'] as HexString;
    this.old_operator = proto['old_operator'] as HexString;
    this.new_operator = proto['new_operator'] as HexString;
  }

  static SetOperatorEventParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : SetOperatorEvent {
    const proto = $.parseStructProto(data, typeTag, repo, SetOperatorEvent);
    return new SetOperatorEvent(proto, typeTag);
  }

}

export class StakePool 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "StakePool";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "active", typeTag: new StructTag(new HexString("0x1"), "Coin", "Coin", [new StructTag(new HexString("0x1"), "TestCoin", "TestCoin", [])]) },
  { name: "inactive", typeTag: new StructTag(new HexString("0x1"), "Coin", "Coin", [new StructTag(new HexString("0x1"), "TestCoin", "TestCoin", [])]) },
  { name: "pending_active", typeTag: new StructTag(new HexString("0x1"), "Coin", "Coin", [new StructTag(new HexString("0x1"), "TestCoin", "TestCoin", [])]) },
  { name: "pending_inactive", typeTag: new StructTag(new HexString("0x1"), "Coin", "Coin", [new StructTag(new HexString("0x1"), "TestCoin", "TestCoin", [])]) },
  { name: "locked_until_secs", typeTag: AtomicTypeTag.U64 },
  { name: "operator_address", typeTag: AtomicTypeTag.Address },
  { name: "delegated_voter", typeTag: AtomicTypeTag.Address }];

  active: Coin.Coin;
  inactive: Coin.Coin;
  pending_active: Coin.Coin;
  pending_inactive: Coin.Coin;
  locked_until_secs: U64;
  operator_address: HexString;
  delegated_voter: HexString;

  constructor(proto: any, public typeTag: TypeTag) {
    this.active = proto['active'] as Coin.Coin;
    this.inactive = proto['inactive'] as Coin.Coin;
    this.pending_active = proto['pending_active'] as Coin.Coin;
    this.pending_inactive = proto['pending_inactive'] as Coin.Coin;
    this.locked_until_secs = proto['locked_until_secs'] as U64;
    this.operator_address = proto['operator_address'] as HexString;
    this.delegated_voter = proto['delegated_voter'] as HexString;
  }

  static StakePoolParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : StakePool {
    const proto = $.parseStructProto(data, typeTag, repo, StakePool);
    return new StakePool(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, StakePool, typeParams);
    return result as unknown as StakePool;
  }
}

export class StakePoolEvents 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "StakePoolEvents";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "register_validator_candidate_events", typeTag: new StructTag(new HexString("0x1"), "Event", "EventHandle", [new StructTag(new HexString("0x1"), "Stake", "RegisterValidatorCandidateEvent", [])]) },
  { name: "set_operator_events", typeTag: new StructTag(new HexString("0x1"), "Event", "EventHandle", [new StructTag(new HexString("0x1"), "Stake", "SetOperatorEvent", [])]) },
  { name: "add_stake_events", typeTag: new StructTag(new HexString("0x1"), "Event", "EventHandle", [new StructTag(new HexString("0x1"), "Stake", "AddStakeEvent", [])]) },
  { name: "rotate_consensus_key_events", typeTag: new StructTag(new HexString("0x1"), "Event", "EventHandle", [new StructTag(new HexString("0x1"), "Stake", "RotateConsensusKeyEvent", [])]) },
  { name: "increase_lockup_events", typeTag: new StructTag(new HexString("0x1"), "Event", "EventHandle", [new StructTag(new HexString("0x1"), "Stake", "IncreaseLockupEvent", [])]) },
  { name: "join_validator_set_events", typeTag: new StructTag(new HexString("0x1"), "Event", "EventHandle", [new StructTag(new HexString("0x1"), "Stake", "JoinValidatorSetEvent", [])]) },
  { name: "distribute_rewards_events", typeTag: new StructTag(new HexString("0x1"), "Event", "EventHandle", [new StructTag(new HexString("0x1"), "Stake", "DistributeRewardsEvent", [])]) },
  { name: "unlock_stake_events", typeTag: new StructTag(new HexString("0x1"), "Event", "EventHandle", [new StructTag(new HexString("0x1"), "Stake", "UnlockStakeEvent", [])]) },
  { name: "withdraw_stake_events", typeTag: new StructTag(new HexString("0x1"), "Event", "EventHandle", [new StructTag(new HexString("0x1"), "Stake", "WithdrawStakeEvent", [])]) },
  { name: "leave_validator_set_events", typeTag: new StructTag(new HexString("0x1"), "Event", "EventHandle", [new StructTag(new HexString("0x1"), "Stake", "LeaveValidatorSetEvent", [])]) }];

  register_validator_candidate_events: Std.Event.EventHandle;
  set_operator_events: Std.Event.EventHandle;
  add_stake_events: Std.Event.EventHandle;
  rotate_consensus_key_events: Std.Event.EventHandle;
  increase_lockup_events: Std.Event.EventHandle;
  join_validator_set_events: Std.Event.EventHandle;
  distribute_rewards_events: Std.Event.EventHandle;
  unlock_stake_events: Std.Event.EventHandle;
  withdraw_stake_events: Std.Event.EventHandle;
  leave_validator_set_events: Std.Event.EventHandle;

  constructor(proto: any, public typeTag: TypeTag) {
    this.register_validator_candidate_events = proto['register_validator_candidate_events'] as Std.Event.EventHandle;
    this.set_operator_events = proto['set_operator_events'] as Std.Event.EventHandle;
    this.add_stake_events = proto['add_stake_events'] as Std.Event.EventHandle;
    this.rotate_consensus_key_events = proto['rotate_consensus_key_events'] as Std.Event.EventHandle;
    this.increase_lockup_events = proto['increase_lockup_events'] as Std.Event.EventHandle;
    this.join_validator_set_events = proto['join_validator_set_events'] as Std.Event.EventHandle;
    this.distribute_rewards_events = proto['distribute_rewards_events'] as Std.Event.EventHandle;
    this.unlock_stake_events = proto['unlock_stake_events'] as Std.Event.EventHandle;
    this.withdraw_stake_events = proto['withdraw_stake_events'] as Std.Event.EventHandle;
    this.leave_validator_set_events = proto['leave_validator_set_events'] as Std.Event.EventHandle;
  }

  static StakePoolEventsParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : StakePoolEvents {
    const proto = $.parseStructProto(data, typeTag, repo, StakePoolEvents);
    return new StakePoolEvents(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, StakePoolEvents, typeParams);
    return result as unknown as StakePoolEvents;
  }
}

export class TestCoinCapabilities 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "TestCoinCapabilities";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "mint_cap", typeTag: new StructTag(new HexString("0x1"), "Coin", "MintCapability", [new StructTag(new HexString("0x1"), "TestCoin", "TestCoin", [])]) }];

  mint_cap: Coin.MintCapability;

  constructor(proto: any, public typeTag: TypeTag) {
    this.mint_cap = proto['mint_cap'] as Coin.MintCapability;
  }

  static TestCoinCapabilitiesParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : TestCoinCapabilities {
    const proto = $.parseStructProto(data, typeTag, repo, TestCoinCapabilities);
    return new TestCoinCapabilities(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, TestCoinCapabilities, typeParams);
    return result as unknown as TestCoinCapabilities;
  }
}

export class UnlockStakeEvent 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "UnlockStakeEvent";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "pool_address", typeTag: AtomicTypeTag.Address },
  { name: "amount_unlocked", typeTag: AtomicTypeTag.U64 }];

  pool_address: HexString;
  amount_unlocked: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.pool_address = proto['pool_address'] as HexString;
    this.amount_unlocked = proto['amount_unlocked'] as U64;
  }

  static UnlockStakeEventParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : UnlockStakeEvent {
    const proto = $.parseStructProto(data, typeTag, repo, UnlockStakeEvent);
    return new UnlockStakeEvent(proto, typeTag);
  }

}

export class ValidatorConfig 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "ValidatorConfig";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "consensus_pubkey", typeTag: new VectorTag(AtomicTypeTag.U8) },
  { name: "network_addresses", typeTag: new VectorTag(AtomicTypeTag.U8) },
  { name: "fullnode_addresses", typeTag: new VectorTag(AtomicTypeTag.U8) },
  { name: "validator_index", typeTag: AtomicTypeTag.U64 }];

  consensus_pubkey: U8[];
  network_addresses: U8[];
  fullnode_addresses: U8[];
  validator_index: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.consensus_pubkey = proto['consensus_pubkey'] as U8[];
    this.network_addresses = proto['network_addresses'] as U8[];
    this.fullnode_addresses = proto['fullnode_addresses'] as U8[];
    this.validator_index = proto['validator_index'] as U64;
  }

  static ValidatorConfigParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : ValidatorConfig {
    const proto = $.parseStructProto(data, typeTag, repo, ValidatorConfig);
    return new ValidatorConfig(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, ValidatorConfig, typeParams);
    return result as unknown as ValidatorConfig;
  }
}

export class ValidatorInfo 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "ValidatorInfo";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "addr", typeTag: AtomicTypeTag.Address },
  { name: "voting_power", typeTag: AtomicTypeTag.U64 },
  { name: "config", typeTag: new StructTag(new HexString("0x1"), "Stake", "ValidatorConfig", []) }];

  addr: HexString;
  voting_power: U64;
  config: ValidatorConfig;

  constructor(proto: any, public typeTag: TypeTag) {
    this.addr = proto['addr'] as HexString;
    this.voting_power = proto['voting_power'] as U64;
    this.config = proto['config'] as ValidatorConfig;
  }

  static ValidatorInfoParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : ValidatorInfo {
    const proto = $.parseStructProto(data, typeTag, repo, ValidatorInfo);
    return new ValidatorInfo(proto, typeTag);
  }

}

export class ValidatorPerformance 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "ValidatorPerformance";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "num_blocks", typeTag: AtomicTypeTag.U64 },
  { name: "missed_votes", typeTag: new VectorTag(AtomicTypeTag.U64) }];

  num_blocks: U64;
  missed_votes: U64[];

  constructor(proto: any, public typeTag: TypeTag) {
    this.num_blocks = proto['num_blocks'] as U64;
    this.missed_votes = proto['missed_votes'] as U64[];
  }

  static ValidatorPerformanceParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : ValidatorPerformance {
    const proto = $.parseStructProto(data, typeTag, repo, ValidatorPerformance);
    return new ValidatorPerformance(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, ValidatorPerformance, typeParams);
    return result as unknown as ValidatorPerformance;
  }
}

export class ValidatorSet 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "ValidatorSet";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "consensus_scheme", typeTag: AtomicTypeTag.U8 },
  { name: "active_validators", typeTag: new VectorTag(new StructTag(new HexString("0x1"), "Stake", "ValidatorInfo", [])) },
  { name: "pending_inactive", typeTag: new VectorTag(new StructTag(new HexString("0x1"), "Stake", "ValidatorInfo", [])) },
  { name: "pending_active", typeTag: new VectorTag(new StructTag(new HexString("0x1"), "Stake", "ValidatorInfo", [])) }];

  consensus_scheme: U8;
  active_validators: ValidatorInfo[];
  pending_inactive: ValidatorInfo[];
  pending_active: ValidatorInfo[];

  constructor(proto: any, public typeTag: TypeTag) {
    this.consensus_scheme = proto['consensus_scheme'] as U8;
    this.active_validators = proto['active_validators'] as ValidatorInfo[];
    this.pending_inactive = proto['pending_inactive'] as ValidatorInfo[];
    this.pending_active = proto['pending_active'] as ValidatorInfo[];
  }

  static ValidatorSetParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : ValidatorSet {
    const proto = $.parseStructProto(data, typeTag, repo, ValidatorSet);
    return new ValidatorSet(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, ValidatorSet, typeParams);
    return result as unknown as ValidatorSet;
  }
}

export class ValidatorSetConfiguration 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "ValidatorSetConfiguration";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "minimum_stake", typeTag: AtomicTypeTag.U64 },
  { name: "maximum_stake", typeTag: AtomicTypeTag.U64 },
  { name: "min_lockup_duration_secs", typeTag: AtomicTypeTag.U64 },
  { name: "max_lockup_duration_secs", typeTag: AtomicTypeTag.U64 },
  { name: "allow_validator_set_change", typeTag: AtomicTypeTag.Bool },
  { name: "rewards_rate", typeTag: AtomicTypeTag.U64 },
  { name: "rewards_rate_denominator", typeTag: AtomicTypeTag.U64 }];

  minimum_stake: U64;
  maximum_stake: U64;
  min_lockup_duration_secs: U64;
  max_lockup_duration_secs: U64;
  allow_validator_set_change: boolean;
  rewards_rate: U64;
  rewards_rate_denominator: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.minimum_stake = proto['minimum_stake'] as U64;
    this.maximum_stake = proto['maximum_stake'] as U64;
    this.min_lockup_duration_secs = proto['min_lockup_duration_secs'] as U64;
    this.max_lockup_duration_secs = proto['max_lockup_duration_secs'] as U64;
    this.allow_validator_set_change = proto['allow_validator_set_change'] as boolean;
    this.rewards_rate = proto['rewards_rate'] as U64;
    this.rewards_rate_denominator = proto['rewards_rate_denominator'] as U64;
  }

  static ValidatorSetConfigurationParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : ValidatorSetConfiguration {
    const proto = $.parseStructProto(data, typeTag, repo, ValidatorSetConfiguration);
    return new ValidatorSetConfiguration(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, ValidatorSetConfiguration, typeParams);
    return result as unknown as ValidatorSetConfiguration;
  }
}

export class WithdrawStakeEvent 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "WithdrawStakeEvent";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "pool_address", typeTag: AtomicTypeTag.Address },
  { name: "amount_withdrawn", typeTag: AtomicTypeTag.U64 }];

  pool_address: HexString;
  amount_withdrawn: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.pool_address = proto['pool_address'] as HexString;
    this.amount_withdrawn = proto['amount_withdrawn'] as U64;
  }

  static WithdrawStakeEventParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : WithdrawStakeEvent {
    const proto = $.parseStructProto(data, typeTag, repo, WithdrawStakeEvent);
    return new WithdrawStakeEvent(proto, typeTag);
  }

}
export function add_stake$ (
  account: HexString,
  amount: U64,
  $c: AptosDataCache,
): void {
  let account_addr, ownership_cap;
  account_addr = Std.Signer.address_of$(account, $c);
  ownership_cap = $c.borrow_global<OwnerCapability>(new StructTag(new HexString("0x1"), "Stake", "OwnerCapability", []), $.copy(account_addr));
  add_stake_with_cap$($.copy(account_addr), ownership_cap, Coin.withdraw$(account, $.copy(amount), $c, [new StructTag(new HexString("0x1"), "TestCoin", "TestCoin", [])] as TypeTag[]), $c);
  return;
}


export function buildPayload_add_stake (
  account: HexString,
  amount: U64,
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0x1::Stake::add_stake",
    typeParamStrings,
    [
      amount.toPayloadArg(),
    ]
  );

}
export function add_stake_with_cap$ (
  pool_address: HexString,
  owner_cap: OwnerCapability,
  coins: Coin.Coin,
  $c: AptosDataCache,
): void {
  let amount, maximum_stake, stake_pool, stake_pool_events, total_stake;
  if (!($.copy(owner_cap.pool_address).hex() === $.copy(pool_address).hex())) {
    throw $.abortCode(Std.Errors.invalid_argument$(ENOT_OWNER, $c));
  }
  stake_pool = $c.borrow_global_mut<StakePool>(new StructTag(new HexString("0x1"), "Stake", "StakePool", []), $.copy(pool_address));
  amount = Coin.value$(coins, $c, [new StructTag(new HexString("0x1"), "TestCoin", "TestCoin", [])] as TypeTag[]);
  if (is_current_validator$($.copy(pool_address), $c)) {
    Coin.merge$(stake_pool.pending_active, coins, $c, [new StructTag(new HexString("0x1"), "TestCoin", "TestCoin", [])] as TypeTag[]);
  }
  else{
    Coin.merge$(stake_pool.active, coins, $c, [new StructTag(new HexString("0x1"), "TestCoin", "TestCoin", [])] as TypeTag[]);
  }
  maximum_stake = $.copy($c.borrow_global<ValidatorSetConfiguration>(new StructTag(new HexString("0x1"), "Stake", "ValidatorSetConfiguration", []), new HexString("0xa550c18")).maximum_stake);
  total_stake = Coin.value$(stake_pool.active, $c, [new StructTag(new HexString("0x1"), "TestCoin", "TestCoin", [])] as TypeTag[]).add(Coin.value$(stake_pool.pending_active, $c, [new StructTag(new HexString("0x1"), "TestCoin", "TestCoin", [])] as TypeTag[]));
  if (!$.copy(total_stake).le($.copy(maximum_stake))) {
    throw $.abortCode(Std.Errors.invalid_argument$(ESTAKE_EXCEEDS_MAX, $c));
  }
  stake_pool_events = $c.borrow_global_mut<StakePoolEvents>(new StructTag(new HexString("0x1"), "Stake", "StakePoolEvents", []), $.copy(pool_address));
  Std.Event.emit_event$(stake_pool_events.add_stake_events, new AddStakeEvent({ pool_address: $.copy(pool_address), amount_added: $.copy(amount) }, new StructTag(new HexString("0x1"), "Stake", "AddStakeEvent", [])), $c, [new StructTag(new HexString("0x1"), "Stake", "AddStakeEvent", [])] as TypeTag[]);
  return;
}

export function append$ (
  v1: any[],
  v2: any[],
  $c: AptosDataCache,
  $p: TypeTag[], /* <T>*/
): void {
  while (!Std.Vector.is_empty$(v2, $c, [$p[0]] as TypeTag[])) {
    {
      Std.Vector.push_back$(v1, Std.Vector.pop_back$(v2, $c, [$p[0]] as TypeTag[]), $c, [$p[0]] as TypeTag[]);
    }

  }return;
}

// test func
export function assert_validator_state$ (
  pool_address: HexString,
  active_stake: U64,
  inactive_stake: U64,
  pending_active_stake: U64,
  pending_inactive_stake: U64,
  validator_index: U64,
  $c: AptosDataCache,
): void {
  let actual_active_stake, actual_inactive_stake, actual_pending_active_stake, actual_pending_inactive_stake, stake_pool, validator_config;
  stake_pool = $c.borrow_global<StakePool>(new StructTag(new HexString("0x1"), "Stake", "StakePool", []), $.copy(pool_address));
  actual_active_stake = Coin.value$(stake_pool.active, $c, [new StructTag(new HexString("0x1"), "TestCoin", "TestCoin", [])] as TypeTag[]);
  if (!$.copy(actual_active_stake).eq($.copy(active_stake))) {
    throw $.abortCode($.copy(actual_active_stake));
  }
  actual_inactive_stake = Coin.value$(stake_pool.inactive, $c, [new StructTag(new HexString("0x1"), "TestCoin", "TestCoin", [])] as TypeTag[]);
  if (!$.copy(actual_inactive_stake).eq($.copy(inactive_stake))) {
    throw $.abortCode($.copy(actual_inactive_stake));
  }
  actual_pending_active_stake = Coin.value$(stake_pool.pending_active, $c, [new StructTag(new HexString("0x1"), "TestCoin", "TestCoin", [])] as TypeTag[]);
  if (!$.copy(actual_pending_active_stake).eq($.copy(pending_active_stake))) {
    throw $.abortCode($.copy(actual_pending_active_stake));
  }
  actual_pending_inactive_stake = Coin.value$(stake_pool.pending_inactive, $c, [new StructTag(new HexString("0x1"), "TestCoin", "TestCoin", [])] as TypeTag[]);
  if (!$.copy(actual_pending_inactive_stake).eq($.copy(pending_inactive_stake))) {
    throw $.abortCode($.copy(actual_pending_inactive_stake));
  }
  validator_config = $c.borrow_global<ValidatorConfig>(new StructTag(new HexString("0x1"), "Stake", "ValidatorConfig", []), $.copy(pool_address));
  if (!$.copy(validator_config.validator_index).eq($.copy(validator_index))) {
    throw $.abortCode($.copy(validator_config.validator_index));
  }
  return;
}

// test func
export function create_stake_pool$ (
  account: HexString,
  active: Coin.Coin,
  locked_until_secs: U64,
  $c: AptosDataCache,
): void {
  let address;
  address = Std.Signer.address_of$(account, $c);
  $c.move_to(new StructTag(new HexString("0x1"), "Stake", "StakePool", []), account, new StakePool({ active: active, inactive: Coin.zero$($c, [new StructTag(new HexString("0x1"), "TestCoin", "TestCoin", [])] as TypeTag[]), pending_active: Coin.zero$($c, [new StructTag(new HexString("0x1"), "TestCoin", "TestCoin", [])] as TypeTag[]), pending_inactive: Coin.zero$($c, [new StructTag(new HexString("0x1"), "TestCoin", "TestCoin", [])] as TypeTag[]), locked_until_secs: $.copy(locked_until_secs), operator_address: $.copy(address), delegated_voter: $.copy(address) }, new StructTag(new HexString("0x1"), "Stake", "StakePool", [])));
  $c.move_to(new StructTag(new HexString("0x1"), "Stake", "OwnerCapability", []), account, new OwnerCapability({ pool_address: $.copy(address) }, new StructTag(new HexString("0x1"), "Stake", "OwnerCapability", [])));
  return;
}

// test func
export function create_validator_set$ (
  core_resources: HexString,
  active_validator_addresses: HexString[],
  $c: AptosDataCache,
): void {
  let active_validators, i, validator_address;
  active_validators = Std.Vector.empty$($c, [new StructTag(new HexString("0x1"), "Stake", "ValidatorInfo", [])] as TypeTag[]);
  i = u64("0");
  while ($.copy(i).lt(Std.Vector.length$(active_validator_addresses, $c, [AtomicTypeTag.Address] as TypeTag[]))) {
    {
      validator_address = Std.Vector.borrow$(active_validator_addresses, $.copy(i), $c, [AtomicTypeTag.Address] as TypeTag[]);
      Std.Vector.push_back$(active_validators, new ValidatorInfo({ addr: $.copy(validator_address), voting_power: u64("0"), config: new ValidatorConfig({ consensus_pubkey: CONSENSUS_KEY_1, network_addresses: [], fullnode_addresses: [], validator_index: u64("0") }, new StructTag(new HexString("0x1"), "Stake", "ValidatorConfig", [])) }, new StructTag(new HexString("0x1"), "Stake", "ValidatorInfo", [])), $c, [new StructTag(new HexString("0x1"), "Stake", "ValidatorInfo", [])] as TypeTag[]);
      i = $.copy(i).add(u64("1"));
    }

  }$c.move_to(new StructTag(new HexString("0x1"), "Stake", "ValidatorSet", []), core_resources, new ValidatorSet({ consensus_scheme: u8("0"), active_validators: $.copy(active_validators), pending_inactive: Std.Vector.empty$($c, [new StructTag(new HexString("0x1"), "Stake", "ValidatorInfo", [])] as TypeTag[]), pending_active: Std.Vector.empty$($c, [new StructTag(new HexString("0x1"), "Stake", "ValidatorInfo", [])] as TypeTag[]) }, new StructTag(new HexString("0x1"), "Stake", "ValidatorSet", [])));
  return;
}

export function deposit_owner_cap$ (
  account: HexString,
  owner_cap: OwnerCapability,
  $c: AptosDataCache,
): void {
  $c.move_to(new StructTag(new HexString("0x1"), "Stake", "OwnerCapability", []), account, owner_cap);
  return;
}

export function distribute_reward$ (
  stake: Coin.Coin,
  num_blocks: U64,
  num_successful_votes: U64,
  remaining_lockup_time: U64,
  validator_set_config: ValidatorSetConfiguration,
  $c: AptosDataCache,
): U64 {
  let base_rewards, mint_cap, rewards, rewards_amount, rewards_denominator;
  base_rewards = Coin.value$(stake, $c, [new StructTag(new HexString("0x1"), "TestCoin", "TestCoin", [])] as TypeTag[]).mul($.copy(validator_set_config.rewards_rate)).div($.copy(validator_set_config.rewards_rate_denominator));
  rewards_denominator = $.copy(num_blocks).mul($.copy(validator_set_config.max_lockup_duration_secs));
  rewards_amount = $.copy(base_rewards).mul($.copy(num_successful_votes)).mul($.copy(remaining_lockup_time)).div($.copy(rewards_denominator));
  if ($.copy(rewards_amount).gt(u64("0"))) {
    mint_cap = $c.borrow_global<TestCoinCapabilities>(new StructTag(new HexString("0x1"), "Stake", "TestCoinCapabilities", []), new HexString("0xa550c18")).mint_cap;
    rewards = Coin.mint$($.copy(rewards_amount), mint_cap, $c, [new StructTag(new HexString("0x1"), "TestCoin", "TestCoin", [])] as TypeTag[]);
    Coin.merge$(stake, rewards, $c, [new StructTag(new HexString("0x1"), "TestCoin", "TestCoin", [])] as TypeTag[]);
  }
  else{
  }
  return $.copy(rewards_amount);
}

export function extract_owner_cap$ (
  account: HexString,
  $c: AptosDataCache,
): OwnerCapability {
  return $c.move_from<OwnerCapability>(new StructTag(new HexString("0x1"), "Stake", "OwnerCapability", []), Std.Signer.address_of$(account, $c));
}

export function find_validator$ (
  v: ValidatorInfo[],
  addr: HexString,
  $c: AptosDataCache,
): Std.Option.Option {
  let i, len;
  i = u64("0");
  len = Std.Vector.length$(v, $c, [new StructTag(new HexString("0x1"), "Stake", "ValidatorInfo", [])] as TypeTag[]);
  while ($.copy(i).lt($.copy(len))) {
    {
      if (($.copy(Std.Vector.borrow$(v, $.copy(i), $c, [new StructTag(new HexString("0x1"), "Stake", "ValidatorInfo", [])] as TypeTag[]).addr).hex() === $.copy(addr).hex())) {
        return Std.Option.some$($.copy(i), $c, [AtomicTypeTag.U64] as TypeTag[]);
      }
      else{
      }
      i = $.copy(i).add(u64("1"));
    }

  }return Std.Option.none$($c, [AtomicTypeTag.U64] as TypeTag[]);
}

export function generate_validator_info$ (
  addr: HexString,
  config: ValidatorConfig,
  $c: AptosDataCache,
): ValidatorInfo {
  let stake_pool, voting_power;
  stake_pool = $c.borrow_global<StakePool>(new StructTag(new HexString("0x1"), "Stake", "StakePool", []), $.copy(addr));
  voting_power = Coin.value$(stake_pool.active, $c, [new StructTag(new HexString("0x1"), "TestCoin", "TestCoin", [])] as TypeTag[]);
  return new ValidatorInfo({ addr: $.copy(addr), voting_power: $.copy(voting_power), config: $.copy(config) }, new StructTag(new HexString("0x1"), "Stake", "ValidatorInfo", []));
}

export function get_active_staked_balance$ (
  pool_address: HexString,
  $c: AptosDataCache,
): U64 {
  let temp$1;
  if (is_validator_active$($.copy(pool_address), $c)) {
    temp$1 = Coin.value$($c.borrow_global<StakePool>(new StructTag(new HexString("0x1"), "Stake", "StakePool", []), $.copy(pool_address)).active, $c, [new StructTag(new HexString("0x1"), "TestCoin", "TestCoin", [])] as TypeTag[]);
  }
  else{
    temp$1 = u64("0");
  }
  return temp$1;
}

export function get_lockup_secs$ (
  pool_address: HexString,
  $c: AptosDataCache,
): U64 {
  return $.copy($c.borrow_global<StakePool>(new StructTag(new HexString("0x1"), "Stake", "StakePool", []), $.copy(pool_address)).locked_until_secs);
}

export function increase_lockup$ (
  account: HexString,
  new_locked_until_secs: U64,
  $c: AptosDataCache,
): void {
  let account_addr, ownership_cap;
  account_addr = Std.Signer.address_of$(account, $c);
  ownership_cap = $c.borrow_global<OwnerCapability>(new StructTag(new HexString("0x1"), "Stake", "OwnerCapability", []), $.copy(account_addr));
  increase_lockup_with_cap$($.copy(account_addr), ownership_cap, $.copy(new_locked_until_secs), $c);
  return;
}


export function buildPayload_increase_lockup (
  account: HexString,
  new_locked_until_secs: U64,
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0x1::Stake::increase_lockup",
    typeParamStrings,
    [
      new_locked_until_secs.toPayloadArg(),
    ]
  );

}
export function increase_lockup_with_cap$ (
  pool_address: HexString,
  owner_cap: OwnerCapability,
  new_locked_until_secs: U64,
  $c: AptosDataCache,
): void {
  let old_locked_until_secs, stake_pool, stake_pool_events, validator_set_config;
  if (!($.copy(owner_cap.pool_address).hex() === $.copy(pool_address).hex())) {
    throw $.abortCode(Std.Errors.invalid_argument$(ENOT_OWNER, $c));
  }
  validator_set_config = $c.borrow_global<ValidatorSetConfiguration>(new StructTag(new HexString("0x1"), "Stake", "ValidatorSetConfiguration", []), new HexString("0xa550c18"));
  validate_lockup_time$($.copy(new_locked_until_secs), validator_set_config, $c);
  stake_pool = $c.borrow_global_mut<StakePool>(new StructTag(new HexString("0x1"), "Stake", "StakePool", []), $.copy(pool_address));
  old_locked_until_secs = $.copy(stake_pool.locked_until_secs);
  stake_pool.locked_until_secs = $.copy(new_locked_until_secs);
  stake_pool_events = $c.borrow_global_mut<StakePoolEvents>(new StructTag(new HexString("0x1"), "Stake", "StakePoolEvents", []), $.copy(pool_address));
  Std.Event.emit_event$(stake_pool_events.increase_lockup_events, new IncreaseLockupEvent({ pool_address: $.copy(pool_address), old_locked_until_secs: $.copy(old_locked_until_secs), new_locked_until_secs: $.copy(new_locked_until_secs) }, new StructTag(new HexString("0x1"), "Stake", "IncreaseLockupEvent", [])), $c, [new StructTag(new HexString("0x1"), "Stake", "IncreaseLockupEvent", [])] as TypeTag[]);
  return;
}

export function initialize_validator_set$ (
  core_resources: HexString,
  minimum_stake: U64,
  maximum_stake: U64,
  min_lockup_duration_secs: U64,
  max_lockup_duration_secs: U64,
  allow_validator_set_change: boolean,
  rewards_rate: U64,
  rewards_rate_denominator: U64,
  $c: AptosDataCache,
): void {
  let temp$1, temp$2, temp$3, temp$4, temp$5;
  SystemAddresses.assert_core_resource$(core_resources, $c);
  temp$5 = core_resources;
  temp$1 = u8("0");
  temp$2 = Std.Vector.empty$($c, [new StructTag(new HexString("0x1"), "Stake", "ValidatorInfo", [])] as TypeTag[]);
  temp$3 = Std.Vector.empty$($c, [new StructTag(new HexString("0x1"), "Stake", "ValidatorInfo", [])] as TypeTag[]);
  temp$4 = Std.Vector.empty$($c, [new StructTag(new HexString("0x1"), "Stake", "ValidatorInfo", [])] as TypeTag[]);
  $c.move_to(new StructTag(new HexString("0x1"), "Stake", "ValidatorSet", []), temp$5, new ValidatorSet({ consensus_scheme: temp$1, active_validators: temp$2, pending_inactive: temp$4, pending_active: temp$3 }, new StructTag(new HexString("0x1"), "Stake", "ValidatorSet", [])));
  $c.move_to(new StructTag(new HexString("0x1"), "Stake", "ValidatorSetConfiguration", []), core_resources, new ValidatorSetConfiguration({ minimum_stake: $.copy(minimum_stake), maximum_stake: $.copy(maximum_stake), min_lockup_duration_secs: $.copy(min_lockup_duration_secs), max_lockup_duration_secs: $.copy(max_lockup_duration_secs), allow_validator_set_change: allow_validator_set_change, rewards_rate: $.copy(rewards_rate), rewards_rate_denominator: $.copy(rewards_rate_denominator) }, new StructTag(new HexString("0x1"), "Stake", "ValidatorSetConfiguration", [])));
  $c.move_to(new StructTag(new HexString("0x1"), "Stake", "ValidatorPerformance", []), core_resources, new ValidatorPerformance({ num_blocks: u64("0"), missed_votes: Std.Vector.empty$($c, [AtomicTypeTag.U64] as TypeTag[]) }, new StructTag(new HexString("0x1"), "Stake", "ValidatorPerformance", [])));
  return;
}

export function is_current_validator$ (
  addr: HexString,
  $c: AptosDataCache,
): boolean {
  let temp$1, temp$2, temp$3, validator_set;
  validator_set = $c.borrow_global<ValidatorSet>(new StructTag(new HexString("0x1"), "Stake", "ValidatorSet", []), new HexString("0xa550c18"));
  temp$1 = find_validator$(validator_set.active_validators, $.copy(addr), $c);
  if (Std.Option.is_some$(temp$1, $c, [AtomicTypeTag.U64] as TypeTag[])) {
    temp$3 = true;
  }
  else{
    temp$2 = find_validator$(validator_set.pending_inactive, $.copy(addr), $c);
    temp$3 = Std.Option.is_some$(temp$2, $c, [AtomicTypeTag.U64] as TypeTag[]);
  }
  return temp$3;
}

export function is_delegated_voter$ (
  pool_address: HexString,
  voter_address: HexString,
  $c: AptosDataCache,
): boolean {
  return ($.copy($c.borrow_global<StakePool>(new StructTag(new HexString("0x1"), "Stake", "StakePool", []), $.copy(pool_address)).delegated_voter).hex() === $.copy(voter_address).hex());
}

export function is_validator_active$ (
  pool_address: HexString,
  $c: AptosDataCache,
): boolean {
  let temp$1, temp$2, temp$3, temp$4, temp$5, validator_set;
  validator_set = $c.borrow_global<ValidatorSet>(new StructTag(new HexString("0x1"), "Stake", "ValidatorSet", []), new HexString("0xa550c18"));
  temp$1 = find_validator$(validator_set.active_validators, $.copy(pool_address), $c);
  if (Std.Option.is_some$(temp$1, $c, [AtomicTypeTag.U64] as TypeTag[])) {
    temp$3 = true;
  }
  else{
    temp$2 = find_validator$(validator_set.pending_inactive, $.copy(pool_address), $c);
    temp$3 = Std.Option.is_some$(temp$2, $c, [AtomicTypeTag.U64] as TypeTag[]);
  }
  if (temp$3) {
    temp$5 = true;
  }
  else{
    temp$4 = find_validator$(validator_set.pending_active, $.copy(pool_address), $c);
    temp$5 = Std.Option.is_some$(temp$4, $c, [AtomicTypeTag.U64] as TypeTag[]);
  }
  return temp$5;
}

export function join_validator_set$ (
  account: HexString,
  pool_address: HexString,
  $c: AptosDataCache,
): void {
  let validator_set_config;
  validator_set_config = $c.borrow_global<ValidatorSetConfiguration>(new StructTag(new HexString("0x1"), "Stake", "ValidatorSetConfiguration", []), new HexString("0xa550c18"));
  if (!$.copy(validator_set_config.allow_validator_set_change)) {
    throw $.abortCode(Std.Errors.invalid_argument$(ENO_POST_GENESIS_VALIDATOR_SET_CHANGE_ALLOWED, $c));
  }
  join_validator_set_internal$(account, $.copy(pool_address), $c);
  return;
}


export function buildPayload_join_validator_set (
  account: HexString,
  pool_address: HexString,
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0x1::Stake::join_validator_set",
    typeParamStrings,
    [
      pool_address,
    ]
  );

}
export function join_validator_set_internal$ (
  account: HexString,
  pool_address: HexString,
  $c: AptosDataCache,
): void {
  let stake_pool, stake_pool_events, validator_config, validator_set, validator_set_config, voting_power;
  stake_pool = $c.borrow_global<StakePool>(new StructTag(new HexString("0x1"), "Stake", "StakePool", []), $.copy(pool_address));
  if (!(Std.Signer.address_of$(account, $c).hex() === $.copy(stake_pool.operator_address).hex())) {
    throw $.abortCode(Std.Errors.invalid_argument$(ENOT_OPERATOR, $c));
  }
  validator_set_config = $c.borrow_global<ValidatorSetConfiguration>(new StructTag(new HexString("0x1"), "Stake", "ValidatorSetConfiguration", []), new HexString("0xa550c18"));
  validate_lockup_time$($.copy(stake_pool.locked_until_secs), validator_set_config, $c);
  if (!!is_validator_active$($.copy(pool_address), $c)) {
    throw $.abortCode(Std.Errors.invalid_argument$(EALREADY_ACTIVE_VALIDATOR, $c));
  }
  voting_power = Coin.value$(stake_pool.active, $c, [new StructTag(new HexString("0x1"), "TestCoin", "TestCoin", [])] as TypeTag[]);
  if (!$.copy(voting_power).ge($.copy(validator_set_config.minimum_stake))) {
    throw $.abortCode(Std.Errors.invalid_argument$(ESTAKE_TOO_LOW, $c));
  }
  if (!$.copy(voting_power).le($.copy(validator_set_config.maximum_stake))) {
    throw $.abortCode(Std.Errors.invalid_argument$(ESTAKE_TOO_HIGH, $c));
  }
  validator_config = $c.borrow_global_mut<ValidatorConfig>(new StructTag(new HexString("0x1"), "Stake", "ValidatorConfig", []), $.copy(pool_address));
  validator_set = $c.borrow_global_mut<ValidatorSet>(new StructTag(new HexString("0x1"), "Stake", "ValidatorSet", []), new HexString("0xa550c18"));
  Std.Vector.push_back$(validator_set.pending_active, generate_validator_info$($.copy(pool_address), $.copy(validator_config), $c), $c, [new StructTag(new HexString("0x1"), "Stake", "ValidatorInfo", [])] as TypeTag[]);
  stake_pool_events = $c.borrow_global_mut<StakePoolEvents>(new StructTag(new HexString("0x1"), "Stake", "StakePoolEvents", []), $.copy(pool_address));
  Std.Event.emit_event$(stake_pool_events.join_validator_set_events, new JoinValidatorSetEvent({ pool_address: $.copy(pool_address) }, new StructTag(new HexString("0x1"), "Stake", "JoinValidatorSetEvent", [])), $c, [new StructTag(new HexString("0x1"), "Stake", "JoinValidatorSetEvent", [])] as TypeTag[]);
  return;
}

export function leave_validator_set$ (
  account: HexString,
  pool_address: HexString,
  $c: AptosDataCache,
): void {
  let index, maybe_index, stake_pool, stake_pool_events, validator_info, validator_set, validator_set_config;
  validator_set_config = $c.borrow_global_mut<ValidatorSetConfiguration>(new StructTag(new HexString("0x1"), "Stake", "ValidatorSetConfiguration", []), new HexString("0xa550c18"));
  if (!$.copy(validator_set_config.allow_validator_set_change)) {
    throw $.abortCode(Std.Errors.invalid_argument$(ENO_POST_GENESIS_VALIDATOR_SET_CHANGE_ALLOWED, $c));
  }
  stake_pool = $c.borrow_global<StakePool>(new StructTag(new HexString("0x1"), "Stake", "StakePool", []), $.copy(pool_address));
  if (!(Std.Signer.address_of$(account, $c).hex() === $.copy(stake_pool.operator_address).hex())) {
    throw $.abortCode(Std.Errors.invalid_argument$(ENOT_OPERATOR, $c));
  }
  validator_set = $c.borrow_global_mut<ValidatorSet>(new StructTag(new HexString("0x1"), "Stake", "ValidatorSet", []), new HexString("0xa550c18"));
  maybe_index = find_validator$(validator_set.active_validators, $.copy(pool_address), $c);
  if (!Std.Option.is_some$(maybe_index, $c, [AtomicTypeTag.U64] as TypeTag[])) {
    throw $.abortCode(Std.Errors.invalid_argument$(ENOT_VALIDATOR, $c));
  }
  index = Std.Option.extract$(maybe_index, $c, [AtomicTypeTag.U64] as TypeTag[]);
  validator_info = Std.Vector.swap_remove$(validator_set.active_validators, $.copy(index), $c, [new StructTag(new HexString("0x1"), "Stake", "ValidatorInfo", [])] as TypeTag[]);
  if (!Std.Vector.length$(validator_set.active_validators, $c, [new StructTag(new HexString("0x1"), "Stake", "ValidatorInfo", [])] as TypeTag[]).gt(u64("0"))) {
    throw $.abortCode(Std.Errors.invalid_argument$(ELAST_VALIDATOR, $c));
  }
  Std.Vector.push_back$(validator_set.pending_inactive, $.copy(validator_info), $c, [new StructTag(new HexString("0x1"), "Stake", "ValidatorInfo", [])] as TypeTag[]);
  stake_pool_events = $c.borrow_global_mut<StakePoolEvents>(new StructTag(new HexString("0x1"), "Stake", "StakePoolEvents", []), $.copy(pool_address));
  Std.Event.emit_event$(stake_pool_events.leave_validator_set_events, new LeaveValidatorSetEvent({ pool_address: $.copy(pool_address) }, new StructTag(new HexString("0x1"), "Stake", "LeaveValidatorSetEvent", [])), $c, [new StructTag(new HexString("0x1"), "Stake", "LeaveValidatorSetEvent", [])] as TypeTag[]);
  return;
}


export function buildPayload_leave_validator_set (
  account: HexString,
  pool_address: HexString,
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0x1::Stake::leave_validator_set",
    typeParamStrings,
    [
      pool_address,
    ]
  );

}
export function on_new_epoch$ (
  $c: AptosDataCache,
): void {
  let temp$1, temp$12, temp$2, temp$3, temp$7, temp$8, temp$9, active_validators, addr, addr__6, i, i__10, i__13, i__4, len, len__11, len__14, len__5, new_validator_info, old_validator_info, pool_address, pool_address__15, validator_config, validator_config__16, validator_info, validator_perf, validator_set, validator_set_config;
  validator_set = $c.borrow_global_mut<ValidatorSet>(new StructTag(new HexString("0x1"), "Stake", "ValidatorSet", []), new HexString("0xa550c18"));
  validator_set_config = $c.borrow_global_mut<ValidatorSetConfiguration>(new StructTag(new HexString("0x1"), "Stake", "ValidatorSetConfiguration", []), new HexString("0xa550c18"));
  validator_perf = $c.borrow_global_mut<ValidatorPerformance>(new StructTag(new HexString("0x1"), "Stake", "ValidatorPerformance", []), new HexString("0xa550c18"));
  i = u64("0");
  len = Std.Vector.length$(validator_set.active_validators, $c, [new StructTag(new HexString("0x1"), "Stake", "ValidatorInfo", [])] as TypeTag[]);
  while ($.copy(i).lt($.copy(len))) {
    {
      addr = $.copy(Std.Vector.borrow$(validator_set.active_validators, $.copy(i), $c, [new StructTag(new HexString("0x1"), "Stake", "ValidatorInfo", [])] as TypeTag[]).addr);
      [temp$1, temp$2, temp$3] = [validator_perf, $.copy(addr), validator_set_config];
      update_stake_pool$(temp$1, temp$2, temp$3, $c);
      i = $.copy(i).add(u64("1"));
    }

  }i__4 = u64("0");
  len__5 = Std.Vector.length$(validator_set.pending_inactive, $c, [new StructTag(new HexString("0x1"), "Stake", "ValidatorInfo", [])] as TypeTag[]);
  while ($.copy(i__4).lt($.copy(len__5))) {
    {
      addr__6 = $.copy(Std.Vector.borrow$(validator_set.pending_inactive, $.copy(i__4), $c, [new StructTag(new HexString("0x1"), "Stake", "ValidatorInfo", [])] as TypeTag[]).addr);
      [temp$7, temp$8, temp$9] = [validator_perf, $.copy(addr__6), validator_set_config];
      update_stake_pool$(temp$7, temp$8, temp$9, $c);
      i__4 = $.copy(i__4).add(u64("1"));
    }

  }append$(validator_set.active_validators, validator_set.pending_active, $c, [new StructTag(new HexString("0x1"), "Stake", "ValidatorInfo", [])] as TypeTag[]);
  validator_set.pending_inactive = Std.Vector.empty$($c, [new StructTag(new HexString("0x1"), "Stake", "ValidatorInfo", [])] as TypeTag[]);
  i__10 = u64("0");
  len__11 = Std.Vector.length$(validator_set.active_validators, $c, [new StructTag(new HexString("0x1"), "Stake", "ValidatorInfo", [])] as TypeTag[]);
  active_validators = Std.Vector.empty$($c, [new StructTag(new HexString("0x1"), "Stake", "ValidatorInfo", [])] as TypeTag[]);
  validator_perf.num_blocks = u64("1");
  validator_perf.missed_votes = Std.Vector.empty$($c, [AtomicTypeTag.U64] as TypeTag[]);
  while ($.copy(i__10).lt($.copy(len__11))) {
    {
      old_validator_info = Std.Vector.borrow_mut$(validator_set.active_validators, $.copy(i__10), $c, [new StructTag(new HexString("0x1"), "Stake", "ValidatorInfo", [])] as TypeTag[]);
      pool_address = $.copy(old_validator_info.addr);
      validator_config = $c.borrow_global_mut<ValidatorConfig>(new StructTag(new HexString("0x1"), "Stake", "ValidatorConfig", []), $.copy(pool_address));
      new_validator_info = generate_validator_info$($.copy(pool_address), $.copy(validator_config), $c);
      if ($.copy(new_validator_info.voting_power).ge($.copy(validator_set_config.minimum_stake))) {
        temp$12 = $.copy(new_validator_info.voting_power).le($.copy(validator_set_config.maximum_stake));
      }
      else{
        temp$12 = false;
      }
      if (temp$12) {
        Std.Vector.push_back$(active_validators, $.copy(new_validator_info), $c, [new StructTag(new HexString("0x1"), "Stake", "ValidatorInfo", [])] as TypeTag[]);
        Std.Vector.push_back$(validator_perf.missed_votes, u64("0"), $c, [AtomicTypeTag.U64] as TypeTag[]);
      }
      else{
      }
      i__10 = $.copy(i__10).add(u64("1"));
    }

  }sort_validators$(active_validators, $c);
  i__13 = u64("0");
  len__14 = Std.Vector.length$(active_validators, $c, [new StructTag(new HexString("0x1"), "Stake", "ValidatorInfo", [])] as TypeTag[]);
  while ($.copy(i__13).lt($.copy(len__14))) {
    {
      validator_info = Std.Vector.borrow_mut$(active_validators, $.copy(i__13), $c, [new StructTag(new HexString("0x1"), "Stake", "ValidatorInfo", [])] as TypeTag[]);
      pool_address__15 = $.copy(validator_info.addr);
      validator_config__16 = $c.borrow_global_mut<ValidatorConfig>(new StructTag(new HexString("0x1"), "Stake", "ValidatorConfig", []), $.copy(pool_address__15));
      validator_config__16.validator_index = $.copy(i__13);
      validator_info.config.validator_index = $.copy(i__13);
      i__13 = $.copy(i__13).add(u64("1"));
    }

  }validator_set.active_validators = $.copy(active_validators);
  return;
}

// test func
export function register_mint_stake$ (
  account: HexString,
  mint_cap: Coin.MintCapability,
  $c: AptosDataCache,
): void {
  let address;
  Coin.register$(account, $c, [new StructTag(new HexString("0x1"), "TestCoin", "TestCoin", [])] as TypeTag[]);
  address = Std.Signer.address_of$(account, $c);
  Coin.deposit$($.copy(address), Coin.mint$(u64("1000"), mint_cap, $c, [new StructTag(new HexString("0x1"), "TestCoin", "TestCoin", [])] as TypeTag[]), $c, [new StructTag(new HexString("0x1"), "TestCoin", "TestCoin", [])] as TypeTag[]);
  register_validator_candidate$(account, CONSENSUS_KEY_1, CONSENSUS_POP_1, Std.Vector.empty$($c, [AtomicTypeTag.U8] as TypeTag[]), Std.Vector.empty$($c, [AtomicTypeTag.U8] as TypeTag[]), $c);
  add_stake$(account, u64("100"), $c);
  increase_lockup$(account, Timestamp.now_seconds$($c).add(MAXIMUM_LOCK_UP_SECS), $c);
  assert_validator_state$(Std.Signer.address_of$(account, $c), u64("100"), u64("0"), u64("0"), u64("0"), u64("0"), $c);
  return;
}

export function register_validator_candidate$ (
  account: HexString,
  consensus_pubkey: U8[],
  proof_of_possession: U8[],
  network_addresses: U8[],
  fullnode_addresses: U8[],
  $c: AptosDataCache,
): void {
  let temp$1, temp$2, temp$3, temp$4, temp$5, temp$6, temp$7, temp$8, account_address;
  account_address = Std.Signer.address_of$(account, $c);
  if (!!$c.exists(new StructTag(new HexString("0x1"), "Stake", "StakePool", []), $.copy(account_address))) {
    throw $.abortCode(Std.Errors.invalid_argument$(EALREADY_REGISTERED, $c));
  }
  if (!Signature.bls12381_validate_pubkey$($.copy(consensus_pubkey), $.copy(proof_of_possession), $c)) {
    throw $.abortCode(Std.Errors.invalid_argument$(EINVALID_PUBLIC_KEY, $c));
  }
  temp$8 = account;
  temp$1 = Coin.zero$($c, [new StructTag(new HexString("0x1"), "TestCoin", "TestCoin", [])] as TypeTag[]);
  temp$2 = Coin.zero$($c, [new StructTag(new HexString("0x1"), "TestCoin", "TestCoin", [])] as TypeTag[]);
  temp$3 = Coin.zero$($c, [new StructTag(new HexString("0x1"), "TestCoin", "TestCoin", [])] as TypeTag[]);
  temp$4 = Coin.zero$($c, [new StructTag(new HexString("0x1"), "TestCoin", "TestCoin", [])] as TypeTag[]);
  temp$5 = u64("0");
  temp$6 = $.copy(account_address);
  temp$7 = $.copy(account_address);
  $c.move_to(new StructTag(new HexString("0x1"), "Stake", "StakePool", []), temp$8, new StakePool({ active: temp$1, inactive: temp$4, pending_active: temp$2, pending_inactive: temp$3, locked_until_secs: temp$5, operator_address: temp$6, delegated_voter: temp$7 }, new StructTag(new HexString("0x1"), "Stake", "StakePool", [])));
  $c.move_to(new StructTag(new HexString("0x1"), "Stake", "StakePoolEvents", []), account, new StakePoolEvents({ register_validator_candidate_events: Std.Event.new_event_handle$(account, $c, [new StructTag(new HexString("0x1"), "Stake", "RegisterValidatorCandidateEvent", [])] as TypeTag[]), set_operator_events: Std.Event.new_event_handle$(account, $c, [new StructTag(new HexString("0x1"), "Stake", "SetOperatorEvent", [])] as TypeTag[]), add_stake_events: Std.Event.new_event_handle$(account, $c, [new StructTag(new HexString("0x1"), "Stake", "AddStakeEvent", [])] as TypeTag[]), rotate_consensus_key_events: Std.Event.new_event_handle$(account, $c, [new StructTag(new HexString("0x1"), "Stake", "RotateConsensusKeyEvent", [])] as TypeTag[]), increase_lockup_events: Std.Event.new_event_handle$(account, $c, [new StructTag(new HexString("0x1"), "Stake", "IncreaseLockupEvent", [])] as TypeTag[]), join_validator_set_events: Std.Event.new_event_handle$(account, $c, [new StructTag(new HexString("0x1"), "Stake", "JoinValidatorSetEvent", [])] as TypeTag[]), distribute_rewards_events: Std.Event.new_event_handle$(account, $c, [new StructTag(new HexString("0x1"), "Stake", "DistributeRewardsEvent", [])] as TypeTag[]), unlock_stake_events: Std.Event.new_event_handle$(account, $c, [new StructTag(new HexString("0x1"), "Stake", "UnlockStakeEvent", [])] as TypeTag[]), withdraw_stake_events: Std.Event.new_event_handle$(account, $c, [new StructTag(new HexString("0x1"), "Stake", "WithdrawStakeEvent", [])] as TypeTag[]), leave_validator_set_events: Std.Event.new_event_handle$(account, $c, [new StructTag(new HexString("0x1"), "Stake", "LeaveValidatorSetEvent", [])] as TypeTag[]) }, new StructTag(new HexString("0x1"), "Stake", "StakePoolEvents", [])));
  $c.move_to(new StructTag(new HexString("0x1"), "Stake", "ValidatorConfig", []), account, new ValidatorConfig({ consensus_pubkey: $.copy(consensus_pubkey), network_addresses: $.copy(network_addresses), fullnode_addresses: $.copy(fullnode_addresses), validator_index: u64("0") }, new StructTag(new HexString("0x1"), "Stake", "ValidatorConfig", [])));
  $c.move_to(new StructTag(new HexString("0x1"), "Stake", "OwnerCapability", []), account, new OwnerCapability({ pool_address: $.copy(account_address) }, new StructTag(new HexString("0x1"), "Stake", "OwnerCapability", [])));
  return;
}


export function buildPayload_register_validator_candidate (
  account: HexString,
  consensus_pubkey: U8[],
  proof_of_possession: U8[],
  network_addresses: U8[],
  fullnode_addresses: U8[],
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0x1::Stake::register_validator_candidate",
    typeParamStrings,
    [
      consensus_pubkey.map(u => u.toPayloadArg()),
      proof_of_possession.map(u => u.toPayloadArg()),
      network_addresses.map(u => u.toPayloadArg()),
      fullnode_addresses.map(u => u.toPayloadArg()),
    ]
  );

}
export function rotate_consensus_key$ (
  account: HexString,
  pool_address: HexString,
  new_consensus_pubkey: U8[],
  proof_of_possession: U8[],
  $c: AptosDataCache,
): void {
  let old_consensus_pubkey, stake_pool, stake_pool_events, validator_info;
  stake_pool = $c.borrow_global<StakePool>(new StructTag(new HexString("0x1"), "Stake", "StakePool", []), $.copy(pool_address));
  if (!(Std.Signer.address_of$(account, $c).hex() === $.copy(stake_pool.operator_address).hex())) {
    throw $.abortCode(Std.Errors.invalid_argument$(ENOT_OPERATOR, $c));
  }
  if (!$c.exists(new StructTag(new HexString("0x1"), "Stake", "ValidatorConfig", []), $.copy(pool_address))) {
    throw $.abortCode(Std.Errors.not_published$(EVALIDATOR_CONFIG, $c));
  }
  validator_info = $c.borrow_global_mut<ValidatorConfig>(new StructTag(new HexString("0x1"), "Stake", "ValidatorConfig", []), $.copy(pool_address));
  old_consensus_pubkey = $.copy(validator_info.consensus_pubkey);
  if (!Signature.bls12381_validate_pubkey$($.copy(new_consensus_pubkey), $.copy(proof_of_possession), $c)) {
    throw $.abortCode(Std.Errors.invalid_argument$(EINVALID_PUBLIC_KEY, $c));
  }
  validator_info.consensus_pubkey = $.copy(new_consensus_pubkey);
  stake_pool_events = $c.borrow_global_mut<StakePoolEvents>(new StructTag(new HexString("0x1"), "Stake", "StakePoolEvents", []), $.copy(pool_address));
  Std.Event.emit_event$(stake_pool_events.rotate_consensus_key_events, new RotateConsensusKeyEvent({ pool_address: $.copy(pool_address), old_consensus_pubkey: $.copy(old_consensus_pubkey), new_consensus_pubkey: $.copy(new_consensus_pubkey) }, new StructTag(new HexString("0x1"), "Stake", "RotateConsensusKeyEvent", [])), $c, [new StructTag(new HexString("0x1"), "Stake", "RotateConsensusKeyEvent", [])] as TypeTag[]);
  return;
}


export function buildPayload_rotate_consensus_key (
  account: HexString,
  pool_address: HexString,
  new_consensus_pubkey: U8[],
  proof_of_possession: U8[],
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0x1::Stake::rotate_consensus_key",
    typeParamStrings,
    [
      pool_address,
      new_consensus_pubkey.map(u => u.toPayloadArg()),
      proof_of_possession.map(u => u.toPayloadArg()),
    ]
  );

}
export function set_delegated_voter$ (
  account: HexString,
  new_delegated_voter: HexString,
  $c: AptosDataCache,
): void {
  let account_addr, ownership_cap;
  account_addr = Std.Signer.address_of$(account, $c);
  ownership_cap = $c.borrow_global<OwnerCapability>(new StructTag(new HexString("0x1"), "Stake", "OwnerCapability", []), $.copy(account_addr));
  set_delegated_voter_with_cap$($.copy(account_addr), ownership_cap, $.copy(new_delegated_voter), $c);
  return;
}


export function buildPayload_set_delegated_voter (
  account: HexString,
  new_delegated_voter: HexString,
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0x1::Stake::set_delegated_voter",
    typeParamStrings,
    [
      new_delegated_voter,
    ]
  );

}
export function set_delegated_voter_with_cap$ (
  pool_address: HexString,
  owner_cap: OwnerCapability,
  new_delegated_voter: HexString,
  $c: AptosDataCache,
): void {
  let stake_pool;
  if (!($.copy(owner_cap.pool_address).hex() === $.copy(pool_address).hex())) {
    throw $.abortCode(Std.Errors.invalid_argument$(ENOT_OWNER, $c));
  }
  stake_pool = $c.borrow_global_mut<StakePool>(new StructTag(new HexString("0x1"), "Stake", "StakePool", []), $.copy(pool_address));
  stake_pool.delegated_voter = $.copy(new_delegated_voter);
  return;
}

export function set_operator$ (
  account: HexString,
  new_operator: HexString,
  $c: AptosDataCache,
): void {
  let account_addr, ownership_cap;
  account_addr = Std.Signer.address_of$(account, $c);
  ownership_cap = $c.borrow_global<OwnerCapability>(new StructTag(new HexString("0x1"), "Stake", "OwnerCapability", []), $.copy(account_addr));
  set_operator_with_cap$($.copy(account_addr), ownership_cap, $.copy(new_operator), $c);
  return;
}


export function buildPayload_set_operator (
  account: HexString,
  new_operator: HexString,
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0x1::Stake::set_operator",
    typeParamStrings,
    [
      new_operator,
    ]
  );

}
export function set_operator_with_cap$ (
  pool_address: HexString,
  owner_cap: OwnerCapability,
  new_operator: HexString,
  $c: AptosDataCache,
): void {
  let old_operator, stake_pool, stake_pool_events;
  if (!($.copy(owner_cap.pool_address).hex() === $.copy(pool_address).hex())) {
    throw $.abortCode(Std.Errors.invalid_argument$(ENOT_OWNER, $c));
  }
  stake_pool = $c.borrow_global_mut<StakePool>(new StructTag(new HexString("0x1"), "Stake", "StakePool", []), $.copy(pool_address));
  old_operator = $.copy(stake_pool.operator_address);
  stake_pool.operator_address = $.copy(new_operator);
  stake_pool_events = $c.borrow_global_mut<StakePoolEvents>(new StructTag(new HexString("0x1"), "Stake", "StakePoolEvents", []), $.copy(pool_address));
  Std.Event.emit_event$(stake_pool_events.set_operator_events, new SetOperatorEvent({ pool_address: $.copy(pool_address), old_operator: $.copy(old_operator), new_operator: $.copy(new_operator) }, new StructTag(new HexString("0x1"), "Stake", "SetOperatorEvent", [])), $c, [new StructTag(new HexString("0x1"), "Stake", "SetOperatorEvent", [])] as TypeTag[]);
  return;
}

export function sort_validators$ (
  validators: ValidatorInfo[],
  $c: AptosDataCache,
): void {
  let temp$1, temp$2, temp$3, temp$4, temp$5, idx, left, length, ordered, right;
  length = Std.Vector.length$(validators, $c, [new StructTag(new HexString("0x1"), "Stake", "ValidatorInfo", [])] as TypeTag[]);
  if ($.copy(length).eq(u64("0"))) {
    return;
  }
  else{
  }
  ordered = false;
  while (!ordered) {
    {
      ordered = true;
      idx = u64("0");
      while ($.copy(idx).lt($.copy(length).sub(u64("1")))) {
        {
          [temp$1, temp$2] = [validators, $.copy(idx)];
          left = Std.Vector.borrow$(temp$1, temp$2, $c, [new StructTag(new HexString("0x1"), "Stake", "ValidatorInfo", [])] as TypeTag[]);
          [temp$3, temp$4] = [validators, $.copy(idx).add(u64("1"))];
          right = Std.Vector.borrow$(temp$3, temp$4, $c, [new StructTag(new HexString("0x1"), "Stake", "ValidatorInfo", [])] as TypeTag[]);
          temp$5 = Comparator.compare$(left, right, $c, [new StructTag(new HexString("0x1"), "Stake", "ValidatorInfo", [])] as TypeTag[]);
          if (Comparator.is_greater_than$(temp$5, $c)) {
            ordered = false;
            Std.Vector.swap$(validators, $.copy(idx), $.copy(idx).add(u64("1")), $c, [new StructTag(new HexString("0x1"), "Stake", "ValidatorInfo", [])] as TypeTag[]);
          }
          else{
          }
          idx = $.copy(idx).add(u64("1"));
        }

      }}

  }return;
}

export function store_test_coin_mint_cap$ (
  core_resources: HexString,
  mint_cap: Coin.MintCapability,
  $c: AptosDataCache,
): void {
  SystemAddresses.assert_core_resource$(core_resources, $c);
  return $c.move_to(new StructTag(new HexString("0x1"), "Stake", "TestCoinCapabilities", []), core_resources, new TestCoinCapabilities({ mint_cap: $.copy(mint_cap) }, new StructTag(new HexString("0x1"), "Stake", "TestCoinCapabilities", [])));
}

// test func
export function test_basic_staking$ (
  core_framework: HexString,
  core_resources: HexString,
  validator: HexString,
  $c: AptosDataCache,
): void {
  let burn_cap, mint_cap, validator_address;
  Timestamp.set_time_has_started_for_testing$(core_resources, $c);
  initialize_validator_set$(core_resources, u64("100"), u64("10000"), u64("0"), MAXIMUM_LOCK_UP_SECS, true, u64("1"), u64("100"), $c);
  validator_address = Std.Signer.address_of$(validator, $c);
  [mint_cap, burn_cap] = TestCoin.initialize$(core_framework, core_resources, $c);
  register_mint_stake$(validator, mint_cap, $c);
  store_test_coin_mint_cap$(core_resources, $.copy(mint_cap), $c);
  Coin.destroy_burn_cap$($.copy(burn_cap), $c, [new StructTag(new HexString("0x1"), "TestCoin", "TestCoin", [])] as TypeTag[]);
  join_validator_set$(validator, $.copy(validator_address), $c);
  on_new_epoch$($c);
  if (!is_current_validator$($.copy(validator_address), $c)) {
    throw $.abortCode(u64("1"));
  }
  add_stake$(validator, u64("100"), $c);
  if (!Coin.balance$($.copy(validator_address), $c, [new StructTag(new HexString("0x1"), "TestCoin", "TestCoin", [])] as TypeTag[]).eq(u64("800"))) {
    throw $.abortCode(u64("3"));
  }
  assert_validator_state$($.copy(validator_address), u64("100"), u64("0"), u64("100"), u64("0"), u64("0"), $c);
  on_new_epoch$($c);
  assert_validator_state$($.copy(validator_address), u64("201"), u64("0"), u64("0"), u64("0"), u64("0"), $c);
  Timestamp.update_global_time_for_test$(MAXIMUM_LOCK_UP_SECS.mul(u64("1000000")), $c);
  unlock$(validator, u64("100"), $c);
  assert_validator_state$($.copy(validator_address), u64("101"), u64("0"), u64("0"), u64("100"), u64("0"), $c);
  on_new_epoch$($c);
  withdraw$(validator, $c);
  if (!Coin.balance$($.copy(validator_address), $c, [new StructTag(new HexString("0x1"), "TestCoin", "TestCoin", [])] as TypeTag[]).eq(u64("900"))) {
    throw $.abortCode(u64("4"));
  }
  assert_validator_state$($.copy(validator_address), u64("101"), u64("0"), u64("0"), u64("0"), u64("0"), $c);
  return;
}


export function buildPayload_test_basic_staking (
  core_framework: HexString,
  core_resources: HexString,
  validator: HexString,
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0x1::Stake::test_basic_staking",
    typeParamStrings,
    []
  );

}
// test func
export function test_change_validator_set_configs$ (
  core_resources: HexString,
  $c: AptosDataCache,
): void {
  let config;
  initialize_validator_set$(core_resources, u64("0"), u64("1"), u64("0"), u64("0"), false, u64("0"), u64("1"), $c);
  update_required_stake$(GovernanceProposal.create_test_proposal$($c), u64("100"), u64("1000"), $c);
  update_required_lockup$(GovernanceProposal.create_test_proposal$($c), u64("1000"), u64("10000"), $c);
  update_rewards_rate$(GovernanceProposal.create_test_proposal$($c), u64("10"), u64("100"), $c);
  config = $c.borrow_global<ValidatorSetConfiguration>(new StructTag(new HexString("0x1"), "Stake", "ValidatorSetConfiguration", []), new HexString("0xa550c18"));
  if (!$.copy(config.minimum_stake).eq(u64("100"))) {
    throw $.abortCode(u64("0"));
  }
  if (!$.copy(config.maximum_stake).eq(u64("1000"))) {
    throw $.abortCode(u64("1"));
  }
  if (!$.copy(config.min_lockup_duration_secs).eq(u64("1000"))) {
    throw $.abortCode(u64("2"));
  }
  if (!$.copy(config.max_lockup_duration_secs).eq(u64("10000"))) {
    throw $.abortCode(u64("3"));
  }
  if (!$.copy(config.rewards_rate).eq(u64("10"))) {
    throw $.abortCode(u64("4"));
  }
  if (!$.copy(config.rewards_rate_denominator).eq(u64("100"))) {
    throw $.abortCode(u64("4"));
  }
  return;
}


export function buildPayload_test_change_validator_set_configs (
  core_resources: HexString,
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0x1::Stake::test_change_validator_set_configs",
    typeParamStrings,
    []
  );

}
// test func
export function test_delegated_staking_with_owner_cap$ (
  core_framework: HexString,
  core_resources: HexString,
  validator: HexString,
  $c: AptosDataCache,
): void {
  let burn_cap, coins, mint_cap, owner_cap, pool_address, stake;
  Timestamp.set_time_has_started_for_testing$(core_resources, $c);
  initialize_validator_set$(core_resources, u64("100"), u64("10000"), u64("0"), MAXIMUM_LOCK_UP_SECS, true, u64("1"), u64("100"), $c);
  [mint_cap, burn_cap] = TestCoin.initialize$(core_framework, core_resources, $c);
  stake = Coin.mint$(u64("100"), mint_cap, $c, [new StructTag(new HexString("0x1"), "TestCoin", "TestCoin", [])] as TypeTag[]);
  store_test_coin_mint_cap$(core_resources, $.copy(mint_cap), $c);
  pool_address = Std.Signer.address_of$(validator, $c);
  register_validator_candidate$(validator, CONSENSUS_KEY_1, CONSENSUS_POP_1, Std.Vector.empty$($c, [AtomicTypeTag.U8] as TypeTag[]), Std.Vector.empty$($c, [AtomicTypeTag.U8] as TypeTag[]), $c);
  owner_cap = extract_owner_cap$(validator, $c);
  add_stake_with_cap$($.copy(pool_address), owner_cap, stake, $c);
  increase_lockup_with_cap$($.copy(pool_address), owner_cap, MAXIMUM_LOCK_UP_SECS, $c);
  assert_validator_state$($.copy(pool_address), u64("100"), u64("0"), u64("0"), u64("0"), u64("0"), $c);
  join_validator_set$(validator, $.copy(pool_address), $c);
  on_new_epoch$($c);
  if (!is_current_validator$($.copy(pool_address), $c)) {
    throw $.abortCode(u64("0"));
  }
  Timestamp.update_global_time_for_test$(MAXIMUM_LOCK_UP_SECS.mul(u64("1000000")), $c);
  unlock_with_cap$($.copy(pool_address), u64("100"), owner_cap, $c);
  assert_validator_state$($.copy(pool_address), u64("0"), u64("0"), u64("0"), u64("100"), u64("0"), $c);
  on_new_epoch$($c);
  coins = withdraw_with_cap$($.copy(pool_address), owner_cap, $c);
  if (!Coin.value$(coins, $c, [new StructTag(new HexString("0x1"), "TestCoin", "TestCoin", [])] as TypeTag[]).eq(u64("100"))) {
    throw $.abortCode(u64("1"));
  }
  assert_validator_state$($.copy(pool_address), u64("0"), u64("0"), u64("0"), u64("0"), u64("0"), $c);
  rotate_consensus_key$(validator, $.copy(pool_address), CONSENSUS_KEY_2, CONSENSUS_POP_2, $c);
  owner_cap;
  Coin.burn$(coins, burn_cap, $c, [new StructTag(new HexString("0x1"), "TestCoin", "TestCoin", [])] as TypeTag[]);
  Coin.destroy_burn_cap$($.copy(burn_cap), $c, [new StructTag(new HexString("0x1"), "TestCoin", "TestCoin", [])] as TypeTag[]);
  return;
}


export function buildPayload_test_delegated_staking_with_owner_cap (
  core_framework: HexString,
  core_resources: HexString,
  validator: HexString,
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0x1::Stake::test_delegated_staking_with_owner_cap",
    typeParamStrings,
    []
  );

}
// test func
export function test_validator_cannot_join_leave_post_genesis$ (
  core_framework: HexString,
  core_resources: HexString,
  validator: HexString,
  $c: AptosDataCache,
): void {
  let burn_cap, mint_cap;
  initialize_validator_set$(core_resources, u64("100"), u64("10000"), u64("0"), MAXIMUM_LOCK_UP_SECS, false, u64("1"), u64("100"), $c);
  [mint_cap, burn_cap] = TestCoin.initialize$(core_framework, core_resources, $c);
  register_mint_stake$(validator, mint_cap, $c);
  store_test_coin_mint_cap$(core_resources, $.copy(mint_cap), $c);
  Coin.destroy_burn_cap$($.copy(burn_cap), $c, [new StructTag(new HexString("0x1"), "TestCoin", "TestCoin", [])] as TypeTag[]);
  return;
}


export function buildPayload_test_validator_cannot_join_leave_post_genesis (
  core_framework: HexString,
  core_resources: HexString,
  validator: HexString,
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0x1::Stake::test_validator_cannot_join_leave_post_genesis",
    typeParamStrings,
    []
  );

}
// test func
export function test_validator_join_leave$ (
  core_framework: HexString,
  core_resources: HexString,
  validator_1: HexString,
  validator_2: HexString,
  validator_3: HexString,
  $c: AptosDataCache,
): void {
  let burn_cap, mint_cap, validator_1_address, validator_2_address, validator_3_address, validator_config_1, validator_config_2, validator_set;
  Timestamp.set_time_has_started_for_testing$(core_resources, $c);
  validator_1_address = Std.Signer.address_of$(validator_1, $c);
  validator_2_address = Std.Signer.address_of$(validator_2, $c);
  validator_3_address = Std.Signer.address_of$(validator_3, $c);
  initialize_validator_set$(core_resources, u64("100"), u64("10000"), u64("0"), MAXIMUM_LOCK_UP_SECS, true, u64("1"), u64("100"), $c);
  [mint_cap, burn_cap] = TestCoin.initialize$(core_framework, core_resources, $c);
  register_mint_stake$(validator_1, mint_cap, $c);
  register_mint_stake$(validator_2, mint_cap, $c);
  register_mint_stake$(validator_3, mint_cap, $c);
  store_test_coin_mint_cap$(core_resources, $.copy(mint_cap), $c);
  Coin.destroy_burn_cap$($.copy(burn_cap), $c, [new StructTag(new HexString("0x1"), "TestCoin", "TestCoin", [])] as TypeTag[]);
  join_validator_set$(validator_2, $.copy(validator_2_address), $c);
  join_validator_set$(validator_1, $.copy(validator_1_address), $c);
  on_new_epoch$($c);
  if (!is_current_validator$($.copy(validator_1_address), $c)) {
    throw $.abortCode(u64("0"));
  }
  if (!is_current_validator$($.copy(validator_2_address), $c)) {
    throw $.abortCode(u64("1"));
  }
  assert_validator_state$($.copy(validator_1_address), u64("100"), u64("0"), u64("0"), u64("0"), u64("0"), $c);
  assert_validator_state$($.copy(validator_2_address), u64("100"), u64("0"), u64("0"), u64("0"), u64("1"), $c);
  validator_set = $c.borrow_global<ValidatorSet>(new StructTag(new HexString("0x1"), "Stake", "ValidatorSet", []), new HexString("0xa550c18"));
  validator_config_1 = Std.Vector.borrow$(validator_set.active_validators, u64("0"), $c, [new StructTag(new HexString("0x1"), "Stake", "ValidatorInfo", [])] as TypeTag[]);
  if (!($.copy(validator_config_1.addr).hex() === $.copy(validator_1_address).hex())) {
    throw $.abortCode(u64("2"));
  }
  if (!$.copy(validator_config_1.config.validator_index).eq(u64("0"))) {
    throw $.abortCode(u64("3"));
  }
  validator_config_2 = Std.Vector.borrow$(validator_set.active_validators, u64("1"), $c, [new StructTag(new HexString("0x1"), "Stake", "ValidatorInfo", [])] as TypeTag[]);
  if (!($.copy(validator_config_2.addr).hex() === $.copy(validator_2_address).hex())) {
    throw $.abortCode(u64("4"));
  }
  if (!$.copy(validator_config_2.config.validator_index).eq(u64("1"))) {
    throw $.abortCode(u64("5"));
  }
  rotate_consensus_key$(validator_1, $.copy(validator_1_address), CONSENSUS_KEY_2, CONSENSUS_POP_2, $c);
  leave_validator_set$(validator_2, $.copy(validator_2_address), $c);
  join_validator_set$(validator_3, $.copy(validator_3_address), $c);
  if (!is_current_validator$($.copy(validator_2_address), $c)) {
    throw $.abortCode(u64("2"));
  }
  if (!($.copy(Std.Vector.borrow$($c.borrow_global<ValidatorSet>(new StructTag(new HexString("0x1"), "Stake", "ValidatorSet", []), new HexString("0xa550c18")).pending_inactive, u64("0"), $c, [new StructTag(new HexString("0x1"), "Stake", "ValidatorInfo", [])] as TypeTag[]).addr).hex() === $.copy(validator_2_address).hex())) {
    throw $.abortCode(u64("0"));
  }
  if (!!is_current_validator$($.copy(validator_3_address), $c)) {
    throw $.abortCode(u64("3"));
  }
  if (!($.copy(Std.Vector.borrow$($c.borrow_global<ValidatorSet>(new StructTag(new HexString("0x1"), "Stake", "ValidatorSet", []), new HexString("0xa550c18")).pending_active, u64("0"), $c, [new StructTag(new HexString("0x1"), "Stake", "ValidatorInfo", [])] as TypeTag[]).addr).hex() === $.copy(validator_3_address).hex())) {
    throw $.abortCode(u64("0"));
  }
  if (!$.veq($.copy(Std.Vector.borrow$($c.borrow_global<ValidatorSet>(new StructTag(new HexString("0x1"), "Stake", "ValidatorSet", []), new HexString("0xa550c18")).active_validators, u64("0"), $c, [new StructTag(new HexString("0x1"), "Stake", "ValidatorInfo", [])] as TypeTag[]).config.consensus_pubkey), CONSENSUS_KEY_1)) {
    throw $.abortCode(u64("0"));
  }
  on_new_epoch$($c);
  if (!is_current_validator$($.copy(validator_1_address), $c)) {
    throw $.abortCode(u64("5"));
  }
  assert_validator_state$($.copy(validator_1_address), u64("101"), u64("0"), u64("0"), u64("0"), u64("0"), $c);
  if (!!is_current_validator$($.copy(validator_2_address), $c)) {
    throw $.abortCode(u64("4"));
  }
  assert_validator_state$($.copy(validator_2_address), u64("101"), u64("0"), u64("0"), u64("0"), u64("1"), $c);
  if (!is_current_validator$($.copy(validator_3_address), $c)) {
    throw $.abortCode(u64("5"));
  }
  assert_validator_state$($.copy(validator_3_address), u64("100"), u64("0"), u64("0"), u64("0"), u64("1"), $c);
  if (!$.veq($.copy(Std.Vector.borrow$($c.borrow_global<ValidatorSet>(new StructTag(new HexString("0x1"), "Stake", "ValidatorSet", []), new HexString("0xa550c18")).active_validators, u64("0"), $c, [new StructTag(new HexString("0x1"), "Stake", "ValidatorInfo", [])] as TypeTag[]).config.consensus_pubkey), CONSENSUS_KEY_2)) {
    throw $.abortCode(u64("0"));
  }
  Timestamp.update_global_time_for_test$(MAXIMUM_LOCK_UP_SECS.mul(u64("1000000")), $c);
  unlock$(validator_1, u64("50"), $c);
  on_new_epoch$($c);
  if (!!is_current_validator$($.copy(validator_1_address), $c)) {
    throw $.abortCode(u64("6"));
  }
  return;
}


export function buildPayload_test_validator_join_leave (
  core_framework: HexString,
  core_resources: HexString,
  validator_1: HexString,
  validator_2: HexString,
  validator_3: HexString,
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0x1::Stake::test_validator_join_leave",
    typeParamStrings,
    []
  );

}
// test func
export function test_validator_order$ (
  core_framework: HexString,
  core_resources: HexString,
  validator_1: HexString,
  validator_2: HexString,
  validator_3: HexString,
  validator_4: HexString,
  validator_5: HexString,
  $c: AptosDataCache,
): void {
  let burn_cap, mint_cap, v1_addr, v2_addr, v3_addr, v4_addr, v5_addr;
  v1_addr = Std.Signer.address_of$(validator_1, $c);
  v2_addr = Std.Signer.address_of$(validator_2, $c);
  v3_addr = Std.Signer.address_of$(validator_3, $c);
  v4_addr = Std.Signer.address_of$(validator_4, $c);
  v5_addr = Std.Signer.address_of$(validator_5, $c);
  Timestamp.set_time_has_started_for_testing$(core_resources, $c);
  initialize_validator_set$(core_resources, u64("100"), u64("10000"), u64("0"), MAXIMUM_LOCK_UP_SECS, true, u64("1"), u64("100"), $c);
  [mint_cap, burn_cap] = TestCoin.initialize$(core_framework, core_resources, $c);
  register_mint_stake$(validator_1, mint_cap, $c);
  register_mint_stake$(validator_2, mint_cap, $c);
  register_mint_stake$(validator_3, mint_cap, $c);
  register_mint_stake$(validator_4, mint_cap, $c);
  register_mint_stake$(validator_5, mint_cap, $c);
  store_test_coin_mint_cap$(core_resources, $.copy(mint_cap), $c);
  Coin.destroy_burn_cap$($.copy(burn_cap), $c, [new StructTag(new HexString("0x1"), "TestCoin", "TestCoin", [])] as TypeTag[]);
  join_validator_set$(validator_3, $.copy(v3_addr), $c);
  on_new_epoch$($c);
  if (!validator_index$($.copy(v3_addr), $c).eq(u64("0"))) {
    throw $.abortCode(u64("0"));
  }
  join_validator_set$(validator_4, $.copy(v4_addr), $c);
  on_new_epoch$($c);
  if (!validator_index$($.copy(v3_addr), $c).eq(u64("0"))) {
    throw $.abortCode(u64("1"));
  }
  if (!validator_index$($.copy(v4_addr), $c).eq(u64("1"))) {
    throw $.abortCode(u64("2"));
  }
  join_validator_set$(validator_1, $.copy(v1_addr), $c);
  on_new_epoch$($c);
  if (!validator_index$($.copy(v1_addr), $c).eq(u64("0"))) {
    throw $.abortCode(u64("3"));
  }
  if (!validator_index$($.copy(v3_addr), $c).eq(u64("1"))) {
    throw $.abortCode(u64("4"));
  }
  if (!validator_index$($.copy(v4_addr), $c).eq(u64("2"))) {
    throw $.abortCode(u64("5"));
  }
  join_validator_set$(validator_2, $.copy(v2_addr), $c);
  on_new_epoch$($c);
  if (!validator_index$($.copy(v1_addr), $c).eq(u64("0"))) {
    throw $.abortCode(u64("6"));
  }
  if (!validator_index$($.copy(v2_addr), $c).eq(u64("1"))) {
    throw $.abortCode(u64("7"));
  }
  if (!validator_index$($.copy(v3_addr), $c).eq(u64("2"))) {
    throw $.abortCode(u64("8"));
  }
  if (!validator_index$($.copy(v4_addr), $c).eq(u64("3"))) {
    throw $.abortCode(u64("9"));
  }
  join_validator_set$(validator_5, $.copy(v5_addr), $c);
  on_new_epoch$($c);
  if (!validator_index$($.copy(v1_addr), $c).eq(u64("0"))) {
    throw $.abortCode(u64("10"));
  }
  if (!validator_index$($.copy(v2_addr), $c).eq(u64("1"))) {
    throw $.abortCode(u64("11"));
  }
  if (!validator_index$($.copy(v3_addr), $c).eq(u64("2"))) {
    throw $.abortCode(u64("12"));
  }
  if (!validator_index$($.copy(v4_addr), $c).eq(u64("3"))) {
    throw $.abortCode(u64("13"));
  }
  if (!validator_index$($.copy(v5_addr), $c).eq(u64("4"))) {
    throw $.abortCode(u64("14"));
  }
  return;
}


export function buildPayload_test_validator_order (
  core_framework: HexString,
  core_resources: HexString,
  validator_1: HexString,
  validator_2: HexString,
  validator_3: HexString,
  validator_4: HexString,
  validator_5: HexString,
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0x1::Stake::test_validator_order",
    typeParamStrings,
    []
  );

}
export function unit_test_poison$ (
  $c: AptosDataCache,
): void {
  Std.UnitTest.create_signers_for_testing$(u64("0"), $c);
  return;
}

export function unlock$ (
  account: HexString,
  amount: U64,
  $c: AptosDataCache,
): void {
  let account_addr, ownership_cap;
  account_addr = Std.Signer.address_of$(account, $c);
  ownership_cap = $c.borrow_global<OwnerCapability>(new StructTag(new HexString("0x1"), "Stake", "OwnerCapability", []), $.copy(account_addr));
  unlock_with_cap$($.copy(account_addr), $.copy(amount), ownership_cap, $c);
  return;
}


export function buildPayload_unlock (
  account: HexString,
  amount: U64,
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0x1::Stake::unlock",
    typeParamStrings,
    [
      amount.toPayloadArg(),
    ]
  );

}
export function unlock_with_cap$ (
  pool_address: HexString,
  amount: U64,
  owner_cap: OwnerCapability,
  $c: AptosDataCache,
): void {
  let stake_pool, stake_pool_events, unlocked_stake;
  if (!($.copy(owner_cap.pool_address).hex() === $.copy(pool_address).hex())) {
    throw $.abortCode(Std.Errors.invalid_argument$(ENOT_OWNER, $c));
  }
  stake_pool = $c.borrow_global_mut<StakePool>(new StructTag(new HexString("0x1"), "Stake", "StakePool", []), $.copy(pool_address));
  unlocked_stake = Coin.extract$(stake_pool.active, $.copy(amount), $c, [new StructTag(new HexString("0x1"), "TestCoin", "TestCoin", [])] as TypeTag[]);
  if ($.copy(stake_pool.locked_until_secs).gt(Timestamp.now_seconds$($c))) {
    throw $.abortCode(Std.Errors.invalid_argument$(EWITHDRAW_NOT_ALLOWED, $c));
  }
  else{
  }
  if (is_current_validator$($.copy(pool_address), $c)) {
    Coin.merge$(stake_pool.pending_inactive, unlocked_stake, $c, [new StructTag(new HexString("0x1"), "TestCoin", "TestCoin", [])] as TypeTag[]);
  }
  else{
    Coin.merge$(stake_pool.inactive, unlocked_stake, $c, [new StructTag(new HexString("0x1"), "TestCoin", "TestCoin", [])] as TypeTag[]);
  }
  stake_pool_events = $c.borrow_global_mut<StakePoolEvents>(new StructTag(new HexString("0x1"), "Stake", "StakePoolEvents", []), $.copy(pool_address));
  Std.Event.emit_event$(stake_pool_events.unlock_stake_events, new UnlockStakeEvent({ pool_address: $.copy(pool_address), amount_unlocked: $.copy(amount) }, new StructTag(new HexString("0x1"), "Stake", "UnlockStakeEvent", [])), $c, [new StructTag(new HexString("0x1"), "Stake", "UnlockStakeEvent", [])] as TypeTag[]);
  return;
}

export function update_performance_statistics$ (
  missed_votes: U64[],
  $c: AptosDataCache,
): void {
  let i, len, missed_votes_count, validator_index, validator_missed_votes_counts, validator_perf;
  validator_perf = $c.borrow_global_mut<ValidatorPerformance>(new StructTag(new HexString("0x1"), "Stake", "ValidatorPerformance", []), new HexString("0xa550c18"));
  validator_missed_votes_counts = validator_perf.missed_votes;
  i = u64("0");
  len = Std.Vector.length$(missed_votes, $c, [AtomicTypeTag.U64] as TypeTag[]);
  while ($.copy(i).lt($.copy(len))) {
    {
      validator_index = $.copy(Std.Vector.borrow$(missed_votes, $.copy(i), $c, [AtomicTypeTag.U64] as TypeTag[]));
      missed_votes_count = Std.Vector.borrow_mut$(validator_missed_votes_counts, $.copy(validator_index), $c, [AtomicTypeTag.U64] as TypeTag[]);
      $.set(missed_votes_count, $.copy(missed_votes_count).add(u64("1")));
      i = $.copy(i).add(u64("1"));
    }

  }validator_perf.num_blocks = $.copy(validator_perf.num_blocks).add(u64("1"));
  return;
}

export function update_required_lockup$ (
  _gov_proposal: GovernanceProposal.GovernanceProposal,
  min_lockup_duration_secs: U64,
  max_lockup_duration_secs: U64,
  $c: AptosDataCache,
): void {
  let validator_set_config;
  validator_set_config = $c.borrow_global_mut<ValidatorSetConfiguration>(new StructTag(new HexString("0x1"), "Stake", "ValidatorSetConfiguration", []), new HexString("0xa550c18"));
  validator_set_config.min_lockup_duration_secs = $.copy(min_lockup_duration_secs);
  validator_set_config.max_lockup_duration_secs = $.copy(max_lockup_duration_secs);
  return;
}

export function update_required_stake$ (
  _gov_proposal: GovernanceProposal.GovernanceProposal,
  minimum_stake: U64,
  maximum_stake: U64,
  $c: AptosDataCache,
): void {
  let validator_set_config;
  validator_set_config = $c.borrow_global_mut<ValidatorSetConfiguration>(new StructTag(new HexString("0x1"), "Stake", "ValidatorSetConfiguration", []), new HexString("0xa550c18"));
  validator_set_config.minimum_stake = $.copy(minimum_stake);
  validator_set_config.maximum_stake = $.copy(maximum_stake);
  return;
}

export function update_rewards_rate$ (
  _gov_proposal: GovernanceProposal.GovernanceProposal,
  new_rewards_rate: U64,
  new_rewards_rate_denominator: U64,
  $c: AptosDataCache,
): void {
  let validator_set_config;
  validator_set_config = $c.borrow_global_mut<ValidatorSetConfiguration>(new StructTag(new HexString("0x1"), "Stake", "ValidatorSetConfiguration", []), new HexString("0xa550c18"));
  validator_set_config.rewards_rate = $.copy(new_rewards_rate);
  validator_set_config.rewards_rate_denominator = $.copy(new_rewards_rate_denominator);
  return;
}

export function update_stake_pool$ (
  validator_perf: ValidatorPerformance,
  pool_address: HexString,
  validator_set_config: ValidatorSetConfiguration,
  $c: AptosDataCache,
): void {
  let current_time, num_blocks, num_missed_votes, num_successful_votes, remaining_lockup_time, rewards_amount, stake_pool, stake_pool_events, validator_config;
  validator_config = $c.borrow_global<ValidatorConfig>(new StructTag(new HexString("0x1"), "Stake", "ValidatorConfig", []), $.copy(pool_address));
  num_missed_votes = $.copy(Std.Vector.borrow$(validator_perf.missed_votes, $.copy(validator_config.validator_index), $c, [AtomicTypeTag.U64] as TypeTag[]));
  num_blocks = $.copy(validator_perf.num_blocks);
  num_successful_votes = $.copy(num_blocks).sub($.copy(num_missed_votes));
  current_time = Timestamp.now_seconds$($c);
  remaining_lockup_time = u64("1");
  stake_pool = $c.borrow_global_mut<StakePool>(new StructTag(new HexString("0x1"), "Stake", "StakePool", []), $.copy(pool_address));
  if ($.copy(current_time).lt($.copy(stake_pool.locked_until_secs))) {
    remaining_lockup_time = $.copy(stake_pool.locked_until_secs).sub($.copy(current_time));
  }
  else{
  }
  rewards_amount = distribute_reward$(stake_pool.active, $.copy(num_blocks), $.copy(num_successful_votes), $.copy(remaining_lockup_time), validator_set_config, $c);
  rewards_amount = $.copy(rewards_amount).add(distribute_reward$(stake_pool.pending_inactive, $.copy(num_blocks), $.copy(num_successful_votes), $.copy(remaining_lockup_time), validator_set_config, $c));
  Coin.merge$(stake_pool.active, Coin.extract_all$(stake_pool.pending_active, $c, [new StructTag(new HexString("0x1"), "TestCoin", "TestCoin", [])] as TypeTag[]), $c, [new StructTag(new HexString("0x1"), "TestCoin", "TestCoin", [])] as TypeTag[]);
  Coin.merge$(stake_pool.inactive, Coin.extract_all$(stake_pool.pending_inactive, $c, [new StructTag(new HexString("0x1"), "TestCoin", "TestCoin", [])] as TypeTag[]), $c, [new StructTag(new HexString("0x1"), "TestCoin", "TestCoin", [])] as TypeTag[]);
  stake_pool_events = $c.borrow_global_mut<StakePoolEvents>(new StructTag(new HexString("0x1"), "Stake", "StakePoolEvents", []), $.copy(pool_address));
  Std.Event.emit_event$(stake_pool_events.distribute_rewards_events, new DistributeRewardsEvent({ pool_address: $.copy(pool_address), rewards_amount: $.copy(rewards_amount) }, new StructTag(new HexString("0x1"), "Stake", "DistributeRewardsEvent", [])), $c, [new StructTag(new HexString("0x1"), "Stake", "DistributeRewardsEvent", [])] as TypeTag[]);
  return;
}

export function validate_lockup_time$ (
  locked_until_secs: U64,
  validator_set_config: ValidatorSetConfiguration,
  $c: AptosDataCache,
): void {
  let current_time;
  current_time = Timestamp.now_seconds$($c);
  if (!$.copy(current_time).add($.copy(validator_set_config.min_lockup_duration_secs)).le($.copy(locked_until_secs))) {
    throw $.abortCode(Std.Errors.invalid_argument$(ELOCK_TIME_TOO_SHORT, $c));
  }
  if (!$.copy(locked_until_secs).le($.copy(current_time).add($.copy(validator_set_config.max_lockup_duration_secs)))) {
    throw $.abortCode(Std.Errors.invalid_argument$(ELOCK_TIME_TOO_LONG, $c));
  }
  return;
}

// test func
export function validator_index$ (
  addr: HexString,
  $c: AptosDataCache,
): U64 {
  let temp$1, validator_set;
  validator_set = $c.borrow_global<ValidatorSet>(new StructTag(new HexString("0x1"), "Stake", "ValidatorSet", []), new HexString("0xa550c18"));
  temp$1 = find_validator$(validator_set.active_validators, $.copy(addr), $c);
  return Std.Option.extract$(temp$1, $c, [AtomicTypeTag.U64] as TypeTag[]);
}

export function withdraw$ (
  account: HexString,
  $c: AptosDataCache,
): void {
  let account_addr, coins, ownership_cap;
  account_addr = Std.Signer.address_of$(account, $c);
  ownership_cap = $c.borrow_global<OwnerCapability>(new StructTag(new HexString("0x1"), "Stake", "OwnerCapability", []), $.copy(account_addr));
  coins = withdraw_with_cap$($.copy(account_addr), ownership_cap, $c);
  Coin.deposit$($.copy(account_addr), coins, $c, [new StructTag(new HexString("0x1"), "TestCoin", "TestCoin", [])] as TypeTag[]);
  return;
}


export function buildPayload_withdraw (
  account: HexString,
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0x1::Stake::withdraw",
    typeParamStrings,
    []
  );

}
export function withdraw_with_cap$ (
  pool_address: HexString,
  owner_cap: OwnerCapability,
  $c: AptosDataCache,
): Coin.Coin {
  let stake_pool, stake_pool_events, withdraw_amount;
  if (!($.copy(owner_cap.pool_address).hex() === $.copy(pool_address).hex())) {
    throw $.abortCode(Std.Errors.invalid_argument$(ENOT_OWNER, $c));
  }
  stake_pool = $c.borrow_global_mut<StakePool>(new StructTag(new HexString("0x1"), "Stake", "StakePool", []), $.copy(pool_address));
  withdraw_amount = Coin.value$(stake_pool.inactive, $c, [new StructTag(new HexString("0x1"), "TestCoin", "TestCoin", [])] as TypeTag[]);
  if (!$.copy(withdraw_amount).gt(u64("0"))) {
    throw $.abortCode(Std.Errors.invalid_argument$(ENO_COINS_TO_WITHDRAW, $c));
  }
  stake_pool_events = $c.borrow_global_mut<StakePoolEvents>(new StructTag(new HexString("0x1"), "Stake", "StakePoolEvents", []), $.copy(pool_address));
  Std.Event.emit_event$(stake_pool_events.withdraw_stake_events, new WithdrawStakeEvent({ pool_address: $.copy(pool_address), amount_withdrawn: $.copy(withdraw_amount) }, new StructTag(new HexString("0x1"), "Stake", "WithdrawStakeEvent", [])), $c, [new StructTag(new HexString("0x1"), "Stake", "WithdrawStakeEvent", [])] as TypeTag[]);
  return Coin.extract$(stake_pool.inactive, $.copy(withdraw_amount), $c, [new StructTag(new HexString("0x1"), "TestCoin", "TestCoin", [])] as TypeTag[]);
}


