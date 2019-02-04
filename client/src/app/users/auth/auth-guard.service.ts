import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (route.routeConfig.path === 'signin' || route.routeConfig.path === 'signup') {
            if (!this.authService.isAuthenticated()) {
                return true;
            }
            this.router.navigate(['home']);
        }
        else {
            if (!this.authService.isAuthenticated()) {
                this.authService.logout();
                return false;
            }
            return true;
        }
    }
}