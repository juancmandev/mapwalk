'use client';

import { MapContainer } from 'react-leaflet';
import TileLayer from '@/components/map/tile-layer';
import MapUI from '@/components/map/map-ui';
import Zones from '@/components/map/zones';
import { useState } from 'react';

type Props = {
  lat: number;
  lon: number;
};

export default function ShowMap(props: Props) {
  const [fetchZones, setFetchZones] = useState(false);

  return (
    <MapContainer
      zoom={20}
      zoomControl={false}
      className='w-full h-[calc(100vh_-_20px)] z-10'
      center={[props.lat, props.lon]}
    >
      <TileLayer />
      <MapUI {...props} setFetchZones={setFetchZones} />
      <Zones fetchZones={fetchZones} />
    </MapContainer>
  );
}
