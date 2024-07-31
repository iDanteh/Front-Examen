import { Component, Input } from '@angular/core';
import { Animal } from '../../models/Animal';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() animalCard!: Animal;

  constructor() { }
}
