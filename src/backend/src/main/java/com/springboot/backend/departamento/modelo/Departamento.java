package com.springboot.backend.departamento.modelo;

import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.springboot.backend.universidad.modelo.Universidad;
import com.springboot.backend.usuario.modelo.Usuario;

import jakarta.persistence.*;

@Entity
@Table(name="departamento")
public class Departamento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="nombre", nullable = false, length = 60)
    private String nombre;

    @Column(name="region", nullable=false, length=100)
    private String region;

    @OneToMany(mappedBy = "departamento", fetch=FetchType.EAGER)
    private List<Universidad> universidad;

    @JsonIgnore
    @OneToMany(mappedBy = "departamento", fetch=FetchType.EAGER)
    private List<Usuario> usuario;

    public Departamento(){}

    public Departamento(Long id, String nombre, String region, List<Universidad> universidad, List<Usuario> usuario) {
        this.id = id;
        this.nombre = nombre;
        this.region=region;
        this.universidad = universidad;
        this.usuario=usuario;
    }

    public Departamento(String nombre, String region, List<Universidad> universidad, List<Usuario> usuario) {
        this.nombre = nombre;
        this.region=region;
        this.universidad = universidad;
        this.usuario=usuario;
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

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public List<Universidad> getUniversidad() {
        return universidad;
    }

    public void setUniversidad(List<Universidad> universidad) {
        this.universidad = universidad;
    }

    public List<Usuario> getUsuario() {
        return usuario;
    }

    public void setUsuario(List<Usuario> usuario) {
        this.usuario = usuario;
    }

    @Override
    public boolean equals(Object o){
        if (this==o) return true;
        if(o==null || getClass() !=o.getClass()) return false;
        Departamento departamento =(Departamento) o;
        return Objects.equals(id, departamento.id) && Objects.equals(nombre, departamento.nombre);
    }
}
