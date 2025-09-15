import { ReactNode } from 'react';

type Props = {
  icon: ReactNode;
};

export const ButtonIcon = ({ icon }: Props) => {
  return <span>{icon}</span>;
};
