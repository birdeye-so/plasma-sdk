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
Object.defineProperty(exports, "__esModule", { value: true });
exports.layout = exports.fromJSON = exports.fromDecoded = exports.WithdrawProtocolFees = exports.InitializePool = exports.InitializeLpPosition = exports.WithdrawLpFees = exports.RenounceLiquidity = exports.RemoveLiquidity = exports.AddLiquidity = exports.Swap = void 0;
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class Swap {
    constructor(value) {
        this.discriminator = 0;
        this.kind = "Swap";
        this.value = {
            header: new types.PlasmaEventHeader({ ...value.header }),
            event: new types.SwapEvent({ ...value.event }),
        };
    }
    toJSON() {
        return {
            kind: "Swap",
            value: {
                header: this.value.header.toJSON(),
                event: this.value.event.toJSON(),
            },
        };
    }
    toEncodable() {
        return {
            Swap: {
                header: types.PlasmaEventHeader.toEncodable(this.value.header),
                event: types.SwapEvent.toEncodable(this.value.event),
            },
        };
    }
}
exports.Swap = Swap;
Swap.discriminator = 0;
Swap.kind = "Swap";
class AddLiquidity {
    constructor(value) {
        this.discriminator = 1;
        this.kind = "AddLiquidity";
        this.value = {
            header: new types.PlasmaEventHeader({ ...value.header }),
            event: new types.AddLiquidityEvent({ ...value.event }),
        };
    }
    toJSON() {
        return {
            kind: "AddLiquidity",
            value: {
                header: this.value.header.toJSON(),
                event: this.value.event.toJSON(),
            },
        };
    }
    toEncodable() {
        return {
            AddLiquidity: {
                header: types.PlasmaEventHeader.toEncodable(this.value.header),
                event: types.AddLiquidityEvent.toEncodable(this.value.event),
            },
        };
    }
}
exports.AddLiquidity = AddLiquidity;
AddLiquidity.discriminator = 1;
AddLiquidity.kind = "AddLiquidity";
class RemoveLiquidity {
    constructor(value) {
        this.discriminator = 2;
        this.kind = "RemoveLiquidity";
        this.value = {
            header: new types.PlasmaEventHeader({ ...value.header }),
            event: new types.RemoveLiquidityEvent({ ...value.event }),
        };
    }
    toJSON() {
        return {
            kind: "RemoveLiquidity",
            value: {
                header: this.value.header.toJSON(),
                event: this.value.event.toJSON(),
            },
        };
    }
    toEncodable() {
        return {
            RemoveLiquidity: {
                header: types.PlasmaEventHeader.toEncodable(this.value.header),
                event: types.RemoveLiquidityEvent.toEncodable(this.value.event),
            },
        };
    }
}
exports.RemoveLiquidity = RemoveLiquidity;
RemoveLiquidity.discriminator = 2;
RemoveLiquidity.kind = "RemoveLiquidity";
class RenounceLiquidity {
    constructor(value) {
        this.discriminator = 3;
        this.kind = "RenounceLiquidity";
        this.value = {
            header: new types.PlasmaEventHeader({ ...value.header }),
            event: new types.RenounceLiquidityEvent({ ...value.event }),
        };
    }
    toJSON() {
        return {
            kind: "RenounceLiquidity",
            value: {
                header: this.value.header.toJSON(),
                event: this.value.event.toJSON(),
            },
        };
    }
    toEncodable() {
        return {
            RenounceLiquidity: {
                header: types.PlasmaEventHeader.toEncodable(this.value.header),
                event: types.RenounceLiquidityEvent.toEncodable(this.value.event),
            },
        };
    }
}
exports.RenounceLiquidity = RenounceLiquidity;
RenounceLiquidity.discriminator = 3;
RenounceLiquidity.kind = "RenounceLiquidity";
class WithdrawLpFees {
    constructor(value) {
        this.discriminator = 4;
        this.kind = "WithdrawLpFees";
        this.value = {
            header: new types.PlasmaEventHeader({ ...value.header }),
            event: new types.WithdrawLpFeesEvent({ ...value.event }),
        };
    }
    toJSON() {
        return {
            kind: "WithdrawLpFees",
            value: {
                header: this.value.header.toJSON(),
                event: this.value.event.toJSON(),
            },
        };
    }
    toEncodable() {
        return {
            WithdrawLpFees: {
                header: types.PlasmaEventHeader.toEncodable(this.value.header),
                event: types.WithdrawLpFeesEvent.toEncodable(this.value.event),
            },
        };
    }
}
exports.WithdrawLpFees = WithdrawLpFees;
WithdrawLpFees.discriminator = 4;
WithdrawLpFees.kind = "WithdrawLpFees";
class InitializeLpPosition {
    constructor(value) {
        this.discriminator = 5;
        this.kind = "InitializeLpPosition";
        this.value = {
            header: new types.PlasmaEventHeader({ ...value.header }),
            event: new types.InitializeLpPositionEvent({ ...value.event }),
        };
    }
    toJSON() {
        return {
            kind: "InitializeLpPosition",
            value: {
                header: this.value.header.toJSON(),
                event: this.value.event.toJSON(),
            },
        };
    }
    toEncodable() {
        return {
            InitializeLpPosition: {
                header: types.PlasmaEventHeader.toEncodable(this.value.header),
                event: types.InitializeLpPositionEvent.toEncodable(this.value.event),
            },
        };
    }
}
exports.InitializeLpPosition = InitializeLpPosition;
InitializeLpPosition.discriminator = 5;
InitializeLpPosition.kind = "InitializeLpPosition";
class InitializePool {
    constructor(value) {
        this.discriminator = 6;
        this.kind = "InitializePool";
        this.value = {
            header: new types.PlasmaEventHeader({ ...value.header }),
            event: new types.InitializePoolEvent({ ...value.event }),
        };
    }
    toJSON() {
        return {
            kind: "InitializePool",
            value: {
                header: this.value.header.toJSON(),
                event: this.value.event.toJSON(),
            },
        };
    }
    toEncodable() {
        return {
            InitializePool: {
                header: types.PlasmaEventHeader.toEncodable(this.value.header),
                event: types.InitializePoolEvent.toEncodable(this.value.event),
            },
        };
    }
}
exports.InitializePool = InitializePool;
InitializePool.discriminator = 6;
InitializePool.kind = "InitializePool";
class WithdrawProtocolFees {
    constructor(value) {
        this.discriminator = 7;
        this.kind = "WithdrawProtocolFees";
        this.value = {
            header: new types.PlasmaEventHeader({ ...value.header }),
            event: new types.WithdrawProtocolFeesEvent({ ...value.event }),
        };
    }
    toJSON() {
        return {
            kind: "WithdrawProtocolFees",
            value: {
                header: this.value.header.toJSON(),
                event: this.value.event.toJSON(),
            },
        };
    }
    toEncodable() {
        return {
            WithdrawProtocolFees: {
                header: types.PlasmaEventHeader.toEncodable(this.value.header),
                event: types.WithdrawProtocolFeesEvent.toEncodable(this.value.event),
            },
        };
    }
}
exports.WithdrawProtocolFees = WithdrawProtocolFees;
WithdrawProtocolFees.discriminator = 7;
WithdrawProtocolFees.kind = "WithdrawProtocolFees";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromDecoded(obj) {
    if (typeof obj !== "object") {
        throw new Error("Invalid enum object");
    }
    if ("Swap" in obj) {
        const val = obj["Swap"];
        return new Swap({
            header: types.PlasmaEventHeader.fromDecoded(val["header"]),
            event: types.SwapEvent.fromDecoded(val["event"]),
        });
    }
    if ("AddLiquidity" in obj) {
        const val = obj["AddLiquidity"];
        return new AddLiquidity({
            header: types.PlasmaEventHeader.fromDecoded(val["header"]),
            event: types.AddLiquidityEvent.fromDecoded(val["event"]),
        });
    }
    if ("RemoveLiquidity" in obj) {
        const val = obj["RemoveLiquidity"];
        return new RemoveLiquidity({
            header: types.PlasmaEventHeader.fromDecoded(val["header"]),
            event: types.RemoveLiquidityEvent.fromDecoded(val["event"]),
        });
    }
    if ("RenounceLiquidity" in obj) {
        const val = obj["RenounceLiquidity"];
        return new RenounceLiquidity({
            header: types.PlasmaEventHeader.fromDecoded(val["header"]),
            event: types.RenounceLiquidityEvent.fromDecoded(val["event"]),
        });
    }
    if ("WithdrawLpFees" in obj) {
        const val = obj["WithdrawLpFees"];
        return new WithdrawLpFees({
            header: types.PlasmaEventHeader.fromDecoded(val["header"]),
            event: types.WithdrawLpFeesEvent.fromDecoded(val["event"]),
        });
    }
    if ("InitializeLpPosition" in obj) {
        const val = obj["InitializeLpPosition"];
        return new InitializeLpPosition({
            header: types.PlasmaEventHeader.fromDecoded(val["header"]),
            event: types.InitializeLpPositionEvent.fromDecoded(val["event"]),
        });
    }
    if ("InitializePool" in obj) {
        const val = obj["InitializePool"];
        return new InitializePool({
            header: types.PlasmaEventHeader.fromDecoded(val["header"]),
            event: types.InitializePoolEvent.fromDecoded(val["event"]),
        });
    }
    if ("WithdrawProtocolFees" in obj) {
        const val = obj["WithdrawProtocolFees"];
        return new WithdrawProtocolFees({
            header: types.PlasmaEventHeader.fromDecoded(val["header"]),
            event: types.WithdrawProtocolFeesEvent.fromDecoded(val["event"]),
        });
    }
    throw new Error("Invalid enum object");
}
exports.fromDecoded = fromDecoded;
function fromJSON(obj) {
    switch (obj.kind) {
        case "Swap": {
            return new Swap({
                header: types.PlasmaEventHeader.fromJSON(obj.value.header),
                event: types.SwapEvent.fromJSON(obj.value.event),
            });
        }
        case "AddLiquidity": {
            return new AddLiquidity({
                header: types.PlasmaEventHeader.fromJSON(obj.value.header),
                event: types.AddLiquidityEvent.fromJSON(obj.value.event),
            });
        }
        case "RemoveLiquidity": {
            return new RemoveLiquidity({
                header: types.PlasmaEventHeader.fromJSON(obj.value.header),
                event: types.RemoveLiquidityEvent.fromJSON(obj.value.event),
            });
        }
        case "RenounceLiquidity": {
            return new RenounceLiquidity({
                header: types.PlasmaEventHeader.fromJSON(obj.value.header),
                event: types.RenounceLiquidityEvent.fromJSON(obj.value.event),
            });
        }
        case "WithdrawLpFees": {
            return new WithdrawLpFees({
                header: types.PlasmaEventHeader.fromJSON(obj.value.header),
                event: types.WithdrawLpFeesEvent.fromJSON(obj.value.event),
            });
        }
        case "InitializeLpPosition": {
            return new InitializeLpPosition({
                header: types.PlasmaEventHeader.fromJSON(obj.value.header),
                event: types.InitializeLpPositionEvent.fromJSON(obj.value.event),
            });
        }
        case "InitializePool": {
            return new InitializePool({
                header: types.PlasmaEventHeader.fromJSON(obj.value.header),
                event: types.InitializePoolEvent.fromJSON(obj.value.event),
            });
        }
        case "WithdrawProtocolFees": {
            return new WithdrawProtocolFees({
                header: types.PlasmaEventHeader.fromJSON(obj.value.header),
                event: types.WithdrawProtocolFeesEvent.fromJSON(obj.value.event),
            });
        }
    }
}
exports.fromJSON = fromJSON;
function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([
            types.PlasmaEventHeader.layout("header"),
            types.SwapEvent.layout("event"),
        ], "Swap"),
        borsh.struct([
            types.PlasmaEventHeader.layout("header"),
            types.AddLiquidityEvent.layout("event"),
        ], "AddLiquidity"),
        borsh.struct([
            types.PlasmaEventHeader.layout("header"),
            types.RemoveLiquidityEvent.layout("event"),
        ], "RemoveLiquidity"),
        borsh.struct([
            types.PlasmaEventHeader.layout("header"),
            types.RenounceLiquidityEvent.layout("event"),
        ], "RenounceLiquidity"),
        borsh.struct([
            types.PlasmaEventHeader.layout("header"),
            types.WithdrawLpFeesEvent.layout("event"),
        ], "WithdrawLpFees"),
        borsh.struct([
            types.PlasmaEventHeader.layout("header"),
            types.InitializeLpPositionEvent.layout("event"),
        ], "InitializeLpPosition"),
        borsh.struct([
            types.PlasmaEventHeader.layout("header"),
            types.InitializePoolEvent.layout("event"),
        ], "InitializePool"),
        borsh.struct([
            types.PlasmaEventHeader.layout("header"),
            types.WithdrawProtocolFeesEvent.layout("event"),
        ], "WithdrawProtocolFees"),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
exports.layout = layout;
//# sourceMappingURL=PlasmaEvent.js.map