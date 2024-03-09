import dynamic from 'next/dynamic';

const UserMarker = dynamic(() => import('@/components/map/user-marker'), {
  ssr: false,
});
const ZoomControl = dynamic(() => import('@/components/map/zoom-control'), {
  ssr: false,
});
const Menu = dynamic(() => import('@/components/map/menu'), {
  ssr: false,
});
const Edit = dynamic(() => import('@/components/map/edit'), {
  ssr: false,
});

type Props = {
  lat: number;
  lon: number;
  setFetchZones: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MapUI(props: Props) {
  return (
    <>
      <ZoomControl {...props} />

      <Edit setFetchZones={props.setFetchZones} />
      <UserMarker {...props} />
    </>
  );
}
