export interface HashProvider {
    payLoad(hash:string) : string;
    verifyHash(hash:string, payLoad:string) : boolean;
}