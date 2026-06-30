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
import com.springboot.backend.universidad.modelo.Universidad;
import com.springboot.backend.universidad.repositorio.UniversidadRepositorio;
import com.springboot.backend.universidadcarrera.modelo.UniversidadCarrera;
import com.springboot.backend.universidadcarrera.modelo.UniversidadCarreraDto;
import com.springboot.backend.universidadcarrera.repositorio.UniversidadCarreraRepositorio;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
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

        Long universidadId=relaciones.get(0).getUniversidadId();

        universidadCarreraRepositorio.deleteByUniversidadId((universidadId));

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
}
