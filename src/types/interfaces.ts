import { EPeriodo } from 'src/types/enumerations';

interface IPeriodo {
  value: EPeriodo;
  label: string;
}

export interface IConhecimentoList {
  idade: number | null | undefined;
  filmeSerie: string;
  periodo: IPeriodo;
  generoFavorito: string;
  estado: string;
  tempoDisponivel: string;
}

export interface IConhecimentoCreate {
  idade: number | null | undefined;
  filmeSerie: string;
  periodo: number;
  generoFavorito: string;
  estado: string;
  tempoDisponivel: string;
}

export interface IConhecimento extends IConhecimentoCreate {
  id?: number;
}

export interface IConhecimentoUpdate {
  id?: number | null | undefined;
  idade?: number;
  filmeSerie?: string;
  periodo?: number;
  generoFavorito?: string;
  estado?: string;
  tempoDisponivel?: string;
}
