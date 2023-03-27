"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fsx = void 0;
const vscode = require("vscode");
const axios = require("axios");
var os = require("os");
var rootPath = vscode.workspace.workspaceFolders[0].uri.path;
var slashRequired = os.type().toLowerCase().startsWith("win") == false;
var path = require("path");
if (slashRequired) {
    rootPath = "/" + rootPath;
}
if (rootPath[0] == "/" && rootPath[2] == ":") {
    rootPath = rootPath.substring(1, rootPath.length);
}
//----------------------------------
var fs = require("fs-extra");
const cp = require("child_process");
if (rootPath[0] == "/") {
    rootPath = rootPath.substring(1);
}
class Fsx {
    static get isWindows() {
        return os.type().toLowerCase().startsWith("win");
    }
    static get packageName() {
        var config = Fsx.readConfigFile(`${Fsx.rootPath}\\pubspec.yaml`);
        return config["name"].trim();
    }
    static get projectPath() {
        return vscode.workspace.workspaceFolders[0].uri.fsPath;
    }
    static fixPath(path) {
        path = path.replaceAll("\\", "/");
        path = path.replaceAll("//", "/");
        path = path.replaceAll("//", "/");
        if (slashRequired && path[0] != "c" && path[1] != "d") {
            path = "/" + path;
        }
        path = path.replaceAll("//", "/");
        path = path.replaceAll("//", "/");
        path = path.replaceAll("//", "/");
        return path;
    }
    static readConfigFile(path) {
        path = Fsx.fixPath(path);
        var pubspecContent = fs.readFileSync(path, "utf-8");
        pubspecContent = pubspecContent.replace(/ /g, "");
        pubspecContent = pubspecContent.replace(/\t/g, "");
        var arr = pubspecContent.split("\n");
        var obj = {};
        for (var i = 0; i < arr.length; i++) {
            var values = arr[i].split(":");
            if (values.length <= 1)
                continue;
            var key = values[0].trim();
            var value = values[1].trim();
            if (typeof value == "undefined")
                continue;
            if (value == "")
                continue;
            obj[key] = value;
        }
        return obj;
    }
    static readConfigAsArray(path) {
        path = Fsx.fixPath(path);
        var pubspecContent = fs.readFileSync(path, "utf-8");
        var arr = pubspecContent.split("\n");
        return arr;
    }
    static readDepedencies(path) {
        path = Fsx.fixPath(path);
        var pubspecContent = fs.readFileSync(path, "utf-8");
        var content = pubspecContent.split("dependencies:")[1];
        var lines = content.split("\r\n");
        var arr = [];
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            if (line.substring(0, 2) == "  ") {
                if (line.trim()[0] == "#")
                    continue;
                if (line.indexOf("flutter") > -1)
                    continue;
                if (line.indexOf("sdk:") > -1)
                    continue;
                arr.push(line);
            }
        }
        var arr = [...new Set(arr)];
        return arr;
    }
    static writeDepedencies(path, values) {
        path = Fsx.fixPath(path);
        var content = fs.readFileSync(path, "utf-8");
        var arr = content.split("\r\n");
        console.log(arr);
        var obj = {};
        var lastKey = "";
        for (var i = 0; i < arr.length; i++) {
            var line = arr[i];
            if (line.trim()[0] == "#")
                continue;
            if (line.substring(0, 2) == "  ") {
                if (typeof obj[lastKey] == "undefined") {
                    obj[lastKey] = [];
                }
                obj[lastKey].push(line);
            }
            else {
                if (line.trim().length > 0) {
                    console.log(line);
                    lastKey = line;
                    obj[lastKey] = [];
                }
            }
        }
        obj["dependencies:"] = values;
        var newContent = [];
        for (var key in obj) {
            newContent.push(key);
            for (var i = 0; i < obj[key].length; i++) {
                var row = obj[key][i];
                newContent.push(row);
            }
        }
        console.log("New Content");
        console.log(newContent);
        fs.writeFileSync(path, newContent.join("\r\n"));
    }
    //from fs-extra
    static readDirectories(path) {
        path = Fsx.fixPath(path);
        var results = [];
        var list = fs.readdirSync(path);
        list.forEach(function (file) {
            file = path + "/" + file;
            file = file.replace(/\\/g, "/");
            var stat = fs.statSync(file);
            if (stat && stat.isDirectory()) {
                /* Recurse into a subdirectory */
                results = results.concat(Fsx.readDirectories(file));
            }
            else {
                /* Is a file */
                results.push(file);
            }
        });
        return results;
    }
    static deleteAllFileAndDirectory(path) {
        var commands = [];
        path = Fsx.fixPath(path);
        var results = [];
        var list = fs.readdirSync(path);
        list.forEach(function (file) {
            file = path + "/" + file;
            file = file.replace(/\\/g, "/");
            var stat = fs.statSync(file);
            if (stat && stat.isDirectory()) {
                /* Recurse into a subdirectory */
                // results = results.concat(Fsx.readDirectories(file));
                commands.push(`rmdir /S /Q \"${file}\"`);
            }
            else {
                /* Is a file */
                results.push(file);
                commands.push(`del /F /S /Q /A \"${file}\"`);
            }
        });
        Fsx.exec(commands.join(" && "));
        return results;
    }
    static existsSync(path) {
        path = Fsx.fixPath(path);
        return fs.existsSync(path);
    }
    static createFileSync(path) {
        path = Fsx.fixPath(path);
        return fs.createFileSync(path);
    }
    static writeFileSync(path, content) {
        path = Fsx.fixPath(path);
        return fs.writeFileSync(path, content);
    }
    static mkdirsSync(path) {
        path = Fsx.fixPath(path);
        return fs.mkdirsSync(path);
    }
    static readFileSync(path) {
        path = Fsx.fixPath(path);
        return fs.readFileSync(path, "utf8");
    }
    static remove(path) {
        path = Fsx.fixPath(path);
        return fs.remove(path);
    }
    static lstatSync(path) {
        path = Fsx.fixPath(path);
        return fs.lstatSync(path);
    }
    static createWriteStream(path) {
        path = Fsx.fixPath(path);
        return fs.createWriteStream(path);
    }
    static removeSync(path) {
        path = Fsx.fixPath(path);
        console.log(`remove ${path}`);
        fs.removeSync(path);
    }
    static emptyDirSync(path) {
        path = Fsx.fixPath(path);
        fs.emptyDirSync(path);
    }
    static copySync(source, target) {
        source = Fsx.fixPath(source);
        target = Fsx.fixPath(target);
        fs.copySync(source, target);
    }
    static downloadFile(url, targetLocation) {
        targetLocation = Fsx.fixPath(targetLocation);
        let fileName = path.basename(targetLocation);
        axios({
            url,
            method: "GET",
            responseType: "stream",
        }).then((response) => {
            response.data.pipe(fs.createWriteStream(targetLocation));
            console.log(`${fileName} is downloaded!`);
        });
    }
}
exports.Fsx = Fsx;
Fsx.fs = fs;
Fsx.rootPath = rootPath;
Fsx.exec = (query) => new Promise((resolve, reject) => {
    console.log(`Execute ${query}`);
    cp.exec(`cd ${Fsx.fixPath(rootPath)} && ${query}`, (err, out) => {
        if (err) {
            return reject(err);
        }
        return resolve(out);
    });
});
//# sourceMappingURL=fsx.js.map