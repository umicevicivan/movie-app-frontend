import { IPerson } from "../interfaces/person.interface";

export class Person implements IPerson{
    id: number;
    gender: number;
    known_for_department: string;
    name: string;
    original_name: string;
    profile_path: string;
    job: string;
    character: string;
}
