---
title: JavaScript 面试准备手册 – 必备主题及代码示例
date: 2024-05-22T09:58:22.000Z
author: Kunal Nalawade
authorURL: https://www.freecodecamp.org/news/author/kunal-nalawade-25/
originalURL: https://www.freecodecamp.org/news/js-interview-prep-handbook/
translator: ""
reviewer: ""
---

/ [#JavaScript][1]

<!-- more -->

# JavaScript 面试准备手册 – 必备主题及代码示例

![Kunal Nalawade](https://www.freecodecamp.org/news/content/images/size/w60/2023/01/prof.jpeg)

[Kunal Nalawade][2]

  ![JavaScript 面试准备手册 － 必备主题及代码示例](https://www.freecodecamp.org/news/content/images/size/w2000/2024/05/JavaScript-Interview-Prep-Cover.png)

JavaScript 是 web 开发中广泛使用的语言，几乎每个网站的互动功能都是由它驱动的。JavaScript 使创建动态网页成为可能，且非常多才多艺。

JavaScript 在 2024 年依旧是需求量最大的编程语言之一。许多公司都在寻找精通 JavaScript 及其框架（如 Angular 和 React）的专业人才。如果你是有志成为 web 开发者，了解这些公司在面试中看重什么是开启绝佳机会的关键。

## 目录

-   [如何使用 `var`、`let` 和 `const` 关键字。][3]
-   [什么是变量提升？][4]
-   [闭包是如何工作的？][5]
-   [如何实现防抖？][6]
-   [如何实现节流？][7]
-   [什么是柯里化？][8]
-   [`==` 和 `===` 有什么区别？][9]
-   [`this` 关键字是如何工作的？][10]
-   [如何使用 `call`、`apply` 和 `bind` 方法？][11]
-   [什么是原型和原型继承？][12]
-   [如何使用扩展运算符。][13]
-   [数组和对象解构是如何工作的？][14]
-   [什么是 Promise？][15]
-   [如何使用 `async` 和 `await` 关键字。][16]
-   [什么是事件循环？][17]
-   [事件传播是如何工作的 —— 冒泡和捕获。][18]
-   [什么是生成器函数？][19]
-   [如何为 `Array.map()`、`Array.reduce()` 和 `Array.filter()` 实现 polyfill][20]
-   [其他想法][21]

## 如何使用 `var`、`let` 和 `const` 关键字

在 JavaScript 中，你可以用三种方式声明变量：使用 `var`、`let` 和 `const`。理解这三者之间的区别是很重要的。



```javascript
var a=5
function fun() {
    var b=4
}

console.log(a) // 5
console.log(b) // 抛出 ReferenceError
```

一个 `let` 变量具有块级作用域。如果这个变量在块内声明，它不能在块外被访问。例如：

```javascript
var a = 5;
if (a > 1) {
    var b = 6;
    let c = 7;
}
console.log(a); // 打印 5
console.log(b); // 打印 6
console.log(c); // 抛出 ReferenceError
```

这里，变量 `a` 和 `b` 具有全局作用域，所以它们可以在任何地方被访问。变量 `c` 由于 `let` 只具有块级作用域，所以不能在 `if` 块外访问。

`const` 用于声明一个常量。一旦用 `const` 声明变量，它就不能被修改。

```javascript
const x = 5;
x = 6; // 抛出一个错误
```

但是，你可以修改对象的属性或数组的元素。

```javascript
const obj = { name: 'kunal', age: 21 };
obj.name = 'alex';
console.log(obj); // { name: 'alex', age: 21 }

const arr = [1, 2, 3];
arr[1] = 4;
console.log(arr); // [ 1, 4, 3 ]
```
```

变量提升指的是 JavaScript 的默认行为，它将所有变量和函数声明移动到顶部。这意味着你可以在它们被声明之前使用它们。

```javascript
x = 5 
console.log(x) // 输出 5 
var x               
```

在上面的代码中，JavaScript 已经将变量声明移动到了代码块的顶部。也就是说，这类似于在第一行声明 `x`。

在函数的情况下，声明也会被移到顶部：

```javascript
function foo() {
    console.log("foo called");
}

foo(); // foo called
```

然而，这在 `let` 和 `const` 语句中不起作用。

```javascript
x = 5; // 抛出 ReferenceError
let x;

fiz(); // 抛出 ReferenceError
const fiz = () => { console.log("fiz called") };
```

## 闭包是如何工作的？

闭包是 JavaScript 中的一个重要概念。当你在一个函数内有另一个函数时，内部函数可以访问外部函数的所有变量。

但是当这个内部函数被外部函数返回时，内部函数可以在外部函数之外的任何地方被调用，并且它仍然可以访问那些变量。

```javascript
function fun() {
    let count = 0;
    return () => {
        count++;
        console.log(count);
    };
}
```


这里，`fun()` 声明并初始化了一个变量 `count`。然后，它返回一个内部函数，该函数在打印 `count` 之前递增 `count`。现在，当你在 `fun()` 方法外的任何地方调用 `innerFun()` 时，它仍然可以访问并递增 `count`。

这是闭包的概念。你可以在 [Matías Hernández][22] 的以下帖子中了解更多关于闭包的内容。

[

如何在 JavaScript 中使用闭包 - 初学者指南

闭包是一个让人困惑的 JavaScript 概念，因为很难理解它们实际是如何使用的。与函数、变量和对象等其他概念不同，你不会总是有意识地和直接地使用闭包。你不会说：哦！在这里我将使用闭包作为解决方案。但是在……

![favicon](https://cdn.freecodecamp.org/universal/favicons/favicon.ico)Matías HernándezfreeCodeCamp.org

![English-Header-4](https://www.freecodecamp.org/news/content/images/2021/01/English-Header-4.png)

][23]

## 如何实现防抖动

防抖动是一种延迟函数调用几秒钟的技术，确保函数调用和执行之间总是有延迟。

让我们看看如何实现它：

```javascript
function debounce(func, delay) {
    let timeout = null;
    return (...args) => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            func(...args);
            timeout = null;
        }, delay);
    };
}
```

防抖函数接收一个函数和一个延迟作为参数，并返回一个新的防抖函数。当你调用这个防抖函数时，它将在 `delay` 毫秒后执行。如果在这段时间内调用该函数，它会取消之前的调用并重新等待 `delay` 时间。

让我们测试一下这种行为：

```javascript
function fun(a, b) {
    console.log(`这是一个带有参数 ${a} 和 ${b} 的函数`);
}

const debouncedFun = debounce(fun, 500);
debouncedFun(2, 3);
debouncedFun(2, 3);
debouncedFun(2, 3); // 这是一个带有参数 2 和 3 的函数
```

前两次调用不会执行，而第三次调用会在500毫秒后执行。防抖函数使用了闭包概念，所以首先理解它们是很重要的。

防抖函数有很多应用场景，最流行的一个是搜索栏中的自动补全功能。我在以下帖子中详细解释了防抖函数：

在 JavaScript 中防抖 – 通过在 React 中构建自动完成功能进行讲解

嗨，读者们，希望你们一切都好！我带着另一个关于 web 开发的教程回来了。如果你是一个喜欢用 JavaScript 和 React 开发 web 应用程序的人，那么这篇文章就是为你准备的。当你将一个新的应用程序推向生产环境时，你想确保它是用户友好的。一个网站的…

![favicon](https://cdn.freecodecamp.org/universal/favicons/favicon.ico)Kunal NalawadefreeCodeCamp.org

![photo-1550063873-ab792950096b](https://www.freecodecamp.org/news/content/images/2024/02/photo-1550063873-ab792950096b.jpeg)

][24]

## 如何实现节流

节流是一种限制函数调用速率的技术。被节流的函数在首次执行后，只有在经过一定延迟后才能再次调用。如果在延迟期间调用它，则不会发生任何事情。

让我们来看如何实现它：

```javascript
function throttle(func, delay) {
    let timeout = null;
    return (...args) => {
        if (!timeout) {
            func(...args);
            timeout = setTimeout(() => {
                timeout = null;
            }, delay);
        }
    };
}
```

让我们测试一下这种行为：

```javascript
function fun(a, b) {
    console.log(`这是一个带有参数 ${a} 和 ${b} 的函数`);
}

const throttledFun = throttle(fun, 500);

throttledFun(2, 3); // 这是一个带有参数 2 和 3 的函数
throttledFun(2, 3);

setTimeout(() => {
    throttledFun(2, 3);
}, 300);

setTimeout(() => {
    throttledFun(2, 3); // 这是一个带有参数 2 和 3 的函数
}, 600);
```

在这里，第一次调用立即执行，并且在接下来的 500 毫秒内，不会执行任何函数调用。最后一次调用在 500 毫秒之后执行。

节流也使用了闭包的概念。我在我的帖子中详细解释了节流，所以请查看：

[

什么是 JavaScript 中的节流？通过一个简单的 React 用例解释

欢迎回来，亲爱的开发者们！今天，我们再次深入探讨 JavaScript 和 Web 开发，并学习节流。作为一个开发者，使您的网站用户友好是很重要的。这对产品的成功非常关键，用户体验的一个关键部分是网站...



![throttling-image](https://www.freecodecamp.org/news/content/images/2024/04/throttling-image.jpeg)

][25]

## 什么是柯里化？

柯里化是一种技术，将带有多个参数的函数转换为一系列函数，每个函数接受单一参数并返回另一个函数。例如，考虑下面的函数：

```javascript
function add(a, b, c) {
    return a + b + c;
}
```

使用柯里化，上述函数可以写成：

```javascript
function curryAdd(a) {
    return function(b) {
        return function(c) {
            return a + b + c;
        };
    };
}
```

在这里，`curryAdd` 内部的每个函数接受一个参数并返回另一个函数，直到收集到所有参数。`curryAdd` 也被称为[高阶函数][26]。

柯里化允许你重复使用函数的部分实现。如果没有所有参数可用，你可以最初固定函数的一些参数并返回一个可复用的函数。

```javascript
// 可复用函数
const addTwo = curryAdd(2);
console.log(addTwo); // 打印函数

// 调用最终结果
const result1 = addTwo(5)(10);
console.log(result1); // 17
```

`addTwo` 是一个可重用的函数，可以在以后有额外参数时使用。

因此，柯里化通过部分函数应用增强了代码的模块化和灵活性。它还允许你创建满足特定需求的函数，如上例所示。

柯里化通过将复杂函数分解成更简单、更易管理的部分，简化了复杂函数。这导致了更简洁和可读的代码。

## `==` 和 `===` 的区别是什么？

这是一个非常简单却在面试中很常见的问题。

```javascript
let a = 1;
let b = "1";

console.log(a == b); // true
console.log(a === b); // false
```

-   `==` 只比较 `a` 和 `b` 的值，
-   `===` 同时比较 `a` 和 `b` 的值和数据类型

## `this` 关键词如何工作？

`this` 关键词指的是你当前引用的对象。它的值取决于你使用它的上下文。在全局引用时，`this` 指的是 [window][27] 对象。

```javascript
console.log(this) // 输出 window {}
```

```javascript
const obj = {
    name: 'kunal',
    age: 21,
    getInfo() {
        console.log(`Name: ${this.name}, Age: ${this.age}`);
    }
};

obj.getInfo();
```

参阅[文档][28]了解更多关于 `this` 关键字的信息。

## 如何使用 `call`、`apply` 和 `bind` 方法

当你在函数内部使用 `this` 时，`this` 的值设置为调用该函数的对象。让我们来看一个例子：

```javascript
function getInfo() {
    console.log(`Name: ${this.name}, Age: ${this.age}`);
}
```

`call`、`apply` 和 `bind` 用于设置方法内部 `this` 关键字的值。

### `call`

要在对象上调用 `getInfo()` 函数，使用 `call` 函数。让我们创建两个对象并在这些对象上调用 `getInfo()`。

```javascript
const ob1 = { name: 'alex', age: 25 };
const ob2 = { name: 'marcus', age: 23 };

getInfo.call(ob1); // Name: alex, Age: 25
getInfo.call(ob2); // Name: marcus, Age: 23
```

`call` 设置了函数内部的 `this` 关键字的值。

### `apply`

`apply` 方法类似于 `call`，但它在传递参数的方式上有所不同。考虑一个带有参数的函数：

```javascript
function getInfo(a, b) {
    console.log(`Name: ${this.name}, Age: ${this.age}`);
    console.log(`Args: ${a} and ${b}`);
}

const obj = {
    name: 'alex',
    age: 25
};
```

### `bind`

`bind`用于创建一个新函数，该函数的`this`关键字被设置为一个对象。我们使用上面的`getInfo`函数作为例子。

```javascript
const obj = {
    name: 'alex',
    age: 25
};

const objGetInfo = getInfo.bind(obj, 2, 3);
objGetInfo();
```

当`bind`在`getInfo()`函数上调用时，它返回一个绑定到`obj`的新函数。现在，每次调用`objGetInfo()`函数时，`this`关键字都指向`obj`。

这三种方法都很相似。也就是说，它们设置了`this`关键字的值。然而，`bind`的一个关键区别在于它返回一个新函数，而`call`和`apply`只是简单地调用函数。

## 什么是原型和原型继承？

继承是面向对象编程中的一个概念，它允许一个对象从另一个对象继承属性和方法。然而，在JavaScript中，继承的工作方式有所不同。

在JavaScript中，每个对象都有一个链接到另一个对象的属性，称为原型。原型本身是一个对象，可以拥有自己的原型，从而形成原型链。当我们达到一个等于`null`的原型时，这条链就结束了。

让我们通过一个例子来理解。

```javascript
let animal = {
    eats: true,
    walk() {
        console.log("Animal is walking");
    }
};

const rabbit = Object.create(animal);
rabbit.jumps = true;
rabbit.walk(); // Animal is walking
```

`Object.create` 创建了一个新的对象 `rabbit`，其原型设置为 `animal`。你也可以为新对象设置其他属性。

此外，`walk()` 方法并不存在于 `rabbit` 上，所以它会去查找对象的原型 `animal`。这意味着 `rabbit` 对象继承了 `animal` 对象的属性和方法。

你也可以在任何对象上使用 ES6 的 `Object.setPrototypeOf` 方法。

```javascript
const dog = {
    bark() {
        console.log("Dog barking");
    }
};

Object.setPrototypeOf(dog, animal);
console.log(dog.eats); // true
dog.walk(); // Animal is walking
```

你也可以使用函数作为构造函数，并使用 `prototype` 属性设置其原型。

```javascript
function Animal(name) {
    this.name = name;
}

Animal.prototype.walk = function () {
    console.log(`${this.name} is walking`);
};
```

你可以在以下文章中了解更多关于 JavaScript 原型和继承的信息，作者是 [Germán Cocca][29]。

[

JavaScript 原型和继承 —— 为什么说 JS 中的一切都是对象

大家好！在这篇短文中，我们将讨论 JavaScript 中的原型继承，以及它的意义。 目录 \* 引言 \* 如何在 JavaScript 中访问原型的属性和方法 \* 原型链 \* 基于原型的语言 \* Javascript c…

![favicon](https://cdn.freecodecamp.org/universal/favicons/favicon.ico)Germán Cocca freeCodeCamp.org

![pexels-maor-attias-5192478](https://www.freecodecamp.org/news/content/images/2022/04/pexels-maor-attias-5192478.jpg)

][30]

## 如何使用扩展运算符

扩展运算符用于将数组或对象的内容展开为单个元素，或将多个元素收集到一个对象中。它有以下用例：

扩展运算符可以用于将一个数组复制到一个新的数组中：

```javascript
const arr1 = [2, 4, 5];
const arr2 = [...arr1];
```

`arr1` 和 `arr2` 是完全不同的对象，如使用等号运算符所示。

你还可以在创建一个新对象时复用一个对象中的字段：

```javascript
const obj1 = { name: 'kunal', age: 23 };
const obj2 = { ...obj1, gender: 'male', city: 'Mumbai' };

console.log(obj2); // { name: 'kunal', age: 23, gender: 'male', city: 'Mumbai' }
```

你可以将传递给函数的多个参数收集到一个数组中。

```javascript
function fun1(...args) {
    console.log(args);
}

fun1(1, 2, 3, 4, 5); // [ 1, 2, 3, 4, 5 ]
```

或者你可以将数组中的元素作为单独的参数传递给函数。

```javascript
function fun2(a, b) {
    console.log(`${a} and ${b}`);
}

const numbers = [1, 2];
fun2(...numbers);
```

## 数组和对象解构是如何工作的？

类似于扩展运算符，你可以将数组或对象的元素展开为单独的变量。

```javascript
const arr = [1, 2, 3];
const [a, b, c] = arr;

console.log(a); // 1
console.log(b); // 2
console.log(c); // 3
```

```javascript
const obj = { name: 'kunal', age: 22, gender: 'male' };
const {name, age, gender} = obj;

console.log(name); // kunal
console.log(age); // 22
console.log(gender); // male
```

## 什么是 Promise？

Promise 是 JavaScript 中非常重要的概念，几乎必定会在面试中被问到。Promise 用于 JavaScript 中的异步操作，比如超时或 API 调用。

Promise 使用一个名为 [Promise][31] 的对象，它有三种状态：待定（pending）、已实现（fulfilled 或 resolved）和已拒绝（rejected）。当异步操作结束时，Promise 会变为已实现（成功）或已拒绝（失败）。

让我们来看一个简单的例子：

```javascript
function asyncOperation() {
    return new Promise((resolve, reject) => {
        const x = 1 + Math.random() * 10;
        if (x < 5) 
            resolve("Successful");
        else 
            reject("Error");
    });
}
```

上述函数返回一个执行异步操作的 Promise。

-   如果操作成功，调用 `resolve` 方法表示 Promise 已经实现。
-   如果操作失败，调用 `reject` 方法表示 Promise 已被拒绝。
```

```javascript
asyncOperation()
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });
```

-   `then` 方法接收一个回调函数，当 promise 被解决时执行。它接收一个响应对象作为参数，该对象等于你在 `resolve` 方法中传递的对象。
-   `catch` 方法接收一个回调函数，当 promise 被拒绝时执行，并接收一个在 `reject` 方法中传递的错误对象作为参数。

上面的代码随机打印 "Successful" 和 "Error"。

除了基础知识，Promise 对象还包含一些处理多个 promise 的有用方法：`[Promise.all()][32]`, `[Promise.any()][33]`, `[Promise.race()][34]`。

阅读以下教程以详细了解 promises：

[

JavaScript Promise 教程 – 如何在 JS 中解析或拒绝 Promises

Promises 是JavaScript中用于异步操作的重要构建块。你可能认为 promises 不太容易理解、学习和使用。相信我，你并不是唯一这样觉得的人！很多 web 开发者，即使花费多年时间与 promises 一起工作，也会觉得这个过程充满挑战。在本...


![cover-1](https://www.freecodecamp.org/news/content/images/2020/11/cover-1.png)

## 如何使用 `async` 和 `await` 关键字

`await` 关键字会暂停函数的执行，直到一个 promise 被解决或拒绝。`await` 只能在 `async` 函数内部使用。让我们看一个例子：

```javascript
function dataPromise() {
    return new Promise(resolve => {
        setTimeout(() => resolve("数据已获取"), 500);
    });
}

async function fetchData() {
    try {
        const res = await dataPromise();
        console.log(res); // 数据已获取 (500毫秒后)
    } catch(err) {
        console.log(err);
    }
}

fetchData();
```

当 `dataPromise()` 被调用时，函数的执行会暂停500毫秒。在 promise 被解决后，执行会继续。为了处理错误，可以用 `try-catch` 代码块将代码包围起来。

`await` 关键字还使处理一个接一个运行的多个 promise 变得更简单。

```javascript
function promise1() {
    return new Promise(resolve => {
        setTimeout(() => resolve("Promise 1 已解决"), 500);
    });
}

function promise2() {
    return new Promise(resolve => {
        setTimeout(() => resolve("Promise 2 已解决"), 300);
    });
}

async function fetchData() {
    try {
        const res1 = await promise1();
        console.log(res1); // Promise 1 已解决 (500毫秒后)
        const res2 = await promise2();
        console.log(res2); // Promise 2 已解决 (300毫秒后)
    } catch(err) {
        console.log(err);
    }
}
```

`async` 和 `await` 让处理 promises 更加容易，并且通过消除代码中的嵌套，使代码更干净和易读。

## 什么是事件循环？

事件循环解释了异步操作和事件处理背后的机制。这是 JavaScript 的一个关键概念，解释了其运行时模型，因此也是面试中最常被问到的问题之一。

与其提供简短的解释，我认为你应该详细学习并充分理解它。阅读 [MDN 文档][36] 以图解的方式详细了解事件循环。

如果你喜欢视频，你也可以观看 Philip Roberts 的以下视频：

<iframe width="356" height="200" src="https://www.youtube.com/embed/8aGhZQkoFbQ?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen="" title="What the heck is the event loop anyway? | Philip Roberts | JSConf EU" name="fitvid0"></iframe>

事件传播发生在事件被目标元素及其所有祖先元素捕获和处理时。来看以下例子：

```html
<body>
    <div id="box"> <button id="button">Click Me</button> </div>
    <script src="script.js"></script>
</body>
```

当你点击按钮时，你也同时点击了 `div` 元素和 `body` 元素。事件在整个 DOM 树中传播。让我们为上述所有元素添加事件处理程序：

```javascript
document.body.addEventListener("click", () => {
    console.log("Body clicked");
});

document.getElementById("box").addEventListener("click", () => {
    console.log("div clicked");
});

document.getElementById("button").addEventListener("click", () => {
    console.log("Button clicked");
});
```

事件传播有两种方式：

### 事件冒泡

当按钮被点击时，首先调用按钮的事件处理程序。然后，事件在 DOM 树中冒泡，并依次调用所有父元素的事件处理程序，从最近的父元素到最高的祖先元素。即：分别是 `div` 和 `body` 元素。

事件冒泡

### ‌事件捕获

这与事件冒泡类似，但顺序相反。事件首先被根元素捕获，然后沿着 DOM 树向下传递到目标元素。

事件处理程序按照顺序从根元素开始调用，一直到目标元素。这可以通过在 `addEventListener()` 函数中传递 `true` 作为第三个参数来实现。‌

```javascript
document.body.addEventListener("click", () => {
    console.log("Body clicked");
}, true);
```

![image-53](https://www.freecodecamp.org/news/content/images/2024/05/image-53.png)

事件捕获

然而，这看起来有些适得其反。毕竟，用户只想点击按钮，他们并不知道 DOM 树的结构。所以，为了防止这种行为，我们可以使用 `stopPropagation()` 方法。

```javascript
document.getElementById("button").addEventListener("click", (event) => {
    event.stopPropagation();
    console.log("Button clicked");
});
```

c

![image-54](https://www.freecodecamp.org/news/content/images/2024/05/image-54.png)

## 什么是生成器函数？

生成器函数是一种特殊类型的函数，可以暂停其执行并在稍后恢复。它们还会在每次暂停执行时返回一个值。

生成器函数可以用来以迭代的方式返回一系列值，而不是像普通函数那样只返回一次。

以下是一个生成器函数的基本例子：

```javascript
function* generatorFunction() {
    yield 1;
    yield 2;
}
```

生成器函数用 `function*` 声明，并使用 `yield` 关键字来暂停执行和返回一个值。上述语法创建了一个 [GeneratorFunction][37] 对象。

```javascript
const gen = generatorFunction()
```

该对象使用一个 [iterator][38] 来执行生成器函数。迭代器提供一个 `next()` 方法，该方法执行函数的主体，直到下一个 yield 语句，并返回一个包含产生值和 `done` 属性（布尔值）的对象，`done` 属性指示生成器函数是否已到达末尾。

让我们调用生成器函数：

‌这里，第一次调用 `next()` 返回 1，第二次调用返回 2。最后一次调用不返回任何值，并设置 `done` 标志为 true，因为没有更多的 `yield` 语句。

你也可以使用 `for` 循环来遍历一个生成器函数：

```javascript
for(value of generatorFunction()) {
  console.log(value)
}
```

通过这种方式，你可以在任何时候进入和退出函数来控制生成器函数的执行。

## 如何实现 `Array.map()`、`Array.reduce()` 和 `Array.filter()` 的 Polyfill

自从 JavaScript 诞生以来，它已经有了很多发展。JavaScript 增加了许多以前不存在的方法和结构。大多数现代浏览器都使用最新版本的 JavaScript。

然而，仍有一些应用在使用旧版本 JavaScript 的旧浏览器上运行。像 `map`、`reduce` 和 `filter` 这样的数组方法可能不存在。因此，你可能需要为这些方法提供 polyfills。

Polyfills 是一些代码片段，它们为不支持现代功能的旧浏览器提供了这些功能。这确保了你的代码能够在不同的浏览器和版本上无缝运行。

在我们的例子中，我们将为 `Array.map`、`Array.reduce` 和 `Array.filter` 方法编写 polyfills。这意味着我们将编写自己的实现，而不是使用默认的实现。

### `Array.map`

此方法接受一个回调函数作为参数，在每个数组元素上执行，并返回一个新的、修改后的数组。

回调函数接受三个参数：数组元素、索引和数组本身。后两个参数是可选的。

```javascript
Array.prototype.map = function(callback) {
  var newArray = [];
  for (var i = 0; i < this.length; i++) {
    newArray.push(callback(this[i], i, this));
  }
  return newArray;
};
```

逻辑很简单。为数组的每个元素调用函数，并将每个值附加到新的数组中。`this` 关键字是调用该函数的对象，在这种情况下，是数组。

### `Array.filter`

此方法也接受一个回调函数作为参数。回调函数在每个数组元素上运行一个条件并返回一个布尔值。`filter` 方法返回一个新的、过滤后的数组，其中包含满足条件的元素。

```javascript
Array.prototype.filter = function(callback) {
  var filteredArr = [];
  for (var i = 0; i < this.length; i++) {
    var condition = callback(this[i], i, this);
    if (condition) {
      filteredArr.push(this[i]);
    }
  }
  return filteredArr;
};
```

在这里，使用回调函数返回的布尔值将元素添加到新数组中。

### `Array.reduce`

此方法接收一个回调函数和一个初始值作为参数，并将数组简化为一个单一值。这是通过在累加器和当前值上执行函数并将结果存储到累加器中来完成的。

回调函数接受四个参数：累加器、当前元素、索引和数组本身。后两个参数是可选的。

```javascript
Array.prototype.reduce = function(callback, initialValue) {
    var accumulator = initialValue;
    for (var i = 0; i < this.length; i++) {
        if (accumulator !== undefined) {
            accumulator = callback(accumulator, this[i], i, this);
        } else {
            accumulator = this[i];
        }
    }
    return accumulator;
};
```

让我们测试这些方法：

```javascript
const arr = [1, 2, 3];
console.log(arr.map(ele => ele * 2)); // [ 2, 4, 6 ]
console.log(arr.filter(ele => ele < 2)); // [ 1 ]
console.log(arr.reduce((total, ele) => total + ele, 0)); // 6
```

**注意：** 在为任何属性添加 polyfill 之前，始终检查该属性是否存在于对象的原型上，否则您可能会覆盖现有的行为。例如：

```javascript
if (!Array.prototype.map)
```

## 额外思考

在结束之前，我想分享一些额外的想法。破解 JavaScript 面试不仅仅是记住概念。确保你深入研究每个主题并彻底理解它，包括它的应用。

另外，不要低估软技能的重要性，比如沟通。清晰地向面试官传达你的想法和了解你的内容一样重要。

当你被问到上面任何一个概念的问题时，首先简要解释概念，然后通过一个例子进行更详细的解释。

最后，在准备面试的过程中不断重温这个手册。请随时将其用作备忘单。如果你是一名有经验的开发人员，这本手册也将帮助你重温和巩固这些概念。

## 结论

面试可能相当可怕且不可预测。虽然对 JavaScript 技能的需求很高，但竞争也同样激烈。建立坚实的基础对于成功的面试准备至关重要。

在这本手册中，我概述了为你的下一次 JavaScript 面试做好准备的几个重要话题，并对每个概念进行了详细解释。虽然这不是一个详尽的列表，但它涵盖了几个关键概念。如果你认为我遗漏了任何重要话题，请告诉我。

如果你无法理解内容或觉得解释不令人满意，请在下方发表评论表达你的想法。新想法总是受到欢迎的！请随时在 Twitter 上联系我。

祝你面试好运！！！

---

![Kunal Nalawade](https://www.freecodecamp.org/news/content/images/size/w60/2023/01/prof.jpeg)

