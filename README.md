# API de authenticação

- A API faz um CRUD de cadastro de usuários.
- Rotas autenticadas.

## Tecnologias utilizadas:

- NodeJs
- TypeScript
- TypeORM
- Postgres
- Docker
- Bcryptjs
- Jsonwebtoken

### Observações importantes:

- O Projeto usa `Docker` para executar a aplicação e o banco de dados em um container, é preciso ter o docker instalado na sua máquina.
- O `postgres` que será executado dentro do container roda na porta `5432`, a mesma porta padrão do `postgres`. Se estiver executando o postgres localmente, pare o serviço do postgres local para que possa ser executado no container na porta `5432`.

### Como executar:

- Clonar o projeto e executar o comando `yarn` na pasta raiz.
- Após instalar as depêndencias e com o `docker` rodando, executar o comando `docker compose up`. Esse comando irá subir o projeto e o banco de dados.
- Em outro terminal, na pasta raiz do projeto, executar o comando `yarn migration:run` para criar a entidade `users` no banco de dados.

### Rotas:

- http://localhost:3333/users/create
- Rota não autenticada para criação do usuário
- Método POST
- Body JSON

```bash
{
	"username": "johnDoe",
	"password": "12345"
}
```

---

- http://localhost:3333/users/sessions
- Rota não autenticada para login do usuário, `retorna o token que deve ser usado nas rotas autenticadas`
- Método POST
- Body JSON

```bash
{
	"username": "johnDoe",
	"password": "12345"
}
```

---

- http://localhost:3333/users/getById/:id
- Rota autenticada que retorna o usuário através de um ID, `não esquecer de usar o token`.
- Método GET

---

- http://localhost:3333/users/getByUsername/:username
- Rota autenticada que retorna o usuário através de um username, `não esquecer de usar o token`.
- Método GET

---

- http://localhost:3333/users/update/:id
- Rota autenticada para atualizar do usuário através do ID, `não esquecer de usar o token`
- Método PATCH
- Body JSON

```bash
{
	"username": "john",
	"password": "doe"
}
```

---

- http://localhost:3333/users/delete/:id
- Rota autenticada para excluir um usuário através do ID, `não esquecer de usar o token`
- Método DELETE

---

- http://localhost:3333/users/list
- Rota autenticada para listar todos os usuário através, `não esquecer de usar o token`
- Método GET
