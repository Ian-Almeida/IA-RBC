export default {
  required(v: string) {
    return v && v.length > 0 || 'Campo necessário';
  },
};
