import axios from 'axios';

export const getData = async (repo: string) => {

  return await axios.get(`/api/github`, {
    params: {
      repo
    }
  });
};
