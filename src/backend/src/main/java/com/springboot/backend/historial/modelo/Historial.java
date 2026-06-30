package com.springboot.backend.historial.modelo;

import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.springboot.backend.usuario.modelo.Usuario;

import jakarta.persistence.*;

@Entity
@Table(name="historial")
public class Historial {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @Column(name="codigo", nullable=false,length=10)
    private String codigo;

    @ManyToOne
    @JoinColumn(name="usuario_id")
    @JsonIgnoreProperties({"historial"})
    private Usuario usuario;

    @Column(name="username", nullable = false, length=100)
    private String username;

    @Column(name="carreras", nullable=false, length=1000)
    private String carreras;

    @Column(name="fecha", nullable=false)
    private String fecha;

    @Column(name="puntaje_realista",nullable=false)
    private String puntaje_realista;

    @Column(name="puntaje_investigador", nullable=false)
    private String puntaje_investigador;

    @Column(name="puntaje_artistico", nullable=false)
    private String puntaje_artistico;

    @Column(name="puntaje_social", nullable=false)
    private String puntaje_social;

    @Column(name="puntaje_emprendedor", nullable=false)
    private String puntaje_emprendedor;

    @Column(name="puntaje_convencional", nullable=false)
    private String puntaje_convencional;

    public Historial(){}

    public Historial(Long id, String codigo, Usuario usuario, String username, String carreras, String fecha,
            String puntaje_realista, String puntaje_investigador, String puntaje_artistico, String puntaje_social,
            String puntaje_emprendedor, String puntaje_convencional) {
        this.id = id;
        this.codigo = codigo;
        this.usuario = usuario;
        this.username = username;
        this.carreras = carreras;
        this.fecha = fecha;
        this.puntaje_realista = puntaje_realista;
        this.puntaje_investigador = puntaje_investigador;
        this.puntaje_artistico = puntaje_artistico;
        this.puntaje_social = puntaje_social;
        this.puntaje_emprendedor = puntaje_emprendedor;
        this.puntaje_convencional = puntaje_convencional;
    }

    public Historial(String codigo, Usuario usuario, String username, String carreras, String fecha,
            String puntaje_realista, String puntaje_investigador, String puntaje_artistico, String puntaje_social,
            String puntaje_emprendedor, String puntaje_convencional) {
        this.codigo = codigo;
        this.usuario = usuario;
        this.username = username;
        this.carreras = carreras;
        this.fecha = fecha;
        this.puntaje_realista = puntaje_realista;
        this.puntaje_investigador = puntaje_investigador;
        this.puntaje_artistico = puntaje_artistico;
        this.puntaje_social = puntaje_social;
        this.puntaje_emprendedor = puntaje_emprendedor;
        this.puntaje_convencional = puntaje_convencional;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getCarreras() {
        return carreras;
    }

    public void setCarreras(String carreras) {
        this.carreras = carreras;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public String getPuntaje_realista() {
        return puntaje_realista;
    }

    public void setPuntaje_realista(String puntaje_realista) {
        this.puntaje_realista = puntaje_realista;
    }

    public String getPuntaje_investigador() {
        return puntaje_investigador;
    }

    public void setPuntaje_investigador(String puntaje_investigador) {
        this.puntaje_investigador = puntaje_investigador;
    }

    public String getPuntaje_artistico() {
        return puntaje_artistico;
    }

    public void setPuntaje_artistico(String puntaje_artistico) {
        this.puntaje_artistico = puntaje_artistico;
    }

    public String getPuntaje_social() {
        return puntaje_social;
    }

    public void setPuntaje_social(String puntaje_social) {
        this.puntaje_social = puntaje_social;
    }

    public String getPuntaje_emprendedor() {
        return puntaje_emprendedor;
    }

    public void setPuntaje_emprendedor(String puntaje_emprendedor) {
        this.puntaje_emprendedor = puntaje_emprendedor;
    }

    public String getPuntaje_convencional() {
        return puntaje_convencional;
    }

    public void setPuntaje_convencional(String puntaje_convencional) {
        this.puntaje_convencional = puntaje_convencional;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        Historial historial = (Historial) o;
        return Objects.equals(id, historial.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
