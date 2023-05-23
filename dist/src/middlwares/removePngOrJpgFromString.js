"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function removePngOrJpgFromString(string) {
    const words = string.split('.');
    words.pop();
    return words.join(',');
}
exports.default = removePngOrJpgFromString;
//# sourceMappingURL=removePngOrJpgFromString.js.map