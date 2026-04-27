package com.springboot.backend.nivelinteres.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.backend.nivelinteres.modelo.NivelInteres;

public interface NivelInteresRepositorio extends JpaRepository<NivelInteres, Long>{
    NivelInteres findByNombre(String nombre);
}
