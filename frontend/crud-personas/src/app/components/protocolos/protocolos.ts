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
  selectedProtocolo: Protocolo | null = null;
  isEditMode = false;
  showModal = false;

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

  abrirCrear() {
    this.selectedProtocolo = { id: 0, nombreProtocolo: '', descripcion: '', activo: true };
    this.isEditMode = false;
    this.showModal = true;
  }

  abrirEditar(p: Protocolo) {
    // clonamos para no mutar la lista hasta confirmar
    this.selectedProtocolo = { ...p };
    this.isEditMode = true;
    this.showModal = true;
  }

  verProtocolo(p: Protocolo) {
    this.selectedProtocolo = { ...p };
    this.isEditMode = false;
    this.showModal = false;
  }

  cancelarModal() {
    this.selectedProtocolo = null;
    this.showModal = false;
  }

  guardarProtocolo() {
    if (!this.selectedProtocolo) return;

    if (this.isEditMode) {
      this.protocoloService.actualizarProtocolo(this.selectedProtocolo.id, this.selectedProtocolo).subscribe(() => {
        alert('Protocolo actualizado.');
        this.cargarProtocolos();
        this.cancelarModal();
      });
    } else {
      // crear
      const payload = { ...this.selectedProtocolo };
      // backend suele ignorar id en POST
      this.protocoloService.crearProtocolo(payload).subscribe(() => {
        alert('Protocolo creado.');
        this.cargarProtocolos();
        this.cancelarModal();
      });
    }
  }

  eliminarProtocolo(id: number) {
    if (confirm('¿Confirma eliminar este protocolo? Esta acción no se puede deshacer.')) {
      this.protocoloService.eliminarProtocolo(id).subscribe(() => {
        alert('Protocolo eliminado.');
        this.cargarProtocolos();
      });
    }
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