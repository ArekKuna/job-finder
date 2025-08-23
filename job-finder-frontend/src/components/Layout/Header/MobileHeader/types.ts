import { ReactNode } from "react";

export type BasicRoute = {
  id: number;
  to: string;
  value: string;
};

export type UserRoute = {
  id: number;
  to: string;
  value: string;
  icon: ReactNode;
};
