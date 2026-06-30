package com.springboot.backend.carrera.controlador;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.springboot.backend.carrera.modelo.Carrera;
import com.springboot.backend.carrera.repositorio.CarreraRepositorio;
import com.springboot.backend.excepcion.ResourceNotFoundException;

@RestController
@RequestMapping("/api/v1/public")
public class CarreraControlador {
    @Autowired
    private CarreraRepositorio carreraRepositorio;

    @GetMapping("/carreras")
    public List<Carrera> listarTodasLasCarreras() {
        return carreraRepositorio.findAll();
    }

    @PostMapping("/carreras")
    public Carrera guardarCarrera(@RequestPart("carrera") Carrera carrera, @RequestPart("imagen") MultipartFile imagen)
            throws IOException {
        String ruta = System.getProperty("user.dir") + "/src/frontend/public/";
        String nombreImagen = imagen.getOriginalFilename();
        Files.copy(
                imagen.getInputStream(),
                Paths.get(ruta + nombreImagen),
                StandardCopyOption.REPLACE_EXISTING);

        carrera.setImagen(nombreImagen);
        return carreraRepositorio.save(carrera);
    }

    @GetMapping("/carreras/{id}")
    public ResponseEntity<Carrera> obtenerCarreraPorId(@PathVariable Long id) {
        Carrera carrera = carreraRepositorio.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No existe la carrera con el id: +id"));
        return ResponseEntity.ok(carrera);
    }

    @PutMapping("/carreras/{id}")
    public ResponseEntity<Carrera> actualizarCarrera(@PathVariable Long id,
            @RequestPart("carrera") Carrera detallesCarrera,
            @RequestPart(value = "imagen", required = false) MultipartFile imagen) throws IOException {
        Carrera carreraExistente = carreraRepositorio.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No existe la carrera con el id: " + id));

        carreraExistente.setNombre(detallesCarrera.getNombre());
        carreraExistente.setDescripcion(detallesCarrera.getDescripcion());
        carreraExistente.setDuracion(detallesCarrera.getDuracion());
        carreraExistente.setTipoCarrera(detallesCarrera.getTipoCarrera());
        carreraExistente.setCombinacion(detallesCarrera.getCombinacion());

        if (imagen != null && !imagen.isEmpty()) {
            String nombreImagen = imagen.getOriginalFilename();

            carreraExistente.setImagen(nombreImagen);
        }

        Carrera carreraActualizada = carreraRepositorio.save(carreraExistente);

        return ResponseEntity.ok(carreraActualizada);
    }

    @DeleteMapping("/carreras/{id}")
    public ResponseEntity<Map<String, Boolean>> eliminarCarrera(@PathVariable Long id) {
        Carrera carrera = carreraRepositorio.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No existe la carrera con el id: " + id));

        carreraRepositorio.delete(carrera);
        Map<String, Boolean> respuesta = new HashMap<>();
        respuesta.put("eliminar", Boolean.TRUE);

        return ResponseEntity.ok(respuesta);
    }
}
