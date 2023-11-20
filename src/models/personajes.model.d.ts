import { listInfo } from "./generales.model";
import { ubicacionModel } from "./ubicaciones.model";

export interface listaPersonajesModel {
  info: listInfo;
  results: personajeModel[];
}

export interface personajeModel {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: ubicacionModel;
  location: ubicacionModel;
  image: string;
  episode: string[];
  url: string;
  created: string;
}
