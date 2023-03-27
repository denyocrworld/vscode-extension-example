"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeActionProvider = void 0;
const vscode = require("vscode");
const commands_1 = require("./../commands");
class CodeActionProvider {
    provideCodeActions() {
        const editorX = vscode.window.activeTextEditor;
        if (!editorX) {
            return [];
        }
        //const pickedText = editorX.document.getText(selected(editorX));
        var verText = editorX.document.getText(editorX.selection).length;
        const codeActions = [];
        commands_1.commands.forEach((item) => {
            codeActions.push({
                command: verText == 0 ? item["command"] : "capekngoding.removeKey",
                title: item["title"],
            });
        });
        return codeActions;
    }
}
exports.CodeActionProvider = CodeActionProvider;
//# sourceMappingURL=code_action.js.map