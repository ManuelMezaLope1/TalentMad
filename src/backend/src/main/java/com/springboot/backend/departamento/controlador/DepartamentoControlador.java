package com.springboot.backend.departamento.controlador;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.backend.departamento.modelo.Departamento;
import com.springboot.backend.departamento.repositorio.DepartamentoRepositorio;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/v1/public")
public class DepartamentoControlador {
    @Autowired
    private DepartamentoRepositorio departamentoRepositorio;

    @GetMapping("/departamento")
    public List<Departamento> listarTodosLosDepartamentos() {
        return departamentoRepositorio.findAll();
    }
    
}
