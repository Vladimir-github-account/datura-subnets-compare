import axios from 'axios';

export const getStats = async (repo: string) => {

  return await axios.get(`/api/stats`, {
    params: {
      repo
    }
  });
};
