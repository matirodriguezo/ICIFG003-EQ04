import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { IncidenteService } from '../../services/incidente.service';
import { PersonaService } from '../../services/persona'; 
import { ProtocoloService } from '../../services/protocolo.service'; 

import { Incidente } from '../../models/incidente';
import { Persona } from '../../models/persona';
import { Protocolo } from '../../models/protocolo';

@Component({
  selector: 'app-incidentes',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './incidentes.html'
})
export class IncidentesComponent implements OnInit {
  
  incidentes: Incidente[] = [];
  alumnos: Persona[] = [];
  protocolosActivos: Protocolo[] = [];
  
  nuevoIncidente: Incidente = { id: 0, alumnoId: 0, protocoloId: 0, fecha: '', descripcionEvento: '', responsable: '' };
  
  // Variable para el buscador dinámico
  textoBusqueda: string = '';

  constructor(
    private incidenteService: IncidenteService,
    private personaService: PersonaService,
    private protocoloService: ProtocoloService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarDatosMaestros();
    this.establecerFechaHoy();
  }

  // Establece la fecha del día actual por defecto
  establecerFechaHoy() {
    const hoy = new Date();
    const yyyy = hoy.getFullYear();
    const mm = String(hoy.getMonth() + 1).padStart(2, '0');
    const dd = String(hoy.getDate()).padStart(2, '0');
    this.nuevoIncidente.fecha = `${yyyy}-${mm}-${dd}`;
  }

  cargarDatosMaestros() {
    // Usamos getPersonasHttp para conectar con tu servicio de alumnos
    this.personaService.getPersonasHttp().subscribe((data: Persona[]) => {
      this.alumnos = data;
    });

    this.protocoloService.getProtocolos().subscribe((data: Protocolo[]) => {
      // Solo mostramos los protocolos que están habilitados
      this.protocolosActivos = data.filter(p => p.activo === true);
    });

    this.cargarIncidentes();
  }

  cargarIncidentes() {
    this.incidenteService.getIncidentes().subscribe(data => {
      this.incidentes = data;
      this.cdr.detectChanges();
    });
  }

  // Filtro en tiempo real por RUT, Nombre, Apellido o CURSO
  get alumnosFiltrados(): Persona[] {
    if (!this.textoBusqueda) {
      return this.alumnos;
    }
    const busqueda = this.textoBusqueda.toLowerCase();
    return this.alumnos.filter(a => 
      a.nombre.toLowerCase().includes(busqueda) || 
      a.apellido.toLowerCase().includes(busqueda) || 
      a.rut.toLowerCase().includes(busqueda) ||
      (a.curso && a.curso.toLowerCase().includes(busqueda))
    );
  }

  guardarIncidente() {
    if (this.nuevoIncidente.alumnoId === 0 || this.nuevoIncidente.protocoloId === 0) {
      alert("Error: Debe seleccionar un alumno y un protocolo para continuar.");
      return;
    }

    // Notificación de confirmación de acción (Requerimiento de control de usuario)
    if (confirm("¿Está seguro de registrar este incidente? Se activará el protocolo y quedará constancia oficial en el sistema.")) {
      this.incidenteService.crearIncidente(this.nuevoIncidente).subscribe(() => {
        alert("¡Éxito! El incidente ha sido registrado y el protocolo fue activado correctamente.");
        this.cargarIncidentes();
        
        // Reinicio de formulario manteniendo la fecha de hoy
        this.nuevoIncidente = { id: 0, alumnoId: 0, protocoloId: 0, fecha: '', descripcionEvento: '', responsable: '' };
        this.textoBusqueda = '';
        this.establecerFechaHoy();
      });
    }
  }

  // Formatea el nombre para mostrar el curso claramente
  getNombreAlumno(id: number): string {
    const alumno = this.alumnos.find(a => a.id == id);
    return alumno ? `[${alumno.curso}] ${alumno.nombre} ${alumno.apellido}` : 'Desconocido';
  }

  getNombreProtocolo(id: number): string {
    const protocolo = this.protocolosActivos.find(p => p.id == id);
    return protocolo ? protocolo.nombreProtocolo : 'Protocolo no vigente';
  }
}