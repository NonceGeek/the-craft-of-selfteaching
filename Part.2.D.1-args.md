# 关于参数（上）

之前就提到过，从结构上来看，每个函数都是一个完整的程序，因为一个程序，核心构成部分就是输入、处理、输出：

> * 它可以有**输入** —— 即，它能接收外部通过参数传递的值；
> * 它可以有**处理** —— 即，内部有能够完成某一特定任务的代码；尤其是，它可以根据 “输入” 得到 “输出”；
> * 它可以有**输出** —— 即，它能向外部输送返回值……

所以，在我看来，有了一点基础知识之后，最早应该学习的是 “如何写函数” —— 这个起点会更好一些。

这一章的内容，看起来会感觉与 [Part1.E.4 函数那一章](Part.1.E.4.functions.md) 部分重合。但这两章的出发点不一样：

> * [Part1.E.4 函数那一章](Part.1.E.4.functions.md)，只是为了让读者有 “阅读” 函数说明文档的能力；
> * 这一章，是为了让读者能够开始动手写函数给自己或别人用……

## 为函数取名

哪怕一个函数内部什么都不干，它也得有个名字，然后名字后面要加上圆括号 `()`，以明示它是个函数，而不是某个变量。

定义一个函数的关键字是 `function`，以下代码定义了一个什么都不干的函数：

```javascript
function doNothing() {
}

doNothing();
```

> 💡提示：可以用 `node` 命令打开交互界面，用「所见即所得」的方式运行代码；这种方式在编程学习和实际的程序调试里面都很好用。

> 🤔小练习：你是用什么方式安装 `node` 的？学习安装 `nvm` 版本管理工具，以掌握另一个使用技能 —— 同时使用不同版本的 Node CLI。

为函数取名（为变量取名也一样）有些基本的注意事项：

> - 首先，名称不能以数字开头。能用在名称开头的有大小写字母、下划线 `_` 以及美元符号 `$`；
>
> - 其次，名称中不能有空格。常见的做法有：使用下划线连接词汇，如 `do_nothing`；或使用 [Camel Case](https://en.wikipedia.org/wiki/Camel_case)，如 `doNothing` —— Javascript 社区更常见的是 camelCase；
>
> - 再次，名称不能与关键字重合 —— 以下是 Javascript（ECMAScript）的保留关键字说明：

> https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Lexical_grammar#reserved_words
>
> （对任何语言来说，官方文档和准官方文档永远是优质数据源。）

关于更多为函数、变量取名所需要的注意事项，请参阅：

> * [MDN — JavaScript 代码示例书写指南：命名风格（Naming Conventions）](https://developer.mozilla.org/zh-CN/docs/MDN/Writing_guidelines/Code_style_guide/JavaScript)
> * [Airbnb JavaScript Style Guide（包括命名规范）](https://github.com/airbnb/javascript)
>
> 💡 Javascript 风格指南旨在统一和提升代码可读性与一致性。

## 不接收任何参数的函数

在定义函数的时候，可以定义成不接收任何参数；但调用函数的时候，依然需要写上函数名后面的圆括号 `()`：

```javascript
function doSomething() {
  console.log('This is a hello message from doSomething().');
}

doSomething();
```

    This is a hello message from doSomething().

## 没有 return 语句的函数

函数内部，不一定非要有 `return` 语句 —— 上面 `doSomething()` 函数就没有 `return` 语句。但如果函数内部并未定义返回值，那么该函数的返回值是 `undefined`。注意：`true`、`false` 和 `undefined` 是三种不同类型；其中 `undefined` 在条件判断里会被当作假值（falsy）。

我们可以做个实验：

```javascript
function doSomething() {
  console.log('This is a hello message from doSomething().');
}

console.log(true == doSomething());
console.log(false == doSomething());
console.log(undefined == doSomething());
```

> 🤔 思考题：`==` 是什么意思？为什么返回结果是这样？再试一下把 `==` 换成 `===`，结果又会怎样？

这样的设定，也使得函数调用常常可以在条件语句中被当作判断依据：

```javascript
function doSomething() {
  console.log('This is a hello message from doSomething().');
}

if (!doSomething()) { // 由于该函数名称的缘故，这一句代码的可读性很差……
  console.log("The return value of 'doSomething()' is undefined.");
}
```

    This is a hello message from doSomething().
    The return value of 'doSomething()' is undefined.

`if (!doSomething())` 翻译成自然语言，应该是，“如果 `doSomething()` 的返回值是 ‘非真’，那么：……”

## 接收外部传递进来的值

让我们写个判断闰年年份的函数，取名为 `isLeap()`，它接收一个年份为参数，若是闰年，则返回 `true`，否则返回 `false`。

根据闰年的定义：

> * 年份应该是 4 的倍数；
> * 年份能被 100 整除但不能被 400 整除的，不是闰年。

所以，相当于要在能被 4 整除的年份中，排除那些能被 100 整除却不能被 400 整除的年份。

> 🤔思考题：我们应该如何写 prompt，让 LLM 给我们产出代码？

```javascript
function isLeap(year) {
  let leap = false;
  if (year % 4 === 0) {
    leap = true;
    if (year % 100 === 0 && year % 400 !== 0) {
      leap = false;
    }
  }
  return leap;
}

console.log(isLeap(7));
console.log(isLeap(12));
console.log(isLeap(100));
console.log(isLeap(400));
```

    false
    true
    false
    true

```javascript
// 另外一个更为简洁的版本，理解它还挺练脑子的
function isLeap(year) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

console.log(isLeap(300));
```

    false

函数可以同时接收多个参数。比如，我们可以写个函数，让它输出从大于某个数字到小于另外一个数字的斐波那契数列；那就需要定义两个参数，调用它的时候也需要传递两个参数：

```javascript
function fibBetween(start, end) {
  let a = 0, b = 1;
  while (a < end) {
    if (a >= start) {
      process.stdout.write(a + ' '); // Node.js 打印不换行
    }
    [a, b] = [b, a + b];
  }
}

fibBetween(100, 10000);
```

    144 233 377 610 987 1597 2584 4181 6765

当然可以把这个函数写成返回值是一个数组：

```javascript
function fibBetween(start, end) {
  const r = [];
  let a = 0, b = 1;
  while (a < end) {
    if (a >= start) {
      r.push(a);
    }
    [a, b] = [b, a + b];
  }
  return r;
}

console.log(fibBetween(100, 10000));
```

    [144, 233, 377, 610, 987, 1597, 2584, 4181, 6765]

## 变量的作用域

下面的代码，经常会让初学者迷惑：

```javascript
function increaseOne(n) {
  n += 1;
  return n;
}

let n = 1;
console.log(increaseOne(n));
// console.log(n);
```

    2

当 `increaseOne(n)` 被调用之后，`n` 的值究竟是多少呢？或者更准确点问，随后的 `console.log(n)` 的输出结果应该是什么呢？

输出结果是 `1`。

在程序执行过程中，变量有**全局变量**（Global Variables）和**局域变量**（Local Variables）之分。

> 首先，每次某个函数被调用的时候，这个函数会开辟一个新的区域，这个函数内部所有的变量，都是局域变量。也就是说，即便那个函数内部某个变量的名称与它外部的某个全局变量名称相同，它们也不是同一个变量 —— 只是名称相同而已。
>
> 其次，更为重要的是，当外部调用一个函数的时候，准确地讲，传递的不是变量，而是那个变量的*值*。也就是说，当 `increaseOne(n)` 被调用的时候，被传递给那个恰好名称也叫 `n` 的局域变量的，是全局变量 `n` 的值，`1`。
>
> 而后，`increaseOne()` 函数的代码开始执行，局域变量 `n` 经过 `n += 1` 之后，其中存储的值是 `2`，而后这个值被 `return` 语句返回，所以，`console.log(increaseOne(n))` 所输出的值是函数被调用之后的返回值，即，`2`。
>
> 然而，全局变量 `n` 的值并没有被改变，因为局部变量 `n`（它的值是 `2`）和全局变量 `n`（它的值还是 `1`）只不过是名字相同而已，但它们并不是同一个变量。

以上的文字，可能需要反复阅读若干遍；几遍下来，消除了疑惑，以后就彻底没问题了；若是这个疑惑并未消除，或者关键点并未消化，以后则会反复被这个疑惑所坑害，浪费无数时间。

不过，有一种情况要格外注意 —— 在函数内部处理被传递进来的值是对象（比如，数组）的时候：

```javascript
function beCareful(a, b) {
  a = 2;
  b[0] = 'What?!';
}

let a = 1;
let b = [1, 2, 3];
beCareful(a, b);
console.log(a, b);
```

    1 [ 'What?!', 2, 3 ]

所以，一个比较好的习惯是，如果传递进来的值是数组，那么在函数内部对其操作之前，先创建一个它的拷贝：

```javascript
function beCareful(a, b) {
  a = 2;
  const bCopy = b.slice(); // 或 [...b]
  bCopy[0] = 'What?!';
}

let a = 1;
let b = [1, 2, 3];
beCareful(a, b);
console.log(a, b);
```

    1 [ 1, 2, 3 ]

> 💡Tips：
>
> 在 Javascript 里：
>
> - **基本类型**（数字、字符串、布尔值、`null`、`undefined`、`symbol`、`bigint`）是 **按值传递** 的。
> - **对象类型**（数组、对象、函数等）传递的是引用的值 —— 所以在函数里修改对象内容，外面能看见；但若重新给参数赋值（如 `a = 2`），则不会改掉外面的绑定。

<a href="./Part.2.D.2-aargs.md" ><small>Next Page</small></a>
