import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class MenuComponent {
  // El componente está limpio, la lógica de enrutamiento 
  // es manejada por RouterLink directamente en el HTML.
}