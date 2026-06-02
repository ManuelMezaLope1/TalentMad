package com.springboot.backend.universidadbeca.controlador;

import org.springframework.web.bind.annotation.RestController;

import com.springboot.backend.beca.modelo.Beca;
import com.springboot.backend.beca.repositorio.BecaRepositorio;
import com.springboot.backend.universidad.modelo.Universidad;
import com.springboot.backend.universidad.repositorio.UniversidadRepositorio;
import com.springboot.backend.universidadbeca.modelo.UniversidadBeca;
import com.springboot.backend.universidadbeca.modelo.UniversidadBecaDto;
import com.springboot.backend.universidadbeca.repositorio.UniversidadBecaRepositorio;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/v1/public")
public class UniversidadBecaControlador {
    @Autowired
    private UniversidadBecaRepositorio universidadBecaRepositorio;

    @Autowired
    private UniversidadRepositorio universidadRepositorio;

    @Autowired
    private BecaRepositorio becaRepositorio;

    @PostMapping("/universidad-beca/lote")
    public ResponseEntity<?> guardarLote(
            @RequestBody List<UniversidadBecaDto> relaciones) {
System.out.println("ENTRO A UNIVERSIDAD-BECA");
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
}