import React, { useState } from "react";
import "./amenities-panel.css";
import { Button, Spinner } from "@chakra-ui/react";

const amenityHeaderTitles: { [key: string]: string } = {
  Banks: "Bank",
  Bars: "Bar",
  "Coffee Shops": "Bank",
  "Gas Stations": "Gas Station",
  "Grocery Stores": "Groceries",
  Libraries: "Library",
  "Liquor Stores": "Liquor Store",
  Malls: "Mall",
  "Medical Care Centres": "Medical Care",
  "Movie Theatres": "Movie Theatre",
  Parks: "Park",
  Pharmacies: "Pharmacy",
  Restaurants: "Restaurants",
};

interface AmenitiesPanelProps {
  amenityData: {
    [key: string]: {
      address: string;
      distance: string;
      latitude: number;
      longitude: number;
      name: string;
    }[];
  };
  handleViewMap: () => void;
  loading: boolean;
}

const AmenitiesPanel: React.FC<AmenitiesPanelProps> = (props) => {
  const { amenityData, handleViewMap, loading } = props;

  const [amenityType, setAmenityType] = useState<string>("Parks");

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="amenities-header">
            {Object.keys(amenityHeaderTitles).map((amenityTitle) => (
              <h4
                className={`amenity-title ${
                  amenityType === amenityTitle ? "selected-amenity" : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setAmenityType(amenityTitle);
                }}
                key={amenityTitle}
              >
                {amenityTitle}
              </h4>
            ))}
          </div>
          {amenityData[amenityHeaderTitles[amenityType]].map(
            ({ name, distance, address }) => (
              <div className="amenity">
                <div>
                  <p className="amenity-name">{name}</p>
                  <p>{address}</p>
                </div>
                <Button
                  colorScheme="teal"
                  variant="outline"
                  onClick={handleViewMap}
                >
                  View on Map
                </Button>
              </div>
            )
          )}
        </>
      )}
    </>
  );
};

const MemoAmenitiesPanel = React.memo(AmenitiesPanel);
export { MemoAmenitiesPanel as AmenitiesPanel };
export default MemoAmenitiesPanel;
