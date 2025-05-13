import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface PoolHeaderFields {
    sequenceNumber: BN;
    baseParams: types.TokenParamsFields;
    quoteParams: types.TokenParamsFields;
    feeRecipients: types.ProtocolFeeRecipientsFields;
    swapSequenceNumber: BN;
    padding: Array<BN>;
}
export interface PoolHeaderJSON {
    sequenceNumber: string;
    baseParams: types.TokenParamsJSON;
    quoteParams: types.TokenParamsJSON;
    feeRecipients: types.ProtocolFeeRecipientsJSON;
    swapSequenceNumber: string;
    padding: Array<string>;
}
export declare class PoolHeader {
    readonly sequenceNumber: BN;
    readonly baseParams: types.TokenParams;
    readonly quoteParams: types.TokenParams;
    readonly feeRecipients: types.ProtocolFeeRecipients;
    readonly swapSequenceNumber: BN;
    readonly padding: Array<BN>;
    constructor(fields: PoolHeaderFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.PoolHeader;
    static toEncodable(fields: PoolHeaderFields): {
        sequenceNumber: BN;
        baseParams: {
            decimals: number;
            vaultBump: number;
            mintKey: PublicKey;
            vaultKey: PublicKey;
        };
        quoteParams: {
            decimals: number;
            vaultBump: number;
            mintKey: PublicKey;
            vaultKey: PublicKey;
        };
        feeRecipients: {
            recipients: {
                recipient: PublicKey;
                shares: BN;
                totalAccumulatedQuoteFees: BN;
                collectedQuoteFees: BN;
            }[];
            padding: BN[];
        };
        swapSequenceNumber: BN;
        padding: BN[];
    };
    toJSON(): PoolHeaderJSON;
    static fromJSON(obj: PoolHeaderJSON): PoolHeader;
    toEncodable(): {
        sequenceNumber: BN;
        baseParams: {
            decimals: number;
            vaultBump: number;
            mintKey: PublicKey;
            vaultKey: PublicKey;
        };
        quoteParams: {
            decimals: number;
            vaultBump: number;
            mintKey: PublicKey;
            vaultKey: PublicKey;
        };
        feeRecipients: {
            recipients: {
                recipient: PublicKey;
                shares: BN;
                totalAccumulatedQuoteFees: BN;
                collectedQuoteFees: BN;
            }[];
            padding: BN[];
        };
        swapSequenceNumber: BN;
        padding: BN[];
    };
}
