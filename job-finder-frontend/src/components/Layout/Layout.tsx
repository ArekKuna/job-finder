import { Footer } from "components/Layout/Footer/Footer";
import { Header } from "components/Layout/Header/Header";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<unknown>;

export const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
