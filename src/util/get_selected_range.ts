
import * as vscode from "vscode";
import { validateCode } from "./validate";

export const getSelectedRange = (editorX: vscode.TextEditor) => {
    const editor = vscode.window.activeTextEditor;
    var content = editor.document.getText();

    var startLine = editorX.selection.active.line;
    var endLine = -1;
    var startCharIndex = -1;
    var endCharIndex = -1;

    var start = false;
    var lines = content.split("\n");
    console.log(lines.length);
    console.log(startLine);

    var openSquareBracket = 0;
    var closedSquareBracket = 0;
    var found = false;
    var startIndex = 0;
    for (var lineIndex = 0; lineIndex < lines.length; lineIndex++) {
        var line = lines[lineIndex];
        if (line.trim().startsWith("//")) continue;

        if (lineIndex == startLine) {
            console.log(line);
            start = true;
        }

        if (start == false) continue;

        for (var charIndex = 0; charIndex < line.length; charIndex++) {
            var c = line[charIndex];
            if (c == "(") {
                openSquareBracket++;
            }
            else if (c == ")") {
                closedSquareBracket++;
            }

            if (openSquareBracket > 0 && openSquareBracket == closedSquareBracket) {
                endLine = lineIndex;
                endCharIndex = charIndex;

                console.log(`openSquareBracket: ${openSquareBracket}`);
                console.log(`closedSquareBracket: ${closedSquareBracket}`);
                console.log(`start: ${lines[startLine]}`);
                console.log(`line: ${line}`);
                console.log(`real_line: ${line[charIndex]}`);
                console.log(`lineIndex: ${lineIndex}`);
                console.log(`charIndex: ${charIndex}`);
                found = true;
                break;
            }
        }

        if (found) break;

    }


    var firstLine = lines[startLine];
    var firstLineArr = firstLine.split(" ");
    console.log(firstLineArr);
    for (var i = 0; i < firstLineArr.length; i++) {
        if (firstLineArr[i].indexOf("(") > -1) {
            startCharIndex = firstLine.indexOf(firstLineArr[i]);
            break;
        }
    }

    console.log(`startLine: ${startLine}, ${startCharIndex}`);
    console.log(`endLine: ${endLine}, ${endCharIndex}`);
    console.log(lines[startLine][startCharIndex]);


    // var startPosition = new vscode.Position(startLine, startCharIndex);
    var startPosition = new vscode.Position(startLine, 0);
    var endPosition = new vscode.Position(endLine, endCharIndex + 1);


    var currentSelectionContentArr = [];
    for (var i = startLine; i <= endLine; i++) {
        var line = lines[i];
        currentSelectionContentArr.push(line);
    }

    return {
        "selection": new vscode.Selection(startPosition, endPosition),
        "startLine": startLine,
        "startCharIndex": startCharIndex,
        "endLine": endLine,
        "currentSelectionContent": currentSelectionContentArr.join("\n"),

    };
}