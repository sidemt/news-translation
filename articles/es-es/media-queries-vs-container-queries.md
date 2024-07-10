---
title: Consultas de Medios vs Consultas de Contenedor – ¿Cuál Deberías Usar y Cuándo?
date: 2024-07-10T15:13:55.371Z
authorURL: ""
originalURL: https://www.freecodecamp.org/news/media-queries-vs-container-queries/
translator: ""
reviewer: ""
---

A medida que la web evoluciona, se lanzan nuevas herramientas e ideas con el objetivo de facilitar nuestras vidas como desarrolladores web. Esto significa que debemos elegir entre mantener las viejas formas o descartarlas por completo por lo nuevo y brillante. Pero, ¿esto siempre requiere una solución de todo o nada?

<!-- more -->

En situaciones como estas, el enfoque ideal es entender ambos conceptos, comparar y contrastar sus fortalezas y debilidades, y luego decidir su aplicación más apropiada. Esto es exactamente lo que este artículo hará con consultas de medios y consultas de contenedor en CSS.

## Tabla de Contenidos

-   [Diseño Web Responsivo e Intrínseco][1]
-   [¿Qué son las consultas de medios?][2]
-   [¿Qué son las consultas de contenedor?][3]
-   [Comparación en la vida real y diferencias clave][4]
-   [¿Cuál deberías usar y cuándo?][5]
-   [Conclusión][6]

## Diseño Web Responsivo e Intrínseco

Antes de 2010, los desarrolladores web podían crear sitios que funcionaban principalmente en escritorio. Esto fue hasta que Ethan Marcotte introdujo el concepto de Diseño Web Responsivo (RWD, por sus siglas en inglés). Está [definido por MDN][7] como _una forma de diseñar para una web multi-dispositivo_. Esto llevó a la adopción de consultas de medios como un componente del RWD.

Pero últimamente ha habido un cambio hacia lo que Jen Simmons definió como Diseño Web Intrínseco: la necesidad de crear componentes conscientes del contexto. Y las consultas de contenedor están haciendo esto posible.

## ¿Qué Son las Consultas de Medios?

Las consultas de medios son reglas para aplicar estilos específicos a un elemento si se cumplen ciertas condiciones. Se utilizan popularmente para asegurar que los sitios web sean responsivos en varios dispositivos consultando el ancho del viewport.

Las consultas de medios se caracterizan por una regla @media seguida de una condición entre paréntesis y una expresión dentro de llaves que se aplicará si se cumple la condición indicada. Entonces, si quisiéramos cambiar el color de fondo de un div en función del ancho del viewport de un dispositivo, así es como podríamos hacerlo:

```css
/* Móvil */
@media (max-width: 480px) {
  .mysite {
    background-color: red;
  }
}
```

En el código de muestra anterior, estamos pidiendo que se le dé un color de fondo rojo al <div> con clase mysite si el viewport alcanza un ancho máximo de 480px.

**Consejo**: Max-width se usa para asumir un diseño primero en escritorio y objetivo más pequeño a medida que bajamos. Si fuera un diseño primero en móvil, usaríamos min-width para apuntar a pantallas más grandes a medida que subimos.

## ¿Qué Son las Consultas de Contenedor?

Las consultas de contenedor son reglas para aplicar estilos específicos a un elemento basado en el tamaño del contenedor principal de ese elemento. Son una respuesta a una pregunta de larga data por parte de los desarrolladores web que querían la capacidad de responder a cambios dentro de un contenedor individual en la página en lugar de todo el viewport.

```css
.header {
   container: mysite / inline-size;
}

@container mysite (min-width: 600px) {
   .maincard {
	   grid-template-column: 1fr 1fr;
    }
   .item {
       background-color: green;
    }
}
```

Como puedes ver en el código anterior, primero definimos un contenedor cuyos hijos queremos modificar. En nuestro caso, nos gustaría hacer cambios en el elemento con clase item, dentro del contenedor header. Puedes hacer esto dándole al contenedor un nombre (opcional) y tipo.

A continuación, usando la regla @container, verificamos la(s) condición(es) y aplicamos algunos estilos si se cumplen. Para un ancho mínimo de 600px, queremos verde como color de fondo y dos columnas de cuadrícula.

**Consejo**: No defines un contenedor para hacer cambios directamente en ese contenedor, sino en sus hijos. Esto significa que si quisiéramos hacer cambios en el propio contenedor header, tendríamos que anidarlo dentro de otro contenedor: por ejemplo, contenedor A y consultar A para afectar a su hijo – header.

## ¿Cómo se Comparan las Consultas de Medios y las Consultas de Contenedor?

Ahora, con un entendimiento de cómo funcionan ambos, veámoslos en la vida real. El CodePen a continuación muestra cuatro elementos en un diseño. Los dos primeros están estilozados con consultas de contenedor mientras que los dos de abajo están estilozados con consultas de medios. Puedes cambiar el tamaño del viewport para ver cómo responden los elementos.

![mqvscq-demo](https://www.freecodecamp.org/news/content/images/2024/06/mqvscq-demo.png)

Demostración de consultas de medios y contenedor en CodePen: proyecto inspirado por Miriam Suzanne.

Ver el Pen [MQ vs CQ (de MS)][8] por Ophy Boamah ([@ophyboamah][9]) en [CodePen][10].

### Diferencias Clave Entre Consultas de Medios y Consultas de Contenedor

![comparetable](https://www.freecodecamp.org/news/content/images/2024/06/comparetable.png)

Resumen de diferencias principales, explicado en detalle a continuación.

### Basado en el Viewport vs. Basado en el Contenedor

Las consultas de medios aplican estilos basados en el tamaño del viewport (toda la ventana del navegador). Esto significa que el diseño cambia según el tamaño general de la pantalla, lo que lo hace adecuado para ajustar diseños para diferentes dispositivos como teléfonos móviles, tabletas y escritorios.

Las consultas de contenedor, por otro lado, aplican estilos basados en el tamaño del elemento contenedor en el que se encuentran. Esto permite que los componentes individuales adapten su apariencia en función de su propio tamaño en lugar del tamaño del viewport, haciéndolos altamente flexibles y reutilizables en diferentes partes de una página web.



Dado que las consultas de medios dependen del tamaño de la ventana de visualización, pueden ser menos efectivas para crear componentes verdaderamente modulares. Ajustar estilos para una parte de una página puede afectar involuntariamente a otras, especialmente en diseños complejos. Además, pueden no ser suficientes en escenarios donde los componentes necesitan adaptarse de forma independiente dentro de un diseño mayor. Esto puede llevar a un CSS menos mantenible.

En contraste, las consultas de contenedor promueven la modularidad y flexibilidad al permitir definir estilos basados en el tamaño del contenedor. Esto significa que puedes crear componentes auto-contenidos, adaptables y que se pueden reutilizar en varias partes de un sitio web sin cambios inesperados, mejorando su reutilización.

Esto resulta en diseños más adaptativos donde los componentes pueden ajustar su propio diseño y apariencia, lo cual es útil en sistemas de diseño modernos basados en componentes.

### Complejidad y Mantenimiento

En proyectos grandes, gestionar numerosas consultas de medios puede volverse complicado. A medida que crece el número de puntos de interrupción y casos especiales, el CSS puede volverse complejo y más difícil de mantener. Con el tiempo, esto puede llevar a una base de código inflada y difícil de manejar.

Las consultas de contenedor pueden simplificar el mantenimiento del CSS en proyectos grandes. Al mantener estilos específicos de componentes y conscientes del contexto, el CSS permanece más organizado y modular. Esto reduce la complejidad de gestionar puntos de interrupción globales y hace que sea más fácil de mantener, llevando a una base de código más organizada.

## ¿Cuál Deberías Usar y Cuándo?

![finalsection](https://www.freecodecamp.org/news/content/images/2024/06/finalsection.png)

Consulta de medios vs consulta de contenedor (crédito de la imagen: _[web.dev][11]_)

Todo lo que discutimos en las secciones anteriores está destinado a ayudarte a tomar una decisión informada. Habiendo visto cómo estos dos conceptos se comparan y contrastan, considera ahora los siguientes factores:

### Comprensión y Confort

¿Qué tan bien entiendes cada concepto? Las consultas de contenedor son relativamente nuevas, pero si te tomas el tiempo para estudiarlas y experimentar con ellas, al igual que las consultas de medios, la curva de aprendizaje no es intimidante. Así que usa en producción la que entiendas y con la que te sientas más cómodo, para hacer tu vida más fácil.

### Requerimientos del Proyecto y Complejidad

¿Cuál es el enfoque de diseño que estás usando y qué tan complejo es tu proyecto? Porque a veces el enfoque de diseño para tu proyecto determinará cuál de estos se adapta mejor a tus necesidades. Además, cuanto más complejo sea, más difícil será mantener tu código y querrás usar algo que puedas manejar.

### Tendencias Futuras y Colaboración

El futuro del diseño responsivo está viéndose cada vez más intrínseco. Estamos haciendo gradualmente una transición hacia la capacidad de respuesta de los componentes basada en los cambios en su contenido individual, y las consultas de contenedor brillan mejor aquí.

Pero las consultas de medios no parecen ir a ninguna parte por ahora, por lo que puedes usarlas juntas para lograr una perfecta capacidad de respuesta en muchos dispositivos diferentes.

## Conclusión

El potencial de las consultas de contenedor para permitir la creación de componentes reutilizables en CSS es emocionante, pero puede que no estén listas para reemplazar completamente las consultas de medios para hacer que las páginas web sean responsivas todavía.

Por ahora, nuestra mejor opción es usarlas juntas y donde cada una tenga más sentido. Y puedes estar seguro de tomar la decisión correcta experimentando más para internalizar los pros y los contras de cada una.

Aquí hay algunos recursos útiles:

-   [freeCodeCamp sobre Consultas de Medios][12]
-   [Ahmad Shadeed sobre Consultas de Contenedor][13]
-   [Cómo Usar Consultas de Medios y Consultas de Contenedor][14]

[1]: #responsive-and-intrinsic-web-design
[2]: #what-are-media-queries
[3]: #what-are-container-queries
[4]: #how-do-media-queries-and-container-queries-compare
[5]: #which-should-you-use-and-when
[6]: #conclusion
[7]: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design
[8]: https://codepen.io/ophyboamah/pen/YzbaROw
[9]: https://codepen.io/ophyboamah
[10]: https://codepen.io
[11]: http://web.dev/
[12]: https://www.freecodecamp.org/news/learn-css-media-queries-by-building-projects/
[13]: https://ishadeed.com/article/css-container-query-guide/
[14]: https://www.youtube.com/watch?v=2rlWBZ17Wes

