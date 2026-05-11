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
  templateUrl: './persona.html',
  styleUrl: './persona.css'
})
export class PersonaComponent implements OnInit {
  
  personas: Persona[] = [];
  persona: Persona = { id: 0, rut: '', nombre: '', apellido: '', curso: '' };

  // Variables temporales para los selectores separados
  nivelTemp: string = '';
  letraTemp: string = '';

  // Listas oficiales
  listaCursos: string[] = [
    'Pre-Kínder', 'Kínder',
    '1° Básico', '2° Básico', '3° Básico', '4° Básico',
    '5° Básico', '6° Básico', '7° Básico', '8° Básico',
    '1° Medio', '2° Medio', '3° Medio', '4° Medio'
  ];
  listaLetras: string[] = ['A', 'B', 'C', 'D', 'E', 'F'];

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
    // Validamos usando las variables temporales
    if (!this.persona.rut || !this.persona.nombre || !this.persona.apellido || !this.nivelTemp || !this.letraTemp) {
      alert("Error: Todos los campos son obligatorios, incluyendo el nivel y la letra del curso.");
      return;
    }

    // Concatenamos el nivel y la letra (Ej: "2° Medio" + " " + "A" = "2° Medio A")
    this.persona.curso = `${this.nivelTemp} ${this.letraTemp}`;

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

    // Separamos el string guardado (Ej: "2° Medio A") para llenar ambos selectores
    const partes = p.curso.split(' ');
    if (partes.length > 1) {
      this.letraTemp = partes.pop() || ''; // Extrae la última palabra (la letra)
      this.nivelTemp = partes.join(' ');   // Vuelve a unir el resto (el nivel)
    } else {
      this.nivelTemp = p.curso;
      this.letraTemp = '';
    }
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
    this.nivelTemp = '';
    this.letraTemp = '';
  }
}