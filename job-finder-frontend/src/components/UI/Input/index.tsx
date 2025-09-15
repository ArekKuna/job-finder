import { Field, Input, Label } from '@headlessui/react';

import { getInputStyles } from 'components/ui/Input/styles';
import { InputProps } from 'components/ui/Input/types';

export const InputUI = ({
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
}: InputProps) => {
  const styles = getInputStyles({
    variant,
    sideElementPosition,
    error: Boolean(error),
  });

  const inputKeyboardType = type === 'number' ? 'numeric' : inputMode;

  return (
    <Field className="flex flex-col gap-1">
      <Label className="font-label" htmlFor={name}>
        {label}
      </Label>
      <div className="relative flex flex-col gap-1">
        {sideElement && (
          <div
            className={`absolute top-1/2 -translate-y-1/2 transform ${sideElementPosition === 'start' ? 'left-3' : 'right-3'}`}
          >
            {sideElement}
          </div>
        )}
        <Input
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
    </Field>
  );
};
