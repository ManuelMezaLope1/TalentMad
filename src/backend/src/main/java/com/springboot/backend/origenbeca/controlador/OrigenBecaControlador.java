package com.springboot.backend.origenbeca.controlador;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.backend.excepcion.ResourceNotFoundException;
import com.springboot.backend.origenbeca.modelo.OrigenBeca;
import com.springboot.backend.origenbeca.repositorio.OrigenBecaRepositorio;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;




@RestController
@RequestMapping("api/v1/public")
public class OrigenBecaControlador {
    @Autowired
    private OrigenBecaRepositorio origenBecaRepositorio;

    @GetMapping("/origen-beca")
    public List<OrigenBeca> listarTodosLosOrigenesBecas() {
        return origenBecaRepositorio.findAll();
    }
    
    @PostMapping("/origen-beca")
    public OrigenBeca guardarOrigenBeca(@RequestBody OrigenBeca origenBeca) {
        return origenBecaRepositorio.save(origenBeca);
    }
    
    @GetMapping("/origen-beca/{id}")
    public ResponseEntity<OrigenBeca> obtenerOrigenBecaPorId (@PathVariable Long id) {
        OrigenBeca or=origenBecaRepositorio.findById(id).orElseThrow(()->new ResourceNotFoundException("No existe el origen beca con el id: "+id));
        return ResponseEntity.ok(or);
    }
    
    @PutMapping("/origen-beca/{id}")
    public ResponseEntity<OrigenBeca> actualizarOrigenBeca(@PathVariable Long id, @RequestBody OrigenBeca detallesOrigenBeca) {
        OrigenBeca orExistente=origenBecaRepositorio.findById(id).orElseThrow(()->new ResourceNotFoundException("No existe el origen beca con el id: "+id));

        orExistente.setNombre(detallesOrigenBeca.getNombre());

        OrigenBeca orActualizada=origenBecaRepositorio.save(orExistente);
        
        return ResponseEntity.ok(orActualizada);
    }
}
