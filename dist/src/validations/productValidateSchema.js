"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const productValidateSchema = joi_1.default.object({
    name: joi_1.default.string().min(2).max(48).required(),
    price: joi_1.default.number().required(),
    image: joi_1.default.binary().required(),
    payment: joi_1.default.string().required(),
    description: joi_1.default.string().min(10).max(1000).required(),
    characteristics: joi_1.default.array().items(joi_1.default.object({
        description: joi_1.default.string().min(10).max(200).required(),
    })),
});
exports.default = productValidateSchema;
//# sourceMappingURL=productValidateSchema.js.map