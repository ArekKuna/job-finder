import { PropsWithChildren } from "react";
import { Footer } from "components/Layout/Footer/Footer";
import { Header } from "components/Layout/Header/Header";
import { useCheckAuthStatus } from "hooks/useAuthorization/useAuthorization";

type Props = PropsWithChildren<unknown>;

export const Layout = ({ children }: Props) => {
  useCheckAuthStatus();

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
