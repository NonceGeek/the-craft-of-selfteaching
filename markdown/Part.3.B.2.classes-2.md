# 类 —— Javascript 的实现

既然已经在不碰代码的情况下，把 OOP 中的主要概念梳理清楚了，以下的行文中，那些概念就直接用英文罢，省得理解上还得再绕个弯……

## Defining Class

Class 使用 `class` 关键字进行定义。

与函数定义不同的地方在于，Class 接收参数不是在 `class ClassName { ... }` 的花括号外面用括号完成 —— 参数是在 `constructor(...)` 里接收的。

让我们先看看代码，而后再逐一解释：

```javascript
class Golem {
  constructor(name = null) {
    this.name = name;
    this.builtYear = new Date().getFullYear();
  }

  sayHi() {
    console.log('Hi!');
  }
}

const g = new Golem('Clay');
console.log(g.name);
console.log(g.builtYear);
console.log(g.sayHi);
g.sayHi();
console.log(typeof g);           // 'object'
console.log(g.constructor.name); // 'Golem'
console.log(typeof g.name);
console.log(typeof g.builtYear);
console.log(typeof g.sayHi);
```

    Clay
    2026
    [Function: sayHi]
    Hi!
    object
    Golem
    string
    number
    function

以上，我们创建了一个 Class:

```javascript
class Golem {
  constructor(name = null) {
    this.name = name;
    this.builtYear = new Date().getFullYear();
  }
}
```

其中定义了当我们根据这个 Class 创建一个实例的时候，那个 Object 的初始化过程，即 `constructor()` —— 又由于这个函数是在 Class 中定义的，我们称它为 Class 的一个 Method（更准确说，是构造方法）。

这里的 `this` 就是个特殊绑定：在实例方法被调用时，用来指代“当前这个 Instance”。

比如，我们创建了 Golem 这个 Class 的一个 Instance，`const g = new Golem('Clay')` 之后，我们写 `g.name`，访问的就是该实例上的 `name` 属性 —— 它是在 `constructor` 里通过 `this.name = name` 挂上去的。

注意：在 class 方法里，惯例就是用 `this`；不要在这里把它和普通变量名混着乱改。也请留心：普通函数里的 `this` 绑定规则和 class 方法、箭头函数并不完全一样（后面用到回调时会再碰到）。

在 Class 的代码中，如果定义了 `constructor()`，那么创建实例时（`new Golem(...)`）就会调用它来做初始化。这个方法名称是强制指定的；一个 class 里通常只写一个 `constructor`。

当我们用 `const g = new Golem('Clay')` 这一句创建了一个 Golem 的 Instance 的时候，以下一连串的事情发生了：

> * `g` 从此之后就是一个根据 Golem 这个 Class 创建的 Instance，对使用者来说，它就是个 Object；
> * 因为 Golem 这个 Class 的代码中有 `constructor()`，所以，当 `g` 被创建的时候，`g` 就需要被初始化……
> * 在构造过程中，`this` 指向正在创建的那个实例；
> * `this.name` 接收了一个参数，`'Clay'`，并将其保存了下来；
> * 生成了一个叫做 `this.builtYear` 的变量，其中保存的是 `g` 这个 Object 被创建时的年份……

对了，Golem 和 Robot 一样，都是机器人的意思；Golem 的本义来自于犹太神话，一个被赋予了生命的泥人……

## Inheritance

我们刚刚创建了一个 Golem Class，如果我们想用它 Inherit 一个新的 Class，比如，`RunningGolem`，一个能跑的机器人，那就像以下的代码那样做 —— 注意 `extends`：

```javascript
class Golem {
  constructor(name = null) {
    this.name = name;
    this.builtYear = new Date().getFullYear();
  }

  sayHi() {
    console.log('Hi!');
  }
}

class RunningGolem extends Golem {
  run() {
    console.log("Can't you see? I'm running...");
  }
}

const rg = new RunningGolem('Clay');

console.log(rg.run);
rg.run();
console.log(rg.name);
console.log(rg.builtYear);
rg.sayHi();
```

    [Function: run]
    Can't you see? I'm running...
    Clay
    2026
    Hi!

如此这般，我们根据 Golem 这个 Class 创造了一个 Subclass —— `RunningGolem`，既然它是 Golem 的 Inheritance，那么 Golem 有的 Attributes 和 Methods 它都有，并且还多了一个 Method —— `run`。

> 💡 若子类自己也要写 `constructor`，里面通常需要先调用 `super(...)`，再使用 `this`。

## Overrides

当我们创建一个 Inherited Class 的时候，可以重写（Overriding）Parent Class 中的 Methods。比如这样：

```javascript
class Golem {
  constructor(name = null) {
    this.name = name;
    this.builtYear = new Date().getFullYear();
  }

  sayHi() {
    console.log('Hi!');
  }
}

class RunningGolem extends Golem {
  run() {
    console.log("Can't you see? I'm running...");
  }

  sayHi() {
    // 不再使用 Parent Class 中的定义，而是新的……
    console.log('Hey! Nice day, Huh?');
  }
}

const rg = new RunningGolem('Clay');
console.log(rg.run);
rg.run();
console.log(rg.name);
console.log(rg.builtYear);
rg.sayHi();
```

    [Function: run]
    Can't you see? I'm running...
    Clay
    2026
    Hey! Nice day, Huh?

## Inspecting A Class

当我们作为用户想了解一个 Class 的 Interface，即，它的 Attributes 和 Methods 的时候，常用的有几种方式：

```javascript
1. console.log(object)                 // 看实例自身数据
2. Object.keys(object)                 // 实例“自己的”可枚举属性名
3. Object.getOwnPropertyNames(Object.getPrototypeOf(object))
                                       // 原型上的方法名等
4. 'builtYear' in object               // 是否能访问到该属性（含原型链）
```

Javascript **没有** Python 那种内建的 `help(rg)`；日常更常靠 JSDoc + 编辑器悬停，或自己打印原型信息。

```javascript
class Golem {
  constructor(name = null) {
    this.name = name;
    this.builtYear = new Date().getFullYear();
  }

  sayHi() {
    console.log('Hi!');
  }
}

class RunningGolem extends Golem {
  run() {
    console.log("Can't you see? I'm running...");
  }

  sayHi() {
    console.log('Hey! Nice day, Huh?');
  }
}

const rg = new RunningGolem('Clay');
console.log(rg);
console.log(Object.keys(rg));
console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(rg)));
console.log('builtYear' in rg);
console.log(rg instanceof RunningGolem);
console.log(rg instanceof Golem);
```

    RunningGolem { name: 'Clay', builtYear: 2026 }
    [ 'name', 'builtYear' ]
    [ 'constructor', 'run', 'sayHi' ]
    true
    true
    true

## Scope

每个变量都属于某一个 **Scope**（变量的作用域），在同一个 Scope 中，变量可以被引用被操作…… 这么说非常抽象，难以理解 —— 只能通过例子说明。

我们先给 Golem 这个 Class 增加一点功能 —— 我们需要随时知道究竟有多少个 Golem 处于活跃状态…… 也因此顺带给 Golem 加上一个 Method：`cease()` —— 哈！机器人么，想关掉它，说关掉它，就能关掉它；

另外，我们还要给机器人设置个使用年限，比如 10 年；

…… 而外部会每隔一段时间，用 `golem.isActive()` 去检查所有的机器人，所以，不需要外部额外操作，到了年头，它应该能关掉自己。—— 当然，又由于以下代码是简化书写的，核心目的是为了讲解 Scope / 类属性，所以并没有专门写模拟 10 年后某些机器人自动关闭的情形……

在运行以下代码之前，需要先介绍几个常用写法：

> * `'attr' in object` 查询能不能访问到这个属性，返回布尔值
> * `object.attr` / `object['attr']` 获取值
> * `object.attr = value` 设置值
> * 若要在“不确定有没有”时更稳妥地读：`Object.hasOwn(object, 'attr')`（只看对象自身，不含原型链）

现在的你，应该一眼望过去，就已经能掌握这些用法 —— 还记得之前的你吗？眼睁睁看着，那些字母放在那里对你来说没任何意义…… 这才多久啊！

```javascript
class Golem {
  static population = 0;
  static #lifeSpan = 10;

  #active = true;

  constructor(name = null) {
    this.name = name;
    this.builtYear = new Date().getFullYear();
    Golem.population += 1; // 执行一遍之后，试试把这句改成 population += 1
  }

  sayHi() {
    console.log('Hi!');
  }

  cease() {
    this.#active = false;
    Golem.population -= 1;
  }

  isActive() {
    if (new Date().getFullYear() - this.builtYear >= Golem.#lifeSpan) {
      this.cease();
    }
    return this.#active;
  }
}

const g = new Golem();
console.log('population' in Golem);       // true（静态属性挂在构造函数上）
console.log('population' in g);           // true（也可经构造函数继承式地读到，见下）
console.log(Object.hasOwn(Golem, 'population')); // true
console.log(Object.hasOwn(g, 'population'));     // false —— 实例自身没有这个字段
console.log(Object.hasOwn(Golem, '#lifeSpan'));  // 不能这样查私有字段名
console.log(Object.hasOwn(g, '#active'));        // 同上
console.log(Golem.population);            // 1
Golem.population = 10;
console.log(Golem.population);            // 10
const x = new Golem();
console.log(Golem.population);            // 11
x.cease();
console.log(Golem.population);            // 10
console.log(Golem.population);            // 10
console.log(g.isActive());
```

    true
    true
    true
    false
    false
    false
    1
    10
    11
    10
    10
    true

如果你试过把构造函数里的 `Golem.population += 1` 改成 `population += 1`，通常会直接报错：`population is not defined` —— 因为 `constructor` 作用域里并没有这样一个局部变量；类上的共享计数要写成 `Golem.population`（或在静态方法语境里用 `this.population`，那是另一回事）。

关于私有：Javascript 用 `#` 前缀声明真正的私有字段，如 `#active`、`static #lifeSpan`。它们**不能**从 class 外部用 `g.#active` 访问，也不是靠“名称约定”装出来的隐私。

> 💡 社区里还有一种更老的约定：用 `_lifeSpan` 这种单下划线表示“请当成内部实现，别乱碰”。那只是约定，语言并不阻止外部访问。真正要藏住，用 `#`。

看看下面的图示，理解起来更为直观一些，其中每个方框代表一个 Scope：

![](../images/class-variables-scope.png)

（原图按 Python 画的 Scope，把 `__init__` 想成 `constructor`，把 `self.xxx` 想成 `this.xxx`，把类上的 `population` 想成 `static population` 即可。）

整个代码启动之后，总计有若干 Scopes：

> * ① `class Golem` 之外；
> * ② `class Golem` 的类体之内（静态字段所在层）；
> * ③ `constructor(name = null)` 之内；
> * ④ `cease()` 之内；

在 Scope ① 中，可以引用 `Golem.population`；生成实例 `g` 之后，也可以通过实例去“读到”与类相关的一些信息，但 `#lifeSpan` / `#active` 在外部是触达不到的；

在 Scope ② 中，存在静态字段 `population` 和私有静态字段 `#lifeSpan`；

在 Scope ③ 和 Scope ④ 中，都可以使用 `this.xxx`，也可以用 `Golem.population`、`Golem.#lifeSpan`（仅在 class 内部）这类写法。

**补充**

类上的共享状态，请优先写成 `Golem.population`（或 `static` 方法里的明确意图），不要在实例方法里随手制造一个会遮蔽它的局部变量。实例自己的状态（如 `name`、`builtYear`、`#active`）用 `this` / `#` 存放。

## Encapsulation

到目前为止，Golem 这个 Class 看起来不错，但有个问题，它里面的数据，外面是可以随便改的 —— 虽然 `#lifeSpan` 已经是私有字段，外部不能触达，可 `Golem.population` 就不一样，外面随时可以引用，还可以随时修改它，只需要写上一句：

```javascript
Golem.population = 1000000;
```

我们干脆把 `population` 也改成私有的罢：`static #population`，而后需要从外界查看这个变量的话，就在 Class 里面写个方法，返回那个值好了：

```javascript
class Golem {
  static #population = 0;
  static #lifeSpan = 10;

  #active = true;

  constructor(name = null) {
    this.name = name;
    this.builtYear = new Date().getFullYear();
    Golem.#population += 1;
  }

  sayHi() {
    console.log('Hi!');
  }

  cease() {
    this.#active = false;
    Golem.#population -= 1;
  }

  isActive() {
    if (new Date().getFullYear() - this.builtYear >= Golem.#lifeSpan) {
      this.cease();
    }
    return this.#active;
  }

  population() {
    return Golem.#population;
  }
}

const g = new Golem('Clay');
console.log(g.population);
console.log(g.population());
```

    [Function: population]
    1

如果，你希望外部能够像获得 Class 的属性那样，直接写 `g.population`，而不是必须加上一个括号 `g.population()`，那么可以用 getter：

```javascript
class Golem {
  static #population = 0;
  // ...

  get population() {
    return Golem.#population;
  }
}
```

如此这般之后，你就可以用 `g.population` 了：

```javascript
class Golem {
  static #population = 0;
  static #lifeSpan = 10;

  #active = true;

  constructor(name = null) {
    this.name = name;
    this.builtYear = new Date().getFullYear();
    Golem.#population += 1;
  }

  sayHi() {
    console.log('Hi!');
  }

  cease() {
    this.#active = false;
    Golem.#population -= 1;
  }

  isActive() {
    if (new Date().getFullYear() - this.builtYear >= Golem.#lifeSpan) {
      this.cease();
    }
    return this.#active;
  }

  get population() {
    return Golem.#population;
  }
}

const g = new Golem('Clay');
console.log(g.population);
// g.population = 100; // 只有 getter、没有 setter 时，赋值无效（严格模式会报错）
```

    1

如此这般之后，不仅你可以直接引用 `g.population`，并且，在外部不能再随心所欲地通过这个接口改内部计数 —— 除非你主动提供 setter。

到此为止，Encapsulation 就做得不错了。

如果你非得希望从外部可以设置这个值，那么，你就再写一个 setter：

```javascript
get population() {
  return Golem.#population;
}

set population(value) {
  Golem.#population = value;
}
```

这样之后，`.population` 这个 Attribute 就可以从外部被设定其值了（虽然在当前的例子中显得没必要让外部设定 `#population` 这个值…… 以下仅仅是为了举例）：

```javascript
class Golem {
  static #population = 0;
  static #lifeSpan = 10;

  #active = true;

  constructor(name = null) {
    this.name = name;
    this.builtYear = new Date().getFullYear();
    Golem.#population += 1;
  }

  sayHi() {
    console.log('Hi!');
  }

  cease() {
    this.#active = false;
    Golem.#population -= 1;
  }

  isActive() {
    if (new Date().getFullYear() - this.builtYear >= Golem.#lifeSpan) {
      this.cease();
    }
    return this.#active;
  }

  get population() {
    return Golem.#population;
  }

  set population(value) {
    Golem.#population = value;
  }
}

const g = new Golem('Clay');
console.log(g.population); // 1
g.population = 100;
const ga = new Golem('New');
console.log(g.population);  // 101
console.log(ga.population); // 101

console.log(Object.keys(g));
console.log(g);
// 提醒：即便做了封装，若你再给构造函数乱挂公开属性，外面仍可能绕过设计。
Golem.population = 10000; // 注意：这是在构造函数对象上新建/改写公开属性，不是走 getter/setter 那条实例接口
console.log(g.population);
```

    1
    101
    101
    [ 'name', 'builtYear' ]
    Golem { name: 'Clay', builtYear: 2026 }
    101

最后一问很值得自己动手验证：`Golem.population = 10000` 和 `g.population = 10000` 是不是一回事？在上面的设计里，前者碰的是构造函数上的公开属性位，后者走的是实例的 `set population`；封装做得不彻底时，后面会有很多麻烦 —— 所以，在很多的情况下，不把数据封装在 Class 内部的话，后面会有很多麻烦。

> 官方文档可继续对照：
>
> * [MDN — Classes](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes)
> * [MDN — Private properties](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes/Private_properties)
> * [MDN — get / set](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/get)

<a href="./Part.3.B.3.decorator-iterator-generator.md" ><small>Next Page</small></a>
