package com.springboot.backend.respuesta.modelo;

import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.springboot.backend.preguntas.modelo.Pregunta;

import jakarta.persistence.*;

@Entity
@Table(name = "respuesta")
public class Respuesta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre", nullable = false, length = 60)
    private String nombre;

    @ManyToOne
    @JoinColumn(name = "pregunta_id")
    @JsonIgnoreProperties({"respuestas"})
    private Pregunta respuestaPreguntas;

    public Respuesta() {
    }

    public Respuesta(Long id, String nombre, Pregunta respuestaPreguntas) {
        this.id = id;
        this.nombre = nombre;
        this.respuestaPreguntas = respuestaPreguntas;
    }

    public Respuesta(String nombre, Pregunta respuestaPreguntas) {
        this.nombre = nombre;
        this.respuestaPreguntas = respuestaPreguntas;
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

    public Pregunta getRespuestaPreguntas() {
        return respuestaPreguntas;
    }

    public void setRespuestaPreguntas(Pregunta respuestaPreguntas) {
        this.respuestaPreguntas = respuestaPreguntas;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        Respuesta respuesta = (Respuesta) o;
        return Objects.equals(id, respuesta.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
