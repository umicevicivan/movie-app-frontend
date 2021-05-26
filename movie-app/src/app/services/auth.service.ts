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
        let params = new URLSearchParams();
        params.append('username', form.get('username').value);
        params.append('password', form.get('password').value);
        params.append('grant_type','password');
        params.append('client_id','moviesapp');

        let headers =
            new HttpHeaders({
                'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
                'Authorization': 'Basic ' + btoa("moviesapp:secret")
            });
        let options = {
            headers: headers
        };

        // NJNJJJJJNJNJNJJNJNJNJNJNJNJN

        this.http.post('http://localhost:8080/oauth/token', params.toString(), options)
            .subscribe(
                data => console.log(data),
                err => alert('Invalid Credentials'));

    }

    loggedIn() {
        const token = localStorage.getItem('token');
        return !token;
    }

    register(data: UserModel): Observable<UserModel> {
        return this.http.post<UserModel>('http://localhost:8080/api/user/register', data);
    }
}
