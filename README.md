### Contoh Project VsCode Extension untuk membuat Snippet
Ini adalah contoh project extension di vscode.
Dari project ini kita bisa belajar cara membuat snippet melalui contoh
Yang paling sederhana.

### Cara Menambahkan Snippet
```
edit file snippets/snippets.json
```

### Cara Menambahkan Fitur Wrap in XXX
Cara terbaik untuk memahami cara kerja-nya adalah melihat contoh
wrapInSingleChildScrollView pada file:
commands.ts dan packages.json

Lalu jika ingin menambahkan fitur baru, cukup isi file
commands.ts dan packages.json dengan cara:
```
1. buka src/commands.ts
2. edit array commands
3. buka package.json
4. tambahkan command baru pada "commands", "keybindings" dan "commandPallete"
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