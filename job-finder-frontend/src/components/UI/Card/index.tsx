import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const Card = ({ children }: Props) => {
  return (
    <div className="bg-background text-foreground rounded-lg border shadow-sm">{children}</div>
  );
};
