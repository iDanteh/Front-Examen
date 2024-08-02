import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { CardComponent } from './components/card/card.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, NavBarComponent, CardComponent,PaginatorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend-project';

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.navigate(['login']);
  }
}
