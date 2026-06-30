package com.springboot.backend.departamento.controlador;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.backend.departamento.modelo.Departamento;
import com.springboot.backend.departamento.modelo.DepartamentoRegionDto;
import com.springboot.backend.departamento.repositorio.DepartamentoRepositorio;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/v1/public")
public class DepartamentoControlador {
    @Autowired
    private DepartamentoRepositorio departamentoRepositorio;

    @GetMapping("/departamento")
    public List<Departamento> listarTodosLosDepartamentos() {
        return departamentoRepositorio.findAll();
    }
    
    @GetMapping("/departamento-costa")
    public List<DepartamentoRegionDto> departamentoCosta() {
        return departamentoRepositorio.obtenerDepartamentoCosta();
    }
    
    @GetMapping("/departamento-sierra")
    public List<DepartamentoRegionDto> departamentoSierra() {
        return departamentoRepositorio.obtenerDepartamentoSierra();
    }
    
    @GetMapping("/departamento-selva")
    public List<DepartamentoRegionDto> departamentoSelva() {
        return departamentoRepositorio.obtenerDepartamentoSelva();
    }
}
