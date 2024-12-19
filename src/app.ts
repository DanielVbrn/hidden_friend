import express, { Request, Response } from "express";
import {AppDataDource} from "./database";
import dotenv from "dotenv"
dotenv.config()


AppDataDource.initialize().then(() => {
    console.log("Databasa is running")
}).catch((err:any) => {
    console.log(`Error initialize database: \nError ${err}`)
})

const app = express();
const PORT = 3333;

app.get("/hello", (req:Request, res:Response) => {
    res.json({message:"Olá Mundo"}).status(200);
})

app.get("/hello/oi", (req:Request, res:Response)=> {
    res.json({message:"Rota oi"});
})

app.listen(PORT, () => {
    console.log(`Apliccation is running in port ${3333}\nhost: http://localhost:3333`);
})