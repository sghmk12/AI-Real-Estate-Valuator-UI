import {Icon} from "react-bootstrap-icons"

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
    imageIDs: string[],
    images: string[]
    primary?: boolean,
    homeOptions: HomeOptionsType,
    propertyID?: string
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

export type IconButtonType = {
  icon?: Icon;
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export type Error = {
    msg?: string;
    res?: any;
    data?: any;
}
