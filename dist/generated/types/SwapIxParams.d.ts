import BN from "bn.js";
import * as types from "../types";
export interface SwapIxParamsFields {
    side: types.SideKind;
    swapType: types.SwapTypeKind;
}
export interface SwapIxParamsJSON {
    side: types.SideJSON;
    swapType: types.SwapTypeJSON;
}
export declare class SwapIxParams {
    readonly side: types.SideKind;
    readonly swapType: types.SwapTypeKind;
    constructor(fields: SwapIxParamsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.SwapIxParams;
    static toEncodable(fields: SwapIxParamsFields): {
        side: {
            Buy: {};
        } | {
            Sell: {};
        };
        swapType: {
            ExactIn: {
                amount_in: BN;
                min_amount_out: BN;
            };
        } | {
            ExactOut: {
                amount_out: BN;
                max_amount_in: BN;
            };
        };
    };
    toJSON(): SwapIxParamsJSON;
    static fromJSON(obj: SwapIxParamsJSON): SwapIxParams;
    toEncodable(): {
        side: {
            Buy: {};
        } | {
            Sell: {};
        };
        swapType: {
            ExactIn: {
                amount_in: BN;
                min_amount_out: BN;
            };
        } | {
            ExactOut: {
                amount_out: BN;
                max_amount_in: BN;
            };
        };
    };
}
