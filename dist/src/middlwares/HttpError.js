"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpError = (status, message) => {
    const err = new Error(message);
    err.status = status;
    return err;
};
exports.default = HttpError;
//# sourceMappingURL=HttpError.js.map