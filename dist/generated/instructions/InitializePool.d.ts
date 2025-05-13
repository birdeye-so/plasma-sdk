import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import * as types from "../types";
export interface InitializePoolArgs {
    params: types.InitializePoolIxParamsFields;
}
export interface InitializePoolAccounts {
    /** Plasma program */
    plasmaProgram: PublicKey;
    /** Plasma log authority */
    logAuthority: PublicKey;
    /** This account holds the pool state */
    pool: PublicKey;
    /** The pool_creator account must sign for the creation of new vaults */
    poolCreator: PublicKey;
    /** Base mint account */
    baseMint: PublicKey;
    /** Quote mint account */
    quoteMint: PublicKey;
    /** Base vault PDA, seeds are [b'vault', pool_address, base_mint_address] */
    baseVault: PublicKey;
    /** Quote vault PDA, seeds are [b'vault', pool_address, quote_mint_address] */
    quoteVault: PublicKey;
    /** System program */
    systemProgram: PublicKey;
    /** Token program */
    tokenProgram: PublicKey;
}
export declare const layout: any;
export declare function InitializePool(args: InitializePoolArgs, accounts: InitializePoolAccounts, programId?: PublicKey): TransactionInstruction;
