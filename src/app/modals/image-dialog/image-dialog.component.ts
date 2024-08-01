import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Animal } from '../../models/Animal';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { ImageUrl } from '../../models/ImageUrl';


@Component({
  selector: 'app-image-dialog',
  standalone: true,
  imports: [CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatDialogModule
  ],
  templateUrl: './image-dialog.component.html',
  styleUrl: './image-dialog.component.css'
})
export class ImageDialogComponent {
  http = inject(HttpClient);
  ImagesUrls: ImageUrl[] = [];
  selectedFile: File | null = null;

  constructor(public dialogImageReg: MatDialogRef<ImageDialogComponent>) {}

  ngOnInit(): void {
    this.http.get<ImageUrl[]>(`http://127.0.0.1:8000/api/showAllImages`).subscribe((data) => {
      this.ImagesUrls = data;
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
    this.onClickAddImage();
  }

  onClickAddImage(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile, this.selectedFile.name);

      this.http.post('http://127.0.0.1:8000/api/uploadImage', formData).subscribe(response => {
        console.log('Image uploaded successfully', response);
        // Reload the images after successful upload
        this.ngOnInit();
      }, error => {
        console.error('Error uploading image', error);
      });
    } else {
      console.error('No file selected');
    }
  }

  onClickSelectImage(imagen: ImageUrl): void {
    console.log('Imagen seleccionada', imagen.url);

    this.dialogImageReg.close({ mensaje: true, url: imagen.url });
  }
}
