import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UniversidadServicio } from '../../../servicios/universidad/universidad-servicio';
import { IUniversidad } from '../../../servicios/universidad/IUniversidad';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-elegir-universidad',
  imports: [CommonModule],
  templateUrl: './elegir-universidad.html',
  styleUrl: './elegir-universidad.css',
})
export class ElegirUniversidad {
  universidades: IUniversidad[]=[];
  universidades$!: Observable<IUniversidad[]>;

  constructor(private universidadServicio: UniversidadServicio, private router: Router){}

  ngOnInit(): void{
    this.universidades$=this.universidadServicio.obtenerListaDeUniversidad().pipe(
      map(universidades=>
        universidades.sort((a, b) => a.nombre.localeCompare(b.nombre))
      )
    )
  }

  actualizarCarreras(id: number){
    this.router.navigate(['actualizacion-universidad-carrera',id]);
  }
}
