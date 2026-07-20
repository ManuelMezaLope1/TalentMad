package com.springboot.backend.historial.modelo;

import java.sql.Date;

public class HistoricoHistorialDto {
    private Date fecha;
    private Long cantidad;

    public HistoricoHistorialDto(Date fecha, Long cantidad) {
        this.fecha = fecha;
        this.cantidad = cantidad;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public Long getCantidad() {
        return cantidad;
    }

    public void setCantidad(Long cantidad) {
        this.cantidad = cantidad;
    }
}
