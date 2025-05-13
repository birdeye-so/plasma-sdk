import BN from "bn.js";
import * as types from "../types";
export interface AmmFields {
    feeInBps: number;
    protocolAllocationInPct: number;
    lpVestingWindow: BN;
    rewardFactor: BN;
    totalLpShares: BN;
    slotSnapshot: BN;
    baseReservesSnapshot: BN;
    quoteReservesSnapshot: BN;
    baseReserves: BN;
    quoteReserves: BN;
    cumulativeQuoteLpFees: BN;
    cumulativeQuoteProtocolFees: BN;
}
export interface AmmJSON {
    feeInBps: number;
    protocolAllocationInPct: number;
    lpVestingWindow: string;
    rewardFactor: string;
    totalLpShares: string;
    slotSnapshot: string;
    baseReservesSnapshot: string;
    quoteReservesSnapshot: string;
    baseReserves: string;
    quoteReserves: string;
    cumulativeQuoteLpFees: string;
    cumulativeQuoteProtocolFees: string;
}
export declare class Amm {
    readonly feeInBps: number;
    readonly protocolAllocationInPct: number;
    readonly lpVestingWindow: BN;
    readonly rewardFactor: BN;
    readonly totalLpShares: BN;
    readonly slotSnapshot: BN;
    readonly baseReservesSnapshot: BN;
    readonly quoteReservesSnapshot: BN;
    readonly baseReserves: BN;
    readonly quoteReserves: BN;
    readonly cumulativeQuoteLpFees: BN;
    readonly cumulativeQuoteProtocolFees: BN;
    constructor(fields: AmmFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.Amm;
    static toEncodable(fields: AmmFields): {
        feeInBps: number;
        protocolAllocationInPct: number;
        lpVestingWindow: BN;
        rewardFactor: BN;
        totalLpShares: BN;
        slotSnapshot: BN;
        baseReservesSnapshot: BN;
        quoteReservesSnapshot: BN;
        baseReserves: BN;
        quoteReserves: BN;
        cumulativeQuoteLpFees: BN;
        cumulativeQuoteProtocolFees: BN;
    };
    toJSON(): AmmJSON;
    static fromJSON(obj: AmmJSON): Amm;
    toEncodable(): {
        feeInBps: number;
        protocolAllocationInPct: number;
        lpVestingWindow: BN;
        rewardFactor: BN;
        totalLpShares: BN;
        slotSnapshot: BN;
        baseReservesSnapshot: BN;
        quoteReservesSnapshot: BN;
        baseReserves: BN;
        quoteReserves: BN;
        cumulativeQuoteLpFees: BN;
        cumulativeQuoteProtocolFees: BN;
    };
}
