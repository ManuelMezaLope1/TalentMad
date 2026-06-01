package com.springboot.backend.categoriapreguntas.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.backend.categoriapreguntas.modelo.CategoriaPreguntas;

public interface CategoriaPreguntasRepositorio extends JpaRepository<CategoriaPreguntas, Long>{
    
}
