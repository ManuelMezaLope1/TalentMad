package com.springboot.backend.historial.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.springboot.backend.historial.modelo.CantidadCodigoDto;
import com.springboot.backend.historial.modelo.Historial;
import com.springboot.backend.historial.modelo.HistoricoHistorialDto;

public interface HistorialRepositorio extends JpaRepository<Historial, Long> {
    List<Historial> findByUsuarioUsername(String username);

    @Query(value = """
            select codigo, count(codigo) as cantidad from historial
            group by codigo
            order by count(codigo) desc;
                        """, nativeQuery = true)
    List<CantidadCodigoDto> obtenerCantidadCodigo();

    @Query(value = """
            SELECT DATE(STR_TO_DATE(fecha, '%d/%m/%Y, %H:%i:%s')) AS fecha, COUNT(id) AS cantidad FROM historial
            GROUP BY DATE(STR_TO_DATE(fecha, '%d/%m/%Y, %H:%i:%s'))
            ORDER BY fecha;
                        """, nativeQuery = true)
    List<HistoricoHistorialDto> obtenerHistoricoHistorial();
}
