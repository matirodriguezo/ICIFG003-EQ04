package com.example.demo.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.entity.IncidenteEntity;

@Repository
public interface IncidenteRepository extends CrudRepository<IncidenteEntity, Long> {
}