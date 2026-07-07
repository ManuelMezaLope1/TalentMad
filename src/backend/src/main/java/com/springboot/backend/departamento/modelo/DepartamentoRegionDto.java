package com.springboot.backend.departamento.modelo;

public class DepartamentoRegionDto {
    private String nombre;

    public DepartamentoRegionDto(String nombre) {
        this.nombre = nombre;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
}
