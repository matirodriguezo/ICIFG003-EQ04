package com.example.demo.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.ProtocoloEntity;
import com.example.demo.repository.ProtocoloRepository;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1/protocolos")
public class ProtocoloController {

    @Autowired
    private ProtocoloRepository repository;

    @GetMapping("/")
    public List<ProtocoloEntity> listar() {
        return (List<ProtocoloEntity>) repository.findAll();
    }

    @PostMapping("/")
    public ResponseEntity<ProtocoloEntity> crear(@RequestBody ProtocoloEntity protocolo) {
        if(protocolo.getActivo() == null) protocolo.setActivo(true);
        ProtocoloEntity nuevo = repository.save(protocolo);
        return new ResponseEntity<>(nuevo, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProtocoloEntity> actualizar(@PathVariable Long id, @RequestBody ProtocoloEntity protocolo) {
        return repository.findById(id).map(existente -> {
            existente.setNombreProtocolo(protocolo.getNombreProtocolo());
            existente.setDescripcion(protocolo.getDescripcion());
            existente.setActivo(protocolo.getActivo()); // Permite activar/desactivar
            ProtocoloEntity actualizado = repository.save(existente);
            return new ResponseEntity<>(actualizado, HttpStatus.OK);
        }).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) {
        return repository.findById(id).map(existente -> {
            repository.delete(existente);
            return ResponseEntity.ok().build();
        }).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}