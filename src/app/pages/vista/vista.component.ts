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

@Component({
  selector: 'app-vista',
  standalone: true,
  imports: [CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatDatepickerModule,
    CardComponent,
    NgxPaginationModule, NavBarComponent],
  templateUrl: './vista.component.html',
  styleUrls: ['./vista.component.css']
})
export class VistaComponent implements OnInit, AfterViewInit {

  http = inject(HttpClient);
  animals: Animal[] = [];
  public page!: number;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.http.get<Animal[]>(`http://127.0.0.1:8000/api/allAnimals`).subscribe((data) => {
      this.animals = data;
    });
  }

  ngAfterViewInit() {

  }

  openModal(animal: Animal) {
    const dialogOpen = this.dialog.open(EditarAnimalComponent, {
      height: '700px',
      width: '1200px',
      data: animal
    });

    dialogOpen.afterClosed().subscribe(result => {

      console.log(result);
      console.log(result.mensage);
      console.log(result.animal.id);



      
      if(result.mensage == 'actualizar'){
        this.http.put<Animal[]>(`http://127.0.0.1:8000/api/actualizar/${result.animal.id}`, result.animal).subscribe((data) => {
          this.animals = data;
        });  
      }
      if (result.mensage == 'eliminar') {
        this.http.delete<Animal[]>(`http://127.0.0.1:8000/api/eliminar/${result.animal.id}`).subscribe((data) => {
          this.animals = data;
        });
      }


    });
  }

}
