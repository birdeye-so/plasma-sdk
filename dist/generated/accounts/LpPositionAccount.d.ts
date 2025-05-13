/// <reference types="node" />
/// <reference types="node" />
import { PublicKey, Connection } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface LpPositionAccountFields {
    authority: PublicKey;
    pool: PublicKey;
    status: BN;
    lpPosition: types.LpPositionFields;
}
export interface LpPositionAccountJSON {
    authority: string;
    pool: string;
    status: string;
    lpPosition: types.LpPositionJSON;
}
export declare class LpPositionAccount {
    readonly authority: PublicKey;
    readonly pool: PublicKey;
    readonly status: BN;
    readonly lpPosition: types.LpPosition;
    static readonly discriminator: Buffer;
    static readonly layout: any;
    constructor(fields: LpPositionAccountFields);
    static fetch(c: Connection, address: PublicKey, programId?: PublicKey): Promise<LpPositionAccount | null>;
    static fetchMultiple(c: Connection, addresses: PublicKey[], programId?: PublicKey): Promise<Array<LpPositionAccount | null>>;
    static decode(data: Buffer): LpPositionAccount;
    toJSON(): LpPositionAccountJSON;
    static fromJSON(obj: LpPositionAccountJSON): LpPositionAccount;
}
