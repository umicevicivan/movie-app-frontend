import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ListModel } from '../models/list.model';
import { MovieListWrapperModal } from '../models/movie-list-wrapper.modal';

@Injectable({
    providedIn: 'root'
})
export class ApplicationService {

    constructor(private http: HttpClient, private cookieService: CookieService, private router: Router,
                private alertController: AlertController) {
    }

    createList(name: string): Observable<any> {
        return this.http.post('http://localhost:8080/api/list', name);
    }

    fetchLists(): Observable<ListModel[]> {
        return this.http.get<ListModel[]>('http://localhost:8080/api/list/all');
    }

    getList(name: string): Observable<ListModel> {
        return this.http.get<ListModel>(`http://localhost:8080/api/list/${name}`);
    }

    addMovie(wrapper: MovieListWrapperModal): Observable<any> {
        return this.http.post('http://localhost:8080/api/list/add-movie', wrapper);
    }

    fetchAddedLists(apiId: number): Observable<ListModel[]> {
        return this.http.get<ListModel[]>(`http://localhost:8080/api/list/${apiId}`);
    }
}
