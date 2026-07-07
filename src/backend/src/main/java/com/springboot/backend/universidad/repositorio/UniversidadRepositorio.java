package com.springboot.backend.universidad.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.springboot.backend.universidad.modelo.Universidad;
import com.springboot.backend.universidad.modelo.UniversidadImagenUrlDto;
import com.springboot.backend.universidad.modelo.UniversidadSedesDto;

public interface UniversidadRepositorio extends JpaRepository<Universidad, Long> {
    @Query(value = """
            SELECT imagen, url FROM universidad WHERE nombre LIKE CONCAT(:nombre, '%') LIMIT 1
            """, nativeQuery = true)
    UniversidadImagenUrlDto obtenerImagenUrlDeUniversidad(@Param("nombre") String nombre);

    @Query(value = """
                        select u.nombre, d.nombre as departamento, u.costo_mensual_minimo as costoMensualMinimo,
            u.costo_mensual_maximo as costoMensualMaximo, u.imagen, u.url, uc.ranking, uc.total from universidad u
            join departamento d on d.id=u.departamento_id
            join universidad_carrera uc on uc.universidad_id=u.id
            WHERE u.nombre LIKE CONCAT(:nombre, '%') AND carrera_id=:id
            order by u.nombre;
                        """, nativeQuery = true)
    List<UniversidadSedesDto> obtenerSedes(@Param("nombre") String nombre, @Param("id") Long id);
}
