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
  templateUrl: './incidentes.html',
  styleUrl: './incidentes.css' // <-- LÍNEA AÑADIDA (Con su coma en la línea anterior)
})
export class IncidentesComponent implements OnInit {
  // ... (Conserva todo el resto de tu código TypeScript intacto tal cual me lo enviaste)
  
  incidentes: Incidente[] = [];
  alumnos: Persona[] = [];
  protocolosActivos: Protocolo[] = [];
  // filtros
  textoFiltroIncidentes: string = '';
  filtroProtocoloId: number = 0;
  filtroFecha: string = '';
  
  // Objeto base
  nuevoIncidente: Incidente = { id: 0, alumnoId: 0, protocoloId: 0, fecha: '', descripcionEvento: '', responsable: '', estado: 'VIGENTE', motivoModificacion: '' };
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

  establecerFechaHoy() {
    const hoy = new Date();
    const yyyy = hoy.getFullYear();
    const mm = String(hoy.getMonth() + 1).padStart(2, '0');
    const dd = String(hoy.getDate()).padStart(2, '0');
    this.nuevoIncidente.fecha = `${yyyy}-${mm}-${dd}`;
  }

  cargarDatosMaestros() {
    this.personaService.getPersonasHttp().subscribe((data: Persona[]) => {
      this.alumnos = data;
    });
    this.protocoloService.getProtocolos().subscribe((data: Protocolo[]) => {
      this.protocolosActivos = data.filter(p => p.activo === true);
    });
    this.cargarIncidentes();
  }

  cargarIncidentes() {
    this.incidenteService.getIncidentes().subscribe(data => {
      // Orden: Primero los vigentes más recientes
      this.incidentes = data.sort((a, b) => (a.estado === 'VIGENTE' ? -1 : 1));
      this.cdr.detectChanges();
    });
  }

  get alumnosFiltrados(): Persona[] {
    if (!this.textoBusqueda) return this.alumnos;
    const b = this.textoBusqueda.toLowerCase();
    return this.alumnos.filter(a => 
      a.nombre.toLowerCase().includes(b) || a.apellido.toLowerCase().includes(b) || a.rut.toLowerCase().includes(b)
    );
  }

  // FUNCION UNIFICADA: CREAR O EDITAR CON BITÁCORA
  guardarIncidente() {
    if (this.nuevoIncidente.alumnoId === 0 || this.nuevoIncidente.protocoloId === 0) {
      alert("Error: Selección de alumno y protocolo requerida.");
      return;
    }

    const esEdicion = this.nuevoIncidente.id !== 0;
    const confirmacion = confirm(esEdicion ? "¿Desea guardar los cambios en este registro?" : "¿Desea registrar este nuevo incidente?");

    if (confirmacion) {
      if (esEdicion) {
        // Lógica de Bitácora para edición
        const motivo = prompt("SISTEMA DE AUDITORÍA\n\nIngrese brevemente el motivo de la edición:");
        const fechaHora = new Date().toLocaleString();
        const nuevoRegistro = `[${fechaHora}] Editado: ${motivo || 'Corrección general de datos'}`;
        
        // Sumamos el historial nuevo debajo del antiguo
        this.nuevoIncidente.motivoModificacion = this.nuevoIncidente.motivoModificacion 
          ? this.nuevoIncidente.motivoModificacion + '\n' + nuevoRegistro 
          : nuevoRegistro;
        
        this.incidenteService.actualizarIncidente(this.nuevoIncidente.id, this.nuevoIncidente).subscribe(() => {
          alert("Registro actualizado con éxito.");
          this.finalizarAccion();
        });
      } else {
        this.incidenteService.crearIncidente(this.nuevoIncidente).subscribe(() => {
          alert("Incidente registrado y protocolo activado.");
          this.finalizarAccion();
        });
      }
    }
  }

  // BOTÓN EDITAR: Carga los datos en el formulario
  cargarParaEditar(inc: Incidente) {
    this.nuevoIncidente = { ...inc };
    window.scrollTo(0, 0); // Sube la pantalla para ver el formulario
  }

  // BOTÓN ANULAR: Borrado lógico con bitácora acumulativa
  anularIncidente(inc: Incidente) {
    const motivo = prompt("SISTEMA DE AUDITORÍA\n\nIndique el motivo de la anulación del caso. Este registro NO se borrará, pero quedará marcado como inválido en el historial:");
    
    if (motivo && motivo.trim() !== "") {
      inc.estado = "ANULADO";
      
      const fechaHora = new Date().toLocaleString();
      const nuevoRegistro = `[${fechaHora}] ANULADO: ${motivo.trim()}`;
      
      inc.motivoModificacion = inc.motivoModificacion 
        ? inc.motivoModificacion + '\n' + nuevoRegistro 
        : nuevoRegistro;

      this.incidenteService.actualizarIncidente(inc.id, inc).subscribe(() => {
        alert("El incidente ha sido anulado de forma transparente.");
        this.cargarIncidentes();
      });
    } else if (motivo === "") {
      alert("Operación denegada: Debe ingresar un motivo para anular.");
    }
  }

  finalizarAccion() {
    this.cargarIncidentes();
    this.limpiar();
    this.establecerFechaHoy();
  }

  limpiar() {
    this.nuevoIncidente = { id: 0, alumnoId: 0, protocoloId: 0, fecha: '', descripcionEvento: '', responsable: '', estado: 'VIGENTE', motivoModificacion: '' };
    this.textoBusqueda = '';
  }

  getNombreAlumno(id: number): string {
    const alumno = this.alumnos.find(a => a.id == id);
    return alumno ? `[${alumno.curso}] ${alumno.nombre} ${alumno.apellido}` : '⚠️ Alumno no encontrado';
  }

  getNombreProtocolo(id: number): string {
    const protocolo = this.protocolosActivos.find(p => p.id == id);
    return protocolo ? protocolo.nombreProtocolo : 'Protocolo Aplicado';
  }

  get incidentesFiltrados(): Incidente[] {
    const texto = this.textoFiltroIncidentes ? this.textoFiltroIncidentes.toLowerCase() : '';
    return this.incidentes.filter(inc => {
      // filtro por protocolo si está seleccionado
      if (this.filtroProtocoloId && inc.protocoloId !== this.filtroProtocoloId) return false;

      // filtro por fecha exacta si se seleccionó
      if (this.filtroFecha && inc.fecha !== this.filtroFecha) return false;

      if (!texto) return true;

      // buscar por nombre de alumno, descripción o nombre del protocolo
      const nombreAlumno = this.getNombreAlumno(inc.alumnoId).toLowerCase();
      const descripcion = (inc.descripcionEvento || '').toLowerCase();
      const nombreProtocolo = this.getNombreProtocolo(inc.protocoloId).toLowerCase();

      return nombreAlumno.includes(texto) || descripcion.includes(texto) || nombreProtocolo.includes(texto);
    });
  }
}