import BN from "bn.js";
import * as types from "../types";
export interface RemoveLiquidityEventFields {
    poolTotalLpShares: BN;
    poolTotalBaseLiquidity: BN;
    poolTotalQuoteLiquitidy: BN;
    snapshotBaseLiquidity: BN;
    snapshotQuoteLiquidity: BN;
    userLpSharesBurned: BN;
    userLpSharesAvailable: BN;
    userLpSharesLocked: BN;
    userLpSharesUnlockedForWithdrawal: BN;
    userBaseWithdrawn: BN;
    userQuoteWithdrawn: BN;
    userTotalWithdrawableBase: BN;
    userTotalWithdrawableQuote: BN;
}
export interface RemoveLiquidityEventJSON {
    poolTotalLpShares: string;
    poolTotalBaseLiquidity: string;
    poolTotalQuoteLiquitidy: string;
    snapshotBaseLiquidity: string;
    snapshotQuoteLiquidity: string;
    userLpSharesBurned: string;
    userLpSharesAvailable: string;
    userLpSharesLocked: string;
    userLpSharesUnlockedForWithdrawal: string;
    userBaseWithdrawn: string;
    userQuoteWithdrawn: string;
    userTotalWithdrawableBase: string;
    userTotalWithdrawableQuote: string;
}
export declare class RemoveLiquidityEvent {
    readonly poolTotalLpShares: BN;
    readonly poolTotalBaseLiquidity: BN;
    readonly poolTotalQuoteLiquitidy: BN;
    readonly snapshotBaseLiquidity: BN;
    readonly snapshotQuoteLiquidity: BN;
    readonly userLpSharesBurned: BN;
    readonly userLpSharesAvailable: BN;
    readonly userLpSharesLocked: BN;
    readonly userLpSharesUnlockedForWithdrawal: BN;
    readonly userBaseWithdrawn: BN;
    readonly userQuoteWithdrawn: BN;
    readonly userTotalWithdrawableBase: BN;
    readonly userTotalWithdrawableQuote: BN;
    constructor(fields: RemoveLiquidityEventFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.RemoveLiquidityEvent;
    static toEncodable(fields: RemoveLiquidityEventFields): {
        poolTotalLpShares: BN;
        poolTotalBaseLiquidity: BN;
        poolTotalQuoteLiquitidy: BN;
        snapshotBaseLiquidity: BN;
        snapshotQuoteLiquidity: BN;
        userLpSharesBurned: BN;
        userLpSharesAvailable: BN;
        userLpSharesLocked: BN;
        userLpSharesUnlockedForWithdrawal: BN;
        userBaseWithdrawn: BN;
        userQuoteWithdrawn: BN;
        userTotalWithdrawableBase: BN;
        userTotalWithdrawableQuote: BN;
    };
    toJSON(): RemoveLiquidityEventJSON;
    static fromJSON(obj: RemoveLiquidityEventJSON): RemoveLiquidityEvent;
    toEncodable(): {
        poolTotalLpShares: BN;
        poolTotalBaseLiquidity: BN;
        poolTotalQuoteLiquitidy: BN;
        snapshotBaseLiquidity: BN;
        snapshotQuoteLiquidity: BN;
        userLpSharesBurned: BN;
        userLpSharesAvailable: BN;
        userLpSharesLocked: BN;
        userLpSharesUnlockedForWithdrawal: BN;
        userBaseWithdrawn: BN;
        userQuoteWithdrawn: BN;
        userTotalWithdrawableBase: BN;
        userTotalWithdrawableQuote: BN;
    };
}
