package com.springboot.backend.universidadcarrera.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import com.springboot.backend.universidadcarrera.modelo.UniversidadCarrera;

import jakarta.transaction.Transactional;

public interface UniversidadCarreraRepositorio extends JpaRepository<UniversidadCarrera, Long>{
    boolean existsByUniversidadIdAndCarreraId(Long universidadId, Long carreraId);
    List<UniversidadCarrera> findByUniversidadId(Long id);
    List<UniversidadCarrera> findByCarreraId(Long id);

    @Modifying
    @Transactional
    void deleteByUniversidadId(Long universidadId);
}
