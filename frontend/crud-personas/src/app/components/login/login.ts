import { Component, ChangeDetectorRef } from '@angular/core';
import { RouterLink, Router } from '@angular/router'; 
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
import { AuthService } from '../../services/auth'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule], 
  templateUrl: './login.html',
  styleUrl: './login.css' // <-- Ya estaba correcto, asegúrate de mantenerlo
})
export class LoginComponent {
  
  correo: string = '';
  contrasena: string = '';
  mensajeError: string = '';

  constructor(
    private router: Router, 
    private authService: AuthService,
    private cdr: ChangeDetectorRef 
  ) {}

  iniciarSesion() {
    this.mensajeError = '';

    if (this.correo.trim() === '' || this.contrasena.trim() === '') {
      this.mensajeError = 'Ingrese su correo y contraseña.';
      return;
    }

    const credenciales = {
      correo: this.correo,
      contrasena: this.contrasena
    };

    this.authService.login(credenciales).subscribe({
      next: (respuesta) => {
        console.log('Inicio de sesión exitoso:', respuesta);
        this.router.navigate(['/menu']);
      },
      error: (err) => {
        console.error('Error de autenticación:', err);
        if (err.status === 401) {
          this.mensajeError = 'Correo o contraseña incorrectos. Acceso denegado.';
        } else {
          this.mensajeError = 'Error de conexión con el servidor. Intente más tarde.';
        }
        this.cdr.detectChanges(); 
      }
    });
  }
}