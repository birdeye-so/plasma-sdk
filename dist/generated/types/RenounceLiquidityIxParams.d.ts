import * as types from "../types";
export interface RenounceLiquidityIxParamsFields {
    allowFeeWithdrawal: boolean;
}
export interface RenounceLiquidityIxParamsJSON {
    allowFeeWithdrawal: boolean;
}
export declare class RenounceLiquidityIxParams {
    readonly allowFeeWithdrawal: boolean;
    constructor(fields: RenounceLiquidityIxParamsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.RenounceLiquidityIxParams;
    static toEncodable(fields: RenounceLiquidityIxParamsFields): {
        allowFeeWithdrawal: boolean;
    };
    toJSON(): RenounceLiquidityIxParamsJSON;
    static fromJSON(obj: RenounceLiquidityIxParamsJSON): RenounceLiquidityIxParams;
    toEncodable(): {
        allowFeeWithdrawal: boolean;
    };
}
