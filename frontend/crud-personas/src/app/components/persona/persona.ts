import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PersonaService } from '../../services/persona';
import { Persona } from '../../models/persona';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink } from '@angular/router'; // Añadido RouterLink

@Component({
  selector: 'app-persona',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink], // Registramos RouterLink
  templateUrl: './persona.html' // Eliminamos la etiqueta <router-outlet> redundante en el template inline
})
export class PersonaComponent implements OnInit {

  personas: Persona[] = [];

  // Inicializamos con todos los campos vacíos
  persona: Persona = { id: 0, rut: '', nombre: '', apellido: '', curso: '' };

  constructor(private personaService: PersonaService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    console.log('componente.persona.ngOnInit inicializado');
    this.cargarPersonasComponent();
  }

  // READ (Con la sintaxis de subscribe corregida)
  cargarPersonasComponent() { 
    this.personaService.getPersonasHttp().subscribe({
      next: (data) => {
        this.personas = data;
        this.cdr.detectChanges();
      },
      error: (err: any) => console.error('Error al cargar alumnos:', err)
    });
  }

  // CREATE/UPDATE
  guardar() {
    if (this.persona.id === 0) {
      this.personaService.crearPersona(this.persona).subscribe(() => {
        this.cargarPersonasComponent();
        this.limpiar();
      });
    } else {
      this.personaService.actualizarPersona(this.persona.id, this.persona)
      .subscribe(() => {
        this.cargarPersonasComponent();
        this.limpiar();
      });
    }
  }

  // DELETE
  eliminar(id: number) {
    if(confirm('¿Estás seguro de eliminar este registro?')) {
      this.personaService.eliminarPersona(id).subscribe(() => {
        this.cargarPersonasComponent();
      });
    }
  }

  // EDITAR
  editar(p: Persona) {
    this.persona = { ...p };
  }

  // LIMPIAR
  limpiar() {
    this.persona = { id: 0, rut: '', nombre: '', apellido: '', curso: '' };
  }
}