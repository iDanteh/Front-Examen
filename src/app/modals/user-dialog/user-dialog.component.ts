import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { Usuario } from '../../models/Users';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import {
  MatSnackBar, MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';


@Component({
  selector: 'app-user-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    ImageDialogComponent
  ],
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.css'
})
export class UserDialogComponent {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  textUpdate = 'Actualizar';
  seCambio = false;


  constructor(public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {usuario: Usuario, agregar: boolean},
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  onNoClick(): void {
    this.dialogRef.close({ mensage: 'Sin cambios', usuario: this.data.usuario });
  }

  onUpdateClick(): void {
    console.log("userComponent");
    console.log(this.data);
    if (this.textUpdate === 'Confirmar actualización') {
      if (!(this.validarCorreoELectronico(this.data.usuario.correo))) {
        this._snackBar.open("Correo no valido", "Cerrar", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 2 * 1000,
          panelClass: ['mat-toolbar']
        });
      }
      else if (!(this.validarContrasena(this.data.usuario.contrasena))) {
        this._snackBar.open("Contraseña no valida", "Cerrar", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 2 * 1000,
          panelClass: ['mat-toolbar']
        });
      }
      else {
        this.dialogRef.close({ mensage: 'actualizar', usuario: this.data.usuario });
      }
    }
    this.textUpdate = 'Confirmar actualización';
  }

  onDeleteClick(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      height: '200px',
      data: { message: '¿Estás seguro de que deseas eliminar?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.dialogRef.close({ mensage: 'eliminar', usuario: this.data });
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
        this.data.usuario.urlimg = result.url;
        this.seCambio = true;
        console.log(this.data.usuario.urlimg);
      }
    });
  }

  onClickAdd(){
    this.dialogRef.close({ mensage: 'agregar', usuario: this.data.usuario });
  }
    
}
