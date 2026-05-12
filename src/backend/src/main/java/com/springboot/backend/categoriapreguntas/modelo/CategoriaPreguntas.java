package com.springboot.backend.categoriapreguntas.modelo;

import java.util.List;
import java.util.Objects;

import com.springboot.backend.preguntas.modelo.Pregunta;

import jakarta.persistence.*;

@Entity
@Table(name="categoria_preguntas")
public class CategoriaPreguntas {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="nombre", nullable = false, length = 60)
    private String nombre;

    @OneToMany(mappedBy = "categoriaPreguntas", fetch=FetchType.EAGER)
    public List<Pregunta> preguntas;

    public CategoriaPreguntas(){}

    public CategoriaPreguntas(Long id, String nombre, List<Pregunta> preguntas) {
        this.id = id;
        this.nombre = nombre;
        this.preguntas = preguntas;
    }

    public CategoriaPreguntas(String nombre, List<Pregunta> preguntas) {
        this.nombre = nombre;
        this.preguntas = preguntas;
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

    public List<Pregunta> getPreguntas() {
        return preguntas;
    }

    public void setPreguntas(List<Pregunta> preguntas) {
        this.preguntas = preguntas;
    }

    @Override
    public boolean equals(Object o){
        if (this==o) return true;
        if(o==null || getClass() !=o.getClass()) return false;
        CategoriaPreguntas categoria =(CategoriaPreguntas) o;
        return Objects.equals(id, categoria.id) && Objects.equals(nombre, categoria.nombre);
    }
}
