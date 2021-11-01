import axios from 'axios';
import axiosRetry from "axios-retry";

import env from "react-dotenv";
// import { HomeData } from "../../../types";

type AmenitiesResponseType = {
  data: any,
  address: string
}

export const fetchAmenities = async (data: string): Promise<AmenitiesResponseType> => {

  const { API_KEY: apiKey, DEV: devMode, API_HOST: apiHost, LOCAL_HOST: localHost } = env;

  axiosRetry(axios, {
    retries: 10,
    shouldResetTimeout: true,
    retryCondition: (_error) => true, // retry no matter what error
  });

  try {
    const response: { data: AmenitiesResponseType } = await axios.get(
      `${devMode === "True" ? localHost : apiHost}/api/amenities?key=${apiKey}`,
      {
        params: {
          id: data,
        },
      }
    );

    return response.data;
  } catch (error) {
    alert("There was an error fetching amenities data :("); // TODO: Create custom error handling component
    return {
      data: {
        Bathrooms: "",
        Bedrooms: "",
        sqarefootage: "",
        Style: "",
        Type: "",
        estimated_price: "",
        sold_price: "",
      },
      address: ''
    };
  }

}

export default fetchAmenities