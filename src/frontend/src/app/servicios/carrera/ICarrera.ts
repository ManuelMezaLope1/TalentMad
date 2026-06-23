import { IBeca } from "../beca/IBeca";
import { IUniversidad } from "../universidad/IUniversidad"; // ← agregar este import

export class ICarrera {
    id: number;
    nombre: string;
    descripcion: string;
    duracion: string;
    tipoCarrera: any;
    universidad: IUniversidad[]; // ← era ICarrera[], debe ser IUniversidad[]
    combinacion: string;
    beca: IBeca[];
}