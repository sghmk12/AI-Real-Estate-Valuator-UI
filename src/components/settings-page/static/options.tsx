import React from "react";
import settingsOptions from "./options.json";

interface SettingsOptionsType {
  id: string,
  label: string,
  options: React.ReactNode[]
}

export const options: SettingsOptionsType[] = Object.entries(settingsOptions).map(([key, values]) => 
  ({
    id: key,
    label: values.label,
    options: values.options.map((option, idx) => <option key={idx}>{option}</option>)
  })
)
