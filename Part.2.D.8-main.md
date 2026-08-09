# 可执行的 Javascript 文件

理论上来讲，你最终可以把任何一个程序，无论大小，都封装（或者囊括）到仅仅一个函数之中。按照惯例（Convention），这个函数的名称叫做 `main()`：

```javascript
function routine1() {
  console.log('Routine 1 done.');
}

function routine2() {
  subRoutine1();
  subRoutine2();
  console.log('Routine 2 done.');
}

function subRoutine1() {
  console.log('Sub-routine 1 done.');
}

function subRoutine2() {
  console.log('Sub-routine 2 done.');
}

function main() {
  routine1();
  routine2();
  console.log('This is the end of the program.');
}

main();
```

```
Routine 1 done.
Sub-routine 1 done.
Sub-routine 2 done.
Routine 2 done.
This is the end of the program.
```

但若这个文件既可能被**直接运行**，又可能被别的模块 **import**，你通常不希望“一被导入就自动跑完整个程序”。于是需要一个开关：

> 只有当这个文件是程序入口时，才调用 `main()`。

Python 里经典写法是 `if __name__ == '__main__':`。Javascript 没有完全同名的内建变量，但可以用入口判断把 `main()` 包起来。

## 如何判断“我是不是入口文件”

把程序保存为 `app.js`。业务逻辑 Node / Deno 可以写成一样；真正不同的，往往只是**怎么启动**，以及（在较旧的 Node 上）入口判断写法。

较新的 Node（20.11+）和 Deno 都支持 `[import.meta.main](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import.meta#main)`：

```javascript
// app.js
function routine1() {
  console.log('Routine 1 done.');
}

function routine2() {
  subRoutine1();
  subRoutine2();
  console.log('Routine 2 done.');
}

function subRoutine1() {
  console.log('Sub-routine 1 done.');
}

function subRoutine2() {
  console.log('Sub-routine 2 done.');
}

export function main() {
  routine1();
  routine2();
  console.log('This is the end of the program.');
}

if (import.meta.main) {
  main();
}
```

含义是：

> 1. 当该文件被其它模块 `import` 时，`import.meta.main` 为假，`main()` 不执行；
> 2. 当该文件被当作程序入口运行时，`import.meta.main` 为真，`main()` 才执行。

分别这样执行：

```bash
# Node（项目需 "type": "module"，或把文件改成 .mjs）
node app.js

# Deno
deno run app.js
```

若你的 Node 较旧、还没有 `import.meta.main`，把最后的判断换成：

```javascript
import { pathToFileURL } from 'node:url';

const isMain =
  process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isMain) {
  main();
}
```

若你用的是 CommonJS（仅 Node），则是：

```javascript
// app.cjs
function main() {
  console.log('This is the end of the program.');
}

if (require.main === module) {
  main();
}

module.exports = { main };
```

```bash
node app.cjs
```

对比一下：


| 运行时                  | “我是入口吗？”                                                  |
| -------------------- | --------------------------------------------------------- |
| Deno / 较新 Node (ESM) | `import.meta.main`                                        |
| 较旧 Node (ESM)        | `import.meta.url === pathToFileURL(process.argv[1]).href` |
| Node (CJS)           | `require.main === module`                                 |




## 把“导入即执行”改成“按需执行”

还记得上一章那个 ROT13 彩蛋模块吗？如果顶层直接 `console.log(...)`，那么一 `import` 就会打印。我们可以把它封装进 `main()` —— Node / Deno 代码相同：

```javascript
// that.js
export function main() {
  const s = `Gur Mra bs Clguba, ol Gvz Crgref
Ornhgvshy vf orggre guna htyl.
Rkcyvpvg vf orggre guna vzcyvpvg.
Fvzcyr vf orggre guna pbzcyrk.
Pbzcyrk vf orggre guna pbzcyvpngrq.
Syng vf orggre guna arfgrq.
Fcnefr vf orggre guna qrafr.
Ernqnovyvgl pbhagf.
Fcrpvny pnfrf nera'g fcrpvny rabhtu gb oernx gur ehyrf.
Nygubhtu cenpgvpnyvgl orngf chevgl.
Reebef fubhyq arire cnff fvyragyl.
Hayrff rkcyvpvgyl fvyraprq.
Va gur snpr bs nzovthvgl, ershfr gur grzcgngvba gb thrff.
Gurer fubhyq or bar-- naq cersrenoyl bayl bar --boivbhf jnl gb qb vg.
Nygubhtu gung jnl znl abg or boivbhf ng svefg hayrff lbh'er Qhgpu.
Abj vf orggre guna arire.
Nygubhtu arire vf bsgra orggre guna *evtug* abj.
Vs gur vzcyrzragngvba vf uneq gb rkcynva, vg'f n onq vqrn.
Vs gur vzcyrzragngvba vf rnfl gb rkcynva, vg znl or n tbbq vqrn.
Anzrfcnprf ner bar ubaxvat terng vqrn -- yrg'f qb zber bs gubfr!`;

  const d = {};
  for (const c of [65, 97]) {
    for (let i = 0; i < 26; i++) {
      d[String.fromCharCode(i + c)] = String.fromCharCode((i + 13) % 26 + c);
    }
  }

  console.log(
    [...s].map((ch) => (Object.hasOwn(d, ch) ? d[ch] : ch)).join('')
  );
}

if (import.meta.main) {
  main();
}
```

于是导入时不会自动打印：

```javascript
import * as that from './that.js';
// 不会自动打印 Zen 文本
```

直接运行才会执行 `main()`：

```bash
node that.js # node 版
deno run that.js # deno 版
```

你也可以手动调用：

```javascript
import { main } from './that.js';
main();
```



## 做成命令行可执行文件，并接收参数

之前那个“从词表里挑出字母加起来等于 100 的词”的程序，也可以写成入口形式。

这里 Node / Deno **不完全一致**：读文件 API、命令行参数、权限模型不同，所以分开写；相同的 `sumOfWord` 逻辑则只出现一次即可。

先写共用的核心：

```javascript
function sumOfWord(word) {
  let sum = 0;
  for (const char of word) {
    sum += char.charCodeAt(0) - 96;
  }
  return sum;
}
```



### Node

```javascript
#!/usr/bin/env node
import fs from 'node:fs';

function sumOfWord(word) {
  let sum = 0;
  for (const char of word) {
    sum += char.charCodeAt(0) - 96;
  }
  return sum;
}

export function main(wordlist, resultPath) {
  const words = fs.readFileSync(wordlist, 'utf8').split(/\r?\n/);
  const out = words.filter((word) => sumOfWord(word.trim()) === 100);
  fs.writeFileSync(resultPath, out.join('\n') + '\n');
}

if (import.meta.main) {
  const wordlist = process.argv[2] ?? 'words_alpha.txt';
  const resultPath = process.argv[3] ?? 'results.txt';
  main(wordlist, resultPath);
}
```

```bash
node find100.js words_alpha.txt results.txt
# 若已 chmod +x：
./find100.js words_alpha.txt results.txt
```



### Deno

Deno 读文件需要权限；参数用 `Deno.args`：

```javascript
#!/usr/bin/env -S deno run --allow-read --allow-write

function sumOfWord(word) {
  let sum = 0;
  for (const char of word) {
    sum += char.charCodeAt(0) - 96;
  }
  return sum;
}

export async function main(wordlist, resultPath) {
  const text = await Deno.readTextFile(wordlist);
  const words = text.split(/\r?\n/);
  const out = words.filter((word) => sumOfWord(word.trim()) === 100);
  await Deno.writeTextFile(resultPath, out.join('\n') + '\n');
}

if (import.meta.main) {
  const wordlist = Deno.args[0] ?? 'words_alpha.txt';
  const resultPath = Deno.args[1] ?? 'results.txt';
  await main(wordlist, resultPath);
}
```

```bash
deno run --allow-read --allow-write find100.js words_alpha.txt results.txt
```

至于文件开头的 shebang（`#!/usr/bin/env node` 或 `#!/usr/bin/env -S deno run ...`）是怎么回事，建议你自己动手解决一下，去搜索：

> `[node script executable shebang](https://www.google.com/search?q=node+script+executable+shebang)`

以及：

> `[deno script executable shebang](https://www.google.com/search?q=deno+script+executable+shebang)`

再搜索：

> `[node process.argv](https://www.google.com/search?q=node+process.argv)`  
> `[deno args](https://www.google.com/search?q=Deno.args)`

你就可以把程序改成在命令行下能够接收指定参数的可执行文件……

## 彩蛋式布尔运算：`love = zen`

Python 里有 `import this` 而后玩 `love = this` 的段子。Javascript 里 `this` 是关键字，不能当模块名那么玩；但我们可以用上一章的 `this.js`（导出对象）做同类演示 —— 下面把它导入为 `zen`：

```javascript
import * as zen from './this.js';

const love = zen;

console.log(love === zen);          // true —— 同一个对象
console.log(love === true);         // false
console.log(love === false);        // false
console.log(love !== true || false); // true
console.log(love !== true || false, love === love); // true true
```

在 REPL 里也可以自己构造一个对象来体会引用相等：

```bash
node #或 deno
```

```javascript
const zen = { tip: 'Namespaces are one honking great idea' };
const love = zen;

love === zen;            // true，同一引用
love === true;           // false
love === false;          // false

love !== true || false;
// !== 优先于 ||；相当于 (love !== true) || false，结果为 true

love !== true || false; love === love;
// 上一句再算一遍；而后 love === love 当然是 true
```

注意：Javascript 用 `===` / `!==` 做同一判断，没有 Python 的 `is` / `is not`；但“是不是同一个对象”这件事，道理是一样的。

Javascript 的操作符优先级，完整表格在这里：

> [MDN — Operator precedence](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_precedence)

更多可读的小彩蛋 / 趣味项目（了解即可）：

> - [Node.js / JS easter eggs 搜搜看](https://www.google.com/search?q=javascript+easter+eggs)
> - [Deno 文档：Modules](https://docs.deno.com/runtime/manual/basics/modules/)

[Next Page](./Part.2.E.deliberate-thinking.md)