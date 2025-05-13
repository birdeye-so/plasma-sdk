import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
import * as borsh from "@coral-xyz/borsh";
export type SwapFields = {
    header: types.PlasmaEventHeaderFields;
    event: types.SwapEventFields;
};
export type SwapValue = {
    header: types.PlasmaEventHeader;
    event: types.SwapEvent;
};
export interface SwapJSON {
    kind: "Swap";
    value: {
        header: types.PlasmaEventHeaderJSON;
        event: types.SwapEventJSON;
    };
}
export declare class Swap {
    static readonly discriminator = 0;
    static readonly kind = "Swap";
    readonly discriminator = 0;
    readonly kind = "Swap";
    readonly value: SwapValue;
    constructor(value: SwapFields);
    toJSON(): SwapJSON;
    toEncodable(): {
        Swap: {
            header: {
                sequenceNumber: BN;
                slot: BN;
                timestamp: BN;
                pool: PublicKey;
                signer: PublicKey;
                baseDecimals: number;
                quoteDecimals: number;
            };
            event: {
                swapSequenceNumber: BN;
                preBaseLiquidity: BN;
                preQuoteLiquidity: BN;
                postBaseLiquidity: BN;
                postQuoteLiquidity: BN;
                snapshotBaseLiquidity: BN;
                snapshotQuoteLiquidity: BN;
                swapResult: {
                    side: {
                        Buy: {};
                    } | {
                        Sell: {};
                    };
                    baseMatched: BN;
                    quoteMatched: BN;
                    baseMatchedAsLimitOrder: BN;
                    quoteMatchedAsLimitOrder: BN;
                    baseMatchedAsSwap: BN;
                    quoteMatchedAsSwap: BN;
                    feeInQuote: BN;
                };
            };
        };
    };
}
export type AddLiquidityFields = {
    header: types.PlasmaEventHeaderFields;
    event: types.AddLiquidityEventFields;
};
export type AddLiquidityValue = {
    header: types.PlasmaEventHeader;
    event: types.AddLiquidityEvent;
};
export interface AddLiquidityJSON {
    kind: "AddLiquidity";
    value: {
        header: types.PlasmaEventHeaderJSON;
        event: types.AddLiquidityEventJSON;
    };
}
export declare class AddLiquidity {
    static readonly discriminator = 1;
    static readonly kind = "AddLiquidity";
    readonly discriminator = 1;
    readonly kind = "AddLiquidity";
    readonly value: AddLiquidityValue;
    constructor(value: AddLiquidityFields);
    toJSON(): AddLiquidityJSON;
    toEncodable(): {
        AddLiquidity: {
            header: {
                sequenceNumber: BN;
                slot: BN;
                timestamp: BN;
                pool: PublicKey;
                signer: PublicKey;
                baseDecimals: number;
                quoteDecimals: number;
            };
            event: {
                poolTotalLpShares: BN;
                poolTotalBaseLiquidity: BN;
                poolTotalQuoteLiquitidy: BN;
                snapshotBaseLiquidity: BN;
                snapshotQuoteLiquidity: BN;
                userLpSharesReceived: BN;
                userLpSharesAvailable: BN;
                userLpSharesLocked: BN;
                userLpSharesUnlockedForWithdrawal: BN;
                userBaseDeposited: BN;
                userQuoteDeposited: BN;
                userTotalWithdrawableBase: BN;
                userTotalWithdrawableQuote: BN;
            };
        };
    };
}
export type RemoveLiquidityFields = {
    header: types.PlasmaEventHeaderFields;
    event: types.RemoveLiquidityEventFields;
};
export type RemoveLiquidityValue = {
    header: types.PlasmaEventHeader;
    event: types.RemoveLiquidityEvent;
};
export interface RemoveLiquidityJSON {
    kind: "RemoveLiquidity";
    value: {
        header: types.PlasmaEventHeaderJSON;
        event: types.RemoveLiquidityEventJSON;
    };
}
export declare class RemoveLiquidity {
    static readonly discriminator = 2;
    static readonly kind = "RemoveLiquidity";
    readonly discriminator = 2;
    readonly kind = "RemoveLiquidity";
    readonly value: RemoveLiquidityValue;
    constructor(value: RemoveLiquidityFields);
    toJSON(): RemoveLiquidityJSON;
    toEncodable(): {
        RemoveLiquidity: {
            header: {
                sequenceNumber: BN;
                slot: BN;
                timestamp: BN;
                pool: PublicKey;
                signer: PublicKey;
                baseDecimals: number;
                quoteDecimals: number;
            };
            event: {
                poolTotalLpShares: BN;
                poolTotalBaseLiquidity: BN;
                poolTotalQuoteLiquitidy: BN;
                snapshotBaseLiquidity: BN;
                snapshotQuoteLiquidity: BN;
                userLpSharesBurned: BN;
                userLpSharesAvailable: BN;
                userLpSharesLocked: BN;
                userLpSharesUnlockedForWithdrawal: BN;
                userBaseWithdrawn: BN;
                userQuoteWithdrawn: BN;
                userTotalWithdrawableBase: BN;
                userTotalWithdrawableQuote: BN;
            };
        };
    };
}
export type RenounceLiquidityFields = {
    header: types.PlasmaEventHeaderFields;
    event: types.RenounceLiquidityEventFields;
};
export type RenounceLiquidityValue = {
    header: types.PlasmaEventHeader;
    event: types.RenounceLiquidityEvent;
};
export interface RenounceLiquidityJSON {
    kind: "RenounceLiquidity";
    value: {
        header: types.PlasmaEventHeaderJSON;
        event: types.RenounceLiquidityEventJSON;
    };
}
export declare class RenounceLiquidity {
    static readonly discriminator = 3;
    static readonly kind = "RenounceLiquidity";
    readonly discriminator = 3;
    readonly kind = "RenounceLiquidity";
    readonly value: RenounceLiquidityValue;
    constructor(value: RenounceLiquidityFields);
    toJSON(): RenounceLiquidityJSON;
    toEncodable(): {
        RenounceLiquidity: {
            header: {
                sequenceNumber: BN;
                slot: BN;
                timestamp: BN;
                pool: PublicKey;
                signer: PublicKey;
                baseDecimals: number;
                quoteDecimals: number;
            };
            event: {
                allowFeeWithdrawal: boolean;
            };
        };
    };
}
export type WithdrawLpFeesFields = {
    header: types.PlasmaEventHeaderFields;
    event: types.WithdrawLpFeesEventFields;
};
export type WithdrawLpFeesValue = {
    header: types.PlasmaEventHeader;
    event: types.WithdrawLpFeesEvent;
};
export interface WithdrawLpFeesJSON {
    kind: "WithdrawLpFees";
    value: {
        header: types.PlasmaEventHeaderJSON;
        event: types.WithdrawLpFeesEventJSON;
    };
}
export declare class WithdrawLpFees {
    static readonly discriminator = 4;
    static readonly kind = "WithdrawLpFees";
    readonly discriminator = 4;
    readonly kind = "WithdrawLpFees";
    readonly value: WithdrawLpFeesValue;
    constructor(value: WithdrawLpFeesFields);
    toJSON(): WithdrawLpFeesJSON;
    toEncodable(): {
        WithdrawLpFees: {
            header: {
                sequenceNumber: BN;
                slot: BN;
                timestamp: BN;
                pool: PublicKey;
                signer: PublicKey;
                baseDecimals: number;
                quoteDecimals: number;
            };
            event: {
                feesWithdrawn: BN;
            };
        };
    };
}
export type InitializeLpPositionFields = {
    header: types.PlasmaEventHeaderFields;
    event: types.InitializeLpPositionEventFields;
};
export type InitializeLpPositionValue = {
    header: types.PlasmaEventHeader;
    event: types.InitializeLpPositionEvent;
};
export interface InitializeLpPositionJSON {
    kind: "InitializeLpPosition";
    value: {
        header: types.PlasmaEventHeaderJSON;
        event: types.InitializeLpPositionEventJSON;
    };
}
export declare class InitializeLpPosition {
    static readonly discriminator = 5;
    static readonly kind = "InitializeLpPosition";
    readonly discriminator = 5;
    readonly kind = "InitializeLpPosition";
    readonly value: InitializeLpPositionValue;
    constructor(value: InitializeLpPositionFields);
    toJSON(): InitializeLpPositionJSON;
    toEncodable(): {
        InitializeLpPosition: {
            header: {
                sequenceNumber: BN;
                slot: BN;
                timestamp: BN;
                pool: PublicKey;
                signer: PublicKey;
                baseDecimals: number;
                quoteDecimals: number;
            };
            event: {
                owner: PublicKey;
            };
        };
    };
}
export type InitializePoolFields = {
    header: types.PlasmaEventHeaderFields;
    event: types.InitializePoolEventFields;
};
export type InitializePoolValue = {
    header: types.PlasmaEventHeader;
    event: types.InitializePoolEvent;
};
export interface InitializePoolJSON {
    kind: "InitializePool";
    value: {
        header: types.PlasmaEventHeaderJSON;
        event: types.InitializePoolEventJSON;
    };
}
export declare class InitializePool {
    static readonly discriminator = 6;
    static readonly kind = "InitializePool";
    readonly discriminator = 6;
    readonly kind = "InitializePool";
    readonly value: InitializePoolValue;
    constructor(value: InitializePoolFields);
    toJSON(): InitializePoolJSON;
    toEncodable(): {
        InitializePool: {
            header: {
                sequenceNumber: BN;
                slot: BN;
                timestamp: BN;
                pool: PublicKey;
                signer: PublicKey;
                baseDecimals: number;
                quoteDecimals: number;
            };
            event: {
                lpFeeInBps: BN;
                protocolFeeInPct: BN;
                feeRecipientParams: {
                    recipient: PublicKey;
                    shares: BN;
                }[];
            };
        };
    };
}
export type WithdrawProtocolFeesFields = {
    header: types.PlasmaEventHeaderFields;
    event: types.WithdrawProtocolFeesEventFields;
};
export type WithdrawProtocolFeesValue = {
    header: types.PlasmaEventHeader;
    event: types.WithdrawProtocolFeesEvent;
};
export interface WithdrawProtocolFeesJSON {
    kind: "WithdrawProtocolFees";
    value: {
        header: types.PlasmaEventHeaderJSON;
        event: types.WithdrawProtocolFeesEventJSON;
    };
}
export declare class WithdrawProtocolFees {
    static readonly discriminator = 7;
    static readonly kind = "WithdrawProtocolFees";
    readonly discriminator = 7;
    readonly kind = "WithdrawProtocolFees";
    readonly value: WithdrawProtocolFeesValue;
    constructor(value: WithdrawProtocolFeesFields);
    toJSON(): WithdrawProtocolFeesJSON;
    toEncodable(): {
        WithdrawProtocolFees: {
            header: {
                sequenceNumber: BN;
                slot: BN;
                timestamp: BN;
                pool: PublicKey;
                signer: PublicKey;
                baseDecimals: number;
                quoteDecimals: number;
            };
            event: {
                protocolFeeRecipient: PublicKey;
                feesWithdrawn: BN;
            };
        };
    };
}
export declare function fromDecoded(obj: any): types.PlasmaEventKind;
export declare function fromJSON(obj: types.PlasmaEventJSON): types.PlasmaEventKind;
export declare function layout(property?: string): borsh.EnumLayout<unknown>;
