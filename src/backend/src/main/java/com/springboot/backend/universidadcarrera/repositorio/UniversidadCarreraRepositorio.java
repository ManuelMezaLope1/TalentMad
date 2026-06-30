package com.springboot.backend.universidadcarrera.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.backend.universidadcarrera.modelo.UniversidadCarrera;

import jakarta.transaction.Transactional;

public interface UniversidadCarreraRepositorio extends JpaRepository<UniversidadCarrera, Long>{
    boolean existsByUniversidadIdAndCarreraId(Long universidadId, Long carreraId);

    @Transactional
    void deleteByUniversidadId(Long universidadId);
}
