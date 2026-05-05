package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.UsuarioEntity;
import com.example.demo.repository.UsuarioRepository;
import com.example.demo.dto.LoginDto;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    private UsuarioRepository repository;

    @PostMapping("/login")
    public ResponseEntity<?> iniciarSesion(@RequestBody LoginDto credenciales) {
        
        UsuarioEntity usuario = repository.findByCorreoAndContrasena(
            credenciales.getCorreo(), 
            credenciales.getContrasena()
        );

        if (usuario != null) {
            return new ResponseEntity<>(usuario, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Credenciales incorrectas", HttpStatus.UNAUTHORIZED);
        }
    }
}