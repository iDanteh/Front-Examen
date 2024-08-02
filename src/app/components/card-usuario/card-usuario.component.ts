import { Component, Inject, Input } from '@angular/core';
import { Usuario } from '../../models/Users';

@Component({
  selector: 'app-card-usuario',
  standalone: true,
  imports: [],
  templateUrl: './card-usuario.component.html',
  styleUrl: './card-usuario.component.css'
})
export class CardUsuarioComponent {
  @Input() usuarioCard!: Usuario;

}
