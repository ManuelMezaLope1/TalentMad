package com.springboot.backend.universidadbeca.modelo;

public class UniversidadBecaDto {
    private Long UniversidadId;
    private Long BecaId;

    public Long getUniversidadId() {
        return UniversidadId;
    }
    public void setUniversidadId(Long universidadId) {
        UniversidadId = universidadId;
    }
    public Long getBecaId() {
        return BecaId;
    }
    public void setBecaId(Long becaId) {
        BecaId = becaId;
    }
}