import {EPeriodo} from 'src/types/enumerations';

interface IPeriodo {
  value: EPeriodo,
  label: string,
}

export interface IRecomendationResult {
  idade: number,
  filme_serie: string,
  periodo: IPeriodo,
  genero_favorito: string,
  estado: string,
  tempo_disponivel: string
}

export interface IRecomendationDB extends IRecomendationResult {
  a?: null
}
