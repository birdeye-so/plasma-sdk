import BN from "bn.js";
import * as types from "../types";
export interface AddLiquidityEventFields {
    poolTotalLpShares: BN;
    poolTotalBaseLiquidity: BN;
    poolTotalQuoteLiquitidy: BN;
    snapshotBaseLiquidity: BN;
    snapshotQuoteLiquidity: BN;
    userLpSharesReceived: BN;
    userLpSharesAvailable: BN;
    userLpSharesLocked: BN;
    userLpSharesUnlockedForWithdrawal: BN;
    userBaseDeposited: BN;
    userQuoteDeposited: BN;
    userTotalWithdrawableBase: BN;
    userTotalWithdrawableQuote: BN;
}
export interface AddLiquidityEventJSON {
    poolTotalLpShares: string;
    poolTotalBaseLiquidity: string;
    poolTotalQuoteLiquitidy: string;
    snapshotBaseLiquidity: string;
    snapshotQuoteLiquidity: string;
    userLpSharesReceived: string;
    userLpSharesAvailable: string;
    userLpSharesLocked: string;
    userLpSharesUnlockedForWithdrawal: string;
    userBaseDeposited: string;
    userQuoteDeposited: string;
    userTotalWithdrawableBase: string;
    userTotalWithdrawableQuote: string;
}
export declare class AddLiquidityEvent {
    readonly poolTotalLpShares: BN;
    readonly poolTotalBaseLiquidity: BN;
    readonly poolTotalQuoteLiquitidy: BN;
    readonly snapshotBaseLiquidity: BN;
    readonly snapshotQuoteLiquidity: BN;
    readonly userLpSharesReceived: BN;
    readonly userLpSharesAvailable: BN;
    readonly userLpSharesLocked: BN;
    readonly userLpSharesUnlockedForWithdrawal: BN;
    readonly userBaseDeposited: BN;
    readonly userQuoteDeposited: BN;
    readonly userTotalWithdrawableBase: BN;
    readonly userTotalWithdrawableQuote: BN;
    constructor(fields: AddLiquidityEventFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.AddLiquidityEvent;
    static toEncodable(fields: AddLiquidityEventFields): {
        poolTotalLpShares: BN;
        poolTotalBaseLiquidity: BN;
        poolTotalQuoteLiquitidy: BN;
        snapshotBaseLiquidity: BN;
        snapshotQuoteLiquidity: BN;
        userLpSharesReceived: BN;
        userLpSharesAvailable: BN;
        userLpSharesLocked: BN;
        userLpSharesUnlockedForWithdrawal: BN;
        userBaseDeposited: BN;
        userQuoteDeposited: BN;
        userTotalWithdrawableBase: BN;
        userTotalWithdrawableQuote: BN;
    };
    toJSON(): AddLiquidityEventJSON;
    static fromJSON(obj: AddLiquidityEventJSON): AddLiquidityEvent;
    toEncodable(): {
        poolTotalLpShares: BN;
        poolTotalBaseLiquidity: BN;
        poolTotalQuoteLiquitidy: BN;
        snapshotBaseLiquidity: BN;
        snapshotQuoteLiquidity: BN;
        userLpSharesReceived: BN;
        userLpSharesAvailable: BN;
        userLpSharesLocked: BN;
        userLpSharesUnlockedForWithdrawal: BN;
        userBaseDeposited: BN;
        userQuoteDeposited: BN;
        userTotalWithdrawableBase: BN;
        userTotalWithdrawableQuote: BN;
    };
}
