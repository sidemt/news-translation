---
title: Pythonの辞書からキーを削除する方法 – Dictからキーを削除する方法
date: 2024-07-21T11:04:39.933Z
authorURL: ""
originalURL: https://www.freecodecamp.org/news/python-remove-key-from-dictionary/
translator: ""
reviewer: ""
---

辞書は、Pythonでデータをキーと値の形式で格納するのに便利なデータ型です。時には辞書から特定のキーと対応する値のペアを削除する必要があるかもしれません。

<!-- more -->

このチュートリアルでは、辞書の基本とキーの削除方法について学びます。

## Pythonでの辞書（Dict）の書き方

辞書は中括弧 `{}` で示され、キーと値のペアはコロン `:` で区切られています。例えば、以下のコードは3つのキーと値のペアを持つ辞書を初期化します：

```py
my_dict = {'apple': 2, 'banana': 3, 'orange': 5}
```

組み込みの `dict()` 関数を使用して辞書を初期化することもできます。例えば：

```py
my_dict = dict(apple=2, banana=3, orange=5)
```

次に、Pythonの辞書からキーを安全に削除する方法を教えます。「安全に」というのは、キーが実際に辞書に存在しない場合でもエラーを発生させないことを意味します。

`del` キーワード、`pop()` メソッド、`popitem()` メソッドを使用してこれを達成する方法を見ていきます。最後に、Pythonを使用して辞書から複数のキーを削除する方法を見ていきます。

さあ、始めましょう！

## `del` キーワードを使用してDictからキーを削除する方法

辞書からキーと値のペアを削除する最も一般的な方法は、`del` キーワードを使用することです。また、これを使用して辞書全体または特定の言葉を削除することもできます。

削除したい値にアクセスするには、次のような構文を使用します：

```py
del dictionary[key]
```

例を見てみましょう：

```py
Members = {"John": "Male", "Kat": "Female", "Doe": "Female" "Clinton": "Male"}

del Members["Doe"]
print(Members)
```

出力：

```bash
{"John": "Male", "Kat": "Female", "Clinton": "Male"}
```

## `pop()` メソッドを使用してDictからキーを削除する方法

辞書からキーと値のペアを削除するもう一つの方法は、`pop()` メソッドを使用することです。構文は次の通りです：

```py
dictionary.pop(key, default_value)
```

例：

```py
My_Dict = {1: "Mathew", 2: "Joe", 3: "Lizzy", 4: "Amos"}
data = My_Dict.pop(1)
print(data)
print(My_Dict)
```

出力：

```bash
Mathew
{2: "Joe", 3: "Lizzy", 4: "Amos"}
```

## `popitem()` 関数を使用してDictからキーを削除する方法

組み込みの `popitem()` 関数は、辞書から最後のキーと値のペアを削除します。削除する要素は指定できず、関数は引数を受け取りません。

構文は次の通りです：

```py
dict.popitem()
```

より理解しやすいように、例を考えてみましょう。

```py
# 辞書を初期化する
My_dict = {1: "Red", 2: "Blue", 3: "Green", 4: "Yellow", 5: "Black"}

# popitem() を使用する
Deleted_key = My_dict.popitem()
print(Deleted_key)
```

出力：

```bash
(5, 'Black')
```

ご覧の通り、関数は辞書から最後のキーと値のペアである `5: "Black"` を削除しました。

## 複数のキーをDictから削除する方法

Pythonを使用して辞書から複数のキーを簡単に削除することができます。ループ内でリストのキーを繰り返し使用する `.pop()` メソッドは、そのための最も安全なアプローチです。

存在しないキーも含め、削除するユニークなキーのリストをどのように提供できるかを見てみましょう：

```py
My_dict = {'Sam': 16, 'John': 19, 'Alex': 17, 'Doe': 15}

# 削除するキーを定義する
keys = ['Sam', 'John', 'Doe']

for key in keys:
    My_dict.pop(key, None)

print(My_dict)
```

出力：

```bash
{'Alex': 17}
```

`pop()` メソッドのループ内で、キーが存在しない場合でも `KeyError` が表示されないように、デフォルト値として `None` を渡している点に注意してください。

## `clear()` メソッドを使用してDictからすべてのキーを削除する方法

`clear()` メソッドを使用して、辞書からすべてのキーと値のペアを削除できます。構文は次の通りです：

```py
dictionary.clear()
```

例：

```py
Colors = {1: "Red", 2: "Blue", 3: "Green"}
Colors.clear()
print(Colors)
```

出力：

```bash
{}
```

## 結論

この記事では、辞書からキーと値のペアを削除するためのさまざまなPythonメソッドを紹介しました。

辞書からキーと値のペアを削除する最も一般的な方法は `del` キーワードを使用することです。`pop()` メソッドはキーと値のペアを削除し、その値も取得する必要がある場合に便利です。`popitem()` 関数を使用すると、辞書の最後のキーと値のペアを削除できます。

また、辞書内のすべてのキーと値のペアを削除する必要がある場合は、`clear()` メソッドを使用できます。

[Twitter][1] と [LinkedIn][2] でつながりましょう。また、私の [YouTube][3] チャンネルにも登録してください。

ハッピーコーディング！

[1]: https://www.twitter.com/Shittu_Olumide_
[2]: https://www.linkedin.com/in/olumide-shittu
[3]: https://www.youtube.com/channel/UCNhFxpk6hGt5uMCKXq0Jl8A


