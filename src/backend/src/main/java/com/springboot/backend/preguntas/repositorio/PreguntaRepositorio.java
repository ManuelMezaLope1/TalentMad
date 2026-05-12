package com.springboot.backend.preguntas.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.backend.preguntas.modelo.Pregunta;

public interface PreguntaRepositorio extends JpaRepository<Pregunta, Long>{
    
}
