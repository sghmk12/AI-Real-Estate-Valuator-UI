import axios from 'axios';
import axiosRetry from "axios-retry";

import { AdjacentNodesAPIResponseType, HomeOptionsType } from "../types";
import env from "react-dotenv";

export const fetchAdjacentNodes = async (long: number, lat: number, homeOptions: HomeOptionsType | null): Promise<AdjacentNodesAPIResponseType | null> => {

  const { API_KEY: apiKey, DEV: devMode, API_HOST: apiHost, LOCAL_HOST: localHost } = env;

  axiosRetry(axios, {
    retries: 10,
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