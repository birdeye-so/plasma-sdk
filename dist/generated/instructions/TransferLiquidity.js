"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransferLiquidity = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
function TransferLiquidity(accounts, programId = programId_1.PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.plasmaProgram, isSigner: false, isWritable: false },
        { pubkey: accounts.logAuthority, isSigner: false, isWritable: false },
        { pubkey: accounts.pool, isSigner: false, isWritable: true },
        { pubkey: accounts.trader, isSigner: true, isWritable: false },
        { pubkey: accounts.srcLpPosition, isSigner: false, isWritable: true },
        { pubkey: accounts.dstLpPosition, isSigner: false, isWritable: true },
    ];
    const identifier = Buffer.from([9]);
    const data = identifier;
    const ix = new web3_js_1.TransactionInstruction({ keys, programId, data });
    return ix;
}
exports.TransferLiquidity = TransferLiquidity;
//# sourceMappingURL=TransferLiquidity.js.map