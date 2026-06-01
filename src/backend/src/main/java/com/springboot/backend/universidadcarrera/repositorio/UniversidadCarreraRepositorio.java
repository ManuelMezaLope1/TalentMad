package com.springboot.backend.universidadcarrera.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.backend.universidadcarrera.modelo.UniversidadCarrera;

public interface UniversidadCarreraRepositorio extends JpaRepository<UniversidadCarrera, Long>{
    boolean existsByUniversidadIdAndCarreraId(Long universidadId, Long carreraId);
}
