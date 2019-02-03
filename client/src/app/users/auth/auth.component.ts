import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import {
  transition,
  trigger,
  query,
  style,
  animate,
  group,
  animateChild,
  keyframes
} from '@angular/animations';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  animations: [
    trigger('animRoutes', [
      transition('* <=> *', [
        group([
          query(
            ':enter',
            [
              animate(
                '0.3s linear',
                keyframes([
                  style({ opacity: 0, offset: 0 }),
                  style({ opacity: 0, offset: 0.9 }),
                  style({ opacity: 1, offset: 1 })
                ])
              ),
              animateChild()
            ],
            { optional: true }
          ),
          query(
            ':leave',
            [
              animate(
                '.3s linear',
                keyframes([
                  style({ opacity: 1, offset: 0 }),
                  style({ opacity: 1, offset: 0.9 }),
                  style({ opacity: 0, offset: 1 })
                ])
              ),
              animateChild()
            ],
            { optional: true }
          )
        ])
      ])
    ])
  ]
})
export class AuthComponent implements OnInit {
  signUpSelected: Boolean;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.signUpSelected = this.router.url.endsWith('signup');
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.signUpSelected = event.url.endsWith('signup');
      }
    });

  }

  getRoute(outlet: RouterOutlet) {
    return outlet.activatedRouteData.page;
  }

}
