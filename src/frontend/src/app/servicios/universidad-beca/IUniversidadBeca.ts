import { IBeca } from "../beca/IBeca";
import { IUniversidad } from "../universidad/IUniversidad";

export class IUniversidadBeca{
    id: number;
    universidad: IUniversidad[];
    beca: IBeca;
}