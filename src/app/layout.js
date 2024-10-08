import './styles/globals.css';
import { Pacifico } from 'next/font/google';
import ClientWrapper from './wrappers/ClientWrapper'

// Using the Google Font Utility to Load Pacifico
const pacifico = Pacifico({ subsets: ['latin'], weight: '400', display: 'swap' });

export const metadata = {
  title: 'Mockify',
  description: 'Generate mock exams easily with Mockify.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
        <body className={pacifico.className}>
          <ClientWrapper>
            {children}
          </ClientWrapper>
        </body>
    </html>
  );
}
