import { IBeca } from "../beca/IBeca";

export class ICarrera{
    id:number;
    nombre:string;
    descripcion:string;
    duracion:string;
    tipoCarrera:any;
    universidad:any;
    beca: IBeca[];
}