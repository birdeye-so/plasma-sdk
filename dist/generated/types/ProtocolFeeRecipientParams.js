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
exports.ProtocolFeeRecipientParams = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class ProtocolFeeRecipientParams {
    constructor(fields) {
        this.recipient = fields.recipient;
        this.shares = fields.shares;
    }
    static layout(property) {
        return borsh.struct([borsh.publicKey("recipient"), borsh.u64("shares")], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new ProtocolFeeRecipientParams({
            recipient: obj.recipient,
            shares: obj.shares,
        });
    }
    static toEncodable(fields) {
        return {
            recipient: fields.recipient,
            shares: fields.shares,
        };
    }
    toJSON() {
        return {
            recipient: this.recipient.toString(),
            shares: this.shares.toString(),
        };
    }
    static fromJSON(obj) {
        return new ProtocolFeeRecipientParams({
            recipient: new web3_js_1.PublicKey(obj.recipient),
            shares: new bn_js_1.default(obj.shares),
        });
    }
    toEncodable() {
        return ProtocolFeeRecipientParams.toEncodable(this);
    }
}
exports.ProtocolFeeRecipientParams = ProtocolFeeRecipientParams;
//# sourceMappingURL=ProtocolFeeRecipientParams.js.map