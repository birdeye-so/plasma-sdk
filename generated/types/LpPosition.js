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
exports.LpPosition = void 0;
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class LpPosition {
    constructor(fields) {
        this.rewardFactorSnapshot = fields.rewardFactorSnapshot;
        this.lpShares = fields.lpShares;
        this.withdrawableLpShares = fields.withdrawableLpShares;
        this.uncollectedFees = fields.uncollectedFees;
        this.collectedFees = fields.collectedFees;
        this.pendingSharesToVest = new types.PendingSharesToVest({
            ...fields.pendingSharesToVest,
        });
    }
    static layout(property) {
        return borsh.struct([
            borsh.u128("rewardFactorSnapshot"),
            borsh.u64("lpShares"),
            borsh.u64("withdrawableLpShares"),
            borsh.u64("uncollectedFees"),
            borsh.u64("collectedFees"),
            types.PendingSharesToVest.layout("pendingSharesToVest"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new LpPosition({
            rewardFactorSnapshot: obj.rewardFactorSnapshot,
            lpShares: obj.lpShares,
            withdrawableLpShares: obj.withdrawableLpShares,
            uncollectedFees: obj.uncollectedFees,
            collectedFees: obj.collectedFees,
            pendingSharesToVest: types.PendingSharesToVest.fromDecoded(obj.pendingSharesToVest),
        });
    }
    static toEncodable(fields) {
        return {
            rewardFactorSnapshot: fields.rewardFactorSnapshot,
            lpShares: fields.lpShares,
            withdrawableLpShares: fields.withdrawableLpShares,
            uncollectedFees: fields.uncollectedFees,
            collectedFees: fields.collectedFees,
            pendingSharesToVest: types.PendingSharesToVest.toEncodable(fields.pendingSharesToVest),
        };
    }
    toJSON() {
        return {
            rewardFactorSnapshot: this.rewardFactorSnapshot.toString(),
            lpShares: this.lpShares.toString(),
            withdrawableLpShares: this.withdrawableLpShares.toString(),
            uncollectedFees: this.uncollectedFees.toString(),
            collectedFees: this.collectedFees.toString(),
            pendingSharesToVest: this.pendingSharesToVest.toJSON(),
        };
    }
    static fromJSON(obj) {
        return new LpPosition({
            rewardFactorSnapshot: new bn_js_1.default(obj.rewardFactorSnapshot),
            lpShares: new bn_js_1.default(obj.lpShares),
            withdrawableLpShares: new bn_js_1.default(obj.withdrawableLpShares),
            uncollectedFees: new bn_js_1.default(obj.uncollectedFees),
            collectedFees: new bn_js_1.default(obj.collectedFees),
            pendingSharesToVest: types.PendingSharesToVest.fromJSON(obj.pendingSharesToVest),
        });
    }
    toEncodable() {
        return LpPosition.toEncodable(this);
    }
}
exports.LpPosition = LpPosition;
