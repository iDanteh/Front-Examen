import { RouterModule, Routes } from '@angular/router';
import { VistaComponent } from './pages/vista/vista.component';
import { AgregarAnimalComponent } from './modals/agregar-animal/agregar-animal.component';
import { NgModule } from '@angular/core';
import { WelcomeComponent } from './pages/welcome/welcome.component';

export const routes: Routes = [
    {path: '', redirectTo: '/home' , pathMatch: 'full'},
    {path: 'home', component: WelcomeComponent},
    { path: 'vista', component: VistaComponent },
    { path: 'agregarAnimal', component: AgregarAnimalComponent },
];

// @NgModule({
//     imports: [RouterModule.forRoot(routes)],
//     exports: [RouterModule]
// })
// export class AppRoutingModule { }