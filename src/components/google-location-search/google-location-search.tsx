import React, { useState, useRef } from "react";

import PlacesAutoComplete, {
  getLatLng,
  geocodeByAddress,
} from "react-places-autocomplete";
import GoogleLogo from "./assets/powered_by_google_on_white.png";
import { GeoAltFill } from "react-bootstrap-icons";

import "./google-location-search.css";
import {
  Button,
  Input,
  Stack,
  List,
  ListItem,
  IconButton,
  Icon,
  Divider
} from "@chakra-ui/react";

interface GoogleLocationSearchProps {
  apiKey: string;
  bounds?: google.maps.LatLngBounds,
  onSetAddress: (address: string) => void;
  address: string;
  onSetCoordinates: Function;
  handleModalOpen: () => void;
}

const inBounds = (point: google.maps.LatLngLiteral, bounds: google.maps.LatLngBounds) => {
  const NE = bounds.getNorthEast();
  const SW = bounds.getSouthWest();
  var eastBound = point.lng < NE.lng();
  var westBound = point.lng > SW.lng();
  var inLong;

  if (NE.lng() < SW.lng()) {
      inLong = eastBound || westBound;
  } else {
      inLong = eastBound && westBound;
  }


  var inLat = point.lat > SW.lat() && point.lat < NE.lat();
  return inLat && inLong;
}

const GoogleLocationSearch: React.FC<GoogleLocationSearchProps> = (props) => {
  const {
    apiKey,
    bounds,
    onSetAddress,
    onSetCoordinates,
    handleModalOpen,
    address,
  } = props;

  const [loadingAutoLocate, setLoadingAutoLocate] = useState<boolean>(false);

  const selectButtonDisabled = ( address === "" );

  const handleLocationError = (error: any) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert(
          "You denied the location permission, please input your location manually or enable location permissions in your browser settings"
        );
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location unavailable");
        break;
      case error.TIMEOUT:
        alert("Location request took too long");
        break;
      case error.OUT_OF_RANGE:
        alert("Your location was outside of the bounds of our service. Try an address within Toronto");
        break;
      case error.UNKNOWN_ERROR:
        alert("Unknown Location Error");
        break;
      default:
        alert("Unknown Location Error");
    }
    setLoadingAutoLocate(false);
  };

  const getAddress = (lat: Number, lng: Number) => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        onSetAddress(data.results[0].formatted_address);
        onSetCoordinates({ lat, lng });
        handleModalOpen()
        setLoadingAutoLocate(false);
      })
      .catch((e) => {
        setLoadingAutoLocate(false);
      });
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      setLoadingAutoLocate(true);
      navigator.geolocation.getCurrentPosition((location) => {
        if(bounds && inBounds({lat: location.coords.latitude, lng: location.coords.longitude}, bounds)){
          getAddress(location.coords.latitude, location.coords.longitude);
        } else {
          handleLocationError({OUT_OF_RANGE: "OUT_OF_RANGE", code: "OUT_OF_RANGE"})
        }
      }, handleLocationError);
    }
  };

  const handleSelect = async (value: string) => {
    const results = await geocodeByAddress(value);
    const coords = await getLatLng(results[0]);
    if(bounds && inBounds(coords, bounds)){
      onSetCoordinates(coords);
      onSetAddress(value);
      handleModalOpen()
    } else {
      alert("Your location was outside of the bounds of our service. Try an address within Toronto")
    }
  };

  const LocationIcon: React.FC = () => <GeoAltFill size={18} />;
  const searchRef = useRef<HTMLInputElement | null>(null);

  return (
    <PlacesAutoComplete
      value={address}
      onChange={onSetAddress}
      onSelect={handleSelect}
      searchOptions={{
        componentRestrictions: {
          country: "ca",
        },
        bounds: bounds,
        types: ["address"],
      }}
    >
      {({
        getInputProps,
        suggestions,
        getSuggestionItemProps,
        loading: loadingProp,
      }) => (
        <div className="SearchBarWrapper">
          <Stack direction="row">
            <IconButton
              aria-label="Auto locate"
              colorScheme="teal"
              onClick={getLocation}
              isLoading={loadingAutoLocate}
            >
              <Icon as={LocationIcon} />
            </IconButton>
            <Input
              {...getInputProps({
                placeholder:
                  loadingProp ? "Loading..." : "Type address",
              })}
              variant="outline"
              bgColor="white"
              _focus={{ opacity: 1 }}
              ref={searchRef}
            />
            <Button
              onClick={() => handleSelect(address)}
              isDisabled={selectButtonDisabled}
              colorScheme="teal"
            >
              Select
            </Button>
          </Stack>
          <List
            spacing={3}
            bgColor="white"
            width={searchRef.current?.offsetWidth}
            marginLeft={12}
            marginRight="auto"
            roundedBottom="xl"
          >
            {loadingProp ? (
              <ListItem>Loading Suggestions...</ListItem>
            ) : (
              <>
                {suggestions.map((suggestion, idx) => (<>
                  <ListItem
                    {...getSuggestionItemProps(suggestion)}
                    textAlign="left"
                    padding="16px 16px 8px 16px"
                    key={idx}
                    _hover={{
                      color: "teal.500",
                      cursor: "pointer"
                    }}
                  >
                    {suggestion.description}
                  </ListItem>
                  <Divider/>
                </>))}
                {suggestions.length > 0 && (
                  <div style={{padding: 16, borderRadius: 50}}>
                    <img src={GoogleLogo} alt="Google Logo" />
                  </div>
                )}
              </>
            )}
          </List>
        </div>
      )}
    </PlacesAutoComplete>
  );
};

const MemoGoogleLocationSearch = React.memo(GoogleLocationSearch);
export { MemoGoogleLocationSearch as GoogleLocationSearch };
export default MemoGoogleLocationSearch;
