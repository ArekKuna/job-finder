import { Ref } from 'react';

import { tv, VariantProps } from 'tailwind-variants';

import { Maybe } from 'common/types/types';
import {
  HTMLInputProps,
  TextOnlyVariantProps,
  TextWithIconVariantProps,
} from 'components/ui/Input/types';

type BaseProps = Omit<VariantProps<typeof getStyles>, 'error'> &
  HTMLInputProps & {
    label?: string;
    ref?: Ref<HTMLInputElement>;
    error?: Maybe<string | boolean>;
  };

type Props = (TextOnlyVariantProps | TextWithIconVariantProps) & BaseProps;

const getStyles = tv({
  base: 'w-full border flex flex-col justify-center items-center rounded-md py-2 px-3 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:bg-foreground/10 placeholder-font',
  variants: {
    variant: {
      primary: 'h-10 ',
      secondary: 'h-[50px]',
    },
    hasSideElement: {
      true: '',
      false: '',
    },
    sideElementPosition: {
      start: '',
      end: '',
    },
    error: {
      true: 'border-negative',
    },
  },
  compoundVariants: [
    {
      hasSideElement: true,
      sideElementPosition: 'start',
      class: 'pl-11',
    },
    {
      hasSideElement: true,
      sideElementPosition: 'end',
      class: 'pr-11',
    },
  ],
  defaultVariants: {
    variant: 'primary',
    hasSideElement: false,
    sideElementPosition: 'end',
    error: false,
  },
});

export const Input = (props: Props) => {
  const {
    name,
    type = 'text',
    label,
    error,
    inputMode,
    sideElement,
    sideElementPosition = 'end',
    variant,
    onChange,
    ...restProps
  } = props;

  const styles = getStyles({
    variant,
    hasSideElement: Boolean(sideElement),
    sideElementPosition,
    error: Boolean(error),
  });

  const inputKeyboardType = type === 'number' ? 'numeric' : inputMode;

  return (
    <>
      <div className="flex flex-col gap-1">
        <label htmlFor={name} className="font-label">
          {label}
        </label>

        <div className="relative flex flex-col gap-1">
          {sideElement && (
            <div
              className={`absolute top-1/2 -translate-y-1/2 transform ${sideElementPosition === 'start' ? 'left-3' : 'right-3'}`}
            >
              {sideElement}
            </div>
          )}
          <input
            {...restProps}
            id={name}
            name={name}
            type={type}
            inputMode={inputKeyboardType}
            onChange={(e) => {
              if (!onChange) {
                return;
              }

              onChange(e);
            }}
            className={styles}
          />
        </div>
        {error ? <p className="font-error">{error}</p> : null}
      </div>
    </>
  );
};
