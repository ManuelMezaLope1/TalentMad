package com.springboot.backend.universidad.modelo;

import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.springboot.backend.beca.modelo.Beca;
import com.springboot.backend.carrera.modelo.Carrera;
import com.springboot.backend.departamento.modelo.Departamento;
import com.springboot.backend.tipouniversidad.modelo.TipoUniversidad;

import jakarta.persistence.*;

@Entity
@Table(name = "universidad")
public class Universidad {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre", nullable = false, length = 60)
    private String nombre;

    @ManyToOne
    @JoinColumn(name = "departamento_id")
    @JsonIgnoreProperties({ "universidad" })
    private Departamento departamento;

    @Column(name = "costo_mensual_minimo", nullable = false)
    private double costoMensualMinimo;

    @Column(name = "costo_mensual_maximo", nullable = false)
    private double costoMensualMaximo;

    @Column(name = "imagen")
    private String imagen;

    @Column(name = "url")
    private String url;

    @ManyToOne
    @JoinColumn(name = "tipo_universidad_id")
    @JsonIgnoreProperties({ "universidad" })
    private TipoUniversidad tipoUniversidad;

    @ManyToMany(mappedBy = "universidad")
    @JsonIgnoreProperties({ "universidad" })
    private List<Carrera> carrera;

    @ManyToMany
    @JoinTable(name = "universidad_beca", joinColumns = @JoinColumn(name = "universidad_id"), inverseJoinColumns = @JoinColumn(name = "beca_id"))
    @JsonIgnoreProperties({ "universidad" })
    private List<Beca> beca;

    public Universidad() {
    }

    public Universidad(Long id, String nombre, Departamento departamento, double costoMensualMinimo,
            double costoMensualMaximo, String imagen, String url, TipoUniversidad tipoUniversidad,
            List<Carrera> carrera, List<Beca> beca) {
        this.id = id;
        this.nombre = nombre;
        this.departamento = departamento;
        this.costoMensualMinimo = costoMensualMinimo;
        this.costoMensualMaximo = costoMensualMaximo;
        this.imagen = imagen;
        this.url = url;
        this.tipoUniversidad = tipoUniversidad;
        this.carrera = carrera;
        this.beca = beca;
    }

    public Universidad(String nombre, Departamento departamento, double costoMensualMinimo, double costoMensualMaximo,
            TipoUniversidad tipoUniversidad, List<Carrera> carrera, List<Beca> beca) {
        this.nombre = nombre;
        this.departamento = departamento;
        this.costoMensualMinimo = costoMensualMinimo;
        this.costoMensualMaximo = costoMensualMaximo;
        this.tipoUniversidad = tipoUniversidad;
        this.carrera = carrera;
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

    public Departamento getDepartamento() {
        return departamento;
    }

    public void setDepartamento(Departamento departamento) {
        this.departamento = departamento;
    }

    public double getCostoMensualMinimo() {
        return costoMensualMinimo;
    }

    public void setCostoMensualMinimo(double costoMensualMinimo) {
        this.costoMensualMinimo = costoMensualMinimo;
    }

    public double getCostoMensualMaximo() {
        return costoMensualMaximo;
    }

    public void setCostoMensualMaximo(double costoMensualMaximo) {
        this.costoMensualMaximo = costoMensualMaximo;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public TipoUniversidad getTipoUniversidad() {
        return tipoUniversidad;
    }

    public void setTipoUniversidad(TipoUniversidad tipoUniversidad) {
        this.tipoUniversidad = tipoUniversidad;
    }

    public List<Carrera> getCarrera() {
        return carrera;
    }

    public void setCarrera(List<Carrera> carrera) {
        this.carrera = carrera;
    }

    public List<Beca> getBeca() {
        return beca;
    }

    public void setBeca(List<Beca> beca) {
        this.beca = beca;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        Universidad universidad = (Universidad) o;
        return Objects.equals(id, universidad.id) && Objects.equals(tipoUniversidad, universidad.tipoUniversidad);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, tipoUniversidad);
    }
}