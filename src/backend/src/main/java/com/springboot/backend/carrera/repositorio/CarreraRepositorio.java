package com.springboot.backend.carrera.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.springboot.backend.beca.modelo.BecaNombreCantidadDto;
import com.springboot.backend.beca.modelo.CantidadBecaDto;
import com.springboot.backend.carrera.modelo.Carrera;
import com.springboot.backend.dto.NombreTipoCantidadDto;
import com.springboot.backend.dto.RankingCantidadDto;
import com.springboot.backend.dto.UniversidadCarreraPromedioDto;

public interface CarreraRepositorio extends JpaRepository<Carrera, Long> {
        @Query(value = """
                        SELECT COUNT(id) as cantidad FROM carrera;
                        """, nativeQuery = true)
        CantidadBecaDto obtenerCantidadCarrera();

        @Query(value = """
                        SELECT tipo_carrera AS nombre, COUNT(id) AS cantidad FROM carrera
                        GROUP BY tipo_carrera
                        ORDER BY cantidad DESC;
                        """, nativeQuery = true)
        List<BecaNombreCantidadDto> obtenerTipoCarreraCantidad();

        @Query(value = """
                        SELECT c.tipo_carrera AS nombre, COUNT(DISTINCT SUBSTRING_INDEX(u.nombre, ' - ', 1)) AS cantidad FROM universidad_carrera uc
                        INNER JOIN carrera c ON c.id = uc.carrera_id
                        INNER JOIN universidad u ON u.id = uc.universidad_id
                        GROUP BY c.tipo_carrera
                        ORDER BY cantidad DESC;
                        """, nativeQuery = true)
        List<BecaNombreCantidadDto> obtenerTipoCarreraUniversidad();

        @Query(value = """
                        SELECT c.nombre AS nombre, c.tipo_carrera AS tipo, COUNT(DISTINCT SUBSTRING_INDEX(u.nombre, ' - ', 1)) AS cantidad FROM universidad_carrera uc
                        JOIN carrera c ON c.id=uc.carrera_id
                        JOIN universidad u ON u.id=uc.universidad_id
                        GROUP BY c.nombre,c.tipo_carrera
                        ORDER BY cantidad DESC;
                        """, nativeQuery = true)
        List<NombreTipoCantidadDto> obtenerCarreraUniversidad();

        @Query(value = """
                        SELECT ranking_promedio AS ranking, COUNT(*) AS cantidad
                        FROM (
                            SELECT
                                SUBSTRING_INDEX(u.nombre, ' - ', 1) AS universidad,
                                ROUND(AVG(CAST(uc.ranking AS DECIMAL(3,2)))) AS ranking_promedio
                            FROM universidad_carrera uc
                            JOIN universidad u
                                ON u.id = uc.universidad_id
                            WHERE uc.ranking <> ''
                            GROUP BY SUBSTRING_INDEX(u.nombre, ' - ', 1)
                        ) t
                        GROUP BY ranking_promedio
                        ORDER BY cantidad DESC;
                        """, nativeQuery = true)
        List<RankingCantidadDto> obtenerRankingCantidad();

        @Query(value = """
                        SELECT SUBSTRING_INDEX(u.nombre, ' - ', 1) AS universidad, c.nombre AS carrera, ROUND(AVG(CAST(uc.ranking AS DECIMAL(3,2)))) AS promedio
                        FROM universidad_carrera uc
                        JOIN universidad u ON u.id = uc.universidad_id
                        JOIN carrera c ON c.id = uc.carrera_id
                        WHERE uc.ranking <> '' AND c.nombre =:carrera
                        GROUP BY SUBSTRING_INDEX(u.nombre, ' - ', 1), c.nombre
                        ORDER BY promedio DESC;
                        """, nativeQuery = true)
        List<UniversidadCarreraPromedioDto> obtenerUniversidadCarreraRankingPromedio(@Param("carrera") String carrera);

        @Query(value = """
                        SELECT SUBSTRING_INDEX(u.nombre, ' - ', 1) AS universidad, c.nombre AS carrera, ROUND(AVG(CAST(uc.total AS DECIMAL(10,2))),2) AS promedio
                        FROM universidad_carrera uc
                        JOIN universidad u ON u.id = uc.universidad_id
                        JOIN carrera c ON c.id = uc.carrera_id
                        WHERE uc.total <> '' AND c.nombre =:carrera
                        GROUP BY SUBSTRING_INDEX(u.nombre, ' - ', 1), c.nombre
                        ORDER BY promedio DESC;
                        """, nativeQuery = true)
        List<UniversidadCarreraPromedioDto> obtenerUniversidadCarreraTotalPromedio(@Param("carrera") String carrera);
}
