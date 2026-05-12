package com.springboot.backend.preguntas.controlador;

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

import com.springboot.backend.excepcion.ResourceNotFoundException;
import com.springboot.backend.preguntas.modelo.Pregunta;
import com.springboot.backend.preguntas.repositorio.PreguntaRepositorio;

@RestController
@RequestMapping("/api/v1/public")
public class PreguntaControlador {
    @Autowired
    private PreguntaRepositorio preguntaRepositorio;

    @GetMapping("/preguntas")
    public List<Pregunta> listarTodasLasPreguntas(){
        return preguntaRepositorio.findAll();
    }

    @PostMapping("/preguntas")
    public Pregunta guardarPregunta(@RequestBody Pregunta pregunta){
        return preguntaRepositorio.save(pregunta);
    }

    @GetMapping("/preguntas/{id}")
    public ResponseEntity<Pregunta> obtenerPreguntaPorId(@PathVariable Long id){
        Pregunta pregunta=preguntaRepositorio.findById(id).orElseThrow(()->new ResourceNotFoundException("No existe la pregunta con el id: "+id));
        return ResponseEntity.ok(pregunta);
    }

    @PutMapping("/preguntas/{id}")
    public ResponseEntity<Pregunta> actualizarPregunta(@PathVariable Long id, @RequestBody Pregunta detallesPregunta){
        Pregunta preguntaExistente=preguntaRepositorio.findById(id).orElseThrow(()->new ResourceNotFoundException("No existe la pregunta con el id: "+id));

        preguntaExistente.setPreguntas(detallesPregunta.getPreguntas());
        preguntaExistente.setCategoriaPreguntas(detallesPregunta.getCategoriaPreguntas());

        Pregunta preguntaActualizada=preguntaRepositorio.save(preguntaExistente);

        return ResponseEntity.ok(preguntaActualizada);
    }

    @DeleteMapping("/preguntas/{id}")
    public ResponseEntity<Map<String,Boolean>> eliminarPregunta(@PathVariable Long id){
        Pregunta pregunta=preguntaRepositorio.findById(id).orElseThrow(()->new ResourceNotFoundException("No existe la pregunta con el id: "+id));

        preguntaRepositorio.delete(pregunta);
        Map<String,Boolean> respuesta=new HashMap<>();
        respuesta.put("eliminar", Boolean.TRUE);

        return ResponseEntity.ok(respuesta);
    }
}
