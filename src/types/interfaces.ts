import { EPeriodo } from 'src/types/enumerations';

interface IPeriodo {
  value: EPeriodo;
  label: string;
}

export interface IConhecimentoCreate {
  idade: number;
  filmeSerie: string;
  periodo: IPeriodo;
  generoFavorito: string;
  estado: string;
  tempoDisponivel: string;
}

export interface IConhecimento extends IConhecimentoCreate {
  id?: number;
}

export interface IConhecimentoUpdate {
  id?: number;
  idade?: number;
  filme_serie?: string;
  periodo?: IPeriodo;
  genero_favorito?: string;
  estado?: string;
  tempo_disponivel?: string;
}
