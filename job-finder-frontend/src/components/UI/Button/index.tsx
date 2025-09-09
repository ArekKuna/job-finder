import { Button } from '@headlessui/react';

import { ButtonIcon } from 'components/ui/Button/components/ButtonIcon';
import { ButtonLoader } from 'components/ui/Button/components/ButtonLoader';
import { getButtonStyles } from 'components/ui/Button/styles';
import { ButtonProps } from 'components/ui/Button/types';

export const ButtonUI = ({
  disabled,
  full,
  id,
  loading,
  type,
  variant,
  size,
  onClick,
  ...props
}: ButtonProps) => {
  const textVariant = 'text' in props;
  const iconVariant = 'icon' in props;

  const icon = iconVariant ? props.icon : undefined;
  const text = textVariant ? props.text : undefined;

  const styles = getButtonStyles({ variant, full, loading, size });

  return (
    <Button id={id} className={styles} disabled={disabled} type={type} onClick={onClick}>
      {loading && <ButtonLoader />}

      {!loading && icon && <ButtonIcon icon={icon} />}

      {!loading && text && text}
    </Button>
  );
};
