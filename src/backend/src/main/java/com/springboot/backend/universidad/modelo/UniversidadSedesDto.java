package com.springboot.backend.universidad.modelo;

public class UniversidadSedesDto {
    private String nombre;
    private String departamento;
    private Double costoMensualMinimo;
    private Double costoMensualMaximo;
    private String imagen;
    private String url;
    private Integer ranking;
    private Double total;
    
    public UniversidadSedesDto(String nombre, String departamento, Double costoMensualMinimo, Double costoMensualMaximo,
            String imagen, String url, Integer ranking, Double total) {
        this.nombre = nombre;
        this.departamento = departamento;
        this.costoMensualMinimo = costoMensualMinimo;
        this.costoMensualMaximo = costoMensualMaximo;
        this.imagen = imagen;
        this.url = url;
        this.ranking = ranking;
        this.total = total;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDepartamento() {
        return departamento;
    }

    public void setDepartamento(String departamento) {
        this.departamento = departamento;
    }

    public Double getCostoMensualMinimo() {
        return costoMensualMinimo;
    }

    public void setCostoMensualMinimo(Double costoMensualMinimo) {
        this.costoMensualMinimo = costoMensualMinimo;
    }

    public Double getCostoMensualMaximo() {
        return costoMensualMaximo;
    }

    public void setCostoMensualMaximo(Double costoMensualMaximo) {
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

    public Integer getRanking() {
        return ranking;
    }

    public void setRanking(Integer ranking) {
        this.ranking = ranking;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }
}
