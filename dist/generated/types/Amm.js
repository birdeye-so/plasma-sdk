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
exports.Amm = void 0;
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class Amm {
    constructor(fields) {
        this.feeInBps = fields.feeInBps;
        this.protocolAllocationInPct = fields.protocolAllocationInPct;
        this.lpVestingWindow = fields.lpVestingWindow;
        this.rewardFactor = fields.rewardFactor;
        this.totalLpShares = fields.totalLpShares;
        this.slotSnapshot = fields.slotSnapshot;
        this.baseReservesSnapshot = fields.baseReservesSnapshot;
        this.quoteReservesSnapshot = fields.quoteReservesSnapshot;
        this.baseReserves = fields.baseReserves;
        this.quoteReserves = fields.quoteReserves;
        this.cumulativeQuoteLpFees = fields.cumulativeQuoteLpFees;
        this.cumulativeQuoteProtocolFees = fields.cumulativeQuoteProtocolFees;
    }
    static layout(property) {
        return borsh.struct([
            borsh.u32("feeInBps"),
            borsh.u32("protocolAllocationInPct"),
            borsh.u64("lpVestingWindow"),
            borsh.u128("rewardFactor"),
            borsh.u64("totalLpShares"),
            borsh.u64("slotSnapshot"),
            borsh.u64("baseReservesSnapshot"),
            borsh.u64("quoteReservesSnapshot"),
            borsh.u64("baseReserves"),
            borsh.u64("quoteReserves"),
            borsh.u64("cumulativeQuoteLpFees"),
            borsh.u64("cumulativeQuoteProtocolFees"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new Amm({
            feeInBps: obj.feeInBps,
            protocolAllocationInPct: obj.protocolAllocationInPct,
            lpVestingWindow: obj.lpVestingWindow,
            rewardFactor: obj.rewardFactor,
            totalLpShares: obj.totalLpShares,
            slotSnapshot: obj.slotSnapshot,
            baseReservesSnapshot: obj.baseReservesSnapshot,
            quoteReservesSnapshot: obj.quoteReservesSnapshot,
            baseReserves: obj.baseReserves,
            quoteReserves: obj.quoteReserves,
            cumulativeQuoteLpFees: obj.cumulativeQuoteLpFees,
            cumulativeQuoteProtocolFees: obj.cumulativeQuoteProtocolFees,
        });
    }
    static toEncodable(fields) {
        return {
            feeInBps: fields.feeInBps,
            protocolAllocationInPct: fields.protocolAllocationInPct,
            lpVestingWindow: fields.lpVestingWindow,
            rewardFactor: fields.rewardFactor,
            totalLpShares: fields.totalLpShares,
            slotSnapshot: fields.slotSnapshot,
            baseReservesSnapshot: fields.baseReservesSnapshot,
            quoteReservesSnapshot: fields.quoteReservesSnapshot,
            baseReserves: fields.baseReserves,
            quoteReserves: fields.quoteReserves,
            cumulativeQuoteLpFees: fields.cumulativeQuoteLpFees,
            cumulativeQuoteProtocolFees: fields.cumulativeQuoteProtocolFees,
        };
    }
    toJSON() {
        return {
            feeInBps: this.feeInBps,
            protocolAllocationInPct: this.protocolAllocationInPct,
            lpVestingWindow: this.lpVestingWindow.toString(),
            rewardFactor: this.rewardFactor.toString(),
            totalLpShares: this.totalLpShares.toString(),
            slotSnapshot: this.slotSnapshot.toString(),
            baseReservesSnapshot: this.baseReservesSnapshot.toString(),
            quoteReservesSnapshot: this.quoteReservesSnapshot.toString(),
            baseReserves: this.baseReserves.toString(),
            quoteReserves: this.quoteReserves.toString(),
            cumulativeQuoteLpFees: this.cumulativeQuoteLpFees.toString(),
            cumulativeQuoteProtocolFees: this.cumulativeQuoteProtocolFees.toString(),
        };
    }
    static fromJSON(obj) {
        return new Amm({
            feeInBps: obj.feeInBps,
            protocolAllocationInPct: obj.protocolAllocationInPct,
            lpVestingWindow: new bn_js_1.default(obj.lpVestingWindow),
            rewardFactor: new bn_js_1.default(obj.rewardFactor),
            totalLpShares: new bn_js_1.default(obj.totalLpShares),
            slotSnapshot: new bn_js_1.default(obj.slotSnapshot),
            baseReservesSnapshot: new bn_js_1.default(obj.baseReservesSnapshot),
            quoteReservesSnapshot: new bn_js_1.default(obj.quoteReservesSnapshot),
            baseReserves: new bn_js_1.default(obj.baseReserves),
            quoteReserves: new bn_js_1.default(obj.quoteReserves),
            cumulativeQuoteLpFees: new bn_js_1.default(obj.cumulativeQuoteLpFees),
            cumulativeQuoteProtocolFees: new bn_js_1.default(obj.cumulativeQuoteProtocolFees),
        });
    }
    toEncodable() {
        return Amm.toEncodable(this);
    }
}
exports.Amm = Amm;
//# sourceMappingURL=Amm.js.map