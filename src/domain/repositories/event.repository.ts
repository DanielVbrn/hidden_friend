import { BaseRepository } from "./base.repository";
import Event from "../entities/event.entity";

export interface EventRepository extends BaseRepository<Event> {
    listEvents():Event[];
    findByEmail(email:string): Promise<Event | null>
}