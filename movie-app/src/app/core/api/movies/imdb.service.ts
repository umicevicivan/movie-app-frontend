import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMDBMovie } from './movie';

@Injectable({
    providedIn: 'root'
})
export class ImdbService {

    constructor(public http: HttpClient) {
    }

    findById(id: string): Observable<IMDBMovie> {
        return this.http.get<IMDBMovie>(`http://www.omdbapi.com/?i=${id}&apikey=84f4dc28`);
    }

}
