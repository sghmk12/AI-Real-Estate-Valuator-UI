export interface HomeOptionsType {
    bathrooms: number,
    bedrooms: number,
    dens: number,
    sqft: string,
    style: string,
    type: string,
    parking: number,
    price?: string,
}

export interface MapNodeType {
    address: string,
    location?: {
        lat: number,
        lng: number
    },
    imageIds?: string[],
    images?: string[]
    primary?: boolean,
    homeOptions: HomeOptionsType,
    propertyId?: string
}

export interface AdjacentNodesAPIResponseType {
    data: {
        nodes: {
            lat: number,
            lng: number,
            id: string,
            address: string,
            num_bathrooms: number,
            num_bedrooms: number,
            num_dens: number, 
            parking_spots: number,
            property_type: string,
            square_footage: string,
            style: string,
            sold_price: string
        }[],
        predicted_price: string
    }
}