import axios from 'axios';
import axiosRetry from "axios-retry";

import env from "react-dotenv";
// import { HomeData } from "../../../types";

interface AmenitiesResponseType {};

export const fetchAmenities = async (propertyID: string): Promise<any> => {

  const { API_KEY: apiKey, DEV: devMode, API_HOST: apiHost, LOCAL_HOST: localHost } = env;

  axiosRetry(axios, {
    retries: 10,
    shouldResetTimeout: true,
    retryCondition: (_error) => true, // retry no matter what error
  });

  try {
    const response = await axios.get(
      `${devMode === "True" ? localHost : apiHost}/api/amenities?key=${apiKey}`,
      {
        params: {
          id: propertyID,
        },
      }
    );
    
    console.log(response);

    return response.data;
  } catch (error) {
    throw(error); 
  }

}

export default fetchAmenities