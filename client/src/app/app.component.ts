import { Component, OnInit } from '@angular/core';
import { AuthService } from './users/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'authentication-system';
  animationCompleted = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.animationCompleted = true;
    }, 5000);
    this.authService.pingServer().subscribe();
  }
}
