import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MapWalk',
  description: 'Review how good is your zone for walking.',
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout(props: Props) {
  return (
    <html lang='en'>
      <body>
        <main className='min-h-screen'>{props.children}</main>
      </body>
    </html>
  );
}
