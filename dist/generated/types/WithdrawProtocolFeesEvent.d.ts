import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface WithdrawProtocolFeesEventFields {
    protocolFeeRecipient: PublicKey;
    feesWithdrawn: BN;
}
export interface WithdrawProtocolFeesEventJSON {
    protocolFeeRecipient: string;
    feesWithdrawn: string;
}
export declare class WithdrawProtocolFeesEvent {
    readonly protocolFeeRecipient: PublicKey;
    readonly feesWithdrawn: BN;
    constructor(fields: WithdrawProtocolFeesEventFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.WithdrawProtocolFeesEvent;
    static toEncodable(fields: WithdrawProtocolFeesEventFields): {
        protocolFeeRecipient: PublicKey;
        feesWithdrawn: BN;
    };
    toJSON(): WithdrawProtocolFeesEventJSON;
    static fromJSON(obj: WithdrawProtocolFeesEventJSON): WithdrawProtocolFeesEvent;
    toEncodable(): {
        protocolFeeRecipient: PublicKey;
        feesWithdrawn: BN;
    };
}
