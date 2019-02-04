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
        return this.httpClient.post('http://localhost:8080/api/auth/signin', { email, password });
    }

    logout() {
        this.removeToken();
        this.router.navigate(['auth', 'signin']);
    }

    signup(username: string, email: string, password: string) {
        return this.httpClient.post('http://localhost:8080/api/auth/signup', { username, email, password });
    }

    verifyUser(token: String) {
        return this.httpClient.get('http://localhost:8080/api/auth/verify/' + token);
    }

    resendVerificationToken(email: string) {
        return this.httpClient.post('http://localhost:8080/api/auth/verification-link', { email });
    }

    validateToken() {
        return this.httpClient.get('http://localhost:8080/api/auth/validate-token');
    }
}