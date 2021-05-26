import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserModel} from '../models/user.model';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private moviesapp = 'moviesapp';
    private secret = 'secret';

    constructor(private http: HttpClient) {
    }

    login(form) {
        console.log('forma:', form);
        // let params = new URLSearchParams();
        // params.append('grant_type','authorization_code');
        // params.append('client_id', this.moviesapp);
        // params.append('client_secret', this.secret);

        // let headers =
        //     new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'});

        // const headers = new HttpHeaders({ 'Authorization': 'Basic ' + 'bW92aWVzYXBwOnNlY3JldA==',
        //     'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'} );
        const headers = new HttpHeaders({
            'Authorization': 'Basic bW92aWVzYXBwOnNlY3JldA==',
            'Accept': '*/*',
            'Content-Type': 'multipart/form-data; boundary=--------------------------145032037776908835705708',
            // 'Content-Type': 'application/x-www-form-urlencoded'
        });
        const formData = new FormData();
        formData.append('username', form.get('username').value);
        formData.append('password', form.get('password').value);
        console.log(formData);
        // const body = JSON.stringify(user);

        return this.http.post('http://localhost:8080/oauth/token?grant_type=password', formData, {headers});
    }

    loggedIn() {
        const token = localStorage.getItem('token');
        return !token;
    }

    register(data: UserModel): Observable<UserModel> {
        return this.http.post<UserModel>('http://localhost:8080/api/user/register', data);
    }
}
