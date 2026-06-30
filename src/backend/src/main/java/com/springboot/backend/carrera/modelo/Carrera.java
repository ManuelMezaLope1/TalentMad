package com.springboot.backend.carrera.modelo;

import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.springboot.backend.beca.modelo.Beca;
import com.springboot.backend.universidad.modelo.Universidad;

import jakarta.persistence.*;

@Entity
@Table(name="carrera")
public class Carrera {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="nombre", nullable = false, length=70)
    private String nombre;

    @Column(name="descripcion", nullable = false, length = 500)
    private String descripcion;

    @Column(name="duracion", nullable = false)
    private Integer duracion;

    @Column(name="tipo_carrera", nullable = false)
    private String tipoCarrera;

    @Column(name="imagen")
    private String imagen;

    @ManyToMany
    @JoinTable(
        name="universidad_carrera",
        joinColumns = @JoinColumn(name="carrera_id"),
        inverseJoinColumns = @JoinColumn(name="universidad_id")
    )
    @JsonIgnoreProperties({"carrera"})
    private List<Universidad> universidad;

    @ManyToMany(mappedBy = "carrera")
    @JsonIgnoreProperties({"carrera"})
    private List<Beca> beca;

    @Column(name="combinacion", nullable = false)
    private String combinacion;

    public Carrera(){}

    public Carrera(Long id, String nombre, String descripcion, Integer duracion, String tipoCarrera,
            List<Universidad> universidad, List<Beca> beca, String combinacion, String imagen) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.duracion = duracion;
        this.tipoCarrera = tipoCarrera;
        this.universidad = universidad;
        this.beca = beca;
        this.combinacion=combinacion;
        this.imagen=imagen;
    }

    public Carrera(String nombre, String descripcion, Integer duracion, String tipoCarrera,
            List<Universidad> universidad, List<Beca> beca, String combinacion, String imagen) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.duracion = duracion;
        this.tipoCarrera = tipoCarrera;
        this.universidad = universidad;
        this.beca = beca;
        this.combinacion=combinacion;
        this.imagen=imagen;
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

    public String getTipoCarrera() {
        return tipoCarrera;
    }

    public void setTipoCarrera(String tipoCarrera) {
        this.tipoCarrera = tipoCarrera;
    }

    public List<Universidad> getUniversidad() {
        return universidad;
    }

    public void setUniversidad(List<Universidad> universidad) {
        this.universidad = universidad;
    }

    public List<Beca> getBeca() {
        return beca;
    }

    public void setBeca(List<Beca> beca) {
        this.beca = beca;
    }

    public String getCombinacion() {
        return combinacion;
    }

    public void setCombinacion(String combinacion) {
        this.combinacion = combinacion;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    @Override
    public boolean equals(Object o){
        if(this==o) return true;
        if(o==null | getClass() !=o.getClass()) return false;
        Carrera carrera=(Carrera) o;
        return Objects.equals(id, carrera.id);
    }

    @Override
    public int hashCode(){
        return Objects.hash(id);
    }
}
