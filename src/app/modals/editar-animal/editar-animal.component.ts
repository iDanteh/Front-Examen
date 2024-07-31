import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Animal } from '../../models/Animal';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-editar-animal',
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
  templateUrl: './editar-animal.component.html',
  styleUrl: './editar-animal.component.css'
})
export class EditarAnimalComponent {

  textUpdate = 'Actualizar';

  constructor(
    public dialogRef: MatDialogRef<EditarAnimalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Animal,
    private dialog: MatDialog
  ) { }

  onNoClick(): void {
    this.dialogRef.close('Sin cambios');
  }

  onSaveClick(): void {
    this.dialogRef.close(this.data);
  }

  onUpdateClick(): void {
    if (this.textUpdate === 'Confirmar actualización') {
      this.dialogRef.close(this.data);
    }
    this.textUpdate = 'Confirmar actualización';
  }

  onDeleteClick(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '600px',
      height: '200px',
      data: { message: '¿Estás seguro de que deseas eliminar?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.dialogRef.close('Eliminar');
      }
    });
  }

}
