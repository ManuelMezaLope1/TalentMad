package com.springboot.backend.usuario.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.backend.usuario.modelo.Usuario;

public interface UsuarioRepositorio extends JpaRepository<Usuario, Long>{
    Usuario findByUsername(String username);
}
