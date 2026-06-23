import { IBeca } from "../beca/IBeca";
import { IUniversidad } from "../universidad/IUniversidad";

export class ICarrera{
    id:number;
    nombre:string;
    descripcion:string;
    duracion:string;
    tipoCarrera:any;
    universidad:IUniversidad[];
    combinacion:string;
    beca: IBeca[];
}