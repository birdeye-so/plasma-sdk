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
exports.PlasmaEventHeader = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class PlasmaEventHeader {
    constructor(fields) {
        this.sequenceNumber = fields.sequenceNumber;
        this.slot = fields.slot;
        this.timestamp = fields.timestamp;
        this.pool = fields.pool;
        this.signer = fields.signer;
        this.baseDecimals = fields.baseDecimals;
        this.quoteDecimals = fields.quoteDecimals;
    }
    static layout(property) {
        return borsh.struct([
            borsh.u64("sequenceNumber"),
            borsh.u64("slot"),
            borsh.i64("timestamp"),
            borsh.publicKey("pool"),
            borsh.publicKey("signer"),
            borsh.u8("baseDecimals"),
            borsh.u8("quoteDecimals"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new PlasmaEventHeader({
            sequenceNumber: obj.sequenceNumber,
            slot: obj.slot,
            timestamp: obj.timestamp,
            pool: obj.pool,
            signer: obj.signer,
            baseDecimals: obj.baseDecimals,
            quoteDecimals: obj.quoteDecimals,
        });
    }
    static toEncodable(fields) {
        return {
            sequenceNumber: fields.sequenceNumber,
            slot: fields.slot,
            timestamp: fields.timestamp,
            pool: fields.pool,
            signer: fields.signer,
            baseDecimals: fields.baseDecimals,
            quoteDecimals: fields.quoteDecimals,
        };
    }
    toJSON() {
        return {
            sequenceNumber: this.sequenceNumber.toString(),
            slot: this.slot.toString(),
            timestamp: this.timestamp.toString(),
            pool: this.pool.toString(),
            signer: this.signer.toString(),
            baseDecimals: this.baseDecimals,
            quoteDecimals: this.quoteDecimals,
        };
    }
    static fromJSON(obj) {
        return new PlasmaEventHeader({
            sequenceNumber: new bn_js_1.default(obj.sequenceNumber),
            slot: new bn_js_1.default(obj.slot),
            timestamp: new bn_js_1.default(obj.timestamp),
            pool: new web3_js_1.PublicKey(obj.pool),
            signer: new web3_js_1.PublicKey(obj.signer),
            baseDecimals: obj.baseDecimals,
            quoteDecimals: obj.quoteDecimals,
        });
    }
    toEncodable() {
        return PlasmaEventHeader.toEncodable(this);
    }
}
exports.PlasmaEventHeader = PlasmaEventHeader;
