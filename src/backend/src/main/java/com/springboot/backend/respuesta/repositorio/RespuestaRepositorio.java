package com.springboot.backend.respuesta.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.backend.respuesta.modelo.Respuesta;

public interface RespuestaRepositorio extends JpaRepository<Respuesta, Long>{
    
}
