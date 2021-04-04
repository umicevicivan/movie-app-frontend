import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.url.includes(environment.baseTMDBUrl)) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMGYwNTA3NjExMjJhMDJmZjg5OGVmMTFhZWZjNTljOCIsInN1YiI6IjVmZDRjNzFjNzQ1MDdkMDAzZjVhZmFkMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lbzfG2UhG2g7WN9P5OTtaJanpMY_0vlVMgLARdujYIs`,
        },
      });
    }
    return next.handle(request);
  }
}
