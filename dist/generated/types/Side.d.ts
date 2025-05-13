import * as types from "../types";
import * as borsh from "@coral-xyz/borsh";
export interface BuyJSON {
    kind: "Buy";
}
export declare class Buy {
    static readonly discriminator = 0;
    static readonly kind = "Buy";
    readonly discriminator = 0;
    readonly kind = "Buy";
    toJSON(): BuyJSON;
    toEncodable(): {
        Buy: {};
    };
}
export interface SellJSON {
    kind: "Sell";
}
export declare class Sell {
    static readonly discriminator = 1;
    static readonly kind = "Sell";
    readonly discriminator = 1;
    readonly kind = "Sell";
    toJSON(): SellJSON;
    toEncodable(): {
        Sell: {};
    };
}
export declare function fromDecoded(obj: any): types.SideKind;
export declare function fromJSON(obj: types.SideJSON): types.SideKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
