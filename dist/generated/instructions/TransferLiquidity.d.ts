import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface TransferLiquidityAccounts {
    /** Plasma program */
    plasmaProgram: PublicKey;
    /** Plasma log authority */
    logAuthority: PublicKey;
    /** This account holds the pool state */
    pool: PublicKey;
    trader: PublicKey;
    srcLpPosition: PublicKey;
    dstLpPosition: PublicKey;
}
export declare function TransferLiquidity(accounts: TransferLiquidityAccounts, programId?: PublicKey): TransactionInstruction;
