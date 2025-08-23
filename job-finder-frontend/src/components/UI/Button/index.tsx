import { getStyles } from "components/ui/Button/styles";
import { BaseProps, ButtonVariants } from "components/ui/Button/types";

type Props = ButtonVariants & BaseProps;

export const Button = ({
  disabled,
  full,
  size,
  title,
  type,
  variant,
  onClick,
  ...props
}: Props) => {
  const styles = getStyles({
    size,
    variant,
    full,
  });
  return (
    <button
      {...props}
      type={type}
      disabled={disabled}
      autoFocus={false}
      className={styles}
      onClick={onClick}
    >
      {title}
    </button>
  );
};
