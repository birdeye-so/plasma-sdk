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
exports.PoolHeader = void 0;
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class PoolHeader {
    constructor(fields) {
        this.sequenceNumber = fields.sequenceNumber;
        this.baseParams = new types.TokenParams({ ...fields.baseParams });
        this.quoteParams = new types.TokenParams({ ...fields.quoteParams });
        this.feeRecipients = new types.ProtocolFeeRecipients({
            ...fields.feeRecipients,
        });
        this.swapSequenceNumber = fields.swapSequenceNumber;
        this.padding = fields.padding;
    }
    static layout(property) {
        return borsh.struct([
            borsh.u64("sequenceNumber"),
            types.TokenParams.layout("baseParams"),
            types.TokenParams.layout("quoteParams"),
            types.ProtocolFeeRecipients.layout("feeRecipients"),
            borsh.u64("swapSequenceNumber"),
            borsh.array(borsh.u64(), 12, "padding"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new PoolHeader({
            sequenceNumber: obj.sequenceNumber,
            baseParams: types.TokenParams.fromDecoded(obj.baseParams),
            quoteParams: types.TokenParams.fromDecoded(obj.quoteParams),
            feeRecipients: types.ProtocolFeeRecipients.fromDecoded(obj.feeRecipients),
            swapSequenceNumber: obj.swapSequenceNumber,
            padding: obj.padding,
        });
    }
    static toEncodable(fields) {
        return {
            sequenceNumber: fields.sequenceNumber,
            baseParams: types.TokenParams.toEncodable(fields.baseParams),
            quoteParams: types.TokenParams.toEncodable(fields.quoteParams),
            feeRecipients: types.ProtocolFeeRecipients.toEncodable(fields.feeRecipients),
            swapSequenceNumber: fields.swapSequenceNumber,
            padding: fields.padding,
        };
    }
    toJSON() {
        return {
            sequenceNumber: this.sequenceNumber.toString(),
            baseParams: this.baseParams.toJSON(),
            quoteParams: this.quoteParams.toJSON(),
            feeRecipients: this.feeRecipients.toJSON(),
            swapSequenceNumber: this.swapSequenceNumber.toString(),
            padding: this.padding.map((item) => item.toString()),
        };
    }
    static fromJSON(obj) {
        return new PoolHeader({
            sequenceNumber: new bn_js_1.default(obj.sequenceNumber),
            baseParams: types.TokenParams.fromJSON(obj.baseParams),
            quoteParams: types.TokenParams.fromJSON(obj.quoteParams),
            feeRecipients: types.ProtocolFeeRecipients.fromJSON(obj.feeRecipients),
            swapSequenceNumber: new bn_js_1.default(obj.swapSequenceNumber),
            padding: obj.padding.map((item) => new bn_js_1.default(item)),
        });
    }
    toEncodable() {
        return PoolHeader.toEncodable(this);
    }
}
exports.PoolHeader = PoolHeader;
//# sourceMappingURL=PoolHeader.js.map