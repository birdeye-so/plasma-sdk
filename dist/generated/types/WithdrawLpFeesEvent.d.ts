import BN from "bn.js";
import * as types from "../types";
export interface WithdrawLpFeesEventFields {
    feesWithdrawn: BN;
}
export interface WithdrawLpFeesEventJSON {
    feesWithdrawn: string;
}
export declare class WithdrawLpFeesEvent {
    readonly feesWithdrawn: BN;
    constructor(fields: WithdrawLpFeesEventFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.WithdrawLpFeesEvent;
    static toEncodable(fields: WithdrawLpFeesEventFields): {
        feesWithdrawn: BN;
    };
    toJSON(): WithdrawLpFeesEventJSON;
    static fromJSON(obj: WithdrawLpFeesEventJSON): WithdrawLpFeesEvent;
    toEncodable(): {
        feesWithdrawn: BN;
    };
}
