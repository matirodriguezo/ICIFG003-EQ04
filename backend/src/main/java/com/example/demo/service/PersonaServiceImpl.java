package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.PersonaEntity;
import com.example.demo.repository.PersonaRepository;
import com.example.demo.interfaces.IPersonaService; 

@Service
public class PersonaServiceImpl implements IPersonaService {

    @Autowired
    private PersonaRepository repository;

    @Override
    public List<PersonaEntity> findAll() {
        return (List<PersonaEntity>) repository.findAll();
    }

    @Override
    public PersonaEntity findById(Long id) {
        Optional<PersonaEntity> opcional = repository.findById(id);
        return opcional.orElse(null); 
    }

    @Override
    public PersonaEntity save(PersonaEntity persona) {
        return repository.save(persona); 
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}