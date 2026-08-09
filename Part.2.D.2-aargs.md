# 关于参数（下）

## 可以接收一系列值的位置参数

如果你在定义参数的时候，在一个*位置参数*（Positional Arguments）前面标注了三个点，`...`，那么，这个位置参数可以接收一系列值，在函数内部可以对这一系列值用 `for ... of ...` 循环进行逐一的处理。

带 `...` 的参数，英文名称是 “Rest Parameters”，常常也对应文档里说的 “Arbitrary Positional Arguments”，姑且翻译为 “随意的位置参数”。

还有 “接收一系列键值对” 的写法，一会儿会讲到；在 Python 里叫 “Arbitrary Keyword Arguments”，在 Javascript 里更常见的对应物是 **options 对象**（一个普通对象，里面装着若干“关键字参数”）。

> 有些中文书籍把 “Arbitrary Positional Arguments” 翻译成 “可变位置参数”。事实上，在这样的地方，无论怎样的中文翻译都是令人觉得非常吃力的。前面的这个翻译还好了，我还见过把 “Arbitrary Keyword Arguments” 翻译成 “武断的关键字参数” 的 —— 我觉得这样的翻译肯定会使读者产生说不明道不白的疑惑。
>
> 所以，**入门之后就尽量只用英文**是个好策略。虽然刚开始有点吃力，但后面会很省心，很长寿 —— 是呀，少浪费时间、少浪费生命，其实就相当于更长寿了呀！

```javascript
function sayHi(...names) {
  for (const name of names) {
    console.log(`Hi, ${name}!`);
  }
}

sayHi();
sayHi('ann');
sayHi('mike', 'john', 'zeo');
```

    Hi, ann!
    Hi, mike!
    Hi, john!
    Hi, zeo!

`sayHi()` 这一行没有任何输出。因为你在调用函数的时候，没有给它传递任何值，于是，在函数内部代码执行的时候，`names` 是一个空数组，`for ... of ...` 循环内部的代码没有被执行。

在函数内部，是把 `names` 这个参数当作数组（容器）处理的 —— 否则也没办法用 `for ... of ...` 来处理。而在调用函数的时候，我们是可以将一个容器“拆开”传递给 Rest Parameters 的 —— 做法是，在调用函数的时候，在参数前面加上同样的 `...`（这时叫 Spread Syntax，展开语法）：

```javascript
function sayHi(...names) {
  for (const name of names) {
    console.log(`Hi, ${name}!`);
  }
}

const names = ['mike', 'john', 'zeo'];
sayHi(...names);
```

    Hi, mike!
    Hi, john!
    Hi, zeo!

实际上，因为以上的 `sayHi(...names)` 函数内部就是把接收到的参数当作数组处理的，于是，在调用这个函数的时候，向它展开传递任何可迭代对象都会被同样处理：

```javascript
function sayHi(...names) {
  for (const name of names) {
    console.log(`Hi, ${name}!`);
  }
}

const aString = 'Javascript';
sayHi(...aString);

const aRange = [...Array(10).keys()]; // 0..9
sayHi(...aRange);

const aList = Array.from({ length: 10 }, (_, i) => 10 - i); // 10..1
sayHi(...aList);

const aDictionary = { ann: 2321, mike: 8712, joe: 7610 };
sayHi(...Object.keys(aDictionary)); // 对象本身不能直接 ... 进函数参数列表，要先取出键
```

    Hi, J!
    Hi, a!
    Hi, v!
    Hi, a!
    Hi, s!
    Hi, c!
    Hi, r!
    Hi, i!
    Hi, p!
    Hi, t!
    Hi, 0!
    Hi, 1!
    Hi, 2!
    Hi, 3!
    Hi, 4!
    Hi, 5!
    Hi, 6!
    Hi, 7!
    Hi, 8!
    Hi, 9!
    Hi, 10!
    Hi, 9!
    Hi, 8!
    Hi, 7!
    Hi, 6!
    Hi, 5!
    Hi, 4!
    Hi, 3!
    Hi, 2!
    Hi, 1!
    Hi, ann!
    Hi, mike!
    Hi, joe!

_在定义可以接收一系列值的位置参数时，建议在函数内部为该变量命名时总是用**复数**_，因为函数内部，总是需要 `for` 循环去迭代数组中的元素，这样的时候，名称的复数形式对代码的可读性很有帮助 —— 注意以上程序第二行。以中文为母语的人，在这个细节上常常感觉 “不堪重负” —— 因为中文的名词没有复数 —— 但必须习惯。（同样的道理，若是用拼音命名变量，就肯定是为将来挖坑……）

**注意**：一个函数中，Rest Parameter（`...names`）只能有一个；并且它必须排在参数列表的**最后**。若是还有其它位置参数存在，那就必须把它们写在 Rest Parameter 之前。

```javascript
function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function sayHi(greeting, ...names) {
  for (const name of names) {
    console.log(`${greeting}, ${capitalize(name)}!`);
  }
}

sayHi('Hello', 'mike', 'john', 'zeo');
```

    Hello, Mike!
    Hello, John!
    Hello, Zeo!

## 为函数的某些参数设定默认值

可以在定义函数的时候，为某些参数设定默认值（Default Parameters）。从这个函数的 “用户” 角度来看，这些设定了默认值的参数，就成了 “可选参数”。

不过要注意：Javascript **没有** Python 那种 `func(a, *args, flag=False)` 的“关键字-only 参数”语法。Rest Parameter 必须在最后，所以带默认值的“开关”参数，更常见的写法是再接收一个 **options 对象**：

```javascript
function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function sayHi(greeting, names, { capitalized = false } = {}) {
  for (let name of names) {
    if (capitalized) {
      name = capitalize(name);
    }
    console.log(`${greeting}, ${name}!`);
  }
}

sayHi('Hello', ['mike', 'john', 'zeo']);
sayHi('Hello', ['mike', 'john', 'zeo'], { capitalized: true });
```

    Hello, mike!
    Hello, john!
    Hello, zeo!
    Hello, Mike!
    Hello, John!
    Hello, Zeo!

当然，你也可以继续用 Rest Parameter 收集名字，把 options 用别的方式传入；但对初学者来说，**“名字用数组，可选配置用对象”** 是最清楚、也最接近现实项目习惯的写法。

## 可以接收一系列值的关键字参数

之前我们看到，可以设定 Rest Parameter，接收一系列的值；

同样地，我们也可以设定一个可以接收很多“关键字参数”的入口 —— 在 Javascript 里，就是接收一个对象，然后迭代它的键值对：

```javascript
function sayHi(namesGreetings) {
  for (const [name, greeting] of Object.entries(namesGreetings)) {
    console.log(`${greeting}, ${name}!`);
  }
}

sayHi({ mike: 'Hello', ann: 'Oh, my darling', john: 'Hi' });
```

    Hello, mike!
    Oh, my darling, ann!
    Hi, john!

既然在函数内部，我们在处理接收到的对象时，用的是对“字典/映射”的迭代方式，那么，在调用函数的时候，当然也可以先构造对象再传入；需要的话，还可以用展开语法合并对象：

```javascript
function sayHi(namesGreetings) {
  for (const [name, greeting] of Object.entries(namesGreetings)) {
    console.log(`${greeting}, ${name}!`);
  }
}

const aDictionary = { mike: 'Hello', ann: 'Oh, my darling', john: 'Hi' };
sayHi(aDictionary);

sayHi({ mike: 'Hello', ann: 'Oh, my darling', john: 'Hi' });
sayHi({ ...aDictionary, zeo: 'Hey' });
```

    Hello, mike!
    Oh, my darling, ann!
    Hi, john!
    Hello, mike!
    Oh, my darling, ann!
    Hi, john!
    Hello, mike!
    Oh, my darling, ann!
    Hi, john!
    Hey, zeo!

至于在函数内部，你用什么样的迭代方式去处理这个对象，是你自己的选择：

```javascript
function sayHi2(namesGreetings) {
  for (const name in namesGreetings) {
    console.log(`${namesGreetings[name]}, ${name}!`);
  }
}

sayHi2({ mike: 'Hello', ann: 'Oh, my darling', john: 'Hi' });
```

    Hello, mike!
    Oh, my darling, ann!
    Hi, john!

> 💡 `for ... in ...` 会遍历对象的可枚举属性名；更推荐初学阶段优先使用 `Object.entries()` / `Object.keys()`，意图更明确。

## 函数定义时各种参数的排列顺序

在定义函数的时候，各种不同类型的参数应该按什么顺序摆放呢？对于之前写过的 `sayHi()` 这个函数，一种清楚的 Javascript 写法是：

```javascript
function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function sayHi(greeting, names, { capitalized = false } = {}) {
  for (let name of names) {
    if (capitalized) {
      name = capitalize(name);
    }
    console.log(`${greeting}, ${name}!`);
  }
}

sayHi('Hi', ['mike', 'john', 'zeo']);
sayHi('Welcome', ['mike', 'john', 'zeo'], { capitalized: true });
```

    Hi, mike!
    Hi, john!
    Hi, zeo!
    Welcome, Mike!
    Welcome, John!
    Welcome, Zeo!

如果，你想给其中的 `greeting` 参数也设定个默认值，写成这样完全可以：

```javascript
function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function sayHi(greeting = 'Hello', names = [], { capitalized = false } = {}) {
  for (let name of names) {
    if (capitalized) {
      name = capitalize(name);
    }
    console.log(`${greeting}, ${name}!`);
  }
}

sayHi('Hi', ['mike', 'john', 'zeo']);
sayHi('Welcome', ['mike', 'john', 'zeo'], { capitalized: true });
sayHi(undefined, ['mike', 'john', 'zeo']); // 想“跳过”greeting、用默认值时，可显式传 undefined
```

    Hi, mike!
    Hi, john!
    Hi, zeo!
    Welcome, Mike!
    Welcome, John!
    Welcome, Zeo!
    Hello, mike!
    Hello, john!
    Hello, zeo!

但如果你改用 Rest Parameter，并试图把默认值的 `greeting` 放在前面，就会掉进和 Python 很像的坑：

```javascript
function sayHi(greeting = 'Hello', ...names) {
  for (const name of names) {
    console.log(`${greeting}, ${name}!`);
  }
}

sayHi('mike', 'john', 'zeo');
```

    mike, john!
    mike, zeo!

设定了默认值的 `greeting`，竟然不像你想象的那样是 “可选参数”！因为调用时传入的第一个值，仍然会按位置赋给 `greeting`。

在 Javascript 里，你**不能**写成 Python 那种 `function sayHi(...names, greeting = 'Hello')` —— Rest Parameter 必须在最后，否则直接语法错误。所以更稳妥的做法是：把“可选配置”收进 options 对象：

```javascript
function sayHi(...args) {
  let greeting = 'Hello';
  let capitalized = false;
  let names = args;

  const last = args[args.length - 1];
  if (last && typeof last === 'object' && !Array.isArray(last)) {
    ({ greeting = 'Hello', capitalized = false } = last);
    names = args.slice(0, -1);
  }

  for (let name of names) {
    if (capitalized) {
      name = name.charAt(0).toUpperCase() + name.slice(1);
    }
    console.log(`${greeting}, ${name}!`);
  }
}

sayHi('mike', 'john', 'zeo');
sayHi('mike', 'john', 'zeo', { greeting: 'Hi' });
```

    Hello, mike!
    Hello, john!
    Hello, zeo!
    Hi, mike!
    Hi, john!
    Hi, zeo!

这是因为函数被调用时，面对许多参数，Javascript 需要按照既定的规则（即，顺序与语法限制）判定每个参数究竟如何绑定：

> **Order of Parameters（Javascript）**
> 1. Positional（可带 Default）
> 2. Rest Parameter（`...args`，最多一个，且必须在最后）
> 3. “关键字参数” 通常不靠语言内建语法，而是靠 **options 对象**（以及解构赋值）

所以，即便你在定义里写成

```javascript
function sayHi(greeting = 'Hello', ...names) {
  // ...
}
```

在调用该函数的时候，无论你写的是

```javascript
sayHi('Hi', 'mike', 'john', 'zeo');
```

还是

```javascript
sayHi('mike', 'john', 'zeo');
```

Javascript 都会认为接收到的第一个值是 Positional Argument，并赋给 `greeting` —— 因为在定义中，`greeting` 被放到了 Rest Parameter 之前。

<a href="./Part.2.D.3-lambda.md" ><small>Next Page</small></a>
