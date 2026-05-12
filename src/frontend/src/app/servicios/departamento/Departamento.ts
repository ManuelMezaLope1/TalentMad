import { IUniversidad } from "../universidad/IUniversidad";

export class Departamento{
    id: number;
    nombre: string;
    universidad?: IUniversidad[];
}