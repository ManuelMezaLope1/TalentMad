package com.springboot.backend.universidad.controlador;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.backend.excepcion.ResourceNotFoundException;
import com.springboot.backend.universidad.modelo.Universidad;
import com.springboot.backend.universidad.repositorio.UniversidadRepositorio;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api/v1/public")
public class UniversidadControlador {
    @Autowired
    private UniversidadRepositorio universidadRepositorio;

    @GetMapping("/universidad")
    public List<Universidad> listarTodasLasUniversidades() {
        return universidadRepositorio.findAll();
    }
    
    @PostMapping("/universidad")
    public Universidad guardarUniversidad(@RequestBody Universidad universidad) {
        return universidadRepositorio.save(universidad);
    }
    
    @GetMapping("/universidad/{id}")
    public ResponseEntity<Universidad> obtenerUniversidadPorId(@PathVariable Long id) {
        Universidad universidad=universidadRepositorio.findById(id).orElseThrow(()->new ResourceNotFoundException("No existe la universidad con el id: "+id));
        return ResponseEntity.ok(universidad);
    }
    
    @PutMapping("/universidad/{id}")
    public ResponseEntity<Universidad> actualizarUniversidad(@PathVariable Long id, @RequestBody Universidad detallesUniversidad) {
        Universidad universidadExistente=universidadRepositorio.findById(id).orElseThrow(()->new ResourceNotFoundException("No existe la universidad con el id: "+id));

        universidadExistente.setNombre(detallesUniversidad.getNombre());
        universidadExistente.setDepartamento(detallesUniversidad.getDepartamento());
        universidadExistente.setCostoMensualMinimo(detallesUniversidad.getCostoMensualMinimo());
        universidadExistente.setCostoMensualMaximo((detallesUniversidad.getCostoMensualMaximo()));
        universidadExistente.setTipoUniversidad(detallesUniversidad.getTipoUniversidad());

        Universidad universidadActualizada=universidadRepositorio.save(universidadExistente);
        
        return ResponseEntity.ok(universidadActualizada);
    }

    @DeleteMapping("/universidad/{id}")
    public ResponseEntity<Map<String,Boolean>> eliminarUniversidad(@PathVariable Long id){
        Universidad universidad=universidadRepositorio.findById(id).orElseThrow(()->new ResourceNotFoundException("No existe la universidad con el id: "+id));

        universidadRepositorio.delete(universidad);
        Map<String,Boolean> respuesta=new HashMap<>();
        respuesta.put("eliminar", Boolean.TRUE);

        return ResponseEntity.ok(respuesta);
    }
}
