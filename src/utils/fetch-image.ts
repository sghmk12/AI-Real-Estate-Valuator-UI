import axios from 'axios';

interface FetchImageArgs {
  image_id: string,
  num_requests: number,
  propertyID: string, 
  updateNodeImgs: (propertyID: string, imageID: string, image: string) => void, 
  setCurrentImages: React.Dispatch<React.SetStateAction<string[]>>
}


export const fetchImage = async (args: FetchImageArgs): Promise<string> => {
  const {image_id, num_requests, propertyID, updateNodeImgs, setCurrentImages} = args;
  const {  REACT_APP_API_KEY: apiKey,  REACT_APP_DEV: devMode,  REACT_APP_API_HOST: apiHost,  REACT_APP_LOCAL_HOST: localHost } = process.env;

  const promises = [...Array(Math.ceil(num_requests))].map((_, idx) => axios.get(`${devMode === "True" ? localHost : apiHost}/api/property_images?key=${apiKey}`, {
    params: {
      image_id,
      img_index: idx
    }
  }))


  try {
    const responses: {data: string}[] = await Promise.all(promises);
    let image: string = responses.reduce((acc, response) => acc + response.data, '');
    image = "data:img/jpeg;base64," + image;
    updateNodeImgs(propertyID, image_id, image);
    setCurrentImages(prev => [...prev, image]);
    return image;
  } catch (error) {
    throw(error);
  }

}

export default fetchImage