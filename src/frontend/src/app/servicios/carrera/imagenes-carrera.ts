

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