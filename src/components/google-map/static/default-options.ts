export const containerStyle: React.CSSProperties = {
  width: "100vw",
  height: "100vh",
};

export const GoogleMapOptions: google.maps.MapOptions = {
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false,
  styles: [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
  ],
  clickableIcons: false,
};
