<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/grochavieira/happy-backend?color=%2304D361&style=for-the-badge">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/grochavieira/happy-backend?style=for-the-badge">
  
  <a href="https://github.com/grochavieira/happy-backend/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/grochavieira/happy-backend?style=for-the-badge">
  </a>
    
   <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen?style=for-the-badge">

  <a href="https://github.com/grochavieira">
    <img alt="Feito por Guilherme Rocha Vieira" src="https://img.shields.io/badge/feito%20por-grochavieira-%237519C1?style=for-the-badge&logo=github">
  </a>
  
 
</p>
<h1 align="center">
    <img src="./assets/logo_backend.png" />
</h1>

<h4 align="center"> 
	🚧  Aplicação finalizada! 🚧
</h4>

## 🏁 Tópicos

<p>
 👉<a href="#-sobre-o-projeto" style="text-decoration: none; "> Sobre</a> <br/>
👉<a href="#-funcionalidades" style="text-decoration: none; "> Funcionalidades</a> <br/>
👉<a href="#-layout" style="text-decoration: none"> Layout</a> <br/>
👉<a href="#-como-executar-o-projeto" style="text-decoration: none"> Como executar</a> <br/>
👉<a href="#-tecnologias" style="text-decoration: none"> Tecnologias</a> <br/>
👉<a href="#-autor" style="text-decoration: none"> Autor</a> <br/>
👉<a href="#user-content--licença" style="text-decoration: none"> Licença</a>

</p>

## 💻 Sobre o projeto

Uma API para cadastrar orfanatos de São Bernardo do Campo (SP), para que usuários possam encontrar informações sobre eles.

---

<a name="-funcionalidades"></a>

## ⚙️ Funcionalidades

- [x] Back-end;
  - [x] Rotas de Orfanato;
    - [x] Cadastro de orfanatos;
    - [x] Listagem de orfanatos;
    - [x] Detalhes de um orfanato;
    - [x] Inserção de imagens no cadastro de orfanatos;
    - [x] Deletar orfanato;
    - [x] Editar orfanato.
  - [x] Rotas de Usuário:
    - [x] Cadastro de usuário;
    - [x] Listagem de usuários;
    - [x] Detalhes de um usuário;
    - [x] Atualização de senha;
    - [x] Envio de email para troca de senha;
    - [x] Autentificação de rotas por jwt;
  - [x] Cloudinary foi utilizado para armazenar e deletar imagens;
  - [x] Nodemailer foi usado para enviar emails;
  - [x] Typeorm SQLite foi trocado por MongoDB;

---

## 🎨 Layout

- **[Mobile](https://github.com/grochavieira/happy-mobile)**
- **[FrontEnd](https://github.com/grochavieira/happy-frontend)**

---

## 🚀 Como executar o projeto

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/), [Yarn](https://classic.yarnpkg.com/en/docs/install).
Para a aplicação mobile, será necessário instalar o [Expo](https://expo.io/) para rodar o app no seu smartphone.
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

#### 🎲 Rodando o Backend (servidor)

```bash

# Clone este repositório
$ git clone https://github.com/grochavieira/happy-backend.git

# Acesse a pasta do projeto no terminal/cmd
$ cd happy-backend

# Instale as dependências com npm
$ npm install

# Execute a aplicação
$ npm run dev

# O servidor inciará na porta:3333 - acesse http://localhost:3333

```

---

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

#### **Server** ([NodeJS](https://nodejs.org/en/) + [TypeScript](https://www.typescriptlang.org/))

- **[express](https://expressjs.com/)**
- **[CORS](https://expressjs.com/en/resources/middleware/cors.html)**
- **[ts-node](https://github.com/TypeStrong/ts-node)**
- **[multer](https://github.com/expressjs/multer)**
- **[yup](https://github.com/jquense/yup)**
- **[nodemailer](https://nodemailer.com/about/)**
- **[cloudinary](https://cloudinary.com/)**
- **[image-data-uri](https://www.npmjs.com/package/image-data-uri)**
- **[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)**
- **[mongoose](https://mongoosejs.com/)**

> Veja o arquivo [package.json](https://github.com/grochavieira/happy-backend/blob/master/package.json)

#### **Utilitários**

- Editor: **[Visual Studio Code](https://code.visualstudio.com/)**
- Teste do Banco de Dados: **[Beekeper-Studio](https://www.beekeeperstudio.io/)**
- Teste de API: **[Insomnia](https://insomnia.rest/)**

---

<a name="-autor"></a>

## 🦸‍♂️ **Autor**

<p>
<kbd>
 <img src="https://avatars1.githubusercontent.com/u/48029638?s=460&u=f8d11a7aa9ce76a782ef140a075c5c81be878f00&v=4" width="150px;" alt=""/>
 </kbd>
 <br />
 <sub><strong>🌟 Guilherme Rocha Vieira 🌟</strong></sub>
</p>

[![Linkedin Badge](https://img.shields.io/badge/-Guilherme-blue?style=for-the-badge&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/grochavieira/)](https://www.linkedin.com/in/grochavieira/)
[![Gmail Badge](https://img.shields.io/badge/-guirocha.hopeisaba@gmail.com-c14438?style=for-the-badge&logo=Gmail&logoColor=white&link=mailto:guirocha.hopeisaba@gmail.com)](mailto:guirocha.hopeisaba@gmail.com)

---

## 📝 Licença

Este projeto esta sobe a licença [MIT](./LICENSE).

Feito com :satisfied: por Guilherme Rocha Vieira 👋🏽 [Entre em contato!](https://www.linkedin.com/in/grochavieira/)

---
