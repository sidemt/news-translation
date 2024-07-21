---
title: 如何将 Flutter 应用程序从 GetIt 迁移到 Bloc
date: 2024-07-19T23:05:13.000Z
author: Tomer Ben Rachel
authorURL: https://www.freecodecamp.org/news/author/tomer/
OriginalURL: https://www.freecodecamp.org/news/migrate-a-flutter-application-from-getit-to-bloc/
Proofreader: ""

---

/ [#Flutter][1]

<!-- more -->

# 如何将 Flutter 应用程序从 GetIt 迁移到 Bloc

![Tomer Ben Rachel](https://www.freecodecamp.org/news/content/images/size/w60/2021/05/tomer-ben-rachel-gravatar.jpeg)

[Tomer Ben Rachel][2]

![如何将 Flutter 应用程序从 GetIt 迁移到 Bloc](https://www.freecodecamp.org/news/content/images/size/w2000/2024/07/ryan-quintal-US9Tc9pKNBU-unsplash.jpg)

当我第一次使用 Flutter 构建一个[应用程序][3]时，我很快遇到了需要在小部件之间传递状态的情况。这些小部件不是直接相关的，当时我只知道有无状态小部件或有状态小部件。

我发现很难理解如何让一个完全无关的小部件知道应用程序中另一个小部件发生了什么。

例如，我想实现一个允许用户选择应用程序主题（亮/暗）的功能。由于我在设置屏幕中有这个功能，我想知道如何让应用程序的其余部分知道主题已经更改并对其进行反应。

在网上搜索指导时，我注意到有很多解决方案被提出，每个都有不同程度的复杂性。****Bloc****是很多人建议的热门选择，但同时也有人说它的学习曲线相当陡峭。为了更快地向应用程序提供功能，我选择使用 [GetIt][4]。

为什么我选择 GetIt？我认为这个包的创建者用[自己的话][5]最好地总结了它的优点：

> __GetIt 是:__  
> __- 极快 (O(1))__  
> __- 易学/易用__  
> __- 不会像 Provider 或 Redux 那样使你的 UI 树充满访问数据的特殊小部件。__

它提到 GetIt 不是状态管理解决方案，而是一个帮助你访问应用程序中对象的工具。

所以我开始在应用程序中使用 GetIt 结合 Provider 和 ChangeNotifier。虽然不怎么优雅，但它完成了任务。

在为我的应用程序开发功能并使其更稳健的过程中，我心里知道我没有使用正确的工具来正确地管理状态。

最近，我决定是时候学习 Bloc 并将我的应用程序中的代码转换为使用它了。我知道这不会是一项容易的任务，但在经历了它之后，我可以承认，在几次尝试和错误之后，它变得更容易处理。每次遇到用例时，我的理解都在增加。

在本文中，我将展示一些实际用例，我将 GetIt 与 Provider 和 ChangeNotifier 结合使用，并用 Bloc 替换它们。希望你能通过这些例子更好地理解如何在你的应用程序中使用 Bloc。

## 管理深色/浅色主题

我希望我的应用程序支持不同的主题。为此，我创建了一个设置屏幕，用户可以在其中控制主题颜色。

![1-1](https://www.freecodecamp.org/news/content/images/2024/07/1-1.jpg)

设置屏幕

开发这个功能是我第一次处理应用程序状态的变化，这些变化将反映在不直接相关的小部件中。所以，除了为设置屏幕创建一个小部件之外，

```Dart
class SettingsScreen extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
              appBar: AppBar(
                title: new Text("设置"),
              ),
              body:
                  Column(
                      mainAxisAlignment: MainAxisAlignment.start,
                      children: [
                        Consumer<SettingsScreenManager>(
                            builder: (context, notifier, child) {
                              return  SwitchListTile(
                                  title: const Text('深色模式'),
                                  value: notifier.themeMode == ThemeMode.light ? false : true,
                                  secondary:
                                  new Icon(
                                      Icons.dark_mode,
                                      color: notifier.themeMode == ThemeMode.light ? Color(0xFF642ef3) : Color.fromARGB(200, 243, 231, 106)
                                  ),
                                  onChanged:notifier.handleThemeModeSettingChange
                              );
                            }
                        ),
                        //.....
                      ],
                    ),
                  )
      );
  }
```

我还为其创建了一个管理类，名为 SettingsScreenManager，其中有这个方法：

```Dart
 void handleThemeModeSettingChange(bool isDarkModeEnabled) {
    _themeMode = _themeMode == ThemeMode.dark ? ThemeMode.light : ThemeMode.dark;
    _storageService.saveThemeModeSetting(isDarkModeEnabled);
    notifyListeners();
  }
```

这不是最好的方法，为了解决这个问题，我创建了一个 Bloc 来处理主题模式：

```Dart
import 'package:birthday_calendar/service/storage_service/storage_service.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

enum ThemeEvent { toggleDark, toggleLight }

class ThemeBloc extends Bloc<ThemeEvent, ThemeMode> {
  ThemeBloc(StorageService storageService, bool isDarkMode) 
    : super(isDarkMode ? ThemeMode.dark : ThemeMode.light) {
    on<ThemeEvent>((event, emit) {
      ThemeMode themeMode = event == ThemeEvent.toggleDark ? ThemeMode.dark : ThemeMode.light;
      emit(themeMode);
      storageService.saveThemeModeSetting(themeMode == ThemeMode.dark);
    });
  }
}
```

让我们来拆解一下这个 Bloc 的组件：

1. 我声明了一个名为 **ThemeEvent** 的枚举，用于表示用户选择的明亮/暗黑主题。
2. 由于 Bloc 的状态直接是 **ThemeMode** 对象，所以没有必要创建一个特定的 State 对象。
3. 每当主题改变时，我会发射所选的主题模式。

并且我在我的 **main.dart** 文件中初始化了这个 bloc，以便它可以被小部件层次结构中的任何小部件访问。还因为我希望由于此 Bloc 而发生的任何更改都能在整个应用程序中生效。

```Dart
 @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
      providers: [
        BlocProvider(create: (context) => ThemeBloc(storageService, isDarkMode)),
        //...
      ],
      child: BlocBuilder<ThemeBloc, ThemeMode>(
        builder: (context, state) {
          return MaterialApp(
              title: applicationName,
              theme: ThemeData.light(),
              themeMode: state,
              darkTheme: ThemeData.dark(),
              home: MainPage(
                  key: Key("BirthdayCalendar"),
                  notificationService: notificationService,
                  contactsService: contactsService,
                  storageService: storageService,
                  title: applicationName,
                  currentMonth: BirthdayCalendarDateUtils.getCurrentMonthNumber()));
        },
      ),
    );
  }
```

## 请求权限

我在应用程序中有一个功能，允许用户导入他们的联系人。要做到这一点，首先需要请求运行时权限。

最初，我使用与上一节相同的方法来处理这个问题，利用了 SettingsScreenManager 类、Consumer 和 Provider。

```Dart
Consumer<SettingsScreenManager>(
   builder: (context, notifier, child) {
    return ListTile(
      title: const Text("Import Contacts"),
      leading: Icon(Icons.contacts,
          color: !notifier.isContactsPermissionPermanentlyDenied ? Colors.blue : Colors.grey
      ),
      onTap: () {
        Provider.of<SettingsScreenManager>(context, listen: false).handleImportingContacts(context);
      },
      enabled: !notifier.isContactsPermissionPermanentlyDenied
  );
}),
```

替换这个方法比创建 ThemeBloc 更进一步，因为我需要处理不同的权限状态，还需要记住权限是否被永久拒绝。

```Dart
enum ContactsPermissionStatusEvent {
  PermissionUnknown,
  PermissionDenied,
  PermissionGranted,
  PermissionPermanentlyDenied
}

class ContactsPermissionStatusBloc
    extends Bloc<ContactsPermissionStatusEvent, PermissionStatus> {
  ContactsPermissionStatusBloc(ContactsService contactsService)
      : super(PermissionStatus.denied) {
    on<ContactsPermissionStatusEvent>((event, emit) async {
      if (event == ContactsPermissionStatusEvent.PermissionUnknown) {
        bool permissionStatus =
            await contactsService.isContactsPermissionsPermanentlyDenied();
        if (permissionStatus) {
          emit(PermissionStatus.permanentlyDenied);
          return;
        }
      }
      emit(_convertEventNameToPermissionStatus(event));
    });
  }

  PermissionStatus _convertEventNameToPermissionStatus(
      ContactsPermissionStatusEvent event) {
    switch (event) {
      case ContactsPermissionStatusEvent.PermissionDenied:
        return PermissionStatus.denied;
      case ContactsPermissionStatusEvent.PermissionGranted:
        return PermissionStatus.granted;
      case ContactsPermissionStatusEvent.PermissionPermanentlyDenied:
        return PermissionStatus.permanentlyDenied;
      default:
        return PermissionStatus.denied;
    }
  }
}
```

这个 Bloc 包含以下内容：

- 一个名为 **ContactsPermissionStatusEvent** 的枚举，对应于操作系统的不同权限状态。
- 这个 Bloc 的状态可以很容易地用 **PermissionStatus** 类表示。
- 我有一个名为 **\_convertEventNameToPermissionStatus** 的私有辅助方法，用于将事件名称转换为相应的权限状态。

你可能会问自己为什么我添加了一个名为 **PermissionUnknown** 的事件。我这样做是为了在用户导航到 SettingsScreen 之前获取权限状态。如果用户之前选择永久拒绝权限，我希望为他们灰掉导入联系人的选项。

```Dart
@override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
      providers: [
        BlocProvider(create: (context) => ThemeBloc(storageService, isDarkMode)),
        BlocProvider(
            create: (context) => ContactsPermissionStatusBloc(contactsService)),
        BlocProvider(create: (context) => VersionBloc())
      ],
      child: BlocBuilder<ThemeBloc, ThemeMode>(
        builder: (context, state) {
          return MaterialApp(
```

然后我在 SettingsScreen 组件的父组件的 initState 方法内发送了该事件。

```Dart
 @override
  void initState() {
    //....
    BlocProvider.of<ContactsPermissionStatusBloc>(context)
        .add(ContactsPermissionStatusEvent.PermissionUnknown);
    super.initState();
  }
```

原本那大段代码被精简成了这样：

```Dart
BlocBuilder<ContactsPermissionStatusBloc, PermissionStatus>(
              builder: (context, state) {
            return ListTile(
                title: const Text("Import Contacts"),
                leading: Icon(Icons.contacts, color: Colors.blue),
                onTap: () {
                  _handleImportingContacts(context);
                },
                enabled: state.isPermanentlyDenied ? false : true);
          }),
```

## 与列表交互

应用程序的一部分功能允许用户在特定的日历日期添加或删除生日。与之前的功能一样，这里我也创建了一个管理类来处理用户添加/删除生日的状态。

逻辑的一部分涉及到展示一个带有字段的警报对话框，用于添加生日。在尝试迁移到 Bloc 时，这部分逻辑证明是最坚固的，因为我必须考虑所有的用户流程。

这个组件看起来是这样的：

```Dart
@override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => BirthdaysForCalendarDayManager(this.birthdays, this.dateOfDay),
          builder: (context, provider) {
              return Scaffold(
              appBar: AppBar(
              title: FittedBox(
                  fit: BoxFit.fitWidth,
                  child: Text(
                      "Birthdays for ${_dateService.convertMonthToWord(this.dateOfDay.month)} ${this.dateOfDay.day}")
              )
          ),
            body: Center(
                child: Column(
                  children: [
                      Consumer<BirthdaysForCalendarDayManager>(
                          builder: (context, data, child) =>
                          Expanded(child:
                            ListView.builder(
                                  itemCount: data.birthdays.length,
                                  itemBuilder: (BuildContext context, int index) {
                                  return BirthdayWidget(
                                    key: Key(data.birthdays[index].name),
                                      birthdayOfPerson: data.birthdays[index],
                                      onDeletePressedCallback: () {
                                        Provider.of<BirthdaysForCalendarDayManager>(context, listen: false).removeBirthdayFromList(data.birthdays[index]);
                                    },
                                    indexOfBirthday: index);
                                  },
                                 ),
                           ),
                          )
                      ],
                   )
                ),
                floatingActionButton: FloatingActionButton(
                onPressed: () {
                  Provider.of<BirthdaysForCalendarDayManager>(context, listen: false).handleAddBirthdayBtnPressed(context, dateOfDay);
                  },
                child: Icon(Icons.add)),
              );
          },
    );
  }
```

和管理类：

```Dart
class BirthdaysForCalendarDayManager extends ChangeNotifier {

  NotificationService _notificationService = getIt<NotificationService>();
  StorageService _storageService = getIt<StorageService>();
  final List<UserBirthday> _currentBirthdays = [];
  DateTime date = DateTime.now();

  UnmodifiableListView<UserBirthday> get birthdays => UnmodifiableListView(_currentBirthdays);

  BirthdaysForCalendarDayManager(List<UserBirthday> birthdays, DateTime dateTime) {
    //....
  }

  void _handleUserInput(UserBirthday userBirthday) {
    //....
  }

  void _addBirthdayToList(UserBirthday userBirthday) {
    //....
    notifyListeners();
  }

  void removeBirthdayFromList(UserBirthday birthdayToRemove) async {
    //....
    notifyListeners();
  }

  void handleAddBirthdayBtnPressed(BuildContext context, DateTime dateOfDay) async {
    //....
  }
```

那么如何迁移这些逻辑到 Bloc 呢？首先我们来考虑下需要的不同事件：

1.  添加一个项目到列表
2.  从列表删除一个项目
3.  展示对话框允许用户添加一个项目（这用于能够展示对话框）

那么事件的内部枚举可以看起来是这样：

```Dart
enum BirthdayEvent { AddBirthday, RemoveBirthday, ShowAddBirthdayDialog }
```
```

```Dart
class BirthdaysEvent {
  final BirthdayEvent eventName;  // 1
  final UserBirthday? birthday;   // 2
  final bool? shouldShowAddBirthdayDialog; // 3
  final List<UserBirthday> birthdays; // 4
  final DateTime? date;  //5

  BirthdaysEvent(
      {required this.eventName,
      this.birthday,
      this.shouldShowAddBirthdayDialog,
      required this.birthdays,
      this.date});
}
```

1.  事件名称
2.  我们将添加或删除的生日
3.  一个标志，指示是否显示“添加生日”对话框
4.  特定日期的生日列表
5.  用户想要添加/删除生日的日期

你可能已经注意到，并不是所有字段在创建 ****BirthdaysEvent**** 时都是必须的。这是因为对于不同类型的事件，并不需要所有这些字段。例如，当用户想添加另一个生日时，第二个参数（标题为 birthday）是无关紧要的，因为我们想创建一个生日。

接下来，我们需要考虑在我们的状态中应该包含什么。查看上面的代码，很明显我们需要：

-   保持生日列表，因为我们要么从中删除要么添加到其中
-   一个标志，指示是否应该显示添加生日对话框
-   要添加/删除生日的当前日期

```Dart
class BirthdaysState {
  final DateTime? date;
  final List<UserBirthday>? birthdays;
  final bool showAddBirthdayDialog;

  BirthdaysState(
      {this.date, this.birthdays, required this.showAddBirthdayDialog});
}
```

所以我们已经确定了我们的事件和状态。现在是时候在我们的 bloc 中实现处理每个事件和创建新状态的逻辑了：

```Dart
class BirthdaysBloc extends Bloc<BirthdaysEvent, BirthdaysState> {
  BirthdaysBloc(NotificationService notificationService,
      StorageService storageService, List<UserBirthday> birthdaysForDate)
      : super(BirthdaysState(
            date: DateTime.now(),
            birthdays: birthdaysForDate,
            showAddBirthdayDialog: false)) {
    on<BirthdaysEvent>((event, emit) {
      switch (event.eventName) {
        case BirthdayEvent.AddBirthday:
          _handleAddEvent(event, emit, storageService, notificationService);
          break;
        case BirthdayEvent.RemoveBirthday:
          _handleRemoveEvent(event, emit, storageService, notificationService);
          break;
        case BirthdayEvent.ShowAddBirthdayDialog:
          emit(new BirthdaysState(showAddBirthdayDialog: true));
          break;
      }
    });
  }
```

如果我们看一个事件，****ShowAddBirthdayDialog****，你可以看到我们只是发出一个新的 BirthdayState，其中 ****showAddBirthdayDialog**** 设置为 true。但这是如何处理的呢？我不得不对上面的 widget 进行大量重构，以便它能够响应状态的变化。

```Dart
  @override
  Widget build(BuildContext context) {
   return BlocProvider(                            // 1
        create: (context) =>
            BirthdaysBloc(notificationService, storageService, birthdays),
        child: BlocBuilder<BirthdaysBloc, BirthdaysState>(   // 2
            builder: (context, state) {
          return Scaffold(
            appBar: AppBar(
                title: FittedBox(
                    fit: BoxFit.fitWidth,
                    child: Text(
                        "Birthdays for ${BirthdayCalendarDateUtils.convertMonthToWord(this.dateOfDay.month)} ${this.dateOfDay.day}"))),
            body: Center(
                child: Column(
              children: [
                (state.birthdays == null || state.birthdays!.length == 0)
                    ? Spacer()
                    : Expanded(
                        child: ListView.builder(
                          itemCount: state.birthdays != null
                              ? state.birthdays!.length
                              : 0,
                          itemBuilder: (BuildContext context, int index) {
                            return BirthdayWidget(
                                key: Key(state.birthdays![index].name),
                                birthdayOfPerson: state.birthdays![index],
                                onDeletePressedCallback: () {  // 3
                                  BlocProvider.of<BirthdaysBloc>(context).add(
                                      new BirthdaysEvent(
                                          eventName:
                                              BirthdayEvent.RemoveBirthday,
                                          birthday: state.birthdays![index],
                                          birthdays: birthdays));
                                },
                                indexOfBirthday: index,
                                storageService: storageService,
                                notificationService: notificationService);
                          },
                        ),
                      ),
                BlocListener<BirthdaysBloc, BirthdaysState>(  // 4
                  listener: (context, state) {
                    if (state.showAddBirthdayDialog) {
                      showDialog(
                          context: context,
                          builder: (_) => BlocProvider.value(  // 5
                              value: BlocProvider.of<BirthdaysBloc>(context),
                              child: AddBirthdayForm(
                                  dateOfDay: dateOfDay,
                                  storageService: storageService)));
                    }
                  },
                  child: Spacer(),
                )
              ],
            )),
            floatingActionButton: FloatingActionButton(
                onPressed: () { // 6
                  BlocProvider.of<BirthdaysBloc>(context).add(BirthdaysEvent(
                      eventName: BirthdayEvent.ShowAddBirthdayDialog,
                      shouldShowAddBirthdayDialog: true,
                      birthdays: birthdays));
                },
                child: Icon(Icons.add)),
          );
        }));
  }
```

1.  由于 BirthdaysBloc 只在这个小部件内需要，因此它是在此小部件内创建的
2.  我们使用 BlocBuilder，这样当状态发生变化时，小部件将重新绘制自己
3.  当选择删除某个生日时，我们会创建一个 RemoveBirthday 事件并传递所有必要的信息
4.  我们使用 BlocListener 处理状态的变化，以便显示用于添加新生日的 AlertDialog
5.  由于我们的 BirthdaysBloc 不在全局级别，因此有必要使用 BlocProvider 将它传递给 ****AddBirthdayForm**** 小部件
6.  当用户按下浮动操作按钮以表示添加生日的意图时，我们会创建一个 ShowAddBirthdayDialog 事件

请注意，经过所有这些更改之后，不再需要管理类，因此代码本身变得更直接且更易于维护。

您非常欢迎查看上面在 GitHub 仓库中的完整代码：

[

GitHub - TomerPacific/BirthdayCalendar: 一个用 Flutter 编写的应用程序，帮助你记住生日 🎂

一个用 Flutter 编写的应用程序，帮助你记住生日 🎂 - TomerPacific/BirthdayCalendar

![favicon](https://github.githubassets.com/favicons/favicon.svg)TomerPacificGitHub

![BirthdayCalendar](https://opengraph.githubassets.com/21382a0b54408ffe9527c0d2ecb43f977c9566f9471936d649b05fec39622d48/TomerPacific/BirthdayCalendar)

][6]

如果你愿意，你也可以在[这里][7]查看这个应用程序。

---

![Tomer Ben Rachel](https://www.freecodecamp.org/news/content/images/size/w60/2021/05/tomer-ben-rachel-gravatar.jpeg)

[Tomer Ben Rachel][8]

阅读[更多帖子][9]。

---

如果这篇文章对你有帮助，请分享。

免费学习编程。freeCodeCamp 的开源课程已经帮助超过 40,000 人找到开发者的工作。[开始吧][10]

[1]: /news/tag/flutter/
[2]: /news/author/tomer/
[3]: https://play.google.com/store/apps/details?id=com.tomerpacific.birthday_calendar&hl=en
[4]: https://pub.dev/packages/get_it
[5]: https://pub.dev/packages/get_it#why-getit
[6]: https://github.com/TomerPacific/BirthdayCalendar
[7]: https://play.google.com/store/apps/details?id=com.tomerpacific.birthday_calendar
[8]: /news/author/tomer/
[9]: /news/author/tomer/
[10]: https://www.freecodecamp.org/learn/

