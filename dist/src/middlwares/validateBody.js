"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpError_1 = __importDefault(require("./HttpError"));
function validateBody(schema) {
    return (req, _res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return next((0, HttpError_1.default)(400, error.message));
        }
        return next;
    };
}
exports.default = validateBody;
//# sourceMappingURL=validateBody.js.map