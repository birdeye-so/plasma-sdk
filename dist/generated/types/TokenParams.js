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
exports.TokenParams = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class TokenParams {
    constructor(fields) {
        this.decimals = fields.decimals;
        this.vaultBump = fields.vaultBump;
        this.mintKey = fields.mintKey;
        this.vaultKey = fields.vaultKey;
    }
    static layout(property) {
        return borsh.struct([
            borsh.u32("decimals"),
            borsh.u32("vaultBump"),
            borsh.publicKey("mintKey"),
            borsh.publicKey("vaultKey"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new TokenParams({
            decimals: obj.decimals,
            vaultBump: obj.vaultBump,
            mintKey: obj.mintKey,
            vaultKey: obj.vaultKey,
        });
    }
    static toEncodable(fields) {
        return {
            decimals: fields.decimals,
            vaultBump: fields.vaultBump,
            mintKey: fields.mintKey,
            vaultKey: fields.vaultKey,
        };
    }
    toJSON() {
        return {
            decimals: this.decimals,
            vaultBump: this.vaultBump,
            mintKey: this.mintKey.toString(),
            vaultKey: this.vaultKey.toString(),
        };
    }
    static fromJSON(obj) {
        return new TokenParams({
            decimals: obj.decimals,
            vaultBump: obj.vaultBump,
            mintKey: new web3_js_1.PublicKey(obj.mintKey),
            vaultKey: new web3_js_1.PublicKey(obj.vaultKey),
        });
    }
    toEncodable() {
        return TokenParams.toEncodable(this);
    }
}
exports.TokenParams = TokenParams;
//# sourceMappingURL=TokenParams.js.map