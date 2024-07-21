---
title: Next.js アプリのパフォーマンスをレイジーローディングで最適化する方法
date: 2024-07-21T13:48:32.388Z
author: TAPAS ADHIKARY
authorURL: https://www.freecodecamp.org/news/author/tapas/
OriginalURL: https://www.freecodecamp.org/news/next-js-performance-optimization/
Proofreader: ""

---

人々は遅いアプリケーションを使うのを好みません。そして初期ロード時間はウェブアプリケーションやウェブサイトにとって非常に重要です。

<!-- more -->

3秒以上かかるアプリケーションは遅いと見なされ、ユーザーがアプリケーションやウェブサイトを離れる可能性があります。

`Next.js` は、スケーラブルでパフォーマンスの高い、迅速なウェブアプリケーションやウェブサイトを構築するために使用できるReactベースのフレームワークです。Next.js アプリルートリリースの[React Server Components][1] の導入により、開発者は「サーバーコンポーネントを考える」ための新しいメンタルモデルを持つことができます。これにより、SEOの問題が解決され、`ゼロバンドルサイズ`のReactコンポーネントを作成し、結果としてUIコンポーネントの読み込みが速くなります。

しかし、アプリケーションが常にサーバーコンポーネントだけで構成されているわけではありません。クライアントコンポーネントも使用する必要があるかもしれませんし、アプリケーションの初期ロードの一部として、またはオンデマンドで（たとえばボタンをクリックしたときに）ロードすることもできます。

ブラウザでクライアントコンポーネントをロードするには、そのコンポーネントのコードをブラウザにダウンロードし、インポートしたすべてのライブラリや他のコンポーネントをダウンロードし、Reactがあなたのためにコンポーネントが動作することを確認するために追加で処理するいくつかのことを行う必要があります。

ユーザーのインターネット接続やその他のネットワーク要因に基づいて、クライアントコンポーネントの全体の読み込みには時間がかかることがあり、ユーザーがアプリケーションをより迅速に使用するのを遅らせることがあります。

ここで `レイジーローディング` 技術が役立ちます。これにより、ブラウザでクライアントコンポーネントのモノリシックな読み込みを避けることができます。

この記事では、クライアントコンポーネントの読み込み最適化のために、Next.js でのいくつかのレイジーローディング技術について説明します。また、対処する必要があるいくつかのエッジケースについても話します。

もしビデオコンテンツから学びたい場合、このこの記事はビデオチュートリアルとしてもここで利用可能です: 🙂

<iframe width="356" height="200" src="https://www.youtube.com/embed/gq9bBZru78Y?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen="" title="Next.js Performance Optimization: Implementing Lazy Loading" name="fitvid0"></iframe>

始める前に、いくつかの注意点です:

-   レイジーローディング技術をデモするためのアプリを構築するために多くのコードを書きます。このGitHubリポジトリでソースコード全体を見つけることができます: [https://github.com/tapascript/nextjs-lazy-load][2]。しかし、自分でコードを書き進め、リポジトリはあくまで参考として使用することを強くお勧めします。
-   公開されているアプリを[Netlifyでここで][3]確認することもできます。

さあ、始めましょう🚀。そうそう、もしトム＆ジェリーのカートゥーンが好きなら、これをさらに楽しむことができるでしょう！

## ******目次******

-   [レイジーローディングとは何か][4]?
-   [Next.jsにおけるレイジーローディング技術][5]
-   [動的インポートとnext/dynamicによるレイジーローディング][6]
-   [React.lazy()とSuspenseによるレイジーローディング][7]
-   [名前付きエクスポートコンポーネントのレイジーローディング方法][8]
-   [サーバーコンポーネントのレイジーローディング][9]
-   [Next.jsですべてのクライアントコンポーネントをレイジーローディングすべきか][10]
-   [次は何をすべきか][11]

## レイジーローディングとは何か？

現代のウェブアプリケーション開発では、すべてのロジックを1つのJavaScript/TypeScriptファイルにコーディングしたり、すべてのスタイルを1つの巨大なCSSファイルにコーディングしたりしません。その代わりに、ソースコードレベルで分割し、論理モジュール、ビジネスロジック、プレゼンテーショナルコンポーネント、スタイル関連のファイルを作成します。これにより、コードをよりよく整理することができます。

その後、アプリケーション開発プロセスのビルドフェーズでバンドラというものを使用します。それはスクリプトとスタイルのバンドルを作成します。有名なバンドラにはWebpack、Rollup、Parcelなどがあります。

![image-43](https://www.freecodecamp.org/news/content/images/2024/07/image-43.png)

バンドラがソースコードからバンドルを作成する

さて、バンドルができたら、それらをブラウザで一度にロードしようとすると、遅延が発生します。これは、ユーザーインターフェースが機能するために完全なバンドルをブラウザに読み込む必要があるからです。

![image-44](https://www.freecodecamp.org/news/content/images/2024/07/image-44.png)

巨大なバンドルを読み込むと、悪い読み込み体験になる

したがって、巨大なバンドルをブラウザにロードするのを待つ代わりに、現代のウェブ開発ライブラリとツールシステムはバンドルをチャンクに分けてロードすることを可能にします。

いくつかのチャンクをすぐにロードする必要があるかもしれません。アプリケーションがロードされる際にユーザーがすぐに必要とするかもしれないからです。同時に、必要になるまでウェブページの特定の部分のロードを待ちたいかもしれません。

![image-45](https://www.freecodecamp.org/news/content/images/2024/07/image-45.png)

チャンクに分けて必要なものを読み込む



## Next.jsにおける遅延読み込み技術

Next.jsにおける遅延読み込み技術は、ルートによって必要なJavaScriptの量を減らすために使用されます。これにより、アプリケーションの初回ロードのパフォーマンスが向上します。クライアントコンポーネントやインポートされたライブラリのロードを必要になるまで遅らせることができます。

Next.jsで遅延読み込み技術を実装する方法は2つあります：

-   `next/dynamic`パッケージを使った動的インポートの利用。
-   `React.lazy()`と`Suspense`の組み合わせを利用。

これらの技術をコード例で理解しましょう。

## `dynamic import`と`next/dynamic`を使った遅延読み込み

`next/dynamic`はReactJSのReact.lazy()とSuspenseの組み合わせです。Next.jsでの遅延読み込みを実現するために、next/dynamicパッケージを使った動的インポートが推奨されるアプローチです。

これを実演するために、まず以下のコマンドでNext.jsアプリを作成しましょう：

```bash
npx create-next-app@latest
```

次に、以下のコマンドでローカルでアプリを起動できます：

```bash
## npmを使用する場合
npm run dev

## yarnを使用する場合
yarn dev

## またはpnpm、bunなど、お好きなものを使ってください！
```

次に、`app/`ディレクトリの下に`components`というフォルダーを作成します。すべてのコンポーネントはこのコンポーネントフォルダーに作成します。次に、`app/components/`の下に`tom`というフォルダーを作成します。最後に、次のコードで`app/components/tom/`ディレクトリに`tom.jsx`というReactコンポーネントを作成します：

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

上記のコードを説明します：

-   `LazyTom`というReactJSコンポーネントを作成しました。
-   これはシンプルなプレゼンテーショナルコンポーネントで、`Tom & Jerry`という有名なカートゥーンの猫、トムについてのヘディングといくつかのパラグラフを持っています。
-   最後に、コンポーネントを他の場所でインポートできるように`default`エクスポートしています。

次に、`app/components/tom/`ディレクトリに`tom-story.jsx`というファイルを作成し、次のコードを追加します：

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

`dynamic`を使った遅延読み込みの主な仕組みは上記のコードにあります：

-   `TomStory`というクライアントコンポーネントを`"use client"`ディレクティブを使って作成しました。
-   まず、トグル状態を管理するための`useState`フックと、作成したコンポーネントの遅延読み込みを行うための`next/dynamic`からの`dynamic`関数をインポートしました。
-   `dynamic`関数は、インポートされたコンポーネントを返す関数を引数として受け取ります。また、`dynamic`関数にオプションの設定オブジェクトを渡すことでカスタムの読み込みメッセージを設定することもできます。
-   `dynamic()`関数は遅延読み込みされたコンポーネントインスタンス、すなわち`LazyTom`（名前は何でも良い）を返します。しかし、このコンポーネントはまだロードされていません。
-   JSX内では、`LazyTom`コンポーネントを表示および非表示にするトグルボタンがあります。このコンポーネントは、ボタンクリックの最初のインスタンスでユーザーのブラウザーに遅延読み込みされます。その後、再度非表示と表示を繰り返しても、ブラウザーをハードリフレッシュするかブラウザーキャッシュをクリアするまで`LazyTom`コンポーネントは再ロードされません。
-   最後に、`TomStory`コンポーネントをデフォルトエクスポートしました。

これをテストするために、`app/`ディレクトリの`page.js`ファイルを開き、以下のコードで内容を置き換えます：

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

今すぐブラウザで `http://localhost:3000` を使用してアプリにアクセスします。トムのストーリーを読み込むボタンが表示されるはずです。また、`Network` タブには多くのリソースが表示されます。これらはアプリケーションの初回ロード時に必要なリソースで、ブラウザにダウンロードされています。

`tom.jsx` からの `LazyTom` コンポーネントはまだダウンロードされていません。これは `Load Tom's Story` ボタンをまだクリックしていないためです。

![Screenshot-2024-07-17-at-9.21.10-AM](https://www.freecodecamp.org/news/content/images/2024/07/Screenshot-2024-07-17-at-9.21.10-AM.png)

トムのストーリーを遅延読み込みするボタン

今、ボタンをクリックします。しばらくの間、読み込みメッセージが表示され、その後コンポーネントがトムのストーリーで読み込まれます。`Network` タブに `tom.jsx` コンポーネントが表示され、ページにトムのストーリーがレンダリングされているのが確認できます。

![Screenshot-2024-07-17-at-9.27.55-AM](https://www.freecodecamp.org/news/content/images/2024/07/Screenshot-2024-07-17-at-9.27.55-AM.png)

今、トムのストーリーが遅延読み込みされました

`next/dynamic` の `dynamic` 関数がコンポーネントを遅延読み込みするのにどのように役立つかを体験したので、次に `React.lazy()` と `Suspense` を使用する別の技術を見てみましょう。

## `React.lazy()` と `Suspense` を使用した遅延読み込み

この技術を実演するために、私のお気に入りのキャラクターであるトムとジェリーのアニメからジェリーのストーリーで始めましょう。

まず、`app/components/` ディレクトリの下に `jerry` というフォルダを作成します。次に、`app/components/jerry/` に `jerry.jsx` というファイルを作成し、次のコードを追加します：

```js
// jerry.jsx

const LazyJerry = () => {
  return (
    <div className="flex flex-col justify-center">
      <h1 className="text-3xl my-2">The Lazy Jerry</h1>
      <p className="text-xl my-1">
        Jerry 🐀 はデビュー時に名前が明記されていない小さな茶色の家ネズミで、
        常にトムの近くに住んでいます。とてもエネルギッシュで決心が固く、
        トムよりもはるかに大きいのにもかかわらず、ジェリーの知恵には太刀打ちできません。
        ジェリーは、自分のサイズに対して驚くほどの強さを持ち、
        アンビルのようなアイテムを相対的に簡単に持ち上げ、
        かなりの衝撃に耐えることができます。
      </p>
      <p className="text-xl my-1">
        猫は通常ネズミを食べるために追いかけますが、トムが実際にジェリーを食べようとするのは非常に稀です。
        トムはジェリーをからかったり、復讐したり、ジェリーを捕まえるために
        人間から報酬を得たり、家猫としての仕事をうまくこなしたりするためだけに、
        ジェリーを傷つけたり対戦したりしようとします。各アニメの最終的なフェードアウトまでには、
        通常ジェリーがトムを出し抜きます。
      </p>
    </div>
  );
};

export default LazyJerry;
```

`jerry.jsx` の内容は `tom.jsx` と構造的に類似しています。ここではトムのストーリーではなくジェリーのストーリーを掲載し、コンポーネントをデフォルトエクスポートしています。

前回と同様に、ジェリーのストーリーの遅延読み込みを示すために `jerry-story.jsx` ファイルを作成しましょう。次のコードで `app/components/jerry/` ディレクトリにファイルを作成します：

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

ここでもクライアントコンポーネントがあり、`lazy()` メソッドと React の `Suspense` を使用するためにインポートしています。前回の技術の `dynamic()` 関数と同様に、`lazy()` 関数も遅延インポートされたコンポーネントを返す関数を引数として取り、読み込もうとしているコンポーネントの相対パスを提供しています。

`dynamic()` では関数の一部として読み込みメッセージをカスタマイズする機会がありましたが、`lazy()` では `Suspense` のフォールバック部分でそれを行います。

Suspense はデータの読み込みを待つ間にフォールバックを使用します。ReactJS の Suspense と Error Boundary を詳しく理解したい場合は、[このビデオチュートリアル][12] をチェックしてください。

ここでは `LazyJerry` コンポーネントが遅延読み込みされているため、コンポーネントコードがブラウザに正常にダウンロードされレンダリングされるまでの間、読み込みメッセージを表示するためのフォールバックを指定しています。

```js
{shown && 
    <Suspense fallback={<h1>Loading Jerry&apos;s Story</h1>}>
                <LazyJerry />
    </Suspense>
}
```

また、最初にボタンをクリックしたときにコンポーネントを読み込んでいるのがわかります。ここでも、ブラウザをリフレッシュしたりブラウザのキャッシュをクリアしたりしない限り、毎回ボタンをクリックしてもコンポーネントは再読み込みされません。

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

さて、ユーザーインターフェイスに新しいコンポーネントが表示され、ジェリーの物語をロードするボタンが表示されます。この段階では、ブラウザーにjerry.jsxコンポーネントがロードされているのは見えません。

![Screenshot-2024-07-17-at-9.33.36-AM](https://www.freecodecamp.org/news/content/images/2024/07/Screenshot-2024-07-17-at-9.33.36-AM.png)

ジェリーの物語を遅延読み込みするボタン

次に、ボタンをクリックしてください。コンポーネントが読み込まれ、ネットワークタブリストに表示されるのがわかります。遅延読み込みされたコンポーネントの一部として表示されたジェリーの物語を読むことができます。

![Screenshot-2024-07-17-at-9.37.30-AM](https://www.freecodecamp.org/news/content/images/2024/07/Screenshot-2024-07-17-at-9.37.30-AM.png)

ジェリーの物語が遅延読み込みされました

## 名前付きエクスポートされたコンポーネントを遅延読み込みする方法

これまでのところ、両方の手法では、`default export`でエクスポートされたコンポーネントをインポートし、それを遅延読み込みしました。JavaScript（およびReact）では、モジュールを2つの異なる方法でエクスポートおよびインポートできます：

- `default`キーワードを使用する場合。この場合、エクスポートされたモジュールは任意の名前でインポートできます。モジュールから1つの機能のみをエクスポートしたい場合に使用します。
- `default`キーワードを使用しない場合、これは`名前付きエクスポート`と呼ばれます。この場合、エクスポートとインポートのモジュール名を同じにする必要があります。また、インポート時にはモジュール名を中括弧（{...}）で囲む必要があります。モジュールから複数の機能をエクスポートしたい場合に使用します。

JavaScriptモジュールとその動作について詳しく知りたい場合は、freeCodeCampのYouTubeチャンネルで公開されている[このクラッシュコース][13]を参照することをお勧めします。

`名前付きエクスポート`コンポーネントの遅延読み込みを実演するために、別のシンプルなプレゼンテーショナルReactコンポーネントを作成しましょう。今回は、トムとジェリーの漫画に登場する怒っているがかわいい犬の`スパイク`を使用します。

`app/components/`ディレクトリの下に`spike`というフォルダーを作成します。次に、`app/components/spike/`ディレクトリの下に`spike.jsx`というファイルを作成し、以下のコードを記述します：

```js
// spike.jsx

export const LazySpike = () => {
  return (
    <div className="flex flex-col">
      <h1 className="text-3xl my-2">レイジースパイク</h1>
      <p className="text-xl my-1">
        トムがジェリーを捕まえようとする際に対処しなければならないのが、怒っていて攻撃的だが簡単に騙されるブルドッグのスパイク 🦮 です。いくつかの短編では「キラー」や「ブッチ」として知られており、彼がジェリーを捕まえようとしている間にトムを攻撃しようとします。元々、スパイクは名前がなく、無口で、攻撃したり噛んだりする音以外は何も言わず、トムかジェリーの区別なく攻撃していましたが、通常はトムを攻撃していました。
      </p>
      <p className="text-xl my-1">
        その後のカートゥーンでは、スパイクは声と表情を使って頻繁に話すようになり、ビリー・ブレッチャーと後にドーズ・バトラーによって演じられたコメディアンのジミー・デュランテをモデルにしています。スパイクのコートは年々変化し、グレーやクリーミータンになりました。1940年代後半にスパイクの息子タイクが登場すると、スパイクのキャラクターはわずかに柔らかくなり、スパイクとタイクという短期上映シリーズが誕生しました。
      </p>
    </div>
  );
};
```

再び、このコンポーネントは以前見た`tom.jsx`や`jerry.jsx`コンポーネントと構造的にはまったく同じですが、2つの大きな違いがあります：

1. ここでは、`default`キーワードを使用せずにコンポーネントをエクスポートしているため、`名前付きエクスポート`です。
2. 犬のスパイクについて話しています。

次に、名前付きエクスポートコンポーネントの遅延読み込みを処理する必要があり、これはデフォルトエクスポートコンポーネントとは少し異なります。

`app/components/spike/`ディレクトリの下に`spike-story.jsx`というファイルを作成し、以下のコードを記述します：

```js
// spike-story.jsx

"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const LazySpike = dynamic(() => import("./spike").then((mod) => mod.LazySpike), {
    loading: () => <h1>スパイクの物語を読み込み中...</h1>,
});

function SpikeStory() {
    const [shown, setShown] = useState(false);

    return (
        <div className="flex flex-col m-8 w-[300px]">
            <h2 className="text-xl my-1"><strong>名前付きエクスポート</strong>のデモ</h2>
            <button
                className="bg-slate-600 text-white rounded p-1"
                onClick={() => setShown(!shown)}
            >
                🦮 スパイクの物語を読み込む
            </button>

            {shown && <LazySpike />}
        </div>
    );
}

export default SpikeStory;
```

`tom-story`のように、next/dynamicを使用して動的インポートを行っています。しかし、上記のコードの次のブロックをズームインしてみましょう：

```js
const LazySpike = dynamic(() => import("./spike").then((mod) => mod.LazySpike), {
    loading: () => <h1>スパイクの物語を読み込み中...</h1>,
});
```
```

試してみましょう。再度`page.js`ファイルにコンポーネントをインポートし、前回と同様にJSX内で使用します。

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

表示されましたね。`spike.jsx`ファイルからSpikeのストーリーをロードするボタンがブラウザにレンダリングされているはずです。このファイルはまだロードされていません。

![Screenshot-2024-07-17-at-9.59.55-AM](https://www.freecodecamp.org/news/content/images/2024/07/Screenshot-2024-07-17-at-9.59.55-AM.png)

Spikeのストーリーを遅延読み込みするボタン

ボタンをクリックすると、ファイルがブラウザにロードされ、コンポーネントがレンダリングされてSpikeのストーリーが表示されます。

![Screenshot-2024-07-17-at-10.02.01-AM](https://www.freecodecamp.org/news/content/images/2024/07/Screenshot-2024-07-17-at-10.02.01-AM.png)

Spikeのストーリーは遅延読み込みされました

以下には、異なる技術と用途を示す3つのコンポーネントが並んで表示されています。これらを一緒にテストすることができます。下の画像は、1つのコンポーネントが既に遅延読み込みされている状態で、2つのコンポーネントを並行して遅延読み込みしている様子を示しています。

![Screenshot-2024-07-17-at-10.14.21-AM](https://www.freecodecamp.org/news/content/images/2024/07/Screenshot-2024-07-17-at-10.14.21-AM.png)

複数のコンポーネントを並行して遅延読み込み

こちらは、3つのコンポーネントすべてをそれぞれボタンをクリックしてオンデマンドで遅延読み込みしたケースです。

![Screenshot-2024-07-17-at-10.05.35-AM-1](https://www.freecodecamp.org/news/content/images/2024/07/Screenshot-2024-07-17-at-10.05.35-AM-1.png)

すべてのストーリーが遅延読み込み

## サーバーコンポーネントの遅延読み込み

クライアントコンポーネントの遅延読み込み技術について話しましたが、サーバーコンポーネントにも同じことができるでしょうか？実は、できますが、そうする必要はありません。サーバーコンポーネントはすでに`コード分割`されており、Next.jsによって読み込みの側面はすでに処理されています。そうしようとしてもエラーは出ませんが、不要です。

もし、1つ以上のクライアントコンポーネントを子として持つサーバーコンポーネントを動的にインポートする場合、そのクライアントコンポーネントは遅延読み込みされますが、親のサーバーコンポーネント自体には影響しません。

以下は、2つのクライアントコンポーネントを子として持つサーバーコンポーネントの例です：

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

次に、`page.js`ファイルにこのサーバーコンポーネントを動的にインポートし、そのJSX内で使用します。動的にインポートされたサーバーコンポーネントの子のクライアントコンポーネントは遅延読み込みされますが、サーバーコンポーネント自体はそうなりません。

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

## Next.jsですべてのクライアントコンポーネントを遅延読み込みするべき？

私が遅延読み込みを初めて学んだとき、この質問がありました。今ではこの技術についてもっと経験を積んだので、私の視点をお伝えします：

すべてのクライアントコンポーネントを遅延読み込みする必要はありません。最適化は素晴らしいことですが、過剰な最適化は逆効果を招くことがあります。どこでこの最適化が必要かを見極める必要があります。

-   本当に大きなクライアントコンポーネントがありますか？
-   1つのコンポーネントに不要なものをたくさん詰め込んでおり、分けてリファクタリングすべきではないでしょうか？
-   クライアントコンポーネントに重いライブラリをインポートしていますか？
-   ツリーシェイキングを選択しましたか？
-   ルートごとに大きなクライアントコンポーネントをマークし、そのルートのページの最初の読み込み時にそれらの一部またはすべてを読み込まないことができますか？

ご覧のとおり、最適化を始める前に問うべき有意義な質問がいくつかあります。これらの質問に答え、遅延読み込みが必要だと判断したなら、この記事で学んだ技術を実装できます。

## 次は何ですか？

今回はここまでです。この記事を読んで何か新しいことを学びましたか？そうであれば、内容が役に立ったかどうか知りたいです。私のSNSアカウントはこちらに提供されています。

次に、もし`Next.js`とそのエコシステム（`Next-Auth(V5)`を含む）を学びたい場合、基本的な概念とプロジェクトを含む素晴らしいニュースがあります：私のYouTubeチャンネルで20本以上のビデオチュートリアルと11時間以上の魅力的なコンテンツを無料で提供しているプレイリストを[チェックできます][14]。お楽しみいただければ幸いです。

-   私の [YouTube チャンネル][15] を購読してください。
-   毎日のスキルアップのヒントを見逃したくない場合は [X (Twitter)][16] や [LinkedIn][17] をフォローしてください。
-   [GitHub][18] で私のオープンソースの仕事をチェックしてフォローしてください。
-   私は定期的に意味のある投稿を [GreenRoots ブログ][19] に公開しています。こちらも役に立つかもしれません。

次の記事でお会いしましょう。それまで、お体に気をつけて、学び続けてください。

[1]: https://www.freecodecamp.org/news/how-to-use-react-server-components/
[2]: https://github.com/tapascript/nextjs-lazy-load
[3]: https://nextjs-lazy-load.netlify.app/
[4]: #what-is-lazy-loading
[5]: #lazy-loading-techniques-in-next-js
[6]: #lazy-loading-with-dynamic-import-and-next-dynamic
[7]: #lazy-loading-with-react-lazy-and-suspense
[8]: #how-to-lazy-load-the-named-exported-components
[9]: #lazy-loading-your-server-components
[10]: #lazy-loading-your-server-components
[11]: #what-s-next
[12]: https://www.youtube.com/watch?v=OpHbSHp8PcI
[13]: https://www.youtube.com/watch?v=KeBxopnhizw
[14]: https://www.youtube.com/watch?v=VSB2h7mVhPg&list=PLIJrr73KDmRwz_7QUvQ9Az82aDM9I8L_8
[15]: https://www.youtube.com/tapasadhikary?sub_confirmation=1
[16]: https://twitter.com/tapasadhikary
[17]: https://www.linkedin.com/in/tapasadhikary/
[18]: https://github.com/atapas
[19]: https://blog.greenroots.info/

