---
title: Aprenda os Fundamentos do Git – Um Guia para Tarefas de Desenvolvimento no Dia-a-Dia
date: 2024-07-10T14:00:43.749Z
authorURL: ""
originalURL: https://www.freecodecamp.org/news/learn-git-basics/
translator: ""
reviewer: ""
---

Bem-vindo ao meu guia abrangente sobre Git, o sistema de controle de versão distribuído que revolucionou a colaboração e a gestão de código no desenvolvimento de software.

<!-- more -->

Seja você um desenvolvedor experiente ou esteja iniciando sua jornada na programação, entender o Git é essencial para obter controle adequado sobre seu código, gerenciando eficientemente seus projetos e colaborando com outros.

Neste tutorial, vou guiá-lo pelos fundamentos do Git, cobrindo desde seu fluxo de trabalho básico até estratégias avançadas de ramificação e técnicas de rebase.

Ao final deste guia, você terá uma compreensão sólida dos conceitos principais do Git e estará confiante e bem equipado com as habilidades para usá-lo efetivamente em seu fluxo de trabalho de desenvolvimento.

## Requisitos:

Tudo o que você precisa trazer para a mesa é uma mente curiosa e disposta a aprender. Este guia foi elaborado com os iniciantes em mente, portanto, nenhum conhecimento prévio de sistemas de controle de versão ou programação é necessário. Seja você um completo novato ou tenha alguma experiência com codificação, encontrará este tutorial acessível e fácil de seguir.

## **Índice:**

1.  [O que é Git?][1]  
    – [Diferença para outros sistemas de controle de versão][2]  
    – [Os Três Estados e o Fluxo de Trabalho Básico do Git][3]
2.  [Configuração Inicial do Git][4]
3.  [Obter Ajuda no Git][5]
4.  [Como Obter um Repositório Git][6]  
    – [Inicializar um Repositório em um Diretório Existente][7]  
    – [Clonar um Repositório Existente no Git][8]
5.  [Como Gravar Alterações no Repositório][9]
6.  [Ver Histórico de Commits no Git][10]
7.  [Desfazer Coisas no Git][11]
8.  [Repositórios Remotos no Git][12]
9.  [Marcação no Git][13]
10.  [Aliases no Git][14]
11.  [Ramificação no Git][15]  
    – [Criar um Novo Branch no Git][16]  
    – [Entendendo os Branches][17]  
    – [Mudar para Outro Branch no Git][18]  
    – [Visualizar Branches no Git][19]
12.  [Como Gerenciar Branches no Git][20]  
    – [Gerenciando Branches Mesclados][21]  
    – [Renomeando Branches][22]  
    – [Mudando o Nome do Branch Padrão][23]
13.  [Fluxo de Trabalho de Ramificação][24]
14.  [Rebase no Git][25]
15.  [Conclusão][26]

## O que é Git?

Git é um sistema de controle de versão distribuído que ajuda você e sua equipe a colaborar efetivamente enquanto mantém o histórico do seu projeto seguro. É como ter uma máquina do tempo para o seu código!

### O que torna o Git diferente de outros Sistemas de Controle de Versão?

#### Diferença Conceitual:

A grande diferença que distingue o Git de outras ferramentas é como ele pensa sobre dados. Em vez de armazenar alterações nos arquivos, o Git pensa em seus dados como uma série de snapshots do seu projeto, ou seja, toda vez que você faz uma alteração e a salva (commit), o Git tira um snapshot de todos os seus arquivos naquele momento. Se um arquivo não mudou, o Git apenas mantém um link para o arquivo idêntico anterior.

#### Operações Locais:

Com o Git, a maioria das coisas que você faz não precisa de conexão com um servidor. Como você tem todo o histórico do projeto no seu computador, as operações são super rápidas. Você pode navegar no histórico do projeto ou ver as alterações entre versões sem esperar por um servidor.

#### Integridade dos Dados:

O Git garante que nada se perca ou seja corrompido. Cada arquivo e diretório é checksummed, e o Git sabe se algo muda.

O Git usa um hash SHA-1, um código único para cada versão de um arquivo. Se quaisquer alterações forem feitas no conteúdo, mesmo um único caractere, resultará em um hash SHA-1 diferente.

#### Modelo de Apenas Acrescentar:

No Git, quase tudo adiciona dados ao projeto, tornando difícil perder informações acidentalmente. Uma vez que você comita alterações, elas são armazenadas com segurança. Experimentar é menos arriscado com o Git.

### Os Três Estados e o Fluxo de Trabalho Básico do Git

Entender os três estados do Git—modificado, preparado e comitado—é essencial para um controle de versão eficaz:

-   **Modificado**: Alterações feitas nos arquivos em sua **árvore de trabalho** que ainda não foram comitadas.
-   **Preparado**: Modificações marcadas para o próximo commit na **área de preparação** para serem incluídas no próximo commit.
-   **Comitado**: Alterações armazenadas permanentemente no **diretório Git** local.

**Fluxo de Trabalho Básico do Git**:

1.  **Modifique os arquivos** em sua árvore de trabalho.
2.  **Prepare as alterações** que você quer incluir no próximo commit.
3.  **Comite as alterações**, que salva permanentemente os snapshots no diretório Git.

## Configuração Inicial do Git

Configurar o Git pela primeira vez envolve personalizar seu ambiente Git para atender às suas preferências. Mas primeiro, você precisará baixar o Git de [Git - Downloads][27] ou usar o pacote Chocolatey. Então, basta seguir as instruções de instalação e você estará pronto para ir.

### Configuração do Git

Usamos a ferramenta `git config` para personalizar nosso ambiente Git. Esta ferramenta nos permite tanto recuperar quanto definir variáveis de configuração que determinam como o Git opera. Essas variáveis podem ser armazenadas em três locais diferentes:

1.  **Configuração do Sistema:**  
    Armazenada no arquivo `/etc/gitconfig`, essas configurações se aplicam a todos os usuários no sistema e todos os repositórios. Podemos interagir com este arquivo usando a opção `--system` com `git config`.
2.  **Configuração Específica do Usuário:**  
    Armazenada em `~/.gitconfig` ou `~/.config/git/config`, esses valores são específicos para você como usuário. Podemos interagir com este arquivo usando a opção `--global` com `git config`, afetando todos os repositórios com os quais você trabalha no seu sistema.
3.  **Configuração Específica do Repositório:**  
    Armazenada no arquivo `.git/config` dentro de um repositório específico, essas configurações substituem as configurações globais e se aplicam apenas a esse repositório.



Para visualizar todas as configurações e suas origens:

```bash
$ git config --list --show-origin
```

#### Como Configurar sua Identidade no Git:

A identidade no Git é usada para atribuir commits corretamente. Vamos configurar seu nome de usuário e endereço de email.

```bash
$ git config --global user.name "Seu Nome"
$ git config --global user.email "seu.email@exemplo.com"
```

Se você precisar sobrepor isso para projetos específicos, pode omitir a opção `--global` ao definir os valores, e eles serão aplicados apenas a esse repositório específico.

#### Como Configurar Seu Editor de Texto Padrão

Depois de configurar sua identidade, é importante definir seu editor de texto padrão no Git. Este editor de texto será usado quando o Git precisar que você insira mensagens, como ao escrever mensagens de commit ou resolver conflitos de mesclagem.

Por padrão, o Git usa o editor de texto padrão do seu sistema. No entanto, se você preferir usar um editor de texto diferente, como o Emacs, pode configurá-lo assim:

```bash
$ git config --global core.editor "emacs"
```

Em sistemas Windows, configurar um editor de texto diferente requer especificar o caminho completo para seu arquivo executável. Por exemplo, se você quiser usar o Notepad++, pode usar um comando como este:

```bash
$ git config --global core.editor "'C:/Program Files/Notepad++/notepad++.exe' -multiInst -notabbar -nosession -noPlugin"
```

Certifique-se de fornecer o caminho correto para o arquivo executável do seu editor de texto.

A propósito, estas – `"-multiInst -notabbar -nosession -noPlugin"` – são opções usadas para personalizar o comportamento do Notepad++ quando ele é iniciado pelo Git.

#### Como Alterar o Nome do Branch Padrão no Git (opcional):

Por padrão, ao inicializar um novo repositório com `git init`, o Git cria um branch chamado `master`. Mas a partir da versão 2.28 do Git, você tem a opção de definir um nome diferente para o branch inicial.

```bash
$ git config --global init.defaultBranch main
```

altera o nome do branch padrão para 'main' globalmente.

#### Como Verificar a Configuração no Git:

Você pode visualizar sua configuração no Git usando:

```bash
$ git config --list
$ git config user.name  # Para verificar uma configuração específica (por exemplo, nome do usuário):
```

O comando `git config --list` lista todas as configurações que o Git pode encontrar naquele momento.

## Como Obter Ajuda no Git

Existem três maneiras equivalentes de obter ajuda detalhada para qualquer comando Git:

1.  Comando de Ajuda do Git: `$ git help <verbo>`
2.  Usando a Opção `--help`: `$ git <verbo> --help`
3.  Páginas de manual (manpages): `$ man git-<verbo>`

Substitua o `<verbo>` pelo comando para o qual você precisa de ajuda. Por exemplo, para obter ajuda para o comando `config`, você pode digitar:

```bash
$ git help config
ou
$ man git-config
```

Esses comandos também funcionam offline, o que é útil.

Se você precisar de informações rápidas e concisas sobre as opções disponíveis para um comando Git, pode usar a opção `-h`:

```bash
$ git add -h    # Isso exibirá as opções disponíveis para o comando add
```

## Como Obter um Repositório Git

Para começar a usar o Git, você normalmente obtém um repositório Git. Existem essencialmente duas maneiras principais de começar:

### 1\. Como Inicializar um Repositório em um Diretório Existente no Git

Abra um terminal ou prompt de comando. Use o comando `cd` para alterar o diretório para a localização do seu projeto: `cd /caminho/para/seu/projeto`.

Uma vez no diretório do seu projeto, inicialize um repositório Git executando:

```bash
$ git init
```

Este comando cria um novo subdiretório chamado `.git` onde o Git armazena todos os arquivos necessários para seu repositório Git. Nesse ponto, nenhum dos seus arquivos de projeto está sendo rastreado ainda.

Agora, suponha que você tenha certos arquivos que deseja que o Git comece a rastrear:

```bash
$ git add *.py        # Adiciona todos os arquivos Python
$ git add README.md   # Adiciona o arquivo README
$ git commit -m 'Commit inicial'
```

`git add` adiciona arquivos à área de staging, indicando que você deseja incluí-los no próximo commit e, em seguida, faz o commit das alterações. O sinalizador `-m` permite que você adicione uma mensagem descritiva ao commit.

### 2\. Como Clonar um Repositório Existente no Git:

A segunda maneira de obter um repositório Git é clonando um repositório existente. Isso é útil quando você deseja trabalhar em um projeto que já existe em outro lugar (por exemplo, um projeto ao qual você gostaria de contribuir).

**Nota:** Quando você clona um repositório, o Git recupera uma cópia completa de quase todos os dados que o servidor possui. Isso inclui todas as versões de todos os arquivos no histórico do projeto. Isso significa que você terá uma cópia completa do histórico do repositório na sua máquina local.

Para clonar um repositório, use o comando `git clone` seguido da URL do repositório que deseja clonar. Por exemplo, para clonar o repositório grok-1, você pode usar:

```bash
$ git clone https://github.com/xai-org/grok-1.git
```

Isso cria um diretório chamado grok-1, inicializa um diretório `.git` dentro dele e baixa todos os dados para esse repositório.

Ainda sobre isso, `.git` é apenas uma convenção para indicar que o URL aponta para um repositório Git. Você pode usá-la ou não, não faz diferença.

Se você quiser clonar em um diretório com um nome diferente, pode especificá-lo. Para clonar o repositório grok-1 em um diretório chamado "chatgpt" em vez de "grok-1", faça o seguinte:

Os arquivos markdown fornecem vários protocolos de transferência que você pode usar para clonar repositórios. O exemplo acima usa o protocolo `https://`, mas você também pode ver `git://` ou `user@server:path/to/repo.git`, que utiliza o protocolo de transferência SSH.

## Como Registrar Alterações no Repositório

Agora que você configurou um repositório Git, frequentemente precisará fazer mudanças e registrar essas alterações no seu repositório. O processo envolve rastrear arquivos, preparar mudanças e realizar commits dos snapshots. Vamos explorar os passos envolvidos:

![ciclo de vida](https://www.freecodecamp.org/news/content/images/2024/03/lifecycle.png)

Crédito da imagem - https://git-scm.com/

### 1\. Como Verificar o Status dos Seus Arquivos no Git:

Ao trabalhar com um repositório Git, é crucial entender o status dos seus arquivos.

O Git categoriza arquivos em dois tipos: rastreados e não rastreados. Arquivos rastreados são aqueles que o Git reconhece, seja porque eles faziam parte do último snapshot (commit) ou foram preparados para commit. Arquivos não rastreados são todo o resto—arquivos que o Git não está monitorando atualmente. Para verificar o status do seu repositório:

```bash
$ git status
```

Esse comando fornece informações abrangentes sobre o branch atual, seu status de sincronização e o status dos seus arquivos.

O `git status` também sugere ações que você pode tomar. Por exemplo, quando arquivos são modificados mas não preparados para commit, o `git status` sugere usar `git add <file>` para prepará-los. Também sugere usar `git checkout -- <file>` para descartar mudanças no diretório de trabalho. Essas sugestões agilizam seu fluxo de trabalho ao fornecer acesso rápido a comandos Git relevantes.

Além disso, `git status` oferece um modo de Status Curto (`git status -s`), que apresenta uma visão mais concisa das suas mudanças usando símbolos como M (modificado), A (adicionado) e ?? (não rastreado) para representar o status dos arquivos.

### 2\. Como Rastrear Novos Arquivos no Git

Quando você cria um novo arquivo no seu projeto, o Git inicialmente considera-o não rastreado. Para começar a rastrear um novo arquivo, é necessário adicioná-lo à área de stage usando o comando `git add`.

Por exemplo, vamos criar um novo arquivo chamado `index.html` para nosso projeto e adicioná-lo à área de stage:

```bash
$ touch index.html
$ git add index.html
```

Após adicionar, executar `git status` novamente mostrará que o arquivo `index.html` agora é rastreado e preparado para commit.

### 3\. Como Preparar Arquivos Modificados no Git

Se você modificar um arquivo rastreado existente, precisará preparar as mudanças usando `git add`. Vamos supor que modificamos um arquivo existente chamado `styles.css`

```bash
$ vim styles.css
```

Após fazer as mudanças, prepare o arquivo:

```bash
$ git add styles.css
```

Agora, quando verificar o status, verá tanto o arquivo modificado quanto o novo arquivo preparados para commit.

### 4\. Como Ignorar Arquivos no Git

Muitas vezes, há arquivos ou diretórios dentro de um projeto que não são destinados ao rastreamento pelo Git. Estes podem incluir arquivos de log, artefatos de build, ou informações sensíveis como configurações de ambiente local (como \*.env ou config.json). Você pode especificar esses arquivos a serem ignorados usando um arquivo `.gitignore`.

Crie um arquivo `.gitignore`:

```bash
$ nano .gitignore
```

Liste os padrões de arquivos ou diretórios que você deseja ignorar:

```bash
$ echo '*.log' >> .gitignore
$ echo 'build/' >> .gitignore
```

Aqui, estamos dizendo ao Git para ignorar todos os arquivos com a extensão `.log` e o diretório `build/`.

**Nota:** Arquivos já rastreados pelo Git antes de serem adicionados ao arquivo `.gitignore` continuarão sendo rastreados. Para removê-los, você precisará removê-los manualmente usando comandos do Git.

Aqui estão alguns padrões que você pode usar para trabalhar de forma mais eficaz no Git.

- **Apontar arquivos ou extensões de arquivo individuais com precisão:** Por exemplo, `test.txt` ignora apenas aquele arquivo específico, enquanto `*.log` ignora todos os arquivos que terminam com `.log`.
- **Wildcards para correspondências mais amplas:** O wildcard asterisco (`*`) corresponde a qualquer número de caracteres. Por exemplo, `*.doc` ignora todos os arquivos com a extensão `.doc`, independentemente do nome.

### 5\. Como Ver Mudanças no Git:

Se você quiser ver as mudanças exatas que fez aos seus arquivos antes de commitar, pode usar o comando `git diff`.

Para ver mudanças não preparadas:

```bash
$ git diff 
```

E para ver mudanças preparadas:

```bash
$ git diff --cached README.md
```

`git diff` fornece uma visão detalhada das modificações reais. Use `git diff <filename>` para focar nas alterações dentro de um arquivo específico.

### 6\. Como Committar Mudanças:

Quando estiver pronto para commitar suas mudanças, use o comando `git commit`. Isso abrirá seu editor de texto para você fornecer uma mensagem de commit. Alternativamente, você pode usar a flag `-m` para adicionar uma mensagem de commit diretamente:

Uma vez que você tenha preparado as mudanças que deseja incluir no commit, pode commitar usando `git commit`

```bash
$ git commit -m "Sua mensagem de commit aqui"
```

### 7\. Como Remover Arquivos no Git:

Se precisar remover um arquivo do rastreamento do Git, você pode usar `git rm`. Ele remove o arquivo tanto do repositório quanto do diretório de trabalho. Suponha que você queira remover um arquivo chamado `temp.txt`:

```bash
$ git rm temp.txt
```

Se você desejar apenas removê-lo do repositório mas mantê-lo no diretório de trabalho, use a opção `--cached`:

---


### 8. Como Mover (ou Renomear) Arquivos no Git:

O Git não rastreia explicitamente o movimento de arquivos. Mas você pode usar `git mv` para renomear ou mover arquivos dentro do seu repositório. Por exemplo, para renomear `old_file.txt` para `new_file.txt`:

```bash
$ git mv old_file.txt new_file.txt
```

Este comando irá preparar a renomeação, e ela será refletida no próximo commit.

Isso é equivalente a mover manualmente o arquivo, seguido pelo uso de `git rm` para remover o arquivo antigo, e então `git add` para adicionar o novo arquivo. `git mv` basicamente consolida essas etapas em um único comando.

Esses comandos formam o fluxo de trabalho básico para fazer alterações, prepará-las e comitá-las no seu repositório Git.

## Como Visualizar o Histórico de Commits no Git

Após criar múltiplos commits ou clonar um repositório, o comando `git log` permite que você examine o histórico de commits.

Por padrão, ele lista os commits em ordem cronológica inversa, exibindo cada commit com seu checksum SHA-1, nome e e-mail do autor, data e mensagem do commit.  
Agora, vamos ver como podemos aprimorar esta saída:

### Como Visualizar Diferenças de Commits no Git:

Para visualizar a diferença introduzida em cada commit, você pode usar a opção `-p` ou `--patch`:

```bash
$ git log -p -2    # -2 é usado para visualizar as diferenças introduzidas em cada um dos últimos dois commits
```

### Como Exibir Estatísticas no Git:

A opção `--stat` fornece estatísticas resumidas para cada commit, incluindo os arquivos modificados, linhas adicionadas/excluídas e um resumo.

```bash
$ git log --stat
```

### Como Personalizar o Formato de Saída do Git Log:

A opção `--pretty` permite alterar o formato de saída do log. Várias opções estão disponíveis para diferentes formatos:

-   `oneline`: Resumo conciso e em uma única linha para cada commit.
-   `short`: Formato padrão com autor, data e mensagem.
-   `full`: Formato detalhado com hash do commit, autor, data, mensagem e diff.
-   `fuller`: Formato mais detalhado, incluindo caminhos completos dos arquivos.
-   `format`: Personalize a saída usando especificadores de formato.

```bash
$ git log --pretty=oneline
```

**Especificadores de formato úteis para** `--pretty=format`:

-   `%h:` Hash abreviado do commit
-   `%an:` Nome do autor
-   `%ae:` E-mail do autor
-   `%ad:` Data do autor
-   `%s:` Assunto (mensagem do commit)

```bash
$ git log --pretty=format:"%h %an %ad %s"
```

**Gráfico ASCII**:

Usando `--graph`, você também pode visualizar o histórico de branches e merges.

```bash
$ git log --pretty=format:"%h %s" --graph
```

### Como Limitar a Saída do Git Log:

Além das opções de formatação, `git log` oferece várias opções de limitação para refinar o histórico de commits exibidos.

-   `-<n>:` Mostra apenas os últimos n commits.
-   `--since, --until:` Limita os commits àqueles feitos após/antes da data especificada.
-   `--author:` Mostra commits apenas de um autor específico.
-   `--grep:` Filtra commits por uma palavra-chave nas mensagens de commit.
-   `-S:` Mostra commits que alteraram

**Exemplo de Uso:** Visualizar os últimos 3 commits do autor Abbey desde uma certa data, com detalhes do patch:

```bash
$ git log --author="Abbey" --since="2024-01-01" -p -3
```

## Como Desfazer Coisas no Git

Desfazer alterações é uma necessidade comum no Git, e várias opções estão disponíveis para esse propósito.

### Como Desfazer um Commit no Git

Se você comitou muito cedo ou precisa fazer alterações adicionais no último commit, use este comando:

```bash
$ git commit --amend
```

Isso abrirá o editor de mensagens de commit permitindo que você modifique a mensagem. Se nenhuma alteração foi feita desde o último commit, ele simplesmente permitirá que você edite a mensagem do commit.

**Nota**: Apenas emende commits que ainda estão locais e não foram enviados ainda para evitar problemas para colaboradores.

### Como Desestagiar um Arquivo Estagiado com `git reset`

Para desestagiar um arquivo que foi incluído acidentalmente, você pode usar o comando `git reset HEAD <file>`. Por exemplo:

```bash
$ git reset HEAD CONTRIBUTING.md 
```

O arquivo é desestagiado, permitindo que você faça mais alterações sem comitar as não intencionadas.

### Como Desmodificar um Arquivo Modificado com `git checkout`

Suponha que você fez algumas modificações em arquivos que posteriormente percebeu que não quer manter. Use `git checkout -- <file>` para descartar as alterações feitas em um arquivo e revertê-lo ao seu estado anterior.

```bash
$ git checkout -- CONTRIBUTING.md
```

Isso substituirá o arquivo modificado pela última versão estagiada ou comitada.

### Desfazendo Coisas com `git restore`

Vamos explorar as alternativas introduzidas pela versão 2.23.0 do Git, `git restore`, que serve como uma alternativa ao `git reset` para muitas operações de desfazer.

#### Como desestagiar um arquivo estagiado com `git restore`

Se você acidentalmente estagiar um arquivo que não pretendia comitar, você pode usar `git restore --staged <file>` para desestagiá-lo.

```bash
$ git restore --staged CONTRIBUTING.md   
```

O arquivo é desestagiado, semelhante ao `git reset HEAD <file>`, permitindo que você faça mais alterações sem comitar as não intencionadas.

#### Como desmodificar um arquivo modificado com `git restore`

Para descartar alterações feitas em um arquivo no diretório de trabalho, use `git restore <file>`:

```bash
$ git restore CONTRIBUTING.md
```

Semelhante ao `git checkout -- <file>`, este comando descarta as alterações feitas no arquivo especificado, revertendo-o ao estado em que estava na última commit.

**Alternativas:** Guardar temporariamente e ramificar são métodos alternativos para colocar mudanças de lado temporariamente sem descartá-las totalmente. Esses métodos são mais seguros se você não tiver certeza sobre descartar mudanças.

## Como Trabalhar com Remotos no Git

Repositórios remotos são versões do seu projeto hospedadas na internet ou em uma rede. Colaborar com outras pessoas envolve gerenciar esses repositórios remotos, incluindo adicionar, remover e inspecioná-los. Vamos aprender como gerenciá-los de maneira eficaz.

### Como Mostrar Seus Remotos no Git

Para começar, vamos ver quais servidores remotos estão configurados para o nosso projeto usando:

```bash
$ git remote
```

Este comando lista os apelidos de todos os manipuladores remotos que especificamos. Por exemplo, se clonamos um repositório, geralmente veremos `origin`, o nome padrão que o Git atribui ao servidor de onde clonamos.

Adicionar a opção `-v` fornece detalhes adicionais, como as URLs associadas a cada remoto.

```bash
$ git remote -v
```

Isso exibe tanto as URLs de busca quanto de envio para cada remoto, permitindo-nos entender onde nosso projeto está hospedado e como interagimos com ele.

### Como Adicionar Repositórios Remotos no Git

Para adicionar explicitamente um novo repositório remoto, use `git remote add <apelido> <url>`:

```bash
$ git remote add exemplo https://github.com/exemplo/exemplo.git
```

Aqui, adicionamos um remoto chamado `exemplo` com a URL especificada. Isso nos permite referenciar esse repositório remoto usando o apelido `exemplo` em nossos comandos.

### Como Buscar e Puxar de Remotos no Git

Para buscar dados de um repositório remoto, usamos o comando `git fetch` seguido pelo nome do remoto:

```bash
$ git fetch origin // Aqui não estamos especificando nenhum branche específico.
```

Isso baixa quaisquer novas mudanças do repositório remoto `origin` para nosso repositório local, permitindo-nos manter-nos atualizados com os últimos desenvolvimentos.

Alternativamente, se quisermos buscar e mesclar mudanças de um ramo remoto em nosso ramo atual em uma única etapa, usamos o comando `git pull`:

```bash
$ git pull origin master
```

Aqui, estamos especificamente puxando mudanças do ramo `master` do repositório remoto `origin` para nosso ramo atual.

### Como Enviar Mudanças para Remotos no Git

Para compartilhar nosso trabalho com outros, enviamos nossas mudanças para um repositório remoto usando:

```bash
$ git push origin main
```

Neste exemplo, estamos enviando nossas mudanças locais para o ramo `main` do repositório remoto `origin`.

### Como Inspecionar um Remoto no Git

Por fim, podemos inspecionar um repositório remoto para obter mais informações sobre ele, usando:

```bash
$ git remote show origin
```

Este comando exibe detalhes como as URLs de busca e envio, os ramos rastreados e as configurações do ramo local associadas ao repositório remoto `origin`.

### Como Renomear Remotos no Git

Agora, suponha que queremos renomear o apelido de um remoto de `exemplo` para `novo-exemplo`:

```bash
$ git remote rename exemplo novo-exemplo
```

### Como Remover Remotos no Git

Se, por algum motivo, não precisamos mais de um repositório remoto e queremos removê-lo do nosso projeto:

```bash
$ git remote remove novo-exemplo
ou
$ git remote rm novo-exemplo
```

Após a remoção, os ramos de rastreamento remoto e as configurações de configuração associadas também são excluídos.

## Marcando no Git

Marcar no Git é um recurso fundamental que permite aos desenvolvedores marcar pontos específicos na história de um repositório como significativos. Tipicamente, as marcas são usadas para denotar pontos de lançamento, como v1.0, v2.0, e assim por diante.

### Como Listar Marcas Existentes no Git

Imagine que você está trabalhando em um projeto com múltiplas versões de lançamento. Para listar as marcas existentes:

```bash
$ git tag
```

Além disso, você pode buscar marcas que correspondam a um padrão específico usando a opção `-l` ou `--list`. Por exemplo:

```bash
$ git tag -l "v2.0*"
```

Este comando listará marcas como `v2.0`, `v2.0-beta`, e assim por diante, correspondendo ao padrão especificado.

### Como Criar Marcas no Git

O Git suporta dois tipos de marcas: leves e anotadas.

#### Marcas Leves

Use marcas leves quando quiser marcar um commit específico sem adicionar nenhuma informação adicional. Exemplo:

```bash
$ git tag v1.1-lw
```

Para visualizar as informações do commit associadas a esta marca, use:

```bash
$ git show v1.1-lw
```

As marcas leves exibem apenas o checksum do commit.

#### Marcas Anotadas

As marcas anotadas, por outro lado, contêm informações adicionais, como informações do marcador, data e uma mensagem de marcação.

Criar uma marca anotada envolve usar a opção `-a` com o comando `git tag`, junto com uma mensagem de marcação. Exemplo:

```bash
$ git tag -a v2.0 -m "Versão de lançamento 2.0"
```

Para visualizar informações detalhadas sobre esta marca, incluindo o commit ao qual aponta e a mensagem de marcação, use:

```bash
$ git show v2.0
```

### Como Marcar um Commit Antigo no Git

Às vezes, você pode esquecer de marcar um commit específico. Não se preocupe, você pode marcá-lo mais tarde especificando o checksum do commit.

Exemplo: suponha que você esqueceu de marcar um commit com ID `abcdefg`. Você pode marcá-lo da seguinte maneira:

```bash
$ git tag -a v1.2 abcdefg
```

Este comando marca o commit especificado como `v1.2`.

#### Como Enviar uma Marca para um Repositório Remoto no Git

Para enviar uma marca específica para um servidor remoto, você pode usar:

(continua...)

Se você tiver várias tags e quiser empurrá-las todas de uma vez, você pode usar a opção `--tags`:

```bash
$ git push origin --tags
```

#### Como Deletar Tags no Git

Para deletar uma tag localmente (removendo do repositório local):

```bash
$ git tag -d <tagname>
```

Por exemplo, para deletar uma tag leve chamada `v1.4-lw`:

```bash
$ git tag -d v1.4-lw
```

Por outro lado, você pode deletar uma tag de um servidor remoto de duas maneiras:

1.  Usando o comando `git push` com um refspec:

```bash
$ git push origin :refs/tags/v1.1-lw
```

Este comando não empurra nada (`:`) para a tag remota `v1.1-lw`, efetivamente deletando-a.

2.  Usando a opção `--delete` com `git push`:

```bash
$ git push origin --delete v1.1-lw
```

Este diretamente deleta a tag `v1.1-lw` do servidor remoto.

#### Como Fazer Checkout de Tags no Git

Para visualizar o estado dos arquivos em uma tag específica, você pode fazer checkout daquela tag:

```bash
$ git checkout v2.0
```

Este comando coloca seu repositório em um estado de "cabeça destacada" (detached HEAD), onde você pode visualizar arquivos, mas não pode fazer alterações diretamente.

Se você precisar trabalhar nos arquivos daquela tag, é melhor criar um novo ramo:

```bash
$ git checkout -b v2.0-branch v2.0
```

Agora você pode fazer alterações e commits sem alterar a tag original.

## Aliases do Git

Aliases do Git são atalhos ou comandos personalizados que você pode criar para simplificar e agilizar seu fluxo de trabalho no Git.

Para criar um alias no Git, você usa o comando `git config` com a flag `--global` para fazer o alias disponível em todos os seus repositórios Git.

### Aliases Básicos para Comandos Comuns

Você pode criar aliases para comandos Git usados frequentemente para torná-los mais fáceis de lembrar e digitar. Por exemplo:

```bash
$ git config --global alias.co checkout
$ git config --global alias.br branch
$ git config --global alias.ci commit
```

Agora, em vez de digitar os comandos completos, você pode usar atalhos mais curtos como `git co`, `git br`, e `git ci` respectivamente.

Você também pode **criar aliases personalizados para ações que você realiza frequentemente** ou para melhorar a legibilidade dos comandos. Exemplo:

```bash
$ git config --global alias.unstage 'reset HEAD --'
```

Agora, você pode usar `git unstage <file>` em vez de `git reset HEAD -- <file>` para desfazer a marcação de um arquivo.

#### Como Combinar Vários Comandos no Git

Aliases também podem ser usados para combinar vários comandos Git em um único alias. Por exemplo, vamos criar um alias para marcar todas as alterações e depois commitar com um único comando:

```bash
$ git config --global alias.commitall '!git add -A && git commit'
```

Agora, executando `git commitall` irá marcar todas as alterações (`git add -A`) e então cometer elas, economizando tempo e toques no teclado.

## Ramificação no Git

Ramos no Git fornecem uma maneira poderosa de gerenciar o código do seu projeto, permitindo desenvolvimento paralelo e experimentação sem afetar a base de código principal.

A ramificação no Git permite que você se desvie da linha principal de desenvolvimento, trabalhe em funcionalidades ou correções, e depois faça o merge de suas alterações de volta. Ao contrário de muitos outros sistemas de controle de versão, o modelo de ramificação do Git é leve e eficiente, tornando as operações de ramificação quase instantâneas.

### O que são Ramos no Git?

Um ramo é um ponteiro leve e móvel para um commit. O nome padrão do ramo geralmente é "master", mas não é especial – é como qualquer outro ramo.

Criar e alternar entre ramos permite que você trabalhe em diferentes funcionalidades simultaneamente.

### Como Criar um Novo Ramo no Git:

Quando você quiser começar a trabalhar em uma nova funcionalidade ou experimentar uma ideia, você pode criar um novo ramo no Git. Este novo ramo serve como uma linha de desenvolvimento separada, permitindo que você faça alterações sem afetar o ramo principal.

```bash
$ git branch new_feature
```

Este comando cria um novo ramo chamado 'new-feature' apontando para o mesmo commit do ramo atual. Ramos podem coexistir, e o Git mantém um ponteiro especial chamado `HEAD` para indicar o ramo atual.

### Compreendendo Ramos

Primeiramente, vamos entender o básico dos ramos no Git. Quando você inicializa um repositório Git, você começa com um ramo padrão, geralmente chamado 'master' ou 'main'. Ramos são essencialmente ponteiros para commits, permitindo que você trabalhe em diferentes funcionalidades ou correções de forma independente.

Para visualizar todos os ramos no seu repositório, use o comando:

```bash
$ git branch
```

Isso exibirá uma lista de ramos com um asterisco (\*) indicando o ramo atualmente checado. Para obter informações adicionais como o último commit em cada ramo, utilize:

```bash
$ git branch -v
```

### Como Alternar para Outro Ramo no Git:

Para alternar para um ramo existente diferente, use `git checkout`.

```bash
$ git checkout new_feature
```

Este comando alterna o ponteiro 'HEAD' para o ramo 'new-feature', tornando-o o ramo ativo atualmente.

Para criar e alternar para um novo ramo em uma única operação:

```bash
$ git checkout -b <newbranchname>
```

No Git versão 2.23 em diante, você pode usar `git switch` em vez de `git checkout`.

-   Alternar para um ramo existente: `git switch existing-branch`.
-   Criar e alternar para um novo ramo: `git switch -c new-branch`.

### Como Visualizar Ramos no Git:

Depois de criar e alternar ramos, você pode visualizar a estrutura de ramos usando:

Este comando exibe uma representação concisa e gráfica do histórico de commits e ponteiros de branch, permitindo que você veja como os branches divergem e se fundem ao longo do tempo.

## Como Gerenciar Branches no Git

### Como Gerenciar Branches Mesclados

À medida que seu projeto evolui, você irá mesclar branches de volta para o branch principal assim que suas alterações forem finalizadas. Para identificar branches mesclados, execute:

```bash
$ git branch --merged
```

Este comando lista os branches que foram mesclados com sucesso no branch atual. Esses branches geralmente podem ser deletados com segurança usando:

```bash
$ git branch -d branch_name
```

No entanto, para branches contendo trabalho não mesclado, use:

```bash
$ git branch --no-merged
```

Para deletar tais branches é necessário usar o flag '-D':

```bash
$ git branch -D branch_name
```

Isso garante que você não perca involuntariamente quaisquer alterações não mescladas.

### Como Renomear Branches

Para renomear um branch local:

```bash
$ git branch --move old_branch_name new_branch_name
```

Este comando atualiza o nome do branch localmente. Para refletir a mudança no repositório remoto, empurre o branch renomeado:

```bash
$ git push --set-upstream origin new_branch_name
```

Verifique as alterações usando:

```bash
$ git branch --all
```

Certifique-se de deletar o antigo branch no remoto:

```bash
$ git push origin --delete old_branch_name
```

Isso garante a uniformidade entre os repositórios local e remoto.

### Como Alterar o Nome do Branch Padrão

Renomear o branch padrão, frequentemente chamado 'master', requer cautela e coordenação, pois impacta integrações de projeto e colaboradores.

```bash
$ git branch --move master main
```

Uma vez renomeado, empurre o branch atualizado para o repositório remoto:

```bash
$ git push --set-upstream origin main
```

Certifique-se de lembrar de atualizar referências e configurações em todas as dependências, testes, scripts e hosts do repositório. Uma vez feito, delete o antigo branch master no remoto:

```bash
$ git push origin --delete master
```

Isso é **diferente de `$ git config --global init.defaultBranch main`** que discutimos na parte de configuração nas seguintes formas:

-   `$ git branch --move master main`: Este comando renomeia o branch existente chamado "master" para "main" dentro do repositório atual. É uma espécie de operação local que afeta apenas o repositório.
-   `$ git config --global init.defaultBranch main`: Este comando define o nome do branch padrão para novos repositórios globalmente. Não renomeia branches existentes, mas garante que qualquer novo repositório criado daí em diante usará "main" como o nome do branch padrão em vez de "master".

**Recurso Adicional**: Considere verificar este [recurso oficial do Git][28] por seus visuais e diagramas informativos que podem lhe fornecer mais clareza sobre conceitos de branches remotos e gerenciamento de branches.

## Workflow de Branching

Vamos entender os branches mais detalhadamente e olhar um workflow de branching comum que é usado em grandes projetos.

### Branches de Longa Duração:

No Git, branches de longa duração são branches que permanecem abertos por um período prolongado.

### Branches Temáticos:

Branches `Temáticos`/`de Recursos` são branches de curta duração criados para recursos específicos ou partes de trabalho. Ao contrário dos branches de longa duração, que persistem ao longo do tempo, branches temáticos são criados, utilizados e frequentemente deletados uma vez que o trabalho é concluído.

**Exemplo:** Vamos considerar um cenário onde uma equipe mantém dois branches de longa duração: `master` e `develop`.

-   O branch `master` contém apenas código estável, possivelmente o que foi lançado ou será lançado.
-   O branch `develop` atua como uma área de teste para desenvolvimento contínuo. Embora nem sempre esteja estável, ele serve como um campo de testes para novos recursos.

Os desenvolvedores mesclam mudanças dos branches de recursos no branch `develop` para teste. Uma vez que os recursos são totalmente testados e estáveis, eles são mesclados no `master`.

Note como as mudanças progridem através de diferentes níveis de estabilidade, movendo-se do menos estável (branches de recursos) para mais estáveis (como o branch develop), à medida que passam por testes e refinamentos, e são finalmente mesclados no branch principal/master, o mais estável.

Isso mantém uma separação clara entre código estável e código em desenvolvimento, garantindo que apenas recursos totalmente testados cheguem à versão estável.

### Melhores Práticas de Branching

1.  **Crie Nomes de Branch Descritivos**: Use nomes de branch significativos que reflitam o propósito ou recurso sendo desenvolvido.
2.  **Deletar Branches Não Utilizados**: Uma vez que um branch tenha cumprido seu propósito e suas alterações tenham sido mescladas ao branch principal, considere deletá-lo para manter o repositório limpo e gerenciável.

## Rebase no Git

No Git, quando você está trabalhando com branches, existem duas formas principais de integrar mudanças de um branch para outro: merge e rebase.

Ao contrário do merge, que pode criar um histórico desordenado com vários commits de merge, o rebase produz um histórico linear, facilitando a compreensão da sequência de alterações feitas ao longo do tempo.

### Exemplo Básico de Rebase:

Imagine que você está trabalhando em um projeto com dois branches: "feature" e "master". Você fez alguns commits no branch "feature" e agora quer integrar essas mudanças no branch "master" usando o rebase.

```

