package com.springboot.backend.departamento.modelo;

import java.util.List;
import java.util.Objects;

import com.springboot.backend.universidad.modelo.Universidad;

import jakarta.persistence.*;

@Entity
@Table(name="departamento")
public class Departamento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="nombre", nullable = false, length = 60)
    private String nombre;

    @OneToMany(mappedBy = "departamento", fetch=FetchType.EAGER)
    private List<Universidad> universidad;

    public Departamento(){}

    public Departamento(Long id, String nombre, List<Universidad> universidad) {
        this.id = id;
        this.nombre = nombre;
        this.universidad = universidad;
    }

    public Departamento(String nombre, List<Universidad> universidad) {
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
        Departamento departamento =(Departamento) o;
        return Objects.equals(id, departamento.id) && Objects.equals(nombre, departamento.nombre);
    }
}
