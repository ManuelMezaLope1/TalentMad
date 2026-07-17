package com.springboot.backend.dto;

import java.math.BigDecimal;

public class RankingCantidadDto {
    private BigDecimal ranking;
    private Long cantidad;
    
    public RankingCantidadDto(BigDecimal ranking, Long cantidad) {
        this.ranking = ranking;
        this.cantidad = cantidad;
    }

    public BigDecimal getRanking() {
        return ranking;
    }

    public void setRanking(BigDecimal ranking) {
        this.ranking = ranking;
    }

    public Long getCantidad() {
        return cantidad;
    }

    public void setCantidad(Long cantidad) {
        this.cantidad = cantidad;
    }
}
