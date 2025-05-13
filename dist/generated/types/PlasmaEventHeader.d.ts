import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface PlasmaEventHeaderFields {
    sequenceNumber: BN;
    slot: BN;
    timestamp: BN;
    pool: PublicKey;
    signer: PublicKey;
    baseDecimals: number;
    quoteDecimals: number;
}
export interface PlasmaEventHeaderJSON {
    sequenceNumber: string;
    slot: string;
    timestamp: string;
    pool: string;
    signer: string;
    baseDecimals: number;
    quoteDecimals: number;
}
export declare class PlasmaEventHeader {
    readonly sequenceNumber: BN;
    readonly slot: BN;
    readonly timestamp: BN;
    readonly pool: PublicKey;
    readonly signer: PublicKey;
    readonly baseDecimals: number;
    readonly quoteDecimals: number;
    constructor(fields: PlasmaEventHeaderFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.PlasmaEventHeader;
    static toEncodable(fields: PlasmaEventHeaderFields): {
        sequenceNumber: BN;
        slot: BN;
        timestamp: BN;
        pool: PublicKey;
        signer: PublicKey;
        baseDecimals: number;
        quoteDecimals: number;
    };
    toJSON(): PlasmaEventHeaderJSON;
    static fromJSON(obj: PlasmaEventHeaderJSON): PlasmaEventHeader;
    toEncodable(): {
        sequenceNumber: BN;
        slot: BN;
        timestamp: BN;
        pool: PublicKey;
        signer: PublicKey;
        baseDecimals: number;
        quoteDecimals: number;
    };
}
