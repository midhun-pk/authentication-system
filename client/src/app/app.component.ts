import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'authentication-system';
  animationCompleted = false;

  constructor() {
    setTimeout(() => {
      this.animationCompleted = true;
    }, 5000);
  }
}
