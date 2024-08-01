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
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';

@Component({
  selector: 'app-agregar-animal',
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
  templateUrl: './agregar-animal.component.html',
  styleUrl: './agregar-animal.component.css'
})
export class AgregarAnimalComponent {

  seCambio = false;

  data: Animal = {
    nombre: '',
    longevidad: 0,
    descripcion: '',
    urlimg: '/add_image.png',
    especie: ''
  };

  constructor(public dialogRef: MatDialogRef<AgregarAnimalComponent>, private dialog: MatDialog ) { }

  onclickAdd() {
    this.dialogRef.close({mensage:'agregar', animal: this.data});
  }

  onNoClick(): void {
    this.dialogRef.close({mensage:'no a', animal: this.data});
  }

  openModalImage() {
    const dialogImage = this.dialog.open(ImageDialogComponent, {
      width: '500px',
      height: '600px',
    });

    dialogImage.afterClosed().subscribe(result => {
      console.log(result);
      if (!(result === undefined)) {
        this.data.urlimg = result.url;
        this.seCambio = true;
        console.log(this.data.urlimg);
      }
    });


  }
  
}
