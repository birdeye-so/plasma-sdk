import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface InitializeLpPositionAccounts {
    /** Plasma program */
    plasmaProgram: PublicKey;
    /** Plasma log authority */
    logAuthority: PublicKey;
    /** This account holds the pool state */
    pool: PublicKey;
    payer: PublicKey;
    lpPositionOwner: PublicKey;
    lpPosition: PublicKey;
    /** System program */
    systemProgram: PublicKey;
}
export declare function InitializeLpPosition(accounts: InitializeLpPositionAccounts, programId?: PublicKey): TransactionInstruction;
