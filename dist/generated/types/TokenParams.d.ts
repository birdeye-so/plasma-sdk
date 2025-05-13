import { PublicKey } from "@solana/web3.js";
import * as types from "../types";
export interface TokenParamsFields {
    decimals: number;
    vaultBump: number;
    mintKey: PublicKey;
    vaultKey: PublicKey;
}
export interface TokenParamsJSON {
    decimals: number;
    vaultBump: number;
    mintKey: string;
    vaultKey: string;
}
export declare class TokenParams {
    readonly decimals: number;
    readonly vaultBump: number;
    readonly mintKey: PublicKey;
    readonly vaultKey: PublicKey;
    constructor(fields: TokenParamsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.TokenParams;
    static toEncodable(fields: TokenParamsFields): {
        decimals: number;
        vaultBump: number;
        mintKey: PublicKey;
        vaultKey: PublicKey;
    };
    toJSON(): TokenParamsJSON;
    static fromJSON(obj: TokenParamsJSON): TokenParams;
    toEncodable(): {
        decimals: number;
        vaultBump: number;
        mintKey: PublicKey;
        vaultKey: PublicKey;
    };
}
