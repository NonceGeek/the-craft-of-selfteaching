# 保存到文件的函数

写好的函数，当然最好保存起来，以便将来随时调用。

## 模块

我们可以将以下内容保存到一个名为 `mycode.js` 的文件中 —— 这样可以被外部调用的 `.js` 文件，有个专门的称呼，**模块**（Module）—— 于是，它（任何一个按模块方式组织的 `.js` 文件）也可以被称为*模块*：

```javascript
// mycode.js
// 把下面的代码保存到当前文件夹中的 mycode.js

/**
 * Return a boolean value based upon
 * whether the argument n is a prime number.
 * @param {number} n
 * @returns {boolean}
 */
export function isPrime(n) {
  if (n < 2) {
    return false;
  }
  if (n === 2) {
    return true;
  }
  for (let m = 2; m <= Math.floor(Math.sqrt(n)); m++) {
    if (n % m === 0) {
      return false;
    }
  }
  return true;
}

/**
 * Print a string, with a greeting to everyone.
 * @param {...string} names - names to be greeted
 * @param {{greeting?: string, capitalized?: boolean}} [options]
 */
export function sayHi(...args) {
  let greeting = 'Hello';
  let capitalized = false;
  let names = args;

  const last = args[args.length - 1];
  if (last && typeof last === 'object' && !Array.isArray(last)) {
    ({ greeting = 'Hello', capitalized = false } = last);
    names = args.slice(0, -1);
  }

  for (let name of names) {
    if (capitalized) {
      name = name.charAt(0).toUpperCase() + name.slice(1);
    }
    console.log(`${greeting}, ${name}!`);
  }
}
```

而后，我们就可以在其它地方这样使用（以上代码现在已经保存在当前工作目录中的 `mycode.js`）：

```javascript
import * as mycode from './mycode.js';

console.log(mycode.isPrime);
console.log(mycode.sayHi);

console.log(import.meta.url); // 当前模块的 URL / 路径信息
console.log(mycode.isPrime(3));
mycode.sayHi('mike', 'zoe');
```

    [Function: isPrime]
    [Function: sayHi]
    true
    Hello, mike!
    Hello, zoe!

以上这个**模块**（[Module](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Modules)）的名称，在文件层面就是 `mycode.js`；你用 `import * as mycode` 时，是把该模块的导出收进一个命名空间对象里。

> 💡 在 Node.js 里使用上面的 `import` / `export`（ES Module）语法，通常需要满足其一：
>
> * 项目 `package.json` 里设置 `"type": "module"`；或
> * 把文件改成 `.mjs` 后缀。
>
> 另外还有一套更老、但仍很常见的写法叫 CommonJS：`module.exports` / `require('./mycode')`。本章以 ES Module 为主。

## 模块文件系统目录检索顺序

当你向 Node.js 说 `import ...` / `require(...)` 的时候，它要去寻找你所指定的文件。检索规则比“只加个后缀”更细一点，但入门可以先抓住这几条：

> * 先看是不是 **内建模块**（如 `fs`、`path`、`http`）；
> * 若以 `./`、`../` 或 `/` 开头，就按**相对/绝对路径**去找对应文件；
> * 否则，会去各层目录的 `node_modules` 里找（第三方包）。

本地自己写的模块，推荐总是写成相对路径，例如：

```javascript
import * as mycode from './mycode.js';
```

你可以大致这样查看 Node 会去哪些地方找包（CommonJS 语境下更直观）：

```javascript
console.log(module.paths); // 在 CommonJS 文件里
```

有时，你需要指定额外的检索目录，因为你知道要用的模块文件在什么位置。常见做法包括：

```javascript
// 1) 直接写清楚相对/绝对路径（最推荐、最清楚）
import { something } from '../lib/something.js';

// 2) 通过环境变量 NODE_PATH 增加搜索路径（了解即可，不推荐依赖）
// NODE_PATH=/My/Path/To/Module/Directory node app.js
```

## 系统内建的模块

Node.js 自带一批**内建模块**（Built-in modules），例如 `fs`、`path`、`http`、`url`、`crypto` 等。你可以用下面的方式查看：

```javascript
import { builtinModules } from 'module';

console.log(builtinModules);
console.log(builtinModules.includes('fs'));   // true
console.log(builtinModules.includes('math')); // false —— JS 没有 Python 那种标准库 math 模块名
```

跟变量名、函数名不能乱撞关键字一样，你的模块文件名也最好别与常见内建模块、热门包名完全重合，以免自己把自己绕晕。

> 官方列表可查：[Node.js — Built-in Modules](https://nodejs.org/api/modules.html#built-in-modules)

## 引入指定模块中的特定函数

当你使用 `import * as mycode from './mycode.js'` 的时候，你向当前工作空间引入了 `mycode` 文件中**导出**的名称，收在 `mycode` 这个对象上。

你其实可以只引入当前需要的函数，比如，只引入 `isPrime()`：

```javascript
import { isPrime } from './mycode.js';
```

这种情况下，你就不必使用 `mycode.isPrime()` 了；而是就好像这个函数就写在当前工作空间一样，直接写 `isPrime()`：

```javascript
import { isPrime } from './mycode.js';

console.log(isPrime(3));
```

    true

注意：若写成 `import { isPrime } from 'mycode'`（没有 `./`），Node 会把它当成**包名**去 `node_modules` 里找，而不是当前目录的 `mycode.js`。

如果我们想要导入 `foo` 这个目录中的 `bar.js` 这个模块文件，那么，可以这么写：

```javascript
import * as bar from './foo/bar.js';
```

或者（若 `foo/bar.js` 有对应导出）：

```javascript
import { something } from './foo/bar.js';
```

若 `foo` 是一个包目录，通常还会有 `package.json`，并指定入口（如 `"main"` / `"exports"`），或提供一个 `index.js`。这和 Python 里用目录 + `__init__.py` 组成 **包**（package）是同一类需求：把多个模块收进一个独立的命名空间。

## 引入并使用化名

有的时候，或者为了避免混淆，或者为了避免输入太多字符，我们可以为引入的函数设定 **化名**（alias），而后使用化名调用函数。比如：

```javascript
import { isPrime as isp } from './mycode.js';

console.log(isp(3));
```

    true

甚至干脆给整个模块取个化名：

```javascript
import * as m from './mycode.js';

console.log(m.isPrime(3));
m.sayHi('mike', 'zoe');
```

    true
    Hello, mike!
    Hello, zoe!

## 模块中不一定只有函数

一个模块文件中，不一定只包含函数；它也可以包含函数之外的可执行代码。只不过，在 `import` 语句执行的时候，模块中的顶层可执行代码会运行；并且对同一个模块，在一次程序运行里通常只初始化一次（模块缓存）。

Python 有个著名彩蛋 `import this`（Zen of Python）。Javascript / Node 没有完全对等的官方彩蛋，但我们完全可以自己做个同类模块，用来理解“导入时执行顶层代码”。把下面内容存成 `this.js`：

```javascript
// this.js
export const s = `Gur Mra bs Clguba, ol Gvz Crgref

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

export const d = {};
for (const c of [65, 97]) {
  for (let i = 0; i < 26; i++) {
    d[String.fromCharCode(i + c)] = String.fromCharCode((i + 13) % 26 + c);
  }
}

console.log(
  [...s].map((ch) => (Object.hasOwn(d, ch) ? d[ch] : ch)).join('')
);
```

然后：

```javascript
import * as zen from './this.js';
```

你会看到解密后的英文被打印出来（那段其实就是 The Zen of Python 的 ROT13 密文）。

这个 `this.js` 文件中的顶层 `console.log(...)` 会在导入时执行；同时它导出的变量，我们都可以在导入之后触达：

```javascript
import * as zen from './this.js';

console.log(zen.d);
console.log(zen.s);
```

试试吧，试试能否独立读懂这个文件里的代码 —— 对初学者来说，还是挺练脑子的呢！

它先是通过一个规则生成了一个密码表，保存在 `d` 这个对象中；而后，将 `s` 这个变量中保存的 “密文” 翻译成了英文……

或许，你可以试试，看看怎样能写个函数出来，给你一段英文，你可以把它加密成跟它一样的 “密文”？

## 查看模块导出了什么

你的函数，保存在模块里之后，这个函数的用户（当然也包括你），可以查看模块中可触达的导出名称：

```javascript
import * as mycode from './mycode.js';

console.log(Object.keys(mycode));
console.log(mycode);
```

    [ 'isPrime', 'sayHi' ]
    { isPrime: [Function: isPrime], sayHi: [Function: sayHi] }

> 💡 Python 里常用 `dir(module)`。在 Javascript 里，对 `import * as mycode` 得到的命名空间对象，用 `Object.keys(mycode)` 通常就够了。

<a href="./Part.2.D.7-tdd.md" ><small>Next Page</small></a>
