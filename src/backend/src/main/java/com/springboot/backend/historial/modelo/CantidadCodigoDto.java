package com.springboot.backend.historial.modelo;

public class CantidadCodigoDto {
    private String codigo;
    private Long cantidad;
    
    public CantidadCodigoDto(String codigo, Long cantidad) {
        this.codigo = codigo;
        this.cantidad = cantidad;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public Long getCantidad() {
        return cantidad;
    }

    public void setCantidad(Long cantidad) {
        this.cantidad = cantidad;
    }
}
