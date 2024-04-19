import axios from 'axios';

export const getSubnetInfo = async (repo: string) => {

  return await axios.get(`/api/subnetInfo`, {
    params: {
      repo
    }
  });
};
