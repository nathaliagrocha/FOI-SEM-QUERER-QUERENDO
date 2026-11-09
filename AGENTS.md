# AGENTS.md

## Visão geral

Estou desenvolvendo um projeto individual da faculdade chamado "Foi Sem Querer Querendo", que consiste em um site sobre o seriado Chaves.

A ideia é apresentar a história do seriado, seus personagens e curiosidades. Além da parte informativa, quero ter uma área onde os usuários possam criar uma conta, fazer login, assistir a alguns episódios, responder quizzes e acompanhar seus resultados em uma dashboard.

Quero que você me ajude durante todo esse desenvolvimento, tanto na criação das funcionalidades quanto na resolução de erros. Também quero entender o que estou fazendo, então é importante que você explique as soluções de uma maneira que eu consiga acompanhar.

## Tecnologias

As tecnologias que estou utilizando ou pretendo utilizar são:

- HTML e CSS para criar e estilizar as páginas.
- JavaScript para desenvolver as funcionalidades e interações.
- Node.js para trabalhar com o backend.
- web-data-viz para realizar a comunicação com o banco de dados.
- MySQL para armazenar as informações.
- Máquina virtual (VM), onde ficará hospedado o banco de dados.
- Chart.js para desenvolver os gráficos da dashboard.

Antes de utilizar qualquer tecnologia ou biblioteca, confira como ela está sendo utilizada no projeto. Não quero adicionar ferramentas ou dependências sem necessidade e sem minha autorização.

## Comandos

Os comandos previstos para o projeto são:

- `npm install`: instalar as dependências.
- `npm start`: iniciar a aplicação, conforme a configuração existente.

Antes de executar qualquer comando, confira se os arquivos e as configurações necessárias existem.

Não altere o `package.json`, as dependências ou os scripts sem minha autorização. Caso algum comando apresente erro, primeiro me explique o que aconteceu e o que pode ser feito para resolver.

## Arquitetura

Antes de começar a trabalhar em alguma funcionalidade, quero que você analise como o projeto está organizado e identifique os arquivos envolvidos.

É importante entender como o HTML, CSS e JavaScript se relacionam com o backend, a API e o banco de dados.

Meu banco de dados MySQL ficará hospedado em uma máquina virtual (VM), e utilizarei a API web-data-viz para realizar as consultas e enviar informações.

Na dashboard, utilizarei Chart.js para apresentar os resultados dos quizzes por meio de gráficos. Os dados deverão ser obtidos a partir das informações armazenadas no banco.

Quero que você respeite a organização que já existe no projeto, sem criar pastas ou estruturas desnecessárias.

Quando eu solicitar uma nova funcionalidade, primeiro analise o que precisa ser feito e me apresente quais arquivos serão modificados e como pretende realizar a implementação. Aguarde minha aprovação antes de começar.

## Padrões de desenvolvimento

**JavaScript**

Ainda estou aprendendo programação, então prefiro trabalhar com códigos básicos e fáceis de entender.

- Utilize `let` para declarar variáveis.
- Evite soluções muito avançadas quando existir uma maneira mais simples de fazer.
- Prefira funções diretas e fáceis de acompanhar.
- Evite métodos e recursos que ainda não conheço sem necessidade.
- Não complique o código apenas para deixá-lo mais elaborado.

**Nomenclatura**

Prefiro utilizar `snake_case` para nomes de arquivos, variáveis, funções e identificadores HTML.

Exemplos: `login_usuario.js`, `nome_usuario` e `validar_cadastro()`.

Respeite as exigências das bibliotecas quando elas utilizarem outros padrões.

**HTML e CSS**

Mantenha o código organizado e procure seguir o mesmo padrão visual que já estou utilizando. Não quero que outras partes do site sejam modificadas quando eu solicitar uma alteração específica.

Prefiro resolver problemas visuais com CSS antes de utilizar JavaScript.

**Commits**

Quando eu solicitar a criação de commits, utilize o padrão Conventional Commits, como `feat`, `fix` e `docs`. Não crie commits sem minha autorização.

## Cuidados e restrições

Quero ter controle sobre as alterações realizadas no meu projeto. Por isso, não modifique nenhum arquivo antes de apresentar o que pretende fazer e receber minha aprovação.

Também peço que tenha alguns cuidados:

- Não reescreva arquivos inteiros quando uma pequena alteração for suficiente.
- Não remova funcionalidades que já estejam funcionando.
- Não altere o layout ou as cores sem que eu solicite.
- Não instale bibliotecas ou modifique configurações por conta própria.
- Não altere tabelas ou informações do banco sem minha autorização.
- Não exponha senhas ou dados de acesso.
- Não invente funções ou parâmetros da API.
- Não execute comandos que possam apagar informações sem minha aprovação.

Sempre que fizer alguma alteração, quero que você me explique o que mudou, por que foi necessário e como o código funciona. Não quero apenas copiar e colar códigos prontos. Quero entender a lógica e aprender a desenvolver essas funcionalidades sozinha. Por isso, explique os conceitos novos com calma e, quando necessário, por etapas.

## Regra geral

Quero que você respeite a estrutura do meu projeto e as orientações deste documento durante todo o desenvolvimento. Antes de sugerir uma solução, confira como o código está funcionando atualmente. Não presuma que utilizo algo sem verificar os arquivos. Caso encontre algum problema fora do que pedi, apenas me explique e aguarde minha autorização antes de resolver. Meu objetivo é conseguir desenvolver um site funcional e bem organizado, mas também aprender com cada etapa do processo.