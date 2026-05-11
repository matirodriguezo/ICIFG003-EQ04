package com.example.demo.entity;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "incidentes")
public class IncidenteEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private Long alumnoId;     
    private Long protocoloId;  
    
    private LocalDate fecha;
    
    @Column(length = 2000)
    private String descripcionEvento;
    
    private String responsable; 

    // NUEVOS CAMPOS DE AUDITORÍA Y TRANSPARENCIA
    private String estado = "VIGENTE"; // Por defecto, todo incidente nace vigente
    
    @Column(length = 1000)
    private String motivoModificacion; // Guarda la justificación si se anula

    public IncidenteEntity() {}

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getAlumnoId() { return alumnoId; }
    public void setAlumnoId(Long alumnoId) { this.alumnoId = alumnoId; }
    public Long getProtocoloId() { return protocoloId; }
    public void setProtocoloId(Long protocoloId) { this.protocoloId = protocoloId; }
    public LocalDate getFecha() { return fecha; }
    public void setFecha(LocalDate fecha) { this.fecha = fecha; }
    public String getDescripcionEvento() { return descripcionEvento; }
    public void setDescripcionEvento(String descripcionEvento) { this.descripcionEvento = descripcionEvento; }
    public String getResponsable() { return responsable; }
    public void setResponsable(String responsable) { this.responsable = responsable; }
    
    // Getters y Setters Nuevos
    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
    public String getMotivoModificacion() { return motivoModificacion; }
    public void setMotivoModificacion(String motivoModificacion) { this.motivoModificacion = motivoModificacion; }
}