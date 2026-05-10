import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PersonaService } from '../../services/persona';
import { Persona } from '../../models/persona';

@Component({
  selector: 'app-persona',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './persona.html'
})
export class PersonaComponent implements OnInit {
  
  personas: Persona[] = [];
  persona: Persona = { id: 0, rut: '', nombre: '', apellido: '', curso: '' };

  // Lista oficial de cursos para el selector
  listaCursos: string[] = [
    'Pre-Kínder', 'Kínder',
    '1° Básico', '2° Básico', '3° Básico', '4° Básico',
    '5° Básico', '6° Básico', '7° Básico', '8° Básico',
    '1° Medio', '2° Medio', '3° Medio', '4° Medio'
  ];

  constructor(private personaService: PersonaService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.personaService.getPersonasHttp().subscribe((data: Persona[]) => {
      this.personas = data;
      this.cdr.detectChanges();
    });
  }

  guardar() {
    if (!this.persona.rut || !this.persona.nombre || !this.persona.apellido || !this.persona.curso) {
      alert("Error: Todos los campos son obligatorios, incluyendo el curso.");
      return;
    }

    const mensaje = this.persona.id === 0 ? "¿Desea registrar este nuevo alumno?" : "¿Desea actualizar los datos del alumno?";
    
    if (confirm(mensaje)) {
      if (this.persona.id === 0) {
        this.personaService.crearPersona(this.persona).subscribe(() => {
          alert("Alumno registrado con éxito.");
          this.listar();
          this.limpiar();
        });
      } else {
        this.personaService.actualizarPersona(this.persona.id, this.persona).subscribe(() => {
          alert("Datos actualizados correctamente.");
          this.listar();
          this.limpiar();
        });
      }
    }
  }

  editar(p: Persona) {
    this.persona = { ...p };
  }

  eliminar(id: number) {
    if (confirm("¿Está seguro de eliminar a este alumno? Esta acción no se puede deshacer y podría afectar el historial de incidentes.")) {
      this.personaService.eliminarPersona(id).subscribe(() => {
        alert("Registro eliminado del sistema.");
        this.listar();
      });
    }
  }

  limpiar() {
    this.persona = { id: 0, rut: '', nombre: '', apellido: '', curso: '' };
  }
}