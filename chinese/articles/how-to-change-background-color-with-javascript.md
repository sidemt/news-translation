---
title: 如何使用 JavaScript 更改背景颜色 - JS 中的背景颜色和 HTML
date: 2024-06-28T16:21:26.464Z
author: Ihechikara Abba
authorURL: https://www.freecodecamp.org/news/author/Ihechikara/
originalURL: https://www.freecodecamp.org/news/how-to-change-background-color-with-javascript/
translator: ""
reviewer: ""
---

/ [#HTML][1]

<!-- more -->

# 如何使用 JavaScript 更改背景颜色 - JS 中的背景颜色和 HTML

![Ihechikara Abba](https://cdn.hashnode.com/res/hashnode/image/upload/v1709153015297/mkI7rPRBU.jpg)

[Ihechikara Abba][2]

  ![如何使用 JavaScript 更改背景颜色 - JS 中的背景颜色和 HTML](https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/_t-l5FFH8VA/upload/7dac186ffa0ba7f32d72ccf06d1d5baf.jpeg)

你可以使用 JavaScript 的元素 `style` 属性来为元素设置样式。在本文中，你将学习如何使用 JavaScript 更改背景颜色。

以下是你将构建的小项目的样子：

![显示五个按钮的图像，每个按钮都可以更改页面的背景颜色](https://cdn.hashnode.com/res/hashnode/image/upload/v1719585559018/23123259-9540-40c6-8f1f-3f444c154b2c.png)

[1]: https://www.freecodecamp.org/news/tag/html/
[2]: https://www.freecodecamp.org/news/author/Ihechikara/

你可以从[这里][3]获取项目的起始文件。

在 **index.html** 文件中有五个按钮，每个按钮将背景颜色更改为特定的值：

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Change BG Color With JS</title>
</head>
<body>
    <h1>Choose background color</h1>
    <button>Red</button>
    <button>Blue</button>
    <button>Green</button>
    <button>Yellow</button>
    <button>Reset</button>
​
    <script src="script.js"></script>
</body>
</html>
​
```

你不需要对 **style.css** 文件进行任何修改。它的目的是将页面元素居中，并将按钮样式设置为相同大小。

目前，点击按钮时没有任何反应。让我们在 **script.js** 文件中编写逻辑来实现这一功能。

## 如何使用 JavaScript 更改背景颜色

要使用 JavaScript 更改元素的背景颜色，可以使用元素的 `style` 属性：

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

在上面的代码中，我们创建了五个函数：`setBgGreen()`, `setBgRed()`, `setBgBlue()`, `setBgYellow()` 和 `defaultBgColor()`。

每个函数有一个共同点：它们都针对 `body` 元素。通过 `body` 元素（代表网页），我们访问了 `style.backgroundColor` 属性。该属性返回或设置元素的背景颜色。

因此：

-   `document.body.style.backgroundColor = 'green';` 在 `setBgGreen()` 函数中将 `body` 的背景颜色设置为绿色。
    
-   `document.body.style.backgroundColor = 'red';` 在 `setBgRed()` 函数中将 `body` 的背景颜色设置为红色。
    
-   `document.body.style.backgroundColor = 'blue';` 在 `setBgBlue()` 函数中将 `body` 的背景颜色设置为蓝色。
    
-   `document.body.style.backgroundColor = 'yellow';` 在 `setBgYellow()` 函数中将 `body` 的背景颜色设置为黄色。
    
-   `document.body.style.backgroundColor = 'white';` 在 `defaultBgColor()` 函数中将 `body` 的背景颜色设置为白色。
```

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

当你点击按钮时，你应该会看到页面的背景颜色根据按钮分配的颜色改变。

注意，这不仅适用于 `body` 元素。你也可以对页面的特定部分进行此操作。

例如，可以使用 `container.style.backgroundColor = "red"` 来更改 `id` 为 `container` 的 `div` 的背景颜色。

## 结论

在本文中，你学习了如何使用 JavaScript 通过元素的 `style` 属性来更改背景颜色。

