import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; // <-- Paso A: Importar

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink], // <-- Paso B: Registrar aquí
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  // Aquí irá la lógica de autenticación del equipo más adelante
}