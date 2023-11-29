# NestJS RESTful API

Esse projeto é um aplicativo baseado em NestJS que fornece uma API RESTful para gerenciar um catálogo de filmes e usuários.

# Tecnologias

1. TypeScript
2. Nest.js
3. TypeORM
4. Swagger
5. Docker
6. Redis
7. PostgreSQL

## Installation

1. Clone o repositório:

   ```bash
   git clone <repository-url>

## Execute o Docker Compose:
1. Abrir o terminal no docker-compoose.yml
2. Executar o comando `docker exec -ti db bash`
3. Executar o comando `psql -h localhost -U postgres -p 5432`

## Uso

Você pode interagir com a API usando o Swagger embutido no aplicativo ou ferramentas como o Postman ou qualquer cliente HTTP.

## API Endpoints

### Movies

#### Criar Filme

**Endpoint**: `POST /api/movies`

**Request Body:**
```json
{
  "title": "Titulo Filme",
  "category": "Ação",
  "description": "Descrição do filme",
  "date": "2023-01-01", 
  "trailer": "http://exemplo.com/trailer"
}
```
Response:
```json
{
  "id": 1,
  "title": "Titulo Filme",
  "category": "Ação",
  "description": "Descrição do filme",
  "date": "2023-01-01T00:00:00.000Z",
  "trailer": "http://exemplo.com/trailer"
} 
```

#### Buscar Todos os Filmes

**Endpoint**: `GET /api/movies`

Response:
```json
[
  {
    "id": 1,
    "title": "Titulo Filme",
    "category": "Ação",
    "description": "Descrição do filme",
    "date": "2023-01-01T00:00:00.000Z",
    "trailer": "http://exemplo.com/trailer"
  },
  // ...
] 
```
#### Buscar Filme por ID

**Endpoint**: `GET /api/movies/:id`

Response:
```json
{
  "id": 1,
  "title": "Titulo Filme",
  "category": "Ação",
  "description": "Descrição do filme",
  "date": "2023-01-01T00:00:00.000Z",
  "trailer": "http://exemplo.com/trailer"
}
```

### Atualizar Filme por ID


**Endpoint**: `PUT /api/movies/:id`

**Request Body:**
```json
{
  "title": "Titulo Filme Atualizado",
  "category": "Ação Atualizado",
  "description": "Descrição do filme Atualizado",
  "date": "2023-01-02", 
  "trailer": "http://exemplo.com/trailer-atualizado"
}
```
Response:
```json
{
  "id": 1,
  "title": "Titulo Filme Atualizado",
  "category": "Ação Atualizado",
  "description": "Descrição do filme Atualizado",
  "date": "2023-01-02T00:00:00.000Z",
  "trailer": "http://exemplo.com/trailer-atualizado"
}
```

#### Deletar Movie por ID

**Endpoint**: `DELETE /api/movies/:id`

Sem request body. Retorna status 204 se bem sucedido.


### Users

#### Criar Usuário

**Endpoint:** `POST /api/users`

**Request Body:**
```json
{
  "name": "Nome do Usuário",
  "email": "usuario@email.com"
}
```
Response:
```json
{
  "id": 1,
  "name": "Nome do Usuário",
  "email": "usuario@email.com",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z",
  "deletedAt": null
}
```
#### Buscar todos os Usuários

**Endpoint:** `GET /api/users`

Response:
```json
[
  {
    "id": 1,
    "name": "Nome do Usuário",
    "email": "usuario@email.com",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z",
    "deletedAt": null
  },
  // ...
]
```
#### Buscar Usuário por ID

**Endpoint:** `GET /api/users/:id`

Response:
```json
{
  "id": 1,
  "name": "Nome do Usuário",
  "email": "usuario@email.com",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z",
  "deletedAt": null
}
```
#### Atualizar Usuário por ID

**Endpoint:** `PUT /api/users/:id`

**Request Body:**
```json
{
  "name": "Novo Nome do Usuário",
  "email": "novousuario@email.com"
}
```
Response:
```json
{
  "id": 1,
  "name": "Novo Nome do Usuário",
  "email": "novousuario@email.com",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-02T00:00:00.000Z",
  "deletedAt": null
}
```
#### Deletar Usuário por ID

**Endpoint:** `DELETE /api/users/:id`

Response: Status Code 204 se bem sucedido, sem request body. 


### Entidades

#### User Entity

- **Campos:**
  - `id` (Chame Primária)
  - `name` (String, not nullable)
  - `email` (String, not nullable)
  - `createdAt` (Date, automaticamente gerado na criação)
  - `updatedAt` (Date, automaticamente gerado na alteração)
  - `deletedAt` (Date, automaticamente gerado na deleção)

#### Movie Entity

- **Campos:**
  - `id` (Chave Primária)
  - `title` (String, not nullable)
  - `category` (String, not nullable)
  - `description` (String, not nullable)
  - `date` (Date, not nullable)
  - `trailer` (String, nullable)

## Running Tests
Para rodar os testes do aplicativo, execute o comando:

```bash
npm run test
```

Licença
Esse projeto é licenciado sob a Licença da MIT.

### Nota para o Avaliador: 
Não consegui implementar o Swagger, Redis e o deploy puramente por decorrência do prazo, pois estive trabalhando durante esse período.
Porém, caso seja do interesse de vocês, me fornecer mais um dia apenas, eu implementarei esses requisitos faltantes com o maior prazer!

Tempo de Experiência nas tecnologias do projeto:

1. TypeScript - Próximo de 1 ano.
2. Nest.js - Primeira experiência ao desenvolver esse desafio.
3. TypeORM - Primeira experiência ao desenvolver esse desafio.
4. Swagger - Próximo de 1 ano.
5. Docker - 6 meses.
6. Redis - Primeira experiência ao desenvolver esse desafio.
7. PostgreSQL - 6 meses.

--> Eu simplesmente AMEI desenvolver com essas tecnologias, adoraria ter a oportunidade de trabalhar com elas!

Expectativa salarial:
R$ 2.800,00.
