package com.example.demo.entity;

import javax.persistence.*;

@Entity
@Table(name = "tipo_protocolo")
public class ProtocoloEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "nombre_protocolo", length = 500)
    private String nombreProtocolo;
    
    @Column(length = 2000)
    private String descripcion;
    
    // Campo para Activar/Desactivar sin borrar de la base de datos
    private Boolean activo = true;

    public ProtocoloEntity() {}

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombreProtocolo() { return nombreProtocolo; }
    public void setNombreProtocolo(String nombreProtocolo) { this.nombreProtocolo = nombreProtocolo; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public Boolean getActivo() { return activo; }
    public void setActivo(Boolean activo) { this.activo = activo; }
}