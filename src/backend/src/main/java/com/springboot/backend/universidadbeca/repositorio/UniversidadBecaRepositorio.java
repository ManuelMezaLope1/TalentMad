package com.springboot.backend.universidadbeca.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.springboot.backend.universidadbeca.modelo.UniversidadBeca;
import com.springboot.backend.universidadbeca.modelo.UniversidadesBecasDto;

import jakarta.transaction.Transactional;

public interface UniversidadBecaRepositorio extends JpaRepository<UniversidadBeca, Long> {
    boolean existsByUniversidadIdAndBecaId(Long universidadId, Long becaId);

    @Query(value = """
                        select b.nombre, b.descripcion, b.duracion, b.requisito, b.restriccion, b.beneficio, b.tipo_beca as tipoBeca,
            b.url, ob.nombre as origenBeca from universidad_beca ub
            join beca b on b.id=ub.beca_id
            join origen_beca ob on ob.id=b.origen_beca_id
            join universidad u on u.id=ub.universidad_id
            where u.nombre like concat(:nombre, '%');
                        """, nativeQuery = true)
    List<UniversidadesBecasDto> obtenerBecasPorUniversidad(@Param("nombre") String nombre);

    List<UniversidadBeca> findByUniversidadId(Long id);
    @Modifying
    @Transactional
    void deleteByUniversidadId(Long universidadId);
}