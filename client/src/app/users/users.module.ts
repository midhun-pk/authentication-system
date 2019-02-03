import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UsersRoutingModule } from './users-routing.module';
import { AccountComponent } from './account/account.component';
import { AuthComponent } from './auth/auth.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { VerifyAccountComponent } from './account/verify-account/verify-account.component';


@NgModule({
  declarations: [AccountComponent, AuthComponent, SigninComponent, SignupComponent, VerifyAccountComponent],
  imports: [
    CommonModule,
    FormsModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
