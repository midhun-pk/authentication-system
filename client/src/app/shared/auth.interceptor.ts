import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../users/auth/auth.service';
import { tap } from 'rxjs/operators'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const requestCopy = request.clone({
            headers: request.headers.set('authorization', 'Bearer ' + this.authService.getToken())
        });
        return next.handle(requestCopy)
            .pipe(tap(event => { },
                error => {
                    if (error.status === 401) {
                        this.authService.logout();
                    }
                }))
    }
}