import axios from 'axios';
import axiosRetry from "axios-retry";

import env from "react-dotenv";
import { AmenitiesAPIResponseType } from "../types";

export const fetchAmenities = async (propertyID: string, updateAmenities: (
  propertyID: string,
  amenities: AmenitiesAPIResponseType
) => void): Promise<any> => {

  const { API_KEY: apiKey, DEV: devMode, API_HOST: apiHost, LOCAL_HOST: localHost } = env;

  axiosRetry(axios, {
    retries: 3,
    shouldResetTimeout: true,
    retryCondition: (_error) => true, // retry no matter what error
  });

  try {
    const { data }: { data: AmenitiesAPIResponseType } = await axios.get(
      `${devMode === "True" ? localHost : apiHost}/api/amenities?key=${apiKey}`,
      {
        params: {
          id: propertyID,
        },
      }
    );

    console.log(data);

    updateAmenities(propertyID, data);
    return data;
  } catch (error) {
    throw (error);
  }

}

export default fetchAmenities