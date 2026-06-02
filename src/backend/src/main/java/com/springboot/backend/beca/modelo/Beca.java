package com.springboot.backend.beca.modelo;

import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.springboot.backend.carrera.modelo.Carrera;
import com.springboot.backend.universidad.modelo.Universidad;

import jakarta.persistence.*;

@Entity
@Table(name="beca")
public class Beca {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="nombre", nullable = false, length = 70)
    private String nombre;

    @Column(name="descripcion", nullable = false, length=500)
    private String descripcion;

    @Column(name="duracion", nullable = false)
    private Integer duracion;

    @Column(name="beneficio", nullable = false, length=500)
    private String beneficio;

    @Column(name="requisito", nullable = false, length=500)
    private String requisito;

    @Column(name="restriccion", nullable = false, length=500)
    private String restriccion;

    @Column(name="url", nullable = false, length=3000)
    private String url;

    @Column(name="tipo_beca", nullable = false)
    private String tipoBeca;

    @JsonIgnore
    @ManyToMany
    @JoinTable(
        name="carrera_beca",
        joinColumns = @JoinColumn(name="beca_id"),
        inverseJoinColumns = @JoinColumn(name = "carrera_id")
    )
    @JsonIgnoreProperties({"carrera"})
    private List<Carrera> carrera;

    @JsonIgnore
    @ManyToMany(mappedBy="beca")
    @JsonIgnoreProperties({"universidad"})
    private List<Universidad> universidad;

    public Beca(){}

    public Beca(Long id, String nombre, String descripcion, Integer duracion, String beneficio, String requisito,
            String restriccion, String url, String tipoBeca, List<Carrera> carrera, List<Universidad> universidad) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.duracion = duracion;
        this.beneficio = beneficio;
        this.requisito = requisito;
        this.restriccion = restriccion;
        this.url = url;
        this.tipoBeca = tipoBeca;
        this.carrera = carrera;
        this.universidad=universidad;
    }

    public Beca(String nombre, String descripcion, Integer duracion, String beneficio, String requisito,
            String restriccion, String url, String tipoBeca, List<Carrera> carrera, List<Universidad> universidad) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.duracion = duracion;
        this.beneficio = beneficio;
        this.requisito = requisito;
        this.restriccion = restriccion;
        this.url = url;
        this.tipoBeca = tipoBeca;
        this.carrera = carrera;
        this.universidad=universidad;
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

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Integer getDuracion() {
        return duracion;
    }

    public void setDuracion(Integer duracion) {
        this.duracion = duracion;
    }

    public String getBeneficio() {
        return beneficio;
    }

    public void setBeneficio(String beneficio) {
        this.beneficio = beneficio;
    }

    public String getRequisito() {
        return requisito;
    }

    public void setRequisito(String requisito) {
        this.requisito = requisito;
    }

    public String getRestriccion() {
        return restriccion;
    }

    public void setRestriccion(String restriccion) {
        this.restriccion = restriccion;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getTipoBeca() {
        return tipoBeca;
    }

    public void setTipoBeca(String tipoBeca) {
        this.tipoBeca = tipoBeca;
    }

    public List<Carrera> getCarrera() {
        return carrera;
    }

    public void setCarrera(List<Carrera> carrera) {
        this.carrera = carrera;
    }

    public List<Universidad> getUniversidad(){
        return universidad;
    }

    public void setUniversidad(List<Universidad> universidad){
        this.universidad=universidad;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null | getClass() != o.getClass())
            return false;
        Beca beca = (Beca) o;
        return Objects.equals(id, beca.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}