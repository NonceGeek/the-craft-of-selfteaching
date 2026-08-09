
# Visual Studio Code / Cursor 的安装与配置

官方文档请查询：

> https://code.visualstudio.com/docs  
> https://cursor.com/docs（若你用的是 Cursor）

以下以 VS Code 为例；Cursor 基于同类扩展生态，多数步骤可类比。

## 允许命令行启动 VS Code

使用快捷键 `⇧⌘p` 呼出 Command Palette，在其中输入 `shell command`，而后选中 `Install 'code' command in PATH`。此后，就可以在 Terminal 命令行中使用 `code` 命令了。（Windows 系统安装 VS Code 时会自动配置好，并不需要此步骤）

![](https://raw.githubusercontent.com/selfteaching/the-craft-of-selfteaching/master/images/vscode-shell.png?raw=true)

## 确认 Node.js 可用

Javascript 开发通常不依赖 VS Code 去“选解释器版本”那一套；更常见的是：本机装好 Node（或 Deno），在集成终端里直接跑。

打开终端确认：

```bash
node -v
npm -v
# 若使用 nvm：
nvm ls
```

若尚未安装，请先阅读附录 [Node.js（与 Deno）的安装与配置](T-appendix.jupyter-installation-and-setup.md)。

在 VS Code / Cursor 中，建议打开工作区后用 `` Ctrl/Cmd + ` `` 打开集成终端，保证终端里的 `node` 就是你打算用的那个版本。

## 安装扩展

使用快捷键 `⇧⌘x` 呼出扩展面板。建议安装：

> * **JavaScript and TypeScript Nightly**（或内置 JS/TS 支持已够用时可不装）
> * **ESLint** —— 代码风格与常见错误提示
> * **Prettier** —— 格式化（可选）
> * **Error Lens** —— 把诊断直接标在行尾（可选，很爽）

另外，为了输入方便，有两个扩展可选安装：

> * Tabout 有它之后，可以使用 TAB 键跳出光标后的括号、引号等等；
> * Sublime Text Keymap and Settings Importer 有它之后，可以在 VS Code 中使用 SublimeText 的快捷键，最重要的当属多光标编辑 `⇧⌘l`……

## 自动补全

专业编辑器最重要的功能之一，就是能够在你输入的时候它帮你做到 “自动补全”，通常使用的快捷键是 TAB 键 `⇥`。

TAB 键 `⇥` 触发的自动补全有两种：

> * 当前文件中已有的字符串。比如，之前你输入过 `sumOfWord`；那么，之后，你就可以输入 `su` 或者干脆 `sow` 而后按 TAB 键 `⇥`，“自动补全” 功能会帮你完成输入 `sumOfWord`
> * 已有的 Snippets。比如，当你需要输入 `if (...) { ... }` 的时候，实际上当你输入 `if` 或者甚至 `i` 之后，你就可以用 TAB 键 `⇥`，“自动补全” 功能会为你 “自动完成” 语句块的输入。

字符串自动补全，使用的是所谓的 Fuzzy Match。输入 `sumOfWord` 中所包含的任意字符的任意组合（按顺序），它都会尽量去匹配；所以，`su` 和 `sow` 都可以匹配 `sumOfWord`，再比如，`rst` 可以匹配 `result`。

在 Snippet 自动补全的过程中，常常有若干个 “TAB Stop”，即，有若干个位置可以使用 TAB 键 `⇥`（或者，`Shift + ⇥`）来回切换；这时，第一种字符串自动补全的功能就失效了，如果需要使用字符串自动补全，那么需要按快捷键 ESC `⎋` 退出 Snippet 自动补全模式。

以下的 gif 文件演示的是类似下面代码的输入过程（动图语言可能不同，手感一样；你在本地用 Javascript 练即可）：

```javascript
import fs from 'node:fs';

function sumOfWord(word) {
  let sum = 0;
  for (const char of word) {
    sum += char.charCodeAt(0) - 96;
  }
  return sum;
}

const words = fs.readFileSync('words_alpha.txt', 'utf8').split(/\r?\n/);
const out = words.filter((word) => sumOfWord(word.trim()) === 100);
fs.writeFileSync('results.txt', out.join('\n') + '\n');
```

因为有这样的功能，所以你在输入程序的时候其实是非常从容的，可以很慢输入，边思考边输入…… 可实际上，完成速度却很快。

![](https://raw.githubusercontent.com/selfteaching/the-craft-of-selfteaching/master/images/vscodedemo.gif?raw=true)

另外，SublimeText 的多光标输入是很多程序员爱不释手的功能，于是，各种编辑器里都有第三方写的 SublimeText Keymap 插件。
