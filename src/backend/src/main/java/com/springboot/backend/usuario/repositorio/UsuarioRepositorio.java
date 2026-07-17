package com.springboot.backend.usuario.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.springboot.backend.beca.modelo.CantidadBecaDto;
import com.springboot.backend.usuario.modelo.Usuario;

public interface UsuarioRepositorio extends JpaRepository<Usuario, Long>{
    Usuario findByUsername(String username);

    @Query(value="""
            SELECT COUNT(ur.usuario_id) as cantidad FROM usuario_rol ur
            JOIN usuarios u ON u.id=ur.usuario_id
            JOIN rol r ON r.id=ur.rol_id
            WHERE r.nombre NOT LIKE 'ROLE_ADMIN';
            """, nativeQuery=true)
    CantidadBecaDto obtenerCantidadUsuarios();
}
