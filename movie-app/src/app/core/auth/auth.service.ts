import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from '../api/users/user.model';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { NotifyService } from '../util/notify.service';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient,
                private cookieService: CookieService,
                private router: Router,
                private notifyService: NotifyService,
                private toastService: NotifyService) {
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
                    setTimeout(() => {
                        this.router.navigate(['/tabs']);
                    }, 1000);
                    this.toastService.success('Successfully logged in!');
                },
                err => this.notifyService.alert('Login failed', 'Check if username and password are correct.', err.error.message));
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
            (error) => this.notifyService.message('Register failed ' + error.error.apierror.message)
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
