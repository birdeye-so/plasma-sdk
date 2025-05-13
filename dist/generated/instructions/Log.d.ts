import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface LogAccounts {
    /** Log authority */
    logAuthority: PublicKey;
}
export declare function Log(accounts: LogAccounts, programId?: PublicKey): TransactionInstruction;
