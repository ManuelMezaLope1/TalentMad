package com.springboot.backend.tipouniversidad.controlador;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.backend.tipouniversidad.modelo.TipoUniversidad;
import com.springboot.backend.tipouniversidad.repositorio.TipoUniversidadRepositorio;

import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/v1/public")
public class TipoUniversidadControlador {
    @Autowired
    private TipoUniversidadRepositorio tipoUniversidadRepositorio;

    @GetMapping("/tipo-universidad")
    public List<TipoUniversidad> listarTodosLosTiposDeUniversidad() {
        return tipoUniversidadRepositorio.findAll();
    }
    
}
