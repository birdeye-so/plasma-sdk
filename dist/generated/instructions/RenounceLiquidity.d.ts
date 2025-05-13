import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import * as types from "../types";
export interface RenounceLiquidityArgs {
    params: types.RenounceLiquidityIxParamsFields;
}
export interface RenounceLiquidityAccounts {
    /** Plasma program */
    plasmaProgram: PublicKey;
    /** Plasma log authority */
    logAuthority: PublicKey;
    /** This account holds the pool state */
    pool: PublicKey;
    trader: PublicKey;
    lpPosition: PublicKey;
}
export declare const layout: any;
export declare function RenounceLiquidity(args: RenounceLiquidityArgs, accounts: RenounceLiquidityAccounts, programId?: PublicKey): TransactionInstruction;
