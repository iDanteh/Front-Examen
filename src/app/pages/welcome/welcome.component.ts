import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  authForm!: FormGroup;
  isLoginMode = true;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
    this.router.navigate(['home']);
  }

  private loginUser(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>('http://127.0.0.1:8000/api/login', { correo: email, contraseña: password }, { headers });
  }

  private registerUser(nombre: string, email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>('http://127.0.0.1:8000/api/newUser', { nombre: nombre, correo: email, contraseña: password, urlimg:"m1.png" }, { headers });
  }


  private initForm(): void {
    this.authForm = this.fb.group({
      nombre: ['', this.isLoginMode ? [] : [Validators.required]], // Campo 'nombre' solo requerido en registro
      email: ['', [Validators.required, Validators.email]], // Validación para email
      password: ['', [Validators.required]], // Campo 'password' requerido
      confirmPassword: ['', this.isLoginMode ? [] : Validators.required] // Campo 'confirmPassword' solo requerido en registro
    });
  }
  


  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.initForm();
  }

  onSubmit(): void {
    if (!this.authForm.valid) {
      return;
    }
  
    const nombre = this.authForm.value.nombre;
    const email = this.authForm.value.email;
    const password = this.authForm.value.password;
  
    if (this.isLoginMode) {
      // Llamar a la API de inicio de sesión
      this.loginUser(email, password).subscribe(
        response => {
          console.log('Login successful', response);
          this.router.navigate(['vista']);
        },
        error => {
          console.error('Login error', error);
        }
      );
    } else {
      if (password !== this.authForm.value.confirmPassword) {
        console.error('Passwords do not match');
        return;
      }
      this.registerUser(nombre, email, password).subscribe(
        response => {
          console.log('Registration successful', response);
        },
        error => {
          console.error('Registration error', error);
        }
      );
    }
    this.authForm.reset();
  }
  

}