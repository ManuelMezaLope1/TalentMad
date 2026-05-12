package com.springboot.backend.categoriapreguntas.controlador;

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

import com.springboot.backend.categoriapreguntas.modelo.CategoriaPreguntas;
import com.springboot.backend.categoriapreguntas.repositorio.CategoriaPreguntasRepositorio;
import com.springboot.backend.excepcion.ResourceNotFoundException;

@RestController
@RequestMapping("/api/v1/public")
public class CategoriaPreguntasControlador {
    @Autowired
    private CategoriaPreguntasRepositorio categoriaPreguntasRepositorio;

    @GetMapping("/categoria-preguntas")
    public List<CategoriaPreguntas> listarTodasLasCategorias() {
        return categoriaPreguntasRepositorio.findAll();
    }

    @PostMapping("/categoria-preguntas")
    public CategoriaPreguntas guardarCategoria(@RequestBody CategoriaPreguntas categoria) {
        return categoriaPreguntasRepositorio.save(categoria);
    }
    
    @GetMapping("/categoria-preguntas/{id}")
    public ResponseEntity<CategoriaPreguntas> obtenerCategoriaPorId(@PathVariable Long id) {
        CategoriaPreguntas categoria=categoriaPreguntasRepositorio.findById(id).orElseThrow(()-> new ResourceNotFoundException("No existe la categoria con el id: "+id));
        return ResponseEntity.ok(categoria);
    }
    
    @PutMapping("/categoria-preguntas/{id}")
    public ResponseEntity<CategoriaPreguntas> actualizarCategoria(@PathVariable Long id, @RequestBody CategoriaPreguntas detallesCategoria) {
        CategoriaPreguntas categoriaExistente=categoriaPreguntasRepositorio.findById(id).orElseThrow(()->new ResourceNotFoundException("No existe la categoria con el id: "+id));
        
        categoriaExistente.setNombre(detallesCategoria.getNombre());

        CategoriaPreguntas categoriaActualizada=categoriaPreguntasRepositorio.save(categoriaExistente);

        return ResponseEntity.ok(categoriaActualizada);
    }

    @DeleteMapping("/categoria-preguntas/{id}")
    public ResponseEntity<Map<String,Boolean>> eliminarCategoria(@PathVariable Long id){
        CategoriaPreguntas categoria=categoriaPreguntasRepositorio.findById(id).orElseThrow(()->new ResourceNotFoundException("No existe la categoria con el id: "+id));

        categoriaPreguntasRepositorio.delete(categoria);
        Map<String,Boolean> respuesta=new HashMap<>();
        respuesta.put("eliminar", Boolean.TRUE);

        return ResponseEntity.ok(respuesta);
    }
}
