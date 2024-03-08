'use client';

import { Button } from '@/components/ui/button';
import { Menu as MenuIcon } from 'lucide-react';
import Control from 'react-leaflet-custom-control';

export default function Menu() {
  return (
    <Control position='topright'>
      <Button variant='outline' size='icon'>
        <MenuIcon className='w-6' />
      </Button>
    </Control>
  );
}
