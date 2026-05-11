package com.example.demo.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.entity.IncidenteEntity;
import com.example.demo.repository.IncidenteRepository;
import java.time.LocalDate;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1/incidentes")
public class IncidenteController {

    @Autowired
    private IncidenteRepository repository;

    @GetMapping("/")
    public List<IncidenteEntity> listar() {
        return (List<IncidenteEntity>) repository.findAll();
    }

    @PostMapping("/")
    public ResponseEntity<IncidenteEntity> crear(@RequestBody IncidenteEntity incidente) {
        if(incidente.getFecha() == null) {
            incidente.setFecha(LocalDate.now()); 
        }
        if(incidente.getEstado() == null) {
            incidente.setEstado("VIGENTE");
        }
        IncidenteEntity nuevo = repository.save(incidente);
        return new ResponseEntity<>(nuevo, HttpStatus.CREATED);
    }

 // MÉTODO PUT CORREGIDO: Actualiza TODOS los campos y el historial
    @PutMapping("/{id}")
    public ResponseEntity<IncidenteEntity> actualizar(@PathVariable Long id, @RequestBody IncidenteEntity incidente) {
        return repository.findById(id).map(existente -> {
            existente.setAlumnoId(incidente.getAlumnoId());
            existente.setProtocoloId(incidente.getProtocoloId());
            existente.setFecha(incidente.getFecha());
            existente.setDescripcionEvento(incidente.getDescripcionEvento());
            existente.setResponsable(incidente.getResponsable());
            existente.setEstado(incidente.getEstado());
            existente.setMotivoModificacion(incidente.getMotivoModificacion());
            
            IncidenteEntity actualizado = repository.save(existente);
            return new ResponseEntity<>(actualizado, HttpStatus.OK);
        }).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}