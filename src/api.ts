import axios from 'axios';

const APIURL = 'http://localhost:3000/';

export default {
  async getDB() {
    try {
      const response = await axios.get(`${APIURL}`);
      if (response) {
        return response.data;
      }
    } catch (e) {
      console.log(e);
    }
    return true;
  },
};
