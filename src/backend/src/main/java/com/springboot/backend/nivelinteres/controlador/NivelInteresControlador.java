package com.springboot.backend.nivelinteres.controlador;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.backend.nivelinteres.modelo.NivelInteres;
import com.springboot.backend.nivelinteres.repositorio.NivelInteresRepositorio;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/v1")
public class NivelInteresControlador {
    @Autowired
    private NivelInteresRepositorio nivelInteresRepositorio;

    @GetMapping("/nivelinteres")
    public List<NivelInteres> listarTodosLosNivelesDeInteres() {
        return nivelInteresRepositorio.findAll();
    }
}
