package com.springboot.backend.tipouniversidad.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.backend.tipouniversidad.modelo.TipoUniversidad;

public interface TipoUniversidadRepositorio extends JpaRepository<TipoUniversidad, Long>{
    
}
