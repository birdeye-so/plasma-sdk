import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface InitializePoolEventFields {
    lpFeeInBps: BN;
    protocolFeeInPct: BN;
    feeRecipientParams: Array<types.ProtocolFeeRecipientParamsFields>;
}
export interface InitializePoolEventJSON {
    lpFeeInBps: string;
    protocolFeeInPct: string;
    feeRecipientParams: Array<types.ProtocolFeeRecipientParamsJSON>;
}
export declare class InitializePoolEvent {
    readonly lpFeeInBps: BN;
    readonly protocolFeeInPct: BN;
    readonly feeRecipientParams: Array<types.ProtocolFeeRecipientParams>;
    constructor(fields: InitializePoolEventFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.InitializePoolEvent;
    static toEncodable(fields: InitializePoolEventFields): {
        lpFeeInBps: BN;
        protocolFeeInPct: BN;
        feeRecipientParams: {
            recipient: PublicKey;
            shares: BN;
        }[];
    };
    toJSON(): InitializePoolEventJSON;
    static fromJSON(obj: InitializePoolEventJSON): InitializePoolEvent;
    toEncodable(): {
        lpFeeInBps: BN;
        protocolFeeInPct: BN;
        feeRecipientParams: {
            recipient: PublicKey;
            shares: BN;
        }[];
    };
}
