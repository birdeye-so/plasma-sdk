import { PublicKey } from "@solana/web3.js";
import * as types from "../types";
export interface InitializeLpPositionEventFields {
    owner: PublicKey;
}
export interface InitializeLpPositionEventJSON {
    owner: string;
}
export declare class InitializeLpPositionEvent {
    readonly owner: PublicKey;
    constructor(fields: InitializeLpPositionEventFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.InitializeLpPositionEvent;
    static toEncodable(fields: InitializeLpPositionEventFields): {
        owner: PublicKey;
    };
    toJSON(): InitializeLpPositionEventJSON;
    static fromJSON(obj: InitializeLpPositionEventJSON): InitializeLpPositionEvent;
    toEncodable(): {
        owner: PublicKey;
    };
}
