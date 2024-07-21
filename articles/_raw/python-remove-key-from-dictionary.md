---
title: Python Remove Key from Dictionary – How to Delete Keys from a Dict
date: 2024-07-21T11:04:39.933Z
authorURL: ""
originalURL: https://www.freecodecamp.org/news/python-remove-key-from-dictionary/
translator: ""
reviewer: ""
---

Dictionaries are a useful data type in Python for storing data in a key-value format. And there are times when you might need to remove a particular key-value pair from a dictionary.

<!-- more -->

You'll learn some dictionary basics, as well as how to delete keys, in this tutorial.

## How to Write a Dict in Python

Dictionaries are denoted by curly braces `{}` and the key-value pairs are separated by colons `:`. For example, the following code initializes a dictionary with three key-value pairs:

```py
my_dict = {'apple': 2, 'banana': 3, 'orange': 5}
```

You can also initialize dictionaries using the built-in `dict()` function. For example:

```py
my_dict = dict(apple=2, banana=3, orange=5)
```

Now I'll teach you how to securely remove keys from a Python dictionary. When I say "securely," I mean that if the key doesn't actually exist in the dictionary, the code won't throw an error.

We'll discover how to accomplish this using the `del` keyword, the `pop()` method, and the `popitem()` method. Finally, you'll see how to use Python to remove multiple keys from a dictionary.

Let's get started!

## How to Remove a Key from a Dict Using the `del` Keyword

The most popular method for removing a key:value pair from a dictionary is to use the `del` keyword. You can also use it to eliminate a whole dictionary or specific words.

Simply use the syntax shown below to access the value you need to delete:

```py
del dictionary[key]
```

Let's have a look at an example:

```py
Members = {"John": "Male", "Kat": "Female", "Doe": "Female" "Clinton": "Male"}

del Members["Doe"]
print(Members)
```

Output:

```bash
{"John": "Male", "Kat": "Female", "Clinton": "Male"}
```

## How to Remove a Key from a Dict Using the `pop()` Method

Another technique to remove a key-value pair from a dictionary is to use the `pop()` method. The syntax is shown below:

```py
dictionary.pop(key, default_value)
```

Example:

```py
My_Dict = {1: "Mathew", 2: "Joe", 3: "Lizzy", 4: "Amos"}
data = My_Dict.pop(1)
print(data)
print(My_Dict)
```

Output:

```bash
Mathew
{2: "Joe", 3: "Lizzy", 4: "Amos"}
```

## How to Remove a Key from a Dict Using the `popitem()` Function

The built-in `popitem()` function eliminates the the last key:value pair from a dictionary. The element that needs to be removed cannot be specified and the function doesn't accept any inputs.

The syntax looks like this:

```py
dict.popitem()
```

Let's consider and example for a better understanding.

```py
# initialize a dictionary
My_dict = {1: "Red", 2: "Blue", 3: "Green", 4: "Yello", 5: "Black"}

# using popitem()
Deleted_key = My_dict.popitem()
print(Deleted_key)
```

Output:

```bash
(5, 'Black')
```

As you can see, the function removed the last key:value pair – `5: "Black"` – from the dictionary.

## How to Remove Multiple Keys from a Dict

You can easily delete multiple keys from a dictionary using Python. The `.pop()` method, used in a loop over a list of keys, is the safest approach for doing this.

Let's examine how we can supply a list of unique keys to remove, including some that aren't present:

```py
My_dict = {'Sam': 16, 'John': 19, 'Alex': 17, 'Doe': 15}

#define the keys to remove
keys = ['Sam', 'John', 'Doe']

for key in keys:
    My_dict.pop(key, None)

print(My_dict)
```

Output:

```bash
{'Alex': 17}
```

One thing to note is that in the `pop()` method inside the loop, we pass in `None` and the default value, just to make sure no `KeyError` is printed if a key doesn't exist.

## How to Remove All Keys from a Dict Using the `clear()` Method

You can use the `clear()` method to remove all key-value pairs from a dictionary. The syntax is as follows:

```py
dictionary.clear()
```

Example:

```py
Colors = {1: "Red", 2: "Blue", 3: "Green"}
Colors.clear()
print(Colors)
```

Output:

```bash
{}
```

## Conclusion

For removing a key-value pair or several key-value pairs from a dictionary, we discussed a variety of Python methods in this article.

You can do so using the `del` keyword, which is the most common method of removing a key-value pair from a dictionary. The `pop()` method is useful when we need to remove a key-value pair and also get the value of the key-value pair. Using the `popitem()` function, we can remove the final key-value pair in a dictionary.

Also, if you need to remove all key:value pairs in a dictionary, you can use the `clear()` method.

Let's connect on [Twitter][1] and on [LinkedIn][2]. You can also subscribe to my [YouTube][3] channel.

Happy Coding!

[1]: https://www.twitter.com/Shittu_Olumide_
[2]: https://www.linkedin.com/in/olumide-shittu
[3]: https://www.youtube.com/channel/UCNhFxpk6hGt5uMCKXq0Jl8A