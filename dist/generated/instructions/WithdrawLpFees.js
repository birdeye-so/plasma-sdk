"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithdrawLpFees = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
function WithdrawLpFees(accounts, programId = programId_1.PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.plasmaProgram, isSigner: false, isWritable: false },
        { pubkey: accounts.logAuthority, isSigner: false, isWritable: false },
        { pubkey: accounts.pool, isSigner: false, isWritable: true },
        { pubkey: accounts.trader, isSigner: true, isWritable: false },
        { pubkey: accounts.lpPositionOwner, isSigner: false, isWritable: false },
        { pubkey: accounts.lpPosition, isSigner: false, isWritable: true },
        { pubkey: accounts.quoteAccount, isSigner: false, isWritable: true },
        { pubkey: accounts.quoteVault, isSigner: false, isWritable: true },
        { pubkey: accounts.tokenProgram, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([4]);
    const data = identifier;
    const ix = new web3_js_1.TransactionInstruction({ keys, programId, data });
    return ix;
}
exports.WithdrawLpFees = WithdrawLpFees;
//# sourceMappingURL=WithdrawLpFees.js.map