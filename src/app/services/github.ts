import axios from 'axios';

export const getData = async () => {

  return await axios.get(`/api/github`);
};
