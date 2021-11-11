import React from 'react';
import AmenitiesPanel from '../amenities-panel';
import amenities from './message.json';

export default {
  component: AmenitiesPanel,
  title: 'Components/AmenitiesPanel',
}

export const Primary = () => <AmenitiesPanel amenityData={amenities as any} handleViewMap={() => console.log("clicked")} loading={false} />