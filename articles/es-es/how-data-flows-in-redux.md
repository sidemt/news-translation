---
title: Flujo de Datos en Redux Explicado – Un Manual de Gestión de Estado
date: 2024-07-10T16:12:38.997Z
authorURL: ""
originalURL: https://www.freecodecamp.org/news/how-data-flows-in-redux/
translator: ""
reviewer: ""
---

En aplicaciones complejas de React, manejar el estado de la aplicación de manera efectiva puede convertirse en un desafío. Aquí es donde Redux, una biblioteca predecible de gestión de estado, entra en juego.

<!-- more -->

Al introducir un flujo de datos unidireccional, Redux trae orden y claridad a cómo se actualizan e interactúan los datos dentro de tus componentes de React.

Este artículo discute el funcionamiento interno de Redux, concretamente enfocándose en cómo los datos fluyen a lo largo de tu aplicación. Exploraremos conceptos clave como la tienda de Redux, acciones, reductores, y selectores, junto con ejemplos prácticos de cómo trabajan juntos para manejar de manera efectiva el estado de tu aplicación.

## Tabla de Contenidos

1.  [¿Qué es Redux?][1]
2.  [¿Por Qué Usar Redux para la Gestión de Datos?][2]
3.  [Conceptos Clave del Flujo de Datos en Redux][3]  
    \* [Flujo de Datos Unidireccional][4]  
    \* [Beneficios del Flujo de Datos Unidireccional][5]
4.  [Gestión de Estado con la Tienda de Redux][6]  
    \* [¿Qué es la Tienda de Redux?][7]  
    \* [Estructura de la Tienda (Estado, Reductores, Acciones)][8]
5.  [Acciones: Iniciando Cambios de Estado][9]  
    \* [Creadores de Acciones (Funciones para Crear Acciones)][10]  
    \* [Tipos de Acciones (Identificando Diferentes Acciones)][11]
6.  [Cómo Procesar Cambios de Estado][12]  
    \* [Funciones Puras: Reductores en el Núcleo][13]  
    \* [Características de las Funciones Puras][14]
7.  [Anatomía de una Función de Reductor][15]  
    \* [Parámetros: Estado Previo y Objeto Acción][16]  
    \* [Valor de Retorno: Estado Actualizado][17]
8.  [Cómo Manejar Diferentes Acciones en los Reductores][18]  
    \* [Uso de Sentencias Switch o Lógica Condicional][19]
9.  [Despachando Acciones: Cómo Actualizar la Tienda de Redux][20]  
    \*  [La Función `dispatch`][21]  
    \* [Despachando Acciones desde Componentes o Eventos][22]
10.  [Cómo Acceder a Datos Específicos de la Tienda][23]  
    \*  [Creando Funciones Selector][24]  
    \*  [Memoización para un Uso Eficiente de los Selectores][25]
11.  [Cómo Conectar Componentes de React a Redux][26]  
    \*  [La Función `connect` de la Biblioteca `react-redux`][27]  
    \*  [Mapeo de Estado y Despacho a Props][28]  
    \*  [Uso de Componentes Conectados en tu Aplicación][29]
12.  [Técnicas Avanzadas de Flujo de Datos en Redux][30]  
    \*  [Acciones Asíncronas (Redux Thunk, Redux Saga)][31]  
    \*  [Middleware para Extender la Funcionalidad de Redux][32]
13.  [Mejores Prácticas para Gestionar el Flujo de Datos en Redux][33]
14.  [Conclusión][34]

## ¿Qué es Redux?

Redux es un contenedor de estado predecible para aplicaciones JavaScript, utilizado principalmente con bibliotecas como React. Ayuda a gestionar el estado de la aplicación en una tienda centralizada, facilitando la gestión y actualización del estado en toda tu aplicación.

En términos simples, Redux proporciona una manera de almacenar y gestionar los datos que tu aplicación necesita para funcionar. Sigue un patrón estricto para asegurar que los cambios de estado sean predecibles y manejables.

## ¿Por Qué Usar Redux para la Gestión de Datos?

Usar Redux para la gestión de datos en tu aplicación ofrece varias ventajas:

**Gestión Centralizada del Estado**: Redux almacena el estado de la aplicación en una única tienda, lo que hace que sea más fácil de gestionar y depurar en comparación con tener el estado disperso en múltiples componentes.

**Cambios de Estado Predecibles**: Las mutaciones de estado se hacen a través de reductores, que son funciones puras. Esto asegura que los cambios de estado sean predecibles y rastreables, haciendo más fácil entender cómo los datos fluyen a través de tu aplicación.

**Depuración Más Fácil**: Con una única fuente de verdad, la depuración se vuelve más simple. Puedes registrar cambios de estado, rastrear acciones, e incluso implementar depuración de viaje en el tiempo (a través de Redux DevTools) para reproducir acciones e inspeccionar el estado en cualquier punto en el tiempo.

**Facilita las Pruebas**: Dado que los reductores son funciones puras que dependen únicamente de su entrada y producen una salida predecible, las pruebas se vuelven directas. Puedes probar fácilmente cómo los reductores actualizan el estado en respuesta a diferentes acciones.

**Impone el Flujo de Datos Unidireccional**: Redux sigue un patrón estricto de flujo de datos unidireccional. Los datos fluyen en una sola dirección: se despachan acciones, los reductores actualizan el estado de manera inmutable, y los componentes se suscriben a los cambios en los que están interesados. Este patrón simplifica la gestión de datos y reduce errores relacionados con estados inconsistentes.

**Facilita la Persistencia del Estado**: Redux facilita la persistencia del estado de tu aplicación a través de sesiones o su almacenamiento local, mejorando la experiencia del usuario al preservar los datos entre visitas.

**Escalabilidad**: Redux escala bien con aplicaciones grandes debido a su gestión centralizada del estado. A medida que tu aplicación crece, gestionar el estado se vuelve más manejable y menos propenso a errores en comparación con el uso del estado local del componente o la perforación de props.

## Conceptos Clave del Flujo de Datos en Redux

Entender los conceptos clave del flujo de datos en Redux es esencial para dominar la gestión de estado en aplicaciones modernas de JavaScript.

### Flujo de Datos Unidireccional

Redux sigue un patrón estricto de flujo de datos unidireccional, lo que significa que los datos en tu aplicación se mueven en una única dirección a través de una serie de pasos:



Aquí tienes una visión general simplificada de cómo funciona el flujo de datos unidireccional en Redux:

1.  **Desencadenar Acción (Action Dispatch)**: Los componentes desencadenan acciones en la tienda Redux utilizando `store.dispatch(action)`. Las acciones son objetos JavaScript simples con un campo `type` que describe el tipo de acción que se está realizando.
2.  **Manejo de Acciones (Action Handling)**: La tienda pasa la acción desencadenada al reductor raíz. El reductor es una función pura que toma el estado actual y la acción, calcula el nuevo estado basado en la acción y devuelve el estado actualizado.
3.  **Actualización de Estado (State Update)**: La tienda Redux actualiza su estado basado en el valor de retorno del reductor raíz. Notifica a todos los componentes suscritos el cambio de estado.
4.  **Re-renderización del Componente (Component Re-render)**: Los componentes que están suscritos a la tienda reciben el estado actualizado como propiedades. Se vuelven a renderizar con los nuevos datos.

### Beneficios del Flujo de Datos Unidireccional

**Predictibilidad**: Al imponer una única dirección para el flujo de datos, Redux hace que los cambios de estado sean más previsibles y fáciles de entender. Las acciones son explícitas sobre los cambios que están ocurriendo, y los reductores definen claramente cómo ocurren las transiciones de estado.

**Depuración**: El flujo de datos unidireccional simplifica la depuración porque puedes rastrear cómo los cambios de estado se propagan a través de tu aplicación. Redux DevTools mejora esto aún más al permitirte rastrear acciones, inspeccionar cambios de estado a lo largo del tiempo e incluso reproducir acciones para reproducir errores.

**Mantenibilidad**: Con una clara separación entre datos (estado) y lógica (reductores), Redux promueve un código más limpio y mantenible. Reduce la probabilidad de errores causados por mutaciones de estado inconsistentes o efectos secundarios.

**Escalabilidad**: A medida que tu aplicación crece en tamaño y complejidad, el flujo de datos unidireccional ayuda a gestionar las actualizaciones de estado de manera más efectiva. Evita las trampas del enlace de datos bidireccional y asegura que los cambios en el estado sean controlados y manejables.

**Pruebas**: Dado que los reductores son funciones puras que toman entradas y producen salidas sin efectos secundarios, la prueba unitaria se vuelve directa. Puedes probar los reductores con diferentes acciones y escenarios de estado para asegurar que se comporten como se espera.

## Gestión del Estado con la Tienda Redux

La gestión del estado juega un papel fundamental en el desarrollo web moderno, asegurando que las aplicaciones mantengan estados consistentes y predecibles en varios componentes.

### ¿Qué es la Tienda Redux?

La Tienda Redux es el corazón de la gestión de estado de Redux. Almacena todo el árbol de estado de tu aplicación. La tienda te permite:

-   Acceder al estado actual de tu aplicación a través de `store.getState()`.
-   Desencadenar acciones para cambiar el estado utilizando `store.dispatch(action)`.
-   Suscribirte a cambios en el estado para que tus componentes puedan actualizarse en consecuencia utilizando `store.subscribe(listener)`.

En esencia, la Tienda Redux actúa como un repositorio centralizado para el estado de tu aplicación, facilitando el flujo de datos predecible y haciendo la gestión del estado más manejable.

### Estructura de la Tienda (Estado, Reductores, Acciones)

El **estado** en Redux representa todo el estado de tu aplicación. Típicamente, se estructura como un objeto JavaScript simple. La forma del estado está definida por los reductores. Por ejemplo:

```javascript
const initialState = {
  todos: [],
  visibilityFilter: 'SHOW_ALL',
};
```

En este ejemplo, `todos` y `visibilityFilter` son piezas del estado gestionadas por Redux.

**Reductores (Reducers)** son funciones que especifican cómo cambia el estado de la aplicación en respuesta a las acciones desencadenadas a la tienda. Toman el estado actual y una acción como argumentos, y devuelven el nuevo estado basado en el tipo de acción.

Los reductores deben ser funciones puras, lo que significa que producen la misma salida para la misma entrada y no modifican el estado directamente.

```javascript
const todosReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ];
    case 'TOGGLE_TODO':
      return state.map(todo =>
        (todo.id === action.id)
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    default:
      return state;
  }
};
```

En este ejemplo, `todosReducer` gestiona la pieza de estado `todos`, manejando acciones como `'ADD_TODO'` y `'TOGGLE_TODO'` para agregar nuevos todos o alternar su estado de finalización.

**Acciones (Actions)** son objetos JavaScript simples que describen lo que ocurrió en tu aplicación. Son la única fuente de información para la tienda. Las acciones típicamente tienen un campo `type` que indica el tipo de acción que se está realizando, y también pueden llevar datos adicionales necesarios para la acción.

```javascript
const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
});

const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id
});
```

En este ejemplo, `addTodo` y `toggleTodo` son funciones creadoras de acciones que devuelven acciones para agregar un nuevo todo y alternar el estado de finalización de un todo, respectivamente.

La relación entre estos elementos en Redux es crucial para gestionar el estado de la aplicación de manera efectiva:

-   **Acciones** describen eventos que ocurren en tu aplicación.
-   **Reductores** especifican cómo cambia el estado de la aplicación en respuesta a las acciones.
-   **Tienda** contiene el estado de la aplicación y permite desencadenar acciones para actualizar el estado.

## Acciones: Iniciación de Cambios de Estado

Manejar el estado de manera efectiva es fundamental para crear aplicaciones dinámicas y receptivas. Las acciones, dentro de la arquitectura de Redux y bibliotecas de gestión de estado similares, sirven como elementos importantes para iniciar cambios de estado.

### Creadores de Acciones (Funciones para Crear Acciones)

Los creadores de acciones en Redux son funciones que crean y devuelven objetos de acción. Estos objetos de acción describen lo que sucedió en tu aplicación y se envían a la tienda de Redux para iniciar cambios de estado.

Los creadores de acciones encapsulan la lógica de crear acciones, haciendo tu código más modular y fácil de probar.

Aquí tienes un ejemplo de un creador de acciones:

```javascript
// Función creadora de acciones
const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
});

// Uso del creador de acciones
const newTodoAction = addTodo('Comprar comestibles');
```

En este ejemplo:

- `addTodo` es una función creadora de acciones que toma `text` como parámetro y devuelve un objeto de acción.
- El objeto de acción tiene un campo `type` (`'ADD_TODO'`) que identifica el tipo de acción y campos adicionales (`id` y `text`) que proporcionan datos necesarios para la acción.

Los creadores de acciones simplifican el proceso de crear acciones, especialmente cuando las acciones requieren datos complejos o cálculos antes de ser enviadas.

### Tipos de Acción (Identificación de Diferentes Acciones)

Los tipos de acción en Redux son constantes de cadena que definen el tipo de acción que se está realizando. Se utilizan para identificar y diferenciar diferentes acciones que se pueden enviar a la tienda de Redux. Al usar constantes de cadena para tipos de acción, Redux asegura que los tipos de acción sean únicos y fáciles de referenciar en toda tu aplicación.

Así es como típicamente se definen los tipos de acción:

```javascript
// Tipos de acción como constantes
const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
```

Estas constantes (`ADD_TODO`, `TOGGLE_TODO`, `SET_VISIBILITY_FILTER`) representan diferentes acciones que pueden ocurrir en tu aplicación, como agregar una tarea, alternar el estado de completado de una tarea o configurar un filtro de visibilidad para las tareas.

Los tipos de acción se utilizan típicamente en objetos de acción creados por creadores de acciones y se comparan en los reductores para determinar cómo debe cambiar el estado en respuesta a cada acción.

```javascript
// Ejemplo de uso de tipos de acción en un reductor
const todosReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ];
    case TOGGLE_TODO:
      return state.map(todo =>
        (todo.id === action.id)
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    default:
      return state;
  }
};
```

En este ejemplo:

- `ADD_TODO` y `TOGGLE_TODO` son tipos de acción usados en el `todosReducer` para manejar diferentes tipos de acciones (`'ADD_TODO'` y `'TOGGLE_TODO'`).
- El campo `action.type` en la declaración switch asegura que el reductor responda apropiadamente a cada acción enviada según su tipo.

## Cómo Procesar Cambios de Estado

En el corazón de la gestión de estado están los reductores, funciones puras diseñadas para manejar transiciones de estado de manera controlada e inmutable.

### Funciones Puras: Reductores en el Núcleo

Los reductores en Redux son funciones puras responsables de especificar cómo cambia el estado de la aplicación en respuesta a las acciones enviadas a la tienda. Toman el estado actual y una acción como argumentos, y devuelven el nuevo estado basado en el tipo de acción.

Aquí tienes un desglose de cómo funcionan los reductores y su papel en la gestión de cambios de estado:

**Funciones Puras**: Los reductores son funciones puras, lo que significa que:

- Producen la misma salida para los mismos datos de entrada cada vez que son llamados.
- No causan efectos secundarios (como modificar argumentos o variables globales).
- No mutan el estado directamente, sino que devuelven un nuevo objeto de estado.

**Manejo de Transiciones de Estado**: Los reductores especifican cómo cambia el estado de la aplicación en respuesta a diferentes tipos de acciones. Utilizan el estado actual y la acción enviada para calcular y devolver el nuevo estado.

```javascript
// Ejemplo de un reductor de tareas
const todosReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ];
    case 'TOGGLE_TODO':
      return state.map(todo =>
        (todo.id === action.id)
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    default:
      return state;
  }
};
```

En este ejemplo:

- `todosReducer` es una función pura que toma `state` (arreglo actual de tareas) y `action` como argumentos.
- Dependiendo del `action.type`, calcula y devuelve un nuevo estado (arreglo de tareas actualizado).

**Actualizaciones de Estado Inmutables**: Los reductores nunca deben mutar el estado directamente. En su lugar, crean copias del estado y modifican las copias para producir un nuevo objeto de estado. Esto asegura que Redux pueda detectar cambios de estado y actualizar los componentes de manera eficiente.

### Características de las Funciones Puras

Las funciones puras, incluyendo los reductores de Redux, tienen características específicas que las hacen adecuadas para manejar cambios de estado:

**Determinista**: Una función pura siempre produce la misma salida para la misma entrada. Esta previsibilidad asegura que los reductores se comporten de manera consistente y sean más fáciles de razonar.

**Sin Efectos Secundarios**: Las funciones puras no modifican los argumentos de entrada ni ningún estado externo. Solo dependen de sus parámetros de entrada y producen una salida sin causar efectos secundarios observables.

**Datos Inmutables**: Las funciones puras no mutan los datos. En su lugar, crean y devuelven nuevas estructuras de datos. En Redux, los reductores producen un nuevo objeto de estado sin modificar el estado existente, lo que permite una detección eficiente de cambios y gestión del estado.

**Transparencia Referencial**: Las funciones puras pueden ser reemplazadas por sus valores de retorno sin afectar la corrección del programa. Esta propiedad apoya la composibilidad y facilita la prueba y el razonamiento sobre el código.

## Anatomía de una Función Reductora

Una función reductora, en su esencia, define cómo cambia el estado de la aplicación en respuesta a acciones enviadas. Esta función toma dos parámetros: el estado actual y un objeto de acción, determinando el nuevo estado basado en el tipo de acción recibida.

### Parámetros: Estado Anterior y Objeto de Acción

Una función reductora en Redux es una función pura que toma dos parámetros: el estado anterior (estado antes de que se aplique la acción) y un objeto de acción. Estos parámetros definen cómo el reductor calcula el próximo estado de la aplicación.

**Estado Anterior**: Este parámetro representa el estado actual de la aplicación antes de que se envíe la acción. Es inmutable y no debe ser modificado directamente dentro del reductor.

**Objeto de Acción**: Un objeto de acción es un objeto JavaScript simple que describe lo que sucedió en tu aplicación. Típicamente tiene un campo `type` que indica el tipo de acción que se está realizando. Otros campos en el objeto de acción pueden proporcionar datos adicionales necesarios para actualizar el estado.

```javascript
const action = {
  type: 'ADD_TODO',
  id: 1,
  text: 'Comprar comestibles'
};
```

En este ejemplo, `action.type` es `'ADD_TODO'`, indicando que queremos agregar un nuevo elemento a la lista de tareas en el estado.

### Valor de Retorno: Estado Actualizado

La función reductora debe devolver el estado actualizado basado en el estado anterior y el objeto de acción que se le pasa. El estado actualizado es típicamente un nuevo objeto que representa el estado de la aplicación después de aplicar la acción.

Aquí está la estructura básica de una función reductora:

```javascript
const initialState = {
  todos: [],
  visibilityFilter: 'SHOW_ALL'
};

const todoAppReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: action.id,
            text: action.text,
            completed: false
          }
        ]
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          (todo.id === action.id)
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    case 'SET_VISIBILITY_FILTER':
      return {
        ...state,
        visibilityFilter: action.filter
      };
    default:
      return state;
  }
};
```

En este ejemplo:

-   `todoAppReducer` es una función reductora que maneja el estado de las tareas y los filtros de visibilidad.
-   Toma `state` (estado anterior) y `action` como parámetros.
-   Dependiendo del `action.type`, calcula y devuelve un nuevo objeto de estado que refleja los cambios causados por la acción.

### Puntos Clave:

**Actualización Inmutable**: Los reductores nunca deben modificar el estado anterior directamente. En su lugar, crean un nuevo objeto de estado copiando el estado anterior (`...state`) y aplicando cambios a él.

**Caso Predeterminado**: El caso `default` en la declaración `switch` devuelve el estado actual sin cambios si el reductor no reconoce el tipo de acción. Esto asegura que el reductor siempre devuelva un objeto de estado válido, incluso si no se realizan cambios.

**Responsabilidad Única**: Cada caso en la declaración `switch` corresponde a un tipo de acción específico y es responsable de actualizar una parte específica del estado de la aplicación. Esto promueve una clara separación de responsabilidades y facilita entender y mantener los reductores.

## Cómo Manejar Diferentes Acciones en Reductores

En Redux, puedes manejar diferentes acciones en reductores usando declaraciones `switch` o lógica condicional. Ambos enfoques tienen como objetivo determinar cómo debe cambiar el estado de la aplicación basado en el tipo de acción enviada.

### Usando Declaraciones Switch

Las declaraciones `switch` son comúnmente usadas en reductores de Redux para manejar diferentes tipos de acción. Cada `case` en la declaración `switch` corresponde a un tipo de acción específico, y el reductor ejecuta la lógica correspondiente basada en el tipo de acción.

Aquí hay un ejemplo de cómo usar declaraciones `switch` en un reductor:

```javascript
const initialState = {
  todos: [],
  visibilityFilter: 'SHOW_ALL'
};

const todoAppReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: action.id,
            text: action.text,
            completed: false
          }
        ]
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          (todo.id === action.id)
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    case 'SET_VISIBILITY_FILTER':
      return {
        ...state,
        visibilityFilter: action.filter
      };
    default:
      return state;
  }
};
```


-   La función `todoAppReducer` utiliza una declaración switch para manejar diferentes tipos de acciones (`'ADD_TODO'`, `'TOGGLE_TODO'`, `'SET_VISIBILITY_FILTER'`).
-   Cada bloque `case` especifica cómo debe actualizarse el estado en respuesta al tipo de acción correspondiente.
-   El caso `default` devuelve el estado actual sin cambios si el reducer no reconoce el tipo de acción, asegurando que el reducer siempre devuelva un objeto de estado válido.

### Uso de lógica condicional

Alternativamente, los reducers también pueden usar lógica condicional (sentencias if-else) para determinar cómo actualizar el estado en función del tipo de acción. Aunque menos comunes que las declaraciones switch en Redux, la lógica condicional puede usarse de manera similar para manejar acciones.

Aquí hay un ejemplo de uso de lógica condicional en un reducer:

```javascript
const todoAppReducer = (state = initialState, action) => {
  if (action.type === 'ADD_TODO') {
    return {
      ...state,
      todos: [
        ...state.todos,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ]
    };
  } else if (action.type === 'TOGGLE_TODO') {
    return {
      ...state,
      todos: state.todos.map(todo =>
        (todo.id === action.id)
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    };
  } else if (action.type === 'SET_VISIBILITY_FILTER') {
    return {
      ...state,
      visibilityFilter: action.filter
    };
  } else {
    return state;
  }
};
```

En este ejemplo:

-   La función `todoAppReducer` utiliza sentencias if-else para comprobar el tipo de acción (`action.type`) y ejecutar diferentes lógicas basadas en el tipo de acción.
-   Cada condición especifica cómo debe actualizarse el estado para el tipo de acción correspondiente.
-   El bloque final `else` devuelve el estado actual sin cambios si el tipo de acción no es reconocido.

### Elegir entre declaraciones switch y lógica condicional

#### 1\. Declaraciones Switch:

-   Ventajas: Las declaraciones switch son típicamente más legibles y mantenibles al manejar múltiples tipos de acciones en Redux reducers. Separan claramente los diferentes casos basados en los tipos de acciones.
-   Consideraciones: Asegúrese de que cada tipo de acción tenga un `case` correspondiente en la declaración switch para manejar las actualizaciones correctamente.

#### 2\. Lógica Condicional:

-   Ventajas: La lógica condicional (sentencias if-else) proporciona flexibilidad y puede ser más fácil de entender en ciertos escenarios donde hay menos tipos de acciones.
-   Consideraciones: Mantenga la consistencia en la manipulación de los tipos de acciones y asegúrese de que cada condición maneje las actualizaciones de estado correctamente.

En la práctica, las declaraciones switch son el enfoque recomendado en los reducers Redux debido a su claridad y convención dentro de la comunidad de Redux. Ayudan a mantener un enfoque estructurado para manejar cambios de estado basados en diferentes tipos de acciones, promoviendo la consistencia y previsibilidad en las aplicaciones de Redux.

## Dispatching Actions: Cómo actualizar el store de Redux

Despachar acciones en Redux es fundamental para manejar las actualizaciones de estado dentro de su aplicación. Redux, un contenedor de estado predecible para aplicaciones de JavaScript, se basa en acciones como cargas útiles de información que envían datos desde su aplicación al store de Redux.

### La función `dispatch`

En Redux, la función `dispatch` es un método proporcionado por el store de Redux. Se utiliza para despachar acciones que desencadenan cambios de estado en la aplicación. Cuando se despacha una acción, el store de Redux llama a la función reducer asociada con ella, calcula el nuevo estado y notifica a todos los suscriptores que el estado ha sido actualizado.

Aquí se muestra cómo se usa la función `dispatch`:

```javascript
import { createStore } from 'redux';

// Función reducer
const counterReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
};

// Crear store de Redux
const store = createStore(counterReducer);

// Despachar acciones para actualizar el estado
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'DECREMENT' });
```

En este ejemplo:

-   Creamos un store de Redux usando `createStore` y pasamos la función `counterReducer`.
-   La función `store.dispatch` se usa para despachar acciones (`{ type: 'INCREMENT' }` y `{ type: 'DECREMENT' }`) para actualizar el estado.
-   Cada acción despachada desencadena el caso correspondiente en el reducer, actualizando el estado como se define.

### Despachar acciones desde componentes o eventos

En una aplicación Redux típica, las acciones a menudo se despachan desde componentes React en respuesta a interacciones del usuario u otros eventos.

Para despachar acciones desde componentes, típicamente se conecta el componente al store de Redux utilizando la función `connect` de React Redux o hooks como `useDispatch`.

Aquí se muestra cómo puede despachar acciones desde un componente React usando `connect` y `mapDispatchToProps`:

```javascript
import React from 'react';
import { connect } from 'react-redux';

// Funciones creadoras de acciones
const increment = () => ({ type: 'INCREMENT' });
const decrement = () => ({ type: 'DECREMENT' });
```

```markdown
// Mapear estado a props
const mapStateToProps = (state) => ({
  count: state.count
});

// Mapear despacho a props
const mapDispatchToProps = {
  increment,
  decrement
};

// Conectar componente a la store de Redux
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
```

En este ejemplo:

-   `increment` y `decrement` son funciones creadoras de acciones que devuelven acciones (`{ type: 'INCREMENT' }` y `{ type: 'DECREMENT' }`).
-   El componente `Counter` está conectado a la store de Redux usando `connect`. Recibe `count` del estado de Redux como una prop, junto con los creadores de acciones `increment` y `decrement`.
-   Al hacer clic en los botones "Increment" y "Decrement" se despachan acciones, que son manejadas por el reducer para actualizar el estado de Redux.

Alternativamente, puedes usar los hooks de React Redux (`useDispatch`) para despachar acciones en componentes funcionales:

```javascript
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Counter = () => {
  const count = useSelector(state => state.count);
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch({ type: 'INCREMENT' });
  };

  const handleDecrement = () => {
    dispatch({ type: 'DECREMENT' });
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
    </div>
  );
};

export default Counter;
```

En este ejemplo de componente funcional:

-   `useSelector` se usa para seleccionar `count` del estado de la store de Redux.
-   `useDispatch` se usa para obtener la función `dispatch` de la store de Redux.
-   Las funciones `handleIncrement` y `handleDecrement` despachan acciones (`{ type: 'INCREMENT' }` y `{ type: 'DECREMENT' }`) para actualizar el estado de Redux cuando se hace clic en los botones.

## Cómo Acceder a Datos Específicos desde la Store

Acceder a datos específicos desde la store en Redux implica navegar a través de la estructura del estado de la aplicación para recuperar la información precisa necesaria para renderizar componentes o realizar lógica.

### Crear Funciones Selector

Los selectores en Redux son funciones que encapsulan la lógica para recuperar piezas específicas de datos desde el estado de la store de Redux. Ayudan a desacoplar los componentes de la estructura del estado y facilitan el acceso y la transformación eficiente de datos.

Aquí tienes cómo puedes crear funciones selector:

```javascript
// Estado de Redux de ejemplo
const initialState = {
  todos: [
    { id: 1, text: 'Learn Redux', completed: false },
    { id: 2, text: 'Write Redux selectors', completed: true },
    // más todos...
  ],
  visibilityFilter: 'SHOW_COMPLETED'
};

// Función selector para obtener todos desde el estado
const getTodos = (state) => state.todos;

// Función selector para filtrar todos basándose en el filtro de visibilidad
const getVisibleTodos = (state) => {
  const todos = getTodos(state);
  const visibilityFilter = state.visibilityFilter;

  switch (visibilityFilter) {
    case 'SHOW_COMPLETED':
      return todos.filter(todo => todo.completed);
    case 'SHOW_ACTIVE':
      return todos.filter(todo => !todo.completed);
    case 'SHOW_ALL':
    default:
      return todos;
  }
};
```

En este ejemplo:

-   `getTodos` es una función selector que recupera el array `todos` del estado de Redux.
-   `getVisibleTodos` es una función selector que filtra `todos` basándose en el `visibilityFilter` almacenado en el estado.

Los selectores también pueden ser compuestos para crear selectores más complejos:

```javascript
// Función selector compuesta para obtener todos visibles
const getVisibleTodos = (state) => {
  const todos = getTodos(state);
  const visibilityFilter = state.visibilityFilter;

  switch (visibilityFilter) {
    case 'SHOW_COMPLETED':
      return getCompletedTodos(todos);
    case 'SHOW_ACTIVE':
      return getActiveTodos(todos);
    case 'SHOW_ALL':
    default:
      return todos;
  }
};

// Funciones ayudantes para filtrar todos
const getCompletedTodos = (todos) => todos.filter(todo => todo.completed);
const getActiveTodos = (todos) => todos.filter(todo => no completado));
```

### Memoización para Uso Eficiente de Selectores

La memoización es una técnica utilizada para optimizar cálculos costosos al almacenar en caché los resultados de las llamadas a funciones basándose en su entrada. En el contexto de los selectores de Redux, la memoización puede mejorar el rendimiento al asegurar que los selectores solo recalculen sus resultados cuando su entrada (estado) cambia.

Puedes usar bibliotecas como `reselect` para la memoización en selectores de Redux:

```bash
npm install reselect
```

Ejemplo de uso de `reselect` para memoización:

```javascript
import { createSelector } from 'reselect';

// Selectores
const getTodos = (state) => state.todos;
const getVisibilityFilter = (state) => state.visibilityFilter;

// Selector memoizado para obtener todos visibles
const getVisibleTodos = createSelector(
  [getTodos, getVisibilityFilter],
  (todos, visibilityFilter) => {
    switch (visibilityFilter) {
      case 'SHOW_COMPLETED':
        return todos.filter(todo => todo.completed);
      case 'SHOW_ACTIVE':
        return todos.filter(todo => no completado));
      case 'SHOW_ALL':
      default:
        return todos;
    }
  }
);
```
```

-   `createSelector` de `reselect` crea un selector memorizado que toma `getTodos` y `getVisibilityFilter` como selectores de entrada.
-   La función del selector calcula los todos filtrados basados en el `visibilityFilter` y guarda en caché el resultado hasta que cambien los selectores de entrada.

## Cómo Conectar Componentes de React a Redux

Conectar componentes de React a Redux es una técnica fundamental para gestionar el estado de la aplicación de manera eficiente dentro de proyectos basados en React. Redux sirve como una tienda centralizada que contiene todo el estado de tu aplicación, haciéndolo accesible a cualquier componente que lo necesite.

### La Función `connect` de la Biblioteca react-redux

En aplicaciones React que usan Redux para la gestión del estado, la función `connect` de la biblioteca `react-redux` se utiliza para conectar componentes de React a la tienda de Redux. Proporciona una manera de inyectar el estado de Redux y las funciones de envío de acciones (dispatchers) en tus componentes.

Así es como se usa `connect`:

```javascript
import React from 'react';
import { connect } from 'react-redux';

// Definir un componente React
const Counter = ({ count, increment, decrement }) => (
  <div>
    <p>Count: {count}</p>
    <button onClick={increment}>Incrementar</button>
    <button onClick={decrement}>Decrementar</button>
  </div>
);

// Mapear el estado de Redux a las props del componente
const mapStateToProps = (state) => ({
  count: state.count
});

// Mapear las acciones de envío a las props del componente
const mapDispatchToProps = {
  increment: () => ({ type: 'INCREMENT' }),
  decrement: () => ({ type: 'DECREMENT' })
};

// Conectar el componente con la tienda de Redux
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
```

### Mapeo de Estado y Envío a Props

**`mapStateToProps`**: Esta función mapea el estado de la tienda de Redux a las props de tu componente React. Toma el estado de Redux como argumento y retorna un objeto. Cada campo en el objeto retornado se convertirá en una prop para el componente conectado.

**`mapDispatchToProps`**: Esta función mapea las acciones de envío a las props de tu componente React. Puede ser un objeto donde cada campo es una función creadora de acciones, o una función que recibe `dispatch` como argumento y retorna un objeto. Cada creador de acciones será envuelto automáticamente con `dispatch` para que puedan ser llamados directamente.

En el ejemplo:

-   `mapStateToProps` mapea el campo `count` del estado de Redux (`state.count`) a la prop `count` del componente `Counter`.
-   `mapDispatchToProps` mapea las acciones `increment` y `decrement` a props, por lo que al hacer clic en los botones en el componente `Counter` se enviarán las acciones correspondientes (`{ type: 'INCREMENT' }` y `{ type: 'DECREMENT' }`).

### Uso de Componentes Conectados en Tu Aplicación

Una vez que un componente está conectado a la tienda de Redux usando `connect`, puede acceder al estado de Redux y enviar acciones a través de props. Así es como puedes usar componentes conectados en tu aplicación:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers'; // Importa tu reductor raíz
import App from './App'; // Importa tu componente conectado

// Crear la tienda de Redux con el reductor raíz
const store = createStore(rootReducer);

// Renderizar el componente App dentro del Provider
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

En esta configuración:

-   `Provider` es un componente de `react-redux` que hace que la tienda de Redux esté disponible para cualquier componente anidado que haya sido conectado usando `connect`.
-   `store` se crea usando `createStore` y se combina con un reductor raíz (`rootReducer`) que combina todos tus reductores en uno solo.

Al envolver tu componente de nivel superior (`App` en este caso) con `Provider` y pasar la tienda de Redux como prop, todos los componentes conectados dentro de tu aplicación pueden acceder a la tienda de Redux e interactuar con ella a través de props (mapeos de `mapStateToProps` y `mapDispatchToProps`).

## Técnicas Avanzadas de Flujo de Datos en Redux

Las técnicas avanzadas de flujo de datos en Redux amplían los principios fundamentales de gestión del estado en aplicaciones complejas. Estas técnicas van más allá de las acciones y reductores básicos, introduciendo conceptos como middleware, selectores y acciones asíncronas.

### Acciones Asíncronas (Redux Thunk, Redux Saga)

En Redux, manejar acciones asíncronas implica gestionar acciones que tienen efectos secundarios, como obtener datos de un servidor o actualizar el estado de forma asíncrona. Redux proporciona varias soluciones de middleware para manejar las acciones asíncronas de manera efectiva.

#### Redux Thunk

Redux Thunk es un middleware que permite escribir creadores de acciones que devuelven una función en lugar de un objeto de acción. Esta función puede realizar operaciones asíncronas y enviar acciones sincrónicas regulares cuando las operaciones asíncronas se completen.

Ejemplo de uso de Redux Thunk para acciones asíncronas:

**Configuración del Middleware Redux Thunk**:

```javascript
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers'; // Importa tu reductor raíz

// Crear la tienda de Redux con el middleware thunk
const store = createStore(rootReducer, applyMiddleware(thunk));
```

**Creador de Acciones Asíncrono usando Redux Thunk**:

```javascript
// Definir un creador de acciones asíncrono
const fetchData = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: 'FETCH_DATA_REQUEST' });
      const response = await fetch('https://api.example.com/data');
      const data = await response.json();
      dispatch({ type: 'FETCH_DATA_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'FETCH_DATA_FAILURE', error });
    }
  };
};
```

Implementar estas técnicas avanzadas en tu flujo de datos en Redux puede mejorar la eficacia y la capacidad de mantenimiento de tus aplicaciones React complejas.

```javascript
const rootReducer = combineReducers({
  todos: todosReducer,
  user: userReducer,
});

export default rootReducer;
```

### Acciones Asíncronas

**Redux Thunk**:

-   **Thunk actions**: Usa Redux Thunk para manejar operaciones asíncronas, como solicitudes de API.

```javascript
import { fetch } from 'cross-fetch';

export const fetchPosts = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const posts = await response.json();
      dispatch({ type: 'FETCH_POSTS_SUCCESS', payload: posts });
    } catch (error) {
      dispatch({ type: 'FETCH_POSTS_FAILURE', error: error.message });
    }
  };
};
```

En este ejemplo:

-   `fetchPosts` es un creador de acción que devuelve una función en lugar de un objeto de acción.
-   Dentro de la función, puedes realizar operaciones asíncronas (como la recuperación de datos) y enviar acciones basadas en el resultado.
-   El middleware Redux Thunk intercepta funciones devueltas por los creadores de acción, habilitando acciones asíncronas en Redux.

#### Redux Saga

Redux Saga es otro middleware para manejar efectos secundarios en aplicaciones Redux. Usa generadores ES6 para hacer que el código asíncrono sea más fácil de leer, escribir y probar.

Ejemplo de uso de Redux Saga para manejar acciones asíncronas:

**Configuración del Middleware Redux Saga**:

```javascript
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers'; // Importa tu reducer raíz
import rootSaga from './sagas'; // Importa tu saga raíz

// Crea el middleware Redux Saga
const sagaMiddleware = createSagaMiddleware();

// Crea la tienda Redux con middleware de Saga
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

// Ejecuta la saga raíz
sagaMiddleware.run(rootSaga);
```

**Ejemplo de Saga (rootSaga.js)**:

```javascript
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { fetchPostsSuccess, fetchPostsFailure } from './actions'; // Importa tus creadores de acción

// Saga trabajadora para recuperar posts
function* fetchPostsSaga() {
  try {
    const response = yield call(fetch, 'https://jsonplaceholder.typicode.com/posts');
    const posts = yield call([response, 'json']);
    yield put(fetchPostsSuccess(posts));
  } catch (error) {
    yield put(fetchPostsFailure(error.message));
  }
}

// Saga observadora para escuchar la acción FETCH_POSTS_REQUEST
function* watchFetchPosts() {
  yield takeEvery('FETCH_POSTS_REQUEST', fetchPostsSaga);
}

// Saga raíz
export default function* rootSaga() {
  yield all([
    watchFetchPosts()
    // Agrega más observadores si es necesario
  ]);
}
```

En este ejemplo:

-   `fetchPostsSaga` es una saga trabajadora que realiza la operación asíncrona (recuperar posts).
-   `watchFetchPosts` es una saga observadora que escucha acciones específicas (`FETCH_POSTS_REQUEST`) y dispara la correspondiente saga trabajadora.
-   `rootSaga` combina múltiples sagas usando `all` y las ejecuta usando `sagaMiddleware.run`.

### Middleware para Extender la Funcionalidad de Redux

El middleware en Redux proporciona una forma de extender las capacidades de la tienda Redux, como registrar acciones, manejar operaciones asíncronas, enrutar y más. El middleware se sitúa entre el despacho de una acción y el momento en que llega al reducer, permitiendo la intercepción y manipulación de las acciones.

#### Ejemplo de Middleware Personalizado:

```javascript
const loggerMiddleware = store => next => action => {
  console.log('Despachando acción:', action);
  const result = next(action);
  console.log('Nuevo estado:', store.getState());
  return result;
};

// Aplicando middleware personalizado a la tienda Redux
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers'; // Importa tu reducer raíz

// Crea la tienda Redux con middleware personalizado
const store = createStore(rootReducer, applyMiddleware(loggerMiddleware));
```

En este ejemplo:

-   `loggerMiddleware` es una función de middleware personalizada que registra cada acción despachada y el estado resultante.
-   `next` es una función proporcionada por Redux que permite que la acción continúe al siguiente middleware o al reducer.
-   El middleware personalizado mejora la funcionalidad de Redux al interceptar acciones, realizar lógica personalizada y, opcionalmente, despachar nuevas acciones o modificar las existentes.

## Mejores Prácticas para Gestionar el Flujo de Datos en Redux

Redux proporciona una forma estructurada de gestionar el estado en aplicaciones de JavaScript, pero el uso efectivo requiere adherirse a las mejores prácticas. Aquí están mis recomendaciones clave para gestionar el flujo de datos en Redux:

### Organización de Reducers y Acciones

**Estructura y Organización de Archivos**:

-   **Separar responsabilidades**: Mantén acciones, reducers y selectores en archivos separados para mantener la claridad y la modularidad.
-   **Estructura basada en funciones**: Agrupa acciones y reducers relacionados en función de características en lugar de tipos.

```plaintext
src/
├── actions/
│   ├── todosActions.js
│   └── userActions.js
├── reducers/
│   ├── todosReducer.js
│   └── userReducer.js
├── selectors/
│   ├── todosSelectors.js
│   └── userSelectors.js
└── store.js
```

**Tipos de Acciones**:

-   **Constantes**: Utiliza constantes o enumeraciones para los tipos de acción a fin de evitar errores tipográficos y garantizar la coherencia.

```javascript
// Tipos de acciones
export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
```

**Composición de Reducers**:

-   **Combinar reducers**: Usa `combineReducers` de Redux para combinar múltiples reducers en un único reducer raíz.

```javascript
import { combineReducers } from 'redux';
import todosReducer from './todosReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  todos: todosReducer,
  user: userReducer,
});

export default rootReducer;
```
```

export default rootReducer;
```

### Actualizaciones de Estado Inmutables

**Inmutabilidad con el Operador Spread**:

-   **Usar el operador spread (`...`)**: Crea nuevos objetos o arreglos al actualizar el estado para mantener la inmutabilidad.

```javascript
// Actualizando un arreglo en el estado de Redux
const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: action.id,
            text: action.text,
            completed: false
          }
        ]
      };
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          (todo.id === action.id) ? { ...todo, completed: !todo.completed } : todo
        )
      };
    default:
      return state;
  }
};
```

**Librerías Inmutables**:

-   **Immutable.js**: Considera usar librerías como Immutable.js para estructuras de datos más complejas, para forzar la inmutabilidad y optimizar el rendimiento.

```javascript
import { Map, List } from 'immutable';

const initialState = Map({
  todos: List(),
  user: Map()
});

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return state.update('todos', todos => todos.push(Map({
        id: action.id,
        text: action.text,
        completed: false
      })));

    case TOGGLE_TODO:
      return state.update('todos', todos =>
        todos.map(todo =>
          (todo.get('id') === action.id) ? todo.set('completed', !todo.get('completed')) : todo
        )
      );

    default:
      return state;
  }
};
```

### Pruebas de Aplicaciones Redux

**Pruebas Unitarias**:

-   **Reducers**: Prueba reducers para asegurar que manejan las acciones correctamente y retornan el estado esperado.

```javascript
describe('todosReducer', () => {
  it('debería manejar ADD_TODO', () => {
    const action = { type: 'ADD_TODO', id: 1, text: 'Test todo' };
    const initialState = { todos: [] };
    const expectedState = { todos: [{ id: 1, text: 'Test todo', completed: false }] };

    expect(todosReducer(initialState, action)).toEqual(expectedState);
  });
});
```

**Pruebas de Integración**:

-   **Creadores de Acciones y Thunks**: Prueba creadores de acciones y thunks para verificar que despachan las acciones correctas o manejan operaciones asíncronas.

```javascript
describe('creador de acción fetchPosts', () => {
  it('crea FETCH_POSTS_SUCCESS cuando la obtención de posts se ha completado', () => {
    const expectedActions = [
      { type: 'FETCH_POSTS_REQUEST' },
      { type: 'FETCH_POSTS_SUCCESS', payload: { /* datos simulados */ } }
    ];

    const store = mockStore({ posts: [] });

    return store.dispatch(fetchPosts()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
```

**Integración con Componentes**:

-   **Componentes Conectados**: Prueba componentes conectados usando `redux-mock-store` para simular el comportamiento de la tienda Redux.

```javascript
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import App from './App';

const mockStore = configureStore([]);

describe('<App />', () => {
  it('renderiza el componente App', () => {
    const store = mockStore({ /* estado simulado */ });

    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(getByText('Bienvenido a Redux App')).toBeInTheDocument();
  });
});
```

## Conclusión

Redux ofrece una solución poderosa para la gestión del estado en aplicaciones JavaScript, proporcionando una manera predecible y centralizada de manejar el estado de la aplicación.

Ya sea manejando operaciones asíncronas con middleware como Redux Thunk o Redux Saga, o optimizando la gestión del estado a través de prácticas de datos inmutables, Redux te permite construir aplicaciones escalables y mantenibles.

Dominando estas técnicas, puedes aprovechar Redux para optimizar el flujo de datos, mejorar el rendimiento de la aplicación y simplificar las complejidades de la gestión del estado en el desarrollo web moderno.

¡Eso es todo por este artículo! Si deseas continuar la conversación o tienes preguntas, sugerencias o comentarios, no dudes en contactarme en [LinkedIn][35]. Y si te gustó este contenido, considera [comprarme un café][36] para apoyar la creación de más contenidos amigables para desarrolladores.

[1]: #que-es-redux
[2]: #por-que-usar-redux-para-la-gestion-de-datos
[3]: #conceptos-basicos-del-flujo-de-datos-en-redux
[4]: #flujo-de-datos-unidireccional
[5]: #beneficios-del-flujo-de-datos-unidireccional
[6]: #gestion-del-estado-con-redux-store
[7]: #que-es-la-tienda-redux
[8]: #estructura-de-la-tienda-estado-reducers-acciones-
[9]: #acciones-iniciando-cambios-de-estado
[10]: #creadores-de-acciones-funciones-para-crear-acciones-
[11]: #tipos-de-acciones-identificando-diferentes-acciones-
[12]: #como-procesar-cambios-de-estado
[13]: #funciones-puras-reducers-en-el-nucleo
[14]: #caracteristicas-de-las-funciones-puras
[15]: #anatomia-de-una-funcion-reducer
[16]: #parametros-estado-anterior-y-objeto-accion
[17]: #valor-de-retorno-estado-actualizado
[18]: #como-manejar-diferentes-acciones-en-reducers
[19]: #uso-de-declaraciones-switch
[20]: #despachando-acciones-como-actualizar-la-tienda-redux
[21]: #la-funcion-despacho
[22]: #despachando-acciones-desde-componentes-o-eventos
[23]: #como-acceder-a-datos-especificos-desde-la-tienda
[24]: #creando-funciones-selectoras
[25]: #memorizacion-para-uso-eficiente-de-las-selector
[26]: #como-conectar-componentes-react-a-redux
[27]: #la-funcion-connect-de-la-biblioteca-react-redux
[28]: #mapeo-de-estado-y-despacho-a-propiedades
[29]: #uso-de-componentes-conectados-en-tu-aplicacion
[30]: #tecnicas-avanzadas-de-flujo-de-datos-en-redux
[31]: #acciones-asincronas-redux-thunk-redux-saga-
[32]: #middleware-para-extender-la-funcionalidad-de-redux
[33]: #mejores-practicas-para-la-gestion-del-flujo-de-datos-en-redux
[34]: #conclusion
[35]: https://ng.linkedin.com/in/joan-ayebola
[36]: https://www.buymeacoffee.com/joanayebola

