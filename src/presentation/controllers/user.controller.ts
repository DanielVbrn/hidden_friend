import { Request, Response } from "express";
import User from "../../domain/entities/user.entity";
import { AppDataDource } from "../../database";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export class UserController {
    static getAllUsers = async (req:Request, res:Response) => {
        const user =  await AppDataDource.getRepository(User).find()
        if(!user){
            res.json({message:"No users found"}).status(400)
        }
        res.json(user);
    }


    static login = async (request: Request, response: Response) => {
        const { email, password } = request.body;
    
        const user = await AppDataDource.getRepository(User).findOne({
          where: {
            email,
          },
        });
    
        if (!user) {
            response.status(404).json({ message: "User not found." });
        }
    
        if (await bcrypt.compare(password, user!.hashedPassword)) {
          const token = jwt.sign({ id: user!.id }, 'sadasda214321sdasd', {
            expiresIn: "1d",
          });
    
          const data = {
            id: user!.id,
            name: user!.name,
            email: user!.email,
            token,
          };
    
            response.json(data);
        } else {
            response.status(404).json({ message: "Usuário não encontrado." });
        }
      };

    static registerUser = async (request: Request, response: Response) => {
        const { name, email, password } = request.body;
    
        const existingUser = await AppDataDource.getRepository(User).findOne({ where: { email } });
    
        if (existingUser) {
           response.status(400).json({ message: "Usuário já cadastrado com esse email." });
        }
    
        if (password.length < 8) {
           response.status(400).json({ message: "A senha deve ter no mínimo 8 caracteres." });
        }
    
        const passwordHash = await bcrypt.hash(password, 8);
    
        const user = await AppDataDource.getRepository(User).save({
          name,
          email,
          password: passwordHash,
        });
    
        response.json(user);
    };
    
}