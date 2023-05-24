# Documentação da API

## Tabela de Conteúdos

- [Visão Geral](#1-visão-geral)
- [Diagrama ER](#2-diagrama-er)
- [Início Rápido](#3-início-rápido)
    - [Instalando Dependências](#31-instalando-dependências)
    - [Variáveis de Ambiente](#32-variáveis-de-ambiente)
    - [Migrations](#33-migrations)
- [Autenticação](#4-autenticação)
- [Endpoints](#5-endpoints)

---

## 1. Visão Geral

Visão geral do projeto, um pouco das tecnologias usadas.

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)

A URL base da aplicação:
https://eazy-contacts.onrender.com

---

## 2. Diagrama ER
[ Voltar para o topo ](#tabela-de-conteúdos)


Diagrama ER da API definindo bem as relações entre as tabelas do banco de dados.

![DER](diagram.png)

---

## 3. Início Rápido
[ Voltar para o topo ](#tabela-de-conteúdos)


### 3.1. Instalando Dependências

Clone o projeto em sua máquina e instale as dependências com o comando:

```shell
yarn

yarn build
```

### 3.2. Variáveis de Ambiente

Em seguida, crie um arquivo **.env**, copiando o formato do arquivo **.env.example**:
```
cp .env.example .env
```

Configure suas variáveis de ambiente com suas credenciais do Postgres e uma nova database da sua escolha.

### 3.3. Migrations

Execute as migrations com o comando:

```
yarn typeorm migration:run -d src/data-source.ts
```

## 4. Endpoints

[ Voltar para o topo ](#tabela-de-conteúdos)

### Índice

- [Users](#1-users)
    - [POST - /users](#11-criação-de-usuário)
    - [GET - /users](#12-retorna-usuário)
	- [PATCH - /users](#13-atualiza-usuário)
    - [DELETE - /users](#14-deleta-usuário)
- [Login](#2-login)
    - [POST - /login](#21-criação-token)
- [Contacts](#3-contacts)
    - [POST - /contacts](#31-criação-de-contato)
    - [GET - /contacts](#32-lista-contatos)
	- [PATCH - /contacts/:id](#34-atualiza-contato)
    - [DELETE - /contacts/:id](#14-deleta-contato)


---

## 1. **Users**
[ Voltar para os Endpoints ](#4-endpoints)

O objeto User é definido como:

| Campo      | Tipo   | Descrição                                     |
| -----------|--------|-------------------------------------------------|
| id         | string | Identificador único do usuário                  |
| name       | string | O nome do usuário.                              |
| email      | string | O e-mail do usuário.                            |
| password   | string | A senha de acesso do usuário                    |
| createdAt  | date   | A data de criação do usuário.                   |
| contacts   | array  | Array de contatos cridados pelo usuário.        |

### Endpoints

| Método   | Rota       | Descrição                               |
|----------|------------|-----------------------------------------|
| POST     | /users     | Criação de um usuário.                  |
| GET      | /user      | Retornar o usuário que fez login        |
| PATCH    | /users     | Atualiza o usuário que fez login        |
| DELETE   | /users     | Deleta o usuário que fez login          |

---

## Schema usuário

```
export const userSchema = z.object({
    name: z.string().min(2).max(45),
    email: z.string().email().max(45),
    phone: z.string().min(8).max(13),
    password: z.string().max(120),
  });
```

---

### 1.1. **Criação de Usuário**

[ Voltar para os Endpoints ](#4-endpoints)

### `/users`

### Exemplo de Request:
```
POST /users
Host: https://eazy-contacts.onrender.com
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:
```json
{
	"name": "teste",
	"email": "teste@mail.com",
    "phone": "100845678",
	"password": "1234"
}
```


### Exemplo de Response:
```
201 Created
```

```json
{
	"name": "teste",
	"email": "teste@mail.com",
	"phone": "100845678",
	"id": 1,
	"createdAt": "2023-05-24"
}
```

### Possíveis Erros:
| Código do Erro |       Descrição       |
|----------------|-----------------------|
| 409 Conflict   | Email already exists. |-> usuário com esse email já existe
| 409 Conflict   | Phone already exists. | ->usuário com esse telefona já existe

---

### 1.2. **Retorna usuário**

[ Voltar aos Endpoints ](#4-endpoints)

### `/users`

### Exemplo de Request:
```
GET /users
Host: https://eazy-contacts.onrender.com
Authorization: Bearer token
Content-type: application/json
```

### Corpo da Requisição:
```json
Vazio
```

### Exemplo de Response:
```
200 OK
```
```json
{
	"name": "teste",
	"email": "teste@mail.com",
	"phone": "100845678",
	"id": 1,
	"createdAt": "2023-05-24"
}
```
---

### 1.3. **Atualiza usuário**

[ Voltar aos Endpoints ](#4-endpoints)

### `/users`

### Exemplo de Request:
```
PATCH /users
Host: https://eazy-contacts.onrender.com
Authorization: Bearer token
Content-type: application/json
```

### Corpo da Requisição:
```json
{
	"email": "novo@mail.com"
}
```

### Exemplo de Response:
```
200 OK
```
```json
{
	"name": "teste",
	"email": "novo@mail.com",
	"phone": "100845678",
	"id": 1,
	"createdAt": "2023-05-24"
}
```
 ### Possíveis Erros:
| Código do Erro |       Descrição       |
|----------------|-----------------------|
| 409 Conflict   | Email already exists. |-> usuário com esse email já existe

### 1.4. **Deleta usuário**

[ Voltar aos Endpoints ](#4-endpoints)

### `/users`

### Exemplo de Request:
```
DELETE /users
Host: https://eazy-contacts.onrender.com
Authorization: Bearer token
Content-type: application/json
```

### Corpo da Requisição:
```json
vazio
```

### Exemplo de Response:
```
204 NO CONTENT
```
```json
vazio
```

## 2. **Login**
[ Voltar para os Endpoints ](#5-endpoints)

### Endpoints

| Método   | Rota       | Descrição                               |
|----------|------------|-----------------------------------------|
| POST     | /login     | Retorno do token de login de um usuário.|

---

### 2.1. **Criação token**

[ Voltar para os Endpoints ](#5-endpoints)

### `/login`

### Exemplo de Request:
```
POST /users
Host: https://eazy-contacts.onrender.com
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:
```json
{
	"email": "teste@mail.com",
	"password": "1234"
}
```


### Exemplo de Response:
```
200 OK
```

```json
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTY4NDk0MDk2MywiZXhwIjoxNjg1MDI3MzYzLCJzdWIiOiIzIn0.2HsTAfV2yfpOUiBhwv3oWU4avlnGj3mpq2-s9NFf5fg"
}
```

### Possíveis Erros:
| Código do Erro |       Descrição      |
|----------------|----------------------|
| 401 Conflict   | Invalid credentials. | -> nenhuma conta com o email informado
| 401 Conflict   | Invalid credentials. | -> senha informada incorreta

---
## 3. **Contacts**
[ Voltar para os Endpoints ](#4-endpoints)

O objeto Contact é definido como:

| Campo      | Tipo   | Descrição                                     |
| -----------|--------|-------------------------------------------------|
| id         | string | Identificador único do contato                  |
| name       | string | O nome do contato.                              |
| email      | string | O e-mail do contato.                            |
| createdAt  | date   | A data de criação do contato.                   |
| user       | user   | Usuário que criou o contato.                    |

### Endpoints

| Método   | Rota       | Descrição                               |
|----------|------------|-----------------------------------------|
| POST     | /contact   | Criação de um contato.                  |
| GET      | /contacts  | Retornar todos os contatos do usuário   |
| PATCH    | /contacts/id | Atualiza um contato específico        |
| DELETE   | /contacts/id | Deleta um contato específico          |

---

## Schema contato

```
export const contactSchema = z.object({
    name: z.string().min(2).max(45),
    email: z.string().email().max(45),
    phone: z.string().min(8).max(13),
  });
```
---

### 3.1. **Criação de contato**

[ Voltar para os Endpoints ](#4-endpoints)

### `/contacts`

### Exemplo de Request:
```
POST /contacts
Host: https://eazy-contacts.onrender.com
Authorization: Bearer token
Content-type: application/json
```

### Corpo da Requisição:
```json
{
	"name": "testeContato",
	"email": "contato@mail.com",
    "phone": "100115678",
}
```


### Exemplo de Response:
```
201 Created
```

```json
{
	"name": "testeContato",
	"email": "contato@mail.com",
    "phone": "100115678",
	"id": 1,
	"createdAt": "2023-05-24",
    "user": {
        "name": "teste",
        "email": "novo@mail.com",
        "phone": "100845678",
        "id": 1,
        "createdAt": "2023-05-24"
	}
}
```

### Possíveis Erros:
| Código do Erro |       Descrição       |
|----------------|-----------------------|
| 401 Unauthorized  | jwt must be provided.  | ->token necessário
| 409 Conflict   | Email already exists. | -> contato com esse email já existente
| 409 Conflict   | Phone already exists. | ->contato com esse número já existente
---

### 3.2. **Lista contatos**

[ Voltar aos Endpoints ](#4-endpoints)

### `/contacts`

### Exemplo de Request:
```
GET /contacts
Host: https://eazy-contacts.onrender.com
Authorization: Bearer token
Content-type: application/json
```

### Corpo da Requisição:
```json
Vazio
```

### Exemplo de Response:
```
200 OK
```
```json
[
{
	"name": "testeContato",
	"email": "contato@mail.com",
    "phone": "100115678",
	"id": 1,
	"createdAt": "2023-05-24"
}
]
```
---

### 3.3. **Atualiza contato**

[ Voltar aos Endpoints ](#4-endpoints)

### `/contacts/id`

### Exemplo de Request:
```
PATCH /contacts/1
Authorization: Bearer token
Content-type: application/json
```

### Corpo da Requisição:
```json
{
	"email": "novoContato@mail.com"
}
```

### Exemplo de Response:
```
200 OK
```
```json
{
	"name": "testeContato",
	"email": "novoContato@mail.com",
    "phone": "100115678",
	"id": 1,
	"createdAt": "2023-05-24"
}
```
 ### Possíveis Erros:
| Código do Erro |       Descrição       |
|----------------|-----------------------|
| 401 Unauthorized  | jwt must be provided.  | ->token necessário
| 409 Conflict   | Email already exists. | -> contato com esse email já existente
| 409 Conflict   | Phone already exists. | ->contato com esse número já existente
| 404 Forbidden  | You don't have permission.  | ->contato não é do usuário


### 4.4. **Deleta contato**

[ Voltar aos Endpoints ](#4-endpoints)

### `/contacts/id`

### Exemplo de Request:
```
DELETE /contacts/1
Host: https://eazy-contacts.onrender.com
Authorization: Bearer token
Content-type: application/json
```

### Corpo da Requisição:
```json
vazio
```

### Exemplo de Response:
```
204 NO CONTENT
```
```json
vazio
```