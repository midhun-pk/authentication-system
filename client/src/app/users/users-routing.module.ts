import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { AuthComponent } from './auth/auth.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth-guard.service';
import { VerifyAccountComponent } from './account/verify-account/verify-account.component';

const routes: Routes = [
  {
    path: 'user', children: [
      { path: 'account', canActivate: [AuthGuard], component: AccountComponent },
      { path: 'verify/:token', component: VerifyAccountComponent }
    ]
  },
  {
    path: 'auth', component: AuthComponent, children: [
      { path: '', redirectTo: 'signin', pathMatch: 'full' },
      { path: 'signin', component: SigninComponent, data: { page: 'signin' } },
      { path: 'signup', component: SignupComponent, data: { page: 'signup' } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
