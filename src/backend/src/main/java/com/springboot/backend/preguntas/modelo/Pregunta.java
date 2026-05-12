package com.springboot.backend.preguntas.modelo;

import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.springboot.backend.categoriapreguntas.modelo.CategoriaPreguntas;
import com.springboot.backend.respuesta.modelo.Respuesta;

import jakarta.persistence.*;

@Entity
@Table(name="preguntas")
public class Pregunta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="preguntas", nullable = false, length=100)
    private String preguntas;

    @ManyToOne
    @JoinColumn(name="categoria_preguntas_id")
    @JsonIgnoreProperties({"preguntas"})
    private CategoriaPreguntas categoriaPreguntas;

    @OneToMany(mappedBy = "respuestaPreguntas", fetch=FetchType.EAGER)
    private List<Respuesta> respuestas;

    public Pregunta(){}

    public Pregunta(Long id, String preguntas, CategoriaPreguntas categoriaPreguntas, List<Respuesta> respuestas) {
        this.id = id;
        this.preguntas = preguntas;
        this.categoriaPreguntas = categoriaPreguntas;
        this.respuestas = respuestas;
    }

    public Pregunta(String preguntas, CategoriaPreguntas categoriaPreguntas, List<Respuesta> respuestas) {
        this.preguntas = preguntas;
        this.categoriaPreguntas = categoriaPreguntas;
        this.respuestas = respuestas;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPreguntas() {
        return preguntas;
    }

    public void setPreguntas(String preguntas) {
        this.preguntas = preguntas;
    }

    public CategoriaPreguntas getCategoriaPreguntas() {
        return categoriaPreguntas;
    }

    public void setCategoriaPreguntas(CategoriaPreguntas categoriaPreguntas) {
        this.categoriaPreguntas = categoriaPreguntas;
    }

    public List<Respuesta> getRespuestas() {
        return respuestas;
    }

    public void setRespuestas(List<Respuesta> respuestas) {
        this.respuestas = respuestas;
    }

    @Override
    public boolean equals(Object o){
        if(this==o)return true;
        if(o==null || getClass() !=o.getClass()) return false;
        Pregunta preguntas=(Pregunta) o;
        return Objects.equals(id, preguntas.id);
    }

    @Override
    public int hashCode(){
        return Objects.hash(id);
    }
}
