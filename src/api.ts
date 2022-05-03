import axios from 'axios';
import {
  IConhecimento,
  IConhecimentoCreate,
  IConhecimentoUpdate,
} from './types/interfaces';

const APIURL = 'http://localhost:3000/api';

export default {
  async FindAllConhecimento() {
    try {
      const response = await axios.get<IConhecimento[]>(
        `${APIURL}/conhecimento/`
      );
      if (response) {
        return response.data;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  async FindOneConhecimento(id: number) {
    try {
      const response = await axios.get<IConhecimento>(
        `${APIURL}/conhecimento/${id}/`
      );
      if (response) {
        return response.data;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  async CreateConhecimento(payload: IConhecimentoCreate) {
    try {
      const response = await axios.post<IConhecimento>(
        `${APIURL}/conhecimento/`,
        payload
      );
      if (response) {
        return response.data;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  async UpdateConhecimento(payload: IConhecimentoUpdate) {
    try {
      const response = await axios.put<IConhecimento>(
        `${APIURL}/conhecimento/`,
        payload
      );
      if (response) {
        return response.data;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  async DeleteConhecimento(id: number) {
    try {
      const response = await axios.delete<IConhecimento>(
        `${APIURL}/conhecimento/${id}/`
      );
      if (response) {
        return response.data;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  },
};
