---
title: 如何使用flyctl将单个Fly实例和卷移动到新的区域
date: 2024-07-21T14:41:46.616Z
author: Clarence Bakosi
authorURL: https://www.freecodecamp.org/news/author/clarence/
OriginalURL: https://www.freecodecamp.org/news/how-to-move-a-fly-application-to-a-new-region/
Proofreader: ""
---

Fly.io允许用户将其应用程序部署到应用程序主要使用的区域内的虚拟机。Fly应用程序也可以部署到多个区域。

<!-- more -->

如果您遇到性能问题、高延迟或数据驻留合规性问题，您可能希望将Fly应用程序移到新区域。将应用程序放置在更靠近用户的位置可以减少延迟并提高响应时间。

此外，将数据存储与区域合规要求对齐可以防止法律问题。总的来说，这些更改可以提升应用程序的用户体验。

本文将介绍如何使用[flyctl][4]命令，从一个[Fly区域][3]顺利地将包含单个[Fly实例][1]和附加的[Fly卷][2]的Fly应用程序移动到另一个区域。

## **前提条件**

-   [Fly.io账号][5]
-   安装`flyctl`
-   命令行界面 (CLI)

## **入门**

首先，您需要验证是否已安装`flyctl`并进行身份验证。

### 如何验证 `flyctl` 安装

您可以使用以下命令验证是否已安装`flyctl`。如果没有，请使用此[指南][6]进行安装。

```bash
fly version
```

![fly version](https://www.freecodecamp.org/news/content/images/2024/07/Screenshot-2024-07-15-at-19.43.16.png)

fly版本的输出

这显示了您安装的版本。

### 如何认证 `flyctl`

使用以下命令通过CLI将终端连接到您的账号：

```bash
fly auth login
```

浏览器打开后，登录（如果尚未登录）并继续进行CLI的身份验证。

验证您的账号后，返回到CLI。

## **如何确认应用的区域**

导航到项目的根文件夹并运行以下命令以确定应用程序的当前区域：

```bash
fly status
```

![fly status](https://www.freecodecamp.org/news/content/images/2024/07/Screenshot-2024-07-15-at-19.44.26.png)

fly状态的输出

应用程序的当前区域是`lhr`，该命令显示了关于应用程序的更多信息，包括应用名称、所有者、主机名、镜像和机器详细信息。

## **如何验证可用卷的数量**

运行以下命令列出所有卷：

```bash
fly volumes list
```

![fly volumes list](https://www.freecodecamp.org/news/content/images/2024/07/Screenshot-2024-07-15-at-19.45.05.png)

fly卷列表的输出

应只有一个卷存在，并且它应该已经附加到一台机器上。您可以使用此[指南][7]创建一个附加了卷的单机应用程序。

## **如何验证卷是否已附加到机器**

确保卷已附加到机器，请运行：

```bash
fly machine list
```

![fly machine list](https://www.freecodecamp.org/news/content/images/2024/07/Screenshot-2024-07-15-at-20.14.04.png)

fly机器列表的输出

从输出中，您可以确定是否有卷附加到机器上。

## **Fly 区域列表**

要确定要将实例和卷移动到的新区域，请使用以下命令查看可用区域列表：

```bash
fly platform regions
```

![fly platform regions](https://www.freecodecamp.org/news/content/images/2024/07/Screenshot-2024-07-15-at-20.15.13.png)

fly平台区域的输出

在本文中，实例和卷将被移动到`syd`区域。

## **将可用卷分叉到新区域**

您可以创建现有卷的副本，并通过使用当前卷ID创建分叉将其放置在新区域：

```bash
fly volumes fork vol_4yj0k93z118j9x14 --region syd
```

结果：

![fly volumes fork](https://www.freecodecamp.org/news/content/images/2024/07/Screenshot-2024-07-15-at-20.16.00.png)

fly卷分叉的输出

这显示了关于新创建卷的信息。

```bash
fly volumes list
```

![fly volumes list](https://www.freecodecamp.org/news/content/images/2024/07/Screenshot-2024-07-15-at-20.18.52.png)

fly卷列表的输出

新分叉卷在新区域的当前状态将在几分钟内处于`hydrating`状态，然后变为`created`。

```bash
fly volumes list
```

![fly volumes list](https://www.freecodecamp.org/news/content/images/2024/07/Screenshot-2024-07-15-at-20.19.11.png)

fly卷列表的输出

上图显示了`hydrating`完成后的当前状态。

您已成功在另一个区域创建了一个包含旧区域现有卷数据的新卷。

## **如何克隆现有机器**

Fly 具有克隆功能以复制机器，您可以通过获取现有机器的ID来使用此功能。

```bash
fly machine list
```

Fly 机器列表输出

在获取机器 ID 后，使用以下命令克隆机器并使用与新创建卷相同的区域来附加新卷：

例如：

```bash
fly machine clone <machine id> --region <region code> --attach-volume <volume id>:<destination_mount_path>
```

需要注意的是，`destination_mount_path` 必须是除 `/`（应用程序根目录）之外的不同路径。它应该是一个独特的路径 `/zata`。

```bash
fly machine clone 5683977a624218 --region syd --attach-volume vol_vzkd2l6yxnk72p9v:/zata
```

![fly machine clone](https://www.freecodecamp.org/news/content/images/2024/07/Screenshot-2024-07-15-at-20.20.06.png)

fly machine clone 输出

您已经成功创建了现有机器的克隆并附加了分叉卷。

## **如何验证卷附加**

要检查卷是否已成功附加：

```bash
fly volumes list
```

![fly volumes list](https://www.freecodecamp.org/news/content/images/2024/07/Screenshot-2024-07-15-at-20.20.37.png)

fly volumes list 输出

该卷现已附加到一台机器上。

要检查机器是否已成功附加：

```bash
fly machine list
```

![fly machine list](https://www.freecodecamp.org/news/content/images/2024/07/Screenshot-2024-07-15-at-20.21.08.png)

fly machine list 输出

该机器现在已附加卷。

您已经成功将机器和卷移动到新区域。

## **如何查看应用程序的可用区域**

当前，应用程序存在于两个不同的区域，您可以使用以下命令查看：

```bash
fly scale show
```

![fly scale show](https://www.freecodecamp.org/news/content/images/2024/07/Screenshot-2024-07-15-at-20.21.30.png)

fly scale show 输出

应用程序现在运行在 `lhr` 和 `syd`。

## **如何更新远程 fly.toml**

将新区域添加到 **fly.toml** 文件 `primary_region = 'syd'` 中，更新卷目标为 `destination = '/zata'`，并部署更改。

```bash
fly deploy
```

![fly deploy](https://www.freecodecamp.org/news/content/images/2024/07/Screenshot-2024-07-15-at-20.22.37.png)

fly deploy 输出

一旦成功，**fly.toml** 文件中的更改将存在于远程配置中。

## **如何销毁旧机器**

您已经成功地将机器和附加卷移动到新区域，并且由于我们不再需要旧区域 `lhr` 的机器，您将需要清理它。第一种方法是使用 ID 停止机器。

### 停止旧机器

```bash
fly machine stop <old_machine_id>
```

![fly machine stop](https://www.freecodecamp.org/news/content/images/2024/07/Screenshot-2024-07-15-at-20.23.39.png)

fly machine stop 输出

要确认是否成功，请使用：

```bash
fly machine list
```

![fly machine list](https://www.freecodecamp.org/news/content/images/2024/07/Screenshot-2024-07-15-at-20.24.11.png)

fly machine list 输出

机器的状态已更新为 `stopped`

### 销毁旧机器

```bash
fly machine destroy <old_machine_id>
```

![fly machine destroy](https://www.freecodecamp.org/news/content/images/2024/07/Screenshot-2024-07-15-at-20.24.35.png)

fly machine destroy 输出

运行以下命令以验证机器是否仍然存在。

```bash
fly machine list
```

![fly machine list](https://www.freecodecamp.org/news/content/images/2024/07/Screenshot-2024-07-15-at-20.24.59.png)

fly machine list 输出

旧区域的机器已成功删除。

## **如何销毁未附加的卷**

成功销毁机器后，附加到它的卷现在已未附加，可以销毁。

```bash
fly volumes list
```

![fly volumes list](https://www.freecodecamp.org/news/content/images/2024/07/Screenshot-2024-07-15-at-20.25.24.png)

fly volumes list 输出

使用未附加卷的 ID 并运行以下命令：

```bash
fly volumes destroy <old_volume_id>
```

![fly volumes destroy](https://www.freecodecamp.org/news/content/images/2024/07/Screenshot-2024-07-15-at-20.26.04.png)

fly volumes destroy 输出

未附加的卷现已销毁。

![fly volumes list](https://www.freecodecamp.org/news/content/images/2024/07/Screenshot-2024-07-15-at-20.26.27.png)

fly volumes list 输出

新的区域中只有一个卷存在并附加到一台机器上。

## **如何检查实例状态**

检查日志以查看实例状态：

```bash
fly logs
```

日志显示应用程序正常运行，没有任何问题。

## **结论**

将 Fly.io 应用程序移动到新区域涉及：分叉现有卷，将带有分叉卷的现有机器克隆到新区域，更新 **fly.toml**，部署更改，并删除旧机器和卷。

遵循这些指南可以确保平稳且成功的过渡，最小化中断。

如果您有任何问题，您可以随时在 [X (formerly Twitter)][8] 上找到我。

## **资源**:


[1]: https://fly.io/docs/machines/overview/
[2]: https://fly.io/docs/volumes/overview/
[3]: https://fly.io/docs/reference/regions/
[4]: https://fly.io/docs/flyctl/
[5]: https://fly.io/dashboard
[6]: https://fly.io/docs/flyctl/install/
[7]: https://fly.io/docs/apps/volume-storage/#launch-a-new-app-with-a-fly-volume
[8]: https://x.com/X8inez
[9]: https://fly.io/docs
[10]: https://fly.io/docs/flyctl
[11]: https://fly.io/docs/machines/overview/
[12]: https://fly.io/docs/volumes/overview/
[13]: https://fly.io/docs/reference/regions/

