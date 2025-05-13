import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface ProtocolFeeRecipientsFields {
    recipients: Array<types.ProtocolFeeRecipientFields>;
    padding: Array<BN>;
}
export interface ProtocolFeeRecipientsJSON {
    recipients: Array<types.ProtocolFeeRecipientJSON>;
    padding: Array<string>;
}
export declare class ProtocolFeeRecipients {
    readonly recipients: Array<types.ProtocolFeeRecipient>;
    readonly padding: Array<BN>;
    constructor(fields: ProtocolFeeRecipientsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.ProtocolFeeRecipients;
    static toEncodable(fields: ProtocolFeeRecipientsFields): {
        recipients: {
            recipient: PublicKey;
            shares: BN;
            totalAccumulatedQuoteFees: BN;
            collectedQuoteFees: BN;
        }[];
        padding: BN[];
    };
    toJSON(): ProtocolFeeRecipientsJSON;
    static fromJSON(obj: ProtocolFeeRecipientsJSON): ProtocolFeeRecipients;
    toEncodable(): {
        recipients: {
            recipient: PublicKey;
            shares: BN;
            totalAccumulatedQuoteFees: BN;
            collectedQuoteFees: BN;
        }[];
        padding: BN[];
    };
}
