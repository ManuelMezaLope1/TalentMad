package com.springboot.backend.universidadcarrera.modelo;

import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.springboot.backend.carrera.modelo.Carrera;
import com.springboot.backend.universidad.modelo.Universidad;

import jakarta.persistence.*;

@Entity
@Table(name="universidad_carrera")
public class UniversidadCarrera {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="universidad_id")
    @JsonIgnoreProperties({"universidad_carrera"})
    private Universidad universidad;

    @ManyToOne
    @JoinColumn(name="carrera_id")
    @JsonIgnoreProperties({"universidad_carrera"})
    private Carrera carrera;

    public UniversidadCarrera(){}

    public UniversidadCarrera(Long id, Universidad universidad, Carrera carrera) {
        this.id = id;
        this.universidad = universidad;
        this.carrera = carrera;
    }

    public UniversidadCarrera(Universidad universidad, Carrera carrera) {
        this.universidad = universidad;
        this.carrera = carrera;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Universidad getUniversidad() {
        return universidad;
    }

    public void setUniversidad(Universidad universidad) {
        this.universidad = universidad;
    }

    public Carrera getCarrera() {
        return carrera;
    }

    public void setCarrera(Carrera carrera) {
        this.carrera = carrera;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        UniversidadCarrera universidadCarrera = (UniversidadCarrera) o;
        return Objects.equals(id, universidadCarrera.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
