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
exports.layout = exports.fromJSON = exports.fromDecoded = exports.ExactOut = exports.ExactIn = void 0;
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class ExactIn {
    constructor(value) {
        this.discriminator = 0;
        this.kind = "ExactIn";
        this.value = {
            amountIn: value.amountIn,
            minAmountOut: value.minAmountOut,
        };
    }
    toJSON() {
        return {
            kind: "ExactIn",
            value: {
                amountIn: this.value.amountIn.toString(),
                minAmountOut: this.value.minAmountOut.toString(),
            },
        };
    }
    toEncodable() {
        return {
            ExactIn: {
                amount_in: this.value.amountIn,
                min_amount_out: this.value.minAmountOut,
            },
        };
    }
}
exports.ExactIn = ExactIn;
ExactIn.discriminator = 0;
ExactIn.kind = "ExactIn";
class ExactOut {
    constructor(value) {
        this.discriminator = 1;
        this.kind = "ExactOut";
        this.value = {
            amountOut: value.amountOut,
            maxAmountIn: value.maxAmountIn,
        };
    }
    toJSON() {
        return {
            kind: "ExactOut",
            value: {
                amountOut: this.value.amountOut.toString(),
                maxAmountIn: this.value.maxAmountIn.toString(),
            },
        };
    }
    toEncodable() {
        return {
            ExactOut: {
                amount_out: this.value.amountOut,
                max_amount_in: this.value.maxAmountIn,
            },
        };
    }
}
exports.ExactOut = ExactOut;
ExactOut.discriminator = 1;
ExactOut.kind = "ExactOut";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("ExactIn" in obj) {
        const val = obj["ExactIn"];
        return new ExactIn({
            amountIn: val["amount_in"],
            minAmountOut: val["min_amount_out"],
        });
    }
    if ("ExactOut" in obj) {
        const val = obj["ExactOut"];
        return new ExactOut({
            amountOut: val["amount_out"],
            maxAmountIn: val["max_amount_in"],
        });
    }
    throw new Error("Invalid enum object");
}
exports.fromDecoded = fromDecoded;
function fromJSON(obj) {
    switch (obj.kind) {
        case "ExactIn": {
            return new ExactIn({
                amountIn: new bn_js_1.default(obj.value.amountIn),
                minAmountOut: new bn_js_1.default(obj.value.minAmountOut),
            });
        }
        case "ExactOut": {
            return new ExactOut({
                amountOut: new bn_js_1.default(obj.value.amountOut),
                maxAmountIn: new bn_js_1.default(obj.value.maxAmountIn),
            });
        }
    }
}
exports.fromJSON = fromJSON;
function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([borsh.u64("amount_in"), borsh.u64("min_amount_out")], "ExactIn"),
        borsh.struct([borsh.u64("amount_out"), borsh.u64("max_amount_in")], "ExactOut"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
exports.layout = layout;
//# sourceMappingURL=SwapType.js.map