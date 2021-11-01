import React, { useState, useCallback } from "react";
import "./App.css";
import env from "react-dotenv";
import { GoogleMap, SearchForm, GoogleLocationSearch } from "./components";
import {
  HomeOptionsType,
  AdjacentNodesAPIResponseType,
  MapNodeType,
} from "./types";

const App: React.FC = () => {
  const { GOOGLE_API_KEY: googleApiKey } = env;
  const [nodes, setNodes] = useState<MapNodeType[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [address, setAddress] = useState<string>("");
  const [longitude, setLongitude] = useState<number>(-79.387054);
  const [lattitude, setlattitude] = useState<number>(43.642567);

  const handleModalOpen = useCallback(() => setModalOpen(true), [setModalOpen]);
  const handleModalClose = useCallback(
    () => setModalOpen(false),
    [setModalOpen]
  );
  const onSetAddress = useCallback(
    (address: any) => setAddress(address),
    [setAddress]
  );
  const onSetCoordinates = useCallback(
    ({ lat, lng }: any) => {
      setLongitude(lng);
      setlattitude(lat);
    },
    [setLongitude, setlattitude]
  );
  const updateNodeImgIds = (propertyId: any, imageIds: string[], images: string[]) => {
    setNodes((prev) => prev.map(node => {
      if(node.propertyId === propertyId){
        return {...node, imageIds, images};
      }
      return {...node}
    }))
  };
  const handleResponse = useCallback(
    (res: AdjacentNodesAPIResponseType, req: HomeOptionsType) => {
      setNodes([
        ...res.data.nodes.map(
          ({
            lat,
            lng,
            id,
            address,
            num_bathrooms,
            num_bedrooms,
            num_dens,
            parking_spots,
            property_type,
            square_footage,
            style,
            sold_price
          }) => ({
            location: { lat, lng },
            propertyId: id,
            address,
            homeOptions: {
              bathrooms: num_bathrooms,
              bedrooms: num_bedrooms,
              dens: num_dens,
              sqft: square_footage,
              style,
              type: property_type,
              parking: parking_spots,
              price: sold_price
            },
          })
        ),
        {
          primary: true,
          location: {
            lat: lattitude,
            lng: longitude,
          },
          address,
          homeOptions: { ...req, price: res.data.predicted_price },
        },
      ]);
    },
    [setNodes, lattitude, longitude, address]
  );

  const northEast = new google.maps.LatLng(43.938688, -79.274559);
  const southWest = new google.maps.LatLng(43.55874, -79.697532);
  const TorontoLatLngBounds = new google.maps.LatLngBounds(
    southWest,
    northEast
  );

  return (
    <div className="App">
      <GoogleLocationSearch
        apiKey={googleApiKey}
        bounds={TorontoLatLngBounds}
        handleModalOpen={handleModalOpen}
        address={address}
        onSetAddress={onSetAddress}
        onSetCoordinates={onSetCoordinates}
      />
      <SearchForm
        modalOpen={modalOpen}
        handleModalClose={handleModalClose}
        long={longitude}
        lat={lattitude}
        handleResponse={handleResponse}
      />
      <GoogleMap
        nodes={nodes}
        center={{ lat: lattitude, lng: longitude }}
        updateNodeImgs={updateNodeImgIds}
      />
    </div>
  );
};
export default App;
