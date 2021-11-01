import React from "react";
import homeOptions from "./options.json";


const labels: {[key: string]: string} = {
  bedrooms: "# bedrooms",
  bathrooms: "# bathrooms",
  dens: "# dens",
  parking: "# parking spots",
  sqft: "Square Feet",
  style: "Property Style"
}
interface FormOptionsType {
  id: string,
  label: string,
  options: React.ReactNode[]
}

export const options: FormOptionsType[] = Object.entries(homeOptions).map(([key, values]) => 
  ({
    id: key,
    label: labels[key],
    options: values.map((option, idx) => <option key={idx}>{option}</option>)
  })
)
