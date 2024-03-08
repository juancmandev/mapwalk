'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { createBrowserClient } from '@/lib/supabase/browser-client';

const selectData = {
  good: ['Good sidewalk', 'Enough trees', 'Secure'],
  bad: ['Bad sidewalk', 'Not enough trees', 'Insecure'],
};

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  polygon:
    | {
        lat: number;
        lng: number;
      }[]
    | null;
};

export default function ReviewZone(props: Props) {
  const supabase = createBrowserClient();

  const [goodOrBad, setGoodOrBad] = useState<'good' | 'bad' | null>(null);

  async function handleSubmit() {
    if (goodOrBad === null || props.polygon === null) {
      return;
    }

    let points = '';

    props.polygon.forEach(({ lat, lng }) => {
      const values = `${lng} ${lat},`;

      points = points.concat(values);
    });

    const res = await supabase.from('walk_zones').insert({
      good_or_bad: goodOrBad,
      polygon_geopoints: `POLYGON((${points} ${props.polygon[0].lng} ${props.polygon[0].lat}))`,
      polygon_coords: props.polygon,
    });
  }

  return (
    <Dialog
      open={props.open && props.polygon !== null}
      onOpenChange={props.setOpen}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Review this zone</DialogTitle>
          <DialogDescription>
            What do you think about this area?
          </DialogDescription>
        </DialogHeader>
        <main className='space-y-4'>
          <section className='w-full flex gap-2'>
            <Button
              onClick={() => setGoodOrBad('good')}
              className='w-full text-lg'
              variant='outline'
            >
              😄 Good
            </Button>
            <Button
              onClick={() => setGoodOrBad('bad')}
              className='w-full text-lg'
              variant='outline'
            >
              🙁 Bad
            </Button>
          </section>
          {/* {goodOrBad === 'good' && (
            <section>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder='What did you like' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {selectData.good.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </section>
          )}
          {goodOrBad === 'bad' && (
            <section>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder='What did you dislike' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {selectData.bad.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </section>
          )} */}
        </main>
        <footer>
          <Button onClick={handleSubmit}>Done</Button>
        </footer>
      </DialogContent>
    </Dialog>
  );
}
