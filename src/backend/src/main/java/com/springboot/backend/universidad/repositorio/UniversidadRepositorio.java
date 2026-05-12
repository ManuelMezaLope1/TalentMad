package com.springboot.backend.universidad.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.backend.universidad.modelo.Universidad;

public interface UniversidadRepositorio extends JpaRepository<Universidad, Long>{
    
}
