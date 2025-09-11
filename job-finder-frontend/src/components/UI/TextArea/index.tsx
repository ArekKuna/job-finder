import { Field, Label, Textarea } from '@headlessui/react';

import { getTextAreaStyles } from 'components/ui/TextArea/styles';
import { TextAreaProps } from 'components/ui/TextArea/types';

export const TextAreaUI = (props: TextAreaProps) => {
  const { error, label, maxLength, isResizable, name, onChange, ...restProps } = props;

  const styles = getTextAreaStyles({
    maxLength: Boolean(maxLength),
    error: Boolean(error),
    isResizable,
  });

  return (
    <Field className="flex flex-col gap-1">
      <Label className="font-label" htmlFor={name}>
        {label}
      </Label>

      <Textarea
        {...restProps}
        maxLength={maxLength}
        name={name}
        onChange={(e) => {
          if (!onChange) {
            return;
          }

          onChange(e);
        }}
        className={styles}
      />
      {error ? <p className="font-error">{error}</p> : null}
    </Field>
  );
};
