---
title: Media Queries vs Container Queries – Qual Utilizar e Quando?
date: 2024-07-10T15:08:08.936Z
authorURL: ""
originalURL: https://www.freecodecamp.org/news/media-queries-vs-container-queries/
translator: ""
reviewer: ""
---

À medida que a web evolui, novas ferramentas e ideias são lançadas com o objetivo de tornar nossas vidas como desenvolvedores web mais fáceis. Isso significa que temos que escolher se vamos continuar com os métodos antigos ou descartá-los completamente pelos novos recursos brilhantes. Mas isso sempre demanda uma solução de ou-ou?

<!-- more -->

Quando em situações como essas, a abordagem ideal é entender ambos os conceitos – comparar e contrastar suas forças e fraquezas e então decidir suas aplicações mais apropriadas. É exatamente isso que este artigo fará com media queries de CSS e container queries.

## Índice

-   [Design Web Responsivo e Intrínseco][1]
-   [O que são media queries?][2]
-   [O que são container queries?][3]
-   [Comparação na vida real e principais diferenças][4]
-   [Qual você deve usar e quando?][5]
-   [Conclusão][6]

## Design Web Responsivo e Intrínseco

Antes de 2010, os desenvolvedores web podiam criar sites que funcionavam principalmente em desktops. Isso até Ethan Marcotte introduzir o conceito de Web Design Responsivo (RWD). É [definido pelo MDN][7] como _uma forma de projetar para uma web multi-dispositivo_. Isso levou à adoção de media queries como um componente do RWD.

Mas recentemente houve uma mudança para o que Jen Simmons definiu como Design Web Intrínseco – a necessidade de criar componentes sensíveis ao contexto. E container queries estão tornando isso possível.

## O Que São Media Queries?

Media queries são regras para aplicar estilos específicos a um elemento se certas condições forem atendidas. Elas são popularmente usadas para garantir que os sites sejam responsivos em vários dispositivos consultando a largura da janela de visualização (viewport).

Media queries são caracterizadas por uma regra @media seguida por uma condição entre parênteses e uma expressão entre chaves que será aplicada se a condição indicada for atendida. Então, se quisermos mudar a cor de fundo de um div com base na largura da viewport de um dispositivo, é assim que poderíamos fazer:

```css
/* Mobile */
@media (max-width: 480px) {
  .mysite {
    background-color: red;
  }
}
```

No código de exemplo acima, estamos pedindo para o <div> com a classe mysite ter a cor de fundo vermelha se a viewport atingir uma largura máxima de 480px.

**Dica**: Max-width é usado para assumir um design com foco primeiro em desktop e direcionar para menores à medida que descer. Se fosse um design com foco primeiro em mobile, usaríamos min-width para direcionar para telas maiores à medida que subir.

## O Que São Container Queries?

Container queries são regras para aplicar estilos específicos a um elemento com base no tamanho do contêiner pai desse elemento. Elas são uma resposta a uma pergunta antiga dos desenvolvedores web que queriam a capacidade de responder a mudanças dentro de um contêiner individual na página em vez de toda a viewport.

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

Como você pode ver no código acima, primeiro definimos um contêiner cujos filhos queremos mudar. No nosso caso, gostaríamos de fazer alterações no elemento com a classe item, dentro do contêiner header. Você pode fazer isso dando ao contêiner um nome (opcional) e tipo.

Em seguida, usando a regra @container, verificamos a(s) condição(ões) e aplicamos alguns estilos se forem atendidos. Para uma largura mínima de 600px, queremos verde como a cor de fundo e duas colunas de grade.

**Dica**: Você não define um contêiner para fazer mudanças diretamente nesse contêiner – mas em seus filhos. Isso significa que se quisermos fazer alterações no próprio contêiner header, teríamos que aninhá-lo dentro de outro contêiner: por exemplo, o contêiner A e a query A para afetar seu filho – header.

## Como Media Queries e Container Queries se Comparam?

Agora, com um entendimento de como ambas funcionam, vamos vê-las na vida real. O CodePen abaixo mostra quatro elementos em um layout. Os dois primeiros são estilizados com container queries enquanto os dois de baixo são estilizados com media queries. Você pode redimensionar a viewport para ver como os elementos respondem.

![mqvscq-demo](https://www.freecodecamp.org/news/content/images/2024/06/mqvscq-demo.png)

Demonstração de media e container queries no CodePen: projeto inspirado por Miriam Suzanne.

Veja o Pen [MQ vs CQ (from MS)][8] por Ophy Boamah ([@ophyboamah][9]) no [CodePen][10].

### Principais Diferenças Entre Media Queries e Container Queries

![comparetable](https://www.freecodecamp.org/news/content/images/2024/06/comparetable.png)

Resumo das principais diferenças, explicadas em detalhes abaixo

### Baseadas na Viewport vs. Baseadas no Contêiner

Media queries aplicam estilos com base no tamanho da viewport (a janela inteira do navegador). Isso significa que o layout muda de acordo com o tamanho geral da tela, tornando-o adequado para ajustar designs para diferentes dispositivos como telefones móveis, tablets e desktops.

Container queries, por outro lado, aplicam estilos com base no tamanho do elemento contêiner em que estão colocadas. Isso permite que componentes individuais adaptem sua aparência com base no seu próprio tamanho em vez do tamanho da viewport, tornando-os altamente flexíveis e reutilizáveis em diferentes partes de uma página web.

Como as media queries dependem do tamanho da viewport, elas podem ser menos eficazes para criar componentes verdadeiramente modulares. Ajustar estilos para uma parte da página pode afetar outras involuntariamente, especialmente em layouts complexos. Além disso, elas podem não ser suficientes em cenários onde os componentes precisam se adaptar independentemente dentro de um layout maior. Isso pode levar a um CSS menos fácil de manter.

Por outro lado, as container queries promovem modularidade e flexibilidade, permitindo que os estilos sejam definidos com base no tamanho do contêiner. Isso significa que você pode criar componentes que são autossuficientes, adaptáveis e reutilizáveis em várias partes de um site sem alterações inesperadas, aumentando sua reutilização.

Isso resulta em designs mais adaptáveis, onde os componentes podem ajustar seu próprio layout e aparência, o que é útil em sistemas de design modernos baseados em componentes.

### Complexidade e Manutenção

Em grandes projetos, gerenciar inúmeras media queries pode se tornar complicado. Conforme o número de breakpoints e casos especiais cresce, o CSS pode se tornar complexo e mais difícil de manter. Com o tempo, isso pode levar a uma base de código inchada e difícil de gerenciar.

As container queries podem simplificar a manutenção do CSS em grandes projetos. Mantendo os estilos específicos do componente e conscientes do contexto, o CSS permanece mais organizado e modular. Isso reduz a complexidade de gerenciar breakpoints globais e facilita a manutenção, levando a uma base de código mais organizada.

## Qual Você Deve Usar e Quando?

![finalsection](https://www.freecodecamp.org/news/content/images/2024/06/finalsection.png)

Media query vs container query (crédito da imagem: _[web.dev][11]_)

Tudo o que discutimos nas seções anteriores é para ajudá-lo a tomar uma decisão informada. Tendo visto como esses dois conceitos se comparam e contrastam, agora considere os seguintes fatores:

### Compreensão e Conforto

Quão bem você entende cada conceito? As container queries são relativamente novas, mas se você gastar tempo estudando e experimentando com elas, assim como fez com as media queries, a curva de aprendizado não é intimidante. Portanto, use em produção aquilo que você entende e com o qual se sente mais confortável, para facilitar sua vida.

### Requisitos do Projeto e Complexidade

Qual é a abordagem de design que você está usando e quão complexo é o seu projeto? Porque às vezes a abordagem de design para seu projeto determinará qual dessas opções melhor atende às suas necessidades. Além disso, quanto mais complexo, mais difícil será manter seu código, e você quererá usar algo que consiga gerenciar.

### Tendências Futuras e Colaboração

O futuro do design responsivo está se tornando cada vez mais intrínseco. Estamos gradualmente fazendo uma mudança para a responsividade dos componentes com base nas mudanças no seu conteúdo individual, e as container queries brilham melhor aqui.

Mas as media queries não parecem estar indo a lugar nenhum tão cedo, então você pode usá-las juntas para alcançar a responsividade perfeita em muitos dispositivos diferentes.

## Conclusão

O potencial das container queries para permitir a criação de componentes reutilizáveis em CSS é empolgante – mas pode ainda não estar pronto para substituir completamente as media queries para tornar páginas da web responsivas.

Por enquanto, nossa melhor aposta é usá-las juntas, e onde cada uma faz mais sentido. E você pode ter certeza de fazer a escolha certa experimentando mais para internalizar os prós e contras de cada uma.

Aqui estão alguns recursos úteis:

-   [freeCodeCamp sobre Media Queries][12]
-   [Ahmad Shadeed sobre Container Queries][13]
-   [Como Usar Media Queries e Container Queries][14]

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

