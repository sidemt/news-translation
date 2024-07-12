---
title: tRPC 库介绍及示例项目
date: 2024-07-12T01:10:06.967Z
authorURL: ""
originalURL: https://www.freecodecamp.org/news/what-is-trpc/
translator: ""
reviewer: ""
---

最近，我注意到一个名为 [tRPC][1] 的技术出现在许多现代技术栈中，包括 [T3][2]。但我不知道那是什么或者为什么它会变得如此流行。

<!-- more -->

所以我开始研究和学习它。我不知道它的含义或用途。因此，我深入研究了 [RPC][3]、[gRPC][4] 和其他技术以找到答案。

我发现 tRPC 是一种类型安全的 API 设计架构风格。但这个定义只是冰山一角。

在本文中，我想深入探讨这个冰山的根源并理解 tRPC 是什么。本文是对 tRPC 的详细解释，为什么我们需要它以及如何使用它。

请注意，我是一个写这篇文章的学习者。我和你们一同第一次探索 tRPC，基于我研究过的文章。本文面向初学者和新学者。让我们一起深入探讨。

## 前提条件

1.  中级 JavaScript 知识。
2.  基础 TypeScript 知识。
3.  中级 React 知识。
4.  使用 Fetch 和 REST API 的经验。
5.  使用终端或控制台的经验。
6.  使用 NPM 及其命令的经验。
7.  使用 CORS 以及连接前端/后端的经验。
8.  享受学习新事物。

你可以在[这里][5]找到本文的 GitHub 仓库和所有其他资源。

## 目录

1.  [什么是 tRPC?][6]
2.  [为什么我们需要 tRPC?][7]
3.  [如何使用 tRPC][8]
4.  [结论][9]

## 什么是 tRPC?

[tRPC][10] 是一个基于 TypeScript 的类型安全库，利用 RPC API 设计来处理 API 请求并返回响应。

[RPC][11] 代表远程过程调用。我们的 tRPC 基于 RPC 构建。RPC 是一种像 [REST][12] 一样设计 API 的架构风格。使用 RPC，你可以摆脱 [Fetch][13] 和 [REST API][14]。

顾名思义，tRPC 在 RPC 架构设计上添加了类型安全层。传统上，我们使用 REST API。它有 [GET, POST, PULL 和其他请求类型][15]。在 tRPC 中，没有请求类型。

每个到 tRPC 后端的请求都会通过查询系统，根据输入和查询从 tRPC 后端获得响应。

![image-10](https://www.freecodecamp.org/news/content/images/2024/07/image-10.png)

来源: [Adeesh Sharma][16]

相反，tRPC 和 react-query 提供了内置函数来处理你的请求。每个请求都会被相同对待。取决于 API 端点是否接受输入，抛出输出，进行变异等。

使用 REST 时，你会创建一个名为 `/api` 的主文件夹，并在其中添加路由文件。对于 tRPC，你不需要包含许多文件的文件夹。你只需要一些内置函数和一个简化的 react-query 系统。

你不需要使用 `fetch()`、处理输出等。tRPC 使用表示特定查询的 URL，如你稍后会看到的。

### 为什么我们需要 tRPC?

tRPC 使 RPC 类型安全。这意味着你的客户端不能发送服务器无法接受的数据。我不能为一个数字属性传递字符串。

如果客户端试图这样做，你会立即收到一个错误 —— **无效类型**。如果数据类型不匹配，IDE 和浏览器会抛出错误。

![type-error](https://www.freecodecamp.org/news/content/images/2024/07/type-error.png)

tRPC 提交意外数据类型值后类型安全错误

类型安全对于使用 JavaScript 的应用程序至关重要。因此 tRPC 利用 [TypeScript][17]。这使得在后端创建路由和执行操作更加容易。

tRPC 需要一个名为 [Zod][18] 的库。它帮助 tRPC 构建每个路由的数据模式。模式是一个具有属性的对象，每个属性都连接到一个等效的数据类型。

例如，如果一个 API 路由需要用户的详细信息，你会在后端创建一个对象，并使用 Zod 为每个属性分配一个数据类型。

在前端，tRPC 将验证用户或 API 请求提供的数据是否与后端注册的数据类型匹配。tRPC 利用这种前后端之间的类型安全集成。

让我们通过一个示例项目看看 tRPC、Zod 和其他库如何协同工作。

## 如何使用 tRPC

你可以在几秒钟内启动一个 Express 服务器并开始编写 tRPC 路由和查询 —— 这很简单。

传统上，客户端（前端）和服务器端（后端）是分离的。在这个示例中，我们将遵循这种分离。

让我们首先使用 React 创建客户端，并使用 Express + CORS 创建服务器端以连接它们。

### 文件夹结构

首先，创建一个名为 `tRPC Demo` 的目录。在此目录中，创建另一个名为 `trpclibrary` 的目录，以分离客户端和服务器端，并稍后将它们作为一个库一起执行。

在 `trpclibrary` 目录中，你很快就会放置你的服务器（Express）和客户端（React）。

在 `tRPC Demo` 根目录中，插入一个 `package.json` 文件，包含以下代码，以互连所有文件夹并使用单个命令运行客户端和服务器端。

根目录 `package.json` 文件

在根目录中设置 `package.json` 之后，你将开始在 `trpclibrary` 目录中设置你的 Express 服务器。

提示：使用 `cd <folder_name>` 命令进入终端中的文件夹并执行命令。在我们的情况下，你在根目录，因此 `cd .\trpclibrary` 会对你有所帮助。你也可以使用 VS Code 终端。

你将使用 `npx create-mf-app` 启动命令来用预定义模板初始化你的服务器，从而节省一些时间。

![sever-side-x2](https://www.freecodecamp.org/news/content/images/2024/07/sever-side-x2.png)

服务器端设置

你可能会遇到错误，提示没有安装 Express 或其他库。不用担心——你很快就会安装所有所需的库。

创建服务器后，让我们在同一个 `trpclibrary` 目录中使用 React 和相同的命令来创建客户端。

![image-11](https://www.freecodecamp.org/news/content/images/2024/07/image-11.png)

客户端设置

这就是你的 React 客户端。但你可能会因模块和包相关的所有错误而不知所措。因此，让我们先下载它们。

我使用 yarn，并且我推荐你也这样做。使用 `yarn` 命令在根 `trpcDemo` 目录中。

提示：你可以使用 `cd ..` 命令退出当前目录并进入上一级目录。

![image-13](https://www.freecodecamp.org/news/content/images/2024/07/image-13.png)

你的服务器端、客户端或两者可能没有 TS 配置文件。因此我建议在两个目录中使用 `npx tsc --init` 命令来安装它。

![image-14](https://www.freecodecamp.org/news/content/images/2024/07/image-14.png)

TS 配置文件初始化

现在，你需要在项目的服务器端下载 tRPC、CORS 和 Zod。

截至 2024 年 7 月 2 日，_[@trpc/server][19]_ 包的最新版本是 10.45.2。记住，即便是[客户端 tRPC 包][20] 也应该是 10.45.2。

![image-16](https://www.freecodecamp.org/news/content/images/2024/07/image-16.png)

将 Zod、CORS 和 @trpc/server 安装到服务器端

然后，你需要为客户端安装 [@trpc/client][21]、[@trpc/react-query][22]、[@tanstack/react-query][23]、[@trpc/server][24] 和 [Zod][25]。你会使用相同的“[yarn add <package\_names>][26]”命令。

这次我不会分享截图。参考前面的步骤并尝试下载它们。

我们已经完成了大多数安装和设置。你的文件夹结构应如下所示：

```Markdown
tRPC Demo
├── trpclibrary
│   ├── client-side (React 应用程序文件夹)
│   ├── server-side (Express 服务器文件夹)
└── package.json
```

文件夹结构

### tRPC 设置

我们将在本节中执行以下操作：

1. 创建带有 Context 的 tRPC 实例
2. 创建 tRPC 路由并设置查询
3. 设置基 URL
4. 设置 CORS

首先在服务器端目录的 `index.ts` 文件中创建一个 tRPC 实例。根据文档，你应该在每个应用程序中只初始化一个实例。

使用 tRPC 实例创建一个路由器。一个路由器帮助你注册 API 请求到达并被处理的路由。

路由是你处理请求并发出响应的地方。路由是连接到基 URL 的 API 端点。

例如，[`http://localhost:3005/api/hello`][27] 描绘了一个名为 `hello` 的 API 端点和调用 API 端点的基 URL `api`。

```TypeScript
import { initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";

const createContext = ({}: trpcExpress.CreateExpressContextOptions) => ({});
type Context = Awaited<ReturnType<typeof createContext>>;

const trpc = initTRPC.context<Context>().create();
```

你必须将此代码放在 `index.ts` 文件中现有样板代码之上，并在导入声明之下。它应该在 app 和 port 变量声明上方，并在 express 导入声明下方。

Voilà！我使用 `@trpc/server` 包的 `initTRPC` 构建器创建了一个 tRPC 实例。我们将使用此实例处理与后端相关的所有内容。

另外，我已为 tRPC 路由器添加了一个 [Context][28]。它是 tRPC 的一个功能。它允许你放置数据库连接和身份验证信息等详细信息。

tRPC 在所有 tRPC 程序之间共享 Context。它是一个信息和存储空间，以避免代码重复并保持代码组织有序。

到目前为止，你已经初始化了带有 Context 的 tRPC 实例。现在，你要编写路由器代码—将以下代码放在前面的代码下方：

```Typescript
import zod from "zod";

const appRouter = trpc.router({
  hello: trpc.procedure
    .input(
      zod.object({
        name: zod.string(),
      })
    )
    .query(({ input }) => {
      return {
        name: input.name,
      };
    }),
});

export type AppRouter = typeof appRouter;
```

最后，你导入了 Zod。你还创建了一个名为 `hello` 的 API 端点，该端点使用 `input()` 方法接收输入并将用户的 API 请求与此端点中指定的 Zod 对象匹配。

有了这段代码，Zod 和 tRPC 期望前端提供一个带有名为 `name` 的单个字符串属性的对象。tRPC 将使用此属性并使用该输入进行响应。

正如我之前提到的，你需要在任何地方都使用 tRPC 实例。我用它来创建一个路由器来存储路由（API 端点）、注册和处理它们。

你可以在 `router()` 方法中创建无限的路由。它就像一个路由处理器。这个端点是一个对象，每个路由都作为一个属性。

你将需要过程构建器来访问诸如 `query()`、`input()` 等过程。所以我们将它与 tRPC 实例绑定并访问这些方法。

现在，是时候设置基础 URL 了。你将使用 `@trpc/server` 库中的 Express 适配器来设置基础 URL。

将以下代码放在 `index.ts` 文件中的 `app.get()` 路由上方：

```TypeScript
app.use(
  "/api",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);
```

`/api` 表示你的基础 URL。每个路由都将基于 `/api` URL。现在，你的 `hello` API 端点变成了 [`http://localhost:3005/api/hello`][29]。

让我们尝试使用你的浏览器进行测试。你还记得我让你在根 tRPC Demo 目录中创建一个带有预写代码的 `package.json` 文件吗？

这是为了将服务器和客户端作为一个库一起运行。设置你的终端到根目录。然后，执行 `yarn start` 以同时运行服务器和客户端，并前往 [`http://localhost:3005/api/hello`][30] URL。

![image-23](https://www.freecodecamp.org/news/content/images/2024/07/image-23.png)

tRPC 无效类型错误

哦哦！你收到错误了吗？如果错误显示“Invalid Type”，说明你走在正确的路上。看，这就是 tRPC 如何帮助我们。

在上面的代码中，当我作为用户向 `hello` API 端点发送 API 请求时，我没有传递 tRPC 期望的对象或值。

tRPC 期望一个带有值的名为 `name` 的字符串属性的对象。当我没有提供那个时，tRPC 限制了我的访问。这就是它的亮点所在。

“这很好，但现在怎么办？”你必须将前端与服务器端连接起来，以发送包含预期数据的对象。

服务器端还有一件事要做，CORS！设置它很简单。找到 `index.ts` 文件中的 Express 初始化代码。它是随 Express 模板一起提供的。然后，插入以下行：

```JavaScript
import cors from "cors";

app.use(cors());
```

这里有个提示：搜索 `index.ts` 文件中的端口和应用程序变量声明。

插入该行后，可能会出现错误，因为你还没有安装 CORS 的类型。前往终端并在服务器端目录中安装 `@types/cors`。

![image-24](https://www.freecodecamp.org/news/content/images/2024/07/image-24.png)

@types/cors 下载。

CORS 已准备就绪并且安全。你的服务器端已准备就绪！现在，让我们尝试使用相应的库将服务器端与客户端连接。

在我们转向客户端之前，我想确保我们在同一页上。到目前为止，你已经编写了一个 tRPC 实例，创建了一个路由器，设置了一个基础 URL，并使用可选的上下文测试了 API 端点。

你将在服务器端的 `index.ts` 文件中编写了所有这些代码。让我们转向客户端，征服本教程的最后部分。

### 客户端

我们已经下载了所需的软件包。我们将从在客户端目录的 `/src` 目录中创建一个 `trpc.ts` 文件开始。它将处理前端发出的查询和请求。

你创建了一个 tRPC 实例来构建服务器端的路由器和其他组件，对吧？现在，你需要在客户端执行相同的操作。你需要使用 `@trpc/react-query` 创建一个客户端 tRPC 实例。

另外，由于你想将客户端 tRPC 实例与服务器端连接起来，你必须导入服务器端的 tRPC 实例及其类型。

要导入服务器端的 tRPC 实例，请在服务器端的 `package.json` 文件中插入一个 `main` 属性。当你在客户端导入服务器端文件夹时，它会将 `index.ts` 设置为入口文件。

![image-25](https://www.freecodecamp.org/news/content/images/2024/07/image-25.png)

服务器端 `package.json` 文件。

设置该属性后，你可以使用终端将 tRPC 实例导入到客户端。对我来说，后端在服务器端目录的 `package.json` 文件中被称为 `server-side`，版本为 `1.0.0`。

因此，我将在客户端终端中执行 `yarn add server-side@1.0.0`。安装可能看起来很熟悉，因为这就是开发人员构建库的方式。

该命令应将你的服务器端文件夹作为一个包添加到客户端的 node modules 目录中。你可以使用客户端的 `package.json` 文件进行验证。

![image-26](https://www.freecodecamp.org/news/content/images/2024/07/image-26.png)

客户端 `package.json` 文件。

它应该将你的服务器端包名称作为依赖项包含在内。

换句话说，你已在客户端应用程序中安装了服务器端包。你现在可以像使用库一样导入服务器端 tRPC 并使用它。

如果你还记得之前，我们在服务器端创建路由时添加了一个额外的导出 AppRouter 行。我们这样做是因为我们必须在客户端上导入 AppRouter 类型，以便在客户端使用服务器端 tRPC 实例。

```TypeScript
import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "server-side";

export const trpc = createTRPCReact<AppRouter>();
```

`trpc.ts` 文件。

通过这段代码，你已经创建了一个具有服务端tRPC实例特性的客户端tRPC实例。

很好。现在，我们在 `/src` 目录下创建另一个名为 `AppComponent.tsx` 的文件。

这个文件将保存主要的App组件。它将从 `trpc.ts` 文件中引入 `trpc` 客户端实例，并使用它来调用 `hello` API 端点。

```TypeScript
import React from "react";
import { trpc } from "./trpc";
```

`AppComponent.tsx` 引入语句。

既然你已经创建了一个客户端tRPC实例，你可以在客户端访问所有API端点，并调用 `useQuery()` 方法向这些API端点发送请求。

```TypeScript
import React from "react";
import { trpc } from "./trpc";

const AppComponent = () => {
  const userQuery = trpc.hello.useQuery({ name: "Afan" });

  return (
    <div className="mt-10 text-3xl mx-auto max-w-6xl">
      <div>{JSON.stringify(userQuery.data?.name)}</div>
    </div>
  );
};

export default AppComponent;
```

完整的 `AppComponent.tsx` 文件。

如果你还记得，`hello` API 端点需要一个带有字符串属性 `name` 的对象。所以你需要使用 `useQuery()` 方法传递这个对象，以避免tRPC不匹配。

在JSX代码中，你将使用 `JSON.stringify()` 方法解构API端点发送的API响应，并通过API端点访问结果。

你的 `AppComponent.tsx` 文件是一个标准的React组件。因此，你需要在主 `App.tsx` 文件中导入这个组件。客户端的 `App.tsx` 等同于服务端的 `index.ts`。

对于 `App.tsx` 文件，你将遵循类似的设置。从 `trpc.ts` 文件中导入客户端tRPC实例。然后，设置基础URL并设置React Query。

你将从TanStack导入React Query，从 `./trpc.ts` 文件中导入 `trpc`，从 `@trpc/client` 导入 `httpBatchLink`，从React中导入 `useState`，以及从 `AppComponent.tsx` 文件中导入你的 `AppComponent`。

```TypeScript
// 默认导入语句

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";

// 添加以下导入语句

import { useState } from "react";

import { trpc } from "./trpc";
import { httpBatchLink } from "@trpc/client";
import AppComponent from "./AppComponent";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
```

你将使用每个导入语句。忽略关于未使用导入对象的任何错误提示。然后，像tRPC一样创建一个React Query客户端实例。

```TypeScript
const client = new QueryClient();
```

一旦完成了这个步骤，你需要设置基础URL。你将在主App函数中完成这个操作。

此外，将以下代码语句从App函数下方移到App函数的顶部，放在React Query客户端声明语句下方。

```TypeScript
const rootElement = document.getElementById("app");
if (!rootElement) throw new Error("未能找到根元素");

const root = ReactDOM.createRoot(rootElement as HTMLElement);
```

然后，从App函数中删除默认的JSX HTML代码。你可以安全地删除App函数中的所有HTML代码。

接下来，你需要为客户端设置基础URL。每当前端调用API端点时，它将使用这个基础URL。它应该与你在服务端设置的基础URL一致。

将你的App函数代码中的HTML替换为以下基础URL代码：

```TypeScript
const App = () => {
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          // 基础 URL
          url: "http://localhost:3005/api",
        }),
      ],
    })
  );

  return <></>;
};
```

你的 `App.tsx` 文件应如下所示：

```TypeScript
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";

import { useState } from "react";

import { trpc } from "./trpc";
import { httpBatchLink } from "@trpc/client";
import AppComponent from "./AppComponent";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

const rootElement = document.getElementById("app");
if (!rootElement) throw new Error("未能找到根元素");

const root = ReactDOM.createRoot(rootElement as HTMLElement);

const App = () => {
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          // 基础 URL
          url: "http://localhost:3005/api",
        }),
      ],
    })
  );

  return <></>;
};

root.render(<App />);
```

我还没有详细讲过 `return` 语句。现在，让我们来讲讲。我们不会让 `return` 语句保持空白。

它将显示由API端点返回的数据，这应是你通过 `useQuery()` 方法在 `AppComponent.tsx` 组件文件中提交的字符串。

`return` 语句是用于包装器和AppComponent组件。如果你需要你的组件和页面使用tRPC、React Query等，你必须将你的组件（如 `AppComponent`）用这些库的 `Providers` 包起来。
```

现在，你将用 React Query 包裹 `AppComponent` 组件，并在这个文件中使用 `QueryClient()` 创建的 React Query 客户端实例。然后，你将用 tRPC Provider 包裹 React Query Provider。

tRPC 提供程序需要 React Query 客户端和带有基本 URL 的 tRPC 客户端。所以我们也会提供这些信息。

一旦你传递了所需的信息并使你的代码与我的代码匹配，你就可以访问 [http://localhost:3000][31] 并查看输出。它会显示你使用 `hello` API 端点传递的数据。

注意：你应该在根 `tRPC Demo` 目录运行 `yarn start` 命令，以打开本地主机端口以查看输出。

![image-27](https://www.freecodecamp.org/news/content/images/2024/07/image-27.png)

输出图像

瞧！我们已经准备好了。tRPC 从前端调用 `hello` API 端点。它优先考虑类型安全，并使用 TypeScript 避免了数以百万计的其他 JavaScript 问题。

你可以在你的路由处理程序中添加更多像 `hello` 一样的路由和 API 端点。添加新属性到对象中就像添加一个新属性一样简单。这就是 tRPC 使你生活更轻松的方式。

## 结论

tRPC 是一种类型安全的 RPC 样式库。它将 RPC 与 TypeScript 集成在一起，消除了 REST、`fetch()` 和其他创建和进行 API 调用的技术。

它作为 REST 和 Fetch 的替代品。我将在可预见的未来使用它。

我很享受学习这种新技术。本文可能有一些缺陷，但我是一个学习者，所以请随时报告我的错误，并帮助我改进。

订阅 [我的新闻通讯][32] 以获取关于软件工程、技术工作和职业的每周邮件，及资源（包括免费的付费文章），以帮助你在职业生涯中取得成功。

_希望在下一篇文章中见到你 ✌️_

[1]: https://trpc.io/
[2]: https://create.t3.gg/
[3]: https://en.wikipedia.org/wiki/Remote_procedure_call
[4]: https://en.wikipedia.org/wiki/GRPC
[5]: https://github.com/whyafan/trpc-demo
[6]: #what-is-trpc
[7]: #why-do-we-need-trpc
[8]: https://www.freecodecamp.org/news/p/96029b5d-38ad-4b3c-a021-661b70eb6dd3/how-to-use-trpc
[9]: https://www.freecodecamp.org/news/p/96029b5d-38ad-4b3c-a021-661b70eb6dd3/conclusion
[10]: https://trpc.io/
[11]: https://en.wikipedia.org/wiki/Remote_procedure_call
[12]: https://www.ibm.com/topics/rest-apis
[13]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
[14]: https://www.ibm.com/topics/rest-apis
[15]: https://restfulapi.net/http-methods/
[16]: https://adeesh.hashnode.dev/building-an-express-trpc-and-react-monorepo-setup-with-yarn-workspaces-tailwind-zod-and-react-query
[17]: https://www.typescriptlang.org/
[18]: https://zod.dev/
[19]: https://www.npmjs.com/package/@trpc/server
[20]: https://www.npmjs.com/package/@trpc/client
[21]: https://www.npmjs.com/package/@trpc/client
[22]: https://www.npmjs.com/package/@trpc/react-query
[23]: https://www.npmjs.com/package/@tanstack/react-query
[24]: https://www.npmjs.com/package/@trpc/server
[25]: https://www.npmjs.com/package/zod
[26]: https://classic.yarnpkg.com/lang/en/docs/cli/add/
[27]: http://localhost:3005/api/hello
[28]: https://trpc.io/docs/v10/server/context
[29]: http://localhost:3005/api/hello
[30]: http://localhost:3005/api/hello
[31]: http://localhost:3000
[32]: https://www.freecodecamp.org/news/p/96029b5d-38ad-4b3c-a021-661b70eb6dd3/Subscribe%20to%20my%20newsletter%20for%20the%20weekly%20emails%20about%20Software%20Engineering,%20Tech%20Jobs%20&%20Careers,%20and%20resources%20to%20excel%20in%20your%20career.

