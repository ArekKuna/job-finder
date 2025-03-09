import { Layout } from "components/Layout/Layout";
import { Providers } from "components/RouteWrapper/Providers/Providers";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<unknown>;

export const RouteWrapper = ({ children }: Props) => {
  return (
    <Providers>
      <Layout>{children}</Layout>
    </Providers>
  );
};
