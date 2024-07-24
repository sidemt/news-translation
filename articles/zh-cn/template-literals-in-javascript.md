---
title: 如何在 JavaScript 中使用模板字面量
date: 2024-07-24T02:59:49.121Z
author: Benjamin Semah
authorURL: https://www.freecodecamp.org/news/author/benjamin-semah/
OriginalURL: https://www.freecodecamp.org/news/template-literals-in-javascript/
Proofreader: ""

---

模板字面量是 JavaScript 中的一项特性，于 ES6 中引入。它们为在 JavaScript 中处理字符串提供了一种更灵活和可维护的方式。

<!-- more -->

在本文结束时，你将了解如何使用模板字面量。你将学习语法、优点及一些使用案例。你还将了解一种更强大的特性，称为标记模板字面量。

## 目录

-   [什么是模板字面量？][1]
-   [模板字面量与普通字符串的比较][2]
-   [模板字面量的一些使用案例][3]
-   [标记模板字面量][4]
-   [标记模板字面量的示例][5]
-   [结论][6]

## 什么是模板字面量？

模板字面量是 JavaScript 中的一项特性，它让开发者以一种方便的方式处理字符串。你可以使用双引号 `""` 或单引号 `''` 表示普通字符串。

但使用模板字面量时，你可以使用反引号 ` `` ` 来表示字符串。这让你可以在字符串中嵌入变量和表达式。

以下是一个例子：

```javascript
const website = 'freeCodeCamp'
const message = `Welcome to ${website}`

console.log(message)
```

![Screenshot-2024-01-03-at-6.57.20-AM](https://www.freecodecamp.org/news/content/images/2024/01/Screenshot-2024-01-03-at-6.57.20-AM.png)

模板字面量示例的输出。

`message` 变量的值是一个模板字面量的例子。它包括用于定义模板字面量的反引号。它还包括用于在字符串中嵌入变量的 `${}` 语法。

## 模板字面量与普通字符串的比较

现在让我们看看模板字面量与普通字符串有何不同，以及使用模板字面量的一些优点。

### 字符串连接

在引入模板字面量之前，当你想连接字符串时，你必须使用加号 `+`。

```javascript
const userName = 'Marie'
const balance = 10

// 使用普通字符串
const str1 = 'Hi ' + userName + ',' + ' your balance is ' + balance + '.'
console.log("Regular string: ", str1)

// 使用模板字面量
const str2 = `Hi ${userName}, your balance is ${balance}.`
console.log("Template literal: ", str2)
```

![Screenshot-2024-01-03-at-7.07.37-AM](https://www.freecodecamp.org/news/content/images/2024/01/Screenshot-2024-01-03-at-7.07.37-AM.png)

普通字符串和模板字面量在这个示例中产生相同的输出。

注意，使用普通字符串时需要添加许多加号，并且还需要在正确的位置考虑空格。这在处理较长字符串时会难上加难。

在模板字面量的示例中，不需要添加任何加号。你可以将所有内容一起写成一个字符串。使用 `${}` 语法可以直接嵌入变量。

### 多行字符串

另一个使处理字符串变得更容易的地方是多行字符串。对于普通字符串，你不得不使用加号 `+` 和 `\n` 的组合来表示新行。但模板字面量不需要这些。

```javascript
const regularString = 
'Hello there! \n' +
'Welcome to our website. \n' +
'How can we help you today?'

const templateLiteral = 
`Hello there!
Welcome to our website.
How can we help you today?`

console.log(regularString)
console.log(templateLiteral)
```

![Screenshot-2024-01-03-at-7.44.20-AM](https://www.freecodecamp.org/news/content/images/2024/01/Screenshot-2024-01-03-at-7.44.20-AM.png)

多行字符串的普通字符串和模板字面量示例。

`regularString` 和 `templateLiteral` 变量产生相同的输出。模板字符串会自动识别空格和换行。

### 可读性和可维护性

模板字面量还使你的代码更具可读性和更容易维护。正如你已经看到的，它们不需要使用加号 `+` 进行连接。你也无需担心转义引号。

这是一个例子：

```javascript
const city = "Paris"
const str1 = 'She said, "I love ' + city + ', it\'s a beautiful place."'
const str2 = `She said, "I love ${city}, it's a beautiful place`

console.log(regularString)
console.log(templateLiteral)
```

![Screenshot-2024-01-04-at-7.00.42-AM](https://www.freecodecamp.org/news/content/images/2024/01/Screenshot-2024-01-04-at-7.00.42-AM.png)

普通字符串和模板字面量示例的结果

与模板字面量不同，普通字符串需要以下内容：

- 使用加号 `+` 进行连接。
- 小心使用单引号和双引号。
- 需要在字符串中使用 `\` 转义单引号。

## 模板字面量的一些实际使用案例

到目前为止，你已经了解了什么是模板字面量，以及它们与普通字符串的比较。现在，让我们看一些实际示例。

你会经常看到模板字面量用于生成 HTML 标记。它们允许你将 JavaScript 表达式直接嵌入到 HTML 字符串中。这使得创建动态和数据驱动的内容变得容易。

例如：

```javascript
const user = {
  name: "Marie",
  age: 25,
};

const userProfile = `
<div>
  <h2>Name: ${user.name}</h2>
  <p>Age: ${user.age}</p>
</div>
`
```

注意 `${}` 语法如何允许你在字符串中直接运行 JavaScript 表达式。在此案例中，它被用来读取 `user` 对象属性的值。

### 创建动态 SQL 查询

你还可以使用模板字面量通过直接将变量或表达式嵌入到查询字符串来创建动态 SQL 查询。这意味着你可以基于运行时值轻松创建查询。

例如：

```javascript
const tableName = "users";
const columnName = "name";
const searchValue = "John";

const sqlQuery = 
  `SELECT * FROM ${tableName} WHERE ${columnName} = '${searchValue}'`
```

### 本地化和国际化

模板字面量的另一个实际用途是在应用程序中处理本地化和国际化。使用模板字面量，你可以将本地化内容或语言键直接嵌入到字符串中，更容易管理翻译。

例如：

```javascript
const user = {
  name: "Marie",
};

const locale = "fr";
const greetings = {
  en: "Hello",
  es: "Hola",
  fr: "Bonjour"
};

const localizedGreeting = `${greetings[locale]} ${user.name}!`;
console.log(localizedGreeting)
```

![Screenshot-2024-01-04-at-7.51.34-AM](https://www.freecodecamp.org/news/content/images/2024/01/Screenshot-2024-01-04-at-7.51.34-AM.png)

使用模板字面量进行本地化内容的示例。

这个例子创建了一个 `localizedGreeting` 字符串而不依赖任何繁琐的连接。

## 标签模板字面量

这是 JavaScript 模板字面量的一个功能，可以用于执行高级字符串操作。

要使用此功能，你需要一个标签函数和一个标签模板。

标签函数接收一个字符串和多个变量作为参数，然后根据你设置的某些条件或规则格式化它们。

然后，你通过将标签函数放在模板字面量的反引号前面来调用（或运行）该标签函数。

### 标签模板字面量的语法

```JavaScript
function taggedFunc(strings, ...values) {
  console.log(strings)
  console.log(values)
}

const name = 'Sarah'
const city = 'Rome'

taggedFunc`Hello ${name}. Welcome to ${city}.`
```

![Screenshot-2024-01-04-at-10.03.12-AM](https://www.freecodecamp.org/news/content/images/2024/01/Screenshot-2024-01-04-at-10.03.12-AM.png)

记录标签模板字面量的字符串和值参数的结果

这里有三点需要注意。

首先，第一个参数（本例中为 `strings`）始终是模板字面量中所有字符串块的数组。在这种情况下，它是下面的数组。

```javascript
['Hello ', '. Welcome to ', '.']
```

接下来，其余参数将是所有模板字面量中的变量和评估表达式。JavaScript 的剩余参数语法 `...values` 使获取所有这些变得简单。

```javascript
['Sarah', 'Rome']
```

最后，注意如何使用 `taggedFunc`。与常规函数不同，你不会用括号调用它，而是将其附加在模板字面量的第一个反引号之前。

```javascript
taggedFunc`Hello ${name}. Welcome to ${city}.` ✅

taggedFunc(Hello ${name}. Welcome to ${city}.) ❌
```

## 标签模板字面量的实际例子

现在让我们看看一些使用标签模板字面量处理字符串操作的实际例子。

### 例子 1

```javascript
function receiptTag(strings, ...values) {  

  let finalString = ''
  for (let i = 0; i < values.length; i++) {
    finalString += strings[i] + values[i]
  }

  // 添加最后一个字符串字面量
  finalString += strings[strings.length - 1] 

  return finalString
}

const item = 'apple'
const price = 2.5
const quantity = 3

const message = receiptTag`
  You have ${quantity} ${item}s.
  Unit cost: $${price}. 
  Total cost: $${quantity * price}.
`

console.log(message)
```

![Screenshot-2024-01-04-at-10.37.18-AM](https://www.freecodecamp.org/news/content/images/2024/01/Screenshot-2024-01-04-at-10.37.18-AM.png)

使用标签模板字面量格式化字符串的示例。

在此示例中，`recieptTag` 函数接收一个包含四个表达式的模板字面量:

- `${quantity}`
- `${item}`
- `${price}`
- `${quantity * price}`

`values` 数组将包含这些表达式的评估值。

```javascript
[3, 'apple', 2.5, 7.5]
```

你可以在标签函数中相应地处理它们。

结果，记录到控制台的是包含数量、项目、单价和总成本信息的 `message`。

### 例子 2

```javascript
function greetUser(strings, name) {
  const now = new Date()
  const currentHour = now.getHours()
  
  const timeOfDay = currentHour < 12 ? 'morning' : currentHour < 17 ? 'afternoon' : 'evening'
  
  return `Good ${timeOfDay} ${name}${strings[1]}`
}

```


```javascript
console.log(greetUser`Hello ${userName}, nice to meet you!`)
```

这个例子使用标记模板字面量来根据一天中的时间来确定如何问候用户。

该函数首先使用日期对象获取当前小时。然后使用三个运算符来确定一天中的时间。并返回一个带有 `timeOfDay` 变量的字符串，指示一天中的时间。

此外，请注意日志语句的第一个词，并将其与传递给标记的字符串的第一个词进行比较，以查看函数如何更改了字符串。

## 结论

模板字面量为在 JavaScript 中处理字符串提供了一种方便的方法。在本文中，您了解了语法，以及如何在项目中使用它们。

您还了解了模板字面量的一个高级功能：标记模板字面量。这些是接收字符串块和表达式数组的函数。它们根据您为函数编写的逻辑返回一个字符串。

感谢阅读。祝编码愉快！如需更深入的教程，请随时[订阅我的 YouTube 频道][8]。

[1]: #what-are-template-literals
[2]: #template-literals-vs-regular-strings
[3]: #some-practical-use-cases-of-template-literals
[4]: #tagged-template-literals
[5]: #practical-example-of-tagged-template-literal
[6]: #conclusion
[7]: https://www.freecodecamp.org/news/javascript-rest-vs-spread-operators/
[8]: https://www.youtube.com/@DevAfterHours
```

