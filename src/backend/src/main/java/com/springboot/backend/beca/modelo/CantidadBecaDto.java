package com.springboot.backend.beca.modelo;

public class CantidadBecaDto {
    private Long cantidad;

    public CantidadBecaDto(Long cantidad) {
        this.cantidad = cantidad;
    }

    public Long getCantidad() {
        return cantidad;
    }

    public void setCantidad(Long cantidad) {
        this.cantidad = cantidad;
    }
}
