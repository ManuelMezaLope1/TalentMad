import { ICarrera } from "../carrera/ICarrera";
import { IBeca } from "../beca/IBeca";

export class IUniversidad{
    id:number;
    nombre:string;
    departamento:any;
    costoMensualMinimo:string;
    costoMensualMaximo:string;
    tipoUniversidad:any;
    carrera: ICarrera[];
    beca: IBeca[];
}