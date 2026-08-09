# 数据容器

前文回顾（来自李笑来的 Python 版本请点击「阅读原文」）：

> [#前端](https://mp.weixin.qq.com/mp/appmsgalbum?action=getalbum&__biz=MzI0NTM0MzE5Mw==&scene=1&album_id=3953635132766044162&count=3&scene=21#wechat_redirect)

在 JavaScript 中，有个**数据容器**（Container）的概念。

其中包括**字符串**、由 `Array.from()` 方法生成的**数组**、**数组**（Array）、**对象**（Object）、**集合**（Set）、**映射**（Map）。

这些容器，各有各的用处。其中又分为*可变*容器（Mutable）和*不可变*容器（Immutable）。可变的有数组、集合、映射；不可变的有字符串。集合，又分为 *Set* 和 *WeakSet*；其中，Set 是*可变的*，WeakSet 是*可变的*。

字符串、由 `Array.from()` 方法生成的数组、数组是**有序类型**（Sequence Type），而集合与映射是*无序*的。

另外，集合没有*重复*元素。

## 1 迭代（Iterate）

数据容器里的元素是可以被**迭代的**（Iterable），它们其中包含的元素，可以被逐个访问，以便被处理。

对于数据容器，有一个操作符，`in`，用来判断某个元素是否属于某个容器。

由于数据容器的可迭代性，再加上这个操作符 `in`，在 JavaScript 语言里写循环格外容易且方便（以字符串这个字符的容器作为例子）：

```javascript
for (let c of 'JavaScript') {
  console.log(c);
}
```

在 JavaScript 中，简单的 for 循环，只需要指定一个次数就可以了，因为有 `Array.from()` 这个方法：

```javascript
for (let i of Array.from({ length: 10 }, (_, i) => i)) {
  console.log(i);
}
```

## 2 数组（Array）

数组和字符串一样，是个*有序类型*（Sequence Type）的容器，其中包含着有索引编号的元素。

数组中的元素可以是不同类型。不过，在解决现实问题的时候，我们总是倾向于创建由同一个类型的数据构成的数组。遇到由不同类型数据构成的数组，我们更可能做的是想办法把不同类型的数据分门别类地拆分出来，整理清楚 —— 这种工作甚至有个专门的名称与之关联：*数据清洗*。

### 2.1 数组的生成

生成一个数组，有以下几种方式：

```javascript
let aArray = [];
let bArray = [1, 2, 3];
Array.from({ length: 5 }, (_, i) => i + 1); // 这是 Type Casting
```

```javascript
let aArray = [];
aArray.push(1);
aArray.push(2);
console.log(aArray, `长度为 ${aArray.length}。`);

let bArray = Array.from({ length: 8 }, (_, i) => i + 1);
bArray.push(11);
console.log(bArray, `长度为 ${bArray.length}。`);

let cArray = Array.from({ length: 8 }, (_, i) => 2 ** i);
console.log(cArray, `长度为 ${cArray.length}。`);
```

这最后一种方式颇为神奇：

```javascript
Array.from({ length: 8 }, (_, i) => 2 ** i);
```

这种做法，叫做 **[Array Comprehension](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from)**。

Array comprehension 可以嵌套使用 `for`，甚至可以加上条件 `if`。官方文档里有个例子，是用来把两个元素并不完全相同的数组去同后拼成一个数组。

### 2.2 数组的操作符

数组的操作符和字符串一样，因为它们都是有序容器。数组的操作符有：

> * 拼接：`+`（与字符串不一样的地方是，不能用空格 `' '` 了）
> * 复制：`Array.from()`
> * 逻辑运算：`in` 和 `not in`，`<`、`<=`、`>`、`>=`、`!=`、`==`

而后两个数组也和两个字符串一样，可以被比较，即，可以进行逻辑运算；比较方式也跟字符串一样，从两个数组各自的第一个元素开始逐个比较，“一旦决出胜负马上停止”：

```javascript
let aArray = [1, 2, 3];
let bArray = [4, 5, 6];
let cArray = aArray.concat(bArray, bArray, bArray);
console.log(cArray);
console.log(7 in cArray);
console.log(aArray > bArray);
```

### 2.3 根据索引提取数组元素

数组当然也可以根据索引操作，但由于数组是可变序列，所以，不仅可以提取，还可以删除，甚至替换。

```javascript
let aArray = [77, 66, 79];
let bArray = ['L', 'Z', 'R'];
let cArray = aArray.concat(bArray, aArray, aArray);
console.log(cArray);

console.log(cArray[3]); // 返回索引值为 3 的元素值
console.log(cArray.slice(5)); // 从索引为 5 的值开始直到末尾
console.log(cArray.slice(2, 6)); // 从索引 2 开始，直到索引 6 之前（不包括 6）

cArray.splice(3, 1); // 根据索引删除
console.log(cArray);

cArray[1] = 'a'; // 根据索引替换
console.log(cArray);
```

需要注意的地方是：**数组**（Array）是可变序列，而**字符串**（String）是不可变序列，所以，对字符串来说，虽然也可以根据索引提取，但没办法根据索引删除或者替换。

```javascript
let s = 'JavaScript'.slice(2, 5);
console.log(s);
```

之前提到过：

> 字符串常量（String Literal）是不可变有序容器，所以，虽然字符串也有一些 Methods 可用，但那些 Methods 都不改变它们自身，而是在操作后返回一个值给另外一个变量。

而对于数组这种*可变容器*，我们可以对它进行操作，结果是*它本身被改变*了。

```javascript
let s = 'JavaScript';
let aArray = Array.from(s);
console.log(s);
console.log(aArray);
aArray.splice(2, 1);
console.log(aArray);
```

### 2.4 数组可用的内建函数

数组和字符串都是容器，它们可使用的内建函数也其实都是一样的：

> * `length`
> * `max()` - 自定义实现
> * `min()` - 自定义实现

```javascript
let aArray = [89, 84, 85];
let bArray = ['X', 'B', 'X'];
let cArray = aArray.concat(bArray, aArray, aArray);
console.log(cArray);

aArray.push(100);
console.log(aArray);

console.log(Math.max(...aArray)); // 自定义实现
console.log(Math.min(...aArray)); // 自定义实现
```

### 2.5 Methods

字符串常量和数组都可以进行一些基本的操作，但数组是**可变类型**（Mutable type），所以，它最起码可以被排序 —— 使用 `sort()` Method：

```javascript
let aArray = [98, 9, 95, 15, 80, 70, 98, 82, 88, 46];
console.log('排序前：', aArray);

aArray.sort((a, b) => a - b);
console.log('升序排序：', aArray);

aArray.sort((a, b) => b - a); // 降序排序
console.log('降序排序：', aArray);
```

如果数组中的元素全都是由字符串构成的，当然也可以排序：

```javascript
let aArray = ['B', 'U', 'H', 'D', 'C', 'V', 'V', 'Q', 'U', 'P'];
console.log('排序前：', aArray);

aArray.sort();
console.log('升序排序：', aArray);

aArray.sort((a, b) => b.localeCompare(a)); // 自定义降序排序
console.log('降序排序：', aArray);
```

**注意**：不能乱比较…… 被比较的元素应该是同一类型 —— 所以，不是由同一种数据类型元素构成的数组，不能使用 `sort()` Method。

```javascript
let aArray = [1, 'a', 'c'];
try {
  aArray.sort(); // 这一句会报错
} catch (e) {
  console.error(e);
}
```

**可变序列**还有一系列可用的 **Methods**：`aArray.push()`，`aArray.pop()`，`aArray.splice()`，`aArray.slice()`，`aArray.reverse()`……

```javascript
let aArray = [90, 88, 73];
let bArray = ['T', 'N', 'Y'];
let cArray = aArray.concat(bArray, aArray, aArray);
console.log(cArray);

cArray.push('100');
console.log(cArray);

aArray = [];


console.log(aArray);

cArray.pop();
console.log(cArray);
```

关于 `sort()` Method，提一下一个细节：**排序不改变字符串中元素的大小写**。

```javascript
let aArray = ['B', 'u', 'H', 'D', 'c', 'V', 'v', 'Q', 'U', 'P'];
aArray.sort();
console.log(aArray);
```

上面程序里使用的 Method 是：`aArray.sort()`。这种 `sort()` 的用法，在排序的时候，是不改变大小写的。既然如此，若要对字符大小写不敏感的排序，还得自己写代码：

```javascript
let aArray = ['B', 'u', 'H', 'D', 'c', 'V', 'v', 'Q', 'U', 'P'];
aArray.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
console.log(aArray);
```

**注意**：

在实际编程过程中，`sort()` Method 不仅仅对数组元素进行排序，而且会影响数组本身 —— 也就是说，`sort()` Method 作用于**可变容器**，会导致这个容器本身改变。

那么，如果需要多个排序，且必须保留排序前的原始顺序该怎么办呢？

**答案是：**

使用 `slice()` Method 生成原数组的拷贝，再对拷贝进行 `sort()` 操作：

```javascript
let aArray = ['B', 'u', 'H', 'D', 'c', 'V', 'v', 'Q', 'U', 'P'];
let bArray = aArray.slice();
bArray.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
console.log(bArray);
console.log(aArray); // 未改变
```

最后，数组还有一些特别的 Methods。它们分别是：

> * `find()` - 查找符合条件的元素。
> * `findIndex()` - 查找符合条件的元素的位置。
> * `forEach()` - 遍历数组，替代 for 循环。

```javascript
let aArray = [90, 88, 73];
let bArray = ['T', 'N', 'Y'];
let cArray = aArray.concat(bArray, aArray, aArray);
console.log(cArray);

let result = cArray.find((ele) => ele == 90);
console.log(result);

result = cArray.findIndex((ele) => ele == 90);
console.log(result);

result = cArray.forEach((ele, index, array) => {
  console.log(ele, index);
});
console.log(result);
```

### 2.6 数组的 Generator Expression

数组当然也可以用 **Generator Expression**：

```javascript
let aArray = Array.from({ length: 5 }, (_, i) => i + 1);
console.log(aArray);

let result = Array.from(aArray, (ele) => ele ** 2);
console.log(result);
```

更厉害的是，这种方式还可以跟 `filter()` Method 结合起来，筛选出符合条件的元素，然后再进行处理：

```javascript
let aArray = Array.from({ length: 11 }, (_, i) => i + 1);
let result = Array.from(aArray.filter((ele) => ele % 2 == 0), (ele) => ele ** 2);
console.log(result);
```

这个代码段中，`filter()` Method 的含义，是**筛选出**数组中那些**符合条件**的元素——其中 `filter()` Method 里传入的 `callback` 函数作为一个 **Predicate**，其返回值要么是 `true` 要么是 `false`，所以，筛选后的结果只有那些 `callback` 函数返回 `true` 的元素。

关于数组和字符串，以及它们之间的转换，还有很多细节的知识，但重要的都在这儿了。

## 3 练习题💡

1. 在 `deno` 中设计一个接口，实现传入数量不定的 Arrays，然后把它们拼接在一起返回。

