import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  @Output() openModalAddChild = new EventEmitter<void>();

  constructor(private router: Router) { }

  cerrarSesion(){
    this.router.navigate(['home']);
  }

  triggerOpenModalAdd() {
    this.openModalAddChild.emit();
  }

}
