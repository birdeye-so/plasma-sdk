"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqrt = void 0;
const programId_1 = require("../generated/programId");
const web3_js_1 = require("@solana/web3.js");
const spl_token_1 = require("@solana/spl-token");
const instructions_1 = require("../generated/instructions");
const accounts_1 = require("../generated/accounts");
const bn_js_1 = __importDefault(require("bn.js"));
const types_1 = require("../generated/types");
const assert_1 = __importDefault(require("assert"));
const SwapType_1 = require("../generated/types/SwapType");
const FixedPoint_1 = require("../util/FixedPoint");
// We'll assume the following constants for the the initial liquidity deposit
const GRADUATION_AMOUNT = 279900000000000;
const GRADUATION_SOL_AMOUNT = 100000000000;
const AMM_SIZE = 8 + 8 + 16 + 8 + 8 + 8 + 8 + 8 + 8 + 8 + 8; // fee, protocol allocation, reward factor, total lp shares, slot snapshot, base reserves snapshot, quote reserves snapshot, base reserves, quote reserves, cumulative quote lp fees, cumulative quote protocol fees
const TOKEN_PARAMS_SIZE = 4 + 4 + 32 + 32; // decimals, vault bump, mint key, vault key
const PROTOCOL_FEE_RECIPIENTS_SIZE = (32 + 8 + 8 + 8) * 3 + 12 * 8; // Recipient, shares, total fees, collected fees times 3 plus 12 u64s padding
const POOL_HEADER_SIZE = 8 + 8 + 2 * TOKEN_PARAMS_SIZE + PROTOCOL_FEE_RECIPIENTS_SIZE + 13 * 8; // Discriminator, sequence number, base params, quote params, fee recipients, padding
const LOG_AUTHORITY = web3_js_1.PublicKey.findProgramAddressSync([Buffer.from("log")], programId_1.PROGRAM_ID)[0];
const sqrt = (num) => {
    if (num.lt(new bn_js_1.default(0))) {
        throw new Error("Sqrt only works on non-negative inputs");
    }
    if (num.lt(new bn_js_1.default(2))) {
        return num;
    }
    const smallCand = (0, exports.sqrt)(num.shrn(2)).shln(1);
    const largeCand = smallCand.add(new bn_js_1.default(1));
    if (largeCand.mul(largeCand).gt(num)) {
        return smallCand;
    }
    else {
        return largeCand;
    }
};
exports.sqrt = sqrt;
const bootstrapTrader = async (c, mintPubkey) => {
    const trader = web3_js_1.Keypair.generate();
    const airdropTx = await c.requestAirdrop(trader.publicKey, 500000000000);
    await c.confirmTransaction(airdropTx, "confirmed");
    const mintAtaTrader = await (0, spl_token_1.getAssociatedTokenAddress)(mintPubkey, trader.publicKey);
    const wSolAtaTrader = await (0, spl_token_1.getAssociatedTokenAddress)(spl_token_1.NATIVE_MINT, trader.publicKey);
    const initTraderTx = new web3_js_1.Transaction()
        .add((0, spl_token_1.createAssociatedTokenAccountInstruction)(trader.publicKey, mintAtaTrader, trader.publicKey, mintPubkey))
        .add((0, spl_token_1.createAssociatedTokenAccountInstruction)(trader.publicKey, wSolAtaTrader, trader.publicKey, spl_token_1.NATIVE_MINT))
        .add(web3_js_1.SystemProgram.transfer({
        fromPubkey: trader.publicKey,
        toPubkey: wSolAtaTrader,
        lamports: 100000000000, // 100 SOL
    }))
        .add((0, spl_token_1.createSyncNativeInstruction)(wSolAtaTrader));
    await (0, web3_js_1.sendAndConfirmTransaction)(c, initTraderTx, [trader], {
        commitment: "confirmed",
        skipPreflight: true,
    });
    return [trader, mintAtaTrader, wSolAtaTrader];
};
const initPool = async (c, poolKeypair, payer, mintPubkey, mintAtaPayer, wSolAtaPayer, initialLpShares, feeRecipients) => {
    const initTx = new web3_js_1.Transaction()
        .add(web3_js_1.SystemProgram.createAccount({
        fromPubkey: payer.publicKey,
        newAccountPubkey: poolKeypair.publicKey,
        lamports: await c.getMinimumBalanceForRentExemption(POOL_HEADER_SIZE + AMM_SIZE),
        space: POOL_HEADER_SIZE + AMM_SIZE,
        programId: programId_1.PROGRAM_ID,
    }))
        .add((0, instructions_1.InitializePool)({
        params: {
            lpFeeInBps: new bn_js_1.default(25),
            protocolLpFeeAllocationInPct: new bn_js_1.default(10),
            feeRecipientsParams: feeRecipients,
            numSlotsToVestLpShares: new bn_js_1.default(1),
        },
    }, {
        plasmaProgram: programId_1.PROGRAM_ID,
        logAuthority: LOG_AUTHORITY,
        pool: poolKeypair.publicKey,
        poolCreator: payer.publicKey,
        baseMint: mintPubkey,
        quoteMint: spl_token_1.NATIVE_MINT,
        baseVault: web3_js_1.PublicKey.findProgramAddressSync([
            Buffer.from("vault"),
            poolKeypair.publicKey.toBuffer(),
            mintPubkey.toBuffer(),
        ], programId_1.PROGRAM_ID)[0],
        quoteVault: web3_js_1.PublicKey.findProgramAddressSync([
            Buffer.from("vault"),
            poolKeypair.publicKey.toBuffer(),
            spl_token_1.NATIVE_MINT.toBuffer(),
        ], programId_1.PROGRAM_ID)[0],
        systemProgram: web3_js_1.SystemProgram.programId,
        tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
    }))
        .add((0, instructions_1.InitializeLpPosition)({
        plasmaProgram: programId_1.PROGRAM_ID,
        logAuthority: LOG_AUTHORITY,
        pool: poolKeypair.publicKey,
        payer: payer.publicKey,
        lpPositionOwner: payer.publicKey,
        lpPosition: web3_js_1.PublicKey.findProgramAddressSync([
            Buffer.from("lp_position"),
            poolKeypair.publicKey.toBuffer(),
            payer.publicKey.toBuffer(),
        ], programId_1.PROGRAM_ID)[0],
        systemProgram: web3_js_1.SystemProgram.programId,
    }))
        .add((0, instructions_1.AddLiquidity)({
        params: {
            desiredBaseAmountIn: new bn_js_1.default(GRADUATION_AMOUNT),
            desiredQuoteAmountIn: new bn_js_1.default(GRADUATION_SOL_AMOUNT),
            initialLpShares,
        },
    }, {
        plasmaProgram: programId_1.PROGRAM_ID,
        logAuthority: LOG_AUTHORITY,
        pool: poolKeypair.publicKey,
        trader: payer.publicKey,
        lpPosition: web3_js_1.PublicKey.findProgramAddressSync([
            Buffer.from("lp_position"),
            poolKeypair.publicKey.toBuffer(),
            payer.publicKey.toBuffer(),
        ], programId_1.PROGRAM_ID)[0],
        baseAccount: mintAtaPayer,
        quoteAccount: wSolAtaPayer,
        baseVault: web3_js_1.PublicKey.findProgramAddressSync([
            Buffer.from("vault"),
            poolKeypair.publicKey.toBuffer(),
            mintPubkey.toBuffer(),
        ], programId_1.PROGRAM_ID)[0],
        quoteVault: web3_js_1.PublicKey.findProgramAddressSync([
            Buffer.from("vault"),
            poolKeypair.publicKey.toBuffer(),
            spl_token_1.NATIVE_MINT.toBuffer(),
        ], programId_1.PROGRAM_ID)[0],
        tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
    }))
        .add((0, instructions_1.RenounceLiquidity)({
        params: {
            allowFeeWithdrawal: true,
        },
    }, {
        plasmaProgram: programId_1.PROGRAM_ID,
        logAuthority: LOG_AUTHORITY,
        pool: poolKeypair.publicKey,
        trader: payer.publicKey,
        lpPosition: web3_js_1.PublicKey.findProgramAddressSync([
            Buffer.from("lp_position"),
            poolKeypair.publicKey.toBuffer(),
            payer.publicKey.toBuffer(),
        ], programId_1.PROGRAM_ID)[0],
    }));
    await (0, web3_js_1.sendAndConfirmTransaction)(c, initTx, [payer, poolKeypair], {
        commitment: "confirmed",
        skipPreflight: true,
    });
    return [mintPubkey, mintAtaPayer, wSolAtaPayer];
};
const setupMint = async (c, payer) => {
    const mintKeypair = web3_js_1.Keypair.generate();
    const mintAtaPayer = await (0, spl_token_1.getAssociatedTokenAddress)(mintKeypair.publicKey, payer.publicKey);
    const wSolAtaPayer = await (0, spl_token_1.getAssociatedTokenAddress)(spl_token_1.NATIVE_MINT, payer.publicKey);
    const initMintTx = new web3_js_1.Transaction()
        .add(web3_js_1.SystemProgram.createAccount({
        fromPubkey: payer.publicKey,
        newAccountPubkey: mintKeypair.publicKey,
        lamports: await c.getMinimumBalanceForRentExemption(spl_token_1.MintLayout.span),
        space: spl_token_1.MintLayout.span,
        programId: spl_token_1.TOKEN_PROGRAM_ID,
    }))
        .add((0, spl_token_1.createInitializeMintInstruction)(mintKeypair.publicKey, 6, payer.publicKey, null))
        .add((0, spl_token_1.createAssociatedTokenAccountInstruction)(payer.publicKey, mintAtaPayer, payer.publicKey, mintKeypair.publicKey))
        .add((0, spl_token_1.createAssociatedTokenAccountInstruction)(payer.publicKey, wSolAtaPayer, payer.publicKey, spl_token_1.NATIVE_MINT))
        .add(web3_js_1.SystemProgram.transfer({
        fromPubkey: payer.publicKey,
        toPubkey: wSolAtaPayer,
        lamports: GRADUATION_SOL_AMOUNT * 2,
    }))
        .add((0, spl_token_1.createSyncNativeInstruction)(wSolAtaPayer))
        .add((0, spl_token_1.createMintToInstruction)(mintKeypair.publicKey, mintAtaPayer, payer.publicKey, GRADUATION_AMOUNT * 2));
    await (0, web3_js_1.sendAndConfirmTransaction)(c, initMintTx, [payer, mintKeypair], {
        commitment: "confirmed",
    });
    return [mintKeypair.publicKey, mintAtaPayer, wSolAtaPayer];
};
describe("Plasma AMM", async () => {
    const c = new web3_js_1.Connection("http://127.0.0.1:8899", "confirmed");
    const payer = web3_js_1.Keypair.generate();
    const traders = [];
    let mintPubkey;
    let mintAtaPayer;
    let wSolAtaPayer;
    let poolKey;
    let poolKeyCopy;
    before(async () => {
        console.log("Airdropping to payer");
        const airdropTx = await c.requestAirdrop(payer.publicKey, 1000000000000);
        console.log("Confirming airdrop");
        await c.confirmTransaction(airdropTx, "confirmed");
        [mintPubkey, mintAtaPayer, wSolAtaPayer] = await setupMint(c, payer);
        for (let i = 0; i < 4; i++) {
            traders.push(await bootstrapTrader(c, mintPubkey));
        }
    });
    describe("Pool Initialization", () => {
        it("should fail to initialize the pool if protocol fee recipients are the same", async () => {
            const initialLpShares = (0, exports.sqrt)(new bn_js_1.default(GRADUATION_AMOUNT).mul(new bn_js_1.default(GRADUATION_SOL_AMOUNT)));
            const feeRecipients = [
                new types_1.ProtocolFeeRecipientParams({
                    recipient: traders[0][0].publicKey,
                    shares: new bn_js_1.default(100),
                }),
                new types_1.ProtocolFeeRecipientParams({
                    recipient: traders[0][0].publicKey,
                    shares: new bn_js_1.default(100),
                }),
                new types_1.ProtocolFeeRecipientParams({
                    recipient: traders[0][0].publicKey,
                    shares: new bn_js_1.default(100),
                }),
            ];
            const poolKeypair = web3_js_1.Keypair.generate();
            try {
                await initPool(c, poolKeypair, payer, mintPubkey, mintAtaPayer, wSolAtaPayer, initialLpShares, feeRecipients);
                (0, assert_1.default)(false);
            }
            catch (err) { }
        });
        it("should initialize the pool and deposit initial liquidity", async () => {
            const initialLpShares = (0, exports.sqrt)(new bn_js_1.default(GRADUATION_AMOUNT).mul(new bn_js_1.default(GRADUATION_SOL_AMOUNT)));
            const feeRecipients = [
                new types_1.ProtocolFeeRecipientParams({
                    recipient: traders[0][0].publicKey,
                    shares: new bn_js_1.default(100),
                }),
                new types_1.ProtocolFeeRecipientParams({
                    recipient: traders[1][0].publicKey,
                    shares: new bn_js_1.default(100),
                }),
                new types_1.ProtocolFeeRecipientParams({
                    recipient: traders[2][0].publicKey,
                    shares: new bn_js_1.default(100),
                }),
            ];
            const poolKeypair = web3_js_1.Keypair.generate();
            await initPool(c, poolKeypair, payer, mintPubkey, mintAtaPayer, wSolAtaPayer, initialLpShares, feeRecipients);
            poolKey = poolKeypair.publicKey;
            // Create a copy of the pool to test sandwich attacks
            const poolKeypairCopy = web3_js_1.Keypair.generate();
            await initPool(c, poolKeypairCopy, payer, mintPubkey, mintAtaPayer, wSolAtaPayer, initialLpShares, feeRecipients);
            poolKeyCopy = poolKeypairCopy.publicKey;
            try {
                const removeLiqTx = new web3_js_1.Transaction().add((0, instructions_1.RemoveLiquidity)({
                    params: {
                        lpShares: initialLpShares,
                    },
                }, {
                    plasmaProgram: programId_1.PROGRAM_ID,
                    logAuthority: LOG_AUTHORITY,
                    pool: poolKeypair.publicKey,
                    trader: payer.publicKey,
                    lpPosition: web3_js_1.PublicKey.findProgramAddressSync([
                        Buffer.from("lp_position"),
                        poolKeypair.publicKey.toBuffer(),
                        payer.publicKey.toBuffer(),
                    ], programId_1.PROGRAM_ID)[0],
                    baseAccount: mintAtaPayer,
                    quoteAccount: wSolAtaPayer,
                    baseVault: web3_js_1.PublicKey.findProgramAddressSync([
                        Buffer.from("vault"),
                        poolKeypair.publicKey.toBuffer(),
                        mintPubkey.toBuffer(),
                    ], programId_1.PROGRAM_ID)[0],
                    quoteVault: web3_js_1.PublicKey.findProgramAddressSync([
                        Buffer.from("vault"),
                        poolKeypair.publicKey.toBuffer(),
                        spl_token_1.NATIVE_MINT.toBuffer(),
                    ], programId_1.PROGRAM_ID)[0],
                    tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
                }));
                await (0, web3_js_1.sendAndConfirmTransaction)(c, removeLiqTx, [payer], {
                    commitment: "confirmed",
                });
                (0, assert_1.default)(false);
            }
            catch (err) { }
        });
    });
    describe("Test Sandwich Attack Prevention", () => {
        it("TEST: show that sandwiches across slot windows are still profitable", async () => {
            const [attacker, mintAtaAttacker, wSolAtaAttacker] = traders[0];
            const [victim, mintAtaVictim, wSolAtaVictim] = traders[1];
            const attackerStartingBalance = new bn_js_1.default((await c.getTokenAccountBalance(wSolAtaAttacker, "confirmed")).value.amount);
            console.log(`\t 😈 Attacker starting balance: ${(attackerStartingBalance.toNumber() / 1e9).toString()} SOL`);
            console.log();
            console.log(`\t ---- BEGIN ATTACK ----`);
            console.log();
            let atomicFrontrunTx = new web3_js_1.Transaction()
                .add((0, instructions_1.Swap)({
                params: {
                    side: new types_1.Side.Buy(),
                    swapType: new SwapType_1.ExactIn({
                        amountIn: new bn_js_1.default(2000000000),
                        minAmountOut: new bn_js_1.default(0),
                    }),
                },
            }, {
                plasmaProgram: programId_1.PROGRAM_ID,
                logAuthority: LOG_AUTHORITY,
                pool: poolKey,
                trader: attacker.publicKey,
                baseAccount: mintAtaAttacker,
                quoteAccount: wSolAtaAttacker,
                baseVault: web3_js_1.PublicKey.findProgramAddressSync([
                    Buffer.from("vault"),
                    poolKey.toBuffer(),
                    mintPubkey.toBuffer(),
                ], programId_1.PROGRAM_ID)[0],
                quoteVault: web3_js_1.PublicKey.findProgramAddressSync([
                    Buffer.from("vault"),
                    poolKey.toBuffer(),
                    spl_token_1.NATIVE_MINT.toBuffer(),
                ], programId_1.PROGRAM_ID)[0],
                tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
            }))
                .add((0, instructions_1.Swap)({
                params: {
                    side: new types_1.Side.Buy(),
                    swapType: new SwapType_1.ExactIn({
                        amountIn: new bn_js_1.default(1000000000),
                        minAmountOut: new bn_js_1.default(0),
                    }),
                },
            }, {
                plasmaProgram: programId_1.PROGRAM_ID,
                logAuthority: LOG_AUTHORITY,
                pool: poolKey,
                trader: victim.publicKey,
                baseAccount: mintAtaVictim,
                quoteAccount: wSolAtaVictim,
                baseVault: web3_js_1.PublicKey.findProgramAddressSync([
                    Buffer.from("vault"),
                    poolKey.toBuffer(),
                    mintPubkey.toBuffer(),
                ], programId_1.PROGRAM_ID)[0],
                quoteVault: web3_js_1.PublicKey.findProgramAddressSync([
                    Buffer.from("vault"),
                    poolKey.toBuffer(),
                    spl_token_1.NATIVE_MINT.toBuffer(),
                ], programId_1.PROGRAM_ID)[0],
                tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
            }));
            const txId = await (0, web3_js_1.sendAndConfirmTransaction)(c, atomicFrontrunTx, [attacker, victim], {
                commitment: "confirmed",
                skipPreflight: true,
            });
            const attackerMintBalance = new bn_js_1.default((await c.getTokenAccountBalance(mintAtaAttacker, "confirmed")).value.amount);
            const currentSlot = await c.getSlot("confirmed");
            console.log(`\t Current slot: ${currentSlot} (next slot window: ${((currentSlot + 4) / 4) * 4})`);
            const attackerIntermidiateSolBalance = new bn_js_1.default((await c.getTokenAccountBalance(wSolAtaAttacker, "confirmed")).value.amount);
            const victimMintBalance = new bn_js_1.default((await c.getTokenAccountBalance(mintAtaVictim, "confirmed")).value.amount);
            console.log(`\t 😈 Attacker swapped 2 SOL for ${attackerMintBalance.toNumber() / 1e6} tokens`);
            console.log(`\t 😇 Victim swapped 1 SOL for ${victimMintBalance.toNumber() / 1e6} tokens`);
            const txContents = await c.getTransaction(txId, {
                commitment: "confirmed",
                maxSupportedTransactionVersion: 0,
            });
            if (txContents === null || !txContents?.slot) {
                new Error("Transaction not found");
            }
            const txSnapshotSlot = ((txContents?.slot || 0) >> 2) << 2;
            // Spin until we are confident that the pool has reset
            while ((await c.getSlot("confirmed")) < txSnapshotSlot + 4) { }
            let atomicBackrunTx = new web3_js_1.Transaction().add((0, instructions_1.Swap)({
                params: {
                    side: new types_1.Side.Sell(),
                    swapType: new SwapType_1.ExactIn({
                        amountIn: attackerMintBalance,
                        minAmountOut: new bn_js_1.default(2000000000),
                    }),
                },
            }, {
                plasmaProgram: programId_1.PROGRAM_ID,
                logAuthority: LOG_AUTHORITY,
                pool: poolKey,
                trader: attacker.publicKey,
                baseAccount: mintAtaAttacker,
                quoteAccount: wSolAtaAttacker,
                baseVault: web3_js_1.PublicKey.findProgramAddressSync([Buffer.from("vault"), poolKey.toBuffer(), mintPubkey.toBuffer()], programId_1.PROGRAM_ID)[0],
                quoteVault: web3_js_1.PublicKey.findProgramAddressSync([
                    Buffer.from("vault"),
                    poolKey.toBuffer(),
                    spl_token_1.NATIVE_MINT.toBuffer(),
                ], programId_1.PROGRAM_ID)[0],
                tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
            }));
            await (0, web3_js_1.sendAndConfirmTransaction)(c, atomicBackrunTx, [attacker], {
                commitment: "confirmed",
                skipPreflight: true,
            });
            const attackerRemainingMintBalance = new bn_js_1.default((await c.getTokenAccountBalance(mintAtaAttacker, "confirmed")).value.amount);
            (0, assert_1.default)(attackerRemainingMintBalance.eq(new bn_js_1.default(0)));
            const attackerEndingBalance = new bn_js_1.default((await c.getTokenAccountBalance(wSolAtaAttacker, "confirmed")).value.amount);
            console.log();
            console.log(`\t ---- WAIT UNTIL THE NEXT SLOT WINDOW ----`);
            console.log();
            console.log(`\t Current slot: ${txSnapshotSlot + 4}`);
            console.log(`\t 😈 Attacker swapped ${attackerMintBalance.toNumber() / 1e6} tokens for ${attackerEndingBalance.sub(attackerIntermidiateSolBalance).toNumber() /
                1e9} SOL`);
            console.log();
            console.log(`\t ---- FINAL RESULT ----`);
            console.log();
            console.log(`\t 😈 Attacker ending balance: ${attackerEndingBalance.toNumber() / 1e9} SOL`);
            console.log(`\t 😈 Attacker made a profit of ${(attackerEndingBalance.toNumber() -
                attackerStartingBalance.toNumber()) /
                1e9} SOL`);
            console.log();
            console.log("\t ❌❌❌ 🙅🙅🙅 😭😭😭");
            (0, assert_1.default)(attackerEndingBalance.gt(attackerStartingBalance));
        });
        it("TEST: show that sandwiches in the same slot window are no longer profitable", async () => {
            const [attacker, mintAtaAttacker, wSolAtaAttacker] = traders[2];
            const [victim, mintAtaVictim, wSolAtaVictim] = traders[3];
            // Wait until the current slot is divisible by 4 (on the boundary).
            // Note that this is a bit of a hack and it would be far better to test this behavior in a more controlled environment
            // like solana-program-test or bankrun where we can control the clock
            while ((await c.getSlot("confirmed")) % 4 != 0) { }
            const attackerStartingBalance = new bn_js_1.default((await c.getTokenAccountBalance(wSolAtaAttacker, "confirmed")).value.amount);
            console.log(`\t 😈 Attacker starting balance: ${(attackerStartingBalance.toNumber() / 1e9).toString()} SOL`);
            console.log();
            console.log(`\t ---- BEGIN ATTACK ----`);
            console.log();
            const slot = await c.getSlot("confirmed");
            let atomicFrontrunTx = new web3_js_1.Transaction()
                .add((0, instructions_1.Swap)({
                params: {
                    side: new types_1.Side.Buy(),
                    swapType: new SwapType_1.ExactIn({
                        amountIn: new bn_js_1.default(2000000000),
                        minAmountOut: new bn_js_1.default(0),
                    }),
                },
            }, {
                plasmaProgram: programId_1.PROGRAM_ID,
                logAuthority: LOG_AUTHORITY,
                pool: poolKeyCopy,
                trader: attacker.publicKey,
                baseAccount: mintAtaAttacker,
                quoteAccount: wSolAtaAttacker,
                baseVault: web3_js_1.PublicKey.findProgramAddressSync([
                    Buffer.from("vault"),
                    poolKeyCopy.toBuffer(),
                    mintPubkey.toBuffer(),
                ], programId_1.PROGRAM_ID)[0],
                quoteVault: web3_js_1.PublicKey.findProgramAddressSync([
                    Buffer.from("vault"),
                    poolKeyCopy.toBuffer(),
                    spl_token_1.NATIVE_MINT.toBuffer(),
                ], programId_1.PROGRAM_ID)[0],
                tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
            }))
                .add((0, instructions_1.Swap)({
                params: {
                    side: new types_1.Side.Buy(),
                    swapType: new SwapType_1.ExactIn({
                        amountIn: new bn_js_1.default(1000000000),
                        minAmountOut: new bn_js_1.default(0),
                    }),
                },
            }, {
                plasmaProgram: programId_1.PROGRAM_ID,
                logAuthority: LOG_AUTHORITY,
                pool: poolKeyCopy,
                trader: victim.publicKey,
                baseAccount: mintAtaVictim,
                quoteAccount: wSolAtaVictim,
                baseVault: web3_js_1.PublicKey.findProgramAddressSync([
                    Buffer.from("vault"),
                    poolKeyCopy.toBuffer(),
                    mintPubkey.toBuffer(),
                ], programId_1.PROGRAM_ID)[0],
                quoteVault: web3_js_1.PublicKey.findProgramAddressSync([
                    Buffer.from("vault"),
                    poolKeyCopy.toBuffer(),
                    spl_token_1.NATIVE_MINT.toBuffer(),
                ], programId_1.PROGRAM_ID)[0],
                tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
            }));
            await (0, web3_js_1.sendAndConfirmTransaction)(c, atomicFrontrunTx, [attacker, victim], {
                commitment: "confirmed",
                skipPreflight: true,
            });
            const attackerMintBalance = new bn_js_1.default((await c.getTokenAccountBalance(mintAtaAttacker, "confirmed")).value.amount);
            console.log(`\t Current slot: ${slot} (next slot window: ${((slot + 4) / 4) * 4})`);
            const attackerIntermidiateSolBalance = new bn_js_1.default((await c.getTokenAccountBalance(wSolAtaAttacker, "confirmed")).value.amount);
            const victimMintBalance = new bn_js_1.default((await c.getTokenAccountBalance(mintAtaVictim, "confirmed")).value.amount);
            console.log(`\t 😈 Attacker swapped 2 SOL for ${attackerMintBalance.toNumber() / 1e6} tokens`);
            console.log(`\t 😇 Victim swapped 1 SOL for ${victimMintBalance.toNumber() / 1e6} tokens`);
            let atomicBackrunTx = new web3_js_1.Transaction().add((0, instructions_1.Swap)({
                params: {
                    side: new types_1.Side.Sell(),
                    swapType: new SwapType_1.ExactIn({
                        amountIn: attackerMintBalance,
                        minAmountOut: new bn_js_1.default(0),
                    }),
                },
            }, {
                plasmaProgram: programId_1.PROGRAM_ID,
                logAuthority: LOG_AUTHORITY,
                pool: poolKeyCopy,
                trader: attacker.publicKey,
                baseAccount: mintAtaAttacker,
                quoteAccount: wSolAtaAttacker,
                baseVault: web3_js_1.PublicKey.findProgramAddressSync([
                    Buffer.from("vault"),
                    poolKeyCopy.toBuffer(),
                    mintPubkey.toBuffer(),
                ], programId_1.PROGRAM_ID)[0],
                quoteVault: web3_js_1.PublicKey.findProgramAddressSync([
                    Buffer.from("vault"),
                    poolKeyCopy.toBuffer(),
                    spl_token_1.NATIVE_MINT.toBuffer(),
                ], programId_1.PROGRAM_ID)[0],
                tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
            }));
            await (0, web3_js_1.sendAndConfirmTransaction)(c, atomicBackrunTx, [attacker], {
                commitment: "confirmed",
                skipPreflight: true,
            });
            const attackerRemainingMintBalance = new bn_js_1.default((await c.getTokenAccountBalance(mintAtaAttacker, "confirmed")).value.amount);
            (0, assert_1.default)(attackerRemainingMintBalance.eq(new bn_js_1.default(0)));
            const attackerEndingBalance = new bn_js_1.default((await c.getTokenAccountBalance(wSolAtaAttacker, "confirmed")).value.amount);
            console.log();
            console.log(`\t ---- ATTEMPT TO IMMEDIATELY SANDWICH VICTIM ----`);
            console.log();
            console.log(`\t 😈 Attacker swapped ${attackerMintBalance.toNumber() / 1e6} tokens for ${attackerEndingBalance.sub(attackerIntermidiateSolBalance).toNumber() /
                1e9} SOL`);
            console.log();
            console.log(`\t ---- FINAL RESULT ----`);
            console.log();
            console.log(`\t 😈 Attacker ending balance: ${attackerEndingBalance.toNumber() / 1e9} SOL`);
            console.log(`\t 😈 Attacker lost ${(attackerStartingBalance.toNumber() -
                attackerEndingBalance.toNumber()) /
                1e9} SOL`);
            console.log();
            console.log("\t ✅✅✅ 🥳🥳🥳 🖕🖕🖕");
            (0, assert_1.default)(attackerEndingBalance.lt(attackerStartingBalance));
        });
    });
    describe("Fees", () => {
        it("should accumulate fees for a LP", async () => {
            // Perform some swaps to generate fees
            const swapper = traders[0][0];
            const swapperMintAta = traders[0][1];
            const swapperWsolAta = traders[0][2];
            for (let i = 0; i < 5; i++) {
                const swapTx = new web3_js_1.Transaction().add((0, instructions_1.Swap)({
                    params: {
                        side: new types_1.Side.Buy(),
                        swapType: new SwapType_1.ExactIn({
                            amountIn: new bn_js_1.default(2000000000),
                            minAmountOut: new bn_js_1.default(0),
                        }),
                    },
                }, {
                    plasmaProgram: programId_1.PROGRAM_ID,
                    logAuthority: LOG_AUTHORITY,
                    pool: poolKey,
                    trader: swapper.publicKey,
                    baseAccount: swapperMintAta,
                    quoteAccount: swapperWsolAta,
                    baseVault: web3_js_1.PublicKey.findProgramAddressSync([
                        Buffer.from("vault"),
                        poolKey.toBuffer(),
                        mintPubkey.toBuffer(),
                    ], programId_1.PROGRAM_ID)[0],
                    quoteVault: web3_js_1.PublicKey.findProgramAddressSync([
                        Buffer.from("vault"),
                        poolKey.toBuffer(),
                        spl_token_1.NATIVE_MINT.toBuffer(),
                    ], programId_1.PROGRAM_ID)[0],
                    tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
                }));
                await (0, web3_js_1.sendAndConfirmTransaction)(c, swapTx, [swapper], {
                    commitment: "confirmed",
                });
            }
            // Check if fees have accumulated
            const poolAccount = await accounts_1.PoolAccount.fetch(c, poolKey);
            if (!poolAccount) {
                throw new Error("Pool account not found");
            }
            const lpPositionAddress = web3_js_1.PublicKey.findProgramAddressSync([
                Buffer.from("lp_position"),
                poolKey.toBuffer(),
                payer.publicKey.toBuffer(),
            ], programId_1.PROGRAM_ID)[0];
            const lpPositionBefore = await accounts_1.LpPositionAccount.fetch(c, lpPositionAddress);
            // Check fees accumulated for the LP
            if (!lpPositionBefore) {
                throw new Error("LP position account not found");
            }
            const poolRewardFactor = new FixedPoint_1.FixedPoint(poolAccount.amm.rewardFactor);
            const lpRewardFactorSnapshot = new FixedPoint_1.FixedPoint(lpPositionBefore.lpPosition.rewardFactorSnapshot);
            const rewardDiff = poolRewardFactor.toNumber() - lpRewardFactorSnapshot.toNumber();
            const expectedReward = rewardDiff * lpPositionBefore.lpPosition.lpShares.toNumber();
            // Claim fees
            const withdrawLpFeesTx = new web3_js_1.Transaction().add((0, instructions_1.WithdrawLpFees)({
                plasmaProgram: programId_1.PROGRAM_ID,
                logAuthority: LOG_AUTHORITY,
                pool: poolKey,
                trader: payer.publicKey,
                lpPositionOwner: payer.publicKey,
                lpPosition: lpPositionAddress,
                quoteAccount: wSolAtaPayer,
                quoteVault: web3_js_1.PublicKey.findProgramAddressSync([
                    Buffer.from("vault"),
                    poolKey.toBuffer(),
                    spl_token_1.NATIVE_MINT.toBuffer(),
                ], programId_1.PROGRAM_ID)[0],
                tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
            }, programId_1.PROGRAM_ID));
            await (0, web3_js_1.sendAndConfirmTransaction)(c, withdrawLpFeesTx, [payer], {
                commitment: "confirmed",
            });
            // Fetch the LP position account
            const lpPositionAfter = await accounts_1.LpPositionAccount.fetch(c, lpPositionAddress);
            if (!lpPositionAfter) {
                throw new Error("LP position account not found");
            }
            (0, assert_1.default)(lpPositionAfter.lpPosition.rewardFactorSnapshot.eq(poolAccount.amm.rewardFactor), "LP position reward factor should be updated");
            const collectedFees = lpPositionAfter.lpPosition.collectedFees.toNumber();
            const difference = collectedFees - expectedReward;
            const poolAfter = await accounts_1.PoolAccount.fetch(c, poolKey);
            if (!poolAfter) {
                throw new Error("Pool account not found");
            }
            const tolerance = 1000;
            (0, assert_1.default)(difference <= tolerance, "Collected fees should be close to expected reward");
        });
        it("should allow withdrawal of protocol fees", async () => {
            const quoteVault = web3_js_1.PublicKey.findProgramAddressSync([Buffer.from("vault"), poolKey.toBuffer(), spl_token_1.NATIVE_MINT.toBuffer()], programId_1.PROGRAM_ID)[0];
            const poolAccount = await accounts_1.PoolAccount.fetch(c, poolKey);
            const protocolFeeRecipients = poolAccount?.poolHeader.feeRecipients.recipients;
            const traderZeroQuotePreBalance = await c.getTokenAccountBalance(traders[0][2], "confirmed");
            const traderOneQuotePreBalance = await c.getTokenAccountBalance(traders[1][2], "confirmed");
            const traderTwoQuotePreBalance = await c.getTokenAccountBalance(traders[2][2], "confirmed");
            const traderZeroExpectedFees = protocolFeeRecipients?.[0].totalAccumulatedQuoteFees ?? new bn_js_1.default(0);
            const traderOneExpectedFees = protocolFeeRecipients?.[1].totalAccumulatedQuoteFees ?? new bn_js_1.default(0);
            const traderTwoExpectedFees = protocolFeeRecipients?.[2].totalAccumulatedQuoteFees ?? new bn_js_1.default(0);
            const totalProtocolFees = poolAccount?.amm.cumulativeQuoteProtocolFees ?? new bn_js_1.default(0);
            console.log(`\t Total protocol fees: ${totalProtocolFees.toNumber()}`);
            console.log(`\t Trader 0 Expected fees: ${traderZeroExpectedFees.toNumber()}`);
            console.log(`\t Trader 1 Expected fees: ${traderOneExpectedFees.toNumber()}`);
            console.log(`\t Trader 2 Expected fees: ${traderTwoExpectedFees.toNumber()}`);
            (0, assert_1.default)(totalProtocolFees
                .sub(traderZeroExpectedFees
                .add(traderOneExpectedFees)
                .add(traderTwoExpectedFees))
                .abs()
                .lt(new bn_js_1.default(3)));
            let traderZeroWithdrawTx = new web3_js_1.Transaction().add((0, instructions_1.WithdrawProtocolFees)({
                plasmaProgram: programId_1.PROGRAM_ID,
                logAuthority: LOG_AUTHORITY,
                pool: poolKey,
                protocolFeeRecipient: traders[0][0].publicKey,
                quoteAccount: traders[0][2],
                quoteVault,
                tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
            }));
            await (0, web3_js_1.sendAndConfirmTransaction)(c, traderZeroWithdrawTx, [traders[0][0]], {
                commitment: "confirmed",
            });
            let traderOneWithdrawTx = new web3_js_1.Transaction().add((0, instructions_1.WithdrawProtocolFees)({
                plasmaProgram: programId_1.PROGRAM_ID,
                logAuthority: LOG_AUTHORITY,
                pool: poolKey,
                protocolFeeRecipient: traders[1][0].publicKey,
                quoteAccount: traders[1][2],
                quoteVault,
                tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
            }));
            await (0, web3_js_1.sendAndConfirmTransaction)(c, traderOneWithdrawTx, [traders[1][0]], {
                commitment: "confirmed",
            });
            let traderTwoWithdrawTx = new web3_js_1.Transaction().add((0, instructions_1.WithdrawProtocolFees)({
                plasmaProgram: programId_1.PROGRAM_ID,
                logAuthority: LOG_AUTHORITY,
                pool: poolKey,
                protocolFeeRecipient: traders[2][0].publicKey,
                quoteAccount: traders[2][2],
                quoteVault,
                tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
            }));
            await (0, web3_js_1.sendAndConfirmTransaction)(c, traderTwoWithdrawTx, [traders[2][0]], {
                commitment: "confirmed",
            });
            const traderZeroQuotePostBalance = await c.getTokenAccountBalance(traders[0][2], "confirmed");
            const traderOneQuotePostBalance = await c.getTokenAccountBalance(traders[1][2], "confirmed");
            const traderTwoQuotePostBalance = await c.getTokenAccountBalance(traders[2][2], "confirmed");
            (0, assert_1.default)(Number(traderZeroQuotePostBalance.value.amount) -
                Number(traderZeroQuotePreBalance.value.amount) ==
                traderZeroExpectedFees.toNumber());
            (0, assert_1.default)(Number(traderOneQuotePostBalance.value.amount) -
                Number(traderOneQuotePreBalance.value.amount) ==
                traderOneExpectedFees.toNumber());
            (0, assert_1.default)(Number(traderTwoQuotePostBalance.value.amount) -
                Number(traderTwoQuotePreBalance.value.amount) ==
                traderTwoExpectedFees.toNumber());
            try {
                // Non-recipient trader trying to receive fees should fail
                let traderThreeWithdrawTx = new web3_js_1.Transaction().add((0, instructions_1.WithdrawProtocolFees)({
                    plasmaProgram: programId_1.PROGRAM_ID,
                    logAuthority: LOG_AUTHORITY,
                    pool: poolKey,
                    protocolFeeRecipient: traders[3][0].publicKey,
                    quoteAccount: traders[3][2],
                    quoteVault,
                    tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
                }));
                await (0, web3_js_1.sendAndConfirmTransaction)(c, traderThreeWithdrawTx, [traders[3][0]], {
                    commitment: "confirmed",
                });
                (0, assert_1.default)(false);
            }
            catch (err) { }
            // Fetch pool again and make sure the collected fees are updated
            const poolAccountPostWithdraw = await accounts_1.PoolAccount.fetch(c, poolKey);
            const protocolFeeRecipientsPostWithdraw = poolAccountPostWithdraw?.poolHeader.feeRecipients.recipients;
            const recipientOne = protocolFeeRecipientsPostWithdraw?.[0];
            const recipientTwo = protocolFeeRecipientsPostWithdraw?.[1];
            const recipientThree = protocolFeeRecipientsPostWithdraw?.[2];
            (0, assert_1.default)(recipientOne?.collectedQuoteFees.eq(recipientOne?.totalAccumulatedQuoteFees));
            (0, assert_1.default)(recipientTwo?.collectedQuoteFees.eq(recipientTwo?.totalAccumulatedQuoteFees));
            (0, assert_1.default)(recipientThree?.collectedQuoteFees.eq(recipientThree?.totalAccumulatedQuoteFees));
        });
    });
    describe("Liquidity Provider Operations", () => {
        it("should allow a LP to add more liquidity", async () => {
            // Initialize a new LP position
            const lpTrader = web3_js_1.Keypair.generate();
            const airdropTx = await c.requestAirdrop(lpTrader.publicKey, 500000000000);
            await c.confirmTransaction(airdropTx, "confirmed");
            const mintAtaLpTrader = await (0, spl_token_1.getAssociatedTokenAddress)(mintPubkey, lpTrader.publicKey);
            const wSolAtaLpTrader = await (0, spl_token_1.getAssociatedTokenAddress)(spl_token_1.NATIVE_MINT, lpTrader.publicKey);
            const initTraderTx = new web3_js_1.Transaction()
                .add((0, spl_token_1.createAssociatedTokenAccountInstruction)(lpTrader.publicKey, mintAtaLpTrader, lpTrader.publicKey, mintPubkey))
                .add((0, spl_token_1.createAssociatedTokenAccountInstruction)(lpTrader.publicKey, wSolAtaLpTrader, lpTrader.publicKey, spl_token_1.NATIVE_MINT))
                .add(web3_js_1.SystemProgram.transfer({
                fromPubkey: lpTrader.publicKey,
                toPubkey: wSolAtaLpTrader,
                lamports: 100000000000, // 100 SOL
            }))
                .add((0, spl_token_1.createSyncNativeInstruction)(wSolAtaLpTrader));
            await (0, web3_js_1.sendAndConfirmTransaction)(c, initTraderTx, [lpTrader], {
                commitment: "confirmed",
            });
            // Mint tokens to the lpTrader's token account
            const mintToLpTraderTx = new web3_js_1.Transaction().add((0, spl_token_1.createMintToInstruction)(mintPubkey, mintAtaLpTrader, payer.publicKey, // Assuming payer is the mint authority
            100000000000));
            await (0, web3_js_1.sendAndConfirmTransaction)(c, mintToLpTraderTx, [payer], {
                commitment: "confirmed",
            });
            const poolAccountBefore = await accounts_1.PoolAccount.fetch(c, poolKey);
            const lpPositionKey = web3_js_1.PublicKey.findProgramAddressSync([
                Buffer.from("lp_position"),
                poolKey.toBuffer(),
                lpTrader.publicKey.toBuffer(),
            ], programId_1.PROGRAM_ID)[0];
            // Initialize LP position
            const initLpPositionTx = new web3_js_1.Transaction().add((0, instructions_1.InitializeLpPosition)({
                plasmaProgram: programId_1.PROGRAM_ID,
                logAuthority: LOG_AUTHORITY,
                pool: poolKey,
                payer: lpTrader.publicKey,
                lpPositionOwner: lpTrader.publicKey,
                lpPosition: lpPositionKey,
                systemProgram: web3_js_1.SystemProgram.programId,
            }));
            await (0, web3_js_1.sendAndConfirmTransaction)(c, initLpPositionTx, [lpTrader], {
                commitment: "confirmed",
            });
            // Add liquidity
            const addLiquidityTx = new web3_js_1.Transaction().add((0, instructions_1.AddLiquidity)({
                params: {
                    desiredBaseAmountIn: new bn_js_1.default(10000000),
                    desiredQuoteAmountIn: new bn_js_1.default(5000000),
                    initialLpShares: null,
                },
            }, {
                plasmaProgram: programId_1.PROGRAM_ID,
                logAuthority: LOG_AUTHORITY,
                pool: poolKey,
                trader: lpTrader.publicKey,
                lpPosition: lpPositionKey,
                baseAccount: mintAtaLpTrader,
                quoteAccount: wSolAtaLpTrader,
                baseVault: web3_js_1.PublicKey.findProgramAddressSync([Buffer.from("vault"), poolKey.toBuffer(), mintPubkey.toBuffer()], programId_1.PROGRAM_ID)[0],
                quoteVault: web3_js_1.PublicKey.findProgramAddressSync([
                    Buffer.from("vault"),
                    poolKey.toBuffer(),
                    spl_token_1.NATIVE_MINT.toBuffer(),
                ], programId_1.PROGRAM_ID)[0],
                tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
            }));
            await (0, web3_js_1.sendAndConfirmTransaction)(c, addLiquidityTx, [lpTrader], {
                commitment: "confirmed",
            });
            const poolAccountAfter = await accounts_1.PoolAccount.fetch(c, poolKey);
            if (!poolAccountAfter || !poolAccountBefore) {
                throw new Error("Failed to fetch pool account");
            }
            (0, assert_1.default)(poolAccountAfter.amm.slotSnapshot.gt(poolAccountBefore.amm.slotSnapshot));
        });
        it("should allow a LP to withdraw accumulated fees", async () => {
            // Initialize a new LP position
            const lpTrader = web3_js_1.Keypair.generate();
            const airdropTx = await c.requestAirdrop(lpTrader.publicKey, 500000000000);
            await c.confirmTransaction(airdropTx, "confirmed");
            const mintAtaLpTrader = await (0, spl_token_1.getAssociatedTokenAddress)(mintPubkey, lpTrader.publicKey);
            const wSolAtaLpTrader = await (0, spl_token_1.getAssociatedTokenAddress)(spl_token_1.NATIVE_MINT, lpTrader.publicKey);
            const initTraderTx = new web3_js_1.Transaction()
                .add((0, spl_token_1.createAssociatedTokenAccountInstruction)(lpTrader.publicKey, mintAtaLpTrader, lpTrader.publicKey, mintPubkey))
                .add((0, spl_token_1.createAssociatedTokenAccountInstruction)(lpTrader.publicKey, wSolAtaLpTrader, lpTrader.publicKey, spl_token_1.NATIVE_MINT))
                .add(web3_js_1.SystemProgram.transfer({
                fromPubkey: lpTrader.publicKey,
                toPubkey: wSolAtaLpTrader,
                lamports: 100000000000, // 100 SOL
            }))
                .add((0, spl_token_1.createSyncNativeInstruction)(wSolAtaLpTrader));
            await (0, web3_js_1.sendAndConfirmTransaction)(c, initTraderTx, [lpTrader], {
                commitment: "confirmed",
            });
            // Mint tokens to the lpTrader's token account
            const mintToLpTraderTx = new web3_js_1.Transaction().add((0, spl_token_1.createMintToInstruction)(mintPubkey, mintAtaLpTrader, payer.publicKey, // Assuming payer is the mint authority
            100000000000));
            await (0, web3_js_1.sendAndConfirmTransaction)(c, mintToLpTraderTx, [payer], {
                commitment: "confirmed",
            });
            const lpPositionKey = web3_js_1.PublicKey.findProgramAddressSync([
                Buffer.from("lp_position"),
                poolKey.toBuffer(),
                lpTrader.publicKey.toBuffer(),
            ], programId_1.PROGRAM_ID)[0];
            // Initialize LP position
            const initLpPositionTx = new web3_js_1.Transaction().add((0, instructions_1.InitializeLpPosition)({
                plasmaProgram: programId_1.PROGRAM_ID,
                logAuthority: LOG_AUTHORITY,
                pool: poolKey,
                payer: lpTrader.publicKey,
                lpPositionOwner: lpTrader.publicKey,
                lpPosition: lpPositionKey,
                systemProgram: web3_js_1.SystemProgram.programId,
            }));
            await (0, web3_js_1.sendAndConfirmTransaction)(c, initLpPositionTx, [lpTrader], {
                commitment: "confirmed",
            });
            // Add liquidity
            const addLiquidityTx = new web3_js_1.Transaction().add((0, instructions_1.AddLiquidity)({
                params: {
                    desiredBaseAmountIn: new bn_js_1.default(100000000000),
                    desiredQuoteAmountIn: new bn_js_1.default(50000000000),
                    initialLpShares: null,
                },
            }, {
                plasmaProgram: programId_1.PROGRAM_ID,
                logAuthority: LOG_AUTHORITY,
                pool: poolKey,
                trader: lpTrader.publicKey,
                lpPosition: lpPositionKey,
                baseAccount: mintAtaLpTrader,
                quoteAccount: wSolAtaLpTrader,
                baseVault: web3_js_1.PublicKey.findProgramAddressSync([Buffer.from("vault"), poolKey.toBuffer(), mintPubkey.toBuffer()], programId_1.PROGRAM_ID)[0],
                quoteVault: web3_js_1.PublicKey.findProgramAddressSync([
                    Buffer.from("vault"),
                    poolKey.toBuffer(),
                    spl_token_1.NATIVE_MINT.toBuffer(),
                ], programId_1.PROGRAM_ID)[0],
                tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
            }));
            await (0, web3_js_1.sendAndConfirmTransaction)(c, addLiquidityTx, [lpTrader], {
                commitment: "confirmed",
            });
            // Perform some swaps to generate fees
            const swapper = traders[3][0];
            const swapperMintAta = traders[3][1];
            const swapperWsolAta = traders[3][2];
            for (let i = 0; i < 5; i++) {
                const swapTx = new web3_js_1.Transaction().add((0, instructions_1.Swap)({
                    params: {
                        side: new types_1.Side.Buy(),
                        swapType: new SwapType_1.ExactIn({
                            amountIn: new bn_js_1.default(1000000),
                            minAmountOut: new bn_js_1.default(0),
                        }),
                    },
                }, {
                    plasmaProgram: programId_1.PROGRAM_ID,
                    logAuthority: LOG_AUTHORITY,
                    pool: poolKey,
                    trader: swapper.publicKey,
                    baseAccount: swapperMintAta,
                    quoteAccount: swapperWsolAta,
                    baseVault: web3_js_1.PublicKey.findProgramAddressSync([
                        Buffer.from("vault"),
                        poolKey.toBuffer(),
                        mintPubkey.toBuffer(),
                    ], programId_1.PROGRAM_ID)[0],
                    quoteVault: web3_js_1.PublicKey.findProgramAddressSync([
                        Buffer.from("vault"),
                        poolKey.toBuffer(),
                        spl_token_1.NATIVE_MINT.toBuffer(),
                    ], programId_1.PROGRAM_ID)[0],
                    tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
                }));
                await (0, web3_js_1.sendAndConfirmTransaction)(c, swapTx, [swapper], {
                    commitment: "confirmed",
                });
            }
            const withdrawFeesTx = new web3_js_1.Transaction().add((0, instructions_1.WithdrawLpFees)({
                plasmaProgram: programId_1.PROGRAM_ID,
                logAuthority: LOG_AUTHORITY,
                pool: poolKey,
                trader: lpTrader.publicKey,
                lpPositionOwner: lpTrader.publicKey,
                lpPosition: lpPositionKey,
                quoteAccount: wSolAtaLpTrader,
                quoteVault: web3_js_1.PublicKey.findProgramAddressSync([Buffer.from("vault"), poolKey.toBuffer(), spl_token_1.NATIVE_MINT.toBuffer()], programId_1.PROGRAM_ID)[0],
                tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
            }));
            await (0, web3_js_1.sendAndConfirmTransaction)(c, withdrawFeesTx, [lpTrader], {
                commitment: "confirmed",
            });
            const lpPositionAfter = await accounts_1.LpPositionAccount.fetch(c, lpPositionKey);
            (0, assert_1.default)(lpPositionAfter);
            (0, assert_1.default)(lpPositionAfter.lpPosition.collectedFees.gt(new bn_js_1.default(0)));
        });
        it("should correctly distribute fees among multiple LPs", async () => {
            // Initialize two LP traders
            const lpTrader1 = web3_js_1.Keypair.generate();
            const lpTrader2 = web3_js_1.Keypair.generate();
            // Airdrop SOL to both traders
            for (const trader of [lpTrader1, lpTrader2]) {
                const airdropTx = await c.requestAirdrop(trader.publicKey, 500000000000);
                await c.confirmTransaction(airdropTx, "confirmed");
            }
            // Initialize token accounts for both traders
            const initAccounts = async (trader) => {
                const mintAta = await (0, spl_token_1.getAssociatedTokenAddress)(mintPubkey, trader.publicKey);
                const wSolAta = await (0, spl_token_1.getAssociatedTokenAddress)(spl_token_1.NATIVE_MINT, trader.publicKey);
                const initTx = new web3_js_1.Transaction()
                    .add((0, spl_token_1.createAssociatedTokenAccountInstruction)(trader.publicKey, mintAta, trader.publicKey, mintPubkey))
                    .add((0, spl_token_1.createAssociatedTokenAccountInstruction)(trader.publicKey, wSolAta, trader.publicKey, spl_token_1.NATIVE_MINT))
                    .add(web3_js_1.SystemProgram.transfer({
                    fromPubkey: trader.publicKey,
                    toPubkey: wSolAta,
                    lamports: 100000000000, // 100 SOL
                }))
                    .add((0, spl_token_1.createSyncNativeInstruction)(wSolAta))
                    .add((0, spl_token_1.createMintToInstruction)(mintPubkey, mintAta, payer.publicKey, 100000000000));
                await (0, web3_js_1.sendAndConfirmTransaction)(c, initTx, [trader, payer], {
                    commitment: "confirmed",
                });
                return { mintAta, wSolAta };
            };
            const accounts1 = await initAccounts(lpTrader1);
            const accounts2 = await initAccounts(lpTrader2);
            // Initialize LP positions for both traders
            const initLpPosition = async (trader) => {
                const lpPositionKey = web3_js_1.PublicKey.findProgramAddressSync([
                    Buffer.from("lp_position"),
                    poolKey.toBuffer(),
                    trader.publicKey.toBuffer(),
                ], programId_1.PROGRAM_ID)[0];
                const initLpPositionTx = new web3_js_1.Transaction().add((0, instructions_1.InitializeLpPosition)({
                    plasmaProgram: programId_1.PROGRAM_ID,
                    logAuthority: LOG_AUTHORITY,
                    pool: poolKey,
                    payer: trader.publicKey,
                    lpPositionOwner: trader.publicKey,
                    lpPosition: lpPositionKey,
                    systemProgram: web3_js_1.SystemProgram.programId,
                }));
                await (0, web3_js_1.sendAndConfirmTransaction)(c, initLpPositionTx, [trader], {
                    commitment: "confirmed",
                });
                return lpPositionKey;
            };
            const lpPosition1 = await initLpPosition(lpTrader1);
            const lpPosition2 = await initLpPosition(lpTrader2);
            // Add liquidity for both LPs
            const addLiquidity = async (trader, accounts, lpPosition) => {
                const addLiquidityTx = new web3_js_1.Transaction().add((0, instructions_1.AddLiquidity)({
                    params: {
                        desiredBaseAmountIn: new bn_js_1.default(50000000000),
                        desiredQuoteAmountIn: new bn_js_1.default(50000000000),
                        initialLpShares: null,
                    },
                }, {
                    plasmaProgram: programId_1.PROGRAM_ID,
                    logAuthority: LOG_AUTHORITY,
                    pool: poolKey,
                    trader: trader.publicKey,
                    lpPosition: lpPosition,
                    baseAccount: accounts.mintAta,
                    quoteAccount: accounts.wSolAta,
                    baseVault: web3_js_1.PublicKey.findProgramAddressSync([
                        Buffer.from("vault"),
                        poolKey.toBuffer(),
                        mintPubkey.toBuffer(),
                    ], programId_1.PROGRAM_ID)[0],
                    quoteVault: web3_js_1.PublicKey.findProgramAddressSync([
                        Buffer.from("vault"),
                        poolKey.toBuffer(),
                        spl_token_1.NATIVE_MINT.toBuffer(),
                    ], programId_1.PROGRAM_ID)[0],
                    tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
                }));
                await (0, web3_js_1.sendAndConfirmTransaction)(c, addLiquidityTx, [trader], {
                    commitment: "confirmed",
                });
            };
            await addLiquidity(lpTrader1, accounts1, lpPosition1);
            await addLiquidity(lpTrader2, accounts2, lpPosition2);
            // Perform swaps to generate fees
            const swapper = traders[3][0];
            const swapperMintAta = traders[3][1];
            const swapperWsolAta = traders[3][2];
            for (let i = 0; i < 20; i++) {
                const swapTx = new web3_js_1.Transaction().add((0, instructions_1.Swap)({
                    params: {
                        side: i % 2 === 0 ? new types_1.Side.Buy() : new types_1.Side.Sell(),
                        swapType: new SwapType_1.ExactIn({
                            amountIn: new bn_js_1.default(1000000000),
                            minAmountOut: new bn_js_1.default(0),
                        }),
                    },
                }, {
                    plasmaProgram: programId_1.PROGRAM_ID,
                    logAuthority: LOG_AUTHORITY,
                    pool: poolKey,
                    trader: swapper.publicKey,
                    baseAccount: swapperMintAta,
                    quoteAccount: swapperWsolAta,
                    baseVault: web3_js_1.PublicKey.findProgramAddressSync([
                        Buffer.from("vault"),
                        poolKey.toBuffer(),
                        mintPubkey.toBuffer(),
                    ], programId_1.PROGRAM_ID)[0],
                    quoteVault: web3_js_1.PublicKey.findProgramAddressSync([
                        Buffer.from("vault"),
                        poolKey.toBuffer(),
                        spl_token_1.NATIVE_MINT.toBuffer(),
                    ], programId_1.PROGRAM_ID)[0],
                    tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
                }));
                await (0, web3_js_1.sendAndConfirmTransaction)(c, swapTx, [swapper], {
                    commitment: "confirmed",
                });
            }
            // Withdraw fees for both LPs
            const withdrawFees = async (trader, accounts, lpPosition) => {
                const balanceBefore = await c.getTokenAccountBalance(accounts.wSolAta);
                const withdrawFeesTx = new web3_js_1.Transaction().add((0, instructions_1.WithdrawLpFees)({
                    plasmaProgram: programId_1.PROGRAM_ID,
                    logAuthority: LOG_AUTHORITY,
                    pool: poolKey,
                    trader: trader.publicKey,
                    lpPositionOwner: trader.publicKey,
                    lpPosition: lpPosition,
                    quoteAccount: accounts.wSolAta,
                    quoteVault: web3_js_1.PublicKey.findProgramAddressSync([
                        Buffer.from("vault"),
                        poolKey.toBuffer(),
                        spl_token_1.NATIVE_MINT.toBuffer(),
                    ], programId_1.PROGRAM_ID)[0],
                    tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
                }));
                await (0, web3_js_1.sendAndConfirmTransaction)(c, withdrawFeesTx, [trader], {
                    commitment: "confirmed",
                });
                const balanceAfter = await c.getTokenAccountBalance(accounts.wSolAta);
                return new bn_js_1.default(balanceAfter.value.amount).sub(new bn_js_1.default(balanceBefore.value.amount));
            };
            const feesLP1 = await withdrawFees(lpTrader1, accounts1, lpPosition1);
            const feesLP2 = await withdrawFees(lpTrader2, accounts2, lpPosition2);
            // Assert that both LPs received fees
            (0, assert_1.default)(feesLP1.gt(new bn_js_1.default(0)), "LP1 did not receive any fees");
            (0, assert_1.default)(feesLP2.gt(new bn_js_1.default(0)), "LP2 did not receive any fees");
            // Assert that fees are distributed roughly equally (within 1% difference)
            const feeDifference = feesLP1.sub(feesLP2).abs();
            const feeTotal = feesLP1.add(feesLP2);
            (0, assert_1.default)(feeDifference.muln(100).div(feeTotal).lten(1), "Fee distribution is not roughly equal");
        });
        it("should handle adding liquidity with uneven ratios", async () => {
            // Initialize a new LP position
            const lpTrader = web3_js_1.Keypair.generate();
            const airdropTx = await c.requestAirdrop(lpTrader.publicKey, 500000000000);
            await c.confirmTransaction(airdropTx, "confirmed");
            const mintAtaLpTrader = await (0, spl_token_1.getAssociatedTokenAddress)(mintPubkey, lpTrader.publicKey);
            const wSolAtaLpTrader = await (0, spl_token_1.getAssociatedTokenAddress)(spl_token_1.NATIVE_MINT, lpTrader.publicKey);
            const initTraderTx = new web3_js_1.Transaction()
                .add((0, spl_token_1.createAssociatedTokenAccountInstruction)(lpTrader.publicKey, mintAtaLpTrader, lpTrader.publicKey, mintPubkey))
                .add((0, spl_token_1.createAssociatedTokenAccountInstruction)(lpTrader.publicKey, wSolAtaLpTrader, lpTrader.publicKey, spl_token_1.NATIVE_MINT))
                .add(web3_js_1.SystemProgram.transfer({
                fromPubkey: lpTrader.publicKey,
                toPubkey: wSolAtaLpTrader,
                lamports: 100000000000, // 100 SOL
            }))
                .add((0, spl_token_1.createSyncNativeInstruction)(wSolAtaLpTrader));
            await (0, web3_js_1.sendAndConfirmTransaction)(c, initTraderTx, [lpTrader], {
                commitment: "confirmed",
            });
            // Mint tokens to the lpTrader's token account
            const mintToLpTraderTx = new web3_js_1.Transaction().add((0, spl_token_1.createMintToInstruction)(mintPubkey, mintAtaLpTrader, payer.publicKey, // Assuming payer is the mint authority
            100000000000));
            await (0, web3_js_1.sendAndConfirmTransaction)(c, mintToLpTraderTx, [payer], {
                commitment: "confirmed",
            });
            const lpPositionKey = web3_js_1.PublicKey.findProgramAddressSync([
                Buffer.from("lp_position"),
                poolKey.toBuffer(),
                lpTrader.publicKey.toBuffer(),
            ], programId_1.PROGRAM_ID)[0];
            // Initialize LP position
            const initLpPositionTx = new web3_js_1.Transaction().add((0, instructions_1.InitializeLpPosition)({
                plasmaProgram: programId_1.PROGRAM_ID,
                logAuthority: LOG_AUTHORITY,
                pool: poolKey,
                payer: lpTrader.publicKey,
                lpPositionOwner: lpTrader.publicKey,
                lpPosition: lpPositionKey,
                systemProgram: web3_js_1.SystemProgram.programId,
            }));
            await (0, web3_js_1.sendAndConfirmTransaction)(c, initLpPositionTx, [lpTrader], {
                commitment: "confirmed",
            });
            const lpPositionBefore = await accounts_1.LpPositionAccount.fetch(c, lpPositionKey);
            (0, assert_1.default)(lpPositionBefore);
            // Add liquidity with 5:1 ratio of base to quote
            const addLiquidityTx = new web3_js_1.Transaction().add((0, instructions_1.AddLiquidity)({
                params: {
                    desiredBaseAmountIn: new bn_js_1.default(25000000000),
                    desiredQuoteAmountIn: new bn_js_1.default(5000000000),
                    initialLpShares: null,
                },
            }, {
                plasmaProgram: programId_1.PROGRAM_ID,
                logAuthority: LOG_AUTHORITY,
                pool: poolKey,
                trader: lpTrader.publicKey,
                lpPosition: lpPositionKey,
                baseAccount: mintAtaLpTrader,
                quoteAccount: wSolAtaLpTrader,
                baseVault: web3_js_1.PublicKey.findProgramAddressSync([Buffer.from("vault"), poolKey.toBuffer(), mintPubkey.toBuffer()], programId_1.PROGRAM_ID)[0],
                quoteVault: web3_js_1.PublicKey.findProgramAddressSync([
                    Buffer.from("vault"),
                    poolKey.toBuffer(),
                    spl_token_1.NATIVE_MINT.toBuffer(),
                ], programId_1.PROGRAM_ID)[0],
                tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
            }));
            await (0, web3_js_1.sendAndConfirmTransaction)(c, addLiquidityTx, [lpTrader], {
                commitment: "confirmed",
            });
            // Check if LP shares are calculated correctly
            const lpPositionAccount = await accounts_1.LpPositionAccount.fetch(c, lpPositionKey);
            (0, assert_1.default)(lpPositionAccount);
            (0, assert_1.default)(lpPositionAccount.lpPosition.lpShares.gt(new bn_js_1.default(0)), "LP shares should be greater than 0");
        });
        it("should allow a LP to partially remove liquidity", async () => {
            // Initialize a new LP trader
            const lpTrader = web3_js_1.Keypair.generate();
            const airdropTx = await c.requestAirdrop(lpTrader.publicKey, 500000000000);
            await c.confirmTransaction(airdropTx, "confirmed");
            const mintAtaLpTrader = await (0, spl_token_1.getAssociatedTokenAddress)(mintPubkey, lpTrader.publicKey);
            const wSolAtaLpTrader = await (0, spl_token_1.getAssociatedTokenAddress)(spl_token_1.NATIVE_MINT, lpTrader.publicKey);
            // Initialize accounts
            const initTraderTx = new web3_js_1.Transaction()
                .add((0, spl_token_1.createAssociatedTokenAccountInstruction)(lpTrader.publicKey, mintAtaLpTrader, lpTrader.publicKey, mintPubkey))
                .add((0, spl_token_1.createAssociatedTokenAccountInstruction)(lpTrader.publicKey, wSolAtaLpTrader, lpTrader.publicKey, spl_token_1.NATIVE_MINT))
                .add(web3_js_1.SystemProgram.transfer({
                fromPubkey: lpTrader.publicKey,
                toPubkey: wSolAtaLpTrader,
                lamports: 100000000000, // 100 SOL
            }))
                .add((0, spl_token_1.createSyncNativeInstruction)(wSolAtaLpTrader));
            await (0, web3_js_1.sendAndConfirmTransaction)(c, initTraderTx, [lpTrader], {
                commitment: "confirmed",
            });
            // Mint tokens to the lpTrader's token account
            const mintToLpTraderTx = new web3_js_1.Transaction().add((0, spl_token_1.createMintToInstruction)(mintPubkey, mintAtaLpTrader, payer.publicKey, // Assuming payer is the mint authority
            100000000000));
            await (0, web3_js_1.sendAndConfirmTransaction)(c, mintToLpTraderTx, [payer], {
                commitment: "confirmed",
            });
            const lpPositionKey = web3_js_1.PublicKey.findProgramAddressSync([
                Buffer.from("lp_position"),
                poolKey.toBuffer(),
                lpTrader.publicKey.toBuffer(),
            ], programId_1.PROGRAM_ID)[0];
            // Initialize LP position
            const initLpPositionTx = new web3_js_1.Transaction().add((0, instructions_1.InitializeLpPosition)({
                plasmaProgram: programId_1.PROGRAM_ID,
                logAuthority: LOG_AUTHORITY,
                pool: poolKey,
                payer: lpTrader.publicKey,
                lpPositionOwner: lpTrader.publicKey,
                lpPosition: lpPositionKey,
                systemProgram: web3_js_1.SystemProgram.programId,
            }));
            await (0, web3_js_1.sendAndConfirmTransaction)(c, initLpPositionTx, [lpTrader], {
                commitment: "confirmed",
            });
            // Add initial liquidity
            const addLiquidityTx = new web3_js_1.Transaction().add((0, instructions_1.AddLiquidity)({
                params: {
                    desiredBaseAmountIn: new bn_js_1.default(50000000000),
                    desiredQuoteAmountIn: new bn_js_1.default(50000000000),
                    initialLpShares: null,
                },
            }, {
                plasmaProgram: programId_1.PROGRAM_ID,
                logAuthority: LOG_AUTHORITY,
                pool: poolKey,
                trader: lpTrader.publicKey,
                lpPosition: lpPositionKey,
                baseAccount: mintAtaLpTrader,
                quoteAccount: wSolAtaLpTrader,
                baseVault: web3_js_1.PublicKey.findProgramAddressSync([Buffer.from("vault"), poolKey.toBuffer(), mintPubkey.toBuffer()], programId_1.PROGRAM_ID)[0],
                quoteVault: web3_js_1.PublicKey.findProgramAddressSync([
                    Buffer.from("vault"),
                    poolKey.toBuffer(),
                    spl_token_1.NATIVE_MINT.toBuffer(),
                ], programId_1.PROGRAM_ID)[0],
                tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
            }));
            await (0, web3_js_1.sendAndConfirmTransaction)(c, addLiquidityTx, [lpTrader], {
                commitment: "confirmed",
            });
            // Get initial LP shares
            const initialLpPosition = await accounts_1.LpPositionAccount.fetch(c, lpPositionKey);
            (0, assert_1.default)(initialLpPosition);
            const initialLpShares = initialLpPosition.lpPosition.lpShares;
            // Advance slot to vest LP shares, borrowed this from above.
            while ((await c.getSlot("confirmed")) % 4 != 0) { }
            // Remove half of the liquidity
            const removeLiquidityTx = new web3_js_1.Transaction().add((0, instructions_1.RemoveLiquidity)({
                params: {
                    lpShares: initialLpShares.div(new bn_js_1.default(2)),
                },
            }, {
                plasmaProgram: programId_1.PROGRAM_ID,
                logAuthority: LOG_AUTHORITY,
                pool: poolKey,
                trader: lpTrader.publicKey,
                lpPosition: lpPositionKey,
                baseAccount: mintAtaLpTrader,
                quoteAccount: wSolAtaLpTrader,
                baseVault: web3_js_1.PublicKey.findProgramAddressSync([Buffer.from("vault"), poolKey.toBuffer(), mintPubkey.toBuffer()], programId_1.PROGRAM_ID)[0],
                quoteVault: web3_js_1.PublicKey.findProgramAddressSync([
                    Buffer.from("vault"),
                    poolKey.toBuffer(),
                    spl_token_1.NATIVE_MINT.toBuffer(),
                ], programId_1.PROGRAM_ID)[0],
                tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
            }));
            await (0, web3_js_1.sendAndConfirmTransaction)(c, removeLiquidityTx, [lpTrader], {
                commitment: "confirmed",
            });
            // Check if remaining LP shares are correct
            const finalLpPosition = await accounts_1.LpPositionAccount.fetch(c, lpPositionKey);
            (0, assert_1.default)(finalLpPosition);
            // Final LP position should be approximately 50% of the intial LP shares
            const remainingLpShares = finalLpPosition.lpPosition.lpShares;
            const expectedLpShares = initialLpShares.div(new bn_js_1.default(2));
            const tolerance = new bn_js_1.default(1); // 1 LP share
            (0, assert_1.default)(remainingLpShares.sub(expectedLpShares).abs().lte(tolerance), "Remaining LP shares should be approximately half of initial");
        });
    });
});
//# sourceMappingURL=test.js.map