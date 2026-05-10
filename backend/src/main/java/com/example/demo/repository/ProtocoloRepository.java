package com.example.demo.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.entity.ProtocoloEntity;

@Repository
public interface ProtocoloRepository extends CrudRepository<ProtocoloEntity, Long> {
}