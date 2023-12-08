import axios from 'axios';

const baseURL = 'http://localhost:3310';

export const getInputsStats = async () => {
  const response = await axios.get(`${baseURL}/getInputsStats`);
  return response.data;
};

export const getPuzzleSolution = async (puzzleID: string) => {
  const response = await axios.get(`${baseURL}/getPuzzleSolution`, {params: {puzzleID}});
  return response.data;
};
