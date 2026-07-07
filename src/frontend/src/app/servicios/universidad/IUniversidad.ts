import { UniversidadCarrera } from "../../paginas/admin/universidad-carrera/universidad-carrera";
import { IBeca } from "../beca/IBeca";
import { ICarrera } from "../carrera/ICarrera";
import { IUniversidadBeca } from "../universidad-beca/IUniversidadBeca";
import { IUniversidadCarrera } from "../universidad-carrera/IUniversidadCarrera";

export class IUniversidad{
    id:number;
    nombre:string;
    departamento:any;
    costoMensualMinimo:string;
    costoMensualMaximo:string;
    imagen: string;
    url: string;
    tipoUniversidad:any;
    universidadCarrera: IUniversidadCarrera[];
    ranking: number;
    rankingPromedio: number;
    total: number;
    beca: IBeca[];
    origen: any[];
    universidadBeca: IUniversidadBeca[];
    cantidadSedes: number;
}