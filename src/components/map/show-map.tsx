'use client';

import { MapContainer } from 'react-leaflet';
import TileLayer from '@/components/map/tile-layer';
import MapUI from './map-ui';

type Props = {
  lat: number;
  lon: number;
};

export default function ShowMap(props: Props) {
  return (
    <MapContainer
      zoom={20}
      zoomControl={false}
      className='w-full h-screen'
      center={[props.lat, props.lon]}
    >
      <TileLayer />
      <MapUI {...props} />
    </MapContainer>
  );
}
