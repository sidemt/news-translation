---
title: 如何创建一个交互式终端风格的作品集网站
date: 2024-07-10T14:45:28.396Z
authorURL: ""
originalURL: https://www.freecodecamp.org/news/how-to-create-interactive-terminal-based-portfolio/#what-is-jquery-terminal
translator: ""
reviewer: ""
---

在本文中，你将学习如何用 JavaScript 创建一个交互式终端风格的作品集和简历。我们将使用 [jQuery Terminal 库][1] （以及一些其他工具）来创建一个看起来像真实终端的网站。

<!-- more -->

本文将展示 jQuery Terminal 库的高级用法。如果你需要更基础的内容，可以查看这篇文章：[如何用 JavaScript 创建一个交互式终端风格的网站][2]，这篇文章更适合入门程序员。你也可以在阅读本文之前先阅读那篇文章。

## 目录

-   [目录][3]
-   [什么是终端？][4]
-   [什么是 jQuery Terminal？][5]
-   [基础 HTML 文件][6]
-   [如何初始化终端][7]
-   [问候语][8]
    -   [行间距][9]
    -   [如何为 ASCII 艺术添加颜色][10]
    -   [终端格式化][11]
    -   [如何使用 lolcat 库][12]
    -   [彩虹 ASCII 艺术问候语][13]
    -   [如何使问候文本变为白色][14]
-   [如何编写第一个命令][15]
-   [默认命令][16]
-   [如何让帮助命令可执行][17]
-   [语法高亮][18]
-   [自动补全][19]
-   [如何添加 Shell 命令][20]
-   [如何改进补全功能][21]
-   [打字动画命令][22]
-   [鸣谢命令][23]
-   [预填充命令][24]
-   [接下来做什么？][25]

## 什么是终端？

终端有着悠久的历史。它始于 [打孔卡][26] 的升级。早期的计算机使用电传打字机，它仅仅是一个键盘和打印机。你在键盘上输入，击键会被发送到计算机（通常是主机），输出则打印在打印机上。

后来，电传打字机被终端取代。终端像是今天我们所见到的哑终端计算机。它是一个带键盘的 CRT 显示器。因此，输出不再打印在打印机上，而是显示在显示器上。

今天我们仍然使用这种接口（命令行）与计算机交流。

这些是终端仿真器，是 Unix 系统的重要组成部分，例如 GNU/Linux 或 MacOS。在 Windows 上，你有 PowerShell 或 cmd.exe，它们允许你输入命令并以文本形式获得响应。你还可以在 Windows 上以 WSL 形式安装 GNU/Linux 系统。CLI 接口主要用于高级用户、开发者和系统管理员。

如果你是命令行新手，可以阅读这篇文章：[初学者命令行指南 – 如何像专业人士一样使用终端 \[全文手册\]][27]。

## 什么是 jQuery Terminal？

jQuery Terminal 是一个 JavaScript 库。它是 [jQuery 库][28] 的一个插件。jQuery Terminal 更像是一个以 jQuery 为依赖项的框架。本文中我们主要使用 JavaScript，仅少量使用 jQuery。

让我们使用 jQuery Terminal 创建我们的终端风格作品集。

## 基础 HTML 文件

首先你需要包含 jQuery 和 jQuery Terminal 库。

这是一个基础 HTML 文件：

```html
<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/jquery.terminal/css/jquery.terminal.min.css"/>
</head>
<body>
<script src="https://cdn.jsdelivr.net/npm/jquery"></script>
<script src="https://cdn.jsdelivr.net/npm/jquery.terminal/js/jquery.terminal.min.js"></script>
<script src="my-terminal.js"></script>
</body>
</html>
```

然后在 **my-terminal.js** 文件中，我们将用 JavaScript 编写我们的代码。

## 如何初始化终端

要创建一个基本终端，你需要插入以下代码：

```javascript
const commands = {};

const term = $('body').terminal(commands);
```

字符串 `'body'` 表示应创建终端的 CSS 选择器。在这里，我们使用 `'body'`，因此终端将是页面上唯一的东西。但它不必是全屏的。你可以创建一个终端仅为页面一部分的网站，像是操作系统的一部分窗口。

传递给 terminal 方法的第一个参数称为解释器。这是一种添加命令的方法。对象是创建它们的最简单方法。查看 [创建解释器][29] 了解更多。

如果终端字体太小，你可以通过 CSS 自定义属性（也称为 CSS 变量）将其稍微放大：

```css
:root {
    --size: 1.2;
}
```

## 问候语

我们需要做的第一件事是去掉默认问候消息并用漂亮的自定义 [ASCII 艺术][30] 替换它。我们将使用用 JavaScript 编写的 [Filget 库][31]。

在 npm 上有几个 figlet 库。我们将使用一个名为 [figlet][32] 的包。

首先你可以做的是选择合适的字体。访问 [figlet playground][33] 并写下你想要的问候文本。我们将使用“Terminal Portfolio”，然后点击“Test All”。它将用所有字体显示你的文本。滚动浏览列表并选择你喜欢的字体。

![Przechwycenie-obrazu-ekranu_2024-04-26_22-18-26](https://www.freecodecamp.org/news/content/images/2024/04/Przechwycenie-obrazu-ekranu_2024-04-26_22-18-26.png)

终端投资组合 ASCII 艺术

你可以将此文本复制并放入字符串中，但你会遇到诸如反斜杠需要转义引号字符的问题。

```
const greetings = `  ______                    _             __   ____             __  ____      ___     
 /_  __/__  _________ ___  (_)___  ____ _/ /  / __ \\____  _____/ /_/ __/___  / (_)___ 
  / / / _ \\/ ___/ __ \`__ \\/ / __ \\/ __ \`/ /  / /_/ / __ \\/ ___/ __/ /_/ __ \\/ / / __ \\
 / / /  __/ /  / / / / / / / / / / /_/ / /  / ____/ /_/ / /  / /_/ __/ /_/ / / / /_/ /
/_/  \\___/_/  /_/ /_/ /_/_/_/ /_/\\__,_/_/  /_/    \\____/_/   \\__/_/  \\____/_/_/\\____/`

const term = $('body').terminal(commands, {
    greetings
});
```

**注意**：jQuery Terminal 的第二个参数是带有选项的对象——我们使用了一个单一选项 `greetings`。

这看起来不太好，很难修改。此外，如果你通过硬编码字符串来创建问候语，它可能会在较小的屏幕上变形。 这就是为什么我们将在 JavaScript 中使用 figlet 库。

首先，我们需要在 HTML 中包含 figlet 库：

```html
<script src="https://cdn.jsdelivr.net/npm/figlet/lib/figlet.js"></script>
```

要在 JavaScript 中初始化该库，我们需要加载字体：

```javascript
const font = 'Slant';

figlet.defaults({ fontPath: 'https://unpkg.com/figlet/fonts/' });
figlet.preloadFonts([font], ready);
```

此代码将加载 `'Slant'` 字体，并在字体加载完成后调用 `ready` 函数。

所以我们需要编写这个函数：

```javascript
function ready() {

}
```

现在我们可以做两件事，我们可以将 jQuery Terminal 的初始化放在该函数中：

```javascript
let term;

function ready() {
   term =  $('body').terminal(commands, {
      greetings
   });
}
```

这样，我们可以使用 `greeting` 选项，但我们也可以使用 `echo` 方法来渲染问候语，并且在初始化终端时，我们将 `null` 或 `false` 作为 `greetings` 来禁用默认的问候语：

```javascript
const term = $('body').terminal(commands, {
    greetings: false
});

function ready() {
   term.echo(greetings);
}
```

这将更好地工作，因为库将立即初始化终端，而不需要等待加载字体。

请注意，我们仍然需要使用 figlet 定义问候语。为此，我们可以编写以下函数：

```javascript
function render(text) {
    const cols = term.cols();
    return figlet.textSync(text, {
        font: font,
        width: cols,
        whitespaceBreak: true
    });
}
```

这个函数使用 `figlet::textSync()` 方法返回字符串，并使用 `terminal::cols()` 获取每行字符数。这样，我们就可以使文本具有响应性。

这个函数可以在 `ready` 内部使用。

```javascript
function ready() {
   term.echo(render('Terminal Portfolio'));
}
```

这将创建一个字符串并将其传递给 `echo` 方法。但这与：

```javascript
term.echo(greeting);
```

和我们的硬编码问候语一样。所以如果你调整终端大小，问候语仍然可能会变形。为了使文本具有响应性，你需要 `echo` 一个函数。 在每次终端重新渲染时（例如调整页面大小时），该函数将被调用。

我们可以使用箭头函数来实现这一点：

```javascript
function ready() {
   term.echo(() => render('Terminal Portfolio'));
}
```

如果你想在 ASCII 艺术下方添加一些文本，你可以通过在 `render` 之后连接字符串来实现：

```javascript
function ready() {
   term.echo(() => {
     const ascii = render('Terminal Portfolio');
     return `${ascii}\nWelcome to my Terminal Portfolio\n`;
   });
}
```

**注意**：如果你运行此代码，你会注意到 ASCII 艺术后面有一个空行。 这是因为 figlet 库在文本后添加了一些空格。为了去除它，你可以使用 `string::replace` 和一个正则表达式来删除末尾的所有空格和换行符。

我们不能使用 `string::trim()`，因为我们不想移除前导行：

```javascript
function render(text) {
    const cols = term.cols();
    return trim(figlet.textSync(text, {
        font: font,
        width: cols,
        whitespaceBreak: true
    }));
}

function trim(str) {
    return str.replace(/[\n\s]+$/, '');
}
```

你可以做的另外一件事是当加载字体时暂停终端：

```javascript
const term = $('body').terminal(commands, {
    greetings: false
});

term.pause();

function ready() {
   term.echo(() => render('Terminal Portfolio')).resume();
}
```

与 jQuery 类似，你可以连锁终端方法。

## 行间隙

如果你选择的字体会在行之间产生空隙，比如在这个使用 ANSI Shadow 字体的图像中所示：

![Przechwycenie-obrazu-ekranu_2024-05-08_14-06-41](https://www.freecodecamp.org/news/content/images/2024/05/Przechwycenie-obrazu-ekranu_2024-05-08_14-06-41.png)

ASCII 艺术与行间隙

你可以通过将 `ansi` 选项设置为 `true` 来删除空隙。该选项是专门为解决显示 [ANSI 艺术][34] 问题而添加的。

上述 ASCII 艺术将显示为:

![Przechwycenie-obrazu-ekranu_2024-05-08_14-57-16](https://www.freecodecamp.org/news/content/images/2024/05/Przechwycenie-obrazu-ekranu_2024-05-08_14-57-16.png)

去除间隙的 ASCII 艺术

## 如何给 ASCII 艺术添加颜色

你可以用一个叫做 lolcat 的库来给大的 ASCII 艺术增添色彩。lolcat 是一个 Linux 命令，可以在终端中用彩虹颜色显示文本。而有一个叫[isomorphic-lolcat][35]的库，你可以在 JavaScript 中使用它来让你的 ASCII 艺术变成彩虹颜色。

### 终端格式化

要使用 lolcat 库，你首先需要知道如何更改终端的颜色。

你可以使用如此低级别的格式化来实现：

```
[[b;red;]some text]
```

整个文本用括号包裹，文本的格式在额外的括号里，其中每个参数用分号分隔。要了解更多关于语法的内容，你可以阅读 Wiki 文章：[Formatting and Syntax Highlighting][36]。

这里，我们只使用基本的颜色更改。除了红色之外，你还可以使用 CSS 颜色名称、十六进制颜色或 `rgb()`。

### 如何使用 lolcat 库

要使用这个库，我们首先需要在 HTML 中包含它：

```html
<script src="https://cdn.jsdelivr.net/npm/isomorphic-lolcat"></script>
```

要用颜色格式化字符串，我们可以使用这个函数：

```javascript
function rainbow(string) {
    return lolcat.rainbow(function(char, color) {
        char = $.terminal.escape_brackets(char);
        return `[[;${hex(color)};]${char}]`;
    }, string).join('\n');
}

function hex(color) {
    return '#' + [color.red, color.green, color.blue].map(n => {
        return n.toString(16).padStart(2, '0');
    }).join('');
}
```

`lolcat.rainbow` 将调用一个函数，输入字符串的每个字符，并将颜色作为一个包含 RGB 值和字符的对象传递。

### 彩虹 ASCII 艺术问候语

要使用这段代码，你需要用彩虹函数来包裹渲染调用：

```javascript
function ready() {
   term.echo(() => {
     const ascii = rainbow(render('Terminal Portfolio'));
     return `${ascii}\nWelcome to my Terminal Portfolio\n`;
   }).resume();
}
```

你也可以使用两次 echo 调用，因为只有 Figlet 消息需要在函数内执行：

```javascript
function ready() {
   term.echo(() => rainbow(render('Terminal Portfolio')))
       .echo('Welcome to my Terminal Portfolio\n').resume();
}
```

你会注意到当你调整窗口大小时，彩虹颜色会随机变化。这是 lolcat 的默认行为。要改变它，你需要设置[随机种子][37]。

```javascript
function rand(max) {
    return Math.floor(Math.random() * (max + 1));
}

function ready() {
   const seed = rand(256);
   term.echo(() => rainbow(render('Terminal Portfolio'), seed))
       .echo('Welcome to my Terminal Portfolio\n').resume();
}

function rainbow(string, seed) {
    return lolcat.rainbow(function(char, color) {
        char = $.terminal.escape_brackets(char);
        return `[[;${hex(color)};]${char}]`;
    }, string, seed).join('\n');
}
```

`rand` 函数返回一个从 0 到 max 的伪随机数。这里我们创建一个从 0 到 256 的随机值。

### 如何使问候语文本变白

如我们之前展示的，你可以通过终端格式化来使文本变白。  
你可以使用：

-   `[[;white;]Welcome to my Terminal Portfolio]`
-   `[[;#fff;]Welcome to my Terminal Portfolio]`
-   `[[;rgb(255,255,255);]Welcome to my Terminal Portfolio]`

此外，如果你包含额外的文件 XML 格式化，你可以使用 XML 类型的语法。这使得格式化更加容易。

```html
<script src="https://cdn.jsdelivr.net/npm/jquery.terminal/js/xml_formatting.js"></script>
```

在 HTML 中包含上述文件后，你可以使用 CSS 命名颜色作为 XML 标签：

```xml
<white>Welcome to my Terminal Portfolio</white>
```

XML 格式化支持更多的标签，比如链接和图片，参见 [Extension XML Formatter][38]，在 Wiki 上。

**注意**: XML 格式化器是添加到 `$.terminal.defaults.formatters` 中的一个函数，它将输入的类似 XML 的文本转换为终端格式化。你可以将相同内容添加到你的格式化器中。

## 如何编写第一个命令

在问候语之后，我们可以编写我们的第一个命令。它将是有帮助的，并且可以与我们以后添加的任何命令一起使用。

```javascript
const commanns = {
    help() {

    }
};
```

这将是我们的帮助命令，我们将在其中添加我们终端作品集中可用的命令列表。我们将使用 [Intl.ListFormat][39]，它创建一个带有 and 在最后一个元素前面的元素列表。

```javascript
const formatter = new Intl.ListFormat('en', {
  style: 'long',
  type: 'conjunction',
});
```

要创建一个列表，我们需要使用 `formatter.format()` 并传递一个命令数组。  
要获取该数组，我们可以使用 `Object.keys()`：

```javascript
const commands = {
    help() {
        term.echo(`List of available commands: ${help}`);
    }
};

const command_list = Object.keys(commands);
const help = formatter.format(command_list);
```

当你输入 help 时，你应该看到：

```
List of available commands: help
```

```javascript
const commands = {
    help() {
        term.echo(`可用命令列表: ${help}`);
    },
    echo(...args) {
        term.echo(args.join(' '));
    }
};
```

现在 help 命令可以工作了：

```
可用命令列表: help 和 echo
```

但是如果你尝试执行 'echo hello' 会得到一个错误：

```
[Arity] 参数数量错误。函数 'echo' 期望 0 但得到 1!
```

默认情况下，jQuery Terminal 会检查参数的数量和函数接受的参数数量。问题是 `rest` 操作符使所有参数都变成可选的，并且 length 函数属性为 0。要解决这个问题，我们需要通过选项禁用参数检查：

```javascript
const term = $('body').terminal(commands, {
    greetings: false,
    checkArity: false
});
```

现在 echo 命令应该可以工作了。

## 默认命令

默认情况下，jQuery Terminal 有两个默认命令：

-   `clear`: 此命令清除终端上的所有内容。
-   `exit`: 此命令退出嵌套解释器。

你可以通过传递名称到选项并设置为 false 来禁用它们。由于我们不使用嵌套解释器，我们可以禁用 `exit`：

```javascript
const term = $('body').terminal(commands, {
    greetings: false,
    checkArity: false,
    exit: false
});
```

但 `clear` 很有用。所以我们可以将其添加到命令列表中：

```javascript
const command_list = ['clear'].concat(Object.keys(commands));
```

## 如何使帮助命令可执行

我们可以通过允许点击命令并像用户输入一样执行来改善用户体验。我们需要一些步骤。首先，我们需要给每个命令添加格式并添加一个 HTML 类属性。我们还可以使命令为白色以便更明显。

```javascript
const command_list = Object.keys(commands);
const formatted_list = command_list.map(cmd => {
    return `<white class="command">${cmd}</white>`;
});
const help = formatter.format(formatted_list);
```

接下来是添加[提示][40]。为了表示用户可以点击命令，我们需要在 CSS 中更改光标：

```css
.command {
    cursor: pointer;
}
```

最后一步是在用户点击命令时执行命令。我们需要添加一个事件处理程序，可以使用 jQuery（jQuery Terminal 依赖项）或原生浏览器的 `[addEventListener][41]`。这里我们使用 jQuery：

```javascript
term.on('click', '.command', function() {
   const command = $(this).text();
   term.exec(command);
});
```

`terminal::exec()` 是一种编程方式来执行命令，就像用户输入并按下回车一样。

你可以通过输入 `help` 并再次点击 `help` 来测试它。

点击 `echo` 会打印一行空白。我们可以通过在执行 `terminal::echo()` 之前检查参数数组是否为空来解决这个问题：

```javascript
const commands = {
    echo(...args) {
        if (args.length > 0) {
            term.echo(args.join(' '));
        }
    }
};
```

现在点击 `echo` 只会显示执行的命令。

**注意**：如果由于某种原因你不想显示提示符和已执行的命令，你可以通过传递 `true` 作为第二个参数来静默 `exec`。

```javascript
term.exec('help', true);
```

## 语法高亮

如前所述，我们可以通过将函数推送到 `$.terminal.defaults.formatters` 来使用自定义的 shell 语法高亮。我们还可以使用 `$.terminal.new_formatter` 辅助函数。

让我们在输入命令时使命令变为白色。格式化器可以是正则表达式和替换的数组，或者一个函数。我们有固定数量的命令，并且只希望将列表中的命令变为白色。我们可以通过添加正则表达式来实现：

```javascript
const any_command_re = new RegExp(`^\s*(${command_list.join('|')})`);
```

这个正则表达式会检查字符串的开头是否有一个可选的空格和一个命令。现在正则表达式看起来是这样的：`/^\s*(help|echo)/`。

```javascript
$.terminal.new_formatter([any_command_re, '<white>$1</white>']);
```

如果你希望将命令参数变成不同的颜色，你需要一个函数，你可以使用 [String::replace][42]。

```javascript
const re = new RegExp(`^\s*(${command_list.join('|')}) (.*)`);

$.terminal.new_formatter(function(string) {
    return string.replace(re, function(_, command, args) {
        return `<white>${command}</white> <aqua>${args}</aqua>`;
    });
});
```

这只是使用 `String::replace` 的一个例子。如果你只有一个替换，可以使用数组。这将是一样的：

```javascript
const re = new RegExp(`^\s*(${command_list.join('|')})(\s?.*)`);

$.terminal.new_formatter([re, function(_, command, args) {
    return `<white>${command}</white><aqua>${args}</aqua>`;
}]);
```

**注意**：如果你将类 `<white class="command">` 添加到格式化器，你将能够点击已输入的命令再次执行它。

## Tab 补全

我们可以添加的另一个功能是在按下 Tab 键时补全命令。这非常简单——我们只需将补全选项设置为 true：
```

现在，当你输入 `h` 并按下 Tab 键，它将为你完成 `help` 命令。

## 如何添加 Shell 命令

现在我们可以添加一些最重要的命令，使我们能够在投资组合中导航。我们将目录实现为主要入口，因此用户需要输入 `ls` 命令来查看内容列表，`cd` 进入该目录，然后再次 `ls` 查看内容。

```javascript
const directories = {
    education: [
        '',
        '<white>education</white>',

        '* <a href="https://en.wikipedia.org/wiki/Kielce_University_of_Technology">Kielce University of Technology</a> <yellow>"Computer Science"</yellow> 2002-2007 / 2011-2014',
        '* <a href="https://pl.wikipedia.org/wiki/Szko%C5%82a_policealna">Post-secondary</a> Electronic School <yellow>"Computer Systems"</yellow> 2000-2002',
        '* Electronic <a href="https://en.wikipedia.org/wiki/Technikum_(Polish_education)">Technikum</a> with major <yellow>"RTV"</yellow> 1995-2000',
        ''
    ],
    projects: [
        '',
        '<white>Open Source projects</white>',
        [
            ['jQuery Terminal',
             'https://terminal.jcubic.pl',
             'library that adds terminal interface to websites'
            ],
            ['LIPS Scheme',
             'https://lips.js.org',
             'Scheme implementation in JavaScript'
            ],
            ['Sysend.js',
             'https://jcu.bi/sysend',
             'Communication between open tabs'
            ],
            ['Wayne',
             'https://jcu.bi/wayne',
             'Pure in browser HTTP requests'
            ],
        ].map(([name, url, description = '']) => {
            return `* <a href="${url}">${name}</a> &mdash; <white>${description}</white>`;
        }),
        ''
    ].flat(),
    skills: [
        '',
        '<white>languages</white>',

        [
            'JavaScript',
            'TypeScript',
            'Python',
            'SQL',
            'PHP',
            'Bash'
        ].map(lang => `* <yellow>${lang}</yellow>`),
        '',
        '<white>libraries</white>',
        [
            'React.js',
            'Redux',
            'Jest',
        ].map(lib => `* <green>${lib}</green>`),
        '',
        '<white>tools</white>',
        [
            'Docker',
            'git',
            'GNU/Linux'
        ].map(lib => `* <blue>${lib}</blue>`),
        ''
    ].flat()
};
```

这是我们的基本结构。你可以编辑它并放入你的信息。首先，我们将添加一个 `cd` 命令来更改目录。

```javascript
const root = '~';
let cwd = root;

const commands = {
    cd(dir = null) {
        if (dir === null || (dir === '..' && cwd !== root)) {
            cwd = root;
        } else if (dir.startsWith('~/') && dirs.includes(dir.substring(2))) {
            cwd = dir;
        } else if (dirs.includes(dir)) {
            cwd = root + '/' + dir;
        } else {
            this.error('Wrong directory');
        }
    }
};
```

这将处理所有更改目录的情况。接下来是添加一个提示符。

要查看我们所在的目录，我们需要添加一个自定义 `prompt` 来完成这项工作。  
我们可以创建一个函数：

```javascript
const user = 'guest';
const server = 'freecodecamp.org';

function prompt() {
    return `<green>${user}@${server}</green>:<blue>${cwd}</blue>$ `;
}
```

并将其用作选项：

```javascript
const term = $('body').terminal(commands, {
    greetings: false,
    checkArity: false,
    completion: true,
    exit: false,
    prompt
});
```

绿色看起来不太好，我们可以使用Ubuntu的颜色使终端看起来更真实。

```javascript
$.terminal.xml_formatter.tags.green = (attrs) => {
    return `[[;#44D544;]`;
};
```

接下来是 `ls` 命令。

```javascript
function print_dirs() {
     term.echo(dirs.map(dir => {
         return `<blue class="directory">${dir}</blue>`;
     }).join('\n'));
}

const commands = {
    ls(dir = null) {
        if (dir) {
            if (dir.match(/^~\/?$/)) {
                // ls ~ or ls ~/
                print_dirs();
            } else if (dir.startsWith('~/')) {
                const path = dir.substring(2);
                const dirs = path.split('/');
                if (dirs.length > 1) {
                    this.error('Invalid directory');
                } else {
                    const dir = dirs[0];
                    this.echo(directories[dir].join('\n'));
                }
            } else if (cwd === root) {
                if (dir in directories) {
                    this.echo(directories[dir].join('\n'));
                } else {
                    this.error('Invalid directory');
                }
            } else if (dir === '..') {
                print_dirs();
            } else {
                this.error('Invalid directory');
            }
        } else if (cwd === root) {
            print_dirs();
        } else {
            const dir = cwd.substring(2);
            this.echo(directories[dir].join('\n'));
        }
    }
```

类似于绿色，蓝色也不太好看，所以我们可以使用Ubuntu中的颜色。要做到这一点，我们需要在XML格式中使用自定义 XML 标签：

我们添加 HTML 类是有原因的。当用户点击目录时，我们来更改目录。就像我们对命令所做的那样，我们可以通过以下方式调用 `cd` 命令，就像用户输入它一样：

```javascript
term.on('click', '.directory', function() {
    const dir = $(this).text();
    term.exec(`cd ~/${dir}`);
});
```

我们还需要更新我们的 CSS 以更改光标：

```css
.command, .directory {
    cursor: pointer;
}
```

## 如何改进补全功能

我们的补全功能并不完美，因为它只补全命令。如果你希望补全功能也处理目录，你需要使用一个函数：

```javascript
const term = $('body').terminal(commands, {
    greetings: false,
    checkArity: false,
    completion(string) {
        // 在每个函数中，我们可以使用 `this` 来引用 term 对象
        const cmd = this.get_command();
        // 我们处理命令以提取命令名称
        // 以及命令的其余部分（作为一个字符串的参数）
        const { name, rest } = $.terminal.parse_command(cmd);
        if (['cd', 'ls'].includes(name)) {
            if (rest.startsWith('~/')) {
                return dirs.map(dir => `~/${dir}`);
            }
            if (cwd === root) {
                return dirs;
            }
        }
        return Object.keys(commands);
    },
    prompt
});
```

**注意**：字符串参数已保留作为文档。如果你只想补全单个单词，可以使用它。

## 打字动画命令

另一个我们将添加的命令是一个动画笑话。我们将使用一个 API 打印随机笑话，看起来就像用户在打字一样。

我们将使用 [Joke API][43]。

API 返回两种类型的 JSON 响应：`twopart` 和 `single`。这是在终端上打印文本的代码：

```javascript
// 我们使用编程笑话，这样更适合
// 开发者作品集
const url = 'https://v2.jokeapi.dev/joke/Programming';
const commands = {
    async joke() {
        const res = await fetch(url);
        const data = await res.json();
        if (data.type == 'twopart') {
            // 如前所述，在每个直接传递到终端的函数中，
            // 你可以使用 `this` 对象
            // 来引用终端实例
            this.echo(`Q: ${data.setup}`);
            this.echo(`A: ${data.delivery}`);
        } else if (data.type === 'single') {
            this.echo(data.joke);
        }
    },
}
```

要添加打字动画，你需要在 `echo` 方法中添加一个选项：

```javascript
this.echo(data.joke, { delay: 50, typing: true });
```

有一个注意事项：如果你有一系列打字动画，你需要等待之前的一个完成（当动画时，echo 会返回一个 promise）。你需要将代码包装在一个 `async` 函数中，并且你需要清除提示，以免动画之间出现闪烁。默认情况下，提示用于打字效果。所以完整的代码应该如下面这样：

```javascript
// 我们使用编程笑话，这样更适合
// 开发者作品集
const url = 'https://v2.jokeapi.dev/joke/Programming';
const commands = {
    async joke() {
        const res = await fetch(url);
        const data = await res.json();
        (async () => {
            if (data.type == 'twopart') {
                // 我们清除了提示，以免动画之间出现闪烁
                const prompt = this.get_prompt();
                this.set_prompt('');
                // 如前所述，在每个直接传递到终端的函数中，
                // 你可以使用 `this` 对象
                // 来引用终端实例
                await this.echo(`Q: ${data.setup}`, {
                    delay: 50,
                    typing: true
                });
                await this.echo(`A: ${data.delivery}`, {
                    delay: 50,
                    typing: true
                });
                // 我们恢复提示
                this.set_prompt(prompt);
            } else if (data.type === 'single') {
                await this.echo(data.joke, {
                    delay: 50,
                    typing: true
                });
            }
        })();
    },
}
```

你可以在维基文章中阅读更多关于打字动画的内容：[Typing Animation][44][.][45]

## Credits 命令

最后一个我们将添加的命令是一个 credits 命令，我们将在其中列出使用的 JavaScript 库：

```javascript
const commands = {
    credits() {
        return [
            '',
            '<white>使用的库：</white>',
            '* <a href="https://terminal.jcubic.pl">jQuery Terminal</a>',
            '* <a href="https://github.com/patorjk/figlet.js/">Figlet.js</a>',
            '* <a href="https://github.com/jcubic/isomorphic-lolcat">Isomorphic Lolcat</a>',
            '* <a href="https://jokeapi.dev/">Joke API</a>',
            ''
        ].join('\n');
    }
};
```

这是在终端上打印的另一种方式，如果你从函数返回内容，它将被打印。你还可以返回一个 [Promise][46]，这样你可以向服务器发送一个 [AJAX][47] 请求并打印结果。

您可以通过执行示例命令让用户更容易知道如何使用终端，特别是如果他们对 Unix 不太熟悉。

```javascript
term.exec(command)
```

您还可以在 `exec` 方法中使用动画：

```javascript
term.exec(command, { typing: true, delay: 50 });
```

下面是我们 [互动终端作品集网站][48] 的一个完整演示。

## 接下来做什么？

您可以向这个作品集添加很多命令。唯一的限制是您的想象力。

您可以参考以下示例获取灵感：

- CodePen 中的 [jQuery Terminal Demos][49] 集合。
- [复古终端 CodePen 演示][50]。
- [jQuery Terminal 示例页面][51]。
- [终端 404 错误页面][52]。
- [假装的 GNU/Linux 终端][53]。

如果您有本文未列出的一些想法，可以在 [StackOverflow 上通过 jquery-terminal 标签提问][54]。如果您有一些需要花费时间的事情，也可以 [寻求付费支持][55]。

如果您喜欢这篇文章，可以 [查看我的网站][56]（上面有一个类似的终端作品集，还有一个聊天功能），并 [关注我的 Twitter/X][57] 和 [LinkedIn][58]。

[1]: https://terminal.jcubic.pl/
[2]: https://itnext.io/how-to-create-interactive-terminal-like-website-888bb0972288
[3]: #table-of-contents
[4]: #what-is-the-terminal
[5]: #what-is-jquery_terminal
[6]: #base-html-file
[7]: #how-to-initialize-the-terminal
[8]: #greetings
[9]: #line-gaps
[10]: #how-to-add-colors-to-ascii-art
[11]: #terminal-formatting
[12]: #how-to-use-the-lolcat-library
[13]: #rainbow-ascii-art-greetings
[14]: #how-to-make-the-greeting-text-white
[15]: #how-to-make-your-first-command
[16]: #default-commands
[17]: #how-to-make-help-commands-executable
[18]: #syntax-highlighting
[19]: #tab-completion
[20]: #how-to-add-shell-commands
[21]: #how-to-improve-completion
[22]: #typing-animation-command
[23]: #credits-command
[24]: #prefilled-commands
[25]: #what-next
[26]: https://en.wikipedia.org/wiki/Punched_card
[27]: https://www.freecodecamp.org/news/command-line-for-beginners/
[28]: https://en.wikipedia.org/wiki/JQuery
[29]: https://github.com/jcubic/jquery.terminal/wiki/Getting-Started#creating-the-interpreter
[30]: https://en.wikipedia.org/wiki/ASCII_art
[31]: https://en.wikipedia.org/wiki/FIGlet
[32]: https://www.npmjs.com/package/figlet
[33]: https://patorjk.com/software/taag/
[34]: https://en.wikipedia.org/wiki/ANSI_art
[35]: https://www.npmjs.com/package/isomorphic-lolcat
[36]: https://github.com/jcubic/jquery.terminal/wiki/Formatting-and-Syntax-Highlighting
[37]: https://en.wikipedia.org/wiki/Random_seed
[38]: https://github.com/jcubic/jquery.terminal/wiki/Formatting-and-Syntax-Highlighting#extension-xml-formatter
[39]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat
[40]: https://en.wikipedia.org/wiki/Affordance
[41]: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
[42]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
[43]: https://jokeapi.dev/
[44]: https://github.com/jcubic/jquery.terminal/wiki/Typing-Animation
[45]: https://github.com/jcubic/jquery.terminal/wiki/Typing-Animation#sequence-of-animations
[46]: https://www.freecodecamp.org/news/javascript-promises-explained/
[47]: https://en.wikipedia.org/wiki/Ajax_(programming)
[48]: https://codepen.io/jcubic/full/ZEZPWRY
[49]: https://codepen.io/collection/LPjoaW
[50]: https://codepen.io/jcubic/pen/BwBYOZ
[51]: https://terminal.jcubic.pl/examples.php
[52]: https://terminal.jcubic.pl/404
[53]: https://fake.terminal.jcubic.pl/
[54]: https://stackoverflow.com/questions/tagged/jquery-terminal
[55]: https://support.jcubic.pl/
[56]: https://jakub.jankiewicz.org/
[57]: https://twitter.com/jcubic
[58]: https://www.linkedin.com/in/jakubjankiewicz/

