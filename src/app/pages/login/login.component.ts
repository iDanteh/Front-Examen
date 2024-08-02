import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../../models/Users';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import {
  MatSnackBar, MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    CommonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router, private dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ingresarEstado: boolean = true;
  hide = signal(true);
  user: string = '';
  password: string = '';
  http = inject(HttpClient);
  usuario: Usuario = {
    nombre: '',
    correo: '',
    contrasena: '',
  };
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';



  ngOnInit(): void {

  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  ingresar() {
    if (!(this.validarCorreoELectronico(this.usuario.correo))){
      this._snackBar.open("Correo no valido", "Cerrar", {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 2 * 1000,
        panelClass: ['mat-toolbar']
      });
    }
    else{
    this.http.post<any>(`http://127.0.0.1:8000/api/login`, {
      "correo": this.usuario.correo,
      "contraseña": this.usuario.contrasena
  }).subscribe((data) => {
      if(data.message == 'Usuario Correcto'){
        this.router.navigate(['vista']);
      } else if (data.message == 'Usuario no encontrado'){
        this._snackBar.open("Usuario no encontrado", "Cerrar", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 2 * 1000,
          panelClass: ['mat-toolbar']
        });
      }else if (data.message == 'Contraseña no valida'){
        this._snackBar.open("Contraseña incorrecta", "Cerrar", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 2 * 1000,
          panelClass: ['mat-toolbar']
        });
      }
    });
    }
  }

  registrar() {
    this.ingresarEstado = !this.ingresarEstado;
  }

  openErrorModal() {

  }

  validarCorreoELectronico(correoElectronico: string): boolean {
    let expresionRegularCorreo = /\w+@\w+\.+[a-z]/;
    return expresionRegularCorreo.test(correoElectronico);
  }
}
