---
title: How to Use React Router to Build Single Page Applications
date: 2024-07-21T14:20:01.019Z
author: Timothy Olanrewaju
authorURL: https://www.freecodecamp.org/news/author/timothy/
OriginalURL: https://www.freecodecamp.org/news/use-react-router-to-build-single-page-applications/
Proofreader: ""

---

Single Page Applications (SPAs) have revolutionized web development. They offer a more dynamic and fluid user experience compared to traditional multi-page applications.

<!-- more -->

Traditional web apps require full-page reloads for almost every click the user makes. SPAs, on the other hand, load a single HTML page and update the page contents dynamically as users interact with the application. This dynamism mimics the feel of desktop applications and results in better responsive interactions.

### Before moving any further:

To follow along with what I'll discuss in this article, you should have some basic knowledge of React and how to set up a React project. If you already do, let's crack on.

## What are React Router and React Router DOM?

React router is a powerful library that manages navigation and routing in React applications. The React Router DOM is used specifically for web applications and has few DOM-specific APIs.

As we dive into the world of React Router DOM, we'll explore its core concepts while demonstrating their implementation in a React application. Our focus will be on building a simple navigation system with links to different components, illustrating how to configure routes, handle route matching, and implement navigation.

By the end of this article, you'll have a solid understanding of how to use React Router DOM to create dynamic and seamless navigation experiences in your single-page applications.

## How to Install React Router

As I explained above, React-router-DOM is used exclusively for integrating routing functionalities into web applications. So, in order to use it in your React app, you need to install the `react-router-dom` package by running this command in your React app terminal:

```react
npm install react-router-dom
```

After successfully installing it, you can now start routing in your React project.

## Core Concepts in React Router DOM

### BrowserRouter

BrowserRouter a parent component that houses all the route components. All routes that you use in an application must be declared within the `BrowserRouter`. Most importantly, it stores the current location in the browser's address bar using URLs which comes in handy during navigation.

To use the BrowserRouter, you'll need to import it from the `react-router-dom` in your App.jsx file.

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

The `BrowserRouter` has a `basename` attribute used to set base URL for all routes in an application. It's important if your app is hosted in a subdirectory on a domain.

```
<BrowserRouter basename="/shop">

</BrowserRouter>
```

Adding `/shop` as a basename will make sure that all route paths are relative to `/shop`.

### Routes

This component is a direct replacement for `switch` which was used in the former versions of React Router. It also acts like a parent and renders the first matching child route, which ensures that the correct component is displayed based on the current URL.

To declare routes, import `routes` from `react-router-dom` and position it within the `BrowserRouter` component.

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

`Route` a child component that consists of two attributes: **path** and **element**. A **path** can be any specified path name while the **element** attribute is the component that should be rendered. A route renders a specific component when the path specified matches a URL.

An application can have as many `route`s as it needs, and they must all be declared inside the `Routes` component. Assuming we have a `<Home\>` and `<Pricing\>` component, we will have to import the `Route` component and position it within the `Routes`.

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

### Undeclared Routes

There is a way to handle routes that do not exist in your application, just like an Error 404 page. To do this, create another component bearing a Not Found message and the `route` added.

Set the path name to `*` and pass the component as the **element.**

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

### Nested Routes

In some cases, routes can have children or sub-routes.

```
import { BrowserRouter, Routes, Route } from "react-router-dom";

//ALL COMPONENTS IMPORTS COMES HERE

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

On navigating to the nested elements, the URL on the browser will be reading something like `/categories/male` and `/categories/female`.

### Link

This acts like an anchor `href` attribute. It has a **to** attribute which specifies where the `Link` will take the user after a click. Usually, it is the path to a component's page that is passed to the **to** attribute.

Links are typically put in a Navbar component, so we will put two Links that point to the components path in our already declared Routes.

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

**NB:** If you are practicing along while reading this article, it is important to note that the `PageNav` component created here should be situated in your **App.jsx** and specifically just after the opening `BrowserRouter` tag before the Routes. This is to ensure the `PageNav` always stays at the top like a navigation menu despite routing through different components.

```
import { BrowserRouter, Routes, Route } from "react-router-dom";

//ALL COMPONENTS IMPORTS COMES HERE

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

NavLink performs the same function as `Link` and has a **to** attribute as well. But it's different as it has a class attribute. The class attributes are `active`, `isPending`, and `isTransitioning`. This makes it more versatile than `Link` and you can use it to conditionally add styles during user interactions.

```
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

Having child elements inside a parent route element means there is a layer of abstraction in rendering the child routes' UI. This is where the `Outlet` component comes into play. You add it to the parent route – in our example, it would be the `Categories` component.

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

This allows for the rendering of the child routes UI in the nested route.

![nested-routes](https://www.freecodecamp.org/news/content/images/2024/07/nested-routes.PNG)

Image showing children nested routes in Categories route

### `useNavigate` Hook

This hook returns a function that enables programmatic navigation between routes.

There are several ways to use the navigate function in your application. First, we need to import the `useNavigate` hook and initialize it as **navigate**.

```
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

We can use navigate in the following ways in our application:

-   Attaching it to a button via the `onClick` prop with the intended path to be navigated to, passed to the navigate function.

```react
 <button onClick={() => navigate("/categories")}>Go to Categories</button>
```

-   Using it with a `Link` component.

```react
<Link to={navigate("/categories")}>Go to Categories</Link>
```

-   Using a number instead of the component path in the **navigate** function. The number should specify the number of navigations backward in the history stack where you would like to go.

```react
<Link to={navigate(-1)}>Go one step backwards</Link>
```

### `useParams` Hook

Returns an object of the dynamic `params` gotten from the current URL matched by the Route's path. The parent routes pass all `params` to their child routes.

The example below shows an `OrderPage` component that will be rendered for every `customer` with their unique `id`. When the URL matches `/customer/123`, `:id` will be `123`.

```react
import { useParams } from "react-router-dom";

function App() {
  const {id} = useParams()
  return (
    <BrowserRouter>
    	<Routes>
        <Route path="customer">
        	<Route path=":id" element={<OrderPage/>}/>
           </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
```

### Final Result

At this point, we've fully implemented React Router in our small navigation project. This is what it looks like in full flow:

![Untitled-design](https://www.freecodecamp.org/news/content/images/2024/07/Untitled-design.gif)

For more detailed information and concepts about React router, you can visit the [Official React Router documentation][1] site.

## Conclusion

In this article, we've explored the concepts and implementation of Client Side Routing (CSR) in a React web application. React Router, through its web-centric library React-Router-DOM, enables CSR, allowing apps to update the URL with a click of a link without making a server request for a new document.

This functionality enhances the user experience by providing faster navigation and a more seamless interaction within the application. By leveraging CSR, developers can build more efficient and responsive single-page applications (SPAs), ultimately improving performance and user satisfaction.

If you enjoyed reading this article, you could [Buy me a Coffee][2].

Want to see more of these? Connect with me on [LinkedIn][3].

See you on the next one!

Happy Coding!

[1]: https://reactrouter.com/
[2]: https://buymeacoffee.com/timothyolanrewaju
[3]: https://www.linkedin.com/in/timothy-olanrewaju750/