---
title: 如何使用强大的构建工具配置来改进你的 JavaScript 代码
date: 2024-07-10T14:53:46.437Z
authorURL: ""
originalURL: https://www.freecodecamp.org/news/improve-your-javascript-projects-with-build-tools/
translator: ""
reviewer: ""
---

我已经是一名前端开发人员超过 6 年了，主要使用 JavaScript、TypeScript 和 React。当踏入前端世界时，可用的库和构建工具数量之多可能会让人不知所措——尤其是每个工具都有自己的配置选项。

<!-- more -->

起初，这些配置选项可能看起来像某种魔法。但一旦你开始理解它们的目的，就会发现这些配置是合理的。

像 ESLint、Prettier、Git hooks 等工具可以帮助你高效而明智地维护代码。在本文中，我们将深入研究这些工具，这些工具可以让你的代码更易于维护，并能帮助你（以及你的团队）提高生产力。

废话不多说，让我们开始吧。

## 目录：

-   [先决条件][1]
-   [我们在看什么工具和配置？][2]
-   [为什么这些约定很有用][3]
-   [如何设置编码约定][4]
-   [什么是 ESLint？][5]
-   [什么是 Git Hooks？][6]
-   [设置项目][7]
-   [规则 #1: `no-unused-vars`][8]
-   [规则 #2: `no-console`][9]
-   [规则 #3: `no-duplicate-imports` 和导入排序][10]
-   [如何设置 Git Hooks][11]
-   [Gitleaks：在提交前删除秘密][12]
-   [在提交前运行单元测试][13]
-   [总结][14]

## 先决条件

了解以下主题可能有助于你从本文中获得见解。因此，我强烈建议你浏览以下资源（或确保你熟悉列出的工具/概念）：

-   [ESLint][15] 的基础知识
-   使用 [npm][16] 或 [yarn][17] 设置一个简单的 JS 项目
-   [Bash 脚本][18]
-   使用 [Jest][19] 测试代码

## 我们在看什么工具和配置？

我见过许多仓库强制执行自己的严格约定——我完全赞同这一点。我发现的一个例子是 [Cesium 仓库][20] 及其[风格指南][21]。

从其他各种仓库中汲取灵感，本文将深入探讨以下指南，帮助你获得更好的开发体验：

-   不使用 console 语句
-   不使用未使用的导入和变量
-   排序导入语句
-   在提交前检查是否推送了任何密码、API 密钥或秘密
-   检查在提交之前是否有任何测试失败

### 为什么这些约定很有用

我发现这些规则很有用，因为它们可以提高你的开发效率。它们还可以使开发团队保持一致，以便每个人都遵循相同的约定/编码标准。

这些约定还让我在编写代码和遵循编码标准方面更加警惕。现在，我已经习惯于按照这些条款和标准思考问题，因为例如，使用未使用的导入和 console 语句会不必要地使代码混乱。

我发现排序导入使它们更具可读性和易于管理。我现在已经习惯于根据以下顺序查看 React 组件中的导入：

-   库导入
-   相对导入

我还发现工具检查是否有被推送的密码或秘密非常有用，因为它们可能会在提交历史中出现。

但最重要的是，我喜欢在提交之前检查是否有任何测试失败的规则。我认为这是一个非常聪明的策略，因为在这种情况下，你可以提前检查单元测试是否失败——这样你就知道是否需要修复任何问题。这也避免了你在远程仓库上运行的 CI 管道的过载。

## 如何设置编码约定

在我们深入研究将这些工具集成到你的项目之前，我想将它们分类如下：

-   基于 ESLint 的规则
-   Git hooks

首先让我们了解这些类别。

### 什么是 ESLint？

ESLint 是一个高度可配置的 JavaScript 代码检测工具，可以帮助你检测并修复 JavaScript 代码中的问题。从插件到规则等的每个配置都会检查你的代码，如果满足条件，它会针对该规则应用值。

你可以在[这里][22]阅读更多关于 ESLint 的核心概念。

### 什么是 Git Hooks？

Git hooks 是 Git 的一个功能，它帮助 Git 接入其工作流程，以便根据某些事件执行一些自定义操作。例如，你可以运行一个脚本，在提交之前美化一些暂存的更改。

有多个本地 Git hooks 可供你使用。以下是其中一些：

```
applypatch-msg.sample       pre-push.sample
commit-msg.sample           pre-rebase.sample
post-update.sample          prepare-commit-msg.sample
pre-applypatch.sample       update.sample
pre-commit.sample
```

你可以在[这里][23]阅读关于 Git hooks 的更多信息。

现在我们知道为什么要将这些约定分为这些类别，让我们开始了解你可以在项目中使用的规则和工具的旅程。

要演示我们上面讨论的所有规则和工具，我们需要一个简单的普通 JavaScript 项目。我选择了一个普通的 JS 项目，因为创建一个基于 React 的 Vite 项目对于本指南来说有些多余。

所以要开始创建项目，首先使用以下命令创建一个名为 `eslint-hook-examples` 的目录：

```bash
mkdir eslint-hook-examples
cd eslint-hook-examples
```

在该文件夹中运行以下命令来初始化一个普通的 JS 项目：

```bash
yarn init
```

回答提示中提出的问题，您应该能够继续。

现在让我们在这个项目中创建一个名为 `index.js` 的文件，并在其中放置以下内容：

```jsx
import { get, debounce } from "lodash";
import { throttle } from "lodash";

const num = 1;
const x = 2;

console.log({ num });
```

我创建上述代码时考虑到，我想展示不同的 ESLint 规则和 Git 钩子。

现在需要将 ESLint 添加到您的项目中。您可以通过运行以下命令来实现：

```bash
yarn add --dev eslint @eslint/js
```

接下来，您需要在根目录中，即 `package.json` 文件所在的位置，创建一个名为 `eslint.config.js` 的文件。在此文件中放置以下内容：

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

ESLint 在我们设置的 `eslint.config.js` 文件的配置文件上工作。这种配置格式被称为扁平文件格式配置。这已在较新版本的 ESLint（大于 v9）中支持。9 版本以下使用的是不同的文件命名约定 `.eslintrc` 文件，该文件放置在项目的根目录中。

您可以在[这里][24]阅读有关扁平文件配置的更多信息。

上面的 `eslint.config.js` 文件内容利用 `js.configs.recommended` 加载 JavaScript 推荐配置。它还引入了另一个对象，该对象定义了此配置启用的 `rules`。

现在它启用了 [no-unused-vars][25]，且值设置为 `warn`。此 `warn` 值告诉 ESLint 在语法检查时显示警告消息。如果您希望语法检查器将此案例显示为错误，也可以将该值设置为 `error`。

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

让我们测试一下这个设置，在 `index.js` 文件上运行我们的 ESLint。为此，请运行以下命令：

```shell
npx eslint ./index.js
```

![image](https://www.freecodecamp.org/news/content/images/2024/07/image.png)

运行 ESLint CLI 的输出

运行语法检查器后，您将得到上述问题。所有未使用的变量都在 `eslint-config.js` 文件中设置的 `no-unused-vars` 规则下被标记出来。

这就是语法检查的工作原理。但是，如果您可以在 IDE 中直接看到这些错误消息，不是很好吗？每个未使用变量名下都有一条波浪线？嗯，是的，这完全可能。在 VS Code 中，您可以通过添加 [ESLint VS Code 扩展][26] 来实现。

一旦在 VS Code 中安装了该扩展，您将需要配置它以使其拾取您创建的配置文件（`eslint.config.js`）。

要配置扩展，请按照以下 gif/步骤操作扩展的设置。

![eslint_settings-3](https://www.freecodecamp.org/news/content/images/2024/07/eslint_settings-3.gif)

VSCode ESLint 扩展

- 点击 VSCode 的扩展
- 点击 ESLint 扩展
- 然后在扩展名称下点击齿轮 ⚙️ 图标。
- 接下来，从下拉菜单中点击扩展设置
- 最后，点击 `settings.json`。

在 `settings.json` 文件中，添加以下代码到文件底部：

```jsx
"eslint.options": {
		 "overrideConfigFile": "./eslint.config.js" 
	},
```

这样确保该扩展能够拾取到你在项目根位置创建的配置文件。

需要注意的一件小事是，所有规则也可以设置为 `warn`，这样当规则被满足时，VSCode 可以提供警告信息。

以下是配置完成后的扩展在文件中的样子：

![image-2](https://www.freecodecamp.org/news/content/images/2024/07/image-2.png)

配置完成后的 Linter

现在让我们深入了解我们的第一条规则：`no unused variable` 规则。

## 规则 #1: `no-unused-vars`

![rule_1_banner](https://www.freecodecamp.org/news/content/images/2024/07/rule_1_banner.jpg)

照片由 [v2osk][27] 提供，发布在 [Unsplash][28]

这是那些 ESLint 规则之一，不允许在代码库中保留未使用的变量。您可以在[这里][29]阅读有关此规则的更多信息。

要在代码库中设置此规则，您需要将其添加到 `eslint.config.js` 文件的 `rules` 部分：

```jsx
export default [
  {
    rules: {
      "no-unused-vars": "error",
    },
  },
];
```

我们在设置项目的部分已经看过这条规则。但重新访问它也无妨。

> 💡 注意：此规则已存在于包含所有推荐 ESLint 规则的 `js.configs.recommended` 中

![rule_1](https://www.freecodecamp.org/news/content/images/2024/07/rule_1.png)

规则#1的输出已配置

## 规则 #2: `no-console`

![A wild thought image](https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExczIxMjJja2s5NWxjbHBsY3A2OXhzM2U4NW93d3NuYzhweWVlcmJ3eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ge7l7e5EiHUYI3e71P/giphy.webp)

我觉得这个规则非常有用，因为不重要的不必要的日志不应该出现在代码库中。通常我们只是为了调试目的添加这些日志。

这可能很危险，因为如果你处理的是个人数据，`console.log` 语句可能会在浏览器的控制台中泄露用户的敏感个人数据。因此你必须对此小心。

例如，你很可能会忘记删除某个 console 语句。以后在审核期间同样的事情会让你麻烦不断。

我理解这些日志在开发模式下很有帮助。所以在那些与环境相关的日志中，最好用一个自定义 Wrapper 把这些 `console.log` 语句包起来，这样可以根据环境启用/禁用日志。

因此，为了避免所有这些麻烦，ESLint 有 [no-console][30] 规则。每当它在你的代码库中发现 console 语句时，这个规则会提供 Linting。

要配置此规则，你需要做和之前一样的事情：

```jsx
export default [
  {
    rules: {
      "no-unused-vars": "error",
      "no-console": "error", // <---- 在这里添加规则
    },
  },
];
```

实际上，这个规则会像下面这样对你的代码库进行 Lint：

![Rule_2.png](https://www.freecodecamp.org/news/content/images/2024/07/Rule_2.png)

在配置规则#2时，console.log 变成了一个错误

## 规则 #3: `no-duplicate-imports` 和导入排序

![import cargo](https://i.giphy.com/26FmPNdnmllMwkoTK.webp)

船上的货物已排序

我喜欢这条规则的原因是它能帮助你保持导入的可读性极佳。你有没有见过一个大的 React 组件文件，其中的所有导入看起来很乱？是的，这很不好玩。

你可能甚至会有来自同一个库的不同导入。这些导入库的方法可能会混乱且难以追踪。这时，ESLint 的 [no-duplicate-imports][31] 规则和 [eslint-plugin-simple-import-sort][32] 插件派上了用场。

`no-duplicate-imports` 是一个 ESLint 规则，规定所有来自单个模块的导入可以合并为一个导入语句。

考虑下面的例子：

```jsx
import { get, set } from 'lodash';
import { zip } from 'lodash'; // <----- 根据 no-duplicate-imports 这是个错误
import React from 'react';
```

如你所见，前两行的导入属于同一个模块——即 Lodash 库。如果遵循这个规则，那么代码会像这样：

```jsx
import { get, set, zip } from 'lodash';
import React from 'react';
```

ESLint 没有任何帮助你排序导入的规则。在这种情况下，你可以从 [awesome-eslint][33] 上的各种社区插件中获得帮助。

`awesome-eslint` 是一个包含 ESLint 配置、插件、解析器、格式化程序等的仓库。我发现了一个名为 `eslint-plugin-simple-import-sort` 的插件，它帮助你按字母顺序排列导入，先是库导入然后是相对导入。

这是实际插件仓库中的示例片段：

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

你还可以设置这个插件的排序顺序为不同的方式，详情你可以阅读 [这里][34]。

让我们将这些规则和插件整合到我们的项目中。首先，你需要在配置中添加 `no-duplicate-imports` 规则：

```jsx
export default [
	{
		rules: {
			"no-duplicate-imports": "error", // <---- 在这里添加
			"no-unused-vars": "error",
			"no-console": "error",
		},
	},
];
```

这与我们之前配置的规则非常相似。我们将规则的值设置为 `error`。

接下来，开始在你的项目中配置 **`eslint-plugin-simple-import-sort`** 插件。首先，使用以下命令安装此插件：

```bash
yarn add --dev eslint-plugin-simple-import-sort
```

安装完成后，确保通过在 `eslint.config.js` 文件中添加此插件来启用它，如下所示：

```jsx
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default [
  {
    plugins: {
      "simple-import-sort": simpleImportSort, // <--- 添加插件
    },
    rules: {
      "no-duplicate-imports": "error",
      "no-unused-vars": "error",
      "no-console": "error",
      "simple-import-sort/imports": "error", // <--- 引用插件规则
    },
  },
];
```

在上述代码中，`simple-import-sort` 是插件命名空间，它的值是 `simpleImportSort` 插件对象。

现在要使用插件内部存在的规则，您所需要做的就是将插件命名空间后接规则名称作为键，并将值设置为 `error` —— 在我们的例子中是在规则部分内。

在我们的配置中，我们将 `simple-import-sort` 插件空间的 `imports` 规则表示为 `simple-import-sort/imports`。

一旦您将此规则添加到配置中，您可以看到如下所示的效果：

![sorting_imports-ezgif.com-optimize.gif](https://www.freecodecamp.org/news/content/images/2024/07/sorting_imports-ezgif.com-optimize.gif)

导入正在排序

您还可以通过在 ESLint VSCode 扩展的设置中启用 `codeActionsOnSave` 来配置这个导入排序，当您保存代码时自动执行：

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
	"editor.codeActionsOnSave": { //< ------ 添加此属性
		"source.fixAll.eslint": "explicit"
	}
}
```

现在您已经了解并添加了 ESLint 规则和插件，接下来让我们了解和实现 Git hooks。

## 如何设置 Git Hooks

![A fish hook](https://i.giphy.com/2VOB4tK9qsQ7efC2Ub.webp)

鱼钩

Git hooks 只是 Git 的强大功能。本篇文章覆盖所有关于 Git hooks 的细节和起源超出了我们的讨论范围，因此我强烈推荐您在[这里][35]阅读更多相关内容。

有许多库可以帮助您管理 Git hooks。在这里我将使用 [Husky][36]。在您的代码库中安装 Husky，请运行以下命令：

```bash
yarn add --dev husky
# 仅在您的包不是私有时添加 pinst
yarn add --dev pinst
```

安装后，确保通过以下步骤初始化它：

```bash
npx husky init
```

这将确保创建包含 precommit 脚本的 `.husky` 文件夹。它还会在 `package.json` 文件中添加 prepare 脚本。

现在您已经在项目中配置了 Husky，我们将实现我们的第一个 pre-commit hook 功能。

## Gitleaks：在提交前删除密钥

![Shhhh](https://i.giphy.com/yow6i0Zmp7G24.webp)

噓

Gitleaks 是一个分析您的代码库中的 API 密钥、密钥或密码的工具。根据仓库描述：

> _"Gitleaks 是一个用于**检测**和**防止**硬编码密钥（如密码、API 密钥和令牌）在 Git 仓库中的 SAST 工具。Gitleaks 是一个**易于使用的、一体化解决方案**，可检测代码中的过去或现在的密钥。"_

现在让我们在项目中通过 Husky 的 `precommit` hooks 实现 Gitleaks。

首先，通过以下命令安装 Gitleaks：

```bash
brew install gitleaks
```

安装完成后，开始编辑 `.husky` 文件夹内的 `precommit` 脚本文件。

我们的目标是在提交发生之前，通过 Gitleaks 工具分析所有已暂存的文件。`precommit` hook 是您可以在任何提交发生之前运行不同脚本的最佳选择。

Gitleaks 已提供一个示例 Python `precommit` hook。它检查 Gitleaks hook 是否启用。如果已启用，则在暂存文件上运行 Gitleaks `protect` 函数。您可以在[此处][37]找到该代码。

我使用 ChatGPT 将这个脚本转换为 bash 脚本。以下是它给我的结果：

```bash
#!/bin/bash

# 辅助脚本，用作 pre-commit hook。

gitleaksEnabled() {
    # 确定是否启用了 gitleaks 的 pre-commit hook。
    local out
    out=$(git config --bool hooks.gitleaks)
    if [ "$out" == "false" ]; then
        return 1
    fi
    return 0
}

# 检查是否安装了 gitleaks
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

在这个脚本中，我还要求 ChatGPT 添加一个附加功能，以检查系统中是否安装了 Gitleaks。如果未安装，则 `precommit` hook 停止执行，并以退出代码 1 退出。

现在要尝试您的 `precommit` hook，您应首先暂存更改：

接下来，提交更改如下：

```bash
git commit -m 'feat: added gitleaks precommit hook'
```

这将运行你定义的 `precommit` 钩子。它看起来如下：

![gitleaks.png](https://www.freecodecamp.org/news/content/images/2024/07/gitleaks.png)

在提交前运行 gitleaks 工具

## 在提交前运行单元测试

![A printer](https://i.giphy.com/gw3IWyGkC0rsazTi.webp)

嘘

Git 钩子的另一个实际用处是在暂存文件上运行单元测试。由于检查在本地发生，而不是推送到远程仓库，这会很有帮助。

虽然在 CI 上运行单元测试不是问题，但在暂存和相关文件上执行测试可以节省一些时间。这允许 CI 在将提交合并到发布分支之前专注于运行完整的单元测试套件。

因此，以下是使用 `precommit` 钩子在暂存文件上运行单元测试的流程：

- 找到扩展名为 `*.test.js/ts` 的暂存文件
- 运行这些暂存测试及其相关代码
- 如果在测试过程中有任何测试失败或错误，则退出 `precommit` 钩子（因此不会进行提交）。

### 步骤 1：找到暂存的文件

第一步是找到所有扩展名为 `*.test.js` 的暂存文件名。为此，你可以使用 `git diff` 命令：

```bash
git diff --cached --name-only --diff-filter=ACM | grep '\\.test\\.js$'
```

`git diff` 使你能找到已修改的更改和当前文件之间的差异。你可以在[这里][38]阅读更多关于 `git diff` 及其选项的信息。

接着，使用[管道符号][39]，我们借助 [grep][40] 过滤前一个 `git diff` 命令的输出。我们告诉 grep 查找所有以 `.test.js` 扩展名结尾的文件名。

### 步骤 2：在暂存文件上运行单元测试

现在要运行单元测试，确保你在项目中安装了 [Jest][41]。要在暂存文件及相关文件上运行单元测试，运行以下命令：

```bash
yarn run test --coverage --bail --findRelatedTests <staged-files-ending-with-.test.js>
```

上述命令将使用 `--findRelatedTests` 选项在当前暂存文件及相关文件上运行测试。它还会使用 `--coverage` 选项提供覆盖率报告，并在发现任何失败时使用 `--bail` 选项中断测试。

现在，上述命令的关键部分是你需要提供扩展名为 `.test.js` 的暂存文件。为此，使用步骤 1 中的命令。由于你在使用一个 bash 脚本，将步骤 1 的输出存储在一个变量中，并将其传递给单元测试命令：

```bash
# 列出暂存的 *.test.js 文件
stagedTestFiles=$(git diff --cached --name-only --diff-filter=ACM | grep '\\.test\\.js$')

yarn run test --coverage --bail --findRelatedTests $stagedTestFiles
```

你将在 `precommit` 脚本中添加上述命令。最终的预提交钩子脚本将如下所示：

```bash
#!/bin/bash

# 作为预提交钩子使用的辅助脚本。

gitleaksEnabled() {
    # 确定 gitleaks 的预提交钩子是否已启用。
    local out
    out=$(git config --bool hooks.gitleaks)
    if [ "$out" == "false" ]; then
        return 1
    fi
    return 0
}

# 为 ============================= 单元测试 =============================
# 列出暂存的 *.test.js 文件
stagedTestFiles=$(git diff --cached --name-only --diff-filter=ACM | grep '\\.test\\.js$')

if [ -n "$stagedTestFiles" ]; then
    echo "暂存的 *.test.js 文件:"
    yarn run test --coverage --bail --findRelatedTests $stagedTestFiles
else
    echo "没有暂存的 *.test.js 文件。"
fi

# 检查是否安装了 gitleaks
if ! command -v gitleaks &> /dev/null; then
    echo '错误: 你的系统上没有安装 gitleaks。'
    echo '请安装 gitleaks 以使用此预提交钩子。'
    exit 1
fi

# 为 ============================= 检查敏感信息 =============================
if gitleaksEnabled; then
    gitleaks protect -v --staged
    exitCode=$?
    if [ $exitCode -eq 1 ]; then
        echo '警告: gitleaks 在你的更改中检测到敏感信息。
若要禁用 gitleaks 预提交钩子，请运行以下命令：

    git config hooks.gitleaks false
'
        exit 1
    fi
else
    echo 'gitleaks 预提交钩子已禁用 (使用 `git config hooks.gitleaks true` 启用)'
fi

```

为了测试单元测试的预提交钩子，我创建了一个示例测试文件：`index.test.js`：

```jsx
const sum = 1 + 2;

describe("测试套件", () => {
	it("检查和套件", () => {
		expect(sum).toBe(3);
	});
});

```

以下是 `precommit` 钩子在测试通过和失败时生成的输出。

> 注意：这里我故意在 `index.test.js` 文件中生成错误。

运行以下命令以查看输出：

```shell
git commit -m '测试提交'
```

![Unit test failure.png](https://www.freecodecamp.org/news/content/images/2024/07/Unit-test-failure.png)

单元测试失败

![Unit test passing.png](https://www.freecodecamp.org/news/content/images/2024/07/Unit-test-passing.png)

单元测试通过

## 总结

-   什么是 ESLint 以及如何使用规则和插件配置它
-   我们还查看了 VSCode 的 ESLint 扩展，并配置它使用我们现有的平面配置文件
-   我们了解了 Git hooks 以及如何使用 Husky 管理你的 hooks
-   我们研究了如何在任何提交之前删除密钥和进行单元测试

在写这篇指南的时候我学到了很多东西，希望你也有所收获！

你可以在[这里][42]找到最后的代码。

非常感谢阅读我的文章！你可以在[推特][43]、[GitHub][44] 和 [领英][45] 上关注我。

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

