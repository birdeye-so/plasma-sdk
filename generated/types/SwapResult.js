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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwapResult = void 0;
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class SwapResult {
    constructor(fields) {
        this.side = fields.side;
        this.baseMatched = fields.baseMatched;
        this.quoteMatched = fields.quoteMatched;
        this.baseMatchedAsLimitOrder = fields.baseMatchedAsLimitOrder;
        this.quoteMatchedAsLimitOrder = fields.quoteMatchedAsLimitOrder;
        this.baseMatchedAsSwap = fields.baseMatchedAsSwap;
        this.quoteMatchedAsSwap = fields.quoteMatchedAsSwap;
        this.feeInQuote = fields.feeInQuote;
    }
    static layout(property) {
        return borsh.struct([
            types.Side.layout("side"),
            borsh.u64("baseMatched"),
            borsh.u64("quoteMatched"),
            borsh.u64("baseMatchedAsLimitOrder"),
            borsh.u64("quoteMatchedAsLimitOrder"),
            borsh.u64("baseMatchedAsSwap"),
            borsh.u64("quoteMatchedAsSwap"),
            borsh.u64("feeInQuote"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new SwapResult({
            side: types.Side.fromDecoded(obj.side),
            baseMatched: obj.baseMatched,
            quoteMatched: obj.quoteMatched,
            baseMatchedAsLimitOrder: obj.baseMatchedAsLimitOrder,
            quoteMatchedAsLimitOrder: obj.quoteMatchedAsLimitOrder,
            baseMatchedAsSwap: obj.baseMatchedAsSwap,
            quoteMatchedAsSwap: obj.quoteMatchedAsSwap,
            feeInQuote: obj.feeInQuote,
        });
    }
    static toEncodable(fields) {
        return {
            side: fields.side.toEncodable(),
            baseMatched: fields.baseMatched,
            quoteMatched: fields.quoteMatched,
            baseMatchedAsLimitOrder: fields.baseMatchedAsLimitOrder,
            quoteMatchedAsLimitOrder: fields.quoteMatchedAsLimitOrder,
            baseMatchedAsSwap: fields.baseMatchedAsSwap,
            quoteMatchedAsSwap: fields.quoteMatchedAsSwap,
            feeInQuote: fields.feeInQuote,
        };
    }
    toJSON() {
        return {
            side: this.side.toJSON(),
            baseMatched: this.baseMatched.toString(),
            quoteMatched: this.quoteMatched.toString(),
            baseMatchedAsLimitOrder: this.baseMatchedAsLimitOrder.toString(),
            quoteMatchedAsLimitOrder: this.quoteMatchedAsLimitOrder.toString(),
            baseMatchedAsSwap: this.baseMatchedAsSwap.toString(),
            quoteMatchedAsSwap: this.quoteMatchedAsSwap.toString(),
            feeInQuote: this.feeInQuote.toString(),
        };
    }
    static fromJSON(obj) {
        return new SwapResult({
            side: types.Side.fromJSON(obj.side),
            baseMatched: new bn_js_1.default(obj.baseMatched),
            quoteMatched: new bn_js_1.default(obj.quoteMatched),
            baseMatchedAsLimitOrder: new bn_js_1.default(obj.baseMatchedAsLimitOrder),
            quoteMatchedAsLimitOrder: new bn_js_1.default(obj.quoteMatchedAsLimitOrder),
            baseMatchedAsSwap: new bn_js_1.default(obj.baseMatchedAsSwap),
            quoteMatchedAsSwap: new bn_js_1.default(obj.quoteMatchedAsSwap),
            feeInQuote: new bn_js_1.default(obj.feeInQuote),
        });
    }
    toEncodable() {
        return SwapResult.toEncodable(this);
    }
}
exports.SwapResult = SwapResult;
