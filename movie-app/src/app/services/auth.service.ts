import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from '../models/user.model';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient,
                private cookieService: CookieService,
                private router: Router,
                private alertService: AlertService) {
    }

    login(form) {
        const params = new URLSearchParams();
        params.append('username', form.get('username').value);
        params.append('password', form.get('password').value);
        params.append('grant_type', 'password');
        params.append('client_id', 'moviesapp');

        const headers =
            new HttpHeaders({
                'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
                Authorization: 'Basic ' + btoa('moviesapp:secret')
            });
        const options = {
            headers
        };

        // NJNJJJJJNJNJNJJNJNJNJNJNJNJN
        // JEBEMSEUSTA...

        this.http.post('http://localhost:8080/oauth/token', params.toString(), options)
            .subscribe(
                (data: any) => {
                    localStorage.setItem('token', data.access_token);
                    // this.cookieService.set('token', data.access_token);
                    setTimeout(() => {
                        this.router.navigate(['/tabs']);
                    }, 1000);
                },
                err => this.alertService.warning('Login failed', 'Check if username and password are correct.'));
    }

    loggedIn() {
        const token = localStorage.getItem('token');
        return !!token;
    }

    register(data: UserModel) {
        this.http.post('http://localhost:8080/api/user/register', data).subscribe(res => {
                if (res) {
                    this.router.navigateByUrl('/login');
                }
            },
            (error) => this.alertService.warning('Register failed', error.error.apierror.message)
        );
    }

    getToken() {
        return localStorage.getItem('token');
    }

    logOut(): void {
        localStorage.clear();
        this.router.navigateByUrl('');
    }
}
