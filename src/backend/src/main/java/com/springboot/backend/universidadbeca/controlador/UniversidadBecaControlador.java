package com.springboot.backend.universidadbeca.controlador;

import org.springframework.web.bind.annotation.RestController;

import com.springboot.backend.beca.modelo.Beca;
import com.springboot.backend.beca.repositorio.BecaRepositorio;
import com.springboot.backend.excepcion.ResourceNotFoundException;
import com.springboot.backend.universidad.modelo.Universidad;
import com.springboot.backend.universidad.repositorio.UniversidadRepositorio;
import com.springboot.backend.universidadbeca.modelo.UniversidadBeca;
import com.springboot.backend.universidadbeca.modelo.UniversidadBecaDto;
import com.springboot.backend.universidadbeca.modelo.UniversidadesBecasDto;
import com.springboot.backend.universidadbeca.repositorio.UniversidadBecaRepositorio;
import com.springboot.backend.universidadcarrera.modelo.UniversidadCarrera;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/v1/public")
public class UniversidadBecaControlador {
        @Autowired
        private UniversidadBecaRepositorio universidadBecaRepositorio;

        @Autowired
        private UniversidadRepositorio universidadRepositorio;

        @Autowired
        private BecaRepositorio becaRepositorio;

        @GetMapping("/universidad-beca/lote")
        public List<UniversidadBeca> listarTodasLasUniversidadesBecas() {
                return universidadBecaRepositorio.findAll();
        }

        @GetMapping("/universidad-beca")
        public List<UniversidadesBecasDto> obtenerBecasPorUniversidad(@RequestParam String nombre) {
                return universidadBecaRepositorio.obtenerBecasPorUniversidad(nombre);
        }

        @PostMapping("/universidad-beca/lote")
        public ResponseEntity<?> guardarLote(
                        @RequestBody List<UniversidadBecaDto> relaciones) {
                Long universidadId = relaciones.get(0).getUniversidadId();

                universidadBecaRepositorio.deleteByUniversidadId(universidadId);
                
                List<UniversidadBeca> lista = new ArrayList<>();

                int insertados = 0;
                int omitidos = 0;

                List<String> duplicados = new ArrayList<>();

                for (UniversidadBecaDto dto : relaciones) {
                        Universidad universidad = universidadRepositorio
                                        .findById(dto.getUniversidadId())
                                        .orElseThrow(() -> new RuntimeException("Carrera no encontrada"));

                        Beca beca = becaRepositorio
                                        .findById(dto.getBecaId())
                                        .orElseThrow(() -> new RuntimeException("Universidad no encontrada"));

                        boolean existe = universidadBecaRepositorio
                                        .existsByUniversidadIdAndBecaId(
                                                        universidad.getId(),
                                                        beca.getId());

                        if (existe) {

                                duplicados.add(
                                                universidad.getNombre()
                                                                + " - "
                                                                + beca.getNombre());

                                omitidos++;
                                continue;
                        }

                        UniversidadBeca uc = new UniversidadBeca();

                        uc.setUniversidad(universidad);
                        uc.setBeca(beca);

                        lista.add(uc);

                        insertados++;
                }

                if (!lista.isEmpty()) {
                        universidadBecaRepositorio.saveAll(lista);
                }

                Map<String, Object> respuesta = new HashMap<>();

                respuesta.put("insertados", insertados);
                respuesta.put("omitidos", omitidos);
                respuesta.put("duplicados", duplicados);

                return ResponseEntity.ok(respuesta);
        }

        @GetMapping("/universidad-beca/lote/{id}")
        public ResponseEntity<List<UniversidadBeca>> obtenerPorUniversidadId(@PathVariable Long id) {
                List<UniversidadBeca> lista = universidadBecaRepositorio.findByUniversidadId(id);
                if (lista.isEmpty()) {
                        throw new ResourceNotFoundException(
                                        "No existen becas para la universidad con id: " + id);
                }
                return ResponseEntity.ok(lista);
        }

}