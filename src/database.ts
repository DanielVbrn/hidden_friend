import "reflect-metadata"
import { DataSource } from "typeorm";



export const AppDataDource = new DataSource({
    type:"postgres",
    host:"localhost",
    port:5432,
    username:"daniel_psql",
    password:"vitor158",
    database:'hidden_friend_db',
    
    synchronize:true,
    entities:["src/domain/entities/*.entity.ts"],
    migrations: ["src/persistence/typeorm/migrations/**/*.ts"],
});

