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
exports.RemoveLiquidity = exports.layout = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
exports.layout = borsh.struct([
    types.RemoveLiquidityIxParams.layout("params"),
]);
function RemoveLiquidity(args, accounts, programId = programId_1.PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.plasmaProgram, isSigner: false, isWritable: false },
        { pubkey: accounts.logAuthority, isSigner: false, isWritable: false },
        { pubkey: accounts.pool, isSigner: false, isWritable: true },
        { pubkey: accounts.trader, isSigner: true, isWritable: false },
        { pubkey: accounts.lpPosition, isSigner: false, isWritable: true },
        { pubkey: accounts.baseAccount, isSigner: false, isWritable: true },
        { pubkey: accounts.quoteAccount, isSigner: false, isWritable: true },
        { pubkey: accounts.baseVault, isSigner: false, isWritable: true },
        { pubkey: accounts.quoteVault, isSigner: false, isWritable: true },
        { pubkey: accounts.tokenProgram, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([2]);
    const buffer = Buffer.alloc(1000);
    const len = exports.layout.encode({
        params: types.RemoveLiquidityIxParams.toEncodable(args.params),
    }, buffer);
    const data = Buffer.concat([identifier, buffer]).slice(0, 1 + len);
    const ix = new web3_js_1.TransactionInstruction({ keys, programId, data });
    return ix;
}
exports.RemoveLiquidity = RemoveLiquidity;
//# sourceMappingURL=RemoveLiquidity.js.map