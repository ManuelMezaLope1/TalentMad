package com.springboot.backend.tipouniversidad.modelo;

import java.util.List;
import java.util.Objects;

import com.springboot.backend.universidad.modelo.Universidad;

import jakarta.persistence.*;

@Entity
@Table(name="tipo_universidad")
public class TipoUniversidad {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="nombre", nullable = false, length=60)
    private String nombre;

    @OneToMany(mappedBy = "tipoUniversidad", fetch = FetchType.EAGER)
    private List<Universidad> universidad;

    public TipoUniversidad(){}

    public TipoUniversidad(Long id, String nombre, List<Universidad> universidad) {
        this.id = id;
        this.nombre = nombre;
        this.universidad = universidad;
    }

    public TipoUniversidad(String nombre, List<Universidad> universidad) {
        this.nombre = nombre;
        this.universidad = universidad;
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

    public List<Universidad> getUniversidad() {
        return universidad;
    }

    public void setUniversidad(List<Universidad> universidad) {
        this.universidad = universidad;
    }

    @Override
    public boolean equals(Object o){
        if (this==o) return true;
        if(o==null || getClass() !=o.getClass()) return false;
        TipoUniversidad tipoUniversidad =(TipoUniversidad) o;
        return Objects.equals(id, tipoUniversidad.id) && Objects.equals(nombre, tipoUniversidad.nombre);
    }
}
