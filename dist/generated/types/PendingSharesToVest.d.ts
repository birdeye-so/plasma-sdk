import BN from "bn.js";
import * as types from "../types";
export interface PendingSharesToVestFields {
    depositSlot: BN;
    lpSharesToVest: BN;
}
export interface PendingSharesToVestJSON {
    depositSlot: string;
    lpSharesToVest: string;
}
export declare class PendingSharesToVest {
    readonly depositSlot: BN;
    readonly lpSharesToVest: BN;
    constructor(fields: PendingSharesToVestFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.PendingSharesToVest;
    static toEncodable(fields: PendingSharesToVestFields): {
        depositSlot: BN;
        lpSharesToVest: BN;
    };
    toJSON(): PendingSharesToVestJSON;
    static fromJSON(obj: PendingSharesToVestJSON): PendingSharesToVest;
    toEncodable(): {
        depositSlot: BN;
        lpSharesToVest: BN;
    };
}
