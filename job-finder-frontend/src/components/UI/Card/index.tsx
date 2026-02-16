import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
};

export const Card = ({ children, active = false, onClick }: Props) => {
  return (
    <div
      className={`bg-background text-foreground flex flex-col gap-6 rounded-lg border ${active && 'ring-primary ring-2'} px-4 py-6 shadow-sm`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
