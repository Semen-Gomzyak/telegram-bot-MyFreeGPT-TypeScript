"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productSchema_1 = __importDefault(require("./productSchema"));
const taskSchema_1 = __importDefault(require("./taskSchema"));
const userSchema_1 = __importDefault(require("./userSchema"));
const modelSchema = {
    Product: productSchema_1.default,
    Task: taskSchema_1.default,
    User: userSchema_1.default,
};
exports.default = modelSchema;
//# sourceMappingURL=index.js.map