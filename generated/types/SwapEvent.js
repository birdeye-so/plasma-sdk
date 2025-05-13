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
exports.SwapEvent = void 0;
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class SwapEvent {
    constructor(fields) {
        this.swapSequenceNumber = fields.swapSequenceNumber;
        this.preBaseLiquidity = fields.preBaseLiquidity;
        this.preQuoteLiquidity = fields.preQuoteLiquidity;
        this.postBaseLiquidity = fields.postBaseLiquidity;
        this.postQuoteLiquidity = fields.postQuoteLiquidity;
        this.snapshotBaseLiquidity = fields.snapshotBaseLiquidity;
        this.snapshotQuoteLiquidity = fields.snapshotQuoteLiquidity;
        this.swapResult = new types.SwapResult({ ...fields.swapResult });
    }
    static layout(property) {
        return borsh.struct([
            borsh.u64("swapSequenceNumber"),
            borsh.u64("preBaseLiquidity"),
            borsh.u64("preQuoteLiquidity"),
            borsh.u64("postBaseLiquidity"),
            borsh.u64("postQuoteLiquidity"),
            borsh.u64("snapshotBaseLiquidity"),
            borsh.u64("snapshotQuoteLiquidity"),
            types.SwapResult.layout("swapResult"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new SwapEvent({
            swapSequenceNumber: obj.swapSequenceNumber,
            preBaseLiquidity: obj.preBaseLiquidity,
            preQuoteLiquidity: obj.preQuoteLiquidity,
            postBaseLiquidity: obj.postBaseLiquidity,
            postQuoteLiquidity: obj.postQuoteLiquidity,
            snapshotBaseLiquidity: obj.snapshotBaseLiquidity,
            snapshotQuoteLiquidity: obj.snapshotQuoteLiquidity,
            swapResult: types.SwapResult.fromDecoded(obj.swapResult),
        });
    }
    static toEncodable(fields) {
        return {
            swapSequenceNumber: fields.swapSequenceNumber,
            preBaseLiquidity: fields.preBaseLiquidity,
            preQuoteLiquidity: fields.preQuoteLiquidity,
            postBaseLiquidity: fields.postBaseLiquidity,
            postQuoteLiquidity: fields.postQuoteLiquidity,
            snapshotBaseLiquidity: fields.snapshotBaseLiquidity,
            snapshotQuoteLiquidity: fields.snapshotQuoteLiquidity,
            swapResult: types.SwapResult.toEncodable(fields.swapResult),
        };
    }
    toJSON() {
        return {
            swapSequenceNumber: this.swapSequenceNumber.toString(),
            preBaseLiquidity: this.preBaseLiquidity.toString(),
            preQuoteLiquidity: this.preQuoteLiquidity.toString(),
            postBaseLiquidity: this.postBaseLiquidity.toString(),
            postQuoteLiquidity: this.postQuoteLiquidity.toString(),
            snapshotBaseLiquidity: this.snapshotBaseLiquidity.toString(),
            snapshotQuoteLiquidity: this.snapshotQuoteLiquidity.toString(),
            swapResult: this.swapResult.toJSON(),
        };
    }
    static fromJSON(obj) {
        return new SwapEvent({
            swapSequenceNumber: new bn_js_1.default(obj.swapSequenceNumber),
            preBaseLiquidity: new bn_js_1.default(obj.preBaseLiquidity),
            preQuoteLiquidity: new bn_js_1.default(obj.preQuoteLiquidity),
            postBaseLiquidity: new bn_js_1.default(obj.postBaseLiquidity),
            postQuoteLiquidity: new bn_js_1.default(obj.postQuoteLiquidity),
            snapshotBaseLiquidity: new bn_js_1.default(obj.snapshotBaseLiquidity),
            snapshotQuoteLiquidity: new bn_js_1.default(obj.snapshotQuoteLiquidity),
            swapResult: types.SwapResult.fromJSON(obj.swapResult),
        });
    }
    toEncodable() {
        return SwapEvent.toEncodable(this);
    }
}
exports.SwapEvent = SwapEvent;
