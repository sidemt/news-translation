---
title: How to Improve Your JavaScript Code with Powerful Build Tool Configs
date: 2024-07-10T14:53:46.437Z
authorURL: ""
originalURL: https://www.freecodecamp.org/news/improve-your-javascript-projects-with-build-tools/
translator: ""
reviewer: ""
---

I have been a frontend developer for over 6 years now, mostly working with Javascript, TypeScript, and React. When stepping into the world of the front end, the number of libraries and build tools available can be overwhelming – especially since each has its own configuration options.

<!-- more -->

At first these configuration choices might look like some sort of magic. But once you start to understand their purpose, it becomes clear that these configurations make sense.

Tools such as ESLint, Prettier, Git hooks, and others can help you maintain your code efficiently and judiciously. In this article, we will be diving into these tools that make your code maintainable and that can help you to boost your (and your team's) productivity as well.

So without further ado, let’s get started.

## Table of Contents:

-   [Prerequisites][1]
-   [What Tools and Configs Are We Looking At?][2]
-   [Why These Conventions Are Useful][3]
-   [How to Setup Coding Conventions][4]
-   [What is ESLint?][5]
-   [What are Git Hooks?][6]
-   [Set Up the Project][7]
-   [Rule #1: `no-unused-vars`][8]
-   [Rule #2: `no-console`][9]
-   [Rule #3: `no-duplicate-imports` and Sorting Imports][10]
-   [How to Set Up Git Hooks][11]
-   [Gitleaks: Remove Secrets Before Commits][12]
-   [Run Unit Tests Before Commits][13]
-   [Summary][14]

## Prerequisites

Having some knowledge on the below topics might help you gain insights from this article. So I highly recommend that you go through the below resources (or make sure you're familiar with the tools/concepts listed):

-   Basics of [ESLint][15]
-   Setting up a simple JS project with [npm][16] or [yarn][17]
-   [Bash Scripting][18]
-   [Testing code with Jest][19]

## What Tools and Configs Are We Looking At?

I have seen many repositories that enforce their own strict conventions – and I totally agree with them. One such example I found is the [Cesium repository][20] and [their style guides][21].

Taking inspiration from various other repositories, we are going to dive into the following guidelines in this article to help you have a better developer experience:

-   No console statements
-   No unused imports and variables
-   Sorting import statements
-   Check if any passwords, API keys, or secrets are being pushed before a commit
-   Check if any tests are failing before pushing to a commit

### Why These Conventions Are Useful

I found these rules to be useful because they increase your productivity as a dev. They also align development teams so that everyone follows the same conventions/coding standards.

These conventions have also made me vigilant about writing good code and following coding standards. Now it has become my habit to think in these terms and standards because, for example, having unused imports and console statements clutters your code unnecessarily.

I find sorting imports makes them more readable and easy to manage. I now have a habit of looking at the imports in a React component based on:

-   Library imports
-   Relative imports

I've also found tools that check if passwords or secrets are being pushed to be super useful, since they might appear later in the commit history.

But above all, I like having a rule to check if any tests are failing or not before making a commit. I believe that this is a very smart strategy, because in this case you're checking beforehand for any unit test failures – so you'll know if anything needs to get fixed. This also avoids overloading the CI pipelines that you're running on remote repositories

## How to Setup Coding Conventions

Before we dive into incorporating these tools into your project, I would like to categorize them into the following:

-   ESLint-based rules
-   Git hooks

Let's first understand these categories.

### What is ESLint?

ESLint is a highly configurable JavaScript linter that helps you detect and fix the problems in your JavaScript code. Each configuration from plugins to rules and more are checked against your code and it applies the value against that rule if the condition is met.

You can read more about ESLint’s core concepts [here][22].

### What are Git Hooks?

Git hooks is a feature of Git that helps Git tap into its workflows so that some custom actions can be performed based on certain events. For example, you can run a script that will prettify some staged changes before making a commit.

There are multiple local Git hooks available to you. Some of them are below:

```
applypatch-msg.sample       pre-push.sample
commit-msg.sample           pre-rebase.sample
post-update.sample          prepare-commit-msg.sample
pre-applypatch.sample       update.sample
pre-commit.sample
```

You can read more about Git hooks [here][23].

Now that we know why we're dividing up these conventions into these categories, let's start our journey of understanding the rules and tools that you're going to learn about that you can use in your projects.

## Set Up the Project

To demonstrate all the rules and tools that we discussed above, we will need a simple vanilla JavaScript project. I've chosen a vanilla JS project because creating a React-based Vite project would be overkill for this guide.

So to start creating the project, first create a directory named `eslint-hook-examples` with the below command:

```bash
mkdir eslint-hook-examples
cd eslint-hook-examples
```

Inside this folder run the below command to initialize a vanilla JS project:

```bash
yarn init
```

Answer the question stated in the prompt and you should be good to go.

Now let's create a file named `index.js` inside this project and place the following content in it:

```jsx
import { get, debounce } from "lodash";
import { throttle } from "lodash";

const num = 1;
const x = 2;

console.log({ num });

```

I have created the above code keeping in mind that I want to demonstrate different ESLint rules and Git hooks.

Now you need to add ESLint to your project. You can do that by running the following command:

```bash
yarn add --dev eslint @eslint/js
```

Next, you need to create a file named `eslint.config.js` into your root directory – that is, where you have your `package.json` file. Place the following content inside this file:

```jsx
import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    rules: {
      "no-unused-vars": "warn",
    },
  },
];

```

ESLint works on the configuration files that we set in the `eslint.config.js` file. This format of configurations is called a flat file format configuration. This is now supported with newer versions of ESLint, greater than v 9. Versions below 9 use a different file naming convention `.eslintrc` file which is placed inside the root dir of the project.

You can read more about flat file configuration [here][24].

The above content of the `eslint.config.js` file loads the recommend configs for JavaScript with the help of `js.configs.recommended`. It also introduces another object that defines the `rules` that this configurations enables.

Right now it enables [no-unused-vars][25] which is set to a `warn` value. This `warn` value tells ESLint to show warning message while linting. You can also set this value to `error` if you want the linter to show this case as an error.

```jsx
import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    rules: {
      "no-unused-vars": "error",
    },
  },
];

```

Let's give this setup a spin and run our ESLinting on `index.js` file. To do that, run the following command:

```shell
npx eslint ./index.js
```

![image](https://www.freecodecamp.org/news/content/images/2024/07/image.png)

Output of running ESLint CLI

After running the linter, you'll get the above issues. All our unused variables are getting flagged under the `no-unused-vars` rule that you set in your `eslint-config.js` file.

So this is how linting works. But wouldn’t it be awesome if you could get these error messages in your IDE itself with a squiggly line below each variable name that is unused? Well, yes – it's absolutely possible. In VS Code you can do this by adding the [ESLint VS code extension][26].

Once the extension is installed in your VS Code, you'll want to configure it so that it picks up the configuration file that you have created (`eslint.config.js`).

To configure your extension, follow the gif/steps below to go through the settings of the extension.

![eslint_settings-3](https://www.freecodecamp.org/news/content/images/2024/07/eslint_settings-3.gif)

VSCode ESLint Extension

-   Click on the VSCode's extension
-   Click on the ESLint extension
-   Then below the extension name, click on the gear ⚙️ icon.
-   Next, click on the extension settings from the dropdown
-   Finally, click on `settings.json`.

Inside the `settings.json` file, add the following code at the bottom of the file:

```jsx
"eslint.options": {
		 "overrideConfigFile": "./eslint.config.js" 
	},
```

This makes sure that the extension picks up the config file that you created at the project’s root location.

A quick thing to note is that all the rules can also be set to `warn` so that VSCode can give warning lints when the rule is met.

Here is how the configured extension will look like on a file:

![image-2](https://www.freecodecamp.org/news/content/images/2024/07/image-2.png)

Linter when configured

Let's now dive into our first rule: the `no unused variable` rule.

## Rule #1: `no-unused-vars`

![rule_1_banner](https://www.freecodecamp.org/news/content/images/2024/07/rule_1_banner.jpg)

Photo by [v2osk][27] on [Unsplash][28]

This is one of those ESLint rules that doesn’t allow you to keep unused variables in your codebase. You can read more about this rule [here][29].

To setup this rule in your codebase, you'll add it in the `rules` section of the `eslint.config.js` file:

```jsx
export default [
  {
    rules: {
      "no-unused-vars": "error",
    },
  },
];
```

We already looked at this rule in the setting up the project section. But there is no harm in re-visiting it.

> 💡 NOTE: This rule is already present in the `js.configs.recommended` which consists of all the recommended ESLint rules

In action, this rule will highlight your unused variables like below:

![rule_1](https://www.freecodecamp.org/news/content/images/2024/07/rule_1.png)

Output of rule#1 is configured

## Rule #2: `no-console`

![A wild thought image](https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExczIxMjJja2s5NWxjbHBsY3A2OXhzM2U4NW93d3NuYzhweWVlcmJ3eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ge7l7e5EiHUYI3e71P/giphy.webp)

I find this rule super useful because unnecessary logs that aren’t important shouldn’t be present in the codebase. We generally just add these logs for debugging purposes.

This can be dangerous because `console.log` statements can reveal sensitive personal data from your users in the browser’s console if you are dealing with personal data. So you have to be careful about that.

For example, the chance is high that you might forget to remove a console statement. Later the same thing will bite you when audits happen.

I understand that these logs are helpful in development mode. So in those cases where the logs are environment-dependent, it's better if you wrap these `console.log` statements with a custom wrapper that helps you to enable/disable the logs based on the environment.

So to avoid all this hassle, ESLint has the [no-console][30] rule. This rule will provide linting whenever it finds console statement in your code base.

To configure this rule, you need to do the same thing that we did earlier:

```jsx
export default [
  {
    rules: {
      "no-unused-vars": "error",
      "no-console": "error", // <---- Add rule here
    },
  },
];

```

In action, this rule will lint your codebase like below:

![Rule_2.png](https://www.freecodecamp.org/news/content/images/2024/07/Rule_2.png)

console.log becomes an error when rule #2 is configured

## Rule #3: `no-duplicate-imports` and Sorting Imports

![import cargo](https://i.giphy.com/26FmPNdnmllMwkoTK.webp)

Cargos sorted on the ship

What I love about this rule is that it helps you to keep your imports super readable. Have you seen a big React component file that has all its imports and that looks messed up? Yeah it's not fun.

You might even have different imports that are from the same library. These kinds of ways of importing libs can be chaotic and hard to follow. This is where the [no-duplicate-imports][31] ESLint rule and [eslint-plugin-simple-import-sort][32] ESLint plugin comes into play.

`no-duplicate-imports` is an ESLint rule that states that all the imports from a single module can be grouped into a single import statement.

Consider the following example:

```jsx
import { get, set } from 'lodash';
import { zip } from 'lodash'; // <----- error as per the no-duplicate-imports
import React from 'react';
```

As you can see, the imports in the first two lines belong to the same module – that is, the Lodash library. If the rule is followed, then the code will look like this:

```jsx
import { get, set, zip } from 'lodash';
import React from 'react';
```

ESLint doesn’t have any rule that will help you sort your imports. In this case, you can get help from different community-based plugins on [awesome-eslint][33].

`awesome-eslint` is a repository of ESLint configs, plugins, parsers, formatters, and so on. I found this plugin called `eslint-plugin-simple-import-sort` that helps you sort your imports alphabetically, with library imports first and then the relative imports.

Here is a snippet of the example from the actual plugin repo:

```jsx
import React from "react";
import Button from "../Button";

import styles from "./styles.css";
import type { User } from "../../types";
import { getUser } from "../../api";

import PropTypes from "prop-types";
import classnames from "classnames";
import { truncate, formatNumber } from "../../utils";
```

⬇️

```jsx
import classnames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { getUser } from "../../api";
import type { User } from "../../types";
import { formatNumber, truncate } from "../../utils";
import Button from "../Button";
import styles from "./styles.css";
```

You can also set the sorting order of this plugin to something different, which you can read more about [here][34].

Let's incorporate these rules and plugins in our project. First, you'll add the `no-duplicate-imports` rule in your config:

```jsx
export default [
	{
		rules: {
			"no-duplicate-imports": "error", // <---- HERE
			"no-unused-vars": "error",
			"no-console": "error",
		},
	},
];

```

It's very similar to the rules that we configured earlier. We set the rule’s value to be `error`.

Next, start with configuring the **`eslint-plugin-simple-import-sort`** plugin in your project. First, install this plugin with the following command:

```bash
yarn add --dev eslint-plugin-simple-import-sort
```

Once this is installed, make sure this plugin is enabled by adding it into your `eslint.config.js` file like below:

```jsx
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default [
  {
    plugins: {
      "simple-import-sort": simpleImportSort, // <--- add plugin
    },
    rules: {
      "no-duplicate-imports": "error",
      "no-unused-vars": "error",
      "no-console": "error",
      "simple-import-sort/imports": "error", // <--- refer the rule of the plugin
    },
  },
];
```

In this code, we first import the plugin as `simpleImportSort`. Then in the exported array, just above the `rules` property, we add the `plugins` property. This property will consist of all the plugins that we want to enable in the form of key being the plugin namespace and value being the plugin object.

In the above code, the `simple-import-sort` is the plugin namespace and its value is the plugin object which is `simpleImportSort`.

Now to use the rules that are present inside the plugins, all you have to do is refer to the plugin namespace followed by the rule name as the key and value to be the `error` – in our case inside the rules section.

In our config, we refer to the rule `imports` of the `simple-import-sort` plugin space as `simple-import-sort/imports`.

Once you've added this rule into the config, you can see it in action as below:

![sorting_imports-ezgif.com-optimize.gif](https://www.freecodecamp.org/news/content/images/2024/07/sorting_imports-ezgif.com-optimize.gif)

Imports getting sorted

You can also configure this sorting of imports when you save your code by enabling the `codeActionsOnSave` in the settings of the ESLint VSCode extension:

```jsx
{
	"[typescriptreact]": {
		"editor.defaultFormatter": "esbenp.prettier-vscode"
	},
	"[typescript]": {
		"editor.defaultFormatter": "esbenp.prettier-vscode"
	},
	"[javascript]": {
		"editor.defaultFormatter": "esbenp.prettier-vscode"
	},
	"workbench.sideBar.location": "right",
	"diffEditor.ignoreTrimWhitespace": false,
	"workbench.colorTheme": "Default Dark+",
	"editor.stickyScroll.enabled": true,
	"prettier.useTabs": true,
	"editor.formatOnSave": true,
	"window.zoomLevel": 1,
	"eslint.options": {
		 "overrideConfigFile": "./eslint.config.js" 
	},
	"eslint.format.enable": true,
	"editor.codeActionsOnSave": { //< ------ Add this property
        "source.fixAll.eslint": "explicit"
    }
}

```

Now that you understand and have added the ESLint rules and plugins, let's now understand and implement Git hooks.

## How to Set Up Git Hooks

![A fish hook](https://i.giphy.com/2VOB4tK9qsQ7efC2Ub.webp)

A fish hook

Git hooks are nothing but Git features on steroids. All the details and the origin or Git hooks are out of the scope of this article, so I highly recommend that you read more about them [here][35].

There are many libraries out there that will help you manage your Git hooks. I will use [Husky][36] here. To install Husky in your codebase, run the below commands:

```bash
yarn add --dev husky
# Add pinst ONLY if your package is not private
yarn add --dev pinst
```

Once it's installed, make sure to initialize it by doing the following:

```bash
npx husky init
```

This makes sure that it creates the `.husky` folder that consists of the precommit script. It also adds the prepare script inside the `package.json` file.

Now that you've configured Husky in your project, we'll implement our first pre-commit hook feature.

## Gitleaks: Remove Secrets Before Commits

![Shhhh](https://i.giphy.com/yow6i0Zmp7G24.webp)

Shhhh

Gitleaks is a tool that analyses your codebase for any API Keys, secrets, or passwords. According to the repository:

> _"Gitleaks is a SAST tool for **detecting** and **preventing** hardcoded secrets like passwords, API keys, and tokens in Git repos. Gitleaks is an **easy-to-use, all-in-one solution** for detecting secrets, past or present, in your code."_

Let's now implement Gitleaks in our project with the help of `precommit` hooks with Husky.

First, install Gitleaks with the following command:

```bash
brew install gitleaks
```

Once this is installed, start by editing the `precommit` script file that is present inside the `.husky` folder.

Our aim here is to check that all the files that are staged are being analysed by the Gitleaks tool before the commit happens. The `precommit` hook is the best option where you can run different scripts before any commit happens.

Gitleaks already has one example in the Python `precommit` hook. It checks if the Gitleaks hook is enabled. If it is enabled, then it runs the Gitleaks `protect` function on the staged files. You can find that code [here][37].

I converted this script into a bash script with the help of ChatGPT. Here is the result that it gave me:

```bash
#!/bin/bash

# Helper script to be used as a pre-commit hook.

gitleaksEnabled() {
    # Determine if the pre-commit hook for gitleaks is enabled.
    local out
    out=$(git config --bool hooks.gitleaks)
    if [ "$out" == "false" ]; then
        return 1
    fi
    return 0
}

# Check if gitleaks is installed
if ! command -v gitleaks &> /dev/null; then
    echo 'Error: gitleaks is not installed on your system.'
    echo 'Please install gitleaks to use this pre-commit hook.'
    exit 1
fi

if gitleaksEnabled; then
    gitleaks protect -v --staged
    exitCode=$?
    if [ $exitCode -eq 1 ]; then
        echo 'Warning: gitleaks has detected sensitive information in your changes.
To disable the gitleaks precommit hook run the following command:

    git config hooks.gitleaks false
'
        exit 1
    fi
else
    echo 'gitleaks precommit disabled (enable with `git config hooks.gitleaks true`)'
fi
```

In this script, I also asked ChatGPT to add an additional feature to check if Gitleaks is installed in the system or not. If it isn’t, then the `precommit` hook stops its execution with exit code 1.

Now to try out your `precommit` hook, you should first stage the changes:

```bash
git add .
```

Next, commit the changes as follows:

```bash
git commit -m 'feat: added gitleaks precommit hook'
```

This will run the `precommit` hook that you defined. It will look like below:

![gitleaks.png](https://www.freecodecamp.org/news/content/images/2024/07/gitleaks.png)

gitleaks tool running before commit

## Run Unit Tests Before Commits

![A printer](https://i.giphy.com/gw3IWyGkC0rsazTi.webp)

Shhhh

Another practical use of Git hooks is running unit tests on staged files. This is helpful as the check occurs locally and isn't pushed to the remote repository.

While running the unit test on CI isn't an issue, executing the test on staged and related files can save some time. This allows the CI to focus on running the complete unit test suite before merging the commit to the release branch.

So below is the flow for using the `precommit` hook that will run the unit tests on staged files:

-   Find the staged files that have `*.test.js/ts` file extensions
-   Run these staged tests along with their related code
-   If there are any test failures or errors while testing, then exit the `precommit` hook (so the commit doesn't happen).

### Step 1: Find the files that are staged

The first step is to find all the file names that are staged with the extension `*.test.js`. To do that, you can use the `git diff` command:

```bash
git diff --cached --name-only --diff-filter=ACM | grep '\\.test\\.js$'
```

`git diff` helps you find the difference between the modified changes and the current file. You can read more about `git diff` and its options [here][38].

Next, using the [pipe symbol][39], we filter the output of the previous `git diff` command with the help of [grep][40]. We tell grep to find all the file names that end with the `.test.js` extension.

### Step 2: Run the unit test on staged files

Now to run the unit test, make sure that you have installed [Jest][41] in your project. To run the unit test on the staged files and the files related to it, run the below command:

```bash
yarn run test --coverage --bail --findRelatedTests <staged-files-ending-with-.test.js>
```

The above command will run the test on the current staged files and the files related to it with the `--findRelatedTests` option. It will also provide a coverage report with the `--coverage` option and will interrupt the tests when any failure is found with the `--bail` option.

Now the main part of the above command that is you need to provide the files that are staged with the `.test.js` extension. To do that, use the command in step 1. Since you're using a bash script, store step 1’s output in a variable and pass it on to the unit test command:

```bash
# List the staged *.test.js files
stagedTestFiles=$(git diff --cached --name-only --diff-filter=ACM | grep '\\.test\\.js$')

yarn run test --coverage --bail --findRelatedTests $stagedTestFiles
```

You will add the above commands in your `precommit` script. The final pre-commit hook script will look like this:

```bash
#!/bin/bash

# Helper script to be used as a pre-commit hook.

gitleaksEnabled() {
    # Determine if the pre-commit hook for gitleaks is enabled.
    local out
    out=$(git config --bool hooks.gitleaks)
    if [ "$out" == "false" ]; then
        return 1
    fi
    return 0
}

# For ============================= UNIT TESTING =============================
# List the staged *.test.js files
stagedTestFiles=$(git diff --cached --name-only --diff-filter=ACM | grep '\\.test\\.js$')

if [ -n "$stagedTestFiles" ]; then
    echo "Staged *.test.js files:"
    yarn run test --coverage --bail --findRelatedTests $stagedTestFiles
else
    echo "No *.test.js files are staged."
fi

# Check if gitleaks is installed
if ! command -v gitleaks &> /dev/null; then
    echo 'Error: gitleaks is not installed on your system.'
    echo 'Please install gitleaks to use this pre-commit hook.'
    exit 1
fi

# For ============================= CHECKING SECRETS =============================
if gitleaksEnabled; then
    gitleaks protect -v --staged
    exitCode=$?
    if [ $exitCode -eq 1 ]; then
        echo 'Warning: gitleaks has detected sensitive information in your changes.
To disable the gitleaks precommit hook run the following command:

    git config hooks.gitleaks false
'
        exit 1
    fi
else
    echo 'gitleaks precommit disabled (enable with `git config hooks.gitleaks true`)'
fi

```

To test the precommit hook on the unit test, I created a sample test file: `index.test.js`:

```jsx
const sum = 1 + 2;

describe("test suite", () => {
	it("check sum suit", () => {
		expect(sum).toBe(3);
	});
});

```

Here is how the `precommit` hook generates the output when the test passes and fails.

> Note: Here I tried to purposefully generate the error in the `index.test.js` file.

Run the below command to see the output:

```shell
git commit -m 'test commit'
```

![Unit test failure.png](https://www.freecodecamp.org/news/content/images/2024/07/Unit-test-failure.png)

Failed Unit Tests

![Unit test passing.png](https://www.freecodecamp.org/news/content/images/2024/07/Unit-test-passing.png)

Passing Unit Tests

## Summary

To summarise, here's what you learned about in this article:

-   What ESLint is and how you can configure it with rules and plugins
-   We also looked at VSCode’s ESLint extension and configured it to use our existing flat configuration file
-   We learned about Git hooks and how you can use Husky to manage your hooks.
-   We looked into how you can remove secrets and perform unit testing before any commit.

I learned a lot while writing this guide, and I hope you got a lot out of it!

You can find the final code [here][42].

Thanks a lot for reading my article! You can follow me on [Twitter][43], [GitHub][44], and [LinkedIn][45].

[1]: #prerequisites
[2]: #what-tools-and-configs-are-we-looking-at
[3]: #why-these-conventions-are-useful
[4]: #how-to-setup-coding-conventions
[5]: #what-is-eslint
[6]: #what-are-git-hooks
[7]: #set-up-the-project
[8]: #rule-1-no-unused-vars
[9]: #rule-2-no-console
[10]: #rule-3-no-duplicate-imports-and-sorting-imports
[11]: #how-to-set-up-git-hooks
[12]: #gitleaks-remove-secrets-before-commits
[13]: #run-unit-tests-before-commits
[14]: #summary
[15]: https://eslint.org/docs/latest/use/core-concepts/
[16]: https://docs.npmjs.com/cli/v10/commands/npm-init
[17]: https://classic.yarnpkg.com/lang/en/docs/cli/init/
[18]: https://www.freecodecamp.org/news/bash-scripting-tutorial-linux-shell-script-and-command-line-for-beginners/
[19]: https://www.youtube.com/watch?v=IPiUDhwnZxA
[20]: https://github.com/CesiumGS/cesium
[21]: https://github.com/CesiumGS/cesium/blob/main/Documentation/Contributors/CodingGuide/README.md#coding-guide
[22]: https://eslint.org/docs/latest/use/core-concepts/
[23]: https://www.atlassian.com/git/tutorials/git-hooks
[24]: https://eslint.org/docs/latest/use/configure/configuration-files
[25]: https://eslint.org/docs/latest/rules/no-unused-vars#rule-details
[26]: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
[27]: https://unsplash.com/@v2osk?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash
[28]: https://unsplash.com/photos/assorted-armchair-on-wall-near-door-1hUY8SpJ8Cw?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash
[29]: https://eslint.org/docs/latest/rules/no-unused-vars#rule-details
[30]: https://eslint.org/docs/latest/rules/no-console#rule-details
[31]: https://eslint.org/docs/latest/rules/no-duplicate-imports#rule-details
[32]: https://github.com/lydell/eslint-plugin-simple-import-sort
[33]: https://github.com/dustinspecker/awesome-eslint?tab=readme-ov-file
[34]: https://github.com/lydell/eslint-plugin-simple-import-sort?tab=readme-ov-file#sort-order
[35]: https://git-scm.com/docs/githooks
[36]: https://typicode.github.io/husky/
[37]: https://github.com/gitleaks/gitleaks/blob/26f34692fac6e9daec13c770421b4ed990d1c321/scripts/pre-commit.py
[38]: https://git-scm.com/docs/git-diff
[39]: https://superuser.com/a/756259
[40]: https://www.freecodecamp.org/news/grep-command-in-linux-usage-options-and-syntax-examples
[41]: https://jestjs.io/docs/getting-started
[42]: https://github.com/keyurparalkar/eslint-githooks-example
[43]: https://twitter.com/keurplkar
[44]: http://github.com/keyurparalkar
[45]: https://www.linkedin.com/in/keyur-paralkar-494415107/