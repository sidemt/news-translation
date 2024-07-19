---
title: JavaScriptを使用してHTTPリクエストを送信する方法
date: 2024-07-19T15:04:54.138Z
authorURL: ""
originalURL: https://www.freecodecamp.org/news/how-to-send-http-requests-using-javascript/
translator: ""
reviewer: ""
---

最近では、ウェブアプリケーション間の相互作用は[HTTP][1]に依存しています。例えば、オンラインショップのアプリケーションを持っていて、新製品を作成したい場合を考えてみましょう。必要な情報をすべて入力し、「作成」というボタンをクリックする必要があります。

<!-- more -->

このアクションは、必要なデータとともにバックエンドにHTTPリクエストを送信し、バックエンドアプリケーションはそのデータを使用してデータベースに変更を加えます。アクションが完了すると、成功したかどうかに関わらず、フロントエンドにHTTPレスポンスが返送され、そのレスポンスのステータスに基づいて適切に動作します。

これらのリクエストとレスポンスがやり取りされるとき、両端が互いに理解できるように特定のフォーマットに従う必要があります。HTTPはこの目的のために作られました。これは、ウェブアプリケーションが互いに理解し、通信することを可能にする標準的なネットワークプロトコルです。

## HTTPリクエストメソッドとは？

HTTPリクエストを送信するために使用できるいくつかのメソッドがあり、それぞれが異なる目的を果たします。以下に示しています：

### `GET`メソッド

`GET`メソッドは、サーバーからデータとリソースを要求するために使用されます。`GET`リクエストを送信すると、クエリパラメータはURLにname/valueペアとして埋め込まれます：

```text
http://example.com/index.html?name1=value1&name2=value2
```

クエスチョンマーク(`?`)はパラメータリストの始まりを示しています。各パラメータはキー/バリューペア(`name=value`)を形成し、アンパサンド(`&`)は異なるパラメータを分割するために使用されます。

### `POST`メソッド

`POST`メソッドは、新しいリソースを追加するか既存のリソースを更新するためにデータをサーバーに送信するために使用されます。パラメータはHTTPリクエストのボディに格納されます。

```text
POST /index.html HTTP/1.1
Host: example.com
name1=value1&name2=value2
```

### `DELETE`メソッド

このメソッドはサーバーからリソースを削除します。

### `HEAD`メソッド

`HEAD`メソッドは`GET`と同じように動作しますが、サーバーから送信されるHTTPレスポンスにはヘッドしか含まれず、ボディは含まれません。つまり、サーバーがリクエストに対して「OK」である場合は`200 OK`レスポンスが返されますが、要求されたリソースは返されません。そのリソースを取得するには`GET`メソッドを使用する必要があります。

これはサーバーの動作確認に非常に有用です。リソースの送信に時間がかかる場合があり、テスト目的で`200 OK`レスポンスだけが必要な場合があります。

### `PUT`メソッド

`PUT`メソッドは既存のリソースを更新するために使用され、`POST`メソッドと似ていますが、小さな違いがあります。

既存のリソースに対して`PUT`を行うと、古いリソースが上書きされます。複数の同一の`PUT`リクエストを行うと、1回行うのと同じ効果があります。

同一のリソースに対して`POST`を行うと、そのリソースはリクエストが行われるたびに複製されます。

## Fetch APIとは？

長い間、JavaScriptコミュニティには標準的なHTTPリクエストの送信方法がありませんでした。ある人は`XMLHttpRequest`（通称AJAX）を使用し、他の人はAxiosやjQueryなどの外部ライブラリを好みました。

fetch APIは2015年に導入され、JavaScriptを使用してHTTPリクエストを行うための現代的で簡潔な標準的な方法です。これはネイティブにサポートされているため、サードパーティライブラリをインストールする必要はありません。

## JavaScriptを使用してGETリクエストを送信する方法

fetch APIは[プロミスベース][2]であり、非同期操作を書きやすくするためのクリーンで簡潔な構文を提供します。例えば、以下のようにfetch APIを使用して`GET`リクエストを送信できます。

```javascript
fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => {
    // レスポンスが2xxでない場合は、エラーをスローします
    if (!response.ok) {
      throw new Error("ネットワークレスポンスが正常ではありません");
    }

    // レスポンスが200 OKの場合、レスポンスをJSON形式で返します。
    return response.json();
  })
  .then((data) => console.log(data)) // レスポンスに対して何かを実行できます。
  .catch((error) => console.error("フェッチエラー:", error)); // エラーが発生した場合はキャプチャしてログに記録します。
```

リクエストにカスタムオプション（カスタムヘッダーや認証トークンなど）を含めることもできます。

```javascript
fetch("https://jsonplaceholder.typicode.com/users", {
  headers: {
    "Content-Type": "application/json",
    "Authorization": "your-token-here",
  },
  credentials: "same-origin",
})
  .then(. . .);
```

## JavaScriptを使用してPOSTリクエストを送信する方法

`POST`リクエストを送信する場合、リクエストボディと共にサーバーにデータを送信する必要があるため、少し複雑になります。送信するデータの種類や特定のユースケースによっては、さらに複雑になることがあります。

例えば、以下のコードはJSONデータをバックエンドに送信します：

```javascript
fetch("https://jsonplaceholder.typicode.com/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "John Doe",
    email: "johndoe@example.com",
  }),
});
```

[1]: https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol
[2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise


リクエストボディは文字列データのみを受け付けるため、JSONを文字列に変換するには`stringify()`メソッドを使用してからリクエストボディに割り当てる必要があります。

これは`Content-Type`ヘッダーを含めることが重要である理由でもあります。これにより、受信側がリクエストボディの解析方法を理解できます。

しかし実際には、物事は通常もっと複雑です。例えば、ウェブフォームを扱う際には、JSONではなく`x-www-form-urlencoded`形式のエンコーディングを使用する可能性が高く、その場合リクエストは以下のように送信できます。

次の例では、あなたが[event handlers][3]を理解していると仮定しています。

```javascript
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");

  const formData = new URLSearchParams();

  usernameInput.addEventListener("input", function () {
    formData.set("username", usernameInput.value);
  });

  emailInput.addEventListener("input", function () {
    formData.set("email", emailInput.value);
  });

  form.addEventListener("submit", async function (event) {
    event.preventDefault(); // デフォルトのフォーム送信アクションを防止

    await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: formData.toString(),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  });
});
```

バックエンドにファイルをアップロードする必要がある場合は、`multipart/form-data`形式のエンコーディングを使用する必要があります。

```javascript
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("myForm");
  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const pictureInput = document.getElementById("picture");

  const formData = new FormData();

  usernameInput.addEventListener("input", function () {
    formData.set("username", usernameInput.value);
  });

  emailInput.addEventListener("input", function () {
    formData.set("email", emailInput.value);
  });

  pictureInput.addEventListener("change", function () {
    formData.set("picture", pictureInput.files[0]);
  });

  form.addEventListener("submit", async function (event) {
    event.preventDefault(); // デフォルトのフォーム送信を防止

    await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: formData,
    });
  });
});
```

`FormData()`を使用してリクエストボディを構築する場合、`Content-Type`は自動的に`multipart/form-data`に設定されるため、カスタムの`Content-Type`ヘッダーを設定する必要はありません。

## JavaScriptを使用してPUTリクエストを送信する方法

`PUT`リクエストは`POST`と似ていますが、メソッドを`PUT`に設定することを忘れないでください。

```javascript
fetch("https://jsonplaceholder.typicode.com/users", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    id: "123",
    name: "John Doe",
    email: "johndoe@example.com",
  }),
});
```

実際には、更新するレコードを特定するために`id`やその他のキーを提供する必要があります。

## JavaScriptを使用してDELETEリクエストを送信する方法

`DELETE`リクエストは`PUT`と似ていますが、メソッドを`DELETE`に設定することを忘れないでください。

```javascript
fetch("https://jsonplaceholder.typicode.com/users/123", {
  method: "DELETE",
});
```

同様に、削除するレコードを特定するために`id`を提供する必要があります。

## XMLHttpRequest (AJAX)を使用してリクエストを送信する方法

`fetch()`の他にも、`XMLHttpRequest`を使用してHTTPリクエストを送信することも可能です。次の例は、エンドポイント`https://jsonplaceholder.typicode.com`に`GET`リクエストを送信する方法を示しています。

```javascript
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://jsonplaceholder.typicode.com/users", true);
xhr.onload = function () {
  if (xhr.status >= 200 && xhr.status < 300) {
    console.log(JSON.parse(xhr.responseText));
  } else {
    console.error("Error:", xhr.statusText);
  }
};
xhr.onerror = function () {
  console.error("Request failed");
};
xhr.send();
```

構文は少し複雑で、`XMLHttpRequest`は非同期操作に関わるコールバック関数に依存しているため、コールバック地獄と呼ばれる、読みづらく保守が難しいコードベースになりやすいです。

しかし、`XMLHttpRequest`にはいくつかの利点もあります。`XMLHttpRequest`は`fetch()`よりも古く、より広くサポートされています。古いブラウザと互換性を保つ必要がある場合は`XMLHttpRequest`の使用を検討すべきです。

## 外部ライブラリを使用してリクエストを送信する方法

組み込みの方法の他に、サードパーティのライブラリを使用してHTTPリクエストを送信することもできます。例えば、jQueryを使用して`GET`リクエストを送信する方法は以下の通りです:

```javascript
$.get("https://api.example.com/data", function (data) {
  console.log(data);
}).fail(function (error) {
  console.error("Error:", error);
});
```

近年、jQueryの人気は低下しています。これは、バニラJavaScriptが年々改善され、人々が以前に悩まされていた問題が解決されたためです。新しい開発者にとって、JavaScriptアプリケーションを作成するための定番の選択肢ではなくなりました。

代わりに、`fetch()`と同様にPromiseベースのHTTPクライアントであるAxiosを使用することができます。`fetch()`が登場する前から、Axiosは多くの人々の好みでした。

```javascript
axios
  .get("https://api.example.com/data")
  .then((response) => console.log(response.data))
  .catch((error) => console.error("Axios error:", error));
```

[Axios][5]と`fetch()`は、どちらもPromiseベースであり、非常に似た文法を持っています。主な違いは、`fetch()`が組み込みであるのに対して、Axiosは外部ライブラリをインストールする必要がある点です。しかし、Axiosはリクエスト/レスポンスインターセプター、自動JSON処理、組み込みタイムアウトなど、より多くの機能を持っています。

## 結論

このチュートリアルでは、JavaScriptを使用してHTTPリクエストを送信するための4つの異なる方法を紹介しました。どれがプロジェクトに最適かはあなた次第です。

fetch APIは、JavaScriptを使用してHTTPリクエストを行うための現代的で標準的な方法です。その比較的シンプルな文法により、プロジェクトの保守が容易になります。

`XMLHttpRequest`は、HTTPリクエストを送信する古い方法です。新しいプロジェクトでの使用は一般的に推奨されませんが、プロジェクトが古いブラウザと互換性がある必要がある場合は、`XMLHttpRequest`が役立つかもしれません。

jQueryは、HTTPリクエストを送信することを含め、多くのことを行うことができる外部パッケージです。近年、jQueryの重要性は薄れてきていますが、多くの古いプロジェクトでまだ使用されており、JavaScript開発者としての仕事で遭遇する可能性があります。

Axiosは、HTTPリクエストを送信するために使用されるサードパーティライブラリです。fetch APIと非常に似た文法を持っていますが、より高度な機能が多数あります。これらの機能が必要かどうかを判断するのはあなた次第です。そうでない場合、一般的には`fetch()`を使用することが推奨されます。

JavaScriptとウェブ開発についてもっと学びたい場合は、[thedevspace.io][6]をご覧ください。

[1]: https://www.freecodecamp.org/news/what-is-http/
[2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[3]: https://www.freecodecamp.org/news/dom-events-and-javascript-event-listeners/
[4]: https://jquery.com/
[5]: https://axios-http.com/docs/intro
[6]: https://www.thedevspace.io

