import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/users/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  ping() {
    this.authService.pingServer().subscribe();
  }
}
