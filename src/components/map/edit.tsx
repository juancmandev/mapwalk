'use client';

import { useEffect, useState } from 'react';
import { FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import ReviewZone from './review-zone';
import Control from 'react-leaflet-custom-control';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Brush, Check, Trash, Undo2, XIcon } from 'lucide-react';

type coords = {
  lat: number;
  lng: number;
};

type Props = {
  setFetchZones: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Edit(props: Props) {
  const [drawing, setDrawing] = useState(false);
  const [deleteAll, setDeleteAll] = useState(false);
  const [open, setOpen] = useState(false);
  const [polygon, setPolygon] = useState<coords[] | null>(null);

  useEffect(() => {
    if (!open) {
      setPolygon(null);
      setDrawing(false);
    }
  }, [open]);

  function handleCreated(e: any) {
    setPolygon(e.layer._latlngs[0]);
    setOpen(true);
  }

  function handleDrawPolygon(e: any) {
    var e: any = document.createEvent('Event');
    e.initEvent('click', true, true);
    const cb = document.querySelector('[title="Draw a polygon"]');

    setDrawing(true);
    setDeleteAll(false);

    return cb?.dispatchEvent(e);
  }

  function handleDeleteLastPoint(e: any) {
    var e: any = document.createEvent('Event');
    e.initEvent('click', true, true);
    const cb = document.querySelector('[title="Delete last point drawn"]');

    return cb?.dispatchEvent(e);
  }

  function handleCancelDrawing(e: any) {
    var e: any = document.createEvent('Event');
    e.initEvent('click', true, true);
    const cb = document.querySelector('[title="Cancel drawing"]');

    setDrawing(false);

    return cb?.dispatchEvent(e);
  }

  function handleDeleteAll(e: any) {
    var e: any = document.createEvent('Event');
    e.initEvent('click', true, true);
    const cb = document.querySelector('[title="Delete layers"]');

    setDeleteAll(true);

    return cb?.dispatchEvent(e);
  }

  function handleConfirmDeleteAll(e: any) {
    var e: any = document.createEvent('Event');
    e.initEvent('click', true, true);
    const cb = document.querySelector('[title="Clear all layers"]');

    setDeleteAll(false);

    return cb?.dispatchEvent(e);
  }

  function handleCancelDeleteAll(e: any) {
    var e: any = document.createEvent('Event');
    e.initEvent('click', true, true);
    const cb = document.querySelector(
      '[title="Cancel editing, discards all changes"]'
    );

    setDeleteAll(false);

    return !cb?.dispatchEvent(e);
  }

  return (
    <TooltipProvider>
      <FeatureGroup>
        <EditControl
          position='bottomleft'
          onEdited={(e) => console.log(e)}
          onCreated={handleCreated}
          onDeleted={() => setDrawing(false)}
          draw={{
            circlemarker: false,
            rectangle: false,
            circle: false,
            marker: false,
            polyline: false,
          }}
        />
      </FeatureGroup>
      <Control position='bottomleft'>
        <div className='flex flex-col gap-2'>
          <div className='flex gap-1'>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size='icon'
                  variant='outline'
                  onClick={handleDrawPolygon}
                >
                  <Brush className='w-6' />
                </Button>
              </TooltipTrigger>
              <TooltipContent side='right'>
                <p>Draw polygon</p>
              </TooltipContent>
            </Tooltip>
            {drawing && (
              <div className='flex'>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size='icon'
                      variant='outline'
                      className='rounded-tr-none rounded-br-none border-r-[0.5px]'
                      onClick={handleDeleteLastPoint}
                    >
                      <Undo2 className='w-6' />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side='top'>
                    <p>Undo last point</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size='icon'
                      variant='outline'
                      className='rounded-tl-none rounded-bl-none border-l-[0.5px]'
                      onClick={handleCancelDrawing}
                    >
                      <XIcon className='w-6' />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side='top'>
                    <p>Cancel drawing</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            )}
          </div>
          <div className='flex gap-1'>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size='icon' variant='outline' onClick={handleDeleteAll}>
                  <Trash className='w-6' />
                </Button>
              </TooltipTrigger>
              <TooltipContent side='right'>
                <p>Remove all polygons</p>
              </TooltipContent>
            </Tooltip>
            {deleteAll && (
              <div className='flex'>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size='icon'
                      variant='outline'
                      className='rounded-tr-none rounded-br-none border-r-[0.5px]'
                      onClick={handleConfirmDeleteAll}
                    >
                      <Check className='w-6' />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side='top'>
                    <p>Yes, delete all</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size='icon'
                      variant='outline'
                      className='rounded-tl-none rounded-bl-none border-l-[0.5px]'
                      onClick={handleCancelDeleteAll}
                    >
                      <XIcon className='w-6' />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side='top'>
                    <p>No, cancel</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            )}
          </div>
        </div>
      </Control>
      <ReviewZone
        open={open}
        setOpen={setOpen}
        polygon={polygon!}
        setFetchZones={props.setFetchZones}
      />
    </TooltipProvider>
  );
}
