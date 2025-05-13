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
exports.SwapIxParams = void 0;
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class SwapIxParams {
    constructor(fields) {
        this.side = fields.side;
        this.swapType = fields.swapType;
    }
    static layout(property) {
        return borsh.struct([types.Side.layout("side"), types.SwapType.layout("swapType")], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new SwapIxParams({
            side: types.Side.fromDecoded(obj.side),
            swapType: types.SwapType.fromDecoded(obj.swapType),
        });
    }
    static toEncodable(fields) {
        return {
            side: fields.side.toEncodable(),
            swapType: fields.swapType.toEncodable(),
        };
    }
    toJSON() {
        return {
            side: this.side.toJSON(),
            swapType: this.swapType.toJSON(),
        };
    }
    static fromJSON(obj) {
        return new SwapIxParams({
            side: types.Side.fromJSON(obj.side),
            swapType: types.SwapType.fromJSON(obj.swapType),
        });
    }
    toEncodable() {
        return SwapIxParams.toEncodable(this);
    }
}
exports.SwapIxParams = SwapIxParams;
