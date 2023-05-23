"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const taskValidateSchema_1 = __importDefault(require("./taskValidateSchema"));
const productValidateSchema_1 = __importDefault(require("./productValidateSchema"));
const validationsSchema = {
    taskValidateSchema: taskValidateSchema_1.default,
    productValidateSchema: productValidateSchema_1.default,
};
exports.default = validationsSchema;
//# sourceMappingURL=index.js.map