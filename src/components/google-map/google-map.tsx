import React, { useState, useCallback, useMemo } from "react";
import { GoogleMap as Map } from "@react-google-maps/api";
import { HomeOptionsType, MapNodeType } from "../../types";
import { PropertyModal } from "../property-modal";
import "./google-map.css";
import { MapNode } from "./components";
import { containerStyle, GoogleMapOptions } from "./static";
import { fetchimageIDs, fetchImage } from "../../utils";

interface GoogleMapProps {
  style?: React.CSSProperties;
  center?: google.maps.LatLngLiteral;
  nodes?: any[];
  updateNodeImgs: (
    propertyID: string,
    imageIDs: string,
    images: string
  ) => void;
}

const GoogleMap: React.FC<GoogleMapProps> = (props) => {
  const { style = containerStyle, center, nodes, updateNodeImgs } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentMarker, setCurrentMarker] = useState<HomeOptionsType>({
    price: "",
    bedrooms: 0,
    bathrooms: 0,
    dens: 0,
    parking: 0,
    sqft: "",
    style: "",
    type: "",
  });
  const [currentAddress, setCurrentAddress] = useState<string>("");
  const [primary, setPrimary] = useState<boolean>(false);
  const [currentImages, setCurrentImages] = useState<string[]>([""]);
  const [currentPropertyID, setCurrentPropertyID] = useState<string>("");

  const handleNodeClick = useCallback(
    async (node: MapNodeType) => {
      const { address, homeOptions, primary, images, propertyID } = node;

      setIsOpen(true);

      setCurrentMarker(homeOptions);
      setCurrentAddress(address);
      setCurrentPropertyID(propertyID ?? "");

      if (primary) {
        setPrimary(true);
      }

      if (images.length > 0) {
        setCurrentImages(images);
      } else if (propertyID) {
        setCurrentImages([]);
        const images_info: [string, number][] = await fetchimageIDs(propertyID);
        console.log(images_info);
        Promise.all(
          images_info.map(([image_id, num_requests]) =>
            fetchImage({
              image_id,
              num_requests,
              propertyID,
              updateNodeImgs,
              setCurrentImages,
            })
          )
        );
      }
    },
    [setIsOpen, setCurrentMarker, updateNodeImgs, setCurrentImages]
  );

  const handleClose = useCallback(() => setIsOpen(false), [setIsOpen]);

  const markers = useMemo(
    () =>
      nodes?.map((node, idx) => (
        <MapNode node={node} onClick={handleNodeClick} key={idx} />
      )),
    [nodes, handleNodeClick]
  );

  return (
    <>
      <PropertyModal
        isOpen={isOpen}
        onClose={handleClose}
        headerText={currentAddress}
        images={currentImages}
        loadingimageIDs={currentImages.length === 0}
        propertyInfo={currentMarker}
        primary={primary}
        propertyID={currentPropertyID}
      />
      <Map
        mapContainerStyle={style}
        center={center}
        zoom={15}
        options={GoogleMapOptions}
      >
        {markers}
      </Map>
    </>
  );
};

const MemoGoogleMap = React.memo(GoogleMap);
export { MemoGoogleMap as GoogleMap };
export default MemoGoogleMap;
