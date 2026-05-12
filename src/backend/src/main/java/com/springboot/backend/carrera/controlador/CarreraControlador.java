package com.springboot.backend.carrera.controlador;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.backend.carrera.modelo.Carrera;
import com.springboot.backend.carrera.repositorio.CarreraRepositorio;
import com.springboot.backend.excepcion.ResourceNotFoundException;

@RestController
@RequestMapping("/api/v1/public")
public class CarreraControlador {
    @Autowired
    private CarreraRepositorio carreraRepositorio;

    @GetMapping("/carreras")
    public List<Carrera> listarTodasLasCarreras(){
        return carreraRepositorio.findAll();
    }

    @PostMapping("/carreras")
    public Carrera guardarCarrera(@RequestBody Carrera carrera){
        return carreraRepositorio.save(carrera);
    }

    @GetMapping("/carreras/{id}")
    public ResponseEntity<Carrera> obtenerCarreraPorId(@PathVariable Long id){
        Carrera carrera=carreraRepositorio.findById(id).orElseThrow(()->new ResourceNotFoundException("No existe la carrera con el id: +id"));
        return ResponseEntity.ok(carrera);
    }

    @PutMapping("/carreras/{id}")
    public ResponseEntity<Carrera> actualizarCarrera(@PathVariable Long id, @RequestBody Carrera detallesCarrera){
        Carrera carreraExistente=carreraRepositorio.findById(id).orElseThrow(()->new ResourceNotFoundException("No existe la carrera con el id: "+id));

        carreraExistente.setNombre(detallesCarrera.getNombre());
        carreraExistente.setDescripcion(detallesCarrera.getDescripcion());
        carreraExistente.setDuracion(detallesCarrera.getDuracion());
        carreraExistente.setTipoCarrera(detallesCarrera.getTipoCarrera());
        carreraExistente.setUniversidad(detallesCarrera.getUniversidad());

        Carrera carreraActualizada=carreraRepositorio.save(carreraExistente);

        return ResponseEntity.ok(carreraActualizada);
    }

    @DeleteMapping("/carreras/{id}")
    public ResponseEntity<Map<String,Boolean>> eliminarCarrera(@PathVariable Long id){
        Carrera carrera=carreraRepositorio.findById(id).orElseThrow(()->new ResourceNotFoundException("No existe la carrera con el id: "+id));

        carreraRepositorio.delete(carrera);
        Map<String,Boolean> respuesta=new HashMap<>();
        respuesta.put("eliminar", Boolean.TRUE);

        return ResponseEntity.ok(respuesta);
    }
}
