import axios from 'axios';
import axiosRetry from "axios-retry";

import { AdjacentNodesAPIResponseType, HomeOptionsType } from "../types";

export const fetchAdjacentNodes = async (long: number, lat: number, homeOptions: HomeOptionsType | null): Promise<AdjacentNodesAPIResponseType | null> => {

  const { REACT_APP_API_KEY: apiKey, REACT_APP_DEV: devMode, REACT_APP_API_HOST: apiHost, REACT_APP_LOCAL_HOST: localHost } = process.env;

  axiosRetry(axios, {
    retries: 5,
    shouldResetTimeout: true,
    retryCondition: (_error) => true, // retry no matter what error
  });

  try {
    const response: AdjacentNodesAPIResponseType = await axios.post(
      `${devMode === "True" ? localHost : apiHost}/api/adjacent_nodes?key=${apiKey}`,
      { ...homeOptions, 
        lng: long, 
        lat,
      }
    )
    return response;

  } catch (error) {
    throw(error);
  }
}
export default fetchAdjacentNodes