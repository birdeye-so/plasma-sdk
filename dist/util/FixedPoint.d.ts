import BN from "bn.js";
/**
 * The FixedPoint class represents a fixed-point number designed to be
 * compatible with the I80F48 type used in the Plasma AMM implementation.
 */
export declare class FixedPoint {
    value: BN;
    /**
     * @param value A BN (Big Number) instance representing the fixed-point number.
     * The value is stored as an integer, where the lower 48 bits represent the fractional part.
     */
    constructor(value: BN);
    static FRACTIONAL_BITS: number;
    static ONE: BN;
    /**
     * Creates a FixedPoint instance from a BN instance.
     *
     * @param {BN} num - The BN instance to convert.
     * @returns {FixedPoint} The FixedPoint instance.
     */
    static fromBN(num: BN): FixedPoint;
    /**
     * Converts the fixed-point number to a JavaScript number.
     *
     * In the Plasma SDK context, this is useful to display LP reward amounts, fee amounts, etc. to users.
     *
     * @returns {number} The JavaScript number representation.
     * @throws {Error} If the number is too large to safely convert to a JavaScript number.
     */
    toNumber(): number;
}
