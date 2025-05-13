import BN from "bn.js";
import * as types from "../types";
export interface LpPositionFields {
    rewardFactorSnapshot: BN;
    lpShares: BN;
    withdrawableLpShares: BN;
    uncollectedFees: BN;
    collectedFees: BN;
    pendingSharesToVest: types.PendingSharesToVestFields;
}
export interface LpPositionJSON {
    rewardFactorSnapshot: string;
    lpShares: string;
    withdrawableLpShares: string;
    uncollectedFees: string;
    collectedFees: string;
    pendingSharesToVest: types.PendingSharesToVestJSON;
}
export declare class LpPosition {
    readonly rewardFactorSnapshot: BN;
    readonly lpShares: BN;
    readonly withdrawableLpShares: BN;
    readonly uncollectedFees: BN;
    readonly collectedFees: BN;
    readonly pendingSharesToVest: types.PendingSharesToVest;
    constructor(fields: LpPositionFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.LpPosition;
    static toEncodable(fields: LpPositionFields): {
        rewardFactorSnapshot: BN;
        lpShares: BN;
        withdrawableLpShares: BN;
        uncollectedFees: BN;
        collectedFees: BN;
        pendingSharesToVest: {
            depositSlot: BN;
            lpSharesToVest: BN;
        };
    };
    toJSON(): LpPositionJSON;
    static fromJSON(obj: LpPositionJSON): LpPosition;
    toEncodable(): {
        rewardFactorSnapshot: BN;
        lpShares: BN;
        withdrawableLpShares: BN;
        uncollectedFees: BN;
        collectedFees: BN;
        pendingSharesToVest: {
            depositSlot: BN;
            lpSharesToVest: BN;
        };
    };
}
