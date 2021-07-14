import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieList, MovieListWrapperModal } from '../movies/movie';

@Injectable({
    providedIn: 'root'
})
export class MovieListsService {

    constructor(private http: HttpClient) {
    }

    create(name: string): Observable<any> {
        return this.http.post('http://localhost:8080/api/list', name);
    }

    find(): Observable<MovieList[]> {
        return this.http.get<MovieList[]>('http://localhost:8080/api/list/all');
    }

    findByName(name: string): Observable<MovieList> {
        return this.http.get<MovieList>(`http://localhost:8080/api/list/${name}`);
    }

    addMovie(wrapper: MovieListWrapperModal): Observable<any> {
        return this.http.post('http://localhost:8080/api/list/add-movie', wrapper);
    }

    fetchAddedLists(apiId: number): Observable<MovieList[]> {
        return this.http.get<MovieList[]>(`http://localhost:8080/api/list/list-appearance/${apiId}`);
    }

    getQR(listName: string) {
        return this.http.get('http://localhost:8080/api/task/qr-code/clone-list', {responseType: 'blob' });
    }
}
