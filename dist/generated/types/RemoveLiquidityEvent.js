"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveLiquidityEvent = void 0;
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class RemoveLiquidityEvent {
    constructor(fields) {
        this.poolTotalLpShares = fields.poolTotalLpShares;
        this.poolTotalBaseLiquidity = fields.poolTotalBaseLiquidity;
        this.poolTotalQuoteLiquitidy = fields.poolTotalQuoteLiquitidy;
        this.snapshotBaseLiquidity = fields.snapshotBaseLiquidity;
        this.snapshotQuoteLiquidity = fields.snapshotQuoteLiquidity;
        this.userLpSharesBurned = fields.userLpSharesBurned;
        this.userLpSharesAvailable = fields.userLpSharesAvailable;
        this.userLpSharesLocked = fields.userLpSharesLocked;
        this.userLpSharesUnlockedForWithdrawal =
            fields.userLpSharesUnlockedForWithdrawal;
        this.userBaseWithdrawn = fields.userBaseWithdrawn;
        this.userQuoteWithdrawn = fields.userQuoteWithdrawn;
        this.userTotalWithdrawableBase = fields.userTotalWithdrawableBase;
        this.userTotalWithdrawableQuote = fields.userTotalWithdrawableQuote;
    }
    static layout(property) {
        return borsh.struct([
            borsh.u64("poolTotalLpShares"),
            borsh.u64("poolTotalBaseLiquidity"),
            borsh.u64("poolTotalQuoteLiquitidy"),
            borsh.u64("snapshotBaseLiquidity"),
            borsh.u64("snapshotQuoteLiquidity"),
            borsh.u64("userLpSharesBurned"),
            borsh.u64("userLpSharesAvailable"),
            borsh.u64("userLpSharesLocked"),
            borsh.u64("userLpSharesUnlockedForWithdrawal"),
            borsh.u64("userBaseWithdrawn"),
            borsh.u64("userQuoteWithdrawn"),
            borsh.u64("userTotalWithdrawableBase"),
            borsh.u64("userTotalWithdrawableQuote"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new RemoveLiquidityEvent({
            poolTotalLpShares: obj.poolTotalLpShares,
            poolTotalBaseLiquidity: obj.poolTotalBaseLiquidity,
            poolTotalQuoteLiquitidy: obj.poolTotalQuoteLiquitidy,
            snapshotBaseLiquidity: obj.snapshotBaseLiquidity,
            snapshotQuoteLiquidity: obj.snapshotQuoteLiquidity,
            userLpSharesBurned: obj.userLpSharesBurned,
            userLpSharesAvailable: obj.userLpSharesAvailable,
            userLpSharesLocked: obj.userLpSharesLocked,
            userLpSharesUnlockedForWithdrawal: obj.userLpSharesUnlockedForWithdrawal,
            userBaseWithdrawn: obj.userBaseWithdrawn,
            userQuoteWithdrawn: obj.userQuoteWithdrawn,
            userTotalWithdrawableBase: obj.userTotalWithdrawableBase,
            userTotalWithdrawableQuote: obj.userTotalWithdrawableQuote,
        });
    }
    static toEncodable(fields) {
        return {
            poolTotalLpShares: fields.poolTotalLpShares,
            poolTotalBaseLiquidity: fields.poolTotalBaseLiquidity,
            poolTotalQuoteLiquitidy: fields.poolTotalQuoteLiquitidy,
            snapshotBaseLiquidity: fields.snapshotBaseLiquidity,
            snapshotQuoteLiquidity: fields.snapshotQuoteLiquidity,
            userLpSharesBurned: fields.userLpSharesBurned,
            userLpSharesAvailable: fields.userLpSharesAvailable,
            userLpSharesLocked: fields.userLpSharesLocked,
            userLpSharesUnlockedForWithdrawal: fields.userLpSharesUnlockedForWithdrawal,
            userBaseWithdrawn: fields.userBaseWithdrawn,
            userQuoteWithdrawn: fields.userQuoteWithdrawn,
            userTotalWithdrawableBase: fields.userTotalWithdrawableBase,
            userTotalWithdrawableQuote: fields.userTotalWithdrawableQuote,
        };
    }
    toJSON() {
        return {
            poolTotalLpShares: this.poolTotalLpShares.toString(),
            poolTotalBaseLiquidity: this.poolTotalBaseLiquidity.toString(),
            poolTotalQuoteLiquitidy: this.poolTotalQuoteLiquitidy.toString(),
            snapshotBaseLiquidity: this.snapshotBaseLiquidity.toString(),
            snapshotQuoteLiquidity: this.snapshotQuoteLiquidity.toString(),
            userLpSharesBurned: this.userLpSharesBurned.toString(),
            userLpSharesAvailable: this.userLpSharesAvailable.toString(),
            userLpSharesLocked: this.userLpSharesLocked.toString(),
            userLpSharesUnlockedForWithdrawal: this.userLpSharesUnlockedForWithdrawal.toString(),
            userBaseWithdrawn: this.userBaseWithdrawn.toString(),
            userQuoteWithdrawn: this.userQuoteWithdrawn.toString(),
            userTotalWithdrawableBase: this.userTotalWithdrawableBase.toString(),
            userTotalWithdrawableQuote: this.userTotalWithdrawableQuote.toString(),
        };
    }
    static fromJSON(obj) {
        return new RemoveLiquidityEvent({
            poolTotalLpShares: new bn_js_1.default(obj.poolTotalLpShares),
            poolTotalBaseLiquidity: new bn_js_1.default(obj.poolTotalBaseLiquidity),
            poolTotalQuoteLiquitidy: new bn_js_1.default(obj.poolTotalQuoteLiquitidy),
            snapshotBaseLiquidity: new bn_js_1.default(obj.snapshotBaseLiquidity),
            snapshotQuoteLiquidity: new bn_js_1.default(obj.snapshotQuoteLiquidity),
            userLpSharesBurned: new bn_js_1.default(obj.userLpSharesBurned),
            userLpSharesAvailable: new bn_js_1.default(obj.userLpSharesAvailable),
            userLpSharesLocked: new bn_js_1.default(obj.userLpSharesLocked),
            userLpSharesUnlockedForWithdrawal: new bn_js_1.default(obj.userLpSharesUnlockedForWithdrawal),
            userBaseWithdrawn: new bn_js_1.default(obj.userBaseWithdrawn),
            userQuoteWithdrawn: new bn_js_1.default(obj.userQuoteWithdrawn),
            userTotalWithdrawableBase: new bn_js_1.default(obj.userTotalWithdrawableBase),
            userTotalWithdrawableQuote: new bn_js_1.default(obj.userTotalWithdrawableQuote),
        });
    }
    toEncodable() {
        return RemoveLiquidityEvent.toEncodable(this);
    }
}
exports.RemoveLiquidityEvent = RemoveLiquidityEvent;
//# sourceMappingURL=RemoveLiquidityEvent.js.map