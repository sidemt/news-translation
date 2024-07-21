---
title: 如何通过懒加载优化 Next.js 应用性能
date: 2024-07-19T22:31:12.000Z
author: TAPAS ADHIKARY
authorURL: https://www.freecodecamp.org/news/author/tapas/
OriginalURL: https://www.freecodecamp.org/news/next-js-performance-optimization/
Proofreader: ""

---

/ [#Next.js][1]

<!-- more -->

# 如何通过懒加载优化 Next.js 应用性能

![TAPAS ADHIKARY](https://www.freecodecamp.org/news/content/images/size/w60/2022/02/4AE84473-6762-4606-BBD3-A77E1BBE1188.jpeg)

[TAPAS ADHIKARY][2]

  ![如何通过懒加载优化 Next.js 应用性能](https://www.freecodecamp.org/news/content/images/size/w2000/2024/07/lazyloading-next.js.png)

人们不喜欢使用速度慢的应用程序。初次加载时间对于网络应用和网站来说非常重要。

一个加载时间超过 3 秒的应用程序被认为是慢的，并可能导致用户离开应用程序或网站。

`Next.js` 是一个基于 React 的框架，你可以用它来构建可扩展、高性能和快速的网络应用和网站。随着 Next.js 应用路由中 [React Server Components][3] 的引入，开发者们有了一种新的思维模型，即“以服务器组件的方式思考”。它解决了 SEO 的问题，帮助创建 `零包大小` 的 React 组件，最终结果是 UI 组件加载得更快。

但你的应用程序可能并不总是关于服务器组件。你可能还需要使用客户端组件。此外，你可能希望将它们作为应用程序初始加载的一部分或按需加载（例如点击按钮时）。

在浏览器中加载客户端组件包括将组件代码下载到浏览器中，下载你在该客户端组件中导入的所有库和其他组件，还有一些 React 为确保你的组件正常运行而照顾的附加事项。

根据用户的互联网连接和其他网络因素，客户端组件的全部加载可能需要一段时间，这可能会阻止用户更快地使用应用程序。

这时，`懒加载` 技术就派上用场了。它们可以帮助你避免客户端组件在浏览器中的整体加载。

在本文中，我们将讨论在 Next.js 中用于客户端组件加载优化的一些懒加载技术。我们还将谈论一些边缘情况，你应该知道如何更好地处理它们。

如果你也喜欢通过视频内容学习，本文还有一段视频教程：🙂

<iframe width="356" height="200" src="https://www.youtube.com/embed/gq9bBZru78Y?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen="" title="Next.js Performance Optimization: Implementing Lazy Loading" name="fitvid0"></iframe>

在我们开始之前，有几件事要告诉你：

-   我们将编写大量代码来构建一个应用程序以演示懒加载技术。你可以在这个 GitHub 仓库找到所有源代码：[https://github.com/tapascript/nextjs-lazy-load][4]。但我强烈建议你在我们进行时自己编写代码，仅将仓库用作参考。
-   你还可以访问在 Netlify 上公开部署的应用程序[这里][5]。

让我们开始 🚀。哦对了，如果你是 Tom & Jerry 动画片的爱好者，你会更享受这个过程！

## ******目录******

-   [什么是懒加载][6]？
-   [Next.js 中的懒加载技术][7]
-   [使用动态导入和 next/dynamic 进行懒加载][8]
-   [使用 React.lazy() 和 Suspense 进行懒加载][9]
-   [如何懒加载命名导出的组件][10]
-   [懒加载你的服务器组件][11]
-   [我们应该在 Next.js 中懒加载所有客户端组件吗？][12]
-   [接下来是什么？][13]

## 什么是懒加载？

在现代的 Web 应用程序开发中，我们不会将所有逻辑代码编写在一个 JavaScript/TypeScript 文件中，或者将所有样式编写到一个庞大的 CSS 文件中。相反，我们在源代码级别将它们拆分，创建逻辑模块、业务逻辑、展示组件和样式相关的文件。这有助于我们更好地组织代码。

然后我们会使用称为“打包工具”的东西，它在应用程序开发过程的构建阶段起作用。它为我们的脚本和样式创建包。 一些著名的打包工具有 Webpack、Rollup 和 Parcel 等等。

![image-43](https://www.freecodecamp.org/news/content/images/2024/07/image-43.png)

打包工具从源代码创建包

现在，既然我们有了这些包，如果我们尝试将它们一起加载到浏览器中，我们会发现一些延迟。这是因为为了使用户界面正常工作，需要将完整的包加载到浏览器中。

![image-44](https://www.freecodecamp.org/news/content/images/2024/07/image-44.png)

加载庞大的包会导致较差的加载体验

因此，与其等待庞大的包加载到浏览器中，现代的 Web 开发库和工具系统允许我们将包分块加载。

![image-45](https://www.freecodecamp.org/news/content/images/2024/07/image-45.png)

分块加载所需的内容

这种等待加载部分页面或应用程序的机制，并仅在绝对必要时才加载它们，被称为 `Lazy Loading`（懒加载）。懒加载的概念并非特定于 React 或 Next.js。这是一种性能优化技术，可以通过各种库和框架实现。

## Next.js 中的懒加载技术

在 Next.js 中使用懒加载技术可减少路由所需的 JavaScript 数量。这有助于应用程序的初始加载性能更快。我们可以推迟客户端组件和导入库的加载，直到它们被需要时。

我们可以通过两种方式在 Next.js 中实现懒加载技术：

-   使用 `next/dynamic` 包进行动态导入。
-   结合使用 `React.lazy()` 和 `Suspense`。

让我们通过代码示例来理解每种技术。

## 使用 `dynamic import` 和 `next/dynamic` 实现懒加载

`next/dynamic` 是 React.lazy() 和 ReactJS 的 Suspense 结合体。使用 next/dynamic 包进行动态导入是实现 Next.js 中懒加载的首选方法。

为了演示这一点，首先使用以下命令创建一个 Next.js 应用：

```bash
npx create-next-app@latest
```

您可以使用以下命令在本地启动应用：

```bash
## 使用 npm
npm run dev

## 使用 yarn
yarn dev

## 或者使用 pnpm, bun，随您喜欢！
```

现在在 `app/` 目录下创建一个名为 `components` 的文件夹。我们将在组件文件夹下创建所有组件。现在在 `app/components/` 下创建一个名为 `tom` 的文件夹。最后，在 `app/components/tom/` 目录下创建一个名为 `tom.jsx` 的 React 组件，并包含以下代码：

```js
// tom.jsx

const LazyTom = () => {
  return (
    <div className="flex flex-col">
      <h1 className="text-3xl my-2">The Lazy Tom</h1>
      <p className="text-xl my-1">
        Tom，首次亮相时被称为“Jasper”，是一只灰白色的家养短毛猫 🐈。“Tom”是雄猫的通用名。他通常，但并非总是，被描绘成生活舒适，甚至是娇生惯养的生活。Tom 无法与 Jerry 的智慧相匹敌。
      </p>
      <p className="text-xl my-1">
        虽然猫通常追逐老鼠是为了吃它们，但 Tom 实际上试图吃 Jerry 的情况很少见。他试图伤害或与 Jerry 竞争只是为了嘲弄 Jerry，甚至是为了报复，或是为了从人类那里获得奖励，包括他的主人，为抓到 Jerry 或者作为一只家猫尽职尽责。在每部卡通的最后“淡出”时，Jerry 通常会占 Tom 的上风。
      </p>
    </div>
  );
};

export default LazyTom;
```

解释以上代码：

-   我们创建了一个名为 `LazyTom` 的 ReactJS 组件。
-   它是一个简单的展示组件，包含一个标题和几段描述著名的 `Tom & Jerry` 卡通中的猫 Tom 的段落。
-   最后，我们使用 `default` 导出组件以便在其他地方导入。

现在，在 `app/components/tom/` 目录下创建另一个名为 `tom-story.jsx` 的文件，并包含以下代码：

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

使用 `dynamic` 懒加载的主要魔法在于上述代码：

-   我们通过 `"use client"` 指令创建了一个客户端组件 `TomStory`。
-   首先，我们导入了管理切换状态的 `useState` 钩子，以及用于懒加载之前创建的组件的 `next/dynamic` 的 `dynamic` 函数。
-   `dynamic` 函数接受一个返回导入组件的函数作为参数。您还可以通过提供一个可选配置对象作为参数来配置自定义加载消息。
-   `dynamic()` 函数返回懒加载的组件实例，即 `LazyTom`（可以是任何名称）。但该组件尚未加载。
-   在 JSX 中，我们有一个切换按钮，用于显示和隐藏 `LazyTom` 组件。注意，该组件将在首次单击按钮时被懒加载到用户浏览器中。之后，如果再次隐藏和显示它，`LazyTom` 组件不会重新加载，除非我们硬刷新浏览器或清除浏览器缓存。
-   最后，我们默认导出了 `TomStory` 组件。

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

这是一个简单的 ReactJS 组件，它导入了 `TomStory` 组件并在其 JSX 中使用它。现在打开放浏览器窗口。打开浏览器的开发者工具，并打开 `Network` 选项卡。确保选择了 `All` 过滤器。

现在使用 `http://localhost:3000` 在浏览器中访问该应用。您应该会看到一个加载 Tom 故事的按钮。另外，在 `Network` 选项卡中还会列出一堆资源。这些是在应用程序的初始加载中所需的资源，已经下载到您的浏览器中。

`tom.jsx` 中的 `LazyTom` 组件尚未下载。这是因为我们还没有点击 `Load Tom's Story` 按钮。

![Screenshot-2024-07-17-at-9.21.10-AM](https://www.freecodecamp.org/news/content/images/2024/07/Screenshot-2024-07-17-at-9.21.10-AM.png)

懒加载 Tom 故事的按钮

现在点击按钮。您应该会看到一个加载消息，随后组件将加载 Tom 的故事。现在您可以在 `Network` 选项卡中看到 `tom.jsx` 组件，同时页面上也会渲染出 Tom 的故事。

![Screenshot-2024-07-17-at-9.27.55-AM](https://www.freecodecamp.org/news/content/images/2024/07/Screenshot-2024-07-17-at-9.27.55-AM.png)

现在 Tom 的故事已经被懒加载

现在您已经体验到了 `next/dynamic` 中的 `dynamic` 函数是如何帮助我们懒加载组件的，让我们开始使用 `React.lazy()` 和 `Suspense` 的另一种技术。

## 使用 `React.lazy()` 和 `Suspense` 进行懒加载

为了演示这种技术，让我们从 Jerry 的故事开始，这是我最喜欢的《Tom & Jerry》卡通角色。

首先，我们将在 `app/components/` 目录下创建一个名为 `jerry` 的文件夹。现在，在 `app/components/jerry/` 下创建一个名为 `jerry.jsx` 的文件，内容如下：

```js
// jerry.jsx

const LazyJerry = () => {
  return (
    <div className="flex flex-col justify-center">
      <h1 className="text-3xl my-2">The Lazy Jerry</h1>
      <p className="text-xl my-1">
        Jerry 🐀, whose name is not explicitly mentioned in his debut appearance,
        is a small, brown house mouse who always lives in close proximity to
        Tom. Despite being very energetic, determined and much larger, Tom is no
        match for Jerry&apos;s wits. Jerry possesses surprising strength for his
        size, approximately the equivalent of Tom&apos;s, lifting items such as
        anvils with relative ease and withstanding considerable impacts.
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

export default LazyJerry;
```

`jerry.jsx` 的内容在结构上与 `tom.jsx` 类似。这里我们展示了 Jerry 的故事，而不是 Tom 的，并默认导出了该组件。

像上次一样，我们创建一个 `jerry-story.jsx` 文件来展示 Jerry 故事的懒加载。在 `app/components/jerry/` 目录下创建该文件，内容如下：

```js
// jerry-story.jsx

"use client";

import React, { useState, Suspense } from "react";

const LazyJerry = React.lazy(() => import('./jerry'));

function JerryStory() {
    const [shown, setShown] = useState(false);

    return (
        <div className="flex flex-col m-8 w-[300px]">
            <h2 className="text-xl my-1"> Demonstrating <strong>React.lazy()</strong></h2>
            <button
                className="bg-pink-600 text-white rounded p-1"
                onClick={() => setShown(!shown)}
            >
                Load 🐀 Jerry&apos;s Story
            </button>

            {shown && <Suspense fallback={<h1>Loading Jerry&apos;s Story</h1>}>
                <LazyJerry />
            </Suspense>}
        </div>
    );
}

export default JerryStory;
```

这里我们也有一个客户端组件，我们将使用 React 的 `lazy()` 方法和 `Suspense`，所以我们导入了它们。类似于上个技术中的 `dynamic()` 函数，`lazy()` 函数也需要一个返回懒加载组件的函数作为参数。我们还提供了要加载的组件的相对路径。

请注意，使用 `dynamic()` 时，我们有机会在函数本身中自定义加载消息。而使用 `lazy()` 时，我们将在 `Suspense` 回退部分进行此操作。

Suspense 在您等待数据加载时使用回退。如果您想深入了解 ReactJS 的 Suspense 和错误边界，您可以 [查看此视频教程][14]。
```

```js
{shown && 
    <Suspense fallback={<h1>加载 Jerry 的故事中</h1>}>
                <LazyJerry />
    </Suspense>
}
                              
```

正如你所看到的, 我们在第一次点击按钮时加载组件。同样，每次点击按钮时组件不会重新加载，除非我们刷新浏览器或清除浏览器缓存。

现在，让我们通过将其导入 `page.js` 文件并在其 JSX 中添加该组件来进行测试。

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

现在，你会在用户界面上看到另一个带有加载 Jerry 故事情节的按钮的组件。在这个阶段，你不会在浏览器中看到 jerry.jsx 组件被加载。

![Screenshot-2024-07-17-at-9.33.36-AM](https://www.freecodecamp.org/news/content/images/2024/07/Screenshot-2024-07-17-at-9.33.36-AM.png)

懒加载 Jerry 故事情节的按钮

现在点击按钮。你会看到组件被加载，并且可以在网络标签列表中看到它。你应该能够看到作为懒加载组件一部分呈现的 Jerry 的故事。

![Screenshot-2024-07-17-at-9.37.30-AM](https://www.freecodecamp.org/news/content/images/2024/07/Screenshot-2024-07-17-at-9.37.30-AM.png)

Jerry 的故事被懒加载

## 如何懒加载命名导出的组件

到目前为止, 我们使用的全都导入了用 `default export` 导出的组件，然后对其进行懒加载。在 JavaScript （在 React 也是如此）, 你可以以两种方式导出和导入模块:

-   使用 `default` 关键字。在这种情况下, 导出的模块可以用任何名称导入。如果你想从模块中导出唯一功能，则使用此方式。
-   不使用 `default` 关键字，这被称为 `named export`。在这种情况下, 你必须为导出和导入维护相同的模块名称。导入时还需要将模块名称括在大括号 ({...}) 中。如果你想从模块中导出多个功能，则使用此方式。

如果你想深入了解 JavaScript 模块及其工作原理，我建议你查看免费编码训练营（freeCodeCamp）YouTube 频道发布的[这门速成课程][15]。

为了演示 `named export` 组件的懒加载，让我们创建另一个简单的展示型 React 组件。这次我们将使用《猫和老鼠》动画中名为 `Spike` 的生气但可爱的狗。

在 `app/components/` 目录下创建一个名为 `spike` 的文件夹。现在在 `app/components/spike/` 目录下创建一个名为 `spike.jsx` 的文件，并编写以下代码：

```js
// spike.jsx

export const LazySpike = () => {
  return (
    <div className="flex flex-col">
      <h1 className="text-3xl my-2">懒惰的 Spike</h1>
      <p className="text-xl my-1">
        在试图抓住 Jerry 时, Tom 经常不得不应对 Spike 🦮, 在一些短片中被称为 &quot;Killer&quot; 和 &quot;Butch&quot;，一只愤怒而凶猛但易上当的斗牛犬，试图攻击 Tom 因为打扰他或他的儿子 Tyke。最初, Spike 没有名字且是沉默的，除了嚎叫和咬人的声音外，无论是 Tom 还是 Jerry，他都会不加区别地进行攻击，通常会攻击 Tom。
      </p>
      <p className="text-xl my-1">
      在后来的动画中，Spike 经常说话，使用由 Billy Bletcher 和后来由 Daws Butler 表现出的声音和表达，模仿喜剧演员 Jimmy Durante。Spike 的毛色多年来在灰色和奶油色之间变换。1940 年代后期 Spike 的儿子 Tyke 的加入导致 Spike 的性格稍微软化，并产生了一个短命的剧场衍生系列叫做《Spike and Tyke》。
      </p>
    </div>
  );
};
```

同样, 这个组件在结构上与我们之前看到的 `tom.jsx` 和 `jerry.jsx` 组件完全相同，但有两个主要区别：

1. 这里，我们没有使用 default 关键字导出组件，因此它是一个 `named export`。
2. 我们在讲的狗是 Spike。

现在我们需要处理一个命名导出的组件的懒加载, 这将与默认导出的组件有所不同。

在 `app/components/spike/` 目录下创建一个名为 `spike-story.jsx` 的文件，并编写以下代码：

```js
// spike-story.jsx

"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const LazySpike = dynamic(() => import("./spike").then((mod) => mod.LazySpike), {
    loading: () => <h1>加载 Spike 的故事中...</h1>,
});

function SpikeStory() {
    const [shown, setShown] = useState(false);

    return (
        <div className="flex flex-col m-8 w-[300px]">
            <h2 className="text-xl my-1">演示 <strong>命名导出</strong></h2>
            <button
                className="bg-slate-600 text-white rounded p-1"
                onClick={() => setShown(!shown)}
            >
                加载 🦮 Spike 的故事
            </button>
```

```export default SpikeStory;
```

和 `tom-story` 类似，我们使用了 next/dynamic 进行动态导入。但让我们仔细看看上面代码中的以下块：

```js
const LazySpike = dynamic(() => import("./spike").then((mod) => mod.LazySpike), {
    loading: () => <h1>Loading Spike&apos;s Story...</h1>,
});
```

你会注意到这里的变化是，我们通过 `.then()` 处理函数显式地从 `import("./spike")` 函数中解析了 promise。我们首先获取模块，然后通过其实际名称选择导出的组件——在这个例子中是 `LazySpike`。其余的部分与 `tom-story` 中的相同。

现在为了测试它，再次将组件导入到 `page.js` 文件中，并像前两次一样在 JSX 中使用它。

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

好了，你应该很快会看到新的组件在浏览器中渲染，并带有一个按钮，用于从尚未加载的 `spike.jsx` 文件中加载 Spike 的故事。

![Screenshot-2024-07-17-at-9.59.55-AM](https://www.freecodecamp.org/news/content/images/2024/07/Screenshot-2024-07-17-at-9.59.55-AM.png)

延迟加载 Spike 故事的按钮

点击按钮会将文件加载到浏览器中，并呈现组件以显示 Spike 的故事。

![Screenshot-2024-07-17-at-10.02.01-AM](https://www.freecodecamp.org/news/content/images/2024/07/Screenshot-2024-07-17-at-10.02.01-AM.png)

Spike 的故事被延迟加载

下面你可以看到所有三个组件并排展示三种不同的技术和用例。你可以一起测试它们。下图展示了两个组件并行的延迟加载，其中另一个组件已经延迟加载。

![Screenshot-2024-07-17-at-10.14.21-AM](https://www.freecodecamp.org/news/content/images/2024/07/Screenshot-2024-07-17-at-10.14.21-AM.png)

并行延迟加载多个组件

这里是另一个案例，其中所有三个组件都是按需延迟加载，通过相应的按钮点击。

![Screenshot-2024-07-17-at-10.05.35-AM-1](https://www.freecodecamp.org/news/content/images/2024/07/Screenshot-2024-07-17-at-10.05.35-AM-1.png)

所有故事均延迟加载

## 延迟加载你的服务器组件

我们讨论了客户端组件的延迟加载技术。我们是否也可以在服务器组件上使用相同的方法？实际上你可以，但没有必要，因为服务器组件已经进行了 "代码拆分"，加载方面已经由 Next.js 处理。如果你尝试这样做，不会出现任何错误，但这是不必要的。

如果你动态导入了一个带有一个或多个子客户端组件的服务器组件，那么那些子客户端组件将会被延迟加载。但这对（父）服务器组件本身没有任何影响。

下面是一个拥有两个子客户端组件的服务器组件例子：

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

现在，我们将这个服务器组件动态导入 `page.js` 文件并在 JSX 中使用它。动态导入的服务器组件的子客户端组件将被延迟加载，但服务器组件本身不会。

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

## 我们是否应该在 Next.js 中延迟加载所有客户端组件？

当我第一次学习延迟加载时有这样一个问题。现在我对这种技术有了更多的经验，以下是我的看法：

你不需要延迟加载所有客户端组件。优化是好的，但过度优化可能会产生不利影响。你需要确定这些优化是否必要。

- 你的客户端组件是否真的很大？
- 你是否不必要地将太多东西放入一个组件中，而应该将其分解和重构？
- 你是否在客户端组件中导入了沉重的库？
- 你是否选择了树摇优化？
- 你是否可以根据路由标记大型客户端组件，并且在该路由的页面初始加载时不加载其中的一部分或全部组件是否可以接受？
```

## 接下来呢？

现在就是这些了。你享受阅读这篇文章并学到了新知识吗？如果是的话，我很想知道这些内容是否对你有帮助。我的社交账号如下所示。

接下来，如果你愿意学习 `Next.js` 及其生态系统，例如 `Next-Auth(V5)`，包括基础概念和项目，我有一个好消息要告诉你：你可以在我的 [YouTube 频道上查看这份播放列表][16]，目前已有 20 多个视频教程和 11 小时以上的吸引人内容，都是免费的。我希望你也会喜欢。

让我们保持联系。

-   订阅我的 [YouTube 频道][17]。
-   在 [X（Twitter）][18] 或 [LinkedIn][19] 上关注我，以免错过每天的技能提升小贴士。
-   查看并关注我在 [GitHub][20] 上的开源工作。
-   我定期在我的 [GreenRoots 博客][21] 上发布有意义的文章，你可能也会觉得它们很有帮助。

下次文章见。直到那时，请照顾好自己，并继续学习。

---

![TAPAS ADHIKARY](https://www.freecodecamp.org/news/content/images/size/w60/2022/02/4AE84473-6762-4606-BBD3-A77E1BBE1188.jpeg)

[TAPAS ADHIKARY][22]

作家 . YouTuber . 创作者 . 导师

---

如果你读到了这里，感谢作者向他们表达你的关心。说声谢谢吧

免费学习编程。freeCodeCamp 的开源课程帮助了超过 40,000 人找到开发者的工作。[开始吧][23]

[1]: /news/tag/nextjs/
[2]: /news/author/tapas/
[3]: https://www.freecodecamp.org/news/how-to-use-react-server-components/
[4]: https://github.com/tapascript/nextjs-lazy-load
[5]: https://nextjs-lazy-load.netlify.app/
[6]: #what-is-lazy-loading
[7]: #lazy-loading-techniques-in-next-js
[8]: #lazy-loading-with-dynamic-import-and-next-dynamic
[9]: #lazy-loading-with-react-lazy-and-suspense
[10]: #how-to-lazy-load-the-named-exported-components
[11]: #lazy-loading-your-server-components
[12]: #lazy-loading-your-server-components
[13]: #what-s-next
[14]: https://www.youtube.com/watch?v=OpHbSHp8PcI
[15]: https://www.youtube.com/watch?v=KeBxopnhizw
[16]: https://www.youtube.com/watch?v=VSB2h7mVhPg&list=PLIJrr73KDmRwz_7QUvQ9Az82aDM9I8L_8
[17]: https://www.youtube.com/tapasadhikary?sub_confirmation=1
[18]: https://twitter.com/tapasadhikary
[19]: https://www.linkedin.com/in/tapasadhikary/
[20]: https://github.com/atapas
[21]: https://blog.greenroots.info/
[22]: /news/author/tapas/
[23]: https://www.freecodecamp.org/learn/

