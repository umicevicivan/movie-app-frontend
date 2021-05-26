import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService) {
    }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (request.url.includes(environment.baseTMDBUrl)) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${environment.code}`,
                },
            });
        }
        if (request.url.includes('localhost')) {
            request = request.clone({
                setParams: {
                    access_token: this.auth.getToken(),
                },
            });
        }
        return next.handle(request);
    }
}
