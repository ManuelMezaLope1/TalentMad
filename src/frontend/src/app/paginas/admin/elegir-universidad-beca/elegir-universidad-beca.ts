import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { IUniversidad } from '../../../servicios/universidad/IUniversidad';
import { UniversidadServicio } from '../../../servicios/universidad/universidad-servicio';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-elegir-universidad-beca',
  imports: [CommonModule],
  templateUrl: './elegir-universidad-beca.html',
  styleUrl: './elegir-universidad-beca.css',
})
export class ElegirUniversidadBeca {
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
    this.router.navigate(['actualizacion-universidad-beca',id]);
  }

  volver(){
    this.router.navigate(['universidad-beca'])
  }
}
