import BN from "bn.js";
import * as types from "../types";
export interface SwapEventFields {
    swapSequenceNumber: BN;
    preBaseLiquidity: BN;
    preQuoteLiquidity: BN;
    postBaseLiquidity: BN;
    postQuoteLiquidity: BN;
    snapshotBaseLiquidity: BN;
    snapshotQuoteLiquidity: BN;
    swapResult: types.SwapResultFields;
}
export interface SwapEventJSON {
    swapSequenceNumber: string;
    preBaseLiquidity: string;
    preQuoteLiquidity: string;
    postBaseLiquidity: string;
    postQuoteLiquidity: string;
    snapshotBaseLiquidity: string;
    snapshotQuoteLiquidity: string;
    swapResult: types.SwapResultJSON;
}
export declare class SwapEvent {
    readonly swapSequenceNumber: BN;
    readonly preBaseLiquidity: BN;
    readonly preQuoteLiquidity: BN;
    readonly postBaseLiquidity: BN;
    readonly postQuoteLiquidity: BN;
    readonly snapshotBaseLiquidity: BN;
    readonly snapshotQuoteLiquidity: BN;
    readonly swapResult: types.SwapResult;
    constructor(fields: SwapEventFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.SwapEvent;
    static toEncodable(fields: SwapEventFields): {
        swapSequenceNumber: BN;
        preBaseLiquidity: BN;
        preQuoteLiquidity: BN;
        postBaseLiquidity: BN;
        postQuoteLiquidity: BN;
        snapshotBaseLiquidity: BN;
        snapshotQuoteLiquidity: BN;
        swapResult: {
            side: {
                Buy: {};
            } | {
                Sell: {};
            };
            baseMatched: BN;
            quoteMatched: BN;
            baseMatchedAsLimitOrder: BN;
            quoteMatchedAsLimitOrder: BN;
            baseMatchedAsSwap: BN;
            quoteMatchedAsSwap: BN;
            feeInQuote: BN;
        };
    };
    toJSON(): SwapEventJSON;
    static fromJSON(obj: SwapEventJSON): SwapEvent;
    toEncodable(): {
        swapSequenceNumber: BN;
        preBaseLiquidity: BN;
        preQuoteLiquidity: BN;
        postBaseLiquidity: BN;
        postQuoteLiquidity: BN;
        snapshotBaseLiquidity: BN;
        snapshotQuoteLiquidity: BN;
        swapResult: {
            side: {
                Buy: {};
            } | {
                Sell: {};
            };
            baseMatched: BN;
            quoteMatched: BN;
            baseMatchedAsLimitOrder: BN;
            quoteMatchedAsLimitOrder: BN;
            baseMatchedAsSwap: BN;
            quoteMatchedAsSwap: BN;
            feeInQuote: BN;
        };
    };
}
