---
title: 媒体查询 vs. 容器查询 —— 应该使用哪个及何时使用？
date: 2024-07-10T15:05:24.745Z
authorURL: ""
originalURL: https://www.freecodecamp.org/news/media-queries-vs-container-queries/
translator: ""
reviewer: ""
---

随着网络的发展，不断有新工具和新理念问世，旨在让我们的网页开发工作变得更加轻松。这意味着我们必须选择是坚持旧的方法还是完全弃用它们转而使用新工具。但这是否总需要一种非此即彼的解决方案呢？

<!-- more -->

在这种情况下，理想的做法是了解两种概念 —— 比较它们的优缺点，然后决定它们的最合适应用场景。本文将对 CSS 媒体查询和容器查询做这样的探讨。

## 目录

-   [响应式和内在网页设计](#响应式和内在网页设计)
-   [什么是媒体查询？](#什么是媒体查询)
-   [什么是容器查询？](#什么是容器查询)
-   [实际比较和主要差异](#实际比较和主要差异)
-   [什么时候应该使用哪个？](#什么时候应该使用哪个)
-   [结论](#结论)

## 响应式和内在网页设计

在 2010 年之前，网页开发者可以使用主要在桌面上显示的网站。这种情况直到 Ethan Marcotte 提出了响应式网页设计（RWD）的概念才有所改变。根据 MDN 的定义，响应式网页设计是一种面向多设备网络的设计方式。这促使了媒体查询作为 RWD 的一个组成部分被采用。

但最近出现了一种趋势，即 Jen Simmons 定义的内在网页设计 —— 创建上下文感知组件的需求。容器查询正是实现这一目标的工具。

## 什么是媒体查询？

媒体查询是一种基于满足特定条件来应用指定样式的规则。它们通常用于确保网站在各种设备上具有响应性，通过查询视口宽度来实现。

媒体查询的特点是一个 @media 规则，后跟一个括号中的条件及括号内的表达式，如果满足条件则将应用该表达式。因此，如果我们想根据设备的视口宽度更改 div 的背景色，可以这样操作：

```css
/* 移动设备 */
@media (max-width: 480px) {
  .mysite {
    background-color: red;
  }
}
```

在上述示例中，我们要求当视口宽度达到最大 480px 时，将类名为 mysite 的 <div> 的背景色设置为红色。

**提示**：max-width 用于假设一个桌面优先的设计，并在向下调整时目标定位更小的设备。如果是移动优先的设计，我们会使用 min-width 来定位更大的屏幕。

## 什么是容器查询？

容器查询是一种基于父容器的大小来应用指定样式的规则。它们回答了网页开发者们长期以来希望能响应页面内个别容器变化的需求，而不仅仅是整个视口的变化。

```css
.header {
   container: mysite / inline-size;
}

@container mysite (min-width: 600px) {
   .maincard {
	   grid-template-column: 1fr 1fr;
    }
   .item {
       background-color: green;
    }
}
```

如上代码所示，我们首先定义了一个容器，其子元素我们希望做出改变。在我们的例子中，我们希望对 header 容器内的 class 为 item 的元素进行更改。你可以通过给容器命名（可选）和指定类型来做到这一点。

接下来，使用 @container 规则，我们检查条件并在满足条件时应用一些样式。对于最小宽度 600px，我们希望背景色为绿色并设置两个网格列。

**提示**：你不直接定义一个容器以对该容器本身进行更改，而是对其子元素进行更改。这意味着如果我们想对 header 容器本身进行更改，我们必须将它嵌套在另一个容器中，例如容器 A，并查询 A 以影响其子元素 —— header。

## 媒体查询和容器查询比较

现在，我们了解了两者的工作原理，让我们看看它们在实际中的表现。下面的 CodePen 示例展示了一个四个元素的布局。前两个使用容器查询样式化，而后两个使用媒体查询样式化。你可以调整视口大小，查看元素如何响应。

![mqvscq-demo](https://www.freecodecamp.org/news/content/images/2024/06/mqvscq-demo.png)

媒体查询和容器查询 CodePen 示例：项目灵感来自 Miriam Suzanne。

参见 CodePen 上 Ophy Boamah ([@ophyboamah][9]) 的 [MQ vs CQ (来源 MS)][8]。

### 媒体查询和容器查询的主要区别

![comparetable](https://www.freecodecamp.org/news/content/images/2024/06/comparetable.png)

主要区别总结，详细解释如下

### 基于视口 vs. 基于容器

媒体查询基于视口（整个浏览器窗口）的大小应用样式。这意味着布局根据整体屏幕大小进行调整，使其适合在不同设备（如手机、平板电脑和桌面）上进行设计调整。

而容器查询基于包含它们的容器元素的大小应用样式。这使得单个组件可以根据自身大小，而不是视口大小来调整其外观，使它们在网页的不同部分中具有高度的灵活性和可重用性。

由于媒体查询依赖于视口大小，它们在创建真正模块化的组件时可能不太有效。调整页面某个部分的样式可能会无意中影响其他部分，尤其是在复杂的布局中。此外，在组件需要在较大布局中独立适应的情况下，它们可能会显得不足。这会导致 CSS 变得难以维护。

相比之下，容器查询通过允许基于容器大小定义样式来促进模块化和灵活性。这意味着你可以创建自包含、可适应的组件，并且可以在网站的不同部分重复使用而不会导致意外变化，从而增强了它们的可重用性。

这使得设计更加自适应，组件可以调整自己的布局和外观，这在现代、基于组件的设计系统中非常有用。

### 复杂性和维护

在大型项目中，管理大量媒体查询会变得很麻烦。随着断点和特殊情况的增加，CSS 会变得复杂且难以维护。随着时间的推移，这可能会导致代码库膨胀且管理起来困难。

容器查询可以简化大型项目中 CSS 的维护。通过保持样式的组件特定和上下文感知，CSS 变得更加有组织和模块化。这减少了管理全局断点的复杂性，使其更易于维护，从而导致一个更有组织的代码库。

## 你应该使用哪个以及什么时候使用？

![finalsection](https://www.freecodecamp.org/news/content/images/2024/06/finalsection.png)

媒体查询 vs 容器查询（图片来源：_[web.dev][11]_）

我们在前几节讨论的内容旨在帮助你做出明智的决定。在了解了这两个概念的比较和对比之后，现在考虑以下因素：

### 理解和舒适度

你对每个概念的理解如何？容器查询相对较新，但如果你花时间学习和实验，就像媒体查询一样，其学习曲线并不令人望而生畏。所以使用你理解并且更熟悉的那个在生产中使用，会让你的生活更轻松。

### 项目需求和复杂性

你正在使用的设计方法是什么，你的项目有多复杂？因为有时候你项目的设计方法会决定哪一种最适合你的需求。而且，项目越复杂，维护代码就越难，你需要使用那些你可以管理的。

### 未来趋势和协作

响应式设计的未来看起来越来越内在化。我们正在逐渐转向基于组件内容的响应性变化，容器查询在这里表现最佳。

但媒体查询似乎在短时间内不会消失，所以你可以一起使用它们，以实现跨多个设备的完美响应。

## 结论

容器查询允许在 CSS 中创建可重用组件的潜力令人兴奋——但它可能还没有准备好完全取代媒体查询以使网页响应。

目前，我们最好的选择是将它们一起使用，并在每个地方各取所需。通过进一步实验以内部消化每个的优缺点，可以确保做出正确的决定。

这里有一些有用的资源：

-   [freeCodeCamp on Media Queries][12]
-   [Ahmad Shadeed on Container Queries][13]
-   [How to Use Media Queries and Container Queries][14]

[1]: #responsive-and-intrinsic-web-design
[2]: #what-are-media-queries
[3]: #what-are-container-queries
[4]: #how-do-media-queries-and-container-queries-compare
[5]: #which-should-you-use-and-when
[6]: #conclusion
[7]: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design
[8]: https://codepen.io/ophyboamah/pen/YzbaROw
[9]: https://codepen.io/ophyboamah
[10]: https://codepen.io
[11]: http://web.dev/
[12]: https://www.freecodecamp.org/news/learn-css-media-queries-by-building-projects/
[13]: https://ishadeed.com/article/css-container-query-guide/
[14]: https://www.youtube.com/watch?v=2rlWBZ17Wes

