import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  message = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const username = form.value.username;
    const email = form.value.email;
    const password = form.value.password;
    if (!username || !email || !password) {
      this.message = 'Please provide username, email and password';
      return;
    }
    this.authService.signup(username, email, password).subscribe(
      (successResponse) => {
        this.message = successResponse['message'];
      },
      (errorResponse) => {
        this.message = errorResponse.error.message;
      }
    )
  }

}
