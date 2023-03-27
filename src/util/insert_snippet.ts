import * as vscode from "vscode";
import { selected } from "./selected";
import { getSelectedRange } from "./get_selected_range";
import G = require("glob");
import { wait } from "./wait";
import { WidgetRemover } from "./widget_remover";

export async function insertSnippet(content: string, removeWidget = false) {
  const editorX = vscode.window.activeTextEditor;
  // var currentLine = editorX.selection.active.line;
  var currentLine = editorX.visibleRanges[0].start.line;

  if (content.indexOf("@CONTENT") == -1) {
    var currentLineSelection = new vscode.Selection(
      new vscode.Position(editorX.selection.active.line, 0),
      new vscode.Position(editorX.selection.active.line, 0)
    );
    editorX.insertSnippet(new vscode.SnippetString(content), currentLineSelection);

    setTimeout(function () {
      vscode.commands.executeCommand("editor.action.formatDocument");
    }, 100);
    return;
  }

  if (editorX && editorX.selection.start !== editorX.selection.end) {
    var newContent = content.trim();
    const item = getSelectedRange(editorX);
    const selectedT = item["selection"];

    var hasReturn = false;
    var hasFirebaseSnippet = false;
    var hasChild = false;
    var childKey = "";

    var fullContent = editorX.document.getText();

    //---------------

    var lines = fullContent.split("\n");
    if (lines[item["startLine"]].indexOf("return") > -1) {
      hasReturn = true;
    }
    if (lines[item["startLine"]].indexOf(":") > -1) {
      hasChild = true;
      childKey = lines[item["startLine"]].split(":")[0];
    }

    //clean up!
    var currentContent = item["currentSelectionContent"].trim();
    if (currentContent[currentContent.length - 1] == ",") {
      currentContent = currentContent.substring(0, currentContent.length - 1);
    }

    var lines = currentContent.split("\n");
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i].trim();
      if (line.startsWith("//")) {
        lines[i] = "";
      }
    }
    currentContent = lines.join("\n");

    // currentContent = currentContent.replace(/;/, "");

    //---------

    if (newContent.indexOf("Firebase") > -1) {
      hasFirebaseSnippet = true;
    }

    if (hasReturn) {
      newContent = "return " + newContent.trim();
    }

    if (hasChild) {
      newContent = `${childKey}: ` + newContent.trim();
    }

    // Update currentContent if N
    if (content.startsWith("Expanded")) {
      currentContent = currentContent.replace(/shrinkWrap: true,/g, "");
    }

    if (removeWidget) {
      currentContent = WidgetRemover(currentContent);
    }

    //-----------------

    console.log("################");
    console.log(currentContent);
    console.log("################");
    var arr = currentContent.split(":");
    var oldPrefix = "";
    if (arr[0].indexOf("(") == -1) {
      oldPrefix = arr[0];
      console.log(`OLD PREFIX: ${oldPrefix}`);
    }

    newContent = newContent.replace(/@CONTENT/g, currentContent);
    newContent = newContent.replace(/\n/g, "");
    newContent = newContent.replace("return return", "return");
    newContent = newContent.replace("child:body:", "child:");
    newContent = newContent.replace("child:child:", "child:");
    newContent = newContent.replace("child:return", "child:");
    newContent = newContent.replace("child: return", "child:");
    newContent = newContent.replace(");,", "),");
    newContent = newContent.replace(";;", ";");
    newContent = newContent.replace(";,", ",");
    newContent = newContent.replace(",,", ",");

    newContent = newContent.replace("[body:", "[");
    newContent = newContent.replace("[item:", "[");
    newContent = newContent.replace("[child:", "[");
    newContent = newContent.replace("[return", "[");
    newContent = newContent.replace("[return", "[");

    // newContent = newContent.replace("\\$", "\\\\\\$");
    // newContent = newContent.replace("\\$", "\\\\\\DOLLAR_SYMBOL");
    // newContent = newContent.replace(/\\$/g, "\\\$");;
    newContent = newContent.replace(/\$/g, "@TEMP_SYMBOL@USD_SYMBOL");
    newContent = newContent.replace(/@USD_SYMBOL/g, "\\$");
    newContent = newContent.replace(/\\@TEMP_SYMBOL/g, "\\\\");
    newContent = newContent.replace(/@TEMP_SYMBOL/g, "");

    if (removeWidget) {
      //
    } else {
      //remove start Prefix:
      var arr = newContent.trim().split("\n");
      if (arr[0].indexOf(":") > -1) {
        var prefix = arr[0].split(":")[0];
        //examples: title: , child:, body:,
        newContent = newContent.replace(`[${prefix}:`, `[`);
        newContent = newContent.replace(`child:${prefix}:`, `child:`);
      }
    }

    console.log("@@@@@@@@@@@@@@@@");
    console.log(newContent);
    console.log("@@@@@@@@@@@@@@@@");

    //
    await editorX.insertSnippet(new vscode.SnippetString(newContent), selectedT);
    // var currentLineRange = editorX.selection.active;
    // await editorX.edit(edit => edit.replace(currentLineRange, newContent));

    var currentLineSelection = new vscode.Selection(
      new vscode.Position(1418, 0),
      new vscode.Position(1418, 0)
    );

    await wait(200);

    var documentText = editorX.document.getText();
    var documentArr = documentText.split("\n");
    for (var i = 0; i < documentArr.length; i++) {
      var lineString = documentArr[i];
      if (lineString.trim().endsWith(",,")) {
        lineString = lineString.replace(/,,/g, ",");
        lineString = lineString.replace(/\[child:/g, "[");
        lineString = lineString.replace(/\[children:/g, "[");
        lineString = lineString.replace(/\[body:/g, "[");
        lineString = lineString.replace(/\[appBar:/g, "[");
        const currentLineRange = editorX.document.lineAt(i).range;
        await editorX.edit((edit) => edit.replace(currentLineRange, lineString));
      }
    }

    vscode.commands.executeCommand("editor.action.formatDocument").then(function () {
      var fullLineCount = vscode.window.activeTextEditor.document.getText().split("\n").length;
      const selectedStartLine = vscode.window.activeTextEditor.selection.start.line;
      vscode.window.activeTextEditor.revealRange(
        new vscode.Range(new vscode.Position(currentLine, 0), new vscode.Position(currentLine, 0))
      );
    });
  }
}
