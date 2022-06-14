import { Request, Response, Router } from "express";

const userRoutes = Router();

// const personController = new PersonsController();

userRoutes.get("/", (request: Request, response: Response) => {
  console.log("routes");
  return response.status(201).json("teste");
});

// userRoutes.get("/delete/:id", personController.deletePerson);

// userRoutes.post("/create", personController.createPerson);

// userRoutes.post("/update", personController.updatePerson);

export { userRoutes };
