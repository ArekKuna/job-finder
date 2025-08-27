import { PropsWithChildren } from 'react';

import { Toaster } from 'react-hot-toast';

import { Footer } from 'components/Layout/Footer/Footer';
import { Header } from 'components/Layout/Header';
import { useCheckAuthStatus } from 'hooks/useAuthorization/useAuthorization';

type Props = PropsWithChildren<unknown>;

export const Layout = ({ children }: Props) => {
  useCheckAuthStatus();

  return (
    <>
      <Header />
      <Toaster />
      <div className="pt-[74px]">{children}</div>
      <Footer />
    </>
  );
};
