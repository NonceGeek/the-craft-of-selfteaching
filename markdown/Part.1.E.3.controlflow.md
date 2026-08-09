# 流程控制

查看前文：

> [#学前端](https://mp.weixin.qq.com/mp/appmsgalbum?action=getalbum&__biz=MzI0NTM0MzE5Mw==&scene=1&album_id=3953635132766044162&count=3#wechat_redirect)

在相对深入了解了值的基本操作之后，我们需要再返回来对流程控制做更深入的了解。

之前我们看过这个寻找质数的程序：

```javascript
loop: for (var i=2;i < 100;i++){
        if(i == 2){
            console.log(2)
            continue;
        }
        for(var j= 2;j < i;j++){
            if(i % j == 0){
                continue loop;
            }         
        }
        console.log(i)        
}
```

这其中，包含了_分支_与_循环_ —— 无论多复杂的流程控制用这两个东西就够了，就好像无论多复杂的电路最终都是由通路和开路仅仅两个状态构成的一样。

> 今天的人们觉得这是“天经地义”的事情，可实际上并非如此。这是 1966 年的一篇论文所带来的巨大改变 —— *Communications of the ACM* by Böhm and Jacopini (1966)。实际上，直到上个世纪末，`GOTO` 语句才从各种语言里近乎“灭绝”……
>
> 任何进步，无论大小，其实都相当不容易，都非常耗时费力 —— 在哪儿都一样。有兴趣、有时间，可以去浏览 Wikipedia 上的简要说明 —— [Wikipedia: Minimal structured control flow](https://en.wikipedia.org/wiki/Control_flow#Goto)。

## if 语句

`if` 语句的最简单构成是这样 —— 注意第 1 行末尾的冒号：

```javascript
if(expression){
    statements
}
```

如果表达式 `expression` 返回值为真，执行 `if` 语句块内部的 `statements`，否则，什么都不做，执行 `if` 之后的下一个语句。


```javascript
r = Math.floor(Math.random() * 1000)

if(r % 2 == 0){
    console.log(r + ' is even.')
}
```

    520 is even.


如果，表达式 `expression` 返回值无论真假，我们都需要做一点相应的事情，那么我们这么写：

```javascript
if(expression){
    statements_for_true;
}else{
    statements_for_false;
}
```

如果表达式 `expression` 返回值为真，执行 `if` 语句块内部的 `statements_for_true`，否则，就执行执行 `else` 语句块内部的 `statements_for_false`


```javascript
r = Math.floor(Math.random() * 1000)

if(r % 2 == 0){
    console.log(r + ' is even.')
} else {
    console.log(r + ' is odd.')
}
```

    445 is odd.


有时，表达式 `<expression>` 返回的值有多种情况，并且针对不同的情况我们都要做相应的事情，那么可以这么写：

```javascript
if (expression_1){
    statements_for_expression_1_true;
}
else if (expression_2){
    statements_for_expression_2_true;
}
else if (expression_3){
    statements_for_expression_3_true;
}
else {
    the_other_status;
}
```

Javascript 用 `else if` 处理这种多情况分支，还支持与之等价的 `switch...case` 方法：
```javascript
switch(value){
        case condition_1:
            statements_for_value_equal_condition1;
            break;
        case condition_2:
            statements_for_value_equal_condition2;
            break;
        default:
            the_other_status;
}
```

以下程序模拟投两个骰子的结果 —— 两个骰子数字加起来，等于 `7` 算平，大于 `7` 算大，小于 `7` 算小：


```javascript
r = Math.floor(Math.random() * 14) + 2

if(r == 7){
    console.log("Draw!");
}else if(r < 7){
    console.log("Small!");
}else if (r > 7){
    console.log("Big!");
}
```

    Small!


当然你还可以模拟投飞了的情况，即，最终的骰子数是 `0` 或者 `1`，即，`< 2`：


```javascript
r = Math.floor(Math.random() * 14)

if (r == 7){
    console.log("Draw!");
}
else if(r >= 2 && r < 7){      // 如果这里直接写 elif r < 7: ，那么，else: 那一部分永远不会被执行……
    console.log("Small!")
}
else if(r >= 2 || r > 7){
    console.log("Big!")
}
else{
    console.log("Not valid!")
}
```

    Big!


## for 循环

Javascript 语言中，`for` 语言的循环和 C 语言的循环类似：


```javascript
for( i = 0; i < 10; i ++){
    console.log("value of i: " + i);
}
```

    value of i: 0
    value of i: 1
    value of i: 2
    value of i: 3
    value of i: 4
    value of i: 5
    value of i: 6
    value of i: 7
    value of i: 8
    value of i: 9


for 循环的[文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for)是这样写的：

```javascript    
for ([initialization]; [condition]; [final-expression]){
    statement
}
```
这是更进一步的解释：

1）`initialization` 语句的作用是对计数变量进行初始化。例如：`i=0` 即给计数变量赋值为`0`，`i=1` 即给计数变量赋值为1。

2）`condition` 语句的作用是中设置循环条件——在满足循环条件时，继续执行循环；不满足循环条件时，循环终止。例如：`i < 10`，即在循环到`i = 10`时，循环终止。

3）`final-expression` 语句的作用是设置每一次循环结束时的操作。例如：`i ++`，即在每次的循环结束时，将计数变量加`1`。

所以，事实上的上面代码的执行过程是这样的：


```javascript
i = 0;
if(i < 10){
    console.log("value of i: " + i);
    i ++;
}
if(i < 10){
    console.log("value of i: " + i);
    i ++;
}
//...

// 当 i 累加到 10 的时候，因为 i < 10 不成立，所以不再重复。


```

    value of i: 0
    value of i: 1





    1



**注意：**
    
在编程中，我们要遵守一些潜在的规则，这被称之为**代码规范**。例如，在 javascript 中写循环的时候，**如果计数变量不在 statement 中使用，则会从 0 开始计数，然后循环条件设为 `i < 循环次数`**。

但是，当计数变量在 statement 中用到的时候，我们可能就要对 `[initialization]; [condition]; [final-expression]` 这三个部分做出改变了。例如，如果我们要输出10以内的偶数，则可以这样做（[点击这里返回看看第一章里提到的例子：所谓算法那一小节](01.01.entrance.ipynb#plusone)）：


```javascript
for( i = 2; i < 11; i += 2){ // 初始值为2，循环条件为 i < 11，每次循环结束 i = i +2
    console.log("value of i: " + i);
}
```

    value of i: 2
    value of i: 4
    value of i: 6
    value of i: 8
    value of i: 10


`i` 自然也可以是负数：


```javascript
for( i = 0; i > -10; i --){ 
    console.log("value of i: " + i);
}
```

    value of i: 0
    value of i: -1
    value of i: -2
    value of i: -3
    value of i: -4
    value of i: -5
    value of i: -6
    value of i: -7
    value of i: -8
    value of i: -9


### Continue 与 Break

在循环的过程中，还可以用 `continue` 和 `break` 控制流程走向，通常是在某条件判断发生的情况下 —— 正如你早就见过的那样：

```javascript
loop: for (var i = 2;i < 100;i++){
        if(i == 2){
            console.log(2)
            continue;
        }
        for(var j= 2;j < Math.floor(i ** 0.5) + 1;j++){
            if(i % j == 0){
                continue loop;
            }         
        }
        console.log(i)        
}  
```

一段包含 `break` 的例子：
```javascript
for (i = 0; i < 10; i++) {
    if (i === 3) { break; }
    console.log(i);
}
```

`continue` 语句将忽略其后的语句进入开始下次循环，而 `break` 语句将从此结束当前循环，开始执行循环之后的语句：

![](../images/continue-break.png)
//TODO

### 如何跳出多重循环？

在上面的例子中，`break`只会跳出第一层循环，对于多层循环，我们需要用`continue [tag]`来跳到 `tag` 所在的地方。 所以，那段求质数的代码实际上是这样执行的：

试比较以下两段代码：

### TODO

有时候我们会在别人的代码里看见`TODO`：

```javascript
function someFunction(){
    // TODO
}
```

又或者：

```javascript
for(i=0;i<10;i++){
    // TODO
    if i % 2 == 0:
        // TODO
}
```

`TODO` 这个标签是给写程序的人用的。当你写程序的时候，你可以用 `TODO` 占位，而后先写别的部分，过后再回来补充本来应该写在 `TODO` 所在位置的那一段代码。

写嵌套的判断语句或循环语句的时候，最常用 `TODO`，因为写嵌套挺费脑子的，一不小心就弄乱了。所以，经常需要先用 `TODO` 占位，而后逐一突破。

## while 循环

今天，在绝大多数编程语言中，都提供两种循环结构：

> * Collection-controlled loops（以集合为基础的循环）
> * Condition-controlled loops（以条件为基础的循环）

之前的 `for ... ` 就是 Collection-controlled loops；而在 Javascript 中提供的 Condition-controlled loops 是 `while` 循环。

`while` 循环的格式如下：

```python
while expression:
    statements
```

输出 1000 以内的斐波那契数列的程序如下：


```javascript
n = 1000;
var a = 0;
var b = 1;
while(a < n){
    console.log(a);
    tmp = b;
    b = a + b;
    a = tmp;
}
console.log(" ")
```

    0
    1
    1
    2
    3
    5
    8
    13
    21
    34
    55
    89
    144
    233
    377
    610
    987



`for` 和 `while` 的区别在哪里？什么时候应该用哪个？

`for` 更适合处理序列类型的数据（Sequence Type）的迭代，比如处理字符串中的每一个字符 ，比如把计数变量 `i` 当作某种序列类型的索引。

`while` 更为灵活，因为它后面只需要接上一个逻辑表达式即可。

## 一个投骰子赌大小的游戏

虽然还不可能随心所欲写程序，但是，你现在具备了起码的“阅读能力”。有了以上大概的介绍，你也许可以读懂一些代码了 —— 它们在你眼里再也不是天书了……

以下是一个让用户和程序玩掷骰子赌大小的程序。规则如下：

>* 每次计算机随机生成一个 `2... 12` 之间的整数，用来模拟机器人投两个骰子的情况；
* 机器人和用户的起始资金都是 10 个硬币
* 要求用户猜大小：
    * 用户输入 `b` 代表“大”；
    * 用户输入 `s` 代表“小”；
    * 用户输入 `q` 代表“退出”；
* 用户的输入和随机产生的数字比较有以下几种情况：
    * 随机数小于 `7`，用户猜小，用户赢；
    * 随机数小于 `7`，用户猜大，用户输；
    * 随机数等于 `7`，用户无论猜大还是猜小，结局平，不输不赢；
    * 随机数大于 `7`，用户猜小，用户输；
    * 随机数大于 `7`，用户猜大，用户赢；
* 游戏结束条件：
    * 机器人和用户，若任意一方硬币数量为 `0`，则游戏结束；
    * 用户输入了 `q` 主动终止游戏。



```Javascript
var coin_user = 10
var coin_bot = 10
var round_of_games = 0;
ele = document.getElementById("log");

function bet(dice, wager){ // 接收两个参数，一个是骰子点数，另一个用户的输入
    if(dice==7){
        res = 0
        alert("The dice is " + dice + ";\nDRAW!\n" //\n 是换行符号
         + "THE BALANCE: You: " + (coin_user + res) + " BOT: " + (coin_bot-res)) 
        return res
    }else if(dice < 7){
        if(wager=="s"){
            res = 1
            alert("The dice is " + dice + ";\nYou WIN!\n"
            + "THE BALANCE: You: " + (coin_user + res) + " BOT: " + (coin_bot-res))
        }else{
            res = -1
            alert("The dice is " + dice + ";\nYou LOST!\n"
            + "THE BALANCE: You: " + (coin_user + res) + " BOT: " + (coin_bot-res))

        }
    }else{
        if(wager=="s"){
            res = -1
            alert("The dice is " + dice + ";\nYou LOST!\n"
            + "THE BALANCE: You: " + (coin_user + res) + " BOT: " + (coin_bot-res))
        }else{
            res = 1
            alert("The dice is " + dice + ";\nYou WIN!\n"
            + "THE BALANCE: You: " + (coin_user + res) + " BOT: " + (coin_bot-res))
        }
    }
    return res
}
while (true) { //除 for 之外的另外一个循环语句
    var wager = prompt("输入 s 猜小，输入 b 猜大，输入 q 退出：");
    if(wager == "b" || wager == "s"){ //只有当用户输入的是 b 或者 s 得时候，才“掷骰子”……
        /*
            Javascript 并没有函数用以生成随机整数，解决方案就是生成[0-1]之间的一个小数后乘以相应的倍数后取整。
            套用这个公式可以生成[a, b]内的随机整数：
            Math.round(Math.random() * (b-a) ) + a
        */
        dice = Math.round(Math.random() * 10 ) + 2;
        result = bet(dice, wager, coin_user, coin_bot);
        coin_user += result;
        coin_bot -= result;
        round_of_games += 1;
        if(coin_user==0){
            alert("Woops, you've LOST ALL, and game over!\nYou've played "+
            round_of_games + " rounds.You have" + coin_user +"coins now.\nBye!");
            break;
        }else if(coin_bot==0){
            alert("Woops, the robot's LOST ALL, and game over!\nYou've played "+
            round_of_games + " rounds.You have" + coin_user +"coins now.\nBye!");
            break;
        }
    }else if (wager == "q"){ //输入 q 退出
        alert("记得明天再来玩哦~");
        break;
    }else{ //其它的则提出错误后执行下一次循环！
        alert("输入错误，请重新输入！");
    }
}
```

以上脚本嵌入网页内可运行，通过下方链接可查看效果：

> https://guess-demo.vercel.app/

## 总结

有控制流，才能算得上是程序。

* 只处理一种情况，用 `if(...){...} `
* 处理 `true`/`false` 两种情况，用 `if(...){...}else{...}`
* 处理多种情况，用 `if(...){...}else if(...){}else if(...){}else{...}`
* 迭代有序数据类型，用 `for(i=begin_num;i<=end_num;i++){...}` 或 `for(i in ...){...}`
* 其它循环，用 `while(...){...}`
* 与循环相关的语句还有 `continue` 与 `break`
* 函数从控制流角度去看其实就是子程序

## 💡 练习

* 我将投骰子游戏部署在了 `vercel` 上。`vercel` 是著名的前端代码托管平台，非常适合开发者起步。请通过研究学习如何通过 `vercel` 进行前端程序的部署。
* 将投骰子游戏改造成可以部署在 `deno` 上的后端服务。
