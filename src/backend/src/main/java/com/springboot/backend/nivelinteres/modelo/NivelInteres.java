package com.springboot.backend.nivelinteres.modelo;

import java.util.List;
import java.util.Objects;

import com.springboot.backend.usuario.modelo.Usuario;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="nivelinteres")
public class NivelInteres {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="nombre", nullable = false, length=70)
    private String nombre;

    @OneToMany(mappedBy = "nivelInteres", fetch=FetchType.EAGER)
    private List<Usuario> usuario;

    public NivelInteres(){}

    public NivelInteres(Long id, String nombre, List<Usuario> usuario) {
        this.id = id;
        this.nombre = nombre;
        this.usuario = usuario;
    }

    public NivelInteres(String nombre, List<Usuario> usuario) {
        this.nombre = nombre;
        this.usuario = usuario;
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
        NivelInteres nivelInteres =(NivelInteres) o;
        return Objects.equals(id, nivelInteres.id) && Objects.equals(nombre, nivelInteres.nombre);
    }
}
