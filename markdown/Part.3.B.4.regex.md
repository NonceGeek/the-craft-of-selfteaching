# 正则表达式

正则表达式本质上是个独立的语言，短小却格外强悍 —— 乃至于，如果你竟然没学会它的话，你的之前学的编程技能干脆与残疾无异。

Wikipedia 上对正则表达式的说明如下：

> **正则表达式**（英语：Regular Expression，在代码中常简写为 regex、regexp 或 RE），又称*正规表示式*、*正规表示法*、*正规运算式*、*规则运算式*、*常规表示法*，是计算机科学的一个概念。正则表达式使用单个字符串来描述、匹配一系列符合某个句法规则的字符串。在很多文本编辑器里，正则表达式通常被用来检索、替换那些符合某个模式的文本。许多程序设计语言都支持利用正则表达式进行字符串操作。例如，在 Perl 中就内建了一个功能强大的正则表达式引擎。正则表达式这个概念最初是由 Unix 中的工具软件（例如 sed 和 grep）普及开的。

以下是绝大多数翻译成中文的教程中对正则表达式进行讲解时所使用的描述：

> 一个正则表达式（Regular Expression）通常被称为一个模式（Pattern）。

我常常觉得当初要是它被翻译成 “规则表达式”，那么很可能初学者不会感到那么大的压力 —— 谁都一样，看着由 “每个都认识的字构成的词组” 却不能直观地想到它究竟是什么东西，都会感到莫名的压力。

**Regular**，其实在它的众多语义中，取以下释义最符合 Regular Expression 的原意<a href='#fn1' name='fn1b'><sup>[1]</sup></a>：

> ⑭ Linguistics 规则的 ▸ regular verbs 规则动词

而 **Pattern** 这个词，在词典里有好几个对应的中文词汇：

> ① 图案；② 式样；③ 图样；④ 榜样；⑤ 模式；⑥ 样品；⑦ 模子

在当前语境之下，把 Pattern 翻译成 “模式”，显然不如 “模子” 更好（甚至连 “样品” 感觉都比 “模式” 更恰当）—— “模子” 这个词很直观啊，拿着一个模子去找与它一致的字符串…… “与规则一致”，英文用的是 **Match**，一般被翻译作 “匹配”。

在自学编程的过程中，处处都是这种语言翻译带来的迷惑、障碍，或者耽误。既然应该把 Regular Expression 理解为 “规则表达式” 更好，那其实吧，把 Pattern 直接理解为中文的 “*规则*”，可能更直观更准确，理解上更是毫无障碍：

> 一个规则表达式（Regular Expression）通常被称为一个规则（Pattern）。

那么，**规则表达式**里写的是什么呢？只能是**规则**了…… 到最后好像也就 “捕获”（Capture）这个词没什么歧义。

现在，我们已经把术语全部 “解密” 了，然后再看看下面的表述：

> 我们可以用书写特定的规则，用来在文本中捕获与规则一致的字符串，而后对其进行操作……

理解起来相当顺畅。

以下的 Javascript 代码中，[`\wo\w`](https://regexper.com#%5Cwo%5Cw) 就是一个*规则表达式*（或称为*规则*）；

而 `text.match(/.../g)` 的作用就是，在 `text` 里找到所有与这个**规则**（Pattern，模式）**一致**（Match，匹配）的字符串：


```javascript
const text = 'The quick brown fox jumps over the lazy dog';
const pttn = /\wo\w/g;
console.log(text.match(pttn));
```




    [ 'row', 'fox', 'dog' ]



总结一下：

> **规则表达式**（Regular Expressions，通常缩写为 Regex）是最强大且不可或缺的文本处理工具 —— 它的用处就是在文本中**扫描/搜索**（Scan/Search）与某一**规则**（Pattern）**匹配**（Match，即，与规则一致）的所有实例，并且还可以按照规则**捕获**（Capture）其中的部分或者全部，对它们进行**替换**（Replace）。

接下来为了避免歧义，我们干脆用 Regex 这个缩写，以及与它相关的英文单词：pattern, match, capture, replace(ment)……

有时，使用 Regex 并不是为了 Replace，而是为了检查格式，比如，可以用 Regex 检查用户输入的密码是否过于简单（比如，全部都由数字构成），比如可以用来验证用户输入的电话号码、证件号码是否符合特定格式等等。

另外，在自学的过程中，想尽一切办法把一切术语用简单直白的 “人话” 重新表述，是特别有效的促进进步的行为模式。

## 视觉体验

所谓百闻不如一见。

眼见为实 —— 想办法让一个陌生的概念视觉上直观，是突破大多学习障碍的最简单粗暴直接有效的方式。

我们最好先直接看看 Regex 的工作过程。以下，是用微软发行的代码编辑工具 Visual Studio Code 针对一小段文本使用若干条 Regex 进行匹配的过程：

![](../images/regex-test.gif)

Javascript 本身没有像老式 Python `redemo.py` 那样的官方小 GUI Demo，但你可以随时用这些方式试手：

* 在浏览器控制台（Chrome / Firefox DevTools）里直接敲 `/pattern/g` 和 `'text'.match(...)`；
* 在 Node REPL 里同样试验（终端运行 `node`）；
* 目前（2019 起）网上最方便的 Regex 测试器，是 [regex101.com](https://regex101.com) —— 把 Flavor 选成 ECMAScript / Javascript 即可。

以下，就是在一段文本中，找出所有首写字母大写的词汇的*过程*，并将其先全部替换成小写，再将其全部替换为大写的过程；使用的正则表达式是 `([A-Z]\w+)`，替换表达式分别是 `\L$1` 和 `\U$1`（这是部分编辑器 / 引擎支持的大小写转换写法；标准 Javascript 的 `String.prototype.replace` 本身并不内建 `\L` / `\U`，需要你自己用回调函数做大小写转换）：

![](../images/regex101.gif)

这个网站太好了，所以，平日里我是用 [Nativefier](https://github.com/jiahaog/nativefier) 工具将这个网站打包为一个 Mac Desktop App 使用。不过，它也有局限，就是被搜索文件略微大点就报错，说 `timeout`……

另外贴一张历史上 Python 自带 `redemo` 的界面图，仅供对照观感 —— 你现在用 regex101 或编辑器自带的 Regex 面板就够了：

![](../images/redemo.png)

## 准备工作


我们需要个文本文件，用来当作练习使用正则表达式去搜索替换的目标。这个文件保存在当前的根目录，文件名称是：`regex-target-text-sample.txt`。

以下代码中，`const pttn = /beg[iau]ns?/g` 这一句中的 [`beg[iau]ns?`](https://regexper.com#beg[iau]ns?) 就是 Regex 的 Pattern。

**注意**：在 Javascript 代码中，写 Pattern 时优先使用**正则字面量** `/.../`（而不是普通字符串）。Python 里常见的 raw string `r'...'` 是为了少写反斜杠；在 Javascript 的正则字面量里，多数转义可以直接写 `\`，但若你用 `new RegExp('...')` 从**字符串**构造正则，则每个 `\` 往往要写成 `\\`。另外，若要匹配 `\` 本身，字面量里仍需写成 `\\`。还要注意：正则字面量里的 `/` 本身若出现在 pattern 中，需要写成 `\/`。

而 `text.match(pttn)`（带 `g` 标志）的意思是说，把 `text` 中所有与该规则一致的字符串都找出来：


```javascript
import fs from 'node:fs';

const text = fs.readFileSync('regex-target-text-sample.txt', 'utf8');
const pttn = /beg[iau]ns?/g;
console.log(text.match(pttn));
```




    [ 'begin', 'began', 'begun', 'begin' ]



文件 `regex-target-text-sample.txt` 中的内容如下：

```html
<ol>
    <li><pre>begin began begun bigins begining</pre></li>
    <li><pre>google gooogle goooogle goooooogle</pre></li>
    <li><pre>coloured color coloring  colouring colored</pre></li>
    <li><pre>never ever verb however everest</pre></li>
    <li><pre>520 52000 5200000 520000000 520000000000</pre></li>
    <li><pre>error wonderer achroiocythaemia achroiocythemia</pre></li>
    <li><pre>The white dog wears a black hat.</pre></li>
    <li><pre>Handel, Händel, Haendel</pre></li>
</ol>
<dl>(843) 542-4256</dl> <dl>(431) 270-9664</dl>
<dl>3336741162</dl> <dl>3454953965</dl>
<ul>
<li>peoplesr@live.com</li> <li>jaxweb@hotmail.com</li>
<li>dhwon@comcast.net</li> <li>krueger@me.com</li>
</ul>
<h3>URLs</h3>
https://docs.python.org/3/howto/regex.html
https://docs.python.org/3/library/re.html
<h3>passwords</h3>
Pasw0rd~
i*Eh,GF67E
a$4Bh9XE&E
<h3>duplicate words</h3>
<p>It's very very big.</p>
<p>Keep it simple, simple, simple!</p>
```

在以下的示例中，有时直接设定了 `text` 的值，而不是使用以上整个文本文件 —— 因为读者在阅读的时候，最好能直接看到被搜索的字符串。另外，如果使用整个文件，所得到的 Match 太多，也确实影响阅读。

**再提醒一点**：Javascript 里若匹配失败，`String.prototype.match` 在带 `g` 时可能返回 `null` 而不是空数组；教学示例里为了省事有时直接 `console.log(text.match(pttn))`，自己写工具函数时可以写成 `text.match(pttn) ?? []`。

## 优先级

毕竟，你已经不是 “啥都不懂” 的人了。你已经知道一个事实：编程语言无非是用来运算的。

所谓的运算，就有操作符（Operators）和操作元（Operands）—— 而操作符肯定是有优先级的，不然的话，那么多操作元和操作符放在一起，究竟先操作哪个呢？

Regex 也一样，它本身就是个迷你语言（Mini Language）。在 Regex 中，操作符肯定也有优先级。它的操作元有个专门的名称，**原子**（Atom）。

先大致看看它的操作符优先级，你就会对它有相当不错的了解：

| 排列 |         原子与操作符优先级      |（从高到低）|
|---|-----------------------------------|------------------------|
| 1 | 转义符号 (Escaping Symbol)               | `\` |
| 2 | 分组、捕获 (Grouping or Capturing)                          | `(...)` `(?:...)` `(?=...)` `(?!...)` `(?<=...)` `(?<!...)`     |
| 3 | 数量 (Quantifiers)      | `a*` `a+` `a?` `a{n, m}` |
| 4 | 序列与定位（Sequence and Anchor）| `abc` `^` `$` `\b` `\B`               |
| 5 | 或（Alternation）| <code>a&#124;b&#124;c</code>                   |
| 6 | 原子 (Atoms)                 | `a` `[^abc]` `\t` `\r` `\n` `\d` `\D` `\s` `\S` `\w` `\W` `.` |

当然，你若是在之前，没有自学过、理解过 Javascript（或者任何其它编程语言）表达式中的操作符优先级，那么一上来就看上面的表格不仅对你没有帮助，只能让你更迷惑。

—— 这就是理解能力逐步积累逐步加强的过程。

## 原子

在 Regex 的 Pattern 中，操作元，即，被运算的 “值”，被称为**原子**（Atom）。

### 本义字符

最基本的原子，就是本义字符，它们都是单个字符。

本义字符包括从 `a` 到 `z`，`A` 到 `Z`，`0` 到 `9`，还有 `_` —— 它们所代表的就是它们的字面值。

即，相当于下面这两个字符表，再加上 `_`：


```javascript
const asciiLetters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const digits = '0123456789';
console.log(asciiLetters);
console.log(digits);
```




    abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ






    0123456789



以下字符在 Regex 中都有特殊含义：

> `\` `+` `*` `.` `?` `-` `^` `$` `|` `(` `)` `[` `]` `{` `}` `<` `>` 

当你在写 Regex 的时候，如果你需要搜索的字符不是本义字符，而是以上这些特殊字符时，*建议*都直接加上转义符号 `\` 来表示，比如，你想搜索 `'`，那你就写 `\'`，或者你想搜索 `#` 那你就写 `\#`（事实上，`#` 并不是 Regex 的特殊符号，所以，它之前的转义符号可有可无）—— 这对初学者来说可能是最安全的策略。

跟过往一样，所有的细节都很重要，它们就是需要花时间逐步熟悉到牢记。

### 集合原子

集合原子还是原子。

标示集合原子，使用方括号 `[]`。`[abc]` 的意思是说，“`a` or `b` or `c`”，即，`abc` 中的任意一个字符。

比如，[`beg[iau]n`](https://regexper.com#beg[iau]n) 能够代表 `begin`、`began`，以及 `begun`。


```javascript
const text = 'begin began begun bigins begining';
const pttn = /beg[iau]n/g;
console.log(text.match(pttn));
```




    [ 'begin', 'began', 'begun', 'begin' ]



在方括号中，我们可以使用两个操作符：`-`（区间）和 `^`（非）。

* `[a-z]` 表示从小写字母 `a` 到小写字母 `z` 中的任意一个字符。
* `[^abc]` 表示 `abc` 以外的其它任意字符，即，非 `[abc]`。

注意，一个集合原子中，`^` 符号只能用一次，只能紧跟在 `[` 之后。否则不起作用。

### 类别原子

类别原子，是指那些能够代表 “一类字符” 的原子，它们都得使用转义符号再加上另外一个符号表达，包括：

`\d` 任意数字；等价于 `[0-9]`

`\D` 任意非数字；等价于 `[^0-9]`

`\w` 任意本义字符；等价于 `[a-zA-Z0-9_]`（加 `u` 标志时行为会更 “Unicode 化”，见后文控制标记）

`\W` 任意非本义字符；等价于 `[^a-zA-Z0-9_]`

`\s` 任意空白；相当于 `[ \f\n\r\t\v]`（注意，方括号内第一个字符是空格符号）

`\S` 任意非空白；相当于 `[^ \f\n\r\t\v]`（注意，紧随 `^` 之后的是一个空格符号）

`.` 除换行符之外的任意字符；在 Javascript 默认情况下大致相当于 `[^\n]`（具体还受 `s`/`dotAll` 标志影响）

类别原子挺好记忆的，如果你知道各个字母是哪个词的首字母的话：

> * `d` 是 digits
> * `w` 是 word characters
> * `s` 是 spaces

另外，在空白的集合 `[ \f\n\r\t\v]` 中：`\f` 是分页符；`\n` `\r` 是换行符；`\t` 是制表符；`\v` 是纵向制表符（很少用到）。各种关于空白的转义符也同样挺好记忆的，如果你知道各个字母是那个词的首字母的话：

> * `f` 是 flip
> * `n` 是 new line
> * `r` 是 return
> * `t` 是 tab
> * `v` 是 vertical tab


```javascript
const text = '<dl>(843) 542-4256</dl> <dl>(431) 270-9664</dl>';
const pttn = /\d\d\d\-/g;
console.log(text.match(pttn));
```




    [ '542-', '270-' ]



### 边界原子

我们可以用边界原子指定边界。也可以称作 “定位操作符”。

`^` 匹配被搜索字符串的开始位置（若使用 `m` 标志，则还匹配每一行的行首）；

`$` 匹配被搜索字符串的结束位置（若使用 `m` 标志，则还匹配每一行的行尾）；

`\b` 匹配单词的边界；[`er\b`](https://regexper.com#er%5Cb)，能匹配 `coder` 中的 `er`，却不能匹配 `error` 中的 `er`；

`\B` 匹配非单词边界；[`er\B`](https://regexper.com#er%5CB)，能匹配 `error` 中的 `er`，却不能匹配 `coder` 中的 `er`。


```javascript
const text = 'never ever verb however everest';
console.log(text.match(/er\b/g));
console.log(text.match(/er\B/g));
```




    [ 'er', 'er', 'er' ]







    [ 'er', 'er' ]



**注意**：Javascript **没有**标准的 `\A` / `\Z`（那是 Python `re` 等引擎里 “整个字符串起止” 的锚点）。在 Javascript 里请用 `^` / `$`；需要按行锚定时加上 `m` 标志。

事实上，每种语言或多或少都对 Regex 有自己的定制。不过，本章讨论的绝大多数细节，都是通用的。

### 组合原子

我们可以用圆括号 `()` 将多个单字符原子组合成一个原子 —— 这么做的结果是，`()` 内的字符串将被当作一整个原子，可以被随后我们要讲解的数量操作符操作。

另外，`()` 这个操作符，有两个作用：**组合**（Grouping），就是我们刚刚讲到的作用；而另外一个作用是**捕获**（Capturing)，后面会讲到。

注意区别，[`er`](https://regexper.com#er)、[`[er]`](https://regexper.com#[er]) 和 [`(er)`](https://regexper.com#(er) 各不相同。

> * `er` 是两个原子，`'e'` 和紧随其后的 `'r'`
> * `[er]` 是一个原子，或者 `'e'` 或者 `'r'`；
> * `(er)` 是一个原子，`'er'`

下一节中讲到数量操作符的时候，会再次强调这点。

## 数量操作符

数量操作符有：`+` `?` `*` `{n, m}`。

它们是用来限定位于它们之前的原子允许出现的个数；不加数量限定则代表出现一次且仅出现一次：

`+` 代表前面的原子必须至少出现一次，即：` 出现次数 ≧ 1`

> 例如，[`go+gle`](https://regexper.com#go+gle)可以匹配 `google` `gooogle` `goooogle` 等；

`?` 代表前面的原子最多只可以出现一次，即：`0 ≦ 出现次数 ≦ 1`

> 例如，[`colou?red`](https://regexper.com#colou?red)可以匹配 `colored` 或者 `coloured`;

`*` 代表前面的原子可以不出现，也可以出现一次或者多次，即：` 出现次数 ≧ 0`

> 例如，[`520*`](https://regexper.com#520*)可以匹配 `52` `520` `52000` `5200000` `520000000000` 等。

`{n}` 之前的原子出现确定的 `n` 次；

`{n,}` 之前的原子出现至少 `n` 次；

`{n, m}` 之前的原子出现至少 `n` 次，至多 `m` 次

> 例如，[`go{2,5}gle`](https://regexper.com#go%7B2,5%7Dgle)，能匹配 `google` `gooogle` `goooogle` 或 `gooooogle`，但不能匹配 `gogle` 和 `gooooooogle`


```javascript
import fs from 'node:fs';

const text = fs.readFileSync('regex-target-text-sample.txt', 'utf8');

console.log(text.match(/go+gle/g));
console.log(text.match(/go{2,5}gle/g));
console.log(text.match(/colou?red/g));
console.log(text.match(/520*/g));
```




    [ 'google', 'gooogle', 'goooogle', 'goooooogle' ]







    [ 'google', 'gooogle', 'goooogle' ]







    [ 'coloured', 'colored' ]







    [ '520', '52000', '5200000', '520000000', '520000000000' ]



数量操作符是对它之前的原子进行操作的，换言之，数量操作符的操作元是操作符之前的原子。

上一节提到，要注意区别：`er`、`[er]` 和 `(er)` 各不相同。

> * `er` 是两个原子，`'e'` 之后 `'r'`
> * `[er]` 是一个原子，或者 `'e'` 或者 `'r'`；
> * `(er)` 是一个原子，`'er'`


```javascript
const text = 'error wonderer severeness';

console.log(text.match(/er/g));
console.log(text.match(/[er]/g));
console.log([...text.matchAll(/(er)/g)].map((m) => m[1]));
```




    [ 'er', 'er', 'er', 'er' ]







    [ 'e', 'r', 'r', 'r', 'e', 'r', 'e', 'r', 'e', 'e', 'r', 'e', 'e' ]







    [ 'er', 'er', 'er', 'er' ]



在以上的例子中，看不出 `er` 和 `(er)` 的区别，但是，加上数量操作符就不一样了 —— 因为*数量操作符只对它之前的那一个原子进行操作*：


```javascript
const text = 'error wonderer severeness';

console.log(text.match(/er+/g));
console.log(text.match(/[er]+/g));
// 带捕获组时，用 matchAll 才能稳定拿到每一组；m[1] 是该次匹配里组 1 的值
console.log([...text.matchAll(/(er)+/g)].map((m) => m[1]));
```




    [ 'err', 'er', 'er', 'er' ]







    [ 'err', 'r', 'erer', 'e', 'ere', 'e' ]







    [ 'er', 'er', 'er' ]



## 或操作符 `|`

或操作符 `|` 是所有操作符中优先级最低的，数量操作符的优先级比它高，所以，在 `|` 前后的原子被数量操作符（如果有的话）操作之后才交给 `|` 操作。

于是，[`begin|began|begun`](https://regexper.com#begin%7Cbegan%7Cbegun) 能够匹配 `begin` 或 `began` 或 `begun`。


```javascript
const text = 'begin began begun begins beginn';
const pttn = /begin|began|begun/g;
console.log(text.match(pttn));
```




    [ 'begin', 'began', 'begun', 'begin', 'begin' ]



在集合原子中（即，`[]` 内的原子）各个原子之间的关系，只有 “或” —— 相当于方括号中的每个原子之间都有一个被省略的 `|`。

**注意**：方括号的 `|` 不被当作特殊符号，而是被当作 `|` 这个符号本身。在方括号中的圆括号，也被当作圆括号 `()` 本身，而无分组含义。



```javascript
const text = 'achroiocythaemia achroiocythemia a|e';

console.log(text.match(/[a|ae]/g));
console.log(text.match(/[a|e]/g));
console.log(text.match(/[ae]/g));
console.log(text.match(/[(ae)]/g));
console.log(text.match(/[a|ae|(ae)]/g));
```




    [ 'a', 'a', 'e', 'a', 'a', 'e', 'a', 'a', '|', 'e' ]



## 匹配并捕获

捕获（Capture），使用的是圆括号 `()`。使用圆括号得到的匹配的值被暂存成一个带有索引的列表，第一个是 `$1`，第二个是 `$2`…… 以此类推。随后，我们可以在替换的过程中使用 `$1` `$2` 中所保存的值。

**注意**：在 Javascript 的 `String.prototype.replace` 里，引用捕获组请写 `$1`、`$2`……（不是 Python `re.sub` 里常见的 `\1`、`\2`）。若要用编程方式拿到每一次匹配的各组，请用 `String.prototype.matchAll`（记得给正则加上 `g` 标志）：


```javascript
const text = 'The white dog wears a black hat.';
const pttn = /The (white|black) dog wears a (white|black) hat./g;

console.log([...text.matchAll(pttn)].map((m) => [m[1], m[2]]));

console.log(text.replace(pttn, 'The $2 dog wears a $1 hat.'));
console.log(text.replace(/The (white|black) dog wears a (white|black) hat./, 'The $1 dog wears a $1 hat.'));
```




    [ [ 'white', 'black' ] ]







    The black dog wears a white hat.






    The white dog wears a white hat.



## 非捕获匹配

有时，你并不想捕获圆括号中的内容，在那个地方你使用括号的目的只是分组，而非捕获，那么，你就在圆括号内最开头加上 `?:` —— `(?:...)`：


```javascript
const text = 'The white dog wears a black hat.';
const pttn = /The (?:white|black) dog wears a (white|black) hat./g;

// 只捕获了一处，也就是说只有一个值将来可以被引用
console.log([...text.matchAll(pttn)].map((m) => m[1]));

// 之前的一处捕获，在替换时可被多次引用
console.log(text.replace(pttn, 'The $1 dog wears a $1 hat.'));
```




    [ 'black' ]







    The black dog wears a black hat.



在 Javascript 代码中使用正则表达式，匹配和捕获以及随后的替换，有更灵活的方式，因为可以对那些值直接编程。`String.prototype.replace` 的第二个参数甚至可以接收另外一个函数作为参数 —— 以后你肯定会自行认真阅读以下页面中的所有内容：

> * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp
> * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/match
> * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll
> * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace

非捕获匹配，还有若干个操作符：

 `(?=pattern)`   
> 正向肯定预查（look ahead positive assert），在任何匹配规则的字符串开始处匹配查找字符串。这是一个非获取匹配，也就是说，该匹配不需要获取供以后使用。例如，[`Windows(?=95|98|NT|2000)`](https://regexper.com#%60Windows(?=95%7C98%7CNT%7C2000)%60)
能匹配 `Windows2000` 中的 `Windows`，但不能匹配 `Windows3.1` 中的 `Windows`。预查不消耗字符，也就是说，在一个匹配发生后，在最后一次匹配之后立即开始下一次匹配的搜索，而不是从包含预查的字符之后开始。

`(?!pattern)`
> 正向否定预查（negative assert），在任何不匹配规则的字符串开始处匹配查找字符串。这是一个非获取匹配，也就是说，该匹配不需要获取供以后使用。例如[`Windows(?!95|98|NT|2000)`](https://regexper.com#Windows(?=95%7C98%7CNT%7C2000))
能匹配 `Windows3.1` 中的 `Windows`，但不能匹配 `Windows2000` 中的 `Windows`。预查不消耗字符，也就是说，在一个匹配发生后，在最后一次匹配之后立即开始下一次匹配的搜索，而不是从包含预查的字符之后开始。

`(?<=pattern)`
>反向（look behind）肯定预查，与正向肯定预查类似，只是方向相反。例如，[`(?<=95|98|NT|2000)Windows`](https://regexper.com#(?%3C=95%7C98%7CNT%7C2000)Windows)
能匹配 `2000Windows` 中的 `Windows`，但不能匹配 `3.1Windows` 中的 `Windows`。**现代 Javascript 引擎（ES2018 起）已支持 lookbehind**；极老的环境可能没有，那时只能换写法。

 `(?<!pattern)`
 >反向否定预查，与正向否定预查类似，只是方向相反。例如 `(?<!95|98|NT|2000)Windows`
能匹配 `3.1Windows` 中的 `Windows`，但不能匹配 `2000Windows` 中的 `Windows`。
 


## 控制标记

有几个全局控制标记（Flag）需要了解。在 Javascript 里，它们写在正则字面量末尾，例如 `/pattern/gi`，或作为 `new RegExp(pattern, 'gi')` 的第二个参数：
 
`g`（global）

> * 全局匹配：找到第一个 match 之后继续找下去；`String.prototype.match` 在带 `g` 时返回所有完整匹配组成的数组（**不含**捕获组细节），要同时拿捕获组请用 `matchAll`
> * 没有 `g` 时，`match` 通常只返回第一次匹配（数组形式里会带上各组）
> * 这和某些语言 “默认全局” 的习惯不同 —— **Javascript 默认不是 global**，需要你自己加 `g`

`i`（ignoreCase）

> * 忽略字母大小写
> * 等价于许多引擎里的 `(?i)` 思路；Javascript 字面量写作 `/pattern/i`

`m`（multiline）

> * 使用本标志后，`^` 和 `$` 除了匹配整个字符串的首尾，还会匹配换行符之后 / 之前的行首行尾

`s`（dotAll）

> * 使 `.` 匹配包括换行在内的任意字符；没有这个标志时，`.` 通常不匹配换行符

`u`（unicode）

> * 按 Unicode 码点正确处理 surrogate pair 等；也会影响 `\w`、`\d`、`.` 等在 Unicode 场景下的行为
> * 处理非 BMP 字符、emoji 时尤其有用

另外还有 `y`（sticky）、`d`（hasIndices）等较进阶的标志，用到时再查 [MDN — RegExp](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp) 即可。

Javascript **没有** Python `re.VERBOSE`（`x`）那种 “正则里写注释、忽略空白” 的标准标志；复杂 pattern 请拆变量或用普通代码注释说明。


## 几个最常用的 Regex

以下是几个常用的 Regex<a href='#fn2' name='fn2b'><sup>[2]</sup></a>，值得保存：

* matching username
> [`/^[a-z0-9_-]{3,16}$/`](https://regexper.com#/%5E[a-z0-9_-]%7B3,16%7D$/)

* matching password<a href='#fn3' name='fn3b'><sup>[3]</sup></a>
> [`/^[a-z0-9_-]{6,18}$/`](https://regexper.com#/%5E[a-z0-9_-]%7B6,18%7D$/)

* matching a HEX value
> [`/^#?([a-f0-9]{6}|[a-f0-9]{3})$/`](https://regexper.com#/%5E#?([a-f0-9]%7B6%7D%7C[a-f0-9]%7B3%7D)$/)

* matching a slug
> [`/^[a-z0-9-]+$/`](https://regexper.com#/%5E[a-z0-9-]+$/)

* matching email address
> [`/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/`](https://regexper.com#/%5E([a-z0-9_%5C.-]+)@([%5Cda-z%5C.-]+)%5C.([a-z%5C.]%7B2,6%7D)$/)
 

* matching a URL
> [`/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/`](https://regexper.com#/%5E(https?:%5C/%5C/)?([%5Cda-z%5C.-]+)%5C.([a-z%5C.]%7B2,6%7D)([%5C/%5Cw%20%5C.-]*)*%5C/?$/)

* matching an IP address
> [`/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/`](https://regexper.com/#%2F%5E%28%3F%3A%28%3F%3A25%5B0-5%5D%7C2%5B0-4%5D%5B0-9%5D%7C%5B01%5D%3F%5B0-9%5D%5B0-9%5D%3F%29%5C.%29%7B3%7D%28%3F%3A25%5B0-5%5D%7C2%5B0-4%5D%5B0-9%5D%7C%5B01%5D%3F%5B0-9%5D%5B0-9%5D%3F%29%24%2F)

* matching a HTML tag
> [`/^<([a-z]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)$/`](https://regexper.com/#%2F%5E<%28%5Ba-z%5D%2B%29%28%5B%5E<%5D%2B%29*%28%3F%3A>%28.*%29<%5C%2F%5C1>%7C%5Cs%2B%5C%2F>%29%24%2F)

对了，告诉你一个小秘密：
> 以上的正则表达式，点击都能连接到 [regexper.com](https://regexper.com)，在那里你能查看这些正则表达式的图形化示意图。另外，本文中，处于 markdown cell 的绝大多数正则表达式都有这样的连接…… 你可以重读的时候试试。


写 Regex 最烧脑的地方在于 “使其全面” —— 要考虑到各种意外情况。

当然，除非必要，也不要在 “全面” 这事上面花太多时间 —— 给你看一个据说是 “最大程度上能够匹配所有 email 地址的 Regex” <a href='#fn4' name='fn4b'><sup>[4]</sup></a>，我都懒得测试的一个正则表达式：

```regex
(?:(?:\r\n)?[ \t])*(?:(?:(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t]
)+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:
\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(
?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ 
\t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\0
31]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\
](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+
(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:
(?:\r\n)?[ \t])*))*|(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z
|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)
?[ \t])*)*\<(?:(?:\r\n)?[ \t])*(?:@(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\
r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[
 \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)
?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t]
)*))*(?:,@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[
 \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*
)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t]
)+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*)
*:(?:(?:\r\n)?[ \t])*)?(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+
|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r
\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:
\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t
]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031
]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](
?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?
:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?
:\r\n)?[ \t])*))*\>(?:(?:\r\n)?[ \t])*)|(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?
:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?
[ \t]))*"(?:(?:\r\n)?[ \t])*)*:(?:(?:\r\n)?[ \t])*(?:(?:(?:[^()<>@,;:\\".\[\] 
\000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|
\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>
@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"
(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t]
)*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\
".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?
:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[
\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*|(?:[^()<>@,;:\\".\[\] \000-
\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(
?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)*\<(?:(?:\r\n)?[ \t])*(?:@(?:[^()<>@,;
:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([
^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\"
.\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\
]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*(?:,@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\
[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\
r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] 
\000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]
|\\.)*\](?:(?:\r\n)?[ \t])*))*)*:(?:(?:\r\n)?[ \t])*)?(?:[^()<>@,;:\\".\[\] \0
00-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\
.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,
;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?
:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*
(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".
\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[
^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]
]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*\>(?:(?:\r\n)?[ \t])*)(?:,\s*(
?:(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\
".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(
?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[
\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t
])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t
])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?
:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|
\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*|(?:
[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\
]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)*\<(?:(?:\r\n)
?[ \t])*(?:@(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["
()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)
?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>
@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*(?:,@(?:(?:\r\n)?[
 \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,
;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t]
)*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\
".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*)*:(?:(?:\r\n)?[ \t])*)?
(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".
\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:
\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\[
"()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])
*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])
+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\
.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z
|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*\>(?:(
?:\r\n)?[ \t])*))*)?;\s*)
```


## 趣事一则

[ELIZA](https://en.wikipedia.org/wiki/ELIZA) 是人类史上第一个 “聊天机器人” 程序，上个世纪六十年代，1966 年实现的。核心就是使用正则表达式匹配对方语句中的关键词汇，再经过替换，形成看似有意义的 “回应” —— 事实上，ELIZA 完全不知道自己在说什么……

几年后，就是七十年代初，1972 年，另外一个聊天机器人 [Parry](https://en.wikipedia.org/wiki/PARRY) <a href='#fn5' name='fn5b'><sup>[5]</sup></a>被写了出来…… 随后第二年，这两个聊天机器人在 ARPANET “碰面” 好地聊了一下<a href='#fn6' name='fn6b'><sup>[6]</sup></a>：

> ELIZA: Good Evening. Tell me your problems. Please terminate input with a period or a question mark.
>
> PARRY: People get on my nerves sometimes.
>
> ELIZA: I am not sure I understand you fully.
>
> PARRY: You should pay more attention.
>
> ELIZA: Suppose you should pay more attention.
>
> PARRY: You're entitled to your own opinion.
>
> ELIZA: What makes you think I am entitled to my own opinion?
>
> PARRY: It bothers me just to be around people in general.
>
> ELIZA: Please go on.
>
> PARRY: I went to the track at Bay Meadows a while back.
>
> ELIZA: What does that suggest to you?
> 
> PARRY: I went to the races.
>
> ......

以下是后人用 Python 写过、这里改写成 Javascript 的 ELIZA 程序代码。你可以在 Node.js 里运行它（需要交互时用 `readline`），尝试一下与 ELIZA 聊聊天：


```javascript
// eliza.js
//----------------------------------------------------------------------
//  a cheezy little Eliza knock-off by Joe Strout
//  with some updates by Jeff Epler
//  hacked into a module and updated by Jez Higgins
//  ported to Javascript for this chapter
//----------------------------------------------------------------------

import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

class Eliza {
  constructor() {
    // Python 的 re.match 从字符串开头匹配；这里在编译时加上 ^
    this.keys = gPats.map(([pattern]) => new RegExp('^' + pattern, 'i'));
    this.values = gPats.map(([, responses]) => responses);
  }

  //----------------------------------------------------------------------
  // translate: take a string, replace any words found in dict keys
  //  with the corresponding dict values
  //----------------------------------------------------------------------
  translate(text, dict) {
    const words = text.toLowerCase().split(/\s+/);
    for (let i = 0; i < words.length; i++) {
      if (Object.hasOwn(dict, words[i])) {
        words[i] = dict[words[i]];
      }
    }
    return words.join(' ');
  }

  //----------------------------------------------------------------------
  //  respond: take a string, a set of regexps, and a corresponding
  //    set of response lists; find a match, and return a randomly
  //    chosen response from the corresponding list.
  //----------------------------------------------------------------------
  respond(text) {
    for (let i = 0; i < this.keys.length; i++) {
      const match = text.match(this.keys[i]);
      if (match) {
        let resp = this.values[i][Math.floor(Math.random() * this.values[i].length)];
        let pos = resp.indexOf('%');
        while (pos > -1) {
          const num = Number(resp[pos + 1]);
          resp =
            resp.slice(0, pos) +
            this.translate(match[num] ?? '', gReflections) +
            resp.slice(pos + 2);
          pos = resp.indexOf('%');
        }
        if (resp.endsWith('?.')) resp = resp.slice(0, -2) + '.';
        if (resp.endsWith('??')) resp = resp.slice(0, -2) + '?';
        return resp;
      }
    }
    return '';
  }
}

//----------------------------------------------------------------------
// gReflections, a translation table used to convert things you say
//    into things the computer says back, e.g. "I am" --> "you are"
//----------------------------------------------------------------------
const gReflections = {
  am: 'are',
  was: 'were',
  i: 'you',
  "i'd": 'you would',
  "i've": 'you have',
  "i'll": 'you will',
  my: 'your',
  are: 'am',
  "you've": 'I have',
  "you'll": 'I will',
  your: 'my',
  yours: 'mine',
  you: 'me',
  me: 'you',
};

//----------------------------------------------------------------------
// gPats, the main response table.  Each element of the list is a
//  two-element list; the first is a regexp source string, and the second
//  is a list of possible responses, with group-macros labelled as
//  %1, %2, etc.
//----------------------------------------------------------------------
const gPats = [
  ['I need (.*)',
  ['Why do you need %1?',
    'Would it really help you to get %1?',
    'Are you sure you need %1?']],

  ["Why don\\'?t you ([^\\?]*)\\??",
  ['Do you really think I don\'t %1?',
    'Perhaps eventually I will %1.',
    'Do you really want me to %1?']],

  ["Why can\\'?t I ([^\\?]*)\\??",
  ['Do you think you should be able to %1?',
    'If you could %1, what would you do?',
    'I don\'t know -- why can\'t you %1?',
    'Have you really tried?']],

  ["I can\\'?t (.*)",
  ['How do you know you can\'t %1?',
    'Perhaps you could %1 if you tried.',
    'What would it take for you to %1?']],

  ['I am (.*)',
  ['Did you come to me because you are %1?',
    'How long have you been %1?',
    'How do you feel about being %1?']],

  ["I\\'?m (.*)",
  ['How does being %1 make you feel?',
    'Do you enjoy being %1?',
    'Why do you tell me you\'re %1?',
    'Why do you think you\'re %1?']],

  ['Are you ([^\\?]*)\\??',
  ['Why does it matter whether I am %1?',
    'Would you prefer it if I were not %1?',
    'Perhaps you believe I am %1.',
    'I may be %1 -- what do you think?']],

  ['What (.*)',
  ['Why do you ask?',
    'How would an answer to that help you?',
    'What do you think?']],

  ['How (.*)',
  ['How do you suppose?',
    'Perhaps you can answer your own question.',
    'What is it you\'re really asking?']],

  ['Because (.*)',
  ['Is that the real reason?',
    'What other reasons come to mind?',
    'Does that reason apply to anything else?',
    'If %1, what else must be true?']],

  ['(.*) sorry (.*)',
  ['There are many times when no apology is needed.',
    'What feelings do you have when you apologize?']],

  ['Hello(.*)',
  ['Hello... I\'m glad you could drop by today.',
    'Hi there... how are you today?',
    'Hello, how are you feeling today?']],

  ['I think (.*)',
  ['Do you doubt %1?',
    'Do you really think so?',
    'But you\'re not sure %1?']],

  ['(.*) friend (.*)',
  ['Tell me more about your friends.',
    'When you think of a friend, what comes to mind?',
    'Why don\'t you tell me about a childhood friend?']],

  ['Yes',
  ['You seem quite sure.',
    'OK, but can you elaborate a bit?']],

  ['(.*) computer(.*)',
  ['Are you really talking about me?',
    'Does it seem strange to talk to a computer?',
    'How do computers make you feel?',
    'Do you feel threatened by computers?']],

  ['Is it (.*)',
  ['Do you think it is %1?',
    'Perhaps it\'s %1 -- what do you think?',
    'If it were %1, what would you do?',
    'It could well be that %1.']],

  ['It is (.*)',
  ['You seem very certain.',
    'If I told you that it probably isn\'t %1, what would you feel?']],

  ['Can you ([^\\?]*)\\??',
  ['What makes you think I can\'t %1?',
    'If I could %1, then what?',
    'Why do you ask if I can %1?']],

  ['Can I ([^\\?]*)\\??',
  ['Perhaps you don\'t want to %1.',
    'Do you want to be able to %1?',
    'If you could %1, would you?']],

  ['You are (.*)',
  ['Why do you think I am %1?',
    'Does it please you to think that I\'m %1?',
    'Perhaps you would like me to be %1.',
    'Perhaps you\'re really talking about yourself?']],

  ["You\\'?re (.*)",
  ['Why do you say I am %1?',
    'Why do you think I am %1?',
    'Are we talking about you, or me?']],

  ["I don\\'?t (.*)",
  ['Don\'t you really %1?',
    'Why don\'t you %1?',
    'Do you want to %1?']],

  ['I feel (.*)',
  ['Good, tell me more about these feelings.',
    'Do you often feel %1?',
    'When do you usually feel %1?',
    'When you feel %1, what do you do?']],

  ['I have (.*)',
  ['Why do you tell me that you\'ve %1?',
    'Have you really %1?',
    'Now that you have %1, what will you do next?']],

  ['I would (.*)',
  ['Could you explain why you would %1?',
    'Why would you %1?',
    'Who else knows that you would %1?']],

  ['Is there (.*)',
  ['Do you think there is %1?',
    'It\'s likely that there is %1.',
    'Would you like there to be %1?']],

  ['My (.*)',
  ['I see, your %1.',
    'Why do you say that your %1?',
    'When your %1, how do you feel?']],

  ['You (.*)',
  ['We should be discussing you, not me.',
    'Why do you say that about me?',
    'Why do you care whether I %1?']],

  ['Why (.*)',
  ['Why don\'t you tell me the reason why %1?',
    'Why do you think %1?']],

  ['I want (.*)',
  ['What would it mean to you if you got %1?',
    'Why do you want %1?',
    'What would you do if you got %1?',
    'If you got %1, then what would you do?']],

  ['(.*) mother(.*)',
  ['Tell me more about your mother.',
    'What was your relationship with your mother like?',
    'How do you feel about your mother?',
    'How does this relate to your feelings today?',
    'Good family relations are important.']],

  ['(.*) father(.*)',
  ['Tell me more about your father.',
    'How did your father make you feel?',
    'How do you feel about your father?',
    'Does your relationship with your father relate to your feelings today?',
    'Do you have trouble showing affection with your family?']],

  ['(.*) child(.*)',
  ['Did you have close friends as a child?',
    'What is your favorite childhood memory?',
    'Do you remember any dreams or nightmares from childhood?',
    'Did the other children sometimes tease you?',
    'How do you think your childhood experiences relate to your feelings today?']],

  ['(.*)\\?',
  ['Why do you ask that?',
    'Please consider whether you can answer your own question.',
    'Perhaps the answer lies within yourself?',
    'Why don\'t you tell me?']],

  ['quit',
  ['Thank you for talking with me.',
    'Good-bye.',
    'Thank you, that will be $150.  Have a good day!']],

  ['(.*)',
  ['Please tell me more.',
    'Let\'s change focus a bit... Tell me about your family.',
    'Can you elaborate on that?',
    'Why do you say that %1?',
    'I see.',
    'Very interesting.',
    '%1.',
    'I see.  And what does that tell you?',
    'How does that make you feel?',
    'How do you feel when you say that?']],
];

//----------------------------------------------------------------------
//  command_interface — Node.js readline 版
//----------------------------------------------------------------------
async function commandInterface() {
  console.log('Therapist\n---------');
  console.log('Talk to the program by typing in plain English, using normal upper-');
  console.log('and lower-case letters and punctuation.  Enter "quit" when done.');
  console.log('='.repeat(72));
  console.log('Hello.  How are you feeling today?');

  const rl = readline.createInterface({ input, output });
  const therapist = new Eliza();
  let s = '';

  while (s !== 'quit') {
    try {
      s = await rl.question('> ');
    } catch {
      s = 'quit';
    }
    console.log(s);
    while (s.length && '!.'.includes(s[s.length - 1])) {
      s = s.slice(0, -1);
    }
    console.log(therapist.respond(s));
  }

  rl.close();
}

// 非交互演示：直接喂几句，方便你在文档里先看效果
function demoSketch() {
  const therapist = new Eliza();
  const lines = [
    'I need a vacation',
    'I am sad',
    'My mother never understood me',
    'quit',
  ];
  console.log('Therapist\n---------');
  console.log('Hello.  How are you feeling today?');
  for (let s of lines) {
    console.log('> ' + s);
    while (s.length && '!.'.includes(s[s.length - 1])) {
      s = s.slice(0, -1);
    }
    console.log(therapist.respond(s));
  }
}

if (import.meta.main) {
  // 终端交互：node eliza.js
  // 若只想看非交互演示，可改成：demoSketch();
  await commandInterface();
}

export { Eliza, gPats, gReflections, commandInterface, demoSketch };
```

    Therapist
    ---------
    Talk to the program by typing in plain English, using normal upper-
    and lower-case letters and punctuation.  Enter "quit" when done.
    ========================================================================
    Hello.  How are you feeling today?


补充一句：Javascript 的正则迭代**不会**抛出类似 Python 的 `StopIteration`；`match` / `matchAll` 耗尽后就是 `null` 或迭代结束（`done: true`）。写循环时按返回值判断即可。

-----
**脚注**

<a name='fn1'>[1]</a>：释义摘自苹果电脑上系统内建的《牛津英汉双解辞典》

<a href='#fn1b'><small>↑Back to Content↑</small></a>
    
<a name='fn2'>[2]</a>：[8 Regular Expressions You Should Know](https://bit.ly/2tz8v9n) by Vasili

<a href='#fn2b'><small>↑Back to Content↑</small></a>

<a name='fn3'>[3]</a>：关于校验密码强度的正则表达式，往往需要设置更为复杂的规则，Stackoverflow 上的一则答复中有很好的示例：https://stackoverflow.com/a/21456918

<a href='#fn3b'><small>↑Back to Content↑</small></a>

<a name='fn4'>[4]</a>：http://www.ex-parrot.com/pdw/Mail-RFC822-Address.html

<a href='#fn4b'><small>↑Back to Content↑</small></a>

<a name='fn5'>[5]</a>：Parry 的源代码（用 Lisp 写的）在这里：http://www.cs.cmu.edu/afs/cs/project/ai-repository/ai/areas/classics/parry/</a>

<a href='#fn5b'><small>↑Back to Content↑</small></a>
    
<a name='fn6'>[6]</a>：ELIZA 和 Parry 的完整聊天记录在这里：https://tools.ietf.org/html/rfc439</a>

<a href='#fn6b'><small>↑Back to Content↑</small></a>
    

<a href="./Part.3.B.5.bnf-ebnf-pebnf.md" ><small>Next Page</small></a>
