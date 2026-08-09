# 字符串

在任何一本编程书籍之中，关于字符串的内容总是很长 —— 就好像每本英语语法书中，关于动词的内容总是占全部内容的至少三分之二。这也没什么办法，因为处理字符串是计算机程序中最普遍的需求 —— 因为程序的主要功能就是完成人机交互，人们所用的就是字符串而不是二进制数字。

在计算机里，所有的东西最终都要被转换成数值。又由于计算机靠的是电路，所以，最终只能处理 `1` 和 `0`，于是，最基本的数值是二进制；于是，连整数、浮点数字，都要最终转换成二进制数值。这就是为什么在所有编程语言中 `1.1 + 2.2` 并不是你所想象的 `3.3` 的原因。
```
1.1 + 2.2; // 3.3000000000000003
```

> 因为最终所有的值都要转换成二进制 —— 这时候，小数的精度就有损耗，多次浮点数字转换成二进制相互运算之后再从二进制转换为十进制之后返回的结果，精度损耗就更大了。因此，在计算机上，浮点数字的精度总有极限。
>
> 字符串也一样。一个字符串由 0 个字符或者多个字符构成，它最终也要被转换成数值，再进一步被转换成二进制数值。空字符串的值是 `undefined`，即便是这个 `undefined` —— 也最终还是要被转换成二进制的 `0`。

![image-20250506205722617](images/image-20250506205722617.png)

## 字符码表的转换

很久以前，计算机的中央处理器最多只能够处理 8 位二进制数值，所以，那时候的计算机只能处理 256 个字符，即，2<sup>8</sup> 个字符。那个时候计算机所使用的码表叫 ASCII。现在计算机的中央处理器，大多是 64 位的，所以可以使用 2<sup>64</sup> 容量的码表，叫做 [Unicode](https://zh.wikipedia.org/wiki/Unicode)。随着多年的收集，2018 年 6 月 5 日公布的 `11.0.0` 版本已经包含了 13 万个字符 —— 突破 10 万字符是在 2005 年。

把单个字符转换成码值的函数是 `charCodeAt()`，它只接收单个字符，否则会报错；它返回该字母的 unicode 编码。与 `charCodeAt()` 相对的函数是 `fromCharCode()`，它接收且只一个整数作为参数，而后返回相应的字符。`fromCharCode()` 接收多个字符的话会报错。

```javascript
var str = "A";
console.log(str.charCodeAt(0)); // 65

var num = 97;
console.log(String.fromCharCode(num)); // 'a'
```

## 字符串的标示

标示一个字符串，有 2 种方法，用单引号或者双引号：

```javascript
'd';
"d";
```

JavaScript 中输出多行文字需要一些技巧：

```javascript
function heredoc(fn) {
    return fn.toString().split('\n').slice(1,-1).join('\n') + '\n'
}
var tmpl = heredoc(function(){/*
    hello
    world
    */});
console.log(tmpl);
```

## 字符串与数值之间的转换

由数字构成的字符串，可以被转换成数值，转换整数用 `parseInt()` ，转换浮点数字用 `parseFloat()`。

与之相对，用 `String()`，可以将数值转换成字符串类型。

注意，`parseInt()` 在接收字符串为参数的时候，只能做整数转换。下面代码最后一行会报错：

```javascript
parseInt('3');
parseFloat('3');
String(3.1415926);
parseInt('3.1415926'); // NaN
```

`prompt()` 这个内建函数的功能是接收用户的键盘输入，而后将其作为字符串返回。它可以接收一个字符串作为参数，在接收用户键盘输入之前，会把这个参数输出到屏幕，作为给用户的提示语。这个参数是可选参数，直接写 `prompt()`，即，没有提供参数，那么它在要求用户输入的时候，就没有提示语。

以下代码会报错，因为 `age < 18` 不是合法的逻辑表达式，因为 `age` 是由 `prompt()` 传递过来的字符串；于是，它不是数字，那么它不可以与数字比较……

```javascript
var age = prompt('Please tell me your age: ');
if (age < 18) {
    console.log('I can not sell you drinks...');
} else {
    console.log('Have a nice drink!');
}
```

要改成这样才行：

```javascript
var age = parseInt(prompt('Please tell me your age: '));
if (age < 18) {
    console.log('I can not sell you drinks...');
} else {
    console.log('Have a nice drink!');
}
```

## 转义符

有一个重要的字符，叫做“转义符”，`\`，也有的地方把它称为“脱字符”，因为它的英文原文是 _Escaping Character_。它本身不被当作字符，你要想在字符串里含有这个字符，得这样写 `\\`：

```javascript
'\\';
```

上面这一行报错信息是 `SyntaxError: Invalid or unexpected token`。这是因为 `\'` 表示的是单引号字符 `'`（Literal） —— 是可被输出到屏幕的 `'`，而不是用来标示字符串的那个 `'`。

如果你想输出这么个字符串，`He said, it's fine.`，如果用双引号扩起来 `"` 倒没啥问题，但是如果用单引号扩起来就麻烦了，因为编译器会把 `it` 后面的那个单引号 `'` 当作字符串结尾。

```javascript
'He said, it\'s fine.';
```

转义符号 `\` 的另外两个常用形式是和 `t`、`n` 连起来用，`\t` 代表制表符（就是用 TAB `⇥` 键敲出来的东西），`\n` 代表换行符（就是用 Enter `⏎` 敲出来的东西）。

由于历史原因，Linux/Mac/Windows 操作系统中，换行符号的使用各不相同。Unix 类操作系统（包括现在的 MacOS），用的是 `\n`；Windows 用的是 `\r\n`，早期苹果公司的 Macintosh 用的是 `\r`（参见 [Wikipedia: Newline](https://en.wikipedia.org/wiki/Newline)）。

所以，一个字符串，有两种形式，**raw** 和 **presentation**，在后者中，`\t` 被转换成制表符，`\n` 被转换成换行。

在写程序的过程中，我们在代码中写的是 _raw_，而例如当我们调用 `console.log()` 将字符串输出到屏幕上时，是 _presentation_：

```javascript
var s = "He said, it's file."; // raw
console.log(s);                 // presentation
```

## 字符串的操作符

字符串可以用空格 `' '` 或者 `+` 拼接：

```javascript
'Hey!' + ' ' + 'You!'; // 使用操作符 +
'Hey!' + 'You!'; // 空格 与 + 的作用是相同的。
```

字符串还可以与整数被操作符 `*` 操作，`'Ha' * 3` 的意思是说，把字符串 `'Ha'` 复制三遍：

```javascript
'Ha'.repeat(3); // 'HaHaHa'
```

字符串还可以用 `includes()` 操作符 —— 看看某个字符或者字符串是否被包含在某个字符串中，返回的是布尔值：

```javascript
'Hey, You!'.includes('o');
```

## 字符串的索引

字符串是由一系列的字符构成的。在 JavaScript 当中，有一个容器（Container）的概念，这个概念后面会深入讲解。现在需要知道的是，字符串是容器的一种；容器可分为两种，有序的和无序的 —— 字符串属于**有序容器**。

字符串里的每个字符，对应着一个从 `0` 开始的索引。比较有趣的是，索引可以是负数：

| 0    | 1    | 2    | 3    | 4    | 5    |
| ---- | ---- | ---- | ---- | ---- | ---- |
| P    | y    | t    | h    | o    | n    |
| -6   | -5   | -4   | -3   | -2   | -1   |

```javascript
var s = 'Javascript';
for (var i = 0; i < s.length; i++) {
    console.log(i, s[i]);
}
```

我们可以使用_索引操作符_根据_索引_**提取**字符串这个_有序容器_中的_一个或多个元素_，即，其中的字符或字符串。这个“提取”的动作有个专门的术语，叫做“slicing”（切片）。索引操作符 `[]` 中可以有一个、两个或者三个整数参数，如果有两个参数，需要用 `:` 隔开。它最终可以写成以下 4 种形式：

> * `s[index]` —— 返回索引值为 `index` 的那个字符
> * `s[start:]` —— 返回从索引值为 `start` 开始一直到字符串末尾的所有字符
> * `s[start:stop]` —— 返回从索引值为 `start` 开始一直到索引值为 `stop` 的那个字符_之前_的所有字符
> * `s[:stop]` —— 返回从字符串开头一直到索引值为 `stop`的那个字符_之前_的所有字符
> * `s[start:stop:step]` —— 返回从索引值为 `start` 开始一直到索引值为 `stop` 的那个字符_之前_的，以 `step` 为步长提取的所有字符

JavaScript 中的切片可以通过 `substring()` 和 `slice()` 方法实现：

```javascript
var s = 'Python';
console.log(s.substring(1)); // 'ython'
console.log(s.substring(2, 5)); // 'tho'
console.log(s.slice(1, 5)); // 'ytho'
```

## 处理字符串的内建函数

JavaScript 处理字符串的内建函数有很多，常见的如 `charCodeAt()`、`fromCharCode()`、`parseInt()`、`parseFloat()`、`String()`、`length` 等。

```javascript
console.log('\n'.charCodeAt(0)); // 10
console.log(String.fromCharCode(65)); // 'A'
var s = prompt('请照抄一遍这个数字 3.14: ');
console.log(parseInt('3'));
console.log(parseFloat(s) * 9);
console.log(s.length);
console.log(s.repeat(3));
```

## 处理字符串的 Method

在 JavaScript 中，字符串是一个**对象**。字符串对象具有许多可以调用的方法（Methods）。

### 大小写转换

转换字符串大小写的方法包括 `toUpperCase()`、`toLowerCase()` 和 `toLocaleLowerCase()`；另外，还有专门针对行首字母大写的 `toUpperCase()` 和针对每个词的首字母大写的 `toTitleCase()`（需要自定义实现）。

```javascript
var s = 'Now is better than never.';
console.log(s.toUpperCase()); // 'NOW IS BETTER THAN NEVER.'
console.log(s.toLowerCase()); // 'now is better than never.'
```

### 搜索与替换

JavaScript 提供了 `indexOf()`、`lastIndexOf()`、`includes()`、`replace()` 等方法来进行字符串的搜索和替换。

```javascript
var s = "Simple is better than complex. Complex is better than complicated.";
console.log(s.toLowerCase().indexOf('mpl'));
console.log(s.toLowerCase().lastIndexOf('mpl'));
console.log(s.toLowerCase().replace('mpl', '[ ]', 2));
```

## 去除子字符

`trim()` 方法最常用的场景是去除一个字符串首尾的所有空白，包括空格、TAB、换行符等等。

```javascript
var s = "  Simple is better than complex.  ";
console.log(s.trim()); // 'Simple is better than complex.'
```

## 拆分字符串

在 JavaScript 中，可以使用 `split()` 方法将一个字符串拆分为多个子字符串。

```javascript
var s = "Name,Age,Location\nJohn,18,New York\nMike,22,San Francisco\nJanny,25,Miami\nSunny,21,Shanghai";
var lines = s.split('\n');
console.log(lines);
```

## 拼接字符串

`join()` 是 JavaScript 中常用的方法，用于将多个子字符串拼接为一个字符串。

```javascript
var s = '';
var t = ['P', 'y', 't', 'h', 'o', 'n'];
console.log(s.join(t)); // 'Python'
```

## 字符串排版

JavaScript 提供了 `padStart()`、`padEnd()` 方法来实现字符串的排版。

```javascript
var s = 'Sparse is better than dense!';
console.log(s.padStart(60, ' '));
console.log(s.padEnd(60, '='));
```

## 格式化字符串

在 JavaScript 中，格式化字符串可以使用模板字面量（Template Literal）。

```javascript
var name = 'John';
var age = 25;
console.log(`${name} is ${age} years old.`);
```

## 字符串属性

JavaScript 提供了一系列的方法来判断字符串的构成属性，如 `includes()`、`startsWith()`、`endsWith()` 等。

```javascript
var s = '1234567890';
console.log(s.includes('456')); // true
console.log(s.startsWith('123')); // true
console.log(s.endsWith('890')); // true
```

## 总结

这一章节显得相当繁杂。然而，这一章和下一章（关于容器），都是「**用来锻炼自己耐心的好材料**」……

不过，若是自己动手整理成一个表格，总结归纳一下这一章节的内容，你就会发现其实没多繁杂，总之就还是那点事儿，怎么处理字符串？用操作符、用内建函数，用 Methods。只不过，字符串的操作符和数值的操作符不一样 —— 类型不一样，操作符就当然不一样了么！—— 最不一样的地方是，字符串是有序容器的一种，所以，它有索引，所以可以根据索引提取…… 至于剩下的么，就是很常规的了，用函数处理，用 Methods 处理，只不过，Methods 相对多了一点而已。

整理成表格之后，就会发现想要全部记住其实并没多难……

「记住」的方法并不是马上就只盯着表格看…… 正确方法是反复阅读这一章内容中的代码，并逐一运行，查看输出结果；还要顺手改改看看，多多体会。多次之后，再看着表格回忆知识点，直到牢记为止。

## 练习题💡 

1. 在 `deno` 中设计一个接口，实现传入一个参数名为 msg 的字符串，返回值为「 6 位长度的随机数 + msg + 当前时间戳」。

2. （这一题对于目前进度来说有些超纲，所以在有兴趣地情况下可以试着研究看看……）在 `1` 实现的接口的基础上，进一步地实现通过一个本地环境变量中存储的私钥，对合成后的消息进行签名并返回。
并思考🤔两个问题：
a) 为什么要在 msg 中加入随机数和时间戳？
b) 为什么要将私钥存储在本地的环境变量中，这样做安全吗？