# BNF 以及 EBNF

通常情况下，你很少会在入门书籍里读到关于 Backus-Naur Form（BNF，巴科斯-诺尔范式）和 Extended Backus-Naur Form（EBNF）的话题 —— 它们都被普遍认为是 “非专业人士无需了解的话题”，隐含的另外一层含义是 “反正就算给他们讲他们也无论如何看不懂”……

然而，在我眼里，这事非讲不可 —— 这是这本 “书” 的设计目标决定的。

严格意义上来讲，在《自学是门手艺》中，以自学编程为例，我完全没必要自己动手耗时费力写那么多东西 —— 如果仅仅是为了让读者 “入门” 的话。编程入门书籍，或者 Javascript 编程入门书籍，都已经太多太多了，其中质量过硬的书籍也多得去了 —— 并且，如果你没有英文阅读障碍，那你就会发现网上有太多非常优质的免费教程…… 真的轮不到李笑来同学再写一次。

我写这本书的目标是：

> 让读者从认知自学能力开始，通过自学编程作为第一个实践，逐步完整掌握自学能力，进而在随后漫长的人生中，需要什么就去学什么，

…… 不用非得找人教、找人带 —— 只有这样，**前途**这两个字才会变得实在。

于是，我最希望能做到的是，从这里了解了自学方法论，也了解了编程以及 Javascript 编程的基础概念之后，《自学是门手艺》的读者能够**自顾自地踏上征程，一路走下去** —— 至于走到哪里，能走到哪里，不是我一个作者一厢情愿能够决定的，是吧？

当然，会自学的人运气一定不会差。

于是，这本 “书” 的核心目标之一，换个说法就是：

> 我希望读者在读完《自学是门手艺》之后，有能力独立地去全面研读[官方文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript) —— 甚至是各种编程语言、各种软件的相关的文档（包括它们的官方文档）。对 Javascript 来说，那常常是 MDN，以及更底层的 [ECMAScript 语言规范](https://tc39.es/ecma262/)。

自学编程，很像独自一人冲入了一个丛林，里面什么动物都有…… 并且那个丛林很大很大，虽然丛林里有的地方很美，可若是没有地图和指南针，你就会迷失方向。

其实吧，地图也不是没有 —— 别说 Javascript 了，无论什么编程语言（包括无论什么软件）都有很翔实的官方文档…… 可是吧，绝大多数人无论买多少书、上多少课，就是不去用官方 “地图”，就不！

—— 其实倒不是说 “第三方地图” 更好，实际的原因很不好意思说出来：

> * 这首先吧，觉得官方文档阅读量太大了……（嗯？那地图不是越详细越好吗？）
> * 那还有吧…… 也不是没去看过，**看不懂**……（嗯…… 这对初学者倒是个问题！）

所以，我认为这本 “书” 的最重要工作是：

> 为读者解读清楚地图上的 “图例”，从此之后读者在任何需要的时候能够彻底读懂地图。

在阅读官方文档的时候，很多人在 [MDN 的 Javascript 指南 / 教程](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide) 上就已经觉得吃力了…… 如果到了 [标准内建对象一览](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects) 和 [ECMAScript Language Specification](https://tc39.es/ecma262/) 的部分，就基本上完全放弃了。比如，以下这段摘自规范里对数字字面量一类语法的描述风格（不同文档的记号略有出入，但读法相通）：

> Lexical Grammar / Numeric Literals（示意）
```
DecimalIntegerLiteral ::
    0
    NonZeroDigit DecimalDigits_opt
Sign ::
    +
    -
```

又或者，你在别处看到更接近 EBNF 的写法：

```
format_spec     ::=  [[fill]align][sign][#][0][width][grouping_option][.precision][type]
fill            ::=  <any character>
align           ::=  "<" | ">" | "=" | "^"
sign            ::=  "+" | "-" | " "
width           ::=  digit+
grouping_option ::=  "_" | ","
precision       ::=  digit+
type            ::=  "b" | "c" | "d" | "e" | "E" | "f" | "F" | "g" | "G" |
                     "n" | "o" | "s" | "x" | "X" | "%"
```

读到这，看着一大堆的 `::=` `[]` `|` 当场傻眼了……

这是 BNF 描述，或某种定制的 EBNF…… 为了理解它们，以后当然最好有空研究一下 “上下文无关文法”（[Context-free Grammar](https://en.wikipedia.org/wiki/Context-free_grammar)），没准未来你一高兴就会去玩一般人不敢玩的各种 Parser，甚至干脆自己写门编程语言啥的…… 不过，完全可以跳过那些复杂的东西的 —— 因为你当前的目标只不过是 “能够读懂那些符号的含义”。

其实吧，真的不难的 —— 它就是语法描述的方法。

比如，什么是符合语法的整数（Integer）呢？符合以下语法描述的是整数（使用一种常见的 EBNF 写法）：

```
integer ::= [sign] digit +
sign    ::= "+" | "-"
digit   ::=  "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
```

以上的描述中，基本符号没几个，它们各自的含义是：

> * `::=` 表示定义；
> * `< >` 尖括号里的内容表示必选内容；
> * `[ ]` 中是可选项；
> * `" "` 双引号里的内容表示字符；
> * ` | ` 竖线两边的是可选内容，相当于 or；
> * ` * ` 表示零个或者多个……
> * ` + ` 表示一个或者多个……

于是：

> 1. `integer` 定义是：由 “可选的 `sign`” 和 “一个或者多个 `digit` 的集合” 构成 —— 第一行末尾那个 `+` 的作用和正则表达式里的 `+` 一样；
> 2. `sign` 的定义是什么呢？要么是 `+` 要么是 `-`；
> 3. `digit` 的定义是什么呢？从 `"0"` 到 `"9"` 中的任何一个值……

于是，`99`、`+99`、`-99`，都是符合以上语法描述的 `integer`；但 `99+` 和 `99-` 肯定不符合以上语法描述的 `integer`。

很简单吧？反正就是在 `::=` 左边逐行列出一个语法构成的所有要素，而后在右边逐行逐一定义，直至全部要素定义完毕。

也许那些在此之前已经熟悉 BNF 范式的人会有点惊讶，“你怎么连 ‘*终结符*’ 和 ‘*非终结符*’ 这种最基本的概念都跳过了？” —— 是呀，即便不讲那俩概念也能把这事讲清楚到 “能马上开始用” 了的地步…… 这就是我经常说的，“人类有这个神奇的本领，擅长使用自己并不懂的东西……”

许多语言文档对 BNF 的拓展，借鉴了正则表达式<a href='#fn1' name='fn1b'><sup>[1]</sup></a> —— 从最后两个符号的使用（`*` `+`）你可以看得出来。顺带说，这也是为什么这本 “书” 里非要讲其他入门书籍里不讲的正则表达式的原因之一。

又由于规范文档长期演进，不同材料的标注方法并不完全一致。ECMAScript 规范常用一种略有不同的记号（例如用 `::`、下标 `_opt` 表示可选）。而社区里讲解文法时，你也常看到更 “教科书式” 的 EBNF。不必慌：符号体系换了皮，读法还是那几条。

下面摘一点 [ECMAScript® 2024 Language Specification](https://tc39.es/ecma262/) 风格的示意（不是全文；完整文法以规范为准），让你混个眼熟：

```
PrimaryExpression :
    this
    IdentifierReference
    Literal
    ArrayLiteral
    ObjectLiteral
    FunctionExpression
    ClassExpression
    GeneratorExpression
    AsyncFunctionExpression
    AsyncGeneratorExpression
    RegularExpressionLiteral
    TemplateLiteral
    CoverParenthesizedExpressionAndArrowParameterList

Literal :
    NullLiteral
    BooleanLiteral
    NumericLiteral
    StringLiteral

BooleanLiteral :
    true
    false

NullLiteral :
    null
```

你也会在别处看到更接近 “冒号定义 + 单引号终结符” 的写法，例如：

```
IfStatement :
    'if' '(' Expression ')' Statement
    'if' '(' Expression ')' Statement 'else' Statement

WhileStatement :
    'while' '(' Expression ')' Statement

FunctionDeclaration :
    'function' BindingIdentifier '(' FormalParameters ')' '{' FunctionBody '}'
```

读法仍然是：

> * `:` / `::` / `::=` 表示定义；
> * `[ ]` 或 `_opt` 一类记号表示可选项；
> * `' '` / `" "` 引号里的内容表示字面字符/关键字；
> * `|` 表示 “或者”；
> * `*` / `+` 表示重复次数……

现在你已经能读懂 BNF 了，那么，可以再读读用 BNF 描述的 Regex 语法<a href='#fn2' name='fn2b'><sup>[2]</sup></a>，就当复习了 —— 很短的：

```html
BNF grammar for Perl-style regular expressions

<RE>             ::=  <union> | <simple-RE>
<union>          ::=  <RE> "|" <simple-RE>
<simple-RE>      ::=  <concatenation> | <basic-RE>
<concatenation>  ::=  <simple-RE> <basic-RE>
<basic-RE>       ::=  <star> | <plus> | <elementary-RE>
<star>           ::=  <elementary-RE> "*"
<plus>           ::=  <elementary-RE> "+"
<elementary-RE>  ::=  <group> | <any> | <eos> | <char> | <set>
<group>          ::=  "(" <RE> ")"
<any>            ::=  "."
<eos>            ::=  "$"
<char>           ::=  any non metacharacter | "\" metacharacter
<set>            ::=  <positive-set> | <negative-set>
<positive-set>   ::=  "[" <set-items> "]"
<negative-set>   ::=  "[^" <set-items> "]"
<set-items>      ::=  <set-item> | <set-item> <set-items>
<set-item>       ::=  <range> | <char>
<range>          ::=  <char> "-" <char>
```

真的没原来以为得那么神秘，是不？<a href='#fn3' name='fn3b'><sup>[3]</sup></a>

都学到这儿了…… 顺带再自学个东西吧。

这个东西叫 `glob`，是 Global 的缩写。你可以把它理解为 “超级简化版正则表达式” —— 它最初是 Unix/Posix 操作系统中用来匹配文件名的 “通配符”。

先看一张 1971 的 Unix 操作系统中关于 glob 的截图：
![](../images/Unix_Glob_Reference.png)
> A screenshot of the original 1971 Unix reference page for glob – note the owner is dmr, short for Dennis Ritchie.

glob 的主要符号只有这么几个：

> * `*`
> * `?`
> * `[abc]`
> * `[^abc]`

现在的你，打开 Wikipedia 上的关于 glob 和 Wildcard character 的页面，肯定能做到 “无障碍” 理解：

> * https://en.wikipedia.org/wiki/Glob_(programming)
> * https://en.wikipedia.org/wiki/Wildcard_character

在 Node.js 里，你也会在文件匹配相关的工具里反复遇到它（例如 `fs` 生态、各种打包器与测试工具的 include/exclude 规则）。Deno 等运行时同样常见。

顺带说，现在你再去读 MDN 上关于模板字符串、或规范里关于 Literal / Expression 的章节，就不会再觉得 “根本看不懂” 了，恰恰相反，你会觉得 “我怎么之前连这个都看不懂呢？”

> * [MDN — 模板字符串](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Template_literals)
> * [ECMAScript® Language Specification](https://tc39.es/ecma262/)
> * [MDN — Javascript 语法总览入口](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference)

在自学这件事上，失败者的死法看起来千变万化，但其实都是一样的…… 只不过是因为怕麻烦或者基础知识不够而不去读最重要的文档。

比如，学英语的时候死活不读语法书。其实英文语法书也没多难啊？再厚，不也是用来 “查” 的吗？不就是多记几个标记就可以读懂的吗？比如，词性标记，`v.`, `n.`, `adj.`, `adv.`, `prep.`... 不就是相当于地图上的图例吗？那语法书，和现在这里提到的官方文档，不都是 “自学者地图” 吗？

但就是这么一点点简单的东西，挡住了几乎所有人，真是可怕。

-----
**脚注**

<a name='fn1'>[1]</a>：可读 [ECMAScript Spec — Notational Conventions](https://tc39.es/ecma262/#sec-notational-conventions)，对照理解规范如何用语法记号描述语言；MDN 则更偏 “给人查着用”。

<a href='#fn1b'><small>↑Back to Content↑</small></a>

<a name='fn2'>[2]</a>：[Perl Style Regular Expressions in Prolog](http://www.cs.sfu.ca/~cameron/Teaching/384/99-3/regexp-plg.html) CMPT 384 Lecture Notes
Robert D. Cameron November 29 - December 1, 1999

<a href='#fn2b'><small>↑Back to Content↑</small></a>

<a name='fn3'>[3]</a>：很少有人注意到：在很多编程语言的文法文档中，`"$"` 被称为 `<eos>` —— 2017 年 5 月我投资了一个初创公司，听说他们的资产名称叫做 `eos`…… 我当场就被这个梗逗乐了。

<a href='#fn3b'><small>↑Back to Content↑</small></a>


<a href="./Part.3.C.breaking-good-and-bad.md" ><small>Next Page</small></a>
