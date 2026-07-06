import { ICarrera } from "../carrera/ICarrera";
import { IUniversidadBeca } from "../universidad-beca/IUniversidadBeca";
import { IUniversidad } from "../universidad/IUniversidad";

export class IUniversidadCarrera{
    id: number;
    universidad: IUniversidad;
    carrera: ICarrera;
    universidadBeca: IUniversidadBeca[];
    ranking: number;
    total: number;
}