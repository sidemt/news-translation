---
title: 如何使用 JavaScript 更改背景颜色 – 在 JS 和 HTML 中设置背景颜色
date: 2024-06-28T16:21:26.464Z
author: Ihechikara Abba
authorURL: https://www.freecodecamp.org/news/author/Ihechikara/
originalURL: https://www.freecodecamp.org/news/how-to-change-background-color-with-javascript/
translator: ""
reviewer: ""
---

/ [#HTML][1]

<!-- more -->

# 如何使用 JavaScript 更改背景颜色 – 在 JS 和 HTML 中设置背景颜色

![Ihechikara Abba](https://cdn.hashnode.com/res/hashnode/image/upload/v1709153015297/mkI7rPRBU.jpg)

[Ihechikara Abba][2]

  ![如何使用 JavaScript 更改背景颜色 – 在 JS 和 HTML 中设置背景颜色](https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/_t-l5FFH8VA/upload/7dac186ffa0ba7f32d72ccf06d1d5baf.jpeg)

你可以使用元素的 `style` 属性通过 JavaScript 来设置元素样式。在本文中，你将学习如何使用 JavaScript 更改背景颜色。

以下是你将构建的迷你项目的外观：

![展示五个按钮的图像，每个按钮会改变页面的背景颜色](https://cdn.hashnode.com/res/hashnode/image/upload/v1719585559018/23123259-9540-40c6-8f1f-3f444c154b2c.png)



你可以在[这里][3]获取项目的启动文件。

在 **index.html** 文件中有五个按钮，每个按钮改变背景颜色为一个特定值：

```
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>使用 JS 更改背景颜色</title>
</head>
<body>
    <h1>选择背景颜色</h1>
    <button>红色</button>
    <button>蓝色</button>
    <button>绿色</button>
    <button>黄色</button>
    <button>重置</button>
​
    <script src="script.js"></script>
</body>
</html>
​
```

你不需要对 **style.css** 文件做任何改动。它的目的是将页面上的元素居中并使按钮具有相同的大小。

目前，当你点击按钮时什么也不会发生。让我们在 **script.js** 文件中编写实现逻辑。

## 如何用 JavaScript 改变背景颜色

要用 JavaScript 改变元素的背景颜色，你可以使用元素的 `style` 属性：

```
function setBgGreen() {
    document.body.style.backgroundColor = 'green';
}
​
function setBgRed() {
    document.body.style.backgroundColor = 'red';
}
​
function setBgBlue() {
    document.body.style.backgroundColor = 'blue';
}
​
function setBgYellow() {
    document.body.style.backgroundColor = 'yellow';
}
​
function defaultBgColor() {
    document.body.style.backgroundColor = 'white';
}
```

在上述代码中，我们创建了五个函数： `setBgGreen()`， `setBgRed()`， `setBgBlue()`， `setBgYellow()` 和 `defaultBgColor()`。

每个函数都有一个共同点：它们都针对 `body`。通过 `body` 元素（代表网页），我们访问了 `style.backgroundColor` 属性。该属性返回或设置元素的背景颜色。

所以：

-   `document.body.style.backgroundColor = 'green';` 在 `setBgGreen()` 函数中将 `body` 的背景颜色设置为绿色。
    
-   `document.body.style.backgroundColor = 'red';` 在 `setBgRed()` 函数中将 `body` 的背景颜色设置为红色。
    
-   `document.body.style.backgroundColor = 'blue';` 在 `setBgBlue()` 函数中将 `body` 的背景颜色设置为蓝色。
    
-   `document.body.style.backgroundColor = 'yellow';` 在 `setBgYellow()` 函数中将 `body` 的背景颜色设置为黄色。
    
-   `document.body.style.backgroundColor = 'white';` 在 `defaultBgColor()` 函数中将 `body` 的背景颜色设置为白色。
    


```
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>使用 JS 更改背景颜色</title>
</head>
<body>
    <h1>选择背景颜色</h1>
    <button onclick="setBgRed()">红色</button>
    <button onclick="setBgBlue()">蓝色</button>
    <button onclick="setBgGreen()">绿色</button>
    <button onclick="setBgYellow()">黄色</button>
    <button onclick="defaultBgColor()">重置</button>
​
    <script src="script.js"></script>
</body>
</html>
```

当你点击按钮时，你应该会看到页面的背景颜色变成按钮指定的颜色。

注意，这不仅仅适用于 `body` 元素。你也可以对页面的特定部分进行更改。

例如，一个 `id` 为 `container` 的 `div` 的背景颜色可以使用 `container.style.backgroundColor = "red"` 改变。

## 结论

在本文中，你学习了如何使用 JavaScript 通过元素的 `style` 属性来更改背景颜色。

