import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  @Output() openModalAddChild = new EventEmitter<void>();

  triggerOpenModalAdd() {
    this.openModalAddChild.emit();
  }

}
