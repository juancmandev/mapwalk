'use client';

import { useEffect, useState } from 'react';
import { FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import ReviewZone from './review-zone';

type coords = {
  lat: number;
  lng: number;
};

type Props = {
  setFetchZones: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Edit(props: Props) {
  const [open, setOpen] = useState(false);
  const [polygon, setPolygon] = useState<coords[] | null>(null);

  function handleCreated(e: any) {
    setPolygon(e.layer._latlngs[0]);
    setOpen(true);
  }

  useEffect(() => {
    if (!open) {
      setPolygon(null);
    }
  }, [open]);

  return (
    <>
      <FeatureGroup>
        <EditControl
          position='bottomleft'
          onEdited={(e) => console.log(e)}
          onCreated={handleCreated}
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
      <ReviewZone
        open={open}
        setOpen={setOpen}
        polygon={polygon!}
        setFetchZones={props.setFetchZones}
      />
    </>
  );
}
