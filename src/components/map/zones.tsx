import { createBrowserClient } from '@/lib/supabase/browser-client';
import { Database, Json } from '@/lib/supabase/types';
import { LatLngExpression } from 'leaflet';
import { useEffect, useState } from 'react';
import { Polygon, Tooltip } from 'react-leaflet';

type Props = {
  fetchZones: boolean;
};

export default function Zones(props: Props) {
  const supabase = createBrowserClient();

  const [polygons, setPolygons] = useState<
    | {
        good_or_bad: string;
        id: number;
        polygon_coords: Json;
        polygon_geopoints: unknown;
      }[]
    | null
  >(null);

  async function fetchPolygons() {
    const res = (await supabase.from('walk_zones').select()).data;

    setPolygons(res);
  }

  useEffect(() => {
    fetchPolygons();
  }, [props.fetchZones]);

  return (
    <>
      {polygons &&
        polygons.map((polygon, index) => (
          <Polygon
            key={`polygon-${index}`}
            positions={polygon.polygon_coords as LatLngExpression[]}
            color={polygon.good_or_bad === 'good' ? 'green' : 'red'}
          >
            <Tooltip>{polygon.good_or_bad}</Tooltip>
          </Polygon>
        ))}
    </>
  );
}
