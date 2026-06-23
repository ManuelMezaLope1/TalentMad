package com.springboot.backend.historial.controlador;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;

import com.springboot.backend.excepcion.ResourceNotFoundException;
import com.springboot.backend.historial.modelo.Historial;
import com.springboot.backend.historial.repositorio.HistorialRepositorio;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/v1/private")
public class HistorialControlador {
    @Autowired
    private HistorialRepositorio historialRepositorio;

    @PostMapping("/historial")
    public Historial guardarHistorial(@RequestBody Historial historial) {
        return historialRepositorio.save(historial);
    }
 
    @GetMapping("/historial")
    public ResponseEntity<List<Historial>> obtenerHistorial(Authentication auth) {
        String username = auth.getName();

        List<Historial> historial = historialRepositorio.findByUsuarioUsername(username);

        return ResponseEntity.ok(historial);
    }

    @GetMapping("/historial/{id}")
    public ResponseEntity<Historial> obtenerHistorialPorId(@PathVariable Long id){
        Historial historial=historialRepositorio.findById(id).orElseThrow(()->new ResourceNotFoundException("No existe el historial con el id: "+id));
        return ResponseEntity.ok(historial);
    }
}
