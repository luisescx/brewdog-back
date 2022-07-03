# Authentication API

- The API does a CRUD of users.
- Authenticated routes.

## Technologies

- NodeJs
- TypeScript
- TypeORM
- Postgres
- Docker
- Bcryptjs
- Jsonwebtoken

### Remarks:

- The project uses `Docker` to execute the application and the database in a container, you must have docker installed in your machine.
- The `postgres` in the container runs in the `5432` port, the same port from the default `postgres`, if you are running postgres locally, stop the postgres service. 

### How to run:

- Clone the project and execute `yarn` in the root folder.
- Execute `docker compose up`.
- Run the migrations to update the database with `yarn migration:run`. 

### Rotas:

- http://localhost:3333/users/create
- Unauthenticated route for user creation
- POST Method
- JSON Body

```bash
{
	"username": "johnDoe",
	"password": "12345"
}
```

---

- http://localhost:3333/sessions
- Unauthenticated route for user login, `returns the token that needs to be used in authenticated routes`
- POST Method
- JSON Body

```bash
{
	"username": "johnDoe",
	"password": "12345"
}
```

---

- http://localhost:3333/users/getById/:id
- Authenticated route that returns the user, `needs token`
- GET Method

---

- http://localhost:3333/users/getByUsername/:username
- Authenticated route that returns the user by its username, `needs token`
- GET Method

---

- http://localhost:3333/users/update/:id
- Authenticated route that updates the user by its ID, `needs token`
- PATCH method
- JSON body

```bash
{
	"username": "john",
	"password": "doe"
}
```

---

- http://localhost:3333/users/delete/:id
- Authenticated route to delete the user by its ID, `need token`
- Método DELETE

---

- http://localhost:3333/users/list
- Authenticated route that list all users, `needs token`
- GET method
