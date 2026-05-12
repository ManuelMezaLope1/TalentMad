package com.springboot.backend.respuesta.controlador;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.backend.excepcion.ResourceNotFoundException;
import com.springboot.backend.respuesta.modelo.Respuesta;
import com.springboot.backend.respuesta.repositorio.RespuestaRepositorio;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;




@RestController
@RequestMapping("/api/v1/public")
public class RespuestaControlador {
    @Autowired
    private RespuestaRepositorio respuestaRepositorio;

    @GetMapping("/respuestas")
    public List<Respuesta> listarTodasLasRespuestas() {
        return respuestaRepositorio.findAll();
    }

    @PostMapping("/respuestas")
    public Respuesta guardRespuesta(@RequestBody Respuesta respuesta) {
        return respuestaRepositorio.save(respuesta);
    }
    
    @GetMapping("/respuestas/{id}")
    public ResponseEntity<Respuesta> obtenerRespuestaPorId(@PathVariable Long id) {
        Respuesta respuesta=respuestaRepositorio.findById(id).orElseThrow(()->new ResourceNotFoundException("No existe la respuesta con el id: "+id));
        return ResponseEntity.ok(respuesta);
    }
    
    @PutMapping("/respuestas/{id}")
    public ResponseEntity<Respuesta> actualizarRespuesta(@PathVariable Long id, @RequestBody Respuesta detallesRespuesta) {
        Respuesta respuestaExistente=respuestaRepositorio.findById(id).orElseThrow(()->new ResourceNotFoundException("No existe la respuesta con el id: "+id));

        respuestaExistente.setNombre(detallesRespuesta.getNombre());
        respuestaExistente.setRespuestaPreguntas(detallesRespuesta.getRespuestaPreguntas());

        Respuesta respuestaActualizada=respuestaRepositorio.save(respuestaExistente);
        
        return ResponseEntity.ok(respuestaActualizada);
    }

    @DeleteMapping("/respuestas/{id}")
    public ResponseEntity<Map<String,Boolean>> eliminarRespuesta(@PathVariable Long id){
        Respuesta respuesta=respuestaRepositorio.findById(id).orElseThrow(()->new ResourceNotFoundException("No existe la respuesta con el id: "+id));

        respuestaRepositorio.delete(respuesta);
        Map<String,Boolean> resp=new HashMap<>();
        resp.put("eliminar", Boolean.TRUE);

        return ResponseEntity.ok(resp);
    }
}
