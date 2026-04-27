package com.springboot.backend.usuario.controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.backend.seguridad.JwtUtil;
import com.springboot.backend.usuario.dto.AuthRequest;
import com.springboot.backend.usuario.dto.AuthResponse;
import com.springboot.backend.usuario.modelo.Usuario;
import com.springboot.backend.usuario.servicio.AuthServicio;

@RestController
@RequestMapping("/auth")
public class AuthControlador {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthServicio authServicio;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {

        Authentication auth = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getUsername(),
                request.getPassword()
            )
        );

        UserDetails user = (UserDetails) auth.getPrincipal();

        String token = jwtUtil.generarToken(user);

        return ResponseEntity.ok(new AuthResponse(token));
    }

    @PostMapping("/registro")
    public ResponseEntity<?> register(@RequestBody Usuario usuario) {
        return ResponseEntity.ok(authServicio.registrarUsuario(usuario));
    }
}
