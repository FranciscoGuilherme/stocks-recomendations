# Stocks Recommendations

[![Node.js](https://img.shields.io/badge/Node.js-20-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![pgvector](https://img.shields.io/badge/pgvector-enabled-4169E1)](https://github.com/pgvector/pgvector)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)](https://docs.docker.com/compose/)

API em TypeScript para explorar recomendações de ações com base em perfis de investidores. O projeto combina uma API Express, persistência em PostgreSQL com pgvector e um protótipo de modelo de recomendação com TensorFlow.js.

> **Status:** em desenvolvimento. A infraestrutura e o domínio estão em construção; o fluxo de recomendação ainda não está completo. Atualmente, `GET /users` é um endpoint demonstrativo e não consulta o banco de dados.

## Funcionalidades e tecnologias

- API HTTP com Express 5 e TypeScript.
- Persistência PostgreSQL e suporte a vetores com pgvector.
- Modelo neural experimental usando TensorFlow.js.
- Migrações de banco de dados com Sequelize CLI.
- Testes com Jest.
- Ambiente de desenvolvimento com Docker Compose.

## Requisitos

- Node.js 20 ou superior e npm, para execução local; ou
- Docker e Docker Compose, para executar os serviços em contêineres.

## Executar com Docker

Na raiz do projeto:

```bash
docker compose up --build
```

O Compose inicia a API na porta `8080` e o PostgreSQL 16 com pgvector. Depois que os serviços estiverem em execução, aplique as migrações:

```bash
docker compose exec stocks-recomendations npm run db:migrate
```

Para encerrar os serviços:

```bash
docker compose down
```

Os dados do PostgreSQL ficam no volume `postgres_data` e são preservados ao encerrar os contêineres.

## Executar localmente

Tenha um PostgreSQL 16 com a extensão pgvector disponível e configure as variáveis de ambiente. O arquivo `src/infra/database/config.js` carrega variáveis de um arquivo `.env` na raiz, se existir.

Exemplo de configuração para desenvolvimento local:

```env
NODE_ENV=development
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_NAME=stocks_recommendations
POSTGRES_USER=stocks
POSTGRES_PASSWORD=stocks_dev
```

Instale as dependências, aplique as migrações e inicie a API:

```bash
npm install
npm run db:migrate
npm run dev
```

A API ficará disponível em `http://localhost:8080`.

> As credenciais acima são apenas valores de desenvolvimento. Use credenciais apropriadas para qualquer ambiente compartilhado ou de produção.

## API

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/users` | Endpoint demonstrativo; atualmente retorna uma mensagem fixa. |

Exemplo:

```bash
curl http://localhost:8080/users
```

Resposta atual:

```json
{
  "message": "All users retrieved"
}
```

## Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia a aplicação em modo de desenvolvimento. |
| `npm run build` | Compila o TypeScript para `dist/`. |
| `npm start` | Inicia a aplicação compilada. |
| `npm test` | Executa a verificação de tipos e os testes Jest. |
| `npm run db:migrate` | Aplica migrações pendentes. |
| `npm run db:migrate:undo` | Reverte a migração mais recente. |
| `npm run db:migrate:status` | Exibe o status das migrações. |

## Estrutura do projeto

```text
src/
├── core/       # Entidades, eventos e serviços de domínio
├── infra/      # API, banco de dados, modelos e repositórios
└── server.ts   # Inicialização da aplicação
docs/           # Documentação complementar
```

## Contribuição

Contribuições são bem-vindas. Para mudanças maiores, abra uma issue para discutir a proposta antes de iniciar a implementação. Antes de enviar alterações, execute:

```bash
npm test
npm run build
```
