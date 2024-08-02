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
    MatDialogModule
  ],
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.css'
})
export class UserDialogComponent {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  textUpdate = 'Actualizar';

  constructor(public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  onNoClick(): void {
    this.dialogRef.close({ mensage: 'Sin cambios', usuario: this.data });
  }

  onUpdateClick(): void {
    console.log("userComponent");
    console.log(this.data);
    if (this.textUpdate === 'Confirmar actualización') {
      if (!(this.validarCorreoELectronico(this.data.correo))) {
        this._snackBar.open("Correo no valido", "Cerrar", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 2 * 1000,
          panelClass: ['mat-toolbar']
        });
      }
      else if (!(this.validarContrasena(this.data.contrasena))) {
        this._snackBar.open("Contraseña no valida", "Cerrar", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 2 * 1000,
          panelClass: ['mat-toolbar']
        });
      }
      else {
        this.dialogRef.close({ mensage: 'actualizar', usuario: this.data });
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
}
