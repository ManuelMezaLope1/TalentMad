package com.springboot.backend.origenbeca.modelo;

import java.util.List;

import com.springboot.backend.beca.modelo.Beca;

import jakarta.persistence.*;

@Entity
@Table(name="origen_beca")
public class OrigenBeca {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @Column(name="nombre", nullable=false, length=100)
    private String nombre;

    @OneToMany(mappedBy="origenBeca", fetch=FetchType.EAGER)
    private List<Beca> beca;

    public OrigenBeca(){}

    public OrigenBeca(Long id, String nombre, List<Beca> beca) {
        this.id = id;
        this.nombre = nombre;
        this.beca = beca;
    }

    public OrigenBeca(String nombre, List<Beca> beca) {
        this.nombre = nombre;
        this.beca = beca;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public List<Beca> getBeca() {
        return beca;
    }

    public void setBeca(List<Beca> beca) {
        this.beca = beca;
    }
}
