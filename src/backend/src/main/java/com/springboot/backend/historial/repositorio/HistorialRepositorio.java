package com.springboot.backend.historial.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.backend.historial.modelo.Historial;

public interface HistorialRepositorio extends JpaRepository<Historial,Long>{
    List<Historial> findByUsuarioUsername(String username);
}
