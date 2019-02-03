import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
    loggedIn = true;

    constructor(private httpClient: HttpClient) { }

    isAuthenticated() {
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.loggedIn);
            }, 800);
        });
        return promise;
    }

    getToken() {
        return sessionStorage.getItem('AuthenticationSystemAppJWT') || '';
    }

    setToken(token: string) {
        sessionStorage.setItem('AuthenticationSystemAppJWT', token);
    }

    signin(email: string, password: string) {
        return this.httpClient.post('http://localhost:8080/api/auth/signin', { email, password });
    }

    logout() {
        this.loggedIn = false;
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
}