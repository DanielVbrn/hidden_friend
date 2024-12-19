import { Router } from "express";
import { UserController } from "../controllers/user.controller";


const routeUser = Router()


routeUser.get("/list", UserController.getAllUsers);


routeUser.post("/signin", UserController.login)

routeUser.post("/signup", UserController.registerUser)

export default routeUser;