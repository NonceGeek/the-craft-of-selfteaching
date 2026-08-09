# 值及其相应的运算

> 💡`00` 到 `Part.1.D` 部分请直接浏览本书的 Github 仓库： 
>
> https://github.com/selfteaching/the-craft-of-selfteaching/tree/master/markdown
>
> Part.1.E: [入口 | 自学是门手艺 JS 版本（1.E.1）](https://mp.weixin.qq.com/s/NaKxx2uolsrKJqIR2PTGqw)



> 推荐读者使用 `deno playground`，作为学习环境。关于 `deno playground` 的使用，见：
>
> [入口 | 自学是门手艺 JS 版本（1.E.1）](https://mp.weixin.qq.com/s/NaKxx2uolsrKJqIR2PTGqw)

从结构上来看，一切的计算机程序，都由且只由两个最基本的成分构成：

> * **运算**（Evaluation）
> * **流程控制**（Control Flow）

没有流程控制的是计算器而已；有流程控制的才是可编程设备。

看看之前我们见过的计算质数的程序：


```javascript
var is_prime = function(i){     // 定义 is_prime()，接收一个参数
    if(i < 2){                  // 开始使用接收到的那个参数（值）开始计算……
        return false;           // 不再是返回给人，而是返回给调用它的代码……
    }
    if(i == 2){
        return true;
    }
    for(var j= 2;j < Math.floor(i ** 0.5);j++){
        if(i % j == 0){
            return false;
        }         
    }
    return true
};

for(var i = 80;i <= 110;i++){
    if(is_prime(i)){           // 调用 is_prime() 函数，
        console.log(i)         // 如果返回值为 True，则向屏幕输出 i
    }
}
```

    83
    89
    97
    101
    103
    107
    109


`if...`，`for...` 在控制流程：在什么情况下运算什么，在什么情况下重复运算什么；

第 17 行 `is_prime()` 这个函数的调用，也是在控制流程 —— 所以我们可以**把函数看作是“子程序”**；

一旦这个函数被调用，流程就转向开始执行在第 1 行中定义的 `is_prime()` 函数内部的代码，而这段代码内部还是_计算_和_流程控制_，决定一个返回值 —— 返回值是布尔值；再回到第 17 行，将返回值交给 `if` 判断，决定是否执行第 18 行……

而计算机这种可编程设备之所以可以做流程控制，是因为它可以做**布林运算**，即，它可以_对布尔值_进行_操作_，而后将布尔值交给_分支_和_循环_语句，构成了程序中的流程控制。

## 值

从本质上看，程序里的绝大多数语句包含着**运算**（Evaluation），即，在对某个值进行**评价**。这里的“评价”，不是“判断某人某事的好坏”，而是“_计算出某个值究竟是什么_” —— 所以，我们用中文的“**运算**”翻译这个“_Evaluation_”可能表达得更准确一些。

在程序中，被运算的可分为**常量**（Literals）和**变量**（Variables）。

```javascript
a = 1 + 2 * 3
a += 1
console.log(a)
```

在以上代码中，

`1`、`2`、`3`，都是**常量**。_Literal_ 的意思是是“字面的”，顾名思义，常量的_值_就是它字面上的值。`1` 的值，就是`1`。

`a` 是**变量**。顾名思义，它的值将来是可变的。比如，在第 2 句中，这个变量的_值_发生了改变，之前是 `7`，之后变成了 `8`。

第 1 句中的 `+`、`*`，是**操作符**（Operators），它用来对其左右的值进行相应的_运算_而后得到一个值。先是由操作符 `*` 对 `2` 和 `3` 进行运算，
生成一个值，`6`；然后再由操作符 `+` 对 `1` 和 `6` 进行运算，生成一个值 `7`。先算乘除后算加减，这是操作符的**优先级**决定的。

`=` 是赋值符号，它的作用是将它右边的值保存到左边的变量中。


_值_是程序的基础成分（Building blocks），它就好像盖房子用的砖块一样，无论什么样的房子，到最后都主要是由砖块构成。

_常量_，当然有个_值_ —— 就是它们字面所表达的值。

_变量_必须先_赋值_才能使用，也就是说，要先把一个_值_保存到变量中，它才能在其后被运算。

在 Javascript 中，如果你在定义一个函数的时候没有设定返回值，它会返回 `undefined`，就是告诉你「返回值是一个未被定义的值」。


```javascript
var func = function(){} // 定义一个空函数
console.log(func()) // 输出 f() 这个函数被调用后的返回值, undefined
console.log(console.log(func())) // 这一行最外围的 print() 调用了一次 print(f())，所以输出一个 undefined，
                                 // 而后再输出这次调用的返回值，所以又输出一次 undefined
```

    undefined
    undefined
    undefined


当我们调用一个函数的时候，本质上来看，就相当于：

> 我们把一个值交给某个函数，请函数根据它内部的运算和流程控制对其进行操作而后返回另外一个值。

比如，`Math.abs()` 函数，就会返回传递给它的_值_的*绝对值*；`Math.floor()` 函数，会将传递给它的值的小数部分砍掉。

需要注意的一点是，Javascript 不像 Python 一样，存在整型（Integer）和浮点型的区分（Float），二者都是 Number 类型。


```javascript
console.log(Math.abs(-3.14159))
console.log(Math.floor(Math.abs(-3.14159)))

console.log(typeof(Math.abs(-3.14159)))
console.log(typeof(Math.floor(Math.abs(-3.14159))))
```

    3.14159
    3
    number
    number


## 值的类型

在编程语言中，总是包含最基本的三种数据类型：

> * 布尔值（Boolean Value)
> * 数字（Numbers）：包括整数（Int）、浮点数（Float）、复数（Complex Numbers）
> * 字符串（Strings）

对于 Javascript 而言，整数和浮点数统一为 Number 类型，复数类则是要单独实现的。

同时，Javascript 中还报考其它三种基本类型：Undifined（未定义）、Null（空）、Symbol（ES6 专属）。不过这三种属性，初学时暂时不用考虑。

既然有不同类型的数据，它们就分别对应着不同类型的值。



运算的一个默认法则就是，通常情况下应该是_相同类型的值才能相互运算_。

对于 Javascript 而言，布尔值、数字和字符串在运算过程中，会进行 **隐式转换** 。转换规则有两条：

- 字符串和任何其它类型相加，其它类型自动转换为字符串；
- 字符串和任何其它类型进行加法以外的运算，返回 NaN (Not a Number）；
- 布尔值和数字，布尔值和布尔值进行计算，true 自动转换为 1，false 自动转换为 0。


```javascript
console.log((11 + 10 - 9 * 8 / 6 % 5 ))  // 数字与数字的运算
console.log(true + false) // 布尔 + 布尔
console.log("aa" + "bb") // 字符串 + 字符串

//隐式转换
console.log("aa" + true + 1) //字符串 + 其他类型
console.log("aa" - true - 1) //字符串 - 其他类型
console.log(true / 5) //布尔 / 数字
```

    19
    1
    aabb
    aatrue1
    NaN
    0.2


有个函数，`typeof()` ，可以用来查看某个值属于什么类型：


```javascript
console.log(typeof(3))
console.log(typeof(3.0))
console.log(typeof('3.14'))
console.log(typeof(true))
console.log(typeof([1,2,3]))
console.log(typeof((1,2,3)))
console.log(typeof({'a':1, 'b':2, 'c':3}))
```

    number
    number
    string
    boolean
    object
    number
    object


## 操作符

针对不同类型的数据，有各自专用的**操作符**。

### 数值操作符

针对数字进行计算的操作符有加减乘除余幂：`+`、`-`、`*`、`/`、`%`、`**`。

其中 `+` 和 `-` 可以对单个值进行操作，`-3`；其它的操作符需要有两个值才能操作。

从优先级来看，这些操作符中：

> * 对两个值进行操作的 `+`、`-` 的优先级最低；
> * 而后是 `*`、`/`、`%`；
> * 而后是对单个值进行操作的 `+`、`-`；
> * 而后是 `**`。

完整的操作符优先级列表，参见官方文档：

> https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence



### 布尔值操作符

针对与布尔值，操作符有 `&&`(and)、`||`(or)、`!`(not)。

它们之中，优先级最低的是 `||`，然后是 `&&`, 优先级最高的是 `!`：


```javascript
true && false || !true
```




    false



最先操作的是 `!`，因为它优先级最高。所以，上面的表达式相当于 `true && false || (! True)`， 即相当于 `true && false || false`；

然后是 `and`，所以，`true && false || false` 相当于是 `(true && false) || false`，即相当于 `false || false`；

于是，最终的值是 `false`。

### 逻辑操作符

数值之间还可以使用逻辑操作符，`1 > 2` 返回布尔值 `False`。逻辑操作符有：`<`（小于）、`<=`（小于等于）、`>`（大于）、`>=`（大于等于）、`!=`（不等于）、`==`（等于）。

逻辑操作符的优先级，高于布尔值的操作符，低于数值计算的操作符。


```javascript
n = -95
n < 0 && (n + 1) % 2 == 0
```




    true



### 字符串操作符

针对字符串，有三种操作：

> * 拼接：`+` 和 `' '`（后者是空格）
> * 逻辑运算：`<`、`<=`、`>`、`>=`、`!=`、`==` 
> * 查询一个字符串（str_a）是否在另一个字符串（str_b）中，可使用函数 `str_a.indexOf(str_b)`


```javascript
console.log('Awesome' + 'Javascript')
console.log('Awesome' == 'Awesome')
console.log('Awesome' != "Python")
```

    AwesomeJavascript
    true
    true


字符之间，字符串之间，除了 `==` 和 `!=` 之外，也都可以被逻辑操作符 `<`、`<=`、`>`、`>=` 运算：


```javascript
'a' < 'b'
```


    true

这是因为字符对应着 Unicode 码，字符在被比较的时候，被比较的是对应的 ascii 码。


```javascript
console.log('A' > 'a')
console.log('A'.charCodeAt())
console.log('a'.charCodeAt())
```

    false
    65
    97


当字符串被比较的时候，将从两个字符串各自的第一个字符开始逐个比较，“一旦决出胜负马上停止”：


```javascript
'JavscripT' > 'Javascript 2.0'
```


    true



### 列表的操作符

数字和字符串（由字符构成的序列）是最基本的数据类型，而我们往往需要批量处理数字和字符串，这样的时候，我们需要**数组**（Array）。不过，在 Python 语言中，它提供了一个**容器**（Container）的概念，用来容纳批量的数据。

Python 的容器有很多种 —— 字符串，其实也是容器的一种，它的里面容纳着批量的字符。

我们先简单接触一下另外一种容器，数组（Array）—— 在 Python 中其被称之为列表（List）。

数组的标示，用方括号 `[]`；举例来说，`[1, 2, 3, 4, 5]` 和 `['ann', 'bob', 'cindy', 'dude', 'eric']`，或者 `['a', 2, 'b', 32, 22, 12]` 都是一个数组。

因为数组和字符串一样，都是_有序容器_（容器还有另外一种是无序容器），所以，它们可用的操作类似，但是操作符不同。

> * 拼接：array_a.concat(array_b)
> * 逻辑运算： `<`、`<=`、`>`、`>=`、`!=`、`==` 
> * 检查值是否在数组中：array_a.includes(element)

两个列表在比较时（前提是两个列表中的数据元素类型相同），遵循的还是跟字符串比较相同的规则：“一旦决出胜负马上停止”。但，实际上，由于列表中可以包含不同类型的元素，所以，通常情况下没有实际需求对他们进行“大于、小于”的比较。（比较时，用不同类型进行比较是危险的，因为可能出现意料之外的结果。）


```javascript
array_a = [1, 2, 3, 4, 5]
array_b = [1, 2, 3, 5]
array_c = ['ann', 'bob', 'cindy', 'dude', 'eric']
console.log(array_a > array_b)
console.log(array_a.includes(10))
console.log(array_c.includes('ann'))
```

    false
    false
    true


## 更复杂的运算

对于数字进行加、减、乘、除、商、余、幂的操作，对于字符串进行拼接、拷贝、属于的操作，对布尔值进行或、与、非的操作，这些都是相对简单的运算。

更为复杂一点的，我们要通过调用函数来完成 —— 因为在函数内部，我们可以用比“单个表达式”更为复杂的程序针对传递进来的参数进行运算。换言之，函数就相当于各种事先写好的子程序，给它传递一个值，它会对其进行运算，而后返回一个值（最起码返回一个`undefined`）。

以下是链接包括了 Javascript 语言所有的内建函数（Built-in Functions：

* 英文版：https://www.tutorialspoint.com/javascript/javascript_builtin_functions.htm

* 中文版：http://wiki.jikexueyuan.com/project/javascript/function.html

现在倒不用着急一下子全部了解它们 —— 反正早晚都会的。

这其中，针对数字，有计算绝对值的函数 `Math.abs()`，有计算指数的函数 `Math.exp()` 等等。


```javascript
console.log(Math.abs(-3.1415926))
console.log(Math.exp(11))
```

    3.1415926
    59874.14171519782


其中，有些方法都会有一个前缀，例如`Math.exp(11)`，Math 便是前缀。
这是因为 Math 是一个“对象(Object)”。我们需要先指明对象，再指明方法，就像要找到某间屋子，得先找到屋子在哪栋楼一样：


```javascript
Math.sin(5)
```


    -0.9589242746631385



代码 `Math.sin(5)` 这里的 `.`，也可以被理解为“操作符”，它的作用是：

> 从某个对象中调用函数。

代码 `Math.sin(5)` 的作用是：

> 把 `5` 这个值，传递给 `Math` 这个对象里的 `sin()` 函数，让 `sin()` 根据它内部的代码对这个值进行运算，而后返回一个值（即，计算结果）。

可能你暂时不理解对象（Object）是什么。但是目前可以这样想 —— 它们是「保存在其他文件中的一段代码」。于是，那段代码内部定义的函数，可以被你的程序所调用。

比如，任意一串字符串，其实是一个对象。所以我们可以调用关于这个对象的函数，比如`str_a.slice(x, y)`，它将会从 str_a 的第 x 个字符开始，切割到第 y 个字符：


```javascript
"apple pen".slice(0,5)
```


    'apple'



## 关于布尔值的补充

当你看到以下这样的表达式，而后再看看它的结果，你可能会多少有点迷惑：


```javascript
if('Javascript'){true;}else{false;}
```


    true



这是因为 Javascript 存在隐式转换，事实上，此句相当于`if(new Boolean('Javascript'){true;}else{false;}`

根据 [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) 的表述，我们可以这样理解：

> 每个变量或者常量，除了它们的值之外，同时还相当于有一个对应的布尔值。

"If the value is omitted or is 0, -0, null, false, NaN, undefined, or the empty string (""), the object has an initial value of false"

意即，0, -0, null, false, NaN, undefined 与 "" 这几种类型对应的布尔值是 false，其它情况下皆为 true：


```javascript
console.log(new Boolean(0))
console.log(new Boolean(-0))
console.log(new Boolean(null))
console.log(new Boolean(false))
console.log(new Boolean(NaN))
console.log(new Boolean(undefined))
console.log(new Boolean(""))
// above is all the false
// above is all the true
console.log(new Boolean(12345))
console.log(new Boolean("Javascript"))
console.log(new Boolean(new Array()))
```

    [Boolean: false]
    [Boolean: false]
    [Boolean: false]
    [Boolean: false]
    [Boolean: false]
    [Boolean: false]
    [Boolean: false]
    [Boolean: true]
    [Boolean: true]
    [Boolean: true]


## 关于值的类型的补充

除了数字、布尔值、字符串，以及上一小节介绍的数组之外，Javascript 还有一个重要的类型，就是字典（Dictionary）。（事实上，根据 [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures) ，字典和数组同属于 Object，但为了逻辑清晰，此处还是叫它们数组与字典。）

数组和字典是数字、布尔值、字符串等数据类型组合起来的数据 —— 现实生活中，更多需要的是把基础类型组合起来构成的数据。比如，一个通讯部，里面是一系列字符串分别对应着若干字符串和数字。

``` javascript
obj_a = {
    'first_name': 'Michael',
    'last_name': 'Willington',
    'birth_day': '12/07/1992',
    'mobile': [
        '714612234', 
        '716253923'
    ],
    'id': 3662,
    ...
}
```

针对不同的类型，都有相对应的操作符，可以对其进行运算。

这些类型之间有时也有不得相互运算的需求，于是，在相互运算之前同样要 _Type Casting_，比如将 Int 转换为 String，或者反之：


```javascript
a = 1
b = String(a) + 1
c = parseInt(b) - 1
console.log(a)
console.log(b)
console.log(c)
```

    1
    11
    10


## 总结

回到最开始：从结构上来看，一切的计算机程序，都由且只由两个最基本的成分构成：

> * **运算**（Evaluation）
> * **流程控制**（Control Flow）

这一章主要介绍了基础数据类型的运算细节。而除了基础数据类型，我们需要由它们组合起来的更多复杂数据类型。但，无论数据的类型是什么，被操作符操作的总是该数据的**值**。所以，虽然绝大多数编程书籍按照惯例会讲解“数据类型”，但，为了究其本质，我们在这里关注的是“值的类型”。虽然只是关注焦点上的一点点转换，但，实践证明，这一点点的不同，对初学者更清楚地把握知识点有巨大的帮助。

针对每一种_值_的类型，无论简单复杂，都有相应的操作方式：

> * **操作符**
>   * 值运算
>   * 逻辑运算
> *  **函数**
>   * 内建函数
>   * 其他模块里的函数
>   * 其本身所属类之中所定义的函数

所以，接下来要学习的，无非就是熟悉各种_数据类型_，及其相应的操作，包括能对它们的_值_进行操作的操作符和函数；无论是操作符还是函数，最终都会返回一个相应的**值**，及其相应的*布尔值* —— 这么看来，编程知识结构没多复杂。因为换句话讲，

> 接下来你要学习的无非是各种_数据类型_的_运算_而已。

另外，虽然现在尚未来得及对**函数**进行深入讲解，但最终你会发现它跟操作符一样，在程序里无所不在。

> 🤔思考题：在 `Deno` 中实现一个`GET API`，实现这样的功能，在参数中传入一个变量 x，判断其是否为数字类型，如果是，返回其平方，否则返回提示信息。 
