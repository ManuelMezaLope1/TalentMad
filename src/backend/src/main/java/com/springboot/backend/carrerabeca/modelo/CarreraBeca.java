package com.springboot.backend.carrerabeca.modelo;

import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.springboot.backend.beca.modelo.Beca;
import com.springboot.backend.carrera.modelo.Carrera;

import jakarta.persistence.*;

@Entity
@Table(name="carrera_beca")
public class CarreraBeca {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="carrera_id")
    @JsonIgnoreProperties({"carrera_beca"})
    private Carrera carrera;

    @ManyToOne
    @JoinColumn(name="beca_id")
    @JsonIgnoreProperties({"carrera_beca"})
    private Beca beca;

    public CarreraBeca(){}

    public CarreraBeca(Long id, Carrera carrera, Beca beca) {
        this.id = id;
        this.carrera = carrera;
        this.beca = beca;
    }

    public CarreraBeca(Carrera carrera, Beca beca) {
        this.carrera = carrera;
        this.beca = beca;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Carrera getCarrera() {
        return carrera;
    }

    public void setCarrera(Carrera carrera) {
        this.carrera = carrera;
    }

    public Beca getBeca() {
        return beca;
    }

    public void setBeca(Beca beca) {
        this.beca = beca;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        CarreraBeca carreraBeca = (CarreraBeca) o;
        return Objects.equals(id, carreraBeca.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
