package com.springboot.backend.departamento.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.springboot.backend.departamento.modelo.Departamento;
import com.springboot.backend.departamento.modelo.DepartamentoRegionDto;

public interface DepartamentoRepositorio extends JpaRepository<Departamento, Long>{
    @Query(value="""
            select nombre from departamento where region='Costa';
            """, nativeQuery=true)
    List<DepartamentoRegionDto> obtenerDepartamentoCosta();

    @Query(value="""
            select nombre from departamento where region='Sierra';
            """, nativeQuery=true)
    List<DepartamentoRegionDto> obtenerDepartamentoSierra();

    @Query(value="""
            select nombre from departamento where region='Selva';
            """, nativeQuery=true)
    List<DepartamentoRegionDto> obtenerDepartamentoSelva();
}
