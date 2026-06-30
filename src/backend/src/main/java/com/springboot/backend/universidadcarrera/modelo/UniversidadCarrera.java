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

    @Column(name="ranking")
    private Integer ranking;

    @Column(name="total")
    private Double total;

    public UniversidadCarrera(){}

    public UniversidadCarrera(Long id, Universidad universidad, Carrera carrera, Integer ranking, Double total) {
        this.id = id;
        this.universidad = universidad;
        this.carrera = carrera;
        this.ranking=ranking;
        this.total=total;
    }

    public UniversidadCarrera(Universidad universidad, Carrera carrera, Integer ranking, Double total) {
        this.universidad = universidad;
        this.carrera = carrera;
        this.ranking=ranking;
        this.total=total;
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

    public Integer getRanking() {
        return ranking;
    }

    public void setRanking(Integer ranking) {
        this.ranking = ranking;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
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
