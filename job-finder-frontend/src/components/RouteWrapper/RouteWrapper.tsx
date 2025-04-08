import { PropsWithChildren } from "react";
import { Layout } from "components/Layout/Layout";

type Props = PropsWithChildren<unknown>;

export const RouteWrapper = ({ children }: Props) => {
  return <Layout>{children}</Layout>;
};
