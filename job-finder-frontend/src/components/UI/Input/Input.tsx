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
    value: string | number;
    label?: string;
    ref?: Ref<HTMLInputElement>;
    error?: Maybe<string | boolean>;
  };

type Props = (TextOnlyVariantProps | TextWithIconVariantProps) & BaseProps;

const getStyles = tv({
  base: 'w-full h-10 px-2 flex justify-center items-center gap-2 outline-none ring-0 bg-jf-gray-50 has-[:disabled]:bg-jf-warm-gray-100',
  variants: {
    border: {
      primary: 'border border-black rounded-lg has-[:focus]:border-jf-purple-700',
      secondary: 'border-b border-black has-[:focus]:border-jf-purple-700',
    },
    error: {
      true: 'outline outline-offset-0 outline-2 border-jf-rose-600',
    },
  },
});

export const Input = (props: Props) => {
  const {
    border,
    name,
    type = 'text',
    label,
    error,
    inputMode,
    sideElement,
    sideElementPosition = 'start',
    onChange,
    ...restProps
  } = props;

  const styles = getStyles({
    border: border,
    error: Boolean(error),
  });

  const showErrorMessage = typeof error === 'string';
  const inputKeyboardType = type === 'number' ? 'numeric' : inputMode;

  return (
    <div className="text-jf-geologica-base flex w-full flex-col gap-1">
      {label && (
        <label htmlFor={name} className="text-jf-geologica-sm">
          {label}
        </label>
      )}

      <div className={styles}>
        <div
          className={`flex w-full items-center justify-center gap-2 ${
            sideElementPosition === 'start' ? 'flex-row-reverse' : 'flex-row'
          }`}
        >
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
            className="text-jf-geologica-extralight placeholder:text-jf-warm-gray-500 disabled:bg-jf-warm-gray-100 w-full flex-grow border-none p-0 placeholder:text-sm focus:border-transparent focus:ring-0 focus:outline-none"
          />

          {sideElement && <div>{sideElement}</div>}
        </div>
      </div>
      {showErrorMessage && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};
