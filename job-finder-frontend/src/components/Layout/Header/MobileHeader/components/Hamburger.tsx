import { HamburgerIcon } from 'assets/Icons/HamburgerIcon';
import { ButtonUI } from 'components/ui/Button';

type Props = {
  onClick: () => void;
};

export const Hamburger = ({ onClick }: Props) => {
  return (
    <ButtonUI
      label="hamburger-icon"
      variant="ghost"
      full={false}
      icon={<HamburgerIcon size="md" />}
      onClick={onClick}
    />
  );
};
