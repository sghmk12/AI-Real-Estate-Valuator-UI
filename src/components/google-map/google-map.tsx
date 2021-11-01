import React, { useState, useCallback, useMemo } from "react";
import { GoogleMap as Map } from "@react-google-maps/api";
import { HomeOptionsType, MapNodeType } from "../../types";
import { PropertyModal } from "../property-modal";
import "./google-map.css";
import { MapNode } from "./components";
import { containerStyle, GoogleMapOptions } from "./static";
import { fetchImageIds, fetchImage } from "../../utils";

interface GoogleMapProps {
  style?: React.CSSProperties;
  center?: google.maps.LatLngLiteral;
  nodes?: any[];
  updateNodeImgs: (
    propertyId: string,
    imgIds: string[],
    images: string[]
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
  const [loadingImages, setLoadingImages] = useState<boolean>(false);

  const handleNodeClick = useCallback(
    async (node: MapNodeType) => {
      const { address, homeOptions, primary, images, propertyId } = node;

      setIsOpen(true);

      setCurrentMarker(homeOptions);
      setCurrentAddress(address);

      if (primary) {
        setPrimary(true);
      }

      if (images) {
        setCurrentImages(images);
      } else if (propertyId) {
        setLoadingImages(true);

        const ids = await fetchImageIds(propertyId);
        let images = await Promise.all(ids.map((id) => fetchImage(id)));
        images = images.map(image => "data:img/jpeg;base64," + image);
        updateNodeImgs(propertyId, ids, images);
        setCurrentImages(images);

        setLoadingImages(false);
      }
    },
    [
      setIsOpen,
      setCurrentMarker,
      setLoadingImages,
      updateNodeImgs,
      setCurrentImages,
    ]
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
        loadingImageIds={loadingImages}
      >
        {Object.entries(currentMarker).map(([key, value]) =>
          key === "price" ? (
            <>
              <p>
                <strong>{primary ? "Estimated" : "Sold"} Price: </strong>
                {`$${Number(currentMarker.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} CAD`}
              </p>
              <br />
            </>
          ) : (
            <>
              <p>
                <strong>{key}: </strong>
                {value}
              </p>
              <br />
            </>
          )
        )}
      </PropertyModal>
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
