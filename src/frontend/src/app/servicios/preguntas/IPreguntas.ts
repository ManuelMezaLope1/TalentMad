import { IRespuesta } from "../respuesta/IRespuesta";

export class IPreguntas{
    id:number;
    preguntas:string;
    categoriaPreguntas:any;
    respuestas: IRespuesta[];
    respuestaSeleccionada?: string;
}