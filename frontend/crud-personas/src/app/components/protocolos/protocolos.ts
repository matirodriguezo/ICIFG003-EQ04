import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProtocoloService } from '../../services/protocolo.service';
import { Protocolo } from '../../models/protocolo';

@Component({
  selector: 'app-protocolos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './protocolos.html',
  styleUrl: './protocolos.css' // <-- LÍNEA AÑADIDA (Con su respectiva coma arriba)
})
export class ProtocolosComponent implements OnInit {
  protocolos: Protocolo[] = [];

  constructor(private protocoloService: ProtocoloService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void { 
    this.cargarProtocolos(); 
  }

  cargarProtocolos() {
    this.protocoloService.getProtocolos().subscribe((data: Protocolo[]) => {
      this.protocolos = data;
      this.cdr.detectChanges();
    });
  }

  cambiarEstado(p: Protocolo) {
    const accion = p.activo ? 'desactivar' : 'activar';
    // Notificación de confirmación requerida
    if (confirm(`¿Está seguro que desea ${accion} el protocolo:\n"${p.nombreProtocolo}"?`)) {
      p.activo = !p.activo;
      this.protocoloService.actualizarProtocolo(p.id, p).subscribe(() => {
        alert(`El protocolo ha sido ${p.activo ? 'activado' : 'desactivado'} con éxito.`);
        this.cargarProtocolos();
      });
    }
  }
}