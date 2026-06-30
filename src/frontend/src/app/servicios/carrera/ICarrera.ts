import { IBeca } from "../beca/IBeca";
import { IUniversidad } from "../universidad/IUniversidad"; // ← agregar este import

export class ICarrera {
    id: number;
    nombre: string;
    descripcion: string;
    duracion: string;
    tipoCarrera: any;
    imagen: string;
    universidad: IUniversidad[];
    combinacion: string;
    beca: IBeca[];
    ranking: number;
    total: number;
}