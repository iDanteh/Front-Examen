import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../models/Users';
import { UserDialogComponent } from '../../modals/user-dialog/user-dialog.component';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatDialogModule

  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  @Input() usuarioNav!: Usuario;
  @Output() openModalAddChild = new EventEmitter<void>();
  vistaEstados: boolean = false;
  http = inject(HttpClient);
  

  constructor(private router: Router, public dialog: MatDialog) { }

  cerrarSesion(){
    this.router.navigate(['login']);
  }

  triggerOpenModalAdd() {
    this.openModalAddChild.emit();
  }

  openModalViewUser(){
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '500px',
      height: '400px',
      data: {usuario: this.usuarioNav, agregar: false}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result.mensage === 'actualizar') {
        //actualizar usuario
        this.http.put(`http://127.0.0.1:8000/api/actualizarUsuario/${result.usuario.id}`, result.usuario).subscribe((data) => {
          console.log(data);
        });
      }
      if (result.mensage === 'eliminar') {
        //eliminar usuario
        this.http.delete(`http://127.0.0.1:8000/api/eliminarUsuario/${result.usuario.id}`).subscribe((data) => {
          console.log(data);
        });
        this.router.navigate(['login']);
      }
    });
  }

  vistaUsuario(){
    this.vistaEstados = true;
    this.router.navigate(['vistaUsuarios', this.usuarioNav]);

  }

  vistaAnimales(){
    this.vistaEstados = false;
    this.router.navigate(['vista', this.usuarioNav]);

    

  }

}
