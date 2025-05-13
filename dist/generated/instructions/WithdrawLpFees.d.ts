import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface WithdrawLpFeesAccounts {
    /** Plasma program */
    plasmaProgram: PublicKey;
    /** Plasma log authority */
    logAuthority: PublicKey;
    /** This account holds the pool state */
    pool: PublicKey;
    trader: PublicKey;
    lpPositionOwner: PublicKey;
    lpPosition: PublicKey;
    /** Trader quote token account */
    quoteAccount: PublicKey;
    /** Quote vault PDA, seeds are [b'vault', pool_address, quote_mint_address] */
    quoteVault: PublicKey;
    /** Token program */
    tokenProgram: PublicKey;
}
export declare function WithdrawLpFees(accounts: WithdrawLpFeesAccounts, programId?: PublicKey): TransactionInstruction;
