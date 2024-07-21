---
title: How to Optimize Next.js App Performance With Lazy Loading
date: 2024-07-19T22:31:12.000Z
author: TAPAS ADHIKARY
authorURL: https://www.freecodecamp.org/news/author/tapas/
OriginalURL: https://www.freecodecamp.org/news/next-js-performance-optimization/
Proofreader: ""

---

/ [#Next.js][1]

<!-- more -->

# How to Optimize Next.js App Performance With Lazy Loading

![TAPAS ADHIKARY](https://www.freecodecamp.org/news/content/images/size/w60/2022/02/4AE84473-6762-4606-BBD3-A77E1BBE1188.jpeg)

[TAPAS ADHIKARY][2]

  ![How to Optimize Next.js App Performance With Lazy Loading](https://www.freecodecamp.org/news/content/images/size/w2000/2024/07/lazyloading-next.js.png)

People don't like using slow applications. And the initial load time matters a lot for web applications and websites.

An application that takes more than 3 seconds to load is considered slow and may cause users to leave the application or website.

`Next.js` is a React-based framework you can use to build scalable, performant, and faster web applications and websites. With the inclusion of [React Server Components][3] in the Next.js app router release, developers have a new mental model for "thinking in a server components" way. It solves the problem with SEO, helps create `zero bundle size` react components, and the end result is faster loading of UI components.

But your application may not be always about the server components. You may need to use client components as well. Also, you may want to load them either as part of the application's initial load or on demand (say at the click of a button).

Loading a client component on the browser includes downloading the component code into the browser, downloading all the libraries and other components you had imported into that client component, and a few additional things that React takes care of for you to make sure your components are working.

Based on the user's internet connection and other network factors, the entire loading of the client component may take a while, which may keep your users from using the application more quickly.

This is where `Lazy Loading` techniques can come in handy. They can help save you from a monolithic loading of your client components on the browser.

In this article, we will discuss a couple of lazy loading techniques in Next.js for client component loading optimization. We will also talk about a few edge cases you should know to handle them better.

If you like to learn from video content as well, this article is also available as a video tutorial here: 🙂

<iframe width="356" height="200" src="https://www.youtube.com/embed/gq9bBZru78Y?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen="" title="Next.js Performance Optimization: Implementing Lazy Loading" name="fitvid0"></iframe>

Before we get started, a couple of things for you:

-   We will write a bunch of code to build an app to demonstrate the lazy loading techniques. You can find all the source code from this GitHub repository: [https://github.com/tapascript/nextjs-lazy-load][4]. But I strongly suggest that you write the code yourself as we proceed and use the repository only as a reference.
-   You can also access the app deployed publicly [on Netlify here][5].

Let's start 🚀. Oh yes, if you are Tom & Jerry cartoon lover, you are going to enjoy this even more!

## ******Table of Contents******

-   [What is Lazy Loading][6]?
-   [Lazy Loading Techniques in Next.js][7]
-   [Lazy Loading with dynamic import and next/dynamic][8]
-   [Lazy Loading with React.lazy() and Suspense][9]
-   [How to Lazy Load the Named Exported Components][10]
-   [Lazy Loading Your Server Components][11]
-   [Should We Lazy Load All Client Components in Next.js?][12]
-   [What's Next?][13]

## What is Lazy Loading?

In modern day web application development, we don't code all the logic in one JavaScript/TypeScript file, or all the styles into one mammoth CSS file. Rather, we split them at the source code level and create logical modules, business logic, presentational components, and style related files. This helps us organize our code better.

Then we use something called a bundler which kicks in at the build phase of the application development process. It creates bundles for our scripts and styles. Some of the famous bundlers are Webpack, Rollup, and Parcel, among others.

![image-43](https://www.freecodecamp.org/news/content/images/2024/07/image-43.png)

Bundler creating bundles from the source code

Now, as we have the bundles, if we try to load them on the browser all together, we will encounter some slowness. This is because the complete bundle needs to be loaded into the browser for the user interface to be functional.

![image-44](https://www.freecodecamp.org/news/content/images/2024/07/image-44.png)

Loading a huge bundle results in a poor loading experience

So, instead of waiting for the huge bundle to get loaded into the browser, modern web development libraries and tooling systems allow us to load the bundle in chunks.

We may want to load some of the chunks immediately, as users may need them sooner as the application loads. At the same time, we may want to wait to load certain parts of a web page until they're needed.

![image-45](https://www.freecodecamp.org/news/content/images/2024/07/image-45.png)

Breaking into chunks and loading what is needed

This mechanism of waiting to load part of the pages or application, and loading them only when they are absolutely necessary, is called `Lazy Loading`. The concept of lazy loading is not React or Next.js-specific. It is a performance optimization technique that you can implement with various libraries and frameworks.

## Lazy Loading Techniques in Next.js

Lazy loading techniques in Next.js is used to reduce the amount of JavaScript needed by a route. This helps the initial load performance of the application be faster. We can defer the load of the client components and imported libraries until they are needed.

There are two ways we can implement lazy loading techniques in Next.js:

-   Using dynamic imports with the help of the `next/dynamic` package.
-   Using a combination of `React.lazy()` and `Suspense`.

Let's understand each of these techniques with code examples.

## Lazy Loading With `dynamic import` and `next/dynamic`

`next/dynamic` is a combination of React.lazy() and Suspense from ReactJS. Using a dynamic import with the next/dynamic package is a preferred approach to achieve lazy loading in Next.js.

To demonstrate it, let's first create a Next.js app using the following command:

```bash
npx create-next-app@latest
```

You can start the app locally using the following command:

```bash
## Using npm
npm run dev

## Using yarn
yarn dev

## Or use pnpm, bun, whatever you wish!
```

Now create a folder called `components` under the `app/` directory. We will create all our components under the component folder. Now, create a folder called `tom` under the `app/components/`. Finally, create a React component called `tom.jsx` under the `app/components/tom/` directory with the following code:

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

To explain the above code:

-   We have created a ReactJS component called `LazyTom`.
-   It is a simple presentational component which has a heading and a couple of paragraphs talking about the cat, Tom, from the famous `Tom & Jerry` cartoon.
-   At the end, we have `default` exported the component to import it elsewhere.

Now, create another file called `tom-story.jsx` under the `app/components/tom/` directory with the following code:

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

The main magic of lazy loading with `dynamic` is happening in the above code:

-   We have created a client component called `TomStory` using the `"use client"` directive.
-   First, we have imported the `useState` hook for managing a toggle state, and the `dynamic` function from the `next/dynamic` for the lazy loading of the component we created before.
-   The `dynamic` function takes a function as an argument that returns the imported component. You can also configure a custom loading message by providing an optional configuration object as argument to the dynamic function.
-   The `dynamic()` function returns the lazily loaded component instance – that is, `LazyTom` (could be any name). But this component is not loaded yet.
-   In the JSX, we have a toggle button that shows and hides the `LazyTom` component. Note that the component will be lazy loaded into the user browser at the first instance of a button click. After that, if you hide and show it again, the `LazyTom` component will not be reloaded until we hard refresh the browser or clear the browser cache.
-   Finally, we have default exported the `TomStory` component.

Now we need to test it out. To do that, open the `page.js` file in the `app/` directory and replace the content with the following code:

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

This is a simple ReactJS component that imports the `TomStory` component and uses it in its JSX. Now open your browser window. Open the browser's DevTools and open the `Network` tab. Make sure that the `All` filter is selected.

Now access the app on your browser using `http://localhost:3000`. You should see the button to load Tom's story. Also a bunch of resources will be listed on the `Network` tab. These are resources required in the initial load of the application and have been downloaded on your browser.

The `LazyTom` component from the `tom.jsx` has not been downloaded yet. This is because we haven't yet clicked on the `Load Tom's Story` button.

![Screenshot-2024-07-17-at-9.21.10-AM](https://www.freecodecamp.org/news/content/images/2024/07/Screenshot-2024-07-17-at-9.21.10-AM.png)

The button to lazy load Tom's story

Now, click on the button. You should see a loading message for a moment and then the component will be loaded with Tom's story. You can now see the `tom.jsx` component listed in the `Network` tab and also the component rendered on the page with the Tom's story.

![Screenshot-2024-07-17-at-9.27.55-AM](https://www.freecodecamp.org/news/content/images/2024/07/Screenshot-2024-07-17-at-9.27.55-AM.png)

Now Tom's story is lazily loaded

Now that you have experienced how the `dynamic` function from `next/dynamic` helps us load a component lazily, let's get started with the other technique using `React.lazy()` and `Suspense`.

## Lazy Loading with `React.lazy()` and `Suspense`

To demonstrate this technique, let's start with Jerry's story, my favourite character from the Tom & Jerry cartoon.

First, we'll create a folder called `jerry` under the `app/components/` directory. Now, create a file called `jerry.jsx` under the `app/components/jerry/` with the following code:

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

The content of `jerry.jsx` is structurally similar to `tom.jsx`. Here we have posted Jerry's story, instead of Tom's, and default exported the component.

Like the last time, let's create a `jerry-story.jsx` file to showcase the lazy loading of Jerry's story. Create the file under the `app/components/jerry/` directory with the following code:

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

Here also we have a client component, and we will be using the `lazy()` method and `Suspense` from React, so we have imported them. Like the `dynamic()` function in the last technique, the `lazy()` function also takes a function as an argument that retrurns the lazily imported component. We have also provided the relative path to the component that we are trying to load.

Note that with `dynamic()` we had an opportunity to customize the loading message as part of the function itself. With `lazy()`, we will be doing that as part of the `Suspense` fallback.

Suspense uses a fallback when you wait for the data to load. If you would like to understand the Suspense and Error Boundary from ReactJS in-depth, you can [check out this video tutorial][14].

Here, as our `LazyJerry` component is loading lazily, we have provided a fallback to show a loading message until the component code is download into the browser successfully and rendered.

```js
{shown && 
    <Suspense fallback={<h1>Loading Jerry&apos;s Story</h1>}>
                <LazyJerry />
    </Suspense>
}
                              
```

Also, as you can see, we are loading the component on the first button click. Here also, the component will not be reloaded every time we click on the button unless we refresh the browser or clear the browser cache.

Let's now test it by importing it into the `page.js` file and adding the component in its JSX.

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

Now, you'll see another component appear on the user interface with a button to load Jerry's story. At this stage, you will not see the jerry.jsx component loaded into the browser.

![Screenshot-2024-07-17-at-9.33.36-AM](https://www.freecodecamp.org/news/content/images/2024/07/Screenshot-2024-07-17-at-9.33.36-AM.png)

The button to lazy load Jerry's story

Now, click on the button. You will see that the component is loaded, and you can see it on the Network tab list. You should be able to read Jerry's story rendered as part of the lazily loaded component.

![Screenshot-2024-07-17-at-9.37.30-AM](https://www.freecodecamp.org/news/content/images/2024/07/Screenshot-2024-07-17-at-9.37.30-AM.png)

Jerry's story is lazily loaded

## How to Lazy Load the Named Exported Components

So far, with both the techniques we have imported a component that was exported with the `default export` and then lazy loaded it. In JavaScript (and so in React), you can export and import modules in two different ways:

-   With the `default` keyword. In this case, the exported module can be imported with any name. You would use this if you wanted to export only one functionality from a module.
-   Without the `default` keyword, this is called a `named export`. In this case, you have to maintain the same module name for the export and import. You also need to enclose the module name in the curly brackets ({...}) while importing. You would use this if you wanted to export multiple functionalities from a module.

If you want to get into JavaScript modules and how they work in greater detail, I would suggest going through [this crash course][15] published on freeCodeCamp's YouTube channel.

To demonstrate the lazy loading of a `named export` component, let's create another simple presentational React component. This time we will use the angry but cute dog named `Spike` from the Tom & Jerry cartoon.

Create a folder called `spike` under the `app/components/` directory. Now, create a file called `spike.jsx` under the `app/components/spike/` directory with the following code:

```js
// spike.jsx

export const LazySpike = () => {
  return (
    <div className="flex flex-col">
      <h1 className="text-3xl my-2">The Lazy Spike</h1>
      <p className="text-xl my-1">
        In his attempts to catch Jerry, Tom often has to deal with Spike 🦮, known
        as &quot;Killer&quot; and &quot;Butch&quot; in some shorts, an angry, vicious but easily
        duped bulldog who tries to attack Tom for bothering him or his son Tyke
        while trying to get Jerry. Originally, Spike was unnamed and mute, aside
        from howls and biting noises as well as attacking indiscriminately, not
        caring whether it was Tom or Jerry though usually attacking Tom.
      </p>
      <p className="text-xl my-1">
      In
        later cartoons, Spike spoke often, using a voice and expressions,
        performed by Billy Bletcher and later Daws Butler, modeled after
        comedian Jimmy Durante. Spike&apos;s coat has altered throughout the years
        between gray and creamy tan. The addition of Spike&apos;s son Tyke in the
        late 1940s led to both a slight softening of Spike&apos;s character and a
        short-lived spin-off theatrical series called Spike and Tyke.
      </p>
    </div>
  );
};
```

Again, this component is structurally exactly same as the `tom.jsx` and `jerry.jsx` components we have seen before, but with two major differences:

1.  Here, we have exported the component without the default keyword, hence it is a `named export`.
2.  We are talking about the dog, Spike.

Now, we need to handle the lazy loading of a named exported component and it's going to be a bit different from the default exported component.

Create a file called `spike-story.jsx` under the `app/components/spike/` directory with the following code:

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
            <h2 className="text-xl my-1">Demonstrating <strong>Named Export</strong></h2>
            <button
                className="bg-slate-600 text-white rounded p-1"
                onClick={() => setShown(!shown)}
            >
                Load 🦮 Spike&apos;s Story
            </button>

            {shown && <LazySpike />}
        </div>
    );
}

export default SpikeStory;
```

Like `tom-story`, we are using the dynamic import with the next/dynamic. But let's zoom into the following block from the above code:

```js
const LazySpike = dynamic(() => import("./spike").then((mod) => mod.LazySpike), {
    loading: () => <h1>Loading Spike&apos;s Story...</h1>,
});
```

The changes you will notice here are that we are resolving the promise explicitly from the `import("./spike")` function using the the `.then()` handler function. We get the module first, and then pick the exported component by its actual name – that is `LazySpike` in this case. The rest of the things remain the same as before as in the `tom-story`.

Now to test it out, again import the component into the `page.js` file, and use it in the JSX  like the last two times.

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

There you go – you should see the new component rendered on the browser with a button to load Spike's story from the `spike.jsx` file which is not loaded yet.

![Screenshot-2024-07-17-at-9.59.55-AM](https://www.freecodecamp.org/news/content/images/2024/07/Screenshot-2024-07-17-at-9.59.55-AM.png)

The button to lazy load Spike's story

Clicking on the button will load the file into the browser and render the component to show you Spike's story.

![Screenshot-2024-07-17-at-10.02.01-AM](https://www.freecodecamp.org/news/content/images/2024/07/Screenshot-2024-07-17-at-10.02.01-AM.png)

Spike's story is lazily loaded

Below you can see all three components demonstrating three different techniques and uses cases side-by-side. You can test them together. The image below is showcasing lazy loading of two components in parallel where another component was already lazily loaded.

![Screenshot-2024-07-17-at-10.14.21-AM](https://www.freecodecamp.org/news/content/images/2024/07/Screenshot-2024-07-17-at-10.14.21-AM.png)

Lazily loading multiple components in parallel

Here is another case where all three components were lazy loaded, on demand with the respective button clicks.

![Screenshot-2024-07-17-at-10.05.35-AM-1](https://www.freecodecamp.org/news/content/images/2024/07/Screenshot-2024-07-17-at-10.05.35-AM-1.png)

All the stories lazy loaded

## Lazy Loading Your Server Components

We spoke about the lazy loading techniques of client components. Can we use the same on server components as well? Well, you can but you don't have to, as server components are already `code split` and the loading aspect is already been taken care of by Next.js. You are not going to get any kind of error if you are trying to do so, but it would be unnecessary.

In case, you are dynamically importing a server component that has one or more client components as children, those client components will be lazy loaded. But there won't be any impact on the (parent) server component itself.

Here is an example of a server component that has two client components as children:

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

Now, we are dynamically importing the server component into the `page.js` file and using it in its JSX. The child client components of the dynamically imported server component will be lazy loaded, but not the server component itself.

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

## Should We Lazy Load All Client Components in Next.js?

I had this question when I first started learning about lazy loading. Now that I have gained more experience with this technique, here is my perspective:

You don't have to lazy load all client components. Optimzation is great, but over optimization can have adverse effects. You need to identify where these optimizations are required.

-   Do you have client components that are really bulky?
-   Are you unnecessarily putting so many things into one component that you should break it down and refactor?
-   Do you import heavy libraries into your client components?
-   Have you opted for tree-shaking?
-   Can you mark bulky client components per route and is it fine not to load some or all of them at the initial load of the page for that route?

As you see, these are a bunch of meaningful questions to ask before you step into optimizing things. Once you have answers, and decide you need lazy loading, then you can implement the techniques you learned from this article.

## What's Next?

That's all for now. Did you enjoy reading this article and have you learned something new? If so, I would love to know if the content was helpful. I have my social handles provided below.

Up next, if you are willing to learn `Next.js` and its ecosystem like `Next-Auth(V5)` with both fundamental concepts and projects, I have a great news for you: you can [check out this playlist on my YouTube][16] channel with 20+ video tutorials and 11+ hours of engaging content so far, for free. I hope you like them as well.

Let's connect.

-   Subscribe to my [YouTube Channel][17].
-   [Follow me on X (Twitter][18]) or [LinkedIn][19] if you don't want to miss the daily dose of up-skilling tips.
-   Check out and follow my Open Source work on [GitHub][20].
-   I regularly publish meaningful posts on my [GreenRoots Blog][21], you may find them helpful, too.

See you soon with my next article. Until then, please take care of yourself, and keep learning.

---

![TAPAS ADHIKARY](https://www.freecodecamp.org/news/content/images/size/w60/2022/02/4AE84473-6762-4606-BBD3-A77E1BBE1188.jpeg)

[TAPAS ADHIKARY][22]

Writer . YouTuber . Creator . Mentor

---

If you read this far, thank the author to show them you care. Say Thanks

Learn to code for free. freeCodeCamp's open source curriculum has helped more than 40,000 people get jobs as developers. [Get started][23]

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