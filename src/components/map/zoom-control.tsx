'use client';

import { useMap } from 'react-leaflet';
import { Button } from '@/components/ui/button';
import { LocateFixed, ZoomIn, ZoomOut } from 'lucide-react';
import Control from 'react-leaflet-custom-control';

type Props = {
  lat: number;
  lon: number;
};

export default function ZoomControl(props: Props) {
  const map = useMap();

  return (
    <Control position='topleft'>
      <div className='flex flex-col gap-1'>
        <div className='flex flex-col'>
          <Button
            className='border-b-[0.5px] rounded-b-none'
            variant='outline'
            size='icon'
            onClick={() => map.zoomIn()}
          >
            <ZoomIn className='w-6' />
          </Button>
          <Button
            className='border-t-[0.5px] rounded-t-none'
            variant='outline'
            size='icon'
            onClick={() => map.zoomOut()}
          >
            <ZoomOut className='w-6' />
          </Button>
        </div>
        <Button
          variant='outline'
          size='icon'
          onClick={() =>
            map.flyTo(
              {
                lat: props.lat,
                lng: props.lon,
              },
              18
            )
          }
        >
          <LocateFixed className='w-6' />
        </Button>
      </div>
    </Control>
  );
}
