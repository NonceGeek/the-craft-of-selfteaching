# 文件

> #前端

我们需要处理的数据，一定是很多，所以才必须由计算机帮我们处理 —— 大量的数据保存、读取、写入，需要的就是文件（Files）。在这一章里，我们只介绍最简单的文本文件。

> 💡 `Javascript` 是是一门全能型语言，即可以用于 **前端程序** ，也可以用于  **后端程序**。所有的应用，我们都可以将其看作一个公式：
>
> 应用 = 前端 + 后端 + 数据库
>
> 所以，要成为 **独立开发者**，Javascript 是「最经济」的上手语言。

## 创建文件

创建一个文件，最简单的方式就是用 JavaScript 的内建函数 `fs.writeFileSync()` 和 `fs.openSync()`。

`fs.writeFileSync()` 函数的用法是:

```javascript
fs.writeFileSync(path, data[, options])
```

创建一个新文件，如果文件不存在则创建，如果文件存在则覆盖，用这样一个语句就可以：

```javascript
const fs = require('fs');
fs.writeFileSync('./test-file.txt', 'Hello World!');
```

打开一个文件的示例代码是：

```javascript
const fd = fs.openSync('./test-file.txt', 'w');
```

## 删除文件

删除文件，我们使用 Node.js 的 `fs` 模块。在删除文件之前，我们可以用 `fs.existsSync()` 来确认文件是否存在，避免错误。

```javascript
const fs = require('fs');

fs.writeFileSync('./test-file.txt', 'Temporary file');
console.log('File created.');

if (fs.existsSync('./test-file.txt')) {
    fs.unlinkSync('./test-file.txt');
    console.log('File deleted.');
} else {
    console.log('File does not exist.');
}
```

## 读写文件

创建文件之后，我们可以用 `fs.writeFileSync()` 把数据写入文件，也可以用 `fs.readFileSync()` 读取文件内容。

```javascript
const fs = require('fs');

// 写入文件
fs.writeFileSync('./test-file.txt', '第一行\n第二行\n第三行\n');

// 读取文件
const data = fs.readFileSync('./test-file.txt', 'utf8');
console.log(data);
```

文件有很多行的时候，我们可以通过读取文件内容后，使用字符串的 `split()` 方法来处理每一行：

```javascript
const fs = require('fs');

// 写入文件
fs.writeFileSync('./test-file.txt', '第一行\n第二行\n第三行\n');

// 读取文件并按行处理
const data = fs.readFileSync('./test-file.txt', 'utf8');
const lines = data.split('\n');

lines.forEach((line) => {
    console.log(line);
});
```

## 使用 `fs` 模块

针对文件操作，Node.js 提供了 `fs` 模块，使得读写文件变得更简单。

```javascript
const fs = require('fs');

// 使用 writeFileSync 方法写入文件
fs.writeFileSync('./test-file.txt', '第一行\n第二行\n第三行\n');

// 使用 readFileSync 方法读取文件
const data = fs.readFileSync('./test-file.txt', 'utf8');
console.log(data);
```

这样，就可以把针对当前以特定模式打开的某个文件的各种操作都写入同一个语句块了。

## 总结

这一章我们介绍了 JavaScript 中文本文件的基本操作：

> * 打开文件，直接用内建模块 `fs`，基本方法有 `fs.openSync()`、`fs.writeFileSync()`；
> * 删除文件，得调用 `fs` 模块，使用 `fs.unlinkSync()`，删除文件前最好确认文件确实存在……
> * 读写文件分别有 `fs.readFileSync()`、`fs.writeFileSync()`；
> * 可以用 `fs` 模块把相关操作都简化处理……