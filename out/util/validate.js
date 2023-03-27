"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCode = void 0;
const validateCode = (codeX, total) => {
    let regex = /[;),\]]/;
    let bool = false;
    for (let i = 0; i < 666; i++) {
        const value = codeX.charAt(total).trim();
        if (value) {
            return regex.test(value) ? true : bool;
        }
        total++;
    }
    return bool;
};
exports.validateCode = validateCode;
//# sourceMappingURL=validate.js.map