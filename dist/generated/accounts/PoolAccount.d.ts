/// <reference types="node" />
/// <reference types="node" />
import { PublicKey, Connection } from "@solana/web3.js";
import * as types from "../types";
export interface PoolAccountFields {
    poolHeader: types.PoolHeaderFields;
    amm: types.AmmFields;
}
export interface PoolAccountJSON {
    poolHeader: types.PoolHeaderJSON;
    amm: types.AmmJSON;
}
export declare class PoolAccount {
    readonly poolHeader: types.PoolHeader;
    readonly amm: types.Amm;
    static readonly discriminator: Buffer;
    static readonly layout: any;
    constructor(fields: PoolAccountFields);
    static fetch(c: Connection, address: PublicKey, programId?: PublicKey): Promise<PoolAccount | null>;
    static fetchMultiple(c: Connection, addresses: PublicKey[], programId?: PublicKey): Promise<Array<PoolAccount | null>>;
    static decode(data: Buffer): PoolAccount;
    toJSON(): PoolAccountJSON;
    static fromJSON(obj: PoolAccountJSON): PoolAccount;
}
