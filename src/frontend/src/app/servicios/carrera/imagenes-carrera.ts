// Mapa centralizado de imágenes por carrera.
// Se usa tanto en "resultado" como en "detallecarrera", así que hay
// UNA sola fuente de verdad: cambiar la imagen de una carrera aquí
// NO afecta a ninguna otra.
//
// Cómo agregar una imagen:
//   1. Busca el "id" real de la carrera (el mismo que usas en la URL
//      /detallecarrera/:id).
//   2. Agrega una línea: `<id>: '<url-de-la-imagen>',`
//
// Ejemplo:
//   1: 'https://miservidor.com/imagenes/ingenieria-sistemas.jpg',
//   7: 'assets/imagenes/carreras/medicina.jpg',
//
// Si una carrera NO tiene entrada aquí, se genera automáticamente una
// imagen de respaldo (picsum.photos) usando su id como semilla.

export const IMAGENES_CARRERA: { [id: number]: string } = {
    43: 'https://cba.ucb.edu.bo/blog/wp-content/uploads/2021/04/retrato-lider-exitoso_109710-668.jpg',
    66: 'https://www.usmpvirtual.edu.pe/wp-content/uploads/2024/10/judge-gavel-with-justice-lawyers-having-team-meeting-law-firm-background-concepts-law-1024x512.jpg',
    20: 'https://adex.edu.pe/wp-content/uploads/2025/08/administracion-y-gestion-de-empresas-adex-escuela.jpg',
    68: 'https://www.upsjb.edu.pe/wp-content/uploads/2024/03/HOTELERIA-Y-TURISMO-%C2%BFCOMO-SABER-SI-ES-MI-CARRERA.jpeg',
  // 1: 'https://miservidor.com/imagenes/ingenieria-sistemas.jpg',
  // 2: 'assets/imagenes/carreras/medicina.jpg',
  // 3: 'assets/imagenes/carreras/derecho.jpg',
};

export function obtenerImagenCarrera(id: number, ancho = 600, alto = 340): string {
  const url = IMAGENES_CARRERA[id];
  if (url) return url;
  return `https://picsum.photos/seed/carrera-${id}/${ancho}/${alto}`;
}