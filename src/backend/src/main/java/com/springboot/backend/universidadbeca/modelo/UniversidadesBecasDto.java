package com.springboot.backend.universidadbeca.modelo;

public class UniversidadesBecasDto {
    private String nombre;
    private String descripcion;
    private Integer duracion;
    private String requisito;
    private String restriccion;
    private String beneficio;
    private String tipoBeca;
    private String url;
    private String origenBeca;
    
    public UniversidadesBecasDto(String nombre, String descripcion, Integer duracion, String requisito,
            String restriccion, String beneficio, String tipoBeca, String url, String origenBeca) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.duracion = duracion;
        this.requisito = requisito;
        this.restriccion = restriccion;
        this.beneficio = beneficio;
        this.tipoBeca = tipoBeca;
        this.url = url;
        this.origenBeca = origenBeca;
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

    public String getBeneficio() {
        return beneficio;
    }

    public void setBeneficio(String beneficio) {
        this.beneficio = beneficio;
    }

    public String getTipoBeca() {
        return tipoBeca;
    }

    public void setTipoBeca(String tipoBeca) {
        this.tipoBeca = tipoBeca;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getOrigenBeca() {
        return origenBeca;
    }

    public void setOrigenBeca(String origenBeca) {
        this.origenBeca = origenBeca;
    }
}
