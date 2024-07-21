---
title: 如何使用 React Router 构建单页面应用程序
date: 2024-07-21T14:20:01.019Z
author: Timothy Olanrewaju
authorURL: https://www.freecodecamp.org/news/author/timothy/
OriginalURL: https://www.freecodecamp.org/news/use-react-router-to-build-single-page-applications/
Proofreader: ""

---

单页面应用程序 (SPAs) 已经革新了 Web 开发。与传统的多页面应用程序相比，它们提供了更加动态和流畅的用户体验。

<!-- more -->

传统的 Web 应用程序几乎每次用户点击都需要进行全页面重新加载。而单页面应用程序则加载一个 HTML 页面，并在用户与应用程序互动时动态更新页面内容。这种动态性模仿了桌面应用程序的感觉，使得交互更具响应性。

### 在进一步了解之前：

为了跟随本文的讨论，你应该对 React 有一些基本了解，并知道如何设置一个 React 项目。如果你已经了解这些，那让我们开始吧。

## 什么是 React Router 和 React Router DOM？

React Router 是一个强大的库，用于在 React 应用程序中管理导航和路由。React Router DOM 专门用于 Web 应用程序，并具有一些特定于 DOM 的 API。

在我们深入了解 React Router DOM 的世界时，将探索其核心概念，并在 React 应用程序中演示其实现。我们的重点将是构建一个简单的导航系统，使用链接到不同的组件，说明如何配置路由、处理路由匹配和实现导航。

在本文结束时，你将对如何使用 React Router DOM 在单页面应用程序中创建动态和无缝的导航体验有一个坚实的理解。

## 如何安装 React Router

如上所述，React-router-DOM 专门用于将路由功能集成到 Web 应用程序中。因此，要在你的 React 应用中使用它，你需要在 React 应用终端中运行以下命令来安装 `react-router-dom` 包：

```react
npm install react-router-dom
```

成功安装后，你现在可以在你的 React 项目中开始路由了。

## React Router DOM 的核心概念

### BrowserRouter

BrowserRouter 是一个父组件，包含所有的路由组件。应用程序中使用的所有路由都必须在 `BrowserRouter` 内声明。最重要的是，它使用 URL 将当前的位置存储在浏览器的地址栏中，这在导航过程中非常有用。

要使用 BrowserRouter，你需要从 `react-router-dom` 中导入它，并在 App.jsx 文件中使用。

```react
import { BrowserRouter } from "react-router-dom";

function App() {
  
  return (
    <BrowserRouter>
    
    </BrowserRouter>
  );
}

export default App;
```

`BrowserRouter` 具有一个 `basename` 属性，用于设置应用程序中所有路由的基本 URL。如果你的应用托管在域名的子目录中，这一点很重要。

```
<BrowserRouter basename="/shop">

</BrowserRouter>
```

添加 `/shop` 作为 basename 将确保所有路由路径都是相对于 `/shop` 的。

### Routes

这个组件直接替换了以前版本的 React Router 中的 `switch`。它也充当一个父组件，并渲染第一个匹配的子路由，这确保了根据当前 URL 显示正确的组件。

要声明路由，从 `react-router-dom` 中导入 `routes` 并将其放置在 `BrowserRouter` 组件内。

```react
import { BrowserRouter, routes } from "react-router-dom";

function App() {
  
  return (
    <BrowserRouter>
    	<Routes>
        
        </Routes>
    </BrowserRouter>
  );
}

export default App;
```

### Route

`Route` 是一个子组件，由两个属性组成：**path** 和 **element**。**path** 可以是任何指定的路径名，而 **element** 属性是应渲染的组件。当指定的路径与 URL 匹配时，路由将渲染一个特定的组件。

应用程序可以根据需要拥有任意多个 `route`，而且必须都在 `Routes` 组件内声明。假设我们有一个 `<Home\>` 和 `<Pricing\>` 组件，我们需要导入 `Route` 组件并将其放置在 `Routes` 内。

```react
import { BrowserRouter, Routes, Route } from "react-router-dom";

//ALL COMPONENTS IMPORTS COMES HERE

function App() {
  
  return (
    <BrowserRouter>
    	<Routes>
        	<Route path="/" element={<Home/>}/>
            	<Route path="pricing" element={<Pricing/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
```

### 未声明的路由

有一种方法可以处理在你的应用程序中不存在的路由，就像错误 404 页面一样。为此，创建另一个显示“未找到页面”消息的组件，并添加 `route`。

将路径名称设置为 `*` 并传递组件作为 **element**。

```
import { BrowserRouter, Routes, Route } from "react-router-dom";

//ALL COMPONENTS IMPORTS COMES HERE

function App() {
  
  return (
    <BrowserRouter>
    	<Routes>
        	<Route path="/" element={<Home/>}/>
            	<Route path="pricing" element={<Pricing/>}/>
                <Route path="*" element={<PageNotFound/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
```

### 嵌套路由

在某些情况下，路由可以有子级或子路由。

```markdown
//所有组件的导入代码在此处

function App() {
  
  return (
    <BrowserRouter>
    	<Routes>
        	<Route path="/" element={<Home/>}/>
            	<Route path="pricing" element={<Pricing/>}/>
                <Route path="categories" element={<Categories/>}>
                	<Route path="male" element={<Male/>}/>
                    	<Route path="female" element={<Female/>}/>
                </Route>
                <Route path="*" element={<PageNotFound/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
```

当导航到嵌套路由时，浏览器中的 URL 将显示为 `/categories/male` 和 `/categories/female`。

### Link

这类似于锚标记的 `href` 属性。它有一个 **to** 属性，用于指定点击后 `Link` 将带用户导航到哪个位置。通常，它传递的是组件页面的路径。

Link 通常放在 Navbar 组件中，所以我们会把两个 Link 指向我们在 Routes 中已经声明的组件路径。

```react
import { Link } from "react-router-dom";
export default function PageNav() {
  return (
  <>
        <Link to="/">Home</Link>
        <Link to="pricing">Pricing</Link>
  </>
  );
}
```

**注意:** 如果您在阅读本文时进行实际操作，请注意在 **App.jsx** 中创建的 `PageNav` 组件应位于 `BrowserRouter` 标签的开头之后，`Routes` 之前。这是为了确保无论通过不同的组件路由，`PageNav` 始终保持在顶部像一个导航菜单一样。

```react
import { BrowserRouter, Routes, Route } from "react-router-dom";

//所有组件的导入代码在此处

function App() {
  
  return (
    <BrowserRouter>
    	<PageNav/>
    	<Routes>
        	<Route path="/" element={<Home/>}/>
            	<Route path="pricing" element={<Pricing/>}/>
                <Route path="categories" element={<Categories/>}>
                	<Route path="male" element={<Male/>}/>
                    	<Route path="female" element={<Female/>}/>
                </Route>
                <Route path="*" element={<PageNotFound/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
```

### NavLink

NavLink 的功能与 `Link` 相同，也有一个 **to** 属性。但它有所不同，因为它有一个 class 属性。class 属性包括`active`、`isPending` 和 `isTransitioning`。这使得它比 `Link` 更加多功能，您可以在与用户交互时有条件地添加样式。

```react
import { NavLink } from "react-router-dom";
export default function PageNav() {
  return (
  	<>
        <NavLink to="/">Home</NavLink>
        <NavLink to="pricing">Pricing</NavLink>
    </>
  );
  }
```

### Outlet

在父路由元素内包含子元素意味着在渲染子路由的 UI 时有一个抽象层。这时 `Outlet` 组件派上用场。您可以将它添加到父路由中 —— 在我们的示例中，它将是 `Categories` 组件。

```react
import { NavLink, Outlet } from "react-router-dom";
export default function Categories() {
  return (
 <>
          <NavLink to="men">
            Men
          </NavLink>
          <NavLink to="women">
            Women
          </NavLink>
      <Outlet />
</>
  );
}
```

这允许在嵌套路由中渲染子路由的 UI。

![nested-routes](https://www.freecodecamp.org/news/content/images/2024/07/nested-routes.PNG)

图示展示 Categories 路由中子路由的嵌套。

### `useNavigate` 钩子

此钩子返回一个函数，使在路由之间编程导航成为可能。

有几种方法可以在您的应用程序中使用 navigate 函数。首先，我们需要导入 `useNavigate` 钩子并将其初始化为 **navigate**。

```react
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const navigate = useNavigate();

  return (
    <>
      <h1>This is the Homepage</h1>
 
 
    </>
  );
}
```

我们可以在应用程序中以以下几种方式使用 navigate：

-   通过 `onClick` 属性将其附加到按钮，并在 navigate 函数中传递要导航到的目标路径。

```react
 <button onClick={() => navigate("/categories")}>Go to Categories</button>
```

-   将其与 `Link` 组件一起使用。

```react
<Link to={navigate("/categories")}>Go to Categories</Link>
```

-   在 **navigate** 函数中使用一个数字替代组件路径。数字应指定您希望返回到历史堆栈中向后导航的步数。

```react
<Link to={navigate(-1)}>Go one step backwards</Link>
```

### `useParams` 钩子

返回由路由路径匹配的当前 URL 中的动态 `params` 对象。父路由将所有 `params` 传递给其子路由。

下面的例子展示了一个 `OrderPage` 组件，它将为每个具有唯一 `id` 的 `customer` 渲染。当 URL 匹配 `/customer/123` 时，`:id` 将是 `123`。

```react
import { useParams } from "react-router-dom";
```

export default App;
```

### 最终结果

此时，我们已经在这个小规模的导航项目中全面实现了 React Router。完整运行的效果如下：

![Untitled-design](https://www.freecodecamp.org/news/content/images/2024/07/Untitled-design.gif)

有关 React router 的更多详细信息和概念，你可以访问 [官方 React Router 文档][1]。

## 结论

在本文中，我们探讨了在 React 网络应用程序中客户端路由 (CSR) 的概念和实现。通过其基于网络的库 React-Router-DOM，React Router 实现了 CSR，使应用程序能够通过点击链接更新 URL，而无需发起服务器请求获取新文档。

此功能通过提供更快的导航和更流畅的应用内交互来增强用户体验。通过利用 CSR，开发人员可以构建更高效且响应迅速的单页应用程序 (SPAs)，从而提高性能和用户满意度。

如果你喜欢阅读这篇文章，可以 [请我喝杯咖啡][2]。

想看到更多类似内容？在 [LinkedIn][3] 上与我联系。

我们下次见！

编码愉快！

[1]: https://reactrouter.com/
[2]: https://buymeacoffee.com/timothyolanrewaju
[3]: https://www.linkedin.com/in/timothy-olanrewaju750/

