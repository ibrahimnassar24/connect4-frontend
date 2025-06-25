import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  links: (string | undefined)[];
  constructor() {
    this.links = routes
      .filter(route => route.path && route.path !== '**' && route.path !== '')
      .map(route => route.path);
      console.log(this.links)
  }

}
