package com.springboot.backend.universidadbeca.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.backend.universidadbeca.modelo.UniversidadBeca;

public interface UniversidadBecaRepositorio extends JpaRepository<UniversidadBeca,Long>{
    boolean existsByUniversidadIdAndBecaId(Long universidadId, Long becaId);
}