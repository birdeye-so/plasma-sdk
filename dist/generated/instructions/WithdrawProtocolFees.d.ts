import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface WithdrawProtocolFeesAccounts {
    /** Plasma program */
    plasmaProgram: PublicKey;
    /** Plasma log authority */
    logAuthority: PublicKey;
    /** This account holds the pool state */
    pool: PublicKey;
    /** Recipient of protocol fees */
    protocolFeeRecipient: PublicKey;
    /** Trader quote token account */
    quoteAccount: PublicKey;
    /** Quote vault PDA, seeds are [b'vault', pool_address, quote_mint_address] */
    quoteVault: PublicKey;
    /** Token program */
    tokenProgram: PublicKey;
}
export declare function WithdrawProtocolFees(accounts: WithdrawProtocolFeesAccounts, programId?: PublicKey): TransactionInstruction;
