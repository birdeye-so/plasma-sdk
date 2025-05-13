import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import * as types from "../types";
export interface RemoveLiquidityArgs {
    params: types.RemoveLiquidityIxParamsFields;
}
export interface RemoveLiquidityAccounts {
    /** Plasma program */
    plasmaProgram: PublicKey;
    /** Plasma log authority */
    logAuthority: PublicKey;
    /** This account holds the pool state */
    pool: PublicKey;
    trader: PublicKey;
    lpPosition: PublicKey;
    /** Trader base token account */
    baseAccount: PublicKey;
    /** Trader quote token account */
    quoteAccount: PublicKey;
    /** Base vault PDA, seeds are [b'vault', pool_address, base_mint_address] */
    baseVault: PublicKey;
    /** Quote vault PDA, seeds are [b'vault', pool_address, quote_mint_address] */
    quoteVault: PublicKey;
    /** Token program */
    tokenProgram: PublicKey;
}
export declare const layout: any;
export declare function RemoveLiquidity(args: RemoveLiquidityArgs, accounts: RemoveLiquidityAccounts, programId?: PublicKey): TransactionInstruction;
