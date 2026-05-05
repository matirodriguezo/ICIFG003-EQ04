import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; // <-- Importar

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink], // <-- Registrar aquí
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class MenuComponent {

}