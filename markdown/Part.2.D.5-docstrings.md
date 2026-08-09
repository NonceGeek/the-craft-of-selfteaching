# 函数的文档

你在调用函数的时候，你像是函数这个产品的用户。

而你写一个函数，像是做一个产品，这个产品将来可能会被很多用户使用 —— 包括你自己。

产品，就应该有产品说明书，别人用得着，你自己也用得着 —— 很久之后的你，很可能把当初的各种来龙去脉忘得一干二净，所以也同样需要产品说明书，别看那产品曾经是你自己设计的。

Javascript 在这方面主要靠社区约定与工具链：用 **JSDoc** 这种特殊注释给函数写 “产品说明书”，再配合编辑器提示，或用 [TypeDoc](https://typedoc.org/) / [documentation.js](https://documentation.js.org/) / [JSDoc](https://jsdoc.app/) 这类工具生成文档 —— 角色上很像 Python 生态里的 Docstring + Sphinx。

## JSDoc

在函数定义上方（或紧贴函数），我们可以加上 **JSDoc** 注释；将来函数的 “用户” 就可以在编辑器里悬停查看说明，也可以用文档生成工具把这些注释抽出来做成完整文档。

先看一个 JSDoc 以及如何在代码里查看说明的例子：

```javascript
/**
 * Return a boolean value based upon
 * whether the argument n is a prime number.
 * @param {number} n
 * @returns {boolean}
 */
function isPrime(n) {
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

console.log(isPrime.toString());
// 在 VS Code / Cursor 里把鼠标悬停在 isPrime 上，也能看到 JSDoc 说明
```

> 💡 Javascript **没有** Python 那种内建的 `help(fn)` 或 `fn.__doc__`。日常开发里，说明书主要靠：
>
> 1. 编辑器读取 JSDoc 并在悬停时显示；
> 2. 文档工具从源码提取 JSDoc 生成网页/Markdown。

JSDoc 可以是多行，也可以写得很短：

```javascript
/** Return a boolean value based upon whether the argument n is a prime number. */
function isPrime(n) {
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
```

JSDoc 如若想被工具和编辑器识别，通常必须写在函数声明**之前**，使用 `/** ... */`（注意是两个星号开头）。普通的 `/* ... */` 或写在函数体末尾的注释，一般**不会**被当成该函数的文档：

```javascript
function isPrime(n) {
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
  /*
   * 这段写在函数体末尾的注释，通常不会被当作 isPrime 的 JSDoc。
   * Return a boolean value based upon
   * whether the argument n is a prime number.
   */
}
```

## 书写 JSDoc 的规范

规范，虽然是人们最好遵守的，但其实通常是很多人并不遵守的东西。

既然学，就要**像样** —— 这真的很重要。所以，非常有必要认真阅读 [JSDoc 官方文档](https://jsdoc.app/) 以及常见风格指南里关于注释的部分。

简要总结一下入门阶段必须掌握的规范：

> 1. 使用 `/** ... */`（JSDoc 块注释），不要只用 `//` 凑合当“官方说明书”；
> 2. 第一行写概要（summary），复杂说明再往下展开；
> 3. 用标签标明结构，常见的有：`@param`、`@returns`（或 `@return`）、`@throws`、`@example`、`@see`；
> 4. 完善的说明，应该概括清楚以下内容：参数、返回值、可能抛出的错误、可能的副作用，以及函数的使用限制等等；
> 5. 每个参数的说明都尽量单独写清楚类型与含义……

一个更完整一点的例子：

```javascript
/**
 * 判断 n 是否为质数。
 *
 * @param {number} n - 待判断的整数
 * @returns {boolean} 若 n 为质数则返回 true，否则返回 false
 * @example
 * isPrime(2);  // true
 * isPrime(15); // false
 */
function isPrime(n) {
  // ...
}
```

由于我们还没有开始研究 Class，所以，关于 Class / 模块的文档规范就暂时略过了。然而，这种规范你总是要反复去阅读参照的。关于 Javascript 文档，可以先收藏这些入口：

> * [JSDoc 官方站](https://jsdoc.app/)
> * [MDN — JSDoc](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/JSDoc)（或搜索 “JSDoc tags”）
> * [TypeDoc](https://typedoc.org/)（常用于 TypeScript / 带类型注解的项目）

需要**格外注意**的是：

> 文档注释是**写给人看的**，所以，在复杂代码的说明中，写 **Why** 要远比写 _What_ 更重要 —— 你先记住这点，以后的体会自然会不断加深。

## 文档生成工具里的 JSDoc 风格

像 Sphinx 可以从 `.py` 里提取 Docstring 一样，Javascript 项目里也可以用工具从源码提取 JSDoc，而后生成完整的 Documentation。将来若是你写大型的项目，需要生成完善的文档的时候，你会发现这类工具是 “救命” 的家伙，省时、省力、省心、省命……

在这里，没办法一下子讲清楚整套文档站的搭建；但可以看一个带 Class 的 JSDoc 例子（先混个眼熟即可）：

```javascript
/**
 * The Vehicle object contains lots of vehicles.
 * @param {string} arg - The arg is used for ...
 * @param {...any} args - The variable arguments are used for ...
 * @param {Object} [kwargs] - The keyword-like options object
 */
class Vehicle {
  /**
   * @param {string} arg
   * @param {...any} args
   */
  constructor(arg, ...args) {
    /** @type {string} */
    this.arg = arg;
  }

  /**
   * We can't travel a certain distance in vehicles without fuels, so here's the fuels.
   *
   * @param {number} distance - The amount of distance traveled
   * @param {boolean} destinationReached - Should the fuels be refilled to cover required distance?
   * @throws {Error} Out of fuel
   * @returns {string} A Car mileage
   */
  cars(distance, destinationReached) {
    // ...
  }
}
```

通过不同工具与插件，社区里也常见 Google Style、TSDoc 等注释风格；不必一次学完，需要时再查。

以下链接，放在这里，以便你将来查询：

> * [JSDoc — Getting Started](https://jsdoc.app/about-getting-started.html)
> * [TypeDoc](https://typedoc.org/)
> * [documentation.js](https://documentation.js.org/)
> * [TSDoc](https://tsdoc.org/)（若你后续进入 TypeScript）

<a href="./Part.2.D.6-modules.md" ><small>Next Page</small></a>
