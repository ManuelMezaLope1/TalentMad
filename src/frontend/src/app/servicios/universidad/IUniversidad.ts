import { IBeca } from "../beca/IBeca";
import { ICarrera } from "../carrera/ICarrera";

export class IUniversidad{
    id:number;
    nombre:string;
    departamento:any;
    costoMensualMinimo:string;
    costoMensualMaximo:string;
    imagen: string;
    url: string;
    tipoUniversidad:any;
    carrera: ICarrera[];
    beca: IBeca[];
    cantidadSedes: number;
}