package com.springboot.backend.usuario.servicio;

import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.springboot.backend.rol.modelo.Rol;
import com.springboot.backend.usuario.modelo.Usuario;
import com.springboot.backend.usuario.repositorio.UsuarioRepositorio;

@Service
public class UserDetailsServicio implements UserDetailsService{
    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Usuario usuario = usuarioRepositorio.findByUsername(username);

        if (usuario == null) {
            throw new UsernameNotFoundException("Usuario o password inválidos");
        }

        return new User(
                usuario.getUsername(),
                usuario.getPassword(),
                mapearAutoridadesRoles(usuario.getRoles())
            );
    }

    private Collection<? extends SimpleGrantedAuthority> mapearAutoridadesRoles(List<Rol> roles) {
        return roles.stream()
                .map(rol -> new SimpleGrantedAuthority(rol.getNombre()))
                .toList();
    }
}
