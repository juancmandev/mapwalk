import { TileLayer as LeafletTileLayer } from 'react-leaflet';

export default function TileLayer() {
  return (
    <LeafletTileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    />
  );
}
