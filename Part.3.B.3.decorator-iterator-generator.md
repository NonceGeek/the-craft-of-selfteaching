# 函数工具

这一章要讲的是迭代器、生成器和装饰器（更高阶一点说：用函数包装函数），这些都是函数工具。有人把它们称为 **DIG**（Decorator，Iterator，Generator）—— 在 Python 里它们是真正掌握语言的关键；在 Javascript 里，同样一组概念也极度重要，只是语法细节不同。

## 迭代器（Iterator）

我们已经见过 Javascript 中的许多容器，都是可迭代的 —— 准确地讲，是可以通过迭代遍历每一个元素：

```javascript
const string = 'this is a string.';
const list = ['item 1', 'item 2', 3, 5];
const set = new Set([1, 2, 3, 4, 5]);

for (const c of string) {
  process.stdout.write(c + ', ');
}
console.log();
for (const L of list) {
  process.stdout.write(L + ', ');
}
console.log();
for (const s of set) {
  process.stdout.write(s + ', ');
}
console.log();
```

    t, h, i, s,  , i, s,  , a,  , s, t, r, i, n, g, ., 
    item 1, item 2, 3, 5, 
    1, 2, 3, 4, 5, 

在协议层面，一个对象若实现了 `[Symbol.iterator]()`，就是 **Iterable**（可迭代对象）；该函数返回的对象若有 `next()` 方法，就是 **Iterator**（迭代器）。

你可以用手动方式拿到迭代器：

```javascript
const i = 'Javascript'[Symbol.iterator]();
console.log(i);
console.log(typeof i.next);

const s = [1, 2, 3, 4, 5][Symbol.iterator]();
console.log(s);
```

    Object [String Iterator] {}
    function
    Object [Array Iterator] {}

迭代器如何使用呢？调用它的 `next()`：

```javascript
const i = 'Python'[Symbol.iterator]();
console.log(i.next());
console.log(i.next());
console.log(i.next());
console.log(i.next());
console.log(i.next());
console.log(i.next());
console.log(i.next()); // 已经耗尽
```

    { value: 'P', done: false }
    { value: 'y', done: false }
    { value: 't', done: false }
    { value: 'h', done: false }
    { value: 'o', done: false }
    { value: 'n', done: false }
    { value: undefined, done: true }

在 `i` 这个迭代器里一共有 6 个元素，所以，`next()` 在被调用 6 次之后再调用，就会得到 `done: true`（Javascript 通常**不会**因此抛错，这一点和 Python 的 `StopIteration` 不同）。

那我们怎么自己写一个迭代器呢？

迭代器是个 Object，所以，写迭代器的时候常常写的是 Class，比如，我们写一个数数的迭代器，`Counter`：

```javascript
class Counter {
  constructor(start, stop) {
    this.current = start;
    this.stop = stop;
  }

  [Symbol.iterator]() {
    return this;
  }

  next() {
    if (this.current > this.stop) {
      return { value: undefined, done: true };
    }
    const c = this.current;
    this.current += 1;
    return { value: c, done: false };
  }
}

const c = new Counter(11, 20);
console.log(c.next());
console.log(c.next());
console.log(c.next());
for (const n of new Counter(101, 105)) {
  process.stdout.write(n + ', ');
}
console.log();
console.log(typeof Counter);
```

    { value: 11, done: false }
    { value: 12, done: false }
    { value: 13, done: false }
    101, 102, 103, 104, 105, 
    function

这里的重点在于两个成员的存在：`[Symbol.iterator]()` 和 `next()`。

```javascript
[Symbol.iterator]() {
  return this;
}
```

这两句是约定俗成的写法：让 `Counter` 自己既是 Iterable，又是 Iterator。有了完整的 `next()`，除了可以用 `for...of`，也可以用 `while` 去遍历：

```javascript
class Counter {
  constructor(start, stop) {
    this.current = start;
    this.stop = stop;
  }

  [Symbol.iterator]() {
    return this;
  }

  next() {
    if (this.current > this.stop) {
      return { value: undefined, done: true };
    }
    const c = this.current;
    this.current += 1;
    return { value: c, done: false };
  }
}

for (const n of new Counter(101, 103)) {
  console.log(n);
}

const c = new Counter(201, 203);
while (true) {
  const { value, done } = c.next();
  if (done) break;
  console.log(value);
}
```

    101
    102
    103
    201
    202
    203

## 生成器（Generator）

那用函数（而不是 Class）能不能写一个 Counter 呢？答案是能，用生成器（Generator）就行。

```javascript
function* counter(start, stop) {
  while (start <= stop) {
    yield start;
    start += 1;
  }
}

for (const i of counter(101, 105)) {
  console.log(i);
}
```

    101
    102
    103
    104
    105

哎呀！怎么感觉这个简洁很多呢？

不过，是否简洁并不是问题，这次看起来用生成器更简单，无非是因为当前的例子更适合用生成器而已。在不同的情况下，用迭代器和用生成器各有各的优势。

这里的关键在于 `function*` 和 `yield`。`yield` 和 `return` 最明显的不同在于，在它之后的语句依然可能在下一次 `.next()` 时被执行 —— 而普通 `return` 会结束整个生成器。

生成器函数被 `.next()` 调用后，执行到 `yield` 生成一个值返回；下次再被 `.next()` 调用的时候，从上次 `yield` 处继续执行…… 如果感觉费解，就多读几遍 —— 而后再想想若是生成器中有多个 `yield` 语句会是什么情况？

还有一种东西，在 Python 里叫生成器表达式；Javascript **没有**完全同款语法，但可以用生成器函数，或先得到数组再过滤：

```javascript
function* evenNumbers(n) {
  for (let e = 0; e < n; e++) {
    if (e % 2 === 0) yield e;
  }
}

const even = evenNumbers(10);
console.log(even);
for (const e of even) {
  console.log(e);
}
```

    Object [Generator] {}
    0
    2
    4
    6
    8

若你要的是“立刻得到一个数组”，用数组方法更常见：

```javascript
const odd = [...Array(10).keys()].filter((o) => o % 2);
console.log(odd);
for (const o of odd) {
  console.log(o);
}
```

    [ 1, 3, 5, 7, 9 ]
    1
    3
    5
    7
    9

集合也可以：

```javascript
const oddSet = new Set([...Array(10).keys()].filter((o) => o % 2));
console.log(oddSet);
```

    Set(5) { 1, 3, 5, 7, 9 }

求和时，既可以用生成器，也可以用数组：

```javascript
let sumOfEven = 0;
for (const e of evenNumbers(10)) {
  sumOfEven += e;
}
console.log(sumOfEven);

// 或
console.log(
  [...Array(10).keys()].filter((e) => e % 2 === 0).reduce((a, b) => a + b, 0)
);
```

    20
    20

函数内部当然可以包含其它的函数，以下就是一个函数中包含着其它函数的结构示例：

```javascript
function aFunc() {
  function bFunc() {}
  function cFunc() {
    function dFunc() {}
    bFunc();
  }
  return true;
}
```

想象一下，如果，我们让一个函数返回的是另外一个函数呢？我们一步一步来：

```javascript
function aFunc() {
  function bFunc() {
    console.log("Hi, I'm bFunc!");
  }
  console.log("Hi, I'm aFunc!");
}
aFunc();
```

    Hi, I'm aFunc!

```javascript
function aFunc() {
  function bFunc() {
    console.log("Hi, I'm bFunc!");
  }
  console.log("Hi, I'm aFunc!");
  bFunc();
}
aFunc();
```

    Hi, I'm aFunc!
    Hi, I'm bFunc!

上一个代码，我们可以写成这样 —— 让 `aFunc()` 将它内部的 `bFunc()` 作为它的返回值：

```javascript
function aFunc() {
  function bFunc() {
    console.log("Hi, I'm bFunc!");
  }
  console.log("Hi, I'm aFunc!");
  return bFunc();
}
aFunc();
```

    Hi, I'm aFunc!
    Hi, I'm bFunc!

如果我们在 `return` 语句里只写函数名呢？好像这样：

```javascript
function aFunc() {
  function bFunc() {
    console.log("Hi, I'm bFunc!");
  }
  console.log("Hi, I'm aFunc!");
  return bFunc;
}
console.log(aFunc());
```

    Hi, I'm aFunc!
    [Function: bFunc]

这次返回的不是调用 `bFunc()` 这个函数的执行结果，返回的是 `bFunc` 这个*函数本身*。

## 装饰器（Decorator）

### 函数也是对象

这是关键：

> 函数本身也是值（first-class），可以像其它数据一样，作为其它函数的参数或者返回值。

于是，我们完全可以写一个“接收函数、返回函数”的包装器 —— 这就是装饰器思想在 Javascript 里最常用的形态（高阶函数）。

> 💡 语言层面的 `@decorator` 语法在 Javascript 里主要面向 **class / class 成员**（TC39 Decorators）；给普通函数做包装，日常仍以“返回新函数”为主。下面先把核心思想讲清楚。

让我们分步走 —— 注意，在以下代码中，`aDecorator` 返回的是一个函数的调用 `wrapper()`，而不是 `wrapper` 这个函数本身：

```javascript
function aDecorator(func) {
  function wrapper() {
    console.log('We can do sth. before a func is called...');
    func();
    console.log('... and we can do sth. after it is called...');
  }
  return wrapper();
}

function aFunc() {
  console.log("Hi, I'm aFunc!");
}

aFunc();
aDecorator(aFunc);
```

    Hi, I'm aFunc!
    We can do sth. before a func is called...
    Hi, I'm aFunc!
    ... and we can do sth. after it is called...

如果返回的是函数本身，`wrapper`，输出结果跟你想的并不一样：

```javascript
function aDecorator(func) {
  function wrapper() {
    console.log('We can do sth. before a func is called...');
    func();
    console.log('... and we can do sth. after it is called...');
  }
  return wrapper;
}

function aFunc() {
  console.log("Hi, I'm aFunc!");
}

aFunc();
console.log(aDecorator(aFunc));
```

    Hi, I'm aFunc!
    [Function: wrapper]

### 用包装结果替换原函数

Javascript 给普通函数没有像 Python `@` 那么统一的语法糖（至少不是同一套用法）。等价操作就是：**用装饰器的返回值，盖掉原来的函数名**。

```javascript
function aDecorator(func) {
  function wrapper() {
    console.log('We can do sth. before calling aFunc...');
    func();
    console.log('... and we can do sth. after it was called...');
  }
  return wrapper;
}

function aFunc() {
  console.log("Hi, I'm aFunc!");
}

aFunc = aDecorator(aFunc);
aFunc();
```

    We can do sth. before calling aFunc...
    Hi, I'm aFunc!
    ... and we can do sth. after it was called...

也就是：

```javascript
function aFunc() {
  // ...
}
aFunc = aDecorator(aFunc);
```

就是用 `aDecorator` 的调用结果替换掉原来的函数。`aDecorator` 返回值是什么，以后调用 `aFunc` 时就是在调用这个返回值，而 `aDecorator` 本身此时已经执行完毕了。

若你写的是 class 方法，才更常看到接近 Python `@` 的装饰器写法（具体以你使用的语言版本 / 转译器为准）：

```javascript
// 示意：class 装饰器（细节随提案与工具链变化，先混个眼熟）
// class C {
//   @someDecorator
//   method() {}
// }
```

### 装饰器的用途

Decorator 最常用的场景是什么呢？最常用的场景就是用来改变其它函数的行为。

```javascript
function anOutput() {
  return 'The quick brown fox jumps over the lazy dog.';
}
console.log(anOutput());
```

    The quick brown fox jumps over the lazy dog.

```javascript
function uppercase(func) {
  function wrapper() {
    const originalResult = func();
    const modifiedResult = originalResult.toUpperCase();
    return modifiedResult;
  }
  return wrapper;
}

let anOutput = function () {
  return 'The quick brown fox jumps over the lazy dog.';
};
anOutput = uppercase(anOutput);
console.log(anOutput());
```

    THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG.

你还可以给一个函数加上一个以上的装饰器：

```javascript
function uppercase(func) {
  function wrapper() {
    return func().toUpperCase();
  }
  return wrapper;
}

function strong(func) {
  function wrapper() {
    return '<strong>' + func() + '</strong>';
  }
  return wrapper;
}

let anOutput = function () {
  return 'The quick brown fox jumps over the lazy dog.';
};

// 先 uppercase，再 strong —— 注意组合顺序
anOutput = strong(uppercase(anOutput));
console.log(anOutput());
```

    <strong>THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG.</strong>

你把两个装饰器的顺序调换一下写成下面这样试试：

```javascript
anOutput = uppercase(strong(anOutput));
```

装饰器的执行顺序是 “由里到外”：先作用到更靠近原函数的那一层，再往外层包。

### 装饰带有参数的函数

到现在我们见到的被装饰函数都是没有参数的：`anOutput` 以及之前的 `aFunc`。

如果被装饰的函数有参数怎么办？装饰器自身内部又应该怎么写？

这时候，Rest Parameters（`...args`）的威力就显现出来了 —— 之前若没把 `...args` 吃透，现在恐怕要吃亏了……

装饰器函数本身可以这么写：

```javascript
function aDecorator(func) {
  function wrapper(...args) {
    // ...
    return func(...args);
  }
  return wrapper;
}
```

在这里，`...args` 非常强大，它可以接住传进来的位置参数，再原样（或加工后）转交给原函数。

假设我们有这么个函数：

```javascript
function sayHi(greeting, name = null) {
  return greeting + '! ' + name + '.';
}

console.log(sayHi('Hello', 'Jack'));
```

    Hello! Jack.

如果我们想在装饰器里对函数名、参数，都做些事情 —— 比如，我们写个 `trace` 用来告诉用户调用一个函数的时候都发生了什么……

```javascript
function trace(func) {
  function wrapper(...args) {
    console.log(
      `Trace: You've called a function: ${func.name}(),`,
      `with args:`,
      args
    );

    const originalResult = func(...args);
    console.log(`Trace: ${func.name}() returned:`, originalResult);
    return originalResult;
  }
  return wrapper;
}

let sayHi = function (greeting, name = null) {
  return greeting + '! ' + name + '.';
};
sayHi = trace(sayHi);

console.log(sayHi('Hello', 'Jack'));
```

    Trace: You've called a function: sayHi(), with args: [ 'Hello', 'Jack' ]
    Trace: sayHi() returned: Hello! Jack.
    Hello! Jack.

有了以上的基础知识之后，再去阅读下面这些页面就会轻松许多：

> * [MDN — 迭代协议](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols)
> * [MDN — function*](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/function*)
> * [MDN — 装饰器（概览）](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Decorators)（class 向）
> * 以及任意一本讲 “高阶函数 / middleware / 函数组合” 的 Javascript 资料

### 学会装饰器究竟有多重要？

装饰器（以及更一般的“函数包装”）一定要学会 —— 因为很多人就是不会。

Oreilly.com 上有篇文章，《5 reasons you need to learn to write Python decorators》中，其中的第五条竟然是：**Boosting your career**!

> Writing decorators isn't easy at first. It's not rocket science, but takes enough effort to learn, and to grok the nuances involved, that many developers will never go to the trouble to master it. And that works to your advantage. When you become the person on your team who learns to write decorators well, and write decorators that solve real problems, other developers will use them. Because once the hard work of writing them is done, decorators are so easy to use. This can massively magnify the positive impact of the code you write. And it just might make you a hero, too.
>
> As I've traveled far and wide, training hundreds of working software engineers to use Python more effectively, teams have consistently reported writing decorators to be one of the most valuable and important tools they've learned in my advanced Python programming workshops.

这段话说的是 Python，但换成 Javascript 一样成立：Express / Koa 的 middleware、各种 `withX(fn)`、测试里的 mock/spy、日志与权限包装…… 骨子里都是同一类技巧。

为什么有那么多人就是学不会呢？—— 只不过是因为在此之前，遇到 `...args`、闭包、返回函数的时候，觉得绕，而后并未再多挣扎一下。

<a href="./Part.3.B.4.regex.md" ><small>Next Page</small></a>
