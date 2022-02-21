import axios from 'axios';
import axiosRetry from "axios-retry";

// import { HomeData } from "../../../types";

interface AmenitiesResponseType {};

export const fetchAmenities = async (propertyID: string): Promise<any> => {

  const { REACT_APP_API_KEY: apiKey, REACT_APP_DEV: devMode, REACT_APP_API_HOST: apiHost, REACT_APP_LOCAL_HOST: localHost } = process.env;

  axiosRetry(axios, {
    retries: 3,
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