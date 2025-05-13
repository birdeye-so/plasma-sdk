import BN from "bn.js";
import * as types from "../types";
export interface SwapResultFields {
    side: types.SideKind;
    baseMatched: BN;
    quoteMatched: BN;
    baseMatchedAsLimitOrder: BN;
    quoteMatchedAsLimitOrder: BN;
    baseMatchedAsSwap: BN;
    quoteMatchedAsSwap: BN;
    feeInQuote: BN;
}
export interface SwapResultJSON {
    side: types.SideJSON;
    baseMatched: string;
    quoteMatched: string;
    baseMatchedAsLimitOrder: string;
    quoteMatchedAsLimitOrder: string;
    baseMatchedAsSwap: string;
    quoteMatchedAsSwap: string;
    feeInQuote: string;
}
export declare class SwapResult {
    readonly side: types.SideKind;
    readonly baseMatched: BN;
    readonly quoteMatched: BN;
    readonly baseMatchedAsLimitOrder: BN;
    readonly quoteMatchedAsLimitOrder: BN;
    readonly baseMatchedAsSwap: BN;
    readonly quoteMatchedAsSwap: BN;
    readonly feeInQuote: BN;
    constructor(fields: SwapResultFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.SwapResult;
    static toEncodable(fields: SwapResultFields): {
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
    toJSON(): SwapResultJSON;
    static fromJSON(obj: SwapResultJSON): SwapResult;
    toEncodable(): {
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
}
