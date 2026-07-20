package com.springboot.backend.dto;

public class NombreTipoCantidadDto {
    private String carrera;
    private String tipo;
    private Long cantidad;
    
    public NombreTipoCantidadDto(String carrera, String tipo, Long cantidad) {
        this.carrera = carrera;
        this.tipo = tipo;
        this.cantidad = cantidad;
    }

    public String getCarrera() {
        return carrera;
    }

    public void setCarrera(String carrera) {
        this.carrera = carrera;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public Long getCantidad() {
        return cantidad;
    }

    public void setCantidad(Long cantidad) {
        this.cantidad = cantidad;
    }
}
