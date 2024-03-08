'use client';

import { Icon } from 'leaflet';
import { Marker } from 'react-leaflet';

type Props = {
  lat: number;
  lon: number;
};

export default function UserMarker(props: Props) {
  const icon = new Icon({
    iconUrl: '/location-pin.svg',
    iconSize: [32, 32],
  });

  return <Marker icon={icon} position={[props.lat, props.lon]} />;
}
