import axios from 'axios';
import axiosRetry from "axios-retry";

import env from "react-dotenv";

export const fetchImage = async (image_id: string): Promise<string> => {

  const { API_KEY: apiKey, DEV: devMode, API_HOST: apiHost, LOCAL_HOST: localHost } = env;

  axiosRetry(axios, {
    retries: 10,
    shouldResetTimeout: true,
    retryCondition: (_error) => true, // retry no matter what error
  });

  try {
    const response: { data: string } = await axios.get(`${devMode === "True" ? localHost : apiHost}/api/property_images?key=${apiKey}`, {
      params: {
        image_id,
      }
    });

    console.log(response);
    return response.data;
  } catch (error) {
    return '';
  }

}

export default fetchImage