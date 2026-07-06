package com.springboot.backend.universidad.modelo;

public class UniversidadImagenUrlDto {
    private String imagen;
    private String url;

    public UniversidadImagenUrlDto(String imagen, String url) {
        this.imagen = imagen;
        this.url=url;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public String getUrl(){
        return url;
    }

    public void setUrl(String url){
        this.url=url;
    }
}
