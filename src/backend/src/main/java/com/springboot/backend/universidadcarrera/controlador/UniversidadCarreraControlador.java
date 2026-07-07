package com.springboot.backend.universidadcarrera.controlador;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.backend.carrera.modelo.Carrera;
import com.springboot.backend.carrera.repositorio.CarreraRepositorio;
import com.springboot.backend.excepcion.ResourceNotFoundException;
import com.springboot.backend.universidad.modelo.Universidad;
import com.springboot.backend.universidad.repositorio.UniversidadRepositorio;
import com.springboot.backend.universidadcarrera.modelo.UniversidadCarrera;
import com.springboot.backend.universidadcarrera.modelo.UniversidadCarreraDto;
import com.springboot.backend.universidadcarrera.repositorio.UniversidadCarreraRepositorio;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/v1/public")
public class UniversidadCarreraControlador {
    @Autowired
    private UniversidadCarreraRepositorio universidadCarreraRepositorio;

    @Autowired
    private UniversidadRepositorio universidadRepositorio;

    @Autowired
    private CarreraRepositorio carreraRepositorio;

    @GetMapping("/universidad-carrera/lote")
    public List<UniversidadCarrera> listarTodasUniversidadesCarreras() {
        return universidadCarreraRepositorio.findAll();
    }

    @PostMapping("/universidad-carrera/lote")
    public ResponseEntity<?> guardarLote(
            @RequestBody List<UniversidadCarreraDto> relaciones) {

        Long universidadId = relaciones.get(0).getUniversidadId();

        System.out.println("Antes: " +
                universidadCarreraRepositorio.findByUniversidadId(universidadId).size());

        universidadCarreraRepositorio.deleteByUniversidadId(universidadId);

        System.out.println("Después: " +
                universidadCarreraRepositorio.findByUniversidadId(universidadId).size());

        List<UniversidadCarrera> lista = new ArrayList<>();

        int insertados = 0;
        int omitidos = 0;

        List<String> duplicados = new ArrayList<>();

        for (UniversidadCarreraDto dto : relaciones) {

            Universidad universidad = universidadRepositorio
                    .findById(dto.getUniversidadId())
                    .orElseThrow(() -> new RuntimeException("Universidad no encontrada"));

            Carrera carrera = carreraRepositorio
                    .findById(dto.getCarreraId())
                    .orElseThrow(() -> new RuntimeException("Carrera no encontrada"));

            boolean existe = universidadCarreraRepositorio
                    .existsByUniversidadIdAndCarreraId(
                            universidad.getId(),
                            carrera.getId());

            if (existe) {

                duplicados.add(
                        universidad.getNombre()
                                + " - "
                                + carrera.getNombre());

                omitidos++;
                continue;
            }

            UniversidadCarrera uc = new UniversidadCarrera();

            uc.setUniversidad(universidad);
            uc.setCarrera(carrera);
            uc.setRanking(dto.getRanking());
            uc.setTotal(dto.getTotal());

            lista.add(uc);

            insertados++;
        }

        if (!lista.isEmpty()) {
            universidadCarreraRepositorio.saveAll(lista);
        }

        Map<String, Object> respuesta = new HashMap<>();

        respuesta.put("insertados", insertados);
        respuesta.put("omitidos", omitidos);
        respuesta.put("duplicados", duplicados);

        return ResponseEntity.ok(respuesta);
    }

    @GetMapping("/universidad-carrera/lote/{id}")
    public ResponseEntity<List<UniversidadCarrera>> obtenerPorUniversidadId(@PathVariable Long id) {
        List<UniversidadCarrera> lista = universidadCarreraRepositorio.findByUniversidadId(id);
        if (lista.isEmpty()) {
            throw new ResourceNotFoundException(
                    "No existen carreras para la universidad con id: " + id);
        }
        return ResponseEntity.ok(lista);
    }

    @GetMapping("/carrera-universidad/lote/{id}")
    public ResponseEntity<List<UniversidadCarrera>> obtenerPorCarreraId(@PathVariable Long id) {
        List<UniversidadCarrera> lista = universidadCarreraRepositorio.findByCarreraId(id);
        if (lista.isEmpty()) {
            throw new ResourceNotFoundException(
                    "No existen universidad para la carrera con id: " + id);
        }
        return ResponseEntity.ok(lista);
    }
}
