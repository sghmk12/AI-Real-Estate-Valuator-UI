import axios from 'axios';
import axiosRetry from "axios-retry";

import env from "react-dotenv";

export const fetchimageIDs = async (property_id: string): Promise<[string, number][]> => {

  const { API_KEY: apiKey, DEV: devMode, API_HOST: apiHost, LOCAL_HOST: localHost } = env;

  axiosRetry(axios, {
    retries: 10,
    shouldResetTimeout: true,
    retryCondition: (_error) => true, // retry no matter what error
  });

  try {
    const response: { data: [string, number][] } = await axios.get(`${devMode === "True" ? localHost : apiHost}/api/property_images_ids?key=${apiKey}`, {
      params: {
        property_id,
      }
    });
    return response.data;
  } catch (error) {
    throw(error);
  }

}

export default fetchimageIDs