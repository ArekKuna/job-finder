import { ReactNode } from 'react';

import { getCardStyles } from 'components/ui/Card/styles';

type Props = {
  children: ReactNode;
  isInteractive?: boolean;
  isActive?: boolean;
  onClick?: () => void;
};

export const Card = ({ children, isInteractive, isActive = false, onClick }: Props) => {
  const styles = getCardStyles({ isActive, isInteractive });
  return (
    <div className={styles} onClick={onClick}>
      {children}
    </div>
  );
};
