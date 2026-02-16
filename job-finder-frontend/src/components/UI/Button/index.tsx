import { getStyles } from 'components/ui/Button/styles';
import {
  BaseProps,
  ButtonVariants,
  IconVariantProps,
  TextVariantProps,
  TextWithIconVariantProps,
} from 'components/ui/Button/types';

type Props = (TextVariantProps | IconVariantProps | TextWithIconVariantProps) &
  ButtonVariants &
  BaseProps;

export const Button = ({
  size,
  variant,
  iconPosition,
  loading,
  full,
  justify = 'center',
  onClick,
  ...props
}: Props) => {
  const textVariant = 'text' in props;
  const iconVariant = 'icon' in props;

  const icon = iconVariant ? props.icon : undefined;
  const text = textVariant ? props.text : undefined;

  const styles = getStyles({
    size,
    variant,
    onlyIcon: !textVariant,
    loading,
    iconPosition,
    full,
    justify,
  });

  return (
    <button
      {...props}
      type={props.type}
      disabled={props.disabled}
      autoFocus={false}
      className={styles}
      aria-label={!textVariant ? props.label : undefined}
      onClick={onClick}
    >
      {icon && icon}
      {text}
    </button>
  );
};
