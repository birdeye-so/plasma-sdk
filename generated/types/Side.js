"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.layout = exports.fromJSON = exports.fromDecoded = exports.Sell = exports.Buy = void 0;
const borsh = __importStar(require("@coral-xyz/borsh"));
class Buy {
    constructor() {
        this.discriminator = 0;
        this.kind = "Buy";
    }
    toJSON() {
        return {
            kind: "Buy",
        };
    }
    toEncodable() {
        return {
            Buy: {},
        };
    }
}
exports.Buy = Buy;
Buy.discriminator = 0;
Buy.kind = "Buy";
class Sell {
    constructor() {
        this.discriminator = 1;
        this.kind = "Sell";
    }
    toJSON() {
        return {
            kind: "Sell",
        };
    }
    toEncodable() {
        return {
            Sell: {},
        };
    }
}
exports.Sell = Sell;
Sell.discriminator = 1;
Sell.kind = "Sell";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("Buy" in obj) {
        return new Buy();
    }
    if ("Sell" in obj) {
        return new Sell();
    }
    throw new Error("Invalid enum object");
}
exports.fromDecoded = fromDecoded;
function fromJSON(obj) {
    switch (obj.kind) {
        case "Buy": {
            return new Buy();
        }
        case "Sell": {
            return new Sell();
        }
    }
}
exports.fromJSON = fromJSON;
function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], "Buy"),
        borsh.struct([], "Sell"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
exports.layout = layout;
