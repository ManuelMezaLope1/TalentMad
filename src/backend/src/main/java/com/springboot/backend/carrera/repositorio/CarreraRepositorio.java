package com.springboot.backend.carrera.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.backend.carrera.modelo.Carrera;

public interface CarreraRepositorio extends JpaRepository<Carrera, Long>{
    
}
