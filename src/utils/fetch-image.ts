import axios from 'axios';

import env from "react-dotenv";

interface FetchImageArgs {
  image_id: string,
  propertyID: string, 
  updateNodeImgs: (propertyID: string, imageID: string, image: string) => void, 
  setCurrentImages: React.Dispatch<React.SetStateAction<string[]>>
}


export const fetchImage = async (args: FetchImageArgs): Promise<string> => {
  const {image_id, propertyID, updateNodeImgs, setCurrentImages} = args;
  const { API_KEY: apiKey, DEV: devMode, API_HOST: apiHost, LOCAL_HOST: localHost } = env;

  try {
    const response: { data: string } = await axios.get(`${devMode === "True" ? localHost : apiHost}/api/property_images?key=${apiKey}`, {
      params: {
        image_id,
      }
    });

    let image = "data:img/jpeg;base64," + response.data;
    updateNodeImgs(propertyID, image_id, image);
    setCurrentImages(prev => [...prev, image]);

    return image;
  } catch (error) {
    throw(error);
  }

}

export default fetchImage