import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
    private tokenKey = 'AuthenticationSystemAppJWT';

    constructor(private httpClient: HttpClient, private router: Router) { }

    isAuthenticated() {
        return sessionStorage.getItem(this.tokenKey) ? true : false;
    }

    getToken() {
        return sessionStorage.getItem(this.tokenKey) || '';
    }

    setToken(token: string) {
        sessionStorage.setItem(this.tokenKey, token);
    }

    removeToken() {
        sessionStorage.removeItem(this.tokenKey);
    }

    signin(email: string, password: string) {
        return this.httpClient.post('/api/auth/signin', { email, password });
    }

    logout() {
        this.removeToken();
        this.router.navigate(['auth', 'signin']);
    }

    signup(username: string, email: string, password: string) {
        return this.httpClient.post('/api/auth/signup', { username, email, password });
    }

    verifyUser(token: String) {
        return this.httpClient.get('/api/auth/verify/' + token);
    }

    resendVerificationToken(email: string) {
        return this.httpClient.post('/api/auth/verification-link', { email });
    }

    pingServer() {
        return this.httpClient.get('/api/ping');
    }
}