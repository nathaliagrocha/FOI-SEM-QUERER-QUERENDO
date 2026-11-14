# Documentação do projeto Foi Sem Querer Querendo

Documentação baseada no código atual do repositório. O projeto é um site sobre o seriado Chaves, com páginas informativas, cadastro, login, quiz e uma tela de dashboard.

## Visão geral

- **Frontend:** HTML, CSS e JavaScript na pasta `public`.
- **Backend:** Node.js com Express na raiz (`app.js`) e nas pastas `src/routes`, `src/controllers`, `src/models` e `src/database`.
- **Banco de dados:** MySQL, acessado pela biblioteca `mysql2`.
- **Comunicação:** o frontend chama as rotas da API com `fetch`; cada rota chama um controller, que chama um model, que executa o SQL no banco.

### Como executar

```bash
npm install
npm start
```

O script `start` executa `node app.js`. O endereço exibido no terminal usa as variáveis `APP_HOST` e `APP_PORT`.

---

## Estrutura de pastas

```text
FOI-SEM-QUERER-QUERENDO/
├── app.js
├── package.json
├── .env
├── .env.dev
├── .gitignore
├── README.md
├── AGENTS.md
├── LICENSE
├── Banco de dados/
│   ├── DER.mwb
│   ├── Modelagem logica.pdf.png
│   └── SCRIPT_BANCO_DE_DADOS.sql
├── DOCUMENTOS_DE_APOIO/
│   ├── PASSO_A_PASSO_ADICIONAR_UPLOAD_DE_IMAGENS_AO_PROJETO.md
│   ├── PASSO_A_PASSO_CRIAR_ROTA_NA_API.md
│   ├── exemplo_criacao_grafico_estatico/
│   ├── exemplo_de_quiz/
│   └── exemplo_de_upload_de_arquivo/
├── public/
│   ├── index.html
│   ├── motivações.html
│   ├── cadastro.html
│   ├── login.html
│   ├── quiz.html
│   ├── usuario.html
│   ├── assets/
│   ├── css/
│   ├── dashboard/
│   └── js/
└── src/
    ├── controllers/
    ├── database/
    ├── models/
    └── routes/
```

---

## Arquivos da raiz

### `app.js`

Arquivo principal do servidor.

- Define o ambiente como `desenvolvimento` (linha comentada permite trocar para `producao`).
- Carrega o `.env.dev` ou `.env` conforme o ambiente.
- Cria o servidor Express.
- Importa e registra as rotas: `/`, `/usuarios`, `/avisos`, `/medidas`, `/aquarios` e `/empresas`.
- Serve os arquivos estáticos da pasta `public`.
- Habilita JSON, dados de formulário e CORS.
- Inicia o servidor na porta definida em `APP_PORT` e mostra o endereço no terminal.

### `package.json`

Configuração do projeto Node.

- `main`: `app.js`.
- Scripts:
  - `npm start`: executa `node app.js`.
  - `npm run dev`: executa com `nodemon`.
- Dependências: `express`, `cors`, `dotenv`, `mysql2`, `nodemon` e `path`.

### `.env` e `.env.dev`

Arquivos de variáveis de ambiente. Não devem ter os valores divulgados.

Variáveis usadas:

| Variável | Uso |
|---|---|
| `AMBIENTE_PROCESSO` | Define `producao` ou `desenvolvimento`. |
| `DB_HOST` | Endereço do servidor MySQL. |
| `DB_DATABASE` | Nome do banco. |
| `DB_USER` | Usuário do banco. |
| `DB_PASSWORD` | Senha do banco. |
| `DB_PORT` | Porta do MySQL. |
| `APP_PORT` | Porta do servidor Node. |
| `APP_HOST` | Host exibido no endereço da aplicação. |

### `.gitignore`

Impede o envio de `node_modules`, `package-lock.json` e `.github` ao repositório.

### `README.md`

Apresentação do projeto: tema, inspiração, objetivos, funcionalidades planejadas, tecnologias e instruções básicas de execução.

### `AGENTS.md`

Documento de orientações para o desenvolvimento do projeto (tecnologias, organização, padrões e restrições).

### `LICENSE`

Licença MIT do projeto.

---

## Backend

### `src/routes/index.js`

Rota inicial.

- `GET /`: chama `res.render("index")`.

### `src/routes/usuarios.js`

Rotas de usuário.

- `POST /usuarios/cadastrar`: chama `usuarioController.cadastrar`.
- `POST /usuarios/autenticar`: chama `usuarioController.autenticar`.

### `src/routes/avisos.js`

Rotas de avisos/publicações.

- `GET /avisos/listar`: lista todos os avisos.
- `GET /avisos/listar/:idUsuario`: lista avisos de um usuário.
- `GET /avisos/pesquisar/:descricao`: pesquisa avisos pela descrição.
- `POST /avisos/publicar/:idUsuario`: publica um aviso.
- `PUT /avisos/editar/:idAviso`: edita a descrição de um aviso.
- `DELETE /avisos/deletar/:idAviso`: apaga um aviso.

### `src/routes/medidas.js`

Rotas de medidas de aquário.

- `GET /medidas/ultimas/:idAquario`: retorna as últimas medidas.
- `GET /medidas/tempo-real/:idAquario`: retorna a medida mais recente.

### `src/routes/aquarios.js`

Rotas de aquários.

- `GET /aquarios/:empresaId`: busca aquários por empresa.
- `POST /aquarios/cadastrar`: cadastra um aquário.

### `src/routes/empresas.js`

Rotas de empresas.

- `POST /empresas/cadastrar`: cadastra uma empresa.
- `GET /empresas/buscar?cnpj=...`: busca empresa pelo CNPJ.
- `GET /empresas/buscar/:id`: busca empresa pelo ID.
- `GET /empresas/listar`: lista empresas.

---

### `src/controllers/usuarioController.js`

Recebe os dados enviados pelo frontend e chama o model.

- `autenticar(req, res)`: lê `emailServer` e `senhaServer` do corpo. Valida campos, chama `usuarioModel.autenticar` e responde com `{ id, email, nome }`. Retorna 400 para campo ausente, 403 para login inválido e 500 para erro no banco.
- `cadastrar(req, res)`: lê `nomeServer`, `emailServer` e `senhaServer`. Valida campos e chama `usuarioModel.cadastrar`. Retorna o resultado em JSON ou erro 500.

### `src/controllers/avisoController.js`

Controla as operações de avisos.

- `listar(req, res)`: busca todos os avisos. Retorna 200 com a lista, 204 se vazia ou 500 em erro.
- `listarPorUsuario(req, res)`: usa `req.params.idUsuario` para buscar os avisos do usuário.
- `pesquisarDescricao(req, res)`: usa `req.params.descricao` para filtrar avisos.
- `publicar(req, res)`: lê `titulo` e `descricao` do corpo e `idUsuario` da URL. Valida e cadastra o aviso.
- `editar(req, res)`: lê a nova `descricao` do corpo e `idAviso` da URL.
- `deletar(req, res)`: usa `idAviso` da URL para excluir o aviso.

### `src/controllers/medidaController.js`

- `buscarUltimasMedidas(req, res)`: define o limite de 7 linhas e busca as últimas medidas do aquário informado em `req.params.idAquario`.
- `buscarMedidasEmTempoReal(req, res)`: busca a última medida do aquário informado.

### `src/controllers/aquarioController.js`

- `buscarAquariosPorEmpresa(req, res)`: lê `req.params.idUsuario` e chama o model para buscar aquários. Retorna 200, 204 ou 500.
- `cadastrar(req, res)`: lê `descricao` e `idUsuario` do corpo, valida e cadastra. Retorna 201 ou 500.

### `src/controllers/empresaController.js`

- `buscarPorCnpj(req, res)`: lê `req.query.cnpj` e retorna a empresa encontrada.
- `listar(req, res)`: retorna todas as empresas.
- `buscarPorId(req, res)`: lê `req.params.id` e retorna a empresa.
- `cadastrar(req, res)`: lê `cnpj` e `razaoSocial` do corpo. Se o CNPJ já existir, retorna 401; caso contrário, cadastra e retorna 201.

---

### `src/models/usuarioModel.js`

Executa o SQL de usuário.

- `autenticar(email, senha)`: `SELECT id, nome, email FROM usuario WHERE email = ... AND senha = ...`.
- `cadastrar(nome, email, senha)`: `INSERT INTO usuario (nome, email, senha) VALUES (...)`.

### `src/models/avisoModel.js`

Executa o SQL de avisos.

- `listar()`: seleciona avisos com `INNER JOIN` na tabela `usuario`.
- `pesquisarDescricao(texto)`: filtra avisos por `descricao LIKE`.
- `listarPorUsuario(idUsuario)`: filtra avisos pelo ID do usuário.
- `publicar(titulo, descricao, idUsuario)`: insere um aviso.
- `editar(novaDescricao, idAviso)`: atualiza a descrição do aviso.
- `deletar(idAviso)`: remove o aviso.

### `src/models/medidaModel.js`

- `buscarUltimasMedidas(idAquario, limite_linhas)`: busca temperatura e momento das últimas medidas, ordenando por ID decrescente.
- `buscarMedidasEmTempoReal(idAquario)`: busca a última medida do aquário.

### `src/models/aquarioModel.js`

- `buscarAquariosPorEmpresa(empresaId)`: busca aquários pela empresa.
- `cadastrar(empresaId, descricao)`: insere um aquário.

### `src/models/empresaModel.js`

- `buscarPorId(id)`: busca empresa pelo ID.
- `listar()`: lista ID, razão social, CNPJ e código de ativação.
- `buscarPorCnpj(cnpj)`: busca empresa pelo CNPJ.
- `cadastrar(razaoSocial, cnpj)`: insere uma empresa.

### `src/database/config.js`

Configura a conexão com o MySQL usando as variáveis de ambiente.

- `executar(instrucao)`: cria uma conexão, executa a instrução SQL, encerra a conexão e devolve uma Promise com o resultado ou o erro.
- Antes de conectar, verifica se o ambiente está definido como `producao` ou `desenvolvimento`.

### `src/database/script-tabelas.sql`

Cria o banco `chaves` e as tabelas:

- `usuario`: `id`, `nome`, `email`, `senha`.
- `quiz`: `id`, `acertosQuestao`, `totalAcertos`, `qtdQuiz`, `fk_usuario` (chave estrangeira para `usuario.id`).

---

## API

Base local: `http://APP_HOST:APP_PORT`.

### Rotas de usuário

| Método | Rota | Recebe | Retorna |
|---|---|---|---|
| POST | `/usuarios/cadastrar` | JSON `{ nomeServer, emailServer, senhaServer }` | Resultado do INSERT em JSON. Erro 400 se faltar campo; 500 se o banco falhar. |
| POST | `/usuarios/autenticar` | JSON `{ emailServer, senhaServer }` | `{ id, email, nome }` se encontrar um usuário. 403 se não encontrar ou se houver mais de um; 400 para campo ausente; 500 para erro no banco. |

### Rotas de avisos

| Método | Rota | Recebe | Retorna |
|---|---|---|---|
| GET | `/avisos/listar` | Nada | Lista de avisos com dados do usuário. 204 se vazia. |
| GET | `/avisos/listar/:idUsuario` | `idUsuario` na URL | Avisos do usuário. 204 se vazio. |
| GET | `/avisos/pesquisar/:descricao` | `descricao` na URL | Avisos encontrados. 204 se vazio. |
| POST | `/avisos/publicar/:idUsuario` | `idUsuario` na URL e JSON `{ titulo, descricao }` | Resultado do INSERT. 400 se faltar título/descrição; 403 se faltar ID. |
| PUT | `/avisos/editar/:idAviso` | `idAviso` na URL e JSON `{ descricao }` | Resultado do UPDATE. |
| DELETE | `/avisos/deletar/:idAviso` | `idAviso` na URL | Resultado do DELETE. |

### Rotas de medidas

| Método | Rota | Recebe | Retorna |
|---|---|---|---|
| GET | `/medidas/ultimas/:idAquario` | `idAquario` na URL | Até 7 medidas com temperatura, momento e horário formatado. 204 se vazio. |
| GET | `/medidas/tempo-real/:idAquario` | `idAquario` na URL | A última medida do aquário. 204 se vazio. |

### Rotas de aquários

| Método | Rota | Recebe | Retorna |
|---|---|---|---|
| GET | `/aquarios/:empresaId` | `empresaId` na URL | Aquários da empresa. 204 com lista vazia se não houver. |
| POST | `/aquarios/cadastrar` | JSON `{ descricao, idUsuario }` | Resultado do INSERT com status 201. 400 se faltar campo. |

### Rotas de empresas

| Método | Rota | Recebe | Retorna |
|---|---|---|---|
| POST | `/empresas/cadastrar` | JSON `{ cnpj, razaoSocial }` | 201 com o resultado. 401 se o CNPJ já existir. |
| GET | `/empresas/buscar?cnpj=...` | `cnpj` na query string | Empresa encontrada. |
| GET | `/empresas/buscar/:id` | `id` na URL | Empresa encontrada. |
| GET | `/empresas/listar` | Nada | Lista de empresas. |

### Rota inicial

| Método | Rota | Recebe | Retorna |
|---|---|---|---|
| GET | `/` | Nada | Chama `res.render("index")`. |

---

## Frontend (`public`)

### Páginas HTML

#### `public/index.html`

Página inicial estática.

- Navbar com links para Início, Motivações, Cadastro e Login.
- Banner principal com o título do projeto.
- Seções sobre a história do seriado.
- Carrossel de imagens.
- Seção de legado e chamada para login.
- Usa `css/home.css`.

#### `public/motivações.html`

Página estática com a história pessoal da autora e sua relação com Chaves.

- Usa a mesma navbar e o mesmo `css/home.css` da página inicial.
- Contém textos, imagens e carrossel.

#### `public/cadastro.html`

Tela de cadastro.

- Campos: nome, e-mail, senha e confirmação de senha.
- Função inline `cadastrar()`:
  - Lê os campos.
  - Converte o e-mail para minúsculas.
  - Verifica campos vazios.
  - Valida presença de `@` e `.com`.
  - Exige senha com pelo menos 8 caracteres e pelo menos um número.
  - Confere se a confirmação é igual à senha.
  - Envia `POST /usuarios/cadastrar` com `nomeServer`, `emailServer` e `senhaServer`.
  - Em caso de sucesso, mostra alerta e redireciona para `login.html`.

#### `public/login.html`

Tela de login.

- Campos: e-mail e senha.
- Função inline `entrar()`:
  - Verifica campos vazios e formato básico do e-mail.
  - Envia `POST /usuarios/autenticar`.
  - Em caso de sucesso, salva `EMAIL_USUARIO`, `NOME_USUARIO` e `ID_USUARIO` no `localStorage`.
  - Redireciona para `dashboard/mural.html`.

#### `public/quiz.html`

Quiz sobre Chaves, feito apenas no navegador.

- Contém um array `listaDeQuestoes` com 20 perguntas e quatro alternativas cada.
- Funções:
  - `onloadEsconder()`: esconde a pontuação e o jogo ao carregar.
  - `iniciarQuiz()`: mostra o jogo e carrega a primeira questão.
  - `preencherHTMLcomQuestaoAtual(index)`: coloca pergunta e alternativas na tela.
  - `submeter()`: verifica se alguma alternativa foi marcada e chama a correção.
  - `habilitarAlternativas(trueOrFalse)`: habilita ou desabilita os radios.
  - `avancar()`: passa para a próxima questão.
  - `tentarNovamente()`: recarrega a página.
  - `checarResposta()`: compara a alternativa marcada com a correta, soma acertos/erros e colore as opções.
  - `limparCoresBackgroundOpcoes()`: remove as cores das alternativas.
  - `desmarcarRadioButtons()`: desmarca todas as alternativas.
  - `finalizarJogo()`: calcula a porcentagem e mostra a mensagem final.
- Usa `css/quiz.css`.

#### `public/dashboard/dashboard.html`

Tela de dashboard com gerenciamento de episódios.

- Carrega `js/sessao.js` e `js/alerta.js`.
- Mostra o nome do usuário a partir de `sessionStorage.NOME_USUARIO`.
- Possui seis cards de episódios, cada um com título, link do YouTube, player e botão de salvar.
- Funções inline:
  - `atualizarTitulo(id)`: atualiza o título do card enquanto o usuário digita.
  - `atualizarPlayer(id)`: extrai o ID do YouTube e mostra o vídeo no iframe.
  - `extrairIdYouTube(url)`: expressão regular que identifica o ID do vídeo.
  - `salvarEpisodio(id)`: valida título e link e mostra um alerta de sucesso. Não envia dados para o backend.
- Usa `css/dashboards.css`.

#### `public/usuario.html`

Arquivo vazio. Não possui conteúdo no momento.

### JavaScript (`public/js`)

#### `public/js/sessao.js`

Funções de sessão e carregamento.

- `validarSessao()`: lê `EMAIL_USUARIO` e `NOME_USUARIO` do `sessionStorage`; mostra o nome no elemento `b_usuario` ou redireciona para `../login.html`.
- `limparSessao()`: limpa o `sessionStorage` e redireciona para `../login.html`.
- `aguardar()`: exibe o elemento `div_aguardar`.
- `finalizarAguardar(texto)`: esconde o carregamento e, se houver texto, exibe o erro em `div_erros_login`.

#### `public/js/alerta.js`

Script de alertas de temperatura de aquários.

- `obterdados(idAquario)`: chama `GET /medidas/tempo-real/:idAquario`.
- `alertar(resposta, idAquario)`: compara a temperatura com limites e define o nível do alerta; atualiza o card e a temperatura na tela.
- `exibirAlerta(...)`: adiciona ou atualiza um alerta na lista.
- `removerAlerta(idAquario)`: remove o alerta do aquário.
- `exibirCards()`: monta os cards de alerta no elemento `alerta`.
- `transformarEmDiv(...)`: gera o HTML de cada alerta usando a descrição do aquário salva em `sessionStorage.AQUARIOS`.
- `atualizacaoPeriodica()`: consulta todos os aquários a cada 5 segundos.

### CSS (`public/css`)

| Arquivo | Finalidade |
|---|---|
| `home.css` | Estilos da página inicial e da página de motivações: navbar, banner, artigos, carrossel, legado e footer. |
| `cadastro.css` | Estilos da tela de cadastro: fundo, card transparente, formulário, botões e responsividade. |
| `login.css` | Estilos da tela de login: fundo, card, formulário, botões, alerta de erro e responsividade. |
| `dashboards.css` | Estilos da dashboard: navbar lateral de tijolos, cards de episódios, player do YouTube e componentes de gráficos/aquários herdados do template. |
| `quiz.css` | Estilos do quiz: layout, navbar lateral, caixa de perguntas, alternativas, botões e cores de acerto/erro. |
| `usuario.css` | Arquivo vazio. Não possui estilos no momento. |

### Assets (`public/assets`)

Imagens e ícones usados nas páginas:

- **Banners e capas:** `banner_home.png`, `banner_login.png`, `banner_cadastro.png`, `banner_dasboard.png`, `banner_motivacao.png`, `capa_home.jpg`.
- **Personagens e cenas:** `chaves_acapulco.avif`, `chaves_aluguel.jpg`, `chaves_amareo.jpg`, `chaves_barril.jpg`, `chaves_chapeu.png`, `chaves_chiquinha.jpg`, `chaves_florinda.webp`, `chaves_madruga.webp`, `chaves_ratoeira.jpg`, `chaves_sbt.jpeg`, `chaves_terror.jpg`, `chaves_triciclo.png`, `chaves_turma01.webp`, `chaves_turma02.jpg`, `chaves_vila.jpg`.
- **Imagens do quiz:** `quiz_bilhete.jfif`, `quiz_bruxa.jpg`, `quiz_cao.jfif`, `quiz_capivara.jpg`, `quiz_casimira.webp`, `quiz_escola.webp`, `quiz_gravata.png`, `quiz_hotdog.jfif`, `quiz_invisivel.webp`, `quiz_ioio.webp`, `quiz_jogoF.png`, `quiz_madruga.png`, `quiz_moradores.webp`, `quiz_mudas.jpg`, `quiz_musica.jpg`, `quiz_nhonho.jpg`, `quiz_restaurante.webp`, `quiz_terremoto.png`.
- **Imagens pessoais da autora:** `nathalia_familia.jpg`, `nathalia_familia1.jpg`, `nathalia_familia2.jpg`, `nathalia_familia3.jpg`, `nathalia_familia4.jpg`, `nathalia_familia5.webp`, `nathalia_fantasia.jpg`, `nathalia_quico.jpg`, `nathalia_vila.jpg`.
- **Carregamento:** `aguarde-orange.gif`, `aguarde-pink.gif`, `aguarde-pink2.gif`, `aguarde-pink3.gif`, `circle-loading.gif`.

---

## Banco de dados

### `Banco de dados/SCRIPT_BANCO_DE_DADOS.sql`

Script SQL do banco `chaves`.

- Cria o banco e as tabelas `usuario` e `quiz`.
- Ao final, executa `SELECT * FROM usuario`.

### `src/database/script-tabelas.sql`

Versão do script de criação das tabelas dentro de `src`. Contém a mesma estrutura de `usuario` e `quiz`, sem o `SELECT` final.

### `Banco de dados/DER.mwb`

Arquivo de modelagem do MySQL Workbench.

### `Banco de dados/Modelagem logica.pdf.png`

Imagem da modelagem lógica do banco.

### Tabelas

**`usuario`**

| Campo | Tipo | Observação |
|---|---|---|
| `id` | INT | Chave primária, auto incremento. |
| `nome` | VARCHAR(45) | Nome do usuário. |
| `email` | VARCHAR(100) | E-mail do usuário. |
| `senha` | INT | Senha do usuário. |

**`quiz`**

| Campo | Tipo | Observação |
|---|---|---|
| `id` | INT | Chave primária, auto incremento. |
| `acertosQuestao` | INT | Acertos por questão. |
| `totalAcertos` | INT | Total de acertos no quiz. |
| `qtdQuiz` | INT | Quantidade de vezes que o quiz foi realizado. |
| `fk_usuario` | INT | Chave estrangeira para `usuario.id`. |

---

## Documentos de apoio (`DOCUMENTOS_DE_APOIO`)

### `PASSO_A_PASSO_CRIAR_ROTA_NA_API.md`

Tutorial que explica como criar uma rota na API: registrar o router no `app.js`, criar o arquivo em `routes`, criar o controller e criar o model.

### `PASSO_A_PASSO_ADICIONAR_UPLOAD_DE_IMAGENS_AO_PROJETO.md`

Explica três opções para trabalhar com imagens: salvar URL no banco, fazer upload para uma pasta do projeto ou salvar como BLOB.

### `exemplo_de_quiz/`

- `EXEMPLO_QUIZZ.html`: exemplo de quiz em JavaScript puro, com perguntas, alternativas, acertos, erros e pontuação final.
- `style.css`: estilos do exemplo de quiz.

### `exemplo_criacao_grafico_estatico/`

- `EXEMPLO-GRAFICO-ESTATICO.html`: exemplo de gráfico com Chart.js usando dados fixos no próprio arquivo. Serve como referência para a dashboard.

### `exemplo_de_upload_de_arquivo/`

Projeto de exemplo separado para upload local de imagens.

- `app.js`: servidor Express do exemplo, com a rota `/usuarios`.
- `package.json`: dependências do exemplo, incluindo `multer`.
- `README.md`: instruções do exemplo.
- `LICENSE`: licença do exemplo.
- `.gitignore`: arquivos ignorados no exemplo.
- `public/index.html`: formulário com nome, e-mail e foto; envia os dados com `FormData`.
- `public/perfil.html`: busca um usuário por ID e mostra nome, e-mail e imagem.
- `src/config/configUpload.js`: configura o `multer` para salvar arquivos em `public/assets` com nome aleatório.
- `src/controllers/usuarioController.js`: salva o usuário com o nome do arquivo da imagem e busca usuário por ID.
- `src/models/usuarioModel.js`: SQL de inserção e busca de usuário com `imagem_perfil`.
- `src/routes/usuarioRouter.js`: rotas `GET /usuarios`, `POST /usuarios/cadastro` e `GET /usuarios/:id`.
- `src/database/config.js`: conexão MySQL do exemplo, com credenciais de exemplo.
- `src/database/script-exemplo-criacao.sql`: cria o banco `exemplo_upload` e a tabela `usuario` com `imagem_perfil`.

---

## Observações sobre o estado atual

Pontos identificados no código, sem alterações:

- A rota `GET /` usa `res.render("index")`, mas o projeto não configura uma view engine. A página inicial é servida como arquivo estático pelo Express.
- O login salva os dados no `localStorage`, enquanto `sessao.js` lê do `sessionStorage`.
- O login redireciona para `dashboard/mural.html`, arquivo que não existe no repositório.
- A dashboard não chama `validarSessao()`; ela lê `sessionStorage.NOME_USUARIO` diretamente.
- A dashboard referencia `../css/estilo.css` e `../assets/icon/favicon2.ico`, que não existem no repositório.
- Na dashboard, `salvarEpisodio()` apenas exibe um alerta; não há envio para o backend.
- O quiz não salva resultados no banco. A tabela `quiz` existe no SQL, mas não possui model nem rota.
- No `quiz.html`, o fluxo de `avancar()` não chega a `finalizarJogo()`; na última questão, a mesma questão é reapresentada.
- A rota `GET /aquarios/:empresaId` recebe o parâmetro `empresaId`, mas o controller lê `req.params.idUsuario`.
- O cadastro e o login usam validações simples no frontend e as senhas são gravadas como texto no banco, no campo `senha` do tipo INT.
- `public/usuario.html` e `public/css/usuario.css` estão vazios.
