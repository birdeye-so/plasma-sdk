"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
function Log(accounts, programId = programId_1.PROGRAM_ID) {
    const keys = [
        { pubkey: accounts.logAuthority, isSigner: true, isWritable: false },
    ];
    const identifier = Buffer.from([8]);
    const data = identifier;
    const ix = new web3_js_1.TransactionInstruction({ keys, programId, data });
    return ix;
}
exports.Log = Log;
