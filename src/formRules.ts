export default {
  required(v: string | object) {
    if (typeof v === 'object') {
      return !!v || 'Campo necessário'
    }
    return v && v.length > 0 || 'Campo necessário';
  },
};
