import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface ProtocolFeeRecipientParamsFields {
    recipient: PublicKey;
    shares: BN;
}
export interface ProtocolFeeRecipientParamsJSON {
    recipient: string;
    shares: string;
}
export declare class ProtocolFeeRecipientParams {
    readonly recipient: PublicKey;
    readonly shares: BN;
    constructor(fields: ProtocolFeeRecipientParamsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.ProtocolFeeRecipientParams;
    static toEncodable(fields: ProtocolFeeRecipientParamsFields): {
        recipient: PublicKey;
        shares: BN;
    };
    toJSON(): ProtocolFeeRecipientParamsJSON;
    static fromJSON(obj: ProtocolFeeRecipientParamsJSON): ProtocolFeeRecipientParams;
    toEncodable(): {
        recipient: PublicKey;
        shares: BN;
    };
}
