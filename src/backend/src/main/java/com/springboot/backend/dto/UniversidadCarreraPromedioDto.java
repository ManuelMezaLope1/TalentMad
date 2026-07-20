package com.springboot.backend.dto;

import java.math.BigDecimal;

public class UniversidadCarreraPromedioDto {
    private String universidad;
    private String carrera;
    private BigDecimal promedio;
    
    public UniversidadCarreraPromedioDto(String universidad, String carrera, BigDecimal promedio) {
        this.universidad = universidad;
        this.carrera = carrera;
        this.promedio = promedio;
    }

    public String getUniversidad() {
        return universidad;
    }

    public void setUniversidad(String universidad) {
        this.universidad = universidad;
    }

    public String getCarrera() {
        return carrera;
    }

    public void setCarrera(String carrera) {
        this.carrera = carrera;
    }

    public BigDecimal getPromedio() {
        return promedio;
    }

    public void setPromedio(BigDecimal promedio) {
        this.promedio = promedio;
    }
}
