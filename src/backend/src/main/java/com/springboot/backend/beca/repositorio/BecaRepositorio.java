package com.springboot.backend.beca.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.backend.beca.modelo.Beca;

public interface BecaRepositorio extends JpaRepository<Beca, Long>{
    
}
