import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.css']
})
export class VerifyAccountComponent implements OnInit {
  token: String;
  isVerificationSuccessful: boolean;
  message = '';

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.token = this.route.snapshot.params['token'];
    this.authService.verifyUser(this.token).subscribe(
      (successResponse) => {
        this.isVerificationSuccessful = true;
        this.message = successResponse['message'];
      },
      (errorResponse) => {
        this.isVerificationSuccessful = false;
        this.message = errorResponse.error.message;
      });
  }

  isTokenExpired() {
    return this.message.toLowerCase() === 'token expired';
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    this.authService.resendVerificationToken(email).subscribe(
      (successResponse) => {
        this.message = successResponse['message'];
      },
      (errorResponse) => {
        this.message = errorResponse.error.message;
      }
    );
  }

}
