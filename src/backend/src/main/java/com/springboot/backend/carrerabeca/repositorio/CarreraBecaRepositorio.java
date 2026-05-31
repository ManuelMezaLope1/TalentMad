package com.springboot.backend.carrerabeca.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.backend.carrerabeca.modelo.CarreraBeca;

public interface CarreraBecaRepositorio extends JpaRepository<CarreraBeca, Long>{
    boolean existsByCarreraIdAndBecaId(Long carreraId, Long becaId);
}
