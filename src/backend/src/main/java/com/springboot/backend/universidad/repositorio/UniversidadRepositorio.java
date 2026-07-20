package com.springboot.backend.universidad.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.springboot.backend.beca.modelo.BecaNombreCantidadDto;
import com.springboot.backend.beca.modelo.CantidadBecaDto;
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

        @Query(value = """
                        SELECT COUNT(DISTINCT SUBSTRING_INDEX(nombre, ' - ', 1)) AS cantidad FROM universidad;
                        """, nativeQuery = true)
        CantidadBecaDto obtenerCantidadUniversidad();

        @Query(value = """
                        SELECT SUBSTRING_INDEX(nombre, ' - ', 1) AS nombre, COUNT(*) AS cantidad FROM universidad
                        GROUP BY SUBSTRING_INDEX(nombre, ' - ', 1)
                        ORDER BY cantidad DESC;
                        """, nativeQuery = true)
        List<BecaNombreCantidadDto> obtenerUniversidadSedesCantidad();

        @Query(value = """
                        SELECT d.nombre, COUNT(DISTINCT SUBSTRING_INDEX(u.nombre, ' - ', 1)) AS cantidad FROM universidad u
                        JOIN departamento d ON d.id=u.departamento_id
                        GROUP BY d.nombre
                        ORDER BY cantidad DESC;
                        """, nativeQuery = true)
        List<BecaNombreCantidadDto> obtenerUniversidadDepartamentoCantidad();

        @Query(value = """
                        SELECT SUBSTRING_INDEX(u.nombre, ' - ', 1) AS nombre, COUNT(DISTINCT uc.carrera_id) AS cantidad FROM universidad_carrera uc
                        JOIN universidad u ON u.id = uc.universidad_id
                        GROUP BY SUBSTRING_INDEX(u.nombre, ' - ', 1)
                        ORDER BY cantidad DESC;
                        """, nativeQuery = true)
        List<BecaNombreCantidadDto> obtenerUniversidadCarreraCantidad();

        @Query(value = """
                        SELECT SUBSTRING_INDEX(u.nombre, ' - ', 1) AS nombre, COUNT(DISTINCT ub.beca_id) AS cantidad FROM universidad_beca ub
                        JOIN universidad u ON u.id = ub.universidad_id
                        GROUP BY SUBSTRING_INDEX(u.nombre, ' - ', 1)
                        ORDER BY cantidad DESC;
                        """, nativeQuery = true)
        List<BecaNombreCantidadDto> obtenerUniversidadBecaCantidad();
}
