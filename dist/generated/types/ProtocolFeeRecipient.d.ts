import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface ProtocolFeeRecipientFields {
    recipient: PublicKey;
    shares: BN;
    totalAccumulatedQuoteFees: BN;
    collectedQuoteFees: BN;
}
export interface ProtocolFeeRecipientJSON {
    recipient: string;
    shares: string;
    totalAccumulatedQuoteFees: string;
    collectedQuoteFees: string;
}
export declare class ProtocolFeeRecipient {
    readonly recipient: PublicKey;
    readonly shares: BN;
    readonly totalAccumulatedQuoteFees: BN;
    readonly collectedQuoteFees: BN;
    constructor(fields: ProtocolFeeRecipientFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.ProtocolFeeRecipient;
    static toEncodable(fields: ProtocolFeeRecipientFields): {
        recipient: PublicKey;
        shares: BN;
        totalAccumulatedQuoteFees: BN;
        collectedQuoteFees: BN;
    };
    toJSON(): ProtocolFeeRecipientJSON;
    static fromJSON(obj: ProtocolFeeRecipientJSON): ProtocolFeeRecipient;
    toEncodable(): {
        recipient: PublicKey;
        shares: BN;
        totalAccumulatedQuoteFees: BN;
        collectedQuoteFees: BN;
    };
}
