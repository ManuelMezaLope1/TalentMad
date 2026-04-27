package com.springboot.backend.rol.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.backend.rol.modelo.Rol;

public interface RolRepositorio extends JpaRepository<Rol, Long>{
    Rol findByNombre(String nombre);
}
