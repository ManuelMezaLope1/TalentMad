package com.springboot.backend.universidadcarrera.modelo;

import java.math.BigDecimal;

public class UniversidadCarreraDto {
    private Long universidadId;
    private Long carreraId;
    private Integer ranking;
    private BigDecimal total;
    
    public UniversidadCarreraDto(Long universidadId, Long carreraId, Integer ranking, BigDecimal total) {
        this.universidadId = universidadId;
        this.carreraId = carreraId;
        this.ranking = ranking;
        this.total = total;
    }

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

    public Integer getRanking() {
        return ranking;
    }

    public void setRanking(Integer ranking) {
        this.ranking = ranking;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }
}
