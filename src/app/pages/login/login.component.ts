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
import { ImageDialogComponent } from '../../modals/image-dialog/image-dialog.component';


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
  seCambio = false;
  hide = signal(true);
  user: string = '';
  password: string = '';
  http = inject(HttpClient);
  usuario: Usuario = {
    id: 0,
    nombre: '',
    correo: '',
    contrasena: '',
    urlimg: '/add_image.png',
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
    if (!(this.validarCorreoELectronico(this.usuario.correo))) {
      this._snackBar.open("Correo no valido", "Cerrar", {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 2 * 1000,
        panelClass: ['mat-toolbar']
      });
    }
    else {
      this.http.post<any>(`http://127.0.0.1:8000/api/login`, {
        "correo": this.usuario.correo,
        "contrasena": this.usuario.contrasena
      }).subscribe((data) => {
        if (data.message == 'Usuario Correcto') {
          this.router.navigate(['vista', data.usuario]);
        } else if (data.message == 'Usuario no encontrado') {
          this._snackBar.open("Usuario no encontrado", "Cerrar", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 2 * 1000,
            panelClass: ['mat-toolbar']
          });
        } else if (data.message == 'Contraseña no valida') {
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
    if (!(this.validarCorreoELectronico(this.usuario.correo))) {
      this._snackBar.open("Correo no valido", "Cerrar", {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 2 * 1000,
        panelClass: ['mat-toolbar']
      });
    }
    else if (!(this.validarContrasena(this.usuario.contrasena))) {
      this._snackBar.open("Contraseña no valida", "Cerrar", {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 2 * 1000,
        panelClass: ['mat-toolbar']
      });
    }
    else {
      this.http.post<any>(`http://127.0.0.1:8000/api/newUser`, this.usuario).subscribe((data) => {
        
        this._snackBar.open("Usuario Registrado Correctamente", "Cerrar", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 2 * 1000,
          panelClass: ['mat-toolbar']
        });
        
      });
      this.ingresarEstado = true;
      this.usuario = {
        id: 0,
        nombre: '',
        correo: '',
        contrasena: '',
        urlimg: '/add_image.png',
      };
    }

  }

  cambiarIngresar() {
    this.ingresarEstado = !this.ingresarEstado;
  }

  openModalImage() {
    // cambiar usuario.urlimg
    const dialogImage = this.dialog.open(ImageDialogComponent, {
      width: '500px',
      height: '600px',
      data: ["http://127.0.0.1:8000/api/showAllImagesUser",
        "http://127.0.0.1:8000/api/uploadImageUser",
        "http://127.0.0.1:8000/image/user"]
    });

    dialogImage.afterClosed().subscribe(result => {
      console.log(result);
      if (!(result === undefined && result.url == '/add_image.png')) {
        this.usuario.urlimg = result.url;
        this.seCambio = true;
        console.log(this.usuario.urlimg);
      }
    });


  }

  validarCorreoELectronico(correoElectronico: string): boolean {
    let expresionRegularCorreo = /\w+@\w+\.+[a-z]/;
    return expresionRegularCorreo.test(correoElectronico);
  }

  validarContrasena(contrasena: string): boolean {
    if (contrasena.length > 7) {
      let expresion = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/;
      return expresion.test(contrasena);
    }
    else return false
  }

}
