const TORONTO_LOCATION_KEY = "Toronto";

const getSettingsLatLngBounds: (optionKey: string) => google.maps.LatLngBounds = (optionKey: string) => {
    var northEast = new google.maps.LatLng(43.938688, -79.274559);
    var southWest = new google.maps.LatLng(43.55874, -79.697532);
    
    switch(optionKey){    
        case TORONTO_LOCATION_KEY:
            northEast = new google.maps.LatLng(43.938688, -79.274559);
            southWest = new google.maps.LatLng(43.55874, -79.697532);
            break; 
    }

    return  new google.maps.LatLngBounds(
        southWest,
        northEast
    );
}
    
export {
    getSettingsLatLngBounds
}