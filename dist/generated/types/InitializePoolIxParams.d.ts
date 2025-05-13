import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface InitializePoolIxParamsFields {
    lpFeeInBps: BN;
    protocolLpFeeAllocationInPct: BN;
    feeRecipientsParams: Array<types.ProtocolFeeRecipientParamsFields>;
    numSlotsToVestLpShares: BN | null;
}
export interface InitializePoolIxParamsJSON {
    lpFeeInBps: string;
    protocolLpFeeAllocationInPct: string;
    feeRecipientsParams: Array<types.ProtocolFeeRecipientParamsJSON>;
    numSlotsToVestLpShares: string | null;
}
export declare class InitializePoolIxParams {
    readonly lpFeeInBps: BN;
    readonly protocolLpFeeAllocationInPct: BN;
    readonly feeRecipientsParams: Array<types.ProtocolFeeRecipientParams>;
    readonly numSlotsToVestLpShares: BN | null;
    constructor(fields: InitializePoolIxParamsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.InitializePoolIxParams;
    static toEncodable(fields: InitializePoolIxParamsFields): {
        lpFeeInBps: BN;
        protocolLpFeeAllocationInPct: BN;
        feeRecipientsParams: {
            recipient: PublicKey;
            shares: BN;
        }[];
        numSlotsToVestLpShares: BN | null;
    };
    toJSON(): InitializePoolIxParamsJSON;
    static fromJSON(obj: InitializePoolIxParamsJSON): InitializePoolIxParams;
    toEncodable(): {
        lpFeeInBps: BN;
        protocolLpFeeAllocationInPct: BN;
        feeRecipientsParams: {
            recipient: PublicKey;
            shares: BN;
        }[];
        numSlotsToVestLpShares: BN | null;
    };
}
