package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.PersonaEntity;
import com.example.demo.interfaces.IPersonaService;
import com.example.demo.service.PersonaServiceImpl;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1/entities/persona")
// Opcional: Si tienes problemas de CORS (bloqueo por puertos distintos), descomenta la siguiente línea:
// @CrossOrigin(origins = "http://localhost:7777")
public class PersonaController{

    @Autowired
    private IPersonaService service;

    // 1. GET: Listar todos
    @GetMapping("/")
    public List<PersonaEntity> listar() {
        return service.findAll();
    }

    // 2. GET: Buscar por ID
    @GetMapping("/{id}")
    public ResponseEntity<PersonaEntity> buscarPorId(@PathVariable Long id) {
        PersonaEntity persona = service.findById(id);
        if (persona != null) {
            return new ResponseEntity<>(persona, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // 3. POST: Crear nuevo
 // ESTO VA EN EL PROYECTO DEMO02 (BACKEND)
    @PostMapping("/")
    public ResponseEntity<PersonaEntity> crear(@RequestBody PersonaEntity persona) { // <--- AGREGAR @RequestBody
        System.out.println("Capa Rest recibió: " + persona.getNombre()); // Para que lo veas en consola
        PersonaEntity nuevaPersona = service.save(persona);
        return new ResponseEntity<>(nuevaPersona, HttpStatus.CREATED);
    }

    // 4. PUT: Actualizar existente
    @PutMapping("/{id}")
    public ResponseEntity<PersonaEntity> actualizar(@PathVariable Long id, @RequestBody PersonaEntity persona) {
        PersonaEntity personaExistente = service.findById(id);
        if (personaExistente != null) {
            personaExistente.setNombre(persona.getNombre());
            // Si tuvieras más campos (apellido, edad), los actualizas aquí
            PersonaEntity personaActualizada = service.save(personaExistente);
            return new ResponseEntity<>(personaActualizada, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


 // 5. DELETE: Borrar
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        try {
            
            PersonaEntity existingPersona = service.findById(id);
            
            if (existingPersona == null) {
                return ResponseEntity.status(404).body("Persona no encontrada");
            }
            
            
            service.deleteById(id);
            
            return ResponseEntity.ok("[]");
        } catch (Exception e) {
            return ResponseEntity.status(404).body(e);
        }
    }
}