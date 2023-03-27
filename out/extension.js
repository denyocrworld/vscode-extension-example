"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode = require("vscode");
const code_action_1 = require("./util/code_action");
const commands_1 = require("./commands");
function activate(context) {
    return __awaiter(this, void 0, void 0, function* () {
        for (var i = 0; i < commands_1.commands.length; i++) {
            var command = commands_1.commands[i]["command"];
            var code = commands_1.commands[i]["code"];
            context.subscriptions.push(vscode.commands.registerCommand(command, code));
        }
        context.subscriptions.push(vscode.languages.registerCodeActionsProvider({ pattern: "**/*.{dart}", scheme: "file" }, new code_action_1.CodeActionProvider()));
    });
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map