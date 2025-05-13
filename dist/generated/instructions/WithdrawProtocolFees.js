"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithdrawProtocolFees = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
function WithdrawProtocolFees(accounts, programId = programId_1.PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.plasmaProgram, isSigner: false, isWritable: false },
        { pubkey: accounts.logAuthority, isSigner: false, isWritable: false },
        { pubkey: accounts.pool, isSigner: false, isWritable: true },
        {
            pubkey: accounts.protocolFeeRecipient,
            isSigner: true,
            isWritable: false,
        },
        { pubkey: accounts.quoteAccount, isSigner: false, isWritable: true },
        { pubkey: accounts.quoteVault, isSigner: false, isWritable: true },
        { pubkey: accounts.tokenProgram, isSigner: false, isWritable: false },
    ];
    const identifier = Buffer.from([7]);
    const data = identifier;
    const ix = new web3_js_1.TransactionInstruction({ keys, programId, data });
    return ix;
}
exports.WithdrawProtocolFees = WithdrawProtocolFees;
//# sourceMappingURL=WithdrawProtocolFees.js.map