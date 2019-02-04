import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  message = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    if (!email || !password) {
      this.message = 'Please provide email and password';
      return;
    }

    this.authService.signin(email, password).subscribe(
      (successResponse) => {
        this.authService.setToken(successResponse['token']);
        this.router.navigate(['home']);
      },
      (errorResponse) => {
        this.message = errorResponse.error.message;
      }
    )
  }

}
