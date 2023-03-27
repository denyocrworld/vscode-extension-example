import * as vscode from "vscode";
import { commands } from "./../commands";
export class CodeActionProvider implements vscode.CodeActionProvider {
  public provideCodeActions(): vscode.Command[] {
    const editorX = vscode.window.activeTextEditor;

    if (!editorX) {
      return [];
    }
    //const pickedText = editorX.document.getText(selected(editorX));

    var verText = editorX.document.getText(editorX.selection).length;
    const codeActions: any = [];

    commands.forEach((item) => {
      codeActions.push({
        command: verText == 0 ? item["command"] : "capekngoding.removeKey",
        title: item["title"],
      });
    });

    return codeActions;
  }
}
