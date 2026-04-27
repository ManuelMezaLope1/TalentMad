import { Component } from '@angular/core';
import { NivelinteresServicio } from '../../../servicios/nivelinteres/nivelinteres-servicio';
import { Interes } from '../../../servicios/nivelinteres/Interes';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {
  niveles: Interes[]=[];

  constructor(private nivelInteresServicio: NivelinteresServicio,private http: HttpClient, private router: Router){}

  ngOnInit(): void{
    this.nivelInteresServicio.obtenerListaDeNivelesDeInteres().subscribe(dato=>{
      this.niveles=dato;
    })
  }

  nombre:string='';
  apellido:string='';
  username:string='';
  password:string='';
  telefono:string='';
  interesId:string='';

  /*formulario=new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')]),
    apellido: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')]),
    telefono: new FormControl('', [Validators.required, Validators.pattern('^9[0-9]{8}$')]),
    username: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@gmail\\.com$')]),
    password: new FormControl('', Validators.required)
  })*/

  registro(){
    const usuario={
      nombre:this.nombre,
      apellido:this.apellido,
      telefono:this.telefono,
      interesId:{id:this.interesId},
      username:this.username,
      password:this.password
    };

    /*if(this.formulario.invalid){
      Swal.fire({
        icon:'error',
        title:'Oops...',
        text: 'Complete correctamente el formulario'
      });
      return;
    }*/

    this.http.post('http://localhost:8080/auth/registro',usuario).subscribe({
      next:()=>{
        Swal.fire('Usuario registrado',`El usuario ha sido registrado correctamente`,'success');

        this.nombre='';
        this.apellido='';
        this.telefono='';
        this.interesId='';
        this.username='';
        this.password='';

        this.router.navigate(['/login']);
      },
      error: ()=>{
        alert('Error al registrar al usuario')
      }
    })
  }
}