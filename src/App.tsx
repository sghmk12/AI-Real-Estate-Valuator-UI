import React, { useState, useCallback } from "react";
import "./App.css";
import env from "react-dotenv";
import {
  GoogleMap,
  SearchForm,
  GoogleLocationSearch,
  SettingsPage,
  getSettingsLatLngBounds
} from "./components";
import {GearFill} from "react-bootstrap-icons"

import {
  HomeOptionsType,
  AdjacentNodesAPIResponseType,
  MapNodeType,
  IconButtonType
} from "./types";

const App: React.FC = () => {
  const { GOOGLE_API_KEY: googleApiKey } = env;

  const northEast = new google.maps.LatLng(43.938688, -79.274559);
  const southWest = new google.maps.LatLng(43.55874, -79.697532);
  const defaultLatLngBounds = new google.maps.LatLngBounds(
    southWest,
    northEast
  );

  const [nodes, setNodes] = useState<MapNodeType[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [address, setAddress] = useState<string>("");
  const [longitude, setLongitude] = useState<number>(-79.387054);
  const [lattitude, setlattitude] = useState<number>(43.642567);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [latLngBounds, setLatLngBounds] = useState<google.maps.LatLngBounds>(defaultLatLngBounds)

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

  const updateNodeImgs = useCallback((propertyID: string, imageID: string, image: string) => {
    
    setNodes((prev) => prev.map((node) => {
      const {propertyID: id, imageIDs, images} = node;
      if(id === propertyID){
        return {...node, imageIDs: [...imageIDs, imageID], images: [...images, image] };
      }
      return {...node}
    }))
  }, [setNodes]);

  const updateNodeAmenities = useCallback((propertyID: string) => {
  }, [])

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
            propertyID: id,
            address,
            images: [],
            imageIDs: [],
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
          images: [],
          imageIDs: [],
          homeOptions: { ...req, price: res.data.predicted_price }
        },
      ]);
    },
    [setNodes, lattitude, longitude, address]
  );

  const handleSettingsOpen = useCallback(() => {
    setShowSettings(true);
  }, [])

  const handleSettingsClose = useCallback(() => {
    setShowSettings(false);
  }, [])

  const onSetSettings = useCallback((settings) => {
    if(settings instanceof Object && settings["location"]) setLatLngBounds(getSettingsLatLngBounds(settings["location"]))
  }, [])

  const buttons : Array<IconButtonType> = [
    {
      text: "Settings",
      icon: GearFill,
      onClick: handleSettingsOpen
    }
  ];

  return (
    <div className="App">
      <GoogleLocationSearch
        apiKey={googleApiKey}
        bounds={latLngBounds}
        handleModalOpen={handleModalOpen}
        address={address}
        onSetAddress={onSetAddress}
        onSetCoordinates={onSetCoordinates}
        buttons={buttons}
      />
      <SearchForm
        modalOpen={modalOpen}
        handleModalClose={handleModalClose}
        long={longitude}
        lat={lattitude}
        handleResponse={handleResponse}
      />
      <SettingsPage
        handleModalClose={handleSettingsClose}
        onSetSettings={onSetSettings}
        modalOpen={showSettings}
      />
      <GoogleMap
        nodes={nodes}
        center={{ lat: lattitude, lng: longitude }}
        updateNodeImgs={updateNodeImgs}
      />
    </div>
  );
};
export default App;
