import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  signUpSelected = true;

  constructor() { }

  ngOnInit() {
  }

  onToggle() {
    this.signUpSelected = !this.signUpSelected;
  }
}
