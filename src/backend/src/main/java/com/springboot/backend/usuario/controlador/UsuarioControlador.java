package com.springboot.backend.usuario.controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.backend.usuario.modelo.Usuario;
import com.springboot.backend.usuario.repositorio.UsuarioRepositorio;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/v1")
public class UsuarioControlador {
    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @GetMapping("/private/perfil")
    public ResponseEntity<Usuario> obtenerPerfil(Authentication auth) {
        String username=auth.getName();

        Usuario usuario=usuarioRepositorio.findByUsername(username);

        return ResponseEntity.ok(usuario);
    }

    @PutMapping("/private/perfil")
    public ResponseEntity<Usuario> actualizarUsuario(Authentication auth, @RequestBody Usuario detallesUsuario) {
        String username=auth.getName();

        Usuario usuarioExistente=usuarioRepositorio.findByUsername(username);

        usuarioExistente.setNombre(detallesUsuario.getNombre());
        usuarioExistente.setApellido(detallesUsuario.getApellido());
        usuarioExistente.setTelefono(detallesUsuario.getTelefono());
        usuarioExistente.setNivelInteres(detallesUsuario.getNivelInteres());
        usuarioExistente.setUsername(detallesUsuario.getUsername());

        Usuario usuarioActualizado=usuarioRepositorio.save(usuarioExistente);
        
        return ResponseEntity.ok(usuarioActualizado);
    }
}
