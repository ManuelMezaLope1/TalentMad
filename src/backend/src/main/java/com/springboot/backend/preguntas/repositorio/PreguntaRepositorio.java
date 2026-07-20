package com.springboot.backend.preguntas.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.springboot.backend.beca.modelo.BecaNombreCantidadDto;
import com.springboot.backend.preguntas.modelo.Pregunta;

public interface PreguntaRepositorio extends JpaRepository<Pregunta, Long> {
    @Query(value = """
            SELECT cp.nombre AS nombre, COUNT(p.id) AS cantidad FROM preguntas p
            JOIN categoria_preguntas cp ON cp.id=p.categoria_preguntas_id
            GROUP BY cp.nombre
            ORDER BY cantidad DESC;
            """, nativeQuery = true)
    List<BecaNombreCantidadDto> obtenerCantidadCategoriaPreguntas();
}
