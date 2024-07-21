---
title: How to Migrate a Flutter Application from GetIt to Bloc
date: 2024-07-19T23:05:13.000Z
author: Tomer Ben Rachel
authorURL: https://www.freecodecamp.org/news/author/tomer/
OriginalURL: https://www.freecodecamp.org/news/migrate-a-flutter-application-from-getit-to-bloc/
Proofreader: ""

---

/ [#Flutter][1]

<!-- more -->

# How to Migrate a Flutter Application from GetIt to Bloc

![Tomer Ben Rachel](https://www.freecodecamp.org/news/content/images/size/w60/2021/05/tomer-ben-rachel-gravatar.jpeg)

[Tomer Ben Rachel][2]

  ![How to Migrate a Flutter Application from GetIt to Bloc](https://www.freecodecamp.org/news/content/images/size/w2000/2024/07/ryan-quintal-US9Tc9pKNBU-unsplash.jpg)

When I first built an [application][3] using Flutter, I quickly ran into situations where I needed to pass state from widget to widget. These widgets weren’t directly related and all I knew back then was that there were only Stateless widgets or Stateful ones.

I found it hard to understand how I could achieve letting a completely unrelated widget know about something that happens in another widget inside my application.

Take, for example, a feature I wanted to implement that would allow the user to choose the theme of the application (light/dark). Since I had a settings screen with this feature, I wondered how I could let the rest of the application know that the theme has changed and react to it.

Searching online for guidance, I noticed there was no shortage of solutions being offered. Each with it’s own degree of complexity. ****Bloc**** was a popular choice plenty of people online suggested, but in the same breath, it was said that the learning curve is quite steep. Wanting to deliver features to the application quicker, I chose to use [GetIt][4].

Why did I choose GetIt? I think the package’s creator(s) pretty much sum it up best [in their own words][5]:

> __GetIt is:__  
> __\- Extremely fast (O(1))__  
> __\- Easy to learn/use__  
> __\- Doesn’t clutter your UI tree with special Widgets to access your data like, Provider or Redux does.__

It is mentioned that GetIt is not a state management solution, but rather a tool to help you access objects inside your application.

So I headed off in the direction of using GetIt with a combination of Provider and ChangeNotifier in my application. While it wasn’t pretty, it got the job done.

During the development of features for my application and making it more robust, I knew in the back of my head that I wasn’t using the correct tools to manage state properly in my application.

Recently, I decided that it was time to learn Bloc properly and to convert the code inside my application to use it. I knew that it wasn’t going to be an easy task, but after going through it, I can admit that after a few trail and error attempts, it got easier to handle. With each use case I encountered, my understanding grew.

In this article, I’ll present some actual use cases where I used GetIt in combination with Provider and ChangeNotifier and replaced them with Bloc. Hopefully you can use these examples to better understand how to use Bloc in your applications.

## Managing the Dark/Light Theme

I wanted my application to support different themes. To do that, I created a Settings screen where the user could control the theme color.

![1-1](https://www.freecodecamp.org/news/content/images/2024/07/1-1.jpg)

Settings Screen

Developing this was the first time I had to deal with changes in the application’s state that would be reflected in widgets that weren't directly related. So, besides creating a widget for the Settings screen,

```Dart
class SettingsScreen extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
              appBar: AppBar(
                title: new Text("Settings"),
              ),
              body:
                  Column(
                      mainAxisAlignment: MainAxisAlignment.start,
                      children: [
                        Consumer<SettingsScreenManager>(
                            builder: (context, notifier, child) {
                              return  SwitchListTile(
                                  title: const Text('Dark Mode'),
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

I also created a manager class for it called SettingsScreenManager, where I had this method:

```Dart
 void handleThemeModeSettingChange(bool isDarkModeEnabled) {
    _themeMode = _themeMode == ThemeMode.dark ? ThemeMode.light : ThemeMode.dark;
    _storageService.saveThemeModeSetting(isDarkModeEnabled);
    notifyListeners();
  }
```

The connection between the screen and its manager happens when the widget is created, as that is where I create the manager class. Then, throughout the widget itself, I call methods on the manager class. To make the widget redraw itself, I used the Consumer widget.

This is not the best approach, and to rectify the situation I created a Bloc to handle the theme mode:

```Dart
import 'package:birthday_calendar/service/storage_service/storage_service.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

enum ThemeEvent { toggleDark, toggleLight }

class ThemeBloc extends Bloc<ThemeEvent, ThemeMode> {
  ThemeBloc(StorageService storageService, bool isDarkMode) : super(isDarkMode ? ThemeMode.dark : ThemeMode.light) {
    on<ThemeEvent>((event, emit) {
      ThemeMode themeMode = event == ThemeEvent.toggleDark ? ThemeMode.dark : ThemeMode.light;
      emit(themeMode);
      storageService.saveThemeModeSetting(themeMode == ThemeMode.dark ? true : false);
    });
  }
}
```

Let’s break down the components of this Bloc:

1.  I have declared an enum called ****ThemeEvent**** to signify the user’s choice of light/dark theme
2.  Since the state of the Bloc is directly the ****ThemeMode**** object, there was no need to create a specific State object
3.  Whenever the theme changes, I emit the chosen theme mode

And I initialized this bloc inside my ****main.dart**** file in order for it to be accessible to any widget in the widget hierarchy. Also, I wanted any change that occurred due to this Bloc to be enacted on the entire application.

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

## Requesting Permission

There is a feature in my application that allows users to import their contacts. In order to do so, there is a requirement to first ask a runtime permission.

Initially, I handled this using the same approach as in the previous section, utilizing the SettingsScreenManager class, a Consumer, and a Provider.

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

Replacing this was a step up from creating the ThemeBloc since I needed to handle the different permission statuses and also to remember if the permission was permanently denied.

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

This Bloc has the following:

-   A ****ContactsPermissionStatusEvent**** enum that correlates with the different permissions status the OS has
-   The state for this Bloc can be easily represented with the ****PermissionStatus**** class
-   I have a private helper method called ****\_convertEventNameToPermissionStatus**** to help in converting the event name to it’s corresponding permission status

You might be asking yourself why I added an event called ****PermissionUnknown****. I did this so I could get the permission status in advance of the user navigating to the SettingsScreen. In the case where the user previously chose to permanently deny the permission, I wanted to gray out the option to import contacts for them.

To achieve this, I created the Bloc in the main.dart file:

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

and I sent the event inside the initState method of the widget that is the parent of the SettingsScreen.

```Dart
 @override
  void initState() {
    //....
    BlocProvider.of<ContactsPermissionStatusBloc>(context)
        .add(ContactsPermissionStatusEvent.PermissionUnknown);
    super.initState();
  }
```

And instead of the huge chunk of code I had earlier, I now have this:

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

## Interacting with a List

Part of my application allows users to add/remove birthdays on specific calendar dates. As with previous features, here too I created a manager class to handle the state for if a user added/removed a birthday.

Part of the logic involved the presentation of an alert dialog with fields to add a birthday. This logic proved to be the most robust when trying to migrate to Bloc, as I had to think about all of the user flows.

This is what that widget looked like:

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

And the manager class:

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

So how can we go about migrating all this logic to Bloc? Well, first let’s think of the different events we will need:

1.  Adding an item to the list
2.  Removing an item to the list
3.  Presenting the dialog that allows users to add an item to the list (this is used to be able to show the dialog)

So our inner enum for events can look like:

```Dart
enum BirthdayEvent { AddBirthday, RemoveBirthday, ShowAddBirthdayDialog }
```

But what will our BirthdaysEvent include?

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

1.  The event name
2.  The birthday we will either add or remove
3.  A flag to indicate if we should present the dialog
4.  The whole list of birthdays for the specific date
5.  The date the user wants to add/remove birthdays to/from

You may have noticed that not all fields are required to create a ****BirthdaysEvent****. This is because not all of these fields are necessary for the different types of events. For example, when the user wants to add another birthday, the second argument (titled birthday) is irrelevant since we want to create a birthday.

Next, we need to think about what should be included in our state. Looking at the code above, it is clear that we need:

-   To keep the list of birthdays, as we are either removing from or adding to it
-   A flag to indicate if we should show the add birthday dialog
-   The current date to add/remove birthdays to

```Dart
class BirthdaysState {
  final DateTime? date;
  final List<UserBirthday>? birthdays;
  final bool showAddBirthdayDialog;

  BirthdaysState(
      {this.date, this.birthdays, required this.showAddBirthdayDialog});
}
```

So we got our events in place and our state as well. Now it's time to implement the logic in our bloc that handles each of these events and create a new state:

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

If we look at one event, ****ShowAddBirthdayDialog****, you can see that we are just emitting a new BirthdayState where the ****showAddBirthdayDialog**** is set to true. But where is this handled? I had to heavily refactor the widget from above in order for it to respond for changes in the state.

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

There is a lot to unpack here, so let’s take it one step at a time.

1.  The BirthdaysBloc is created inside this widget since it is not needed anywhere else up the widget tree
2.  We are using a BlocBuilder so the widget will re-draw itself when the state changes
3.  When a birthday is chosen to be deleted, we create a RemoveBirthday event and pass along all the necessary information
4.  We are using a BlocListener to handle the changes in the state in order to show the AlertDialog for adding a new birthday
5.  Since our BirthdaysBloc is not found on the global level, it is necessary to pass it in to the ****AddBirthdayForm**** widget using BlocProvider
6.  When the user presses the floating action button to signify an intent to add a birthday, we create a ShowAddBirthdayDialog event

Notice that, after all these changes, the manager class was no longer needed and therefore, the code itself is more straightforward and easier to maintain.

You are more than welcome to check out the entirety of the code shown above in the GitHub repository here:

[

GitHub - TomerPacific/BirthdayCalendar: An application written in Flutter that helps you remember birthdays 🎂

An application written in Flutter that helps you remember birthdays 🎂 - TomerPacific/BirthdayCalendar

![favicon](https://github.githubassets.com/favicons/favicon.svg)TomerPacificGitHub

![BirthdayCalendar](https://opengraph.githubassets.com/21382a0b54408ffe9527c0d2ecb43f977c9566f9471936d649b05fec39622d48/TomerPacific/BirthdayCalendar)

][6]

And if you like, you can check out the application itself, [here][7].

---

![Tomer Ben Rachel](https://www.freecodecamp.org/news/content/images/size/w60/2021/05/tomer-ben-rachel-gravatar.jpeg)

[Tomer Ben Rachel][8]

Read [more posts][9].

---

If this article was helpful, share it.

Learn to code for free. freeCodeCamp's open source curriculum has helped more than 40,000 people get jobs as developers. [Get started][10]

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