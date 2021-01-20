import { Person } from "../models/person.model";

export interface ICredits{
    id: string,
    crew: Person[],
    cast: Person[]
}