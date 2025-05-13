"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FixedPoint = void 0;
const bn_js_1 = __importDefault(require("bn.js"));
/**
 * The FixedPoint class represents a fixed-point number designed to be
 * compatible with the I80F48 type used in the Plasma AMM implementation.
 */
class FixedPoint {
    /**
     * @param value A BN (Big Number) instance representing the fixed-point number.
     * The value is stored as an integer, where the lower 48 bits represent the fractional part.
     */
    constructor(value) {
        this.value = value;
    }
    /**
     * Creates a FixedPoint instance from a BN instance.
     *
     * @param {BN} num - The BN instance to convert.
     * @returns {FixedPoint} The FixedPoint instance.
     */
    static fromBN(num) {
        return new FixedPoint(num);
    }
    /**
     * Converts the fixed-point number to a JavaScript number.
     *
     * In the Plasma SDK context, this is useful to display LP reward amounts, fee amounts, etc. to users.
     *
     * @returns {number} The JavaScript number representation.
     * @throws {Error} If the number is too large to safely convert to a JavaScript number.
     */
    toNumber() {
        // Check if the number is too large to safely convert
        if (this.value.abs().gt(new bn_js_1.default(Number.MAX_SAFE_INTEGER).shln(48))) {
            throw new Error("Number is too large to safely convert to a JavaScript number");
        }
        // Extract the whole part of the number
        const wholePart = this.value.shrn(FixedPoint.FRACTIONAL_BITS);
        // Extract the fractional part of the number
        const fractionalPart = this.value.and(FixedPoint.ONE.subn(1));
        // Combine whole and fractional parts
        return wholePart.toNumber() + fractionalPart.toNumber() / 2 ** FixedPoint.FRACTIONAL_BITS;
    }
}
exports.FixedPoint = FixedPoint;
// Number of bits used for the fractional part of the fixed-point number
FixedPoint.FRACTIONAL_BITS = 48;
// Representation of 1.0 in this fixed-point format
FixedPoint.ONE = new bn_js_1.default(1).shln(FixedPoint.FRACTIONAL_BITS);
//# sourceMappingURL=FixedPoint.js.map