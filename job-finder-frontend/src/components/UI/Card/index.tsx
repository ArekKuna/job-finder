import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const Card = ({ children }: Props) => {
  return (
    <div className="bg-background text-foreground flex flex-col gap-6 rounded-lg border px-4 py-6 shadow-sm">
      {children}
    </div>
  );
};
