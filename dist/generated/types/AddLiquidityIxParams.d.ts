import BN from "bn.js";
import * as types from "../types";
export interface AddLiquidityIxParamsFields {
    desiredBaseAmountIn: BN;
    desiredQuoteAmountIn: BN;
    initialLpShares: BN | null;
}
export interface AddLiquidityIxParamsJSON {
    desiredBaseAmountIn: string;
    desiredQuoteAmountIn: string;
    initialLpShares: string | null;
}
export declare class AddLiquidityIxParams {
    readonly desiredBaseAmountIn: BN;
    readonly desiredQuoteAmountIn: BN;
    readonly initialLpShares: BN | null;
    constructor(fields: AddLiquidityIxParamsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.AddLiquidityIxParams;
    static toEncodable(fields: AddLiquidityIxParamsFields): {
        desiredBaseAmountIn: BN;
        desiredQuoteAmountIn: BN;
        initialLpShares: BN | null;
    };
    toJSON(): AddLiquidityIxParamsJSON;
    static fromJSON(obj: AddLiquidityIxParamsJSON): AddLiquidityIxParams;
    toEncodable(): {
        desiredBaseAmountIn: BN;
        desiredQuoteAmountIn: BN;
        initialLpShares: BN | null;
    };
}
