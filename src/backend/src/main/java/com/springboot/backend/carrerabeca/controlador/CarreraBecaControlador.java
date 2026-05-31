package com.springboot.backend.carrerabeca.controlador;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.backend.beca.modelo.Beca;
import com.springboot.backend.beca.repositorio.BecaRepositorio;
import com.springboot.backend.carrera.modelo.Carrera;
import com.springboot.backend.carrera.repositorio.CarreraRepositorio;
import com.springboot.backend.carrerabeca.modelo.CarreraBeca;
import com.springboot.backend.carrerabeca.modelo.CarreraBecaDto;
import com.springboot.backend.carrerabeca.repositorio.CarreraBecaRepositorio;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("/api/v1/public")
public class CarreraBecaControlador {
    @Autowired
    private CarreraBecaRepositorio carreraBecaRepositorio;

    @Autowired
    private CarreraRepositorio carreraRepositorio;

    @Autowired
    private BecaRepositorio becaRepositorio;

    @PostMapping("/carrera-beca/lote")
    public ResponseEntity<?> guardarLote(
            @RequestBody List<CarreraBecaDto> relaciones) {

        List<CarreraBeca> lista = new ArrayList<>();

        int insertados = 0;
        int omitidos = 0;

        List<String> duplicados = new ArrayList<>();

        for (CarreraBecaDto dto : relaciones) {
            Carrera carrera = carreraRepositorio
                    .findById(dto.getCarreraId())
                    .orElseThrow(() -> new RuntimeException("Carrera no encontrada"));

            Beca beca = becaRepositorio
                    .findById(dto.getBecaId())
                    .orElseThrow(() -> new RuntimeException("Universidad no encontrada"));

            boolean existe = carreraBecaRepositorio
                    .existsByCarreraIdAndBecaId(
                            carrera.getId(),
                            beca.getId());

            if (existe) {

                duplicados.add(
                        carrera.getNombre()
                                + " - "
                                + beca.getNombre());

                omitidos++;
                continue;
            }

            CarreraBeca uc = new CarreraBeca();

            uc.setCarrera(carrera);
            uc.setBeca(beca);

            lista.add(uc);

            insertados++;
        }

        if (!lista.isEmpty()) {
            carreraBecaRepositorio.saveAll(lista);
        }

        Map<String, Object> respuesta = new HashMap<>();

        respuesta.put("insertados", insertados);
        respuesta.put("omitidos", omitidos);
        respuesta.put("duplicados", duplicados);

        return ResponseEntity.ok(respuesta);
    }
}
