import BN from "bn.js";
import * as types from "../types";
import * as borsh from "@coral-xyz/borsh";
export type ExactInFields = {
    amountIn: BN;
    minAmountOut: BN;
};
export type ExactInValue = {
    amountIn: BN;
    minAmountOut: BN;
};
export interface ExactInJSON {
    kind: "ExactIn";
    value: {
        amountIn: string;
        minAmountOut: string;
    };
}
export declare class ExactIn {
    static readonly discriminator = 0;
    static readonly kind = "ExactIn";
    readonly discriminator = 0;
    readonly kind = "ExactIn";
    readonly value: ExactInValue;
    constructor(value: ExactInFields);
    toJSON(): ExactInJSON;
    toEncodable(): {
        ExactIn: {
            amount_in: BN;
            min_amount_out: BN;
        };
    };
}
export type ExactOutFields = {
    amountOut: BN;
    maxAmountIn: BN;
};
export type ExactOutValue = {
    amountOut: BN;
    maxAmountIn: BN;
};
export interface ExactOutJSON {
    kind: "ExactOut";
    value: {
        amountOut: string;
        maxAmountIn: string;
    };
}
export declare class ExactOut {
    static readonly discriminator = 1;
    static readonly kind = "ExactOut";
    readonly discriminator = 1;
    readonly kind = "ExactOut";
    readonly value: ExactOutValue;
    constructor(value: ExactOutFields);
    toJSON(): ExactOutJSON;
    toEncodable(): {
        ExactOut: {
            amount_out: BN;
            max_amount_in: BN;
        };
    };
}
export declare function fromDecoded(obj: any): types.SwapTypeKind;
export declare function fromJSON(obj: types.SwapTypeJSON): types.SwapTypeKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
