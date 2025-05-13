import BN from "bn.js";
import * as types from "../types";
export interface RemoveLiquidityIxParamsFields {
    lpShares: BN;
}
export interface RemoveLiquidityIxParamsJSON {
    lpShares: string;
}
export declare class RemoveLiquidityIxParams {
    readonly lpShares: BN;
    constructor(fields: RemoveLiquidityIxParamsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.RemoveLiquidityIxParams;
    static toEncodable(fields: RemoveLiquidityIxParamsFields): {
        lpShares: BN;
    };
    toJSON(): RemoveLiquidityIxParamsJSON;
    static fromJSON(obj: RemoveLiquidityIxParamsJSON): RemoveLiquidityIxParams;
    toEncodable(): {
        lpShares: BN;
    };
}
