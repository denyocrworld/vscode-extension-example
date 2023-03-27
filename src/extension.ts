import * as vscode from "vscode";
import { ExtensionContext, window } from "vscode";
import { CodeActionProvider } from "./util/code_action";
import { insertSnippet } from "./util/insert_snippet";
import { commands } from "./commands";

export async function activate(context: ExtensionContext) {
  for (var i = 0; i < commands.length; i++) {
    var command = commands[i]["command"];
    var code = commands[i]["code"];
    context.subscriptions.push(vscode.commands.registerCommand(command, code));
  }

  context.subscriptions.push(
    vscode.languages.registerCodeActionsProvider(
      { pattern: "**/*.{dart}", scheme: "file" },
      new CodeActionProvider()
    )
  );
}
