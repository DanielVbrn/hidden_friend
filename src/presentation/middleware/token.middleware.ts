import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { TokenProvider } from "../../application/providers/token.provider";
import { UserRepository } from "../../domain/repositories/user.repository";


export class AuthToken  {
    static tokenMiddleware = (
        req: Request,
        res: Response,
        next: NextFunction) => {
        const auth = req.headers.authorization;
        if (!auth) throw new Error("Não Autorizado!");

        const tokenProvider = container.resolve<TokenProvider>("TokenProvider");

        const [_, token] = auth!.split(" ");

        const email = tokenProvider.decode(token);

        // Pegar user no BD
        const userRepo = container.resolve<UserRepository>("UserRepository");
        const user = userRepo.findByEmail(email);

        if (!user) throw new Error("Não Autorizado!");

        // usuário ficará disponível na request

        next();
    }
}