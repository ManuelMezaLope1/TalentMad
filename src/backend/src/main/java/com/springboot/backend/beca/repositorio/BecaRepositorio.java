package com.springboot.backend.beca.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.springboot.backend.beca.modelo.Beca;
import com.springboot.backend.beca.modelo.BecaNombreCantidadDto;
import com.springboot.backend.beca.modelo.CantidadBecaDto;

public interface BecaRepositorio extends JpaRepository<Beca, Long> {
    @Query(value = """
            SELECT COUNT(id) as cantidad FROM beca;
            """, nativeQuery = true)
    CantidadBecaDto obtenerCantidadBeca();

    @Query(value = """
            SELECT tipo_beca AS nombre, COUNT(id) AS cantidad FROM beca
            GROUP BY tipo_beca
            ORDER BY cantidad DESC;
            """, nativeQuery = true)
    List<BecaNombreCantidadDto> obtenerTipoBecaCantidad();

    @Query(value = """
            SELECT ob.nombre as nombre, COUNT(b.id) AS cantidad FROM beca b
            JOIN origen_beca ob ON ob.id=b.origen_beca_id
            GROUP BY ob.nombre
            ORDER BY cantidad DESC;
            """, nativeQuery = true)
    List<BecaNombreCantidadDto> obtenerOrigenBecaCantidad();

    @Query(value="""
            SELECT b.nombre as nombre, COUNT(DISTINCT SUBSTRING_INDEX(u.nombre, ' - ', 1)) AS cantidad FROM universidad_beca ub
            JOIN beca b ON b.id=ub.beca_id
            JOIN universidad u ON u.id=ub.universidad_id
            GROUP BY b.nombre
            ORDER BY cantidad DESC;
            """, nativeQuery=true)
    List<BecaNombreCantidadDto> obtenerBecaUniversidadCantidad();
}
