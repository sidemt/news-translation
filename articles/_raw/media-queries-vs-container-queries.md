---
title: Media Queries vs Container Queries – Which Should You Use and When?
date: 2024-07-10T15:08:08.936Z
authorURL: ""
originalURL: https://www.freecodecamp.org/news/media-queries-vs-container-queries/
translator: ""
reviewer: ""
---

As the web evolves, new tools and ideas are released with the goal of making our lives as web developers easier. This means we have to choose whether to stick with the old ways or discard them entirely for the shiny new stuff. But does this always demand an either-or solution?

<!-- more -->

When in situations like these, the ideal approach is to understand both concepts – compare and contrast their strengths and weaknesses and then decide their most appropriate applications. This is exactly what this article will do with CSS media queries and container queries.

## Table of Contents

-   [Responsive and Intrinsic Web Design][1]
-   [What are media queries?][2]
-   [What are container queries?][3]
-   [Real-life comparison and key differences][4]
-   [Which should you use and when?][5]
-   [Conclusion][6]

## Responsive and Intrinsic Web Design

Before 2010, web developers could get away with creating websites that worked mainly on desktop. This was until Ethan Marcotte introduced the concept of Responsive Web Design (RWD). It's [defined by MDN][7] as _a way to design for a multi-device web_. This lead to the adoption of media queries as a component of RWD.

But lately there's been a shift towards what Jen Simmons defined as Intrinsic Web Design – the need for creating context-aware components. And container queries are making this possible.

## What Are Media Queries?

Media queries are rules for applying specified styles to an element if certain conditions are met. They’re popularly used to ensure that websites are responsive on various devices by querying the viewport width.

Media queries are characterized by an @media rule followed by a condition in parentheses and an expression within brackets that will be applied if the indicated condition is met. So, if we wanted to change the background color of a div based on the viewport width of a device, this is how we might do that:

```css
/* Mobile */
@media (max-width: 480px) {
  .mysite {
    background-color: red;
  }
}
```

In the sample code above, we’re asking for the <div> with class of mysite to be given a background-color of red if the viewport reaches a maximum width of 480px.

**Tip**: Max-width is used to assume a desktop-first design and targeting smaller as we go down. If it were a mobile-first design, we'd use min-width to target bigger screens as we go up.

## What Are Container Queries?

Container queries are rules for applying specified styles to an element based on the size of that element’s parent container. They're an answer to a long-standing question by web developers who wanted the ability to respond to changes within an individual container on the page rather than the whole viewport.

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

As you can see in the code above, we first define a container whose children we want to make changes to. In our case, we’d like to make changes to the element with class of item, within the header container. You can do this by giving the container a name (optional) and type.

Next, using the @container rule, we check for condition(s) and apply some styles if met. For a minimum width of 600px, we want green as the background-color and two grid columns.

**Tip**: You don't define a container to make changes directly to that container – but to it's children. This means that if we wanted to make changes to the header container itself, we would have to nest it within another container: for instance container A and query A to affect it's child – header.

## How Do Media Queries and Container Queries Compare?

Now, with an understanding of how both work, let's see them in real-life. The CodePen below shows four elements in a layout. The first two are styled with container queries while the bottom two are styled with media queries. You can resize the viewport to see how the elements respond.

![mqvscq-demo](https://www.freecodecamp.org/news/content/images/2024/06/mqvscq-demo.png)

Media and container queries CodePen demo: project inspired by Miriam Suzanne.

See the Pen [MQ vs CQ (from MS)][8] by Ophy Boamah ([@ophyboamah][9]) on [CodePen][10].

### Key Differences Between Media Queries and Container Queries

![comparetable](https://www.freecodecamp.org/news/content/images/2024/06/comparetable.png)

Summary of main differences, explained in detail below

### Viewport-based vs. Container-based

Media queries apply styles based on the size of the viewport (the entire browser window). This means that the layout changes according to the overall screen size, making it suitable for adjusting designs for different devices like mobile phones, tablets, and desktops.

Container queries, on the other hand, apply styles based on the size of the container element in which they are placed. This allows individual components to adapt their appearance based on their own size rather than the viewport size, making them highly flexible and reusable across different parts of a web page.

### Modularity and Flexibility

Since media queries depend on the viewport size, they can be less effective for creating truly modular components. Adjusting styles for one part of a page may unintentionally affect others, especially in complex layouts. Plus, they may fall short in scenarios where components need to adapt independently within a larger layout. This can lead to less maintainable CSS.

In contrast, container queries promote modularity and flexibility by allowing styles to be defined based on the container's size. This means you can create components that are self-contained, adaptable, and that can be reused in various parts of a website without unexpected changes, enhancing their reusability.

This results in more adaptive designs where components can adjust their own layout and appearance, which is useful in modern, component-based design systems.

### Complexity and Maintenance

In large projects, managing numerous media queries can become cumbersome. As the number of breakpoints and special cases grows, the CSS can become complex and harder to maintain. Over time, this can lead to a bloated and difficult-to-manage codebase.

Container queries can simplify the maintenance of CSS in large projects. By keeping styles component-specific and context-aware, the CSS remains more organized and modular. This reduces the complexity of managing global breakpoints and makes it easier to maintain, leading to a more organized codebase.

## Which Should You Use and When?

![finalsection](https://www.freecodecamp.org/news/content/images/2024/06/finalsection.png)

Media query vs container query (image credit: _[web.dev][11]_)

Everything we discussed in the previous sections is meant to help you make an informed decision. Having seen how these two concepts compare and contrast, now consider the following factors:

### Understanding and Comfort

How well do you understand each concept? Container queries are relatively new but if you spend time studying and experimenting with them, just like media queries, the learning curve isn’t intimidating. So use in production the one you understand and are more comfortable with, to make your life easier.

### Project Requirements and Complexity

What’s the design approach you’re using and how complex is your project? Because sometimes the design approach for your project will determine which of these will best suit your needs. Also, the more complex, the harder it’ll get to maintain your code and you want to use something you can manage.

### Future Trends and Collaboration

The future of responsive design is looking more and more intrinsic. We’re gradually making a shift towards component responsiveness based on changes to their individual content, and container queries shine best here.

But media queries don't seem to be going anywhere anytime soon, so you can use them together to achieve perfect responsiveness across many different devices.

## Conclusion

The potential for container queries to allow creating reusable components in CSS is exciting – but it may not be ready to fully replace media queries for making web pages responsive just yet.

For now, our best bet is using them together, and where each makes the most sense. And you can be sure to make the right call by experimenting further to internalize the pros and cons of each.

Here are some helpful resources:

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