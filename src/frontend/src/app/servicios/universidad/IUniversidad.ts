import { ICarrera } from "../carrera/ICarrera";

export class IUniversidad{
    id:number;
    nombre:string;
    departamento:any;
    costoMensualMinimo:string;
    costoMensualMaximo:string;
    tipoUniversidad:any;
    carrera: ICarrera[];
}