import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, EntityNotFoundError, OneToMany } from "typeorm";
import User from "./user.entity";


@Entity() 
export default class Event {
    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column()
    name:string;

    @Column()
    email:string;

    @Column()
    secret:string;

    @OneToMany(() => User, (user => user.event))
    users:User

    constructor(name:string, email:string, secret:string) {
        this.name = name;
        this.email = email;
        this.secret = secret;
    }
}

