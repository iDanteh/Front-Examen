import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../models/Users';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from '../../modals/user-dialog/user-dialog.component';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  @Input() usuarioNav!: Usuario;
  @Output() openModalAddChild = new EventEmitter<void>();

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
      data: this.usuarioNav
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

}
