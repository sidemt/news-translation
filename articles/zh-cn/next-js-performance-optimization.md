---
title: 如何通过懒加载优化 Next.js 应用性能
date: 2024-07-21T13:52:19.504Z
author: TAPAS ADHIKARY
authorURL: https://www.freecodecamp.org/news/author/tapas/
OriginalURL: https://www.freecodecamp.org/news/next-js-performance-optimization/
Proofreader: ""

---

人们不喜欢使用缓慢的应用程序。初始加载时间对网络应用程序和网站来说非常重要。

<!-- more -->

一个加载时间超过3秒的应用程序被认为是缓慢的，可能会导致用户离开应用程序或网站。

`Next.js` 是一个基于 React 的框架，你可以用它来构建可扩展的、高性能的、快速的网络应用程序和网站。随着 Next.js 应用路由器版本中 [React 服务器组件][1] 的引入，开发人员有了一种新的思维模式，即“以服务器组件的方式思考”。它解决了 SEO 的问题，有助于创建 `零包大小` 的 React 组件，最终的结果是 UI 组件加载更快。

但你的应用程序可能并不总是关于服务器组件。你可能也需要使用客户端组件。同时，你可能希望在应用程序的初始加载时或按需加载它们（比如点击按钮时）。

在浏览器中加载客户端组件包括将组件代码下载到浏览器中，下载你在该客户端组件中导入的所有库和其他组件，以及 React 为确保组件正常工作而处理的一些额外事项。

根据用户的互联网连接和其他网络因素，整个客户端组件的加载可能需要一段时间，这可能会让用户无法更快地使用该应用程序。

这时 `懒加载` 技术可以派上用场。它们可以帮助你避免客户端组件在浏览器中的单一加载。

在本文中，我们将讨论几个在 Next.js 中用于优化客户端组件加载的懒加载技术。我们还将讨论一些你应该了解的边缘情况，以便更好地处理它们。

如果你也喜欢从视频内容中学习，这篇文章还可以作为视频教程在这里获得：🙂

<iframe width="356" height="200" src="https://www.youtube.com/embed/gq9bBZru78Y?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen="" title="Next.js Performance Optimization: Implementing Lazy Loading" name="fitvid0"></iframe>

在我们开始之前，有几件事要告诉你：

- 我们将编写一堆代码来构建一个应用程序，以演示懒加载技术。你可以从这个 GitHub 仓库中找到所有的源代码：[https://github.com/tapascript/nextjs-lazy-load][2]。但我强烈建议你在我们进行的时候自己编写代码，仅将该仓库作为参考。
- 你还可以访问在 Netlify 上公开部署的应用程序 [点击这里][3]。

让我们开始吧 🚀。哦对了，如果你是《猫和老鼠》的粉丝，你会更喜欢这个！

## ******目录******

- [什么是懒加载][4]?
- [Next.js 中的懒加载技术][5]
- [通过 dynamic import 和 next/dynamic 实现懒加载][6]
- [通过 React.lazy() 和 Suspense 实现懒加载][7]
- [如何懒加载命名导出的组件][8]
- [懒加载你的服务器组件][9]
- [我们应该懒加载 Next.js 中的所有客户端组件吗?][10]
- [下一步是什么?][11]

## 什么是懒加载?

在现代 web 应用程序开发中，我们不会将所有的逻辑都编码到一个 JavaScript/TypeScript 文件中，也不会将所有样式放入一个庞大的 CSS 文件中。相反，我们在源代码级别将它们拆分，创建逻辑模块、业务逻辑、表现组件和样式相关的文件。这有助于我们更好地组织代码。

然后我们使用在应用程序开发过程中构建阶段启动的东西，称为打包器。它为我们的脚本和样式创建包。一些著名的打包器有 Webpack、Rollup 和 Parcel 等。

![image-43](https://www.freecodecamp.org/news/content/images/2024/07/image-43.png)

打包器从源代码创建包

现在，当我们有了这些包，如果我们试图在浏览器中一起加载它们，我们会遇到一些缓慢的问题。这是因为需要将完整的包加载到浏览器中，用户界面才能正常工作。

![image-44](https://www.freecodecamp.org/news/content/images/2024/07/image-44.png)

加载一个庞大的包会导致较差的加载体验

因此，现代 web 开发库和工具系统允许我们将包分块加载，而不是等待庞大的包加载到浏览器中。

我们可能希望立即加载其中一些块，因为用户在应用程序加载时可能更早需要它们。同时，我们可能希望等到需要某些网页部分时再加载它们。

![image-45](https://www.freecodecamp.org/news/content/images/2024/07/image-45.png)

分块并加载所需内容



## Next.js 中的懒加载技术

在 Next.js 中，懒加载技术用于减少路由所需的 JavaScript 量。这有助于加快应用程序的初始加载性能。我们可以推迟加载客户端组件和导入的库，直到需要时再加载。

在 Next.js 中实现懒加载技术有两种方式：

-   使用 `next/dynamic` 包进行动态导入。
-   使用 `React.lazy()` 和 `Suspense` 的组合。

让我们通过代码示例来理解每种技术。

## 使用 `dynamic import` 和 `next/dynamic` 进行懒加载

`next/dynamic` 是 ReactJS 中 `React.lazy()` 和 `Suspense` 的结合。使用 next/dynamic 包进行动态导入是实现 Next.js 中懒加载的首选方法。

为了演示这一点，我们首先使用以下命令创建一个 Next.js 应用：

```bash
npx create-next-app@latest
```

您可以使用以下命令在本地启动应用：

```bash
## 使用 npm
npm run dev

## 使用 yarn
yarn dev

## 或者使用 pnpm、bun，随您喜欢！
```

现在在 `app/` 目录下创建一个名为 `components` 的文件夹。我们将所有组件创建在组件文件夹下。现在，在 `app/components/` 目录下创建一个名为 `tom` 的文件夹。最后，在 `app/components/tom/` 目录下创建一个名为 `tom.jsx` 的 React 组件，代码如下：

```js
// tom.jsx

const LazyTom = () => {
  return (
    <div className="flex flex-col">
      <h1 className="text-3xl my-2">The Lazy Tom</h1>
      <p className="text-xl my-1">
        Tom, named &quot;Jasper&quot; in his debut appearance, is a gray and white
        domestic shorthair cat 🐈. &quot;Tom&quot; is a generic name for a male cat. He is
        usually but not always, portrayed as living a comfortable, or even
        pampered life. Tom is no match for Jerry&apos;s wits.
      </p>
      <p className="text-xl my-1">
        Although cats typically chase mice to eat them, it is quite rare for Tom
        to actually try to eat Jerry. He tries to hurt or compete with him just
        to taunt Jerry, even as revenge, or to obtain a reward from a human,
        including his owner(s)/master(s), for catching Jerry, or for generally
        doing his job well as a house cat. By the final &quot;fade-out&quot; of each
        cartoon, Jerry usually gets the best of Tom.
      </p>
    </div>
  );
};

export default LazyTom;
```

解释上述代码：

-   我们创建了一个名为 `LazyTom` 的 ReactJS 组件。
-   这是一个简单的展示组件，包含一个标题和几段关于《猫和老鼠》中的猫 Tom 的描述。
-   最后，我们使用 `default` 导出了组件，以便在其他地方导入。

现在，在 `app/components/tom/` 目录下创建另一个名为 `tom-story.jsx` 的文件，代码如下：

```js
// tom-story.jsx

"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const LazyTom = dynamic(() => import("./tom"), {
    loading: () => <h1>Loading Tom&apos;s Story...</h1>,
});

function TomStory() {
    const [shown, setShown] = useState(false);

    return (
        <div className="flex flex-col m-8 w-[300px]">
            <h2 className="text-xl my-1">Demonstrating <strong>dynamic</strong></h2>
            <button
                className="bg-blue-600 text-white rounded p-1"
                onClick={() => setShown(!shown)}
            >
                Load 🐈 Tom&apos;s Story
            </button>

            {shown && <LazyTom />}
        </div>
    );
}

export default TomStory;
```

懒加载与 `dynamic` 的主要魔力在上述代码中体现：

-   我们使用 `"use client"` 指令创建了一个名为 `TomStory` 的客户端组件。
-   首先，我们导入了用于管理切换状态的 `useState` 钩子，以及用于懒加载之前创建的组件的 `next/dynamic` 的 `dynamic` 函数。
-   `dynamic` 函数接受一个返回导入组件的函数作为参数。您还可以通过配置可选的配置对象来提供自定义加载消息。
-   `dynamic()` 函数返回懒加载的组件实例，即 `LazyTom` （可以是任何名称）。但此组件尚未加载。
-   在 JSX 中，我们有一个切换按钮来显示和隐藏 `LazyTom` 组件。请注意，该组件将在第一次点击按钮时被懒加载到用户浏览器中。之后，如果您再次隐藏和显示它，除非我们强制刷新浏览器或清除浏览器缓存，否则不会重新加载 `LazyTom` 组件。
-   最后，我们默认导出了 `TomStory` 组件。

现在我们需要测试一下。为此，打开 `app/` 目录下的 `page.js` 文件，并将内容替换为以下代码：

```js
import TomStory from "./components/tom/tom-story";

export default function Home() {
  return (
    <div className="flex flex-wrap justify-center ">
      <TomStory />
    </div>
  );
}
```

现在通过 `http://localhost:3000` 在您的浏览器中访问该应用。您应该会看到一个按钮来加载汤姆的故事。同时，在 `网络` 选项卡上将列出一堆资源。这些是在应用程序初始化加载时需要的资源，已经下载到您的浏览器中。

来自 `tom.jsx` 的 `LazyTom` 组件尚未下载。这是因为我们还没有点击 `加载汤姆的故事` 按钮。

![Screenshot-2024-07-17-at-9.21.10-AM](https://www.freecodecamp.org/news/content/images/2024/07/Screenshot-2024-07-17-at-9.21.10-AM.png)

懒加载汤姆故事的按钮

现在，点击按钮。您应该会看到一条加载消息，然后组件将加载汤姆的故事。您现在可以在 `网络` 选项卡上看到 `tom.jsx` 组件，并且该组件已经在页面上渲染了汤姆的故事。

![Screenshot-2024-07-17-at-9.27.55-AM](https://www.freecodecamp.org/news/content/images/2024/07/Screenshot-2024-07-17-at-9.27.55-AM.png)

现在汤姆的故事已被懒加载

既然您已经体验了 `next/dynamic` 的 `dynamic` 函数如何帮助我们懒加载一个组件，接下来让我们看看使用 `React.lazy()` 和 `Suspense` 的另一种技术。

## 使用 `React.lazy()` 和 `Suspense` 进行懒加载

为了演示这一技术，让我们从杰瑞的故事（我最喜欢的《猫和老鼠》角色）开始。

首先，我们将在 `app/components/` 目录下创建一个名为 `jerry` 的文件夹。现在，在 `app/components/jerry/` 下创建一个名为 `jerry.jsx` 的文件，并添加以下代码：

```js
// jerry.jsx

const LazyJerry = () => {
  return (
    <div className="flex flex-col justify-center">
      <h1 className="text-3xl my-2">懒惰的杰瑞</h1>
      <p className="text-xl my-1">
        杰瑞 🐀, 在他的首次登场中并未明确提及他的名字,
        是一只小巧的棕色家鼠，总是生活在靠近汤姆的地方。尽管非常有活力，坚毅且比汤姆大得多,
        杰瑞的机智使汤姆望尘莫及。杰瑞表现出惊人的力量，几乎与汤姆相当，他能轻松举起
        铁砧并能承受相当大的冲击。
      </p>
      <p className="text-xl my-1">
        尽管猫通常追捕老鼠是为了吃它们，汤姆很少真正试图吃杰瑞。汤姆试图伤害或
        与之竞争只是为了嘲弄杰瑞，甚至是为了报复，或者为了从人类，包括他的主人那里，
        获取奖励，因为他抓住了杰瑞，或因为担任家猫职责出色。到每部卡通片的最后
        “淡出”时，杰瑞通常胜过汤姆。
      </p>
    </div>
  );
};

export default LazyJerry;
```

`jerry.jsx` 的内容在结构上类似于 `tom.jsx`。这里我们发布了杰瑞的故事，而不是汤姆的，并默认导出了该组件。

像上次一样，我们创建一个 `jerry-story.jsx` 文件来展示杰瑞故事的懒加载。将该文件创建在 `app/components/jerry/` 目录下，添加以下代码：

```js
// jerry-story.jsx

"use client";

import React, { useState, Suspense } from "react";

const LazyJerry = React.lazy(() => import('./jerry'));

function JerryStory() {
    const [shown, setShown] = useState(false);

    return (
        <div className="flex flex-col m-8 w-[300px]">
            <h2 className="text-xl my-1"> 演示 <strong>React.lazy()</strong></h2>
            <button
                className="bg-pink-600 text-white rounded p-1"
                onClick={() => setShown(!shown)}
            >
                加载 🐀 杰瑞的故事
            </button>

            {shown && <Suspense fallback={<h1>加载杰瑞的故事</h1>}>
                <LazyJerry />
            </Suspense>}
        </div>
    );
}

export default JerryStory;
```

此处我们也有一个客户端组件，并且将使用 React 的 `lazy()` 方法和 `Suspense`，所以我们进行了导入。像上次技术中的 `dynamic()` 函数一样，`lazy()` 函数也接受一个返回懒加载组件的函数作为参数。我们还提供了要加载的组件的相对路径。

请注意，使用 `dynamic()` 方法时，我们有机会将加载消息作为函数的一部分进行自定义。对于 `lazy()`，我们会在 `Suspense` 后备中执行此操作。

Suspense 在等待数据加载时使用一个后备。如果您想深入了解 ReactJS 的 Suspense 和错误边界，可以[查看这个视频教程][12]。

在这里，由于我们的 `LazyJerry` 组件是懒加载的，我们提供了一个后备以显示加载消息，直到组件代码成功下载到浏览器并渲染。

```js
{shown && 
    <Suspense fallback={<h1>加载杰瑞的故事</h1>}>
                <LazyJerry />
    </Suspense>
}
                              
```

此外，如您所见，我们在第一次点击按钮时加载该组件。这里也是除非我们刷新浏览器或清除浏览器缓存，否则不会在每次点击按钮时重新加载组件。

```js
// page.js

import TomStory from "./components/tom/tom-story";
import JerryStory from "./components/jerry/jerry-story"; 

export default function Home() {
  return (
    <div className="flex flex-wrap justify-center ">
      <TomStory />
      <JerryStory />
    </div>
  );
}
```

现在，你将在用户界面上看到另一个组件，该组件带有一个加载 Jerry 故事的按钮。此时，你不会在浏览器中看到 jerry.jsx 组件加载。

![Screenshot-2024-07-17-at-9.33.36-AM](https://www.freecodecamp.org/news/content/images/2024/07/Screenshot-2024-07-17-at-9.33.36-AM.png)

懒加载 Jerry 故事的按钮

现在，点击按钮。你会看到组件被加载，并且可以在网络选项卡列表中看到它。你应该能够阅读作为懒加载组件一部分的 Jerry 的故事。

![Screenshot-2024-07-17-at-9.37.30-AM](https://www.freecodecamp.org/news/content/images/2024/07/Screenshot-2024-07-17-at-9.37.30-AM.png)

Jerry 的故事被懒加载了

## 如何懒加载命名导出组件

目前为止，通过这两种技术我们都导入了一个通过 `default export` 导出的组件，然后懒加载它。在 JavaScript（以及 React）中，可以通过两种不同的方式导出和导入模块：

- 使用 `default` 关键字。这种情况下，导出的模块可以用任何名称导入。如果你只想从一个模块导出一个功能，通常会使用这种方法。
- 不使用 `default` 关键字，这被称为 `named export`。在这种情况下，你必须为导出和导入维持相同的模块名称。导入时还需要将模块名称括在大括号（{...}）中。如果你想从一个模块导出多个功能，通常会使用这种方法。

如果你想深入了解 JavaScript 模块及其工作原理，我建议你观看发布在 freeCodeCamp YouTube 频道上的这个[速成课程][13]。

为了演示 `named export` 组件的懒加载，让我们创建另一个简单的展示型 React 组件。这次，我们使用来自 Tom & Jerry 动画片的生气但可爱的狗 `Spike`。

在 `app/components/` 目录下创建一个名为 `spike` 的文件夹。现在，在 `app/components/spike/` 目录下创建一个名为 `spike.jsx` 的文件，代码如下：

```js
// spike.jsx

export const LazySpike = () => {
  return (
    <div className="flex flex-col">
      <h1 className="text-3xl my-2">The Lazy Spike</h1>
      <p className="text-xl my-1">
        在试图抓住 Jerry 的过程中，Tom 经常要面对名叫 Spike 🦮 的狗，
        在一些短片中叫 "Killer" 和 "Butch"，他是一条愤怒、凶狠但容易受骗的斗牛犬，
        在 Tom 打扰他或他的儿子 Tyke 时试图攻击 Tom。当初，Spike 是匿名且无声的，
        除了嚎叫和咬噪声，并且无差别地攻击，无论是 Tom 还是 Jerry，但通常攻击 Tom。
      </p>
      <p className="text-xl my-1">
      在
        后来的动画片中，Spike 经常说话，使用 Billy Bletcher 和后来 Daws Butler 模仿
        喜剧演员 Jimmy Durante 的声音和表情。Spike 的外套在这些年间变化不定，
        有时是灰色，有时是奶油色。1940 年代末期添加了 Spike 的儿子 Tyke，
        这导致 Spike 的性格略微软化，并且有一个短暂的衍生剧场系列叫做 Spike 和 Tyke。
      </p>
    </div>
  );
};
```

同样，这个组件在结构上与之前看到的 `tom.jsx` 和 `jerry.jsx` 组件完全相同，但存在两个主要区别：

1. 在这里，我们没有使用默认关键字导出组件，因此它是一个 `named export`。
2. 我们讨论的是狗狗 Spike。

现在，我们需要处理命名导出组件的懒加载，这与默认导出组件有所不同。

在 `app/components/spike/` 目录下创建一个名为 `spike-story.jsx` 的文件，代码如下：

```js
// spike-story.jsx

"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const LazySpike = dynamic(() => import("./spike").then((mod) => mod.LazySpike), {
    loading: () => <h1>Loading Spike&apos;s Story...</h1>,
});

function SpikeStory() {
    const [shown, setShown] = useState(false);

    return (
        <div className="flex flex-col m-8 w-[300px]">
            <h2 className="text-xl my-1">展示 <strong>命名导出</strong></h2>
            <button
                className="bg-slate-600 text-white rounded p-1"
                onClick={() => setShown(!shown)}
            >
                加载 🦮 Spike 的故事
            </button>

            {shown && <LazySpike />}
        </div>
    );
}

export default SpikeStory;
```

同 `tom-story` 一样，我们使用了 next/dynamic 进行动态导入。但让我们放大一下上面代码中的以下块：

```js
const LazySpike = dynamic(() => import("./spike").then((mod) => mod.LazySpike), {
    loading: () => <h1>Loading Spike&apos;s Story...</h1>,
});
```
```

现在来测试它，再次将组件导入到 `page.js` 文件中，并像前两次一样在 JSX 中使用它。

```js
// page.js

import TomStory from "./components/tom/tom-story";
import JerryStory from "./components/jerry/jerry-story";
import SpikeStory from "./components/spike/spike-story"; 

export default function Home() {
  return (
    <div className="flex flex-wrap justify-center ">
      <TomStory />
      <JerryStory />
      <SpikeStory />
    </div>
  );
}
```

这样你就可以在浏览器上看到新的组件渲染，并带有一个按钮，用于加载尚未加载的 `spike.jsx` 文件中的 Spike 的故事。

![Screenshot-2024-07-17-at-9.59.55-AM](https://www.freecodecamp.org/news/content/images/2024/07/Screenshot-2024-07-17-at-9.59.55-AM.png)

懒加载 Spike 的故事的按钮

点击按钮将文件加载到浏览器中并渲染组件，以显示 Spike 的故事。

![Screenshot-2024-07-17-at-10.02.01-AM](https://www.freecodecamp.org/news/content/images/2024/07/Screenshot-2024-07-17-at-10.02.01-AM.png)

Spike 的故事被懒加载了

下面你可以看到所有三个组件并排展示了三种不同的技术和用例。你可以一起测试它们。下面的图片展示了两个组件的并行懒加载，其中另一个组件已经被懒加载。

![Screenshot-2024-07-17-at-10.14.21-AM](https://www.freecodecamp.org/news/content/images/2024/07/Screenshot-2024-07-17-at-10.14.21-AM.png)

并行懒加载多个组件

这是另一个案例，其中所有三个组件都是通过相应的按钮点击按需懒加载的。

![Screenshot-2024-07-17-at-10.05.35-AM-1](https://www.freecodecamp.org/news/content/images/2024/07/Screenshot-2024-07-17-at-10.05.35-AM-1.png)

所有故事懒加载

## 懒加载你的服务器组件

我们讨论了客户端组件的懒加载技术。那么我们可以在服务器组件上使用相同的技术吗？当然可以，但你不需要这样做，因为服务器组件已经 `代码分割`，加载方面已经由 Next.js 处理了。如果你尝试这样做，是不会出现任何错误的，但这并没有必要。

如果你动态导入一个包含一个或多个客户端组件作为子组件的服务器组件，那么那些客户端组件会被懒加载。但这对（父）服务器组件本身没有任何影响。

以下是一个包含两个客户端组件作为子组件的服务器组件的示例：

```js
// server-comp.jsx

import ComponentA from "./a-client-comp";
import ComponentB from "./b-client-comp";

import React from 'react'

const AServerComp = () => {
  return (
    <div className="flex flex-col m-8 w-[300px]">
      <ComponentA />
      <ComponentB />
    </div>
  )
}

export default AServerComp
```

现在，我们将动态导入的服务器组件导入 `page.js` 文件，并在其 JSX 中使用它。动态导入的服务器组件的子客户端组件将被懒加载，但服务器组件本身不会。

```js
// page.js

import dynamic from "next/dynamic";

import TomStory from "./components/tom/tom-story";
import JerryStory from "./components/jerry/jerry-story";
import SpikeStory from "./components/spike/spike-story";

const AServerComp = dynamic(() => import('./components/server-comps/server-comp'), {
  loading: () => <h1>Loading Through Server Component...</h1>,
})
 

export default function Home() {
  return (
    <div className="flex flex-wrap justify-center ">
      <TomStory />
      <JerryStory />
      <SpikeStory />

      <AServerComp />
    </div>
  );
}
```

## 我们应该在 Next.js 中懒加载所有客户端组件吗？

当我刚开始学习懒加载时，我有这个问题。现在我对这个技术有了更多的经验，这是我的观点：

你不必懒加载所有客户端组件。优化是很好的，但过度优化会产生不利影响。你需要识别哪些地方需要这些优化。

- 你的客户端组件真的很庞大吗？
- 你是否不必要地将太多东西放入一个组件中，应该拆分并重构？
- 你是否将重型库导入你的客户端组件？
- 你是否选择了摇树优化（tree-shaking）？
- 你能否按路由标记庞大的客户端组件，是否可以在初次加载该路由页面时不加载它们的全部或部分？

如你所见，这些是在进入优化之前需要问的一些有意义的问题。一旦你有了答案，并决定需要懒加载，你就可以实施从这篇文章中学到的技术。

## 接下来是什么？

现在就这些了。你喜欢阅读这篇文章吗，你学到了一些新东西吗？如果是这样，我很想知道这些内容是否对你有帮助。我的社交账号在下面提供。

接下来，如果你愿意学习 `Next.js` 及其生态系统，如包含基础概念和项目的 `Next-Auth(V5)` ，我有一个好消息：你可以在我的 YouTube 频道上查看这个播放列表，包含 20 多个视频教程和超过 11 小时的精彩内容，都是免费的。希望你也喜欢这些内容。

-   订阅我的 [YouTube 频道][15]。
-   [在 X (Twitter)][16] 或 [LinkedIn][17] 上关注我，不要错过每日技能提升的提示。
-   查看并关注我在 [GitHub][18] 上的开源工作。
-   我定期在我的 [GreenRoots 博客][19] 发布有意义的文章，你可能也会觉得有帮助。

期待在我的下一篇文章中见到你。在那之前，请保重自己，继续学习。

[1]: https://www.freecodecamp.org/news/how-to-use-react-server-components/
[2]: https://github.com/tapascript/nextjs-lazy-load
[3]: https://nextjs-lazy-load.netlify.app/
[4]: #what-is-lazy-loading
[5]: #lazy-loading-techniques-in-next-js
[6]: #lazy-loading-with-dynamic-import-and-next-dynamic
[7]: #lazy-loading-with-react-lazy-and-suspense
[8]: #how-to-lazy-load-the-named-exported-components
[9]: #lazy-loading-your-server-components
[10]: #lazy-loading-your-server-components
[11]: #what-s-next
[12]: https://www.youtube.com/watch?v=OpHbSHp8PcI
[13]: https://www.youtube.com/watch?v=KeBxopnhizw
[14]: https://www.youtube.com/watch?v=VSB2h7mVhPg&list=PLIJrr73KDmRwz_7QUvQ9Az82aDM9I8L_8
[15]: https://www.youtube.com/tapasadhikary?sub_confirmation=1
[16]: https://twitter.com/tapasadhikary
[17]: https://www.linkedin.com/in/tapasadhikary/
[18]: https://github.com/atapas
[19]: https://blog.greenroots.info/

