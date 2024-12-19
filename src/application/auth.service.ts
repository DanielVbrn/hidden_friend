import { inject, injectable, TokenProvider } from "tsyringe";
import { UserRepository } from "../domain/repositories/user.repository";
import { HashProvider } from "./providers/hash.provider";

export interface SignUpCommandRequest {
    name:string;
    email:string;
    password:string;
    confirmPassword:string;
}

