import { Person } from './person.model';

export class Credits {
  id: number;
  cast: Person[];
  crew: Person[];

  constructor(c: any) {
    this.id = c.id;
    this.cast = c.cast;
    this.crew = c.crew;
  }
}
