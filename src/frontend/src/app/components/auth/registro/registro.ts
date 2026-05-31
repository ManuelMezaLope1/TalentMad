import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';
import { DepartamentoServicio } from '../../../servicios/departamento/departamento-servicio';
import { Departamento } from '../../../servicios/departamento/Departamento';

@Component({
  selector: 'app-registro',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {
  departamentos: Departamento[] = [];
  departamento: number | null = null;

  constructor(private departamentoServicio: DepartamentoServicio,private http: HttpClient, private router: Router, private cd: ChangeDetectorRef){}

  ngOnInit(): void{
    this.departamentoServicio.obtenerListaDeTipoDeDepartamento().subscribe(dato=>{
      this.departamentos=dato;
      this.cd.detectChanges();
    })
  }

  nombre:string='';
  apellido:string='';
  username:string='';
  password:string='';
  telefono:string='';

  registro(){
    const usuario={
      nombre:this.nombre,
      apellido:this.apellido,
      telefono:this.telefono,
      departamento:this.departamento,
      username:this.username,
      password:this.password
    };

    this.http.post('http://localhost:8080/auth/registro',usuario).subscribe({
      next:()=>{
        Swal.fire('Usuario registrado',`El usuario ha sido registrado correctamente`,'success');

        this.nombre='';
        this.apellido='';
        this.telefono='';
        this.departamento=null;
        this.username='';
        this.password='';

        console.log(usuario);

        this.router.navigate(['/login']);
      },
      error: ()=>{
        alert('Error al registrar al usuario')
      }
    })
  }
}