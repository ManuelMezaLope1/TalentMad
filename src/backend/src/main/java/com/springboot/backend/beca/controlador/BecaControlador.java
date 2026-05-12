package com.springboot.backend.beca.controlador;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.backend.beca.modelo.Beca;
import com.springboot.backend.beca.repositorio.BecaRepositorio;
import com.springboot.backend.excepcion.ResourceNotFoundException;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api/v1/public")
public class BecaControlador {
    @Autowired
    private BecaRepositorio becaRepositorio;

    @GetMapping("/becas")
    public List<Beca> listarTodasLasBecas() {
        return becaRepositorio.findAll();
    }
    
    @PostMapping("/becas")
    public Beca guardarBeca(@RequestBody Beca beca) {
        return becaRepositorio.save(beca);
    }
    
    @GetMapping("/becas/{id}")
    public ResponseEntity<Beca> obtenerBecaPorId(@PathVariable Long id) {
        Beca beca=becaRepositorio.findById(id).orElseThrow(()->new ResourceNotFoundException("No existe la beca con el id: "+id));
        return ResponseEntity.ok(beca);
    }
    
    @PutMapping("/becas/{id}")
    public ResponseEntity<Beca> actualizarBeca(@PathVariable Long id, @RequestBody Beca detallesBeca) {
        Beca becaExistente=becaRepositorio.findById(id).orElseThrow(()->new ResourceNotFoundException("No existe la beca con el id: "+id));

        becaExistente.setNombre(detallesBeca.getNombre());
        becaExistente.setDescripcion(detallesBeca.getDescripcion());
        becaExistente.setDuracion(detallesBeca.getDuracion());;
        becaExistente.setObligacion(detallesBeca.getObligacion());
        becaExistente.setRequisito(detallesBeca.getRequisito());
        becaExistente.setRestriccion(detallesBeca.getRestriccion());
        becaExistente.setUrl(detallesBeca.getUrl());
        becaExistente.setTipoBeca(detallesBeca.getTipoBeca());
        becaExistente.setCarrera(detallesBeca.getCarrera());
        
        Beca becaActualizada=becaRepositorio.save(becaExistente);

        return ResponseEntity.ok(becaActualizada);
    }

    @DeleteMapping("/becas/{id}")
    public ResponseEntity<Map<String,Boolean>> eliminarBeca(@PathVariable Long id){
        Beca beca=becaRepositorio.findById(id).orElseThrow(()->new ResourceNotFoundException("No existe la beca con el id: "+id));

        becaRepositorio.delete(beca);
        Map<String,Boolean> respuesta=new HashMap<>();
        respuesta.put("eliminar", Boolean.TRUE);

        return ResponseEntity.ok(respuesta);
    }
}
