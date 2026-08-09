# 化名与匿名

## 化名

在 Javascript 中，我们可以给一个函数取个**化名**（alias）。

以下的代码，我们先是定义了一个名为 `isLeap` 的函数，而后为它另取了一个化名：

```javascript
function isLeap(year) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

const yearLeapBool = isLeap;
console.log(yearLeapBool);       // [Function: isLeap]
console.log(yearLeapBool(800));  // isLeap(800) -> true

console.log(yearLeapBool === isLeap); // true —— 指向同一个函数对象

console.log(typeof yearLeapBool); // 'function'
console.log(typeof isLeap);       // 'function'
```

    [Function: isLeap]
    true
    true
    function
    function

我们可以看到的是，`yearLeapBool === isLeap` 为 `true` —— 它们是同一个对象，它们都是函数。所以，当你写 `const yearLeapBool = isLeap` 的时候，相当于给 `isLeap()` 这个函数取了个化名。

> 💡 在 Javascript 里，函数也是值（first-class），可以赋给变量、当作参数传递、当作返回值。没有 Python 那种通用的 `id()`；判断“是不是同一个对象”，用 `===` 即可。

在什么样的情况下，要给一个函数取一个化名呢？

在任何一个工程里，为函数或者变量取名都是很简单却不容易的事情 —— 因为可能会重名（虽然已经尽量用变量的作用域隔离了），可能会因取名含混而令后来者费解……

所以，仅仅为了少敲几下键盘而给一个函数取个更短的化名，实际上并不是好主意，更不是好习惯。尤其现在的编辑器都支持自动补全和多光标编辑的功能，变量名再长都不构成负担。

更多的时候，为函数取一个化名，应该是为了提高代码可读性 —— 对自己或其他人都很重要。

## 箭头函数（arrow function）

写一个很短的函数可以用箭头函数。它在用途上，很接近别的语言里的 `lambda` / 匿名函数。

下面是用 `function` 关键字写函数：

```javascript
function add(x, y) {
  return x + y;
}

console.log(add(3, 5));
```

    8

下面是用箭头函数写：

```javascript
const add = (x, y) => x + y;
console.log(add(3, 5));
```

    8

箭头函数常见的语法结构如下：

> `(参数列表) => 表达式`  
> 或  
> `(参数列表) => { 语句...; return 值; }`

反正你已经见到示例了：

```javascript
(x, y) => x + y
```

先写上参数列表，其后是 `=>`，再其后是表达式；这个表达式的值，就是这个函数的返回值。

> **注意**：若 `=>` 之后直接跟表达式（不加大括号），则有且只能有那一个表达式，它的值会自动成为返回值。若需要多条语句，就要写成 `=> { ... }`，并显式 `return`。

而这个函数呢，定义时本身可以没有名字，所以常被称为 “匿名函数”；你再把它赋给变量，就相当于给它取了名字：

```javascript
const add = (x, y) => x + y;
```

就相当于是给一个没有名字的函数取了个名字。

> 💡 只有一个参数时，括号可以省略：`x => x * 2`。没有参数时要写空括号：`() => 42`。

## 箭头函数的使用场景

那箭头函数这种写法的用处在哪里呢？

### 作为某函数的返回值

第一个常见的用处是*作为另外一个函数的返回值*。

让我们看看一个经典例子（对应 Python Tutorial 里 `make_incrementor` 那一类演示）：

```javascript
function makeIncrementor(n) {
  return (x) => x + n;
}

const f = makeIncrementor(42);
console.log(f(0));
console.log(f(1));
```

    42
    43

这个例子乍看起来很令人迷惑。我们先看看 `const f = makeIncrementor(42)` 之后，`f` 究竟是什么东西：

```javascript
function makeIncrementor(n) {
  return (x) => x + n;
}

const f = makeIncrementor(42);
console.log(f);                 // [Function (anonymous)]
console.log(f === makeIncrementor); // false
```

    [Function (anonymous)]
    false

首先，要注意，`f` 并不是 `makeIncrementor()` 这个函数的化名，如果是给这个函数取个化名，写法应该是：

```javascript
const f = makeIncrementor;
```

那 `f` 是什么呢？它是 `makeIncrementor(42)` **返回**出来的那个匿名函数：

> * `const f = makeIncrementor(42)` 是将 `makeIncrementor(42)` 的返回值保存到 `f` 这个变量之中；
> * 而 `makeIncrementor()` 这个函数接收到 `42` 这个参数之后，返回了一个函数：`(x) => x + 42`；
> * 于是，`f` 中保存的函数是 `(x) => x + 42`；
> * 所以，`f(0)` 是向这个匿名函数传递了 `0`，而后，它返回的是 `0 + 42`。

### 作为某函数的参数

可以拿一些可以接收函数为参数的方法做例子。比如，数组的 [`map()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)。

> `array.map(callbackFn)`
>
> 对数组中的每个元素调用一次 `callbackFn`，并用返回值组成一个**新数组**。

`map()` 的第一个参数，就是用来接收函数的。调用它的是某个数组 —— 可被迭代的对象。


```javascript
function doubleIt(n) {
  return n * 2;
}

const aList = [1, 2, 3, 4, 5, 6];

const bList = aList.map(doubleIt);
console.log(bList);

const cList = aList.map((x) => x * 2);
console.log(cList);
```

    [ 2, 4, 6, 8, 10, 12 ]
    [ 2, 4, 6, 8, 10, 12 ]

显然用箭头函数更为简洁。另外，类似完成 `doubleIt(n)` 这种简单功能的函数，常常有 “用过即弃” 的必要。

```javascript
const phonebook = [
  { name: 'john', phone: 9876 },
  { name: 'mike', phone: 5603 },
  { name: 'stan', phone: 6898 },
  { name: 'eric', phone: 7898 },
];

console.log(phonebook);
console.log(phonebook.map((x) => x.name));
console.log(phonebook.map((x) => x.phone));
```

    [
      { name: 'john', phone: 9876 },
      { name: 'mike', phone: 5603 },
      { name: 'stan', phone: 6898 },
      { name: 'eric', phone: 7898 }
    ]
    [ 'john', 'mike', 'stan', 'eric' ]
    [ 9876, 5603, 6898, 7898 ]

Javascript 的 `Array.prototype.map` 一次只作用在一个数组上。若要对两个数组“两两配对”再计算，可以用其中一个的下标去取另一个：

```javascript
const aList = [1, 3, 5];
const bList = [2, 4, 6];

console.log(aList.map((x, i) => x * bList[i]));
```

    [ 2, 12, 30 ]

以上的例子都弄明白了，再去看排序时把函数当作参数传入，就不会有任何疑惑了。例如 [`Array.prototype.sort`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) 可以接收一个比较函数：

```javascript
const pairs = [
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
  [4, 'four'],
];

pairs.sort((a, b) => (a[1] < b[1] ? -1 : a[1] > b[1] ? 1 : 0));
// 或：pairs.sort((a, b) => a[1].localeCompare(b[1]));
console.log(pairs);
```

    [ [ 4, 'four' ], [ 1, 'one' ], [ 3, 'three' ], [ 2, 'two' ] ]

> 官方文档可继续对照阅读：
>
> * [MDN — 箭头函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
> * [MDN — Array.prototype.map()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
> * [MDN — Array.prototype.sort()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

<a href="./Part.2.D.4-recursion.md" ><small>Next Page</small></a>
