import { EventRepository } from "../domain/repositories/event.repository";
import { UserRepository } from "../domain/repositories/user.repository";
import { HashProvider } from "./providers/hash.provider";
import { TokenProvider } from "./providers/token.provider";

export interface SignInRequest {
    email:string;
    password:string;
}


export interface SignInResponse {
    token: string;
    refreshToken: string;
    eventName: string
}


export class SignInCommand {
    constructor(
    private hashProvider: HashProvider,
    private tokenProvider: TokenProvider,
    private repoEvent: EventRepository
    ) {}

    async execute(request: SignInRequest): Promise<SignInResponse> {
        const event = await this.repoEvent.findByEmail(request.email);
        if (!event) {
            throw new Error("Usuário e/ou Senha incorreto(s)");
        }

        const isEvent = this.hashProvider.verifyHash(event.email, request.password);

        if (!isEvent) {
            throw new Error("Usuário e/ou Senha incorreto(s)");
        }

        const accessToken = this.tokenProvider.encode(event.email, "10m");
        const refreshToken = this.tokenProvider.encode(event.email, "1d");

        return {     
            token: accessToken,
            refreshToken: refreshToken,
            eventName: event.name
        };
    }
}
