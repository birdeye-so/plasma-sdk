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
exports.InitializePoolEvent = void 0;
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class InitializePoolEvent {
    constructor(fields) {
        this.lpFeeInBps = fields.lpFeeInBps;
        this.protocolFeeInPct = fields.protocolFeeInPct;
        this.feeRecipientParams = fields.feeRecipientParams.map((item) => new types.ProtocolFeeRecipientParams({ ...item }));
    }
    static layout(property) {
        return borsh.struct([
            borsh.u64("lpFeeInBps"),
            borsh.u64("protocolFeeInPct"),
            borsh.array(types.ProtocolFeeRecipientParams.layout(), 3, "feeRecipientParams"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new InitializePoolEvent({
            lpFeeInBps: obj.lpFeeInBps,
            protocolFeeInPct: obj.protocolFeeInPct,
            feeRecipientParams: obj.feeRecipientParams.map((item /* eslint-disable-line @typescript-eslint/no-explicit-any */) => types.ProtocolFeeRecipientParams.fromDecoded(item)),
        });
    }
    static toEncodable(fields) {
        return {
            lpFeeInBps: fields.lpFeeInBps,
            protocolFeeInPct: fields.protocolFeeInPct,
            feeRecipientParams: fields.feeRecipientParams.map((item) => types.ProtocolFeeRecipientParams.toEncodable(item)),
        };
    }
    toJSON() {
        return {
            lpFeeInBps: this.lpFeeInBps.toString(),
            protocolFeeInPct: this.protocolFeeInPct.toString(),
            feeRecipientParams: this.feeRecipientParams.map((item) => item.toJSON()),
        };
    }
    static fromJSON(obj) {
        return new InitializePoolEvent({
            lpFeeInBps: new bn_js_1.default(obj.lpFeeInBps),
            protocolFeeInPct: new bn_js_1.default(obj.protocolFeeInPct),
            feeRecipientParams: obj.feeRecipientParams.map((item) => types.ProtocolFeeRecipientParams.fromJSON(item)),
        });
    }
    toEncodable() {
        return InitializePoolEvent.toEncodable(this);
    }
}
exports.InitializePoolEvent = InitializePoolEvent;
//# sourceMappingURL=InitializePoolEvent.js.map