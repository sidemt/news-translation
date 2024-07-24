---
title: How to Use Template Literals in JavaScript
date: 2024-07-24T02:59:49.121Z
author: Benjamin Semah
authorURL: https://www.freecodecamp.org/news/author/benjamin-semah/
OriginalURL: https://www.freecodecamp.org/news/template-literals-in-javascript/
Proofreader: ""

---

Template literals are a feature in JavaScript that were introduced with ES6. They give you a more flexible and maintainable way of working with strings in JavaScript.

<!-- more -->

By the end of this article, you will know how to use template literals. You will learn the syntax, the benefits, and some use cases. And you will also learn about an even more powerful feature called tagged template literals.

## Table of Contents

-   [What are Template Literals?][1]
-   [Template Literals vs Regular Strings][2]
-   [Some Use Cases of Template Literals][3]
-   [Tagged Template Literals][4]
-   [Examples of Tagged Template Literals][5]
-   [Conclusion][6]

## What are Template Literals?

Template literasl are a feature in JavaScript that let developers work with strings in a convenient way. You denote regular strings in JavaScript using double quotes `""` or single quotes `''`.

But with template literals, you denote strings using backticks ` `` `. This lets you embed variables and expressions within your strings.

Here's an example:

```javascript
const website = 'freeCodeCamp'
const message = `Welcome to ${website}`

console.log(message)
```

![Screenshot-2024-01-03-at-6.57.20-AM](https://www.freecodecamp.org/news/content/images/2024/01/Screenshot-2024-01-03-at-6.57.20-AM.png)

Output of template literal example.

The value of the `message` variable is an example of a template literal. It includes backticks which are used to define the template literal. And it also includes the syntax `${}` which is used to embed variables within the string.

## Template Literals vs Regular Strings

Let's now take a look at how template literals differ from regular strings and also some of the benefits of using template literals.

### String Concatenation

Before the introduction of template literals, you had to use the plus `+` symbol when you wanted to concatenate strings.

```javascript
const userName = 'Marie'
const balance = 10

// Using regular string
const str1 = 'Hi ' + userName + ',' + ' your balance is ' + balance + '.'
console.log("Regular string: ", str1)

// Using template literal
const str2 = `Hi ${userName}, your balance is ${balance}.`
console.log("Template literal: ", str2)
```

![Screenshot-2024-01-03-at-7.07.37-AM](https://www.freecodecamp.org/news/content/images/2024/01/Screenshot-2024-01-03-at-7.07.37-AM.png)

The regular string and template literal produce the same output for the example.

Note how using regular strings involves adding many plus signs. And also accounting for whitespace at the right places. This can get difficult to deal with when working with lengthy strings.

With the template literal example, there was no need to add any plus signs. You write everything together as a single string. The variables are directly embedded using the `${}` syntax.

### Multi-line Strings

Another way template literals make it easier to work with strings is when dealing with multi line strings. For regular strings, you have to use a combination of the plus `+` sign and `\n` to denote a new line. But template literals don't require any of that.

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

Multi line string examples for regular string and template literal.

Both the `regularString` and `templateLiteral` variables give the same output. The template string recognises whitespaces and linebreaks automatically.

### Readability and Maintainability

Template literals also make your code more readable and easier to maintain. As you've seen already, they doesn't require any concatenation with the plus `+` sign. And you also don't need to worry about escaping quotations marks.

Here's an example:

```javascript
const city = "Paris"
const str1 = 'She said, "I love ' + city + ', it\'s a beautiful place."'
const str2 = `She said, "I love ${city}, it's a beautiful place`

console.log(regularString)
console.log(templateLiteral)
```

![Screenshot-2024-01-04-at-7.00.42-AM](https://www.freecodecamp.org/news/content/images/2024/01/Screenshot-2024-01-04-at-7.00.42-AM.png)

Results of regular string and template literal examples

Unlike the template literal, the regular string requires the following;

-   The use of the plus `+` for concatenation.
-   Careful use of single and double quotes.
-   The need to escape the single quote in string with `\`.

## Some Practical Use Cases of Template Literals

So far, you've learned what template literals are and how they compare with regular strings. Now, let's look at some practical examples.

### Generating HTML Markup

You will often see template literals used for generating HTML markup. They allow you to embed JavaScript expressions directly into HTML strings. This makes it easy to create content that's dynamic and data driven.

Example:

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

Note how the `${}` syntax allows you to run JavaScript expressions directly within the string. In this case, it's used to read the values of the `user` object's properties.

### Creating Dynamic SQL Queries

You can also use template literals to create dynamic SQL queries by embedding variables or expressions directly into the query strings. This means you can easily create queries based on runtime values.

Example:

```javascript
const tableName = "users";
const columnName = "name";
const searchValue = "John";

const sqlQuery = 
  `SELECT * FROM ${tableName} WHERE ${columnName} = '${searchValue}'`
```

### Localization and Internalization

Another practical use of template literals is for handling localization and internationalization in your apps. It's easier to manage translations because with template literals, you can embed variables for localized content or language keys directly into strings.

Example:

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

Example of using template literals for localized content.

This example creates a `localizedGreeting` string without relying on any cumbersome concatenation.

## Tagged Template Literals

This is a feature of the JavaScript template literal that you can use to perform  advanced string manipulation.

To use this feature, you need a tag function and then a tagged template.

The tagFunction takes in a mix of strings and variables as arguments. It then formats them based on some condition or rules you set.

Then, you call (or run) the tag function by placing it before the opening backtick of the template literal.

### Syntax for Tagged Template Literal

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

Log results for the string and value arguments of a tagged template literal

There are three things to take note of here.

First, the first parameter (`strings` in this example) is always an array of all the blocks of strings in the template literal. In this case, it is the array below.

```javascript
['Hello ', '. Welcome to ', '.']
```

Next, the rest of the parameters will be all the variables and evaluated expressions within the template literals. The [JavaScript rest parameter][7] syntax `...values` makes it simple to get all of them.

```javascript
['Sarah', 'Rome']
```

Finally, take note of how the `taggedFunc` is used. Unlike a regular function, you won't call it with a parenthesis. But by attaching it before the first backtick of the template literal.

```javascript
taggedFunc`Hello ${name}. Welcome to ${city}.` ✅

taggedFunc(Hello ${name}. Welcome to ${city}.) ❌
```

## Practical Example of Tagged Template Literal

Now let's see some practical examples of using a tagged template literal to handle string manipulation.

### Example 1

```javascript
function receiptTag(strings, ...values) {  

  let finalString = ''
  for (let i = 0; i < values.length; i++) {
    finalString += strings[i] + values[i]
  }

  // Add the last string literal
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

Example of a string formatted with a tagged template literal.

In this example, the `recieptTag` function receives a template literal with four expressions:

-   `${quantity}`
-   `${item}`
-   `${price}`
-   `${quantity * price}`

The `values` array will contain the evaluated values of these expressions.

```javascript
[3, 'apple', 2.5, 7.5]
```

And you can process them accordingly in the tagged function.

The result, logged to the console is a `message` that includes information about the quantity, item, unit cost and total cost.

### Example 2

```javascript
function greetUser(strings, name) {
  const now = new Date()
  const currentHour = now.getHours()
  
  const timeOfDay = currentHour < 12 ? 'morning' : currentHour < 17 ? 'afternoon' : 'evening'
  
  return `Good ${timeOfDay} ${name}${strings[1]}`
}

const userName = 'Ama'

console.log(greetUser`Hello ${userName}, nice to meet you!`)
```

This example uses tagged template literal to determine how to greet the user based on what time of day it is.

The function first gets the current hour using the date object. Then uses a tenary operator to determin time of day. And returns a string with a `timeOfDay` variable indicating what time of day it is.

Also, pay attention to the first word of the log statement and compare it to the first word of the string passed to the tag to see how the function has changed the string.

## Conclusion

Template literals provide a convenient way to work with strings in JavaScript. In this article, you've learned about the syntax, and how to use them in your projects.

You also learned about an advanced feature of template literals: tagged template literals. These are functions that take in an array of string blocks and expressions. They return a string based on the logic you write for the function.

Thanks for reading. And happy coding! For more in-depth tutorials, feel free to [subscribe to my YouTube channel][8].

[1]: #what-are-template-literals
[2]: #template-literals-vs-regular-strings
[3]: #some-practical-use-cases-of-template-literals
[4]: #tagged-template-literals
[5]: #practical-example-of-tagged-template-literal
[6]: #conclusion
[7]: https://www.freecodecamp.org/news/javascript-rest-vs-spread-operators/
[8]: https://www.youtube.com/@DevAfterHours