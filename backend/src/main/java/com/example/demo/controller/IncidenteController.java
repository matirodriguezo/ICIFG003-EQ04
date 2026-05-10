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
            incidente.setFecha(LocalDate.now()); // Si no viene fecha, pone la de hoy
        }
        IncidenteEntity nuevo = repository.save(incidente);
        return new ResponseEntity<>(nuevo, HttpStatus.CREATED);
    }
}