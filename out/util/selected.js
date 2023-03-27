"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selected = void 0;
const vscode = require("vscode");
const validate_1 = require("./validate");
const selected = (editorX) => {
    let remove = 1;
    let startCode = editorX.document.offsetAt(editorX.selection.start);
    let endCode = editorX.document.offsetAt(editorX.selection.end) - remove;
    let codeX = editorX.document.getText();
    let positionAtX = editorX.document.positionAt(0);
    let startX = 0;
    let endX = 0;
    let regexAz = /[^A-Z]/;
    let regex = /[^a-zA-Z]/;
    const regeX = regex;
    // END
    for (let i = (codeX.length - endCode); i < codeX.length; i++) {
        switch (codeX.charAt(endCode)) {
            case '(': {
                startX++;
                break;
            }
            case ')': {
                endX++;
                break;
            }
        }
        if (i === codeX.length || endX > startX) {
            endCode = startX;
            startCode = startX;
            break;
        }
        if (startX === endX && startX > 0) {
            endCode++;
            if (!(0, validate_1.validateCode)(codeX, endCode)) {
                endCode = startX;
                startCode = startX;
            }
            break;
        }
        endCode++;
    }
    // START
    for (let i = (codeX.length - startCode); i > 0; i--) {
        let valueCode = codeX.charAt(startCode);
        if (valueCode !== '.' &&
            regeX.test(valueCode)) {
            startCode++;
            if (regexAz.test(codeX.charAt(startCode))) {
                return new vscode.Selection(positionAtX, positionAtX);
            }
            let lineText = editorX.document.positionAt(startCode).line;
            let posiText = editorX.document.lineAt(lineText).text;
            if (posiText.indexOf('with') !== -1 ||
                posiText.indexOf('implements') !== -1 ||
                posiText.indexOf('=') !== -1 ||
                posiText.indexOf('class') !== -1 ||
                posiText.indexOf('extends') !== -1) {
                return new vscode.Selection(positionAtX, positionAtX);
            }
            break;
        }
        else {
            startCode--;
        }
    }
    let startFinal = editorX.document.positionAt(startCode);
    let endFinal = editorX.document.positionAt(endCode);
    return new vscode.Selection(startFinal, endFinal);
};
exports.selected = selected;
//# sourceMappingURL=selected.js.map