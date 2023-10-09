import type { Metadata } from 'next';
import { Jost } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import QueryProvider from '@/providers/QueryProvider';
import './globals.css';
import AuthProvider from '@/providers/AuthProvider';

const jost = Jost({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'aform',
  description: 'All propaganda is amoral'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={jost.className + ' overflow-x-hidden'}>
        <ToastContainer
          position='bottom-right'
          autoClose={3000}
          theme='colored'
          hideProgressBar
          closeOnClick
        />
        <AuthProvider />
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
