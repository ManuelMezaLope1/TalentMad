package com.springboot.backend.universidadcarrera.modelo;

public class UniversidadCarreraDto {
    private Long universidadId;
    private Long carreraId;

    public Long getUniversidadId() {
        return universidadId;
    }
    public void setUniversidadId(Long universidadId) {
        this.universidadId = universidadId;
    }
    public Long getCarreraId() {
        return carreraId;
    }
    public void setCarreraId(Long carreraId) {
        this.carreraId = carreraId;
    }
}
