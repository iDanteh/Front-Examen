import { ChangeDetectionStrategy, Component, inject, signal, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Animal } from '../../models/Animal';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CardComponent } from '../../components/card/card.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { EditarAnimalComponent } from '../../modals/editar-animal/editar-animal.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { Router } from '@angular/router';
import { AgregarAnimalComponent } from '../../modals/agregar-animal/agregar-animal.component';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../../models/Users';
import { UserDialogComponent } from '../../modals/user-dialog/user-dialog.component';
import { CardUsuarioComponent } from '../../components/card-usuario/card-usuario.component';

@Component({
  selector: 'app-vista-usuarios',
  standalone: true,
  imports: [CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatDatepickerModule,
    CardUsuarioComponent,
    NgxPaginationModule,
    NavBarComponent,
    MatGridListModule,],
  templateUrl: './vista-usuarios.component.html',
  styleUrl: './vista-usuarios.component.css'
})
export class VistaUsuariosComponent {

  http = inject(HttpClient);
  usuarios: Usuario[] = [];
  public page!: number;
  usuario: Usuario = {
    id: 0,
    nombre: '',
    correo: '',
    contrasena: '',
    urlimg: '/add_image.png',
  };

  constructor(public dialog: MatDialog, private router: Router, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.getUsuarios();
    this.route.params.subscribe(params => {
      this.usuario = {
        id: params['id'],
        nombre: params['nombre'],
        correo: params['correo'],
        contrasena: params['contrasena'],
        urlimg: params['urlimg'],
      };
    });
  }

  openModalEdit(usuario: Usuario) {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      height: '700px',
      width: '800px',
      data: {usuario: usuario, agregar: false}
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
      }
    });
  }

  openModalAdd() {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      height: '700px',
      width: '800px',
      data: { usuario: {
        id: 0,
        nombre: '',
        correo: '',
        contrasena: '',
        urlimg: '/add_image.png',
      }, agregar: true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result.mensage === 'agregar') {
        //agregar usuario
        this.http.post<Usuario[]>(`http://127.0.0.1:8000/api/newUser`, result.usuario).subscribe((data) => {
          this.usuarios = data;
          this.getUsuarios();
        });
      }
    }
    );
  }

  getUsuarios() {
    this.http.get<Usuario[]>('http://127.0.0.1:8000/api/allUsers').subscribe((data) => {
      this.usuarios = data;
    });
  }


}
