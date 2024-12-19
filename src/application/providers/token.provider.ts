export interface TokenProvider {
    encode(data:string, expiresIn: string): string;
    decode(token:string): string;
}