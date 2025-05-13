import * as types from "../types";
export interface RenounceLiquidityEventFields {
    allowFeeWithdrawal: boolean;
}
export interface RenounceLiquidityEventJSON {
    allowFeeWithdrawal: boolean;
}
export declare class RenounceLiquidityEvent {
    readonly allowFeeWithdrawal: boolean;
    constructor(fields: RenounceLiquidityEventFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.RenounceLiquidityEvent;
    static toEncodable(fields: RenounceLiquidityEventFields): {
        allowFeeWithdrawal: boolean;
    };
    toJSON(): RenounceLiquidityEventJSON;
    static fromJSON(obj: RenounceLiquidityEventJSON): RenounceLiquidityEvent;
    toEncodable(): {
        allowFeeWithdrawal: boolean;
    };
}
