'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const ShowMap = dynamic(() => import('@/components/map/show-map'), {
  ssr: false,
});

type TCoords = {
  lat: number;
  lon: number;
};

export default function HandleMap() {
  const [coords, setCoords] = useState<TCoords | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
          setLoading(false);
        },
        () => {
          setLoading(false);
          setCoords(null);
        }
      );
    } else {
      setLoading(false);
      setCoords(null);
    }
  }, []);

  return (
    <>
      {loading && (
        <div className='w-full h-screen grid items-center bg-slate-200 animate-pulse'>
          <h1 className='text-center text-xl font-semibold'>Loading map...</h1>
        </div>
      )}
      {!loading && coords && <ShowMap {...coords} />}
      {!loading && !coords && (
        <div className='w-full h-screen grid items-center bg-slate-200'>
          <h1 className='text-center text-xl font-semibold'>
            Can't access to location
          </h1>
        </div>
      )}
    </>
  );
}
