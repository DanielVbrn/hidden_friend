import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, JoinColumn } from "typeorm";
import Event from "./event.entity";

@Entity()
class User {
    @PrimaryGeneratedColumn('increment')
    id: number

    @ManyToOne(() => Event, (event) => event.users, { nullable: false })
    @JoinColumn({ name: "id" }) 
    event: Event; 

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    hashedPassword:string

    @Column()
    preferences: string



    constructor(event: Event, name: string, email: string, preferences: string) {
        this.event = event;
        this.name = name;
        this.email = email;
        this.preferences = preferences;
    }
}

export default User