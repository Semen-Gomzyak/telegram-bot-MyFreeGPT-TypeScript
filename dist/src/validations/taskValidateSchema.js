"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const taskValidateSchema = joi_1.default.object({
    title: joi_1.default.string().min(2).max(48).required(),
    description: joi_1.default.string().min(10).max(1000).required(),
    priority: joi_1.default.string().valid('low', 'middle', 'high').required(),
    expired_at: joi_1.default.date().required(),
    status: joi_1.default.string().valid('to_do', 'in_progress', 'done').required(),
    username: joi_1.default.string()
});
exports.default = taskValidateSchema;
//# sourceMappingURL=taskValidateSchema.js.map