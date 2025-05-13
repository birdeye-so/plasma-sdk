"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bn_js_1 = __importDefault(require("bn.js"));
const FixedPoint_1 = require("../util/FixedPoint");
const assert_1 = __importDefault(require("assert"));
describe('FixedPoint', () => {
    it('should correctly convert small integers', () => {
        const fp = FixedPoint_1.FixedPoint.fromBN(new bn_js_1.default(5).shln(48));
        assert_1.default.strictEqual(fp.toNumber(), 5);
    });
    it('should correctly convert large integers', () => {
        const fp = FixedPoint_1.FixedPoint.fromBN(new bn_js_1.default(1000000).shln(48));
        assert_1.default.strictEqual(fp.toNumber(), 1000000);
    });
    it('should correctly convert small fractions', () => {
        const fp = FixedPoint_1.FixedPoint.fromBN(new bn_js_1.default(5).shln(46)); // 5/4 = 1.25
        assert_1.default.strictEqual(fp.toNumber(), 1.25);
    });
    it('should correctly convert large fractions', () => {
        // 123456789.012345
        const fp = FixedPoint_1.FixedPoint.fromBN(new bn_js_1.default('123456789012345').mul(new bn_js_1.default(2).pow(new bn_js_1.default(48))).div(new bn_js_1.default(1000000)));
        assert_1.default.strictEqual(fp.toNumber(), 123456789.012345);
    });
    it('should handle numbers very close to zero', () => {
        const fp = FixedPoint_1.FixedPoint.fromBN(new bn_js_1.default(1)); // Smallest positive value
        (0, assert_1.default)(fp.toNumber() > 0 && fp.toNumber() < 1e-14);
    });
    it('should handle the maximum safe integer', () => {
        const fp = FixedPoint_1.FixedPoint.fromBN(new bn_js_1.default(Number.MAX_SAFE_INTEGER).shln(48));
        assert_1.default.strictEqual(fp.toNumber(), Number.MAX_SAFE_INTEGER);
    });
    it('should handle numbers larger than MAX_SAFE_INTEGER', () => {
        const fp = FixedPoint_1.FixedPoint.fromBN(new bn_js_1.default('9007199254740993').shln(48)); // 2^53 + 1
        (0, assert_1.default)(fp.value.abs().gt(new bn_js_1.default(Number.MAX_SAFE_INTEGER)));
    });
});
//# sourceMappingURL=FixedPoint.test.js.map