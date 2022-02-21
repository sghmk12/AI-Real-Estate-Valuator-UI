import axios from 'axios';
import axiosRetry from "axios-retry";

export const fetchimageIDs = async (property_id: string): Promise<[string, number][]> => {

  const {  REACT_APP_API_KEY: apiKey,  REACT_APP_DEV: devMode,  REACT_APP_API_HOST: apiHost,  REACT_APP_LOCAL_HOST: localHost } = process.env;

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