### Contoh Project VsCode Extension untuk membuat Snippet
Ini adalah contoh project extension di vscode.
Dari project ini kita bisa belajar cara membuat snippet melalui contoh
Yang paling sederhana.

### Cara Menambahkan Snippet
```
edit file snippets/snippets.json
```

### Cara Menambahkan Fitur Wrap in XXX
```
1. buka src/commands.ts
2. edit array commands
3. buka package.json
4. tambahkan pada "commands", "keybindings" dan "commandPallete"
```

### Cara Deploy
```
publish.bat
```


### Cara Menjalankan Extension
```
npm install --save
```

```
vsce package --out out
```

atau

```
build.bat
```

```
F5
```


### Requirement
Install VSCE
```
npm install -g @vscode/vsce
```

PENTING! Buka link ini:
https://code.visualstudio.com/api/working-with-extensions/publishing-extension