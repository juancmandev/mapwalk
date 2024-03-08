'use client';

import { FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import Control from 'react-leaflet-custom-control';

export default function Edit() {
  return (
    <Control position='bottomleft'>
      <FeatureGroup>
        <EditControl
          position='bottomleft'
          onEdited={(e) => console.log(e)}
          onCreated={(e) => console.log(e)}
          onDeleted={(e) => console.log(e)}
          draw={{
            circlemarker: false,
            rectangle: false,
            circle: false,
            marker: false,
            polyline: false,
          }}
        />
      </FeatureGroup>
    </Control>
  );
}
